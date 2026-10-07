import ProjectGrid from "@/components/ProjectGrid";
import { getProjectItemsWithNearby, type ProjectService } from "@/data/projects";
import { getCityStory } from "@/data/cityStories";
import { getTestimonialsByCity } from "@/data/testimonialsData";
import { TestimonialCard } from "@/components/TestimonialsMarquee";

interface CityProjectsProps {
  citySlug: string;
  cityIn: string;
  service?: ProjectService;
  /** Ensimmäinen kohde isona. */
  featureFirst?: boolean;
}

const headings: Record<ProjectService | "all", (cityIn: string) => string> = {
  pinnoitus: (cityIn) => `Tiilikaton pinnoituksia ${cityIn}`,
  maalaus: (cityIn) => `Talon maalauksia ${cityIn}`,
  all: (cityIn) => `Kohteitamme ${cityIn}`,
};

/**
 * Kohdelohko: oman paikkakunnan oikeat kohteet. Ei näy, jos paikkakunnalta ei ole kuvia.
 * Jos omia kohteita on alle kolme, rivi täytetään muun Pirkanmaan kohteilla ja otsikko kertoo sen.
 */
const CityProjects = ({ citySlug, cityIn, service, featureFirst }: CityProjectsProps) => {
  const { items, hasNearby } = getProjectItemsWithNearby(citySlug, service);
  const story = getCityStory(citySlug, service);
  const reviews = getTestimonialsByCity(citySlug);
  if (items.length === 0) return null;

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-3">
            {headings[service ?? "all"](cityIn)}
            {hasNearby && " ja muualla Pirkanmaalla"}
          </h2>
          {story ? (
            <p className="text-base md:text-lg text-foreground leading-relaxed">{story.text}</p>
          ) : (
            <p className="text-muted-foreground">Kuvat ovat omista kohteistamme.</p>
          )}
        </div>
        <ProjectGrid items={items} featureFirst={featureFirst && items.length >= 3} />
        {reviews.length > 0 && (
          <div className="mt-10 max-w-6xl mx-auto">
            <h3 className="text-xl font-bold text-foreground font-heading mb-4 text-center">Asiakkaiden arvosteluja {cityIn}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {reviews.map((r) => (
                <TestimonialCard key={r.name} name={r.name} stars={r.stars} text={r.text} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CityProjects;
