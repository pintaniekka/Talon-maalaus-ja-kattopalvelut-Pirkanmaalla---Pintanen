/**
 * Usein kysytyt kysymykset. Vastaukset noudattavat sivuston sanastoa:
 * lyhyet virkkeet, me-muoto, yksi hintahaarukka per palvelu (pinnoitus 2 850–7 000 €,
 * maalaus 3 500–11 000 €), ei "alkaen"-hintoja eikä neliöhintoja.
 * Vastaukset renderöidään näkyvään HTML:ään (FAQSection), joten ne saavat sisältää vain <strong>-tageja.
 */
import { KOTITALOUSVAHENNYS as KOTITALOUSVAHENNYS_LAUSE } from "./company";

interface FAQItem {
  question: string;
  answer: string;
}

export const pinnoitusFAQ: FAQItem[] = [
  {
    question: 'Mitä tiilikaton pinnoitus maksaa?',
    answer:
      'Tiilikaton pinnoitus maksaa meillä yleensä <strong>2 850–7 000 €</strong>. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Hintaan kuuluu koko työ ja siivous. Työn osuudesta saat kotitalousvähennyksen.',
  },
  {
    question: 'Onko tiilikaton pinnoitus sama asia kuin tiilikaton maalaus?',
    answer:
      'Käytännössä kyllä. Pesemme katon painepesulla ja maalaamme sen ruiskulla kahteen kertaan: ensin pohjamaali, sitten pintamaali. Ahtaat paikat, joihin ruisku ei yllä, maalaamme telalla tai käsin. Uusi maalipinta pitää veden tiilen ulkopuolella.',
  },
  {
    question: 'Saako tiilikaton pinnoituksesta kotitalousvähennystä?',
    answer: `Kyllä. ${KOTITALOUSVAHENNYS_LAUSE} Erittelemme työn osuuden laskuun, joten vähennyksen hakeminen on helppoa.`,
  },
  {
    question: 'Kuinka kauan tiilikaton pinnoitus kestää?',
    answer:
      'Omakotitalon katto valmistuu yleensä <strong>2–4 työpäivässä</strong>. Pesemme katon painepesulla, vaihdamme rikkinäiset tiilet uusiin ja maalaamme katon ruiskulla kahteen kertaan: ensin pohjamaali, sitten pintamaali. Välissä katto saa kuivua.',
  },
  {
    question: 'Milloin tiilikatto pitää pinnoittaa?',
    answer:
      'Katto kannattaa pinnoittaa, kun tiilen pinta on haalistunut tai tuntuu karhealta ja sammal kasvaa nopeasti. Yleensä tämä on ajankohtaista, kun katto on 10–15 vuotta vanha. Ajoissa tehty pinnoitus estää pakkasrapautumisen.',
  },
  {
    question: 'Kattoremontti vai pinnoitus?',
    answer:
      'Pinnoitus riittää, jos aluskate ja rakenteet ovat kunnossa. Uusi katto tarvitaan, jos aluskate vuotaa tai tiilet ovat laajalti rapautuneet. Tarkistamme aluskatteen ilmaisella käynnillä ja sanomme suoraan, kumpi kannattaa. Kattoremontteja emme tee.',
  },
  {
    question: 'Pinnoitatteko myös peltikattoja?',
    answer: 'Emme. Teemme vain tiilikattoja.',
  },
  {
    question: 'Voiko tiilikaton pinnoittaa itse?',
    answer:
      'Katon voi pestä ja maalata itse, mutta ilman ruiskua ja oikeaa kalustoa tasaista pintaa on vaikea saada. Meiltä saat työlle <strong>5 vuoden kirjallisen takuun</strong>, ja vain yritykseltä ostetusta työstä saa kotitalousvähennyksen.',
  },
];

export const puhdistusFAQ: FAQItem[] = [
  {
    question: 'Miksi säännöllinen tiilikaton puhdistus on tärkeää?',
    answer: 'Sammal ja jäkälä keräävät tiilen pintaan ja rakoihin kosteutta. Kun tämä kosteus talvella jäätyy, tiili on vaarassa haljeta (pakkasrapautuminen). Säännöllinen ammattilaisen tekemä puhdistus ja kasvustontorjunta pysäyttää rapautumisen välittömästi, palauttaa talon siistin ilmeen ja siirtää kallista kattoremonttia eteenpäin.',
  },
  {
    question: 'Mitä tiilikaton puhdistusprosessi sisältää?',
    answer: 'Toteutamme puhdistuksen siistinä avaimet käteen -palveluna. Aloitamme suojaamalla pihan, minkä jälkeen katto kaavitaan mekaanisesti ammattikalustolla. Vaihdamme kaikki rikkinäiset tiilet uusiin. Lopuksi levitämme tehokkaan kasvustontorjunta-aineen, joka tuhoaa sammaleen juuret syvältä tiilestä, jotta katto pysyy puhtaana pitkään.',
  },
  {
    question: 'Paljonko tiilikaton puhdistus ja sammaleenpoisto maksaa?',
    answer: 'Kustannukset muodostuvat katon neliömäärästä, jyrkkyydestä ja kasvuston määrästä. Puhdistus on itsessään huomattavasti edullisempi toimenpide kuin koko katon pinnoitus, ja se on erinomainen sijoitus katon elinkaareen. Koska urakasta suurin osa on työn osuutta, saat hyödynnettyä siinä tuntuvan kotitalousvähennyksen. Tulemme mielellämme tekemään ilmaisen kuntoarvion ja tarkan tarjouksen paikan päälle! – Hinnat alkaen 800€',
  },
];

