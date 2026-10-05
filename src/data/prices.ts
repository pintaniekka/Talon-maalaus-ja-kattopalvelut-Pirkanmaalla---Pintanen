/**
 * Hintatiedot yhdessä paikassa. Hintakortit, hintasivut, UKK, llms.txt ja schema lukevat luvut täältä,
 * jotta sama työ ei näy eri hintaisena eri sivuilla. Luvut ovat Eerikin vahvistamia (2.–4.10.2026).
 */
export interface PriceCard {
  size: string;
  label: string;
  duration: string;
  /** Normaalihinta ilman kotitalousvähennystä, € sis. alv. */
  normalMin: number;
  normalMax: number;
  /** "alk." -hinta kotitalousvähennyksen jälkeen. */
  afterFrom: number;
  featured: boolean;
}

/** 2850 -> "2 850" */
export const fmtNumber = (n: number): string => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
/** 2850 -> "2 850 €" */
export const fmtEur = (n: number): string => `${fmtNumber(n)} €`;
/** (2850, 7000) -> "2 850–7 000 €" */
export const fmtRange = (min: number, max: number): string => `${fmtNumber(min)}–${fmtNumber(max)} €`;
/** Hintakortin "Norm." -rivi: "2 850 € – 3 200 €" */
export const fmtCardRange = (card: PriceCard): string => `${fmtEur(card.normalMin)} – ${fmtEur(card.normalMax)}`;
/** Hintakortin iso luku: "alk. 2 050 €" */
export const fmtCardAfter = (card: PriceCard): string => `alk. ${fmtEur(card.afterFrom)}`;

export const pinnoitusPrices = {
  /** Yleinen hintahaarukka omakotitalon tiilikaton pinnoitukselle. Kortit ovat esimerkkejä tietyn kokoisista katoista. */
  general: { min: 2850, max: 7000 },
  perM2From: 15,
  cards: [
    { size: "150–180 m²", label: "Pieni/keskisuuri koti", duration: "2 työpäivää", normalMin: 2850, normalMax: 3200, afterFrom: 2050, featured: false },
    { size: "190–240 m²", label: "Yleisin kattokoko", duration: "2–3 työpäivää", normalMin: 3300, normalMax: 3700, afterFrom: 2380, featured: true },
    { size: "250–300 m²", label: "Suuri omakotitalo", duration: "2–4 työpäivää", normalMin: 3750, normalMax: 4880, afterFrom: 2700, featured: false },
  ] as PriceCard[],
  includes: [
    "Suunnittelu ja tarvittavat suojaustyöt",
    "Katon pesu",
    "Kasvustontorjunta-aine",
    "Rikkinäisten tiilien vaihto",
    "Pohjamaali",
    "Pintamaali",
    "Siivous",
  ],
};

export const maalausPrices = {
  general: { min: 3500, max: 11000 },
  cards: [
    { size: "1-kerroksinen omakotitalo", label: "Pieni tai keskisuuri koti", duration: "2–4 työpäivää", normalMin: 3500, normalMax: 6000, afterFrom: 2380, featured: false },
    { size: "1,5-kerroksinen talo", label: "Yleisin talon koko", duration: "3–5 työpäivää", normalMin: 5000, normalMax: 8000, afterFrom: 3400, featured: true },
    { size: "2-kerroksinen talo", label: "Suuret omakotitalot", duration: "4–8 työpäivää", normalMin: 7000, normalMax: 11000, afterFrom: 4760, featured: false },
  ] as PriceCard[],
  includes: ["Homepesu", "Tarvittavat pohjatyöt", "Suojaukset ja valmistelut", "Pohjamaalaus ja pintamaalaus", "Työmaan siivous"],
};

export const puhdistusPrices = {
  general: { min: 800, max: 2500 },
  examples: [
    { size: "Pieni omakotitalo", min: 800, max: 1200 },
    { size: "Keskikokoinen omakotitalo", min: 1200, max: 1800 },
    { size: "Suurempi kohde", min: 1800, max: 2500 },
  ],
};
