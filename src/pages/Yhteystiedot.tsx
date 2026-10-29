import SEO from "@/components/SEO";
import Rytmi from "@/components/Rytmi";
import ArvosteluNosto from "@/components/ArvosteluNosto";
import PageHero from "@/components/PageHero";
import ServiceContactSection from "@/components/ServiceContactSection";
import FaktaNauha from "@/components/FaktaNauha";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import { Building2, FileText, Mail, MapPin } from "lucide-react";
import { staticSeo, HERO_BASE } from "@/data/seo";
import { TOIMINTA_ALUE, VASTAUSLUPAUS, YHTEYSTIEDOT } from "@/data/company";

/**
 * Yhteystiedot (Eerik 14.10.2026: oma kohta päävalikkoon). Herossa heti otsikon alla KATOT ja SEINÄT
 * numeroineen samalla koolla, ilman nimiä ja WhatsAppia (Eerik 26.10.2026). Sitten johdanto ja napit.
 */
const faktat = [
  { label: "Yritys", value: "Pintanen Oy", icon: Building2 },
  { label: "Y-tunnus", value: "3525786-9", icon: FileText },
  {
    label: "Sähköposti",
    value: (
      <a href="mailto:myynti@pintanen.fi" className="text-accent-ink hover:underline">
        myynti@pintanen.fi
      </a>
    ),
    icon: Mail,
  },
  {
    label: "Toiminta-alue",
    value: `${TOIMINTA_ALUE.charAt(0).toUpperCase()}${TOIMINTA_ALUE.slice(1)}`,
    icon: MapPin,
  },
];

const numerot = [
  { label: "Katot", person: YHTEYSTIEDOT.eerik },
  { label: "Seinät", person: YHTEYSTIEDOT.eemil },
];

const Yhteystiedot = () => {
  const crumbs = [{ name: "Yhteystiedot" }];
  return (
    <div>
      <Rytmi>
      <SEO {...staticSeo["/yhteystiedot"]} breadcrumbs={crumbs} />

      <PageHero
        eyebrow="Yhteystiedot · Pintanen Oy"
        title={
          <>
            Soita <span className="text-accent-ink">meille</span>
          </>
        }
        afterTitle={
          <ul className="mb-6 space-y-2 md:mb-8">
            {numerot.map(({ label, person }) => (
              <li key={label} className="font-heading text-3xl font-extrabold tracking-tight md:text-4xl">
                <span className="uppercase text-accent-ink">{label}</span>{" "}
                <a href={person.phoneHref} className="text-foreground transition-colors hover:text-accent-ink">
                  {person.phone}
                </a>
              </li>
            ))}
          </ul>
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

      <FaktaNauha items={faktat} ariaLabel="Yrityksen tiedot" />

      {/* Arvostelunosto: sijoitus ja valinta src/data/arvostelusijoitus.ts */}
      <ArvosteluNosto polku="/yhteystiedot" />

      <ServiceContactSection variant="general" />
      <ToimintaAlueetBanner />
      </Rytmi>
    </div>
  );
};

export default Yhteystiedot;
