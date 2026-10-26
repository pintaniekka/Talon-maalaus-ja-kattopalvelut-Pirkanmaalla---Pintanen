import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts ("Pinnoitamme myös autotallin, autokatoksen ja muun piharakennuksen
 * tiilikaton. Yleensä teemme sen samalla kertaa talon katon kanssa"), CLAUDE.md (myös mökit ja piharakennukset),
 * hinnat prices.ts, kotitalousvähennys vero.fi (ulkorakennus mainitaan remonttiesimerkkinä, vapaa-ajan asunto kyllä).
 * Piharakennuksen erillistä hintaa ei kerrota: sitä ei ole sivustolla.
 */
const faq = [
  {
    question: "Pinnoitatteko autotallin katon?",
    answer:
      "Kyllä. Pinnoitamme autotallin, autokatoksen ja muun piharakennuksen tiilikaton. Yleensä teemme sen samalla kertaa talon katon kanssa.",
  },
  {
    question: "Voiko pelkän autotallin katon pinnoittaa?",
    answer: "Voi. Kerro koko ja sijainti, niin annamme tarjouksen. Samalla kertaa talon katon kanssa työ sujuu nopeimmin.",
  },
  {
    question: "Saako piharakennuksen katosta kotitalousvähennyksen?",
    answer:
      "Kyllä. Verohallinnon ohjeissa ulkorakennuksen kunnostus mainitaan vähennyskelpoisena työnä, ja sama koskee mökin piharakennuksia.",
  },
  {
    question: "Entä jos autotallin katto on eri väri kuin talon?",
    answer: "Maalaamme sen haluamallasi värillä. Moni haluaa samalla yhtenäistää värin talon katon kanssa.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Pinnoitamme autotallin, autokatoksen, saunan ja muun piharakennuksen tiilikaton.</li>
        <li>Yleensä teemme sen samalla kertaa talon katon kanssa. Silloin työ sujuu nopeimmin.</li>
        <li>Työvaiheet ovat samat: pesu, kasvustontorjunta, tiilien vaihto ja kaksi kerrosta maalia.</li>
        <li>Työn osuudesta saat kotitalousvähennyksen myös piharakennuksesta.</li>
      </ul>
    </KeyPoints>

    <p>
      Autotallin katto on usein saman ikäinen kuin talon katto, ja se kuluu samaa tahtia. Silti se jää
      helposti huomaamatta, koska se on matalampi. Kerromme tässä, miten pinnoitamme piharakennusten katot ja
      miksi ne kannattaa tehdä samalla kertaa.
    </p>

    <h2>Mitkä piharakennukset pinnoitamme?</h2>
    <Table
      head={["Rakennus", "Mitä teemme", "Huomaa"]}
      rows={[
        ["Autotalli", "Pesu, tiilien vaihto, kaksi kerrosta maalia", "Usein sama tiili kuin talossa"],
        ["Autokatos", "Sama työ", "Avoin katos, suojaamme auton paikan"],
        ["Sauna tai aitta", "Sama työ", "Myös mökillä"],
        ["Varasto", "Sama työ", "Matala katto, nopea työ"],
      ]}
      caption="Piharakennusten tiilikatot pinnoitetaan samoilla työvaiheilla kuin talon katto."
    />
    <Avainhuomio>Piharakennuksen tiilikatto saa saman työn kuin talon katto: pesun, tiilien vaihdon ja kaksi kerrosta maalia.</Avainhuomio>

    <h2>Miksi piharakennus kannattaa tehdä samalla kertaa?</h2>
    <p>
      Olemme jo pihassa. Painepesuri, ruisku, maalit ja suojaukset ovat paikalla, ja kasvustontorjunta-aine
      sekä maali ovat avattuina. Piharakennuksen katto hoituu samalla matkalla, ja aikaa menee vähemmän kuin
      erillisellä käynnillä. Talo ja piharakennus saavat myös saman värin ja saman pinnan, ja takuu on sama 5 vuotta.
      Jos haluat vaihtaa värin, kerromme vaihtoehdoista artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-varin-vaihto-pinnoituksessa/">tiilikaton värin vaihto</Link>.
    </p>
    <Avainhuomio>Samalla kertaa tehty piharakennus sujuu nopeasti, koska kalusto ja maalit ovat jo pihassa.</Avainhuomio>

    <h2>Miten autotallin katon pinnoitus etenee?</h2>
    <ol>
      <li>Kuntotarkastus samalla käynnillä kuin talon katto. Tarkistamme tiilet, saumat ja läpiviennit.</li>
      <li>Suojaus. Autokatoksessa auton paikka ja seinät, jotka ovat pesun ja ruiskun ulottuvilla.</li>
      <li>Pesu painepesulla ja kasvustontorjunta-aine.</li>
      <li>Rikkinäisten tiilien vaihto.</li>
      <li>Pohjamaali ja pintamaali ruiskulla. Reunat telalla tai käsin. Maali on Nowocoat.</li>
      <li>Lopputarkastus yhdessä talon katon kanssa.</li>
    </ol>
    <Figure
      image="tiilikaton-pinnoitus-kangasala-vaalea-talo-jalkeen"
      alt="Vaalea omakotitalo ja pinnoitettu tiilikatto Kangasalla"
      caption="Pinnoitettu tiilikatto Kangasalla 2026."
    />
    <Avainhuomio>Autotallin katto kulkee samojen kuuden vaiheen läpi kuin talon katto, samalla käynnillä.</Avainhuomio>

    <h2>Mitä piharakennuksen katon pinnoitus maksaa?</h2>
    <p>
      Hinta riippuu katon koosta ja siitä, teemmekö sen samalla kertaa talon katon kanssa. Omakotitalon katon
      pinnoitus maksaa yleensä 2 850–7 000 euroa, ja piharakennuksen hinnan kerromme samassa tarjouksessa
      omana rivinään. Työn osuudesta saat kotitalousvähennyksen. Verohallinnon ohjeissa ulkorakennuksen
      kunnostus mainitaan vähennyskelpoisena työnä, ja sama koskee omassa käytössä olevan mökin rakennuksia.
      Pyydä tarjous sivulta <Link to="/tarjouspyynto/">tarjouspyyntö</Link>, ja katso palvelu sivulta{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Piharakennus kirjataan tarjoukseen omana rivinään, ja vähennys koskee myös sitä.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Verohallinto: Mistä töistä kotitalousvähennyksen saa (luettu 26.10.2026)",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/mista-toista-vahennyksen-saa/",
        },
      ]}
    />
  </>
);

export default Body;
