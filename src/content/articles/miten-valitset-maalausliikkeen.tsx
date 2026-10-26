import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Vain omat syyt (CLAUDE.md "Miksi Pintanen": yrittäjä tekee työn itse, kokemus ja työnjälki itse tekijällä, kilpailukykyinen
 * hinta, maalia aina tarpeeksi, Eerik vastaa lopputuloksesta; kilpailijoista ei väitetä mitään). Yrityksen faktat: kirjallinen
 * tarjous kiinteällä hinnalla, takuu 2 v (maalaus) ja 5 v (pinnoitus), Google-arviot (company.ts LUVUT.googleArvio 5,0 / 5),
 * yli 80 maalattua taloa (LUVUT). Yleiset faktat: Verohallinto: yrityksen pitää kuulua ennakkoperintärekisteriin, jotta
 * kotitalousvähennyksen saa (tarkistus ytj.fi).
 */
const faq = [
  {
    question: "Mitä kysyn maalausliikkeeltä ennen tilausta?",
    answer:
      "Kuka työn tekee, mitä maalia käytetään, mitä pohjatöitä tehdään, onko tarjous kirjallinen ja kiinteä, mikä takuu on ja kuuluuko yritys ennakkoperintärekisteriin.",
  },
  {
    question: "Miksi ennakkoperintärekisteri on tärkeä?",
    answer:
      "Kotitalousvähennyksen saa vain, jos yritys kuuluu ennakkoperintärekisteriin. Voit tarkistaa sen ilmaiseksi osoitteesta ytj.fi.",
  },
  {
    question: "Kuka tekee työn Pintasella?",
    answer: "Eemil maalaa seinät ja Eerik pinnoittaa katot. Yrittäjät tekevät työn itse, ja Eerik vastaa lopputuloksesta.",
  },
  {
    question: "Mitä takuu kattaa?",
    answer: "Maalaukselle annamme 2 vuoden ja pinnoitukselle 5 vuoden kirjallisen takuun.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Kysy, kuka työn tekee, mitä maalia käytetään ja mitä pohjatöitä tehdään.</li>
        <li>Vaadi kirjallinen tarjous kiinteällä hinnalla ja kirjallinen takuu.</li>
        <li>Tarkista ennakkoperintärekisteri ytj.fi:stä, muuten kotitalousvähennys jää saamatta.</li>
        <li>Meillä yrittäjät tekevät työn itse, ja maalia käytetään aina tarpeeksi.</li>
      </ul>
    </KeyPoints>

    <p>
      Talon maalaus on iso hankinta, ja tarjouksia kannattaa pyytää useampi. Kerromme tässä, mitä kysyä ja
      mitä tarjouksista katsoa. Kerromme myös, miten me vastaamme samoihin kysymyksiin.
    </p>

    <h2>Mitä kysyt ennen tilausta?</h2>
    <Table
      head={["Kysymys", "Miksi se on tärkeä", "Meidän vastaus"]}
      rows={[
        ["Kuka työn tekee?", "Tekijä ratkaisee työnjäljen", "Eemil maalaa itse, Eerik vastaa lopputuloksesta"],
        ["Mitä maalia käytetään?", "Maali kirjataan tarjoukseen", "Pääsääntöisesti Tikkurila, vanhan maalin mukaan"],
        ["Mitä pohjatöitä tehdään?", "Pohjatyöt ratkaisevat keston", "Homepesu harjoilla, kaavinta, pohjamaali paljaisiin kohtiin"],
        ["Pensseli vai ruisku?", "Puupinnalle suositellaan sivellintä", "Pensselillä"],
        ["Onko tarjous kirjallinen ja kiinteä?", "Hinta ei saa muuttua työn aikana", "Kyllä, kiinteä hinta"],
        ["Mikä takuu on?", "Kirjallinen takuu on lupaus", "2 vuotta kirjallisena"],
        ["Kuuluuko yritys ennakkoperintärekisteriin?", "Ehto kotitalousvähennykselle", "Kyllä, tarkista ytj.fi"],
      ]}
      caption="Seitsemän kysymystä maalausliikkeelle ja meidän vastauksemme niihin."
    />
    <Avainhuomio>Seitsemän kysymystä kertoo, miten työ tehdään ja saatko siitä vähennyksen.</Avainhuomio>

    <h2>Mitä tarjouksesta kannattaa katsoa?</h2>
    <p>
      Katso, että tarjouksessa on kiinteä hinta ja lista siitä, mitä hintaan kuuluu: pesu, kaavinta, suojaus,
      pohjamaali, pintamaali, telineet ja siivous. Katso, että maali on nimetty. Katso, että takuu on kirjattu.
      Halvin tarjous ei aina sisällä samoja töitä kuin kallein, joten vertaa sisältöä, älä pelkkää summaa. Meillä
      omakotitalon maalaus maksaa yleensä 3 500–11 000 euroa, ja hintaan kuuluu kaikki yllä oleva. Katon
      tarjouksesta kerromme artikkelissa{" "}
      <Link to="/artikkelit/mita-tarjouksesta-kannattaa-katsoa/">mitä tarjouksesta kannattaa katsoa</Link>.
    </p>
    <Avainhuomio>Vertaa tarjousten sisältöä, älä pelkkää summaa, ja katso, että maali ja takuu on kirjattu.</Avainhuomio>

    <h2>Miksi tekijä ratkaisee?</h2>
    <p>
      Pohjatyöt ja pensselin jälki ovat käsityötä. Siksi kysy, kuka seinällä on. Meillä Eemil maalaa seinät
      itse ja Eerik pinnoittaa katot itse. Kokemus ja työnjälki ovat tekijällä, ei alihankkijalla. Käytämme
      maalia aina tarpeeksi, koska ohut kerros kuluu ensimmäisenä puhki. Olemme maalanneet yli 80 taloa, ja
      Google-arviomme on 5,0 / 5. Arviot ovat sanasta sanaan sivulla{" "}
      <Link to="/kokemuksia/">kokemuksia</Link>.
    </p>
    <Figure
      image="talon-maalaus-pensseli"
      alt="Pensseli talon ulkomaalauksessa"
      caption="Pensseli on seinällä tärkein työkalu, ja sitä pitelee yrittäjä itse."
    />
    <Avainhuomio>Tekijä ratkaisee työnjäljen, ja meillä yrittäjät tekevät työn itse.</Avainhuomio>

    <h2>Miten tarkistat ennakkoperintärekisterin?</h2>
    <p>
      Mene osoitteeseen ytj.fi ja hae yritys nimellä tai Y-tunnuksella. Sivu näyttää, kuuluuko yritys
      ennakkoperintärekisteriin. Verohallinnon ohjeen mukaan kotitalousvähennyksen saa vain, jos yritys kuuluu
      rekisteriin sopimuksen tekohetkellä. Vähennys on 40 % työn osuudesta, enintään 2 100 euroa henkilöltä,
      joten tarkistus kannattaa. Pintanen Oy kuuluu rekisteriin. Lue lisää sivulta{" "}
      <Link to="/kotitalousvahennys/">kotitalousvähennys</Link>, ja katso palvelu sivulta{" "}
      <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Ytj.fi kertoo rekisterin minuutissa, ja ilman rekisteriä 2 100 euron vähennys jää saamatta.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Verohallinto: Näin ilmoitat kotitalousvähennyksen (luettu 26.10.2026)",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/nain-ilmoitat-kotitalousvahennyksen/",
        },
        {
          label: "Yritys- ja yhteisötietojärjestelmä YTJ: yrityshaku",
          url: "https://www.ytj.fi/",
        },
      ]}
    />
  </>
);

export default Body;
