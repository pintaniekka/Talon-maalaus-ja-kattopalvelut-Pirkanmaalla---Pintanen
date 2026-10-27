/**
 * Vite plugin (build-aikainen):
 *  1. Kopioi dist/index.html jokaisen reitin hakemistoon, jotta staattinen hosting
 *     palauttaa 200 OK (ei 404) myös suoraan avatuille alasivuille.
 *  2. Kirjoittaa jokaisen reitin HTML:ään sivukohtaisen titlen, descriptionin,
 *     canonicalin ja og/twitter-tagit (src/data/seo.ts). Näin JavaScriptiä ajamattomat
 *     lukijat – some-jakojen esikatselut ja useimmat tekoälyhakujen crawlerit –
 *     näkevät oikeat tiedot eivätkä etusivun oletuksia.
 *  3. Poistaa alasivujen kopioista etusivun hero-kuvan preloadin (data-home-only).
 *  4. Kirjoittaa dist/404.html:n (noindex), jotta tuntemattomat polut renderöivät
 *     SPA:n oman 404-sivun oikealla 404-statuksella.
 *  5. Generoi dist/sitemap.xml:n, dist/image-sitemap.xml:n, dist/llms.txt:n ja dist/llms-full.txt:n
 *     (jokaisen esirenderöidyn sivun näkyvä teksti) samasta reittilistasta.
 *  6. Kirjoittaa dist/_redirects-tiedoston: vanhat osoitteet 301:llä suoraan kanoniseen
 *     sivuun molemmissa muodoissa (ilman ja kauttaviivalla), public/_redirects loppuun.
 *  7. Merkitsee jonossa olevat (vielä julkaisemattomat) artikkelit noindexiksi.
 *  8. Sivukohtainen lastmod: jokaisen esirenderöidyn sivun sisällöstä lasketaan tiiviste ja
 *     verrataan tiedostoon src/data/lastmod.json. Jos sisältö muuttui, sivun lastmod on
 *     build-päivä; muuten vanha päivä säilyy. Tiedosto päivittyy buildissa: committaa se.
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { execSync } from "child_process";
import type { ViteDevServer } from "vite";
import { getAllRoutePaths, getCanonicalRoutes, buildSitemapXml, buildImageSitemapXml, buildLlmsTxt, buildLlmsFullTxt, buildRedirectsFile } from "./src/data/routes";
import { getRouteSeo, withBrand, canonicalUrl, heroPreload, type RouteSeo } from "./src/data/seo";
import { allCities } from "./src/data/cityData";

const HOME_ONLY_TAG = /\s*<link\s[^>]*data-home-only[^>]*>/g;

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const setMeta = (html: string, attr: "name" | "property", key: string, value: string) => {
  const re = new RegExp(`<meta\\s+${attr}="${key}"[\\s\\S]*?/>`);
  if (!re.test(html)) throw new Error(`[spa-routes] index.html: <meta ${attr}="${key}"> puuttuu`);
  return html.replace(re, () => `<meta ${attr}="${key}" content="${esc(value)}" />`);
};

const removeMeta = (html: string, key: string) =>
  html.replace(new RegExp(`\\s*<meta\\s+property="${key}"[\\s\\S]*?/>`), "");

/** Kirjoita sivukohtaiset head-tiedot staattiseen HTML:ään. */
export const applySeo = (html: string, routePath: string, seo: RouteSeo): string => {
  const title = withBrand(seo.title);
  const url = canonicalUrl(routePath);
  // Korvaukset annetaan funktiona, jottei sisällön mahdollinen "$" tulkitu korvauskuvioksi.
  let out = html.replace(
    /<title>[\s\S]*?<\/title>/,
    () => `<title>${esc(title)}</title>\n    <link rel="canonical" href="${url}" />`,
  );
  out = setMeta(out, "name", "description", seo.description);
  out = setMeta(out, "property", "og:title", title);
  out = setMeta(out, "property", "og:description", seo.description);
  out = setMeta(out, "property", "og:url", url);
  out = setMeta(out, "property", "og:type", seo.type ?? "website");
  out = setMeta(out, "name", "twitter:title", title);
  out = setMeta(out, "name", "twitter:description", seo.description);
  if (seo.image) {
    out = setMeta(out, "property", "og:image", seo.image);
    out = setMeta(out, "name", "twitter:image", seo.image);
    for (const key of ["og:image:type", "og:image:width", "og:image:height"]) out = removeMeta(out, key);
  }
  if (seo.hero) {
    // Pääkuvan preload: selain löytää LCP-kuvan HTML:stä eikä vasta JavaScriptin jälkeen.
    const { href, imagesrcset, imagesizes } = heroPreload(seo.hero);
    out = out.replace(
      "</title>",
      () =>
        `</title>\n    <link rel="preload" as="image" href="${href}" imagesrcset="${imagesrcset}" imagesizes="${imagesizes}" type="image/webp" fetchpriority="high" />`,
    );
  }
  return out;
};

