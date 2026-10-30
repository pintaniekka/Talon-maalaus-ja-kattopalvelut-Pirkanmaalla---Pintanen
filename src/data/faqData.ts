/**
 * Usein kysytyt kysymykset. Vastaukset noudattavat sivuston sanastoa:
 * lyhyet virkkeet, me-muoto, yksi hintahaarukka per palvelu (pinnoitus 2 850–7 000 €,
 * maalaus 3 500–11 000 €), ei "alkaen"-hintoja eikä neliöhintoja.
 * Vastaukset renderöidään näkyvään HTML:ään (FAQSection), joten ne saavat sisältää vain <strong>-tageja
 * ja sivuston sisäisiä <a href="/…/">-linkkejä (yöajo 3, 28.10.2026).
 * Karsittu 12.10.2026 (tarkastus): työnkulkua ei toisteta UKK:ssa, ja kotitalousvähennys on joka sarjassa
 * yhdessä kysymyksessä.
 * UKK-uudistus 30.10.2026 (laaja auditointi, luku 4): palvelun pääsivulla enintään 15 kysymystä, kukin kerran.
 * Kaupunkisivujen kahdeksan kysymystä kootaan tiedostossa cityFaq.ts; ne käyttävät tämän tiedoston
 * ydinvastauksia (hinta, kesto, kotitalousvähennys, takuu), jotta sama asia sanotaan joka sivulla samoin.
 */
import { KOTITALOUSVAHENNYS as KOTITALOUSVAHENNYS_LAUSE } from "./company";

interface FAQItem {
  question: string;
  answer: string;
}

/** Kotitalousvähennyksen vastaus samassa muodossa joka sarjassa. */
export const KOTITALOUSVAHENNYS_VASTAUS = `Kyllä. ${KOTITALOUSVAHENNYS_LAUSE} Työn osuus on laskussa eriteltynä. Lue lisää sivulta <a href="/kotitalousvahennys/">kotitalousvähennys</a>.`;

/** Ydinvastaukset, jotka ovat sekä palvelun pääsivulla että kaupunkisivuilla (UKK-uudistus 30.10.2026). */
export const PINNOITUS_KESTO_VASTAUS =
  'Peruskohteen katto valmistuu yleensä <strong>2–3 työpäivässä</strong>, suuri tai jyrkkä katto 2–4. Pesun jälkeen katto saa kuivua ennen maalausta.';
export const MAALAUS_KESTO_VASTAUS =
  'Omakotitalo valmistuu yleensä <strong>3–7 päivässä</strong>. Aika riippuu talon koosta ja pohjatöiden määrästä. Työ ei estä normaalia asumista.';
// Takuun sisältö: Eerik 27.10.2026.
export const PINNOITUS_TAKUU_FAQ: FAQItem = {
  question: 'Mitä takuu kattaa?',
  answer:
    'Annamme pinnoitukselle <strong>5 vuoden kirjallisen takuun</strong>. Se kattaa asennusvirheet ja maalin epänormaalin hilseilyn. Jos pinnassa näkyy vikaa, joka johtuu työstämme, korjaamme sen. Tulemme muutenkin vastaan, jos jokin ei ole kunnossa.',
};
export const MAALAUS_TAKUU_FAQ: FAQItem = {
  question: 'Mitä takuu kattaa?',
  answer:
    'Annamme maalaukselle <strong>2 vuoden kirjallisen takuun</strong>. Se kattaa työvirheet ja maalin epänormaalin hilseilyn. Jos pinnassa näkyy vikaa, joka johtuu työstämme, korjaamme sen. Tulemme muutenkin vastaan, jos jokin ei ole kunnossa.',
};
/** Käynnin ajankohta; kaupunkisivu lisää perään linkin Tampereen sivulle (cityFaq.ts). */
export const PINNOITUS_KAYNTI_VASTAUS =
  'Kuntotarkastus onnistuu yleensä samalla viikolla, tarvittaessa myös iltaisin tai viikonloppuisin. Pinnoitukset teemme huhti–toukokuusta elo–syyskuuhun, ja kesän työt täyttyvät pitkälti jo keväällä. Työn ajankohta sovitaan kirjallisesti, kun olet hyväksynyt tarjouksen.';
