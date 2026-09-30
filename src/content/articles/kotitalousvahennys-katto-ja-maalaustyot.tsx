import { Link } from "react-router-dom";
import { ArticleFaq, KeyPoints, Note } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Saako tiilikaton pinnoituksesta kotitalousvähennyksen?",
    answer:
      "Kyllä. Katon pesu ja pinnoitus ovat asunnon kunnossapitoa, ja vähennyksen saa yritykseltä ostetun työn osuudesta. Materiaaleista ja matkakuluista vähennystä ei saa.",
  },
  {
    question: "Saako talon ulkomaalauksesta kotitalousvähennyksen?",
    answer:
      "Kyllä. Ulkomaalaus on kunnossapitotyötä, ja vähennys lasketaan laskun arvonlisäverollisesta työn osuudesta. Maalit ja muut tarvikkeet eivät kuulu vähennykseen.",
  },
  {
    question: "Saako vähennyksen kesämökillä tehdystä työstä?",
    answer:
      "Kyllä. Verohallinnon mukaan kotitalousvähennyksen saa myös vapaa-ajan asunnolla tehdystä työstä samoilla säännöillä kuin vakituisessa asunnossa.",
  },
  {
    question: "Minä vuonna vähennys lasketaan, jos työ tehdään vuodenvaihteessa?",
    answer:
      "Ratkaisevaa on laskun maksupäivä. Vähennys kuuluu sen vuoden verotukseen, jona olet maksanut yrityksen laskun, vaikka työ olisi tehty edellisenä vuonna.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Yritykseltä ostetusta työstä saa vähentää 35 % työn osuudesta.</li>
        <li>Enimmäismäärä on 1 600 euroa henkilöltä vuodessa ja omavastuu 150 euroa.</li>
        <li>Puolisot voivat saada yhteensä enintään 3 200 euroa.</li>
        <li>Vähennys koskee vain työtä, ei materiaaleja eikä matkakuluja.</li>
        <li>Hallitus on esittänyt vuosille 2026 ja 2027 korotusta 40 prosenttiin ja 2 100 euroon.</li>
      </ul>
    </KeyPoints>

    <p>
      Kotitalousvähennys on monelle suurin yksittäinen syy siihen, että kattoremontin tai ulkomaalauksen lopullinen
      hinta jää selvästi tarjouksen summaa pienemmäksi. Säännöt ovat yksinkertaiset, mutta muutama yksityiskohta
      ratkaisee, paljonko rahaa lopulta palautuu. Tässä artikkelissa käydään läpi vuoden 2026 luvut, laskuesimerkit ja
      yleisimmät sudenkuopat.
    </p>

    <h2>Paljonko kotitalousvähennys on vuonna 2026?</h2>
    <p>
      Verohallinnon mukaan yritykseltä ostetusta työstä saa vähentää <strong>35 % työn osuudesta</strong>. Vähennys
      lasketaan työn arvonlisäverollisesta hinnasta. Enimmäismäärä on <strong>1 600 euroa henkilöltä vuodessa</strong>,
      ja jokaisella on 150 euron vuosittainen omavastuu.
    </p>
    <Note title="Korotus on vireillä">
      <p>
        Hallitus on esittänyt, että vuosina 2026 ja 2027 vähennysprosentti nousee 40 prosenttiin ja enimmäismäärä
        2 100 euroon. Verohallinnon kesäkuussa 2026 julkaiseman tiedotteen mukaan korotus koskisi 1.1.2026 alkaen
        maksettuja kustannuksia, jos eduskunta hyväksyy esityksen. Tarkista ajantasainen tilanne{" "}
        <a href="https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara" target="_blank" rel="noopener noreferrer">
          Verohallinnon sivulta
        </a>{" "}
        ennen kuin teet omat laskelmasi.
      </p>
    </Note>

    <h2>Laskuesimerkki: tiilikaton pinnoitus</h2>
    <p>
      Oletetaan, että pinnoituksen laskussa työn osuus on 2 800 euroa. Vähennys lasketaan näin:
    </p>
    <ul>
      <li>35 % × 2 800 € = 980 €</li>
      <li>980 € − 150 € omavastuu = <strong>830 € vähennystä</strong></li>
    </ul>
    <p>
      Jos esitetty korotus tulee voimaan, sama lasku antaisi 40 % × 2 800 € − 150 € eli 970 euroa. Pinnoituksessa ja
      maalauksessa suurin osa laskusta on työtä, joten vähennys on näissä töissä tavallista suurempi.
    </p>

    <h2>Milloin enimmäismäärä tulee täyteen?</h2>
    <p>
      Nykyisillä luvuilla yksi henkilö saa täyden 1 600 euron vähennyksen, kun vuoden aikana maksettujen töiden osuus
      on yhteensä 5 000 euroa. Laskutapa on 35 % × 5 000 € − 150 €.
    </p>
    <p>
      Vähennys on henkilökohtainen. Puolisot voivat kumpikin vähentää oman osuutensa, jolloin yhteinen enimmäismäärä
      on 3 200 euroa. Jos toisen vähennys ylittää enimmäismäärän, ylimenevä osa siirtyy Verohallinnon mukaan puolison
      verotukseen. Isommassa urakassa vähennys kannattaa siis jakaa kahdelle.
    </p>

    <h2>Mistä vähennyksen saa ja mistä ei?</h2>
    <p>Katto- ja maalaustöissä olennaiset rajat ovat nämä:</p>
    <ul>
      <li>
        <strong>Saa:</strong> asunnon kunnossapito ja perusparannus, kuten katon pesu, pinnoitus ja korjaus sekä talon
        ulkomaalaus.
      </li>
      <li>
        <strong>Saa:</strong> vapaa-ajan asunnolla tehty työ.
      </li>
      <li>
        <strong>Ei saa:</strong> materiaalit ja tarvikkeet, kuten maalit ja pinnoitteet.
      </li>
      <li>
        <strong>Ei saa:</strong> matka- ja kuljetuskustannukset.
      </li>
      <li>
        <strong>Ei saa:</strong> uudisrakentaminen eikä työ, joka kuuluu taloyhtiön kunnossapitovastuulle.
      </li>
    </ul>
    <p>
      Yrityksen pitää kuulua ennakkoperintärekisteriin. Sen voi tarkistaa maksutta Yritys- ja yhteisötietojärjestelmästä
      osoitteessa ytj.fi. Pyydä aina lasku, jossa työn ja materiaalien osuudet on eritelty. Pintasen laskuissa työ ja
      materiaalit eritellään, jotta vähennyksen hakeminen on helppoa.
    </p>

    <h2>Maksupäivä ratkaisee verovuoden</h2>
    <p>
      Vähennys kohdistuu siihen vuoteen, jona lasku on maksettu. Tällä on merkitystä kahdessa tilanteessa. Jos olet jo
      käyttänyt tämän vuoden enimmäismäärän, seuraavalle vuodelle siirtyvä lasku avaa uuden vähennyksen. Jos taas
      urakka on suuri, sen jakaminen kahdelle verovuodelle voi kasvattaa kokonaisvähennystä.
    </p>

    <h2>Näin haet vähennyksen</h2>
    <ol>
      <li>Säilytä lasku ja maksutosite. Niitä ei lähetetä Verohallinnolle, mutta ne pitää pystyä esittämään pyydettäessä.</li>
      <li>Ilmoita vähennys OmaVerossa joko verokortille, jolloin se pienentää ennakonpidätystä heti, tai veroilmoitukseen.</li>
      <li>Ilmoita yrityksen nimi ja Y-tunnus sekä maksamasi työn osuus.</li>
    </ol>
    <p>
      Hintojen suuruusluokan näet sivuilta{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa">tiilikaton pinnoituksen hinta</Link> ja{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa">talon maalauksen hinta</Link>.
    </p>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
