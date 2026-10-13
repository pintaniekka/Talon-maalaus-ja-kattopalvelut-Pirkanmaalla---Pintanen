import { useState } from "react";

/**
 * Esikatselun ulkoasuvaihtoehdot (tarkastus 12.10.2026, luku 4). Osoitteen kyselyparametri
 * `?<key>=a|b|c|d` valitsee vaihtoehdon, ja valinta muistetaan sessionStoragessa, jotta se säilyy,
 * kun esikatselussa siirrytään sivulta toiselle. Palvelimella, virheellisellä arvolla ja ilman
 * tallennettua arvoa palautetaan oletus. Väliaikainen: kun Eerik on valinnut, muut vaihtoehdot
 * poistetaan ja tämä tiedosto niiden mukana.
 */
export type Variant = "a" | "b" | "c" | "d";

const VARIANTS: readonly Variant[] = ["a", "b", "c", "d"];

const storageKey = (key: string) => `esikatselu:${key}`;

const readVariant = <V extends string>(key: string, fallback: V, allowed: readonly V[]): V => {
  if (typeof window === "undefined") return fallback;
  const isAllowed = (value: unknown): value is V => typeof value === "string" && (allowed as readonly string[]).includes(value);

  let fromUrl: string | null = null;
  try {
    fromUrl = new URLSearchParams(window.location.search).get(key);
  } catch {
    fromUrl = null;
  }
  if (isAllowed(fromUrl)) {
    try {
      window.sessionStorage.setItem(storageKey(key), fromUrl);
    } catch {
      /* ilman tallennustilaa valinta pätee vain tällä sivulla */
    }
    return fromUrl;
  }

  try {
    const stored = window.sessionStorage.getItem(storageKey(key));
    if (isAllowed(stored)) return stored;
  } catch {
    /* ei tallennustilaa */
  }
  return fallback;
};

/**
 * Lukee vaihtoehdon kerran, kun komponentti liitetään, ja pitää sen vakaana.
 * Oletuksena sallitut arvot ovat a–d; osio, jolla on enemmän vaihtoehtoja, antaa oman listansa.
 */
export function usePreviewVariant(key: string, fallback: Variant): Variant;
export function usePreviewVariant<V extends string>(key: string, fallback: V, allowed: readonly V[]): V;
export function usePreviewVariant<V extends string>(key: string, fallback: V, allowed: readonly V[] = VARIANTS as readonly V[]): V {
  const [variant] = useState(() => readVariant(key, fallback, allowed));
  return variant;
}
