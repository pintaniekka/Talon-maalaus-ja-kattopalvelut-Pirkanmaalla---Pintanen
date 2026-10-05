import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints, Note, Sources } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Kuinka usein puutalo pitää maalata?",
    answer:
      "Puutalo maalataan yleensä 10–15 vuoden välein. Aurinkoiset seinät kuluvat nopeammin kuin muut, joten katso seinät läpi joka vuosi.",
  },
  {
    question: "Missä lämpötilassa taloa voi maalata?",
    answer:
      "Useimmat ulkomaalit vaativat vähintään +5 astetta. Paras lämpötila on +10–+30 astetta. Puun pitää olla kuivaa. Sen kosteus saa olla enintään 20 %.",
  },
  {
    question: "Kuinka kauan talon ulkomaalaus kestää?",
    answer: "Meillä omakotitalon ulkomaalaus kestää yleensä 3–7 päivää. Aika riippuu talon koosta ja pohjatöiden määrästä.",
  },
  {
    question: "Paljonko talon huoltomaalaus maksaa?",
    answer:
      "Yksikerroksisen omakotitalon maalaus maksaa meillä noin 3 500–6 000 euroa ja kaksikerroksisen noin 7 000–11 000 euroa. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Puutalo maalataan yleensä 10–15 vuoden välein.</li>
        <li>Hilseily, haalistunut väri, liituava pinta ja homepilkut kertovat, että on aika maalata.</li>
        <li>Pohjatyöt ratkaisevat, kuinka kauan uusi maali kestää.</li>
        <li>Maalata voi, kun on vähintään +5 astetta ja puu on kuivaa.</li>
      </ul>
    </KeyPoints>

    <p>
      Maali suojaa puutaloa auringolta, sateelta ja pakkaselta. Kun maali kuluu, puu alkaa imeä vettä. Mitä
      pidempään odotat, sitä enemmän työtä seinä vaatii. Vuosiluku ei kerro kaikkea. Katso seinää, niin näet,
      missä kunnossa se on.
    </p>

    <h2>Kuinka usein puutalo pitää maalata?</h2>
    <p>
      Puutalo tarvitsee uuden maalin yleensä <strong>10–15 vuoden välein</strong>. Kaikki seinät eivät kulu yhtä
      nopeasti. Aurinko ja sade kuluttavat joitakin seiniä enemmän. Usein yksi tai kaksi seinää tarvitsee jo
      maalia, vaikka muut näyttävät vielä hyviltä.
    </p>

    <h2>Mistä tiedät, että talo pitää maalata?</h2>
    <p>Kierrä talo ja katso seinät läpi. Nämä viisi merkkiä kertovat, että maali ei enää suojaa puuta.</p>

    <h3>1. Maali hilseilee tai lohkeilee</h3>
    <p>
      Tämä on selvin merkki. Kun maali irtoaa, puu jää paljaaksi ja kastuu joka sateella. Hilseilevän maalin
      päälle ei voi maalata. Irtonainen maali pitää ensin kaapia pois.
    </p>

    <h3>2. Väri on haalistunut</h3>
    <p>Aurinko haalistaa värin ja haurastuttaa maalin. Haalistuminen alkaa aurinkoisimmilta seiniltä.</p>

    <h3>3. Maali jää käteen</h3>
    <p>
      Pyyhkäise seinää kämmenellä. Jos käteen jää väriä pölynä, maali on kulunut. Tätä sanotaan liituuntumiseksi.
      Seinä pitää pestä hyvin, tai uusi maali ei tartu.
    </p>

    <h3>4. Seinässä on homepilkkuja tai likaa</h3>
    <p>
      Tummat pilkut ja vihreä kasvusto viihtyvät varjoisilla ja kosteilla seinillä. Ne eivät peity maalilla.
      Seinä tarvitsee homepesun ennen maalausta.
    </p>

    <h3>5. Puu on paljas tai pehmeä</h3>
    <p>
      Harmaa, paljas puu on ollut pitkään ilman suojaa. Paina lautaa. Jos se tuntuu pehmeältä, siinä voi olla
      lahoa. Lahon laudan päälle ei kannata maalata.
    </p>
    <Figure
      image="vihrea-puutalo-ennen-ulkomaalausta-ja-pohjatoita"
      alt="Vihreä puutalo ennen ulkomaalausta ja pohjatöitä"
      caption="Puutalo ennen pohjatöitä ja ulkomaalausta."
    />

    <h2>Mitä pohjatöitä talon maalaus vaatii?</h2>
    <p>
      Uusi maali kestää vain, jos pohja on tehty hyvin. Siksi pohjatyöt ovat maalauksen tärkein vaihe. Me teemme
      ne näin:
    </p>
    <ol>
      <li>Pesemme seinät homepesuaineella ja harjoilla.</li>
      <li>Kaavimme irtoavan maalin pois.</li>
      <li>Annamme seinän kuivua.</li>
      <li>Pohjamaalaamme paljaat puukohdat.</li>
      <li>Maalaamme pintamaalin pensselillä.</li>
    </ol>
    <p>
      Käymme talon läpi ennen tarjousta. Samalla katsomme, mitä maalia seinässä on ja paljonko pohjatöitä
      tarvitaan. Lue lisää sivulta <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>

    <h2>Mihin aikaan vuodesta talo kannattaa maalata?</h2>
    <p>
      Useimmat ulkomaalit vaativat vähintään +5 astetta. Paras lämpötila on +10–+30 astetta. Puun pitää olla
      kuivaa, eli sen kosteus saa olla enintään 20 %. Paras maalaussää on pilvinen ja poutainen päivä. Kovassa
      auringonpaisteessa maali kuivuu liian nopeasti eikä tartu kunnolla.
    </p>
    <p>
      Alkukesä on usein parempi kuin loppukesä. Heinä- ja elokuussa ilma on kosteampaa ja maali kuivuu hitaammin.
      Sateella emme maalaa.
    </p>
    <Note title="Syksyllä on hyvä pyytää arvio">
      <p>
        Kun maalauskausi on ohi, ehdimme katsoa seinät rauhassa. Keväällä pääsemme aloittamaan heti, kun sää
        sallii.
      </p>
    </Note>

    <h2>Paljonko talon huoltomaalaus maksaa?</h2>
    <p>
      Yksikerroksisen omakotitalon maalaus maksaa meillä noin 3 500–6 000 euroa. Kaksikerroksisen talon maalaus
      maksaa noin 7 000–11 000 euroa. Hinta riippuu pohjatöiden määrästä, talon korkeudesta ja seinien
      pinta-alasta.
    </p>
    <p>
      Suuntaa antavan hinnan omalle talollesi saat{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa/">maalauksen hintalaskurilla</Link>. Työn osuudesta saat
      kotitalousvähennyksen. Lue siitä lisää artikkelista{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/">
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
