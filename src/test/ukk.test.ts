import { describe, it, expect } from "vitest";
import { maalausCities, pinnoitusCities } from "@/data/cityData";
import { getCityFaq } from "@/data/cityFaq";
import { maalausFAQ, pinnoitusFAQ } from "@/data/faqData";

/*
 * UKK-uudistus 30.10.2026 (laaja auditointi, luku 4): kaupunkisivulla yhdeksän kysymystä (31.10.2026 lisättiin synonyymikysymys), joista neljä on paikallisia,
 * palvelun pääsivulla enintään 15, eikä mikään kysymys ole samalla sivulla kahdesti. verify_dist.py tarkistaa saman
 * valmiista sivuista (myös että schema ja näkyvä lista vastaavat toisiaan).
 */
const sarjat = [
  ...pinnoitusCities.map((c) => ({ c, service: "pinnoitus" as const })),
  ...maalausCities.map((c) => ({ c, service: "maalaus" as const })),
];

describe("kaupunkisivujen UKK", () => {
  it("jokaisella kaupunkisivulla on yhdeksän (maalauksessa kymmenen) eri kysymystä, ja ainakin neljä mainitsee paikkakunnan", () => {
    for (const { c, service } of sarjat) {
      const faq = getCityFaq(c, service);
      const maara = service === "maalaus" ? 10 : 9;
      expect(faq.length, `${service} ${c.slug}`).toBe(maara);
      expect(new Set(faq.map((f) => f.question)).size, `${service} ${c.slug}`).toBe(maara);
      const paikalliset = faq.filter((f) => f.question.includes(c.cityIn) || f.question.includes(c.cityGenitive));
      expect(paikalliset.length, `${service} ${c.slug}`).toBeGreaterThanOrEqual(4);
    }
  });

  it("paikalliset vastaukset eroavat paikkakunnittain", () => {
    for (const service of ["pinnoitus", "maalaus"] as const) {
      const lista = service === "pinnoitus" ? pinnoitusCities : maalausCities;
      // Kysymykset 3, 5 ja 6 (paikkakunta, värin vaihto, naapurikunnat) ovat jokaisella sivulla omanlaisensa.
      for (const i of [2, 4, 5]) {
        const vastaukset = lista.map((c) => getCityFaq(c, service)[i].answer);
        expect(new Set(vastaukset).size, `${service} kysymys ${i + 1}`).toBe(lista.length);
      }
    }
  });

  it("muiden kuntien sivuilla Tampere mainitaan UKK:ssa enintään kerran", () => {
    for (const { c, service } of sarjat) {
      if (c.slug === "tampere") continue;
      const teksti = getCityFaq(c, service)
        .map((f) => `${f.question} ${f.answer.replace(/<[^>]+>/g, "")}`)
        .join(" ");
      expect((teksti.match(/Tampere/g) ?? []).length, `${service} ${c.slug}`).toBeLessThanOrEqual(1);
    }
  });
});

describe("palvelun pääsivujen UKK", () => {
  it("enintään 15 kysymystä, kukin kerran", () => {
    for (const faq of [pinnoitusFAQ, maalausFAQ]) {
      expect(faq.length).toBeLessThanOrEqual(15);
      expect(new Set(faq.map((f) => f.question)).size).toBe(faq.length);
    }
  });
});
