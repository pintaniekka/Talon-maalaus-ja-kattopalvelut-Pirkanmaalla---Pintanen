import { getStorageUrl } from "@/lib/storage";
import { PINNOITUS_HINTA, MAALAUS_HINTA } from "@/data/tyovaiheet";
import { TAKUU, YHTEYSTIEDOT } from "@/data/company";

/**
 * Etusivun Palvelumme-osion yhteiset faktat vaihtoehdoille A–D (tarkastus 12.10.2026, luku 4).
 * Hinnat tulevat src/data/prices.ts:stä (tyovaiheet.ts:n kautta), takuut ja tekijät src/data/company.ts:stä.
 * Katon puhdistus on jätetty pois: palvelu on loppunut.
 */

/** Kestot samoin kuin "Lyhyesti"-laatikoissa (src/data/tyovaiheet.ts) ja hintasivujen UKK:ssa. */
export const KESTO = { pinnoitus: "2–3 päivää", maalaus: "3–7 päivää" } as const;

/** Osion johdanto (T6; Eerik 13.10.2026: "Pirkanmaalla ja lähikunnissa" on selvempi kuin "tunnin säteellä"). */
export const PALVELUT_INTRO =
  "Eerik pinnoittaa tiilikatot ja Eemil maalaa talot Pirkanmaalla ja lähikunnissa. Arviokäynti on ilmainen.";

/** Katto ja seinät samalla kertaa = edullisempi pakettihinta (UKK:n pohja). */
export const PAKETTI_KYSYMYS = "Katto ja seinät samalla kertaa?";
export const PAKETTI_VASTAUS = "Saat edullisemman pakettihinnan.";

export const LINKIT = {
  hintalaskuri: "/hintalaskuri/",
  tarjouspyynto: "/tarjouspyynto/",
} as const;

export interface Tekija {
  name: string;
  first: string;
  role: string;
  image: string;
  /** Kortin pillerin teksti: "Eerik tekee työn" / "Eemil ja maalauspari" (Eerik 14.10.2026). */
  pilleri: string;
}

export const tekijat: Record<"eerik" | "eemil", Tekija> = {
  eerik: {
    name: YHTEYSTIEDOT.eerik.name,
    first: YHTEYSTIEDOT.eerik.first,
    role: YHTEYSTIEDOT.eerik.role,
    image: getStorageUrl("Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp"),
    pilleri: `${YHTEYSTIEDOT.eerik.first} tekee työn`,
  },
  eemil: {
    name: YHTEYSTIEDOT.eemil.name,
    first: YHTEYSTIEDOT.eemil.first,
    role: YHTEYSTIEDOT.eemil.role,
    image: getStorageUrl("Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp"),
    pilleri: `${YHTEYSTIEDOT.eemil.first} ja maalauspari`,
  },
};

export type PalveluKey = "pinnoitus" | "maalaus";

export interface Palvelu {
  key: PalveluKey;
  title: string;
  href: string;
  imageBase: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  /** CSS object-position: mihin kohtaan pystykuva rajataan kortin vaakamuodossa. */
  imagePosition?: string;
  /** "2 850–7 000 €" */
  hinta: string;
  /** "5 vuotta" */
  takuu: string;
  /** "5 v" */
  takuuLyhyt: string;
  /** "2–3 päivää" */
  kesto: string;
  /** "2–3 pv" */
  kestoLyhyt: string;
  tekija: Tekija;
}

const lyhytTakuu = (takuu: string) => takuu.replace(/ vuotta$/, " v");
const lyhytKesto = (kesto: string) => kesto.replace(/ päivää$/, " pv");

export const palvelut: Palvelu[] = [
  {
    key: "pinnoitus",
    title: "Tiilikaton pinnoitus",
    href: "/tiilikaton-pinnoitus-pirkanmaa/",
    // Eerik 14.10.2026: pinnoituskorttiin punainen katto.
    imageBase: "tiilikaton-pinnoitus-vihrea-talo-punainen-tiilikatto-jalkeen",
    imageAlt: "Vihreä puutalo, jonka punainen tiilikatto on juuri pinnoitettu",
    imageWidth: 1200,
    imageHeight: 900,
    hinta: PINNOITUS_HINTA,
    takuu: TAKUU.pinnoitus,
    takuuLyhyt: lyhytTakuu(TAKUU.pinnoitus),
    kesto: KESTO.pinnoitus,
    kestoLyhyt: lyhytKesto(KESTO.pinnoitus),
    tekija: tekijat.eerik,
  },
  {
    key: "maalaus",
    title: "Talon maalaus",
    href: "/talon-maalaus-pirkanmaa/",
    imageBase: "talon-maalaus-ja-tiilikaton-pinnoitus-tampere-puutalo-jalkeen",
    imageAlt: "Vastamaalattu vaalea puutalo Tampereella",
    imageWidth: 1200,
    imageHeight: 900,
    hinta: MAALAUS_HINTA,
    takuu: TAKUU.maalaus,
    takuuLyhyt: lyhytTakuu(TAKUU.maalaus),
    kesto: KESTO.maalaus,
    kestoLyhyt: lyhytKesto(KESTO.maalaus),
    tekija: tekijat.eemil,
  },
];

/** Nappien luokat: sama keltainen kuin heron "Laske hinta", pienempänä. */
export const BTN_YELLOW =
  "inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-xl bg-paint-yellow hover:bg-paint-yellow-hover text-paint-yellow-foreground font-heading font-extrabold text-[15px] transition-colors";
export const BTN_OUTLINE =
  "inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-xl border-2 border-accent-ink text-accent-ink font-heading font-extrabold text-[15px] hover:bg-accent-light transition-colors whitespace-nowrap";
export const LINK_ARROW =
  "inline-flex items-center gap-1.5 min-h-[44px] font-bold text-[15px] text-accent-ink hover:underline underline-offset-4";
