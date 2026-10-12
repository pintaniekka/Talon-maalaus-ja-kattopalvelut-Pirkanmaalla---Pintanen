/**
 * Keskitetty arvosteludata + kaupunki- ja kategoriajakauma.
 *
 * `category` luokittelee arvostelun:
 *  - "katto" → katto- tai pinnoitustöitä koskevat arviot
 *  - "seina" → talon-/seinämaalausta koskevat arviot
 *  - "molemmat" → katto ja seinät samassa kohteessa; näkyy sekä katto- että seinälistoissa
 *  - "yleinen" → ei selvää kohdetta; näkyy vain yleisessä karusellissa
 *
 * Luokat Eerikin tiedoilla 12.10.2026 (kahdeksan aiemmin "yleinen"-arvostelua luokiteltu).
 */

export type TestimonialCategory = "katto" | "seina" | "molemmat" | "yleinen";

/** Kuuluuko arvostelu kategoriaan. "molemmat" lasketaan sekä kattoon että seinään. */
export const matchesCategory = (t: Testimonial, category: TestimonialCategory): boolean =>
  t.category === category || (t.category === "molemmat" && (category === "katto" || category === "seina"));

export interface Testimonial {
  /** Asiakkaan nimi (Google-arvostelusta, sanasta sanaan). */
  name: string;
  /** 1-5 tähteä. */
  stars: number;
  /** Arvostelun teksti, sanasta sanaan. ÄLÄ lyhennä. */
  text: string;
  /** Mihin palvelukategoriaan arvio liittyy. */
  category: TestimonialCategory;
  /** Paikkakunnan slug, jos kohde tiedetään (Eerikin kuvakansion nimistä tai arvostelun tekstistä, 7.10.2026). */
  city?: string;
}

