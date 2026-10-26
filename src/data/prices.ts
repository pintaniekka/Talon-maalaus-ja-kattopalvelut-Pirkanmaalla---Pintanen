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
  /**
   * "alk." -hinta kotitalousvähennyksen jälkeen: normalMin − min(0,8 × normalMin × 40 %, 2 100 €), pyöristettynä
   * kymmeneen euroon. Omavastuuta ei vähennetä (henkilökohtainen, kerran vuodessa). Sama kaava on hintalaskurin
   * rivillä (hintaVahennyksenJalkeen, src/components/vahennys/vahennysData.ts). Eerik 26.10.2026; vero.fi 40 % / 2 100 €
   * vuosina 2026–2027 (docs/lahteet-kotitalousvahennys-2026-10-27.md).
   */
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
/** Hintakortin iso luku: "alk. 1 940 €" */
export const fmtCardAfter = (card: PriceCard): string => `alk. ${fmtEur(card.afterFrom)}`;

export const pinnoitusPrices = {
  /** Yleinen hintahaarukka omakotitalon tiilikaton pinnoitukselle. Kortit ovat esimerkkejä tietyn kokoisista katoista. */
  general: { min: 2850, max: 7000 },
  cards: [
    { size: "150–180 m²", label: "Pieni/keskisuuri koti", duration: "2 työpäivää", normalMin: 2850, normalMax: 3200, afterFrom: 1940, featured: false },
    { size: "190–240 m²", label: "Yleisin kattokoko", duration: "2–3 työpäivää", normalMin: 3300, normalMax: 3700, afterFrom: 2240, featured: true },
    { size: "250–300 m²", label: "Suuri omakotitalo", duration: "2–4 työpäivää", normalMin: 3750, normalMax: 4880, afterFrom: 2550, featured: false },
  ] as PriceCard[],
  includes: [
    "Katon pesu painepesulla",
    "Rikkinäisten tiilien vaihto uusiin",
    "Pohjamaali ruiskulla",
    "Pintamaali ruiskulla",
    "Ahtaat paikat telalla tai käsin",
    "Siivous",
  ],
};

export const maalausPrices = {
  general: { min: 3500, max: 11000 },
  cards: [
    // Eerik 26.10.2026: haarukat 3 500–5 000, 5 000–7 000 ja 7 000–11 000 €.
    { size: "1-kerroksinen omakotitalo", label: "Pieni tai keskisuuri koti", duration: "2–4 työpäivää", normalMin: 3500, normalMax: 5000, afterFrom: 2380, featured: false },
    { size: "1,5-kerroksinen talo", label: "Yleisin talon koko", duration: "3–5 työpäivää", normalMin: 5000, normalMax: 7000, afterFrom: 3400, featured: true },
    { size: "2-kerroksinen talo", label: "Suuret omakotitalot", duration: "4–8 työpäivää", normalMin: 7000, normalMax: 11000, afterFrom: 4900, featured: false },
  ] as PriceCard[],
  includes: ["Homepesu", "Irtoavan maalin kaavinta", "Terassien ja ympäristön suojaus", "Pohjamaali paljaisiin kohtiin", "Pintamaali pensselillä", "Työmaan siivous"],
};

export const puhdistusPrices = {
  general: { min: 800, max: 2500 },
  examples: [
    { size: "Pieni omakotitalo", min: 800, max: 1200 },
    { size: "Keskikokoinen omakotitalo", min: 1200, max: 1800 },
    { size: "Suurempi kohde", min: 1800, max: 2500 },
  ],
};
