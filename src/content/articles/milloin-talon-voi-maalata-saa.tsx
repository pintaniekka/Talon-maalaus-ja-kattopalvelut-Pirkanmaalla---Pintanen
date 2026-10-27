import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (kausi huhti–toukokuusta elo–syyskuuhun, maalaamme kun seinä on kuiva ja
 * ilman kosteus alle 80 %, sateella ei maalata, siirrosta ei lisäkulua). Yleiset faktat: Tikkurila, How to paint wooden
 * façades (docs/sisallon-lahteet-2026-10-12.md): ei alle 5 °C eikä yli 30 °C, suhteellinen kosteus alle 80 %, paras sää
 * pilvinen ja kuiva 15–20 °C. K-Rauta, ulkomaalausohje (26.10.2026): puun kosteus enintään 20 %, poutapilvinen päivä.
 */
const faq = [
  {
    question: "Missä lämpötilassa talon voi maalata?",
    answer:
      "Maalin valmistajan mukaan seinän ja ilman lämpötilan pitää olla 5–30 astetta. Paras sää on pilvinen ja kuiva, 15–20 astetta.",
  },
  {
    question: "Voiko maalata, jos yöllä on ollut sadetta?",
    answer:
      "Vasta kun seinä on kuivunut. Puun kosteuden pitää olla enintään 20 prosenttia. Tarkistamme, että seinä on kuiva, ennen kuin maalaamme.",
  },
  {
    question: "Mitä tapahtuu, jos sovittuna päivänä sataa?",
    answer:
      "Siirrämme päivää. Seuraamme sääennustetta ja sovimme uuden ajan. Siitä ei tule lisäkuluja, ja tarjouksen hinta pitää.",
  },
  {
    question: "Voiko maalata syyskuussa?",
    answer:
      "Voi, jos päivät ovat kuivia ja lämpötila pysyy yli 5 asteessa myös yöllä. Maalauskautemme kestää elo–syyskuuhun.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Maalaamme, kun seinä on kuiva ja ilman kosteus on alle 80 prosenttia.</li>
        <li>Lämpötilan pitää olla 5–30 astetta. Paras sää on pilvinen ja kuiva, 15–20 astetta.</li>
        <li>Puun kosteuden pitää olla enintään 20 prosenttia.</li>
        <li>Sateella ei maalata, ja siirretystä päivästä ei tule lisäkuluja.</li>
      </ul>
    </KeyPoints>

    <p>
      Sää ratkaisee, kestääkö maali. Liian kylmässä maali ei kuivu, liian kuumassa se kuivuu pintaan ennen
      kuin tarttuu puuhun, ja märkään seinään se ei tartu lainkaan. Kerromme tässä, mitä rajoja noudatamme ja
      miksi.
    </p>

    <h2>Mikä lämpötila sopii talon maalaukseen?</h2>
    <p>
      Tikkurilan ohjeen mukaan ei maalata, jos pinnan tai ilman lämpötila on alle 5 astetta tai yli 30 astetta.
      Paras sää on pilvinen ja kuiva, 15–20 astetta. Suorassa auringonpaisteessa seinä voi olla paljon
      ilmaa kuumempi, ja maali kuivuu liian nopeasti. Siksi paahteinen seinä saa odottaa, kunnes se on varjossa.
    </p>
    <Table
      head={["Sää", "Maalataanko", "Miksi"]}
      rows={[
        ["Pilvipouta 15–20 °C", "Kyllä", "Maali tarttuu ja kuivuu tasaisesti"],
        ["Aurinkoinen helle yli 30 °C", "Ei paahteisella seinällä", "Maali kuivuu pintaan ennen tartuntaa"],
        ["Alle 5 °C", "Ei", "Maali ei kuivu eikä muodosta kalvoa"],
        ["Sade tai kostea seinä", "Ei", "Maali ei tartu märkään puuhun"],
        ["Ilman kosteus yli 80 %", "Ei", "Kuivuminen pysähtyy"],
      ]}
      caption="Maalaussää Tikkurilan ja K-Raudan ohjeiden mukaan. Sama raja koskee myös yötä maalauksen jälkeen."
    />
    <Avainhuomio>Maalaamme 5–30 asteessa, ja paras sää on pilvinen ja kuiva 15–20 astetta.</Avainhuomio>

    <h2>Miksi seinän pitää olla kuiva?</h2>
    <p>
      Märkä puu ei ota maalia vastaan. Jos maali levitetään kosteaan lautaan, kosteus pyrkii myöhemmin ulos ja
      nostaa maalin irti. K-Raudan ohjeen mukaan puun kosteuden pitää olla enintään 20 prosenttia. Siksi homepesun
      jälkeen seinä saa kuivua, ja sateen jälkeen odotamme. Tarkistamme seinän kuivuuden ennen kuin pensseli tulee
      esiin. Kerromme pohjatöistä artikkelissa{" "}
      <Link to="/artikkelit/miksi-vanha-maali-kaavitaan/">kaavinta ja homepesu: miksi pohjatyöt ratkaisevat</Link>.
    </p>
    <Avainhuomio>Puun kosteuden pitää olla enintään 20 prosenttia, ja tarkistamme kuivuuden ennen maalausta.</Avainhuomio>

    <h2>Mitä tapahtuu, jos sataa kesken työn?</h2>
    <p>
      Lopetamme maalauksen ja suojaamme avatut maalit. Kun seinä on kuivunut, jatkamme. Sateen jäljet
      korjaamme ilman lisähintaa. Siirretystä päivästä ei tule lisäkuluja, ja tarjouksen kiinteä hinta pitää.
      Seuraamme sääennustetta ja sovimme muutoksista sinun kanssasi.
    </p>
    <Figure
      image="talon-maalaus-julkisivun-ja-ikkunoiden-suojaus"
      ratio="3/4"
      alt="Julkisivun ja ikkunoiden suojaus ennen talon maalausta"
      caption="Suojaukset pysyvät paikoillaan sadepäivän yli, ja työ jatkuu kuivalla säällä."
    />
    <Avainhuomio>Sade siirtää päivää, mutta hinta ei muutu eikä sateen jäljistä tule laskua.</Avainhuomio>

    <h2>Milloin maalauskausi alkaa ja loppuu?</h2>
    <p>
      Maalaamme huhti–toukokuusta elo–syyskuuhun. Keväällä odotamme, että yöpakkaset loppuvat ja seinät
      kuivuvat. Syksyllä raja tulee vastaan, kun yöt viilenevät alle 5 asteen ja aamukaste pitää seinät
      märkinä pitkälle päivään. Kesän työt kannattaa sopia keväällä. Hinta on yleensä 3 500–11 000 euroa, ja
      palvelun esittelemme sivulla <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Kausi kestää huhti–toukokuusta elo–syyskuuhun, ja raja on 5 asteen yölämpötila.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Tikkurila: How to paint wooden façades and fences (luettu 12.10.2026)",
          url: "https://tikkurila.com/pro/how-to-paint-wooden-facades-and-fences",
        },
        {
          label: "K-Rauta: Ulkomaalausohje (luettu 26.10.2026)",
          url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/ulkomaalausohje",
        },
      ]}
    />
  </>
);

export default Body;
