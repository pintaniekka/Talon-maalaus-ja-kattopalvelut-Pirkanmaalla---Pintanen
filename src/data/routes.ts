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
import { articles, isPublished, getPublishedArticles } from "./articles";
import { getRouteSeo, heroPreload } from "./seo";

export interface SiteRoute {
  path: string;
  /** Sitemap-prioriteetti 0–1. */
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
  /** Viimeisin muutos YYYY-MM-DD, jos tiedossa (artikkelit). */
  lastmod?: string;
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

/** Artikkelin polku slugista. */
export const articlePath = (slug: string) => `/artikkelit/${slug}`;

/** Julkaistut artikkelit (build-hetkellä). Ajastetut tulevat sitemapiin seuraavassa buildissa julkaisun jälkeen. */
export const getArticleRoutes = (now: Date = new Date()): SiteRoute[] =>
  articles
    .filter((a) => isPublished(a, now))
    .map((a) => ({
      path: articlePath(a.slug),
      priority: 0.6,
      changefreq: "monthly" as const,
      lastmod: a.updatedAt ?? a.publishedAt,
    }));

/** Kaikki kanoniset (indeksoitavat) reitit. */
export const getCanonicalRoutes = (now: Date = new Date()): SiteRoute[] => [
  ...staticRoutes,
  ...getArticleRoutes(now),
  ...cityRoutes,
];

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
  ...[...staticRoutes, ...cityRoutes].map((r) => r.path).filter((p) => p !== "/"),
  // Myös ajastetuille artikkeleille luodaan hakemisto, jotta ne aukeavat
  // julkaisupäivänä ilman uutta buildia (sivu itse näyttää 404:n siihen asti).
  ...articles.map((a) => articlePath(a.slug)),
  ...legacyRoutes,
];

export const SITE_ORIGIN = "https://pintanen.fi";

/** Sitemap.xml kanonisista reiteistä. Osoitteet päättyvät kauttaviivaan kuten canonical-tagit (SEO.tsx). */
export const buildSitemapXml = (now: Date = new Date()): string => {
  const urls = getCanonicalRoutes(now)
    .map((r) => {
      const loc = r.path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${r.path}/`;
      const lastmod = r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${loc}</loc>${lastmod}\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

/**
 * llms.txt: tiivis, koneluettava kuvaus sivustosta tekoälyhakuja varten
 * (https://llmstxt.org). Sisältää vain tietoja, jotka sivusto jo kertoo.
 */
export const buildLlmsTxt = (now: Date = new Date()): string => {
  const url = (p: string) => (p === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${p}/`);
  const line = (p: string, label: string) => {
    const seo = getRouteSeo(p);
    return `- [${label}](${url(p)})${seo ? `: ${seo.description}` : ""}`;
  };
  const published = getPublishedArticles(now);

  return [
    "# Pintanen Oy",
    "",
    "> Pintanen Oy on pirkanmaalainen perheyritys, joka tekee tiilikattojen pinnoituksia, tiilikattojen puhdistuksia ja talojen ulkomaalauksia. Veljekset Eerik ja Eemil Pitkänen tekevät työt itse. Toiminta-alue on Pirkanmaa ja lähikunnat noin tunnin säteellä Tampereelta.",
    "",
    "## Perustiedot",
    "",
    "- Y-tunnus: 3525786-9",
    "- Puhelin: 040 964 0066",
    "- Sähköposti: myynti@pintanen.fi",
    "- Takuu: tiilikaton pinnoitus 5 vuotta (kirjallinen), talon maalaus 2 vuotta",
    "- Arviokäynti on maksuton",
    "- Työt oikeuttavat kotitalousvähennykseen työn osuudesta",
    "",
    "## Suuntaa antavat hinnat",
    "",
    "- Tiilikaton pinnoitus: omakotitalo 2 850–4 880 €, 15–25 €/m² katon jyrkkyyden mukaan",
    "- Tiilikaton puhdistus: omakotitalo noin 800–2 500 €",
    "- Talon ulkomaalaus: 1-kerroksinen noin 3 500–6 000 €, 1,5-kerroksinen noin 5 000–8 000 €, 2-kerroksinen noin 7 000–11 000 €",
    "- Tarkka urakkahinta annetaan maksuttoman arviokäynnin jälkeen",
    "",
    "## Palvelut",
    "",
    line("/tiilikaton-pinnoitus-pirkanmaa", "Tiilikaton pinnoitus Pirkanmaalla"),
    line("/katon-puhdistus-pirkanmaa", "Tiilikaton puhdistus Pirkanmaalla"),
    line("/talon-maalaus-pirkanmaa", "Talon maalaus Pirkanmaalla"),
    "",
    "## Hinnat ja hintalaskurit",
    "",
    line("/maalauspalvelut-hinta-pirkanmaa", "Hinnat ja hintalaskuri"),
    line("/tiilikaton-pinnoitus-hinta-pirkanmaa", "Tiilikaton pinnoituksen hinta"),
    line("/katon-puhdistus-hinta-pirkanmaa", "Katon puhdistuksen hinta"),
    line("/talon-maalaus-hinta-pirkanmaa", "Talon maalauksen hinta"),
    "",
    "## Artikkelit",
    "",
    ...published.map((a) => `- [${a.title}](${url(articlePath(a.slug))}): ${a.lead}`),
    "",
    "## Yritys",
    "",
    line("/meista", "Tietoa yrityksestä"),
    line("/referenssit", "Referenssit"),
    line("/toiminta-alueet", "Toiminta-alueet"),
    line("/tietosuoja", "Tietosuojaseloste"),
    "",
    "## Toiminta-alueet",
    "",
    ...allCities.map((c) => `- [${c.name}](${url(`/maalauspalvelut-${c.slug}`)})`),
    "",
  ].join("\n");
};

/** Etusivun hero-kuva (sama kuin src/components/Hero.tsx). */
const HOME_HERO_IMAGE =
  "https://fndkkgfpsgghvewvoysr.supabase.co/storage/v1/object/public/images/Eerik-maalaa/Eerik-maalaa-kattoa-1200.avif";

const xmlEscape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Kuvasitemap: jokaisen kanonisen sivun pääkuva (sama kuva, jonka sivu oikeasti näyttää).
 * Generoidaan datasta, jotta osoitteet eivät vanhene, kun kuvia tai reittejä vaihdetaan.
 */
export const buildImageSitemapXml = (now: Date = new Date()): string => {
  const entries = getCanonicalRoutes(now)
    .map((r) => {
      const seo = getRouteSeo(r.path);
      if (r.path === "/") {
        return `  <url>\n    <loc>${SITE_ORIGIN}/</loc>\n    <image:image>\n      <image:loc>${HOME_HERO_IMAGE}</image:loc>\n      <image:title>Tiilikaton pinnoitus Pirkanmaalla – Pintanen Oy</image:title>\n    </image:image>\n  </url>`;
      }
      if (!seo?.hero) return "";
      const loc = r.path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${r.path}/`;
      const title = seo.title.replace(/\s*\|.*$/, "");
      return `  <url>\n    <loc>${loc}</loc>\n    <image:image>\n      <image:loc>${xmlEscape(heroPreload(seo.hero).href)}</image:loc>\n      <image:title>${xmlEscape(title)}</image:title>\n    </image:image>\n  </url>`;
    })
    .filter(Boolean)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries}\n</urlset>\n`;
};
