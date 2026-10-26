import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Aihe asiakasviesteistä (17.3.–19.10.2026): yleisin pyyntö on "tiilikaton pesu ja pinnoitus", ja moni kysyy
 * pelkkää pesua tai putsausta. Faktat ovat sivuston omia: pesu kuuluu aina pinnoitukseen, tehdaspinta,
 * pakkasrapautuminen, kaksi maalikerrosta, hinnat prices.ts:stä.
 */
const faq = [
  {
    question: "Teettekö pelkkiä tiilikaton pesuja?",
    answer:
      "Teemme pesun aina pinnoituksen yhteydessä. Pesu on työn ensimmäinen vaihe, ja sen jälkeen katto maalataan kahteen kertaan.",
  },
  {
    question: "Onko katon putsaus, puhdistus ja pesu sama asia?",
    answer:
      "Kyllä. Asiakkaat käyttävät kaikkia näitä sanoja. Me pesemme katon painepesulla ja levitämme kasvustontorjunta-aineen, joka pitää sammaleen poissa.",
  },
  {
    question: "Miksi sammal palaa katolle pesun jälkeen?",
    answer:
      "Kulunut tiilen pinta on karhea ja imee vettä. Siihen sammal tarttuu uudelleen. Uusi maalipinta on tiivis, ja siihen sammal ei saa otetta.",
  },
  {
    question: "Vahingoittaako sammal tiilikattoa?",
    answer:
      "Kyllä. Sammal pitää tiilen märkänä. Talvella vesi jäätyy tiilen sisällä ja rikkoo sen. Siksi sammaleinen katto kannattaa hoitaa ennen pakkasia.",
  },
  {
    question: "Kuinka kauan pesu ja pinnoitus kestää?",
    answer: "Peruskohteen katto valmistuu 2–3 työpäivässä. Pesun jälkeen katto saa kuivua ennen maalausta.",
  },
  {
    question: "Paljonko tiilikaton pesu ja pinnoitus maksaa?",
    answer:
      "Yleensä 2 850–7 000 €. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Hintaan kuuluu pesu, rikkinäisten tiilien vaihto, kaksi maalikerrosta ja siivous.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Sammal kasvaa tiilikatolle, kun tehdaspinta on kulunut, yleensä noin 15 vuoden iässä.</li>
        <li>Pesu poistaa sammaleen ja lian, mutta kulunut tiilen pinta imee vettä heti seuraavalla sateella.</li>
        <li>Siksi pesun jälkeen katto maalataan kahteen kertaan. Teemme pesun aina pinnoituksen yhteydessä.</li>
        <li>Peruskohteen katto valmistuu 2–3 työpäivässä, ja hinta on yleensä 2 850–7 000 €.</li>
        <li>Pinnoitettu katto kestää jopa 15 vuotta pidempään.</li>
      </ul>
    </KeyPoints>

    <p>
      Moni soittaa meille ja pyytää katon pesua tai putsausta. Sammal näkyy kauas, ja pesty katto näyttää hetken
      hyvältä. Kerromme aina saman asian: pesu on vasta alku. Jos tiilen pinta on kulunut, pelkkä pesu ei auta
      pitkään.
    </p>

    <h2>Miksi tiilikatolle kasvaa sammalta?</h2>
    <p>
      Uuden kattotiilen pinta on tehtaalla tehty tiiviiksi. Vesi valuu siitä pois, eikä sammal saa otetta. Pinta
      kuluu auringossa ja sateessa, Pirkanmaalla yleensä noin 15 vuodessa. Sen jälkeen tiili on karhea ja imee
      vettä. Märkään ja karheaan pintaan sammal ja jäkälä tarttuvat helposti.
    </p>
    <p>
      Varjoisa katon lape, metsän läheisyys ja puiden alla oleva katto nopeuttavat kasvua. Pohjoislape on usein
      vihreä, kun etelälape on vielä puhdas.
    </p>

    <h2>Mitä sammal tekee tiilikatolle?</h2>
    <p>
      Sammal toimii kuin sieni. Se imee sadeveden ja pitää tiilen märkänä päiviä sateen jälkeen. Talvella vesi
      jäätyy tiilen huokosissa ja laajenee. Tiili halkeaa tai sen pinta lohkeilee. Tätä kutsutaan
      pakkasrapautumiseksi.
    </p>
    <p>
      Paksu sammal padottaa myös vettä tiilten saumoissa. Vesi voi nousta tiilen alle ja rasittaa aluskatetta.
      Siksi sammal on muutakin kuin ulkonäköhaitta.
    </p>
    <Figure
      image="tiilikaton-pesu-sammaleinen-tiilikatto-ennen"
      alt="Sammaleinen tiilikatto ennen pesua ja pinnoitusta"
      caption="Sammal peittää tiilet ja pitää ne märkinä. Tällainen katto rapautuu talvella."
    />

    <h2>Miten sammal poistetaan tiilikatolta?</h2>
    <p>
      Pesemme katon painepesulla. Lika, sammal ja jäkälä lähtevät tiilistä, ja samalla huuhtelemme sadevesikourut.
      Kourujen syöksyihin laitamme suodatinkankaat, jotta sammal ei tuki putkia. Pesun jälkeen levitämme katolle
      kasvustontorjunta-aineen. Se tappaa itiöt, jotka jäävät tiilen huokosiin, ja pitää sammaleen poissa paljon
      pidempään kuin pelkkä pesu. Rikkinäiset tiilet vaihdamme uusiin pesun jälkeen, kun ne näkyvät kunnolla.
    </p>
    <Figure
      image="tiilikaton-pesu-ja-pinnoitus-tampere-pesu-kesken"
      alt="Tiilikaton pesu käynnissä Tampereella, puolet katosta pesty"
      caption="Pesu kesken: vasen puoli on pesty, oikea odottaa vuoroaan."
    />

    <h2>Miksi pelkkä pesu ei riitä?</h2>
    <p>
      Uuden tiilen pinnalla on tehtaalla tehty tiivis pinta. Se kuluu noin 15 vuodessa pois. Kun pinta on
      kulunut, tiili imee vettä jokaisella sateella. Talvella vesi jäätyy tiilen sisällä ja rikkoo sen. Pesu
      poistaa kasvuston, mutta pinta pysyy karheana ja imee vettä, vaikka katto olisi juuri pesty. Sammal tarttuu
      karheaan pintaan uudelleen.
    </p>
    <p>
      Uusi maalipinta tekee sen, mihin pesu ei pysty: se pitää veden tiilen ulkopuolella. Siksi pesemme katon aina
      ennen maalausta, ja maalaamme sen aina pesun jälkeen.
    </p>

    <Avainhuomio>Tiilen tehdaspinta kuluu noin 15 vuodessa, ja sen jälkeen vain uusi maalipinta pitää veden pois.</Avainhuomio>
    <h2>Miten pesu ja pinnoitus etenevät?</h2>
    <ol>
      <li>Ilmainen kuntotarkastus. Tarkistamme tiilet, saumat, piipun ympäryksen, läpiviennit ja aluskatteen.</li>
      <li>Kirjallinen tarjous kiinteällä hinnalla. Kun hyväksyt sen, sovimme työn ajankohdan.</li>
      <li>Suojaus ja pesu painepesulla. Kourujen syöksyihin tulee suodatinkankaat.</li>
      <li>Kasvustontorjunta-aine ja rikkinäisten tiilien vaihto uusiin.</li>
      <li>Pohjamaali ja pintamaali ruiskulla. Reunat ja ahtaat paikat telalla tai käsin. Maali on Nowocoat.</li>
      <li>Lopputarkastus yhdessä ja 5 vuoden kirjallinen takuu.</li>
    </ol>
    <p>
      Kaikki työvaiheet on kuvattu artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/">näin tiilikaton pinnoitus etenee</Link>.
    </p>

    <h2>Paljonko tiilikaton pesu ja pinnoitus maksaa?</h2>
    <Table
      head={["Katon koko", "Hinta yleensä", "Kesto"]}
      rows={[
        ["150–180 m²", "2 850 – 3 200 €", "2 työpäivää"],
        ["190–240 m²", "3 300 – 3 700 €", "2–3 työpäivää"],
        ["250–300 m²", "3 750 – 4 880 €", "2–4 työpäivää"],
      ]}
      caption="Hintaesimerkit omakotitalon tiilikatolle. Hinta sisältää pesun, tiilien vaihdon, kaksi maalikerrosta ja siivouksen."
    />
    <p>
      Työn osuudesta saat kotitalousvähennyksen. Suuntaa antavan hinnan omalle katollesi saat{" "}
      <Link to="/hintalaskuri/?palvelu=pinnoitus">hintalaskurilla</Link>, ja tarkemmat esimerkit ovat sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link>.
    </p>
    <Avainhuomio>Hinta on yleensä 2 850–7 000 €, ja työn osuudesta saat kotitalousvähennyksen.</Avainhuomio>
    <Figure
      image="tiilikaton-pinnoitus-vastamaalattu-tiilikatto-jalkeen"
      alt="Vastamaalattu tiilikatto pinnoituksen jälkeen"
      caption="Sama työ pesun ja kahden maalikerroksen jälkeen."
    />

    <h2>Milloin pesu ja pinnoitus kannattaa tehdä?</h2>
    <p>
      Kun tiilen väri on haalistunut, pinta tuntuu karhealta tai sammal kasvaa nopeasti. Yleensä tämä on
      ajankohtaista noin 15 vuoden iässä. Teemme pinnoituksia huhti–toukokuusta elo–syyskuuhun Pirkanmaalla ja
      lähikunnissa. Katso palvelu sivulta{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>

    <h2>Mitä voit tehdä itse sammaleen estämiseksi?</h2>
    <ul>
      <li>Poista lehdet ja neulaset katolta ja kouruista syksyllä. Ne pitävät kosteutta ja ruokkivat sammalta.</li>
      <li>Karsi katon yli roikkuvat oksat. Varjo ja tippuva vesi nopeuttavat kasvua.</li>
      <li>Katso katto läpi keväällä. Jos sammal on tullut takaisin pian pesun jälkeen, pinta on kulunut.</li>
    </ul>
    <p>
      Jos katto on vihreä ja noin 15 vuotta vanha, pyydä meidät katsomaan. Kuntotarkastus on ilmainen, ja teemme
      sen Pirkanmaalla ja lähikunnissa yleensä samalla viikolla.
    </p>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
