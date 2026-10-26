/**
 * Sivuston reittien yksi totuuden lähde.
 *
 * Käytetään kolmessa paikassa:
 *  - vite-plugin-spa-routes.ts: luo dist/<reitti>/index.html jokaiselle reitille
 *    (staattinen hosting palauttaa 200 eikä 404), generoi sitemap.xml:n ja _redirects-tiedoston
 *  - src/test/routes.test.ts: varmistaa, että App.tsx:n reitit ovat tässä listassa
 *
 * Kun lisäät reitin App.tsx:ään, lisää se myös tähän.
 */
import { cities as fullServiceCities, allCities, maalausCities, pinnoitusCities, puhdistusCities } from "./cityData";
import { articles, isPublished, getPublishedArticles } from "./articles";
import { getRouteSeo, heroPreload } from "./seo";
import { SITE_UPDATED, TOIMINTA_ALUE, KOTITALOUSVAHENNYS, TAKUU } from "./company";
import { pinnoitusTyovaiheet, maalausTyovaiheet, PINNOITUS_HINTA, MAALAUS_HINTA } from "./tyovaiheet";
import { generalFAQ, pinnoitusFAQ, maalausFAQ } from "./faqData";
import { getProjectItems, type ProjectService } from "./projects";

export interface SiteRoute {
  path: string;
  /** Sitemap-prioriteetti 0–1. */
  priority: number;
  changefreq: "weekly" | "monthly" | "yearly";
  /** Viimeisin muutos YYYY-MM-DD. Artikkeleilla oma päivä, muilla oletus SITE_UPDATED; build korvaa sen sisällön muutospäivällä (src/data/lastmod.json). */
  lastmod?: string;
}

/** Käsin ylläpidetyt staattiset sivut. */
export const staticRoutes: SiteRoute[] = [
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/tiilikaton-pinnoitus-pirkanmaa", priority: 0.9, changefreq: "monthly" },
  { path: "/talon-maalaus-pirkanmaa", priority: 0.9, changefreq: "monthly" },
  { path: "/hintalaskuri", priority: 0.9, changefreq: "monthly" },
  { path: "/tarjouspyynto", priority: 0.9, changefreq: "monthly" },
  { path: "/tiilikaton-pinnoitus-hinta-pirkanmaa", priority: 0.8, changefreq: "monthly" },
  { path: "/talon-maalaus-hinta-pirkanmaa", priority: 0.8, changefreq: "monthly" },
  { path: "/toiminta-alueet", priority: 0.7, changefreq: "monthly" },
  { path: "/referenssit", priority: 0.8, changefreq: "monthly" },
  { path: "/kokemuksia", priority: 0.8, changefreq: "monthly" },
  { path: "/meista", priority: 0.7, changefreq: "monthly" },
  { path: "/yhteystiedot", priority: 0.7, changefreq: "monthly" },
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
  ...pinnoitusCities.map((c) => ({ path: `/tiilikaton-pinnoitus-${c.slug}`, priority: 0.7, changefreq: "monthly" as const })),
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
  ...staticRoutes.map((r) => ({ ...r, lastmod: r.lastmod ?? SITE_UPDATED })),
  ...getArticleRoutes(now),
  ...cityRoutes.map((r) => ({ ...r, lastmod: r.lastmod ?? SITE_UPDATED })),
];

export interface LegacyRedirect {
  /** Vanha osoite ilman loppukauttaviivaa. */
  from: string;
  /** Nykyinen kanoninen sivu ilman loppukauttaviivaa. */
  to: string;
}

/**
 * Vanhat osoitteet ja niiden nykyiset sivut. Yksi lähde kolmeen käyttöön:
 *  - vite-plugin-spa-routes.ts kirjoittaa dist/_redirects-tiedoston (Cloudflare Pages 301)
 *  - App.tsx ohjaa selaimessa <Navigate>-reitillä, jos palvelinohjaus jostain syystä puuttuu
 *  - routes.test.ts tarkistaa, että jokainen kohde on kanoninen sivu
 * Vanhoille osoitteille ei enää luoda index.html-kuoria: kuori palautti 200:n etusivun
 * otsikolla ilman canonicalia, ja Google indeksoi niitä (auditointi 11.10.2026, osa 4, luku 5).
 */
