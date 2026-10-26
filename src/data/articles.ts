/**
 * Artikkelien metatiedot – yksi totuuden lähde listaukselle, reitityksellle,
 * sitemapille ja artikkelipohjalle. Tässä tiedostossa EI saa olla
 * komponentti-importteja: vite-plugin-spa-routes lukee sen build-aikana Nodessa.
 *
 * Uusi artikkeli:
 *  1. Lisää metatiedot tähän listaan (publishedAt voi olla tulevaisuudessa = jonossa).
 *  2. Luo sisältö: src/content/articles/<slug>.tsx (default export = leipäteksti).
 *  3. Rekisteröi sisältö: src/content/articles/index.ts.
 */

export type ArticleCategory = "katto" | "maalaus" | "raha";

export interface ArticleMeta {
  slug: string;
  /** H1 ja listauksen otsikko. */
  title: string;
  /** <title>-tagi, jos eri kuin title (ilman "| Pintanen"). */
  seoTitle?: string;
  /** Meta description, 140–160 merkkiä. */
  description: string;
  /** Ingressi: 1–3 virkettä, vastaa otsikon kysymykseen suoraan. */
  lead: string;
  category: ArticleCategory;
  /** Avain tiedostosta src/data/authors.ts. */
  author: "eerik" | "eemil";
  /** Julkaisupäivä YYYY-MM-DD (Suomen aikaa). Tulevaisuudessa = ajastettu. */
  publishedAt: string;
  /** Viimeisin sisältöpäivitys YYYY-MM-DD, jos tekstiä on muutettu julkaisun jälkeen. */
  updatedAt?: string;
  readingMinutes: number;
  /** Pääkuvan perusnimi kansiossa public/images (Pictures-400/800/1200). */
  heroImage: string;
  heroAlt: string;
  heroCaption?: string;
}

export const categoryLabels: Record<ArticleCategory, string> = {
  katto: "Katot",
  maalaus: "Ulkomaalaus ja julkisivut",
  raha: "Hinta ja verotus",
};

