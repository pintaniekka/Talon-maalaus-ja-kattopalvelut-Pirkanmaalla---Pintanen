import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { getCanonicalRoutes, legacyRoutes, getAllRoutePaths, buildSitemapXml, articlePath } from "@/data/routes";
import { allCities, maalausCities, pinnoitusCities, puhdistusCities } from "@/data/cityData";
import { articles, isPublished, getPublishedArticles } from "@/data/articles";
import { authors } from "@/data/authors";

const appSource = fs.readFileSync(path.resolve(__dirname, "../App.tsx"), "utf-8");
const canonicalRoutes = getCanonicalRoutes();
const canonicalPaths = new Set(canonicalRoutes.map((r) => r.path));

describe("reittilista (src/data/routes.ts) vs App.tsx", () => {
  it("jokainen App.tsx:n staattinen reitti on kanonisten tai vanhojen reittien listassa", () => {
    const literalPaths = [...appSource.matchAll(/path="([^"]+)"/g)]
      .map((m) => m[1])
      // "*" = 404, ":param" = dynaaminen reitti (artikkelit katetaan alla erikseen)
      .filter((p) => p !== "*" && !p.includes(":"));
    const known = new Set([...canonicalPaths, ...legacyRoutes]);
    const missing = literalPaths.filter((p) => !known.has(p));
    expect(missing).toEqual([]);
  });

  it("kaupunkisivut on johdettu samasta cityData-lähteestä", () => {
    for (const c of allCities) expect(canonicalPaths.has(`/maalauspalvelut-${c.slug}`)).toBe(true);
    for (const c of pinnoitusCities) expect(canonicalPaths.has(`/tiilikaton-pinnoitus-${c.slug}`)).toBe(true);
    for (const c of puhdistusCities) expect(canonicalPaths.has(`/katon-puhdistus-${c.slug}`)).toBe(true);
    // Puhdistussivuja ei tehdä uusille paikkakunnille.
    expect(puhdistusCities.length).toBe(8);
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

describe("artikkelit", () => {
  const contentDir = path.resolve(__dirname, "../content/articles");
  const registry = fs.readFileSync(path.join(contentDir, "index.ts"), "utf-8");

  it("jokaisella artikkelilla on sisältötiedosto, rekisteröinti ja kelvolliset metatiedot", () => {
    const slugs = new Set<string>();
    for (const a of articles) {
      expect(slugs.has(a.slug), `duplikaattislug ${a.slug}`).toBe(false);
      slugs.add(a.slug);
      expect(a.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(a.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      if (a.updatedAt) expect(a.updatedAt >= a.publishedAt).toBe(true);
      expect(authors[a.author], `tuntematon kirjoittaja ${a.author}`).toBeDefined();
      expect(a.description.length).toBeGreaterThanOrEqual(110);
      expect(a.description.length).toBeLessThanOrEqual(165);
      expect(fs.existsSync(path.join(contentDir, `${a.slug}.tsx`)), `puuttuu ${a.slug}.tsx`).toBe(true);
      expect(registry).toContain(`"${a.slug}"`);
    }
  });

  it("jokaiselle artikkelille luodaan reittihakemisto, myös ajastetuille", () => {
    const all = new Set(getAllRoutePaths());
    for (const a of articles) expect(all.has(articlePath(a.slug))).toBe(true);
  });

  it("ajastettu artikkeli ei näy listassa eikä sitemapissa ennen julkaisupäivää", () => {
    const first = articles[0];
    const dayBefore = new Date(`${first.publishedAt}T12:00:00Z`);
    dayBefore.setUTCDate(dayBefore.getUTCDate() - 2);
    const dayAfter = new Date(`${first.publishedAt}T12:00:00Z`);
    dayAfter.setUTCDate(dayAfter.getUTCDate() + 1);

    expect(isPublished(first, dayBefore)).toBe(false);
    expect(isPublished(first, dayAfter)).toBe(true);
    expect(getPublishedArticles(dayBefore).some((a) => a.slug === first.slug)).toBe(false);
    expect(buildSitemapXml(dayBefore)).not.toContain(articlePath(first.slug));
    expect(buildSitemapXml(dayAfter)).toContain(articlePath(first.slug));
  });
});

describe("sisäiset linkit", () => {
  it("kovakoodatut sisäiset linkit päättyvät kauttaviivaan kuten canonical ja sivukartta (V14)", () => {
    const srcDir = path.resolve(__dirname, "..");
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (!["test", "ui", "data"].includes(entry.name)) walk(full);
        } else if (/\.tsx$/.test(entry.name) && entry.name !== "App.tsx") files.push(full);
      }
    };
    walk(srcDir);
    const slashless: string[] = [];
    for (const file of files) {
      const source = fs.readFileSync(file, "utf-8");
      // to="/polku" ja href="/polku" (+ kyselyosa): polun pitää päättyä kauttaviivaan ennen "?"-merkkiä
      for (const m of source.matchAll(/\b(?:to|href)(?:=|:\s*)"(\/[a-z0-9/-]*[a-z0-9])(\?[^"]*)?"/g)) {
        slashless.push(`${path.relative(srcDir, file)}: ${m[1]}${m[2] ?? ""}`);
      }
      // to={`/polku-${slug}`} ilman loppukauttaviivaa
      for (const m of source.matchAll(/\b(?:to|href)=\{`(\/[^`?]*[^/`?])(\?[^`]*)?`\}/g)) {
        slashless.push(`${path.relative(srcDir, file)}: ${m[1]}`);
      }
    }
    expect(slashless).toEqual([]);
  });


  it("lähdekoodin kovakoodatut sisäiset linkit osoittavat olemassa oleviin reitteihin", () => {
    const known = new Set([...getAllRoutePaths(), "/"]);
    const srcDir = path.resolve(__dirname, "..");
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== "test" && entry.name !== "ui") walk(full);
        } else if (/\.tsx?$/.test(entry.name)) files.push(full);
      }
    };
    walk(srcDir);
    const broken: string[] = [];
    for (const file of files) {
      const source = fs.readFileSync(file, "utf-8");
      // to="/polku" ja href="/polku" ilman muuttujia
      for (const m of source.matchAll(/\b(?:to|href)="(\/[a-z0-9/-]*)"/g)) {
        const target = m[1].replace(/\/+$/, "") || "/";
        if (!known.has(target)) broken.push(`${path.relative(srcDir, file)}: ${m[1]}`);
      }
    }
    expect(broken).toEqual([]);
  });
});
