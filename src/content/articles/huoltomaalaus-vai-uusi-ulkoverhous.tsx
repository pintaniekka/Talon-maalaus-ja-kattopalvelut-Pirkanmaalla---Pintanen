import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Voiko pahasti hilseilevän talon vielä maalata?",
    answer:
      "Yleensä voi, jos puu maalin alla on kovaa eikä lahoa. Kaavimme irtoavan maalin pois, pesemme seinän ja pohjamaalaamme paljaat kohdat ennen pintamaalia.",
  },
  {
    question: "Mitä tehdään, jos maalin alta löytyy lahoa?",
    answer: "Kerromme lahovaurioista sinulle ennen kuin jatkamme työtä.",
  },
  {
    question: "Kuinka kauan talon ulkomaalaus kestää?",
    answer: "Yleensä 3–7 päivää. Aika riippuu talon koosta ja pohjatöiden määrästä.",
  },
  {
    question: "Kuinka pitkä takuu talon maalauksella on?",
    answer: "Saat talon maalaukselle meiltä 2 vuoden takuun.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Jos puu maalin alla on kovaa eikä lahoa, ulkoverhousta ei yleensä tarvitse uusia.</li>
        <li>Hilseilevä maali korjataan pohjatöillä ja uudella maalilla.</li>
        <li>Puun kunnon voit tarkistaa itse ruuvitaltalla.</li>
        <li>Huoltomaalaus maksaa murto-osan uuden laudoituksen hinnasta.</li>
      </ul>
    </KeyPoints>

    <p>
      Talon maali hilseilee pahasti, ja mietit, pitääkö koko ulkoverhous uusia. Useimmiten ei pidä. Maalin kunto ja
      puun kunto ovat kaksi eri asiaa. Uutta lautaa tarvitaan vain, jos puu on pilalla.
    </p>

    <h2>Huoltomaalaus vai uusi ulkoverhous: kumpi riittää?</h2>
    <p>
      Jos puu on maalin alla kovaa eikä lahoa, ulkoverhousta ei yleensä tarvitse uusia. Hilseilevä, haalistunut tai
      likainen maali näyttää pahalta. Se saadaan kuitenkin kuntoon pohjatöillä ja uudella maalilla.
    </p>

    <h2>Miten voit tarkistaa puun kunnon?</h2>
    <ol>
      <li>Paina puuta ruuvitaltalla. Terve puu on kovaa. Laho puu antaa periksi.</li>
      <li>Tarkista alimmat laudat, ikkunoiden alapuolet ja nurkat. Niissä vesi viipyy pisimpään.</li>
      <li>Katso lautojen päät ja saumat. Halkeamat ja tummat kohdat kertovat kosteudesta.</li>
    </ol>
    <Figure
      image="puutalon-ja-parvekkeen-puuosien-kunnostus-ennen"
      alt="Puutalon ja parvekkeen puuosat ennen kunnostusta"
      caption="Puuosat ennen kunnostusta ja huoltomaalausta."
    />

    <h2>Milloin huoltomaalaus riittää?</h2>
    <p>Huoltomaalaus riittää, kun</p>
    <ul>
      <li>maali hilseilee, mutta puu sen alla on kovaa</li>
      <li>väri on haalistunut tai maali jää käteen pölynä</li>
      <li>seinässä on homepilkkuja tai likaa.</li>
    </ul>
    <p>
      Pesemme seinät homepesuaineella ja harjoilla. Kaavimme irtoavan maalin pois. Pohjamaalaamme paljaat
      puukohdat ja maalaamme pintamaalin pensselillä. Näillä pohjatöillä vanhakin seinä saadaan kuntoon.
    </p>

    <h2>Milloin ulkoverhous pitää uusia?</h2>
    <p>
      Ulkoverhous pitää uusia, kun lahoa on laajasti. Lahon puun maalaaminen ei auta, koska kosteus on jo puun
      sisällä. Jos löydämme pohjatöiden aikana lahoa, kerromme siitä sinulle ennen kuin jatkamme.
    </p>

    <h2>Paljonko huoltomaalaus maksaa?</h2>
    <p>
      Huoltomaalaus maksaa vain murto-osan uuden laudoituksen hinnasta. Samalla vältät ison rakennusprojektin.
      Yksikerroksisen omakotitalon maalaus maksaa meillä noin 3 500–6 000 euroa ja kaksikerroksisen noin
      7 000–11 000 euroa. Työ kestää yleensä 3–7 päivää. Saat maalaukselle 2 vuoden takuun.
    </p>
    <p>
      Suuntaa antavan hinnan omalle talollesi saat{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa">maalauksen hintalaskurilla</Link>. Lue myös{" "}
      <Link to="/artikkelit/kuinka-usein-puutalo-maalataan">kuinka usein puutalo pitää maalata</Link> ja katso
      palvelu sivulta <Link to="/talon-maalaus-pirkanmaa">talon maalaus Pirkanmaalla</Link>.
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
