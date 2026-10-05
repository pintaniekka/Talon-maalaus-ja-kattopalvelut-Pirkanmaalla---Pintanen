import { fmtNumber } from "./prices";
import { getCityHousingStats, type CityHousingStats } from "./cityHousingStats";

type Service = "pinnoitus" | "maalaus";

/** Vuosikymmen (1960–2019), jolloin taloja valmistui eniten. */
const busiestDecade = (s: CityHousingStats) =>
  [
    { label: "1960-luvulla", value: s.v1960 },
    { label: "1970-luvulla", value: s.v1970 },
    { label: "1980-luvulla", value: s.v1980 },
    { label: "1990-luvulla", value: s.v1990 },
    { label: "2000-luvulla", value: s.v2000 },
    { label: "2010-luvulla", value: s.v2010 },
  ].reduce((a, b) => (b.value > a.value ? b : a));

/** Tilastolauseet tekstinä. Samaa tekstiä käytetään myös usein kysyttyjen vastauksessa. */
export const housingFactsText = (citySlug: string, cityIn: string, service: Service): string | undefined => {
  const s = getCityHousingStats(citySlug);
  if (!s) return undefined;
  const busiest = busiestDecade(s);
  if (service === "pinnoitus") {
    const a = s.v1970 + s.v1980;
    const b = s.v1990 + s.v2000;
    return `${cityIn} on ${fmtNumber(s.yhteensa)} omakoti- ja paritaloa. Niistä ${fmtNumber(a)} on rakennettu 1970- ja 1980-luvuilla ja ${fmtNumber(b)} vuosina 1990–2009. Vuoden 1960 jälkeen eniten taloja valmistui ${busiest.label}.`;
  }
  const before2010 = s.yhteensa - s.v2010 - s.v2020 - s.tuntematon;
  return `${cityIn} on ${fmtNumber(s.yhteensa)} omakoti- ja paritaloa. Niistä ${fmtNumber(before2010)} on rakennettu ennen vuotta 2010. Vuoden 1960 jälkeen eniten taloja valmistui ${busiest.label}.`;
};
