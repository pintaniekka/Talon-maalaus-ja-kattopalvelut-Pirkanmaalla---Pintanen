import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (kulunut tiili imee vettä, pakkasrapautuminen; pinnoitus noin 15 vuoden iässä;
 * jopa 15 vuotta lisää; uusi katto jos aluskate vuotaa tai tiilet laajalti rikki), kattoremontti 15 000–30 000 € (docs),
 * prices.ts. Rapautumisen vuosittaista etenemistä ei kerrota lukuna, koska sitä ei ole lähteissä.
 */
const faq = [
  {
    question: "Mitä tapahtuu, jos tiilikattoa ei pinnoiteta?",
    answer:
      "Kulunut tiili imee vettä, ja pakkanen murentaa sitä talvi talvelta. Ensin pinta hilseilee, sitten tiilet halkeilevat, ja lopulta vesi pääsee aluskatteelle ja rakenteisiin.",
  },
  {
    question: "Kuinka kauan katto kestää ilman pinnoitusta?",
    answer:
      "Se riippuu katosta, varjosta ja sammaleesta. Betonitiili kestää valmistajan mukaan 50–70 vuotta, mutta vain, jos se pysyy kuivana. Kulunut ja märkä tiili rapautuu paljon nopeammin.",
  },
  {
    question: "Onko myöhässä tehty pinnoitus kalliimpi?",
    answer:
      "Pinnoituksen hinta on sama, mutta rikkinäisiä tiiliä on enemmän vaihdettavana. Jos tiilet ovat laajalti rikki, pinnoitus ei enää riitä, ja kattoremontti maksaa yleensä 15 000–30 000 euroa.",
  },
  {
    question: "Milloin on oikea aika?",
    answer: "Kun väri on haalistunut tai pinta karhea, yleensä noin 15 vuoden iässä. Silloin tiilet ovat ehjiä ja pinnoitus antaa jopa 15 vuotta lisää.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Ilman pinnoitusta kulunut tiili imee vettä ja rapautuu pakkasella talvi talvelta.</li>
        <li>Ensin pinta hilseilee, sitten tiilet halkeilevat, lopulta aluskate kastuu.</li>
        <li>Ajoissa tehty pinnoitus maksaa yleensä 2 850–7 000 euroa, kattoremontti 15 000–30 000 euroa.</li>
        <li>Oikea aika on noin 15 vuoden iässä, kun tiilet ovat vielä ehjiä.</li>
      </ul>
    </KeyPoints>

    <p>
      Moni lykkää katon pinnoitusta vuodesta toiseen, koska katto ei vuoda. Kerromme tässä, mitä katolla tapahtuu
      odotuksen aikana ja missä kohtaa pinnoitus muuttuu kattoremontiksi.
    </p>

    <h2>Miten kuluminen etenee vaihe vaiheelta?</h2>
    <Table
      head={["Vaihe", "Mitä katolla näkyy", "Mitä se maksaa korjata"]}
      rows={[
        ["1. Pinta kuluu", "Väri haalistuu, pinta karhenee, kouruun tulee hiekkaa", "Pinnoitus, 2 850–7 000 €"],
        ["2. Sammal tarttuu", "Vihreää tiilten raoissa, katto pysyy märkänä", "Pinnoitus, 2 850–7 000 €"],
        ["3. Tiilet halkeilevat", "Lohjenneita kulmia, haljenneita tiiliä", "Pinnoitus ja tiilien vaihto, 2 850–7 000 €"],
        ["4. Aluskate kastuu", "Vesijälkiä ullakolla, tiiliä rikki laajalti", "Kattoremontti, 15 000–30 000 €"],
      ]}
      caption="Tiilikaton kuluminen ilman pinnoitusta. Vaiheissa 1–3 pinnoitus riittää, vaiheessa 4 ei enää."
    />
    <Avainhuomio>Kolmessa ensimmäisessä vaiheessa pinnoitus riittää, neljännessä edessä on kattoremontti.</Avainhuomio>

    <h2>Miksi vauriot kiihtyvät?</h2>
    <p>
      Rapautuminen ei etene tasaisesti vaan kiihtyen. Kulunut pinta imee vettä, ja jää avaa pieniä halkeamia.
      Seuraavana keväänä halkeamiin mahtuu enemmän vettä, ja seuraava talvi laajentaa niitä. Sammal pitää tiilen
      märkänä, jolloin jäätymiskertoja tulee enemmän. Jokainen talvi tekee enemmän vahinkoa kuin edellinen.
      Siksi vuosi, joka tuntuu harmittomalta, voi olla se, jolloin ensimmäiset tiilet halkeavat. Rapautumisesta
      kerromme artikkelissa <Link to="/artikkelit/pakkasrapautuminen-tiilikatto/">pakkasrapautuminen tiilikatolla</Link>.
    </p>
    <Avainhuomio>Jokainen talvi tekee kuluneelle tiilelle enemmän vahinkoa kuin edellinen.</Avainhuomio>

    <h2>Milloin pinnoitus ei enää riitä?</h2>
    <p>
      Kun aluskate vuotaa tai tiilet ovat rapautuneet laajalti. Pinnoitus uusii tiilen pinnan, mutta ei
      aluskatetta, eikä hiekaksi rapautunutta tiiltä voi maalata takaisin ehjäksi. Silloin katto kannattaa
      uusia, ja kattoremontti maksaa yleensä 15 000–30 000 euroa, eli monta kertaa pinnoituksen hinnan.
      Kuntotarkastuksessa kerromme suoraan, kummassa vaiheessa kattosi on. Vertailun teemme artikkelissa{" "}
      <Link to="/artikkelit/pinnoitus-vai-uusi-katto/">tiilikattoremontti vai pinnoitus</Link>.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-haalistunut-punainen-tiilikatto-ennen"
      ratio="3/4"
      alt="Haalistunut punainen tiilikatto ennen pinnoitusta"
      caption="Haalistunut punainen tiilikatto ennen pinnoitusta. Tässä vaiheessa pinnoitus riittää."
    />
    <Avainhuomio>Vuotava aluskate tai laajalti rapautuneet tiilet muuttavat 2 850–7 000 euron työn 15 000–30 000 euron remontiksi.</Avainhuomio>

    <h2>Mikä on oikea hetki pinnoittaa?</h2>
    <p>
      Kun väri on haalistunut tai pinta tuntuu karhealta, yleensä noin 15 vuoden iässä. Silloin tiilet ovat
      vielä ehjiä, vaihdettavia on vähän, ja uusi pinta antaa katolle jopa 15 vuotta lisää. Kuntotarkastus on
      ilmainen, ja tulemme yleensä samalla viikolla. Merkit kerromme artikkelissa{" "}
      <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto/">milloin tiilikatto pitää pinnoittaa</Link>, ja palvelun
      esittelemme sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Oikea hetki on noin 15 vuoden iässä, kun tiilet ovat ehjiä ja pinnoitus antaa jopa 15 vuotta lisää.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
