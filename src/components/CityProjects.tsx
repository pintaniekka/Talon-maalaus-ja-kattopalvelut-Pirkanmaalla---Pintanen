import { Link } from "react-router-dom";
import ProjectGrid from "@/components/ProjectGrid";
import { getProjectItemsWithNearby, type ProjectService } from "@/data/projects";
import { getCityStory } from "@/data/cityStories";
import { getTestimonialsByCity, REVIEW_COUNT } from "@/data/testimonialsData";
import { LUVUT } from "@/data/company";
import { TestimonialCard } from "@/components/TestimonialsMarquee";
import CityReviewCard from "@/components/CityReviewCard";
import { getReviewCases, reviewCaseImages } from "@/data/reviewCases";

interface CityProjectsProps {
  citySlug: string;
  cityIn: string;
  service?: ProjectService;
  /** Ensimmäinen kohde isona. */
  featureFirst?: boolean;
}

const headings: Record<ProjectService | "all", (place: string) => string> = {
  pinnoitus: (place) => `Tiilikaton pinnoituksia ${place}`,
  maalaus: (place) => `Talon maalauksia ${place}`,
  all: (place) => `Kohteitamme ${place}`,
};

/**
 * Kohdelohko: oman paikkakunnan oikeat kohteet ja paikkakunnan omat arvostelut. Ei näy, jos
 * paikkakunnalta ei ole kuvia eikä arvosteluja. Jos omia kohteita on alle kolme, rivi täytetään
 * lähikuntien kohteilla ja otsikko kertoo sen. Kun paikkakunnalla on omia arvosteluja, tämä on sivun
 * ainoa arvostelulohko (tarkastus 12.10.2026, 8.2), joten arvosanarivi ja linkki kaikkiin ovat tässä.
 */
const CityProjects = ({ citySlug, cityIn, service, featureFirst }: CityProjectsProps) => {
  // Kattosivulla vain kattoarviot ja seinäsivulla vain seinäarviot (Eerik 28.10.2026); "molemmat" näkyy kummallakin.
  const category = service === "pinnoitus" ? "katto" : service === "maalaus" ? "seina" : undefined;
  const cases = getReviewCases(citySlug, service);
  const { items, hasNearby, hasOwn } = getProjectItemsWithNearby(citySlug, service, reviewCaseImages(citySlug, service));
  const story = getCityStory(citySlug, service);
  const reviews = getTestimonialsByCity(citySlug, category);
  if (items.length === 0 && cases.length === 0 && reviews.length === 0) return null;
  // Muiden kuntien sivuilla Pirkanmaa mainitaan leipätekstissä enintään kerran (Eerik 27.10.2026),
  // joten täytekohteet ovat "lähikunnista". Tampereen sivulla sanotaan edelleen "muualla Pirkanmaalla".
  const tampere = citySlug === "tampere";
  const heading = hasOwn
    ? headings[service ?? "all"](cityIn) + (hasNearby ? (tampere ? " ja muualla Pirkanmaalla" : " ja lähikunnissa") : "")
    : headings[service ?? "all"](tampere ? "muualla Pirkanmaalla" : "lähikunnista");

  return (
    <section className="py-16 md:py-20 osio">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-3">{heading}</h2>
          {story ? (
            <p className="text-base md:text-lg text-foreground leading-relaxed">{story.text}</p>
          ) : (
            <p className="text-muted-foreground">{hasOwn ? "Kuvat ovat omista kohteistamme." : `Kuvat ovat omista kohteistamme lähikunnista. Teemme samat työt myös ${cityIn}.`}</p>
          )}
        </div>
        {items.length > 0 && <ProjectGrid items={items} featureFirst={featureFirst && items.length >= 3} />}
        {reviews.length > 0 && (
          <div className="mt-10 max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-foreground font-heading mb-4 text-center">Asiakkaiden arvosteluja {cityIn}</h3>
            <div className="grid gap-5">
              {reviews.map((r, i) => {
                const c = cases.find((x) => x.name === r.name);
                return c ? (
                  <CityReviewCard key={r.name} review={r} reviewCase={c} index={i} />
                ) : (
                  <div key={r.name} className="flex justify-center">
                    <TestimonialCard name={r.name} stars={r.stars} text={r.text} />
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-center text-muted-foreground">
              <strong className="text-foreground">{LUVUT.googleArvio}</strong> Google-arvosteluissa, {REVIEW_COUNT} arvostelua.{" "}
              <Link to="/kokemuksia/" className="text-primary font-semibold hover:underline">
                Lue kaikki asiakkaiden kokemukset
              </Link>
              .
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CityProjects;
