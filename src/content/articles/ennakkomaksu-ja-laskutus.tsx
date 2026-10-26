import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (ennakkolasku 10 % hyväksymisen jälkeen, loput kun työ on valmis ja käyty
 * yhdessä läpi; tarjous sisältää kaiken, ei piilokuluja; sade ei nosta hintaa; työn osuus laskussa eriteltynä), company.ts
 * (kotitalousvähennys), CLAUDE.md (ei rahoitusta: ei mainita). Verohallinto, Näin ilmoitat kotitalousvähennyksen (luettu
 * 26.10.2026): laskun loppusumma ja työn osuus ilmoitetaan, yrityksen pitää olla ennakkoperintärekisterissä. Ei laskuesimerkkejä.
 */
const faq = [
  {
    question: "Paljonko ennakkomaksu on?",
    answer: "10 % tarjouksen hinnasta. Lähetämme ennakkolaskun, kun olet hyväksynyt tarjouksen.",
  },
  {
    question: "Milloin loput maksetaan?",
    answer: "Kun työ on valmis ja olemme käyneet sen yhdessä läpi lopputarkastuksessa. Sen jälkeen lähetämme loppulaskun.",
  },
  {
    question: "Voiko hinta muuttua työn aikana?",
    answer: "Ei. Tarjouksen hinta on kiinteä. Sade tai työn venyminen ei nosta sitä, eikä piilokuluja tule.",
  },
  {
    question: "Mitä laskussa pitää olla kotitalousvähennystä varten?",
    answer: "Laskun loppusumma, työn osuus eriteltynä ja yrityksen Y-tunnus. Kaikki nämä ovat laskussamme valmiina.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Ennakkolasku on 10 % hinnasta, ja se lähetetään tarjouksen hyväksymisen jälkeen.</li>
        <li>Loput laskutetaan, kun työ on valmis ja käyty yhdessä läpi.</li>
        <li>Tarjouksen hinta on kiinteä. Sade tai venyminen ei nosta sitä.</li>
        <li>Laskussa on työn osuus eriteltynä kotitalousvähennystä varten.</li>
      </ul>
    </KeyPoints>

    <p>
      Raha-asiat kannattaa tietää ennen tilausta. Kerromme tässä, milloin ja mitä maksat, mitä laskussa lukee ja
      miten saat siitä kotitalousvähennyksen. Sama käytäntö koskee katon pinnoitusta ja talon maalausta.
    </p>

    <h2>Milloin ja mitä maksat?</h2>
    <Table
      head={["Lasku", "Milloin", "Osuus hinnasta"]}
      rows={[
        ["Ennakkolasku", "Tarjouksen hyväksymisen jälkeen", "10 %"],
        ["Loppulasku", "Kun työ on valmis ja käyty yhdessä läpi", "90 %"],
      ]}
      caption="Maksu kahdessa osassa. Hinta on tarjouksen kiinteä hinta."
    />
    <p>
      Ennakkolasku vahvistaa tilauksen ja varaa ajan kalenterista. Loppulasku tulee vasta, kun olet kiertänyt
      kohteen kanssamme ja hyväksynyt työn jäljen. Jos jokin ei ole kunnossa, korjaamme sen ennen laskua.
    </p>
    <Avainhuomio>Maksat 10 prosenttia ennakkoon ja 90 prosenttia vasta hyväksytystä työstä.</Avainhuomio>

    <h2>Voiko hinta muuttua?</h2>
    <p>
      Ei. Tarjouksen hinta on kiinteä, ja se perustuu kuntotarkastukseen tai arviokäyntiin, jossa olemme
      nähneet kohteen itse. Tarjous sisältää kaiken: työn, maalit, telineet ja nostimet, matkat ja
      loppusiivouksen. Sade siirtää päivää, mutta ei nosta hintaa. Jos työn aikana löytyy jotain, mitä
      tarjouksessa ei ole, esimerkiksi paljon rikkinäisiä tiiliä, puhumme siitä kanssasi ennen kuin teemme
      mitään. Kerromme tarjouksesta artikkelissa{" "}
      <Link to="/artikkelit/mita-tarjouksesta-kannattaa-katsoa/">mitä tarjouksesta kannattaa katsoa</Link>.
    </p>
    <Avainhuomio>Hinta on kiinteä ja sisältää kaiken, eikä sade tai venyminen muuta sitä.</Avainhuomio>

    <h2>Mitä laskussa lukee?</h2>
    <p>
      Laskussa on tarjouksen hinta, työn osuus eriteltynä ja yrityksen Y-tunnus. Työn osuus on se summa, josta
      saat kotitalousvähennyksen. Verohallinnon ohjeen mukaan ilmoitukseen tarvitaan laskun loppusumma
      arvonlisäveroineen ja työn osuus siitä, ja yrityksen pitää kuulua ennakkoperintärekisteriin. Pintanen Oy
      kuuluu. Jos haluat jakaa laskun puolison kanssa, kerro se ennen laskutusta, niin kirjoitamme laskun sen
      mukaan. Jakamisesta kerromme artikkelissa{" "}
      <Link to="/artikkelit/kotitalousvahennys-vanhempien-talo-ja-puoliso/">kotitalousvähennys vanhempien talossa ja puolisoiden kesken</Link>.
    </p>
    <Avainhuomio>Laskussa on valmiina kaikki kolme asiaa, jotka vähennyksen ilmoittamiseen tarvitaan.</Avainhuomio>

    <h2>Paljonko kotitalousvähennys on?</h2>
    <p>
      Vuosina 2026 ja 2027 saat vähentää 40 % työn osuudesta, enintään 2 100 euroa henkilöltä vuodessa.
      Omavastuu on 150 euroa. Voit ilmoittaa vähennyksen jo saman vuoden verokortille OmaVerossa tai
      veroilmoituksella seuraavana keväänä. Pinnoitus maksaa yleensä 2 850–7 000 euroa ja maalaus 3 500–11 000
      euroa. Arvion vähennyksen jälkeen näet <Link to="/hintalaskuri/">hintalaskurissa</Link>, ja perusasiat
      kerromme sivulla <Link to="/kotitalousvahennys/">kotitalousvähennys</Link>.
    </p>
    <Avainhuomio>Vähennys on 40 prosenttia työn osuudesta, enintään 2 100 euroa henkilöltä.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Verohallinto: Näin ilmoitat kotitalousvähennyksen (luettu 26.10.2026)",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/nain-ilmoitat-kotitalousvahennyksen/",
        },
        {
          label: "Verohallinto: Kotitalousvähennyksen määrä (luettu 26.10.2026)",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara",
        },
      ]}
    />
  </>
);

export default Body;
