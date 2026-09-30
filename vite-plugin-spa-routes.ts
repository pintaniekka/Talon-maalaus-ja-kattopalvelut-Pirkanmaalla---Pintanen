/**
 * Vite plugin (build-aikainen):
 *  1. Kopioi dist/index.html jokaisen reitin hakemistoon, jotta staattinen hosting
 *     palauttaa 200 OK (ei 404) myös suoraan avatuille alasivuille.
 *  2. Poistaa alasivujen kopioista etusivun hero-kuvan preloadin (data-home-only).
 *  3. Kirjoittaa dist/404.html = index.html, jotta tuntemattomat polut renderöivät
 *     SPA:n oman 404-sivun oikealla 404-statuksella.
 *  4. Generoi dist/sitemap.xml samasta reittilistasta (src/data/routes.ts).
 */
import fs from "fs";
import path from "path";
import { getAllRoutePaths, buildSitemapXml } from "./src/data/routes";

const HOME_ONLY_TAG = /\s*<link\s[^>]*data-home-only[^>]*>/g;

export default function spaRoutes() {
  return {
    name: "vite-plugin-spa-routes",
    closeBundle() {
      const distDir = path.resolve("dist");
      const indexPath = path.join(distDir, "index.html");

      if (!fs.existsSync(indexPath)) return;

      const homeHtml = fs.readFileSync(indexPath, "utf-8");
      const subpageHtml = homeHtml.replace(HOME_ONLY_TAG, "");
      const routes = getAllRoutePaths();

      for (const route of routes) {
        const dir = path.join(distDir, route);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(path.join(dir, "index.html"), subpageHtml, "utf-8");
      }

      fs.writeFileSync(path.join(distDir, "404.html"), subpageHtml, "utf-8");
      fs.writeFileSync(path.join(distDir, "sitemap.xml"), buildSitemapXml(), "utf-8");

      console.log(`[spa-routes] Generated ${routes.length} route files, 404.html and sitemap.xml.`);
    },
  };
}
