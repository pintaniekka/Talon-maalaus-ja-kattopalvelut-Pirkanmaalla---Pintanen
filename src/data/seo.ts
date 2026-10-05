/**
 * Sivukohtaiset SEO-tiedot (title + meta description) yhdessä paikassa.
 *
 * Käyttäjät:
 *  - sivukomponentit antavat nämä <SEO>-komponentille (react-helmet)
 *  - vite-plugin-spa-routes kirjoittaa samat tiedot build-aikana jokaisen reitin
 *    staattiseen HTML:ään, jotta JavaScriptiä ajamattomat lukijat (some-jakojen
 *    esikatselut, tekoälyhakujen crawlerit) näkevät oikean otsikon ja kuvauksen.
 *
 * Kaupunkisivujen titlet ja kuvaukset tuotetaan yhdestä mallista (auditoinnin korjaukset 2 ja 3,
 * V22): sama luku ja sama lupaus joka paikkakunnalla, eikä kuvaus kasva yli 160 merkin.
 *
 * EI komponentti-importteja: tiedosto luetaan myös Nodessa build-aikana.
 */
import { type CityData, allCities, maalausCities, pinnoitusCities, puhdistusCities } from "./cityData";
import { articles } from "./articles";
import { getCityHeroBase } from "./projects";
import { PINNOITUS_HINTA, MAALAUS_HINTA } from "./tyovaiheet";
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

export const SITE_URL = "https://pintanen.fi";