export const MAALAUS_KAYNTI_VASTAUS =
  'Arviokäynti onnistuu yleensä samalla viikolla, tarvittaessa myös iltaisin tai viikonloppuisin. Maalaukset teemme huhti–toukokuusta elo–syyskuuhun, ja kesän työt täyttyvät pitkälti jo keväällä. Työn ajankohta sovitaan kirjallisesti, kun olet hyväksynyt tarjouksen.';
/** Tarjouksen hyväksyminen ja maksu yhtenä kysymyksenä (UKK-uudistus 30.10.2026: ennen kaksi peräkkäistä). */
const HYVAKSYNTA_JA_MAKSU_FAQ: FAQItem = {
  question: 'Miten hyväksyn tarjouksen ja miten maksu tapahtuu?',
  answer:
    'Hyväksyt tarjouksen vastaamalla tarjousviestiin. Sen jälkeen teemme kirjallisen sopimuksen ja sovimme aikataulun, ja otamme sinuun yhteyttä ennen aloituspäivää. Ennakkolasku on 10 % hinnasta. Loput laskutamme, kun työ on valmis ja olemme käyneet sen yhdessä läpi.',
};

/**
 * UKK-täydennykset palvelu- ja hintasivuille (hakutulosanalyysi 26.10.2026, brief 10). Vastaukset ovat Eerikin jo
 * antamia faktoja (CLAUDE.md, tyovaiheet.ts, kaupunkisivujen UKK); ei uusia väitteitä. Hintasivut tuovat samat
 * kysymykset omiin listoihinsa, joten teksti on yhdessä paikassa. Kaupunkisivujen sarjoihin ei lisätty
 * (enintään 10 kysymystä).
 */
export const MAKSU_FAQ: FAQItem = {
  question: 'Miten maksu tapahtuu?',
  answer:
    'Kun hyväksyt tarjouksen, lähetämme ennakkolaskun, joka on 10 % hinnasta. Loput laskutamme, kun työ on valmis ja olemme käyneet sen yhdessä läpi.',
};

/** Pesukysymys on yksi ja sama kaikilla pinnoitussivuilla (Eerik 27.10.2026). */
export const PESU_VAI_PINNOITUS_FAQ: FAQItem = {
  question: 'Pesettekö tiilikattoja?',
  answer: 'Kyllä. Pesemme katon aina ennen pinnoitusta.',
};

export const PINNOITUS_MAALI_FAQ: FAQItem = {
  question: 'Millä maalilla pinnoitatte tiilikaton?',
  answer:
    'Käytämme Nowocoatin kattomaalia. Se on vesiohenteinen, ammattikäyttöön kehitetty betonitiilen pinnoite, jonka pinta on puolihimmeä ja hengittävä. Maalaamme katon korkeapaineruiskulla aina kahteen kertaan: ensin pohjamaali ja sitten pintamaali. Reunat ja ahtaat paikat maalaamme telalla tai käsin.',
};

export const PINNOITUS_SADE_FAQ: FAQItem = {
  question: 'Mitä jos sataa kesken pinnoituksen?',
  answer:
    'Sateella ei maalata, koska pinnan pitää olla kuiva. Seuraamme sääennustetta ja siirrämme tarvittaessa päivää, eikä siitä tule lisäkuluja. Jos sade jättää jälkiä tuoreeseen maaliin, korjaamme ne ilman lisähintaa.',
};

/** Yleisfakta siveltimestä: K-Rauta, Ulkomaalausohje (docs/lahteet-talotyypit-2026-10-26.md). Pintasen työtapa: tyovaiheet.ts. */
export const MAALAUS_PENSSELI_FAQ: FAQItem = {
  question: 'Maalaatteko ruiskulla vai pensselillä?',
  answer:
    'Maalaamme seinät pensselillä. Ulkomaalausohjeissa puupinnan maali levitetään siveltimellä, ja ruiskutettu pinta viimeistellään siveltimellä. Pohjamaalin laitamme paljaisiin puukohtiin ennen pintamaalia.',
};

export const MAALAUS_SADE_FAQ: FAQItem = {
  question: 'Mitä jos sataa kesken maalauksen?',
  answer:
    'Sateella ei maalata, koska seinän pitää olla kuiva. Seuraamme sääennustetta ja siirrämme tarvittaessa päivää, eikä siitä tule lisäkuluja. Jos sade jättää jälkiä tuoreeseen maaliin, korjaamme ne ilman lisähintaa.',
};

