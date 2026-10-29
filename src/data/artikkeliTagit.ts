import type { ArticleCategory } from "./articles";

/**
 * Artikkelien lyhyet aihetagit listauksiin (artikkelilistaus ja etusivun "Uusimmat artikkelit", 29.10.2026).
 * categoryLabels (articles.ts) pysyy artikkelisivuilla ja schemassa; tämä on vain korttien lyhyt muoto.
 * Ei komponentti-importteja.
 */
export const TAGI: Record<ArticleCategory, string> = { katto: "KATTO", maalaus: "SEINÄ", raha: "HINTA" };

/** Suodatinnappien tekstit listaussivulla. */
export const SUODATIN_NIMI: Record<ArticleCategory, string> = { katto: "Katot", maalaus: "Seinät", raha: "Hinta ja verotus" };

/** Pastellipillerit valkoisilla korteilla (teksti vähintään 4,5:1). Eerikin ehdotuksen värit. */
export const PASTELLI: Record<ArticleCategory, string> = {
  katto: "bg-[#dcecfa] text-[#0a4f8f]",
  maalaus: "bg-[#fff1b8] text-[#6b5200]",
  raha: "bg-[#e3e8ef] text-[#3d4a5e]",
};
