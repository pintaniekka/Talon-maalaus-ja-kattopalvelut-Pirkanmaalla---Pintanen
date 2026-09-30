import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints, Note } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Kuinka usein puutalo pitää maalata?",
    answer:
      "Tyypillinen huoltomaalausväli on 10–15 vuotta. Väli riippuu maalityypistä, ilmansuunnasta ja säärasituksesta, joten talon eri seinät voivat tarvita maalausta eri aikaan.",
  },
  {
    question: "Kuinka kauan omakotitalon ulkomaalaus kestää?",
    answer:
      "Pintasen kohteissa talon ulkomaalaus kestää yleensä 3–7 päivää talon koosta ja pohjatöiden määrästä riippuen.",
  },
  {
    question: "Missä lämpötilassa taloa voi maalata?",
    answer:
      "Yleisimpien ulkomaalien alin käyttölämpötila on +5 °C, ja ne toimivat parhaiten +10–+30 asteessa. Puun kosteus saa olla enintään 20 prosenttia.",
  },
  {
    question: "Paljonko talon huoltomaalaus maksaa?",
    answer:
      "Pintasen hintaesimerkeissä yksikerroksinen omakotitalo maksaa noin 3 500–6 000 euroa ja kaksikerroksinen noin 7 000–11 000 euroa. Tarkka hinta annetaan maksuttoman arviokäynnin jälkeen.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Puutalon huoltomaalausväli on tyypillisesti 10–15 vuotta.</li>
        <li>Selvimmät merkit ovat hilseily, haalistuminen, liituuntuminen ja homepilkut.</li>
        <li>Pohjatyöt ratkaisevat, kuinka kauan uusi maalipinta kestää.</li>
        <li>Ulkomaalien alin käyttölämpötila on yleensä +5 °C, ja puun pitää olla kuivaa.</li>
      </ul>
    </KeyPoints>

    <p>
      Maalipinta on puujulkisivun ainoa suoja aurinkoa, sadetta ja pakkasta vastaan. Kun maali pettää, puu alkaa
      imeä vettä, ja korjaaminen muuttuu vuosi vuodelta työläämmäksi. Siksi kysymys ei ole vain siitä, montako
      vuotta edellisestä maalauksesta on kulunut, vaan siitä, missä kunnossa pinta on nyt.
    </p>

    <h2>Kuinka usein puutalo pitää maalata?</h2>
    <p>
      Puuverhoiltu talo kaipaa uutta maalipintaa tyypillisesti <strong>10–15 vuoden välein</strong>. Väli vaihtelee
      maalityypin ja säärasituksen mukaan, eikä talo kulu tasaisesti: eniten aurinkoa ja sadetta saavat seinät
      kuluvat nopeimmin. Usein yksi tai kaksi seinää on jo huollon tarpeessa, kun muut näyttävät vielä hyviltä.
    </p>

    <h2>Viisi merkkiä, että huoltomaalaus on ajankohtainen</h2>

    <h3>1. Maali hilseilee tai lohkeilee</h3>
    <p>
      Hilseily on selvin merkki. Irtoava maali ei enää suojaa puuta, ja paljastunut kohta imee vettä jokaisella
      sateella. Hilseilevää pintaa ei voi korjata maalaamalla päälle, vaan irtonainen maali on kaavittava pois.
    </p>

    <h3>2. Väri on haalistunut</h3>
    <p>
      Auringon UV-säteily haalistaa väriä ja heikentää maalikalvoa. Haalistuminen näkyy ensin aurinkoisimmilla
      seinillä, ja se kertoo, että maalin suojakyky on hiipumassa.
    </p>

    <h3>3. Pinta liituuntuu</h3>
    <p>
      Pyyhkäise seinää kädellä. Jos käteen jää jauhemaista väriä, maali liituuntuu eli sen sideaine on kulunut.
      Liituuntunut pinta on pestävä huolellisesti ennen maalausta, jotta uusi maali tarttuu.
    </p>

    <h3>4. Seinässä näkyy homepilkkuja tai pinttynyttä likaa</h3>
    <p>
      Tummat pilkut ja vihertävä kasvusto viihtyvät varjoisilla ja kosteilla seinillä. Ne eivät lähde maalaamalla,
      vaan vaativat homepesun ennen uutta maalia.
    </p>

    <h3>5. Puu on paikoin paljas tai pehmeä</h3>
    <p>
      Paljas, harmaantunut puu on ollut suojatta jo pitkään. Jos lauta tuntuu pehmeältä, siinä voi olla lahoa, ja
      vaurioitunut puuosa vaihdetaan ennen maalausta.
    </p>
    <Figure
      image="vihrea-puutalo-ennen-ulkomaalausta-ja-pohjatoita"
      alt="Vihreä puutalo ennen ulkomaalausta ja pohjatöitä"
      caption="Puutalo ennen pohjatöitä ja ulkomaalausta."
    />

    <h2>Pohjatyöt ratkaisevat kestävyyden</h2>
    <p>
      Uusi maali kestää juuri niin hyvin kuin sen alusta. Pintasen maalauksissa pohjatyöt tehdään tässä
      järjestyksessä:
    </p>
    <ol>
      <li>Julkisivu pestään homepesuaineella ja harjoilla.</li>
      <li>Irtoileva ja kupliva maali kaavitaan mekaanisesti pois.</li>
      <li>Lahovaurioituneet puuosat vaihdetaan tarvittaessa.</li>
      <li>Paljaat puupinnat pohjamaalataan ennen pintamaalia.</li>
    </ol>
    <p>
      Myös vanha maalityyppi on tunnistettava, koska öljymaali ja vesiohenteinen maali käyttäytyvät eri tavoin.
      Pintasen arviokäynnillä maalityyppi tunnistetaan ja pohjatöiden laajuus arvioidaan ennen tarjousta. Työvaiheet
      on kuvattu sivulla <Link to="/talon-maalaus-pirkanmaa">talon maalaus</Link>.
    </p>

    <h2>Mihin aikaan vuodesta talo kannattaa maalata?</h2>
    <p>
      Yleisimpien ulkomaalien alin käyttölämpötila on +5 °C, ja ne toimivat parhaiten, kun lämpötila on +10–+30 °C.
      Maalattavan puun kosteus saa olla enintään 20 prosenttia. Paras maalaussää on pilvipouta: suorassa
      auringonpaisteessa maali kuivuu liian nopeasti ja tartunta kärsii.
    </p>
    <p>
      Alkukesä on usein loppukesää otollisempi, koska heinä- ja elokuussa lisääntyvä ilmankosteus hidastaa maalin
      kuivumista. Sateella ei maalata, koska pinnan on oltava kuiva.
    </p>
    <Note title="Syksyllä kannattaa suunnitella">
      <p>
        Kun maalauskausi on ohi, on hyvä hetki tarkistaa seinät ja pyytää arvio. Keväällä työ päästään aloittamaan
        heti, kun sää sallii.
      </p>
    </Note>

    <h2>Mitä huoltomaalaus maksaa?</h2>
    <p>Pintasen hintaesimerkit talon ulkomaalaukselle ovat:</p>
    <ul>
      <li>1-kerroksinen omakotitalo: noin 3 500–6 000 €</li>
      <li>1,5-kerroksinen talo: noin 5 000–8 000 €</li>
      <li>2-kerroksinen talo: noin 7 000–11 000 €</li>
    </ul>
    <p>
      Hinnat sisältävät arvonlisäveron 25,5 %. Eniten hintaan vaikuttavat pohjatöiden määrä, talon korkeus ja
      pinta-ala. Oman talosi arvion saat{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa">maalauksen hintalaskurilla</Link>. Työn osuudesta saa
      kotitalousvähennyksen, jonka säännöt on käyty läpi artikkelissa{" "}
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
  </>
);

export default Body;