export const legacyRedirects: LegacyRedirect[] = [
  { from: "/kattopalvelut/pinnoitus", to: "/tiilikaton-pinnoitus-pirkanmaa" },
  { from: "/kattopalvelut/puhdistus", to: "/tiilikaton-pinnoitus-pirkanmaa" },
  { from: "/talon-maalaus", to: "/talon-maalaus-pirkanmaa" },
  { from: "/hinnat", to: "/hintalaskuri" },
  { from: "/maalauspalvelut-hinta-pirkanmaa", to: "/hintalaskuri" },
  { from: "/hinnat/tiilikaton-pinnoitus", to: "/tiilikaton-pinnoitus-hinta-pirkanmaa" },
  { from: "/hinnat/katon-puhdistus", to: "/tiilikaton-pinnoitus-hinta-pirkanmaa" },
  { from: "/hinnat/talon-maalaus", to: "/talon-maalaus-hinta-pirkanmaa" },
  { from: "/artikkelit/tiilikaton-pinnoituksen-hinta", to: "/tiilikaton-pinnoitus-hinta-pirkanmaa" },
  ...allCities.map((c) => ({ from: `/alue/${c.slug}`, to: `/maalauspalvelut-${c.slug}` })),
  ...fullServiceCities.map((c) => ({ from: `/kattopalvelut/pinnoitus/${c.slug}`, to: `/tiilikaton-pinnoitus-${c.slug}` })),
  ...fullServiceCities.map((c) => ({ from: `/kattopalvelut/puhdistus/${c.slug}`, to: `/tiilikaton-pinnoitus-${c.slug}` })),
  // Katon puhdistus on loppunut (Eerik 11.10.2026): puhdistussivut ohjataan saman paikkakunnan pinnoitussivulle.
  { from: "/katon-puhdistus-pirkanmaa", to: "/tiilikaton-pinnoitus-pirkanmaa" },
  { from: "/katon-puhdistus-hinta-pirkanmaa", to: "/tiilikaton-pinnoitus-hinta-pirkanmaa" },
  ...puhdistusCities.map((c) => ({ from: `/katon-puhdistus-${c.slug}`, to: `/tiilikaton-pinnoitus-${c.slug}` })),
  ...maalausCities.map((c) => ({ from: `/talon-maalaus/${c.slug}`, to: `/talon-maalaus-${c.slug}` })),
];

/** Vanhat osoitteet (vain polut). */
export const legacyRoutes: string[] = legacyRedirects.map((r) => r.from);

/**
 * Cloudflare Pages -ohjaustiedoston sisältö (dist/_redirects). Jokaiselle vanhalle
 * osoitteelle kaksi riviä, ilman ja kauttaviivalla, koska Pages vertaa polkua merkki
 * merkiltä. Kohde on aina kauttaviivallinen: kauttaviivattomaan kohteeseen Pages lisäisi
 * oman 308-ohjauksen, ja ketjusta tulisi kaksi hyppyä. `tail` on public/_redirects-tiedoston
 * sisältö (säännöt, joita ei johdeta reittilistasta, ja SPA-fallback viimeisenä).
 */
export const buildRedirectsFile = (tail = ""): string => {
  const rules = legacyRedirects.flatMap(({ from, to }) => [`${from} ${to}/ 301`, `${from}/ ${to}/ 301`]);
  return [
    "# Generoitu buildissa (vite-plugin-spa-routes.ts) tiedostosta src/data/routes.ts: legacyRedirects.",
    "# Älä muokkaa tätä osaa käsin; muut säännöt ovat public/_redirects-tiedostossa.",
    ...rules,
    "",
    tail.trimEnd(),
    "",
  ].join("\n");
};

