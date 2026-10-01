import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Paljonko tiilikaton pinnoitus maksaa neliöltä?",
    answer:
      "Hintalaskurissamme loiva katto maksaa 15–17 €/m², tavallinen kaltevuus 18–21 €/m² ja jyrkkä katto 22–25 €/m². Pienin urakkahinta on 2 850 euroa.",
  },
  {
    question: "Mitä pinnoituksen hintaan sisältyy?",
    answer:
      "Suunnittelu ja suojaustyöt, katon pesu, kasvustontorjunta-aine, rikkinäisten tiilien vaihto, pohjamaali, pintamaali ja siivous.",
  },
  {
    question: "Voiko pinnoituksen maksaa osissa?",
    answer: "Voi. Tarjoamme maksujärjestelyn, jossa summan voi jakaa kuukausieriin.",
  },
  {
    question: "Kuinka pitkä takuu pinnoituksella on?",
    answer: "Annamme tiilikaton pinnoitukselle 5 vuoden kirjallisen takuun.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Omakotitalon tiilikaton pinnoitus maksaa 2 850–4 880 euroa.</li>
        <li>Neliöhinta on 15–25 euroa katon jyrkkyyden mukaan.</li>
        <li>Kotitalousvähennyksen jälkeen hinta on alkaen 2 050 euroa.</li>
        <li>Eniten hintaan vaikuttavat katon koko, jyrkkyys, muoto ja tiilien kunto.</li>
      </ul>
    </KeyPoints>

    <p>
      Pinnoitustarjouksissa on isoja eroja, eikä loppusumma yksin kerro, mitä rahalla saa. Tässä ovat meidän
      hintamme Pirkanmaalla, se mistä ne koostuvat ja mitä tarjouksesta kannattaa katsoa ennen kuin allekirjoittaa.
    </p>

    <h2>Paljonko tiilikaton pinnoitus maksaa?</h2>
    <Table
      head={["Katon koko", "Hinta", "Kotitalousvähennyksen jälkeen", "Työaika"]}
      rows={[
        ["150–180 m²", "2 850–3 200 €", "alkaen 2 050 €", "2 päivää"],
        ["190–240 m²", "3 300–3 700 €", "alkaen 2 380 €", "2–3 päivää"],
        ["250–300 m²", "3 750–4 880 €", "alkaen 2 700 €", "2–4 päivää"],
      ]}
      caption="Pintasen pinnoitushinnat Pirkanmaalla. Yleisin kattokoko on 190–240 m²."
    />
    <p>
      Hinnat ovat suuntaa antavia. Annamme tarkan urakkahinnan maksuttoman arviokäynnin jälkeen, koska katon kunnon
      näkee vain paikan päällä. Oman kattosi arvion saat{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa">hintalaskurilla</Link>.
    </p>

    <h2>Paljonko pinnoitus maksaa neliöltä?</h2>
    <Table
      head={["Katon kaltevuus", "Neliöhinta"]}
      rows={[
        ["Loiva", "15–17 €/m²"],
        ["Tavallinen", "18–21 €/m²"],
        ["Jyrkkä", "22–25 €/m²"],
      ]}
    />
    <p>
      Jyrkällä katolla tarvitaan enemmän turvavälineitä ja työ etenee hitaammin. Pienin urakkahinta on 2 850 euroa
      katon koosta riippumatta.
    </p>
    <Figure
      image="tiilikaton-pesu-ja-pinnoitus-ennen-jalkeen"
      alt="Tiilikatto ennen ja jälkeen pesun ja pinnoituksen"
      caption="Sama katto ennen ja jälkeen pesun ja pinnoituksen."
    />

    <h2>Mistä hinta muodostuu?</h2>
    <ul>
      <li>
        <strong>Katon koko.</strong> Isommalla katolla kuluu enemmän maalia ja työtunteja, mutta neliöhinta laskee.
      </li>
      <li>
        <strong>Jyrkkyys.</strong> Jyrkkä katto hidastaa työtä ja vaatii enemmän turvavälineitä.
      </li>
      <li>
        <strong>Katon muoto.</strong> Harjat, jiirit ja läpiviennit lisäävät työvaiheita.
      </li>
      <li>
        <strong>Rakennuksen korkeus.</strong> Korkea talo vaatii pidemmät telineet.
      </li>
      <li>
        <strong>Tiilien kunto.</strong> Jos tiiliä on paljon rikki, vaihtaminen lisää työtä ja materiaalia.
      </li>
      <li>
        <strong>Suojaustarve.</strong> Pihan, terassin ja istutusten suojaus kuuluu hintaan, mutta sen määrä vaihtelee.
      </li>
    </ul>

    <h2>Mitä hintaan sisältyy?</h2>
    <ol>
      <li>Suunnittelu ja suojaustyöt</li>
      <li>Katon pesu</li>
      <li>Kasvustontorjunta-aine</li>
      <li>Rikkinäisten tiilien vaihto</li>
      <li>Pohjamaali</li>
      <li>Pintamaali</li>
      <li>Siivous</li>
    </ol>
    <p>
      Tarkistamme ennen tarjousta tiilien lisäksi aluskatteen ja läpiviennit. Maalaamme katon ruiskulla kahteen
      kertaan Tikkurilan ja Nowocoatin kattomaaleilla ja annamme työlle 5 vuoden kirjallisen takuun. Työvaiheet
      on kuvattu sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>

    <h2>Paljonko kotitalousvähennys pienentää hintaa?</h2>
    <p>
      Työn osuudesta saa vuosina 2026 ja 2027 vähentää 40 %. Jos laskun työn osuus on 2 800 euroa, vähennys on
      970 euroa 150 euron omavastuun jälkeen. Säännöt ja laskuesimerkit ovat artikkelissa{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot">
        kotitalousvähennys katto- ja maalaustöissä
      </Link>
      .
    </p>

    <h2>Riittäisikö pelkkä puhdistus?</h2>
    <p>
      Joskus riittää. Jos tiilet ovat hyvässä kunnossa ja katto on vain sammaloitunut,{" "}
      <Link to="/katon-puhdistus-hinta-pirkanmaa">puhdistus</Link> maksaa omakotitalossa noin 800–2 500 euroa.
      Pinnoitus on oikea valinta, kun tiilen pinta on kulunut, mutta aluskate ja rakenteet ovat kunnossa.
      Rakenteellisia vaurioita pinnoitus ei korjaa. Kuluneen pinnan tunnistat artikkelin{" "}
      <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto">milloin tiilikatto pitää pinnoittaa</Link> avulla.
    </p>

    <h2>Mitä tarjouksesta kannattaa tarkistaa?</h2>
    <ul>
      <li>Onko hinta kiinteä urakkahinta vai arvio?</li>
      <li>Kuuluvatko pesu, kasvustontorjunta ja rikkinäisten tiilien vaihto hintaan?</li>
      <li>Montako maalikerrosta tehdään ja millä tuotteilla?</li>
      <li>Onko työn ja materiaalien osuus eritelty kotitalousvähennystä varten?</li>
      <li>Kuinka pitkä takuu on, ja saako sen kirjallisena?</li>
    </ul>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
