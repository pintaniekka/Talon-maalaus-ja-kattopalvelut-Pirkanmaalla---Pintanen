import { type CityData, allCities, getCityBySlug, hasMaalausPage, hasPinnoitusPage } from "./cityData";
import { getProjectItems, type ProjectService } from "./projects";
import { getCityLocalFacts } from "./cityLocalFacts";
import { cityNeighborhoods } from "./cityNeighborhoods";
import { cityNeighbors } from "./cityNeighbors";
import {
  KOTITALOUSVAHENNYS_VASTAUS,
  MAALAUS_KAYNTI_VASTAUS,
  MAALAUS_KESTO_VASTAUS,
  MAALAUS_TAKUU_FAQ,
  PINNOITUS_KAYNTI_VASTAUS,
  PINNOITUS_KESTO_VASTAUS,
  PINNOITUS_TAKUU_FAQ,
} from "./faqData";

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Kaupunkisivun usein kysytyt: yhdeksän kysymystä (kahdeksan UKK-uudistuksessa 30.10.2026, yhdeksäs synonyymikysymys 31.10.2026, laaja auditointi luku 4).
 * Ennen sivulla oli 14–17 kysymystä, joista 10–11 oli sanasta sanaan samoja kaikilla 24 paikkakunnalla.
 *
 * - Neljä ydinkysymystä: hinta ja kesto paikkakunnan nimellä, kotitalousvähennys ja takuu. Vastaukset ovat samat
 *   kuin palvelun pääsivulla (faqData.ts), jotta luvut pysyvät yhdessä paikassa.
 * - Neljä paikallista: (1) teettekö / oletteko tehneet paikkakunnalla, kunnan kylät ja kaupunginosat
 *   (cityNeighborhoods.ts) ja omat kohteet, jos niitä on (projects.ts); (2) milloin pääsette, ja muilla kuin
 *   Tampereen sivulla linkki Tampereen sivulle; (3) värin vaihto kunnan rakennusjärjestyksen mukaan
 *   (cityLocalFacts.ts, luettu kunnan asiakirjoista); (4) naapurikunnat linkkeineen (cityNeighbors.ts).
 * - Muut yleiset kysymykset ovat palvelun pääsivulla, ja lista päättyy linkkiin sinne (FAQSection, lisaa).
 *
 * Ei keksittyä paikkakuntatietoa: kaikki paikalliset tiedot tulevat yllä mainituista tiedostoista, joiden
 * lähteet ovat docs/kaupunkisivut-lahteet.md:ssä. Kohdemääriä ei kerrota (CLAUDE.md).
 * Kysymykset, joihin sivun oma lohko jo vastaa otsikollaan (remontti vai pinnoitus, milloin talo pitää maalata,
 * minkä ikäisiä taloja), eivät ole UKK:ssa.
 */
export const getCityFaq = (city: CityData, service: ProjectService): FAQItem[] => {
  const katto = service === "pinnoitus";
  const paikka = city.cityIn;
  const ydin: FAQItem[] = katto
    ? [
        {
          question: `Paljonko tiilikaton pinnoitus maksaa ${paikka}?`,
          answer:
            'Tiilikaton pinnoitus maksaa meillä yleensä <strong>2 850–7 000 €</strong>. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Hinta sisältää työn, materiaalit ja siivouksen. Jos teemme samalla kertaa myös seinät, saat edullisemman pakettihinnan.',
        },
        { question: `Kuinka kauan tiilikaton pinnoitus kestää ${paikka}?`, answer: PINNOITUS_KESTO_VASTAUS },
      ]
    : [
        {
          question: `Mitä omakotitalon maalaus maksaa ${paikka}?`,
          answer:
            'Omakotitalon maalaus maksaa meillä yleensä <strong>3 500–11 000 €</strong>. Hinta riippuu talon koosta, korkeudesta ja pohjatöiden määrästä. Jos teemme samalla kertaa myös katon, saat edullisemman pakettihinnan. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.',
        },
        { question: `Kuinka kauan talon maalaus kestää ${paikka}?`, answer: MAALAUS_KESTO_VASTAUS },
      ];

  return [
    ...ydin,
    paikkakuntaKysymys(city, service),
    {
      question: katto ? `Milloin pääsette katsomaan katon ${paikka}?` : `Milloin pääsette maalaamaan ${paikka}?`,
      answer: (katto ? PINNOITUS_KAYNTI_VASTAUS : MAALAUS_KAYNTI_VASTAUS) + tampereLinkki(city.name, katto ? TAMPERE_PINNOITUS_LINKIT : TAMPERE_MAALAUS_LINKIT),
    },
    ...varinVaihto(city, service),
    ...naapurikunnat(city, service),
    {
      question: katto ? "Saako tiilikaton pinnoituksesta kotitalousvähennystä?" : "Saako talon maalauksesta kotitalousvähennystä?",
      answer: KOTITALOUSVAHENNYS_VASTAUS,
    },
    katto ? PINNOITUS_TAKUU_FAQ : MAALAUS_TAKUU_FAQ,
    synonyymiKysymys(katto),
  ];
};

