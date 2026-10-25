import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { getCanonicalRoutes, legacyRoutes, legacyRedirects, buildRedirectsFile, getAllRoutePaths, buildSitemapXml, articlePath } from "@/data/routes";
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
    // Katon puhdistus on loppunut: puhdistussivut ovat vanhoja osoitteita, jotka ohjataan pinnoitussivuille.
    for (const c of puhdistusCities) {
      expect(canonicalPaths.has(`/katon-puhdistus-${c.slug}`)).toBe(false);
      expect(legacyRedirects).toContainEqual({ from: `/katon-puhdistus-${c.slug}`, to: `/tiilikaton-pinnoitus-${c.slug}` });
    }
    expect(legacyRedirects).toContainEqual({ from: "/katon-puhdistus-pirkanmaa", to: "/tiilikaton-pinnoitus-pirkanmaa" });
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

  it("vanhat osoitteet ohjataan kanonisiin sivuihin, eikä niille luoda kuoria", () => {
    const all = new Set(getAllRoutePaths());
    for (const { from, to } of legacyRedirects) {
      expect(canonicalPaths.has(to), `${from} → ${to} ei ole kanoninen sivu`).toBe(true);
      expect(from.endsWith("/")).toBe(false);
      expect(to.endsWith("/")).toBe(false);
      expect(all.has(from), `${from} saa yhä index.html-kuoren`).toBe(false);
    }
    expect(new Set(legacyRoutes).size).toBe(legacyRoutes.length);
    // Jokainen maalauskunta, ei vain kahdeksan vanhaa (auditointi osa 4, luku 5).
    for (const c of maalausCities) expect(legacyRoutes).toContain(`/talon-maalaus/${c.slug}`);
  });

  it("_redirects: jokaiselle vanhalle osoitteelle molemmat muodot, kohde kauttaviivalla, fallback viimeisenä", () => {
    const tail = fs.readFileSync(path.resolve(__dirname, "../../public/_redirects"), "utf-8");
    const file = buildRedirectsFile(tail);
    const rules = file.split("\n").filter((l) => l && !l.startsWith("#"));
    for (const { from, to } of legacyRedirects) {
      expect(rules).toContain(`${from} ${to}/ 301`);
      expect(rules).toContain(`${from}/ ${to}/ 301`);
    }
    for (const rule of rules) {
      const [source, target, status] = rule.split(/\s+/);
      if (source.startsWith("/images/")) continue; // kuvatiedostojen uudet nimet 26.10.2026: kohde on tiedosto
      if (status === "301") expect(target.endsWith("/"), rule).toBe(true);
    }
    expect(rules[rules.length - 1]).toBe("/* /index.html 200");
    // Käsin kirjoitetut 301-säännöt vain kuville; sivujen ohjaukset tulevat routes.ts:stä.
    const tail301 = tail.split("\n").filter((l) => /\s301\s*$/.test(l) && !l.startsWith("/images/"));
    expect(tail301).toEqual([]);
  });

  it("sitemap sisältää kaikki kanoniset reitit loppukauttaviivalla", () => {
    const xml = buildSitemapXml();
    for (const r of canonicalRoutes) {
      const loc = r.path === "/" ? "https://pintanen.fi/" : `https://pintanen.fi${r.path}/`;
      expect(xml).toContain(`<loc>${loc}</loc>`);
    }
    expect(xml).not.toContain("/alue/");
    expect(xml).not.toContain("/katon-puhdistus");
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

describe("sivukohtainen lastmod (sisällön tiiviste)", () => {
  it("buildSitemapXml käyttää build-aikana laskettua päivää, artikkeleilla uudempaa", () => {
    const xml = buildSitemapXml(new Date(), { "/meista": "2026-10-14", "/artikkelit/milloin-pinnoittaa-tiilikatto": "2020-01-01" });
    expect(xml).toMatch(/meista\/<\/loc>\s*<lastmod>2026-10-14<\/lastmod>/);
    // Artikkelin oma updatedAt/publishedAt on uudempi kuin tiivisteen päivä: se säilyy.
    expect(xml).not.toMatch(/milloin-pinnoittaa-tiilikatto\/<\/loc>\s*<lastmod>2020-01-01/);
  });

  it("lastmod.json on kelvollinen: polut ovat kanonisia, päivät YYYY-MM-DD ja korkeintaan tänään", () => {
    const manifest = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../data/lastmod.json"), "utf-8")) as Record<string, { hash: string; lastmod: string }>;
    const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Helsinki" }).format(new Date());
    for (const [route, entry] of Object.entries(manifest)) {
      expect(canonicalPaths.has(route), `${route} ei ole kanoninen reitti`).toBe(true);
      expect(entry.hash).toMatch(/^[0-9a-f]{16}$/);
      expect(entry.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(entry.lastmod <= today).toBe(true);
    }
  });

});
