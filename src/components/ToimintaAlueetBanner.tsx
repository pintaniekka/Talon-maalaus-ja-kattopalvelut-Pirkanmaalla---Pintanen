import { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { allCities, pinnoitusCities, maalausCities, getCityBySlug, type CityData } from "@/data/cityData";
import { cityNeighbors } from "@/data/cityNeighbors";
import { getStorageUrl } from "@/lib/storage";
import { cn } from "@/lib/utils";

const mapImage = getStorageUrl("Toiminta-alue-kartta-pirkanmaa-kantahame.png");

type Service = "maalaus" | "pinnoitus" | "alue";

interface ToimintaAlueetBannerProps {
  /** Nykyisen sivun paikkakunnan slug: paikkakunnan linkit korostetaan. */
  activeCity?: string;
  /** Millä sivulla ollaan. Palvelusivulla saman palvelun linkki on nykyinen sivu; aluesivulla ("alue", oletus) korostetaan molemmat. */
  service?: Service;
  /** Kaupunkisivulla: naapurikunnat nappeina haitarien yläpuolelle (Eerik 26.10.2026: yksi toiminta-alueet-lohko, ei kahta). */
  showNeighbors?: boolean;
}

/** Kaksi ryhmää (Eerik 14.10.2026): Pirkanmaa sekä Kanta-Häme ja Satakunta yhdessä. */
const regionGroups: { title: string; slugs: string[] }[] = [
  {
    title: "Pirkanmaa",
    slugs: [
      "tampere", "akaa", "hameenkyro", "ikaalinen", "juupajoki", "kangasala",
      "kihnio", "lempaala", "mantta-vilppula", "nokia", "orivesi", "parkano",
      "pirkkala", "palkane", "ruovesi", "sastamala", "urjala", "valkeakoski",
      "vesilahti", "virrat", "ylojarvi",
    ],
  },
  { title: "Kanta-Häme & Satakunta", slugs: ["forssa", "hameenlinna", "huittinen"] },
];

const pinnoitusSlugs = new Set(pinnoitusCities.map((c) => c.slug));
const maalausSlugs = new Set(maalausCities.map((c) => c.slug));

/** Palvelulinkit: vain paikkakunnat, joilla on oma palvelusivu. Aluesivut linkitetään vain toiminta-alueet-sivulta (26.10.2026). */
const linkGroups = [
  { key: "pinnoitus", title: "Tiilikaton pinnoitus", has: (slug: string) => pinnoitusSlugs.has(slug), href: (slug: string) => `/tiilikaton-pinnoitus-${slug}/` },
  { key: "maalaus", title: "Talon maalaus", has: (slug: string) => maalausSlugs.has(slug), href: (slug: string) => `/talon-maalaus-${slug}/` },
] as const;

const regions = regionGroups
  .map(({ title, slugs }) => ({
    title,
    id: title.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, ""),
    cities: slugs
      .map((slug) => allCities.find((c) => c.slug === slug))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .sort((a, b) => a.name.localeCompare(b.name, "fi")),
  }))
  .filter((region) => region.cities.some((c) => pinnoitusSlugs.has(c.slug) || maalausSlugs.has(c.slug)));

interface RegionAccordionProps {
  region: (typeof regions)[number];
  defaultOpen: boolean;
  activeCity?: string;
  service: Service;
}

/**
 * Yksi maakuntaryhmä haitarina. Linkit ovat aina HTML:ssä (sisäiset linkit crawlattavissa), suljettuna ne
 * piilotetaan vain visuaalisesti (grid-rows 0fr) ja otetaan pois sarkainjärjestyksestä.
 */
