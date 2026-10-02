import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints, Note, Sources, Table } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Kuinka usein puutalo pitää maalata?",
    answer:
      "Tavallisesti 10–15 vuoden välein. Väli riippuu maalista ja säärasituksesta, ja talon aurinkoisimmat seinät kuluvat muita nopeammin.",
  },
  {
    question: "Missä lämpötilassa taloa voi maalata?",
    answer:
      "Useimpien ulkomaalien alin käyttölämpötila on +5 °C, ja ne toimivat parhaiten +10–+30 asteessa. Maalattavan puun kosteus saa olla enintään 20 %.",
  },
  {
    question: "Kuinka kauan talon ulkomaalaus kestää?",
    answer: "Meillä omakotitalon ulkomaalaus kestää yleensä 3–7 päivää talon koon ja pohjatöiden mukaan.",
  },
  {
    question: "Paljonko talon huoltomaalaus maksaa?",
    answer:
      "Yksikerroksinen omakotitalo maksaa meillä noin 3 500–6 000 euroa ja kaksikerroksinen noin 7 000–11 000 euroa. Tarkan hinnan annamme maksuttoman arviokäynnin jälkeen.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Puutalo maalataan tavallisesti 10–15 vuoden välein.</li>
        <li>Maalauksen tarpeesta kertovat hilseily, haalistuminen, liituuntuminen ja homepilkut.</li>
        <li>Pohjatyöt määräävät, kuinka kauan uusi maali kestää.</li>
        <li>Ulkomaalien alaraja on yleensä +5 °C, ja puun pitää olla kuivaa.</li>
      </ul>
    </KeyPoints>

    <p>
      Maali on puuverhouksen ainoa suoja aurinkoa, sadetta ja pakkasta vastaan. Kun se pettää, puu alkaa imeä
      vettä ja korjaaminen käy joka vuosi työläämmäksi. Vuosiluku ei silti kerro kaikkea. Seinän kunnon näkee
      seinästä.
    </p>

    <h2>Kuinka usein puutalo pitää maalata?</h2>
    <p>
      Puuverhoiltu talo tarvitsee uuden maalipinnan tavallisesti <strong>10–15 vuoden välein</strong>. Talo ei
      kulu tasaisesti. Seinät, joihin aurinko ja sade osuvat eniten, kuluvat ensin, ja usein yksi tai kaksi seinää
      on jo maalauksen tarpeessa, kun muut näyttävät vielä hyviltä.
    </p>

    <h2>Mistä tietää, että talo pitää maalata?</h2>

    <h3>1. Maali hilseilee tai lohkeilee</h3>
    <p>
      Tämä on selvin merkki. Irtoava maali ei suojaa puuta, ja paljas kohta kastuu jokaisella sateella. Hilseilevän
      pinnan päälle ei voi maalata, vaan irtonainen maali kaavitaan ensin pois.
    </p>

    <h3>2. Väri on haalistunut</h3>
    <p>
      Auringon UV-säteily haalistaa väriä ja haurastuttaa maalikalvoa. Haalistuminen alkaa aurinkoisimmilta
      seiniltä.
    </p>

    <h3>3. Pinta liituuntuu</h3>
    <p>
      Pyyhkäise seinää kämmenellä. Jos käteen jää väriä jauheena, maalin sideaine on kulunut. Liituuntunut seinä
      pitää pestä kunnolla, tai uusi maali ei tartu.
    </p>

    <h3>4. Seinässä on homepilkkuja tai pinttynyttä likaa</h3>
    <p>
      Tummat pilkut ja vihertävä kasvusto viihtyvät varjoisilla ja kosteilla seinillä. Ne eivät peity maalilla.
      Seinä tarvitsee homepesun ennen maalausta.
    </p>

    <h3>5. Puu on paikoin paljas tai pehmeä</h3>
    <p>
      Harmaantunut, paljas puu on ollut suojatta jo pitkään. Jos lauta tuntuu pehmeältä, siinä voi olla lahoa, ja
      se vaihdetaan ennen maalausta.
    </p>
    <Figure
      image="vihrea-puutalo-ennen-ulkomaalausta-ja-pohjatoita"
      alt="Vihreä puutalo ennen ulkomaalausta ja pohjatöitä"
      caption="Puutalo ennen pohjatöitä ja ulkomaalausta."
    />

    <h2>Mitä pohjatöitä maalaus vaatii?</h2>
    <p>Uusi maali kestää yhtä hyvin kuin sen alusta. Teemme pohjatyöt tässä järjestyksessä:</p>
    <ol>
      <li>Pesemme julkisivun homepesuaineella ja harjoilla.</li>
      <li>Kaavimme irtoilevan ja kuplivan maalin pois.</li>
      <li>Pohjamaalaamme paljaat puupinnat ennen pintamaalia.</li>
    </ol>
    <p>
      Vanha maalityyppi pitää myös tunnistaa, koska öljymaali ja vesiohenteinen maali käyttäytyvät eri tavoin.
      Tunnistamme maalin ja arvioimme pohjatöiden määrän arviokäynnillä ennen tarjousta. Työvaiheet on kuvattu
      sivulla <Link to="/talon-maalaus-pirkanmaa">talon maalaus Pirkanmaalla</Link>.
    </p>

    <h2>Mihin aikaan vuodesta talo kannattaa maalata?</h2>
    <p>
      Useimpien ulkomaalien alin käyttölämpötila on +5 °C, ja ne toimivat parhaiten +10–+30 asteessa. Maalattavan
      puun kosteus saa olla enintään 20 %. Paras sää on pilvipouta. Suorassa auringonpaisteessa maali kuivuu liian
      nopeasti ja tartunta heikkenee.
    </p>
    <p>
      Alkukesä on usein loppukesää parempi, koska heinä- ja elokuussa ilmankosteus nousee ja maali kuivuu
      hitaammin. Sateella emme maalaa.
    </p>
    <Note title="Syksy on hyvä aika pyytää arvio">
      <p>
        Kun maalauskausi on ohi, seinät ehtii tarkistaa rauhassa. Keväällä työ alkaa heti, kun sää sallii.
      </p>
    </Note>

    <h2>Paljonko talon huoltomaalaus maksaa?</h2>
    <Table
      head={["Talo", "Hinta"]}
      rows={[
        ["1-kerroksinen omakotitalo", "noin 3 500–6 000 €"],
        ["1,5-kerroksinen talo", "noin 5 000–8 000 €"],
        ["2-kerroksinen talo", "noin 7 000–11 000 €"],
      ]}
      caption="Pintasen hintaesimerkit Pirkanmaalla, sis. ALV 25,5 %."
    />
    <p>
      Eniten hintaan vaikuttavat pohjatöiden määrä, talon korkeus ja pinta-ala. Oman talosi arvion saat{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa">maalauksen hintalaskurilla</Link>. Työn osuudesta saa
      kotitalousvähennyksen, ja sen säännöt ovat artikkelissa{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot">
        kotitalousvähennys katto- ja maalaustöissä
      </Link>
      .
    </p>
    <Figure
      image="keltainen-ulkoverhous-huoltomaalaus-jalkeen"
      alt="Keltainen ulkoverhous huoltomaalauksen jälkeen"
      caption="Ulkoverhous huoltomaalauksen jälkeen."
    />

    <ArticleFaq items={faq} />

    <Sources
      items={[
        { label: "K-Rauta: Ulkomaalausohje", url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/ulkomaalausohje" },
        { label: "K-Rauta: Puutalon maalaus", url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/puutalon-maalaus" },
      ]}
    />
  </>
);

export default Body;