/** Master-lista kaikista käytettävissä olevista arvosteluista. */
export const allTestimonials: Testimonial[] = [
  // Lisätty 7.10.2026 Google-profiilista (28 arvostelua). Teksti sanasta sanaan.
  {
    name: "Toni Reunanen",
    stars: 5,
    text: "Kiitos ammattimaisesta kattojen pesusta ja pinnoituksesta, sekä kahden rakennuksen ulkoseinien maalauksesta. Kaikki meni sovitun mukaisesti ja ilman mitään huomauttamista. Olemme erittäin tyytyväisiä valinnastamme.",
    category: "molemmat",
    city: "tampere",
  },
  {
    name: "mikko k",
    stars: 5,
    text: "Hyvin toimii homma Pintanen Oy, tulee kun sovittu ja katto pinnoituksen jälkeen kuin uusi.",
    category: "katto",
  },
  {
    name: "Lasse Haukisalmi",
    stars: 5,
    text: "Kaikki hommat hoidettiin mitä sovittiin. Työn jälki erinomaista katon maalauksessa.",
    category: "katto",
  },
  {
    name: "Sari Haataja",
    stars: 5,
    text: "Mainiota työtä - 25 vuotta vanha tiilikatto näyttää kuin uudelta!",
    category: "katto",
    city: "ylojarvi",
  },
  {
    name: "Anne Lahtinen",
    stars: 5,
    text: "Työt sujuivat sovitusti. Kyseessä oli saattaa omistajilta kesken jäänyt ok-talon maalaus loppuun. Maalausjälki siistiä ja töiden jäljet (roskat yms.) kerättiin pois. Työntekijät ystävällisiä ja hommansa osaavia. Korjasivatpa vielä pari omistajilta maalaamatta jäänyttä kohtaakin. Suosittelemme lämpimästi!",
    category: "seina",
  },
  {
    name: "Jukka Loukkola",
    stars: 5,
    text: "Maalauspalvelu, talon maalaus sujui jouhevasti ja sopimuksen mukaisesti. Työn jälki oli erinomainen, tekijät ammattilaisia nuoresta iästä huolimatta. Kommunikointi yrittäjän kanssa oli helppoa. Lämpimästi voi suositella!",
    category: "seina",
  },
  {
    name: "Jani Kalliala",
    stars: 5,
    text: "Työ meni niinkuin sovittiin. Plussat ehdottomasti mukavalle työmiehelle ja hyvälle työjäljelle. Kiitos👍",
    category: "katto",
  },
  {
    name: "Anna-Riitta Taipale",
    stars: 5,
    text: "Katon pesu ja maalaus hoitui aikataulussa. Työnjälki on hyvä ja ammattitaidolla tehty. Olemme olleet tyytyväisiä.",
    category: "katto",
  },
  {
    name: "J S",
    stars: 5,
    text: "Reipas nuorimies joka tuli sovittuna ajankohtana.Korjasi,pesi ja maalasi tiilikaton sovitun hinnan mukaan.Hyvin tehty työ.",
    category: "katto",
  },
  {
    name: "Mauri Rajuvaara",
    stars: 5,
    text: "Excellent quality of work within agreed budget and time frame",
    category: "katto",
  },
  {
    name: "Juuso Heimonen",
    stars: 5,
    text: "Erittäin hyvää palvelua. Urakka valmistui juuri niin kuin sovittiin ja työn jälki oli erinomaista. Suosittelen!",
    category: "katto",
  },
  {
    name: "Timo Leppänen",
    stars: 5,
    text: "Erittäin toimiva palvelu; hyvä yhteydenpito, siisti työnjälki ja ripeää toimintaa! Suosittelen!",
    category: "seina",
  },
  {
    name: "Timo Piilonen",
    stars: 5,
    text: "Eerik Pitkänen teki hyvän tarjouksen kattomaalauksesta ja -pinnoituksesta. Tarjous piti hyvin, työn laatu oli loistava ja itse työ sujui aikataulun mukaisesti. Erityisesti jäivät mieleen työn jälkien siistiminen ja maalarin hyvä raportointi tehdyistä toimista. Suosittelen lämpimästi.",
    category: "katto",
  },
  {
    name: "Terttu Anneli",
    stars: 4,
    text: "Olemme tyytyväisiä työhön. Katollammme oli runsaasti sammalta jonka puhdistus ja käsittely tuli tarpeeseen.",
    category: "katto",
  },
  {
    name: "Jukka Peurala",
    city: "tampere",
    stars: 5,
    text: "Haluan vilpittömästi kiittää upeasta työnjäljestä ja loistavasta palvelusta! Kattomaalaus toteutettiin äärimmäisen ammattitaidolla alusta loppuun asti. Työn jälki on ensiluokkaista – katto näyttää kuin uudelta, ja lopputulos ylitti reilusti odotuksemme. Erityisesti arvostan työn sujuvuutta ja tehokkuutta. Projekti hoidettiin nopeasti mutta huolellisesti. Kaikesta tekemisestä huokui vahva kokemus ja osaaminen. Lisäksi työskentely oli siistiä ja järjestelmällistä, mikä teki koko kokemuksesta erittäin miellyttävän. Kommunikointi oli selkeää ja ystävällistä koko prosessin ajan, ja sovituista asioista pidettiin kiinni täsmällisesti. Suosittelen lämpimästi! 👍",
    category: "katto",
  },
  {
    name: "Päivi Tuominen",
    stars: 5,
    text: "Hirsimökin maalausurakka sujui todella sujuvasti ja hyvin alusta loppuun asti. Vahva suositus.",
    category: "seina",
  },
  {
    name: "Satu Junkkila",
    city: "orivesi",
    stars: 5,
    text: "Olemme erittäin tyytyväisiä vanhempieni rintamamiestalon maalaukseen. Kaikki sujui kuten oli sovittu ja luvattu. Työnjälki on laadukasta ja maalausurakka pysyi täysin luvatussa aikataulussa. Palvelu oli ystävällistä, iloista ja asiantuntevaa. Kiitokset vielä täältä Orivedeltä ☺️",
    category: "seina",
  },
  {
    name: "Jukka Jukarainen",
    stars: 5,
    text: "Työt hoitui sovitusti ja työn jälki siistiä. Iso suositus kaikille kattohuoltoa tarvitseville!",
    category: "katto",
  },
  {
    name: "Antti Esko",
    stars: 5,
    text: "Eerik Pitkänen, Pintanen Oy teki meille tiilikaton puhdistuksen, sammaleenestokäsittelyn sekä pinnoituksen. Asiointi, yhteydenpito, työn suunnittelu ja itse työn jälki oli huippuluokkaa. Jälkitöistä siivouksineen ei jäänyt myöskään vaimollakaan moitittavaa. Vahva suositus.",
    category: "katto",
  },
  {
    name: "Teemu",
    stars: 5,
    text: "Maalarit tekivät töitä tehokkaasti ja työn jälki oli erinomaista! Voin suositella muillekin!",
    category: "seina",
  },
  {
    name: "Tapio Kivistö",
    stars: 5,
    text: "Hyvä työn jälki ja ahkera työnteko. Suosittelen!",
    category: "molemmat",
  },
  {
    name: "Ari Reunanen",
    stars: 5,
    text: "Talon ulkomaalaus tehtiin sovittua nopeammin, mutta myös tarkasti - todella hyvä työnjälki. Yhteydenpito oli sujuvaa ja herrojen kanssa oli mukava asioida. Suosittelen!",
    category: "seina",
  },
  {
    name: "Jari Sandelin",
    stars: 5,
    text: "Kattava tarjouksen tekeminen ja yksityiskohtien selvittäminen etukäteen. Lisäkysymyksiin vastattiin heti. Itse toteutus hoitui todella asiantuntevasti ja ripeästi. Työn jälki erinomaista ja kaikki sopimuksen kohdat hoidettiin esimerkillisesti. Ei mitään huomautettavaa. Kommunikointi selkeästi paikan päällä mitä suunnitteilla milloinkin ja Whatsappilla tavoitti myös jos oli kysyttävää. Täydet suosittelut kaikin puolin!",
    category: "katto",
  },
  {
    name: "Pirjo Raittila",
    stars: 5,
    text: "Omakotitalon ulkomaalaus sujui ongelmitta. Jälki on siisti. Aikataulukin piti niinkuin oltiin sovittu. Vahva suositus.",
    category: "seina",
  },
  {
    name: "Lotta Härkönen",
    stars: 5,
    text: "Talon maalaus sujui sovitusti, työn jälki erittäin hyvää. Kaikki meni kuten pitikin, maalarit kohteliaita ja viestivät suunnitelmista hyvissä ajoin. Toivat tarvikkeensa tullessaan ja veivät mennessään, meille ei jäänyt mitään siivottavaa tai kaatopaikalle vietävää.",
    category: "seina",
  },
  {
    name: "Teppo Annila",
    stars: 5,
    text: "Tilattiin tiilikaton pinnoituskäsittely ja harjatiivisteen asennus. Urakka sujui sovitusti aikataulussa ja kommunikointi oli kaikin puolin sujuvaa. Ja mikä tärkeintä, työn jälki oli erinomaista! Kiitos! Kuvat ennen ja jälkeen.",
    category: "katto",
  },
  {
    name: "Saarinen Seppo",
    city: "tampere",
    stars: 5,
    text: "Eerik Pitkänen Pintanen oy pesi ja maalasi tiilikaton työn jälki loistava. Aikataulut pitivät sovitusti paikkansa, jälkisiivous hyvä. Erittäin ripeä ja kohtelias nuorimies. Suosittelen kattomaalausta harkitsevalle.",
    category: "katto",
  },
  {
    name: "Ilpo Lehto",
    stars: 5,
    text: "Asiallinen kaveri tämä Eerik Pitkänen 👍",
    category: "katto",
  },
];

