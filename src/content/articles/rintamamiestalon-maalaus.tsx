import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts ("Maalaamme puuverhotut talot, rintamamiestalot ja hirsitalot", työvaiheet,
 * 3–7 päivää, hinta 3 500–11 000 €, hintakortit prices.ts: 1,5-kerroksinen 5 000–7 000 € / 3–5 päivää), takuu 2 vuotta.
 * Yleiset faktat: Imatran kaupunki, Rintamamiestalot-ohje (luettu 26.10.2026): 1940–50-lukujen talot ovat tyypillisesti
 * puolitoistakerroksisia lautaverhottuja; alkuperäisen julkisivuilmeen säilyttäminen. Laitilan kaupunki, Untamalan
 * rakentamistapaohjeet (26.10.2026): peiterimoitettu pystylaudoitus, rima peittää lautojen raon. K-Rauta ulkomaalausohje:
 * paljaat puupinnat pohjamaalataan, sama maalityyppi kuin ennen. Lautoja ei vaihdeta eikä lahoa korjata: ei väitetä kumpaakaan.
 */
const faq = [
  {
    question: "Maalaatteko rintamamiestaloja?",
    answer:
      "Kyllä. Työvaiheet ovat samat kuin muissa puutaloissa: homepesu harjoilla, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä.",
  },
  {
    question: "Mitä rintamamiestalon maalaus maksaa?",
    answer:
      "Rintamamiestalo on yleensä puolitoistakerroksinen. Sen maalaus maksaa meillä yleensä 5 000–7 000 euroa ja kestää 3–5 päivää. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.",
  },
  {
    question: "Mikä maali rintamamiestaloon sopii?",
    answer:
      "Sama maalityyppi kuin seinässä on nyt. Arviokäynnillä katsomme, onko vanha maali öljymaalia vai vesiohenteista, ja valitsemme sen mukaan. Käytämme pääsääntöisesti Tikkurilan maaleja.",
  },
  {
    question: "Maalaatteko myös peiterimat ja nurkkalaudat?",
    answer: "Kyllä. Pensselillä maali painuu riman ja laudan väliin. Nurkkalaudat, ikkunanpielet ja räystäslaudat kuuluvat työhön.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Rintamamiestalo on 1940–50-lukujen puolitoistakerroksinen puutalo, usein peiterimoitetulla pystylaudoituksella.</li>
        <li>Maalaamme sen samoilla työvaiheilla kuin muut puutalot, pensselillä.</li>
        <li>Puolitoistakerroksisen talon maalaus maksaa yleensä 5 000–7 000 euroa ja kestää 3–5 päivää.</li>
        <li>Maali valitaan vanhan maalin mukaan, pääsääntöisesti Tikkurila.</li>
      </ul>
    </KeyPoints>

    <p>
      Pirkanmaalla on tuhansia rintamamiestaloja, ja moni niistä tarvitsee uuden maalin. Vanhan talon
      maalauksessa on omat piirteensä: pystylaudoitus, peiterimat ja usein monta maalikerrosta vuosien varrelta.
      Kerromme tässä, miten maalaamme ne.
    </p>

    <h2>Millainen talo rintamamiestalo on?</h2>
    <p>
      Kuntien rakentamistapaohjeiden mukaan 1940- ja 50-lukujen rintamamiestalot ovat tyypillisesti
      puolitoistakerroksisia lautaverhottuja taloja. Verhous on usein peiterimoitettu pystylaudoitus: laudat
      ovat pystyssä, ja kapea rima peittää lautojen välisen raon. Nurkat on koteloitu leveämmillä laudoilla.
      Ohjeet suosittelevat säilyttämään alkuperäisen julkisivuilmeen, ja maalaus on siihen helpoin tapa.
    </p>
    <Avainhuomio>Rintamamiestalo on puolitoistakerroksinen puutalo, jonka pystylaudoituksen raot peittää rima.</Avainhuomio>

    <h2>Miten rintamamiestalon maalaus etenee?</h2>
    <ol>
      <li>Arviokäynti. Eemil katsoo, mitä maalia seinässä on ja paljonko pohjatöitä tarvitaan.</li>
      <li>Suojaus. Terassit, ikkunat ja istutukset suojataan.</li>
      <li>Homepesu harjoilla ja huuhtelu. Seinä saa kuivua.</li>
      <li>Kaavinta. Irtoava maali kaavitaan pois, myös rimojen takaa.</li>
      <li>Pohjamaali paljaisiin puukohtiin.</li>
      <li>Pintamaali pensselillä laudan suuntaan. Rimat ja nurkkalaudat erikseen.</li>
      <li>Lopputarkastus yhdessä ja 2 vuoden kirjallinen takuu.</li>
    </ol>
    <p>
      Pensseli on vanhassa talossa paras työkalu, koska se painaa maalin riman ja laudan väliin. Kerromme
      syyt artikkelissa <Link to="/artikkelit/ruisku-vai-pensseli-talon-maalaus/">ruisku vai pensseli</Link>.
    </p>
    <Figure
      image="talon-maalaus-hameenlinna-keltainen-omakotitalo-jalkeen"
      ratio="3/4"
      alt="Keltainen omakotitalo julkisivumaalauksen jälkeen"
      caption="Keltainen puutalo maalauksen jälkeen. Rimat ja nurkkalaudat on maalattu erikseen."
    />
    <Avainhuomio>Rintamamiestalo maalataan seitsemässä vaiheessa, ja rimat vaativat pensselin.</Avainhuomio>

    <h2>Mikä maali vanhaan puutaloon sopii?</h2>
    <p>
      Maalin valmistajien ohje on selvä: käytä samaa maalityyppiä kuin ennen. Vanhassa talossa on usein
      öljymaalia, jonka päälle sopii sekä öljymaali että vesiohenteinen. Jos seinässä on jo vesiohenteista,
      sen päälle sopii vain vesiohenteinen. Arviokäynnillä tunnistamme vanhan maalin ja kirjaamme valitun
      maalin tarjoukseen. Käytämme pääsääntöisesti Tikkurilan maaleja. Tunnistamisen kerromme artikkelissa{" "}
      <Link to="/artikkelit/puutalon-ulkomaalin-valinta/">puutalon ulkomaalin valinta</Link>.
    </p>
    <Avainhuomio>Uusi maali valitaan vanhan maalin tyypin mukaan, ja se kirjataan tarjoukseen.</Avainhuomio>

    <h2>Mitä rintamamiestalon maalaus maksaa?</h2>
    <Table
      head={["Talon koko", "Hinta yleensä", "Kesto"]}
      rows={[
        ["1-kerroksinen omakotitalo", "3 500 – 5 000 €", "2–4 työpäivää"],
        ["1,5-kerroksinen talo", "5 000 – 7 000 €", "3–5 työpäivää"],
        ["2-kerroksinen talo", "7 000 – 11 000 €", "4–7 työpäivää"],
      ]}
      caption="Hintaesimerkit talon koon mukaan. Rintamamiestalo on yleensä puolitoistakerroksinen."
    />
    <p>
      Hintaan kuuluu homepesu, kaavinta, suojaus, pohjamaali paljaisiin kohtiin, pintamaali pensselillä ja
      siivous. Työn osuudesta saat kotitalousvähennyksen. Hintaesimerkit ja laskuri ovat sivulla{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</Link>, ja palvelun esittelemme sivulla{" "}
      <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Puolitoistakerroksisen rintamamiestalon maalaus maksaa yleensä 5 000–7 000 euroa.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Imatran kaupunki: Rintamamiestalot, rakentamistapaohje (luettu 26.10.2026)",
          url: "https://www.imatra.fi/sites/default/files/atoms/files/14_08Rintamamiestalot.pdf",
        },
        {
          label: "Laitilan kaupunki: Untamalan rakentamistapaohjeet (luettu 26.10.2026)",
          url: "https://www.laitila.fi/wp-content/uploads/2024/03/Untamalan_rakentamistapaohjeet.pdf",
        },
        {
          label: "K-Rauta: Ulkomaalausohje (luettu 26.10.2026)",
          url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/ulkomaalausohje",
        },
      ]}
    />
  </>
);

export default Body;