export const maalausFAQ: FAQItem[] = [
  {
    question: 'Mitä talon ulkomaalaus maksaa?',
    answer:
      'Omakotitalon maalaus maksaa meillä yleensä <strong>3 500–11 000 €</strong>. Hinta riippuu talon koosta, korkeudesta ja pohjatöiden määrästä. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen. Työn osuudesta saat kotitalousvähennyksen.',
  },
  {
    question: 'Milloin talon ulkoverhous pitää maalata uudelleen?',
    answer:
      'Yleensä 10–15 vuoden välein. Maalaus on ajankohtainen, kun maali hilseilee, väri on haalistunut tai seinässä on homepilkkuja.',
  },
  {
    question: 'Mitä pohjatöitä teette ennen maalausta?',
    answer:
      'Pesemme seinät homepesuaineella. Kaavimme irtoavan maalin pois. Pohjamaalaamme paljaat kohdat. Sitten maalaamme pintamaalin pensselillä. Lautoja emme vaihda.',
  },
  {
    question: 'Mitä maalia käytätte?',
    answer:
      'Valitsemme maalin vanhan maalin ja puun kunnon mukaan. Yleensä käytämme vesiohenteista talomaalia, joskus öljymaalia. Kerromme valinnan tarjouksessa.',
  },
  {
    question: 'Maalaatteko myös sisätiloja tai taloyhtiöitä?',
    answer: 'Emme. Maalaamme omakotitalojen, paritalojen ja mökkien ulkoseinät.',
  },
];

export const generalFAQ: FAQItem[] = [
  {
    question: 'Sisältääkö tarjous kaiken, vai tulee piilokuluja?',
    answer:
      'Tarjous sisältää kaiken: työn, maalit, telineet ja nostimet, matkat ja loppusiivouksen. Ylimääräisiä kuluja ei tule.',
  },
  {
    question: 'Kuinka kauan tiilikaton pinnoitus tai talon maalaus kestää?',
    answer:
      'Tiilikaton pinnoitus kestää yleensä 2–4 työpäivää. Talon ulkomaalaus kestää yleensä 3–7 työpäivää. Työ ei estä normaalia asumista.',
  },
  {
    question: 'Mitä tehdään, jos sovittuna työpäivänä sataa?',
    answer:
      'Emme maalaa sateella, koska pinnan pitää olla kuiva. Seuraamme sääennustetta ja sovimme tarvittaessa uuden päivän. Siitä ei tule lisäkuluja.',
  },
  {
    question: 'Tuotteko telineet ja nostimet?',
    answer: 'Kyllä. Tuomme telineet, nostimet ja turvavaljaat itse. Sinun ei tarvitse vuokrata mitään.',
  },
  {
    question: 'Paljonko tiilikaton pinnoitus tai talon maalaus maksaa?',
    answer:
      'Tiilikaton pinnoitus maksaa yleensä 2 850–7 000 €. Talon ulkomaalaus maksaa yleensä 3 500–11 000 €. Suuntaa antavan arvion saat hintalaskurista. Tarkan hinnan saat ilmaisen käynnin jälkeen.',
  },
  {
    question: 'Pitääkö minun siirtää tavaroita pihalta?',
    answer:
      'Siirrä kevyet pihakalusteet ja ruukut hieman kauemmas talosta. Muusta huolehdimme itse.',
  },
  {
    question: 'Saanko työstä kotitalousvähennyksen?',
    answer: `Kyllä. ${KOTITALOUSVAHENNYS_LAUSE} Erittelemme työn osuuden laskuun.`,
  },
];

