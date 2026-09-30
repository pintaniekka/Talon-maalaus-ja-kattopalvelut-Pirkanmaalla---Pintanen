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
        <li>Yritykseltä ostetusta työstä saa vuosina 2026 ja 2027 vähentää 40 % työn osuudesta.</li>
        <li>Enimmäismäärä on 2 100 euroa henkilöltä vuodessa ja omavastuu 150 euroa.</li>
        <li>Puolisot voivat saada yhteensä enintään 4 200 euroa.</li>
        <li>Vähennys koskee vain työtä, ei materiaaleja eikä matkakuluja.</li>
        <li>Korotus koskee 1.1.2026 alkaen maksettuja laskuja. Aiemmin luvut olivat 35 % ja 1 600 euroa.</li>
      </ul>
    </KeyPoints>

    <p>
      Kotitalousvähennys on monelle suurin yksittäinen syy siihen, että kattoremontin tai ulkomaalauksen lopullinen
      hinta jää selvästi tarjouksen summaa pienemmäksi. Säännöt ovat yksinkertaiset, mutta muutama yksityiskohta
      ratkaisee, paljonko rahaa lopulta palautuu. Tässä artikkelissa käydään läpi vuoden 2027 luvut, laskuesimerkit ja
      yleisimmät sudenkuopat.
    </p>

    <h2>Paljonko kotitalousvähennys on vuonna 2027?</h2>
    <p>
      Yritykseltä ostetusta työstä saa vuosina 2026 ja 2027 vähentää <strong>40 % työn osuudesta</strong>. Vähennys
      lasketaan työn arvonlisäverollisesta hinnasta. Enimmäismäärä on <strong>2 100 euroa henkilöltä vuodessa</strong>,
      ja jokaisella on 150 euron vuosittainen omavastuu.
    </p>
    <Note title="Määräaikainen korotus">
      <p>
        Vuonna 2025 vähennys oli 35 % ja enintään 1 600 euroa. Hallituksen esityksen mukaan luvut nousevat vuosiksi
        2026 ja 2027 40 prosenttiin ja 2 100 euroon, ja korotus koskee takautuvasti 1.1.2026 alkaen maksettuja
        kustannuksia. Verohallinnon kesäkuun 2026 tiedotteen mukaan korotus edellyttää eduskunnan hyväksyntää.
        Tarkista ajantasainen tilanne{" "}
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
      <li>40 % × 2 800 € = 1 120 €</li>
      <li>1 120 € − 150 € omavastuu = <strong>970 € vähennystä</strong></li>
    </ul>
    <p>
      Vanhalla 35 prosentin säännöllä sama lasku olisi antanut 830 euroa. Pinnoituksessa ja maalauksessa suurin osa
      laskusta on työtä, joten vähennys on näissä töissä tavallista suurempi.
    </p>

    <h2>Milloin enimmäismäärä tulee täyteen?</h2>
    <p>
      Yksi henkilö saa täyden 2 100 euron vähennyksen, kun vuoden aikana maksettujen töiden osuus on yhteensä
      5 625 euroa. Laskutapa on 40 % × 5 625 € − 150 €.
    </p>
    <p>
      Vähennys on henkilökohtainen. Puolisot voivat kumpikin vähentää oman osuutensa, jolloin yhteinen enimmäismäärä
      on 4 200 euroa. Jos toisen vähennys ylittää enimmäismäärän, ylimenevä osa siirtyy Verohallinnon mukaan puolison
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
      osoitteessa ytj.fi. Pyydä aina lasku, jossa työn ja materiaalien osuudet on eritelty. Pintanen kuuluu
      ennakkoperintärekisteriin ja erittelee työn ja materiaalit laskulle, jotta vähennyksen hakeminen on helppoa.
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
