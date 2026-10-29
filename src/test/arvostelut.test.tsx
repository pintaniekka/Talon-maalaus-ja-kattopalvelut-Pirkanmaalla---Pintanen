import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ArvosteluNosto from "@/components/ArvosteluNosto";
import Kokemuksia from "@/pages/Kokemuksia";
import { nostotViistonReunalla, type RytmiLaji } from "@/components/Rytmi";
import { getCanonicalRoutes } from "@/data/routes";
import { allTestimonials, type Testimonial } from "@/data/testimonialsData";
import {
  ARVOSTELUTTOMAT,
  OMA_ARVOSTELULOHKO,
  arvosteluAnkkuri,
  arvosteluAnkkurit,
  arvosteluPolulle,
  arvosteluSivulle,
  onArvosteluton,
  valitseArvostelu,
} from "@/data/arvostelusijoitus";

/*
 * Arvostelunosto (29.10.2026): yksi Google-arvostelu jokaisella sivulla paitsi artikkeleissa ja tietosuojassa.
 * Teksti sanasta sanaan, valinta deterministinen polusta, ei koskaan viiston näyttämön reunalle.
 */

const t = (name: string, text: string, extra: Partial<Testimonial> = {}): Testimonial => ({ name, stars: 5, text, category: "katto", ...extra });

describe("valitseArvostelu", () => {
  const lista: Testimonial[] = [
    t("Pitkä Katto", "x".repeat(300)),
    t("Lyhyt Katto", "lyhyt katto"),
    t("Aihe Katto", "hinta piti, pitempi kuin lyhyt", { aiheet: ["hinta"] }),
    t("Kaupunki Katto", "tampereen katto, vielä pitempi teksti", { city: "tampere", aiheet: ["hinta"] }),
    t("Seinä", "seinä", { category: "seina", city: "tampere", aiheet: ["hinta"] }),
    t("Molemmat", "molemmat", { category: "molemmat" }),
  ];

  it("paikkakunta + luokka ensin, sitten aihe + luokka, sitten luokka", () => {
    expect(valitseArvostelu({ luokka: "katto", aihe: "hinta", kaupunki: "tampere" }, "/x", lista)?.name).toBe("Kaupunki Katto");
    // Ei paikkakuntaa: aihe + luokka, eli vain hinta-aiheiset kattoarvostelut ovat ehdolla.
    for (const polku of ["/x", "/y", "/z"]) {
      expect(["Aihe Katto", "Kaupunki Katto"]).toContain(valitseArvostelu({ luokka: "katto", aihe: "hinta", kaupunki: "nokia" }, polku, lista)?.name);
    }
    // Aihe, jota ei löydy: pudotaan luokkaan, mutta ei vieraaseen luokkaan.
    expect(valitseArvostelu({ luokka: "katto", aihe: "siisteys" }, "/x", lista)?.name).not.toBe("Seinä");
    // Luokka "seina" ei saa kattoarvostelua; "molemmat" kelpaa molempiin.
    expect(["Seinä", "Molemmat"]).toContain(valitseArvostelu({ luokka: "seina" }, "/x", lista)?.name);
    expect(valitseArvostelu({ luokka: "katto", nimi: "Pitkä Katto" }, "/x", lista)?.name).toBe("Pitkä Katto");
  });

  it("lyhin teksti ensin: pitkä arvostelu ei ole ehdolla, kun lyhyempiä riittää", () => {
    const polut = ["/a", "/b", "/c", "/d", "/e", "/f", "/g", "/h"];
    const nimet = new Set(polut.map((p) => valitseArvostelu({ luokka: "katto" }, p, lista)?.name));
    expect(nimet.has("Pitkä Katto")).toBe(false);
  });

  it("on deterministinen polusta eikä riipu listan järjestyksestä", () => {
    const a = valitseArvostelu({ luokka: "katto" }, "/tiilikaton-pinnoitus-nokia", lista);
    const b = valitseArvostelu({ luokka: "katto" }, "/tiilikaton-pinnoitus-nokia", [...lista].reverse());
    expect(a).toEqual(b);
    expect(arvosteluPolulle("/tiilikaton-pinnoitus-nokia")).toEqual(arvosteluPolulle("/tiilikaton-pinnoitus-nokia/"));
  });

  it("palauttaa undefined, kun luokassa ei ole arvosteluja", () => {
    expect(valitseArvostelu({ luokka: "yleinen" }, "/x", [])).toBeUndefined();
  });
});

describe("kattavuus: jokaisella reitillä on arvostelu", () => {
  // Poikkeukset perusteluineen ovat src/data/arvostelusijoitus.ts:ssä (ARVOSTELUTTOMAT, OMA_ARVOSTELULOHKO).
  it("poikkeuslista on perusteltu ja tunnettu", () => {
    expect(Object.keys(ARVOSTELUTTOMAT).sort()).toEqual(["/artikkelit", "/tietosuoja"]);
    expect(Object.keys(OMA_ARVOSTELULOHKO).sort()).toEqual(["/", "/hintalaskuri", "/kokemuksia", "/tarjouspyynto"]);
    for (const syy of [...Object.values(ARVOSTELUTTOMAT), ...Object.values(OMA_ARVOSTELULOHKO)]) expect(syy.length).toBeGreaterThan(10);
  });

  it("jokainen muu kanoninen reitti on sijoitustaulukossa tai sillä on oma arvostelulohko", () => {
    const puuttuu = getCanonicalRoutes()
      .map((r) => r.path)
      .filter((p) => !onArvosteluton(p) && !(p in OMA_ARVOSTELULOHKO) && !arvosteluSivulle(p));
    expect(puuttuu).toEqual([]);
  });

  it("jokaiselle taulukon sivulle löytyy arvostelu", () => {
    for (const r of getCanonicalRoutes()) {
      if (onArvosteluton(r.path) || r.path in OMA_ARVOSTELULOHKO) continue;
      expect(arvosteluPolulle(r.path), r.path).toBeDefined();
    }
  });

  it("artikkelisivut ovat arvosteluttomia", () => {
    expect(onArvosteluton("/artikkelit")).toBe(true);
    expect(onArvosteluton("/artikkelit/milloin-pinnoittaa-tiilikatto")).toBe(true);
    expect(onArvosteluton("/artikkelit-x")).toBe(false);
  });
});

