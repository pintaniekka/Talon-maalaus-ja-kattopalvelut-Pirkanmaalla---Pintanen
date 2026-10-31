import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (kausi huhti–toukokuusta elo–syyskuuhun, kuntotarkastus samalla viikolla,
 * "kesän työt täyttyvät pitkälti jo keväällä"), tyovaiheet.ts (sopimus ja
 * aikataulu, yhteydenotto ennen aloituspäivää), asiakaskysymykset 2026 (kysymys 28: milloin tilata). Ei ulkoisia faktoja.
 */
const faq = [
  {
    question: "Milloin kesän 2027 pinnoitus kannattaa tilata?",
    answer:
      "Talvella tai heti keväällä. Kesän työt täyttyvät pitkälti jo keväällä, ja kuntotarkastuksen voi tehdä heti, kun katto on lumeton.",
  },
  {
    question: "Voiko kuntotarkastuksen tehdä talvella?",
    answer:
      "Lumisella katolla ei. Tarjouksen voimme kuitenkin valmistella talvella, ja tarkistamme katon heti, kun lumi on sulanut. Työn ajankohta sovitaan samalla.",
  },
  {
    question: "Saanko valita työn ajankohdan?",
    answer:
      "Kyllä, vapaiden viikkojen rajoissa. Kun hyväksyt tarjouksen, sovimme aikataulun kirjallisesti ja otamme yhteyttä ennen aloituspäivää.",
  },
  {
    question: "Mitä jos tilaan vasta heinäkuussa?",
    answer:
      "Kysy silti. Sateet ja siirrot vapauttavat joskus päiviä. Jos kesä on täynnä, sovimme ajan syksylle. Pinnoituksia teemme elo–syyskuuhun asti.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Pinnoituskausi on huhti–toukokuusta elo–syyskuuhun.</li>
        <li>Kesän työt täyttyvät pitkälti jo keväällä, joten tilaus kannattaa tehdä talvella tai heti lumien sulettua.</li>
        <li>Kuntotarkastus onnistuu, kun katto on lumeton, yleensä samalla viikolla.</li>
        <li>Aikataulu sovitaan kirjallisesti, kun hyväksyt tarjouksen.</li>
      </ul>
    </KeyPoints>

    <p>
      Moni soittaa meille juhannuksen jälkeen ja toivoo pinnoitusta heinäkuulle. Silloin kalenteri on usein jo
      täynnä. Kerromme tässä, miten kausi kulkee ja milloin tilaus kannattaa tehdä, jotta saat haluamasi ajan.
    </p>

    <h2>Miten pinnoituskausi kulkee Pirkanmaalla?</h2>
    <Table
      head={["Aika", "Mitä tapahtuu", "Mitä sinun kannattaa tehdä"]}
      rows={[
        ["Joulu–maaliskuu", "Kalenteri avautuu, tarjouksia valmistellaan", "Ota yhteyttä ja kerro katosta"],
        ["Huhti–toukokuu", "Kuntotarkastukset, kauden ensimmäiset työt", "Varaa kuntotarkastus heti, kun katto on lumeton"],
        ["Kesä–heinäkuu", "Kiirein aika, viikot pitkälti täynnä", "Tilaa ajoissa tai kysy vapautuneita päiviä"],
        ["Elo–syyskuu", "Kauden viimeiset pinnoitukset", "Hyvä aika, jos kevät meni ohi"],
      ]}
      caption="Pinnoituskausi Pirkanmaalla. Teemme pinnoituksia huhti–toukokuusta elo–syyskuuhun."
    />
    <Avainhuomio>Kausi kestää huhti–toukokuusta elo–syyskuuhun, ja kesä–heinäkuu täyttyy ensimmäisenä.</Avainhuomio>

    <h2>Miksi tilaus kannattaa tehdä jo talvella?</h2>
    <p>
      Kolme syytä. Saat valita viikon, jolloin olet itse kotona. Ehdit miettiä värin rauhassa, koska Nowocoatin
      kattomaaleissa on laaja värivalikoima. Ja kuntotarkastus ehditään tehdä heti keväällä ilman kiirettä.
      Talvella voimme valmistella tarjouksen, ja tarkistamme katon lumien sulettua. Tarjous on ilmainen, eikä
      se velvoita tilaamaan. Lue, mitä kuntotarkastuksessa katsomme, artikkelista{" "}
      <Link to="/artikkelit/tiilikaton-kuntotarkastus-mita-tarkistamme/">tiilikaton kuntotarkastus</Link>.
    </p>
    <Avainhuomio>Talvella tilaava saa valita viikon, ja kuntotarkastus tehdään heti lumien sulettua.</Avainhuomio>

    <h2>Mitä tilauksen jälkeen tapahtuu?</h2>
    <ol>
      <li>Kuntotarkastus katolla, kun katto on lumeton. Tulemme yleensä samalla viikolla.</li>
      <li>Kirjallinen tarjous kiinteällä hinnalla.</li>
      <li>Kun hyväksyt tarjouksen, teemme kirjallisen sopimuksen ja sovimme aikataulun.</li>
      <li>Otamme yhteyttä ennen aloituspäivää.</li>
      <li>Työ kestää 2–3 päivää. Sade siirtää päivää, mutta ei nosta hintaa.</li>
    </ol>
    <Figure
      image="tiilikaton-pinnoitus-ylojarvi-punainen-katto-jalkeen"
      alt="Punainen tiilikatto pinnoituksen jälkeen Ylöjärvellä"
      caption="Kesän 2026 kohde Ylöjärvellä. Työ sovittiin keväällä."
    />
    <Avainhuomio>Tilauksesta työhön on viisi vaihetta, ja aikataulu sovitaan kirjallisesti tarjouksen hyväksymisen jälkeen.</Avainhuomio>

    <h2>Kannattaako pinnoitus tehdä keväällä vai syksyllä?</h2>
    <p>
      Molemmat käyvät. Keväällä katto on puhdas talven jäljiltä ja kesä on edessä. Syksyllä katto saa uuden
      pinnan ennen talvea, jolloin tiili ei ime vettä pakkasten alla. Tärkeintä on, että pinta on kuiva ja
      lämpötila riittää maalin kuivumiseen. Sää ratkaisee enemmän kuin kuukausi. Kerromme säästä artikkelissa{" "}
      <Link to="/artikkelit/milloin-tiilikaton-voi-pinnoittaa-saa/">milloin tiilikaton voi pinnoittaa</Link>.
    </p>
    <Avainhuomio>Kevät ja syksy käyvät yhtä hyvin, kun pinta on kuiva ja lämpötila riittää.</Avainhuomio>

    <h2>Miten tilaan?</h2>
    <p>
      Soita Eerikille, lähetä viesti tai täytä <Link to="/tarjouspyynto/">tarjouspyyntö</Link>. Suuntaa antavan
      hinnan saat heti <Link to="/hintalaskuri/?palvelu=pinnoitus">hintalaskurilla</Link>. Pinnoitus maksaa
      yleensä 2 850–7 000 euroa, ja työn osuudesta saat kotitalousvähennyksen. Palvelun esittelemme sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Tarjouspyyntö vie minuutin, ja vastaamme viimeistään seuraavana arkipäivänä.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
