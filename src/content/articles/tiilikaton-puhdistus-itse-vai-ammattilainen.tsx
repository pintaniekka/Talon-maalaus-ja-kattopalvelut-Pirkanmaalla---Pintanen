import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Kuinka usein tiilikatto pitää puhdistaa?",
    answer:
      "Tyypillisesti 2–5 vuoden välein ympäristöstä riippuen. Puiden varjostama katto sammaloituu nopeammin kuin avoimella paikalla oleva.",
  },
  {
    question: "Vaurioittaako puhdistus kattoa?",
    answer:
      "Oikein tehtynä ei. Pintanen puhdistaa katon mekaanisesti kaapimalla ja harjaamalla ilman painepesua, jotta tiilen pinta ei kulu.",
  },
  {
    question: "Paljonko tiilikaton puhdistus maksaa?",
    answer:
      "Pintasen hintaesimerkeissä pieni omakotitalo maksaa noin 800–1 200 euroa, keskikokoinen noin 1 200–1 800 euroa ja suurempi kohde noin 1 800–2 500 euroa. Hinnat sisältävät arvonlisäveron.",
  },
  {
    question: "Kauanko katon puhdistus kestää?",
    answer: "Useimmat omakotitalojen katot saadaan puhdistettua ja käsiteltyä yhdessä työpäivässä.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Sammal pidättää kosteutta, joka jäätyessään rikkoo tiiliä.</li>
        <li>Tiilikatto kannattaa puhdistaa tyypillisesti 2–5 vuoden välein.</li>
        <li>Kevyen puhdistuksen voi tehdä itse, mutta liian kova vedenpaine vaurioittaa tiilen pintaa.</li>
        <li>Ilman kasvustontorjuntaa sammal palaa nopeasti.</li>
        <li>Vain ostetusta työstä saa kotitalousvähennyksen.</li>
      </ul>
    </KeyPoints>

    <p>
      Sammaloitunut tiilikatto ei ole pelkkä ulkonäköhaitta. Sammal ja jäkälä keräävät tiilen pintaan ja rakoihin
      kosteutta, ja kun kosteus talvella jäätyy, tiili voi haljeta. Puhdistus pysäyttää tämän kehityksen, mutta
      työtapa ratkaisee, auttaako se kattoa vai kuluttaako se sitä lisää.
    </p>

    <h2>Milloin tiilikatto pitää puhdistaa?</h2>
    <p>
      Katto kannattaa huoltaa, kun tiilten raoissa tai pinnoilla näkyy sammalta, jäkälää tai muuta kasvustoa.
      Tyypillinen puhdistusväli on 2–5 vuotta ympäristöstä riippuen. Keväisin ja syksyisin on hyvä tarkistaa
      samalla, että tiilet ovat ehjiä ja paikoillaan.
    </p>
    <Figure
      image="likainen-tiilikatto-ennen-pesua-ja-suojakasittelya"
      alt="Likainen tiilikatto ennen pesua ja suojakäsittelyä"
      caption="Kasvusto pidättää kosteutta tiilen pinnassa."
    />

    <h2>Voiko katon puhdistaa itse?</h2>
    <p>
      Voi, tietyin varauksin. Roskien, lehtien ja irtonaisen sammalen poisto sekä räystäskourujen tyhjennys
      onnistuvat omin voimin. Myös vedellä peseminen on mahdollista, kunhan vedenpaine ei ole liian kova: paine
      kannattaa aloittaa pienestä ja lisätä vain tarvittaessa.
    </p>
    <p>Omatoimisessa puhdistuksessa on kolme riskiä, jotka kannattaa tuntea etukäteen.</p>

    <h3>Liian kova paine kuluttaa tiilen pintaa</h3>
    <p>
      Painepesuri irrottaa sammalen tehokkaasti, mutta väärin käytettynä se irrottaa myös tiilen suojaavaa
      pintakerrosta. Karhea, avoin pinta imee vettä ja tarjoaa sammalelle entistä paremman kasvualustan.
    </p>

    <h3>Vesi voi päätyä rakenteisiin</h3>
    <p>
      Jos vettä ruiskuttaa alhaalta ylöspäin tiilien limityksiä vastaan, vesi painuu tiilten alle. Siksi katto
      pestään aina harjalta räystäälle päin.
    </p>

    <h3>Katolla liikkuminen on vaarallista</h3>
    <p>
      Märkä ja sammaleinen tiili on liukas. Katolla ei pidä työskennellä ilman asianmukaisia turvavarusteita, ja
      tiilten päällä on liikuttava niin, etteivät ne rikkoudu askelten alla.
    </p>

    <h2>Miksi pelkkä pesu ei riitä pitkäksi aikaa?</h2>
    <p>
      Sammal kasvaa itiöistä, jotka jäävät tiilen huokosiin, vaikka pinta näyttäisi puhtaalta. Ilman
      kasvustontorjuntaa katto vihertyy uudelleen nopeasti. Torjunta-aine on puhdistuksen vaihe, joka pitää
      katon puhtaana pidempään.
    </p>

    <h2>Miten ammattilainen puhdistaa katon?</h2>
    <p>
      Pintanen puhdistaa tiilikatot mekaanisesti ilman painepesua, jotta tiilet eivät vaurioidu. Työ etenee näin:
    </p>
    <ol>
      <li>Piha suojataan.</li>
      <li>Sammal kaavitaan irti ja katto harjataan.</li>
      <li>Rikkinäiset tiilet vaihdetaan uusiin.</li>
      <li>Katolle levitetään kasvustontorjunta-aine.</li>
      <li>Räystäskourut tyhjennetään ja työmaa siivotaan.</li>
    </ol>
    <p>
      Useimmat omakotitalojen katot valmistuvat yhdessä työpäivässä. Palvelu on kuvattu sivulla{" "}
      <Link to="/katon-puhdistus-pirkanmaa">katon puhdistus</Link>.
    </p>
    <Figure
      image="puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen"
      alt="Puhdas tiilikatto mekaanisen puhdistuksen jälkeen"
      caption="Tiilikatto mekaanisen puhdistuksen jälkeen."
    />

    <h2>Mitä puhdistus maksaa?</h2>
    <p>Pintasen hintaesimerkit katon puhdistukselle ovat:</p>
    <ul>
      <li>Pieni omakotitalo: noin 800–1 200 €</li>
      <li>Keskikokoinen omakotitalo: noin 1 200–1 800 €</li>
      <li>Suurempi kohde: noin 1 800–2 500 €</li>
    </ul>
    <p>
      Hinnat sisältävät arvonlisäveron 25,5 %, ja lopullinen hinta annetaan kuntotarkastuksen perusteella. Itse
      tehdystä työstä ei saa kotitalousvähennystä, mutta yritykseltä ostetun työn osuudesta saa. Säännöt löytyvät
      artikkelista{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot">
        kotitalousvähennys katto- ja maalaustöissä
      </Link>
      .
    </p>

    <h2>Milloin puhdistus ei enää riitä?</h2>
    <p>
      Puhdistus riittää, kun katto on likainen ja sammaleinen, mutta tiilet ovat hyvässä kunnossa. Jos tiilen
      pintakerros on kulunut, vesi imeytyy tiileen tai rikkoutuneita tiiliä on useita, pinnoitus suojaa kattoa
      paremmin. Merkit on käyty läpi artikkelissa{" "}
      <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto">milloin tiilikatto pitää pinnoittaa</Link>, ja hinnat
      artikkelissa <Link to="/artikkelit/tiilikaton-pinnoituksen-hinta">tiilikaton pinnoituksen hinta</Link>.
    </p>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
