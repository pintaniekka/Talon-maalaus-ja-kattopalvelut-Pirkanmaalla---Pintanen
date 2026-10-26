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
import { type CityData, allCities, hasPinnoitusPage, maalausCities, pinnoitusCities } from "./cityData";
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
  pinnoitus: "tiilikaton-pinnoitus-kirkkaan-punainen-tiilikatto-jalkeen",
  puhdistus: "tiilikaton-pesu-puhdas-tiilikatto-jalkeen",
  maalaus: "talon-maalaus-tummansininen-puutalo-ulkomaalaus-jalkeen",
  alue: "talon-maalaus-ja-tiilikaton-pinnoitus-tampere-puutalo-jalkeen",
  pinnoitusHinta: "tiilikaton-pesu-ja-pinnoitus-sammaleenpoisto",
  maalausHinta: "talon-maalaus-vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen",
  meista: "tiilikaton-pinnoitus-tampere-eerik-pitkanen-katolla",
  toimintaAlueet: "talon-maalaus-keltainen-omakotitalo-julkisivumaalaus-jalkeen",
  referenssit: "tiilikaton-pinnoitus-vastamaalattu-tiilikatto-jalkeen",
  kokemuksia: "tiilikaton-pinnoitus-kangasala-keltainen-talo-jalkeen",
} as const;

/** Kaupunkisivun hero-kuva: paikkakunnan oma kohde, jos sellainen on, muuten palvelun vakiokuva. */
export const cityHeroBase = (slug: string, service: "pinnoitus" | "maalaus" | "alue"): string =>
  getCityHeroBase(slug, service === "alue" ? undefined : service) ??
  (service === "pinnoitus" ? HERO_BASE.pinnoitus : service === "maalaus" ? HERO_BASE.maalaus : HERO_BASE.alue);

/** Staattisten sivujen pääkuvat (samat kuin sivukomponenttien heroissa). */
const staticHero: Record<string, RouteSeo["hero"]> = {
  "/tiilikaton-pinnoitus-pirkanmaa": cardHero(HERO_BASE.pinnoitus),
  "/talon-maalaus-pirkanmaa": cardHero(HERO_BASE.maalaus),
  "/hintalaskuri": fullHero("hintalaskuri-tausta"),
  "/tarjouspyynto": fullHero("hintalaskuri-tausta"),
  "/tiilikaton-pinnoitus-hinta-pirkanmaa": cardHero(HERO_BASE.pinnoitusHinta),
  "/talon-maalaus-hinta-pirkanmaa": cardHero(HERO_BASE.maalausHinta),
  "/meista": cardHero(HERO_BASE.meista),
  "/yhteystiedot": cardHero(HERO_BASE.meista),
  "/toiminta-alueet": cardHero(HERO_BASE.toimintaAlueet),
  "/referenssit": cardHero(HERO_BASE.referenssit),
  "/kokemuksia": cardHero(HERO_BASE.kokemuksia),
  "/ilmainen-kuntotarkastus": cardHero(HERO_BASE.meista),
  "/kotitalousvahennys": cardHero(HERO_BASE.alue),
};

/** Preload-linkin attribuutit pääkuvalle. */
export const heroPreload = (hero: NonNullable<RouteSeo["hero"]>) => ({
  href: getResponsiveSrc(hero.base),
  imagesrcset: getResponsiveSrcSet(hero.base),
  imagesizes: hero.sizes,
});

export const DEFAULT_TITLE = "Tiilikaton pinnoitus ja talon maalaus Pirkanmaa | Pintanen";
export const DEFAULT_DESCRIPTION =
  "Pintanen Oy pinnoittaa tiilikattoja ja maalaa taloja Pirkanmaalla ja lähikunnissa. Eerik ja Eemil tekevät työn itse. Ilmainen arviokäynti ja kirjallinen takuu.";

/** Lisää "| Pintanen" otsikon loppuun, jos sitä ei vielä ole. */
export const withBrand = (title?: string): string =>
  !title ? DEFAULT_TITLE : /\|\s*Pintanen\s*$/i.test(title) ? title : `${title} | Pintanen`;

/** Poistaa "| Pintanen" -lopun, jotta pituus lasketaan pelkästä otsikosta. */
export const stripBrand = (title: string): string => title.replace(/\s*\|\s*Pintanen\s*$/i, "");

/**
 * Title-pituus hakutuloksessa: 30–60 merkkiä ilman " | Pintanen" -loppua (Eerik 26.10.2026; alaraja oli ensin 35,
 * mutta Akaan aluesivu on 34 merkkiä eikä kaupunkisivun titleen lisätä Pirkanmaata. Auditoinnissa 27.10.2026 raja
 * oli 50–60 brändin kanssa, mikä pakotti lyhyisiin titleihin täytteen "– takuu").
 * Palauttaa ensimmäisen vaihtoehdon, joka mahtuu haarukkaan; jos mikään ei mahdu, viimeisen.
 */
