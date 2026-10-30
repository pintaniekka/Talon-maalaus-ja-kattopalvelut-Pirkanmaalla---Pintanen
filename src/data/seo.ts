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
 *
 * Tämä tiedosto on jokaisen sivun pääpaketissa (SEO-komponentti), joten se EI saa tuoda artikkelilistaa
 * (articles.ts) eikä kohdelistaa (projects.ts): ne kasvattivat jokaisen sivun JavaScriptiä noin 60 kt:lla
 * (laaja auditointi 30.10.2026). Artikkeli- ja kaupunkisivujen pääkuvat ja kaikkien reittien haku ovat
 * tiedostossa routeSeo.ts, jota käyttävät build ja kaupunkisivut.
 */
import { type CityData, hasPinnoitusPage } from "./cityData";
import { PINNOITUS_HINTA, MAALAUS_HINTA } from "./tyovaiheet";
import { avifVastine, getResponsiveSrc, getResponsiveSrcSet } from "../lib/storage";

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
export const fullHero = (base: string) => ({ base, sizes: "100vw" });
/** Korttihero (PageHero): kuva on oikealla kolmanneksella tietokoneella, koko leveydellä puhelimella. */
export const cardHero = (base: string) => ({ base, sizes: "(max-width: 1024px) 100vw, 34vw" });

export const HERO_BASE = {
  pinnoitus: "tiilikaton-pinnoitus-kirkkaan-punainen-tiilikatto-jalkeen",
  puhdistus: "tiilikaton-pesu-puhdas-tiilikatto-jalkeen",
  maalaus: "talon-maalaus-hameenkyro-tummansininen-puutalo-jalkeen",
  alue: "talon-maalaus-ja-tiilikaton-pinnoitus-tampere-puutalo-jalkeen",
  pinnoitusHinta: "tiilikaton-pesu-ja-pinnoitus-sammaleenpoisto",
  maalausHinta: "talon-maalaus-vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen",
  meista: "tiilikaton-pinnoitus-tampere-eerik-pitkanen-katolla",
  toimintaAlueet: "talon-maalaus-hameenlinna-keltainen-omakotitalo-jalkeen",
  referenssit: "tiilikaton-pinnoitus-vastamaalattu-tiilikatto-jalkeen",
  kokemuksia: "tiilikaton-pinnoitus-kangasala-keltainen-talo-jalkeen",
} as const;

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
  "/ilmainen-katon-kuntotarkastus": cardHero(HERO_BASE.meista),
  "/ilmainen-julkisivun-kuntoarvio": cardHero("talon-maalaus-orivesi-rintamamiestalo-paaty-ennen"),
  "/harjatiivisteen-asennus": cardHero("tiilikaton-pinnoitus-harjatiivisteen-asennus"),
  "/taloyhtiot": cardHero(HERO_BASE.maalausHinta),
  "/kotitalousvahennys": cardHero(HERO_BASE.alue),
  // Artikkelilistauksen oma hero (29.10.2026): kuva oikealla sarakkeella, enintään 520 px.
  "/artikkelit": { base: HERO_BASE.alue, sizes: "(min-width: 1024px) 520px, 100vw" },
};

/**
 * Preload-linkin attribuutit pääkuvalle. `href` on WebP (kuvasitemap käyttää sitä); `preload` on
 * AVIF, jos kuvalla on AVIF-versiot, muuten WebP.
 */
export const heroPreload = (hero: NonNullable<RouteSeo["hero"]>) => {
  const href = getResponsiveSrc(hero.base);
  const imagesrcset = getResponsiveSrcSet(hero.base);
  const avifHref = avifVastine(href);
  const avifSrcset = avifVastine(imagesrcset);
  return {
    href,
    imagesrcset,
    imagesizes: hero.sizes,
    preload:
      avifHref && avifSrcset
        ? { href: avifHref, imagesrcset: avifSrcset, type: "image/avif" }
        : { href, imagesrcset, type: "image/webp" },
  };
};

export const DEFAULT_TITLE = "Tiilikaton pinnoitus ja talon maalaus Pirkanmaa | Pintanen";
// Search Console 26.10.2026 (paketti H): etusivu näkyy hauilla "maalausliike tampere", "julkisivumaalaus tampere" ja
// "ulkomaalaus pirkanmaa" sijoilla 2–10 lähes ilman klikkauksia, joten kuvaus kertoo kotipaikan heti alussa.
export const DEFAULT_DESCRIPTION =
  "Tamperelainen maalausliike Pintanen pinnoittaa tiilikattoja ja maalaa talojen julkisivut Pirkanmaalla ja lähikunnissa. Eerik ja Eemil tekevät työn itse.";

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
      "Laske tiilikaton pinnoituksen tai talon maalauksen hinta minuutissa. Vastaa muutamaan kysymykseen, niin saat suuntaa antavan hinta-arvion. Pirkanmaa.",
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
  "/ilmainen-katon-kuntotarkastus": {
    title: "Ilmainen katon kuntotarkastus Pirkanmaalla – 0 €",
    description:
      "Ilmainen katon kuntotarkastus: Eerik katsoo tiilet, saumat, läpiviennit ja aluskatteen, yleensä samalla viikolla. Kirjallinen tarjous kiinteällä hinnalla.",
  },
  "/taloyhtiot": {
    title: "Tiilikaton pinnoitus ja talon maalaus taloyhtiöille",
    description:
      "Taloyhtiön tiilikaton pinnoitus ja ulkoseinien maalaus Pirkanmaalla: rivi-, pari- ja kerrostalot. Ilmainen kuntotarkastus, kiinteä hinta, samat tekijät.",
  },
  "/harjatiivisteen-asennus": {
    title: "Harjatiivisteen asennus tiilikattoon – hinta ja asennus",
    description:
      "Harjatiiviste pitää tuiskulumen, veden ja roskat poissa aluskatteelta. Asennus pinnoituksen yhteydessä 15 €/m tai erikseen 25 €/m. Tarkistus on ilmainen.",
  },
  "/ilmainen-julkisivun-kuntoarvio": {
    title: "Ilmainen julkisivun kuntoarvio ja arviokäynti Pirkanmaalla",
    description:
      "Ilmainen arviokäynti ennen talon maalausta: Eemil katsoo maalipinnan, paljaat puukohdat ja pohjatöiden määrän. Kirjallinen tarjous kiinteällä hinnalla.",
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

/**
 * Staattisen sivun SEO-tiedot pääkuvineen. Artikkelit ja kaupunkisivut: getRouteSeo tiedostossa routeSeo.ts.
 */
export const getStaticRouteSeo = (path: string): RouteSeo | undefined =>
  staticSeo[path] ? { ...staticSeo[path], hero: staticHero[path] } : undefined;
