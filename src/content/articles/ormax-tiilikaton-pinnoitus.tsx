import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: Ormax on yleisin 2000-luvun kattotiili (Eerik 11.10.2026), työ ja hinta samat kuin
 * muilla betonitiilillä, tehdaspinta kuluu 10–15 vuodessa, Nowocoat, kaksi kerrosta, hinnat prices.ts.
 * Valmistajan tiedot BMI:n sivuilta (luettu 26.10.2026): betonitiili kestää huollettuna 50–70 vuotta, Protector-pinnoite,
 * rikkinäiset tiilet vaihdetaan heti, pinnoitus ei korvaa katon korjausta, BMI puhuu 20–30 vuoden iästä.
 */
const faq = [
  {
    question: "Pinnoitatteko Ormax-tiilikattoja?",
    answer:
      "Kyllä. Ormax on yleisin 2000-luvun kattotiili, ja suuri osa pinnoittamistamme katoista on Ormaxia. Työ ja hinta ovat samat kuin muilla betonitiilikatoilla.",
  },
  {
    question: "Milloin Ormax-katto kannattaa pinnoittaa?",
    answer:
      "Kun tiilen väri on haalistunut, pinta tuntuu karhealta tai sammal kasvaa nopeasti. Pirkanmaalla tämä on yleensä ajankohtaista noin 10–15 vuoden iässä.",
  },
  {
    question: "Voiko Ormax-katon värin vaihtaa pinnoituksessa?",
    answer: "Kyllä voi. Nowocoatin kattomaaleissa on laaja värivalikoima, ja väri valitaan kuntotarkastuksen yhteydessä.",
  },
  {
    question: "Mitä tehdään rikkinäisille Ormax-tiilille?",
    answer:
      "Vaihdamme ne uusiin ennen maalausta. Jos sinulla on varatiiliä, käytämme niitä. Muuten voit hankkia tiilet itse, tai me haemme ne sovittua lisähintaa vastaan.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Ormax on yleisin 2000-luvun kattotiili Suomessa. Pinnoitamme niitä samalla työllä ja hinnalla kuin muita betonitiiliä.</li>
        <li>Valmistajan mukaan betonitiili kestää huollettuna 50–70 vuotta. Pinta kuluu paljon nopeammin.</li>
        <li>Pinnoitus on ajankohtainen, kun pinta on haalistunut tai karhea, yleensä 10–15 vuoden iässä.</li>
        <li>Työ kestää 2–3 päivää ja maksaa yleensä 2 850–7 000 euroa. Takuu on 5 vuotta.</li>
      </ul>
    </KeyPoints>

    <p>
      Jos talosi on rakennettu 2000-luvulla, katolla on todennäköisesti Ormax-tiili. Se on yleisin kattotiili,
      jonka näemme Pirkanmaan katoilla. Kerromme tässä, mitä Ormax-katon pinnoituksessa kannattaa tietää ja
      mitä valmistaja itse sanoo tiilen hoidosta.
    </p>

    <h2>Mikä Ormax-tiili on?</h2>
    <p>
      Ormax on BMI:n valmistama betonikattotiili. Valmistajan mukaan betonitiilikatto kestää oikein huollettuna
      jopa 50–70 vuotta. Tiilessä on pintakäsittely: perinteisessä Ormaxissa akryylipinnoite ja uudemmassa
      Protector-mallissa erikoispinnoite, joka hylkii likaa ja vettä. Juuri tämä pinta kuluu ensimmäisenä, ja
      sen uusimisesta pinnoituksessa on kyse.
    </p>
    <Avainhuomio>Tiili itse kestää valmistajan mukaan 50–70 vuotta, mutta sen pinta kuluu moninkertaisesti nopeammin.</Avainhuomio>

    <h2>Milloin Ormax-tiilikatto kannattaa pinnoittaa?</h2>
    <p>
      Kun tehdaspinta on kulunut, tiili alkaa imeä vettä ja sammal saa otteen. Merkit ovat samat kuin muillakin
      betonitiilillä: väri on haalistunut, pinta tuntuu karhealta ja sammal palaa pian pesun jälkeen. Pirkanmaalla
      tämä on yleensä ajankohtaista noin 10–15 vuoden iässä. Valmistaja puhuu omilla sivuillaan 20–30 vuoden
      iästä, mutta varjoinen lape, metsän läheisyys ja järven ranta kuluttavat pintaa nopeammin.
    </p>
    <p>
      Valmistaja neuvoo tarkistamaan tiilien kunnon esimerkiksi kovan talven jälkeen ja vaihtamaan rikkoutuneet
      tiilet heti. Sama koskee pinnoitusta: ajoissa tehtynä se estää pakkasrapautumisen. Merkit kerromme
      tarkemmin artikkelissa <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto/">milloin tiilikatto pitää pinnoittaa</Link>.
    </p>
    <Avainhuomio>Haalistunut ja karhea Ormax-tiili kannattaa pinnoittaa, Pirkanmaalla yleensä 10–15 vuoden iässä.</Avainhuomio>

    <h2>Miten Ormax-katon pinnoitus etenee?</h2>
    <ol>
      <li>Ilmainen kuntotarkastus. Tarkistamme tiilet, saumat, piipun ympäryksen, läpiviennit ja aluskatteen.</li>
      <li>Kirjallinen tarjous kiinteällä hinnalla, sopimus ja aikataulu.</li>
      <li>Suojaus ja pesu painepesulla. Kourujen syöksyihin tulee suodatinkankaat.</li>
      <li>Kasvustontorjunta-aine ja rikkinäisten tiilien vaihto uusiin.</li>
      <li>Pohjamaali ja pintamaali ruiskulla. Reunat ja ahtaat paikat telalla tai käsin. Maali on Nowocoat.</li>
      <li>Lopputarkastus yhdessä ja 5 vuoden kirjallinen takuu.</li>
    </ol>
    <p>
      Valmistaja muistuttaa, että pinnoitus ei korvaa katon korjausta. Olemme samaa mieltä. Jos aluskate vuotaa tai
      tiiliä on rikki laajalti, kerromme sen kuntotarkastuksessa. Kaikki työvaiheet kuvaamme artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/">näin tiilikaton pinnoitus etenee</Link>.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-varatiilien-maalaus"
      alt="Varatiilien maalaus tiilikaton pinnoituksen yhteydessä"
      caption="Varatiilet maalataan samalla kertaa, jotta ne sopivat kattoon myöhemmin."
    />
    <Avainhuomio>Pinnoitus on kuusi vaihetta, ja peruskohteen Ormax-katto valmistuu 2–3 työpäivässä.</Avainhuomio>

    <h2>Mitä Ormax-katon pinnoitus maksaa?</h2>
    <Table
      head={["Katon koko", "Hinta yleensä", "Kesto"]}
      rows={[
        ["150–180 m²", "2 850 – 3 200 €", "2 työpäivää"],
        ["190–240 m²", "3 300 – 3 700 €", "2–3 työpäivää"],
        ["250–300 m²", "3 750 – 4 880 €", "2–4 työpäivää"],
      ]}
      caption="Hintaesimerkit omakotitalon Ormax-tiilikatolle. Hinta on sama kuin muilla betonitiilikatoilla."
    />
    <p>
      Hintaan kuuluu pesu, kasvustontorjunta, tiilien vaihto, kaksi maalikerrosta, siivous ja takuu. Työn
      osuudesta saat kotitalousvähennyksen. Arvion omalle katollesi saat{" "}
      <Link to="/hintalaskuri/?palvelu=pinnoitus">hintalaskurilla</Link>, ja hintaesimerkit ovat sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link>.
    </p>
    <Avainhuomio>Ormax-katon pinnoitus maksaa yleensä 2 850–7 000 euroa, tiilimerkki ei muuta hintaa.</Avainhuomio>

    <h2>Mitä voit tehdä Ormax-katolle itse?</h2>
    <p>
      Valmistaja neuvoo poistamaan lehdet ja roskat katolta vuosittain, jotta sammal ei pääse kasvamaan, ja
      tarkistamaan tiilet talven jälkeen. Se kannattaa. Kun pinta on jo kulunut, pelkkä puhdistus ei riitä
      pitkään, vaan katto kannattaa maalata. Pinnoitamme Ormax-kattoja Pirkanmaalla ja lähikunnissa
      huhti–toukokuusta elo–syyskuuhun. Katso palvelu sivulta{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Lehtien poisto kerran vuodessa hidastaa sammalta, mutta kuluneen pinnan korjaa vain uusi maalikerros.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "BMI Suomi: Usein kysytyt kysymykset, BMI Ormax -betonikattotiilet (luettu 26.10.2026)",
          url: "https://bmifinland.zendesk.com/hc/fi-fi/articles/33093701704082-Usein-kysytyt-kysymykset-BMI-Ormax-betonikattotiilet",
        },
        {
          label: "BMI Suomi: Tiilikaton pinnoitus uudistaa kotisi ilmeen (luettu 26.10.2026)",
          url: "https://www.bmigroup.com/fi/omakotiasujille/tiilikaton-pinnoitus/",
        },
      ]}
    />
  </>
);

export default Body;
