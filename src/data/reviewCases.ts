/**
 * Arvostelu ja sen kohde samassa kortissa: asiakkaan Google-arvostelu, Eerikin lyhyt kertomus
 * kohteesta ja kuvat samasta katosta. Yhdistys tehty Eerikin kuvakansion nimistä 7.10.2026.
 * Kuvat, jotka ovat tässä, jätetään pois paikkakunnan kohderuudukosta (ei tuplia).
 */
export interface ReviewCase {
  /** Arvostelijan nimi täsmälleen kuten testimonialsData.ts:ssä. */
  name: string;
  city: string;
  /** Eerikin kertomus kohteesta, lyhyesti. */
  story?: string;
  /** Kuvien perusnimet: ennen, jälkeen tai yksittäinen kuva. */
  before?: string;
  after?: string;
  image?: string;
}

export const reviewCases: ReviewCase[] = [
  {
    name: "Jukka Peurala",
    city: "tampere",
    story: "Sade uhkasi, ja työ piti keskeyttää hetkeksi. Katosta tuli silti täydellinen, ja asiakas oli todella tyytyväinen.",
    before: "harmaa-tiilikatto-ennen-pinnoitusta-tampere",
    after: "tummanharmaa-tiilikatto-pinnoituksen-jalkeen-tampere",
  },
  {
    name: "Saarinen Seppo",
    city: "tampere",
    story: "Katto oli todella kulunut. Kaksi reilua maalikerrosta teki siitä upean. Harjalle asennettiin myös harjatiiviste.",
    image: "tummanharmaa-pinnoitettu-tiilikatto-lahikuva-tampere",
  },
  {
    name: "Toni Reunanen",
    city: "tampere",
    story: "Samaan taloon maalattiin sekä katto että seinät.",
    image: "puutalon-katon-ja-seinien-maalaus-tampere",
  },
  {
    name: "Sari Haataja",
    city: "ylojarvi",
    story: "Katto oli jyrkkä, ja siinä on kattoikkuna. Pesussa piti olla varovainen, ja ikkuna suojattiin maalauksen ajaksi. Työhön meni kolme päivää.",
    before: "tiilikatto-puoliksi-pesty-ylojarvi",
    after: "keltainen-talo-pinnoitettu-tiilikatto-ylojarvi",
  },
];

export const getReviewCases = (city: string): ReviewCase[] => reviewCases.filter((c) => c.city === city);

/** Kuvien perusnimet, jotka arvostelukortit jo näyttävät paikkakunnalla. */
export const reviewCaseImages = (city: string): Set<string> =>
  new Set(getReviewCases(city).flatMap((c) => [c.before, c.after, c.image].filter((x): x is string => Boolean(x))));