export const TITLE_MIN = 30;
export const TITLE_MAX = 60;
export const titleLength = (title: string): number => stripBrand(title).length;
export const fitTitle = (variants: string[]): string =>
  variants.find((t) => {
    const n = titleLength(t);
    return n >= TITLE_MIN && n <= TITLE_MAX;
  }) ?? variants[variants.length - 1];

/** Kanoninen osoite polulle (loppukauttaviivalla, kuten sitemapissa). */
export const canonicalUrl = (path: string): string => {
  const clean = path.replace(/\/+$/, "");
  return clean === "" ? `${SITE_URL}/` : `${SITE_URL}${clean}/`;
};

/** Staattisten sivujen title ja description. */
export const staticSeo: Record<string, RouteSeo> = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/artikkelit": {
    title: "Artikkelit ja oppaat – katto ja talon maalaus",
    description:
      "Lue Pintasen oppaat tiilikaton pinnoituksesta ja talon maalauksesta. Kirjoittajat Eerik ja Eemil tekevät työt itse Pirkanmaalla.",
  },
  "/tarjouspyynto": {
    title: "Pyydä tarjous – ilmainen kuntotarkastus",
    description:
      "Pyydä tarjous tiilikaton pinnoituksesta tai talon maalauksesta. Eerik tai Eemil soittaa sinulle ja tulee ilmaiselle arviokäynnille. Pintanen, Pirkanmaa.",
  },
  "/hintalaskuri": {
    title: "Hintalaskuri: tiilikaton pinnoitus, talon maalaus",
    description:
      "Laske tiilikaton pinnoituksen tai talon maalauksen hinta minuutissa. Vastaa muutamaan kysymykseen ja saat suuntaa antavan hinta-arvion heti. Pirkanmaa.",
  },
  "/tiilikaton-pinnoitus-hinta-pirkanmaa": {
    title: `Tiilikaton pinnoitus hinta 2027: ${PINNOITUS_HINTA}`,
    description: `Tiilikaton pinnoitus maksaa omakotitalossa yleensä ${PINNOITUS_HINTA}. Katso hintaesimerkit, laske arvio laskurilla ja lue, mitä hintaan kuuluu. Pirkanmaa.`,
  },
  "/talon-maalaus-hinta-pirkanmaa": {
    title: `Talon maalaus hinta 2027: ${MAALAUS_HINTA}`,
    description: `Talon ulkomaalaus maksaa omakotitalossa yleensä ${MAALAUS_HINTA}. Katso hintaesimerkit, laske arvio laskurilla ja lue, mistä hinta syntyy. Pirkanmaa.`,
  },
  "/meista": {
    title: "Meistä – Eerik ja Eemil, yli 200 kohdetta",
    description:
      "Pintanen Oy on nuori perheyritys. Eerik pinnoittaa tiilikattoja ja Eemil maalaa taloja Pirkanmaalla ja lähikunnissa. Ei välikäsiä, kirjallinen takuu.",
  },
  "/yhteystiedot": {
    title: "Yhteystiedot – soita Eerikille tai Eemilille",
    description:
      "Yhteystiedot: Eerik Pitkänen 040 964 0066 (tiilikatot) ja Eemil Pitkänen 040 164 2233 (talon maalaus). Pintanen Oy, Tampere ja Pirkanmaa. Ilmainen arviokäynti.",
  },
  "/tiilikaton-pinnoitus-pirkanmaa": {
    title: "Tiilikaton pinnoitus Pirkanmaa – hinta, 5 v takuu",
    description: `Tiilikaton pinnoitus Pirkanmaalla: painepesu, rikkinäiset tiilet uusiin ja maalaus ruiskulla kahteen kertaan. Hinta yleensä ${PINNOITUS_HINTA}, 5 v takuu.`,
  },
  "/talon-maalaus-pirkanmaa": {
    title: "Talon maalaus Pirkanmaa – ulkomaalaus, 2 v takuu",
    description: `Talon maalaus Pirkanmaalla. Pesemme seinät homepesuaineella, kaavimme irtoavan maalin ja maalaamme pensselillä. Hinta yleensä ${MAALAUS_HINTA}, 2 v takuu.`,
  },
  "/ilmainen-kuntotarkastus": {
    title: "Ilmainen tiilikaton kuntotarkastus Pirkanmaalla",
    description: "Pyydä ilmainen tiilikaton kuntotarkastus. Eerik katsoo tiilet, saumat, läpiviennit ja aluskatteen, yleensä samalla viikolla. Saat kirjallisen tarjouksen heti.",
  },
  "/kotitalousvahennys": {
    title: "Kotitalousvähennys 2026 ja 2027: katto ja maalaus",
    description:
      "Kotitalousvähennys katon pinnoituksesta ja talon maalauksesta: 40 % työn osuudesta, enintään 2 100 € vuodessa, omavastuu 150 €. Samat luvut 2026 ja 2027.",
  },
  "/tietosuoja": {
    title: "Tietosuojaseloste – mitä tietoja keräämme",
    description:
      "Pintanen Oy:n tietosuojaseloste: mitä tietoja keräämme yhteydenotto- ja tarjouspyyntölomakkeilla, mihin niitä käytetään ja mitkä ovat oikeutesi.",
  },
  "/referenssit": {
    title: "Referenssit – kuvia omista kohteistamme",
    description:
      "Kuvia Pintasen töistä Pirkanmaalla ja lähikunnissa: tiilikattoja ennen ja jälkeen pinnoituksen sekä maalattuja taloja. Kuvat ovat omista kohteistamme.",
  },
  "/kokemuksia": {
    title: "Asiakkaiden kokemuksia: Google-arvostelut 5,0 / 5",
    description:
      "Kaikki Pintasen Google-arvostelut sanasta sanaan: tiilikaton pinnoitus ja talon maalaus Pirkanmaalla. Keskiarvo 5,0 / 5. Lue, mitä asiakkaat sanovat työstämme.",
  },
  "/toiminta-alueet": {
    title: "Toiminta-alueet – Pirkanmaa ja lähikunnat",
    description:
      "Pinnoitamme tiilikattoja ja maalaamme taloja Pirkanmaalla ja lähikunnissa noin tunnin säteellä Tampereelta. Katso kunnat ja pyydä ilmainen arviokäynti.",
  },
};

