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
 *  5. Generoi dist/sitemap.xml:n ja dist/llms.txt:n samasta reittilistasta.
 */
import fs from "fs";
import path from "path";
import { getAllRoutePaths, buildSitemapXml, buildLlmsTxt } from "./src/data/routes";
import { getRouteSeo, withBrand, canonicalUrl, type RouteSeo } from "./src/data/seo";

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
  return out;
};

export default function spaRoutes() {
  return {
    name: "vite-plugin-spa-routes",
    closeBundle() {
      const distDir = path.resolve("dist");
      const indexPath = path.join(distDir, "index.html");

      if (!fs.existsSync(indexPath)) return;

      const baseHtml = fs.readFileSync(indexPath, "utf-8");
      const subpageHtml = baseHtml.replace(HOME_ONLY_TAG, "");
      const routes = getAllRoutePaths();
      let withSeo = 0;

      // Etusivu: canonical ja og:url mukaan staattiseen HTML:ään.
      const homeSeo = getRouteSeo("/");
      if (homeSeo) fs.writeFileSync(indexPath, applySeo(baseHtml, "/", homeSeo), "utf-8");

      for (const route of routes) {
        const dir = path.join(distDir, route);
        const seo = getRouteSeo(route);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), seo ? applySeo(subpageHtml, route, seo) : subpageHtml, "utf-8");
        if (seo) withSeo++;
      }

      const notFoundHtml = subpageHtml
        .replace(/<title>[\s\S]*?<\/title>/, `<title>Sivua ei löytynyt | Pintanen</title>\n    <meta name="robots" content="noindex" />`);
      fs.writeFileSync(path.join(distDir, "404.html"), notFoundHtml, "utf-8");
      fs.writeFileSync(path.join(distDir, "sitemap.xml"), buildSitemapXml(), "utf-8");
      fs.writeFileSync(path.join(distDir, "llms.txt"), buildLlmsTxt(), "utf-8");

      console.log(
        `[spa-routes] Generated ${routes.length} route files (${withSeo} with page-specific head), 404.html, sitemap.xml and llms.txt.`,
      );
    },
  };
}
