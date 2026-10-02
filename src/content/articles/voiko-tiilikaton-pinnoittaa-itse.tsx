import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints, Sources } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Voiko tiilikaton maalata itse?",
    answer:
      "Voi, mutta kestävää tulosta on vaikea saada ilman oikeita välineitä. Katto pitää pestä hyvin, käsitellä kasvustontorjunta-aineella ja maalata kahteen kertaan.",
  },
  {
    question: "Saako itse tehdystä pinnoituksesta kotitalousvähennyksen?",
    answer: "Ei saa. Kotitalousvähennyksen saa vain yritykseltä ostetusta työstä.",
  },
  {
    question: "Montako kertaa tiilikatto maalataan?",
    answer: "Tiilikatto maalataan kahteen kertaan. Me maalaamme katon ruiskulla: ensin pohjamaali ja sitten pintamaali.",
  },
  {
    question: "Mihin aikaan vuodesta tiilikaton voi pinnoittaa?",
    answer:
      "Keväästä pitkälle syksyyn. Lämpötilan pitää olla plussalla, ja katon pitää ehtiä kuivua pesun jälkeen ja maalikerrosten välissä.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Tiilikaton voi pestä ja maalata itse, mutta kestävä tulos vaatii oikeat välineet.</li>
        <li>Katto pitää pestä, käsitellä kasvustontorjunta-aineella ja maalata kahteen kertaan.</li>
        <li>Väärin tehty pesu voi vahingoittaa vanhaa kattoa.</li>
        <li>Itse tehdystä työstä et saa kotitalousvähennystä etkä takuuta.</li>
      </ul>
    </KeyPoints>

    <p>
      Voiko tiilikaton pinnoittaa itse? Voi. Maasta katsottuna työ näyttää helpolta: pesu ja maali päälle. Katon
      kesto riippuu kuitenkin työvaiheista, joita valmiista katosta ei näe. Kerromme, mitä työ vaatii ja missä se
      yleensä menee pieleen.
    </p>

    <h2>Mitä tiilikaton pinnoitus vaatii?</h2>
    <ol>
      <li>
        <strong>Pesu.</strong> Lika ja sammal pitää saada irti tiilen huokosista. Muuten maali ei tartu.
      </li>
      <li>
        <strong>Kasvustontorjunta.</strong> Torjunta-aine tuhoaa sammaleen itiöt tiilen huokosista.
      </li>
      <li>
        <strong>Rikkinäisten tiilien vaihto.</strong> Haljennutta tiiltä ei kannata maalata.
      </li>
      <li>
        <strong>Kaksi maalikerrosta.</strong> Tiilikatto maalataan kahteen kertaan. Tasaisin jälki tulee ruiskulla.
      </li>
    </ol>

    <h2>Missä itse tehty pinnoitus yleensä menee pieleen?</h2>

    <h3>Pesu jää kesken tai vahingoittaa kattoa</h3>
    <p>
      Jos pesu on liian kevyt, lika jää huokosiin eikä maali tartu. Jos pesu tehdään väärin, se voi vahingoittaa
      vanhaa kattoa tai painaa vettä tiilien alle.
    </p>

    <h3>Kasvustontorjunta jää tekemättä</h3>
    <p>
      Ilman ammattilaisten kasvustontorjunta-ainetta sammal kasvaa pian uuden maalin läpi. Silloin sama työ on
      edessä uudestaan.
    </p>

    <h3>Maali jää laikukkaaksi</h3>
    <p>
      Tiili on aaltoileva. Sen maalaaminen telalla tai pensselillä on hidasta, ja jälki jää helposti laikukkaaksi.
      Me käytämme korkeapaineruiskua. Sillä maali leviää tasaisesti.
    </p>
    <Figure
      image="kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen"
      alt="Kirkkaan punainen tiilikatto pinnoituksen jälkeen"
      caption="Tasainen pinta vaatii hyvät pohjatyöt ja kaksi maalikerrosta."
    />

    <h2>Onko tiilikaton maalaaminen itse turvallista?</h2>
    <p>
      Märkä tiilikatto on liukas, ja työ kestää monta päivää. Katolla ei pidä olla ilman turvavarusteita. Me tuomme
      mukanamme telineet, nostimet ja turvavaljaat.
    </p>

    <h2>Paljonko itse tekemällä säästää?</h2>
    <p>
      Vähemmän kuin luulisi. Välineet pitää ostaa tai vuokrata ja maalit hankkia itse. Omasta työstä et saa
      kotitalousvähennystä. Kun ostat pinnoituksen meiltä, suurin osa laskusta on työtä. Siitä saat vuosina 2026 ja
      2027 vähentää 40 %. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot">
        kotitalousvähennys katto- ja maalaustöissä
      </Link>
      .
    </p>
    <p>
      Ostetulla työllä on myös takuu. Saat tiilikaton pinnoitukselle meiltä 5 vuoden kirjallisen takuun. Lue myös{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-hinta">tiilikaton pinnoituksen hinta</Link> ja{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet">näin tiilikaton pinnoitus etenee</Link>.
    </p>

    <h2>Mitä katolle kannattaa tehdä itse?</h2>
    <ul>
      <li>Katso keväällä ja syksyllä, että tiilet ovat ehjiä ja paikoillaan.</li>
      <li>Poista lehdet ja roskat sadevesikouruista.</li>
      <li>Seuraa, kasvaako katolla sammalta ja kuluuko tiilen pinta.</li>
    </ul>
    <p>Näin huomaat ajoissa, kun katto tarvitsee huoltoa.</p>

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
