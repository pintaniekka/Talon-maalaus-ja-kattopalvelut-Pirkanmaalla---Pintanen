import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Kuinka kauan tiilikaton pinnoitus kestää?",
    answer:
      "Tavallisen omakotitalon, noin 150–200 neliön, tiilikaton pesu ja pinnoitus kestää 2–4 työpäivää säästä riippuen.",
  },
  {
    question: "Pitääkö työn aikana olla kotona?",
    answer: "Ei tarvitse, kunhan sähkö ja vesipiste ovat käytettävissä.",
  },
  {
    question: "Mitä tapahtuu, jos sovittuna päivänä sataa?",
    answer:
      "Sateella emme pinnoita, koska pintojen pitää olla kuivat. Sovimme uuden työpäivän ilman lisäkuluja.",
  },
  {
    question: "Pitääkö pihaa valmistella ennen työtä?",
    answer:
      "Teemme tarvittavat suojaukset itse. Riittää, että siirrät pihakalusteet, ruukut ja muun kevyen irtaimiston kauemmas talosta.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Pinnoituksessa on kuusi työvaihetta kuntotarkastuksesta lopputarkastukseen.</li>
        <li>Omakotitalon katto valmistuu 2–4 työpäivässä.</li>
        <li>Katto ruiskumaalataan kahteen kertaan.</li>
        <li>Työlle tulee 5 vuoden kirjallinen takuu.</li>
      </ul>
    </KeyPoints>

    <p>
      Suurin osa pinnoitustyöstä tehdään ennen kuin katolle ruiskutetaan ensimmäistäkään maalikerrosta. Pesu,
      kasvustonesto ja tiilten vaihto määräävät, kuinka kauan uusi pinta kestää. Näin työ etenee meillä.
    </p>

    <h2>1. Kuntotarkastus ja tarjous</h2>
    <p>
      Aloitamme maksuttomalla arviokäynnillä. Tarkistamme tiilien lisäksi aina aluskatteen ja läpiviennit. Pienet
      aluskatteen vauriot korjaamme pinnoituksen yhteydessä. Jos vauriot ovat isompia, kerromme sen suoraan.
    </p>

    <h2>2. Tarvittavat suojaukset</h2>
    <p>
      Pesussa katolta irtoaa likaa, joten teemme ensin kohteen vaatimat suojaukset. Jätämme pihan yhtä
      siistiksi kuin se oli tullessamme.
    </p>

    <h2>3. Katon pesu</h2>
    <p>
      Pesemme katon ammattitason painepesurilla. Samalla tyhjennämme ja huuhtelemme sadevesikourut katolta
      irtoavasta liasta ja sammaleesta.
    </p>
    <Figure
      image="tummanharmaa-kattotiili-pesu-ja-pinnoitustyo"
      alt="Tiilikaton pesu ja pinnoitus käynnissä"
      caption="Pesu ja pinnoitus etenevät lape kerrallaan."
    />

    <h2>4. Kasvustonesto ja tiilten vaihto</h2>
    <p>
      Levitämme pestylle katolle torjunta-aineen, joka tuhoaa sammaleen itiöt tiilen huokosista asti. Sen jälkeen
      vaihdamme rikkinäiset tiilet uusiin. Ilman kasvustonestoa sammal kasvaisi pian uuden maalin läpi.
    </p>

    <h2>5. Kaksi ruiskumaalauskertaa</h2>
    <p>
      Maalaamme katon kahteen kertaan maaliruiskulla. Käytämme Tikkurilan ja Nowocoatin kattomaaleja. Pinnan pitää
      kuivua pesun ja maalauskertojen välissä, ja siksi työ jakautuu useammalle päivälle.
    </p>

    <h2>6. Lopputarkastus yhdessä asiakkaan kanssa</h2>
    <p>
      Työ on valmis, kun olemme kiertäneet kohteen yhdessä ja tarkastaneet työnjäljen. Annamme pinnoitukselle 5
      vuoden kirjallisen takuun.
    </p>
    <Figure
      image="uudenveroinen-punainen-tiilikatto-maalaus-jalkeen"
      alt="Punainen tiilikatto maalauksen jälkeen"
      caption="Valmis pinta kahden maalikerroksen jälkeen."
    />

    <h2>Kuinka kauan tiilikaton pinnoitus kestää?</h2>
    <p>
      Tavallisen omakotitalon, noin 150–200 neliön, katto valmistuu 2–4 työpäivässä. Aikataulu riippuu säästä,
      koska sateella emme pinnoita. Jos sää yllättää, sovimme uuden päivän ilman lisäkuluja.
    </p>

    <h2>Mitä asukkaan pitää tehdä ennen työtä?</h2>
    <ul>
      <li>Siirrä pihakalusteet, ruukut ja muu kevyt irtaimisto kauemmas talosta.</li>
      <li>Varmista, että sähkö ja vesipiste ovat käytettävissä.</li>
      <li>Kotona ei tarvitse olla työn aikana.</li>
    </ul>
    <p>
      Tuomme telineet, nostimet ja turvavarusteet mukanamme. Hinnat ovat artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-hinta">tiilikaton pinnoituksen hinta</Link>, ja palvelu on
      kuvattu sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
