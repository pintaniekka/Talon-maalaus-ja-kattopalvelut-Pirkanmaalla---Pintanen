import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (valitsemme maalin vanhan maalin ja puun kunnon mukaan; maalit kirjataan
 * tarjoukseen; pääsääntöisesti Tikkurila). Yleiset faktat: Teknos, Maalausopas hirsitalon ulkopintojen käsittelyyn (luettu
 * 26.10.2026): kuullote jättää puun syykuvion näkyviin; sävytetty kuullote suojaa UV-säteilyltä ja estää harmaantumisen,
 * väritöntä ei suositella; alustan sävy vaikuttaa kuultavan käsittelyn lopputulokseen; peittosuoja antaa peittävän värin ja
 * tehokkaan suojan; kuullotteen kunnossapitoväli lyhyt (2–5 vuotta) verrattuna peittäviin maaleihin; jos kuullotteella
 * käsitelty pinta on huoltomaalattu eri sävyillä, lopputulos on kirjava ja peittävä tuote tasoittaa sen; kuullotteen päälle
 * vaihdettaessa peittävä maali poistetaan kokonaan, jos palataan kuullotteeseen. Eerikin kanta (K8) puuttuu: ei suositusta.
 */
const faq = [
  {
    question: "Mitä eroa on kuullotteella ja peittävällä maalilla?",
    answer:
      "Kuullote jättää puun syyt näkyviin ja antaa sävyn. Peittävä maali peittää puun kokonaan ja antaa tasaisen värin. Peittävä maali kestää yleensä pidempään huoltovälien välillä.",
  },
  {
    question: "Voiko kuullotetun talon maalata peittävällä maalilla?",
    answer:
      "Voi. Peittävä maali tasoittaa kirjavan kuullotepinnan. Toiseen suuntaan vaihto on vaikeampi: peittävä maali pitäisi poistaa kokonaan, jos haluaa takaisin kuullotteen.",
  },
  {
    question: "Kumpi kestää pidempään?",
    answer:
      "Teknoksen oppaan mukaan kuullotteiden kunnossapitoväli on lyhyt, 2–5 vuotta, kun peittävillä maaleilla se on pidempi. Puutalo maalataan peittävällä maalilla yleensä 10–15 vuoden välein.",
  },
  {
    question: "Kumpaa te suosittelette?",
    answer:
      "Katsomme sen arviokäynnillä seinän mukaan. Jos seinässä on peittävä maali, jatkamme sillä. Jos seinässä on kuullote, valinta on sinun, ja kerromme vaihtoehdot. Valittu tuote kirjataan tarjoukseen.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Kuullote jättää puun syyt näkyviin. Peittävä maali antaa tasaisen värin.</li>
        <li>Sävytetty kuullote suojaa auringolta. Väritöntä kuullotetta ei suositella ulkoseinään.</li>
        <li>Kuullotteen kunnossapitoväli on lyhyempi kuin peittävän maalin.</li>
        <li>Kuullotteesta voi siirtyä peittävään maaliin. Toiseen suuntaan vaihto vaatii vanhan maalin poiston.</li>
      </ul>
    </KeyPoints>

    <p>
      Uudessa puutalossa ja hirsitalossa seinä on usein kuullotettu. Kun huoltomaalaus tulee ajankohtaiseksi,
      pitää valita: jatketaanko kuullotteella vai siirrytäänkö peittävään maaliin. Kerromme tässä, mitä maalin
      valmistajat sanovat erosta ja mitä valinta tarkoittaa jatkossa.
    </p>

    <h2>Mitä kuullote on?</h2>
    <p>
      Kuullote on läpikuultava käsittely, joka jättää puun syykuvion näkyviin ja antaa sille sävyn. Teknoksen
      oppaan mukaan kuullotteen väripigmentit suojaavat puuta auringon UV-säteilyltä ja estävät harmaantumisen.
      Siksi väritöntä kuullotetta ei suositella ulkoseinään. Alustan väri vaikuttaa aina lopputulokseen: sama
      kuullote näyttää erilaiselta uudella ja vanhalla puulla. Kuullote sopii hyvin hirsipinnoille, koska se
      muodostaa ohuen ja hengittävän kalvon.
    </p>
    <Avainhuomio>Kuullote näyttää puun syyt, ja vain sävytetty kuullote suojaa auringolta.</Avainhuomio>

    <h2>Mitä peittävä maali on?</h2>
    <p>
      Peittävä maali tai peittosuoja peittää puun kokonaan ja antaa tasaisen värin. Se suojaa puuta säältä
      tehokkaasti ja tasoittaa pinnan, jossa on eri-ikäisiä lautoja tai vanhoja sävyeroja. Monessa puutalossa on
      peittävä maali, ja niissä huoltomaalaus jatkuu samalla tyypillä. Peittävän
      maalin huoltoväli on pidempi: puutalo maalataan yleensä 10–15 vuoden välein.
    </p>
    <Table
      head={["", "Kuullote", "Peittävä maali"]}
      rows={[
        ["Ulkonäkö", "Puun syyt näkyvät, sävy", "Tasainen väri, puu ei näy"],
        ["Suoja auringolta", "Sävytetty suojaa, väritön ei", "Peittää kokonaan"],
        ["Kunnossapitoväli", "Lyhyt, oppaan mukaan 2–5 vuotta", "Pidempi, yleensä 10–15 vuotta"],
        ["Vaihto toiseen", "Peittävään helppo", "Kuullotteeseen vaatii vanhan maalin poiston"],
        ["Sopii", "Hirsi, uusi puu, luonnollinen ilme", "Lautaverhous, vanhat talot, värin vaihto"],
      ]}
      caption="Kuullote ja peittävä maali maalin valmistajan oppaan mukaan."
    />
    <Avainhuomio>Peittävä maali kestää pidempään huoltovälien välillä, ja puutalo maalataan sillä yleensä 10–15 vuoden välein.</Avainhuomio>

    <h2>Voiko kuullotteesta vaihtaa peittävään maaliin?</h2>
    <p>
      Voi, ja se on tavallinen valinta, kun kuullotettu seinä on huoltomaalattu vuosien varrella eri sävyillä ja
      pinta on kirjava. Oppaan mukaan peittävä tuote tasoittaa silloin pinnan. Pohjatyöt ovat samat kuin
      muussakin maalauksessa: homepesu harjoilla, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali
      pensselillä. Toiseen suuntaan vaihto on työläs: jos peittävän maalin päälle halutaan kuullote, vanha maali
      pitää poistaa kokonaan. Hirsitalon maalauksesta kerromme artikkelissa{" "}
      <Link to="/artikkelit/hirsitalon-maalaus/">hirsitalon maalaus</Link>.
    </p>
    <Figure
      image="talon-maalaus-moderni-tumma-puutalo-julkisivumaalaus-valmis"
      alt="Moderni tumma puutalo julkisivumaalauksen jälkeen"
      caption="Tumma puutalo maalauksen jälkeen. Tasainen väri on peittävän maalin jälki."
    />
    <Avainhuomio>Kuullotteesta peittävään maaliin voi siirtyä tavallisilla pohjatöillä, mutta paluu vaatii maalin poiston.</Avainhuomio>

    <h2>Miten valinta tehdään meillä?</h2>
    <p>
      Arviokäynnillä Eemil katsoo, mitä seinässä on nyt ja missä kunnossa puu on. Jos seinässä on peittävä
      maali, jatkamme samalla tyypillä. Jos seinässä on kuullote, kerromme vaihtoehdot ja valinta on sinun.
      Käytämme pääsääntöisesti Tikkurilan tuotteita, ja valittu tuote kirjataan tarjoukseen. Maalaus maksaa
      yleensä 3 500–11 000 euroa. Vanhan maalin tunnistamisesta kerromme artikkelissa{" "}
      <Link to="/artikkelit/puutalon-ulkomaalin-valinta/">puutalon ulkomaalin valinta</Link>, ja palvelun
      esittelemme sivulla <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Valinta tehdään arviokäynnillä seinän mukaan, ja tuote kirjataan tarjoukseen.</Avainhuomio>

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
