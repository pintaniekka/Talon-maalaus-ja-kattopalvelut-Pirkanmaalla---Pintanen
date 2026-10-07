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

  items.push(...yleisetKysymykset(city, service));

  const facts = housingFactsText(city.slug, city.cityIn, service);
  if (facts) {
    items.push({
      question: `Kuinka paljon omakotitaloja ${city.cityIn} on?`,
      answer: `${facts} Lähde: ${HOUSING_STATS_SOURCE_LABEL}.`,
    });
  }
  return items;
};

/**
 * Eerikin vastaukset 7.10.2026 muotoiltuna. Samat kaikilla paikkakunnilla; paikkakunnan nimi lauseessa.
 * Kotona olemisesta: Eerikin vastaus on "kyllä täytyy" (työvaiheartikkelissa lukee toisin, tarkistettava).
 */
const yleisetKysymykset = (city: CityData, service: ProjectService): FAQItem[] => {
  const katto = service === "pinnoitus";
  const items: FAQItem[] = [
    {
      question: `Tuleeko matkasta lisäkulua ${city.cityIn}?`,
      answer: `Ei tule. ${city.name} kuuluu toiminta-alueeseemme, ja hinta on sama koko alueella.`,
    },
    {
      question: "Kuinka nopeasti pääsette katsomaan kohteen?",
      answer: "Yleensä samalla viikolla, kun otat yhteyttä. Käynti on ilmainen, ja sen voi sopia myös illaksi tai viikonlopuksi.",
    },
    {
      question: "Milloin kannattaa ottaa yhteyttä?",
      answer: "Mitä aikaisemmin, sitä parempi. Kesän työt täyttyvät pitkälti jo keväällä. Jos otat yhteyttä kesällä, työ menee yleensä loppukesään.",
    },
    {
      question: "Milloin teette töitä?",
      answer: "Kausi alkaa yleensä huhti–toukokuussa ja päättyy elo–syyskuussa. Teemme kattoja ja seiniä samaan aikaan.",
    },
    {
      question: "Pitääkö minun olla kotona?",
      answer: "Kyllä. Käymme asiat läpi yhdessä paikan päällä sekä arviokäynnillä että työn aikana.",
    },
    {
      question: "Mitä tapahtuu, jos kesken työn sataa?",
      answer: "Korjaamme kaikki sateen aiheuttamat jäljet ilman lisähintaa. Vastaamme siitä, että lopputulos on hyvä.",
    },
    {
      question: "Voiko katon ja seinät tehdä samalla kertaa?",
      answer: "Kyllä. Kun teemme sekä katon että seinät, saat edullisemman pakettihinnan.",
    },
    {
      question: "Teettekö myös kesämökkejä ja piharakennuksia?",
      answer: "Kyllä. Teemme myös kesämökit, autotallit ja muut piharakennukset.",
    },
    {
      question: "Miten takuu toimii?",
      answer: `Jos pinnassa näkyy vikaa, joka johtuu työstämme, korjaamme sen takuun puitteissa. ${katto ? "Tiilikaton pinnoituksella on 5 vuoden kirjallinen takuu." : "Talon maalauksella on 2 vuoden takuu."}`,
    },
  ];
  if (katto) {
    items.splice(5, 0,
      {
        question: "Mistä vaihtotiilet tulevat?",
        answer: "Jos sinulla on varatiiliä, käytämme niitä. Muuten voit hankkia tiilet itse, tai me haemme ne sovittua lisähintaa vastaan.",
      },
      {
        question: "Voiko katon värin vaihtaa pinnoituksessa?",
        answer: "Kyllä voi. Nowocoatin kattomaaleissa on laaja värivalikoima, joten katto voi saada pinnoituksessa myös uuden värin.",
      },
    );
  }
  return items;
};
