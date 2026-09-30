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
 *  5. Generoi dist/sitemap.xml:n, dist/image-sitemap.xml:n ja dist/llms.txt:n samasta reittilistasta.
 */
import fs from "fs";
import path from "path";
import type { ViteDevServer } from "vite";
import { getAllRoutePaths, getCanonicalRoutes, buildSitemapXml, buildImageSitemapXml, buildLlmsTxt } from "./src/data/routes";
import { getRouteSeo, withBrand, canonicalUrl, heroPreload, type RouteSeo } from "./src/data/seo";

const HOME_ONLY_TAG = /\s*<link\s[^>]*data-home-only[^>]*>/g;

const esc = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const setMeta = (html: string, attr: "name" | "property", key: string, value: string) => {
  const re = new RegExp(`<meta\\s+${attr}="${key}"[\\s\\S]*?/>`);
  if (!re.test(html)) throw new Error(`[spa-routes] index.html: <meta ${attr}="${key}"> puuttuu`);
  return html.replace(re, `<meta ${attr}="${key}" content="${esc(value)}" />`);
};

const removeMeta = (html: string, key: string) =>
  html.replace(new RegExp(`\\s*<meta\\s+property="${key}"[\\s\\S]*?/>`), "");

/** Kirjoita sivukohtaiset head-tiedot staattiseen HTML:ään. */
export const applySeo = (html: string, routePath: string, seo: RouteSeo): string => {
  const title = withBrand(seo.title);
  const url = canonicalUrl(routePath);
  let out = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${esc(title)}</title>\n    <link rel="canonical" href="${url}" />`,
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
      `</title>\n    <link rel="preload" as="image" href="${href}" imagesrcset="${imagesrcset}" imagesizes="${imagesizes}" type="image/webp" fetchpriority="high" />`,
    );
  }
  return out;
};

type Prerender = (url: string) => Promise<{ html: string; headScripts: string }>;

/**
 * Esirenderöi sivun sisällön #root-elementtiin. Jos esirenderöinti epäonnistuu,
 * palautetaan HTML muuttumattomana: sivu toimii silloin kuten ennenkin (selainrenderöinti).
 */
const injectPrerender = async (html: string, route: string, prerender: Prerender | null, failed: string[]) => {
  if (!prerender) return html;
  try {
    const { html: body, headScripts } = await prerender(route);
    if (!body.includes("<h1")) throw new Error("ei h1-otsikkoa");
    return html
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
      .replace("</head>", `${headScripts ? `    ${headScripts}\n  ` : ""}</head>`);
  } catch (error) {
    failed.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
    return html;
  }
};

export default function spaRoutes() {
  return {
    name: "vite-plugin-spa-routes",
    apply: "build" as const,
    async closeBundle() {
      const distDir = path.resolve("dist");
      const indexPath = path.join(distDir, "index.html");

      if (!fs.existsSync(indexPath)) return;

      const baseHtml = fs.readFileSync(indexPath, "utf-8");
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
      const homeSeo = getRouteSeo("/");
      if (homeSeo) {
        const homeHtml = await injectPrerender(applySeo(baseHtml, "/", homeSeo), "/", prerender, failed);
        if (!homeHtml.includes('<div id="root"></div>')) prerendered++;
        fs.writeFileSync(indexPath, homeHtml, "utf-8");
      }

      for (const route of routes) {
        const dir = path.join(distDir, route);
        const seo = getRouteSeo(route);
        fs.mkdirSync(dir, { recursive: true });
        // Vain kanoniset sivut esirenderöidään; vanhat ohjausreitit jäävät tyhjiksi kuoriksi.
        let html = seo ? applySeo(subpageHtml, route, seo) : subpageHtml;
        if (seo) {
          if (publicPaths.has(route)) html = await injectPrerender(html, route, prerender, failed);
          if (!html.includes('<div id="root"></div>')) prerendered++;
          withSeo++;
        }
        fs.writeFileSync(path.join(dir, "index.html"), html, "utf-8");
      }

      const notFoundHtml = subpageHtml
        .replace(/<title>[\s\S]*?<\/title>/, `<title>Sivua ei löytynyt | Pintanen</title>\n    <meta name="robots" content="noindex" />`);
      fs.writeFileSync(path.join(distDir, "404.html"), notFoundHtml, "utf-8");
      fs.writeFileSync(path.join(distDir, "sitemap.xml"), buildSitemapXml(), "utf-8");
      fs.writeFileSync(path.join(distDir, "image-sitemap.xml"), buildImageSitemapXml(), "utf-8");
      fs.writeFileSync(path.join(distDir, "llms.txt"), buildLlmsTxt(), "utf-8");

      await ssrServer?.close();
      process.env.NODE_ENV = previousNodeEnv;

      console.log(
        `[spa-routes] Generated ${routes.length} route files (${withSeo} with page-specific head, ${prerendered} prerendered), 404.html, sitemaps and llms.txt.`,
      );
      if (failed.length) console.warn(`[spa-routes] Esirenderöinti epäonnistui ${failed.length} reitillä:\n  ${failed.join("\n  ")}`);
    },
  };
}
