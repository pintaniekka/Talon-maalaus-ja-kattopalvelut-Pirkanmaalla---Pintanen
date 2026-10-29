/**
 * Ilmaisen katon kuntotarkastuksen ja talon maalauksen arviokäynnin sivut (Eerik 28.10.2026: Lummecon
 * malli, mutta parempi ja hakukoneille ja tekoälyvastauksille täysi). Faktat ovat sivuston omia:
 * tyovaiheet.ts, faqData.ts, PinnoitusWhyNow, MaalausProblemSection, MaalausTalotyypit ja Eerikin päätökset
 * (CLAUDE.md). Maksullisen tarkastuksen hinta muualla: docs/kuntotarkastus-lahteet-2026-10-28.md.
 * Ei komponentti-importteja: luetaan myös build-aikana.
 */
import type { Tyovaihe, LyhyestiSisalto } from "./tyovaiheet";
import { PINNOITUS_HINTA, MAALAUS_HINTA } from "./tyovaiheet";
import { TAKUU } from "./company";

export type KuntotarkastusService = "pinnoitus" | "maalaus";

export interface KuntotarkastusSisalto {
  path: string;
  /** Pääsivu, jonka alle sivu kuuluu (murupolku ja ServiceSchema). */
  parent: { name: string; path: string };
  eyebrow: string;
  /** H1 ilman paikkakuntaa; paikkakunta lisätään korostettuna perään. */
  h1: string;
  lead: string;
  /** Maksullisen vastineen hinta muualla, euroina (lähteet docs-kansiossa). */
  arvoMuualla: number;
  lyhyesti: LyhyestiSisalto;
  miksiOtsikko: string;
  miksiIntro: string;
  merkit: { title: string; text: string }[];
  katsommeOtsikko: string;
  katsommeIntro: string;
  katsomme: string[];
  saatOtsikko: string;
  saat: { title: string; text: string }[];
  eteneeOtsikko: string;
  etenee: Tyovaihe[];
  /** Kolme kuvaa siitä, mitä käynnillä katsotaan (Eerik 29.10.2026: kuvia lisää arviokäyntisivuille). */
  kuvat: { base: string; alt: string; caption: string }[];
  etaOtsikko: string;
  eta: string;
  hintaTeksti: string;
  hintaLinkki: { to: string; label: string };
  palveluLinkki: { to: string; label: string };
  faq: { question: string; answer: string }[];
  schemaName: string;
  schemaAlternate: string[];
  hero: { base: string; alt: string };
  badge: { title: string; text: string };
  cta: { to: string; label: string };
  laskuri: string;
  contactVariant: "katto" | "maalaus";
  articleCategories: ("katto" | "maalaus" | "raha")[];
}

const yhteiset = {
  etenee: (kaynti: string, tekija: string, kuva: { base: string; alt: string }): Tyovaihe[] => [
    {
      title: "Pyydä käynti",
      text: `Täytä lomake tai soita. Sovimme ajan, joka sopii sinulle, yleensä samalla viikolla.`,
    },
    {
      title: `${kaynti} paikan päällä`,
      text: `${tekija} käy kohteen läpi itse ja kertoo havainnot heti. Sinun ei tarvitse olla paikalla, mutta se on hyvä, koska käymme tarjouksen läpi yhdessä.`,
      kuva,
    },
    {
      title: "Kirjallinen tarjous",
      text: "Saat kirjallisen tarjouksen kiinteällä hinnalla. Hintaan kuuluu koko työ, ja työn osuus on eriteltynä kotitalousvähennystä varten.",
    },
    {
      title: "Päätät itse",
      text: "Tarjous ei sido sinua mihinkään. Jos hyväksyt sen, teemme kirjallisen sopimuksen ja sovimme työn ajankohdan.",
    },
  ],
};

