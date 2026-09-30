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
  /** Pääkuvan perusnimi Supabase-bucketissa (Pictures-400/800/1200). */
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
    lead: "Tiilikatto kannattaa yleensä pinnoittaa, kun väri haalistuu, pinta muuttuu huokoiseksi tai sammal palaa nopeasti puhdistuksen jälkeen. Useimmiten tämä tapahtuu noin 10–15 vuoden kohdalla.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-05-24",
    updatedAt: "2026-09-30",
    readingMinutes: 5,
    heroImage: "punainen-tiilikatto-kattopinnoitus-ja-huolto-jalkeen",
    heroAlt: "Punainen tiilikatto pinnoituksen ja huollon jälkeen",
    heroCaption: "Pinnoitettu tiilikatto huollon jälkeen.",
  },
  {
    slug: "kotitalousvahennys-katto-ja-maalaustyot",
    title: "Kotitalousvähennys katto- ja maalaustöissä 2027: paljonko saat takaisin?",
    seoTitle: "Kotitalousvähennys 2027 katto- ja maalaustöissä",
    description:
      "Kotitalousvähennys 2027: 40 % työn osuudesta, enintään 2 100 € henkilöltä. Laskuesimerkit tiilikaton pinnoitukselle ja talon maalaukselle.",
    lead: "Yritykseltä ostetusta katto- tai maalaustyöstä saa vuosina 2026 ja 2027 vähentää 40 % työn osuudesta, enintään 2 100 euroa henkilöltä vuodessa. Omavastuu on 150 euroa.",
    category: "raha",
    author: "eerik",
    publishedAt: "2026-09-30",
    readingMinutes: 5,
    heroImage: "keltainen-omakotitalo-julkisivumaalaus-jalkeen",
    heroAlt: "Keltainen omakotitalo julkisivumaalauksen jälkeen",
  },
  {
    slug: "tiilikaton-pinnoituksen-hinta",
    title: "Tiilikaton pinnoituksen hinta 2027: mistä hinta muodostuu?",
    seoTitle: "Tiilikaton pinnoituksen hinta 2027",
    description:
      "Tiilikaton pinnoitus maksaa omakotitalossa tyypillisesti 2 850–4 880 € eli 15–25 €/m². Katso hinnat katon koon mukaan ja mitä hintaan sisältyy.",
    lead: "Omakotitalon tiilikaton pinnoitus maksaa tyypillisesti 2 850–4 880 euroa. Neliöhinta on 15–25 euroa katon jyrkkyyden mukaan, ja kotitalousvähennys pienentää lopullista kustannusta.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-09-30",
    readingMinutes: 6,
    heroImage: "vastamaalattu-tiilikatto-kattopinnoitus-jalkeen",
    heroAlt: "Vastamaalattu tiilikatto pinnoituksen jälkeen",
  },
  {
    slug: "kuinka-usein-puutalo-maalataan",
    title: "Kuinka usein puutalo pitää maalata? 5 merkkiä huoltomaalauksen tarpeesta",
    seoTitle: "Kuinka usein puutalo pitää maalata? 5 merkkiä",
    description:
      "Puutalon huoltomaalausväli on tyypillisesti 10–15 vuotta. Lue viisi merkkiä, joista tunnistat maalauksen tarpeen, sekä oikea ajankohta ja hintaesimerkit.",
    lead: "Puutalo maalataan tyypillisesti 10–15 vuoden välein. Hilseily, haalistuminen, liituuntuminen ja homepilkut kertovat, että maalipinta ei enää suojaa puuta.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-10-06",
    readingMinutes: 6,
    heroImage: "tummansininen-puutalo-ulkomaalaus-jalkeen",
    heroAlt: "Tummansininen puutalo ulkomaalauksen jälkeen",
  },
  {
    slug: "tiilikaton-puhdistus-itse-vai-ammattilainen",
    title: "Tiilikaton puhdistus: voiko katon pestä itse?",
    description:
      "Tiilikatto kannattaa puhdistaa 2–5 vuoden välein. Lue, mitä voit tehdä itse, miksi liian kova painepesu vaurioittaa tiiltä ja mitä puhdistus maksaa.",
    lead: "Kevyen puhdistuksen voi tehdä itse, mutta liian kova vedenpaine kuluttaa tiilen pintaa, ja ilman kasvustontorjuntaa sammal palaa nopeasti. Tyypillinen puhdistusväli on 2–5 vuotta.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-10-20",
    readingMinutes: 5,
    heroImage: "tiilikaton-tehopesu-ja-sammaleenpoisto",
    heroAlt: "Tiilikaton puhdistus ja sammaleenpoisto",
  },
  {
    slug: "pinnoitus-vai-uusi-katto",
    title: "Tiilikaton pinnoitus vai uusi katto: kumpi kannattaa?",
    description:
      "Jos aluskate ja rakenteet ovat kunnossa, pinnoitus riittää ja maksaa noin 10–20 % uuden katon hinnasta. Lue, milloin katto pitää uusia.",
    lead: "Jos aluskate ja katon puurakenteet ovat kunnossa, koko katon uusiminen on usein tarpeetonta. Pinnoitus maksaa tyypillisesti noin 10–20 % uuden katon hinnasta ja pidentää käyttöikää 10–15 vuotta.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-10-13",
    readingMinutes: 5,
    heroImage: "tiilikaton-pesu-ja-pinnoitus-ennen-jalkeen",
    heroAlt: "Tiilikatto ennen ja jälkeen pesun ja pinnoituksen",
  },
  {
    slug: "tiilikaton-pinnoituksen-tyovaiheet",
    title: "Näin tiilikaton pinnoitus etenee: 6 työvaihetta",
    seoTitle: "Tiilikaton pinnoitus: työvaiheet ja kesto",
    description:
      "Tiilikaton pinnoituksessa on kuusi työvaihetta kuntotarkastuksesta lopputarkastukseen. Lue, mitä kussakin vaiheessa tehdään ja kauanko työ kestää.",
    lead: "Tiilikaton pinnoitus etenee kuudessa vaiheessa: kuntotarkastus, suojaus, pesu, kasvustonesto ja tiilten vaihto, kaksi maalikerrosta ja lopputarkastus. Omakotitalon katto valmistuu 2–4 työpäivässä.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-10-27",
    readingMinutes: 5,
    heroImage: "tiilikaton-pinnoitus-ja-aurinkopaneelien-suojaus",
    heroAlt: "Tiilikaton pinnoitus ja aurinkopaneelien suojaus",
  },
  {
    slug: "huoltomaalaus-vai-uusi-ulkoverhous",
    title: "Huoltomaalaus vai uusi ulkoverhous: milloin maali riittää?",
    description:
      "Hilseilevä maali ei tarkoita, että laudoitus pitää uusia. Jos puu on kovaa eikä lahoa, huoltomaalaus riittää. Lue, miten tarkistat puun kunnon.",
    lead: "Jos maalin alla oleva puu on kovaa eikä lahoa, ulkoverhousta ei yleensä tarvitse uusia. Huolelliset pohjatyöt ja uusi maali pelastavat vanhankin paneelin murto-osalla uuden laudoituksen hinnasta.",
    category: "maalaus",
    author: "eemil",
    publishedAt: "2026-11-03",
    readingMinutes: 5,
    heroImage: "keltainen-puuverhous-ennen-julkisivumaalausta",
    heroAlt: "Keltainen puuverhous ennen julkisivumaalausta",
  },
  {
    slug: "voiko-tiilikaton-pinnoittaa-itse",
    title: "Voiko tiilikaton pinnoittaa itse?",
    seoTitle: "Voiko tiilikaton pinnoittaa tai maalata itse?",
    description:
      "Tiilikaton voi teknisesti pestä ja maalata itse, mutta kestävä tulos vaatii ammattikaluston. Lue, mitä työ vaatii ja missä se yleensä epäonnistuu.",
    lead: "Tiilikaton voi teknisesti pestä ja maalata itse, mutta kestävä tulos vaatii tehokkaan pesun, kasvustoneston ja kaksi ruiskutettua maalikerrosta. Itse tehdystä työstä ei saa kotitalousvähennystä eikä takuuta.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-11-10",
    readingMinutes: 5,
    heroImage: "tummanharmaa-tiilikaton-pinnoitus-ja-huolto-jalkeen",
    heroAlt: "Tummanharmaa tiilikatto pinnoituksen ja huollon jälkeen",
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
