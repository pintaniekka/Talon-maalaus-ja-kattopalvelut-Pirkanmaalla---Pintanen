import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (pinnoitus = maalaus = kattomaalaus; kuntotarkastus; kasvustontorjunta-aine;
 * painepesu), tyovaiheet.ts, company.ts. Yleiset faktat: K-Rauta tiilikaton asennus (26.10.2026): aluskate suojaa sadevettä,
 * tuulta, vetoa ja pölyä vastaan; Meltex harjatiiviste (26.10.2026): vähentää tuiskulumen, veden ja roskien pääsyä
 * aluskatteelle. Kielletyt katon sanat (CLAUDE.md) on jätetty pois.
 */
const faq = [
  {
    question: "Mitä eroa on pinnoituksella ja maalauksella?",
    answer: "Ei mitään. Tiilikaton pinnoitus, tiilikaton maalaus ja kattomaalaus tarkoittavat samaa työtä: katto pestään ja maalataan kahteen kertaan.",
  },
  {
    question: "Mikä on kattopinnoite?",
    answer: "Kattopinnoite on tiilikatolle tarkoitettu maali. Meillä se on Nowocoat, joka levitetään ruiskulla kahteen kertaan.",
  },
  {
    question: "Mitä kasvustontorjunta-aine tekee?",
    answer: "Se levitetään pesun jälkeen ja pitää sammaleen, jäkälän ja levän poissa katolta.",
  },
  {
    question: "Mikä on kuntotarkastus?",
    answer: "Ilmainen käynti, jolla tarkistamme tiilet, saumat, piipun ympäryksen, läpiviennit ja aluskatteen. Saat kirjallisen tarjouksen kiinteällä hinnalla.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Pinnoitus, maalaus ja kattomaalaus tarkoittavat samaa työtä.</li>
        <li>Sanasto kattaa katon osat, työvaiheet ja tarjouksen sanat.</li>
        <li>Aluskate, harjatiiviste ja läpivienti ovat kolme sanaa, jotka kannattaa tuntea ennen kuntotarkastusta.</li>
        <li>Kuntotarkastus on ilmainen, ja tarjous on kirjallinen ja kiinteä.</li>
      </ul>
    </KeyPoints>

    <p>
      Kattotöissä on sanoja, jotka kuulostavat eri yrityksillä eri asioilta. Kokosimme tähän sanat, joita
      käytämme kuntotarkastuksessa, tarjouksessa ja katolla, jotta tiedät, mistä puhumme.
    </p>

    <h2>Mitä pinnoituksen sanat tarkoittavat?</h2>
    <Table
      head={["Sana", "Mitä se tarkoittaa"]}
      rows={[
        ["Pinnoitus", "Tiilikaton pesu ja maalaus kahteen kertaan. Sama kuin tiilikaton maalaus ja kattomaalaus."],
        ["Kattopinnoite", "Tiilikatolle tarkoitettu maali. Meillä Nowocoat."],
        ["Pohjamaali", "Ensimmäinen maalikerros, joka imeytyy tiileen ja tarttuu."],
        ["Pintamaali", "Toinen kerros, joka peittää, antaa värin ja hylkii vettä."],
        ["Painepesu", "Katon pesu painepesurilla ennen maalausta. Teemme sen aina pinnoituksen yhteydessä."],
        ["Kasvustontorjunta-aine", "Pesun jälkeen levitettävä aine, joka pitää sammaleen ja levän poissa."],
        ["Korkeapaineruisku", "Laite, jolla maali levitetään katolle tasaisesti. Reunat telalla tai käsin."],
      ]}
      caption="Pinnoituksen työvaiheiden sanat."
    />
    <Avainhuomio>Pinnoitus on pesu ja kaksi kerrosta maalia, ja kattopinnoite on kattomaali.</Avainhuomio>

    <h2>Mitä katon osien sanat tarkoittavat?</h2>
    <Table
      head={["Sana", "Mitä se tarkoittaa"]}
      rows={[
        ["Lape", "Katon yksi kalteva pinta. Harjakatossa on kaksi lapetta."],
        ["Harja", "Katon ylin kohta, jossa lappeet kohtaavat. Peitetty harjatiilillä."],
        ["Harjatiiviste", "Nauha harjatiilen alla. Vähentää tuiskulumen, veden ja roskien pääsyä aluskatteelle."],
        ["Jiiri", "Sisäkulma, jossa kaksi lapetta kohtaavat. Kerää vettä ja roskia."],
        ["Räystäs", "Katon alareuna, joka ulottuu seinän yli. Kourut ovat räystäällä."],
        ["Aluskate", "Tiilien alla oleva kerros, joka suojaa rakennetta sadevedeltä, tuulelta, vedolta ja pölyltä."],
        ["Läpivienti", "Kohta, jossa putki, antenni tai luukku menee katon läpi."],
        ["Pellitys", "Pelti piipun juuressa, jiirissä tai läpiviennin ympärillä, joka ohjaa veden tiilien päälle."],
        ["Varatiili", "Ylimääräinen tiili, jolla rikkinäinen tiili vaihdetaan."],
      ]}
      caption="Katon osat, joista puhumme kuntotarkastuksessa."
    />
    <Figure
      image="tiilikaton-pinnoitus-pirkkala-punainen-tiilikatto-harja"
      ratio="3/4"
      alt="Punaisen tiilikaton harja Pirkkalassa"
      caption="Harja ja harjatiilet. Harjatiiviste on harjatiilien alla."
    />
    <Avainhuomio>Aluskate, jiiri ja läpivienti ovat kohdat, joista katto yleensä vuotaa, ja ne tarkistetaan aina.</Avainhuomio>

    <h2>Mitä tarjouksen sanat tarkoittavat?</h2>
    <Table
      head={["Sana", "Mitä se tarkoittaa"]}
      rows={[
        ["Kuntotarkastus", "Ilmainen käynti katolla ennen tarjousta. Sinun on hyvä olla paikalla."],
        ["Kiinteä hinta", "Tarjouksen hinta, joka pitää, vaikka työ venyisi sateen takia."],
        ["Ennakkolasku", "10 % hinnasta, laskutetaan tarjouksen hyväksymisen jälkeen."],
        ["Loppulasku", "Loput hinnasta, kun työ on valmis ja käyty yhdessä läpi."],
        ["Työn osuus", "Laskussa eriteltynä kotitalousvähennystä varten."],
        ["Kirjallinen takuu", "Pinnoitukselle 5 vuotta, maalaukselle 2 vuotta."],
        ["Lopputarkastus", "Kierrämme katon yhdessä, kun työ on valmis."],
      ]}
      caption="Tarjouksen ja laskun sanat."
    />
    <Avainhuomio>Tarjouksen hinta on kiinteä, ennakko on 10 prosenttia ja takuu 5 vuotta.</Avainhuomio>

    <h2>Mistä luet lisää?</h2>
    <p>
      Työvaiheet kerromme artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/">näin tiilikaton pinnoitus etenee</Link>,
      kuntotarkastuksen artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-kuntotarkastus-mita-tarkistamme/">tiilikaton kuntotarkastus</Link> ja
      aluskatteen artikkelissa <Link to="/artikkelit/aluskate-ja-pinnoitus/">mikä aluskate on</Link>. Pinnoitus
      maksaa yleensä 2 850–7 000 euroa, ja palvelun esittelemme sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Kolme artikkelia kertovat työvaiheet, kuntotarkastuksen ja aluskatteen, ja hinta on yleensä 2 850–7 000 euroa.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "K-Rauta: Tiilikaton asennus (luettu 26.10.2026)",
          url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/rakentaminen/tiilikaton-asennus",
        },
        {
          label: "Taloon.com: Tuulettuva harjatiiviste Meltex, tuotekuvaus (luettu 26.10.2026)",
          url: "https://www.taloon.com/tuulettuva-harjatiiviste-meltex-300-mm-x-5-m-musta",
        },
      ]}
    />
  </>
);

export default Body;
