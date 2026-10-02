import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Paljonko tiilikaton pinnoitus maksaa neliöltä?",
    answer:
      "Meillä tiilikaton pinnoitus maksaa alkaen 15 €/m². Neliöhinta riippuu katon jyrkkyydestä, muodosta ja kunnosta. Tarkan hinnan saat ilmaisen kuntotarkastuksen jälkeen.",
  },
  {
    question: "Mitä tiilikaton pinnoituksen hintaan kuuluu?",
    answer:
      "Hintaan kuuluu suunnittelu ja tarvittavat suojaustyöt, katon pesu, kasvustontorjunta-aine, rikkinäisten tiilien vaihto, pohjamaali, pintamaali ja siivous. Ylimääräisiä kuluja ei tule.",
  },
  {
    question: "Voiko tiilikaton pinnoituksen maksaa osissa?",
    answer: "Kyllä voi. Meillä on maksujärjestely, jolla voit jakaa hinnan kuukausieriin.",
  },
  {
    question: "Kuinka pitkä takuu pinnoituksella on?",
    answer: "Saat tiilikaton pinnoitukselle meiltä 5 vuoden kirjallisen takuun.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä 2 850–4 880 euroa.</li>
        <li>Kotitalousvähennyksen jälkeen hinta on alkaen 2 050 euroa.</li>
        <li>Hinta riippuu katon koosta, jyrkkyydestä, muodosta ja tiilien kunnosta.</li>
        <li>Tarkan hinnan saat, kun käymme katsomassa katon. Käynti on ilmainen.</li>
      </ul>
    </KeyPoints>

    <p>
      Paljonko tiilikaton pinnoitus maksaa? Se riippuu katosta. Kaksi samankokoista kattoa voi olla aivan eri
      kunnossa, ja se näkyy hinnassa. Kerromme tässä, missä hinnat yleensä liikkuvat, mistä hinta syntyy ja mitä
      rahalla saa.
    </p>

    <h2>Paljonko tiilikaton pinnoitus maksaa?</h2>
    <p>
      Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä <strong>2 850–4 880 euroa</strong>. Pieni ja loiva
      katto on edullisempi. Iso ja jyrkkä katto maksaa enemmän. Työ kestää yleensä 2–4 päivää.
    </p>
    <p>
      Työn osuudesta saat kotitalousvähennyksen. Sen jälkeen hinta on <strong>alkaen 2 050 euroa</strong>.
    </p>
    <p>
      Suuntaa antavan hinnan omalle katollesi saat{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa">hintalaskurilla</Link>. Tarkan urakkahinnan annamme, kun
      olemme käyneet katolla. Katon kunnon näkee vain paikan päällä, eikä käynti maksa sinulle mitään.
    </p>
    <Figure
      image="tiilikaton-pesu-ja-pinnoitus-ennen-jalkeen"
      alt="Tiilikatto ennen ja jälkeen pesun ja pinnoituksen"
      caption="Sama katto ennen ja jälkeen pesun ja pinnoituksen."
    />

    <h2>Mistä tiilikaton pinnoituksen hinta syntyy?</h2>
    <p>Hintaan vaikuttaa viisi asiaa.</p>
    <ul>
      <li>
        <strong>Katon koko.</strong> Isoon kattoon kuluu enemmän maalia ja työtä.
      </li>
      <li>
        <strong>Katon jyrkkyys.</strong> Jyrkällä katolla työ on hitaampaa ja turvavälineitä tarvitaan enemmän.
      </li>
      <li>
        <strong>Katon muoto.</strong> Harjat, jiirit ja läpiviennit lisäävät työtä.
      </li>
      <li>
        <strong>Talon korkeus.</strong> Korkea talo tarvitsee pidemmät telineet.
      </li>
      <li>
        <strong>Tiilien kunto.</strong> Jos tiiliä on paljon rikki, niiden vaihtamiseen menee aikaa.
      </li>
    </ul>

    <h2>Mitä pinnoituksen hintaan kuuluu?</h2>
    <p>Hintaan kuuluu koko työ alusta loppuun. Ylimääräisiä kuluja ei tule.</p>
    <ol>
      <li>Suunnittelu ja tarvittavat suojaustyöt</li>
      <li>Katon pesu</li>
      <li>Kasvustontorjunta-aine</li>
      <li>Rikkinäisten tiilien vaihto</li>
      <li>Pohjamaali</li>
      <li>Pintamaali</li>
      <li>Siivous</li>
    </ol>
    <p>
      Ennen tarjousta tarkistamme tiilet, aluskatteen ja läpiviennit. Katto maalataan ruiskulla kahteen kertaan.
      Käytämme Tikkurilan ja Nowocoatin kattomaaleja. Saat työlle 5 vuoden kirjallisen takuun. Työvaiheet näet
      sivulta <Link to="/tiilikaton-pinnoitus-pirkanmaa">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>

    <h2>Paljonko kotitalousvähennys pienentää hintaa?</h2>
    <p>
      Vuosina 2026 ja 2027 saat vähentää verotuksessa 40 % työn osuudesta. Kirjoitamme laskuun työn ja materiaalit
      erikseen, joten vähennyksen hakeminen on helppoa. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot">
        kotitalousvähennys katto- ja maalaustöissä
      </Link>
      .
    </p>

    <h2>Kannattaako pinnoitus vai uusi katto?</h2>
    <p>
      Pinnoitus on monesti selvästi edullisempi kuin kattoremontti, jos aluskate ja katon rakenteet ovat kunnossa.
      Rakenteiden vaurioita pinnoitus ei korjaa. Jos et ole varma, onko pinnoitus sinun katollesi ajankohtainen,
      lue <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto">milloin tiilikatto pitää pinnoittaa</Link>.
    </p>

    <h2>Mitä tarjouksesta kannattaa katsoa?</h2>
    <p>Kun vertaat tarjouksia, katso muutakin kuin loppusummaa. Kysy ainakin nämä:</p>
    <ul>
      <li>Onko hinta kiinteä urakkahinta vai arvio?</li>
      <li>Kuuluvatko pesu, kasvustontorjunta ja rikkinäisten tiilien vaihto hintaan?</li>
      <li>Montako kertaa katto maalataan ja millä maalilla?</li>
      <li>Onko työn osuus eritelty laskussa kotitalousvähennystä varten?</li>
      <li>Kuinka pitkä takuu on, ja saatko sen kirjallisena?</li>
    </ul>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