describe("ArvosteluNosto", () => {
  it("renderöi arvostelun tekstin muuttumattomana, ilman CTA:ta ja ilman Review-schemaa", () => {
    const polku = "/tiilikaton-pinnoitus-pirkanmaa";
    const arvostelu = arvosteluPolulle(polku)!;
    const html = renderToStaticMarkup(
      <MemoryRouter>
        <ArvosteluNosto polku={polku} />
      </MemoryRouter>,
    );
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
    expect(html).toContain(esc(arvostelu.text));
    expect(html).toContain(`${esc(arvostelu.name)} · Google-arvostelu`);
    expect(html).toContain("line-clamp-3");
    // SSR: "Lue koko arvostelu" on piilossa, kunnes selain mittaa katkeamisen.
    expect(html).not.toContain("Lue koko arvostelu");
    expect(html).not.toContain("application/ld+json");
    expect(html).not.toMatch(/Pyydä|Laske hinta/);
  });

  it("ei renderöi mitään sivulle, jota ei ole taulukossa", () => {
    expect(renderToStaticMarkup(<MemoryRouter><ArvosteluNosto polku="/tietosuoja" /></MemoryRouter>)).toBe("");
  });
});

describe("arvostelujen ankkurit", () => {
  it("jokaisella arvostelulla on yksilöllinen ankkuri", () => {
    const ids = allTestimonials.map(arvosteluAnkkuri);
    expect(new Set(ids).size).toBe(allTestimonials.length);
    expect(arvosteluAnkkurit.size).toBe(allTestimonials.length);
    for (const id of ids) expect(id).toMatch(/^arvostelu-[a-z0-9-]+$/);
  });

  it("/kokemuksia antaa jokaisen ankkurin täsmälleen kerran", () => {
    const html = renderToStaticMarkup(
      <HelmetProvider>
        <MemoryRouter initialEntries={["/kokemuksia/"]}>
          <Kokemuksia />
        </MemoryRouter>
      </HelmetProvider>,
    );
    const ids = [...html.matchAll(/ id="(arvostelu-[^"]+)"/g)].map((m) => m[1]);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.sort()).toEqual(allTestimonials.map(arvosteluAnkkuri).sort());
  });
});

describe("sijoitus ei osu viiston näyttämön reunalle", () => {
  it("Rytmi tunnistaa noston näyttämön vierestä, myös ohitettavien yli", () => {
    const l = (s: string) => s.split(" ") as RytmiLaji[];
    expect(nostotViistonReunalla(l("oma tausta nosto tausta sininen"))).toEqual([]);
    expect(nostotViistonReunalla(l("oma tausta nosto sininen"))).toEqual([2]);
    expect(nostotViistonReunalla(l("oma navy ohita nosto tausta"))).toEqual([3]);
  });

  // Näyttämöt: merkitse(..., "sininen" | "navy") -komponentit. Sivun lähdekoodista luetaan Rytmin lapset
  // (6 välilyönnin sisennys) ja tarkistetaan noston naapurit.
  const nayttamot = new Set([
    "PinnoitusWhyNow", "MaalausCitySigns", "MaalausProblemSection", "MiksiValitaPintanen", "MiksiPintanen",
    "PinnoitusEntrepreneur", "MaalausEntrepreneur", "HintaTekijatLohko", "KotitalousVahennysNayttamo",
    "Kuvat", "Merkit", "MeistaLuvut",
  ]);
  const sivut = fs.readdirSync(path.resolve(__dirname, "../pages")).filter((f) => f.endsWith(".tsx"));
  const nostolliset = sivut.filter((f) => fs.readFileSync(path.resolve(__dirname, "../pages", f), "utf-8").includes("<ArvosteluNosto"));

  it("nostoja on sivuilla", () => {
    expect(nostolliset.length).toBeGreaterThanOrEqual(14);
  });

  for (const f of nostolliset) {
    it(`${f}: noston naapurit ovat tavallisia lohkoja`, () => {
      const src = fs.readFileSync(path.resolve(__dirname, "../pages", f), "utf-8");
      // Rytmin suorat lapset: rivit, jotka alkavat täsmälleen kuudella välilyönnillä ja "<Nimi" tai "{cond && <Nimi".
      const lapset = [...src.matchAll(/^ {6}(?:\{[^\n]*?&& )?<([A-Za-z]+)\b/gm)].map((m) => m[1]);
      const i = lapset.indexOf("ArvosteluNosto");
      expect(i, "ArvosteluNosto Rytmin lapsena").toBeGreaterThan(0);
      const ennen = lapset.slice(0, i).reverse().find((n) => !["SEO", "ServiceSchema", "Helmet"].includes(n));
      const jalkeen = lapset.slice(i + 1).find((n) => !["SEO", "ServiceSchema", "Helmet"].includes(n));
      expect(ennen && nayttamot.has(ennen), `${f}: edellinen lohko ${ennen} on näyttämö`).toBe(false);
      expect(jalkeen && nayttamot.has(jalkeen), `${f}: seuraava lohko ${jalkeen} on näyttämö`).toBe(false);
    });
  }
});
