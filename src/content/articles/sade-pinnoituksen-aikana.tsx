import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (sateella ei maalata, seuraamme sääennustetta, uusi päivä ilman lisäkuluja),
 * CLAUDE.md (sateen jäljet korjataan ilman lisähintaa; tarjouksen hinta pitää vaikka työ venyisi), tyovaiheet.ts (pesun
 * jälkeen katto saa kuivua). Nowocoat-esite 2025: täysin kuiva 24 h (20 °C, 60 % RH), päälle maalattavissa n. 2 h.
 * Nowocoatin omaa sateenkestoaikaa ei ole esitteessä, joten sitä ei väitetä.
 */
const faq = [
  {
    question: "Mitä tapahtuu, jos pinnoituspäivänä sataa?",
    answer:
      "Sateella ei maalata, koska tiilen pitää olla kuiva. Seuraamme sääennustetta ja siirrämme päivää tarvittaessa. Siitä ei tule lisäkuluja.",
  },
  {
    question: "Entä jos sade yllättää kesken maalauksen?",
    answer:
      "Lopetamme maalauksen ja annamme katon kuivua. Jos sade jättää jälkiä tuoreeseen pintaan, korjaamme ne ilman lisähintaa.",
  },
  {
    question: "Voiko pestä sateella?",
    answer: "Voi. Pesu painepesulla onnistuu kosteallakin säällä. Pesun jälkeen katto saa joka tapauksessa kuivua ennen maalausta.",
  },
  {
    question: "Nostaako sade hintaa?",
    answer: "Ei. Tarjouksen kiinteä hinta pitää, vaikka työ venyisi sateen takia yhdellä tai kahdella päivällä.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Sateella ei maalata, koska maali tarttuu vain kuivaan tiileen.</li>
        <li>Pesu onnistuu kosteallakin säällä. Maalaus odottaa, kunnes katto on kuiva.</li>
        <li>Sade siirtää päivää, mutta hinta ei muutu. Sateen jäljet korjaamme ilman lisähintaa.</li>
        <li>Seuraamme sääennustetta ja sovimme muutoksista sinun kanssasi.</li>
      </ul>
    </KeyPoints>

    <p>
      Pirkanmaan kesässä sataa. Asiakkaat kysyvät, mitä silloin tapahtuu aikataululle ja hinnalle. Vastaus on
      lyhyt: aikataulu joustaa, hinta ei. Kerromme tässä, miten sade vaikuttaa pinnoituksen eri vaiheisiin.
    </p>

    <h2>Mihin työvaiheisiin sade vaikuttaa?</h2>
    <Table
      head={["Vaihe", "Sateella", "Miksi"]}
      rows={[
        ["Kuntotarkastus", "Onnistuu", "Katto katsotaan myös kostealla säällä"],
        ["Suojaus", "Onnistuu", "Suojaukset laitetaan ennen pesua"],
        ["Pesu painepesulla", "Onnistuu", "Katto kastuu joka tapauksessa"],
        ["Maalaus kahteen kertaan", "Ei", "Maali tarttuu vain kuivaan tiileen"],
      ]}
      caption="Sateen vaikutus pinnoituksen vaiheisiin. Vain maalaus vaatii kuivan sään."
    />
    <Avainhuomio>Pesu onnistuu sateella, mutta maalaus odottaa kuivaa kattoa.</Avainhuomio>

    <h2>Miksi maalaus vaatii kuivan tiilen?</h2>
    <p>
      Märkä tiili on täynnä vettä, eikä maali pääse imeytymään huokosiin. Ensimmäinen kerros jää pintaan ja
      irtoaa myöhemmin. Siksi pesun jälkeen katto saa kuivua ennen maalausta, ja siksi sateella ei maalata.
      Myös maalauksen jälkeen tarvitaan kuiva aika: Nowocoatin mukaan pinta on päälle maalattavissa noin
      kahden tunnin kuluttua ja täysin kuiva vuorokaudessa 20 asteessa. Seuraamme ennustetta ja aloitamme
      maalauksen vasta, kun edessä on riittävän pitkä poutajakso. Kerromme säästä artikkelissa{" "}
      <Link to="/artikkelit/milloin-tiilikaton-voi-pinnoittaa-saa/">milloin tiilikaton voi pinnoittaa</Link>.
    </p>
    <Avainhuomio>Maali tarttuu vain kuivaan tiileen, ja pinta on täysin kuiva vuorokaudessa.</Avainhuomio>

    <h2>Mitä teemme, jos sade yllättää kesken maalauksen?</h2>
    <p>
      Lopetamme ruiskutuksen heti ja suojaamme avatut maalit. Tuore pinta saa kuivua. Kun katto on kuiva,
      katsomme sen läpi. Jos sade on jättänyt jälkiä tuoreeseen maaliin, korjaamme ne ilman lisähintaa.
      Lopputarkastuksessa kierrämme katon yhdessä, ja takuu on sama 5 vuotta. Sinun ei tarvitse huolehtia
      säästä, se on meidän asiamme.
    </p>
    <Figure
      image="tiilikaton-pesu-ja-pinnoitus-orivesi-puoliksi-pesty"
      ratio="3/4"
      alt="Tiilikatto puoliksi pestynä Orivedellä"
      caption="Pesu kesken Orivedellä. Pesu onnistuu kosteallakin säällä, maalaus odottaa kuivaa kattoa."
    />
    <Avainhuomio>Sateen jäljet tuoreessa maalissa korjataan ilman lisähintaa, ja takuu on sama 5 vuotta.</Avainhuomio>

    <h2>Miten sade vaikuttaa aikatauluun ja hintaan?</h2>
    <p>
      Peruskohteen pinnoitus kestää 2–3 päivää. Sade voi venyttää sen neljään tai viiteen, jos väliin tulee
      sadepäivä. Sovimme muutoksista sinun kanssasi. Tarjouksen kiinteä hinta pitää: siirretystä päivästä ei tule lisäkuluja. Hinta on yleensä
      2 850–7 000 euroa. Palvelun esittelemme sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>, ja työn kulun
      artikkelissa <Link to="/artikkelit/tarjouksen-hyvaksymisen-jalkeen/">mitä tarjouksen hyväksymisen jälkeen tapahtuu</Link>.
    </p>
    <Avainhuomio>Sade voi venyttää työn 2–3 päivästä viiteen, mutta 2 850–7 000 euron hinta pysyy samana.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
