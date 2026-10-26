/**
 * Usein kysytyt kysymykset. Vastaukset noudattavat sivuston sanastoa:
 * lyhyet virkkeet, me-muoto, yksi hintahaarukka per palvelu (pinnoitus 2 850–7 000 €,
 * maalaus 3 500–11 000 €), ei "alkaen"-hintoja eikä neliöhintoja.
 * Vastaukset renderöidään näkyvään HTML:ään (FAQSection), joten ne saavat sisältää vain <strong>-tageja.
 * Karsittu 12.10.2026 (tarkastus): työnkulkua ei toisteta UKK:ssa, kotitalousvähennys on joka sarjassa
 * yhdessä kysymyksessä, ja kaupunkisivun sarja on yhdessä cityFaq.ts:n kanssa enintään 10 kysymystä.
 */
import { KOTITALOUSVAHENNYS as KOTITALOUSVAHENNYS_LAUSE } from "./company";

interface FAQItem {
  question: string;
  answer: string;
}

/** Kotitalousvähennyksen vastaus samassa muodossa joka sarjassa. */
const KOTITALOUSVAHENNYS_VASTAUS = `Kyllä. ${KOTITALOUSVAHENNYS_LAUSE} Työn osuus on laskussa eriteltynä.`;

export const pinnoitusFAQ: FAQItem[] = [
  {
    question: 'Mitä tiilikaton pinnoitus maksaa?',
    answer:
      'Tiilikaton pinnoitus maksaa meillä yleensä <strong>2 850–7 000 €</strong>. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Hinta sisältää työn, materiaalit ja siivouksen.',
  },
  {
    question: 'Onko tiilikaton pinnoitus sama asia kuin tiilikaton maalaus?',
    answer:
      'Kyllä. Tiilikaton pinnoitus, tiilikaton maalaus ja katon maalaus tarkoittavat samaa työtä. Uusi maalipinta pitää veden tiilen ulkopuolella.',
  },
  {
    question: 'Saako tiilikaton pinnoituksesta kotitalousvähennystä?',
    answer: KOTITALOUSVAHENNYS_VASTAUS,
  },
  {
    question: 'Kuinka kauan työ kestää?',
    answer:
      'Omakotitalon katto valmistuu yleensä <strong>2–4 työpäivässä</strong>. Pesun jälkeen katto saa kuivua ennen maalausta.',
  },
  {
    question: 'Milloin tiilikatto pitää pinnoittaa?',
    answer:
      'Katto kannattaa pinnoittaa, kun tiilen pinta on haalistunut tai tuntuu karhealta ja sammal kasvaa nopeasti. Yleensä tämä on ajankohtaista, kun katto on noin 10–15 vuotta vanha. Ajoissa tehty pinnoitus estää pakkasrapautumisen.',
  },
  {
    question: 'Kannattaako tiilikaton pinnoitus?',
    answer:
      'Kannattaa, jos tiilen pinta on kulunut mutta aluskate ja rakenteet ovat kunnossa. Kulunut tiili imee vettä, ja talvella vesi jäätyy ja murentaa tiiltä sisältäpäin. Pinnoituksen jälkeen tiili ei ime vettä, eikä sammal saa otetta. Katto kestää jopa 15–20 vuotta pidempään.',
  },
  {
    question: 'Kattoremontti vai pinnoitus?',
    answer:
      'Pinnoitus riittää, jos aluskate ja rakenteet ovat kunnossa. Uusi katto tarvitaan, jos aluskate vuotaa tai tiilet ovat laajalti rapautuneet.',
  },
  {
    question: 'Voiko katon värin vaihtaa pinnoituksessa?',
    answer: 'Kyllä voi. Nowocoatin kattomaaleissa on laaja värivalikoima.',
  },
  {
    question: 'Voiko tiilikaton pinnoittaa itse?',
    answer:
      'Katon voi pestä ja maalata itse, mutta ilman ruiskua ja kunnon kalustoa pinnasta on vaikea saada tasainen. Meiltä saat työlle <strong>5 vuoden kirjallisen takuun</strong>.',
  },
    {
      question: 'Maalaatteko myös peltikattoja?',
      answer: 'Pinnoitamme tiilikattoja. Peltikaton maalausta voit kysyä erikseen, niin katsomme kohteen.',
    },
];

