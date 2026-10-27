import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (omakotitalo valmistuu yleensä 3–7 päivässä; aika riippuu talon koosta ja
 * pohjatöiden määrästä; työ ei estä normaalia asumista; sateella ei maalata), prices.ts (1-krs 2–4 pv, 1,5-krs 3–5 pv, 2-krs
 * 4–8 pv), tyovaiheet.ts. Päiväkohtainen jako on esimerkki, joka seuraa työvaiheiden järjestystä.
 */
const faq = [
  {
    question: "Kuinka kauan talon maalaus kestää?",
    answer:
      "Omakotitalo valmistuu yleensä 3–7 päivässä. Yksikerroksinen talo 2–4 päivässä, puolitoistakerroksinen 3–5 ja kaksikerroksinen 4–8 päivässä.",
  },
  {
    question: "Mikä vie eniten aikaa?",
    answer: "Pohjatyöt. Homepesu, kuivuminen ja kaavinta vievät usein enemmän aikaa kuin itse maalaus.",
  },
  {
    question: "Voinko asua talossa maalauksen aikana?",
    answer: "Kyllä. Työ ei estä normaalia asumista. Ikkunat suojataan, ja ovet pysyvät käytössä.",
  },
  {
    question: "Pidentääkö sade työtä?",
    answer: "Voi pidentää. Sateella ei maalata, ja seinän pitää kuivua. Siirretystä päivästä ei tule lisäkuluja.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Omakotitalon maalaus kestää yleensä 3–7 päivää.</li>
        <li>Pohjatyöt vievät usein enemmän aikaa kuin maalaus.</li>
        <li>Talon koko, korkeus ja kaavittavan maalin määrä ratkaisevat keston.</li>
        <li>Työ ei estä asumista, ja sade siirtää päivää ilman lisäkuluja.</li>
      </ul>
    </KeyPoints>

    <p>
      Kesto on hinnan jälkeen yleisin kysymys. Vastaus on 3–7 päivää, mutta se ei kerro, mitä päivinä
      tapahtuu. Kerromme tässä, miten viikko kuluu tavallisessa puolitoistakerroksisessa talossa.
    </p>

    <h2>Kuinka kauan eri kokoisten talojen maalaus kestää?</h2>
    <Table
      head={["Talon koko", "Kesto yleensä", "Hinta yleensä"]}
      rows={[
        ["1-kerroksinen omakotitalo", "2–4 työpäivää", "3 500 – 5 000 €"],
        ["1,5-kerroksinen talo", "3–5 työpäivää", "5 000 – 7 000 €"],
        ["2-kerroksinen talo", "4–8 työpäivää", "7 000 – 11 000 €"],
      ]}
      caption="Kesto ja hinta talon koon mukaan. Pohjatöiden määrä siirtää molempia."
    />
    <Avainhuomio>Puolitoistakerroksinen talo valmistuu yleensä 3–5 päivässä.</Avainhuomio>

    <h2>Mitä maalausviikon aikana tapahtuu?</h2>
    <p>Esimerkki puolitoistakerroksisesta talosta, jossa on jonkin verran kaavittavaa:</p>
    <ol>
      <li>Päivä 1: suojaukset ja homepesu harjoilla. Seinä huuhdellaan ja jää kuivumaan.</li>
      <li>Päivä 2: kaavinta ja harjaus. Pohjamaali paljaisiin puukohtiin.</li>
      <li>Päivä 3–4: pintamaali pensselillä lape kerrallaan. Rimat, nurkat ja pielet erikseen.</li>
      <li>Päivä 5: viimeistely, suojausten poisto, siivous ja lopputarkastus yhdessä.</li>
    </ol>
    <p>
      Pohjatyöt ja kuivuminen vievät siis lähes puolet ajasta. Siksi kesto riippuu enemmän seinän kunnosta kuin
      maalin määrästä. Pohjatöistä kerromme artikkelissa{" "}
      <Link to="/artikkelit/miksi-vanha-maali-kaavitaan/">kaavinta ja homepesu</Link>.
    </p>
    <Figure
      image="talon-maalaus-tummansininen-puutalo-ulkomaalaus-jalkeen"
      ratio="3/4"
      alt="Tummansininen puutalo ulkomaalauksen jälkeen"
      caption="Tummansininen puutalo maalauksen jälkeen."
    />
    <Avainhuomio>Pohjatyöt ja kuivuminen vievät lähes puolet maalausviikosta.</Avainhuomio>

    <h2>Mikä pidentää tai lyhentää työtä?</h2>
    <ul>
      <li>Talon korkeus. Kaksikerroksinen talo vaatii telineet ja nostimen, ja siirrot vievät aikaa.</li>
      <li>Kaavittavan maalin määrä. Hilseilevä seinä kaavitaan huolellisesti.</li>
      <li>Yksityiskohdat. Koristelaudat, rimat ja monet ikkunat maalataan käsin.</li>
      <li>Sää. Sateella ei maalata, ja seinän pitää kuivua. Siirretystä päivästä ei tule lisäkuluja.</li>
      <li>Värin vaihto. Tumman maalaaminen vaaleaksi voi vaatia enemmän peittävyyttä, ja se katsotaan arviokäynnillä.</li>
    </ul>
    <Avainhuomio>Korkeus, kaavinta ja sää ovat kolme asiaa, jotka siirtävät kestoa eniten.</Avainhuomio>

    <h2>Miten asuminen sujuu maalauksen aikana?</h2>
    <p>
      Työ ei estä normaalia asumista. Suojaamme ikkunat, terassit ja istutukset, ja ovet pysyvät käytössä.
      Tarvitsemme vesipisteen ja sähköä. Kevyet pihakalusteet kannattaa siirtää kauemmas seinästä. Työn
      päätteeksi siivoamme jälkemme. Hinta on yleensä 3 500–11 000 euroa, ja palvelun esittelemme sivulla{" "}
      <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>. Tilauksen kulun kerromme artikkelissa{" "}
      <Link to="/artikkelit/tarjouksen-hyvaksymisen-jalkeen/">mitä tarjouksen hyväksymisen jälkeen tapahtuu</Link>.
    </p>
    <Avainhuomio>Asuminen jatkuu normaalisti, ja sinulta tarvitaan vain vesi ja sähkö.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
