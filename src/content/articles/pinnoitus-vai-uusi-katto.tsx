import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Milloin tiilikaton pinnoitus riittää?",
    answer:
      "Pinnoitus riittää, kun aluskate ja katon puurakenteet ovat kunnossa ja vain tiilen pinta on kulunut. Yksittäiset rikkinäiset tiilet vaihdetaan uusiin pinnoituksen yhteydessä.",
  },
  {
    question: "Milloin tiilikatto pitää uusia?",
    answer:
      "Katto pitää uusia, kun aluskate on pahasti vaurioitunut, rakenteissa on vuotoja tai lahoa tai tiiliä on rikki niin paljon, ettei niitä kannata vaihtaa. Pinnoitus ei korjaa rakenteiden vaurioita.",
  },
  {
    question: "Paljonko pinnoitus maksaa uuteen kattoon verrattuna?",
    answer:
      "Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä 2 850–7 000 euroa. Kattoremontti maksaa kattourakoitsijoiden hintasivujen mukaan yleensä 15 000–30 000 euroa.",
  },
  {
    question: "Kuinka monta vuotta pinnoitus antaa katolle lisää?",
    answer: "Pinnoitus pidentää katon käyttöikää jopa 15 vuotta. Kesto riippuu säästä ja katon kunnosta.",
  },
  {
    question: "Saako kattoremontista ja pinnoituksesta kotitalousvähennyksen?",
    answer:
      "Kummastakin saa vähennyksen työn osuudesta. Vuosina 2026 ja 2027 vähennys on 40 % työn osuudesta ja enintään 2 100 euroa henkilöltä.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Jos aluskate ja puurakenteet ovat kunnossa, kattoa ei yleensä tarvitse uusia.</li>
        <li>Pinnoitus maksaa yleensä 2 850–7 000 euroa, kattoremontti yleensä 15 000–30 000 euroa.</li>
        <li>Pinnoitus pidentää katon käyttöikää jopa 15 vuotta.</li>
        <li>Rakenteiden vaurioita pinnoitus ei korjaa.</li>
      </ul>
    </KeyPoints>

    <p>
      Tiilikatto näyttää kuluneelta, ja mietit, pitääkö koko katto uusia. Usein ei pidä. Katon ikä tai ulkonäkö ei
      kerro vastausta. Tärkeintä on tietää, kumpi on kulunut: tiilen pinta vai rakenteet tiilen alla.
    </p>

    <h2>Pinnoitus vai uusi katto: mistä sen tietää?</h2>
    <p>
      Tiilikatossa on kaksi kerrosta, jotka pitävät veden ulkona. Tiilet ohjaavat sadeveden pois. Tiilten alla on
      aluskate, joka suojaa rakenteita vedeltä, tuulelta ja pölyltä.
    </p>
    <p>
      Jos aluskate ja katon puurakenteet ovat kunnossa, koko kattoa ei yleensä tarvitse uusia. Silloin vain tiilen
      pinta on kulunut, ja sen saa kuntoon pinnoittamalla.
    </p>

    <h2>Kuinka kauan tiilikatto kestää?</h2>
    <p>
      Tiili kestää pitkään. K-Raudan ohjeen mukaan VTT:n tutkimuksissa kattotiilen elinkaareksi on todettu jopa 70
      vuotta, ja valmistajan mukaan betonitiili kestää huollettuna 50–70 vuotta. Tiilen tehdaspinnoite kuluu paljon
      nopeammin, yleensä noin 15 vuodessa. Kun pinnoite on kulunut, tiili alkaa imeä vettä ja sammal tarttuu siihen.
    </p>

    <Avainhuomio>Tiilen tehdaspinnoite kuluu noin 15 vuodessa, vaikka tiili itse kestää jopa 70 vuotta.</Avainhuomio>
    <h2>Milloin tiilikaton pinnoitus riittää?</h2>
    <p>Pinnoitus riittää, kun katossa on nämä merkit:</p>
    <ul>
      <li>Väri on haalistunut ja pinta tuntuu karhealta.</li>
      <li>Sammal kasvaa takaisin nopeasti.</li>
      <li>Rikkinäisiä tiiliä on vain muutama.</li>
      <li>Aluskate on ehjä, eikä ullakolla näy vuotojälkiä.</li>
    </ul>
    <p>
      Vaihdamme rikkinäiset tiilet uusiin pinnoituksen yhteydessä ja korjaamme samalla pienet aluskatteen vauriot. Kuluneen pinnan merkit näet artikkelista{" "}
      <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto/">milloin tiilikatto pitää pinnoittaa</Link>.
    </p>
    <Figure
      image="tiilikaton-pesu-ja-pinnoitus-tummanharmaa-kattotiili"
      ratio="3/4"
      alt="Tummanharmaa tiilikatto pesu- ja pinnoitustyön aikana"
      caption="Pinnoituksessa tiili saa uuden pinnan. Kattoa ei pureta."
    />

    <h2>Milloin katto pitää uusia?</h2>
    <p>Pinnoitus ei korjaa rakenteita. Katto pitää uusia, kun</p>
    <ul>
      <li>aluskate on pahasti vaurioitunut</li>
      <li>rakenteissa on vuotoja tai lahoa</li>
      <li>tiiliä on rikki niin paljon, ettei niitä kannata vaihtaa.</li>
    </ul>
    <p>
      Siksi tarkistamme ennen tarjousta aina katon, aluskatteen ja ympäristön. Jos vauriot ovat isoja, sanomme sen
      suoraan emmekä suosittele pinnoitusta.
    </p>

    <h2>Paljonko tiilikattoremontti maksaa verrattuna pinnoitukseen?</h2>
    <Table
      head={["", "Hinta yleensä", "Kesto", "Lisäikä"]}
      rows={[
        ["Tiilikaton pinnoitus", "2 850–7 000 €", "2–3 päivää", "jopa 15 vuotta"],
        ["Kattoremontti", "15 000–30 000 €", "viikkoja", "uusi katto"],
      ]}
      caption="Pinnoituksen hinnat ovat omiamme. Kattoremontin hinnat ovat kattourakoitsijoiden omilta hintasivuilta; isot rakenteiden korjaukset nostavat hintaa."
    />
    <p>
      Omakotitalon kattoremontti maksaa yleensä 15 000–30 000 euroa. Kattourakoitsijoiden omilla hintasivuilla tiilikaton
      uusimisen hinta on 18 000–30 000 euroa, ja isot rakenteiden korjaukset nostavat hintaa siitä. Hintaan vaikuttavat katon
      koko, kaltevuus, materiaali ja rakenteiden kunto.
    </p>
    <p>
      Pinnoitus maksaa yleensä selvästi vähemmän kuin uusi katto. Omakotitalon tiilikaton pinnoitus maksaa meillä
      yleensä 2 850–7 000 euroa, ja työn osuudesta saat kotitalousvähennyksen. Lue lisää artikkelista{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link>.
    </p>

    <Avainhuomio>Pinnoitus maksaa yleensä 2 850–7 000 €, kattoremontti yleensä 15 000–30 000 €.</Avainhuomio>
    <h2>Miten kotitalousvähennys vaikuttaa vertailuun?</h2>
    <p>
      Molemmista töistä saa kotitalousvähennyksen työn osuudesta. Vuosina 2026 ja 2027 vähennys on 40 % työn
      osuudesta, enintään 2 100 euroa henkilöltä, ja omavastuu on 150 euroa. Pinnoituksessa työn osuus on iso osa
      hinnasta, koska pesu, tiilien vaihto ja maalaus ovat käsityötä. Kattoremontissa materiaalien osuus on
      suurempi, eikä niistä saa vähennystä. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/">kotitalousvähennys katto- ja maalaustöissä</Link>.
    </p>

    <h2>Miten voit tarkistaa katon kunnon itse?</h2>
    <ol>
      <li>Katso tiiliä. Onko väri haalistunut? Onko pinta karhea? Näkyykö sammalta tai halkeamia?</li>
      <li>Käy ullakolla. Onko aluskatteessa repeämiä? Näkyykö puussa tummia vuotojälkiä?</li>
      <li>Katso läpiviennit, kuten piipun juuri ja tuuletusputket.</li>
      <li>Jos et ole varma, pyydä meidät katsomaan. Kuntotarkastus on ilmainen.</li>
    </ol>
    <p>
      Lue lisää sivulta <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>. Tampereella
      tehdyistä töistä kerromme sivulla <Link to="/tiilikaton-pinnoitus-tampere/">tiilikaton pinnoitus Tampere</Link>.
    </p>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        { label: "K-Rauta: Tiilikaton asennus", url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/rakentaminen/tiilikaton-asennus" },
        { label: "Laatukoti: Kattoremontin hinta (15.5.2025)", url: "https://laatukoti.fi/kattoremontti/kattoremontin-hinta/" },
        { label: "Kattokeskus: Kattoremontin hinta 2026", url: "https://kattokeskus.fi/kattoremontin-hinta/" },
        { label: "Saneerauspojat: Kattoremontin hintaopas 2026", url: "https://www.saneerauspojat.fi/kattoremontin-hintaopas-2026/" },
        {
          label: "BMI Suomi: Usein kysytyt kysymykset, BMI Ormax -betonikattotiilet (käyttöikä 50–70 vuotta, luettu 26.10.2026)",
          url: "https://bmifinland.zendesk.com/hc/fi-fi/articles/33093701704082-Usein-kysytyt-kysymykset-BMI-Ormax-betonikattotiilet",
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
