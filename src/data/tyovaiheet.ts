/**
 * Työvaiheet ja "Lyhyesti"-faktat yhdessä paikassa. Samat tekstit näkyvät palvelusivuilla,
 * kaupunkisivuilla ja llms.txt:ssä, joten työ kuvataan kaikkialla samalla tavalla.
 * Sanasto: katto = pesu painepesulla, rikkinäiset tiilet uusiin, maalaus ruiskulla kahteen kertaan
 * (pohjamaali + pintamaali), ahtaat paikat telalla tai käsin. Talo = homepesu, kaavinta,
 * pohjamaali paljaisiin kohtiin, pintamaali pensselillä. Lautoja ei vaihdeta.
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
    text: "Tulemme katsomaan katon. Tarkistamme tiilet, aluskatteen ja läpiviennit. Saat kirjallisen tarjouksen, jossa on kiinteä hinta.",
  },
  {
    title: "Suojaus",
    text: "Suojaamme tarvittaessa esimerkiksi aurinkopaneelit. Siivoamme jälkemme.",
  },
  {
    title: "Pesu painepesulla",
    text: "Pesemme katon painepesulla ja huuhtelemme sadevesikourut. Lika ja sammal lähtevät pois.",
  },
  {
    title: "Rikkinäisten tiilien vaihto",
    text: "Vaihdamme rikkinäiset tiilet uusiin. Katto saa kuivua ennen maalausta.",
  },
  {
    title: "Maalaus ruiskulla kahteen kertaan",
    text: `${KATON_MAALAUS_LAUSE} Käytämme Tikkurilan ja Nowocoatin kattomaaleja.`,
  },
  {
    title: "Lopputarkastus ja takuu",
    text: "Kierrämme katon yhdessä sinun kanssasi. Saat työlle 5 vuoden kirjallisen takuun.",
  },
];

export const maalausTyovaiheet: Tyovaihe[] = [
  {
    title: "Ilmainen arviokäynti ja tarjous",
    text: "Eemil tulee katsomaan talon. Hän käy seinät läpi ja katsoo, mitä maalia niissä on ja paljonko pohjatöitä tarvitaan. Saat kirjallisen tarjouksen, jossa on kiinteä hinta.",
  },
  {
    title: "Suojaus",
    text: "Suojaamme ennen työtä esimerkiksi terassit.",
  },
  {
    title: "Homepesu",
    text: "Pesemme seinät homepesuaineella ja harjoilla. Lika ja home lähtevät pois.",
  },
  {
    title: "Kaavinta ja kuivuminen",
    text: "Kaavimme irtoavan maalin pois. Sen jälkeen seinä saa kuivua.",
  },
  {
    title: "Pohjamaali paljaisiin kohtiin",
    text: "Pohjamaalaamme kohdat, joissa puu on paljaana. Lautoja emme vaihda.",
  },
  {
    title: "Pintamaali pensselillä",
    text: "Maalaamme seinät pensselillä. Sateella emme maalaa.",
  },
  {
    title: "Lopputarkastus ja takuu",
    text: "Kierrämme talon yhdessä sinun kanssasi ja katsomme työn jäljen. Saat työlle 2 vuoden kirjallisen takuun.",
  },
];

/** "Lyhyesti"-laatikon lauseet (P8). Paikkakunta lisätään ensimmäiseen lauseeseen, jos annettu. */
export const pinnoitusLyhyesti = (cityIn?: string): string[] => [
  `Pinnoitamme tiilikattoja ${cityIn ?? "Pirkanmaalla ja lähikunnissa"}.`,
  "Pesemme katon painepesulla ja vaihdamme rikkinäiset tiilet uusiin.",
  "Maalaamme katon ruiskulla kahteen kertaan: pohjamaali ja pintamaali. Ahtaat paikat telalla tai käsin.",
  "Työ kestää yleensä 2–4 päivää. Takuu on 5 vuotta.",
  `Hinta on yleensä ${PINNOITUS_HINTA}. Työn osuudesta saat kotitalousvähennyksen.`,
  "Kuntotarkastus on ilmainen.",
];

/** "Lyhyesti"-laatikon lauseet maalaukselle (P9). */
export const maalausLyhyesti = (cityIn?: string): string[] => [
  `Maalaamme talojen ulkoseinät ${cityIn ?? "Pirkanmaalla ja lähikunnissa"}.`,
  "Pesemme seinät homepesuaineella ja kaavimme irtoavan maalin.",
  "Pohjamaalaamme paljaat kohdat ja maalaamme pintamaalin pensselillä. Lautoja emme vaihda.",
  "Työ kestää yleensä 3–7 päivää. Takuu on 2 vuotta.",
  `Hinta on yleensä ${MAALAUS_HINTA}. Työn osuudesta saat kotitalousvähennyksen.`,
  "Arviokäynti on ilmainen.",
];

/** Mitä emme tee (llms.txt ja FAQ). */
export const EMME_TEE = [
  "Peltikattoja emme pinnoita. Teemme vain tiilikattoja.",
  "Kattoremontteja emme tee. Pinnoitus riittää, jos aluskate ja rakenteet ovat kunnossa.",
  "Sisämaalauksia emme tee. Maalaamme omakotitalojen, paritalojen ja mökkien ulkoseinät.",
  "Lautoja emme vaihda maalauksen yhteydessä.",
];
