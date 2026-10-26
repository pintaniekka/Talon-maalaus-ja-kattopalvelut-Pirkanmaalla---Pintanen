import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Vuoden 2027 päätösopas. Kattoremontin hinta 15 000–30 000 € kattourakoitsijoiden hintasivuilta
 * (docs/sisallon-lahteet-2026-10-12.md), pinnoitus prices.ts, lisäikä jopa 15 vuotta, kotitalousvähennys vero.fi
 * (26.10.2026), betonitiilen käyttöikä 50–70 vuotta BMI:n UKK:sta (26.10.2026).
 */
const faq = [
  {
    question: "Paljonko kattoremontti maksaa vuonna 2027?",
    answer:
      "Omakotitalon kattoremontti maksaa kattourakoitsijoiden omien hintasivujen mukaan yleensä 15 000–30 000 euroa. Tiilikaton pinnoitus maksaa meillä yleensä 2 850–7 000 euroa.",
  },
  {
    question: "Kuinka monta vuotta pinnoitus antaa katolle lisää?",
    answer: "Pinnoitettu katto kestää jopa 15 vuotta pidempään. Tiili itse kestää valmistajan mukaan 50–70 vuotta.",
  },
  {
    question: "Saako kattoremontista ja pinnoituksesta kotitalousvähennyksen?",
    answer:
      "Kummastakin saa vähennyksen työn osuudesta. Vuonna 2027 vähennys on 40 % työn osuudesta ja enintään 2 100 euroa henkilöltä.",
  },
  {
    question: "Milloin pinnoitus ei riitä?",
    answer:
      "Kun aluskate on pahasti vaurioitunut, rakenteissa on vuotoja tai lahoa, tai tiiliä on rikki niin paljon, ettei niitä kannata vaihtaa. Kerromme sen kuntotarkastuksessa suoraan.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Kattoremontti maksaa yleensä 15 000–30 000 euroa, tiilikaton pinnoitus 2 850–7 000 euroa.</li>
        <li>Pinnoitus riittää, kun aluskate ja rakenteet ovat kunnossa. Se antaa katolle jopa 15 vuotta lisää.</li>
        <li>Kattoremontti on oikea valinta, kun aluskate vuotaa tai rakenteissa on lahoa.</li>
        <li>Molemmista saa vuonna 2027 kotitalousvähennyksen: 40 % työn osuudesta, enintään 2 100 euroa henkilöltä.</li>
      </ul>
    </KeyPoints>

    <p>
      Katto on kulunut, ja edessä on päätös: uusi katto vai pinnoitus. Vuonna 2027 ero hinnassa on yhä iso, ja
      väärä valinta maksaa kumpaankin suuntaan. Liian aikainen remontti hukkaa kymmeniä tuhansia. Liian myöhäinen
      pinnoitus ei auta, jos rakenteet ovat jo märkiä. Kerromme, mistä päätös tehdään.
    </p>

    <h2>Mitä kattoremontti ja pinnoitus maksavat vuonna 2027?</h2>
    <Table
      head={["", "Hinta yleensä", "Kesto", "Lisäikä"]}
      rows={[
        ["Tiilikaton pinnoitus", "2 850–7 000 €", "2–3 päivää", "jopa 15 vuotta"],
        ["Kattoremontti", "15 000–30 000 €", "viikkoja", "uusi katto"],
      ]}
      caption="Pinnoituksen hinnat ovat omiamme. Kattoremontin hinnat ovat kattourakoitsijoiden omilta hintasivuilta; isot rakenteiden korjaukset nostavat hintaa."
    />
    <p>
      Pinnoituksessa katto pestään, rikkinäiset tiilet vaihdetaan uusiin ja katto maalataan kahteen kertaan.
      Kattoremontissa vanha kate puretaan ja tilalle tulee uusi aluskate, ruoteet ja tiilet.
    </p>
    <Avainhuomio>Pinnoitus maksaa yleensä 2 850–7 000 euroa ja kattoremontti 15 000–30 000 euroa, eli ero on usein yli 10 000 euroa.</Avainhuomio>

    <h2>Milloin pinnoitus riittää?</h2>
    <p>
      Tiilikatossa on kaksi vesitiivistä kerrosta: tiilet ja niiden alla aluskate. Jos aluskate ja puurakenteet ovat
      kunnossa, vain tiilen pinta on kulunut. Sen saa kuntoon pinnoittamalla. Valmistajan mukaan betonitiili kestää
      huollettuna 50–70 vuotta, joten 10–15 vuotta vanha tiili on vasta alussa.
    </p>
    <p>Pinnoitus riittää, kun</p>
    <ul>
      <li>väri on haalistunut ja pinta tuntuu karhealta</li>
      <li>sammal kasvaa takaisin nopeasti</li>
      <li>rikkinäisiä tiiliä on vain muutama</li>
      <li>aluskate on ehjä, eikä ullakolla näy vuotojälkiä.</li>
    </ul>
    <Figure
      image="tiilikaton-pinnoitus-valkeakoski-harmaa-katto-jalkeen"
      alt="Harmaa tiilikatto Valkeakoskella pinnoituksen jälkeen"
      caption="Valkeakoskella katto sai uuden pinnan pinnoituksella. Rakenteisiin ei tarvinnut koskea."
    />
    <Avainhuomio>Jos ullakolla ei näy vuotojälkiä ja rikkinäisiä tiiliä on alle kourallinen, pinnoitus riittää lähes aina.</Avainhuomio>

    <h2>Milloin kattoremontti on oikea valinta?</h2>
    <p>Pinnoitus ei korjaa rakenteita. Katto pitää uusia, kun</p>
    <ul>
      <li>aluskate on pahasti vaurioitunut tai se puuttuu</li>
      <li>rakenteissa on vuotoja tai lahoa</li>
      <li>tiiliä on rikki niin paljon, ettei niitä kannata vaihtaa.</li>
    </ul>
    <p>
      Tässä tilanteessa sanomme sen kuntotarkastuksessa suoraan. Pinnoitettu katto näyttäisi hyvältä, mutta
      vuoto jatkuisi tiilen alla. Pienet aluskatteen korjaukset teemme pinnoituksen yhteydessä.
    </p>
    <Avainhuomio>Vuotava aluskate on ainoa syy, joka tekee pinnoituksesta turhan, ja se näkyy ullakolta.</Avainhuomio>

    <h2>Miten kotitalousvähennys vaikuttaa vertailuun?</h2>
    <p>
      Molemmista töistä saa kotitalousvähennyksen työn osuudesta. Vuonna 2027 vähennys on 40 % työn osuudesta,
      enintään 2 100 euroa henkilöltä, ja omavastuu on 150 euroa. Pinnoituksessa työn osuus on iso osa hinnasta,
      koska pesu, tiilien vaihto ja maalaus ovat käsityötä. Kattoremontissa materiaalien osuus on suurempi, eikä
      niistä saa vähennystä. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/kotitalousvahennys-2027-katon-pinnoitus-ja-talon-maalaus/">
        kotitalousvähennys 2027 katon pinnoituksessa ja talon maalauksessa
      </Link>
      .
    </p>
    <Avainhuomio>Vähennys on kummassakin enintään 2 100 euroa henkilöltä, joten se kaventaa hintaeroa vain vähän.</Avainhuomio>

    <h2>Miten päätät oikein?</h2>
    <ol>
      <li>Käy ullakolla. Tummat vuotojäljet puussa tai repeämät aluskatteessa kertovat remontista.</li>
      <li>Katso tiilet. Haalistunut väri, karhea pinta ja sammal kertovat pinnoituksesta.</li>
      <li>Laske rikkinäiset tiilet. Muutama vaihdetaan, kymmenet ovat jo merkki muusta.</li>
      <li>Pyydä ilmainen kuntotarkastus. Tarkistamme tiilet, saumat, piipun ympäryksen, läpiviennit ja aluskatteen ja sanomme, kumpi kannattaa.</li>
    </ol>
    <p>
      Kesän 2027 työt täyttyvät pitkälti jo keväällä. Kuntotarkastuksen voi tehdä heti, kun katto on lumeton.
      Lue myös artikkeli <Link to="/artikkelit/pinnoitus-vai-uusi-katto/">tiilikattoremontti vai pinnoitus</Link>{" "}
      ja katso hintaesimerkit sivulta{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link>.
    </p>
    <Avainhuomio>Neljä tarkistusta, ullakko, tiilet, rikkinäisten määrä ja kuntotarkastus, riittävät päätökseen.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        { label: "Laatukoti: Kattoremontin hinta (15.5.2025)", url: "https://laatukoti.fi/kattoremontti/kattoremontin-hinta/" },
        { label: "Kattokeskus: Kattoremontin hinta 2026", url: "https://kattokeskus.fi/kattoremontin-hinta/" },
        { label: "Saneerauspojat: Kattoremontin hintaopas 2026", url: "https://www.saneerauspojat.fi/kattoremontin-hintaopas-2026/" },
        {
          label: "BMI Suomi: Usein kysytyt kysymykset, BMI Ormax -betonikattotiilet (käyttöikä 50–70 vuotta)",
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
