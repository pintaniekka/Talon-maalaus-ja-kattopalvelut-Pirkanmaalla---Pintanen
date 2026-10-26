import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: projects.ts ja kuvat (värinvaihto violetti, harmaa, keltainen, punainen), faqData.ts
 * (maalit kirjataan tarjoukseen, pääsääntöisesti Tikkurila, arviokäynnillä katsotaan seinä), tyovaiheet.ts. Yleiset: peittävä
 * maali peittää vanhan värin (Teknos-opas 26.10.2026: peittosuoja antaa peittävän värin). Kuntien lupasäännöistä vain yleinen
 * kehotus kysyä rakennusvalvonnasta (paketti C tarkentaa kuntakohtaisesti). Eerikin kanta värin valintaan (K7) puuttuu.
 */
const faq = [
  {
    question: "Voiko talon värin vaihtaa huoltomaalauksessa?",
    answer: "Voi. Peittävä maali peittää vanhan värin. Värin vaihto ei muuta työvaiheita: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä.",
  },
  {
    question: "Onko tumman talon maalaaminen vaaleaksi vaikeampaa?",
    answer: "Vaalea maali peittää tumman pohjan heikommin kuin tumma vaalean. Arviokäynnillä katsomme, riittääkö peittävyys, ja kirjaamme sen tarjoukseen.",
  },
  {
    question: "Tarvitsenko luvan värin vaihtoon?",
    answer: "Monessa kunnassa julkisivun värin vaihto voi vaatia ilmoituksen tai luvan. Kysy oman kuntasi rakennusvalvonnasta ennen päätöstä.",
  },
  {
    question: "Milloin väri päätetään?",
    answer: "Viimeistään arviokäynnillä, koska maali ja väri kirjataan tarjoukseen. Värikartat ovat Tikkurilan sivuilla ja rautakaupoissa.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Talon värin voi vaihtaa huoltomaalauksessa. Peittävä maali peittää vanhan värin.</li>
        <li>Työvaiheet ovat samat kuin muussa maalauksessa. Peittävyys katsotaan arviokäynnillä.</li>
        <li>Väri ja maali kirjataan tarjoukseen, pääsääntöisesti Tikkurila.</li>
        <li>Kysy kuntasi rakennusvalvonnasta, tarvitaanko värin vaihtoon ilmoitus.</li>
      </ul>
    </KeyPoints>

    <p>
      Huoltomaalaus on hetki, jolloin talon ilmeen voi muuttaa. Kuvissamme on taloja, joiden väri vaihtui
      huoltomaalauksessa. Kerromme tässä, miten värin vaihto etenee ja mitä kannattaa
      päättää ennen arviokäyntiä.
    </p>

    <h2>Miten värin vaihto eroaa tavallisesta maalauksesta?</h2>
    <p>
      Ei juuri mitenkään. Pohjatyöt ovat samat: homepesu harjoilla, kaavinta ja pohjamaali paljaisiin
      puukohtiin. Pintamaali vedetään pensselillä kuten aina. Ero on peittävyydessä: vaalea maali peittää tumman
      pohjan heikommin kuin tumma vaalean. Arviokäynnillä Eemil katsoo vanhan värin ja kirjaa tarjoukseen, mitä
      tarvitaan. Työvaiheet kerromme artikkelissa{" "}
      <Link to="/artikkelit/talon-maalaus-tilauksesta-valmiiseen/">talon maalaus tilauksesta valmiiseen</Link>.
    </p>
    <Figure
      image="talon-maalaus-violetti-puutalo-varinvaihto-peittomaalaus-jalkeen"
      alt="Violetti puutalo värinvaihdon ja peittomaalauksen jälkeen"
      caption="Puutalo värinvaihdon jälkeen. Uusi väri on violetti, ja peittävä maali peitti vanhan."
    />
    <Avainhuomio>Värin vaihto tehdään samoilla työvaiheilla, ja peittävyys katsotaan arviokäynnillä.</Avainhuomio>

    <h2>Mitä kannattaa päättää ennen arviokäyntiä?</h2>
    <Table
      head={["Päätös", "Miksi", "Vinkki"]}
      rows={[
        ["Seinän väri", "Kirjataan tarjoukseen", "Katso värikartat ja naapuruston talot"],
        ["Listojen ja pielien väri", "Maalataan erikseen pensselillä", "Vaalea lista tummassa seinässä on yleinen valinta"],
        ["Katon väri", "Jos katto pinnoitetaan samalla", "Katso, että katto ja seinä sopivat yhteen"],
        ["Kunnan vaatimukset", "Värin vaihto voi vaatia ilmoituksen", "Soita rakennusvalvontaan"],
      ]}
      caption="Neljä päätöstä ennen arviokäyntiä. Lopullinen väri kirjataan tarjoukseen."
    />
    <Avainhuomio>Seinän, listojen ja katon värit kannattaa päättää yhdessä, ja ne kirjataan tarjoukseen.</Avainhuomio>

    <h2>Tarvitaanko värin vaihtoon lupa?</h2>
    <p>
      Julkisivun väri on osa kaupunkikuvaa, ja monessa kunnassa värin vaihto voi vaatia ilmoituksen tai luvan.
      Säännöt ovat kuntakohtaisia, ja asemakaava-alueella tai suojellussa ympäristössä ne ovat tiukemmat. Kysy
      oman kuntasi rakennusvalvonnasta ennen kuin päätät värin. Jos pidät saman värin, ilmoitusta ei yleensä
      tarvita, mutta sekin kannattaa varmistaa.
    </p>
    <Avainhuomio>Värin vaihto voi vaatia ilmoituksen rakennusvalvontaan, joten kysy kunnasta ennen päätöstä.</Avainhuomio>

    <h2>Miltä vaihdettu väri näyttää?</h2>
    <Figure
      image="talon-maalaus-harmaa-omakotitalo-varinvaihto-jalkeen"
      alt="Harmaa omakotitalo värinvaihdon jälkeen"
      caption="Omakotitalo värinvaihdon jälkeen. Uusi väri on harmaa."
    />
    <p>
      Lisää kuvia ennen ja jälkeen on sivulla <Link to="/referenssit/">referenssit</Link>. Maalaus maksaa
      yleensä 3 500–11 000 euroa, ja hintaan kuuluu pesu, kaavinta, suojaus, pohjamaali, pintamaali ja siivous.
      Maalin valinnasta kerromme artikkelissa{" "}
      <Link to="/artikkelit/puutalon-ulkomaalin-valinta/">puutalon ulkomaalin valinta</Link>, ja palvelun
      esittelemme sivulla <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Värin vaihto kuuluu 3 500–11 000 euron maalaushintaan, kun peittävyys riittää.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
