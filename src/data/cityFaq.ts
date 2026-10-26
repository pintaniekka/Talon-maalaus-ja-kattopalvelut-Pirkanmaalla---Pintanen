import type { CityData } from "./cityData";
import { getProjectItems, type ProjectService } from "./projects";
import { getCityLocalFacts } from "./cityLocalFacts";

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Paikkakunnan omat kysymykset kaupunkisivun usein kysyttyihin.
 * Kohdelause näytetään vain, jos paikkakunnalta on oikea kohde tiedostossa projects.ts.
 * Talokannan luvut ovat sivun omassa osiossa (CityHousingFacts), eivät enää UKK:ssa (tarkastus 12.10.2026).
 */
export const getLocalCityFaq = (city: CityData, service: ProjectService): FAQItem[] => {
  const hasProject = getProjectItems(city.slug, service).length > 0;
  const kuvat = hasProject ? " Kuvia kohteistamme on tällä sivulla." : "";
  const paikkakunta: FAQItem =
    service === "pinnoitus"
      ? {
          question: `Teettekö tiilikaton pinnoituksia ${city.cityIn}?`,
          answer: `Kyllä. Tulemme ${city.cityTo} katsomaan katon ilmaiseksi, ja saat tarjouksen käynnin jälkeen.${kuvat}`,
        }
      : {
          question: `Teettekö talon maalauksia ${city.cityIn}?`,
          answer: `Kyllä. Eemil tulee ${city.cityTo} katsomaan talon ilmaiseksi, ja saat kirjallisen tarjouksen käynnin jälkeen.${kuvat}`,
        };
  // Paketti C (26.10.2026): kunnan rakennusjärjestyksen sääntö värin vaihdosta, teksti cityLocalFacts.ts:ssä.
  const local = getCityLocalFacts(city.slug);
  const vari: FAQItem[] = local
    ? [
        {
          question:
            service === "pinnoitus"
              ? `Pitääkö katon värin vaihdosta ilmoittaa kunnalle ${city.cityIn}?`
              : `Pitääkö seinien värin vaihdosta ilmoittaa kunnalle ${city.cityIn}?`,
          answer: local.ukk,
        },
      ]
    : [];
  return [paikkakunta, ...vari, ...yleisetKysymykset(service)];
};

/**
 * Eerikin vastaukset 7.10.2026 muotoiltuna. Samat kaikilla paikkakunnilla.
 * Kotona olemisesta (Eerik 7.10.2026): arviokäynnillä pitää olla, tarjous tehdään paikan päällä; työn aikana mieluummin kotona.
 * Karsittu 12.10.2026 (tarkastus): kaupunkisivun UKK on yhdessä faqData.ts:n kanssa enintään 10 kysymystä.
 * Yhteydenoton ajankohta, käynnin nopeus ja kausi ovat yhdessä vastauksessa. Matkakuluista ei sanota mitään (Eerik 13.10.2026).
 */
const yleisetKysymykset = (service: ProjectService): FAQItem[] => {
  const katto = service === "pinnoitus";
  return [
    {
      question: "Milloin kannattaa ottaa yhteyttä?",
      answer:
        "Mitä aikaisemmin, sitä parempi. Kesän työt täyttyvät pitkälti jo keväällä, ja kesällä tilattu työ menee yleensä loppukesään. Kausi on huhti–toukokuusta elo–syyskuuhun. Katsomaan pääsemme yleensä samalla viikolla, myös illalla tai viikonloppuna.",
    },
    {
      question: "Pitääkö minun olla kotona?",
      answer: `Arviokäynnillä kyllä. Tarjous tehdään aina paikan päällä, ja käymme ${katto ? "katon" : "seinät"} ja tarjouksen läpi yhdessä. Työn aikana on mukava, jos olet kotona, mutta pakollista se ei ole.`,
    },
    {
      question: "Mitä tapahtuu, jos kesken työn sataa?",
      answer: "Korjaamme kaikki sateen aiheuttamat jäljet ilman lisähintaa. Vastaamme siitä, että lopputulos on hyvä.",
    },
    {
      question: "Teettekö myös kesämökkejä ja piharakennuksia?",
      answer: "Kyllä. Teemme myös kesämökit, autotallit ja muut piharakennukset.",
    },
    {
      question: "Miten takuu toimii?",
      answer: `Jos pinnassa näkyy vikaa, joka johtuu työstämme, korjaamme sen takuulla. ${katto ? "Tiilikaton pinnoituksella on 5 vuoden kirjallinen takuu." : "Talon maalauksella on 2 vuoden takuu."}`,
    },
  ];
};
