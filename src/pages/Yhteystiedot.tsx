import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import ServiceContactSection from "@/components/ServiceContactSection";
import { staticSeo, HERO_BASE } from "@/data/seo";
import { TOIMINTA_ALUE, VASTAUSLUPAUS } from "@/data/company";

/**
 * Yhteystiedot (Eerik 14.10.2026: oma kohta päävalikkoon). Sama lomake ja samat yhteyshenkilöt kuin
 * muualla (ServiceContactSection, jossa Eerikin ja Eemilin numerot), sen päällä lyhyt hero ja yrityksen tiedot.
 */
const faktat = [
  ["Yritys", "Pintanen Oy"],
  ["Y-tunnus", "3525786-9"],
  ["Sähköposti", "myynti@pintanen.fi"],
  ["Toiminta-alue", `${TOIMINTA_ALUE.charAt(0).toUpperCase()}${TOIMINTA_ALUE.slice(1)}`],
] as const;

const Yhteystiedot = () => {
  const crumbs = [{ name: "Yhteystiedot" }];
  return (
    <div>
      <SEO {...staticSeo["/yhteystiedot"]} breadcrumbs={crumbs} />

      <PageHero
        eyebrow="Pintanen Oy · Tampere"
        title={
          <>
            Soita tai jätä <span className="text-accent-ink">viesti</span>
          </>
        }
        lead={
          <>
            Eerik vastaa katoista ja Eemil seinistä. {VASTAUSLUPAUS} Arviokäynti on ilmainen.
          </>
        }
        primary={{ to: "/tarjouspyynto/", label: "Pyydä ilmainen arviokäynti" }}
        secondary={{ to: "/hintalaskuri/", label: "Laske hinta-arvio" }}
        trust="yleinen"
        image={{ base: HERO_BASE.meista, alt: "Eerik Pitkänen tiilikatolla Tampereella" }}
        breadcrumbs={crumbs}
      />

      <section className="bg-accent-light py-8 md:py-10">
        <div className="section-container">
          <dl className="max-w-5xl mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {faktat.map(([k, v]) => (
              <div key={k} className="bg-card rounded-2xl px-5 py-4 border border-border/50 shadow-sm">
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
                <dd className="mt-1 font-bold text-foreground break-words">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ServiceContactSection variant="general" />
    </div>
  );
};

export default Yhteystiedot;
