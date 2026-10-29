import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

/*
 * Toimintakutsujen välit (Eki 29.10.2026): mobiilin alapalkki poistettiin, joten etusivulla sekä pinnoitus-,
 * maalaus- ja hintasivuilla on nappi hintalaskuriin tai ilmaiseen käyntiin vähintään joka toisen lohkon jälkeen.
 * Testi lukee sivun lähdekoodin Rytmi-kääreen lohkot järjestyksessä ja tarkistaa, ettei kolmea lohkoa ilman
 * nappia ole peräkkäin. Nappi = linkki hintalaskuriin, kuntotarkastukseen, arviokäyntiin tai tarjouspyyntöön,
 * tai lohko, joka itse on lomake tai laskuri.
 */

const ROOT = path.resolve(__dirname, "../..");
const lue = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");

/** Sivut, joita sääntö koskee. Meistä, yhteystiedot, artikkelit ja tietosuoja eivät kuulu (Eki). */
const SIVUT = [
  "Index",
  "KattopalvelutPinnoitus",
  "TalonMaalaus",
  "KattopalvelutPinnoitusCity",
  "TalonMaalausCity",
  "HinnatTiilikalonPinnoitus",
  "HinnatTalonMaalaus",
  "Harjatiiviste",
  "Kuntotarkastus",
  "Taloyhtiot",
  "Kotitalousvahennys",
  "Meista",
  "Kokemuksia",
  "Referenssit",
  "ToimintaAlueet",
  "Hintalaskuri",
  "ServiceAreaPage",
];

/** Lohkot, jotka eivät ole näkyviä sisältölohkoja (metatiedot, nosto, loppupalkki). */
const OHITA = new Set(["SEO", "ServiceSchema", "Helmet", "ArvosteluNosto", "ToimintaAlueetBanner"]);

/** Lohkot, jotka ovat itse lomake tai laskuri. */
/** PageHero: ensisijainen nappi (`primary`) vie aina laskuriin tai tarjouspyyntöön. */
const OMA_NAPPI = new Set(["PageHero", "ServiceContactSection", "ChatPriceCalculator", "PriceWizard", "CalculatorCta", "ToimintaKutsu", "KayntiPalkki", "LaskuriPalkki"]);

