import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { getCanonicalRoutes, buildLlmsTxt, buildLlmsFullTxt, htmlToPlainText, buildSitemapXml } from "@/data/routes";
import { getRouteSeo, withBrand, canonicalUrl, titleLength, TITLE_MIN, TITLE_MAX } from "@/data/seo";
import { applySeo, applyAreaServed } from "../../vite-plugin-spa-routes";
import { allCities } from "@/data/cityData";
import { articles } from "@/data/articles";
import { cityLocalFacts, getCityLocalFacts } from "@/data/cityLocalFacts";

const routes = getCanonicalRoutes().map((r) => r.path);

describe("sivukohtaiset SEO-tiedot (src/data/seo.ts)", () => {
  it("jokaisella kanonisella reitillä on title ja description", () => {
    const missing = routes.filter((p) => !getRouteSeo(p));
    expect(missing).toEqual([]);
  });

  // Myös ajastetut artikkelit: niiden title näkyy hakutuloksessa julkaisupäivänä ilman uutta buildia.
  const routesWithQueued = Array.from(new Set([...routes, ...articles.map((a) => `/artikkelit/${a.slug}`)]));

  // Raja lasketaan ilman " | Pintanen" -loppua (Eerik 26.10.2026); täytettä "– takuu" ei titleissä ole.
  it("titlet ovat uniikkeja ja 30–60 merkkiä ilman brändiä (Eerik 26.10.2026)", () => {
    expect([TITLE_MIN, TITLE_MAX]).toEqual([30, 60]);
    const titles = routes.map((p) => withBrand(getRouteSeo(p)!.title));
    expect(new Set(titles).size).toBe(titles.length);
    // Lyhin on Akaan aluesivu (34 merkkiä); Eerik 26.10.2026: aluesivuille ei lisäystä, alaraja 30 ilman poikkeuksia.
    const bad = routesWithQueued
      .map((p) => [p, titleLength(getRouteSeo(p)!.title)] as const)
      .filter(([, len]) => len < TITLE_MIN || len > TITLE_MAX);
    expect(bad).toEqual([]);
    expect(titleLength(getRouteSeo("/maalauspalvelut-akaa")!.title)).toBe(34);
    const filler = routesWithQueued.filter((p) => / – takuu$/.test(getRouteSeo(p)!.title));
    expect(filler).toEqual([]);
    expect(titleLength("Meistä | Pintanen")).toBe(6);
  });

  it("descriptionit ovat 120–160 merkkiä (auditointi 27.10.2026)", () => {
    const bad = routesWithQueued
      .map((p) => [p, getRouteSeo(p)!.description.length] as const)
      .filter(([, len]) => len < 120 || len > 160);
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

  it("llms-full.txt sisältää sivujen tekstin otsikoineen ilman HTML:ää", () => {
    const body =
      '<header>Valikko</header><main><h1 class="x">Tiilikaton pinnoitus <span class="sr-only">ruudunlukijalle</span>Tampere</h1>' +
      '<p>Hinta on 2&nbsp;850&#8211;7&#160;000&nbsp;&euro;.</p><ul><li>Pesu</li><li>Maalaus &amp; reunat</li></ul>' +
      '<svg><path d="M1"/></svg><script>var x = 1;</script><h2>Usein kysyttyä</h2><div>Vastaus</div></main><footer>Alatunniste</footer>';
    const txt = buildLlmsFullTxt([{ route: "/tiilikaton-pinnoitus-tampere", body }, { route: "/ei-ole", body }]);
    expect(txt.startsWith("# Pintanen Oy")).toBe(true);
    expect(txt).toContain("URL: https://pintanen.fi/tiilikaton-pinnoitus-tampere/");
    expect(txt).toContain("# Tiilikaton pinnoitus Tampere");
    expect(txt).toContain("Hinta on 2 850–7 000 €.");
    expect(txt).toContain("- Maalaus & reunat");
    expect(txt).toContain("## Usein kysyttyä");
    expect(txt).not.toMatch(/<[a-z]|var x|ruudunlukijalle|Valikko|Alatunniste|\/ei-ole/);
    expect(htmlToPlainText("<main><p>a</p>\n\n\n<p>b</p></main>")).toBe("a\n\nb");
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
    // Pinnoitus on ajankohtainen noin 15 vuoden iässä (Eerik 26.10.2026; aiemmin 10–15); lisäikä on jopa 15 vuotta.
    // Yritys on tamperelainen (Eerik 5.10. ja 11.10.2026): Oulua ei mainita.
    // Peltikattoa ei markkinoida, mutta UKK "Maalaatteko myös peltikattoja?" sallittiin (Eerik 26.10.2026), joten sanaa ei enää kielletä.
    const forbidden = [/tehopesu/i, /pohjuste/i, /\bprimer\b/i, /10[-–]15 vuotta lisää/, /jopa 15 000/, /10[-–]20 % uuden/, /jopa 80 %/, /alkaen 2 050/, /alle 2 100/, /(?<!alkaen 15 )€\/m²/, /emme tee/i, /emme vaihda/i, /sisämaalau/i, /Emme\. /, /kirvesmies/, /15[-–]20 vuotta vanha/, /15[-–]20 vuoden iässä/, /10[-–]15 vuotta vanha/, /10[-–]15 vuoden iässä/, /10[-–]15 vuodessa/, /Oulu/];
    const hits: string[] = [];
    for (const file of files) {
      if (skip.test(file)) continue;
      const source = fs.readFileSync(file, "utf-8");
      for (const re of forbidden) if (re.test(source)) hits.push(`${path.relative(srcDir, file)}: ${re}`);
    }
    expect(hits).toEqual([]);
  });
});

describe("paikkakuntien omat tekstit (paketti C, cityLocalFacts.ts)", () => {
  const sentences = (text: string) =>
    text
      .split(/(?<=[.?])\s+/)
      .map((s) => s.trim().replace(/\s+/g, " "))
      .filter((s) => s.length > 0);

  it("jokaisella paikkakunnalla on rakennusjärjestyksen sääntö, tilanne, UKK-vastaus ja lähde", () => {
    for (const city of allCities) {
      const facts = getCityLocalFacts(city.slug);
      expect(facts, city.slug).toBeDefined();
      expect(facts!.saanto.length, city.slug).toBeGreaterThan(80);
      expect(facts!.tilanne.length, city.slug).toBeGreaterThan(60);
      expect(facts!.ukk.length, city.slug).toBeGreaterThan(80);
      expect(facts!.lahde, city.slug).toMatch(/^https:\/\//);
    }
    expect(cityLocalFacts.map((c) => c.slug).sort()).toEqual(allCities.map((c) => c.slug).sort());
  });

  it("sama virke ei toistu paikkakunnalta toiselle", () => {
    const seen = new Map<string, string>();
    const toistot: string[] = [];
    for (const c of cityLocalFacts) {
      for (const field of [c.saanto, c.tilanne, c.ukk]) {
        for (const s of sentences(field)) {
          const key = s.toLowerCase();
          const owner = seen.get(key);
          if (owner && owner !== c.slug) toistot.push(`${owner} / ${c.slug}: ${s}`);
          else seen.set(key, c.slug);
        }
      }
    }
    expect(toistot).toEqual([]);
  });

  it("virkkeet ovat lyhyitä, ilman huutomerkkejä ja pitkää ajatusviivaa (kielisäännöt 25.10.2026)", () => {
    const viat: string[] = [];
    for (const c of cityLocalFacts) {
      for (const field of [c.saanto, c.tilanne, c.ukk]) {
        if (/[!—]/.test(field)) viat.push(`${c.slug}: huutomerkki tai pitkä ajatusviiva`);
        for (const s of sentences(field)) {
          if (s.split(" ").length > 20) viat.push(`${c.slug}: yli 20 sanaa: ${s}`);
        }
      }
    }
    expect(viat).toEqual([]);
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
