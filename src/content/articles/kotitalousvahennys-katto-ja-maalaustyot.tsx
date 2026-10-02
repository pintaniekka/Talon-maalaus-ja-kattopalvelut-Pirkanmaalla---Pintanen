import { Link } from "react-router-dom";
import { ArticleFaq, KeyPoints, Note, Sources } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Saako tiilikaton pinnoituksesta kotitalousvähennyksen?",
    answer:
      "Kyllä saa. Katon pesu ja pinnoitus ovat kodin kunnossapitoa. Saat vähennyksen yritykseltä ostetun työn osuudesta. Maaleista ja muista tarvikkeista vähennystä ei saa.",
  },
  {
    question: "Saako talon ulkomaalauksesta kotitalousvähennyksen?",
    answer:
      "Kyllä saa. Talon ulkomaalaus on kodin kunnossapitoa. Vähennys lasketaan laskun työn osuudesta, ja arvonlisävero lasketaan mukaan.",
  },
  {
    question: "Saako kotitalousvähennyksen kesämökillä tehdystä työstä?",
    answer: "Kyllä saa. Kesämökillä on samat säännöt kuin kotona.",
  },
  {
    question: "Minä vuonna vähennys lasketaan, jos työ tehdään vuodenvaihteessa?",
    answer:
      "Maksupäivä ratkaisee. Vähennys kuuluu sille vuodelle, jona maksat laskun, vaikka työ olisi tehty edellisenä vuonna.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Vuosina 2026 ja 2027 saat vähentää 40 % yritykseltä ostetun työn hinnasta.</li>
        <li>Vähennystä saa enintään 2 100 euroa vuodessa. Pariskunta saa yhteensä 4 200 euroa.</li>
        <li>Omavastuu on 150 euroa vuodessa.</li>
        <li>Vähennyksen saa työstä. Maaleista ja matkakuluista sitä ei saa.</li>
      </ul>
    </KeyPoints>

    <p>
      Kun ostat tiilikaton pinnoituksen tai talon maalauksen yritykseltä, saat osan työn hinnasta takaisin
      verotuksessa. Tämä on kotitalousvähennys. Kerromme tässä, paljonko vähennys on vuonna 2027, mistä töistä sen
      saa ja miten sitä haetaan.
    </p>

    <h2>Paljonko kotitalousvähennys on vuonna 2027?</h2>
    <p>
      Saat vähentää <strong>40 % työn hinnasta</strong>. Työn hintaan lasketaan mukaan arvonlisävero. Vähennystä
      saa enintään <strong>2 100 euroa vuodessa</strong> yhdeltä ihmiseltä. Omavastuu on 150 euroa vuodessa.
    </p>
    <p>Vuonna 2025 vähennys oli 35 % ja enintään 1 600 euroa. Nyt saat siis selvästi enemmän takaisin.</p>
    <Note title="Korotus on voimassa määräajan">
      <p>
        Korotus perustuu hallituksen esitykseen. Se koskee laskuja, jotka on maksettu 1.1.2026 alkaen.
        Verohallinto kertoi kesäkuussa 2026, että muutos vaatii vielä eduskunnan hyväksynnän. Tarkista tuoreet
        luvut{" "}
        <a href="https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara" target="_blank" rel="noopener noreferrer">
          Verohallinnon sivulta
        </a>
        .
      </p>
    </Note>

    <h2>Milloin saat täyden vähennyksen?</h2>
    <p>
      Saat täydet 2 100 euroa, kun maksat vuoden aikana työstä 5 625 euroa. Vähennys on jokaisen oma. Pariskunta
      voi siis saada yhteensä 4 200 euroa.
    </p>
    <p>
      Jos laskun työn osuus on yli 6 000 euroa, pariskunnan kannattaa maksaa lasku puoliksi. Silloin kumpikin
      saa oman vähennyksensä, ja saatte yhdessä enemmän takaisin.
    </p>

    <h2>Saako tiilikaton pinnoituksesta ja talon maalauksesta kotitalousvähennyksen?</h2>
    <p>
      Kyllä saa. Vähennyksen saa, kun työ on kodin kunnossapitoa tai perusparannusta. Katon pesu, katon pinnoitus
      ja talon ulkomaalaus ovat juuri tällaisia töitä. Samat säännöt koskevat kesämökkiä.
    </p>
    <p>Näistä vähennystä ei saa:</p>
    <ul>
      <li>maalit, pinnoitteet ja muut tarvikkeet</li>
      <li>matka- ja kuljetuskulut</li>
      <li>uuden talon rakentaminen</li>
      <li>työt, jotka kuuluvat taloyhtiön vastuulle</li>
    </ul>
    <p>
      Yrityksen pitää kuulua ennakkoperintärekisteriin. Voit tarkistaa sen ilmaiseksi osoitteesta ytj.fi. Pintanen
      kuuluu rekisteriin. Kirjoitamme laskuun työn ja materiaalit erikseen, joten vähennyksen hakeminen on helppoa.
    </p>

    <h2>Maksupäivä ratkaisee vuoden</h2>
    <p>
      Vähennys kuuluu sille vuodelle, jona maksat laskun. Jos olet jo käyttänyt tämän vuoden vähennyksen,
      tammikuussa maksettu lasku menee ensi vuoden vähennykseen. Isossa urakassa maksut voi jakaa kahdelle
      vuodelle. Silloin vähennystä voi saada enemmän.
    </p>

    <h2>Miten kotitalousvähennystä haetaan?</h2>
    <ol>
      <li>Säilytä lasku ja kuitti maksusta. Niitä ei lähetetä Verohallinnolle, mutta ne pitää näyttää, jos niitä pyydetään.</li>
      <li>
        Ilmoita vähennys OmaVerossa. Jos ilmoitat sen verokortille, veroprosenttisi pienenee heti. Jos ilmoitat
        sen veroilmoituksessa, se otetaan huomioon, kun verotuksesi valmistuu.
      </li>
      <li>Kirjoita ilmoitukseen yrityksen nimi, Y-tunnus ja maksamasi työn osuus.</li>
    </ol>

    <h2>Paljonko tiilikaton pinnoitus maksaa kotitalousvähennyksen jälkeen?</h2>
    <p>
      Meillä tiilikaton pinnoitus maksaa kotitalousvähennyksen jälkeen alkaen 2 050 euroa. Katso lisää sivuilta{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa">tiilikaton pinnoituksen hinta</Link> ja{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa">talon maalauksen hinta</Link>.
    </p>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Verohallinto: Kotitalousvähennyksen määrä",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara",
        },
        {
          label: "Verohallinto: Mistä töistä vähennyksen saa",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/mista-toista-vahennyksen-saa/",
        },
        {
          label: "Verohallinto: Kotitalousvähennykseen ehdotetaan korotusta (16.6.2026)",
          url: "https://www.vero.fi/tietoa-verohallinnosta/uutishuone/lehdist%C3%B6tiedotteet/2026/kotitalousvahennykseen-ehdotetaan-korotusta-matkakulujen-omavastuu-pienenee/",
        },
      ]}
    />
  </>
);

export default Body;
