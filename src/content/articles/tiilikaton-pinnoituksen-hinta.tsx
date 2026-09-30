import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Paljonko tiilikaton pinnoitus maksaa neliöltä?",
    answer:
      "Pintasen hintalaskurissa loiva katto on 15–17 €/m², tavallinen kaltevuus 18–21 €/m² ja jyrkkä katto 22–25 €/m². Pienin urakkahinta on 2 850 euroa.",
  },
  {
    question: "Mitä pinnoituksen hintaan sisältyy?",
    answer:
      "Suunnittelu ja suojaustyöt, katon pesu, kasvustontorjunta-aine, rikkinäisten tiilien vaihto, pohjamaali, pintamaali ja siivous.",
  },
  {
    question: "Voiko pinnoituksen maksaa osissa?",
    answer:
      "Kyllä. Pintanen tarjoaa maksujärjestelyn, jossa kustannuksen voi jakaa kuukausittain maksettaviin osiin.",
  },
  {
    question: "Kuinka pitkä takuu pinnoituksella on?",
    answer: "Pintanen antaa tiilikaton pinnoitukselle 5 vuoden kirjallisen takuun.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Tyypillinen omakotitalon katto maksaa 2 850–4 880 euroa.</li>
        <li>Neliöhinta on 15–25 euroa katon jyrkkyyden mukaan.</li>
        <li>Hintaan vaikuttavat eniten katon koko, jyrkkyys, muoto ja tiilien kunto.</li>
        <li>Kotitalousvähennys pienentää lopullista kustannusta usein satoja euroja.</li>
      </ul>
    </KeyPoints>

    <p>
      Tiilikaton pinnoituksen hinta kiinnostaa yleensä ensimmäisenä, ja syystä: tarjousten erot voivat olla suuria,
      eikä pelkkä loppusumma kerro, mitä sillä saa. Tässä artikkelissa avataan Pintasen omat hinnat, hinnan
      muodostuminen ja se, mitä tarjouksesta kannattaa tarkistaa.
    </p>

    <h2>Hinta katon koon mukaan</h2>
    <p>Pintasen pinnoitushinnat Pirkanmaalla ovat seuraavat:</p>
    <ul>
      <li>
        <strong>150–180 m²</strong>, pieni tai keskisuuri koti: 2 850–3 200 €, työaika noin 2 päivää
      </li>
      <li>
        <strong>190–240 m²</strong>, yleisin kattokoko: 3 300–3 700 €, työaika 2–3 päivää
      </li>
      <li>
        <strong>250–300 m²</strong>, suuri omakotitalo: 3 750–4 880 €, työaika 2–4 päivää
      </li>
    </ul>
    <p>
      Luvut ovat suuntaa antavia. Tarkka urakkahinta annetaan maksuttoman arviokäynnin jälkeen, koska katon kunto
      selviää vain paikan päällä. Oman kattosi arvion saat{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa">hintalaskurilla</Link>.
    </p>

    <h2>Neliöhinta ja jyrkkyyden vaikutus</h2>
    <p>Laskurin neliöhinnat riippuvat katon kaltevuudesta:</p>
    <ul>
      <li>Loiva katto: 15–17 €/m²</li>
      <li>Tavallinen kaltevuus: 18–21 €/m²</li>
      <li>Jyrkkä katto: 22–25 €/m²</li>
    </ul>
    <p>
      Jyrkkä katto vaatii enemmän turvavälineitä ja hidastaa työtä, mikä näkyy neliöhinnassa. Laskurin pienin urakkahinta on
      2 850 euroa katon koosta riippumatta.
    </p>
    <Figure
      image="tiilikaton-pesu-ja-pinnoitus-ennen-jalkeen"
      alt="Tiilikatto ennen ja jälkeen pesun ja pinnoituksen"
      caption="Sama katto ennen ja jälkeen pesun ja pinnoituksen."
    />

    <h2>Mistä hinta muodostuu?</h2>
    <p>Kuusi tekijää selittää suurimman osan hintaeroista:</p>
    <ul>
      <li>
        <strong>Katon koko.</strong> Suurempi katto tarkoittaa enemmän materiaalia ja työtunteja, mutta neliöhinta
        laskee katon kasvaessa.
      </li>
      <li>
        <strong>Jyrkkyys.</strong> Jyrkempi katto vaatii enemmän turvavälineitä ja hidastaa työtä.
      </li>
      <li>
        <strong>Katon muoto.</strong> Harjat, jiirit ja läpiviennit lisäävät työvaiheita.
      </li>
      <li>
        <strong>Rakennuksen korkeus.</strong> Korkea rakennus vaatii pidemmät telineet ja enemmän
        turvallisuusjärjestelyjä.
      </li>
      <li>
        <strong>Tiilien kunto.</strong> Jos tiiliä on paljon rikki, vaihtotyö lisää kestoa ja materiaalikuluja.
      </li>
      <li>
        <strong>Suojaustarve.</strong> Pihan, terassien ja istutusten suojaus kuuluu hintaan, mutta vaikuttaa työn
        laajuuteen.
      </li>
    </ul>

    <h2>Mitä hintaan sisältyy?</h2>
    <p>Pintasen pinnoitushinta kattaa koko työn alusta loppuun:</p>
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
      Ennen tarjousta tarkistetaan tiilien lisäksi aluskate ja läpiviennit. Katto maalataan ruiskulla kahteen kertaan
      Tikkurilan ja Nowocoatin kattomaaleilla, ja työlle annetaan 5 vuoden kirjallinen takuu. Työvaiheet on kuvattu
      tarkemmin sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa">tiilikaton pinnoitus</Link>.
    </p>

    <h2>Kotitalousvähennys pienentää lopullista hintaa</h2>
    <p>
      Pinnoituksessa suurin osa laskusta on työtä, ja työn osuudesta saa kotitalousvähennyksen. Jos työn osuus on
      esimerkiksi 2 800 euroa, vähennys on vuoden 2026 40 prosentin säännöllä 970 euroa omavastuun jälkeen. Säännöt ja
      laskuesimerkit löytyvät artikkelista{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot">
        kotitalousvähennys katto- ja maalaustöissä
      </Link>
      .
    </p>

    <h2>Pinnoitus, puhdistus vai uusi katto?</h2>
    <p>
      Pinnoitus ei ole aina oikea ratkaisu. Jos tiilet ovat hyvässä kunnossa ja katto on vain sammaloitunut,{" "}
      <Link to="/katon-puhdistus-hinta-pirkanmaa">pelkkä puhdistus</Link> voi riittää. Sen hinta on omakotitalossa
      tyypillisesti 800–2 500 euroa. Jos taas katossa on laajoja rakenteellisia vaurioita, pinnoitus ei korjaa niitä.
    </p>
    <p>
      Pinnoitus on järkevin silloin, kun aluskate ja rakenteet ovat kunnossa, mutta tiilen pinta on kulunut. Merkit
      tästä on käyty läpi artikkelissa{" "}
      <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto">milloin tiilikatto pitää pinnoittaa</Link>.
    </p>

    <h2>Mitä tarjouksesta kannattaa tarkistaa?</h2>
    <ul>
      <li>Onko hinta kiinteä urakkahinta vai arvio?</li>
      <li>Sisältyvätkö pesu, kasvustontorjunta ja rikkinäisten tiilien vaihto?</li>
      <li>Montako maalikerrosta tehdään ja millä tuotteilla?</li>
      <li>Onko työn ja materiaalien osuus eritelty kotitalousvähennystä varten?</li>
      <li>Kuinka pitkä takuu on ja saako sen kirjallisena?</li>
    </ul>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
