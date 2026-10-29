import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints } from "@/components/article/ArticleKit";

/**
 * Vastaukset sivuston omista lähteistä: faqData.ts (pinnoitusFAQ, generalFAQ), prices.ts, tyovaiheet.ts, company.ts.
 * Kysymysten järjestys perustuu asiakasviestien aihemääriin (docs/asiakaskysymykset-2026.md). Ei uusia faktoja.
 */
const faq = [
  {
    question: "Paljonko tiilikaton pinnoitus maksaa?",
    answer: "Yleensä 2 850–7 000 euroa. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Hinta sisältää työn, materiaalit ja siivouksen.",
  },
  {
    question: "Kuinka kauan pinnoitus kestää?",
    answer: "Peruskohteen katto valmistuu 2–3 työpäivässä, suuri tai jyrkkä katto 2–4.",
  },
  {
    question: "Milloin tiilikatto pitää pinnoittaa?",
    answer: "Kun pinta on haalistunut tai karhea ja sammal kasvaa nopeasti, yleensä noin 15 vuoden iässä.",
  },
  {
    question: "Saako pinnoituksesta kotitalousvähennyksen?",
    answer: "Kyllä. Vuosina 2026 ja 2027 saat vähentää 40 % työn osuudesta, enintään 2 100 euroa henkilöltä. Omavastuu on 150 euroa.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Pinnoitus maksaa yleensä 2 850–7 000 euroa ja kestää 2–3 päivää.</li>
        <li>Oikea aika on noin 15 vuoden iässä, kun pinta on haalistunut tai karhea.</li>
        <li>Pinnoitus ja maalaus tarkoittavat samaa työtä. Maali on Nowocoat, kaksi kerrosta.</li>
        <li>Kuntotarkastus on ilmainen, takuu 5 vuotta ja kotitalousvähennys 40 % työn osuudesta.</li>
      </ul>
    </KeyPoints>

    <p>
      Kävimme läpi asiakkaidemme viestit ja laskimme, mitä kysytään eniten. Tässä ovat kymmenen yleisintä
      kysymystä tiilikaton pinnoituksesta ja vastaukset niihin lyhyesti.
    </p>

    <h2>1. Paljonko tiilikaton pinnoitus maksaa?</h2>
    <p>
      Yleensä 2 850–7 000 euroa. Yleisin kattokoko, 190–240 m², maksaa yleensä 3 300–3 700 euroa. Hintaan kuuluu
      pesu, kasvustontorjunta, tiilien vaihto, kaksi kerrosta maalia, siivous ja takuu. Hintaesimerkit ovat
      sivulla <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link>.
    </p>
    <Avainhuomio>Yleisin kattokoko maksaa yleensä 3 300–3 700 euroa.</Avainhuomio>

    <h2>2. Onko pinnoitus sama asia kuin maalaus?</h2>
    <p>
      On. Tiilikaton pinnoitus, tiilikaton maalaus ja kattomaalaus tarkoittavat samaa työtä: katto pestään ja
      maalataan kahteen kertaan. Sanat selitämme artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-sanasto/">tiilikaton pinnoituksen sanasto</Link>.
    </p>
    <Avainhuomio>Pinnoitus on maalaus, ja kerroksia on aina kaksi.</Avainhuomio>

    <h2>3. Milloin katto pitää pinnoittaa?</h2>
    <p>
      Kun väri on haalistunut, pinta tuntuu karhealta tai sammal palaa pian pesun jälkeen. Yleensä tämä on
      ajankohtaista noin 15 vuoden iässä. Ajoissa tehty pinnoitus estää pakkasrapautumisen.
    </p>
    <Avainhuomio>Noin 15 vuoden iässä pinta on kulunut, mutta tiilet ovat vielä ehjiä.</Avainhuomio>

    <h2>4. Kuinka kauan työ kestää?</h2>
    <p>
      Peruskohteen katto valmistuu 2–3 työpäivässä. Pesun jälkeen katto saa kuivua ennen maalausta. Sade voi
      siirtää päivää, mutta hinta ei muutu.
    </p>
    <Avainhuomio>Kaksi tai kolme työpäivää riittää peruskohteeseen.</Avainhuomio>

    <h2>5. Kannattaako pinnoittaa vai uusia katto?</h2>
    <p>
      Pinnoitus riittää, jos aluskate ja rakenteet ovat kunnossa ja vain tiilen pinta on kulunut. Jos aluskate
      vuotaa tai tiilet ovat laajalti rikki, katto kannattaa uusia. Kattoremontti maksaa yleensä 15 000–30 000
      euroa. Vertailun teemme artikkelissa{" "}
      <Link to="/artikkelit/pinnoitus-vai-uusi-katto/">tiilikattoremontti vai pinnoitus</Link>.
    </p>
    <Avainhuomio>Aluskate ratkaisee: kunnossa oleva aluskate tarkoittaa pinnoitusta, vuotava remonttia.</Avainhuomio>

    <h2>6. Mitä maalia käytätte ja voiko värin vaihtaa?</h2>
    <p>
      Maali on Nowocoat, ja siinä on laaja värivalikoima. Värin voi vaihtaa, eikä se nosta hintaa. Kerromme
      väreistä artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-varin-vaihto-pinnoituksessa/">tiilikaton värin vaihto</Link>.
    </p>
    <Avainhuomio>Nowocoatin värit ovat kaikki perusvärit, ja vaihto on ilmainen.</Avainhuomio>

    <h2>7. Vaihdatteko rikkinäiset tiilet?</h2>
    <p>
      Kyllä, ennen maalausta, ja vaihto kuuluu hintaan. Varatiilet käytämme ensin. Muuten hankit tiilet itse tai
      haemme ne sovittua lisähintaa vastaan. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/rikkinaiset-tiilet-pinnoituksessa/">rikkinäiset tiilet pinnoituksessa</Link>.
    </p>
    <Avainhuomio>Tiilien vaihto kuuluu hintaan, ja varatiilet ovat edullisin tapa.</Avainhuomio>

    <h2>8. Saako kotitalousvähennyksen?</h2>
    <p>
      Saa. Vuosina 2026 ja 2027 vähennys on 40 % työn osuudesta, enintään 2 100 euroa henkilöltä, ja omavastuu
      150 euroa. Työn osuus on laskussa eriteltynä. Lue lisää sivulta{" "}
      <Link to="/kotitalousvahennys/">kotitalousvähennys</Link>.
    </p>
    <Avainhuomio>Vähennys on 40 prosenttia työn osuudesta ja enintään 2 100 euroa henkilöltä.</Avainhuomio>

    <h2>9. Milloin pääsette katsomaan katon?</h2>
    <p>
      Yleensä samalla viikolla, tarvittaessa myös iltaisin tai viikonloppuisin. Kuntotarkastus on ilmainen, ja sinun on hyvä
      olla paikalla. Tarjouksen saat myös etänä, kun lähetät kuvat katosta ja arvion sen koosta. Saat
      kirjallisen tarjouksen kiinteällä hinnalla. Pinnoitukset teemme huhti–toukokuusta elo–syyskuuhun.
    </p>
    <Avainhuomio>Kuntotarkastus onnistuu yleensä samalla viikolla ja on ilmainen.</Avainhuomio>

    <h2>10. Miten maksu ja takuu toimivat?</h2>
    <p>
      Hyväksymisen jälkeen tulee 10 prosentin ennakkolasku. Loput laskutamme, kun työ on valmis ja käyty yhdessä
      läpi. Takuu on 5 vuotta kirjallisena. Työn kulun kerromme artikkelissa{" "}
      <Link to="/artikkelit/tarjouksen-hyvaksymisen-jalkeen/">mitä tarjouksen hyväksymisen jälkeen tapahtuu</Link>, ja
      palvelun esittelemme sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-sastamala-punainen-tiilikatto-jalkeen"
      ratio="3/4"
      alt="Punainen tiilikatto pinnoituksen jälkeen Sastamalassa"
      caption="Pinnoitettu tiilikatto Sastamalassa 2026."
    />
    <Avainhuomio>Ennakko on 10 prosenttia, loput valmiista työstä, ja takuu on 5 vuotta.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
