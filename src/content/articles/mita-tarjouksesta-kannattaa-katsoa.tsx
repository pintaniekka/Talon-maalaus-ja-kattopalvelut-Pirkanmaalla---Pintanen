import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (tarjous sisältää kaiken: työ, maalit, telineet ja nostimet, matkat, siivous;
 * kiinteä hinta; takuu 5 v; maali Nowocoat; maalit kirjataan tarjoukseen), prices.ts includes, tyovaiheet.ts.
 * Kilpailijoista ei väitetä mitään: lista on yleinen tarkistuslista, ja meidän vastauksemme on erikseen.
 */
const faq = [
  {
    question: "Mitä pinnoitustarjouksessa pitää lukea?",
    answer:
      "Kiinteä hinta, mitä hintaan kuuluu, maalin nimi, kerrosten määrä, miten rikkinäiset tiilet hoidetaan, suojaukset, siivous ja takuu kirjallisena.",
  },
  {
    question: "Miten vertaan kahta tarjousta?",
    answer:
      "Vertaa sisältöä, älä pelkkää summaa. Katso, onko molemmissa pesu, kasvustontorjunta, tiilien vaihto, kaksi maalikerrosta ja takuu. Puuttuva rivi on usein lisälasku myöhemmin.",
  },
  {
    question: "Mitä jos tarjouksessa lukee hinta neliöltä?",
    answer: "Kysy, mikä on katon kokonaishinta ja mitä siihen kuuluu. Meidän tarjouksessamme on aina yksi kiinteä summa koko työlle.",
  },
  {
    question: "Onko tarjouksen hyväksyminen sitova?",
    answer: "Kun hyväksyt tarjouksen, teemme kirjallisen sopimuksen ja lähetämme 10 prosentin ennakkolaskun. Tarjouksen pyytäminen ei sido mihinkään.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Katso tarjouksesta kahdeksan asiaa: hinta, sisältö, maali, kerrokset, tiilet, suojaukset, siivous ja takuu.</li>
        <li>Vertaa tarjousten sisältöä, älä pelkkää summaa.</li>
        <li>Meidän tarjouksessamme on yksi kiinteä hinta, joka sisältää kaiken.</li>
        <li>Tarjouksen pyytäminen ei sido, ja kuntotarkastus on ilmainen.</li>
      </ul>
    </KeyPoints>

    <p>
      Kun pyydät useamman tarjouksen, ne näyttävät erilaisilta. Toisessa on yksi summa, toisessa rivejä.
      Kokosimme listan, jolla luet minkä tahansa pinnoitustarjouksen läpi ja näet, mitä siitä puuttuu.
    </p>

    <h2>Mitä tarjouksesta kannattaa tarkistaa?</h2>
    <Table
      head={["Kohta", "Miksi se on tärkeä", "Meidän tarjouksessa"]}
      rows={[
        ["Kiinteä hinta", "Hinta ei saa muuttua työn aikana", "Yksi kiinteä summa, yleensä 2 850–7 000 €"],
        ["Mitä hintaan kuuluu", "Puuttuva rivi on lisälasku", "Pesu, kasvustontorjunta, tiilien vaihto, maalaus, siivous"],
        ["Maalin nimi", "Maali ratkaisee keston", "Nowocoat"],
        ["Kerrosten määrä", "Yksi kerros ei riitä", "Kaksi kerrosta ruiskulla, reunat käsin"],
        ["Rikkinäiset tiilet", "Kuka hankkii ja maksaa", "Vaihto kuuluu hintaan, tiilien hankinta sovitaan"],
        ["Suojaukset", "Paneelit ja terassit", "Kuuluvat hintaan"],
        ["Siivous", "Pesu irrottaa paljon likaa", "Kuuluu hintaan"],
        ["Takuu", "Kirjallinen takuu on lupaus", "5 vuotta kirjallisena"],
      ]}
      caption="Kahdeksan kohtaa, jotka pinnoitustarjouksesta kannattaa tarkistaa."
    />
    <Avainhuomio>Kahdeksan riviä kertoo, onko tarjous koko työ vai vain osa siitä.</Avainhuomio>

    <h2>Miksi sisältö ratkaisee enemmän kuin summa?</h2>
    <p>
      Pinnoitus on sarja työvaiheita, ja jokainen niistä maksaa. Jos tarjouksesta puuttuu pesu, tiilien vaihto
      tai toinen maalikerros, summa on pienempi, mutta työ on eri työ. Siksi kannattaa katsoa, mitä tarjouksen
      hinta sisältää, ja kysyä puuttuvista riveistä ennen hyväksymistä. Meillä hintaan kuuluu kaikki: pesu
      painepesulla, kasvustontorjunta, rikkinäisten tiilien vaihto, pohjamaali ja pintamaali ruiskulla,
      suojaukset, siivous ja takuu. Työvaiheet kerromme artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/">näin tiilikaton pinnoitus etenee</Link>.
    </p>
    <Avainhuomio>Puuttuva työvaihe tekee tarjouksesta halvemman, mutta työstä eri työn.</Avainhuomio>

    <h2>Mitä tarjouksen pitää kertoa maalista?</h2>
    <p>
      Maalin nimi ja kerrosten määrä. Maali ratkaisee, kuinka kauan pinta kestää, ja kerrosten määrä, kuinka
      tasainen ja tiivis siitä tulee. Meillä maali on Nowocoat, ja kerroksia on aina kaksi: pohjamaali ja
      pintamaali ruiskulla, reunat telalla tai käsin. Maalista kerromme artikkelissa{" "}
      <Link to="/artikkelit/nowocoat-kattomaali/">mikä Nowocoat on</Link>.
    </p>
    <Avainhuomio>Tarjouksessa pitää lukea maalin nimi ja kerrosten määrä, meillä Nowocoat ja kaksi kerrosta.</Avainhuomio>

    <h2>Mitä tarjouksen jälkeen tapahtuu?</h2>
    <p>
      Tarjouksen pyytäminen ei sido mihinkään. Kuntotarkastus on ilmainen, ja saat kirjallisen tarjouksen
      kiinteällä hinnalla. Kun hyväksyt sen vastaamalla tarjousviestiin, teemme kirjallisen sopimuksen, sovimme
      aikataulun ja lähetämme 10 prosentin ennakkolaskun. Loput laskutamme valmiista työstä. Työn kulun
      kerromme artikkelissa{" "}
      <Link to="/artikkelit/tarjouksen-hyvaksymisen-jalkeen/">mitä tarjouksen hyväksymisen jälkeen tapahtuu</Link>, ja
      tarjouksen voit pyytää sivulta <Link to="/tarjouspyynto/">tarjouspyyntö</Link>.
    </p>
    <Avainhuomio>Tarjous on ilmainen eikä sido, ja hyväksymisen jälkeen tulee sopimus ja 10 prosentin ennakko.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
