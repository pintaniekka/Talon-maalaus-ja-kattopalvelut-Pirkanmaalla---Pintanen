import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Kuinka kauan tiilikaton pinnoitus kestää?",
    answer:
      "Tyypillisen omakotitalon, noin 150–200 neliömetrin, tiilikaton pesu ja pinnoitus kestää noin 2–4 työpäivää sääolosuhteista riippuen.",
  },
  {
    question: "Pitääkö työn aikana olla kotona?",
    answer: "Ei tarvitse, kunhan sähkö ja vesipiste ovat käytettävissä.",
  },
  {
    question: "Mitä tapahtuu, jos sovittuna päivänä sataa?",
    answer:
      "Pinnoitusta ei tehdä sateella, koska pintojen on oltava kuivat. Jos sää yllättää, uusi työpäivä sovitaan ilman lisäkuluja.",
  },
  {
    question: "Pitääkö pihaa valmistella ennen työtä?",
    answer:
      "Pintanen suojaa talon ympäristön, terassit ja istutukset. Asukkaan tarvitsee vain siirtää kevyt irtaimisto, kuten pihakalusteet ja ruukut, kauemmas talosta.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Pinnoituksessa on kuusi työvaihetta kuntotarkastuksesta lopputarkastukseen.</li>
        <li>Omakotitalon katto valmistuu yleensä 2–4 työpäivässä.</li>
        <li>Katto maalataan ruiskulla kahteen kertaan.</li>
        <li>Työlle annetaan 5 vuoden kirjallinen takuu.</li>
      </ul>
    </KeyPoints>

    <p>
      Tiilikaton pinnoitus ei ole pelkkä maalaus. Suurin osa työstä tehdään ennen kuin ensimmäinen maalikerros
      ruiskutetaan, ja juuri nämä vaiheet ratkaisevat, kuinka kauan uusi pinta kestää. Tässä artikkelissa käydään
      läpi, miten Pintasen pinnoitus etenee vaihe vaiheelta ja mitä asukkaan kannattaa tietää etukäteen.
    </p>

    <h2>1. Kuntotarkastus ja tarjous</h2>
    <p>
      Työ alkaa maksuttomalla arviokäynnillä. Tiilien lisäksi tarkistetaan aina aluskate ja läpiviennit. Pienet
      aluskatteen vauriot voidaan korjata pinnoituksen yhteydessä. Jos vauriot ovat suurempia, tilanteesta
      kerrotaan suoraan.
    </p>

    <h2>2. Pihan ja rakenteiden suojaus</h2>
    <p>
      Katon pesu irrottaa likaa, joten kriittiset paikat suojataan ennen työn aloittamista. Tavoite on, että piha
      jää yhtä siistiksi kuin se oli ennen työtä.
    </p>

    <h2>3. Katon pesu</h2>
    <p>
      Katto puhdistetaan ammattitason korkeapainepesurilla. Samalla tyhjennetään ja huuhdellaan sadevesikourut
      katolta irtoavasta liasta ja sammalesta.
    </p>
    <Figure
      image="tummanharmaa-kattotiili-pesu-ja-pinnoitustyo"
      alt="Tiilikaton pesu ja pinnoitus käynnissä"
      caption="Pesu ja pinnoitus etenevät lape kerrallaan."
    />

    <h2>4. Kasvustonesto ja tiilten vaihto</h2>
    <p>
      Pestylle katolle levitetään torjunta-aine, joka tuhoaa sammalen itiöt tiilen huokosista asti. Tämän jälkeen
      rikkinäiset tiilet vaihdetaan uusiin. Ilman kasvustonestoa sammal kasvaisi nopeasti uuden maalin läpi.
    </p>

    <h2>5. Kaksinkertainen ruiskumaalaus</h2>
    <p>
      Katto maalataan kahteen kertaan maaliruiskulla. Pintanen käyttää Tikkurilan ja Nowocoatin kattomaaleja.
      Pinnan on ehdittävä kuivua pesun ja maalauskertojen välissä, minkä vuoksi työ jakautuu useammalle päivälle.
    </p>

    <h2>6. Lopputarkastus asiakkaan kanssa</h2>
    <p>
      Työ on valmis vasta, kun kohde on kierretty yhdessä asiakkaan kanssa ja työnjälki on tarkastettu. Pinnoitukselle
      annetaan 5 vuoden kirjallinen takuu.
    </p>
    <Figure
      image="uudenveroinen-punainen-tiilikatto-maalaus-jalkeen"
      alt="Punainen tiilikatto maalauksen jälkeen"
      caption="Valmis pinta kahden maalikerroksen jälkeen."
    />

    <h2>Kuinka kauan työ kestää?</h2>
    <p>
      Tyypillisen omakotitalon, noin 150–200 neliömetrin, katto valmistuu 2–4 työpäivässä. Kesto riippuu säästä,
      koska pinnoitusta ei tehdä sateella ja pintojen on oltava kuivat. Jos sää yllättää, uusi työpäivä sovitaan
      ilman lisäkuluja.
    </p>

    <h2>Mitä asukkaan pitää tehdä?</h2>
    <ul>
      <li>Siirrä kevyt irtaimisto, kuten pihakalusteet ja ruukut, kauemmas talosta.</li>
      <li>Varmista, että sähkö ja vesipiste ovat käytettävissä.</li>
      <li>Kotona ei tarvitse olla työn aikana.</li>
    </ul>
    <p>
      Telineet, nostimet ja turvavarusteet tulevat tekijän mukana. Hinnat löytyvät artikkelista{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-hinta">tiilikaton pinnoituksen hinta</Link> ja palvelun kuvaus
      sivulta <Link to="/tiilikaton-pinnoitus-pirkanmaa">tiilikaton pinnoitus</Link>.
    </p>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