export const articles: ArticleMeta[] = [
  {
    slug: "milloin-pinnoittaa-tiilikatto",
    title: "Milloin tiilikatto pitää pinnoittaa? 5 merkkiä, että aika on nyt",
    seoTitle: "Milloin tiilikatto pitää pinnoittaa? 5 merkkiä",
    description:
      "Epäiletkö, onko kattosi pinnoituksen aika? Viisi selkeää merkkiä kertoo, milloin tiilikaton pinnoitus kannattaa tehdä ja milloin voi vielä odottaa.",
    lead: "Tiilikatto kannattaa pinnoittaa, kun väri on haalistunut, pinta tuntuu karhealta tai sammal palaa pian puhdistuksen jälkeen. Useimmiten näin käy, kun katto on noin 15 vuotta vanha.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-05-24",
    updatedAt: "2026-09-30",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-punainen-tiilikatto-kattopinnoitus-jalkeen",
    heroAlt: "Punainen tiilikatto pinnoituksen ja huollon jälkeen",
    heroCaption: "Pinnoitettu tiilikatto huollon jälkeen.",
  },
  {
    slug: "kotitalousvahennys-katto-ja-maalaustyot",
    title: "Kotitalousvähennys katto- ja maalaustöissä 2027: paljonko saat takaisin?",
    seoTitle: "Kotitalousvähennys 2027 katto- ja maalaustöissä",
    description:
      "Kotitalousvähennys 2027: 40 % työn osuudesta, enintään 2 100 € henkilöltä. Lue, miten saat vähennyksen tiilikaton pinnoituksesta ja talon maalauksesta.",
    lead: "Kun ostat tiilikaton pinnoituksen tai talon maalauksen yritykseltä, saat vuosina 2026 ja 2027 vähentää verotuksessa 40 % työn osuudesta. Vähennystä saa enintään 2 100 euroa vuodessa.",
    category: "raha",
    author: "eerik",
    publishedAt: "2026-09-30",
    updatedAt: "2026-10-26",
    readingMinutes: 6,
    heroImage: "talon-maalaus-keltainen-omakotitalo-julkisivumaalaus-jalkeen",
    heroAlt: "Keltainen omakotitalo julkisivumaalauksen jälkeen",
  },
  {
    slug: "kuinka-usein-puutalo-maalataan",
    title: "Kuinka usein puutalo pitää maalata? 5 merkkiä huoltomaalauksen tarpeesta",
    seoTitle: "Kuinka usein puutalo pitää maalata? 5 merkkiä",
    description:
      "Puutalo maalataan yleensä 10–15 vuoden välein. Viisi merkkiä kertoo, milloin talo pitää maalata. Lue myös, milloin kannattaa maalata ja mitä se maksaa.",
    lead: "Puutalo maalataan yleensä 10–15 vuoden välein. Hilseily, haalistunut väri ja homepilkut kertovat, että maali ei enää suojaa puuta.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-10-04",
    updatedAt: "2026-10-26",
    readingMinutes: 7,
    heroImage: "talon-maalaus-tummansininen-puutalo-ulkomaalaus-jalkeen",
    heroAlt: "Tummansininen puutalo ulkomaalauksen jälkeen",
  },
  {
    slug: "pinnoitus-vai-uusi-katto",
    title: "Tiilikattoremontti vai pinnoitus: kumpi kannattaa?",
    seoTitle: "Kattoremontti vai pinnoitus 2027: hinta ja päätös",
    description:
      "Jos aluskate ja rakenteet ovat ehjät, pinnoitus riittää. Kattoremontti maksaa yleensä 15 000–30 000 €, pinnoitus 2 850–7 000 €. Lue, milloin katto pitää uusia.",
    lead: "Jos aluskate ja katon puurakenteet ovat kunnossa, kattoa ei yleensä tarvitse uusia. Pinnoitus maksaa yleensä 2 850–7 000 euroa ja kattoremontti yleensä 15 000–30 000 euroa. Pinnoitus pidentää katon käyttöikää jopa 15 vuotta.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-10-13",
    updatedAt: "2026-10-26",
    readingMinutes: 6,
    heroImage: "tiilikaton-pesu-ja-pinnoitus-ennen-jalkeen",
    heroAlt: "Tiilikatto ennen ja jälkeen pesun ja pinnoituksen",
  },
  {
    slug: "tiilikaton-pinnoituksen-tyovaiheet",
    title: "Näin tiilikaton pinnoitus etenee: 6 työvaihetta",
    seoTitle: "Tiilikaton pinnoitus: työvaiheet ja kesto",
    description:
      "Tiilikaton pinnoituksessa on kuusi työvaihetta kuntotarkastuksesta lopputarkastukseen. Lue, mitä kussakin vaiheessa tehdään ja kauanko työ kestää.",
    lead: "Tiilikaton pinnoituksessa on kuusi työvaihetta: kuntotarkastus, tarvittavat suojaukset, pesu, kasvustontorjunta ja tiilien vaihto, pohjamaali ja pintamaali sekä lopputarkastus. Peruskohteen katto valmistuu 2–3 työpäivässä.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-10-20",
    updatedAt: "2026-10-26",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-ja-aurinkopaneelien-suojaus",
    heroAlt: "Tiilikaton pinnoitus ja aurinkopaneelien suojaus",
  },
  {
    slug: "huoltomaalaus-vai-uusi-ulkoverhous",
    title: "Huoltomaalaus vai uusi ulkoverhous: milloin maali riittää?",
    seoTitle: "Huoltomaalaus vai uusi ulkoverhous: puu ratkaisee",
    description:
      "Hilseilevä maali ei tarkoita, että laudoitus pitää uusia. Jos puu on kovaa eikä lahoa, huoltomaalaus riittää. Lue, miten tarkistat puun kunnon.",
    lead: "Jos puu maalin alla on kovaa eikä lahoa, ulkoverhousta ei yleensä tarvitse uusia. Hyvät pohjatyöt ja uusi maali riittävät, ja hinta on murto-osa uuden laudoituksen hinnasta.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-10-27",
    readingMinutes: 5,
    heroImage: "talon-maalaus-keltainen-puuverhous-ennen-julkisivumaalausta",
    heroAlt: "Keltainen puuverhous ennen julkisivumaalausta",
  },
  {
    slug: "voiko-tiilikaton-pinnoittaa-itse",
    title: "Voiko tiilikaton pinnoittaa itse?",
    seoTitle: "Voiko tiilikaton pinnoittaa tai maalata itse?",
    description:
      "Tiilikaton voi pestä ja maalata itse, mutta kestävä tulos vaatii oikeat välineet. Lue, mitä työ vaatii ja missä se yleensä menee pieleen.",
    lead: "Tiilikaton voi pestä ja maalata itse, mutta kestävä tulos vaatii hyvän pesun, kasvustontorjunnan ja kaksi maalikerrosta ruiskulla. Itse tehdystä työstä et saa kotitalousvähennystä etkä takuuta.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-11-02",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-tummanharmaa-tiilikatto-pinnoitus-jalkeen",
    heroAlt: "Tummanharmaa tiilikatto pinnoituksen ja huollon jälkeen",
  },
  {
    slug: "tiilikaton-pesu-ja-pinnoitus",
    title: "Tiilikaton pesu ja pinnoitus: miksi pelkkä pesu ei riitä?",
    seoTitle: "Tiilikaton pesu ja pinnoitus: miksi pesu ei riitä",
    description:
      "Pesu poistaa sammaleen, mutta kulunut tiili imee vettä seuraavalla sateella. Lue, miksi katto maalataan pesun jälkeen, mitä työ maksaa ja kauanko se kestää.",
    lead: "Tiilikaton pesu poistaa sammaleen ja lian, mutta kulunut tiilen pinta imee vettä heti seuraavalla sateella. Siksi pesun jälkeen katto maalataan kahteen kertaan. Peruskohteen katto valmistuu 2–3 työpäivässä, ja hinta on yleensä 2 850–7 000 €.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-11-05",
    readingMinutes: 6,
    heroImage: "tiilikaton-pesu-ja-pinnoitus-tampere-pesu-kesken",
    heroAlt: "Tiilikaton pesu käynnissä Tampereella, puolet katosta pesty",
  },
  {
    slug: "tiilikaton-pinnoituksen-hinta-2027",
    title: "Tiilikaton pinnoituksen hinta 2027 Pirkanmaalla: mitä työ maksaa?",
    seoTitle: "Tiilikaton pinnoituksen hinta 2027 Pirkanmaalla",
    description:
      "Tiilikaton pinnoitus maksaa Pirkanmaalla yleensä 2 850–7 000 €. Lue hintaesimerkit katon koon mukaan, mitä hintaan kuuluu ja mitä vähennys on 2027.",
    lead: "Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä 2 850–7 000 euroa. Yleisin kattokoko, 190–240 m², maksaa yleensä 3 300–3 700 euroa ja valmistuu 2–3 työpäivässä. Hintaan kuuluu pesu, tiilien vaihto, kaksi maalikerrosta, siivous ja 5 vuoden takuu.",
    category: "raha",
    author: "eerik",
    publishedAt: "2026-11-19",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-tampere-tummanharmaa-tiilikatto-jalkeen",
    heroAlt: "Tummanharmaa tiilikatto Tampereella pinnoituksen jälkeen",
  },
  {
    slug: "ormax-tiilikaton-pinnoitus",
    title: "Ormax-tiilikaton pinnoitus: mitä kannattaa tietää?",
    seoTitle: "Ormax-tiilikaton pinnoitus: hinta ja ajoitus",
    description:
      "Ormax on yleisin 2000-luvun kattotiili. Lue, milloin Ormax-katto kannattaa pinnoittaa, miten työ etenee, mitä se maksaa ja mitä valmistaja sanoo hoidosta.",
    lead: "Ormax on yleisin 2000-luvun kattotiili, ja pinnoitamme sitä samalla työllä ja hinnalla kuin muita betonitiiliä. Valmistajan mukaan tiili kestää huollettuna 50–70 vuotta, mutta pinta kuluu paljon nopeammin. Pinnoitus on ajankohtainen, kun väri on haalistunut tai pinta karhea.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-11-23",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-nokia-tummanharmaa-tiilikatto-lahikuva",
    heroAlt: "Pinnoitettu tummanharmaa betonitiilikatto Nokialla lähikuvassa",
  },
  {
    slug: "puutalon-ulkomaalin-valinta",
    title: "Puutalon ulkomaalin valinta: öljymaali vai vesiohenteinen?",
    seoTitle: "Puutalon ulkomaali: öljymaali vai vesiohenteinen",
    description:
      "Ulkomaali valitaan vanhan maalin mukaan: vesiohenteisen päälle vain vesiohenteinen, öljymaalin päälle kumpi tahansa. Lue, miten tunnistat vanhan maalin.",
    lead: "Oikea ulkomaali riippuu siitä, mitä seinässä on nyt. Vesiohenteisen maalin päälle sopii vain vesiohenteinen, öljymaalin päälle kumpi tahansa. Vanhan maalin tunnistat pyyhkäisemällä, taivuttamalla ja spriillä. Käytämme pääsääntöisesti Tikkurilan maaleja.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-11-26",
    readingMinutes: 6,
    heroImage: "talon-maalaus-ulkoverhous-pensselilla-maalari",
    heroAlt: "Maalari maalaa puutalon ulkoverhousta pensselillä",
  },
  {
    slug: "mokin-ja-piharakennuksen-maalaus",
    title: "Mökin ja piharakennuksen maalaus: mitä kannattaa tietää?",
    seoTitle: "Mökin ja piharakennuksen maalaus: näin työ etenee",
    description:
      "Maalaamme mökit, autotallit ja piharakennukset samoilla työvaiheilla kuin talot. Lue, miksi mökin seinät kuluvat nopeammin ja miten vähennys toimii mökillä.",
    lead: "Maalaamme mökit, autotallit ja piharakennukset samoilla työvaiheilla kuin omakotitalot: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Mökin seinät kuluvat usein nopeammin, koska ranta ja varjo pitävät puun märkänä. Mökin maalauksesta saa kotitalousvähennyksen.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-11-30",
    readingMinutes: 5,
    heroImage: "talon-maalaus-vihrea-puutalo-ulkomaalaus-jalkeen",
    heroAlt: "Vihreä puurakennus ulkomaalauksen jälkeen",
  },
];

/** Tämän päivän päivämäärä Suomen aikaa muodossa YYYY-MM-DD. */
export const todayInFinland = (now: Date = new Date()): string =>
  new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Helsinki" }).format(now);

/** Artikkeli on julkinen, kun sen julkaisupäivä on koittanut (Suomen aikaa). */
export const isPublished = (article: ArticleMeta, now: Date = new Date()): boolean =>
  article.publishedAt <= todayInFinland(now);

/** Julkaistut artikkelit uusimmasta vanhimpaan. */
export const getPublishedArticles = (now: Date = new Date()): ArticleMeta[] =>
  articles
    .filter((a) => isPublished(a, now))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const getArticleBySlug = (slug: string | undefined): ArticleMeta | undefined =>
  articles.find((a) => a.slug === slug);

/** "2026-05-24" → "24.5.2026" */
export const formatDateFi = (isoDate: string): string => {
  const [y, m, d] = isoDate.split("-").map(Number);
  return `${d}.${m}.${y}`;
};
