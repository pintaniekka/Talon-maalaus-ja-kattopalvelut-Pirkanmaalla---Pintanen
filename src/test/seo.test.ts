import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { getCanonicalRoutes, buildLlmsTxt, buildSitemapXml } from "@/data/routes";
import { getRouteSeo, withBrand, canonicalUrl } from "@/data/seo";
import { applySeo, applyAreaServed } from "../../vite-plugin-spa-routes";
import { allCities } from "@/data/cityData";

const routes = getCanonicalRoutes().map((r) => r.path);

describe("sivukohtaiset SEO-tiedot (src/data/seo.ts)", () => {
  it("jokaisella kanonisella reitillä on title ja description", () => {
    const missing = routes.filter((p) => !getRouteSeo(p));
    expect(missing).toEqual([]);
  });

  it("titlet ovat uniikkeja ja mahtuvat hakutulokseen (enintään 70 merkkiä)", () => {
    const titles = routes.map((p) => withBrand(getRouteSeo(p)!.title));
    expect(new Set(titles).size).toBe(titles.length);
    const tooLong = routes.filter((p) => withBrand(getRouteSeo(p)!.title).length > 70);
    expect(tooLong).toEqual([]);
  });

  it("descriptionit ovat 50–175 merkkiä", () => {
    const bad = routes
      .map((p) => [p, getRouteSeo(p)!.description.length] as const)
      .filter(([, len]) => len < 50 || len > 175);
    expect(bad).toEqual([]);
  });

  it("withBrand ei tuplaa brändiä ja canonical päättyy kauttaviivaan", () => {
    expect(withBrand("Meistä")).toBe("Meistä | Pintanen");
    expect(withBrand("Talon maalaus | Pintanen")).toBe("Talon maalaus | Pintanen");
    expect(canonicalUrl("/meista")).toBe("https://pintanen.fi/meista/");
    expect(canonicalUrl("/")).toBe("https://pintanen.fi/");
  });
});

describe("staattinen head (vite-plugin-spa-routes)", () => {
  const indexHtml = fs.readFileSync(path.resolve(__dirname, "../../index.html"), "utf-8");

  it("applySeo kirjoittaa sivukohtaiset tagit index.html:ään ilman duplikaatteja", () => {
    const html = applySeo(indexHtml, "/meista", { title: 'Testi "otsikko"', description: "Kuvaus & muuta" });
    expect(html).toContain("<title>Testi &quot;otsikko&quot; | Pintanen</title>");
    expect(html).toContain('<link rel="canonical" href="https://pintanen.fi/meista/" />');
    expect(html).toContain('<meta name="description" content="Kuvaus &amp; muuta" />');
    expect(html).toContain('<meta property="og:url" content="https://pintanen.fi/meista/" />');
    expect(html.match(/name="description"/g)).toHaveLength(1);
    expect(html.match(/<title>/g)).toHaveLength(1);
  });

  it("index.html:ssä ei ole keywords-metaa ja jakokuva on vaakakuva (V24, V25)", () => {
    expect(indexHtml).not.toContain('name="keywords"');
    expect(indexHtml).toContain('<meta property="og:image:width" content="1500" />');
    expect(indexHtml).toContain('<meta property="og:image:height" content="1125" />');
  });

  it("areaServed sisältää kaikki toiminta-alueen paikkakunnat (V16)", () => {
    const html = applyAreaServed(indexHtml);
    for (const c of allCities) expect(html).toContain(`"name": "${c.name}"`);
    const schema = html.match(/<script type="application\/ld\+json">\s*(\{[\s\S]*?)\s*<\/script>/)![1];
    expect(JSON.parse(schema).areaServed).toHaveLength(allCities.length + 2);
  });

  it("artikkelin kuva korvaa oletuskuvan ja sen mitat poistetaan", () => {
    const html = applySeo(indexHtml, "/artikkelit/x", {
      title: "A",
      description: "B".repeat(60),
      image: "https://example.com/kuva.webp",
      type: "article",
    });
    expect(html).toContain('<meta property="og:image" content="https://example.com/kuva.webp" />');
    expect(html).toContain('<meta property="og:type" content="article" />');
    expect(html).not.toContain("og:image:width");
  });
});

describe("llms.txt ja sitemap", () => {
  it("llms.txt listaa palvelut, hinnat, työvaiheet ja julkaistut artikkelit", () => {
    const txt = buildLlmsTxt();
    expect(txt.startsWith("# Pintanen Oy")).toBe(true);
    expect(txt).toContain("https://pintanen.fi/tiilikaton-pinnoitus-pirkanmaa/");
    expect(txt).toContain("## Näin tiilikaton pinnoitus tehdään");
    expect(txt).toContain("## Artikkelit");
    expect(txt).toContain("https://pintanen.fi/tiilikaton-pinnoitus-tampere/");
    // Säännöt: ei neliöhintaa, ei "alkaen"-hintaa, ei prosenttisäästöväitettä
    expect(txt).not.toMatch(/€\/m²|alkaen \d|alk\. |jopa \d+ %/);
  });

  it("jokaisella sivulla on sitemapissa lastmod (P5)", () => {
    const xml = buildSitemapXml();
    expect(xml).toMatch(/artikkelit\/milloin-pinnoittaa-tiilikatto\/<\/loc>\s*<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
    expect((xml.match(/<lastmod>/g) ?? []).length).toBe((xml.match(/<loc>/g) ?? []).length);
  });
});

describe("sanasto ja luvut (auditointi, korjaus 3)", () => {
  it("lähdekoodin teksteissä ei ole kiellettyjä sanoja eikä ristiriitaisia lukuja", () => {
    const srcDir = path.resolve(__dirname, "..");
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== "test") walk(full);
        } else if (/\.tsx?$/.test(entry.name)) files.push(full);
      }
    };
    walk(srcDir);
    // Puhdistussivut jäävät ennalleen (palvelu poistuu), joten ne jätetään tarkistuksen ulkopuolelle.
    const skip = /Puhdistus|puhdistusFAQ|puhdistus-itse|HinnatKatonPuhdistus/;
    const forbidden = [/tehopesu/i, /pohjuste/i, /\bprimer\b/i, /10[-–]15 vuotta lisää/, /jopa 15 000/, /10[-–]20 % uuden/, /jopa 80 %/, /alkaen 2 050/, /alle 2 100/, /€\/m²/, /emme tee/i, /emme vaihda/i, /peltikat/i, /sisämaalau/i, /Emme\. /, /kirvesmies/];
    const hits: string[] = [];
    for (const file of files) {
      if (skip.test(file)) continue;
      const source = fs.readFileSync(file, "utf-8");
      for (const re of forbidden) if (re.test(source)) hits.push(`${path.relative(srcDir, file)}: ${re}`);
    }
    expect(hits).toEqual([]);
  });
});

