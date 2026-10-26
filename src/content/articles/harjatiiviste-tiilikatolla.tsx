import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: projects.ts (harjatiivisteen asennus pinnoituksen yhteydessä, Kangasala 2026),
 * tyovaiheet.ts (saumat ja harja tarkistetaan kuntotarkastuksessa). Hintaa ei kerrota: Eerik ei ole antanut sitä
 * (asiakaskysymykset K1). Yleiset faktat: Meltex tuulettuva harjatiiviste, tuotekuvaus (luettu 26.10.2026):
 * "Harjatiiviste vähentää tuiskulumen, veden ja roskien pääsyä aluskatteelle", "keskeltä tuulettuva ja reunoilta
 * itsekiinnittyvä", "asennetaan harjapuun yli ja harjatiilen alle". K-Rauta, tiilikaton asennus: aluskate suojaa
 * sadevettä, tuulta, vetoa ja pölyä vastaan.
 */
const faq = [
  {
    question: "Mikä harjatiiviste on?",
    answer:
      "Harjatiiviste on nauha, joka asennetaan harjapuun yli ja harjatiilen alle. Se vähentää tuiskulumen, veden ja roskien pääsyä aluskatteelle, mutta päästää ilman läpi.",
  },
  {
    question: "Asennatteko harjatiivisteen pinnoituksen yhteydessä?",
    answer:
      "Kyllä, jos se puuttuu tai on rikki. Olemme asentaneet harjatiivisteitä pinnoituksen yhteydessä esimerkiksi Kangasalla. Tarve katsotaan kuntotarkastuksessa, ja se kirjataan tarjoukseen.",
  },
  {
    question: "Mistä tiedän, puuttuuko harjatiiviste?",
    answer:
      "Harjatiilen alta näkyy rako, tai ullakolla on talven jälkeen lunta tai vesijälkiä harjan alla. Varmin tapa on antaa meidän katsoa se kuntotarkastuksessa.",
  },
  {
    question: "Vaikuttaako harjatiiviste pinnoituksen hintaan?",
    answer: "Harjatiivisteen asennus on erillinen työ, joka kirjataan tarjoukseen omana rivinään. Pinnoituksen hinta ei muutu.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Harjatiiviste on nauha harjatiilen alla. Se vähentää tuiskulumen, veden ja roskien pääsyä aluskatteelle.</li>
        <li>Tiiviste on keskeltä tuulettuva, joten katon tuuletus toimii edelleen.</li>
        <li>Tarkistamme harjan jokaisessa kuntotarkastuksessa ja asennamme tiivisteen tarvittaessa pinnoituksen yhteydessä.</li>
        <li>Asennus kirjataan tarjoukseen erikseen. Pinnoituksen hinta ei muutu.</li>
      </ul>
    </KeyPoints>

    <p>
      Harjatiiviste on katon osa, josta harva on kuullut ennen kuin se puuttuu. Asiakkaat kysyvät siitä, kun
      ullakolta löytyy lunta tai harjatiilien alla näkyy rako. Kerromme tässä, mikä se on ja milloin se kannattaa
      asentaa.
    </p>

    <h2>Mikä harjatiiviste on ja mitä se tekee?</h2>
    <p>
      Tiilikaton harjalla lappeet kohtaavat. Harjatiilet peittävät sauman päältä, mutta tiilen profiilin aaltojen
      alle jää rakoja. Harjatiiviste on nauha, joka asennetaan harjapuun yli ja harjatiilen alle. Se muotoillaan
      tiilen profiilin mukaan ja kiinnitetään reunoistaan tiiliin. Valmistajan mukaan tiiviste vähentää
      tuiskulumen, veden ja roskien pääsyä aluskatteelle. Keskeltä se on tuulettuva, joten ilma pääsee edelleen
      kulkemaan katon alta ulos.
    </p>
    <Avainhuomio>Harjatiiviste pitää tuiskulumen ja roskat poissa aluskatteelta, mutta päästää ilman läpi.</Avainhuomio>

    <h2>Miksi harjatiiviste puuttuu monelta katolta?</h2>
    <p>
      Vanhemmissa katoissa harja on usein tehty ilman tiivistettä tai tiiviste on vuosien aikana haurastunut.
      Myös myrsky tai jään liike voi repiä sen irti. Kun tiiviste puuttuu, tuiskulumi ja lehdet pääsevät harjan
      alle aluskatteelle. Aluskate on tehty suojaamaan rakennetta sadevedeltä, tuulelta ja pölyltä, mutta sen
      päälle kertynyt lumi sulaa keväällä, ja vesi etsii tiensä alas. Lue, miksi aluskate ratkaisee paljon,
      artikkelista <Link to="/artikkelit/aluskate-ja-pinnoitus/">mikä aluskate on ja miksi tarkistamme sen</Link>.
    </p>
    <Avainhuomio>Puuttuva tiiviste päästää tuiskulumen aluskatteelle, ja sulamisvesi näkyy ullakolla keväällä.</Avainhuomio>

    <h2>Milloin harjatiiviste kannattaa asentaa?</h2>
    <p>
      Paras hetki on pinnoituksen yhteydessä. Olemme silloin katolla joka tapauksessa, katto on pesty ja
      harjatiilet irrotetaan helposti. Tarkistamme saumat ja harjan jokaisessa kuntotarkastuksessa. Jos tiiviste
      puuttuu tai on rikki, ehdotamme asennusta ja kirjaamme sen tarjoukseen omana rivinään. Olemme asentaneet
      harjatiivisteitä pinnoituksen yhteydessä esimerkiksi{" "}
      <Link to="/tiilikaton-pinnoitus-kangasala/">Kangasalla</Link>.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-kangasala-harjatiivisteen-asennus"
      alt="Harjatiivisteen asennus tiilikatolle Kangasalla"
      caption="Harjatiivisteen asennus pinnoituksen yhteydessä Kangasalla 2026."
    />
    <Avainhuomio>Pinnoituksen yhteydessä harjatiivisteen asennus on helpoin, koska olemme jo katolla ja harjatiilet ovat irti.</Avainhuomio>

    <h2>Miten asennus tehdään?</h2>
    <ol>
      <li>Harjatiilet irrotetaan ja harjapuu tarkistetaan.</li>
      <li>Tiiviste levitetään harjapuun yli ja painetaan tiilen profiilin mukaan.</li>
      <li>Reunat kiinnitetään tiiliin.</li>
      <li>Harjatiilet asennetaan takaisin ja kiinnitetään.</li>
    </ol>
    <p>
      Työ tehdään samalla käynnillä kuin pinnoitus, joten se ei pidennä aikataulua paljoa. Kaikki työvaiheet
      kuvaamme artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/">näin tiilikaton pinnoitus etenee</Link>.
    </p>
    <Avainhuomio>Asennus on neljä vaihetta, ja se tehdään samalla käynnillä kuin pinnoitus.</Avainhuomio>

    <h2>Mitä harjatiivisteen asennus maksaa?</h2>
    <p>
      Hinta riippuu harjan pituudesta ja siitä, kuinka monta harjaa katolla on. Kerromme hinnan
      kuntotarkastuksessa, ja se on tarjouksessa erillisenä rivinä. Pinnoituksen oma hinta, yleensä 2 850–7 000
      euroa, ei muutu. Katso palvelu sivulta{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Harjatiivisteen hinta kerrotaan kuntotarkastuksessa, ja pinnoituksen hinta pysyy 2 850–7 000 eurossa.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Taloon.com: Tuulettuva harjatiiviste Meltex, tuotekuvaus (luettu 26.10.2026)",
          url: "https://www.taloon.com/tuulettuva-harjatiiviste-meltex-300-mm-x-5-m-musta",
        },
        {
          label: "K-Rauta: Tiilikaton asennus (luettu 26.10.2026)",
          url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/rakentaminen/tiilikaton-asennus",
        },
      ]}
    />
  </>
);

export default Body;
