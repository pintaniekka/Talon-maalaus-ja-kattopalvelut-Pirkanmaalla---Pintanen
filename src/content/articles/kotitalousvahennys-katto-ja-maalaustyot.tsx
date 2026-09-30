import { Link } from "react-router-dom";
import { ArticleFaq, KeyPoints, Note, Sources, Table } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Saako tiilikaton pinnoituksesta kotitalousvähennyksen?",
    answer:
      "Saa. Katon pesu ja pinnoitus ovat asunnon kunnossapitoa, ja vähennyksen saa yritykseltä ostetun työn osuudesta. Maaleista ja muista materiaaleista sitä ei saa.",
  },
  {
    question: "Saako talon ulkomaalauksesta kotitalousvähennyksen?",
    answer:
      "Saa. Ulkomaalaus on kunnossapitotyötä. Vähennys lasketaan laskun arvonlisäverollisesta työn osuudesta.",
  },
  {
    question: "Saako vähennyksen kesämökillä tehdystä työstä?",
    answer: "Saa. Vapaa-ajan asunnolla tehtyyn työhön pätevät samat säännöt kuin vakituiseen asuntoon.",
  },
  {
    question: "Minä vuonna vähennys lasketaan, jos työ tehdään vuodenvaihteessa?",
    answer:
      "Laskun maksupäivä ratkaisee. Vähennys kuuluu sen vuoden verotukseen, jona lasku on maksettu, vaikka työ olisi tehty edellisenä vuonna.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Vuosina 2026 ja 2027 yritykseltä ostetusta työstä saa vähentää 40 %.</li>
        <li>Enimmäismäärä on 2 100 euroa henkilöltä vuodessa, puolisoilta yhteensä 4 200 euroa.</li>
        <li>Omavastuu on 150 euroa henkilöltä vuodessa.</li>
        <li>Vähennyksen saa työstä. Materiaaleista ja matkakuluista sitä ei saa.</li>
      </ul>
    </KeyPoints>

    <p>
      Katon pinnoituksessa ja talon maalauksessa suurin osa laskusta on työtä. Siksi kotitalousvähennys pienentää
      näiden töiden hintaa enemmän kuin useimpien muiden remonttien. Alla ovat vuoden 2027 luvut, kaksi
      laskuesimerkkiä ja asiat, jotka vähennystä hakiessa menevät useimmin pieleen.
    </p>

    <h2>Paljonko kotitalousvähennys on vuonna 2027?</h2>
    <p>
      Yritykseltä ostetusta työstä saa vähentää <strong>40 % työn arvonlisäverollisesta hinnasta</strong>.
      Vähennystä saa enintään <strong>2 100 euroa henkilöltä vuodessa</strong>, ja jokaisella on 150 euron
      omavastuu.
    </p>
    <Table
      head={["", "2025", "2026 ja 2027"]}
      rows={[
        ["Vähennys työn osuudesta", "35 %", "40 %"],
        ["Enimmäismäärä henkilöltä", "1 600 €", "2 100 €"],
        ["Omavastuu", "150 €", "150 €"],
      ]}
    />
    <Note title="Korotus on määräaikainen">
      <p>
        Korotus perustuu hallituksen esitykseen, ja se koskee 1.1.2026 alkaen maksettuja laskuja. Verohallinnon
        kesäkuun 2026 tiedotteen mukaan muutos edellyttää eduskunnan hyväksyntää. Ajantasaiset luvut kannattaa
        tarkistaa{" "}
        <a href="https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara" target="_blank" rel="noopener noreferrer">
          Verohallinnon sivulta
        </a>
        .
      </p>
    </Note>

    <h2>Laskuesimerkki: tiilikaton pinnoitus</h2>
    <p>Pinnoituksen laskussa työn osuus on 2 800 euroa.</p>
    <ul>
      <li>40 % × 2 800 € = 1 120 €</li>
      <li>
        1 120 € − 150 € omavastuu = <strong>970 € vähennystä</strong>
      </li>
    </ul>
    <p>Vuoden 2025 säännöillä samasta laskusta olisi saanut 830 euroa.</p>

    <h2>Laskuesimerkki: talon ulkomaalaus kahdelle jaettuna</h2>
    <p>
      Maalausurakan työn osuus on 8 000 euroa. Jos vähennystä hakee vain toinen puolisoista, 40 % × 8 000 € − 150 €
      olisi 3 050 euroa, mutta enimmäismäärä leikkaa sen 2 100 euroon.
    </p>
    <p>
      Kun puolisot maksavat laskun puoliksi, kumpikin vähentää 40 % × 4 000 € − 150 € eli 1 450 euroa. Yhteensä se
      on <strong>2 900 euroa</strong>, eli 800 euroa enemmän. Jakaminen kannattaa, kun työn osuus on yli 6 000
      euroa.
    </p>

    <h2>Milloin enimmäismäärä tulee täyteen?</h2>
    <p>
      Yksi henkilö saa täydet 2 100 euroa, kun vuoden aikana maksettujen töiden osuus on 5 625 euroa. Kaava on
      40 % × 5 625 € − 150 €. Vähennys on henkilökohtainen, joten puolisot voivat saada yhteensä 4 200 euroa.
      Jos toisen vähennys ylittää enimmäismäärän, ylimenevä osa siirtyy puolison verotukseen.
    </p>

    <h2>Mistä töistä vähennyksen saa?</h2>
    <ul>
      <li>
        <strong>Saa:</strong> asunnon kunnossapito ja perusparannus, esimerkiksi katon pesu, pinnoitus ja korjaus
        sekä ulkomaalaus.
      </li>
      <li>
        <strong>Saa:</strong> sama työ vapaa-ajan asunnolla.
      </li>
      <li>
        <strong>Ei saa:</strong> materiaalit, kuten maalit ja pinnoitteet.
      </li>
      <li>
        <strong>Ei saa:</strong> matka- ja kuljetuskulut.
      </li>
      <li>
        <strong>Ei saa:</strong> uudisrakentaminen ja työt, jotka kuuluvat taloyhtiön kunnossapitovastuulle.
      </li>
    </ul>
    <p>
      Yrityksen pitää kuulua ennakkoperintärekisteriin. Sen voi tarkistaa maksutta osoitteessa ytj.fi. Pintanen
      kuuluu ennakkoperintärekisteriin, ja erittelemme työn ja materiaalit laskulle, jotta vähennyksen hakeminen
      on helppoa.
    </p>

    <h2>Maksupäivä ratkaisee verovuoden</h2>
    <p>
      Vähennys kuuluu sille vuodelle, jona lasku on maksettu. Jos tämän vuoden enimmäismäärä on jo käytetty,
      tammikuussa maksettava lasku menee seuraavan vuoden vähennykseen. Isossa urakassa maksujen jakaminen
      kahdelle vuodelle voi kasvattaa vähennystä.
    </p>

    <h2>Miten kotitalousvähennystä haetaan?</h2>
    <ol>
      <li>Säilytä lasku ja maksutosite. Niitä ei lähetetä Verohallinnolle, mutta ne on esitettävä pyydettäessä.</li>
      <li>
        Ilmoita vähennys OmaVerossa. Verokortille ilmoitettuna se pienentää ennakonpidätystä heti,
        veroilmoituksella ilmoitettuna se näkyy lopullisessa verotuksessa.
      </li>
      <li>Ilmoita yrityksen nimi, Y-tunnus ja maksamasi työn osuus.</li>
    </ol>
    <p>
      Hinnat ennen vähennystä löydät sivuilta{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa">tiilikaton pinnoituksen hinta</Link> ja{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa">talon maalauksen hinta</Link>.
    </p>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Verohallinto: Kotitalousvähennyksen määrä",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara",
        },
        {
          label: "Verohallinto: Mistä töistä vähennyksen saa",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/mista-toista-vahennyksen-saa/",
        },
        {
          label: "Verohallinto: Kotitalousvähennykseen ehdotetaan korotusta (16.6.2026)",
          url: "https://www.vero.fi/tietoa-verohallinnosta/uutishuone/lehdist%C3%B6tiedotteet/2026/kotitalousvahennykseen-ehdotetaan-korotusta-matkakulujen-omavastuu-pienenee/",
        },
      ]}
    />
  </>
);

export default Body;
