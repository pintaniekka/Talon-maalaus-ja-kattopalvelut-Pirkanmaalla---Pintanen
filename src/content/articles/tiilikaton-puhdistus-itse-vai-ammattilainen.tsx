import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints, Sources } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Kuinka usein tiilikatto pitää puhdistaa?",
    answer:
      "Yleensä 2–5 vuoden välein. Jos katto on puiden varjossa, sammal kasvaa nopeammin kuin avoimella paikalla.",
  },
  {
    question: "Vaurioittaako puhdistus kattoa?",
    answer:
      "Oikein tehtynä ei. Me puhdistamme katon kaapimalla ja harjaamalla ilman painepesua, jotta tiilen pinta ei kulu.",
  },
  {
    question: "Paljonko tiilikaton puhdistus maksaa?",
    answer:
      "Omakotitalon tiilikaton puhdistus maksaa meillä noin 800–2 500 euroa katon koon mukaan. Tarkan hinnan saat ilmaisen kuntotarkastuksen jälkeen.",
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
        <li>Sammal pitää tiilen kosteana. Kun vesi jäätyy, tiili voi haljeta.</li>
        <li>Tiilikatto puhdistetaan yleensä 2–5 vuoden välein.</li>
        <li>Kevyen puhdistuksen voit tehdä itse, mutta liian kova vedenpaine kuluttaa tiilen pintaa.</li>
        <li>Ilman kasvustontorjunta-ainetta sammal kasvaa nopeasti takaisin.</li>
        <li>Kotitalousvähennyksen saat vain yritykseltä ostetusta työstä.</li>
      </ul>
    </KeyPoints>

    <p>
      Voiko tiilikaton puhdistaa itse? Osittain voi. Sammal ja jäkälä keräävät kosteutta tiilen pintaan ja rakoihin.
      Kun kosteus jäätyy talvella, tiili voi haljeta. Puhdistus auttaa, kunhan se tehdään niin, ettei tiili itse
      kulu.
    </p>

    <h2>Milloin tiilikatto pitää puhdistaa?</h2>
    <p>
      Katto pitää puhdistaa, kun tiilien pinnalla tai raoissa näkyy sammalta tai jäkälää. Yleensä puhdistus tehdään
      2–5 vuoden välein. Katso samalla keväällä ja syksyllä, että tiilet ovat ehjiä ja paikoillaan.
    </p>
    <Figure
      image="likainen-tiilikatto-ennen-pesua-ja-suojakasittelya"
      alt="Likainen tiilikatto ennen pesua ja suojakäsittelyä"
      caption="Sammal pitää tiilen pinnan kosteana."
    />

    <h2>Voiko tiilikaton puhdistaa itse?</h2>
    <p>
      Roskat, lehdet ja irtonaisen sammaleen saat pois itse. Myös sadevesikourut voit tyhjentää itse. Katon voi
      pestä vedellä, jos paine ei ole liian kova. Aloita pienellä paineella.
    </p>
    <p>Kolme asiaa on hyvä tietää ennen kuin nouset katolle.</p>

    <h3>Liian kova paine kuluttaa tiilen pintaa</h3>
    <p>
      Painepesuri irrottaa sammaleen. Väärin käytettynä se vie mukanaan myös tiilen pintaa. Karhea tiili imee vettä,
      ja sammal tarttuu siihen entistä helpommin.
    </p>

    <h3>Vesi voi mennä tiilien alle</h3>
    <p>
      Jos suihkutat vettä alhaalta ylöspäin, vesi painuu tiilien alle. Katto pestään aina harjalta räystäälle päin.
    </p>

    <h3>Märkä tiili on liukas</h3>
    <p>
      Katolla ei pidä olla ilman turvavarusteita. Tiilien päällä pitää myös osata liikkua niin, etteivät ne mene
      rikki jalan alla.
    </p>

    <h2>Miksi sammal kasvaa takaisin pesun jälkeen?</h2>
    <p>
      Sammaleen itiöt jäävät tiilen huokosiin, vaikka pinta näyttää puhtaalta. Ilman kasvustontorjunta-ainetta katto
      vihertyy pian uudestaan. Torjunta-aine pitää katon puhtaana pidempään.
    </p>

    <h2>Miten me puhdistamme tiilikaton?</h2>
    <p>Puhdistamme tiilikaton mekaanisesti ilman painepesua, jotta tiilet eivät vaurioidu.</p>
    <ol>
      <li>Teemme tarvittavat suojaustyöt.</li>
      <li>Kaavimme sammaleen irti ja harjaamme katon.</li>
      <li>Vaihdamme rikkinäiset tiilet uusiin.</li>
      <li>Levitämme katolle kasvustontorjunta-aineen.</li>
      <li>Tyhjennämme sadevesikourut ja siivoamme jälkemme.</li>
    </ol>
    <p>
      Useimmat omakotitalojen katot valmistuvat yhdessä työpäivässä. Lue lisää sivulta{" "}
      <Link to="/katon-puhdistus-pirkanmaa">katon puhdistus Pirkanmaalla</Link>.
    </p>
    <Figure
      image="puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen"
      alt="Puhdas tiilikatto mekaanisen puhdistuksen jälkeen"
      caption="Tiilikatto mekaanisen puhdistuksen jälkeen."
    />

    <h2>Paljonko tiilikaton puhdistus maksaa?</h2>
    <p>
      Omakotitalon tiilikaton puhdistus maksaa meillä noin 800–2 500 euroa. Hinta riippuu katon koosta, jyrkkyydestä
      ja sammaleen määrästä. Tarkan hinnan saat ilmaisen kuntotarkastuksen jälkeen.
    </p>
    <p>
      Itse tehdystä työstä et saa kotitalousvähennystä. Yritykseltä ostetusta työstä saat. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot">
        kotitalousvähennys katto- ja maalaustöissä
      </Link>
      .
    </p>

    <h2>Milloin puhdistus ei enää riitä?</h2>
    <p>
      Puhdistus riittää, kun katto on likainen ja sammaleinen, mutta tiilet ovat hyvässä kunnossa. Jos tiilen pinta
      on kulunut ja tiili imee vettä, pinnoitus suojaa kattoa paremmin. Lue{" "}
      <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto">milloin tiilikatto pitää pinnoittaa</Link> ja{" "}
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
