import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, KeyPoints, Note, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Luvut tarkistettu vero.fi:stä 26.10.2026 (kotitalousvähennyksen määrä: 40 %, enintään 2 100 €, omavastuu 150 €,
 * samat vuosina 2026 ja 2027). Yrityksen faktat sivuston omia: hinnat prices.ts, kesto ja takuu tyovaiheet.ts.
 */
const faq = [
  {
    question: "Saako tiilikaton pinnoituksesta kotitalousvähennyksen vuonna 2027?",
    answer:
      "Kyllä. Katon pesu ja pinnoitus on omakotitalon kunnossapitoa. Saat vähentää 40 % työn osuudesta, enintään 2 100 euroa vuodessa.",
  },
  {
    question: "Saako talon ulkomaalauksesta kotitalousvähennyksen?",
    answer:
      "Kyllä. Verohallinnon listassa omakotitalon ulkokunnostus maalaamalla on vähennykseen oikeuttavaa työtä. Vähennys lasketaan työn osuudesta, ja arvonlisävero lasketaan mukaan.",
  },
  {
    question: "Saako vähennyksen mökillä tehdystä maalauksesta?",
    answer: "Kyllä. Vapaa-ajan asunnon kunnossapitotyöstä saa vähennyksen samoilla säännöillä kuin kotona tehdystä.",
  },
  {
    question: "Näkyykö työn osuus laskussa?",
    answer:
      "Kyllä. Kirjoitamme laskuun työn ja materiaalit erikseen. Tarvitset vain sen luvun, kun ilmoitat vähennyksen OmaVerossa.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Vuonna 2027 saat vähentää 40 % työn osuudesta. Enimmäismäärä on 2 100 euroa vuodessa henkilöä kohden.</li>
        <li>Omavastuu on 150 euroa vuodessa. Luvut ovat samat kuin vuonna 2026.</li>
        <li>Tiilikaton pinnoitus ja talon ulkomaalaus ovat molemmat vähennykseen oikeuttavaa kunnossapitoa.</li>
        <li>Vähennys kuuluu sille vuodelle, jona maksat laskun. Pariskunta saa kumpikin oman vähennyksensä.</li>
      </ul>
    </KeyPoints>

    <p>
      Kotitalousvähennys on helpoin tapa saada katon pinnoituksesta tai talon maalauksesta rahaa takaisin. Moni
      asiakkaamme kysyy, paljonko vähennys on ensi vuonna ja miten se haetaan. Kerromme tässä vuoden 2027 luvut ja
      sen, mitä meidän laskustamme pitää katsoa.
    </p>

    <h2>Paljonko kotitalousvähennys on vuonna 2027?</h2>
    <p>
      Verohallinnon mukaan vähennyksen määrä ja omavastuu ovat samat vuosina 2026 ja 2027. Saat vähentää 40 % työn
      osuudesta. Vähennystä saa enintään 2 100 euroa henkilöltä vuodessa, ja omavastuu on 150 euroa.
    </p>
    <Table
      head={["", "2027"]}
      rows={[
        ["Vähennys työn osuudesta", "40 %"],
        ["Enimmäismäärä henkilöltä", "2 100 € vuodessa"],
        ["Omavastuu", "150 € vuodessa"],
        ["Pariskunta yhteensä", "4 200 € vuodessa"],
      ]}
      caption="Kotitalousvähennys 2027 yritykseltä ostetusta työstä. Lähde: Verohallinto."
    />
    <Avainhuomio>Vuonna 2027 vähennys on 40 % työn osuudesta ja enintään 2 100 euroa henkilöltä.</Avainhuomio>

    <h2>Saako katon pinnoituksesta ja talon maalauksesta vähennyksen?</h2>
    <p>
      Kyllä saa. Verohallinto listaa omakotitalon ulkokunnostuksen maalaamalla vähennykseen oikeuttavaksi työksi.
      Katon pesu ja pinnoitus on samaa kunnossapitoa. Sama koskee vapaa-ajan asuntoa, eli mökin katto ja seinät
      kuuluvat vähennyksen piiriin.
    </p>
    <p>Vähennystä ei saa näistä:</p>
    <ul>
      <li>maalit, pinnoitteet ja muut tarvikkeet</li>
      <li>matka- ja kuljetuskulut</li>
      <li>työ, jonka teet itse.</li>
    </ul>
    <p>
      Yrityksen pitää kuulua ennakkoperintärekisteriin. Pintanen kuuluu. Voit tarkistaa sen Y-tunnuksella
      3525786-9 osoitteesta ytj.fi.
    </p>
    <Avainhuomio>Vähennyksen saa vain yritykseltä ostetusta työstä, ei maaleista eikä itse tehdystä työstä.</Avainhuomio>

    <h2>Mitä laskustamme pitää katsoa?</h2>
    <p>
      Kirjoitamme laskuun työn ja materiaalit erikseen. Vähennys lasketaan työn osuudesta, ja arvonlisävero on
      siinä mukana. Tarvitset ilmoitukseen kolme asiaa: yrityksen nimen, Y-tunnuksen ja maksamasi työn osuuden.
    </p>
    <p>
      Pinnoituksessa työn osuus on iso osa hinnasta, koska pesu, tiilien vaihto ja kaksi maalikerrosta ovat
      käsityötä. Maalauksessa samoin: homepesu, kaavinta ja pensselillä maalaus ovat työtä, maali on tarvike.
    </p>
    <Avainhuomio>Laskussa on kaksi riviä, työ ja materiaalit, ja vähennys lasketaan vain työn rivistä.</Avainhuomio>

    <h2>Miten saat täyden vähennyksen?</h2>
    <p>
      Vähennys on jokaisen oma. Jos talossa asuu kaksi aikuista, kumpikin voi saada 2 100 euroa. Silloin lasku
      kannattaa maksaa kahdelta tililtä tai kahdessa osassa niin, että kumpikin maksaa oman osansa.
    </p>
    <p>
      Maksupäivä ratkaisee vuoden. Jos olet jo käyttänyt tämän vuoden vähennyksen, tammikuussa maksettu lasku
      menee vuoden 2027 vähennykseen. Katon ja seinien teettäminen samalla kertaa on edullisempaa pakettihintana,
      ja maksut voi jakaa kahdelle vuodelle.
    </p>
    <Avainhuomio>Kaksi maksajaa saa yhteensä 4 200 euroa, yksi maksaja 2 100 euroa.</Avainhuomio>

    <h2>Miten vähennys ilmoitetaan?</h2>
    <ol>
      <li>Säilytä lasku ja maksukuitti. Niitä ei lähetetä, mutta ne pitää näyttää pyydettäessä.</li>
      <li>Ilmoita vähennys OmaVerossa heti maksun jälkeen verokortille, niin veroprosenttisi pienenee saman tien.</li>
      <li>Voit ilmoittaa sen myös keväällä veroilmoituksessa. Silloin raha tulee veronpalautuksena.</li>
    </ol>
    <Note title="Tarkista luvut ennen ilmoitusta">
      <p>
        Luvut ovat Verohallinnon sivulta 26.10.2026. Jos eduskunta muuttaa vähennystä, Verohallinnon sivu päivittyy
        ensin. Katso tuoreet luvut aina{" "}
        <a
          href="https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara"
          target="_blank"
          rel="noopener noreferrer"
        >
          Verohallinnon sivulta
        </a>
        .
      </p>
    </Note>
    <Avainhuomio>Verokortille ilmoitettu vähennys näkyy palkassa samana kuukautena, veroilmoituksella vasta seuraavana vuonna.</Avainhuomio>

    <h2>Paljonko pinnoitus ja maalaus maksavat?</h2>
    <p>
      Tiilikaton pinnoitus maksaa meillä yleensä 2 850–7 000 euroa ja talon maalaus 3 500–11 000 euroa. Työn
      osuudesta saat vähennyksen. Hinta-arvion omalle katollesi tai talollesi saat{" "}
      <Link to="/hintalaskuri/">hintalaskurilla</Link>. Hintaesimerkit ovat sivuilla{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link> ja{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</Link>. Vähennyksen perusteet kerromme myös
      artikkelissa{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/">kotitalousvähennys katto- ja maalaustöissä</Link>.
    </p>
    <Avainhuomio>Pinnoitus maksaa yleensä 2 850–7 000 euroa, ja työn osuudesta saat 40 % takaisin.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Verohallinto: Kotitalousvähennyksen määrä (luettu 26.10.2026)",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara",
        },
        {
          label: "Verohallinto: Mistä töistä vähennyksen saa (luettu 26.10.2026)",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/mista-toista-vahennyksen-saa/",
        },
      ]}
    />
  </>
);

export default Body;