/**
 * Tiilikaton pinnoituksen pääsivu: 15 kysymystä (UKK-uudistus 30.10.2026). Pois jäivät kysymykset, joihin sivun oma
 * lohko jo vastaa ("sama asia kuin maalaus", värin vaihto, "kannattaako" = "Miksi tiilikatto kannattaa pinnoittaa
 * ajoissa?"), tuplana ollut pesukysymys, Ormax (sivulla ja hintasivulla) ja taloyhtiöt (oma sivu). Kaupunkisivuilta tänne siirtyivät sade, mökit ja pakettihinta; yhteydenoton
 * ajankohta on käyntikysymyksessä. Maksu ja tarjouksen hyväksyminen ovat yhdessä kysymyksessä.
 */
export const pinnoitusFAQ: FAQItem[] = [
  {
    question: 'Mitä tiilikaton pinnoitus maksaa?',
    answer:
      'Tiilikaton pinnoitus maksaa meillä yleensä <strong>2 850–7 000 €</strong>. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Hinta sisältää työn, materiaalit ja siivouksen. Jos teemme samalla kertaa myös seinät, saat edullisemman pakettihinnan.',
  },
  { question: 'Kuinka kauan työ kestää?', answer: PINNOITUS_KESTO_VASTAUS },
  {
    question: 'Saako tiilikaton pinnoituksesta kotitalousvähennystä?',
    answer: KOTITALOUSVAHENNYS_VASTAUS,
  },
  PINNOITUS_TAKUU_FAQ,
  {
    question: 'Milloin tiilikatto pitää pinnoittaa?',
    answer:
      'Katto kannattaa pinnoittaa, kun tiilen pinta on haalistunut tai tuntuu karhealta ja sammal kasvaa nopeasti. Yleensä tämä on ajankohtaista, kun katto on noin 15 vuotta vanha. Ajoissa tehty pinnoitus estää pakkasrapautumisen.',
  },
  {
    question: 'Kattoremontti vai pinnoitus?',
    // Aluskatteen pienet vauriot: sama tieto kuin sivulla /ilmainen-katon-kuntotarkastus/ (Eerik 26.10.2026).
    answer:
      'Pinnoitus riittää, jos aluskate ja rakenteet ovat kunnossa. Aluskatteen pienet vauriot korjaamme pinnoituksen yhteydessä. Uusi katto tarvitaan, jos aluskate vuotaa tai tiilet ovat laajalti rapautuneet. Lue lisää: <a href="/artikkelit/pinnoitus-vai-uusi-katto/">pinnoitus vai uusi katto</a>.',
  },
  {
    question: 'Voiko tiilikaton pinnoittaa itse?',
    answer:
      'Katon voi pestä ja maalata itse, mutta ilman ruiskua ja kunnon kalustoa pinnasta on vaikea saada tasainen. Meiltä saat työlle <strong>5 vuoden kirjallisen takuun</strong>.',
  },
  PINNOITUS_MAALI_FAQ,
  {
    // Valmistajan huoltosuositus (NowoCoat-esite 2025–26, docs/nowocoat-lahteet-2026-10-29.md). Puhdistuspalvelu on loppunut, siksi "kysy meiltä".
    question: 'Miten pinnoitettua kattoa huolletaan?',
    answer:
      'Pinnoitettu katto ei tarvitse säännöllistä pesua. Valmistaja suosittelee kasvustontorjunta-aineen levitystä 2–4 vuoden välein, jotta lika ja sammal eivät tartu pintaan. Jos haluat huoltokäsittelyn, kysy meiltä.',
  },
  PINNOITUS_SADE_FAQ,
  {
    question: 'Maalaatteko myös peltikattoja?',
    answer: 'Pinnoitamme tiilikattoja. Peltikaton maalausta voit kysyä erikseen, niin katsomme kohteen.',
  },
  {
    question: 'Pinnoitatteko myös mökin, autotallin tai autokatoksen katon?',
    answer:
      'Kyllä. Pinnoitamme myös kesämökin, autotallin, autokatoksen ja muun piharakennuksen tiilikaton. Yleensä teemme sen samalla kertaa talon katon kanssa.',
  },
  {
    question: 'Saanko hinta-arvion ennen kuntotarkastusta?',
    answer:
      'Kyllä. Hintalaskuri antaa suuntaa antavan arvion katon koon ja jyrkkyyden mukaan. Tarkan, kiinteän hinnan saat kirjallisessa tarjouksessa ilmaisen kuntotarkastuksen jälkeen. Kuntotarkastuksella sinun on hyvä olla paikalla. Tarjouksen saat myös etänä, kun lähetät kuvat katosta ja arvion sen koosta.',
  },
  { question: 'Milloin pääsette katsomaan katon?', answer: PINNOITUS_KAYNTI_VASTAUS },
  HYVAKSYNTA_JA_MAKSU_FAQ,
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

/**
 * Talon maalauksen pääsivu: 14 kysymystä (UKK-uudistus 30.10.2026). Maksu ja tarjouksen hyväksyminen ovat yhdessä
 * kysymyksessä. Kaupunkisivuilta tänne siirtyi pakettihinta; sade ja mökit olivat jo täällä.
 */
export const maalausFAQ: FAQItem[] = [
  {
    question: 'Mitä talon ulkomaalaus maksaa?',
    answer:
      'Omakotitalon maalaus maksaa meillä yleensä <strong>3 500–11 000 €</strong>. Hinta riippuu talon koosta, korkeudesta ja pohjatöiden määrästä. Jos teemme samalla kertaa myös katon, saat edullisemman pakettihinnan. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.',
  },
  { question: 'Kuinka kauan talon maalaus kestää?', answer: MAALAUS_KESTO_VASTAUS },
  {
    question: 'Saako talon maalauksesta kotitalousvähennystä?',
    answer: KOTITALOUSVAHENNYS_VASTAUS,
  },
  MAALAUS_TAKUU_FAQ,
  {
    question: 'Milloin talon ulkoverhous pitää maalata uudelleen?',
    answer:
      'Yleensä 10–15 vuoden välein. Maalaus on ajankohtainen, kun maali hilseilee, väri on haalistunut tai seinässä on homepilkkuja.',
  },
  {
    question: 'Milloin on paras aika maalata talo?',
    answer:
      'Maalauskausi on huhti–toukokuusta elo–syyskuuhun. Maalaamme, kun seinä on kuiva ja ilman kosteusprosentti on alle 80. Sateella ei maalata, ja siirretystä päivästä ei tule lisäkuluja.',
  },
  {
    question: 'Mitä maalia käytätte?',
    answer:
      'Käytämme pääsääntöisesti Tikkurilan ulkomaaleja. Valitsemme maalin vanhan maalin ja puun kunnon mukaan. Maalit ja materiaalit kirjataan tarjoukseen.',
  },
  MAALAUS_PENSSELI_FAQ,
  {
    question: 'Maalaatteko hirsitaloja ja rintamamiestaloja?',
    answer: 'Kyllä. Maalaamme puuverhotut talot, rintamamiestalot ja hirsitalot. Työvaiheet ovat samat: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Arviokäynnillä katsomme, mitä juuri sinun seinäsi tarvitsee.',
  },
  {
    question: 'Maalaatteko myös mökkejä ja piharakennuksia?',
    answer: 'Kyllä. Mökissä ja piharakennuksessa työvaiheet ovat samat kuin talossa: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Hinta riippuu koosta.',
  },
  MAALAUS_SADE_FAQ,
  { question: 'Milloin pääsette maalaamaan?', answer: MAALAUS_KAYNTI_VASTAUS },
  HYVAKSYNTA_JA_MAKSU_FAQ,
  {
    question: "Maalaatteko myös taloyhtiöitä?",
    answer: 'Kyllä. Maalaamme rivi-, pari- ja kerrostalojen ulkoseinät rakennus kerrallaan, ja katon voi pinnoittaa samalla. Lue lisää: <a href="/taloyhtiot/">tiilikaton pinnoitus ja talon maalaus taloyhtiöille</a>.',
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
      'Tiilikaton pinnoitus kestää yleensä 2–3 työpäivää. Talon ulkomaalaus kestää yleensä 3–7 työpäivää. Työ ei estä normaalia asumista.',
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
    question: 'Tarvitsetteko sähköä tai vettä?',
    answer:
      'Kyllä. Tarvitsemme vesipisteen ja sähköä. Kaiken muun, kuten telineet, nostimet ja maalit, tuomme itse.',
  },
  {
    question: 'Toimitteko Pirkanmaan ulkopuolella?',
    answer:
      'Toimimme Pirkanmaalla ja lähikunnissa. Jos kohde on kauempana, kysy, niin katsomme, onnistuuko se.',
  },
  {
    question: 'Saanko työstä kotitalousvähennyksen?',
    answer: KOTITALOUSVAHENNYS_VASTAUS,
  },
];

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

