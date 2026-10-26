import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (hyväksyt tarjouksen vastaamalla tarjousviestiin; kirjallinen sopimus ja
 * aikataulu; yhteydenotto ennen aloituspäivää; ennakkolasku 10 %, loput kun työ on valmis ja käyty yhdessä läpi; sateella
 * ei maalata, siirrosta ei lisäkulua; tarvitsemme vesipisteen ja sähköä; kevyet pihakalusteet kauemmas), tyovaiheet.ts.
 * Ei ulkoisia faktoja.
 */
const faq = [
  {
    question: "Miten hyväksyn tarjouksen?",
    answer: "Vastaamalla tarjousviestiin. Sen jälkeen teemme kirjallisen sopimuksen ja sovimme aikataulun.",
  },
  {
    question: "Milloin maksan?",
    answer:
      "Hyväksymisen jälkeen lähetämme ennakkolaskun, joka on 10 % hinnasta. Loput laskutamme, kun työ on valmis ja olemme käyneet sen yhdessä läpi.",
  },
  {
    question: "Pitääkö minun olla kotona työn aikana?",
    answer:
      "Ei koko aikaa. Aloituspäivänä ja lopputarkastuksessa on hyvä olla paikalla. Tarvitsemme vesipisteen ja sähköä, muun tuomme itse.",
  },
  {
    question: "Mitä teen ennen aloituspäivää?",
    answer: "Siirrä kevyet pihakalusteet ja ruukut hieman kauemmas talosta. Muusta huolehdimme itse.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Hyväksyt tarjouksen vastaamalla tarjousviestiin.</li>
        <li>Teemme kirjallisen sopimuksen ja sovimme aikataulun. Otamme yhteyttä ennen aloituspäivää.</li>
        <li>Ennakkolasku on 10 % hinnasta. Loput laskutamme, kun työ on valmis ja käyty yhdessä läpi.</li>
        <li>Pinnoitus kestää 2–3 päivää, talon maalaus 3–7 päivää.</li>
      </ul>
    </KeyPoints>

    <p>
      Tarjous on hyväksytty. Mitä sitten? Asiakkaat kysyvät tätä usein, ja vastaus on sama katon ja seinien
      töissä. Kerromme tässä vaihe vaiheelta, mitä tapahtuu hyväksymisen ja valmiin työn välillä.
    </p>

    <h2>Mitä tapahtuu heti tarjouksen hyväksymisen jälkeen?</h2>
    <p>
      Hyväksyt tarjouksen vastaamalla tarjousviestiin. Sen jälkeen teemme kirjallisen sopimuksen, jossa ovat
      sama kiinteä hinta ja samat työt kuin tarjouksessa. Sovimme työn ajankohdan vapaiden viikkojen rajoissa.
      Lähetämme ennakkolaskun, joka on 10 % hinnasta. Väri ja maali on kirjattu jo tarjoukseen.
    </p>
    <Table
      head={["Vaihe", "Milloin", "Mitä sinä teet"]}
      rows={[
        ["Hyväksyminen", "Heti", "Vastaat tarjousviestiin"],
        ["Sopimus ja aikataulu", "Hyväksymisen jälkeen", "Tarkistat ja hyväksyt sopimuksen"],
        ["Ennakkolasku 10 %", "Sopimuksen jälkeen", "Maksat laskun"],
        ["Yhteydenotto", "Ennen aloituspäivää", "Vahvistat, että päivä sopii"],
        ["Työ", "2–3 päivää katto, 3–7 päivää seinät", "Siirrät kevyet pihakalusteet kauemmas"],
        ["Lopputarkastus ja loppulasku", "Kun työ on valmis", "Kierrät kohteen kanssamme"],
      ]}
      caption="Tilauksesta valmiiseen työhön. Sama kulku pinnoituksessa ja maalauksessa."
    />
    <Avainhuomio>Hyväksymisen jälkeen tulee kirjallinen sopimus ja 10 prosentin ennakkolasku, ja loput maksetaan vasta valmiista työstä.</Avainhuomio>

    <h2>Miten aikataulu sovitaan?</h2>
    <p>
      Sovimme viikon, joka sopii sinulle ja kalenteriimme. Otamme yhteyttä ennen aloituspäivää ja vahvistamme
      ajan. Sää voi siirtää päivää: sateella ei maalata, koska pinnan pitää olla kuiva. Seuraamme ennustetta ja
      sovimme tarvittaessa uuden päivän. Siitä ei tule lisäkuluja, ja hinta pitää. Kesän ajat täyttyvät
      keväällä, joten kannattaa tilata ajoissa. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/milloin-tilata-kesan-pinnoitus/">milloin kesän pinnoitus kannattaa tilata</Link>.
    </p>
    <Avainhuomio>Otamme yhteyttä ennen aloituspäivää, ja sateen siirtämä päivä ei maksa mitään.</Avainhuomio>

    <h2>Mitä sinun pitää järjestää ennen työtä?</h2>
    <ul>
      <li>Vesipiste ja sähkö. Pesu ja työkalut tarvitsevat ne.</li>
      <li>Kevyet pihakalusteet ja ruukut hieman kauemmas talosta.</li>
      <li>Auto pois pihasta, jos se on talon tai telineiden vieressä.</li>
      <li>Katolla: kerro, onko varatiiliä. Seinillä: kerro, jos haluat vaihtaa värin.</li>
    </ul>
    <p>Telineet, nostimet, maalit ja suojaukset tuomme itse. Sinun ei tarvitse vuokrata mitään.</p>
    <Figure
      image="talon-maalaus-ympariston-suojaus-ennen-maalausta"
      alt="Ympäristön suojaus ennen talon maalausta"
      caption="Suojaamme terassit ja ympäristön ennen työtä. Kevyet kalusteet kannattaa siirtää itse."
    />
    <Avainhuomio>Sinulta tarvitaan vain vesi ja sähkö, kaiken muun tuomme itse.</Avainhuomio>

    <h2>Miten työ päättyy?</h2>
    <p>
      Kierrämme kohteen yhdessä sinun kanssasi ja katsomme työn jäljen. Siivoamme jälkemme. Sen jälkeen
      lähetämme loppulaskun, jossa työn osuus on eriteltynä kotitalousvähennystä varten. Pinnoitukselle
      annamme 5 vuoden ja maalaukselle 2 vuoden kirjallisen takuun. Vähennyksestä kerromme sivulla{" "}
      <Link to="/kotitalousvahennys/">kotitalousvähennys</Link>. Palvelut esittelemme sivuilla{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus</Link> ja{" "}
      <Link to="/talon-maalaus-pirkanmaa/">talon maalaus</Link>.
    </p>
    <Avainhuomio>Työ päättyy yhteiseen lopputarkastukseen, ja loppulaskussa on työn osuus eriteltynä vähennystä varten.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
