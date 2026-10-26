import PageHero from "@/components/PageHero";
import ReviewCard from "@/components/ReviewCard";
import ServiceContactSection from "@/components/ServiceContactSection";
import SEO from "@/components/SEO";
import { HERO_BASE, staticSeo } from "@/data/seo";
import { allTestimonials, matchesCategory, REVIEW_COUNT, type TestimonialCategory } from "@/data/testimonialsData";
import { GOOGLE_PROFILE_URL, LUVUT } from "@/data/company";

/** Kaksi ryhmää Eerikin luokittelulla (12.10.2026). Ei "muut"-ryhmää: jokainen arvostelu kuuluu kattoon, seiniin tai molempiin. */
const groups: { category: TestimonialCategory; title: string; intro: string }[] = [
  { category: "katto", title: "Kokemuksia tiilikaton pinnoituksesta", intro: "Nämä asiakkaat teettivät meillä tiilikaton pinnoituksen. Osalla maalasimme samalla myös seinät." },
  { category: "seina", title: "Kokemuksia talon maalauksesta", intro: "Nämä asiakkaat teettivät meillä talon ulkomaalauksen. Osalla pinnoitimme samalla myös katon." },
];

const crumbs = [{ name: "Kokemuksia" }];

/** /kokemuksia: kaikki Google-arvostelut yhdellä sivulla, sanasta sanaan (Eerik 12.10.2026). */
const Kokemuksia = () => {
  const seo = staticSeo["/kokemuksia"];
  return (
    <div>
      <SEO {...seo} breadcrumbs={crumbs} />

      <PageHero
        eyebrow="Kokemuksia"
        title={
          <>
            Asiakkaiden <span className="text-accent-ink">kokemuksia</span>
          </>
        }
        lead={
          <>
            Tällä sivulla ovat kaikki {REVIEW_COUNT} Google-arvosteluamme. Keskiarvo on{" "}
            <strong className="text-foreground">{LUVUT.googleArvio}</strong>. Arvostelut ovat sanasta sanaan Googlesta.
          </>
        }
        primary={{ to: "/tarjouspyynto/", label: "Pyydä ilmainen arviokäynti" }}
        secondary={{ to: "/hintalaskuri/", label: "Laske hinta" }}
        trust="yleinen"
        image={{ base: HERO_BASE.kokemuksia, alt: "Keltainen talo ja pinnoitettu tiilikatto Kangasalla" }}
        breadcrumbs={crumbs}
      />

      {groups.map((g, gi) => {
        const reviews = allTestimonials.filter((t) => matchesCategory(t, g.category));
        if (reviews.length === 0) return null;
        return (
          <section key={g.category} className={`section-padding ${gi % 2 === 1 ? "bg-accent-light" : "bg-background"}`}>
            <div className="section-container max-w-6xl mx-auto">
              <div className="max-w-3xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-3 font-heading">{g.title}</h2>
                <p className="text-muted-foreground text-base md:text-lg">{g.intro}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {reviews.map((r, i) => (
                  <ReviewCard key={r.name} review={r} index={i} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="py-12 bg-background">
        <div className="section-container max-w-3xl mx-auto text-center text-muted-foreground">
          <p>
            Arvostelut ovat Googlen yritysprofiilistamme.{" "}
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
              Katso profiili Googlessa
            </a>
            . Jos olet asiakkaamme, kiitos, jos jätät oman arvostelusi samaan paikkaan.
          </p>
        </div>
      </section>

      <ServiceContactSection variant="general" />
    </div>
  );
};

export default Kokemuksia;
