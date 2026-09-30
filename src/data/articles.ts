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
    title: "Kotitalousvähennys katto- ja maalaustöissä 2026: paljonko saat takaisin?",
    seoTitle: "Kotitalousvähennys 2026 katto- ja maalaustöissä",
    description:
      "Kotitalousvähennys 2026: 35 % työn osuudesta, enintään 1 600 € henkilöltä. Laskuesimerkit katto- ja maalaustöille sekä vireillä oleva korotus.",
    lead: "Yritykseltä ostetusta katto- tai maalaustyöstä saa vähentää 35 % työn osuudesta, enintään 1 600 euroa henkilöltä vuodessa. Omavastuu on 150 euroa. Hallitus on esittänyt vuosille 2026 ja 2027 korotusta.",
    category: "raha",
    author: "eerik",
    publishedAt: "2026-10-06",
    readingMinutes: 5,
    heroImage: "keltainen-omakotitalo-julkisivumaalaus-jalkeen",
    heroAlt: "Keltainen omakotitalo julkisivumaalauksen jälkeen",
  },
  {
    slug: "tiilikaton-pinnoituksen-hinta",
    title: "Tiilikaton pinnoituksen hinta 2026: mistä hinta muodostuu?",
    seoTitle: "Tiilikaton pinnoituksen hinta 2026",
    description:
      "Tiilikaton pinnoitus maksaa omakotitalossa tyypillisesti 2 850–4 880 € eli 15–25 €/m². Katso hinnat katon koon mukaan ja mitä hintaan sisältyy.",
    lead: "Omakotitalon tiilikaton pinnoitus maksaa tyypillisesti 2 850–4 880 euroa. Neliöhinta on 15–25 euroa katon jyrkkyyden mukaan, ja kotitalousvähennys pienentää lopullista kustannusta.",
    category: "katto",
    author: "eerik",
    publishedAt: "2026-10-13",
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
    publishedAt: "2026-10-20",
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
    publishedAt: "2026-10-27",
    readingMinutes: 5,
    heroImage: "tiilikaton-tehopesu-ja-sammaleenpoisto",
    heroAlt: "Tiilikaton puhdistus ja sammaleenpoisto",
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
