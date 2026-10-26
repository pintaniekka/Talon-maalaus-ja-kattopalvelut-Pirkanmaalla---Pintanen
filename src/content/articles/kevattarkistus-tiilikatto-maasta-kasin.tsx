import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (merkit: haalistunut väri, karhea pinta, nopeasti palaava sammal; kuntotarkastus
 * ilmainen ja samalla viikolla), ormax-artikkeli (valmistaja neuvoo tarkistamaan tiilet kovan talven jälkeen ja poistamaan
 * lehdet ja roskat vuosittain). Ohje on maasta käsin: ei kehoteta kiipeämään katolle.
 */
const faq = [
  {
    question: "Mitä katosta voi tarkistaa maasta käsin?",
    answer:
      "Värin, sammaleen, rikkinäiset tiilet, harjatiilien asennon, kourujen roskat ja piipun pellitykset. Kiikarilla tai puhelimen kameran zoomilla näkee yllättävän paljon.",
  },
  {
    question: "Pitääkö katolle kiivetä itse?",
    answer: "Ei kannata. Märkä tai sammaleinen tiili on liukas. Jos maasta näkyy jotain epäilyttävää, tulemme katsomaan ilmaiseksi.",
  },
  {
    question: "Mitä teen, jos kourun pohjalla on hiekkaa?",
    answer:
      "Hiekka on tiilen pinnasta irronnutta ainesta. Se on merkki, että pinta on kulunut ja imee vettä. Silloin kannattaa varata kuntotarkastus.",
  },
  {
    question: "Milloin kevättarkistus kannattaa tehdä?",
    answer: "Heti lumien sulettua, huhtikuussa. Silloin talven vauriot näkyvät, ja kesän työ ehtii vielä kalenteriin.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Katso katto keväällä maasta käsin kiikarilla tai kameran zoomilla. Katolle ei tarvitse kiivetä.</li>
        <li>Kuusi asiaa: väri, sammal, rikkinäiset tiilet, harjatiilet, kourut ja piipun pellitykset.</li>
        <li>Kourun pohjalla oleva hiekka kertoo, että tiilen pinta on kulunut.</li>
        <li>Jos jokin näistä näkyy, varaa ilmainen kuntotarkastus.</li>
      </ul>
    </KeyPoints>

    <p>
      Talvi on katon kovin koetus. Kun lumi sulaa, kannattaa kävellä talon ympäri ja katsoa katto rauhassa.
      Kokosimme listan, jonka voi käydä läpi maasta käsin kymmenessä minuutissa.
    </p>

    <h2>Mitä katsot katosta keväällä?</h2>
    <Table
      head={["Kohde", "Mitä etsit", "Mitä se tarkoittaa"]}
      rows={[
        ["Väri", "Haalistuneet tai laikukkaat lappeet", "Tehdaspinta on kulunut"],
        ["Sammal ja jäkälä", "Vihreää tai harmaata tiilten raoissa, varsinkin pohjoislappeella", "Pinta pitää kosteutta"],
        ["Rikkinäiset tiilet", "Halkeamia, lohjenneita kulmia, siirtyneitä tiiliä", "Vesi pääsee aluskatteelle"],
        ["Harjatiilet", "Vinossa tai irti", "Kiinnitys tai harjatiiviste pettänyt"],
        ["Kourut", "Hiekkaa, roskia, tulvivat kourut", "Tiilen pinta irtoaa, vesi ei pääse pois"],
        ["Piippu ja läpiviennit", "Irronneet pellit, ruostejäljet, raot", "Yleisin vuotokohta"],
      ]}
      caption="Kevättarkistus maasta käsin. Jos yksikin kohta näkyy, kannattaa varata kuntotarkastus."
    />
    <Avainhuomio>Kuusi kohtaa riittää, ja kaikki näkee maasta kiikarilla.</Avainhuomio>

    <h2>Miksi kourun hiekka on tärkein merkki?</h2>
    <p>
      Kun betonitiilen tehdaspinta kuluu, pinnasta irtoaa hienoa ainesta, joka valuu sateen mukana kouruun.
      Jos kourun pohjalla on hiekkaa, pinta on kulunut ja imee vettä. Tämä on pakkasrapautumisen alku, ja
      juuri silloin pinnoitus kannattaa: tiilet ovat vielä ehjiä, ja uusi pinta pysäyttää kulumisen. Lue
      lisää artikkelista <Link to="/artikkelit/pakkasrapautuminen-tiilikatto/">pakkasrapautuminen tiilikatolla</Link>.
    </p>
    <Avainhuomio>Kourun hiekka on kulumisen ensimmäinen merkki, ja silloin pinnoitus on vielä edullisin vaihtoehto.</Avainhuomio>

    <h2>Mitä voit tehdä itse?</h2>
    <ul>
      <li>Puhdista kourut roskista keväällä ja syksyllä. Tulviva kouru kastelee räystään.</li>
      <li>Poista katolle pudonneet oksat ja lehdet, jos siihen yltää turvallisesti tikkailta.</li>
      <li>Katso ullakolta, näkyykö aluskatteessa vesijälkiä tai valoa läpivientien ympärillä.</li>
      <li>Ota kuvia. Kuvista on hyötyä, kun soitat meille.</li>
    </ul>
    <p>
      Katolle ei kannata kiivetä. Märkä tai sammaleinen tiili on liukas, ja rikkinäinen tiili voi pettää jalan
      alla. Kattotiilen valmistaja neuvoo tarkistamaan tiilet kovan talven jälkeen, ja me teemme sen
      puolestasi.
    </p>
    <Figure
      image="tiilikaton-pesu-sammaleinen-tiilikatto-ennen"
      alt="Sammaleinen tiilikatto ennen pesua ja pinnoitusta"
      caption="Sammaleinen tiilikatto keväällä. Sammal näkyy maasta ja kertoo, että pinta pitää kosteutta."
    />
    <Avainhuomio>Kourujen puhdistus ja ullakon vilkaisu ovat kaksi turvallista tehtävää, katolle kiipeäminen ei.</Avainhuomio>

    <h2>Milloin kannattaa soittaa meille?</h2>
    <p>
      Kun yksikin listan kohta näkyy. Kuntotarkastus on ilmainen, ja tulemme yleensä samalla viikolla, myös
      iltaisin ja viikonloppuisin. Tarkistamme katolla tiilet, saumat, piipun ympäryksen, läpiviennit ja
      aluskatteen ja kerromme suoraan, mitä katto tarvitsee. Jos pinnoitus on ajankohtainen, se maksaa yleensä
      2 850–7 000 euroa. Varaa aika sivulta <Link to="/ilmainen-kuntotarkastus/">ilmainen kuntotarkastus</Link>,
      ja lue, mitä tarkastuksessa katsomme, artikkelista{" "}
      <Link to="/artikkelit/tiilikaton-kuntotarkastus-mita-tarkistamme/">tiilikaton kuntotarkastus</Link>.
    </p>
    <Avainhuomio>Yksi näkyvä merkki riittää syyksi ilmaiseen kuntotarkastukseen, joka onnistuu yleensä samalla viikolla.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
