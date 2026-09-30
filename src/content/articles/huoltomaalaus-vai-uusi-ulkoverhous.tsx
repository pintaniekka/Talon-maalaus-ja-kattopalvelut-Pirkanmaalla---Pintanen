import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Voiko pahasti hilseilevän talon vielä maalata?",
    answer:
      "Yleensä voi, jos maalin alla oleva puu on kovaa eikä lahoa. Hilseilevä maali kaavitaan pois, pinta pestään ja paljaat kohdat pohjamaalataan ennen pintamaalia.",
  },
  {
    question: "Mitä tehdään, jos maalin alta löytyy lahoa?",
    answer:
      "Lahovaurioituneet puuosat vaihdetaan ennen maalausta. Pintanen ilmoittaa löytyneistä lahovaurioista asiakkaalle ennen työn jatkamista.",
  },
  {
    question: "Kuinka kauan talon ulkomaalaus kestää?",
    answer: "Yleensä 3–7 päivää talon koosta ja pohjatöiden määrästä riippuen.",
  },
  {
    question: "Kuinka pitkä takuu maalaukselle annetaan?",
    answer: "Pintanen antaa talon maalauksille 2 vuoden takuun.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Jos puu on maalin alla kovaa eikä lahoa, ulkoverhousta ei yleensä tarvitse uusia.</li>
        <li>Huolelliset pohjatyöt pelastavat vanhankin paneelin.</li>
        <li>Yksittäiset lahot laudat vaihdetaan, koko verhousta ei.</li>
        <li>Huoltomaalaus maksaa vain murto-osan uuden laudoituksen hinnasta.</li>
      </ul>
    </KeyPoints>

    <p>
      Kun vanhan talon maali hilseilee pahasti, moni alkaa pohtia koko ulkoverhouksen uusimista. Useimmiten se on
      ylimitoitettu ratkaisu. Maalipinnan kunto ja puun kunto ovat kaksi eri asiaa, ja vain jälkimmäinen ratkaisee,
      tarvitaanko uutta lautaa.
    </p>

    <h2>Nyrkkisääntö: puun kunto ratkaisee</h2>
    <p>
      Jos alla oleva puu on vielä kovaa eikä lahoa, ulkoverhousremontti on usein tarpeeton. Hilseilevä, haalistunut
      tai likainen maalipinta näyttää pahalta, mutta se on pinnan ongelma, joka korjataan pohjatöillä ja uudella
      maalilla.
    </p>

    <h2>Näin tarkistat puun kunnon</h2>
    <ol>
      <li>Paina puuta esimerkiksi ruuvitaltalla. Terve puu on kovaa, laho antaa periksi.</li>
      <li>Tarkista alimmat laudat, ikkunoiden alapuolet ja nurkat. Niihin vesi jää pisimpään.</li>
      <li>Katso lautojen päitä ja saumoja: halkeilevat ja tummuneet kohdat kertovat kosteudesta.</li>
    </ol>
    <Figure
      image="puutalon-ja-parvekkeen-puuosien-kunnostus-ennen"
      alt="Puutalon ja parvekkeen puuosat ennen kunnostusta"
      caption="Puuosat ennen kunnostusta ja huoltomaalausta."
    />

    <h2>Milloin huoltomaalaus riittää?</h2>
    <ul>
      <li>Maali hilseilee, mutta puu on sen alla kovaa.</li>
      <li>Väri on haalistunut tai pinta liituuntuu.</li>
      <li>Seinässä on homepilkkuja tai pinttynyttä likaa.</li>
      <li>Lahoa on vain yksittäisissä laudoissa.</li>
    </ul>
    <p>
      Perusteellisilla pohjatöillä vanhakin paneeli saadaan pelastettua. Pintasen maalauksissa julkisivu pestään
      homepesuaineella, irtoileva maali kaavitaan pois, vaurioituneet puuosat vaihdetaan ja paljaat puupinnat
      pohjamaalataan ennen pintamaalia.
    </p>

    <h2>Milloin verhous pitää uusia?</h2>
    <p>
      Uutta laudoitusta tarvitaan, kun lahoa on laajasti eikä yksittäisten lautojen vaihtaminen enää riitä.
      Maalaaminen lahon puun päälle ei pysäytä vauriota, koska kosteus on jo puun sisällä. Jos pohjatöiden aikana
      löytyy lahovaurioita, Pintanen ilmoittaa niistä ennen työn jatkamista.
    </p>

    <h2>Hinta ja työn kesto</h2>
    <p>
      Huoltomaalaus maksaa vain murto-osan uuden laudoituksen hinnasta, ja samalla vältytään raskaalta
      rakennusprojektilta. Pintasen hintaesimerkeissä yksikerroksisen omakotitalon maalaus maksaa noin
      3 500–6 000 euroa ja kaksikerroksisen noin 7 000–11 000 euroa. Työ kestää yleensä 3–7 päivää, ja maalaukselle
      annetaan 2 vuoden takuu.
    </p>
    <p>
      Oman talosi arvion saat <Link to="/talon-maalaus-hinta-pirkanmaa">maalauksen hintalaskurilla</Link>.
      Huoltomaalauksen ajoituksesta kerrotaan artikkelissa{" "}
      <Link to="/artikkelit/kuinka-usein-puutalo-maalataan">kuinka usein puutalo pitää maalata</Link>.
    </p>
    <Figure
      image="puutalon-ja-parvekkeen-huoltomaalaus-jalkeen"
      alt="Puutalo ja parveke huoltomaalauksen jälkeen"
      caption="Sama kohde kunnostuksen ja huoltomaalauksen jälkeen."
    />

    <ArticleFaq items={faq} />
  </>
);

export default Body;
