import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Milloin tiilikaton pinnoitus riittää?",
    answer:
      "Kun aluskate ja katon puurakenteet ovat kunnossa ja vika on tiilen kuluneessa pinnassa. Yksittäiset rikkinäiset tiilet vaihdetaan pinnoituksen yhteydessä.",
  },
  {
    question: "Milloin katto pitää uusia?",
    answer:
      "Kun aluskate on laajasti vaurioitunut, rakenteissa on vuotoja tai lahoa tai tiiliä on rikki niin paljon, ettei vaihtaminen ole järkevää. Pinnoitus ei korjaa rakenteellisia ongelmia.",
  },
  {
    question: "Kuinka paljon pinnoitus maksaa uuteen kattoon verrattuna?",
    answer:
      "Pintasen mukaan pinnoitus maksaa tyypillisesti noin 10–20 % uuden katon hinnasta. Omakotitalon pinnoitus maksaa 2 850–4 880 euroa.",
  },
  {
    question: "Kuinka kauan pinnoitus pidentää katon käyttöikää?",
    answer:
      "Pinnoitus pidentää katon käyttöikää 10–15 vuotta. Todellinen kesto riippuu sääolosuhteista ja katon kunnosta.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Jos aluskate ja puurakenteet ovat kunnossa, koko katon uusiminen on usein tarpeetonta.</li>
        <li>Pinnoitus maksaa tyypillisesti noin 10–20 % uuden katon hinnasta.</li>
        <li>Pinnoitus pidentää katon käyttöikää 10–15 vuotta.</li>
        <li>Pinnoitus ei korjaa rakenteellisia vaurioita.</li>
      </ul>
    </KeyPoints>

    <p>
      Kun tiilikatto alkaa näyttää kuluneelta, moni pyytää tarjouksen kattoremontista ja säikähtää summaa. Usein
      kysymys on kuitenkin väärin asetettu. Olennaista ei ole katon ikä tai ulkonäkö, vaan se, mikä osa katosta on
      kulunut: tiilen pinta vai sen alla olevat rakenteet.
    </p>

    <h2>Nyrkkisääntö: aluskate ja rakenteet ratkaisevat</h2>
    <p>
      Tiilikatossa on kaksi kerrosta, jotka pitävät veden ulkona. Tiilet ohjaavat sadeveden pois, ja niiden alla
      oleva aluskate suojaa rakenteita vedeltä, tuulelta ja pölyltä. Aluskatteen on kestettävä yhtä kauan kuin itse
      katteen.
    </p>
    <p>
      Jos aluskate ja katon puurakenteet ovat hyvässä kunnossa, täysimittainen kattoremontti on usein tarpeeton.
      Silloin kulunut osa on tiilen pinta, ja sen voi uusia pinnoittamalla.
    </p>

    <h2>Kuinka kauan betonitiilikatto kestää?</h2>
    <p>
      Betonitiili on pitkäikäinen katemateriaali. K-Raudan ohjeen mukaan VTT:n tutkimuksissa kattotiilen
      elinkaareksi on todettu jopa 70 vuotta. Tiili ei siis yleensä ole katon heikoin lenkki, vaan sen tehtaalla
      tehty pintakäsittely, joka kuluu tyypillisesti 10–15 vuodessa. Kun pinta kuluu, tiili alkaa imeä vettä ja
      sammal saa otteen.
    </p>

    <h2>Milloin pinnoitus riittää?</h2>
    <ul>
      <li>Väri on haalistunut ja pinta tuntuu karhealta.</li>
      <li>Sammal palaa nopeasti puhdistuksen jälkeen.</li>
      <li>Rikkinäisiä tiiliä on vain yksittäisiä.</li>
      <li>Aluskate on ehjä eikä ullakolla näy vuotojälkiä.</li>
    </ul>
    <p>
      Yksittäiset rikkinäiset tiilet vaihdetaan pinnoituksen yhteydessä, ja pienet aluskatteen vauriot voidaan
      korjata samalla. Merkit on käyty tarkemmin läpi artikkelissa{" "}
      <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto">milloin tiilikatto pitää pinnoittaa</Link>.
    </p>
    <Figure
      image="tummanharmaa-kattotiili-pesu-ja-pinnoitustyo"
      alt="Tummanharmaa tiilikatto pesu- ja pinnoitustyön aikana"
      caption="Pinnoituksessa uusitaan tiilen kulunut pinta, ei koko kattoa."
    />

    <h2>Milloin katto pitää uusia?</h2>
    <p>Pinnoitus ei korjaa rakenteellisia ongelmia. Uusi katto on oikea ratkaisu, kun:</p>
    <ul>
      <li>aluskate on laajasti vaurioitunut</li>
      <li>rakenteissa on vuotoja tai lahoa</li>
      <li>tiiliä on rikki niin paljon, ettei niiden vaihtaminen ole järkevää.</li>
    </ul>
    <p>
      Tästä syystä Pintanen tarkistaa ennen tarjousta tiilien lisäksi aina aluskatteen ja läpiviennit. Jos vauriot
      ovat suuria, se kerrotaan suoraan eikä pinnoitusta suositella.
    </p>

    <h2>Hintaero on suuri</h2>
    <p>
      Kattoremontin hinta vaihtelee noin tuhannen euron korjauksista useisiin kymmeniin tuhansiin euroihin. Siihen
      vaikuttavat remontin laajuus, katon pinta-ala ja kaltevuus, materiaali sekä mahdollinen sääsuoja.
    </p>
    <p>
      Pintasen mukaan pinnoitus maksaa tyypillisesti noin 10–20 % uuden katon hinnasta, ja ajoissa tehty pinnoitus
      voi säästää jopa 15 000 euroa. Omakotitalon pinnoitus maksaa 2 850–4 880 euroa, ja työn osuudesta saa
      kotitalousvähennyksen. Hinnan muodostuminen on avattu artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-hinta">tiilikaton pinnoituksen hinta</Link>.
    </p>

    <h2>Miten katon kunto selvitetään?</h2>
    <ol>
      <li>Katso tiilien pintaa: väri, karheus, sammal ja halkeamat.</li>
      <li>Käy ullakolla: näkyykö aluskatteessa repeämiä tai puussa tummia vuotojälkiä?</li>
      <li>Tarkista läpiviennit, kuten piipun juuri ja tuuletusputket.</li>
      <li>Pyydä kuntoarvio, jos olet epävarma. Pintasen arviokäynti on maksuton.</li>
    </ol>
    <p>
      Lisää pinnoituksesta sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa">tiilikaton pinnoitus</Link>.
    </p>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
