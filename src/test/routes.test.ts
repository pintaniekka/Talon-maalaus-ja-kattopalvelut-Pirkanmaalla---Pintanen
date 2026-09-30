import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { canonicalRoutes, legacyRoutes, getAllRoutePaths, buildSitemapXml } from "@/data/routes";
import { cities, allCities, maalausCities } from "@/data/cityData";

const appSource = fs.readFileSync(path.resolve(__dirname, "../App.tsx"), "utf-8");
const canonicalPaths = new Set(canonicalRoutes.map((r) => r.path));

describe("reittilista (src/data/routes.ts) vs App.tsx", () => {
  it("jokainen App.tsx:n staattinen reitti on kanonisten tai vanhojen reittien listassa", () => {
    const literalPaths = [...appSource.matchAll(/path="([^"]+)"/g)].map((m) => m[1]).filter((p) => p !== "*");
    const known = new Set([...canonicalPaths, ...legacyRoutes]);
    const missing = literalPaths.filter((p) => !known.has(p));
    expect(missing).toEqual([]);
  });

  it("kaupunkisivut on johdettu samasta cityData-lähteestä", () => {
    for (const c of allCities) expect(canonicalPaths.has(`/maalauspalvelut-${c.slug}`)).toBe(true);
    for (const c of cities) {
      expect(canonicalPaths.has(`/tiilikaton-pinnoitus-${c.slug}`)).toBe(true);
      expect(canonicalPaths.has(`/katon-puhdistus-${c.slug}`)).toBe(true);
    }
    for (const c of maalausCities) expect(canonicalPaths.has(`/talon-maalaus-${c.slug}`)).toBe(true);
  });

  it("reiteissä ei ole duplikaatteja eikä loppukauttaviivoja", () => {
    const all = getAllRoutePaths();
    expect(new Set(all).size).toBe(all.length);
    for (const p of all) {
      expect(p.startsWith("/")).toBe(true);
      expect(p.endsWith("/")).toBe(false);
    }
  });

  it("sitemap sisältää kaikki kanoniset reitit loppukauttaviivalla", () => {
    const xml = buildSitemapXml();
    for (const r of canonicalRoutes) {
      const loc = r.path === "/" ? "https://pintanen.fi/" : `https://pintanen.fi${r.path}/`;
      expect(xml).toContain(`<loc>${loc}</loc>`);
    }
    expect(xml).not.toContain("/alue/");
    expect(xml).not.toContain("/hinnat/");
  });
});