const NAPPI = /to[=:]\s*\{?["'`]\/(hintalaskuri|tarjouspyynto|ilmainen-katon-kuntotarkastus|ilmainen-julkisivun-kuntoarvio)|href="#hintalaskuri"|openQuoteDrawer\(|\bcta=\{/;

const MAX_ILMAN = 2;

/** Ratkaisee komponentin lähdetiedoston sivun importeista (oletus-, nimetty- ja lazy-import). */
const lahdetiedosto = (sivu: string, nimi: string): string | undefined => {
  const re = new RegExp(
    `import\\s+(?:${nimi}|\\{[^}]*\\b${nimi}\\b[^}]*\\})\\s+from\\s+["']([^"']+)["']|const\\s+${nimi}\\s*=\\s*lazy(?:WithRetry)?\\(\\(\\)\\s*=>\\s*import\\(["']([^"']+)["']\\)`,
  );
  const m = sivu.match(re);
  const mod = m?.[1] ?? m?.[2];
  if (!mod) return undefined;
  const base = mod.replace(/^@\//, "src/");
  for (const p of [`${base}.tsx`, `${base}.ts`, `${base}/index.tsx`, `${base}/index.ts`]) {
    if (fs.existsSync(path.join(ROOT, p))) return p;
  }
  return undefined;
};

type Lohko = { nimi: string; nappi: boolean };

/** Rytmi-kääreen päätason lohkot lähdekoodista sisennyksen perusteella. */
export const lohkot = (tiedosto: string): Lohko[] => {
  const src = lue(tiedosto);
  const rivit = src.split("\n");
  const alku = rivit.findIndex((r) => /^\s*<Rytmi>/.test(r));
  const loppu = rivit.findIndex((r, i) => i > alku && /^\s*<\/Rytmi>/.test(r));
  if (alku < 0 || loppu < 0) throw new Error(`${tiedosto}: Rytmi-käärettä ei löydy`);
  // Lapset ovat joko kääreen sisennyksellä tai sitä syvemmällä: ensimmäinen lapsi kertoo tason.
  const eka = rivit.slice(alku + 1, loppu).find((r) => /^\s*(?:\{[^<]*&&\s*)?</.test(r));
  const sisennys = (eka ?? rivit[alku]).match(/^\s*/)![0].length;
  const tulos: Lohko[] = [];
  for (let i = alku + 1; i < loppu; i++) {
    let r = rivit[i];
    if (r.match(/^\s*/)![0].length !== sisennys) continue;
    // Ehdollinen lohko monella rivillä: `{ehto && (` ja lohko seuraavalla rivillä, loppu `)}` samalla tasolla.
    let ehdollinen = false;
    if (/^\s*\{.*&&\s*\($/.test(r)) {
      ehdollinen = true;
      i++;
      r = rivit[i];
    }
    const m = r.match(/^\s*(?:\{[^<]*&&\s*)?<([A-Za-z][A-Za-z0-9.]*)/);
    if (!m) continue;
    let nimi = m[1];
    if (OHITA.has(nimi)) continue;
    if (ehdollinen) {
      const osat: string[] = [];
      let j = i;
      for (; j < loppu; j++) {
        osat.push(rivit[j]);
        if (rivit[j].match(/^\s*/)![0].length === sisennys && /^\s*\)\}/.test(rivit[j])) break;
      }
      tulos.push({ nimi: `${nimi}@${i + 1}`, nappi: NAPPI.test(osat.join("\n")) });
      i = j;
      continue;
    }
    if (nimi === "Suspense") {
      // Laiskasti ladattu lohko: Suspensen sisällä oleva komponentti on itse lohko.
      const lapsi = rivit.slice(i + 1, loppu).find((x) => /^\s*<[A-Z]/.test(x))?.match(/<([A-Za-z][A-Za-z0-9.]*)/)?.[1];
      if (!lapsi) continue;
      nimi = lapsi;
    }
    if (/^[a-z]/.test(nimi) && nimi !== "section" && nimi !== "div") continue;
    if (nimi === "section" || nimi === "div") {
      // Sivun oma lohko: kerätään sen teksti sulkevaan tagiin asti samalla sisennyksellä.
      let j = i;
      const osat: string[] = [r];
      if (!/\/>\s*$/.test(r)) {
        for (j = i + 1; j < loppu; j++) {
          osat.push(rivit[j]);
          if (rivit[j].match(/^\s*/)![0].length === sisennys && new RegExp(`^\\s*</${nimi}>`).test(rivit[j])) break;
        }
      }
      tulos.push({ nimi: `${nimi}@${i + 1}`, nappi: NAPPI.test(osat.join("\n")) });
      i = j;
      continue;
    }
    if (OMA_NAPPI.has(nimi)) {
      tulos.push({ nimi, nappi: true });
      continue;
    }
    // Komponentin omat propsit (esim. ProcessList cta={{ to: "/tarjouspyynto/" }}): elementin teksti sulkuun asti.
    const propsit: string[] = [];
    for (let j = i; j < loppu; j++) {
      propsit.push(rivit[j]);
      if (/\/>\s*$/.test(rivit[j]) || (j > i && rivit[j].match(/^\s*/)![0].length === sisennys)) break;
    }
    if (NAPPI.test(propsit.join("\n"))) {
      tulos.push({ nimi, nappi: true });
      continue;
    }
    const lahde = lahdetiedosto(src, nimi);
    if (lahde) {
      tulos.push({ nimi, nappi: NAPPI.test(lue(lahde)) });
      continue;
    }
    // Sivun oma komponentti: sen määrittely tiedoston alusta seuraavaan ylätason määrittelyyn asti.
    const maarittely = src.match(new RegExp(`^(?:const|function)\\s+${nimi}\\b[\\s\\S]*?(?=^(?:const|function|export)\\s)`, "m"));
    if (!maarittely) throw new Error(`${tiedosto}: komponentin ${nimi} lähdettä ei löydy importeista eikä tiedostosta`);
    tulos.push({ nimi, nappi: NAPPI.test(maarittely[0]) });
  }
  return tulos;
};

/** Pisin peräkkäinen jono lohkoja ilman nappia. */
export const pisinValiIlmanNappia = (l: Lohko[]): { pituus: number; jono: string[] } => {
  let paras = { pituus: 0, jono: [] as string[] };
  let jono: string[] = [];
  for (const b of l) {
    if (b.nappi) jono = [];
    else {
      jono.push(b.nimi);
      if (jono.length > paras.pituus) paras = { pituus: jono.length, jono: [...jono] };
    }
  }
  return paras;
};

describe("kutsupalkit: yksi käyntipalkki ja enintään yksi laskuripalkki per sivu (Eki 29.10.2026)", () => {
  for (const sivu of SIVUT) {
    it(sivu, () => {
      // Aluesivut ovat lyhyitä (hero, palvelukortit, paikallinen teksti, yhteydenotto): ei palkkeja.
      if (sivu === "ServiceAreaPage") return;
      const l = lohkot(`src/pages/${sivu}.tsx`);
      const kaynti = l.filter((b) => b.nimi === "KayntiPalkki").length;
      const laskuri = l.filter((b) => ["LaskuriPalkki", "CalculatorCta", "ChatPriceCalculator"].includes(b.nimi)).length;
      // Kuntotarkastussivuilla vain kevyet napit (Eki 29.10.2026): sivu on itse käynnin esittely.
      if (sivu === "Kuntotarkastus") {
        expect(kaynti + laskuri, `${sivu}: palkkeja ${kaynti + laskuri}`).toBe(0);
        return;
      }
      expect(kaynti, `${sivu}: käyntipalkkeja ${kaynti}`).toBe(1);
      // Taloyhtiöillä ei ole laskuria (laskuri on omakotitaloille); muilla on yksi.
      // Hintalaskurisivu on itse laskuri (PriceWizard oman section-lohkon sisällä).
      expect(laskuri, `${sivu}: laskuripalkkeja ${laskuri}`).toBe(sivu === "Taloyhtiot" || sivu === "Hintalaskuri" ? 0 : 1);
    });
  }
});

describe("toimintakutsut: nappi enintään kahden lohkon välein", () => {
  for (const sivu of SIVUT) {
    it(sivu, () => {
      const l = lohkot(`src/pages/${sivu}.tsx`);
      expect(l.length).toBeGreaterThan(2);
      const vali = pisinValiIlmanNappia(l);
      expect(vali.pituus, `${sivu}: ${vali.jono.join(" → ")} ilman nappia; lohkot: ${l.map((b) => `${b.nimi}${b.nappi ? "*" : ""}`).join(", ")}`).toBeLessThanOrEqual(MAX_ILMAN);
    });
  }
});