const RegionAccordion = ({ region, defaultOpen, activeCity, service }: RegionAccordionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `toiminta-alueet-${region.id}`;

  return (
    <div className="border-t border-white/10 last:border-b">
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 py-3 text-left font-heading text-base font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy md:text-[17px]"
        >
          {region.title}
          <ChevronDown
            aria-hidden="true"
            className={cn("h-4 w-4 shrink-0 text-white/60 transition-transform duration-200 motion-reduce:transition-none", open && "rotate-180")}
          />
        </button>
      </h3>

      <div
        id={panelId}
        aria-hidden={!open}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-200 motion-reduce:transition-none",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-2.5 pb-4 pt-0.5">
            {linkGroups.map((group) => {
              const groupCities = region.cities.filter((city) => group.has(city.slug));
              if (groupCities.length === 0) return null;
              return (
                <div key={group.key} className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[140px_1fr]">
                  <p className="text-[13px] text-white/55 sm:pt-px">{group.title}</p>
                  <ul className="flex flex-wrap items-baseline text-sm leading-6">
                    {groupCities.map((city, i) => {
                      const isCurrentPage = activeCity === city.slug && group.key === service;
                      const highlighted = activeCity === city.slug && (service === "alue" || isCurrentPage);
                      return (
                        <li key={city.slug} className="flex items-baseline">
                          {i > 0 && (
                            <span aria-hidden="true" className="mx-1.5 text-white/30">
                              ·
                            </span>
                          )}
                          <Link
                            to={group.href(city.slug)}
                            tabIndex={open ? undefined : -1}
                            aria-current={isCurrentPage ? "page" : undefined}
                            className={cn(
                              "rounded-sm underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                              highlighted ? "font-bold text-white underline decoration-accent" : "text-white/80",
                            )}
                          >
                            <span className="sr-only">{group.title} </span>
                            {city.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Toiminta-alueet tummalla pohjalla kartan kanssa (Eerik 13.10.2026), maltillisena (Eerik 14.10.2026):
 * otsikko, yksi lause, kaksi haitaria (Pirkanmaa auki, Kanta-Häme & Satakunta kiinni), joissa sirot
 * tekstilinkit tiilikaton pinnoituksen ja talon maalauksen kaupunkisivuille, pieni kartta ja linkki
 * Toiminta-alueet-sivulle. Kartta on läpinäkyvä PNG ja istuu tummalle pohjalle, ei valkoiselle.
 * Aluesivujen linkit ovat vain toiminta-alueet-sivulla. Kaikki linkit ovat aina HTML:ssä.
 */
const ToimintaAlueetBanner = ({ activeCity, service = "alue", showNeighbors = false }: ToimintaAlueetBannerProps) => {
  const [mapFailed, setMapFailed] = useState(false);
  const group = linkGroups.find((g) => g.key === service);
  const neighbors: CityData[] =
    showNeighbors && activeCity && group
      ? (cityNeighbors[activeCity] ?? [])
          .filter((slug) => group.has(slug))
          .map((slug) => getCityBySlug(slug))
          .filter((c): c is CityData => Boolean(c))
          .slice(0, 6)
      : [];
  const city = activeCity ? getCityBySlug(activeCity) : undefined;

  return (
    <section className="osio-navy viisto-yla pb-10 md:pb-14" aria-labelledby="toiminta-alueet-otsikko">
      <div className="section-container">
        <div className="mx-auto max-w-5xl text-navy-foreground">
          <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,190px)] lg:gap-10">
            <div>
              <h2 id="toiminta-alueet-otsikko" className="heading-style text-2xl leading-[1.1] text-white md:text-3xl">
                Toiminta-alueet
              </h2>
              <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/70 md:text-base">
                Pinnoitamme tiilikattoja ja maalaamme taloja Pirkanmaalla ja lähikunnissa.
              </p>

              {neighbors.length > 0 && group && city && (
                <div className="mt-5">
                  <h3 className="m-0 text-sm font-bold uppercase tracking-wider text-white/60">
                    {group.title} {city.cityGenitive} naapurikunnissa
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {neighbors.map((n) => (
                      <li key={n.slug}>
                        <Link
                          to={group.href(n.slug)}
                          className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:border-accent hover:text-accent"
                        >
                          {group.title} {n.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-5">
                {regions.map((region, i) => (
                  <RegionAccordion
                    key={region.title}
                    region={region}
                    defaultOpen={i === 0 || region.cities.some((c) => c.slug === activeCity)}
                    activeCity={activeCity}
                    service={service}
                  />
                ))}
              </div>

              <Link
                to="/toiminta-alueet/"
                className="group mt-5 inline-flex items-center gap-1.5 text-[15px] font-bold text-accent underline-offset-4 hover:underline"
              >
                Kaikki toiminta-alueet
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
            </div>

            {!mapFailed && (
              <div className="flex items-start justify-center lg:justify-end lg:pt-1">
                <img
                  loading="lazy"
                  decoding="async"
                  src={mapImage}
                  alt="Suomen kartta, jossa Pirkanmaa ja Kanta-Häme on korostettu"
                  className="h-auto w-full max-w-[150px] opacity-90 lg:max-w-[180px]"
                  width={276}
                  height={415}
                  onError={() => setMapFailed(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToimintaAlueetBanner;
