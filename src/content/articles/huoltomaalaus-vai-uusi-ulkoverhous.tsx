import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Voiko pahasti hilseilevän talon vielä maalata?",
    answer:
      "Yleensä voi, jos puu maalin alla on kovaa eikä lahoa. Hilseilevä maali kaavitaan pois, seinä pestään ja paljaat kohdat pohjamaalataan ennen pintamaalia.",
  },
  {
    question: "Mitä tehdään, jos maalin alta löytyy lahoa?",
    answer:
      "Ilmoitamme löytyneistä lahovaurioista asiakkaalle ennen kuin jatkamme työtä.",
  },
  {
    question: "Kuinka kauan talon ulkomaalaus kestää?",
    answer: "Yleensä 3–7 päivää talon koon ja pohjatöiden määrän mukaan.",
  },
  {
    question: "Kuinka pitkä takuu maalaukselle annetaan?",
    answer: "Annamme talon maalauksille 2 vuoden takuun.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Jos puu maalin alla on kovaa eikä lahoa, verhousta ei yleensä tarvitse uusia.</li>
        <li>Kunnon pohjatöillä vanhakin paneeli saadaan kuntoon.</li>
        <li>Lahot laudat vaihdetaan yksitellen.</li>
        <li>Huoltomaalaus maksaa murto-osan uuden laudoituksen hinnasta.</li>
      </ul>
    </KeyPoints>

    <p>
      Pahasti hilseilevä seinä saa monen miettimään koko ulkoverhouksen uusimista. Useimmiten se on liian järeä
      ratkaisu. Maalin kunto ja puun kunto ovat eri asia, ja uutta lautaa tarvitaan vain, jos puu on pilalla.
    </p>

    <h2>Milloin ulkoverhous pitää uusia ja milloin maalaus riittää?</h2>
    <p>
      Jos puu on maalin alla vielä kovaa eikä lahoa, verhousremontti on usein turha. Hilseilevä, haalistunut tai
      likainen maali näyttää pahalta, mutta se korjataan pohjatöillä ja uudella maalilla.
    </p>

    <h2>Miten puun kunnon voi tarkistaa?</h2>
    <ol>
      <li>Paina puuta ruuvitaltalla. Terve puu on kovaa, laho antaa periksi.</li>
      <li>Tarkista alimmat laudat, ikkunoiden alapuolet ja nurkat. Niissä vesi viipyy pisimpään.</li>
      <li>Katso lautojen päät ja saumat. Halkeilleet ja tummuneet kohdat kertovat kosteudesta.</li>
    </ol>
    <Figure
      image="puutalon-ja-parvekkeen-puuosien-kunnostus-ennen"
      alt="Puutalon ja parvekkeen puuosat ennen kunnostusta"
      caption="Puuosat ennen kunnostusta ja huoltomaalausta."
    />

    <h2>Milloin huoltomaalaus riittää?</h2>
    <ul>
      <li>Maali hilseilee, mutta puu sen alla on kovaa.</li>
      <li>Väri on haalistunut tai pinta liituuntuu.</li>
      <li>Seinässä on homepilkkuja tai pinttynyttä likaa.</li>
      <li>Lahoa on vain yksittäisissä laudoissa.</li>
    </ul>
    <p>
      Pesemme julkisivun homepesuaineella, kaavimme irtoilevan maalin pois, vaihdamme vaurioituneet puuosat ja
      pohjamaalaamme paljaat puupinnat ennen pintamaalia. Näillä pohjatöillä vanhakin paneeli saadaan pelastettua.
    </p>

    <h2>Milloin laudoitus pitää uusia?</h2>
    <p>
      Kun lahoa on niin laajasti, ettei yksittäisten lautojen vaihtaminen riitä. Lahon puun maalaaminen ei auta,
      koska kosteus on jo puun sisällä. Jos pohjatöiden aikana löytyy lahovaurioita, ilmoitamme niistä ennen kuin
      jatkamme.
    </p>

    <h2>Paljonko huoltomaalaus maksaa?</h2>
    <p>
      Huoltomaalaus maksaa vain murto-osan uuden laudoituksen hinnasta, ja samalla välttyy isolta
      rakennusprojektilta. Yksikerroksisen omakotitalon maalaus maksaa meillä noin 3 500–6 000 euroa ja
      kaksikerroksisen noin 7 000–11 000 euroa. Työ kestää yleensä 3–7 päivää, ja annamme maalaukselle 2 vuoden
      takuun.
    </p>
    <p>
      Oman talosi arvion saat <Link to="/talon-maalaus-hinta-pirkanmaa">maalauksen hintalaskurilla</Link>.
      Maalauksen ajoituksesta kerromme artikkelissa{" "}
      <Link to="/artikkelit/kuinka-usein-puutalo-maalataan">kuinka usein puutalo pitää maalata</Link>, ja palvelu
      on kuvattu sivulla <Link to="/talon-maalaus-pirkanmaa">talon maalaus Pirkanmaalla</Link>.
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
