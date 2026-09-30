import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Voiko tiilikaton maalata itse?",
    answer:
      "Teknisesti voi, mutta kestävän tuloksen saaminen on vaikeaa ilman oikeaa kalustoa. Pesu, kasvustonesto ja kaksi ruiskutettua maalikerrosta vaativat ammattitason välineet.",
  },
  {
    question: "Saako itse tehdystä pinnoituksesta kotitalousvähennyksen?",
    answer: "Ei saa. Kotitalousvähennyksen saa vain yritykseltä ostetun työn osuudesta.",
  },
  {
    question: "Montako kertaa tiilikatto maalataan?",
    answer:
      "Betonitiilikatto maalataan kahteen kertaan. Myös Pintasen pinnoituksessa katto ruiskumaalataan kaksi kertaa.",
  },
  {
    question: "Mihin vuodenaikaan pinnoituksen voi tehdä?",
    answer:
      "Keväästä pitkälle syksyyn. Lämpötilan on oltava plussan puolella, ja pinnan on ehdittävä kuivua pesun ja maalauskertojen välissä.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Tiilikaton voi teknisesti pestä ja maalata itse.</li>
        <li>Kestävä tulos vaatii tehokkaan pesun, kasvustoneston ja kaksi ruiskutettua maalikerrosta.</li>
        <li>Väärät menetelmät voivat vahingoittaa vanhaa kattoa.</li>
        <li>Itse tehdystä työstä ei saa kotitalousvähennystä eikä takuuta.</li>
      </ul>
    </KeyPoints>

    <p>
      Tiilikaton pinnoitus näyttää päältä katsoen yksinkertaiselta: pesu ja maali. Siksi moni harkitsee työn
      tekemistä itse. Se on mahdollista, mutta lopputuloksen kestävyys riippuu vaiheista, jotka eivät näy valmiissa
      pinnassa. Tässä artikkelissa käydään läpi, mitä työ vaatii ja missä omatoiminen pinnoitus yleensä epäonnistuu.
    </p>

    <h2>Mitä pinnoitus vaatii?</h2>
    <ol>
      <li>
        <strong>Pesu.</strong> Tiilen huokosiin kertynyt lika ja sammal on saatava irti, jotta maali tarttuu.
      </li>
      <li>
        <strong>Kasvustonesto.</strong> Torjunta-aine tuhoaa sammalen itiöt tiilen huokosista.
      </li>
      <li>
        <strong>Rikkinäisten tiilien vaihto.</strong> Haljenneita tiiliä ei kannata maalata.
      </li>
      <li>
        <strong>Kaksi maalikerrosta.</strong> Betonitiilikatto maalataan kahteen kertaan, ja tasaisin jälki syntyy
        ruiskulla.
      </li>
    </ol>

    <h2>Kolme kohtaa, joissa omatoiminen työ yleensä kaatuu</h2>

    <h3>Pesu jää vajaaksi tai vahingoittaa kattoa</h3>
    <p>
      Liian kevyt pesu jättää lian huokosiin, jolloin maali ei tartu. Väärin tehty pesu taas voi vahingoittaa
      vanhaa kattoa tai painaa vettä tiilten alle rakenteisiin.
    </p>

    <h3>Kasvustonesto jää tekemättä</h3>
    <p>
      Ilman ammattitason kasvustonestoainetta sammal tunkee nopeasti uuden maalin läpi, ja työ on tehtävä
      uudelleen.
    </p>

    <h3>Maali levittyy epätasaisesti</h3>
    <p>
      Profiloidun tiilen saaminen tasaisesti peittoon telalla tai siveltimellä on hidasta. Ammattilainen käyttää
      korkeapaineruiskua, jolla pinnoite levittyy tasaisesti.
    </p>
    <Figure
      image="kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen"
      alt="Kirkkaan punainen tiilikatto pinnoituksen jälkeen"
      caption="Tasainen pinta vaatii huolelliset pohjatyöt ja kaksi maalikerrosta."
    />

    <h2>Turvallisuus</h2>
    <p>
      Märkä tiilikatto on liukas, ja työ kestää useita päiviä. Katolla ei pidä työskennellä ilman asianmukaisia
      turvavarusteita. Ammattilainen tuo mukanaan telineet, nostimet ja turvavaljaat.
    </p>

    <h2>Mitä itse tekemällä säästää?</h2>
    <p>
      Säästö on pienempi kuin miltä näyttää. Itse tekevä ostaa tai vuokraa kaluston ja hankkii materiaalit,
      eikä omasta työstä saa kotitalousvähennystä. Ammattilaisen tekemässä pinnoituksessa suurin osa
      laskusta on työtä, josta vähennyksen saa. Säännöt on käyty läpi artikkelissa{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot">
        kotitalousvähennys katto- ja maalaustöissä
      </Link>
      .
    </p>
    <p>
      Lisäksi ammattilaisen työllä on takuu. Pintanen antaa tiilikaton pinnoitukselle 5 vuoden kirjallisen takuun.
      Hinnat löytyvät artikkelista{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-hinta">tiilikaton pinnoituksen hinta</Link> ja työvaiheet
      artikkelista{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet">näin tiilikaton pinnoitus etenee</Link>.
    </p>

    <h2>Mitä kannattaa tehdä itse?</h2>
    <ul>
      <li>Tarkista katto keväisin ja syksyisin: ovatko tiilet ehjiä ja paikoillaan?</li>
      <li>Poista roskat ja lehdet räystäskouruista.</li>
      <li>Seuraa sammalen kasvua ja pinnan kulumista.</li>
    </ul>
    <p>
      Näillä toimilla huomaat huollon tarpeen ajoissa. Itse pinnoitus kannattaa jättää tekijälle, jolla on kalusto,
      kokemus ja takuu.
    </p>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