/** Kaikki polut, joille build luo index.html:n (ilman juurta). */
export const getAllRoutePaths = (): string[] => [
  ...[...staticRoutes, ...cityRoutes].map((r) => r.path).filter((p) => p !== "/"),
  // Myös ajastetuille artikkeleille luodaan hakemisto, jotta ne aukeavat
  // julkaisupäivänä ilman uutta buildia (sivu itse näyttää 404:n siihen asti).
  ...articles.map((a) => articlePath(a.slug)),
];

export const SITE_ORIGIN = "https://pintanen.fi";

/** Sitemap.xml kanonisista reiteistä. Osoitteet päättyvät kauttaviivaan kuten canonical-tagit (SEO.tsx). */
/**
 * `lastmods`: build-aikana lasketut sivukohtaiset päivät (vite-plugin-spa-routes.ts, sisällön tiiviste).
 * Artikkeleilla käytetään uudempaa: käsin asetettu updatedAt tai sisällön muutospäivä.
 */
export const buildSitemapXml = (now: Date = new Date(), lastmods: Record<string, string> = {}): string => {
  const urls = getCanonicalRoutes(now)
    .map((r) => {
      const loc = r.path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${r.path}/`;
      const tracked = lastmods[r.path];
      const isArticle = r.path.startsWith("/artikkelit/");
      const date = tracked && (!isArticle || !r.lastmod || tracked > r.lastmod) ? tracked : r.lastmod;
      const lastmod = date ? `\n    <lastmod>${date}</lastmod>` : "";
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
  const cityLine = (c: { slug: string; name: string }) => {
    const links = [`[kaikki palvelut](${url(`/maalauspalvelut-${c.slug}`)})`];
    if (pinnoitusCities.some((p) => p.slug === c.slug)) links.push(`[tiilikaton pinnoitus](${url(`/tiilikaton-pinnoitus-${c.slug}`)})`);
    if (maalausCities.some((m) => m.slug === c.slug)) links.push(`[talon maalaus](${url(`/talon-maalaus-${c.slug}`)})`);
    return `- ${c.name}: ${links.join(", ")}`;
  };

  return [
    "# Pintanen Oy",
    "",
    `> Pintanen Oy on perheyritys, joka pinnoittaa tiilikattoja ja maalaa talojen ulkoseiniä. Veljekset Eerik ja Eemil Pitkänen tekevät työt itse. Takana on yli 200 kohdetta: yli 130 pinnoitettua kattoa ja yli 80 maalattua taloa. Toiminta-alue on ${TOIMINTA_ALUE}. Pintanen on tamperelainen yritys. Palvelut ovat tiilikaton pinnoitus (sama työ kuin tiilikaton maalaus) ja puutalon ulkomaalaus, myös mökit ja piharakennukset.`,
    "",
    "## Perustiedot",
    "",
    "- Y-tunnus: 3525786-9",
    "- Puhelin: 040 964 0066",
    "- Sähköposti: myynti@pintanen.fi",
    `- Takuu: tiilikaton pinnoitus ${TAKUU.pinnoitus} (kirjallinen), talon maalaus ${TAKUU.maalaus}`,
    "- Arviokäynti ja kuntotarkastus ovat ilmaisia",
    `- Kotitalousvähennys työn osuudesta: ${KOTITALOUSVAHENNYS}`,
    `- Sisältö tarkistettu ${SITE_UPDATED}`,
    "",
    "## Suuntaa antavat hinnat",
    "",
    `- Tiilikaton pinnoitus: omakotitalo yleensä ${PINNOITUS_HINTA}. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta.`,
    `- Talon ulkomaalaus: omakotitalo yleensä ${MAALAUS_HINTA}. Hinta riippuu talon koosta, korkeudesta ja pohjatöiden määrästä.`,
    "- Tarkka urakkahinta annetaan ilmaisen arviokäynnin jälkeen. Tarjous on kiinteä hinta, johon kuuluu koko työ ja siivous.",
    "",
    "## Näin tiilikaton pinnoitus tehdään",
    "",
    ...pinnoitusTyovaiheet.map((t, i) => `${i + 1}. ${t.title}: ${t.text}`),
    "",
    "Tiilikaton pinnoitus ja tiilikaton maalaus tarkoittavat samaa työtä. Pinnoitettu katto kestää jopa 15 vuotta pidempään. Työ kestää yleensä 2–4 päivää.",
    "",
    "## Näin talon maalaus tehdään",
    "",
    ...maalausTyovaiheet.map((t, i) => `${i + 1}. ${t.title}: ${t.text}`),
    "",
    "Talon maalausta kutsutaan myös ulkomaalaukseksi, julkisivumaalaukseksi ja huoltomaalaukseksi. Työ kestää yleensä 3–7 päivää.",
    "",
    "## Palvelut",
    "",
    line("/tiilikaton-pinnoitus-pirkanmaa", "Tiilikaton pinnoitus Pirkanmaalla"),
    line("/talon-maalaus-pirkanmaa", "Talon maalaus Pirkanmaalla"),
    "",
    "## Hinnat ja hintalaskurit",
    "",
    line("/hintalaskuri", "Hintalaskuri"),
    line("/tarjouspyynto", "Tarjouspyyntö"),
    line("/tiilikaton-pinnoitus-hinta-pirkanmaa", "Tiilikaton pinnoituksen hinta"),
    line("/talon-maalaus-hinta-pirkanmaa", "Talon maalauksen hinta"),
    "",
    "## Usein kysyttyä",
    "",
    ...[...generalFAQ, ...pinnoitusFAQ, ...maalausFAQ].map((f) => `- ${f.question} ${f.answer.replace(/<[^>]+>/g, "")}`),
    "",
    "## Artikkelit",
    "",
    ...published.map((a) => `- [${a.title}](${url(articlePath(a.slug))}): ${a.lead}`),
    "",
    "## Yritys",
    "",
    line("/meista", "Tietoa yrityksestä"),
    line("/yhteystiedot", "Yhteystiedot"),
    line("/referenssit", "Referenssit"),
    line("/kokemuksia", "Asiakkaiden kokemuksia"),
    line("/toiminta-alueet", "Toiminta-alueet"),
    line("/tietosuoja", "Tietosuojaseloste"),
    "",
    "## Toiminta-alueet paikkakunnittain",
    "",
    ...allCities.map(cityLine),
    "",
  ].join("\n");
};

/** Purkaa HTML-entiteetit (&amp;, &nbsp;, &#39;, &#xA0; …) tavallisiksi merkeiksi. */
const decodeEntities = (text: string): string =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&nbsp;/g, " ")
    .replace(/&shy;/g, "")
    .replace(/&euro;/g, "€")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");

/**
 * Esirenderöidyn sivun <main>-sisältö pelkkänä tekstinä llms-full.txt:tä varten.
 * Otsikot merkitään markdown-tasoilla, listakohdat viivalla; skriptit, svg:t ja
 * ruudunlukijalle tarkoitetut sr-only-tekstit jätetään pois.
 */
export const htmlToPlainText = (html: string): string => {
  const main = html.match(/<main[\s\S]*?<\/main>/)?.[0] ?? html;
  const text = main
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+class="[^"]*\bsr-only\b[^"]*"[^>]*>[\s\S]*?<\/(?:span|p|div)>/gi, " ")
    .replace(/<h1\b[^>]*>/gi, "\n\n# ")
    .replace(/<h2\b[^>]*>/gi, "\n\n## ")
    .replace(/<h3\b[^>]*>/gi, "\n\n### ")
    .replace(/<h[4-6]\b[^>]*>/gi, "\n\n#### ")
    .replace(/<li\b[^>]*>/gi, "\n- ")
    .replace(/<(?:p|div|section|article|header|footer|nav|aside|blockquote|figure|figcaption|table|tr|ul|ol|dl|dt|dd|br|hr)\b[^>]*>/gi, "\n")
    .replace(/<\/(?:h[1-6]|p|li|tr|blockquote|figcaption|dd)>/gi, "\n")
    .replace(/<\/(?:td|th)>/gi, " | ")
    .replace(/<[^>]+>/g, "");
  return decodeEntities(text)
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

/**
 * llms-full.txt: jokaisen julkisen sivun koko näkyvä teksti yhdessä tiedostossa
 * (https://llmstxt.org). Sivut tulevat samasta reittilistasta kuin llms.txt ja sitemap;
 * teksti on buildin esirenderöimä <main>-sisältö, joten se vastaa sivun oikeaa sisältöä.
 */
export const buildLlmsFullTxt = (pages: { route: string; body: string }[], now: Date = new Date()): string => {
  const order = new Map(getCanonicalRoutes(now).map((r, i) => [r.path, i]));
  const sorted = [...pages].filter((p) => order.has(p.route)).sort((a, b) => (order.get(a.route) ?? 0) - (order.get(b.route) ?? 0));
  const url = (p: string) => (p === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${p}/`);
  const sections = sorted.map((p) => {
    const seo = getRouteSeo(p.route);
    const head = [`<!-- ${url(p.route)} -->`, `URL: ${url(p.route)}`];
    if (seo) head.push(`Otsikko: ${seo.title}`, `Kuvaus: ${seo.description}`);
    return `${head.join("\n")}\n\n${htmlToPlainText(p.body)}`;
  });
  return [
    "# Pintanen Oy: kaikkien sivujen teksti",
    "",
    `> Tiivis kuvaus sivustosta on osoitteessa ${SITE_ORIGIN}/llms.txt. Tämä tiedosto sisältää jokaisen julkisen sivun näkyvän tekstin sellaisena kuin sivu näytetään. Sivuja: ${sorted.length}. Sisältö tarkistettu ${SITE_UPDATED}.`,
    "",
    ...sections.flatMap((s) => [s, "", "---", ""]),
  ].join("\n");
};

/** Etusivun hero-kuva (sama kuin src/components/Hero.tsx). */
const HOME_HERO_IMAGE = `${SITE_ORIGIN}/images/Eerik-maalaa/Eerik-maalaa-kattoa-1200.avif`;

const xmlEscape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * Kuvasitemap: jokaisen kanonisen sivun pääkuva (sama kuva, jonka sivu oikeasti näyttää).
 * Generoidaan datasta, jotta osoitteet eivät vanhene, kun kuvia tai reittejä vaihdetaan.
 */
/**
 * Kaupunkisivun kohdekuvat kuvasitemappiin (vaihe 5B): sama kuva vain kerran per sivu, otsikkona kohteen kuvateksti.
 * Pinnoitus- ja maalaussivuille palvelun omat kohteet, aluesivulle kaikki paikkakunnan kohteet.
 */
const projectImagesFor = (routePath: string): { base: string; title: string }[] => {
  const m = routePath.match(/^\/(maalauspalvelut|tiilikaton-pinnoitus|talon-maalaus)-([a-z-]+)$/);
  if (!m) return [];
  const service: ProjectService | undefined = m[1] === "tiilikaton-pinnoitus" ? "pinnoitus" : m[1] === "talon-maalaus" ? "maalaus" : undefined;
  const seen = new Set<string>();
  const out: { base: string; title: string }[] = [];
  for (const item of getProjectItems(m[2], service)) {
    const bases = item.pair ? [`${item.pair}-ennen`, `${item.pair}-jalkeen`] : [item.image, item.before, item.after].filter((b): b is string => !!b);
    for (const base of bases) {
      if (seen.has(base)) continue;
      seen.add(base);
      out.push({ base, title: item.caption });
    }
  }
  return out;
};

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
      const images = [
        `    <image:image>\n      <image:loc>${xmlEscape(SITE_ORIGIN + heroPreload(seo.hero).href)}</image:loc>\n      <image:title>${xmlEscape(title)}</image:title>\n    </image:image>`,
        ...projectImagesFor(r.path).map(
          (img) => `    <image:image>\n      <image:loc>${xmlEscape(`${SITE_ORIGIN}/images/Pictures-1200/${img.base}-1200.webp`)}</image:loc>\n      <image:title>${xmlEscape(img.title)}</image:title>\n    </image:image>`,
        ),
      ];
      return `  <url>\n    <loc>${loc}</loc>\n${images.join("\n")}\n  </url>`;
    })
    .filter(Boolean)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${entries}\n</urlset>\n`;
};
