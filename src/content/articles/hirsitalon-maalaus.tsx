import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts ("Maalaamme puuverhotut talot, rintamamiestalot ja hirsitalot", työvaiheet
 * samat, arviokäynnillä katsotaan mitä seinä tarvitsee), CLAUDE.md (hirsitalot maalataan, Eerik 26.10.2026), maali
 * pääsääntöisesti Tikkurila, takuu 2 vuotta, hinta 3 500–11 000 €. Yleiset faktat: Teknos, Maalausopas hirsitalon
 * ulkopintojen käsittelyyn (luettu 26.10.2026): "Hirsipinnan käsittelyyn suositellaan talomaalin sijasta kuullotetta tai
 * peittosuojaa", "Massiivihirren kosteusvaihtelu on huomattavasti suurempi kuin puupaneelin", sävytetty kuullote suojaa
 * UV-säteilyltä, väritöntä kuullotetta ei suositella, huoltomaalaus: irtoava maali teräsharjalla ja kaapimella, pesu.
 */
const faq = [
  {
    question: "Maalaatteko hirsitaloja?",
    answer:
      "Kyllä. Työvaiheet ovat samat kuin muissa puutaloissa: homepesu harjoilla, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Arviokäynnillä katsomme, mitä juuri sinun seinäsi tarvitsee.",
  },
  {
    question: "Mikä maali hirsitaloon sopii?",
    answer:
      "Maalin valmistajat suosittelevat hirsipinnalle kuullotetta tai peittosuojaa talomaalin sijasta, koska hirsi elää kosteuden mukana enemmän kuin lauta. Valitsemme tuotteen vanhan pinnan mukaan ja kirjaamme sen tarjoukseen.",
  },
  {
    question: "Voiko hirsitalon maalata peittävällä värillä?",
    answer:
      "Voi. Peittosuoja antaa peittävän värin, mutta muodostaa ohuemman ja hengittävämmän kalvon kuin talomaali. Jos seinässä on jo peittävä maali, jatkamme samalla tyypillä.",
  },
  {
    question: "Mitä hirsitalon maalaus maksaa?",
    answer:
      "Omakotitalon maalaus maksaa meillä yleensä 3 500–11 000 euroa. Hinta riippuu talon koosta, korkeudesta ja pohjatöiden määrästä. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Maalaamme hirsitalot samoilla työvaiheilla kuin muut puutalot, pensselillä.</li>
        <li>Hirsi elää kosteuden mukana enemmän kuin lauta, joten pinnalle suositellaan kuullotetta tai peittosuojaa.</li>
        <li>Sävytetty kuullote suojaa auringolta. Väritöntä ei suositella.</li>
        <li>Hinta on yleensä 3 500–11 000 euroa, ja takuu on 2 vuotta.</li>
      </ul>
    </KeyPoints>

    <p>
      Hirsitalo on puutalo, mutta sen seinä käyttäytyy eri tavalla kuin lautaverhous. Paksu hirsi imee ja
      luovuttaa kosteutta hitaasti ja paljon. Kerromme tässä, mitä se tarkoittaa maalin valinnassa ja miten
      maalaamme hirsiseinän.
    </p>

    <h2>Miksi hirsiseinä on erilainen maalattava?</h2>
    <p>
      Teknoksen maalausoppaan mukaan massiivihirren kosteusvaihtelu on huomattavasti suurempi kuin puupaneelin.
      Hirsi turpoaa syksyllä ja kutistuu kesällä, ja halkeamat avautuvat ja sulkeutuvat. Siksi hirren pintaan
      suositellaan ohuempaa ja hengittävämpää käsittelyä kuin tavallista talomaalia: kuullotetta tai
      peittosuojaa. Paksu maalikalvo ei jousta hirren mukana ja voi halkeilla.
    </p>
    <Avainhuomio>Hirsi elää kosteuden mukana enemmän kuin lauta, joten pinnan pitää hengittää.</Avainhuomio>

    <h2>Kuullote vai peittosuoja hirsitaloon?</h2>
    <p>
      Sävytetty kuullote jättää puun syyt näkyviin ja antaa värin. Oppaan mukaan kuullotteen pigmentit suojaavat
      hirttä auringon UV-säteilyltä ja estävät harmaantumisen, joten väritöntä kuullotetta ei suositella. Peittosuoja
      antaa peittävän värin ja tehokkaan suojan, mutta muodostaa ohuemman kalvon kuin talomaali. Jos seinässä on
      jo peittävä pinta, huoltomaalaus jatkuu samalla tyypillä. Jos kuullotettua seinää on vuosien varrella
      käsitelty eri sävyillä, pinta voi olla kirjava, ja silloin peittosuoja tasoittaa sen. Valinnan kerromme
      tarkemmin artikkelissa{" "}
      <Link to="/artikkelit/kuullote-vai-peittava-maali/">kuullote vai peittävä maali</Link>.
    </p>
    <Avainhuomio>Sävytetty kuullote suojaa UV-säteilyltä, ja kirjava kuullotepinta tasoittuu peittosuojalla.</Avainhuomio>

    <h2>Miten hirsitalon huoltomaalaus etenee?</h2>
    <ol>
      <li>Arviokäynti. Katsomme, mitä seinässä on nyt ja paljonko pohjatöitä tarvitaan.</li>
      <li>Suojaus. Terassit, ikkunat ja istutukset suojataan.</li>
      <li>Homepesu harjoilla ja huolellinen huuhtelu. Seinä saa kuivua.</li>
      <li>Kaavinta. Irtoava vanha pinta kaavitaan ja harjataan pois.</li>
      <li>Pohjamaali paljaisiin kohtiin, erityisesti hirsien päihin ja halkeamiin.</li>
      <li>Pintakäsittely pensselillä hirren suuntaan.</li>
      <li>Lopputarkastus yhdessä ja 2 vuoden kirjallinen takuu.</li>
    </ol>
    <p>
      Pensseli painaa käsittelyn hirren halkeamiin ja saumoihin, mihin ruisku ei yllä. Käytämme pääsääntöisesti
      Tikkurilan tuotteita, ja valittu tuote kirjataan tarjoukseen.
    </p>
    <Figure
      image="talon-maalaus-vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen"
      alt="Vaalea kartanomainen puutalo ulkomaalauksen jälkeen"
      caption="Vaalea puutalo ulkomaalauksen jälkeen. Hirsiseinässä työvaiheet ovat samat."
    />
    <Avainhuomio>Hirsitalo maalataan seitsemässä vaiheessa, ja hirsien päät saavat pohjamaalin ensimmäisenä.</Avainhuomio>

    <h2>Mitä hirsitalon maalaus maksaa ja kauanko se kestää?</h2>
    <p>
      Omakotitalon maalaus maksaa meillä yleensä 3 500–11 000 euroa ja kestää 3–7 päivää. Hinta riippuu talon
      koosta, korkeudesta ja pohjatöiden määrästä. Hintaan kuuluu pesu, kaavinta, suojaus, pohjamaali, pintakäsittely
      ja siivous. Työn osuudesta saat kotitalousvähennyksen. Hintaesimerkit ovat sivulla{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</Link>, ja palvelun esittelemme sivulla{" "}
      <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Hirsitalon maalaus maksaa yleensä 3 500–11 000 euroa ja valmistuu 3–7 päivässä.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Teknos: Maalausopas hirsitalon ulkopintojen käsittelyyn (luettu 26.10.2026)",
          url: "https://www.teknos.com/globalassets/consumers/brochures/teknos_brochure_hirsitalot_web_01_2021.pdf",
        },
      ]}
    />
  </>
);

export default Body;
