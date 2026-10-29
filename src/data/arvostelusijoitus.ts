import { allCities, maalausCities, pinnoitusCities } from "./cityData";
import { allTestimonials, matchesCategory, type ArvosteluAihe, type Testimonial, type TestimonialCategory } from "./testimonialsData";

/**
 * Leijuva arvostelunosto (ArvosteluNosto, 29.10.2026): jokaisella sivulla on vähintään yksi Google-arvostelu,
 * paitsi artikkelisivuilla ja tietosuojasivulla. Tämä tiedosto on sijoituksen yksi paikka:
 *  - `ARVOSTELUTTOMAT`: reitit, joilla ei ole arvostelua, perusteluineen.
 *  - `OMA_ARVOSTELULOHKO`: sivut, joilla on jo oma arvostelulohko eikä nostoa lisätä.
 *  - `arvosteluSivulle(polku)`: muiden sivujen luokka, aihe ja paikkakunta, joista `valitseArvostelu` valitsee
 *    arvostelun. Sivu itse päättää, mihin väliin nosto tulee (ks. taulukko alla); routes.test.ts varmistaa,
 *    että jokainen reitti on jossakin näistä kolmesta.
 *
 * Sijoitus sivulla (heti sen lohkon jälkeen, jonka väitettä arvostelu tukee; ei koskaan viiston näyttämön reunalle):
 *  - palvelusivut (pinnoitus, maalaus, myös kaupunkisivut): työvaiheiden jälkeen, ennen hintoja/sanastoa
 *  - hintasivut: hintataulukon (PriceExamplesSection) jälkeen; "Mistä hinta syntyy" on näyttämö
 *  - aluesivut: paikallisen tekstin jälkeen, ennen yhteydenottoa
 *  - kuntotarkastussivut, harjatiiviste ja taloyhtiöt: prosessin kuvauksen (ProcessList) jälkeen
 *  - Meistä: tekijäesittelyn jälkeen
 *  - muut (kotitalousvähennys, toiminta-alueet, yhteystiedot, referenssit): ennen yhteydenottoa
 */

export interface ArvosteluSivu {
  /** "yleinen" = kaikki arvostelut kelpaavat; muuten matchesCategory. */
  luokka: TestimonialCategory;
  aihe?: ArvosteluAihe;
  kaupunki?: string;
  /** Nimetty arvostelu, jos sivun aihe on niin tarkka, että yksi arvostelu sopii parhaiten (harjatiiviste). */
  nimi?: string;
}

/** Reitit ilman arvostelua ja miksi. Polut ilman loppukauttaviivaa; "/artikkelit" kattaa myös artikkelisivut. */
export const ARVOSTELUTTOMAT: Record<string, string> = {
  "/artikkelit": "Artikkelit ovat tekstipainotteisia: ei nostoja, ei lomakkeita (CLAUDE.md, Articles).",
  "/tietosuoja": "Pelkkä lakisivu.",
};

/** Sivut, joilla on jo oma arvostelulohko: nostoa ei lisätä. */
export const OMA_ARVOSTELULOHKO: Record<string, string> = {
  "/": "ReviewHighlights ja TestimonialsMarquee.",
  "/kokemuksia": "Kaikki arvostelut ReviewCard-kortteina.",
  "/hintalaskuri": "Kaksi arvostelua laskurin alla hero-osiossa (getRoofAndWallTestimonials).",
  "/tarjouspyynto": "Kaksi arvostelua lomakkeen alla hero-osiossa (getRoofAndWallTestimonials).",
};

export const onArvosteluton = (polku: string): boolean =>
  Object.keys(ARVOSTELUTTOMAT).some((p) => polku === p || polku.startsWith(`${p}/`));

const staattiset: Record<string, ArvosteluSivu> = {
  "/tiilikaton-pinnoitus-pirkanmaa": { luokka: "katto", aihe: "lopputulos" },
  "/talon-maalaus-pirkanmaa": { luokka: "seina", aihe: "lopputulos" },
  "/tiilikaton-pinnoitus-hinta-pirkanmaa": { luokka: "katto", aihe: "hinta" },
  "/talon-maalaus-hinta-pirkanmaa": { luokka: "seina", aihe: "hinta" },
  "/ilmainen-katon-kuntotarkastus": { luokka: "katto", aihe: "viestinta" },
  "/ilmainen-julkisivun-kuntoarvio": { luokka: "seina", aihe: "viestinta" },
  // Teppo Annilan arvostelu mainitsee harjatiivisteen asennuksen sanasta sanaan.
  "/harjatiivisteen-asennus": { luokka: "katto", aihe: "lopputulos", nimi: "Teppo Annila" },
  "/taloyhtiot": { luokka: "yleinen", aihe: "viestinta" },
  "/kotitalousvahennys": { luokka: "yleinen", aihe: "hinta" },
  "/toiminta-alueet": { luokka: "yleinen", aihe: "aikataulu" },
  "/referenssit": { luokka: "yleinen", aihe: "lopputulos" },
  "/meista": { luokka: "yleinen", aihe: "viestinta" },
  "/yhteystiedot": { luokka: "yleinen", aihe: "viestinta" },
};

