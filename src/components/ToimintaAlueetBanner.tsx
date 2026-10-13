import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { allCities, pinnoitusCities, maalausCities } from "@/data/cityData";
import { getStorageUrl } from "@/lib/storage";
import { cn } from "@/lib/utils";

const mapImage = getStorageUrl("Toiminta-alue-kartta-pirkanmaa-kantahame.png");

type Service = "maalaus" | "pinnoitus" | "alue";

interface ToimintaAlueetBannerProps {
  /** Nykyisen sivun paikkakunnan slug: paikkakunnan linkit korostetaan. */
  activeCity?: string;
  /** Millä sivulla ollaan. Palvelusivulla saman palvelun linkki on nykyinen sivu; aluesivulla ("alue", oletus) korostetaan molemmat. */
  service?: Service;
}

const regionSlugs: Record<string, string[]> = {
  Pirkanmaa: [
    "tampere", "akaa", "hameenkyro", "ikaalinen", "juupajoki", "kangasala",
    "kihnio", "lempaala", "mantta-vilppula", "nokia", "orivesi", "parkano",
    "pirkkala", "palkane", "ruovesi", "sastamala", "urjala", "valkeakoski",
    "vesilahti", "virrat", "ylojarvi",
  ],
  "Kanta-Häme": ["forssa", "hameenlinna"],
  Satakunta: ["huittinen"],
};

const pinnoitusSlugs = new Set(pinnoitusCities.map((c) => c.slug));
const maalausSlugs = new Set(maalausCities.map((c) => c.slug));

/** Palvelulinkit: vain paikkakunnat, joilla on oma palvelusivu. Aluesivut linkitetään vain alatunnisteessa. */
const linkGroups = [
  { key: "pinnoitus", title: "Tiilikaton pinnoitus", has: (slug: string) => pinnoitusSlugs.has(slug), href: (slug: string) => `/tiilikaton-pinnoitus-${slug}/` },
  { key: "maalaus", title: "Talon maalaus", has: (slug: string) => maalausSlugs.has(slug), href: (slug: string) => `/talon-maalaus-${slug}/` },
] as const;

const regions = Object.entries(regionSlugs)
  .map(([title, slugs]) => ({
    title,
    cities: slugs
      .map((slug) => allCities.find((c) => c.slug === slug))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .sort((a, b) => a.name.localeCompare(b.name, "fi")),
  }))
  .filter((region) => region.cities.some((c) => pinnoitusSlugs.has(c.slug) || maalausSlugs.has(c.slug)));

const chipBase =
  "inline-flex items-center rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
const chipIdle = "border-white/15 bg-white/[0.06] text-white/90 hover:border-accent hover:bg-white/10 hover:text-white";
const chipActive = "border-accent bg-accent text-navy hover:bg-accent";

/**
 * Toiminta-alueet tummalla pohjalla kartan kanssa (Eerik 13.10.2026): otsikko, yksi lause, maakunnittain
 * linkit tiilikaton pinnoituksen ja talon maalauksen kaupunkisivuille sekä linkki Toiminta-alueet-sivulle.
 * Aluesivujen linkit ovat vain alatunnisteessa. Kartta on läpinäkyvä PNG, joten se istuu tummalle pohjalle
 * ilman valkoista kehystä. Kaikki linkit ovat aina HTML:ssä.
 */
const ToimintaAlueetBanner = ({ activeCity, service = "alue" }: ToimintaAlueetBannerProps) => {
  const [mapFailed, setMapFailed] = useState(false);

  return (
    <section className="py-10 md:py-14 bg-background" aria-labelledby="toiminta-alueet-otsikko">
      <div className="section-container">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.75rem] bg-navy text-navy-foreground md:rounded-[2.25rem]">
          {/* Pehmeä valo kartan takana */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-accent/20 blur-3xl"
          />

          <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1fr_minmax(0,300px)] lg:gap-14 lg:p-12">
            <div>
              <h2 id="toiminta-alueet-otsikko" className="heading-style text-3xl leading-[1.1] text-white md:text-4xl">
                Toiminta-alueet
              </h2>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                Pinnoitamme tiilikattoja ja maalaamme taloja Pirkanmaalla ja lähikunnissa.
              </p>

              <div className="mt-8 space-y-7">
                {regions.map((region) => (
                  <div key={region.title}>
                    <h3 className="mb-3 font-heading text-lg font-bold text-white">{region.title}</h3>
                    <div className="space-y-3">
                      {linkGroups.map((group) => {
                        const groupCities = region.cities.filter((city) => group.has(city.slug));
                        if (groupCities.length === 0) return null;
                        return (
                          <div key={group.key} className="grid gap-x-4 gap-y-2 sm:grid-cols-[150px_1fr]">
                            <p className="text-sm font-semibold text-white/60 sm:pt-1.5">{group.title}</p>
                            <ul className="flex flex-wrap gap-2">
                              {groupCities.map((city) => {
                                const isCurrentPage = activeCity === city.slug && group.key === service;
                                const highlighted = activeCity === city.slug && (service === "alue" || isCurrentPage);
                                return (
                                  <li key={city.slug}>
                                    <Link
                                      to={group.href(city.slug)}
                                      aria-current={isCurrentPage ? "page" : undefined}
                                      className={cn(chipBase, highlighted ? chipActive : chipIdle)}
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
                ))}
              </div>

              <Link
                to="/toiminta-alueet/"
                className="group mt-8 inline-flex items-center gap-1.5 font-bold text-accent underline-offset-4 hover:underline"
              >
                Kaikki toiminta-alueet
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
            </div>

            {!mapFailed && (
              <div className="flex items-center justify-center lg:justify-end">
                <img
                  src={mapImage}
                  alt="Suomen kartta, jossa Pirkanmaa ja Kanta-Häme on korostettu"
                  className="h-auto w-full max-w-[240px] opacity-95 drop-shadow-[0_12px_30px_hsl(var(--accent)/0.35)] lg:max-w-[300px]"
                  width={276}
                  height={415}
                  loading="lazy"
                  decoding="async"
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
