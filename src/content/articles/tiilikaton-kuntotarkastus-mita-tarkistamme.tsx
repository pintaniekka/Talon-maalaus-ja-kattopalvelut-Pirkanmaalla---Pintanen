import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: tyovaiheet.ts (kuntotarkastus: tiilet, saumat, piipun ympärys, läpiviennit, aluskate;
 * kirjallinen tarjous kiinteällä hinnalla), faqData.ts (samalla viikolla, iltaisin ja viikonloppuisin, asiakkaan on hyvä
 * olla paikalla), docs/seo-suunnitelma-2026-10-25.md (ei erillistä raporttia). Etätarjous on mahdollinen (Eerik 27.10.2026):
 * kuvat ja arvio katon koosta riittävät yleensä, tarkat mitat tai kuntoraportti ovat iso plussa. Ei ulkoisia faktoja.
 */
const faq = [
  {
    question: "Maksaako tiilikaton kuntotarkastus?",
    answer: "Ei. Kuntotarkastus ja kirjallinen tarjous ovat ilmaisia, eikä niistä seuraa velvollisuutta tilata työtä.",
  },
  {
    question: "Pitääkö minun olla paikalla kuntotarkastuksessa?",
    answer:
      "Ei välttämättä, mutta se on hyvä. Käymme katon läpi yhdessä, ja kerromme heti, mitä näemme. Tulemme yleensä samalla viikolla, myös iltaisin ja viikonloppuisin.",
  },
  {
    question: "Saanko kuntotarkastuksesta raportin?",
    answer:
      "Saat kirjallisen tarjouksen, jossa on kiinteä hinta ja mitä työhön kuuluu. Erillistä raporttia ei tule. Kerromme havainnot suoraan paikan päällä.",
  },
  {
    question: "Mitä jos katto ei kannata pinnoittaa?",
    answer:
      "Sanomme sen suoraan. Jos aluskate vuotaa tai tiiliä on rikki laajalti, pinnoitus ei korjaa ongelmaa, ja katto kannattaa uusia.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Kuntotarkastus on ilmainen, ja tulemme yleensä samalla viikolla.</li>
        <li>Tarkistamme viisi asiaa: tiilet, saumat, piipun ympäryksen, läpiviennit ja aluskatteen.</li>
        <li>Saat kirjallisen tarjouksen, jossa on kiinteä hinta. Hinta pitää, vaikka työ venyisi.</li>
        <li>Jos katto ei kannata pinnoittaa, kerromme sen heti.</li>
      </ul>
    </KeyPoints>

    <p>
      Kuntotarkastus on pinnoituksen ensimmäinen työvaihe, ja siitä riippuu kaikki muu. Kerromme tässä, mitä
      katsomme katolla, mitä kysymme sinulta ja mitä saat käteesi, kun lähdemme.
    </p>

    <h2>Mitä tarkistamme tiilikaton kuntotarkastuksessa?</h2>
    <p>
      Kiipeämme katolle ja käymme sen läpi lape kerrallaan. Viisi asiaa ratkaisee, kannattaako katto pinnoittaa
      ja mitä pinnoitus maksaa.
    </p>
    <Table
      head={["Kohde", "Mitä katsomme", "Miksi"]}
      rows={[
        ["Tiilet", "Haalistuminen, karheus, halkeamat, rikkinäiset tiilet", "Rikkinäiset tiilet vaihdetaan uusiin ennen maalausta"],
        ["Saumat", "Harjan, jiirien ja räystäiden saumat", "Saumat päästävät veden aluskatteelle, jos ne ovat auki"],
        ["Piipun ympärys", "Pellitykset ja tiivistykset", "Piipun juuri on katon yleisin vuotokohta"],
        ["Läpiviennit", "Ilmastointiputket, antennit, kattoluukut", "Löystynyt läpivienti vuotaa, vaikka tiilet olisivat ehjät"],
        ["Aluskate", "Kunto ullakolta tai tiilien alta", "Vuotava aluskate ei korjaannu pinnoituksella"],
      ]}
      caption="Kuntotarkastuksen viisi kohdetta. Kaikki tarkistetaan jokaisella katolla."
    />
    <Avainhuomio>Tarkistamme jokaisella katolla viisi kohdetta, ja aluskate ratkaisee, riittääkö pinnoitus.</Avainhuomio>

    <h2>Mitä kysymme sinulta?</h2>
    <p>
      Kysymme, onko katto vuotanut, milloin se on viimeksi pesty ja onko tiiliä vaihdettu. Kysymme myös, onko
      sinulla varatiiliä, ja mitä katolla on suojattavaa: aurinkopaneelit, lasiterassi tai valokate. Nämä
      vaikuttavat työn kestoon ja hintaan. Kerro myös, jos haluat vaihtaa katon värin. Nowocoatin kattomaaleissa
      on laaja värivalikoima, ja väri valitaan samalla käynnillä.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-tampere-eerik-pitkanen-katolla"
      alt="Eerik Pitkänen tiilikatolla Tampereella"
      caption="Eerik tarkistaa katon itse ja tekee myös tarjouksen itse."
    />
    <Avainhuomio>Varatiilet, suojattavat kohteet ja värin vaihto kannattaa kertoa heti, koska ne vaikuttavat tarjoukseen.</Avainhuomio>

    <h2>Mitä saat kuntotarkastuksesta?</h2>
    <p>
      Saat kirjallisen tarjouksen, jossa on kiinteä hinta. Tarjouksessa lukee, mitä työhön kuuluu: pesu
      painepesulla, kasvustontorjunta, rikkinäisten tiilien vaihto, pohjamaali ja pintamaali ruiskulla, siivous ja
      5 vuoden kirjallinen takuu. Hinta pitää, vaikka työ venyisi sateen takia. Erillistä kuntoraporttia ei tule,
      koska kerromme havainnot suoraan katolla. Jos tiiliä on rikki paljon, sanomme sen ja kerromme, miten
      uudet tiilet hankitaan. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/rikkinaiset-tiilet-pinnoituksessa/">rikkinäiset tiilet pinnoituksessa</Link>.
    </p>
    <Avainhuomio>Tarjous on kirjallinen ja hinta kiinteä, eikä kuntotarkastus velvoita mihinkään.</Avainhuomio>

    <h2>Milloin kuntotarkastuksen voi tehdä?</h2>
    <p>
      Heti, kun katto on lumeton. Keväällä teemme tarkastuksia paljon, koska kesän työt sovitaan silloin.
      Tulemme Pirkanmaalla ja lähikunnissa yleensä samalla viikolla, myös iltaisin ja viikonloppuisin. Sinun
      on hyvä olla paikalla, koska käymme katon läpi yhdessä. Tarjouksen saat myös etänä: yleensä kuvat katosta
      ja arvio katon koosta riittävät, ja tarkat mitat tai kuntoraportti ovat iso plussa. Kuntotarkastus paikan
      päällä on silti tarkin tapa, koska aluskatetta ja saumoja ei näe kuvasta. Varaa aika sivulta{" "}
      <Link to="/ilmainen-kuntotarkastus/">ilmainen kuntotarkastus</Link> tai soita Eerikille.
    </p>
    <Avainhuomio>Tulemme yleensä samalla viikolla, ja keväällä tarkastuksen kannattaa varata ajoissa.</Avainhuomio>

    <h2>Mitä kuntotarkastuksen jälkeen tapahtuu?</h2>
    <p>
      Kun hyväksyt tarjouksen, teemme kirjallisen sopimuksen ja sovimme aikataulun. Otamme yhteyttä ennen
      aloituspäivää. Työ kestää peruskohteessa 2–3 päivää. Koko työn kulun kuvaamme artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/">näin tiilikaton pinnoitus etenee</Link>, ja
      palvelun esittelemme sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Tarjouksen hyväksymisen jälkeen teemme kirjallisen sopimuksen, ja työ kestää 2–3 päivää.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
