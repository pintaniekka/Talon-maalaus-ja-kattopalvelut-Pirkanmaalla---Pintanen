import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: tyovaiheet.ts (pintamaali pensselillä, pohjamaali paljaisiin kohtiin), CLAUDE.md
 * (Eemil: pintamaali pensselillä, ei ruiskulla; maali pääsääntöisesti Tikkurila), maalaus 3–7 päivää, takuu 2 vuotta.
 * Yleiset faktat: K-Rauta, ulkomaalausohje (luettu 26.10.2026): "Puupintojen maalit ja puunsuojat levitetään
 * siveltimellä", ruiskutettu pinta viimeistellään siveltimellä.
 */
const faq = [
  {
    question: "Miksi maalaatte seinät pensselillä ettekä ruiskulla?",
    answer:
      "Pensseli painaa maalin puun syihin ja lautojen saumoihin. Ruisku jättää maalin pintaan. Puupinnoille suositellaan sivellintä, ja ruiskutettu pinta pitää joka tapauksessa viimeistellä siveltimellä.",
  },
  {
    question: "Eikö pensselillä maalaaminen ole hitaampaa?",
    answer:
      "On. Omakotitalo valmistuu silti yleensä 3–7 päivässä. Pohjatyöt vievät usein enemmän aikaa kuin itse maalaus.",
  },
  {
    question: "Maalaatteko katon myös pensselillä?",
    answer:
      "Katon maalaamme ruiskulla kahteen kertaan, koska tiili ei ime maalia samalla tavalla kuin puu. Ahtaat paikat katollakin maalaamme telalla tai käsin.",
  },
  {
    question: "Näkyykö pensselin jälki valmiissa seinässä?",
    answer: "Ei näy. Maali vedetään laudan suuntaan, ja pinta on tasainen. Näet jäljen kuvista sivuillamme.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Maalaamme puutalon seinät pensselillä. Katon maalaamme ruiskulla.</li>
        <li>Pensseli painaa maalin puun syihin, ruisku jättää sen pintaan.</li>
        <li>Maalin valmistajien ohjeissa puupinnat maalataan siveltimellä, ja ruiskutettu pinta viimeistellään siveltimellä.</li>
        <li>Omakotitalo valmistuu pensselillä yleensä 3–7 päivässä.</li>
      </ul>
    </KeyPoints>

    <p>
      Meiltä kysytään usein, miksi seinät maalataan pensselillä, kun ruisku olisi nopeampi. Vastaus on lyhyt: puu
      ja tiili ovat eri materiaaleja, ja pensseli antaa puulle paremman tartunnan. Kerromme tässä, miksi.
    </p>

    <h2>Mitä eroa on pensselillä ja ruiskulla puupinnalla?</h2>
    <p>
      Pensseli hieroo maalin puun syihin ja painaa sen lautojen saumoihin ja naulankantoihin. Ruisku puhaltaa
      maalin pintaan, mutta ei paina sitä puuhun. Siksi maalin valmistajat neuvovat, että puupintojen maalit
      levitetään siveltimellä. Jos maali ruiskutetaan, pinta viimeistellään siveltimellä heti ruiskutuksen jälkeen.
      Silloin ruisku ei säästä aikaa, mutta lisää maalisumun suojaustarvetta.
    </p>
    <Table
      head={["", "Pensseli", "Ruisku"]}
      rows={[
        ["Tartunta puuhun", "Maali painuu syihin ja saumoihin", "Maali jää pintaan, viimeistely siveltimellä"],
        ["Maalimäärä", "Tasainen kerros, ei valumia", "Helposti liian ohut tai liian paksu"],
        ["Suojaus", "Ikkunat ja terassit", "Lisäksi maalisumu: naapurin auto, pensaat, katto"],
        ["Mihin sopii", "Puuverhous, hirsi, listat", "Tiilikatto, suuret sileät pinnat"],
      ]}
      caption="Pensseli ja ruisku puutalon ulkomaalauksessa. Katolla ruisku on oikea työkalu."
    />
    <Avainhuomio>Puupinnalle suositellaan sivellintä, ja ruiskutettu pinta pitää joka tapauksessa viimeistellä siveltimellä.</Avainhuomio>

    <h2>Miksi katto maalataan ruiskulla ja seinä pensselillä?</h2>
    <p>
      Tiili ei ime maalia kuten puu, ja katon pinta on iso ja yhtenäinen. Siksi maalaamme katon
      korkeapaineruiskulla kahteen kertaan, ja vain reunat ja ahtaat paikat telalla tai käsin. Seinässä on
      lautoja, saumoja, listoja ja ikkunanpieliä. Niihin pensseli yltää, ruisku ei. Kerromme katon maalauksesta
      artikkelissa <Link to="/artikkelit/kaksi-maalikerrosta-tiilikatto/">miksi maalaamme katon kahteen kertaan</Link>.
    </p>
    <Avainhuomio>Sama yritys käyttää katolla ruiskua ja seinällä pensseliä, koska tiili ja puu ottavat maalin eri tavalla.</Avainhuomio>

    <h2>Miten pensselillä maalaus etenee?</h2>
    <ol>
      <li>Homepesu harjoilla ja huuhtelu. Seinä saa kuivua.</li>
      <li>Irtoavan maalin kaavinta.</li>
      <li>Pohjamaali paljaisiin puukohtiin.</li>
      <li>Pintamaali pensselillä laudan suuntaan. Maali on pääsääntöisesti Tikkurila.</li>
      <li>Lopputarkastus yhdessä ja 2 vuoden kirjallinen takuu.</li>
    </ol>
    <Figure
      image="talon-maalaus-ulkoverhous-pensselilla-maalari"
      ratio="3/2"
      alt="Maalari maalaa puutalon ulkoverhousta pensselillä"
      caption="Pintamaali vedetään pensselillä laudan suuntaan."
    />
    <Avainhuomio>Maalaus on viisi vaihetta, ja pensseli tulee käyttöön vasta pohjatöiden jälkeen.</Avainhuomio>

    <h2>Kuinka kauan pensselillä maalaus kestää?</h2>
    <p>
      Omakotitalo valmistuu yleensä 3–7 päivässä. Yksikerroksinen talo 2–4 päivässä, puolitoistakerroksinen 3–5
      ja kaksikerroksinen 4–8 päivässä. Pohjatyöt vievät usein enemmän aikaa kuin maalaus. Hinta on yleensä
      3 500–11 000 euroa, ja hintaesimerkit talon koon mukaan ovat sivulla{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</Link>. Palvelun esittelemme sivulla{" "}
      <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Pensselillä maalattu omakotitalo valmistuu yleensä 3–7 päivässä.</Avainhuomio>

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
