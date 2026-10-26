import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints } from "@/components/article/ArticleKit";

const faq = [
  {
    question: "Kuinka kauan tiilikaton pinnoitus kestää?",
    answer:
      "Peruskohteen tiilikaton pesu ja pinnoitus kestää 2–3 työpäivää, suuri tai jyrkkä katto 2–4. Sää vaikuttaa aikatauluun, koska katon pitää olla kuiva.",
  },
  {
    question: "Pitääkö työn aikana olla kotona?",
    answer: "Arviokäynnillä kyllä, koska käymme katon ja tarjouksen läpi yhdessä. Työn aikana ei ole pakko. Riittää, että saamme käyttää sähköä ja vettä.",
  },
  {
    question: "Mitä tapahtuu, jos sovittuna päivänä sataa?",
    answer: "Sateella emme pinnoita, koska katon pitää olla kuiva. Sovimme uuden päivän, eikä siitä tule lisäkuluja.",
  },
  {
    question: "Pitääkö pihaa valmistella ennen työtä?",
    answer:
      "Siirrä pihakalusteet, ruukut ja muut kevyet tavarat kauemmas talosta. Tarvittavat suojaukset teemme itse.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Tiilikaton pinnoituksessa on kuusi työvaihetta.</li>
        <li>Peruskohteen katto valmistuu 2–3 työpäivässä.</li>
        <li>Katto maalataan ruiskulla kahteen kertaan: ensin pohjamaali, sitten pintamaali.</li>
        <li>Saat työlle 5 vuoden kirjallisen takuun.</li>
      </ul>
    </KeyPoints>

    <p>
      Miten tiilikaton pinnoitus tehdään? Iso osa työstä tehdään ennen kuin katolle tulee yhtään maalia. Pesu ja
      kasvustontorjunta ratkaisevat, kuinka kauan uusi pinta kestää. Näin työ etenee meillä.
    </p>

    <h2>1. Ilmainen kuntotarkastus ja tarjous</h2>
    <p>
      Tulemme ensin katsomaan katon. Käynti on ilmainen. Tarkistamme katon, aluskatteen ja ympäristön.
      Pienet aluskatteen vauriot korjaamme pinnoituksen yhteydessä. Jos vauriot ovat isoja, kerromme sen
      suoraan. Käynnin jälkeen saat tarjouksen.
    </p>

    <Avainhuomio>Kuntotarkastus on ilmainen, ja sen jälkeen saat kirjallisen tarjouksen kiinteällä hinnalla.</Avainhuomio>
    <h2>2. Tarvittavat suojaukset</h2>
    <p>
      Katon pesu irrottaa likaa. Teemme ennen pesua kohteen vaatimat suojaukset. Jätämme pihasi yhtä siistiksi kuin
      se oli tullessamme.
    </p>

    <h2>3. Katon pesu</h2>
    <p>
      Pesemme katon painepesurilla. Lika ja sammal lähtevät tiilistä. Samalla tyhjennämme ja huuhtelemme
      sadevesikourut.
    </p>
    <Figure
      image="tiilikaton-pesu-ja-pinnoitus-tummanharmaa-kattotiili"
      alt="Tiilikaton pesu ja pinnoitus käynnissä"
      caption="Pesu ja pinnoitus etenevät lape kerrallaan."
    />

    <h2>4. Kasvustontorjunta ja tiilien vaihto</h2>
    <p>
      Pesun jälkeen levitämme katolle kasvustontorjunta-aineen. Se tuhoaa sammaleen itiöt tiilen huokosista asti.
      Ilman sitä sammal kasvaisi pian uuden maalin läpi. Sen jälkeen vaihdamme rikkinäiset tiilet uusiin.
    </p>

    <h2>5. Pohjamaali ja pintamaali ruiskulla</h2>
    <p>
      Maalaamme katon ruiskulla kahteen kertaan: ensin pohjamaali, sitten pintamaali. Ahtaat paikat, joihin ruisku ei
      yllä, maalaamme telalla tai käsin. Käytämme Nowocoatin kattomaaleja.
    </p>
    <p>Katon pitää kuivua pesun jälkeen ja maalikerrosten välissä. Siksi työ kestää useamman päivän.</p>

    <Avainhuomio>Katto maalataan aina kahteen kertaan: ensin pohjamaali, sitten pintamaali, ja maali on Nowocoat.</Avainhuomio>
    <h2>6. Lopputarkastus yhdessä sinun kanssasi</h2>
    <p>
      Työ on valmis vasta, kun olemme kiertäneet talon yhdessä ja katsoneet työn jäljen. Saat pinnoitukselle 5
      vuoden kirjallisen takuun.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-uudenveroinen-punainen-tiilikatto-jalkeen"
      alt="Punainen tiilikatto maalauksen jälkeen"
      caption="Valmis katto pohjamaalin ja pintamaalin jälkeen."
    />

    <h2>Kuinka kauan tiilikaton pinnoitus kestää?</h2>
    <p>
      Peruskohteen katto valmistuu 2–3 työpäivässä, suuri tai jyrkkä katto 2–4. Sää vaikuttaa aikatauluun, koska
      katon pitää olla kuiva. Jos sää yllättää, sovimme uuden päivän. Siitä ei tule lisäkuluja.
    </p>

    <Avainhuomio>Peruskohteen katto valmistuu 2–3 työpäivässä, ja siirretystä sadepäivästä ei tule lisäkuluja.</Avainhuomio>
    <h2>Mitä sinun pitää tehdä ennen työtä?</h2>
    <ul>
      <li>Siirrä pihakalusteet, ruukut ja muut kevyet tavarat kauemmas talosta.</li>
      <li>Varmista, että saamme käyttää sähköä ja vettä.</li>
      <li>Työn aikana sinun ei ole pakko olla kotona, mutta olet tervetullut katsomaan.</li>
    </ul>
    <p>
      Katolla työskentelemme turvavaljaissa ja tuomme varusteet mukanamme. Hinnoista kerromme artikkelissa{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link>. Lue lisää
      palvelusta sivulta <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