/**
 * Buildin commit-tunniste: Cloudflare Pages antaa CF_PAGES_COMMIT_SHA:n ja GitHub Actions GITHUB_SHA:n.
 * Paikallisesti kysytään gitiltä; ilman gitiä "dev". E2E-työ odottaa esikatselua, kunnes sen
 * build-commit on PR:n viimeisin commit (muuten se testaisi edellisen pushin buildia).
 */
export const resolveBuildCommit = (
  env: Record<string, string | undefined> = process.env,
  git: () => string = () => execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(),
): string => {
  const fromEnv = env.CF_PAGES_COMMIT_SHA || env.GITHUB_SHA;
  if (fromEnv) return fromEnv;
  try {
    return git() || "dev";
  } catch {
    return "dev";
  }
};

/** Kirjoittaa <meta name="build-commit"> viewport-metan perään. src/main.tsx ei poista sitä. */
export const applyBuildCommit = (html: string, commit: string): string => {
  const re = /<meta\s+name="viewport"[^>]*>/;
  if (!re.test(html)) throw new Error('[spa-routes] index.html: <meta name="viewport"> puuttuu');
  return html.replace(re, (tag) => `${tag}\n    <meta name="build-commit" content="${esc(commit)}" />`);
};

const EMPTY_ROOT = '<div id="root"></div>';

/**
 * Fonttien preload (vaihe 5A, CLS): neljä käytettyä woff2-tiedostoa (Open Sans 400/600, Montserrat 700/800)
 * löytyvät dist/assets-kansiosta hash-nimillä vasta buildin jälkeen. Palauttaa link-tagit tai tyhjän.
 */
export const fontPreloadTags = (distDir: string): string => {
  const assetsDir = path.join(distDir, "assets");
  if (!fs.existsSync(assetsDir)) return "";
  const wanted = /^(open-sans-latin-(400|600)-normal|montserrat-latin-(700|800)-normal)\.[\w-]+\.woff2$/;
  return fs
    .readdirSync(assetsDir)
    .filter((f) => wanted.test(f))
    .sort()
    .map((f) => `<link rel="preload" as="font" type="font/woff2" href="/assets/${f}" crossorigin />`)
    .join("\n    ");
};

/**
 * Jonossa oleva artikkeli: hakemisto luodaan, mutta sivu on noindex eikä sillä ole
 * canonicalia ennen julkaisupäivää, jottei Google indeksoi tyhjää kuorta.
 */
export const applyNoindex = (html: string): string =>
  html.replace(/\n\s*<link rel="canonical" href="[^"]*" \/>/, () => `\n    <meta name="robots" content="noindex" />`);

/**
 * Yritys-scheman areaServed kaikista 24 paikkakunnasta (V16). index.html:ssä on vain maakunnat;
 * kunnat lisätään buildissa samasta listasta kuin reitit, jotta lista ei vanhene.
 */
export const applyAreaServed = (html: string): string => {
  const areas = [
    { "@type": "AdministrativeArea", name: "Pirkanmaa" },
    { "@type": "AdministrativeArea", name: "Kanta-Häme" },
    ...allCities.map((c) => ({ "@type": "City", name: c.name })),
  ];
  const json = areas.map((a) => `          ${JSON.stringify(a).replace(/"@type":"/, '"@type": "').replace(/","name":"/, '", "name": "').replace(/"}$/, '" }')}`).join(",\n");
  const re = /"areaServed": \[[\s\S]*?\n {8}\]/;
  if (!re.test(html)) throw new Error('[spa-routes] index.html: "areaServed" puuttuu');
  return html.replace(re, () => `"areaServed": [\n${json}\n        ]`);
};

type Prerender = (url: string) => Promise<{ html: string; headScripts: string }>;

/**
 * Esirenderöi sivun sisällön #root-elementtiin. Jos esirenderöinti epäonnistuu,
 * palautetaan HTML muuttumattomana: sivu toimii silloin kuten ennenkin (selainrenderöinti).
 */