export const puhdistusFAQ: FAQItem[] = [
  {
    question: 'Miksi säännöllinen tiilikaton puhdistus on tärkeää?',
    answer: 'Sammal pitää tiilen märkänä. Talvella vesi jäätyy ja tiili halkeaa. Puhdistus ja kasvustontorjunta-aine pysäyttävät rapautumisen.',
  },
  {
    question: 'Mitä tiilikaton puhdistusprosessi sisältää?',
    answer: 'Kaavimme sammaleen katosta mekaanisesti ja harjaamme katon. Vaihdamme rikkinäiset tiilet uusiin. Lopuksi levitämme kasvustontorjunta-aineen, joka pitää katon puhtaana pitkään.',
  },
  {
    question: 'Paljonko tiilikaton puhdistus ja sammaleenpoisto maksaa?',
    answer: 'Hinta riippuu katon koosta, jyrkkyydestä ja kasvuston määrästä. Puhdistus on edullisempi kuin koko katon pinnoitus. Työn osuudesta saat kotitalousvähennyksen. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.',
  },
];

export const maalausFAQ: FAQItem[] = [
  {
    question: 'Mitä talon ulkomaalaus maksaa?',
    answer:
      'Omakotitalon maalaus maksaa meillä yleensä <strong>3 500–11 000 €</strong>. Hinta riippuu talon koosta, korkeudesta ja pohjatöiden määrästä. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.',
  },
  {
    question: 'Milloin talon ulkoverhous pitää maalata uudelleen?',
    answer:
      'Yleensä 10–15 vuoden välein. Maalaus on ajankohtainen, kun maali hilseilee, väri on haalistunut tai seinässä on homepilkkuja.',
  },
  {
    question: 'Mitä maalia käytätte?',
    answer:
      'Käytämme pääsääntöisesti Tikkurilan ulkomaaleja. Valitsemme maalin vanhan maalin ja puun kunnon mukaan. Maalit ja materiaalit kirjataan tarjoukseen.',
  },
  {
    question: 'Milloin on paras aika maalata talo?',
    answer:
      'Maalauskausi on huhti–toukokuusta elo–syyskuuhun. Maalaamme, kun seinä on kuiva ja ilman kosteusprosentti on alle 80. Sateella ei maalata, ja siirretystä päivästä ei tule lisäkuluja.',
  },
  {
    question: 'Maalaatteko myös mökkejä ja piharakennuksia?',
    answer: 'Kyllä. Mökissä ja piharakennuksessa työvaiheet ovat samat kuin talossa: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Hinta riippuu koosta.',
  },
  {
    question: 'Saako talon maalauksesta kotitalousvähennystä?',
    answer: KOTITALOUSVAHENNYS_VASTAUS,
  },
    {
      question: 'Maalaatteko hirsitaloja ja rintamamiestaloja?',
      answer: 'Kyllä. Maalaamme puuverhotut talot, rintamamiestalot ja hirsitalot. Työvaiheet ovat samat: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Arviokäynnillä katsomme, mitä juuri sinun seinäsi tarvitsee.',
    },
];

