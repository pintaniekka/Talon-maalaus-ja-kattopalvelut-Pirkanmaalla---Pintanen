import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (maalaus ajankohtainen, kun maali hilseilee), tyovaiheet.ts (kaavinta, pohjamaali
 * paljaisiin kohtiin), huoltomaalaus-artikkeli. Yleiset faktat: K-Rauta ulkomaalausohje (luettu 26.10.2026): puun kosteus
 * enintään 20 %, irtonainen vanha maali poistetaan, paljaat puupinnat pohjamaalataan, sama maalityyppi kuin ennen.
 * Tikkurila (docs/sisallon-lahteet): ei maalata alle 5 °C eikä yli 30 °C, kosteus alle 80 %. Tikkurila Homeenpoisto: pesu
 * ennen maalausta. Lautoja ei vaihdeta eikä lahoa korjata: ei väitetä kumpaakaan.
 */
const faq = [
  {
    question: "Miksi maali hilseilee puutalon seinästä?",
    answer:
      "Yleisimmät syyt ovat kosteus puun alla, maalaus märkään tai likaiseen pintaan, väärä maalityyppi vanhan päällä ja liian monta paksua kerrosta. Myös aurinko haurastuttaa maalin vuosien mittaan.",
  },
  {
    question: "Voiko hilseilevän maalin päälle maalata?",
    answer: "Ei. Uusi maali irtoaa vanhan mukana. Irtoava maali kaavitaan pois, paljaat kohdat pohjamaalataan ja sitten tulee pintamaali.",
  },
  {
    question: "Hilseileekö maali vain yhdeltä seinältä?",
    answer:
      "Usein etelä- ja länsiseinältä, joita aurinko paahtaa, tai pohjoisseinältä, joka pysyy kosteana. Yhden seinän hilseily kertoo syyn: aurinko tai kosteus.",
  },
  {
    question: "Kauanko uusi maali kestää hilseilemättä?",
    answer: "Kun pohjatyöt tehdään kunnolla ja maali valitaan vanhan mukaan, puutalo tarvitsee uuden maalin yleensä 10–15 vuoden välein. Annamme työlle 2 vuoden takuun.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Maali hilseilee, kun se ei enää tartu puuhun: kosteus, lika, väärä maali tai liian paksu kerros.</li>
        <li>Hilseilevän maalin päälle ei voi maalata. Irtoava maali kaavitaan pois.</li>
        <li>Paljaat kohdat pohjamaalataan, ja pintamaali valitaan vanhan maalin tyypin mukaan.</li>
        <li>Oikein tehty maalaus kestää yleensä 10–15 vuotta, ja takuu on 2 vuotta.</li>
      </ul>
    </KeyPoints>

    <p>
      Hilseilevä maali on yleisin syy soittaa meille. Se näyttää pahalta, mutta ennen maalausta kannattaa
      tietää, miksi maali irtoaa. Syy ratkaisee, mitä pohjatöitä tarvitaan ja mikä maali valitaan.
    </p>

    <h2>Mistä hilseily johtuu?</h2>
    <Table
      head={["Syy", "Miltä näyttää", "Mitä tehdään"]}
      rows={[
        ["Kosteus puun alla", "Maali irtoaa levyinä, puu tumma alla", "Kosteuden lähde kuntoon, seinä kuivaksi, kaavinta ja pohjamaali"],
        ["Maalattu märkään tai likaiseen pintaan", "Irtoaa laajoilta alueilta", "Homepesu, kaavinta, kuiva seinä ennen maalausta"],
        ["Väärä maalityyppi vanhan päällä", "Uusi kerros irtoaa, vanha jää", "Vanha maali tunnistetaan, sama tyyppi uudelleen"],
        ["Liian monta paksua kerrosta", "Paksu kalvo halkeilee ja lohkeilee", "Irtoava poistetaan, ohuet kerrokset"],
        ["Aurinko ja ikä", "Haalistunut, liituava, hienoa halkeilua", "Normaali huoltomaalaus"],
      ]}
      caption="Hilseilyn yleisimmät syyt ja mitä niille tehdään. Syy katsotaan arviokäynnillä."
    />
    <Avainhuomio>Hilseily johtuu lähes aina kosteudesta, liasta, väärästä maalista tai liian paksusta kalvosta.</Avainhuomio>

    <h2>Miksi kosteus on yleisin syy?</h2>
    <p>
      Maali tarttuu vain kuivaan puuhun. K-Raudan ohjeen mukaan puun kosteuden pitää olla enintään 20 prosenttia,
      kun maalataan. Jos seinä on kostea maalattaessa tai kastuu myöhemmin takaa päin, kosteus pyrkii ulos ja
      työntää maalin irti. Siksi pohjoisseinä, räystään alusta ja seinän alareuna hilseilevät ensin. Kosteuden
      lähde kannattaa katsoa ennen maalausta: vuotava kouru, pensaat seinässä tai maasta nouseva roiskevesi.
      Säästä ja kuivuudesta kerromme artikkelissa{" "}
      <Link to="/artikkelit/milloin-talon-voi-maalata-saa/">milloin talon voi maalata</Link>.
    </p>
    <Avainhuomio>Puun kosteuden pitää olla enintään 20 prosenttia, ja kostea seinä työntää maalin irti.</Avainhuomio>

    <h2>Miksi väärä maali irtoaa?</h2>
    <p>
      Vesiohenteisen maalin päälle sopii vain vesiohenteinen. Öljymaalin päälle sopii kumpi tahansa. Jos
      vanhan vesiohenteisen päälle on maalattu öljymaalia, uusi kerros irtoaa vanhasta. K-Raudan ohje on
      selvä: käytä samaa maalityyppiä kuin ennen. Arviokäynnillä tunnistamme vanhan maalin ja valitsemme
      uuden sen mukaan. Kerromme tunnistamisesta artikkelissa{" "}
      <Link to="/artikkelit/puutalon-ulkomaalin-valinta/">puutalon ulkomaalin valinta</Link>.
    </p>
    <Figure
      image="talon-maalaus-parkano-keltainen-puutalo-ennen"
      alt="Keltainen puutalo Parkanossa ennen maalausta"
      caption="Keltainen puutalo Parkanossa ennen maalausta. Hilseilevät kohdat kaavitaan."
    />
    <Avainhuomio>Vesiohenteisen päälle vain vesiohenteinen, ja väärä tyyppi irtoaa vanhasta kerroksesta.</Avainhuomio>

    <h2>Miten hilseilevä seinä maalataan?</h2>
    <ol>
      <li>Arviokäynti. Eemil katsoo syyn, vanhan maalin tyypin ja kaavittavan määrän.</li>
      <li>Homepesu harjoilla ja huuhtelu. Seinä saa kuivua.</li>
      <li>Kaavinta. Kaikki irtoava maali pois, ehjä maali jää.</li>
      <li>Pohjamaali paljaisiin puukohtiin.</li>
      <li>Pintamaali pensselillä, vanhan maalin tyypin mukaan, pääsääntöisesti Tikkurila.</li>
      <li>Lopputarkastus yhdessä ja 2 vuoden kirjallinen takuu.</li>
    </ol>
    <p>
      Maalaus maksaa yleensä 3 500–11 000 euroa, ja kaavittavan määrä on yksi hintaan vaikuttavista asioista.
      Jos hilseily on vain yhdellä seinällä, kerro se tarjouspyynnössä. Palvelun esittelemme sivulla{" "}
      <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Hilseilevä seinä maalataan kuudessa vaiheessa, ja kaavinta on niistä tärkein.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "K-Rauta: Ulkomaalausohje (luettu 26.10.2026)",
          url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/ulkomaalausohje",
        },
        {
          label: "Tikkurila: How to paint wooden façades and fences (luettu 12.10.2026)",
          url: "https://tikkurila.com/pro/how-to-paint-wooden-facades-and-fences",
        },
      ]}
    />
  </>
);

export default Body;
