import { useState } from "react";

/**
 * Esikatselun ulkoasuvaihtoehdot (tarkastus 12.10.2026, luku 4). Osoitteen kyselyparametri
 * `?<key>=a|b|c|d` valitsee vaihtoehdon, ja valinta muistetaan sessionStoragessa, jotta se säilyy,
 * kun esikatselussa siirrytään sivulta toiselle. Palvelimella, virheellisellä arvolla ja ilman
 * tallennettua arvoa palautetaan oletus. Väliaikainen: kun Eerik on valinnut, muut vaihtoehdot
 * poistetaan ja tämä tiedosto niiden mukana.
 */
export type Variant = "a" | "b" | "c" | "d";

const VARIANTS: readonly string[] = ["a", "b", "c", "d"];

const isVariant = (value: unknown): value is Variant => typeof value === "string" && VARIANTS.includes(value);

const storageKey = (key: string) => `esikatselu:${key}`;

const readVariant = (key: string, fallback: Variant): Variant => {
  if (typeof window === "undefined") return fallback;

  let fromUrl: string | null = null;
  try {
    fromUrl = new URLSearchParams(window.location.search).get(key);
  } catch {
    fromUrl = null;
  }
  if (isVariant(fromUrl)) {
    try {
      window.sessionStorage.setItem(storageKey(key), fromUrl);
    } catch {
      /* ilman tallennustilaa valinta pätee vain tällä sivulla */
    }
    return fromUrl;
  }

  try {
    const stored = window.sessionStorage.getItem(storageKey(key));
    if (isVariant(stored)) return stored;
  } catch {
    /* ei tallennustilaa */
  }
  return fallback;
};

/** Lukee vaihtoehdon kerran, kun komponentti liitetään, ja pitää sen vakaana. */
export const usePreviewVariant = (key: string, fallback: Variant): Variant => {
  const [variant] = useState(() => readVariant(key, fallback));
  return variant;
};
