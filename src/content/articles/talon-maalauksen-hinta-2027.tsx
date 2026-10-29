import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Hinnat vain sivuston omista lähteistä: prices.ts (yleinen haarukka 3 500–11 000 €, hintakortit 1-krs 3 500–5 000 € / 2–4 pv,
 * 1,5-krs 5 000–7 000 € / 3–5 pv, 2-krs 7 000–11 000 € / 4–8 pv, includes), faqData.ts (hinta riippuu koosta, korkeudesta ja
 * pohjatöistä; katto ja seinät samalla kertaa = edullisempi pakettihinta), kotitalousvähennys vero.fi (40 %, 2 100 €).
 * Ei neliöhintoja, ei laskuesimerkkejä, ei materiaalien osuutta.
 */
const faq = [
  {
    question: "Paljonko talon ulkomaalaus maksaa vuonna 2027?",
    answer:
      "Omakotitalon maalaus maksaa meillä yleensä 3 500–11 000 euroa. Yleisin talon koko, puolitoistakerroksinen, maksaa yleensä 5 000–7 000 euroa.",
  },
  {
    question: "Mitä hintaan kuuluu?",
    answer:
      "Homepesu, irtoavan maalin kaavinta, terassien ja ympäristön suojaus, pohjamaali paljaisiin kohtiin, pintamaali pensselillä, työmaan siivous ja 2 vuoden kirjallinen takuu. Myös maalit, telineet ja nostimet.",
  },
  {
    question: "Saako maalauksesta kotitalousvähennyksen?",
    answer: "Kyllä. Vuonna 2027 saat vähentää 40 % työn osuudesta, enintään 2 100 euroa henkilöltä.",
  },
  {
    question: "Onko katto ja seinät samalla kertaa halvempi?",
    answer: "Kyllä. Jos teemme samalla kertaa myös katon, saat edullisemman pakettihinnan. Kerro siitä tarjouspyynnössä.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Omakotitalon ulkomaalaus maksaa Pirkanmaalla yleensä 3 500–11 000 euroa.</li>
        <li>Puolitoistakerroksinen talo maksaa yleensä 5 000–7 000 euroa ja valmistuu 3–5 työpäivässä.</li>
        <li>Hintaan kuuluu homepesu, kaavinta, suojaus, pohjamaali, pintamaali pensselillä ja siivous.</li>
        <li>Kotitalousvähennys on 40 % työn osuudesta, enintään 2 100 euroa henkilöltä.</li>
      </ul>
    </KeyPoints>

    <p>
      Hinta on ensimmäinen kysymys, ja vastaamme siihen tässä samalla tavalla kuin puhelimessa: haarukka,
      esimerkit talon koon mukaan ja syyt, jotka siirtävät hintaa haarukan sisällä. Luvut ovat vuoden 2027 kauden
      hintoja.
    </p>

    <h2>Paljonko talon maalaus maksaa Pirkanmaalla?</h2>
    <p>
      Omakotitalon ulkomaalaus maksaa meillä yleensä 3 500–11 000 euroa. Talon koko ja korkeus ratkaisevat
      eniten. Yläpää on kaksikerroksisille taloille, joissa on paljon kaavittavaa.
    </p>
    <Table
      head={["Talon koko", "Hinta yleensä", "Kesto"]}
      rows={[
        ["1-kerroksinen omakotitalo", "3 500 – 5 000 €", "2–4 työpäivää"],
        ["1,5-kerroksinen talo", "5 000 – 7 000 €", "3–5 työpäivää"],
        ["2-kerroksinen talo", "7 000 – 11 000 €", "4–8 työpäivää"],
      ]}
      caption="Hintaesimerkit omakotitalon ulkomaalaukselle vuonna 2027. Hinta sisältää työn, maalit, telineet ja siivouksen."
    />
    <Avainhuomio>Yleisimmän talon koon maalaus maksaa yleensä 5 000–7 000 euroa ja valmistuu 3–5 päivässä.</Avainhuomio>

    <h2>Mitä maalauksen hintaan kuuluu?</h2>
    <ul>
      <li>Homepesu harjoilla ja huuhtelu</li>
      <li>Irtoavan maalin kaavinta</li>
      <li>Terassien, ikkunoiden ja ympäristön suojaus</li>
      <li>Pohjamaali paljaisiin puukohtiin</li>
      <li>Pintamaali pensselillä, pääsääntöisesti Tikkurila</li>
      <li>Telineet ja nostimet</li>
      <li>Työmaan siivous ja 2 vuoden kirjallinen takuu</li>
    </ul>
    <p>Ilmainen arviokäynti ja kirjallinen tarjous kiinteällä hinnalla kuuluvat myös hintaan. Piilokuluja ei tule.</p>
    <Avainhuomio>Hinta sisältää pohjatyöt, maalit, telineet ja takuun, joten lisälaskuja ei tule.</Avainhuomio>

    <h2>Mikä nostaa tai laskee hintaa?</h2>
    <ol>
      <li>Talon koko. Seinäneliöt ovat suurin yksittäinen tekijä.</li>
      <li>Korkeus. Kaksikerroksinen talo vaatii telineet ja nostimen, ja työ on hitaampaa.</li>
      <li>Pohjatöiden määrä. Paljon hilseilevää maalia tarkoittaa paljon kaavintaa.</li>
      <li>Yksityiskohdat. Ikkunanpielet, rimat, parvekkeet ja koristelaudat maalataan käsin.</li>
      <li>Katto samalla kertaa. Silloin saat edullisemman pakettihinnan.</li>
    </ol>
    <Figure
      image="talon-maalaus-tampere-puutalon-seinien-maalaus-kaynnissa"
      alt="Puutalon maalaus käynnissä Tampereella"
      caption="Talon maalaus käynnissä Tampereella 2026. Telineet ja nostin kuuluvat hintaan."
    />
    <Avainhuomio>Koko, korkeus ja pohjatöiden määrä siirtävät hintaa haarukan sisällä, ja katto samalla kertaa laskee sitä.</Avainhuomio>

    <h2>Paljonko maalaus maksaa kotitalousvähennyksen jälkeen?</h2>
    <p>
      Vuonna 2027 saat vähentää verotuksessa 40 % työn osuudesta. Vähennystä saa enintään 2 100 euroa henkilöltä,
      ja omavastuu on 150 euroa. Pariskunta saa kumpikin oman vähennyksensä. Kirjoitamme laskuun työn osuuden
      erikseen. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/">kotitalousvähennys katto- ja maalaustöissä</Link>.
    </p>
    <Avainhuomio>Vähennys on 40 % työn osuudesta ja enintään 2 100 euroa henkilöltä vuonna 2027.</Avainhuomio>

    <h2>Miten saat tarkan hinnan omalle talollesi?</h2>
    <p>
      Suuntaa antavan arvion saat heti <Link to="/hintalaskuri/?palvelu=maalaus">hintalaskurilla</Link>. Tarkan
      hinnan saat ilmaisesta arviokäynnistä. Eemil tulee katsomaan talon Pirkanmaalla ja lähikunnissa yleensä
      samalla viikolla, tarvittaessa myös iltaisin tai viikonloppuisin. Hän katsoo, mitä maalia seinässä on ja paljonko
      pohjatöitä tarvitaan. Saat kirjallisen tarjouksen, jossa on kiinteä hinta. Hintaesimerkit ovat sivulla{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</Link>.
    </p>
    <Avainhuomio>Arviokäynti on ilmainen, ja tarjouksen kiinteä hinta pitää, vaikka sade siirtäisi päivää.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
