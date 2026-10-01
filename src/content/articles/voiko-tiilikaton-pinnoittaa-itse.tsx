import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints, Sources } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Voiko tiilikaton maalata itse?",
    answer:
      "Teknisesti voi, mutta kestävää tulosta on vaikea saada ilman oikeaa kalustoa. Pesu, kasvustonesto ja kaksi ruiskutettua maalikerrosta vaativat ammattitason välineet.",
  },
  {
    question: "Saako itse tehdystä pinnoituksesta kotitalousvähennyksen?",
    answer: "Ei saa. Kotitalousvähennyksen saa vain yritykseltä ostetun työn osuudesta.",
  },
  {
    question: "Montako kertaa tiilikatto maalataan?",
    answer: "Betonitiilikatto maalataan kahteen kertaan. Me ruiskumaalaamme katon kaksi kertaa.",
  },
  {
    question: "Mihin aikaan vuodesta tiilikaton voi pinnoittaa?",
    answer:
      "Keväästä pitkälle syksyyn. Lämpötilan pitää olla plussalla, ja pinnan on ehdittävä kuivua pesun ja maalauskertojen välissä.",
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
      Pinnoitus näyttää maasta katsottuna helpolta: pesu ja maali päälle. Onnistuuhan se itsekin, mutta pinnan
      kesto riippuu työvaiheista, joita valmiista katosta ei näe. Käymme läpi, mitä työ vaatii ja mihin
      omatoiminen pinnoitus yleensä kaatuu.
    </p>

    <h2>Mitä tiilikaton pinnoitus vaatii?</h2>
    <ol>
      <li>
        <strong>Pesu.</strong> Tiilen huokosiin kertynyt lika ja sammal pitää saada irti, tai maali ei tartu.
      </li>
      <li>
        <strong>Kasvustonesto.</strong> Torjunta-aine tuhoaa sammaleen itiöt tiilen huokosista.
      </li>
      <li>
        <strong>Rikkinäisten tiilien vaihto.</strong> Haljennutta tiiltä ei kannata maalata.
      </li>
      <li>
        <strong>Kaksi maalikerrosta.</strong> Betonitiilikatto maalataan kahteen kertaan, ja tasaisin jälki tulee
        ruiskulla.
      </li>
    </ol>

    <h2>Mihin omatoiminen pinnoitus yleensä kaatuu?</h2>

    <h3>Pesu jää vajaaksi tai vahingoittaa kattoa</h3>
    <p>
      Liian kevyt pesu jättää lian huokosiin, eikä maali tartu. Väärin tehty pesu taas voi vahingoittaa vanhaa
      kattoa tai painaa vettä tiilten alle.
    </p>

    <h3>Kasvustonesto jää tekemättä</h3>
    <p>
      Ilman ammattitason kasvustonestoainetta sammal kasvaa pian uuden maalin läpi, ja työ on edessä uudelleen.
    </p>

    <h3>Maali levittyy epätasaisesti</h3>
    <p>
      Aaltoilevan tiilen maalaaminen telalla tai siveltimellä on hidasta, ja jälki jää helposti laikukkaaksi.
      Käytämme korkeapaineruiskua, jolla pinnoite levittyy tasaisesti.
    </p>
    <Figure
      image="kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen"
      alt="Kirkkaan punainen tiilikatto pinnoituksen jälkeen"
      caption="Tasainen pinta vaatii huolelliset pohjatyöt ja kaksi maalikerrosta."
    />

    <h2>Onko tiilikaton maalaaminen itse turvallista?</h2>
    <p>
      Märkä tiilikatto on liukas, ja työ kestää useita päiviä. Katolla ei pidä työskennellä ilman turvavarusteita.
      Me tuomme työmaalle telineet, nostimet ja turvavaljaat.
    </p>

    <h2>Paljonko itse tekemällä säästää?</h2>
    <p>
      Vähemmän kuin luulisi. Kalusto pitää ostaa tai vuokrata ja materiaalit hankkia, eikä omasta työstä saa
      kotitalousvähennystä. Ostetussa pinnoituksessa suurin osa laskusta on työtä, josta saa vuosina 2026 ja 2027
      vähentää 40 %. Säännöt ovat artikkelissa{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot">
        kotitalousvähennys katto- ja maalaustöissä
      </Link>
      .
    </p>
    <p>
      Ostetulla työllä on myös takuu. Annamme tiilikaton pinnoitukselle 5 vuoden kirjallisen takuun. Hinnat ovat
      artikkelissa <Link to="/artikkelit/tiilikaton-pinnoituksen-hinta">tiilikaton pinnoituksen hinta</Link> ja
      työvaiheet artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet">näin tiilikaton pinnoitus etenee</Link>.
    </p>

    <h2>Mitä katolle kannattaa tehdä itse?</h2>
    <ul>
      <li>Tarkista keväällä ja syksyllä, että tiilet ovat ehjiä ja paikoillaan.</li>
      <li>Poista roskat ja lehdet räystäskouruista.</li>
      <li>Seuraa, kasvaako sammal ja kuluuko pinta.</li>
    </ul>
    <p>Näin huomaat huollon tarpeen ajoissa.</p>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Tikkurila: Kilpi Tiilikattomaali, tuoteseloste",
          url: "https://tikkurila.fi/sites/default/files/pim/documents/Kilpi_Tiilikattomaali_FI_PDS_Tikkurila.pdf",
        },
      ]}
    />
  </>
);

export default Body;
