import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: tyovaiheet.ts (aluskate tarkistetaan kuntotarkastuksessa), faqData.ts (pinnoitus riittää,
 * jos aluskate ja rakenteet ovat kunnossa; uusi katto, jos aluskate vuotaa), kattoremontti 15 000–30 000 € (docs).
 * Yleiset faktat: K-Rauta, tiilikaton asennus (luettu 26.10.2026): "Aluskate on kattorakenteen suoja sadevettä, tuulta,
 * vetoa ja pölyä vastaan"; kattotiilen elinkaari jopa 70 vuotta (VTT). Aluskatteen omaa käyttöikää ei väitetä.
 */
const faq = [
  {
    question: "Mikä aluskate on?",
    answer:
      "Aluskate on tiilien alla oleva kerros, joka suojaa kattorakennetta sadevedeltä, tuulelta, vedolta ja pölyltä. Tiilet pitävät suurimman osan vedestä, aluskate hoitaa loput.",
  },
  {
    question: "Miksi tarkistatte aluskatteen ennen pinnoitusta?",
    answer:
      "Pinnoitus uusii tiilen pinnan, ei aluskatetta. Jos aluskate vuotaa, katto vuotaa pinnoituksen jälkeenkin. Siksi katsomme sen ennen tarjousta.",
  },
  {
    question: "Miten aluskate tarkistetaan?",
    answer: "Ullakolta katsomme vesijälkiä ja repeämiä. Katolla nostamme tiiliä ja katsomme aluskatteen kunnon tiilien alta.",
  },
  {
    question: "Mitä jos aluskate on huono?",
    answer:
      "Kerromme sen suoraan. Jos aluskate vuotaa, katto kannattaa uusia. Kattoremontti maksaa yleensä 15 000–30 000 euroa.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Aluskate on tiilien alla ja suojaa rakennetta sadevedeltä, tuulelta, vedolta ja pölyltä.</li>
        <li>Pinnoitus uusii tiilen pinnan, ei aluskatetta.</li>
        <li>Tarkistamme aluskatteen jokaisessa kuntotarkastuksessa ullakolta ja tiilien alta.</li>
        <li>Jos aluskate vuotaa, katto kannattaa uusia pinnoituksen sijaan.</li>
      </ul>
    </KeyPoints>

    <p>
      Aluskate on katon osa, jota ei näe pihalta. Silti se ratkaisee, kannattaako katto pinnoittaa. Kerromme
      tässä, mitä aluskate tekee, miten tarkistamme sen ja miksi se on kuntotarkastuksen tärkein kohta.
    </p>

    <h2>Mitä aluskate tekee tiilikatossa?</h2>
    <p>
      Tiilikatto ei ole vesitiivis. Tiilten saumoista pääsee tuulella vettä ja talvella tuiskulunta. Aluskate
      on tiilien alla oleva kerros, joka K-Raudan ohjeen mukaan suojaa kattorakennetta sadevettä, tuulta, vetoa
      ja pölyä vastaan. Tiilien alle päässyt vesi valuu aluskatetta pitkin räystäälle. Tiili itse kestää
      jopa 70 vuotta, mutta aluskate on sen alla eri materiaalia ja vanhenee omaa tahtiaan.
    </p>
    <Avainhuomio>Aluskate ohjaa tiilien alle päässeen veden räystäälle, ja sen pettäminen vuotaa suoraan rakenteisiin.</Avainhuomio>

    <h2>Miksi pinnoitus ei korjaa aluskatetta?</h2>
    <p>
      Pinnoitus on tiilen pinnan maalaus. Pesemme katon, vaihdamme rikkinäiset tiilet ja maalaamme tiilet
      kahteen kertaan. Maali pitää veden tiilen ulkopuolella, mutta tiilien alle se ei ulotu. Jos aluskate on
      repeytynyt tai hauras, vesi pääsee rakenteisiin pinnoituksen jälkeenkin. Siksi pinnoitus riittää vain,
      jos aluskate ja rakenteet ovat kunnossa. Vertailun kerromme artikkelissa{" "}
      <Link to="/artikkelit/pinnoitus-vai-uusi-katto/">tiilikattoremontti vai pinnoitus</Link>.
    </p>
    <Avainhuomio>Pinnoitus suojaa tiilen pinnan, ja aluskatteen pitää olla kunnossa jo ennen sitä.</Avainhuomio>

    <h2>Miten tarkistamme aluskatteen?</h2>
    <ol>
      <li>Ullakolta. Katsomme aluskatteen alapinnan: vesijäljet, repeämät, roikkuvat kohdat ja läpivientien ympärykset.</li>
      <li>Katolta. Nostamme tiiliä muutamasta kohdasta ja katsomme aluskatteen tiilien alta, erityisesti jiireistä ja piipun ympäriltä.</li>
      <li>Räystäältä. Katsomme, että aluskate ulottuu kouruun asti ja vesi pääsee pois.</li>
    </ol>
    <p>
      Tarkistus kuuluu ilmaiseen kuntotarkastukseen samoin kuin tiilet, saumat, piipun ympärys ja läpiviennit.
      Lue koko lista artikkelista{" "}
      <Link to="/artikkelit/tiilikaton-kuntotarkastus-mita-tarkistamme/">tiilikaton kuntotarkastus</Link>.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-pirkkala-punainen-tiilikatto-harja"
      ratio="3/4"
      alt="Punaisen tiilikaton harja Pirkkalassa"
      caption="Harja ja jiirit ovat kohtia, joista aluskate tarkistetaan ensimmäisenä."
    />
    <Avainhuomio>Aluskate tarkistetaan kolmesta suunnasta, ja tarkistus kuuluu ilmaiseen kuntotarkastukseen.</Avainhuomio>

    <h2>Mitä tapahtuu, jos aluskate on huono?</h2>
    <p>
      Kerromme sen suoraan kuntotarkastuksessa. Jos aluskate vuotaa laajalti, pinnoitus ei kannata, ja katto
      kannattaa uusia. Kattoremontti maksaa yleensä 15 000–30 000 euroa. Jos aluskate on kunnossa ja vain
      tiilen pinta on kulunut, pinnoitus maksaa yleensä 2 850–7 000 euroa ja antaa katolle jopa 15 vuotta lisää.
      Palvelun esittelemme sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Kunnossa oleva aluskate tekee pinnoituksesta 2 850–7 000 euron työn, vuotava aluskate 15 000–30 000 euron remontin.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "K-Rauta: Tiilikaton asennus (luettu 26.10.2026)",
          url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/rakentaminen/tiilikaton-asennus",
        },
      ]}
    />
  </>
);

export default Body;