/** Vain kattoon liittyvät arviot. */
export const roofTestimonials: Testimonial[] = allTestimonials.filter((t) => matchesCategory(t, "katto"));

/** Vain seinä-/talonmaalaukseen liittyvät arviot. */
export const wallTestimonials: Testimonial[] = allTestimonials.filter((t) => matchesCategory(t, "seina"));

/**
 * Valitsee deterministisesti N arvostelua kaupungin slugin perusteella
 * syklittäen master-listaa. Sama slug → aina sama setti samassa
 * järjestyksessä, mutta naapurikaupungit saavat eri yhdistelmän.
 */
export const getTestimonialsForCity = (
  citySlug: string,
  count = 4,
): Testimonial[] => {
  const total = allTestimonials.length;
  if (total === 0) return [];

  let offset = 0;
  for (let i = 0; i < citySlug.length; i++) {
    offset = (offset + citySlug.charCodeAt(i)) % total;
  }

  const picked: Testimonial[] = [];
  for (let i = 0; i < Math.min(count, total); i++) {
    picked.push(allTestimonials[(offset + i) % total]);
  }
  return picked;
};

/** Arvostelut, joiden kohde on tietyllä paikkakunnalla. */
export const getTestimonialsByCity = (citySlug: string): Testimonial[] =>
  allTestimonials.filter((t) => t.city === citySlug);

/** Arvostelujen määrä (näytetään Kokemuksia-sivulla ja arvostelunostoissa). */
export const REVIEW_COUNT = allTestimonials.length;

/**
 * Kaupunkisivun arvostelunosto (12.10.2026): koko seinä näkyy vain etusivulla ja /kokemuksia/-sivulla,
 * koska sama 28 arvostelun lohko joka sivulla teki sivuista Googlen silmissä samanlaisia.
 * Tämä valitsee paikkakunnan slugin perusteella deterministisesti muutaman arvostelun palvelun
 * kategoriasta ja jättää pois paikkakunnan omat arvostelut, jotka CityProjects näyttää jo.
 */
export const getTeaserTestimonials = (
  citySlug: string,
  category?: TestimonialCategory,
  count = 2,
): Testimonial[] => {
  const pool = allTestimonials.filter(
    (t) => t.city !== citySlug && (!category || matchesCategory(t, category)),
  );
  if (pool.length === 0) return [];

  let offset = 0;
  const seed = `${citySlug}-${category ?? "kaikki"}`;
  for (let i = 0; i < seed.length; i++) {
    offset = (offset + seed.charCodeAt(i)) % pool.length;
  }

  const picked: Testimonial[] = [];
  for (let i = 0; i < Math.min(count, pool.length); i++) {
    picked.push(pool[(offset + i) % pool.length]);
  }
  return picked;
};
