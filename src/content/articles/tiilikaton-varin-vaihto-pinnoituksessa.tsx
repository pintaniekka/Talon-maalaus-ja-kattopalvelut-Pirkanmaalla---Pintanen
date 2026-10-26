import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts ("Voiko katon värin vaihtaa pinnoituksessa? Kyllä voi. Nowocoatin
 * kattomaaleissa on laaja värivalikoima"), ormax-artikkeli (väri valitaan kuntotarkastuksen yhteydessä), projects.ts
 * (musta, ruskea, tummanharmaa, punainen pinnoitettu katto). Nowocoat-esite 2025: "Saatavana kaikissa perusväreissä",
 * kiiltoaste puolihimmeä. Kunnan lupa-asioista vain yleinen kehotus tarkistaa rakennusvalvonnasta (ei kuntakohtaisia väitteitä).
 */
const faq = [
  {
    question: "Voiko tiilikaton värin vaihtaa pinnoituksessa?",
    answer:
      "Kyllä. Pinnoitus on maalaus, ja uusi väri peittää vanhan. Nowocoatin kattomaaleissa on laaja värivalikoima. Väri valitaan kuntotarkastuksen yhteydessä.",
  },
  {
    question: "Maksaako värin vaihto enemmän?",
    answer:
      "Ei. Maalaamme katon aina kahteen kertaan, ja väri ei muuta työn määrää. Hinta on yleensä 2 850–7 000 euroa.",
  },
  {
    question: "Tarvitsenko luvan katon värin vaihtoon?",
    answer:
      "Monessa kunnassa julkisivun värin vaihto voi vaatia ilmoituksen tai luvan. Tarkista asia oman kuntasi rakennusvalvonnasta ennen kuin päätät värin.",
  },
  {
    question: "Mikä on yleisin kattoväri?",
    answer:
      "Tummanharmaa, musta, tiilenpunainen ja ruskea ovat yleisimmät. Moni pitää vanhan värin, mutta tuoreempana.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Pinnoitus on maalaus, joten katon värin voi vaihtaa samalla työllä.</li>
        <li>Nowocoatin kattomaaleissa on laaja värivalikoima, ja pinta on puolihimmeä.</li>
        <li>Värin vaihto ei nosta hintaa. Maalaamme aina kahteen kertaan.</li>
        <li>Tarkista kuntasi rakennusvalvonnasta, tarvitaanko värin vaihtoon ilmoitus.</li>
      </ul>
    </KeyPoints>

    <p>
      Pinnoitus on tilaisuus vaihtaa katon väri. Moni haluaa saman värin kuin ennen, mutta uutena. Toinen
      haluaa vaaleasta tummanharmaan. Kerromme tässä, miten väri valitaan ja mitä kannattaa ottaa huomioon.
    </p>

    <h2>Miten katon väri valitaan pinnoituksessa?</h2>
    <p>
      Väri valitaan kuntotarkastuksen yhteydessä. Katsomme talon seinien ja räystäiden värin ja naapuruston
      katot. Nowocoatin kattomaaleja on saatavana kaikissa perusväreissä, ja pinta on puolihimmeä. Yleisimmät
      valinnat ovat tummanharmaa, musta, tiilenpunainen ja ruskea. Katso esimerkkejä sivulta{" "}
      <Link to="/referenssit/">kohteet</Link>.
    </p>
    <Table
      head={["Väri", "Mihin se sopii"]}
      rows={[
        ["Tummanharmaa", "Vaaleat ja harmaat talot"],
        ["Musta", "Tummat talot ja moderni ilme"],
        ["Tiilenpunainen", "Keltaiset, valkoiset ja vihreät puutalot"],
        ["Ruskea", "Ruskeat ja beiget talot"],
      ]}
      caption="Yleisimmät kattovärit ja mihin ne sopivat. Lopullinen väri valitaan paikan päällä."
    />
    <Avainhuomio>Väri valitaan kuntotarkastuksessa, ja Nowocoatin maalia on kaikissa perusväreissä.</Avainhuomio>

    <h2>Nostaako värin vaihto pinnoituksen hintaa?</h2>
    <p>
      Ei. Maalaamme katon ruiskulla aina kahteen kertaan: pohjamaali ja pintamaali. Tumman katon maalaaminen
      vaaleaksi tai vaalean tummaksi ei muuta työn määrää. Hinta on yleensä 2 850–7 000 euroa, ja se riippuu
      katon koosta, jyrkkyydestä ja tiilien kunnosta. Hintaesimerkit ovat sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link>.
    </p>
    <Avainhuomio>Värin vaihto on ilmainen, koska katto maalataan joka tapauksessa kahteen kertaan.</Avainhuomio>

    <h2>Tarvitaanko katon värin vaihtoon lupa?</h2>
    <p>
      Katon väri on osa talon julkisivua. Monessa kunnassa julkisivun värin vaihto voi vaatia
      ilmoituksen tai luvan, varsinkin asemakaava-alueella tai suojellussa ympäristössä. Säännöt ovat
      kuntakohtaisia. Kysy oman kuntasi rakennusvalvonnasta ennen kuin päätät uuden värin. Jos pidät saman
      värin, ilmoitusta ei yleensä tarvita, mutta sekin kannattaa varmistaa.
    </p>
    <Avainhuomio>Värin vaihto voi vaatia ilmoituksen rakennusvalvontaan, joten kysy kunnasta ennen päätöstä.</Avainhuomio>

    <h2>Miltä vaihdettu väri näyttää valmiina?</h2>
    <Figure
      image="tiilikaton-pinnoitus-ylojarvi-musta-tiilikatto-jalkeen"
      alt="Musta tiilikatto pinnoituksen jälkeen Ylöjärvellä"
      caption="Musta tiilikatto pinnoituksen jälkeen Ylöjärvellä 2026."
    />
    <p>
      Uusi pinta on tasainen ja puolihimmeä. Reunat ja harjatiilet maalataan samalla värillä telalla tai käsin,
      joten väri on sama joka kohdassa. Varatiilet maalaamme samalla kertaa, jotta ne sopivat kattoon
      myöhemmin. Kaikki työvaiheet kuvaamme artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/">näin tiilikaton pinnoitus etenee</Link>, ja
      palvelun sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Varatiilet maalataan samalla kertaa, jotta uusi väri jatkuu myös myöhemmissä korjauksissa.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