/** Oletusjakokuva: vaakakuva omasta kohteesta (V24). Pystykuva rajautui Facebookissa ja WhatsAppissa. */
export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/images/Pictures-1500/moderni-tumma-puutalo-julkisivumaalaus-valmis-1500.webp`,
  width: 1500,
  height: 1125,
} as const;

/** Koko ruudun hero (ServicePageHero, hintalaskurin ja tarjouspyynnön tausta). */
const fullHero = (base: string) => ({ base, sizes: "100vw" });
/** Korttihero (PageHero): kuva on oikealla kolmanneksella tietokoneella, koko leveydellä puhelimella. */
const cardHero = (base: string) => ({ base, sizes: "(max-width: 1024px) 100vw, 34vw" });

export const HERO_BASE = {
  pinnoitus: "kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen",
  puhdistus: "puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen",
  maalaus: "tummansininen-puutalo-ulkomaalaus-jalkeen",
  alue: "puutalon-katon-ja-seinien-maalaus-tampere",
  pinnoitusHinta: "tiilikaton-pesu-ja-sammaleenpoisto",
  maalausHinta: "vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen",
  meista: "eerik-tiilikatolla-tampere",
  toimintaAlueet: "keltainen-omakotitalo-julkisivumaalaus-jalkeen",
  referenssit: "vastamaalattu-tiilikatto-kattopinnoitus-jalkeen",
} as const;

/** Kaupunkisivun hero-kuva: paikkakunnan oma kohde, jos sellainen on, muuten palvelun vakiokuva. */
export const cityHeroBase = (slug: string, service: "pinnoitus" | "maalaus" | "alue"): string =>
  getCityHeroBase(slug, service === "alue" ? undefined : service) ??
  (service === "pinnoitus" ? HERO_BASE.pinnoitus : service === "maalaus" ? HERO_BASE.maalaus : HERO_BASE.alue);

/** Staattisten sivujen pääkuvat (samat kuin sivukomponenttien heroissa). */
const staticHero: Record<string, RouteSeo["hero"]> = {
  "/tiilikaton-pinnoitus-pirkanmaa": cardHero(HERO_BASE.pinnoitus),
  "/katon-puhdistus-pirkanmaa": fullHero(HERO_BASE.puhdistus),
  "/talon-maalaus-pirkanmaa": cardHero(HERO_BASE.maalaus),
  "/hintalaskuri": fullHero("hintalaskuri-tausta"),
  "/tarjouspyynto": fullHero("hintalaskuri-tausta"),
  "/tiilikaton-pinnoitus-hinta-pirkanmaa": cardHero(HERO_BASE.pinnoitusHinta),
  "/katon-puhdistus-hinta-pirkanmaa": fullHero(HERO_BASE.puhdistus),
  "/talon-maalaus-hinta-pirkanmaa": cardHero(HERO_BASE.maalausHinta),
  "/meista": cardHero(HERO_BASE.meista),
  "/toiminta-alueet": cardHero(HERO_BASE.toimintaAlueet),
  "/referenssit": cardHero(HERO_BASE.referenssit),
};

/** Preload-linkin attribuutit pääkuvalle. */
export const heroPreload = (hero: NonNullable<RouteSeo["hero"]>) => ({
  href: getResponsiveSrc(hero.base),
  imagesrcset: getResponsiveSrcSet(hero.base),
  imagesizes: hero.sizes,
});

export const DEFAULT_TITLE = "Tiilikaton pinnoitus ja talon maalaus Pirkanmaa | Pintanen";
export const DEFAULT_DESCRIPTION =
  "Pintanen Oy pinnoittaa tiilikattoja ja maalaa taloja Pirkanmaalla ja lähikunnissa. Yrittäjät tekevät työn itse. Ilmainen arviokäynti ja kirjallinen takuu.";

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
      "Lue Pintasen oppaat tiilikaton pinnoituksesta ja talon maalauksesta. Käytännön neuvoja yrittäjiltä, jotka tekevät työn itse Pirkanmaalla.",
  },
  "/tarjouspyynto": {
    title: "Pyydä tarjous – ilmainen kuntotarkastus",
    description:
      "Pyydä tarjous tiilikaton pinnoituksesta tai talon maalauksesta. Yrittäjä soittaa sinulle itse ja tulee ilmaiselle kuntotarkastukselle. Pintanen, Pirkanmaa.",
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
    description: `Tiilikaton pinnoitus maksaa omakotitalossa yleensä ${PINNOITUS_HINTA}. Katso hintaesimerkit, laske arvio laskurilla ja lue, mitä hintaan kuuluu. Pirkanmaa ja Kanta-Häme.`,
  },
  "/talon-maalaus-hinta-pirkanmaa": {
    title: "Talon maalaus hinta 2027 – hintaesimerkit ja laskuri",
    description: `Talon ulkomaalaus maksaa omakotitalossa yleensä ${MAALAUS_HINTA}. Katso hintaesimerkit, laske arvio laskurilla ja lue, mistä hinta syntyy. Pirkanmaa.`,
  },
  "/meista": {
    title: "Meistä: veljekset Eerik ja Eemil tekevät työn itse",
    description:
      "Pintanen Oy on nuori perheyritys. Eerik pinnoittaa tiilikattoja ja Eemil maalaa taloja Pirkanmaalla ja Kanta-Hämeessä. Ei välikäsiä, kirjallinen takuu.",
  },
  "/tiilikaton-pinnoitus-pirkanmaa": {
    title: "Tiilikaton pinnoitus Pirkanmaa | 5 v takuu | Pintanen",
    description: `Tiilikaton pinnoitus Pirkanmaalla. Pesemme katon painepesulla ja maalaamme sen ruiskulla kahteen kertaan. Hinta yleensä ${PINNOITUS_HINTA}, 5 v takuu, ilmainen kuntotarkastus.`,
  },
  "/katon-puhdistus-pirkanmaa": {
    title: "Katon puhdistus Pirkanmaa – Ilmainen arvio",
    description:
      "Tiilikaton puhdistus Pirkanmaalla. Sammal ja lika poistetaan mekaanisesti ilman painepesua, ja katto saa kasvustontorjunta-aineen. Ilmainen kuntotarkastus.",
  },
  "/talon-maalaus-pirkanmaa": {
    title: "Talon maalaus Pirkanmaa – ulkomaalaus ja julkisivumaalaus",
    description: `Talon maalaus Pirkanmaalla. Pesemme seinät homepesuaineella, kaavimme irtoavan maalin ja maalaamme pensselillä. Hinta yleensä ${MAALAUS_HINTA}, 2 v takuu.`,
  },
  "/tietosuoja": {
    title: "Tietosuojaseloste",
    description:
      "Pintanen Oy:n tietosuojaseloste: mitä tietoja keräämme yhteydenotto- ja tarjouspyyntölomakkeilla, mihin niitä käytetään ja mitkä ovat oikeutesi.",
  },
  "/referenssit": {
    title: "Referenssit – kuvia omista kohteistamme",
    description:
      "Kuvia Pintasen töistä Pirkanmaalla ja lähikunnissa: tiilikattoja ennen ja jälkeen pinnoituksen sekä maalattuja taloja. Kuvat ovat omista kohteistamme.",
  },
  "/toiminta-alueet": {
    title: "Toiminta-alueet – Pirkanmaa ja lähikunnat",
    description:
      "Pinnoitamme tiilikattoja ja maalaamme taloja Pirkanmaalla ja lähikunnissa noin tunnin säteellä Tampereelta. Katso kunnat ja pyydä ilmainen arviokäynti.",
  },
};

/** Pinnoituksen kaupunkisivu: sama malli joka paikkakunnalla (S2, V22). */
export const pinnoitusCitySeo = (city: CityData): RouteSeo => ({
  title: `Tiilikaton pinnoitus ${city.name} | Hinta ${PINNOITUS_HINTA} | Pintanen`,
  description: `Tiilikaton pinnoitus ${city.cityIn}. Yrittäjä tekee työn itse. Ilmainen kuntotarkastus, 5 v takuu ja kotitalousvähennys. Hinta ${PINNOITUS_HINTA}.`,
});

export const puhdistusCitySeo = (city: CityData): RouteSeo => ({
  title: city.puhdistusMetaTitle || `Tiilikaton puhdistus ${city.name}`,
  description:
    city.puhdistusMetaDesc ||
    `Tiilikaton mekaaninen puhdistus ja sammaleentorjunta ${city.cityIn}. Ilmainen kuntotarkastus ja kirjallinen tarjous.`,
});

/** Maalauksen kaupunkisivu: hakutermit "ulkomaalaus" ja "julkisivumaalaus" titleen (korjaus 2). */
export const maalausCitySeo = (city: CityData): RouteSeo => {
  const full = `Talon maalaus ${city.name} – ulkomaalaus ja julkisivumaalaus | Pintanen`;
  const short = `Talon maalaus ${city.name} – ulkomaalaus | Pintanen`;
  return {
    title: full.length <= 62 ? full : short,
    description: `Talon maalaus ${city.cityIn}. Eemil pesee, kaapii ja maalaa pensselillä itse. Ilmainen arviokäynti, 2 v takuu ja kotitalousvähennys. Hinta ${MAALAUS_HINTA}.`,
  };
};

/** Aluesivu: kokoava sivu, joka linkittää palvelusivuille. Ei kilpaile palvelusivujen kanssa (korjaus 2). */
export const areaCitySeo = (city: CityData): RouteSeo => ({
  title: `Maalaus- ja kattopalvelut ${city.name} | Pintanen`,
  description: `Tiilikaton pinnoitus ja talon maalaus ${city.cityIn}. Yrittäjät tekevät työn itse. Ilmainen arviokäynti, kirjallinen takuu ja kotitalousvähennys.`,
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
    if (path === `/maalauspalvelut-${city.slug}`) return { ...areaCitySeo(city), hero: cardHero(cityHeroBase(city.slug, "alue")) };
  }
  for (const city of pinnoitusCities) {
    if (path === `/tiilikaton-pinnoitus-${city.slug}`) return { ...pinnoitusCitySeo(city), hero: cardHero(cityHeroBase(city.slug, "pinnoitus")) };
  }
  for (const city of puhdistusCities) {
    if (path === `/katon-puhdistus-${city.slug}`) return { ...puhdistusCitySeo(city), hero: fullHero(HERO_BASE.puhdistus) };
  }
  for (const city of maalausCities) {
    if (path === `/talon-maalaus-${city.slug}`) return { ...maalausCitySeo(city), hero: cardHero(cityHeroBase(city.slug, "maalaus")) };
  }
  return undefined;
};