/** Sivun arvosteluasetus polusta (ilman loppukauttaviivaa), tai undefined jos sivulla ei ole nostoa. */
export const arvosteluSivulle = (polku: string): ArvosteluSivu | undefined => {
  const p = polku.replace(/\/+$/, "") || "/";
  if (staattiset[p]) return staattiset[p];
  for (const c of pinnoitusCities) if (p === `/tiilikaton-pinnoitus-${c.slug}`) return { luokka: "katto", aihe: "lopputulos", kaupunki: c.slug };
  for (const c of maalausCities) if (p === `/talon-maalaus-${c.slug}`) return { luokka: "seina", aihe: "lopputulos", kaupunki: c.slug };
  for (const c of allCities) if (p === `/maalauspalvelut-${c.slug}`) return { luokka: "yleinen", aihe: "lopputulos", kaupunki: c.slug };
  return undefined;
};

const kuuluuLuokkaan = (t: Testimonial, luokka: TestimonialCategory) => luokka === "yleinen" || matchesCategory(t, luokka);

/** Deterministinen luku polusta (ei Math.random: esirenderöity HTML ja selain näyttävät saman). */
export const polunLuku = (polku: string): number => {
  let h = 0;
  for (let i = 0; i < polku.length; i++) h = (h * 31 + polku.charCodeAt(i)) % 1_000_003;
  return h;
};

/** Montako lyhintä arvostelua on ehdolla parhaalla tasolla; polku valitsee niistä yhden. */
export const EHDOKKAITA = 4;

/**
 * Valitsee yhden arvostelun sivulle. Tasot järjestyksessä: 0) nimetty arvostelu, 1) paikkakunta + luokka,
 * 2) aihe + luokka, 3) luokka. Ensimmäiseltä tasolta, jolla on arvosteluja, otetaan lyhimmät EHDOKKAITA
 * tekstiä (lyhyt lainaus mahtuu korttiin), ja polku valitsee niistä yhden deterministisesti.
 */
export const valitseArvostelu = (sivu: ArvosteluSivu, polku: string, lista: Testimonial[] = allTestimonials): Testimonial | undefined => {
  const luokassa = lista.filter((t) => kuuluuLuokkaan(t, sivu.luokka));
  const tasot: Testimonial[][] = [
    sivu.nimi ? luokassa.filter((t) => t.name === sivu.nimi) : [],
    sivu.kaupunki ? luokassa.filter((t) => t.city === sivu.kaupunki) : [],
    sivu.aihe ? luokassa.filter((t) => t.aiheet?.includes(sivu.aihe as ArvosteluAihe)) : [],
    luokassa,
  ];
  const taso = tasot.find((t) => t.length > 0);
  if (!taso) return undefined;
  const lyhimmat = [...taso].sort((a, b) => a.text.length - b.text.length || a.name.localeCompare(b.name, "fi")).slice(0, EHDOKKAITA);
  return lyhimmat[polunLuku(polku) % lyhimmat.length];
};

/** Arvostelu sivulle polun perusteella, tai undefined jos sivulla ei ole nostoa. */
export const arvosteluPolulle = (polku: string): Testimonial | undefined => {
  const sivu = arvosteluSivulle(polku);
  return sivu ? valitseArvostelu(sivu, polku.replace(/\/+$/, "") || "/") : undefined;
};

/** Ankkuri /kokemuksia-sivulla: "arvostelu-<nimi-slug>", kaksoisnimillä juokseva numero. */
const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const arvosteluAnkkurit: Map<Testimonial, string> = (() => {
  const m = new Map<Testimonial, string>();
  const kaytetyt = new Map<string, number>();
  for (const t of allTestimonials) {
    const perus = `arvostelu-${slug(t.name)}`;
    const n = (kaytetyt.get(perus) ?? 0) + 1;
    kaytetyt.set(perus, n);
    m.set(t, n === 1 ? perus : `${perus}-${n}`);
  }
  return m;
})();

export const arvosteluAnkkuri = (t: Testimonial): string => arvosteluAnkkurit.get(t) ?? `arvostelu-${slug(t.name)}`;
