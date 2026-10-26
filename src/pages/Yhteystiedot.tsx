import SEO from "@/components/SEO";
import PageHero from "@/components/PageHero";
import ServiceContactSection from "@/components/ServiceContactSection";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Phone } from "@/components/icons/BrandIcons";
import { staticSeo, HERO_BASE } from "@/data/seo";
import { TOIMINTA_ALUE, VASTAUSLUPAUS, YHTEYSTIEDOT } from "@/data/company";

/**
 * Yhteystiedot (Eerik 14.10.2026: oma kohta päävalikkoon). Herossa puhelinnumerot isolla: KATOT Eerik,
 * SEINÄT Eemil (Eerik 26.10.2026, malli Lummecon yhteystietosivu). Sama lomake kuin muualla.
 */
const faktat = [
  ["Yritys", "Pintanen Oy"],
  ["Y-tunnus", "3525786-9"],
  ["Sähköposti", "myynti@pintanen.fi"],
  ["Toiminta-alue", `${TOIMINTA_ALUE.charAt(0).toUpperCase()}${TOIMINTA_ALUE.slice(1)}`],
] as const;

const numerot = [
  { label: "Katot", person: YHTEYSTIEDOT.eerik },
  { label: "Seinät", person: YHTEYSTIEDOT.eemil },
];

const Yhteystiedot = () => {
  const crumbs = [{ name: "Yhteystiedot" }];
  return (
    <div>
      <SEO {...staticSeo["/yhteystiedot"]} breadcrumbs={crumbs} />

      <PageHero
        eyebrow="Yhteystiedot · Pintanen Oy"
        title={
          <>
            Soita <span className="text-accent-ink">meille</span>
          </>
        }
        lead={
          <>
            Eerik vastaa katoista ja Eemil seinistä. {VASTAUSLUPAUS} Arviokäynti on ilmainen.
          </>
        }
        beforeActions={
          <ul className="mb-8 space-y-4">
            {numerot.map(({ label, person }) => (
              <li key={label} className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="w-16 text-xs font-extrabold uppercase tracking-[0.2em] text-accent-ink">{label}</span>
                <a
                  href={person.phoneHref}
                  className="font-heading text-3xl font-extrabold tracking-tight text-foreground transition-colors hover:text-accent-ink md:text-4xl"
                >
                  {person.phone}
                </a>
                <span className="text-sm text-muted-foreground">{person.first}</span>
                <a
                  href={person.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp ${person.first}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition-transform hover:scale-105"
                >
                  <WhatsAppIcon className="h-5 w-5" color="#ffffff" />
                </a>
              </li>
            ))}
          </ul>
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
