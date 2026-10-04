import { useState } from 'react';
import { ChevronDown, ArrowRight } from "lucide-react";
import { MapPin } from "@/components/icons/BrandIcons";
import { Link } from 'react-router-dom';
import { allCities, cities as fullServiceCities, maalausCities } from '@/data/cityData';
import { getStorageUrl } from '@/lib/storage';
import { cn } from '@/lib/utils';

const mapImage = getStorageUrl("Toiminta-alue-kartta-pirkanmaa-kantahame.png");

type Service = 'maalaus' | 'pinnoitus' | 'alue';

interface ToimintaAlueetBannerProps {
  /** Nykyisen sivun paikkakunnan slug — korostetaan aktiivisena chippinä */
  activeCity?: string;
  /** Minkä ryhmän chippi korostetaan aktiivisena: aluesivu (oletus), pinnoituksen tai maalauksen kaupunkisivu */
  service?: Service;
}

const regionSlugs: Record<string, string[]> = {
  Pirkanmaa: [
    'tampere', 'akaa', 'hameenkyro', 'ikaalinen', 'juupajoki', 'kangasala',
    'kihnio', 'lempaala', 'mantta-vilppula', 'nokia', 'orivesi', 'parkano',
    'pirkkala', 'palkane', 'ruovesi', 'sastamala', 'urjala', 'valkeakoski',
    'vesilahti', 'virrat', 'ylojarvi',
  ],
  'Kanta-Häme': ['forssa', 'hameenlinna'],
  Satakunta: ['huittinen'],
};

const regions = Object.entries(regionSlugs).map(([title, slugs]) => ({
  title,
  cities: slugs
    .map((slug) => allCities.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c)),
}));

const pinnoitusSlugs = new Set(fullServiceCities.map((c) => c.slug));
const maalausSlugs = new Set(maalausCities.map((c) => c.slug));

/**
 * Linkkiryhmät maakunnan sisällä. Palvelukohtaiset kaupunkisivut saavat omat linkkinsä
 * (vain paikkakunnat, joilla sivu on), ja kaikki paikkakunnat linkittävät aluesivulleen.
 */
const linkGroups = [
  { key: 'pinnoitus', title: 'Tiilikaton pinnoitus', has: (slug: string) => pinnoitusSlugs.has(slug), href: (slug: string) => `/tiilikaton-pinnoitus-${slug}` },
  { key: 'maalaus', title: 'Talon maalaus', has: (slug: string) => maalausSlugs.has(slug), href: (slug: string) => `/talon-maalaus-${slug}` },
  { key: 'alue', title: 'Kaikki palvelut paikkakunnittain', has: () => true, href: (slug: string) => `/maalauspalvelut-${slug}` },
] as const;

const chipBase =
  'px-4 py-2 bg-secondary/60 border border-border rounded-xl text-sm font-semibold transition-colors';
const chipIdle = 'text-muted-foreground hover:border-accent hover:text-accent-ink';
const chipActive = 'bg-accent-strong border-accent text-accent-foreground hover:border-accent';

const RegionCard = ({
  title,
  cities,
  defaultOpen,
  activeCity,
  service,
}: {
  title: string;
  cities: (typeof allCities)[number][];
  defaultOpen: boolean;
  activeCity?: string;
  service: Service;
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border transition-shadow duration-300',
        open
          ? 'border-border bg-card shadow-xl shadow-accent/5'
          : 'border-border/60 bg-accent-light/50'
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 p-4 md:p-5 text-left"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-strong text-accent-foreground shadow-lg shadow-accent/30">
            <MapPin className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground font-heading">
            {title}
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'h-5 w-5 shrink-0 text-accent-ink transition-transform duration-300 motion-reduce:transition-none',
            open && 'rotate-180'
          )}
        />
      </button>

      {/* Sisältö pidetään aina DOM:ssa (SEO: sisäiset linkit crawlattavissa),
          piilotetaan vain visuaalisesti kun paneeli on kiinni. */}
      <div
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 px-4 pb-5 pt-1 md:px-5 md:pb-6">
            {linkGroups.map((group) => {
              const groupCities = cities.filter((city) => group.has(city.slug));
              if (groupCities.length === 0) return null;
              return (
                <div key={group.key}>
                  <h3 className="mb-2 text-sm font-bold text-foreground">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {groupCities.map((city) => {
                      const isActive = activeCity === city.slug && group.key === service;
                      return (
                        <Link
                          key={city.slug}
                          to={group.href(city.slug)}
                          tabIndex={open ? undefined : -1}
                          aria-current={isActive ? 'page' : undefined}
                          className={cn(chipBase, isActive ? chipActive : chipIdle)}
                        >
                          {group.key !== 'alue' && <span className="sr-only">{group.title} </span>}
                          {city.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ToimintaAlueetBanner = ({ activeCity, service = 'alue' }: ToimintaAlueetBannerProps) => {
  const [mapFailed, setMapFailed] = useState(false);

  return (
    <section className="py-8 md:py-10 bg-accent-light">
      <div className="section-container">
        <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-accent/20 bg-card shadow-[0_24px_48px_-12px_hsl(var(--accent)/0.15)] md:rounded-[2.5rem] lg:flex-row">
          {/* Vasen: otsikko + maakunnat */}
          <div className="flex-1 p-5 md:p-8 lg:p-10">
            <header className="mb-5 md:mb-6">
              <h2 className="mb-3 font-heading text-2xl font-black tracking-tight text-foreground md:text-3xl">
                Toiminta-alueet
              </h2>
              <div className="h-1.5 w-16 rounded-full bg-accent" aria-hidden="true" />
            </header>

            <div className="space-y-3">
              {regions.map((region, idx) => (
                <RegionCard
                  key={region.title}
                  title={region.title}
                  cities={region.cities}
                  defaultOpen={idx === 0}
                  activeCity={activeCity}
                  service={service}
                />
              ))}
            </div>
          </div>

          {/* Oikea: karttasarake */}
           <div className="relative flex flex-col items-center justify-center overflow-hidden bg-accent-strong p-4 text-accent-foreground md:p-5 lg:w-[380px]">
            {/* Hienovarainen ruudukkokuvio */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(to right, hsl(var(--accent-foreground) / 0.5) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--accent-foreground) / 0.5) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
            {/* Pehmeät valopallot */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-accent-foreground/10 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-accent-foreground/10 blur-3xl" />

            {!mapFailed && (
               <div className="relative z-10 w-full max-w-[280px] rounded-3xl border border-accent-foreground/30 bg-accent-foreground/10 p-4 shadow-2xl">
                <img
                  src={mapImage}
                  alt="Toimialuekartta: Pirkanmaa ja Kanta-Häme"
                  className="h-auto w-full object-contain"
                  width={320}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  onError={() => setMapFailed(true)}
                />
              </div>
            )}

             <div className="relative z-10 mt-4 text-center">
              <span className="mb-2 inline-block rounded-full bg-accent-foreground/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.25em]">
                 SUOMALAISET TEKIJÄT
              </span>
              <h3 className="text-xl font-bold leading-tight font-heading">
                 Maalaamme taloja ja kattoja alueellasi!
              </h3>
              <Link
                to="/toiminta-alueet"
                className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 transition-colors hover:underline"
              >
                 Katso, missä palvelemme
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToimintaAlueetBanner;
