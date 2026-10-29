/** Toimintakutsujen kohteet (ToimintaKutsu, KutsuPalkit). Erillinen tiedosto, ettei komponenttitiedosto vie vakioita. */
export type KutsuPalvelu = "pinnoitus" | "maalaus" | "yleinen";

export const LASKURI_POLKU: Record<KutsuPalvelu, string> = {
  pinnoitus: "/hintalaskuri/?palvelu=pinnoitus",
  maalaus: "/hintalaskuri/?palvelu=maalaus",
  yleinen: "/hintalaskuri/",
};

export const KAYNTI_POLKU: Record<KutsuPalvelu, string> = {
  pinnoitus: "/tarjouspyynto/?palvelu=pinnoitus",
  maalaus: "/tarjouspyynto/?palvelu=maalaus",
  yleinen: "/tarjouspyynto/",
};
