import { Link } from "react-router-dom";
import { fmtNumber } from "@/data/prices";
import {
  getCityHousingStats,
  HOUSING_STATS_SOURCE_LABEL,
  HOUSING_STATS_SOURCE_URL,
  type CityHousingStats,
} from "@/data/cityHousingStats";

import { housingFactsText } from "@/data/cityHousingText";
import { roofJobSentence } from "@/data/roofJobCounts";

type Service = "pinnoitus" | "maalaus";

interface CityHousingFactsProps {
  citySlug: string;
  cityIn: string;
  service: Service;
}

/** Pylväät vuosikymmenittäin. Ennen vuotta 1960 rakennetut on yhdistetty yhdeksi ryhmäksi. */
const bars = (s: CityHousingStats) => [
  { label: "Ennen 1960", value: s.ennen1921 + s.v1921_1939 + s.v1940_1959 },
  { label: "1960-luku", value: s.v1960 },
  { label: "1970-luku", value: s.v1970 },
  { label: "1980-luku", value: s.v1980 },
  { label: "1990-luku", value: s.v1990 },
  { label: "2000-luku", value: s.v2000 },
  { label: "2010-luku", value: s.v2010 },
  { label: "2020-luku", value: s.v2020 },
];

const copy: Record<Service, { title: (cityIn: string) => string; advice: string; cta: string; href: string }> = {
  pinnoitus: {
    title: (cityIn) => `Minkä ikäisiä taloja ${cityIn} on?`,
    advice:
      "Tiilen tehdaspinta kuluu yleensä 10–15 vuodessa. Jos talossasi on tiilikatto näiltä vuosilta eikä sitä ole pinnoitettu, pinta on todennäköisesti jo kulunut. Tulemme katsomaan katon ilmaiseksi.",
    cta: "Pyydä ilmainen kuntotarkastus",
    href: "/tarjouspyynto?palvelu=pinnoitus",
  },
  maalaus: {
    title: (cityIn) => `Kuinka moni talo ${cityIn} on jo maalausiässä?`,
    advice:
      "Puutalo maalataan yleensä 10–15 vuoden välein. Jos talossasi on puuverhous ja edellisestä maalauksesta on yli kymmenen vuotta, seinät kannattaa katsoa läpi. Arviokäynti on ilmainen.",
    cta: "Pyydä ilmainen arviokäynti",
    href: "/tarjouspyynto?palvelu=maalaus",
  },
};

/**
 * Paikkakunnan omakotitalot vuosikymmenittäin Tilastokeskuksen rakennuskannasta.
 * Luvut tulevat tiedostosta cityHousingStats.ts (generoitu), eikä lohko näy, jos lukuja ei ole.
 */
const CityHousingFacts = ({ citySlug, cityIn, service }: CityHousingFactsProps) => {
  const stats = getCityHousingStats(citySlug);
  const text = housingFactsText(citySlug, cityIn, service);
  if (!stats || !text) return null;

  const rows = bars(stats);
  const max = Math.max(...rows.map((r) => r.value));
  const c = copy[service];
  const jobs = service === "pinnoitus" ? roofJobSentence(citySlug, cityIn) : undefined;

  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">{c.title(cityIn)}</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">{text}</p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              {jobs && <strong className="text-foreground">{jobs} </strong>}
              {c.advice}
            </p>
            <Link
              to={c.href}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-accent-foreground transition-colors hover:brightness-110"
              style={{ backgroundColor: "hsl(var(--accent-strong))" }}
            >
              {c.cta}
            </Link>
          </div>

          <figure className="bg-card rounded-2xl border border-border/50 shadow-sm p-5 md:p-6">
            <figcaption className="text-sm font-semibold text-foreground mb-4">
              Omakoti- ja paritalot {cityIn} rakennusvuoden mukaan
            </figcaption>
            <ul className="space-y-2.5">
              {rows.map((r) => (
                <li key={r.label} className="grid grid-cols-[5.5rem_1fr_3.5rem] items-center gap-3 text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="h-3 rounded-full bg-border/60 overflow-hidden" aria-hidden="true">
                    <span
                      className="block h-full rounded-full bg-accent-strong"
                      style={{ width: `${Math.max(2, Math.round((r.value / max) * 100))}%` }}
                    />
                  </span>
                  <span className="text-right font-semibold text-foreground tabular-nums">{fmtNumber(r.value)}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground mt-4">
              Lähde:{" "}
              <a href={HOUSING_STATS_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline">
                {HOUSING_STATS_SOURCE_LABEL}
              </a>
              . Luvuissa ovat mukana kaikki omakoti- ja paritalot katon ja seinän materiaalista riippumatta.
            </p>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default CityHousingFacts;
