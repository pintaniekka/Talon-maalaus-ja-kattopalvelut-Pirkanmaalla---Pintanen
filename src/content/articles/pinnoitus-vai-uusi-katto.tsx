import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Milloin tiilikaton pinnoitus riittää?",
    answer:
      "Kun aluskate ja katon puurakenteet ovat kunnossa ja kulunut on vain tiilen pinta. Yksittäiset rikkinäiset tiilet vaihdetaan pinnoituksen yhteydessä.",
  },
  {
    question: "Milloin tiilikatto pitää uusia?",
    answer:
      "Kun aluskate on laajasti vaurioitunut, rakenteissa on vuotoja tai lahoa tai tiiliä on rikki niin paljon, ettei vaihtaminen kannata. Pinnoitus ei korjaa rakenteellisia vaurioita.",
  },
  {
    question: "Paljonko pinnoitus maksaa uuteen kattoon verrattuna?",
    answer:
      "Arviomme mukaan pinnoitus maksaa tyypillisesti noin 10–20 % uuden katon hinnasta. Omakotitalon pinnoitus maksaa meillä 2 850–4 880 euroa.",
  },
  {
    question: "Kuinka monta vuotta pinnoitus antaa katolle lisää?",
    answer: "Pinnoitus pidentää katon käyttöikää 10–15 vuotta. Kesto riippuu sääolosuhteista ja katon kunnosta.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Jos aluskate ja puurakenteet ovat kunnossa, kattoa ei yleensä tarvitse uusia.</li>
        <li>Pinnoitus maksaa tyypillisesti noin 10–20 % uuden katon hinnasta.</li>
        <li>Pinnoitus pidentää katon käyttöikää 10–15 vuotta.</li>
        <li>Rakenteellisia vaurioita pinnoitus ei korjaa.</li>
      </ul>
    </KeyPoints>

    <p>
      Kulunut tiilikatto saa monen pyytämään tarjouksen kattoremontista, ja summa säikäyttää. Usein remonttia ei
      tarvita. Katon ikä tai ulkonäkö ei kerro paljon. Pitää tietää, kumpi on kulunut: tiilen pinta vai sen alla
      olevat rakenteet.
    </p>

    <h2>Pinnoitus vai uusi katto: mistä sen tietää?</h2>
    <p>
      Tiilikatossa vettä pitää kaksi kerrosta. Tiilet ohjaavat sadeveden pois, ja niiden alla oleva aluskate
      suojaa rakenteita vedeltä, tuulelta ja pölyltä. Jos aluskate ja katon puurakenteet ovat hyvässä kunnossa,
      koko katon uusiminen on usein turhaa. Silloin kulunut on tiilen pinta, ja sen voi uusia pinnoittamalla.
    </p>
    <Table
      head={["", "Pinnoitus riittää", "Katto pitää uusia"]}
      rows={[
        ["Tiilet", "Haalistuneet, karheat, sammaleiset", "Laajasti haljenneet tai lohkeilleet"],
        ["Rikkinäiset tiilet", "Yksittäisiä", "Paljon"],
        ["Aluskate", "Ehjä tai pieniä vaurioita", "Laajasti vaurioitunut"],
        ["Rakenteet", "Kuivat ja terveet", "Vuotojälkiä tai lahoa"],
      ]}
    />

    <h2>Kuinka kauan betonitiilikatto kestää?</h2>
    <p>
      Betonitiili on pitkäikäinen. K-Raudan ohjeen mukaan VTT:n tutkimuksissa kattotiilen elinkaareksi on todettu
      jopa 70 vuotta. Tiili itse kestää siis yleensä pidempään kuin sen tehdaspinnoite, joka kuluu tavallisesti
      10–15 vuodessa. Kun pinnoite on kulunut, tiili imee vettä ja sammal saa otteen.
    </p>

    <h2>Milloin pinnoitus riittää?</h2>
    <ul>
      <li>Väri on haalistunut ja pinta tuntuu karhealta.</li>
      <li>Sammal palaa pian puhdistuksen jälkeen.</li>
      <li>Rikkinäisiä tiiliä on vain muutama.</li>
      <li>Aluskate on ehjä, eikä ullakolla näy vuotojälkiä.</li>
    </ul>
    <p>
      Vaihdamme yksittäiset rikkinäiset tiilet pinnoituksen yhteydessä ja korjaamme samalla pienet aluskatteen
      vauriot. Kuluneen pinnan merkit on kuvattu artikkelissa{" "}
      <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto">milloin tiilikatto pitää pinnoittaa</Link>.
    </p>
    <Figure
      image="tummanharmaa-kattotiili-pesu-ja-pinnoitustyo"
      alt="Tummanharmaa tiilikatto pesu- ja pinnoitustyön aikana"
      caption="Pinnoituksessa uusitaan tiilen kulunut pinta, koko kattoa ei pureta."
    />

    <h2>Milloin katto pitää uusia?</h2>
    <p>Pinnoitus ei korjaa rakenteita. Katto pitää uusia, kun</p>
    <ul>
      <li>aluskate on laajasti vaurioitunut</li>
      <li>rakenteissa on vuotoja tai lahoa</li>
      <li>tiiliä on rikki niin paljon, ettei niiden vaihtaminen kannata.</li>
    </ul>
    <p>
      Tarkistamme siksi ennen tarjousta aina myös aluskatteen ja läpiviennit. Jos vauriot ovat isoja, sanomme sen
      suoraan emmekä suosittele pinnoitusta.
    </p>

    <h2>Paljonko pinnoitus maksaa verrattuna uuteen kattoon?</h2>
    <p>
      Kattoremontin hinta vaihtelee noin tuhannen euron korjauksista useisiin kymmeniin tuhansiin euroihin. Hintaan
      vaikuttavat remontin laajuus, katon pinta-ala ja kaltevuus, materiaali ja mahdollinen sääsuoja.
    </p>
    <p>
      Arviomme mukaan pinnoitus maksaa tyypillisesti noin 10–20 % uuden katon hinnasta, ja ajoissa tehty pinnoitus
      voi säästää jopa 15 000 euroa. Omakotitalon pinnoitus maksaa meillä 2 850–4 880 euroa, ja työn osuudesta saa
      kotitalousvähennyksen. Tarkemmat hinnat ovat artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-hinta">tiilikaton pinnoituksen hinta</Link>.
    </p>

    <h2>Miten katon kunnon voi tarkistaa itse?</h2>
    <ol>
      <li>Katso tiiliä: väri, karheus, sammal ja halkeamat.</li>
      <li>Käy ullakolla. Onko aluskatteessa repeämiä tai puussa tummia vuotojälkiä?</li>
      <li>Katso läpiviennit, kuten piipun juuri ja tuuletusputket.</li>
      <li>Pyydä kuntoarvio, jos jokin jää epäselväksi. Arviokäyntimme on maksuton.</li>
    </ol>
    <p>
      Lisää pinnoituksesta sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        { label: "K-Rauta: Tiilikaton asennus", url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/rakentaminen/tiilikaton-asennus" },
        { label: "Summarum: Kattoremontti", url: "https://www.summarum.fi/lainaa/remonttilaina/kattoremontti/" },
      ]}
    />
  </>
);

export default Body;
