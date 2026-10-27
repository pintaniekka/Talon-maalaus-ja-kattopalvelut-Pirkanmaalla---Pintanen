import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (maalaus ajankohtainen, kun maali hilseilee, väri on haalistunut tai seinässä on
 * homepilkkuja; yleensä 10–15 vuoden välein), tyovaiheet.ts (homepesu homepesuaineella ja harjoilla), mökki-artikkeli
 * (ranta ja varjo pitävät puun märkänä). Yleiset faktat: Tikkurila Homeenpoisto (luettu 26.10.2026): homeenpoistopesu
 * varmistaa, ettei uuden maalikerroksen alle jää itiökasvustoa; mekaaninen harjaus tehostaa; huuhtele.
 */
const faq = [
  {
    question: "Mitä mustat pilkut puutalon seinässä ovat?",
    answer:
      "Yleensä hometta tai levää. Ne kasvavat kohdissa, jotka pysyvät kosteina: pohjoisseinällä, varjossa, puiden alla ja räystään alla.",
  },
  {
    question: "Lähtevätkö homepilkut pesulla?",
    answer:
      "Lähtevät, jos maali on muuten ehjä. Pesemme seinän homepesuaineella ja harjoilla ja huuhtelemme. Jos maali on jo kulunut, pelkkä pesu ei riitä pitkään, vaan seinä kannattaa maalata.",
  },
  {
    question: "Voiko homepilkkujen päälle maalata?",
    answer:
      "Ei ilman pesua. Tikkurilan ohjeen mukaan homeenpoistopesu varmistaa, ettei uuden maalikerroksen alle jää itiökasvustoa. Ilman pesua pilkut kasvavat maalin läpi.",
  },
  {
    question: "Miten estän homeen palaamisen?",
    answer:
      "Pidä seinä kuivana: leikkaa pensaat irti seinästä, pidä kourut ja syöksyt kunnossa ja pese seinä, kun pilkkuja alkaa näkyä. Uusi maali hylkii vettä ja hidastaa kasvua.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Mustat pilkut puutalon seinässä ovat yleensä hometta tai levää. Ne kasvavat kosteissa kohdissa.</li>
        <li>Homepilkut ovat yksi kolmesta merkistä, että maalaus on ajankohtainen.</li>
        <li>Pesemme seinän homepesuaineella ja harjoilla ennen maalausta. Ilman pesua pilkut kasvavat maalin läpi.</li>
        <li>Pohjoisseinä, varjo ja ranta nopeuttavat kasvua.</li>
      </ul>
    </KeyPoints>

    <p>
      Mustat pilkut ilmestyvät ensin pohjoisseinälle ja räystään alle. Moni huomaa ne vasta, kun ne ovat jo
      levinneet. Kerromme tässä, mistä pilkut tulevat, milloin ne lähtevät pesulla ja milloin seinä kannattaa
      maalata.
    </p>

    <h2>Mistä homepilkut seinään tulevat?</h2>
    <p>
      Home ja levä tarvitsevat kosteutta. Puutalon seinä pysyy kosteana siellä, mihin aurinko ei pääse ja
      mistä tuuli ei kuivata: pohjoisseinällä, pensaiden takana, puiden alla ja räystään alla. Myös seinälle
      roiskuva vesi, vuotava kouru ja maasta nouseva kosteus pitävät alareunan märkänä. Kun maali vanhenee ja
      alkaa imeä vettä, kasvustolle tulee vielä paremmat olot.
    </p>
    <Table
      head={["Kohta", "Miksi home kasvaa", "Mitä voit tehdä"]}
      rows={[
        ["Pohjoisseinä", "Aurinko ei kuivata", "Pese kerran kesässä, kun pilkkuja näkyy"],
        ["Pensaiden takana", "Ilma ei liiku", "Leikkaa pensaat irti seinästä"],
        ["Räystään alla", "Roiskevesi ja varjo", "Tarkista kourut ja syöksyt"],
        ["Seinän alareuna", "Maasta nouseva kosteus ja roiskeet", "Pidä sokkelin vieri avoimena"],
        ["Ranta ja metsä", "Kostea ilma koko kesän", "Maalaa tiheämmin, tarkkaile vuosittain"],
      ]}
      caption="Kohdat, joissa homepilkut yleensä alkavat, ja mitä voit tehdä itse."
    />
    <Avainhuomio>Home kasvaa siellä, missä seinä pysyy märkänä, eli pohjoisseinällä, varjossa ja räystään alla.</Avainhuomio>

    <h2>Milloin pesu riittää ja milloin pitää maalata?</h2>
    <p>
      Jos maali on ehjä ja kiiltää vielä hieman, pesu riittää. Pilkut lähtevät homepesuaineella ja harjalla,
      ja seinä huuhdellaan. Jos maali on haalistunut, hilseilee tai imee vettä, pelkkä pesu auttaa vain
      hetken, koska kostea seinä saa uuden kasvuston nopeasti. Silloin seinä kannattaa maalata. Puutalo
      tarvitsee uuden maalin yleensä 10–15 vuoden välein. Merkit kerromme artikkelissa{" "}
      <Link to="/artikkelit/kuinka-usein-puutalo-maalataan/">kuinka usein puutalo pitää maalata</Link>.
    </p>
    <Avainhuomio>Ehjä maali pestään, kulunut maali maalataan, ja puutalo maalataan yleensä 10–15 vuoden välein.</Avainhuomio>

    <h2>Miksi homepesu tehdään aina ennen maalausta?</h2>
    <p>
      Tikkurilan ohjeen mukaan homeenpoistopesu varmistaa, ettei uuden maalikerroksen alle jää
      itiökasvustoa. Jos itiöt jäävät seinään, ne kasvavat uuden maalin läpi ja pilkut palaavat parissa
      vuodessa. Pesemme seinät homepesuaineella ja harjoilla, koska mekaaninen harjaus tehostaa pesua. Sitten
      huuhtelemme huolellisesti ja annamme seinän kuivua ennen kaavintaa ja maalausta. Pohjatöistä kerromme
      artikkelissa <Link to="/artikkelit/miksi-vanha-maali-kaavitaan/">kaavinta ja homepesu</Link>.
    </p>
    <Figure
      image="talon-maalaus-keltainen-omakotitalo-huoltomaalaus-ennen"
      ratio="3/4"
      alt="Keltainen omakotitalo ennen huoltomaalausta"
      caption="Keltainen puutalo ennen huoltomaalausta. Varjoisat kohdat ovat tummuneet ensin."
    />
    <Avainhuomio>Homepesu ennen maalausta estää itiöitä kasvamasta uuden maalin läpi.</Avainhuomio>

    <h2>Mitä homepilkkujen poisto ja maalaus maksaa?</h2>
    <p>
      Homepesu kuuluu maalauksen hintaan. Omakotitalon maalaus maksaa meillä yleensä 3 500–11 000 euroa, ja
      hintaan kuuluu homepesu, kaavinta, suojaus, pohjamaali paljaisiin kohtiin, pintamaali pensselillä ja
      siivous. Arviokäynti on ilmainen, ja Eemil katsoo samalla, riittääkö pesu vai tarvitaanko maalaus.
      Palvelun esittelemme sivulla <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Homepesu kuuluu 3 500–11 000 euron maalaushintaan, ja arviokäynti on ilmainen.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Tikkurila: Homeenpoisto, tuotesivu (luettu 26.10.2026)",
          url: "https://tikkurila.fi/kotimaalarit/tuotteet/homeenpoisto",
        },
      ]}
    />
  </>
);

export default Body;
