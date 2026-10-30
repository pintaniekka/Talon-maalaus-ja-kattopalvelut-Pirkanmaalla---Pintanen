/**
 * SEO-tiedot kaikille kanonisille poluille: staattiset sivut, artikkelit ja kaupunkisivut.
 *
 * Erillään seo.ts:stä, koska tämä tuo koko artikkelilistan (articles.ts) ja kohdelistan (projects.ts).
 * seo.ts on jokaisen sivun pääpaketissa; tämä tiedosto vain buildissa (routes.ts, vite-plugin-spa-routes)
 * ja testeissä. Kaupunkisivujen pääkuva: kaupunkiHero.ts.
 *
 * EI komponentti-importteja: tiedosto luetaan myös Nodessa build-aikana.
 */
import { allCities, maalausCities, pinnoitusCities } from "./cityData";
import { articles, type ArticleMeta } from "./articles";
import { cityHeroBase } from "./kaupunkiHero";
import { getResponsiveSrc } from "../lib/storage";
import {
  type RouteSeo,
  SITE_URL,
  cardHero,
  getStaticRouteSeo,
  areaCitySeo,
  pinnoitusCitySeo,
  maalausCitySeo,
} from "./seo";

/** Artikkelisivun SEO-tiedot (samat kuin ArticleLayoutin <SEO>). */
export const articleSeo = (article: ArticleMeta): RouteSeo => ({
  title: article.seoTitle ?? article.title,
  description: article.description,
  image: SITE_URL + getResponsiveSrc(article.heroImage),
  type: "article",
  hero: { base: article.heroImage, sizes: "(min-width: 896px) 848px, 100vw" },
});

/** SEO-tiedot mille tahansa kanoniselle polulle (ilman loppukauttaviivaa). */
export const getRouteSeo = (path: string): RouteSeo | undefined => {
  const staattinen = getStaticRouteSeo(path);
  if (staattinen) return staattinen;

  const article = articles.find((a) => `/artikkelit/${a.slug}` === path);
  if (article) return articleSeo(article);

  for (const city of allCities) {
    if (path === `/maalauspalvelut-${city.slug}`) return { ...areaCitySeo(city), hero: cardHero(cityHeroBase(city.slug, "alue")) };
  }
  for (const city of pinnoitusCities) {
    if (path === `/tiilikaton-pinnoitus-${city.slug}`) return { ...pinnoitusCitySeo(city), hero: cardHero(cityHeroBase(city.slug, "pinnoitus")) };
  }
  for (const city of maalausCities) {
    if (path === `/talon-maalaus-${city.slug}`) return { ...maalausCitySeo(city), hero: cardHero(cityHeroBase(city.slug, "maalaus")) };
  }
  return undefined;
};
