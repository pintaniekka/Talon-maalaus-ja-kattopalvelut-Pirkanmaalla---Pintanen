/**
 * Työvaiheet ja "Lyhyesti"-nauhan faktat yhdessä paikassa. Samat tekstit näkyvät palvelusivuilla,
 * kaupunkisivuilla ja llms.txt:ssä, joten työ kuvataan kaikkialla samalla tavalla.
 * Sanasto: katto = pesu painepesulla, rikkinäiset tiilet uusiin, maalaus ruiskulla kahteen kertaan
 * (pohjamaali + pintamaali), ahtaat paikat telalla tai käsin. Talo = homepesu, kaavinta,
 * pohjamaali paljaisiin kohtiin, pintamaali pensselillä.
 * Ei komponentti-importteja: luetaan myös build-aikana (routes.ts).
 */
import { pinnoitusPrices, maalausPrices, fmtRange } from "./prices";
import { KATON_MAALAUS_LAUSE } from "./company";

export interface Tyovaihe {
  title: string;
  text: string;
}

export const PINNOITUS_HINTA = fmtRange(pinnoitusPrices.general.min, pinnoitusPrices.general.max);
export const MAALAUS_HINTA = fmtRange(maalausPrices.general.min, maalausPrices.general.max);

export const pinnoitusTyovaiheet: Tyovaihe[] = [
  {
    title: "Ilmainen kuntotarkastus",
    text: "Tulemme katsomaan katon. Tarkistamme katon, aluskatteen ja ympäristön. Saat kirjallisen tarjouksen, jossa on kiinteä hinta.",
  },
  {
    title: "Suojaus",
    text: "Suojaamme esimerkiksi aurinkopaneelit, lasiterassit ja valokatteet. Kourujen syöksyihin tulee suodatinkankaat.",
  },
  {
    title: "Pesu painepesulla",
    text: "Pesemme katon painepesulla ja huuhtelemme sadevesikourut. Lika ja sammal lähtevät pois.",
  },
  {
    title: "Rikkinäisten tiilien vaihto",
    text: "Vaihdamme rikkinäiset tiilet uusiin. Ennen maalausta katto saa kuivua.",
  },
  {
    title: "Maalaus ruiskulla kahteen kertaan",
    text: `${KATON_MAALAUS_LAUSE} Käytämme Nowocoatin kattomaaleja.`,
  },
  {
    title: "Lopputarkastus ja takuu",
    text: "Kierrämme katon yhdessä sinun kanssasi ja siivoamme jälkemme. Saat työlle 5 vuoden kirjallisen takuun.",
  },
];

export const maalausTyovaiheet: Tyovaihe[] = [
  {
    title: "Ilmainen arviokäynti ja tarjous",
    text: "Eemil tulee katsomaan talon. Hän käy seinät läpi ja katsoo, mitä maalia niissä on ja paljonko pohjatöitä tarvitaan. Saat kirjallisen tarjouksen, jossa on kiinteä hinta.",
  },
  {
    title: "Suojaus",
    text: "Suojaamme terassit ja ympäristön ennen työtä.",
  },
  {
    title: "Homepesu",
    text: "Pesemme seinät homepesuaineella ja harjoilla. Lika ja home lähtevät pois.",
  },
  {
    title: "Kaavinta",
    text: "Kaavimme irtoavan maalin pois.",
  },
  {
    title: "Pohjamaali paljaisiin kohtiin",
    text: "Pohjamaalaamme kohdat, joissa puu on paljaana.",
  },
  {
    title: "Pintamaali pensselillä",
    text: "Maalaamme seinät pensselillä.",
  },
  {
    title: "Lopputarkastus ja takuu",
    text: "Kierrämme talon yhdessä sinun kanssasi ja katsomme työn jäljen. Saat työlle 2 vuoden kirjallisen takuun.",
  },
];

export interface LyhyestiFakta {
  label: string;
  value: string;
}

export interface LyhyestiSisalto {
  /** Neljä merkittyä faktaa: hinta, kesto, pesu, maalaus. Takuu ja arviokäynti ovat jo herossa (Eerik 14.10.2026). */
  facts: LyhyestiFakta[];
  /** Yksi lyhyt lisätieto, joka ei toista työvaiheita (ne ovat heron johdannossa ja työvaihelistassa). */
  note: string;
}

/** "Lyhyesti"-nauhan sisältö tiilikaton pinnoitukselle (Eerik 13.10.2026: ei tarkistuslistaa, ei toistoa). */
export const pinnoitusLyhyesti: LyhyestiSisalto = {
  facts: [
    { label: "Hinta yleensä", value: PINNOITUS_HINTA },
    { label: "Kesto", value: "2–4 päivää" },
    { label: "Pesu", value: "Painepesu + torjunta-aine" },
    { label: "Maalaus", value: "Kaksi kerrosta maalia" },
  ],
  note: "Pinnoitus ja maalaus tarkoittavat samaa työtä. Maali on Nowocoat.",
};

/** "Lyhyesti"-nauhan sisältö talon maalaukselle. */
export const maalausLyhyesti: LyhyestiSisalto = {
  facts: [
    { label: "Hinta yleensä", value: MAALAUS_HINTA },
    { label: "Kesto", value: "3–7 päivää" },
    // Eerik 15.10.2026: pohjatyöt kahdella rivillä; pohjamaali vain paljaisiin kohtiin selviää työvaiheissa.
    { label: "Pohjatyöt", value: "Märkähomepesu\nKaavinta" },
    { label: "Maalaus", value: "Pohjamaali\nja pintamaali" },
  ],
  note: "Maali on pääsääntöisesti Tikkurila.",
};
