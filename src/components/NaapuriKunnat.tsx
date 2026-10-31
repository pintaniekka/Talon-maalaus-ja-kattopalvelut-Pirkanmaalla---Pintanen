import { Link } from "react-router-dom";
import { merkitse } from "@/components/Rytmi";
import { pinnoitusCities, maalausCities, getCityBySlug, type CityData } from "@/data/cityData";
import { cityNeighbors } from "@/data/cityNeighbors";

/**
 * Kevyt "Pinnoitukset naapurikunnissa" / "Talon maalaus naapurikunnissa" -palkki juuri ennen Toiminta-alueet-palkkia
 * (Eki 31.10.2026). Sama sisältö kuin ennen Toiminta-alueet-palkin sisällä (ToimintaAlueetBanner showNeighbors),
 * nyt omana vaaleana palkkinaan: linkit lähikuntien saman palvelun sivuille, enintään kuusi, vain kunnat joilla
 * on oma palvelusivu.
 */
const config = {
  pinnoitus: {
    otsikko: "Pinnoitukset naapurikunnissa",
    slugs: new Set(pinnoitusCities.map((c) => c.slug)),
    href: (slug: string) => `/tiilikaton-pinnoitus-${slug}/`,
    sr: "Tiilikaton pinnoitus ",
  },
  maalaus: {
    otsikko: "Talon maalaus naapurikunnissa",
    slugs: new Set(maalausCities.map((c) => c.slug)),
    href: (slug: string) => `/talon-maalaus-${slug}/`,
    sr: "Talon maalaus ",
  },
} as const;

const NaapuriKunnat = ({ citySlug, service }: { citySlug: string; service: "pinnoitus" | "maalaus" }) => {
  const c = config[service];
  const neighbors = (cityNeighbors[citySlug] ?? [])
    .filter((slug) => c.slugs.has(slug))
    .map((slug) => getCityBySlug(slug))
    .filter((c): c is CityData => Boolean(c))
    .slice(0, 6);
  if (neighbors.length === 0) return null;

  return (
    <section className="bg-background pt-8 md:pt-10" aria-labelledby="naapurikunnat-otsikko">
      <div className="section-container">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 rounded-2xl bg-accent-light px-5 py-4 md:flex-row md:items-center md:gap-6 md:px-7">
          <h2 id="naapurikunnat-otsikko" className="m-0 shrink-0 font-heading text-base font-bold text-navy md:text-lg">
            {c.otsikko}
          </h2>
          <ul className="m-0 flex list-none flex-wrap gap-x-2 gap-y-1.5 p-0">
            {neighbors.map((n) => (
              <li key={n.slug}>
                <Link
                  to={c.href(n.slug)}
                  className="inline-flex items-center rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-accent-ink shadow-sm transition-colors hover:text-navy hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="sr-only">{c.sr}</span>
                  {n.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

merkitse(NaapuriKunnat, "oma");

export default NaapuriKunnat;