/**
 * Yhdeksäs kysymys (Eki 31.10.2026): hakusanat, joilla asiakkaat hakevat samaa työtä. Kaikki synonyymit ovat
 * vastauksessa luonnollisena lauseena. Sama jokaisella paikkakunnalla; kysymys on listan lopussa, jotta
 * paikalliset kysymykset pysyvät paikoillaan (ukk.test.ts).
 */
const synonyymiKysymys = (katto: boolean): FAQItem =>
  katto
    ? {
        question: "Onko katon maalaus ja pinnoitus sama asia?",
        answer:
          "Kyllä. Tiilikaton pinnoitus, katon maalaus, tiilikaton maalaus, kattomaalaus ja tiilikaton pesu ja pinnoitus tarkoittavat kaikki samaa työtä. Pesemme katon aina ennen maalausta, vaihdamme rikkinäiset tiilet ja maalaamme katon kahteen kertaan.",
      }
    : {
        question: "Mitä eroa on ulkomaalauksella ja julkisivumaalauksella?",
        answer:
          "Ei eroa. Talon maalaus, ulkomaalaus, julkisivumaalaus ja huoltomaalaus tarkoittavat samaa työtä. Pesemme seinät homepesuaineella, kaavimme irtoavan maalin, pohjamaalaamme paljaat kohdat ja maalaamme pintamaalin pensselillä.",
      };

/** Kolme kylää tai kaupunginosaa nimetään vastauksessa (perusmuodossa, ei taivutuksia). */
const alueet = (slug: string): string[] =>
  (cityNeighborhoods.find((c) => c.slug === slug)?.neighborhoods ?? []).filter((n) => !/\balue\b/.test(n)).slice(0, 3);

const luettelo = (nimet: string[]): string =>
  nimet.length <= 1 ? nimet.join("") : `${nimet.slice(0, -1).join(", ")} ja ${nimet[nimet.length - 1]}`;

/**
 * Paikallinen kysymys 1. Paikkakunnilla, joilta on omia kohteita, kysymys on "Oletteko … ?" ja vastaus viittaa
 * sivun kuviin; muilla "Teettekö … ?". Molemmissa kunnan kylät tai kaupunginosat.
 */
const paikkakuntaKysymys = (city: CityData, service: ProjectService): FAQItem => {
  const katto = service === "pinnoitus";
  const omiaKohteita = getProjectItems(city.slug, service).length > 0;
  const nimet = alueet(city.slug);
  const koko = nimet.length > 0 ? ` Toiminta-alueeseemme kuuluu koko ${city.name}, myös ${luettelo(nimet)}.` : "";
  const kaynti = katto
    ? `Tulemme ${city.cityTo} katsomaan katon ilmaiseksi, ja saat tarjouksen käynnin jälkeen.`
    : `Eemil tulee ${city.cityTo} katsomaan talon ilmaiseksi, ja saat kirjallisen tarjouksen käynnin jälkeen.`;
  if (omiaKohteita) {
    return {
      question: katto ? `Oletteko pinnoittaneet tiilikattoja ${city.cityIn}?` : `Oletteko maalanneet taloja ${city.cityIn}?`,
      answer: `Kyllä. Kuvia ${city.cityIn} tekemistämme ${katto ? "katoista" : "taloista"} on tällä sivulla.${koko} ${kaynti}`,
    };
  }
  return {
    question: katto ? `Teettekö tiilikaton pinnoituksia ${city.cityIn}?` : `Teettekö talon maalauksia ${city.cityIn}?`,
    answer: `Kyllä. ${kaynti}${koko}`,
  };
};

/** Paikallinen kysymys 3: kunnan rakennusjärjestyksen sääntö värin vaihdosta (paketti C, cityLocalFacts.ts). */
const varinVaihto = (city: CityData, service: ProjectService): FAQItem[] => {
  const local = getCityLocalFacts(city.slug);
  if (!local) return [];
  return [
    {
      question:
        service === "pinnoitus"
          ? `Pitääkö katon värin vaihdosta ilmoittaa kunnalle ${city.cityIn}?`
          : `Pitääkö seinien värin vaihdosta ilmoittaa kunnalle ${city.cityIn}?`,
      answer: local.ukk,
    },
  ];
};