const injectPrerender = async (
  html: string,
  route: string,
  prerender: Prerender | null,
  failed: string[],
): Promise<{ html: string; body: string | null }> => {
  if (!prerender) return { html, body: null };
  try {
    const { html: body, headScripts } = await prerender(route);
    if (!body.includes("<h1")) throw new Error("ei h1-otsikkoa");
    if (!html.includes(EMPTY_ROOT)) throw new Error("index.html: tyhjää #root-elementtiä ei löytynyt");
    return {
      html: html
        .replace(EMPTY_ROOT, () => `<div id="root">${body}</div>`)
        .replace("</head>", () => `${headScripts ? `    ${headScripts}\n  ` : ""}</head>`),
      body,
    };
  } catch (error) {
    failed.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
    return { html, body: null };
  }
};

/** Sivukohtaiset lastmod-päivät sisällön tiivisteen perusteella (src/data/lastmod.json). */
type LastmodManifest = Record<string, { hash: string; lastmod: string }>;
const LASTMOD_FILE = path.resolve("src/data/lastmod.json");

const readLastmod = (): LastmodManifest =>
  fs.existsSync(LASTMOD_FILE) ? (JSON.parse(fs.readFileSync(LASTMOD_FILE, "utf-8")) as LastmodManifest) : {};

const todayInFinland = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Helsinki" }).format(new Date());

/** Palauttaa sivun lastmodin: build-päivä, jos esirenderöity sisältö muuttui; muuten tallennettu päivä. */
export const trackLastmod = (manifest: LastmodManifest, route: string, body: string, today = todayInFinland()): string => {
  // Vain <main>: headerin ja footerin muutos ei ole sivun sisällön muutos. Reactin tunnisteet eivät ole sisältöä.
  const main = body.match(/<main[\s\S]*?<\/main>/)?.[0] ?? body;
  const normalized = main.replace(/\s(?:id|for|aria-describedby|aria-labelledby|aria-controls)="[^"]*"/g, "");
  const hash = crypto.createHash("sha1").update(normalized).digest("hex").slice(0, 16);
  const prev = manifest[route];
  if (prev && prev.hash === hash) return prev.lastmod;
  manifest[route] = { hash, lastmod: today };
  return today;
};

