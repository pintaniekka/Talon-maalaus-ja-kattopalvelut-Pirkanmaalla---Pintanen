/**
 * Arvostelu ja sen kohde samassa kortissa: asiakkaan Google-arvostelu, Eerikin lyhyt kertomus
 * kohteesta ja kuvat samasta katosta. Yhdistys tehty Eerikin kuvakansion nimistä 7.10.2026.
 * Kuvat, jotka ovat tässä, jätetään pois paikkakunnan kohderuudukosta (ei tuplia).
 */
export interface ReviewCase {
  /** Arvostelijan nimi täsmälleen kuten testimonialsData.ts:ssä. */
  name: string;
  city: string;
  /** Tekijän kertomus kohteesta, lyhyesti. */
  story?: string;
  /** Kuka kertoo: oletus Eerik; seinäkohteissa Eemil (sähköpostit 27.10.2026). */
  kertoja?: string;
  /** Kattosivulla vain Eerikin kortti ja seinäsivulla vain Eemilin (Eerik 28.10.2026). Ilman arvoa näkyy molemmilla. */
  service?: "pinnoitus" | "maalaus";
  /** Kuvien perusnimet: ennen, jälkeen tai yksittäinen kuva. */
  before?: string;
  after?: string;
  image?: string;
}

export const reviewCases: ReviewCase[] = [
  {
    name: "Jukka Peurala",
    city: "tampere",
    story: "Sade uhkasi, ja työ piti keskeyttää hetkeksi. Sateen jälkeen katto maalattiin loppuun. Katosta tuli kuin uusi.",
    before: "tiilikaton-pinnoitus-tampere-harmaa-tiilikatto-ennen",
    after: "tiilikaton-pinnoitus-tampere-tummanharmaa-tiilikatto-jalkeen",
  },
  {
    name: "Saarinen Seppo",
    city: "tampere",
    story: "Katto oli todella kulunut. Se pestiin ja maalattiin kahteen kertaan. Harjalle asennettiin myös harjatiiviste.",
    image: "tiilikaton-pinnoitus-tampere-tummanharmaa-tiilikatto-lahikuva",
  },
  // Sama kohde kahdesti: kattosivulla Eerikin kortti ja seinäsivulla Eemilin (Eerik 28.10.2026).
  {
    name: "Toni Reunanen",
    city: "tampere",
    service: "pinnoitus",
    story: "Samaan taloon maalattiin sekä katto että seinät.",
    image: "talon-maalaus-ja-tiilikaton-pinnoitus-tampere-puutalo-jalkeen",
  },
  {
    name: "Toni Reunanen",
    city: "tampere",
    service: "maalaus",
    kertoja: "Eemil",
    story: "Pihan ampiaispesät asiakas poisti ennen työtä. Talon koristeikkunat ovat harvinaisen hienot, ja ne maalattiin tarkasti.",
    before: "talon-maalaus-tampere-koristeikkunat-puutalo-ennen",
    after: "talon-maalaus-tampere-koristeikkunat-puutalo-jalkeen",
  },
  // Eemilin kohteet (sähköpostit myynti@pintanen.fi 27.10.2026): arvostelun antaneiden asiakkaiden kohteet kuvineen.
  {
    name: "Jukka Loukkola",
    city: "tampere",
    kertoja: "Eemil",
    story: "Tontti oli jyrkkä, joten telineet rakennettiin huolella. Hilseilevä pääty kaavittiin ja maalattiin.",
    before: "talon-maalaus-tampere-hilseileva-paaty-ennen",
    after: "talon-maalaus-tampere-hilseileva-paaty-jalkeen",
  },
  {
    name: "Satu Junkkila",
    city: "orivesi",
    kertoja: "Eemil",
    story: "Seinät pestiin perusteellisesti homepesuaineella, hilseilevä maali kaavittiin, paljaat puupinnat pohjamaalattiin ja julkisivu pintamaalattiin.",
    before: "talon-maalaus-orivesi-rintamamiestalo-paaty-ennen",
    after: "talon-maalaus-orivesi-rintamamiestalo-paaty-jalkeen",
  },
  {
    name: "Päivi Tuominen",
    city: "orivesi",
    kertoja: "Eemil",
    story: "Mökistä maalattiin kaikki: seinät, kaiteet, ikkunanpuitteet ja ovet. Kesken urakan asiakas toivoi, että myös terassi öljytään, ja se hoitui samalla.",
    before: "talon-maalaus-orivesi-hirsimokki-terassi-ennen",
    after: "talon-maalaus-orivesi-hirsimokki-terassi-jalkeen",
  },
  {
    name: "Lotta Härkönen",
    city: "nokia",
    kertoja: "Eemil",
    story: "Seinät pestiin ja huoltomaalattiin samalla värillä.",
    before: "talon-maalaus-nokia-vaaleansininen-omakotitalo-ennen",
    after: "talon-maalaus-nokia-vaaleansininen-omakotitalo-jalkeen",
  },
  {
    name: "Ari Reunanen",
    city: "akaa",
    kertoja: "Eemil",
    story: "Seinät pestiin ja huoltomaalattiin. Uusi keltainen oli hieman vanhaa tummempi, joten pensselinjäljet viimeisteltiin tarkasti. Lopputulos on erittäin hyvä.",
    before: "talon-maalaus-akaa-keltainen-omakotitalo-autokatos-ennen",
    after: "talon-maalaus-akaa-keltainen-omakotitalo-autokatos-jalkeen",
  },
  {
    name: "Sari Haataja",
    city: "ylojarvi",
    story: "Katto oli jyrkkä, ja siinä on kattoikkuna. Pesussa piti olla varovainen, ja ikkuna suojattiin maalauksen ajaksi. Työhön meni kolme päivää.",
    before: "tiilikaton-pesu-ja-pinnoitus-ylojarvi-puoliksi-pesty",
    after: "tiilikaton-pinnoitus-ylojarvi-keltainen-talo-jalkeen",
  },
];

export const getReviewCases = (city: string, service?: "pinnoitus" | "maalaus"): ReviewCase[] =>
  reviewCases.filter((c) => c.city === city && (!service || !c.service || c.service === service));

/** Kuvien perusnimet, jotka arvostelukortit jo näyttävät paikkakunnalla. */
export const reviewCaseImages = (city: string, service?: "pinnoitus" | "maalaus"): Set<string> =>
  new Set(getReviewCases(city, service).flatMap((c) => [c.before, c.after, c.image].filter((x): x is string => Boolean(x))));
