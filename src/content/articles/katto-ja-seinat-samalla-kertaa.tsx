import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts ("Jos teemme samalla kertaa myös katon, saat edullisemman pakettihinnan"),
 * CLAUDE.md (katto ja seinät samalla kertaa = edullisempi pakettihinta), prices.ts (pinnoitus 2 850–7 000 €, maalaus
 * 3 500–11 000 €), projects.ts (katon ja seinien maalaus samaan taloon, Tampere 2026), kotitalousvähennys vero.fi.
 * Pakettihinnan suuruutta ei kerrota: sitä ei ole sivustolla. Eerik 27.10.2026: aloituspäivä sovitaan kummallekin
 * työlle erikseen; nopeimmillaan kokonaiskesto on seinien kesto (3–7 päivää).
 */
const faq = [
  {
    question: "Onko katto ja seinät samalla kertaa halvempi?",
    answer:
      "Kyllä. Jos teemme samalla kertaa sekä katon pinnoituksen että seinien maalauksen, saat edullisemman pakettihinnan. Hinta kerrotaan tarjouksessa.",
  },
  {
    question: "Kumpi tehdään ensin, katto vai seinät?",
    answer:
      "Yleensä katto ensin. Katon pesu ja maalaus roiskuvat, ja seinät maalataan sen jälkeen. Näin seinät eivät likaannu.",
  },
  {
    question: "Kauanko katto ja seinät yhdessä kestävät?",
    answer: "Pinnoitus kestää 2–3 päivää ja maalaus 3–7 päivää. Nopeimmillaan molemmat valmistuvat seinien maalauksen ajassa eli 3–7 päivässä. Aloituspäivä sovitaan kummallekin työlle erikseen.",
  },
  {
    question: "Saako molemmista kotitalousvähennyksen?",
    answer:
      "Kyllä. Vähennys on 40 % työn osuudesta, enintään 2 100 euroa henkilöltä vuodessa. Isossa paketissa kulut kannattaa jakaa puolison kanssa, jolloin kumpikin saa oman vähennyksensä.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Katto ja seinät samalla kertaa on edullisempi pakettihinta kuin kaksi erillistä työtä.</li>
        <li>Yleensä katto tehdään ensin ja seinät sen jälkeen, jotta seinät eivät likaannu.</li>
        <li>Pinnoitus maksaa yleensä 2 850–7 000 euroa ja maalaus 3 500–11 000 euroa. Paketin hinta on tarjouksessa.</li>
        <li>Kotitalousvähennys on 40 % työn osuudesta, enintään 2 100 euroa henkilöltä.</li>
      </ul>
    </KeyPoints>

    <p>
      Katto ja seinät vanhenevat samaa tahtia. Jos katto on 15 vuotta vanha, seinät ovat usein samaa ikää.
      Kerromme tässä, miksi molemmat kannattaa tehdä samalla kertaa, missä järjestyksessä työ etenee ja miten
      paketti hinnoitellaan.
    </p>

    <h2>Miksi katto ja seinät kannattaa tehdä samalla kertaa?</h2>
    <p>
      Kolme syytä. Hinta on edullisempi, koska tulemme pihaan kerran ja suojaukset, telineet ja nostimet
      palvelevat molempia töitä. Talo valmistuu kerralla, eikä pihassa ole työmaata kahtena kesänä. Ja väri
      sopii yhteen: katon ja seinien sävyt valitaan samalla käynnillä. Katon pinnoituksesta vastaa Eerik ja
      seinien maalauksesta Eemil, joten molemmat työt tekee sama yritys.
    </p>
    <Figure
      image="talon-maalaus-ja-tiilikaton-pinnoitus-tampere-puutalo-jalkeen"
      alt="Puutalo Tampereella katon ja seinien maalauksen jälkeen"
      caption="Katon ja seinien maalaus samaan taloon Tampereella 2026."
    />
    <Avainhuomio>Yksi käynti, yhdet suojaukset ja yhteensopivat värit tekevät paketista edullisemman.</Avainhuomio>

    <h2>Missä järjestyksessä työ etenee?</h2>
    <Table
      head={["Vaihe", "Kesto", "Kuka"]}
      rows={[
        ["Kuntotarkastus ja arviokäynti samalla käynnillä", "1 käynti", "Eerik ja Eemil"],
        ["Katon pesu, tiilien vaihto ja maalaus kahteen kertaan", "2–3 päivää", "Eerik"],
        ["Seinien homepesu, kaavinta, pohjamaali ja pintamaali pensselillä", "3–7 päivää", "Eemil"],
        ["Lopputarkastus yhdessä", "Sama päivä", "Sinä ja me"],
      ]}
      caption="Katto ensin, seinät sen jälkeen. Nopeimmillaan molemmat valmistuvat 3–7 päivässä."
    />
    <p>
      Yleensä katto tehdään ensin, koska pesu ja ruisku roiskuvat. Seinät maalataan sen jälkeen. Aloituspäivä
      sovitaan kummallekin työlle erikseen. Nopeimmillaan molemmat valmistuvat seinien maalauksen ajassa eli
      3–7 päivässä. Molempien töiden kulun kerromme artikkeleissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/">näin tiilikaton pinnoitus etenee</Link> ja{" "}
      <Link to="/artikkelit/talon-maalaus-tilauksesta-valmiiseen/">talon maalaus tilauksesta valmiiseen</Link>.
    </p>
    <Avainhuomio>Katto ensin ja seinät sen jälkeen, nopeimmillaan yhteensä 3–7 päivää.</Avainhuomio>

    <h2>Mitä katto ja seinät yhdessä maksavat?</h2>
    <p>
      Erikseen tiilikaton pinnoitus maksaa yleensä 2 850–7 000 euroa ja omakotitalon maalaus 3 500–11 000 euroa.
      Kun teemme molemmat samalla kertaa, saat edullisemman pakettihinnan. Paketin hinta riippuu katon ja talon
      koosta, ja kerromme sen kirjallisessa tarjouksessa yhdellä kiinteällä summalla. Suuntaa antavat arviot saat{" "}
      <Link to="/hintalaskuri/">hintalaskurilla</Link>, ja hintaesimerkit ovat sivuilla{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link> ja{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</Link>.
    </p>
    <Avainhuomio>Paketin hinta on tarjouksessa yksi kiinteä summa, joka on edullisempi kuin kaksi erillistä työtä.</Avainhuomio>

    <h2>Miten kotitalousvähennys toimii isossa paketissa?</h2>
    <p>
      Vähennys on 40 % työn osuudesta, enintään 2 100 euroa henkilöltä vuodessa, ja omavastuu on 150 euroa.
      Katto ja seinät yhdessä ovat iso työ, joten yhden henkilön enimmäismäärä voi täyttyä. Silloin kulut
      kannattaa jakaa puolison kanssa, jolloin kumpikin saa oman vähennyksensä. Kerro ennen laskutusta, miten
      haluat laskun. Kerromme jakamisesta artikkelissa{" "}
      <Link to="/artikkelit/kotitalousvahennys-vanhempien-talo-ja-puoliso/">kotitalousvähennys vanhempien talossa ja puolisoiden kesken</Link>.
    </p>
    <Avainhuomio>Puolisot saavat yhteensä enintään 4 200 euroa vähennystä, kun kulut jaetaan.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
