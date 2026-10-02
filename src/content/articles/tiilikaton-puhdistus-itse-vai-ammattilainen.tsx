import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Kuinka usein tiilikatto pitää puhdistaa?",
    answer:
      "Tavallisesti 2–5 vuoden välein ympäristöstä riippuen. Puiden varjossa oleva katto sammaloituu nopeammin kuin avoimella paikalla oleva.",
  },
  {
    question: "Vaurioittaako puhdistus kattoa?",
    answer:
      "Oikein tehtynä ei. Puhdistamme katon kaapimalla ja harjaamalla ilman painepesua, jotta tiilen pinta ei kulu.",
  },
  {
    question: "Paljonko tiilikaton puhdistus maksaa?",
    answer:
      "Pieni omakotitalo maksaa meillä noin 800–1 200 euroa, keskikokoinen noin 1 200–1 800 euroa ja suurempi kohde noin 1 800–2 500 euroa. Hinnat sisältävät arvonlisäveron.",
  },
  {
    question: "Kauanko katon puhdistus kestää?",
    answer: "Useimmat omakotitalojen katot valmistuvat yhdessä työpäivässä.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Sammal pitää tiilen kosteana, ja jäätyvä vesi rikkoo tiiliä.</li>
        <li>Tiilikatto puhdistetaan tavallisesti 2–5 vuoden välein.</li>
        <li>Kevyen puhdistuksen voi tehdä itse, mutta liian kova vedenpaine kuluttaa tiilen pintaa.</li>
        <li>Ilman kasvustontorjuntaa sammal palaa nopeasti.</li>
        <li>Kotitalousvähennyksen saa vain ostetusta työstä.</li>
      </ul>
    </KeyPoints>

    <p>
      Sammal ja jäkälä keräävät kosteutta tiilen pintaan ja rakoihin. Kun kosteus talvella jäätyy, tiili voi
      haljeta. Puhdistus pysäyttää tämän, kunhan se tehdään tavalla, joka ei itse kuluta tiiltä.
    </p>

    <h2>Milloin tiilikatto pitää puhdistaa?</h2>
    <p>
      Kun tiilten raoissa tai pinnalla näkyy sammalta, jäkälää tai muuta kasvustoa. Tavallinen puhdistusväli on
      2–5 vuotta. Keväällä ja syksyllä kannattaa samalla katsoa, että tiilet ovat ehjiä ja paikoillaan.
    </p>
    <Figure
      image="likainen-tiilikatto-ennen-pesua-ja-suojakasittelya"
      alt="Likainen tiilikatto ennen pesua ja suojakäsittelyä"
      caption="Kasvusto pitää tiilen pinnan kosteana."
    />

    <h2>Voiko tiilikaton puhdistaa itse?</h2>
    <p>
      Voi, osittain. Roskat, lehdet ja irtonaisen sammaleen saa pois itse, ja räystäskourut voi tyhjentää. Katon
      voi myös pestä vedellä, kunhan paine ei ole liian kova. Aloita pienellä paineella ja lisää sitä vain, jos
      on pakko.
    </p>
    <p>Kolme asiaa kannattaa tietää ennen kuin nousee katolle.</p>

    <h3>Liian kova paine kuluttaa tiilen pintaa</h3>
    <p>
      Painepesuri irrottaa sammaleen, mutta väärin käytettynä se vie mukanaan myös tiilen suojaavaa pintaa. Karhea
      pinta imee vettä, ja sammal kasvaa siihen entistä helpommin.
    </p>

    <h3>Vesi voi mennä tiilten alle</h3>
    <p>
      Jos vettä suihkuttaa alhaalta ylöspäin, se painuu tiilten limitysten alle. Katto pestään aina harjalta
      räystäälle päin.
    </p>

    <h3>Märkä tiili on liukas</h3>
    <p>
      Katolla ei pidä työskennellä ilman turvavarusteita. Tiilten päällä pitää myös osata liikkua niin, etteivät
      ne rikkoudu jalan alla.
    </p>

    <h2>Miksi sammal palaa pesun jälkeen?</h2>
    <p>
      Sammaleen itiöt jäävät tiilen huokosiin, vaikka pinta näyttää puhtaalta. Ilman kasvustontorjunta-ainetta
      katto vihertyy pian uudelleen. Torjunta-aine on se osa puhdistusta, jonka ansiosta katto pysyy puhtaana
      pidempään.
    </p>

    <h2>Miten ammattilainen puhdistaa tiilikaton?</h2>
    <p>Puhdistamme tiilikatot mekaanisesti ilman painepesua, jotta tiilet eivät vaurioidu.</p>
    <ol>
      <li>Teemme tarvittavat suojaustyöt.</li>
      <li>Kaavimme sammaleen irti ja harjaamme katon.</li>
      <li>Vaihdamme rikkinäiset tiilet uusiin.</li>
      <li>Levitämme katolle kasvustontorjunta-aineen.</li>
      <li>Tyhjennämme räystäskourut ja siivoamme jälkemme.</li>
    </ol>
    <p>
      Useimmat omakotitalojen katot valmistuvat yhdessä työpäivässä. Palvelu on kuvattu sivulla{" "}
      <Link to="/katon-puhdistus-pirkanmaa">katon puhdistus Pirkanmaalla</Link>.
    </p>
    <Figure
      image="puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen"
      alt="Puhdas tiilikatto mekaanisen puhdistuksen jälkeen"
      caption="Tiilikatto mekaanisen puhdistuksen jälkeen."
    />

    <h2>Paljonko tiilikaton puhdistus maksaa?</h2>
    <Table
      head={["Kohde", "Hinta"]}
      rows={[
        ["Pieni omakotitalo", "noin 800–1 200 €"],
        ["Keskikokoinen omakotitalo", "noin 1 200–1 800 €"],
        ["Suurempi kohde", "noin 1 800–2 500 €"],
      ]}
      caption="Pintasen hintaesimerkit Pirkanmaalla, sis. ALV 25,5 %."
    />
    <p>
      Annamme lopullisen hinnan kuntotarkastuksen jälkeen. Itse tehdystä työstä ei saa kotitalousvähennystä, mutta
      yritykseltä ostetun työn osuudesta saa. Säännöt ovat artikkelissa{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot">
        kotitalousvähennys katto- ja maalaustöissä
      </Link>
      .
    </p>

    <h2>Milloin puhdistus ei enää riitä?</h2>
    <p>
      Puhdistus riittää, kun katto on likainen ja sammaleinen mutta tiilet ovat hyvässä kunnossa. Jos tiilen pinta
      on kulunut, vesi imeytyy tiileen tai rikkinäisiä tiiliä on useita, pinnoitus suojaa kattoa paremmin. Eron
      tunnistat artikkelin <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto">milloin tiilikatto pitää pinnoittaa</Link>{" "}
      avulla, ja vaihtoehtoja vertaillaan artikkelissa{" "}
      <Link to="/artikkelit/pinnoitus-vai-uusi-katto">pinnoitus vai uusi katto</Link>.
    </p>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        { label: "Taloon.com: Vesikaton huolto", url: "https://www.taloon.com/rakentajan-tietopankki/katot-katonhuolto/vesikaton-huolto" },
      ]}
    />
  </>
);

export default Body;
