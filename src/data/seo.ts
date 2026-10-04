/**
 * Sivukohtaiset SEO-tiedot (title + meta description) yhdessä paikassa.
 *
 * Käyttäjät:
 *  - sivukomponentit antavat nämä <SEO>-komponentille (react-helmet)
 *  - vite-plugin-spa-routes kirjoittaa samat tiedot build-aikana jokaisen reitin
 *    staattiseen HTML:ään, jotta JavaScriptiä ajamattomat lukijat (some-jakojen
 *    esikatselut, tekoälyhakujen crawlerit) näkevät oikean otsikon ja kuvauksen.
 *
 * EI komponentti-importteja: tiedosto luetaan myös Nodessa build-aikana.
 */
import { type CityData, cities, allCities, maalausCities } from "./cityData";
import { getAreaCityContent } from "./areaCityContent";
import { articles } from "./articles";
import { getResponsiveSrc, getResponsiveSrcSet } from "../lib/storage";

export interface RouteSeo {
  title: string;
  description: string;
  /** Absoluuttinen og:image, jos eri kuin sivuston oletuskuva. */
  image?: string;
  /** og:type, oletus "website". */
  type?: "website" | "article";
  /**
   * Sivun yläosan pääkuva (LCP). Plugin kirjoittaa sille staattiseen HTML:ään
   * preload-linkin, jotta selain alkaa ladata kuvaa jo ennen JavaScriptiä.
   */
  hero?: { base: string; sizes: string };
}

/** Koko ruudun hero (ServicePageHero). */
const fullHero = (base: string) => ({ base, sizes: "100vw" });

const HERO = {
  pinnoitus: fullHero("kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen"),
  puhdistus: fullHero("puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen"),
  maalaus: fullHero("moderni-tumma-puutalo-julkisivumaalaus-valmis"),
  alue: fullHero("ammattilainen-maalaa-talon-ulkoverhousta-pensselilla"),
};

/** Staattisten sivujen pääkuvat (samat kuin sivukomponenttien heroissa). */
const staticHero: Record<string, RouteSeo["hero"]> = {
  "/tiilikaton-pinnoitus-pirkanmaa": HERO.pinnoitus,
  "/katon-puhdistus-pirkanmaa": HERO.puhdistus,
  "/talon-maalaus-pirkanmaa": HERO.maalaus,
  "/hintalaskuri": fullHero("keltainen-talo-pinnoitettu-tiilikatto-ylojarvi"),
  "/tiilikaton-pinnoitus-hinta-pirkanmaa": fullHero("tiilikaton-tehopesu-ja-sammaleenpoisto"),
  "/katon-puhdistus-hinta-pirkanmaa": fullHero("puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen"),
  "/talon-maalaus-hinta-pirkanmaa": fullHero("vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen"),
  "/meista": fullHero("ammattilainen-maalaa-talon-ulkoverhousta-pensselilla"),
  "/toiminta-alueet": fullHero("keltainen-omakotitalo-julkisivumaalaus-jalkeen"),
  "/referenssit": fullHero("tiilikaton-tehopesu-ja-sammaleenpoisto"),
};

/** Preload-linkin attribuutit pääkuvalle. */
export const heroPreload = (hero: NonNullable<RouteSeo["hero"]>) => ({
  href: getResponsiveSrc(hero.base),
  imagesrcset: getResponsiveSrcSet(hero.base),
  imagesizes: hero.sizes,
});

export const SITE_URL = "https://pintanen.fi";
export const DEFAULT_TITLE = "Tiilikaton pinnoitus ja talon maalaus Pirkanmaa | Pintanen";
export const DEFAULT_DESCRIPTION =
  "Tiilikaton pinnoitus, katon puhdistus ja talon maalaus takuutyönä Pirkanmaalla. Yrittäjät mukana jokaisessa työssä. Pyydä maksuton arvio.";

/** Lisää "| Pintanen" otsikon loppuun, jos sitä ei vielä ole. */
export const withBrand = (title?: string): string =>
  !title ? DEFAULT_TITLE : /\|\s*Pintanen\s*$/i.test(title) ? title : `${title} | Pintanen`;

/** Kanoninen osoite polulle (loppukauttaviivalla, kuten sitemapissa). */
export const canonicalUrl = (path: string): string => {
  const clean = path.replace(/\/+$/, "");
  return clean === "" ? `${SITE_URL}/` : `${SITE_URL}${clean}/`;
};

