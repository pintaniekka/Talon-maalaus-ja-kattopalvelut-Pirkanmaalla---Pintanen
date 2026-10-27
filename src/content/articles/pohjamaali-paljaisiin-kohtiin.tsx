import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: tyovaiheet.ts ("Pohjamaalaamme kohdat, joissa puu on paljaana"), prices.ts includes,
 * CLAUDE.md (pohjamaali paljaisiin puukohtiin, pintamaali pensselillä). Yleiset faktat: K-Rauta ulkomaalausohje (luettu
 * 26.10.2026): paljaat puupinnat pohjamaalataan, puun kosteus enintään 20 %, sama maalityyppi kuin ennen.
 * Tikkurila Ultra Pro Plus 30 tuoteseloste (haku 26.10.2026): voidaan käyttää sekä pohja- että pintamaalina.
 */
const faq = [
  {
    question: "Miksi pohjamaali tulee vain paljaisiin kohtiin?",
    answer:
      "Paljas puu imee maalia, ehjä vanha maalipinta ei. Pohjamaali tasaa imun, jotta pintamaali tarttuu ja peittää tasaisesti. Ehjän maalin päälle pintamaali tarttuu suoraan.",
  },
  {
    question: "Mitä tapahtuu, jos paljaan puun jättää ilman pohjamaalia?",
    answer:
      "Pintamaali imeytyy puuhun, jää ohueksi ja himmeäksi, ja kohta erottuu seinästä. Sellainen kohta kuluu ensimmäisenä puhki.",
  },
  {
    question: "Pohjamaalaatteko koko seinän, jos haluan vaihtaa värin?",
    answer:
      "Värin vaihto ei muuta pohjamaalin tarvetta. Pohjamaali tulee paljaisiin kohtiin, ja uusi väri tulee pintamaalista. Arviokäynnillä katsomme, riittääkö peittävyys.",
  },
  {
    question: "Mitä pohjamaalia käytätte?",
    answer: "Pääsääntöisesti Tikkurilan tuotteita. Valitsemme pohjamaalin pintamaalin ja vanhan maalin tyypin mukaan, ja ne kirjataan tarjoukseen.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Pohjamaali tulee vain kohtiin, joissa puu on paljaana kaavinnan jälkeen.</li>
        <li>Paljas puu imee maalia. Pohjamaali tasaa imun, jotta pintamaali tarttuu ja peittää.</li>
        <li>Ehjä vanha maali on jo pohja, ja sen päälle pintamaali tarttuu suoraan.</li>
        <li>Pohjamaali ja pintamaali kirjataan tarjoukseen, pääsääntöisesti Tikkurila.</li>
      </ul>
    </KeyPoints>

    <p>
      Moni kysyy, miksi pohjamaalia ei vedetä koko seinään. Vastaus on, että pohjamaalilla on yksi tehtävä, ja
      sitä tarvitaan vain siellä, missä puu on paljaana. Kerromme tässä, mitä pohjamaali tekee ja mihin se
      laitetaan.
    </p>

    <h2>Mitä pohjamaali tekee?</h2>
    <p>
      Paljas puu on huokoista ja imee nestettä. Jos pintamaali levitetään suoraan paljaaseen puuhun, suuri osa
      siitä imeytyy puun sisään. Pinta jää ohueksi ja himmeäksi, ja kohta erottuu muusta seinästä. Pohjamaali
      imeytyy puuhun ensin, täyttää huokoset ja antaa pintamaalille tasaisen alustan. K-Raudan ohje on sama:
      paljaat puupinnat pohjamaalataan ennen pintamaalia.
    </p>
    <Avainhuomio>Pohjamaali täyttää paljaan puun huokoset, jotta pintamaali ei imeydy puuhun.</Avainhuomio>

    <h2>Mihin kohtiin pohjamaali tulee?</h2>
    <Table
      head={["Kohta", "Pohjamaali", "Miksi"]}
      rows={[
        ["Kaavittu, paljas puu", "Kyllä", "Puu imee, pohjamaali tasaa"],
        ["Ehjä vanha maalipinta", "Ei", "Vanha maali on jo pohja"],
        ["Vaihdetut tai uudet laudat", "Kyllä", "Uusi puu on paljasta"],
        ["Lautojen päät ja sahauspinnat", "Kyllä", "Päätypuu imee eniten"],
        ["Haalistunut mutta kiinni oleva maali", "Ei", "Pintamaali tarttuu suoraan"],
      ]}
      caption="Pohjamaalin kohdat talon maalauksessa. Pohjamaali tulee sinne, missä puu on paljaana."
    />
    <p>
      Kaavinnan jälkeen seinässä on yleensä laikkuja, joissa vanha maali on lähtenyt ja puu näkyy. Ne
      pohjamaalataan. Lautojen päät ja sahauspinnat imevät eniten, joten ne saavat pohjamaalia huolellisesti.
      Kaavinnasta kerromme artikkelissa{" "}
      <Link to="/artikkelit/miksi-vanha-maali-kaavitaan/">kaavinta ja homepesu</Link>.
    </p>
    <Avainhuomio>Kaavinnan jälkeen paljastuneet laikut ja lautojen päät saavat pohjamaalin, ehjä maali ei.</Avainhuomio>

    <h2>Miksi ehjää maalia ei pohjamaalata?</h2>
    <p>
      Ehjä, kiinni oleva vanha maali on jo tiivis pinta. Se ei ime, joten pohjamaali ei tee sille mitään. Pintamaali
      tarttuu siihen suoraan, kun pinta on pesty puhtaaksi ja kuiva. Turha pohjamaalikerros lisäisi vain
      kalvon paksuutta. Siksi maalaamme pohjamaalin tarkasti paljaisiin kohtiin ja pintamaalin koko seinään
      pensselillä. Lopputulos on tasainen, koska pintamaali peittää sekä pohjamaalatut kohdat että vanhan maalin.
    </p>
    <Figure
      image="talon-maalaus-puutalo-ja-parveke-huoltomaalaus-jalkeen"
      ratio="3/4"
      alt="Puutalo ja parveke huoltomaalauksen jälkeen"
      caption="Huoltomaalattu puutalo. Pohjamaalatut kohdat eivät erotu pintamaalin alta."
    />
    <Avainhuomio>Ehjä maali on tiivis pinta, johon pintamaali tarttuu suoraan ilman pohjamaalia.</Avainhuomio>

    <h2>Mitä pohjamaali maksaa?</h2>
    <p>
      Pohjamaali kuuluu hintaan. Omakotitalon maalaus maksaa meillä yleensä 3 500–11 000 euroa, ja hintaan
      kuuluu homepesu, kaavinta, suojaus, pohjamaali paljaisiin kohtiin, pintamaali pensselillä ja siivous.
      Pohjatöiden määrä vaikuttaa hintaan, ja Eemil katsoo sen ilmaisella arviokäynnillä. Hintaesimerkit ovat
      sivulla <Link to="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</Link>, ja palvelun esittelemme
      sivulla <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Pohjamaali kuuluu 3 500–11 000 euron hintaan, ja sen määrä katsotaan arviokäynnillä.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "K-Rauta: Ulkomaalausohje (luettu 26.10.2026)",
          url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/ulkomaalausohje",
        },
      ]}
    />
  </>
);

export default Body;