describe("kuvasitemap", () => {
  it("sisältää etusivun ja jokaisen pääkuvallisen sivun, ei vanhoja osoitteita", async () => {
    const { buildImageSitemapXml } = await import("@/data/routes");
    const xml = buildImageSitemapXml();
    expect(xml).toContain("<loc>https://pintanen.fi/</loc>");
    expect(xml).toContain("<loc>https://pintanen.fi/tiilikaton-pinnoitus-pirkanmaa/</loc>");
    expect(xml).not.toContain("/kattopalvelut/");
    expect(xml).not.toContain("%20");
  });
});

describe("responsiiviset kuvat", () => {
  it("jokaisella koodissa käytetyllä kuvalla on kaikki srcsetin koot kansiossa public/images", async () => {
    const { getResponsiveSrcSet } = await import("@/lib/storage");
    const imagesDir = path.resolve(__dirname, "../../public/images");
    const baseNames = fs
      .readdirSync(path.join(imagesDir, "Pictures-1200"))
      .filter((f) => f.endsWith("-1200.webp"))
      .map((f) => f.replace(/-1200\.webp$/, ""));
    expect(baseNames.length).toBeGreaterThan(30);
    const missing: string[] = [];
    for (const base of baseNames) {
      for (const entry of getResponsiveSrcSet(base).split(", ")) {
        const file = decodeURI(entry.split(" ")[0]).replace(/^\/images\//, "");
        if (!fs.existsSync(path.join(imagesDir, file))) missing.push(file);
      }
    }
    expect(missing).toEqual([]);
  });

  it("kuvaosoitteet ovat sivuston omia eivätkä osoita ulkoiseen tallennuspalveluun", async () => {
    const { getStorageUrl, getResponsiveSrc, toAbsoluteUrl } = await import("@/lib/storage");
    expect(getStorageUrl("Icons/Tiilikatto icon.svg")).toBe("/images/Icons/Tiilikatto%20icon.svg");
    expect(getResponsiveSrc("x")).toBe("/images/Pictures-1200/x-1200.webp");
    expect(toAbsoluteUrl("/images/a.webp")).toBe("https://pintanen.fi/images/a.webp");
  });
});