/** Staattisten sivujen title ja description. */
export const staticSeo: Record<string, RouteSeo> = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/artikkelit": {
    title: "Artikkelit ja oppaat",
    description:
      "Lue Pintasen oppaat tiilikaton pinnoituksesta, katon huollosta ja talon maalauksesta. Käytännön neuvoja pirkanmaalaisilta ammattilaisilta.",
  },
  "/hintalaskuri": {
    title: "Hintalaskuri – laske pinnoituksen tai maalauksen hinta",
    description:
      "Laske tiilikaton pinnoituksen tai talon maalauksen hinta minuutissa. Vastaa muutamaan kysymykseen ja saat suuntaa antavan hinta-arvion heti. Pintanen, Pirkanmaa.",
  },
  "/katon-puhdistus-hinta-pirkanmaa": {
    title: "Katon puhdistus hinta – Sammaleen poisto ja suojakäsittely",
    description:
      "Paljonko katon puhdistus maksaa? Katso hintaesimerkit, mitä puhdistus sisältää ja milloin pelkkä pesu riittää. Toimimme Pirkanmaalla ja Kanta-Hämeessä.",
  },
  "/tiilikaton-pinnoitus-hinta-pirkanmaa": {
    title: "Tiilikaton pinnoitus hinta 2027 – hintaesimerkit ja laskuri",
    description:
      "Tiilikaton pinnoitus maksaa omakotitalossa yleensä 2 850–7 000 €. Katso hintaesimerkit, laske arvio laskurilla ja lue, mitä hintaan kuuluu. Pirkanmaa ja Kanta-Häme.",
  },
  "/talon-maalaus-hinta-pirkanmaa": {
    title: "Talon maalaus hinta 2027 – hintaesimerkit ja laskuri",
    description:
      "Talon ulkomaalaus maksaa omakotitalossa yleensä 3 500–11 000 €. Katso hintaesimerkit, laske arvio laskurilla ja lue, mistä hinta syntyy. Pirkanmaa.",
  },
  "/meista": {
    title: "Pintanen Oy – Perheyritys katto- ja maalaustöissä",
    description:
      "Pintanen on perheyritys, joka on erikoistunut katto- ja seinämaalauksiin. Teemme työt itse ja panostamme huolelliseen lopputulokseen.",
  },
  "/tiilikaton-pinnoitus-pirkanmaa": {
    title: "Tiilikaton pinnoitus Pirkanmaa & Tampere | 5v takuu | Pintanen",
    description:
      "Tiilikaton pinnoitus Pirkanmaalla. Säästä jopa 80 % vs. kattoremontti! Hyödynnä kotitalousvähennys ja tilaa ilmainen kuntoarvio. 5 vuoden takuu työlle.",
  },
  "/katon-puhdistus-pirkanmaa": {
    title: "Katon puhdistus Pirkanmaa – Ilmainen arvio",
    description:
      "Tiilikaton puhdistus Pirkanmaalla - tehokas suoja katollesi. Sammaleet ja lika poistetaan mekaanisesti.",
  },
  "/talon-maalaus-pirkanmaa": {
    title: "Talon maalaus Pirkanmaa | Hintalaskuri",
    description:
      "Laadukas talon ulkomaalaus Pirkanmaalla. Yrittäjä tekee työn. Laske hinta hintalaskurilla, hyödynnä kotitalousvähennys ja tilaa ilmainen arvio!",
  },
  "/tietosuoja": {
    title: "Tietosuojaseloste",
    description:
      "Pintanen Oy:n tietosuojaseloste: mitä tietoja keräämme yhteydenotto- ja tarjouspyyntölomakkeilla, mihin niitä käytetään ja mitkä ovat oikeutesi.",
  },
  "/referenssit": {
    title: "Referenssit – Katon pinnoitus ja talon maalaus",
    description:
      "Tutustu toteuttamiimme katto- ja maalausprojekteihin Pirkanmaalla. Näe ero ennen maalausta ja maalauksen jälkeen.",
  },
  "/toiminta-alueet": {
    title: "Toiminta-alueet Pirkanmaa ja lähikunnat",
    description:
      "Palvelemme koko Pirkanmaan alueella ja lähikunnissa. Katon pinnoitus, puhdistus ja talon maalaus noin tunnin säteellä Tampereelta.",
  },
};

export const pinnoitusCitySeo = (city: CityData): RouteSeo => ({
  title: city.pinnoitusMetaTitle || `Tiilikaton pinnoitus ${city.name}`,
  description:
    city.pinnoitusMetaDesc ||
    `Tiilikaton maalauspinnoitus ${city.name} – pidentää katon ikää jopa 15-20 vuotta. 5 vuoden takuu.`,
});

export const puhdistusCitySeo = (city: CityData): RouteSeo => ({
  title: city.puhdistusMetaTitle || `Tiilikaton puhdistus ${city.name}`,
  description:
    city.puhdistusMetaDesc ||
    `Tiilikaton mekaaninen puhdistus ja sammaleentorjunta ${city.name}. Alkaen 800 €. Ilmainen kuntotarkastus.`,
});

export const maalausCitySeo = (city: CityData): RouteSeo => ({
  title: city.maalausMetaTitle || `Talon maalaus ${city.name} | Hintalaskuri | Pintanen`,
  description:
    city.maalausMetaDesc ||
    `Laadukas talon ulkomaalaus ${city.name}. Yrittäjä tekee työn. Laske hinta hintalaskurilla, hyödynnä kotitalousvähennys ja tilaa ilmainen arvio!`,
});

/** SEO-tiedot mille tahansa kanoniselle polulle (ilman loppukauttaviivaa). */
export const getRouteSeo = (path: string): RouteSeo | undefined => {
  if (staticSeo[path]) return { ...staticSeo[path], hero: staticHero[path] };

  const article = articles.find((a) => `/artikkelit/${a.slug}` === path);
  if (article) {
    return {
      title: article.seoTitle ?? article.title,
      description: article.description,
      image: SITE_URL + getResponsiveSrc(article.heroImage),
      type: "article",
      hero: { base: article.heroImage, sizes: "(min-width: 896px) 848px, 100vw" },
    };
  }

  for (const city of allCities) {
    if (path === `/maalauspalvelut-${city.slug}`) {
      const area = getAreaCityContent(city.slug);
      if (area) return { title: area.alueMetaTitle, description: area.alueMetaDesc, hero: HERO.alue };
    }
  }
  for (const city of cities) {
    if (path === `/tiilikaton-pinnoitus-${city.slug}`) return { ...pinnoitusCitySeo(city), hero: HERO.pinnoitus };
    if (path === `/katon-puhdistus-${city.slug}`) return { ...puhdistusCitySeo(city), hero: HERO.puhdistus };
  }
  for (const city of maalausCities) {
    if (path === `/talon-maalaus-${city.slug}`) return { ...maalausCitySeo(city), hero: HERO.maalaus };
  }
  return undefined;
};
