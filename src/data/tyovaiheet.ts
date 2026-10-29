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
  /** Valokuva vaiheesta pudotusvalikon sisällä (kuvasuunnitelma 28.10.2026). Perusnimi ja alt. */
  kuva?: { base: string; alt: string };
}

export const PINNOITUS_HINTA = fmtRange(pinnoitusPrices.general.min, pinnoitusPrices.general.max);
export const MAALAUS_HINTA = fmtRange(maalausPrices.general.min, maalausPrices.general.max);

export const pinnoitusTyovaiheet: Tyovaihe[] = [
  {
    title: "Ilmainen kuntotarkastus",
    text: "Tulemme katsomaan katon. Tarkistamme tiilet, saumat, piipun ympäryksen, läpiviennit ja aluskatteen. Saat kirjallisen tarjouksen, jossa on kiinteä hinta.",
    kuva: { base: "tiilikaton-pinnoitus-tampere-eerik-pitkanen-katolla", alt: "Eerik Pitkänen tiilikatolla kuntotarkastuksessa" },
  },
  {
    // Eerik 25.10.2026: kirjallinen sopimus ja aikataulu, yhteydenotto ennen aloituspäivää.
    title: "Sopimus ja aikataulu",
    text: "Kun hyväksyt tarjouksen, teemme kirjallisen sopimuksen ja sovimme työn ajankohdan. Otamme yhteyttä ennen aloituspäivää.",
  },
  {
    title: "Suojaus",
    text: "Suojaamme esimerkiksi aurinkopaneelit, lasiterassit ja valokatteet. Kourujen syöksyihin tulee suodatinkankaat.",
    kuva: { base: "tiilikaton-pinnoitus-tampere-aurinkopaneelit-suojattu", alt: "Aurinkopaneelit suojattuna tiilikatolla pinnoituksen ajaksi" },
  },
  {
    title: "Pesu painepesulla",
    text: "Pesemme katon painepesulla ja huuhtelemme sadevesikourut. Lika ja sammal lähtevät pois.",
    kuva: { base: "tiilikaton-pesu-ja-pinnoitus-tampere-pesu-kesken", alt: "Tiilikaton pesu kesken: toinen puoli pesty, toinen vielä likainen" },
  },
  {
    title: "Rikkinäisten tiilien vaihto",
    text: "Vaihdamme rikkinäiset tiilet uusiin. Ennen maalausta katto saa kuivua.",
    kuva: { base: "tiilikaton-pinnoitus-varatiilien-maalaus", alt: "Varatiilet maalattuna pihalla ennen asennusta" },
  },
  {
    title: "Maalaus ruiskulla kahteen kertaan",
    text: `${KATON_MAALAUS_LAUSE} Käytämme Nowocoatin kattomaaleja.`,
    kuva: { base: "tiilikaton-pinnoitus-valkeakoski-pinnoitettu-tiilikatto-lahikuva", alt: "Pinnoitettu tiilikatto läheltä" },
  },
  {
    title: "Lopputarkastus ja takuu",
    text: "Kierrämme katon yhdessä sinun kanssasi ja siivoamme jälkemme. Saat työlle 5 vuoden kirjallisen takuun.",
    kuva: { base: "tiilikaton-pinnoitus-ylojarvi-keltainen-talo-jalkeen", alt: "Keltainen talo ja punainen tiilikatto pinnoituksen jälkeen, Ylöjärvi" },
  },
];

export const maalausTyovaiheet: Tyovaihe[] = [
  {
    title: "Ilmainen arviokäynti ja tarjous",
    text: "Eemil tulee katsomaan talon. Hän käy seinät läpi ja katsoo, mitä maalia niissä on ja paljonko pohjatöitä tarvitaan. Saat kirjallisen tarjouksen, jossa on kiinteä hinta.",
    kuva: { base: "talon-maalaus-tampere-hilseileva-paaty-ennen", alt: "Hilseilevä puutalon pääty ennen maalausta, Tampere" },
  },
  {
    title: "Suojaus",
    text: "Suojaamme terassit ja ympäristön ennen työtä.",
    kuva: { base: "talon-maalaus-ympariston-suojaus-ennen-maalausta", alt: "Terassi suojattuna muovilla ennen maalausta" },
  },
  {
    title: "Homepesu",
    text: "Pesemme seinät homepesuaineella ja harjoilla. Lika ja home lähtevät pois.",
    kuva: { base: "talon-maalaus-parkano-hilseileva-puutalo-ennen", alt: "Eemil pesee hilseilevää seinää harjalla tikkailta, Parkano" },
  },
  {
    title: "Kaavinta",
    text: "Kaavimme irtoavan maalin pois.",
    kuva: { base: "talon-maalaus-tampere-hilseileva-ulkoverhous-lahikuva-ennen", alt: "Hilseilevä ulkoverhous läheltä ennen kaavintaa" },
  },
  {
    title: "Pohjamaali paljaisiin kohtiin",
    text: "Pohjamaalaamme kohdat, joissa puu on paljaana.",
    kuva: { base: "talon-maalaus-tampere-hilseileva-ulkoverhous-lahikuva-jalkeen", alt: "Ulkoverhous läheltä maalauksen jälkeen" },
  },
  {
    title: "Pintamaali pensselillä",
    text: "Maalaamme seinät pensselillä.",
    kuva: { base: "talon-maalaus-tampere-puutalon-seinien-maalaus-kaynnissa", alt: "Puutalon seinien maalaus käynnissä telineiltä, Tampere" },
  },
  {
    title: "Lopputarkastus ja takuu",
    text: "Kierrämme talon yhdessä sinun kanssasi ja katsomme työn jäljen. Saat työlle 2 vuoden kirjallisen takuun.",
    kuva: { base: "talon-maalaus-tampere-koristeikkunat-puutalo-jalkeen", alt: "Koristeikkunainen puutalo maalauksen jälkeen, Tampere" },
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
    { label: "Kesto", value: "2–3 päivää" },
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
