import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Hakusanat "sammaleen poisto tampere" ja "tiilikaton sammaleen poisto" (Search Console 26.10.2026, sijat 10–11).
 * Faktat sivuston omia: sammal pitää tiilen märkänä, pakkasrapautuminen, pesu kuuluu aina pinnoitukseen,
 * kasvustontorjunta-aine, kaksi maalikerrosta, hinnat prices.ts. Sammaleen poistoa ei myydä erikseen.
 */
const faq = [
  {
    question: "Poistatteko sammaleen tiilikatolta ilman pinnoitusta?",
    answer:
      "Teemme pesun aina pinnoituksen yhteydessä. Pesu ja kasvustontorjunta ovat työn ensimmäiset vaiheet, ja niiden jälkeen katto maalataan kahteen kertaan.",
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
    question: "Paljonko sammaleen poisto ja pinnoitus maksaa?",
    answer:
      "Tiilikaton pesu ja pinnoitus maksaa yleensä 2 850–7 000 euroa. Hintaan kuuluu pesu, kasvustontorjunta, rikkinäisten tiilien vaihto, kaksi maalikerrosta ja siivous.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Sammal kasvaa tiilikatolle, kun tehdaspinta on kulunut. Se tapahtuu yleensä 10–15 vuodessa.</li>
        <li>Sammal pitää tiilen märkänä. Talvella vesi jäätyy ja rikkoo tiilen.</li>
        <li>Pesu poistaa sammaleen, mutta karhea pinta jää. Sammal palaa, jos kattoa ei maalata pesun jälkeen.</li>
        <li>Pesu, kasvustontorjunta ja kaksi maalikerrosta maksavat yleensä 2 850–7 000 euroa.</li>
      </ul>
    </KeyPoints>

    <p>
      Sammal on yleisin syy, miksi meille soitetaan katon takia. Vihreä katto näkyy tielle asti, ja moni haluaa
      sen pois. Kerromme tässä, miksi sammal kasvaa tiilikatolle, mitä se tekee katolle ja miksi pelkkä poisto
      ei pidä kattoa puhtaana.
    </p>

    <h2>Miksi tiilikatolle kasvaa sammalta?</h2>
    <p>
      Uuden kattotiilen pinta on tehtaalla tehty tiiviiksi. Vesi valuu siitä pois, eikä sammal saa otetta. Pinta
      kuluu auringossa ja sateessa, Pirkanmaalla yleensä 10–15 vuodessa. Sen jälkeen tiili on karhea ja imee
      vettä. Märkään ja karheaan pintaan sammal ja jäkälä tarttuvat helposti.
    </p>
    <p>
      Varjoisa katon lape, metsän läheisyys ja puiden alla oleva katto nopeuttavat kasvua. Pohjoislape on usein
      vihreä, kun etelälape on vielä puhdas.
    </p>
    <Avainhuomio>Sammal tarttuu tiileen vasta, kun tehdaspinta on kulunut, yleensä 10–15 vuoden iässä.</Avainhuomio>

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
    <Avainhuomio>Märkä tiili rikkoutuu pakkasella, ja yksi talvi riittää halkaisemaan huokoisen tiilen.</Avainhuomio>

    <h2>Miten sammal poistetaan tiilikatolta?</h2>
    <p>
      Pesemme katon painepesulla. Sammal, jäkälä ja lika irtoavat, ja samalla huuhtelemme sadevesikourut.
      Kourujen syöksyihin laitamme suodatinkankaat, jotta sammal ei tuki putkia. Pesun jälkeen levitämme
      katolle kasvustontorjunta-aineen. Se tappaa itiöt, jotka jäävät tiilen huokosiin.
    </p>
    <p>
      Rikkinäiset tiilet vaihdamme uusiin pesun jälkeen, kun ne näkyvät kunnolla. Sitten katto saa kuivua.
    </p>
    <Avainhuomio>Pesu ja kasvustontorjunta ovat kaksi erillistä vaihetta, ja ilman torjunta-ainetta itiöt jäävät tiileen.</Avainhuomio>

    <h2>Miksi pelkkä sammaleen poisto ei riitä?</h2>
    <p>
      Pesun jälkeen katto näyttää hyvältä. Tiilen pinta on silti yhtä karhea kuin ennen pesua, ja se imee vettä
      heti seuraavalla sateella. Sammal palaa samaan paikkaan muutamassa vuodessa, ja pakkasrapautuminen jatkuu.
    </p>
    <p>
      Siksi maalaamme katon pesun jälkeen kahteen kertaan: ensin pohjamaali, sitten pintamaali. Uusi pinta on
      tiivis. Vesi valuu siitä pois, eikä sammal saa otetta. Pinnoitettu katto kestää jopa 15 vuotta pidempään.
      Tätä kutsutaan tiilikaton pinnoitukseksi. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/tiilikaton-pesu-ja-pinnoitus/">tiilikaton pesu ja pinnoitus</Link>.
    </p>
    <Avainhuomio>Uusi maalipinta pitää veden tiilen ulkopuolella jopa 15 vuotta, pelkkä pesu muutaman vuoden.</Avainhuomio>

    <h2>Paljonko sammaleen poisto ja pinnoitus maksaa?</h2>
    <Table
      head={["Katon koko", "Hinta yleensä", "Kesto"]}
      rows={[
        ["150–180 m²", "2 850 – 3 200 €", "2 työpäivää"],
        ["190–240 m²", "3 300 – 3 700 €", "2–3 työpäivää"],
        ["250–300 m²", "3 750 – 4 880 €", "2–4 työpäivää"],
      ]}
      caption="Hintaesimerkit omakotitalon tiilikatolle. Hinta sisältää pesun, kasvustontorjunnan, tiilien vaihdon, kaksi maalikerrosta ja siivouksen."
    />
    <p>
      Työn osuudesta saat kotitalousvähennyksen. Arvion omalle katollesi saat{" "}
      <Link to="/hintalaskuri/?palvelu=pinnoitus">hintalaskurilla</Link>. Tarkemmat esimerkit ovat sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link>.
    </p>
    <Avainhuomio>Yleisimmän kattokoon, 190–240 m², pesu ja pinnoitus maksaa yleensä 3 300–3 700 euroa.</Avainhuomio>

    <h2>Mitä voit tehdä itse sammaleen estämiseksi?</h2>
    <ul>
      <li>Poista lehdet ja neulaset katolta ja kouruista syksyllä. Ne pitävät kosteutta ja ruokkivat sammalta.</li>
      <li>Karsi katon yli roikkuvat oksat. Varjo ja tippuva vesi nopeuttavat kasvua.</li>
      <li>Katso katto läpi keväällä. Jos sammal on tullut takaisin pian pesun jälkeen, pinta on kulunut.</li>
    </ul>
    <p>
      Jos katto on vihreä ja yli kymmenen vuotta vanha, pyydä meidät katsomaan. Kuntotarkastus on ilmainen, ja
      teemme sen Pirkanmaalla ja lähikunnissa yleensä samalla viikolla. Katso palvelu sivulta{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Syksyn lehtien poisto kouruista on ilmainen tapa hidastaa sammaleen kasvua vuodesta toiseen.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