/**
 * Paikallinen kysymys 4: naapurikunnat, joissa on saman palvelun sivu (tai aluesivu). Tampere jätetään pois,
 * koska sen linkki on jo käyntikysymyksessä (Eerik 27.10.2026: Tampere enintään kerran muiden kuntien sivuilla).
 */
const naapurikunnat = (city: CityData, service: ProjectService): FAQItem[] => {
  const katto = service === "pinnoitus";
  const linkit = (cityNeighbors[city.slug] ?? [])
    .filter((slug) => slug !== "tampere")
    .map((slug) => getCityBySlug(slug))
    .filter((c): c is CityData => !!c)
    .map((c) => {
      const href = katto
        ? hasPinnoitusPage(c.slug) ? `/tiilikaton-pinnoitus-${c.slug}/` : `/maalauspalvelut-${c.slug}/`
        : hasMaalausPage(c.slug) ? `/talon-maalaus-${c.slug}/` : `/maalauspalvelut-${c.slug}/`;
      return `<a href="${href}">${c.name}</a>`;
    });
  if (linkit.length === 0) return [];
  return [
    {
      question: katto ? `Pinnoitatteko kattoja myös ${city.cityGenitive} naapurikunnissa?` : `Maalaatteko taloja myös ${city.cityGenitive} naapurikunnissa?`,
      answer: `Kyllä. ${katto ? "Pinnoitamme kattoja" : "Maalaamme taloja"} myös ${linkit.length === 1 ? "naapurikunnassa" : "naapurikunnissa"}: ${luettelo(linkit)}. ${katto ? "Kuntotarkastus" : "Arviokäynti"} on ilmainen joka kunnassa.`,
    },
  ];
};

/**
 * Naapurikuntien sivuilta tekstilinkki Tampereen palvelusivulle (sisäinen linkitys 27.10.2026).
 * Ankkuri vaihtuu paikkakunnan nimen mukaan, jotta sama ankkuri ei toistu yli viidesti. Tampereen omalla sivulla ei linkkiä.
 */
const TAMPERE_PINNOITUS_LINKIT = [
  'Pinnoitamme kattoja myös <a href="/tiilikaton-pinnoitus-tampere/">Tampereen alueella</a>.',
  'Katso myös <a href="/tiilikaton-pinnoitus-tampere/">tiilikaton pinnoitus ja maalaus Tampereella</a>.',
  'Sama työ ja sama hinta pätevät myös <a href="/tiilikaton-pinnoitus-tampere/">tiilikaton pinnoitukseen Tampereella</a>.',
  'Lue, miten <a href="/tiilikaton-pinnoitus-tampere/">pinnoitamme tiilikattoja Tampereella</a>.',
  'Kuvia näet sivulta, jolla esittelemme <a href="/tiilikaton-pinnoitus-tampere/">Tampereen kattokohteet</a>.',
  'Samalla tavalla pinnoitamme <a href="/tiilikaton-pinnoitus-tampere/">Tampereen tiilikatot</a>.',
  'Kotikaupungissamme teemme <a href="/tiilikaton-pinnoitus-tampere/">katon pinnoituksia Tampereella</a>.',
];
const TAMPERE_MAALAUS_LINKIT = [
  'Maalaamme taloja myös <a href="/talon-maalaus-tampere/">Tampereen alueella</a>.',
  'Katso myös <a href="/talon-maalaus-tampere/">ulkomaalaus Tampereella</a>.',
  'Samat työvaiheet ja hinnat pätevät myös <a href="/talon-maalaus-tampere/">talon maalaukseen Tampereella</a>.',
  'Lue, miten <a href="/talon-maalaus-tampere/">maalaamme puutaloja Tampereella</a>.',
  'Kuvia näet sivulta, jolla esittelemme <a href="/talon-maalaus-tampere/">Tampereen maalauskohteet</a>.',
  'Samalla tavalla maalaamme <a href="/talon-maalaus-tampere/">Tampereen puutalot</a>.',
  'Kotikaupungissamme teemme <a href="/talon-maalaus-tampere/">julkisivumaalauksia Tampereella</a>.',
];
/**
 * Ankkuri kiertää paikkakuntalistan järjestyksessä, jolloin kukin toistuu enintään viidesti (29 paikkakuntaa, 7 ankkuria).
 * Linkki on kaupunkisivun ainoa Tampere-maininta leipätekstissä (Eerik 27.10.2026: enintään yksi sivua kohti),
 * joten sen edessä ei ole muuta Tampere-lausetta.
 */
const tampereLinkki = (cityName: string, linkit: string[]): string => {
  if (cityName === "Tampere") return "";
  const i = allCities.findIndex((c) => c.name === cityName);
  return ` ${linkit[(i < 0 ? 0 : i) % linkit.length]}`;
};