export const kuntotarkastukset: Record<KuntotarkastusService, KuntotarkastusSisalto> = {
  pinnoitus: {
    path: "/ilmainen-katon-kuntotarkastus",
    parent: { name: "Tiilikaton pinnoitus", path: "/tiilikaton-pinnoitus-pirkanmaa" },
    eyebrow: "Ilmainen kattotarkastus · Pirkanmaa",
    h1: "Ilmainen katon kuntotarkastus",
    lead: `Eerik käy tiilikattosi läpi paikan päällä ja kertoo suoraan, riittääkö pinnoitus, kannattaako odottaa vai pitääkö katto uusia. Käynti ja kirjallinen tarjous kiinteällä hinnalla ovat ilmaisia, yleensä samalla viikolla. Tiilikaton pinnoitus maksaa yleensä ${PINNOITUS_HINTA}, ja takuu on ${TAKUU.pinnoitus}.`,
    arvoMuualla: 280,
    lyhyesti: {
      facts: [
        { label: "Hinta sinulle", value: "0 €" },
        { label: "Maksullisena muualla", value: "noin 280 €" },
        { label: "Milloin", value: "Yleensä\nsamalla viikolla" },
        { label: "Saat", value: "Kirjallisen tarjouksen\nkiinteällä hinnalla" },
      ],
      note: "Kuntotarkastus ei sido sinua mihinkään. Jos pinnoitus ei ole ajankohtainen, sanomme sen suoraan.",
    },
    miksiOtsikko: "Miksi katon kunto kannattaa selvittää ajoissa?",
    miksiIntro:
      "Moni tiilikatto näyttää kaukaa hyvältä, vaikka tiilen tehdaspinta on jo kulunut pois. Kulunut tiili imee vettä, ja talvella vesi jäätyy ja rikkoo tiilen. Kun katto tarkastetaan ajoissa, pinnoitus riittää eikä kattoa tarvitse uusia.",
    merkit: [
      { title: "Väri on haalistunut", text: "Tiilen tehdaspinta on kulunut pois, ja tiili alkaa imeä vettä." },
      { title: "Sammal kasvaa nopeasti", text: "Sammal tarttuu helpoimmin karheaan ja kuluneeseen pintaan ja pitää katon märkänä." },
      { title: "Tiiliä on rikki", text: "Vesi on päässyt tiilen sisään ja jäätynyt. Rikkinäiset tiilet vaihdamme uusiin pinnoituksen yhteydessä." },
    ],
    katsommeOtsikko: "Mitä kuntotarkastuksessa katsotaan?",
    katsommeIntro: "Eerik käy katon läpi itse. Katsomme seitsemän asiaa, myös ne, jotka eivät näy pihalta.",
    katsomme: [
      "Tiilet: kuluneisuus, halkeamat ja lohkeamat. Rikkinäiset tiilet vaihdamme uusiin pinnoituksen yhteydessä.",
      "Saumat ja harjat.",
      "Piipun ympärys.",
      "Läpiviennit, kuten tuuletusputket.",
      "Aluskate: pienet vauriot korjaamme pinnoituksen yhteydessä.",
      "Kasvusto: sammal, jäkälä ja lika.",
      "Sadevesikourut.",
    ],
    saatOtsikko: "Mitä saat käynnistä?",
    saat: [
      { title: "Havainnot heti paikan päällä", text: "Eerik kertoo katolta tultuaan, missä kunnossa tiilet, saumat ja aluskate ovat." },
      { title: "Suoran suosituksen", text: "Pinnoitus nyt, pinnoitus myöhemmin tai uusi katto. Jos tiilen pinta on vielä ehjä, sanomme, ettei pinnoitus ole ajankohtainen." },
      { title: "Kirjallisen tarjouksen kiinteällä hinnalla", text: "Hintaan kuuluu pesu, kasvustontorjunta-aine, rikkinäisten tiilien vaihto, pohjamaali ja pintamaali ruiskulla sekä siivous." },
      { title: "Aikaa päättää rauhassa", text: "Tarjous ei sido sinua. Voit vertailla sitä muihin ja kysyä lisää." },
    ],
    eteneeOtsikko: "Näin kuntotarkastus etenee",
    etenee: yhteiset.etenee("Kuntotarkastus", "Eerik", { base: "tiilikaton-pinnoitus-tampere-harmaa-tiilikatto-ennen", alt: "Harmaa tiilikatto ennen pinnoitusta, Tampere" }),
    kuvat: [
      { base: "tiilikaton-pinnoitus-kangasala-sammaleinen-tiilikatto-ennen", alt: "Sammaleinen tiilikatto ennen pinnoitusta, Kangasala", caption: "Sammal ja kulunut tiilen pinta: katsomme, riittääkö pinnoitus." },
      { base: "tiilikaton-pinnoitus-varatiilien-maalaus", alt: "Varatiilet maalattuna pihalla ennen asennusta", caption: "Rikkinäiset tiilet lasketaan ja vaihdetaan uusiin pinnoituksen yhteydessä." },
      { base: "tiilikaton-pinnoitus-valkeakoski-aurinkopaneelit-ennen", alt: "Tiilikatto ja aurinkopaneelit ennen pinnoitusta, Valkeakoski", caption: "Läpiviennit, piipun ympärys ja aurinkopaneelien suojaus katsotaan samalla." },
    ],
    etaOtsikko: "Etätarjous kuvista",
    eta: "Jos haluat hinnan nopeasti, lähetä kuvat katosta ja arvio katon koosta. Yleensä ne riittävät tarjoukseen. Tarkat mitat tai aiempi kuntoraportti ovat iso plussa. Kuntotarkastus paikan päällä on silti tarkin tapa.",
    hintaTeksti: `Tiilikaton pinnoitus maksaa yleensä ${PINNOITUS_HINTA}. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta, ja tarkan hinnan saat kirjallisena kuntotarkastuksen jälkeen. Työn osuudesta saat kotitalousvähennyksen, ja erittelemme sen laskulle valmiiksi.`,
    hintaLinkki: { to: "/tiilikaton-pinnoitus-hinta-pirkanmaa/", label: "Tiilikaton pinnoituksen hinta" },
    palveluLinkki: { to: "/tiilikaton-pinnoitus-pirkanmaa/", label: "Tiilikaton pinnoitus Pirkanmaalla" },
    faq: [
      { question: "Maksaako katon kuntotarkastus jotain?", answer: "Ei. Kuntotarkastus ja kirjallinen tarjous ovat ilmaisia. Maksullinen katon kuntotarkastus maksaa Suomessa yleensä noin 280 euroa." },
      { question: "Onko tarkastus puolueeton, kun te myös pinnoitatte kattoja?", answer: "Kuntotarkastus on samalla tarjouskäynti, ja sanomme sen suoraan. Silti kerromme rehellisesti, jos pinnoitus ei ole ajankohtainen tai jos katto kannattaa uusia. Huonosta työstä ei tule hyvää mainetta." },
      { question: "Pitääkö minun olla paikalla?", answer: "Ei välttämättä. On hyvä olla paikalla, koska käymme katon ja tarjouksen läpi yhdessä. Sovimme ajan, joka sopii sinulle, mahdollisesti jopa iltaisin tai viikonloppuisin." },
      { question: "Saanko tarjouksen etänä kuvien perusteella?", answer: "Kyllä. Yleensä kuvat katosta ja arvio katon koosta riittävät. Tarkat mitat tai kuntoraportti ovat iso plussa. Ilmainen kuntotarkastus paikan päällä on silti tarkin tapa." },
      { question: "Saanko hinta-arvion jo ennen käyntiä?", answer: 'Kyllä. <a href="/hintalaskuri/?palvelu=pinnoitus">Hintalaskuri</a> antaa suuntaa antavan arvion katon koon ja jyrkkyyden mukaan. Tarkan, kiinteän hinnan saat kirjallisessa tarjouksessa kuntotarkastuksen jälkeen.' },
      { question: "Mitä jos katto ei tarvitse pinnoitusta?", answer: "Sanomme sen suoraan. Jos tiilen pinta on vielä ehjä, pinnoitus ei ole ajankohtainen. Jos taas aluskate vuotaa tai tiiliä on rikki laajalti, kerromme, että katto kannattaa uusia." },
      { question: "Milloin tiilikaton pinnoitus on ajankohtainen?", answer: "Yleensä noin 15 vuoden iässä, kun tiilen väri on haalistunut, pinta tuntuu karhealta ja sammal kasvaa nopeasti. Pinnoitettu katto kestää jopa 15 vuotta pidempään." },
      { question: "Katsotteko samalla myös seinät?", answer: 'Kyllä, jos haluat tarjouksen myös <a href="/talon-maalaus-pirkanmaa/">talon maalauksesta</a>. Katto ja seinät samalla kertaa on edullisempi pakettihinta.' },
      { question: "Miten maksu tapahtuu, jos tilaan pinnoituksen?", answer: "Kun hyväksyt tarjouksen, lähetämme ennakkolaskun, joka on 10 % hinnasta. Loput laskutamme, kun työ on valmis ja olemme käyneet sen yhdessä läpi." },
    ],
    schemaName: "Ilmainen katon kuntotarkastus",
    schemaAlternate: ["Kattotarkastus", "Tiilikaton kuntotarkastus", "Katon kuntoarvio", "Ilmainen kattotarkastus"],
    hero: { base: "tiilikaton-pinnoitus-tampere-eerik-pitkanen-katolla", alt: "Eerik Pitkänen tiilikatolla kuntotarkastuksessa" },
    badge: { title: "Eerik tarkastaa katon", text: "Käy katon läpi itse ja vastaa jäljestä." },
    cta: { to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" },
    laskuri: "/hintalaskuri/?palvelu=pinnoitus",
    contactVariant: "katto",
    articleCategories: ["katto"],
  },
  maalaus: {
    path: "/ilmainen-julkisivun-kuntoarvio",
    parent: { name: "Talon maalaus", path: "/talon-maalaus-pirkanmaa" },
    eyebrow: "Ilmainen arviokäynti · Pirkanmaa",
    h1: "Ilmainen julkisivun kuntoarvio ja arviokäynti",
    lead: `Eemil käy talosi seinät läpi paikan päällä ja kertoo suoraan, riittääkö huoltomaalaus, kannattaako odottaa vai tarvitaanko isompia pohjatöitä. Arviokäynti ja kirjallinen tarjous kiinteällä hinnalla ovat ilmaisia, yleensä samalla viikolla. Talon maalaus maksaa yleensä ${MAALAUS_HINTA}, ja takuu on ${TAKUU.maalaus}.`,
    arvoMuualla: 180,
    lyhyesti: {
      facts: [
        { label: "Hinta sinulle", value: "0 €" },
        { label: "Maksullisena muualla", value: "noin 180 €" },
        { label: "Milloin", value: "Yleensä\nsamalla viikolla" },
        { label: "Saat", value: "Kirjallisen tarjouksen\nkiinteällä hinnalla" },
      ],
      note: "Arviokäynti ei sido sinua mihinkään. Jos maalaus ei ole vielä ajankohtainen, sanomme sen suoraan.",
    },
    miksiOtsikko: "Miksi seinien kunto kannattaa selvittää ajoissa?",
    miksiIntro:
      "Maali suojaa puuta vedeltä ja auringolta. Kun maali haalistuu, hilseilee tai halkeilee, puu alkaa imeä vettä. Kun maali vielä pysyy kiinni, maalaus on halvin: mitä pidempään odotat, sitä enemmän pohjatöitä seinä vaatii.",
    merkit: [
      { title: "Maali hilseilee tai lohkeilee", text: "Kosteus on päässyt maalin alle ja heikentänyt sen tartunnan puuhun." },
      { title: "Pinta liituuntuu tai haalistuu", text: "Maali on kulunut, ja vesi imeytyy puuhun." },
      { title: "Mustat pilkut seinässä", text: "Pilkut ovat hometta tai likaa. Seinä pestään homepesuaineella ja harjoilla ennen maalausta." },
    ],
    katsommeOtsikko: "Mitä arviokäynnillä katsotaan?",
    katsommeIntro: "Eemil käy seinät läpi itse, myös pihan puolen ja päädyt. Katsomme seitsemän asiaa.",
    katsomme: [
      "Maalipinta: hilseily, liituuntuminen ja haalistuminen.",
      "Mitä maalia seinässä on nyt. Uusi maali valitaan sen mukaan.",
      "Paljaat ja harmaantuneet puukohdat, jotka pohjamaalataan.",
      "Home ja lika, jotka pestään pois ennen maalausta.",
      "Halkeamat paneelien päissä ja nurkissa.",
      "Listat, ikkunanpielet, räystäslaudat ja kuistit.",
      "Pohjatöiden määrä, josta hinta eniten riippuu.",
    ],
    saatOtsikko: "Mitä saat käynnistä?",
    saat: [
      { title: "Havainnot heti paikan päällä", text: "Eemil kertoo käynnillä, missä kunnossa maali ja puu ovat ja paljonko pohjatöitä tarvitaan." },
      { title: "Suoran suosituksen", text: "Huoltomaalaus nyt, maalaus myöhemmin tai ensin isommat pohjatyöt. Jos maali vielä suojaa puuta, sanomme sen." },
      { title: "Kirjallisen tarjouksen kiinteällä hinnalla", text: "Hintaan kuuluu homepesu, kaavinta, pohjamaali paljaisiin kohtiin, pintamaali pensselillä ja siivous. Väri ja maali kirjataan tarjoukseen." },
      { title: "Aikaa päättää rauhassa", text: "Tarjous ei sido sinua. Voit vertailla sitä muihin ja kysyä lisää." },
    ],
    eteneeOtsikko: "Näin arviokäynti etenee",
    etenee: yhteiset.etenee("Arviokäynti", "Eemil", { base: "talon-maalaus-tampere-koristeikkunat-puutalo-ennen", alt: "Puutalo ennen maalausta, Tampere" }),
    kuvat: [
      { base: "talon-maalaus-tampere-hilseileva-paaty-ennen", alt: "Hilseilevä puutalon pääty ennen maalausta, Tampere", caption: "Hilseilevä maali: katsomme, paljonko kaavintaa ja pohjamaalia tarvitaan." },
      { base: "talon-maalaus-tampere-hilseileva-ulkoverhous-lahikuva-ennen", alt: "Hilseilevä ulkoverhous läheltä ennen maalausta", caption: "Läheltä näkyy, pitääkö vanha maali vielä kiinni puussa." },
      { base: "talon-maalaus-vihrea-puutalo-ennen-ulkomaalausta", alt: "Vihreä puutalo, jonka seinissä on hometta ja likaa ennen maalausta", caption: "Home ja lika pestään pois ennen maalausta." },
    ],
    etaOtsikko: "Etätarjous kuvista",
    eta: "Jos haluat hinnan nopeasti, lähetä kuvat seinistä ja arvio talon koosta. Yleensä ne riittävät tarjoukseen. Tarkat mitat ovat iso plussa. Arviokäynti paikan päällä on silti tarkin tapa, koska pohjatöiden määrä näkyy vasta läheltä.",
    hintaTeksti: `Talon maalaus maksaa yleensä ${MAALAUS_HINTA}. Hinta riippuu talon koosta, kerrosten määrästä ja pohjatöiden määrästä, ja tarkan hinnan saat kirjallisena arviokäynnin jälkeen. Työn osuudesta saat kotitalousvähennyksen, ja erittelemme sen laskulle valmiiksi.`,
    hintaLinkki: { to: "/talon-maalaus-hinta-pirkanmaa/", label: "Talon maalauksen hinta" },
    palveluLinkki: { to: "/talon-maalaus-pirkanmaa/", label: "Talon maalaus Pirkanmaalla" },
    faq: [
      { question: "Maksaako arviokäynti jotain?", answer: "Ei. Arviokäynti ja kirjallinen tarjous ovat ilmaisia. Maksullinen julkisivun kuntoarvio maksaa yleensä noin 180 euroa." },
      { question: "Onko kuntoarvio puolueeton, kun te myös maalaatte?", answer: "Arviokäynti on samalla tarjouskäynti, ja sanomme sen suoraan. Silti kerromme rehellisesti, jos maalaus ei ole vielä ajankohtainen. Huonosta työstä ei tule hyvää mainetta." },
      { question: "Pitääkö minun olla paikalla?", answer: "Ei välttämättä. On hyvä olla paikalla, koska käymme seinät ja tarjouksen läpi yhdessä. Sovimme ajan, joka sopii sinulle, mahdollisesti jopa iltaisin tai viikonloppuisin." },
      { question: "Saanko tarjouksen etänä kuvien perusteella?", answer: "Kyllä. Yleensä kuvat seinistä ja arvio talon koosta riittävät. Tarkat mitat ovat iso plussa. Arviokäynti paikan päällä on silti tarkin tapa." },
      { question: "Saanko hinta-arvion jo ennen käyntiä?", answer: 'Kyllä. <a href="/hintalaskuri/?palvelu=maalaus">Hintalaskuri</a> antaa suuntaa antavan arvion talon koon, kerrosten ja maalin kunnon mukaan. Tarkan, kiinteän hinnan saat kirjallisessa tarjouksessa arviokäynnin jälkeen.' },
      { question: "Mitä jos seinät eivät vielä tarvitse maalausta?", answer: "Sanomme sen suoraan. Jos maali vielä suojaa puuta eikä hilseile, maalaus voi odottaa. Kerromme, mitä merkkejä kannattaa seurata." },
      { question: "Voinko vaihtaa talon väriä?", answer: 'Kyllä. Peittävä maali peittää vanhan värin, ja väri kirjataan tarjoukseen. Lue lisää sivulta <a href="/talon-maalaus-pirkanmaa/">talon maalaus</a>.' },
      { question: "Katsotteko samalla myös katon?", answer: 'Kyllä, jos haluat tarjouksen myös <a href="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoituksesta</a>. Katto ja seinät samalla kertaa on edullisempi pakettihinta.' },
      { question: "Miten maksu tapahtuu, jos tilaan maalauksen?", answer: "Kun hyväksyt tarjouksen, lähetämme ennakkolaskun, joka on 10 % hinnasta. Loput laskutamme, kun työ on valmis ja olemme käyneet sen yhdessä läpi." },
    ],
    schemaName: "Ilmainen julkisivun kuntoarvio",
    schemaAlternate: ["Ilmainen arviokäynti", "Talon maalauksen arviokäynti", "Julkisivun kuntotarkastus", "Talon kuntoarvio"],
    hero: { base: "talon-maalaus-orivesi-rintamamiestalo-paaty-ennen", alt: "Rintamamiestalon pääty ennen maalausta ja arviokäyntiä, Orivesi" },
    badge: { title: "Eemil katsoo seinät", text: "Käy seinät läpi itse ja vastaa jäljestä." },
    cta: { to: "/tarjouspyynto/?palvelu=maalaus", label: "Pyydä ilmainen arviokäynti" },
    laskuri: "/hintalaskuri/?palvelu=maalaus",
    contactVariant: "maalaus",
    articleCategories: ["maalaus"],
  },
};

export const KUNTOTARKASTUS_PATHS = Object.values(kuntotarkastukset).map((k) => k.path);