export default function spaRoutes() {
  return {
    name: "vite-plugin-spa-routes",
    apply: "build" as const,
    async closeBundle() {
      const distDir = path.resolve("dist");
      const indexPath = path.join(distDir, "index.html");

      if (!fs.existsSync(indexPath)) return;

      const fontTags = fontPreloadTags(distDir);
      const baseHtml = applyBuildCommit(applyAreaServed(fs.readFileSync(indexPath, "utf-8")), resolveBuildCommit()).replace(
        "</title>",
        () => `</title>${fontTags ? `\n    ${fontTags}` : ""}`,
      );
      const subpageHtml = baseHtml.replace(HOME_ONLY_TAG, "");
      const routes = getAllRoutePaths();
      let withSeo = 0;
      let prerendered = 0;
      const failed: string[] = [];
      // Esirenderöidään vain tällä hetkellä julkiset sivut. Jonossa oleva artikkeli jää
      // tyhjäksi kuoreksi, jolloin selain ratkaisee julkaisupäivän perusteella, mitä näytetään.
      const publicPaths = new Set(getCanonicalRoutes().map((r) => r.path));

      // Esirenderöinti: ladataan sovellus Viten SSR-lataajalla ja renderöidään jokainen
      // kanoninen reitti HTML:ksi. Ei tarvitse selainta. PRERENDER=0 ohittaa vaiheen.
      let prerender: Prerender | null = null;
      let ssrServer: ViteDevServer | null = null;
      // Viten SSR-lataaja kääntää JSX:n kehitysmuotoon (jsxDEV), joten React pitää ladata
      // kehitystilassa. Tuotettu HTML on sama. NODE_ENV palautetaan lopuksi.
      const previousNodeEnv = process.env.NODE_ENV;
      if (process.env.PRERENDER !== "0") {
        try {
          process.env.NODE_ENV = "development";
          // Vite ladataan vasta tässä, jotta pluginin apufunktioita voi testata ilman sitä.
          const { createServer } = await import("vite");
          ssrServer = await createServer({
            mode: "development",
            configFile: path.resolve("vite.config.ts"),
            server: { middlewareMode: true, hmr: false, watch: null },
            appType: "custom",
            logLevel: "error",
            optimizeDeps: { noDiscovery: true, include: [] },
            // CommonJS-paketit, joiden nimetyt exportit eivät aukea Noden ESM-latauksella.
            ssr: { noExternal: ["react-helmet-async"] },
          });
          prerender = (await ssrServer.ssrLoadModule("/src/entry-prerender.tsx")).render as Prerender;
        } catch (error) {
          console.warn("[spa-routes] Esirenderöinti ei käynnistynyt, jatketaan ilman:", error);
        }
      }

      // Etusivu: canonical ja og:url mukaan staattiseen HTML:ään.
      const manifest = readLastmod();
      const lastmods: Record<string, string> = {};
      const fullTextPages: { route: string; body: string }[] = [];
      const homeSeo = getRouteSeo("/");
      if (homeSeo) {
        const home = await injectPrerender(applySeo(baseHtml, "/", homeSeo), "/", prerender, failed);
        if (home.body) {
          prerendered++;
          lastmods["/"] = trackLastmod(manifest, "/", home.body);
          fullTextPages.push({ route: "/", body: home.body });
        }
        fs.writeFileSync(indexPath, home.html, "utf-8");
      }

      for (const route of routes) {
        const dir = path.join(distDir, route);
        const seo = getRouteSeo(route);
        fs.mkdirSync(dir, { recursive: true });
        let html = seo ? applySeo(subpageHtml, route, seo) : subpageHtml;
        if (seo) {
          // Vain julkiset sivut esirenderöidään; jonossa oleva artikkeli jää noindex-kuoreksi.
          if (publicPaths.has(route)) {
            const page = await injectPrerender(html, route, prerender, failed);
            html = page.html;
            if (page.body) {
              prerendered++;
              lastmods[route] = trackLastmod(manifest, route, page.body);
              fullTextPages.push({ route, body: page.body });
            }
          } else html = applyNoindex(html);
          withSeo++;
        }
        fs.writeFileSync(path.join(dir, "index.html"), html, "utf-8");
      }

      // _redirects: Vite on kopioinut public/_redirects-tiedoston distiin; generoidut
      // säännöt kirjoitetaan sen alkuun, SPA-fallback jää viimeiseksi.
      const redirectsPath = path.join(distDir, "_redirects");
      const redirectsTail = fs.existsSync(redirectsPath)
        ? fs.readFileSync(redirectsPath, "utf-8")
        : fs.readFileSync(path.resolve("public/_redirects"), "utf-8");
      fs.writeFileSync(redirectsPath, buildRedirectsFile(redirectsTail), "utf-8");

      const notFoundHtml = subpageHtml
        .replace(/<title>[\s\S]*?<\/title>/, `<title>Sivua ei löytynyt | Pintanen</title>\n    <meta name="robots" content="noindex" />`);
      fs.writeFileSync(path.join(distDir, "404.html"), notFoundHtml, "utf-8");
      // Manifestista poistetaan sivut, joita ei enää ole, ja se tallennetaan repoon committattavaksi.
      if (prerendered > 0) {
        for (const key of Object.keys(manifest)) if (!(key in lastmods)) delete manifest[key];
        const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
        fs.writeFileSync(LASTMOD_FILE, `${JSON.stringify(sorted, null, 2)}\n`, "utf-8");
      }
      fs.writeFileSync(path.join(distDir, "sitemap.xml"), buildSitemapXml(new Date(), lastmods), "utf-8");
      fs.writeFileSync(path.join(distDir, "image-sitemap.xml"), buildImageSitemapXml(), "utf-8");
      fs.writeFileSync(path.join(distDir, "llms.txt"), buildLlmsTxt(), "utf-8");
      if (fullTextPages.length) fs.writeFileSync(path.join(distDir, "llms-full.txt"), buildLlmsFullTxt(fullTextPages), "utf-8");

      await ssrServer?.close();
      if (previousNodeEnv === undefined) delete process.env.NODE_ENV;
      else process.env.NODE_ENV = previousNodeEnv;

      console.log(
        `[spa-routes] Generated ${routes.length} route files (${withSeo} with page-specific head, ${prerendered} prerendered), 404.html, sitemaps, llms.txt, llms-full.txt and _redirects.`,
      );
      if (failed.length) console.warn(`[spa-routes] Esirenderöinti epäonnistui ${failed.length} reitillä:\n  ${failed.join("\n  ")}`);
    },
  };
}