export const generalFAQ: FAQItem[] = [
  {
    question: 'Sisältääkö tarjous kaiken, vai tulee piilokuluja?',
    answer:
      'Tarjous sisältää kaiken: työn, maalit, telineet ja nostimet, matkat ja loppusiivouksen. Ylimääräisiä kuluja ei tule.',
  },
  {
    question: 'Kuinka kauan työ kestää?',
    answer:
      'Tiilikaton pinnoitus kestää yleensä 2–4 työpäivää. Talon ulkomaalaus kestää yleensä 3–7 työpäivää. Työ ei estä normaalia asumista.',
  },
  {
    question: 'Mitä tehdään, jos sovittuna työpäivänä sataa?',
    answer:
      'Sateella ei maalata, koska pinnan pitää olla kuiva. Seuraamme sääennustetta ja sovimme tarvittaessa uuden päivän. Siitä ei tule lisäkuluja.',
  },
  {
    question: 'Tuotteko telineet ja nostimet?',
    answer: 'Kyllä. Katolla työskentelemme valjailla. Seinillä käytämme telineitä ja usein nostinta. Tuomme kaiken itse, sinun ei tarvitse vuokrata mitään.',
  },
  {
    question: 'Paljonko tiilikaton pinnoitus tai talon maalaus maksaa?',
    answer:
      'Tiilikaton pinnoitus maksaa yleensä 2 850–7 000 €. Talon ulkomaalaus maksaa yleensä 3 500–11 000 €. Suuntaa antavan arvion saat hintalaskurista. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.',
  },
  {
    question: 'Kannattaako tiilikatto pinnoittaa vai uusia?',
    answer:
      'Pinnoitus riittää, jos aluskate ja rakenteet ovat kunnossa ja vain tiilen pinta on kulunut. Jos tiilet ovat rikki laajalti tai aluskate vuotaa, katto kannattaa uusia. Katsomme sen ilmaisella arviokäynnillä. Pinnoitus maksaa yleensä 2 850–7 000 €, kattoremontti yleensä 15 000–30 000 €.',
  },
  {
    question: 'Pitääkö minun siirtää tavaroita pihalta?',
    answer:
      'Siirrä kevyet pihakalusteet ja ruukut hieman kauemmas talosta. Muusta huolehdimme itse.',
  },
  {
    question: 'Saanko työstä kotitalousvähennyksen?',
    answer: KOTITALOUSVAHENNYS_VASTAUS,
  },
];

/** Maalauksen kaupunkisivu: yhdessä cityFaq.ts:n kuuden kysymyksen kanssa 9 kysymystä. */
export const getMaalausCityFAQ = (cityName: string, cityGenitive?: string, cityIn?: string): FAQItem[] => {
  const gen = cityGenitive || `${cityName}n`;
  const paikka = cityIn || `${gen} alueella`;
  return [
    {
      question: `Mitä omakotitalon maalaus maksaa ${paikka}?`,
      answer:
        'Omakotitalon maalaus maksaa meillä yleensä <strong>3 500–11 000 €</strong>. Hinta riippuu talon koosta, korkeudesta ja pohjatöiden määrästä. Jos teemme samalla kertaa myös katon, saat edullisemman pakettihinnan. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.',
    },
    {
      question: 'Mistä tiedän, että taloni pitää maalata?',
      answer: `Maali hilseilee, väri on haalistunut tai seinässä on homepilkkuja. Puutalot ${paikka} tarvitsevat uuden maalin yleensä 10–15 vuoden välein.`,
    },
    {
      question: `Milloin pääsette maalaamaan ${paikka}?`,
      answer:
        'Arviokäynti onnistuu yleensä samalla viikolla, myös iltaisin ja viikonloppuisin. Maalaukset teemme huhti–toukokuusta elo–syyskuuhun. Työn ajankohta sovitaan kirjallisesti, kun olet hyväksynyt tarjouksen.',
    },
    {
      question: 'Kuinka kauan talon maalaus kestää?',
      answer: 'Omakotitalo valmistuu yleensä <strong>3–7 päivässä</strong>. Aika riippuu talon koosta ja pohjatöiden määrästä.',
    },
    {
      question: 'Maalaatteko hirsitaloja ja rintamamiestaloja?',
      answer: 'Kyllä. Maalaamme puuverhotut talot, rintamamiestalot ja hirsitalot. Työvaiheet ovat samat: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Arviokäynnillä katsomme, mitä juuri sinun seinäsi tarvitsee.',
    },
    {
      question: 'Miten maksu tapahtuu?',
      answer: 'Kun hyväksyt tarjouksen, lähetämme ennakkolaskun, joka on 10 % hinnasta. Loput laskutamme, kun työ on valmis ja olemme käyneet sen yhdessä läpi.',
    },
    {
      question: 'Saako talon maalauksesta kotitalousvähennystä?',
      answer: KOTITALOUSVAHENNYS_VASTAUS,
    },
  ];
};

