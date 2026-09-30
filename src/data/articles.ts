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

export type ArticleCategory = "katto" | "maalaus";

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
  maalaus: "Ulkomaalaus",
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
