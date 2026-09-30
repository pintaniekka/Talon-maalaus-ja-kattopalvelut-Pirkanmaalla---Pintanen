/**
 * Sivuston reittien yksi totuuden lähde.
 *
 * Käytetään kolmessa paikassa:
 *  - vite-plugin-spa-routes.ts: luo dist/<reitti>/index.html jokaiselle reitille
 *    (staattinen hosting palauttaa 200 eikä 404) ja generoi sitemap.xml:n
 *  - src/test/routes.test.ts: varmistaa, että App.tsx:n reitit ovat tässä listassa
 *
 * Kun lisäät reitin App.tsx:ään, lisää se myös tähän.
 */
import { cities as fullServiceCities, allCities, maalausCities } from "./cityData";

export interface SiteRoute {
  path: string;
  /** Sitemap-prioriteetti 0–1. */
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
}

/** Käsin ylläpidetyt staattiset sivut. */
export const staticRoutes: SiteRoute[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/tiilikaton-pinnoitus-pirkanmaa", priority: 0.9, changefreq: "monthly" },
  { path: "/katon-puhdistus-pirkanmaa", priority: 0.9, changefreq: "monthly" },
  { path: "/talon-maalaus-pirkanmaa", priority: 0.9, changefreq: "monthly" },
  { path: "/maalauspalvelut-hinta-pirkanmaa", priority: 0.9, changefreq: "monthly" },
  { path: "/tiilikaton-pinnoitus-hinta-pirkanmaa", priority: 0.8, changefreq: "monthly" },
  { path: "/katon-puhdistus-hinta-pirkanmaa", priority: 0.8, changefreq: "monthly" },
  { path: "/talon-maalaus-hinta-pirkanmaa", priority: 0.8, changefreq: "monthly" },
  { path: "/toiminta-alueet", priority: 0.7, changefreq: "monthly" },
  { path: "/referenssit", priority: 0.8, changefreq: "monthly" },
  { path: "/meista", priority: 0.7, changefreq: "monthly" },
  { path: "/artikkelit", priority: 0.7, changefreq: "weekly" },
  { path: "/artikkelit/milloin-pinnoittaa-tiilikatto", priority: 0.6, changefreq: "monthly" },
  { path: "/tietosuoja", priority: 0.2, changefreq: "yearly" },
];

/** Kaupunkikohtaiset sivut, johdettu cityData.ts:stä. */
export const cityRoutes: SiteRoute[] = [
  ...allCities.map((c) => ({
    path: `/maalauspalvelut-${c.slug}`,
    priority: fullServiceCities.some((f) => f.slug === c.slug) ? 0.8 : 0.7,
    changefreq: "monthly" as const,
  })),
  ...fullServiceCities.map((c) => ({ path: `/tiilikaton-pinnoitus-${c.slug}`, priority: 0.7, changefreq: "monthly" as const })),
  ...fullServiceCities.map((c) => ({ path: `/katon-puhdistus-${c.slug}`, priority: 0.7, changefreq: "monthly" as const })),
  ...maalausCities.map((c) => ({ path: `/talon-maalaus-${c.slug}`, priority: 0.7, changefreq: "monthly" as const })),
];

/** Kaikki kanoniset (indeksoitavat) reitit. */
export const canonicalRoutes: SiteRoute[] = [...staticRoutes, ...cityRoutes];

/**
 * Vanhat osoitteet, joista App.tsx ohjaa uusiin. Näille luodaan index.html,
 * jotta ohjaus toimii myös ilman palvelinpuolen _redirects-tukea.
 */
export const legacyRoutes: string[] = [
  "/kattopalvelut/pinnoitus",
  "/kattopalvelut/puhdistus",
  "/talon-maalaus",
  "/hinnat",
  "/hinnat/tiilikaton-pinnoitus",
  "/hinnat/katon-puhdistus",
  "/hinnat/talon-maalaus",
  ...allCities.map((c) => `/alue/${c.slug}`),
  ...fullServiceCities.map((c) => `/kattopalvelut/pinnoitus/${c.slug}`),
  ...fullServiceCities.map((c) => `/kattopalvelut/puhdistus/${c.slug}`),
  ...maalausCities.map((c) => `/talon-maalaus/${c.slug}`),
];

/** Kaikki polut, joille build luo index.html:n (ilman juurta). */
export const getAllRoutePaths = (): string[] => [
  ...canonicalRoutes.map((r) => r.path).filter((p) => p !== "/"),
  ...legacyRoutes,
];

export const SITE_ORIGIN = "https://pintanen.fi";

/** Sitemap.xml kanonisista reiteistä. Osoitteet päättyvät kauttaviivaan kuten canonical-tagit (SEO.tsx). */
export const buildSitemapXml = (): string => {
  const urls = canonicalRoutes
    .map((r) => {
      const loc = r.path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${r.path}/`;
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};
