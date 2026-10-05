import type { CityData } from "./cityData";
import { getProjectItems, type ProjectService } from "./projects";
import { housingFactsText } from "./cityHousingText";
import { HOUSING_STATS_SOURCE_LABEL } from "./cityHousingStats";

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Paikkakunnan omat kysymykset kaupunkisivun usein kysyttyihin.
 * Kohdelause näytetään vain, jos paikkakunnalta on oikea kohde tiedostossa projects.ts.
 */
export const getLocalCityFaq = (city: CityData, service: ProjectService): FAQItem[] => {
  const hasProject = getProjectItems(city.slug, service).length > 0;
  const items: FAQItem[] = [];

  if (service === "pinnoitus") {
    items.push({
      question: `Teettekö tiilikaton pinnoituksia ${city.cityIn}?`,
      answer:
        `Kyllä teemme. ${city.name} kuuluu toiminta-alueeseemme. Tulemme katsomaan katon ilmaiseksi, ja saat tarjouksen käynnin jälkeen.` +
        (hasProject ? " Kuvia kohteistamme on tällä sivulla." : ""),
    });
  } else {
    items.push({
      question: `Teettekö talon maalauksia ${city.cityIn}?`,
      answer:
        `Kyllä teemme. ${city.name} kuuluu toiminta-alueeseemme. Eemil tulee katsomaan talon ilmaiseksi, ja saat kirjallisen tarjouksen käynnin jälkeen.` +
        (hasProject ? " Kuvia kohteistamme on tällä sivulla." : ""),
    });
  }

  const facts = housingFactsText(city.slug, city.cityIn, service);
  if (facts) {
    items.push({
      question: `Kuinka paljon omakotitaloja ${city.cityIn} on?`,
      answer: `${facts} Lähde: ${HOUSING_STATS_SOURCE_LABEL}.`,
    });
  }
  return items;
};