export const getMaalausCityFAQ = (cityName: string, cityGenitive?: string, cityIn?: string): FAQItem[] => {
  const gen = cityGenitive || `${cityName}n`;
  const paikka = cityIn || `${gen} alueella`;
  return [
    {
      question: `Mitä omakotitalon maalaus maksaa ${paikka}?`,
      answer:
        'Omakotitalon maalaus maksaa meillä yleensä <strong>3 500–11 000 €</strong>. Hinta riippuu talon koosta, korkeudesta ja pohjatöiden määrästä. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.',
    },
    {
      question: 'Mistä tiedän, että taloni pitää maalata?',
      answer: `Maali hilseilee, väri on haalistunut tai seinässä on homepilkkuja. Puutalot ${paikka} tarvitsevat uuden maalin yleensä 10–15 vuoden välein.`,
    },
    {
      question: 'Mitä pohjatöitä teette ennen maalausta?',
      answer:
        'Pesemme seinät homepesuaineella. Kaavimme irtoavan maalin pois. Pohjamaalaamme paljaat kohdat. Sitten maalaamme pintamaalin pensselillä. Lautoja emme vaihda.',
    },
    {
      question: 'Saako talon maalauksesta kotitalousvähennystä?',
      answer: `Kyllä. ${KOTITALOUSVAHENNYS_LAUSE} Erittelemme työn osuuden laskuun.`,
    },
  ];
};

export const getPinnoitusCityFAQ = (cityName: string, cityIn?: string): FAQItem[] => {
  const paikka = cityIn || `${cityName}n alueella`;
  return [
    {
      question: `Paljonko tiilikaton pinnoitus maksaa ${paikka}?`,
      answer:
        'Tiilikaton pinnoitus maksaa meillä yleensä <strong>2 850–7 000 €</strong>. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Hintaan kuuluu koko työ ja siivous. Työn osuudesta saat kotitalousvähennyksen.',
    },
    {
      question: 'Onko tiilikaton pinnoitus sama asia kuin tiilikaton maalaus?',
      answer:
        'Käytännössä kyllä. Pesemme katon painepesulla ja maalaamme sen ruiskulla kahteen kertaan: ensin pohjamaali, sitten pintamaali. Ahtaat paikat, joihin ruisku ei yllä, maalaamme telalla tai käsin.',
    },
    {
      question: 'Saako tiilikaton pinnoituksesta kotitalousvähennystä?',
      answer: `Kyllä. ${KOTITALOUSVAHENNYS_LAUSE} Erittelemme työn osuuden laskuun, joten vähennyksen hakeminen on helppoa.`,
    },
    {
      question: 'Kuinka kauan tiilikaton pinnoitus kestää?',
      answer:
        'Omakotitalon katto valmistuu yleensä <strong>2–4 työpäivässä</strong>. Pesemme katon painepesulla, vaihdamme rikkinäiset tiilet uusiin ja maalaamme katon ruiskulla kahteen kertaan. Välissä katto saa kuivua.',
    },
    {
      question: 'Milloin tiilikatto pitää pinnoittaa?',
      answer:
        'Katto kannattaa pinnoittaa, kun tiilen pinta on haalistunut tai tuntuu karhealta ja sammal kasvaa nopeasti. Yleensä tämä on ajankohtaista, kun katto on 10–15 vuotta vanha.',
    },
    {
      question: `Tiilikattoremontti vai pinnoitus ${paikka}?`,
      answer:
        'Pinnoitus riittää, jos aluskate ja rakenteet ovat kunnossa. Uusi katto tarvitaan, jos aluskate vuotaa tai tiilet ovat laajalti rapautuneet. Tarkistamme aluskatteen ilmaisella käynnillä. Kattoremontteja emme tee.',
    },
    {
      question: 'Pinnoitatteko myös peltikattoja?',
      answer: 'Emme. Teemme vain tiilikattoja.',
    },
  ];
};

export const getPuhdistusCityFAQ = (cityName: string, cityGenitive?: string): FAQItem[] => [
  {
    question: 'Milloin tiilikaton puhdistus ja sammaleenpoisto on ajankohtaista?',
    answer: `Katto kannattaa huoltaa heti, kun huomaat tiilten raoissa tai pinnoilla sammalta, jäkälää tai muuta kasvustoa. Sammal imee itseensä kosteutta, joka talvella jäätyessään rikkoo tiiliä. Teemme ${cityGenitive || cityName + 'n'} alueella säännöllisesti kattojen puhdistuksia, joilla pysäytetään rapautuminen ajoissa ja palautetaan kiinteistön siisti ilme.`,
  },
  {
    question: 'Miten puhdistatte katon rikkomatta tiiliä?',
    answer: 'Käytämme ammattitason kalustoa ilman painepesua, jotta tiilet eivät vaurioidu. Ensin kaavimme sammaleen irti katosta, jonka jälkeen katto harjataan. Tärkein vaihe on kuitenkin tehokkaan kasvustontorjunta-aineen levittäminen, joka estää kasvuston kasvamisen katolla. Näin katto pysyy puhtaana huomattavasti pidempään.',
  },
  {
    question: 'Kuinka kauan katon pesu ja puhdistus kestää?',
    answer: `Useimmat omakotitalojen katot ${cityGenitive || cityName + 'n'} seudulla saadaan puhdistettua ja käsiteltyä 1 työpäivässä. Huolehdimme aina siitä, että piha ja terassit jäävät siistiin kuntoon. Tyhjennämme myös aina rännit roskista työn päätteeksi.`,
  },
];