/**
 * Pinnoituksen kaupunkisivu: sama malli joka paikkakunnalla (S2, V22). Vaihe 3 (12.10.2026): "maalaus"
 * titleen, koska haut "katon maalaus <kunta>" ja "tiilikaton maalaus <kunta>" eivät osuneet sivuun;
 * hinta siirtyi kuvaukseen, jotta title pysyy alle 60 merkin.
 */
export const pinnoitusCitySeo = (city: CityData): RouteSeo => ({
  // Vaihe 12 (27.10.2026) ja Eerik 26.10.2026: sana "maalaus" pysyy titlessä hakujen "katon maalaus <kunta>"
  // takia, ja "hinta" jätetään pois, koska se ei mahdu 60 merkkiin. Takuu "5 v takuu" joka kaupungille
  // (Eerik 26.10.2026, korjaukset 3); pelkkä "– takuu" oli täytettä, eikä sitä enää käytetä.
  title: fitTitle([`Tiilikaton pinnoitus ja maalaus ${city.name} – 5 v takuu`, `Tiilikaton pinnoitus ja maalaus ${city.name}`]),
  description: `Tiilikaton pesu ja pinnoitus ${city.cityIn}. Eerik tekee työn itse. Ilmainen kuntotarkastus, 5 v takuu ja kotitalousvähennys. Hinta ${PINNOITUS_HINTA}.`,
});

/**
 * Maalauksen kaupunkisivu: hakutermi "ulkomaalaus" titleen (korjaus 2). Pitkä muoto "– ulkomaalaus ja
 * julkisivumaalaus" oli 63–66 merkkiä ja katkesi hakutuloksessa (auditointi 27.10.2026), joten sen tilalla on
 * sivun oma fakta, 2 vuoden takuu; pitkillä kunnannimillä pelkkä "– ulkomaalaus".
 */
export const maalausCitySeo = (city: CityData): RouteSeo => ({
  title: fitTitle([`Talon maalaus ${city.name} – ulkomaalaus, 2 v takuu`, `Talon maalaus ${city.name} – ulkomaalaus`]),
  description: `Talon maalaus ${city.cityIn}. Eemil pesee, kaapii ja maalaa pensselillä itse. Ilmainen arviokäynti, 2 v takuu ja kotitalousvähennys. Hinta ${MAALAUS_HINTA}.`,
});

/**
 * Aluesivu: kokoava sivu, joka linkittää palvelusivuille. Ei kilpaile palvelusivujen kanssa (korjaus 2).
 * "Maalausliike" titleen ja H1:een Eerikin päätöksellä 11.10.2026 ("maalausliike tampere" on suurin ei-brändihaku).
 */
export const areaCitySeo = (city: CityData): RouteSeo => ({
  // Ilman lisäyksiä (Eerik 26.10.2026, korjaukset 3): täyte "– takuu" poistettiin, kun raja laskettiin ilman brändiä.
  title: `Maalausliike ja kattopalvelut ${city.name}`,
  // Kannibalisointi (Search Console 26.10.2026): kun kaupungilla on omat palvelusivut, aluesivu ei kilpaile
  // samoilla avainsanoilla, vaan kuvaus esittelee yrityksen ja ohjaa palvelusivuille.
  description: hasPinnoitusPage(city.slug)
    ? `Maalausliike ja kattopalvelut ${city.cityIn}: Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Ilmainen arviokäynti, kirjallinen takuu.`
    : `Tiilikaton pinnoitus ja talon maalaus ${city.cityIn}. Eerik ja Eemil tekevät työn itse. Ilmainen arviokäynti, kirjallinen takuu ja kotitalousvähennys.`,
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
  for (const city of maalausCities) {
    if (path === `/talon-maalaus-${city.slug}`) return { ...maalausCitySeo(city), hero: cardHero(cityHeroBase(city.slug, "maalaus")) };
  }
  return undefined;
};