/** Pinnoituksen kaupunkisivu: yhdessä cityFaq.ts:n kuuden kysymyksen kanssa 10 kysymystä. */
export const getPinnoitusCityFAQ = (cityName: string, cityIn?: string): FAQItem[] => {
  const paikka = cityIn || `${cityName}n alueella`;
  return [
    {
      question: `Paljonko tiilikaton pinnoitus maksaa ${paikka}?`,
      answer:
        'Tiilikaton pinnoitus maksaa meillä yleensä <strong>2 850–7 000 €</strong>. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Hinta sisältää työn, materiaalit ja siivouksen. Jos teemme samalla kertaa myös seinät, saat edullisemman pakettihinnan.',
    },
    {
      question: 'Kuinka kauan työ kestää?',
      answer:
        'Peruskohteen katto valmistuu <strong>2–3 työpäivässä</strong>. Pesun jälkeen katto saa kuivua ennen maalausta.',
    },
    {
      question: `Onko tiilikaton pesu ja pinnoitus sama palvelu ${paikka}?`,
      answer:
        'Teemme pesun aina pinnoituksen yhteydessä. Pesemme katon painepesulla, levitämme kasvustontorjunta-aineen ja maalaamme katon kahteen kertaan. Jos tiilen pinta on kulunut, pelkkä pesu ei riitä, koska tiili imee vettä heti seuraavalla sateella.',
    },
    {
      question: 'Maalaatteko myös peltikattoja?',
      answer: 'Pinnoitamme tiilikattoja. Peltikaton maalausta voit kysyä erikseen, niin katsomme kohteen.',
    },
    {
      question: 'Miten maksu tapahtuu?',
      answer: 'Kun hyväksyt tarjouksen, lähetämme ennakkolaskun, joka on 10 % hinnasta. Loput laskutamme, kun työ on valmis ja olemme käyneet sen yhdessä läpi.',
    },
    {
      question: 'Mitä eroa on katon pinnoituksella ja tiilikaton maalauksella?',
      answer:
        'Ei mitään. Katon pinnoitus, tiilikaton maalaus ja kattomaalaus tarkoittavat samaa työtä. Katto pestään, rikkinäiset tiilet vaihdetaan ja katto maalataan kahteen kertaan Nowocoatin kattomaalilla.',
    },
    {
      question: 'Milloin tiilikatto pitää pinnoittaa?',
      answer:
        'Katto kannattaa pinnoittaa, kun tiilen pinta on haalistunut tai tuntuu karhealta ja sammal kasvaa nopeasti. Yleensä tämä on ajankohtaista, kun katto on noin 10–15 vuotta vanha.',
    },
    {
      question: `Milloin pääsette katsomaan katon ${paikka}?`,
      answer:
        'Kuntotarkastus onnistuu yleensä samalla viikolla, myös iltaisin ja viikonloppuisin. Pinnoitukset teemme huhti–toukokuusta elo–syyskuuhun. Työn ajankohta sovitaan kirjallisesti, kun olet hyväksynyt tarjouksen.',
    },
    {
      question: 'Saako tiilikaton pinnoituksesta kotitalousvähennystä?',
      answer: KOTITALOUSVAHENNYS_VASTAUS,
    },
  ];
};

export const getPuhdistusCityFAQ = (cityName: string, cityGenitive?: string): FAQItem[] => [
  {
    question: 'Milloin tiilikaton puhdistus ja sammaleenpoisto on ajankohtaista?',
    answer: 'Katto kannattaa puhdistaa, kun tiilten raoissa tai pinnalla on sammalta tai jäkälää. Sammal pitää tiilen märkänä, ja talvella vesi jäätyy ja rikkoo tiiltä.',
  },
  {
    question: 'Miten puhdistatte katon rikkomatta tiiliä?',
    answer: 'Puhdistus on mekaaninen, ilman painepesua. Kaavimme sammaleen irti ja harjaamme katon. Lopuksi levitämme kasvustontorjunta-aineen, joka pitää katon puhtaana pitkään.',
  },
  {
    question: 'Kuinka kauan katon pesu ja puhdistus kestää?',
    answer: `Useimmat omakotitalojen katot ${cityGenitive || cityName + 'n'} seudulla puhdistetaan ja käsitellään yhdessä työpäivässä. Tyhjennämme myös rännit roskista työn päätteeksi.`,
  },
];

