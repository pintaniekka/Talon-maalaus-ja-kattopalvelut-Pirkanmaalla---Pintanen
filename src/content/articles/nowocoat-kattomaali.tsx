import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: tyovaiheet.ts (Nowocoatin kattomaalit, ruisku kahteen kertaan), faqData.ts (laaja
 * värivalikoima), CLAUDE.md (maali: vain Nowocoat). Yleiset faktat: NowoCoat-esite 2025 (luettu 26.10.2026): vesiohenteinen
 * ammattikäyttöön kehitetty pinnoite, "soveltuu kaikkien eri valmistajien betonikattotiilien pinnoittamiseen", levitys
 * korkeapaineruisku, tela tai pensseli, ohennus vesi 10–20 %, riittoisuus 2–3 m²/l kahdella kerroksella, päälle
 * maalattavissa n. 2 h, täysin kuiva 24 h (20 °C, 60 % RH), puolihimmeä, "Saatavana kaikissa perusväreissä", hengittävä,
 * NowoClean-käsittely 2–4 vuoden välein suositellaan, NowoCoat A/S juuret vuoteen 1861. "Säästää jopa 75 %" ei lainata.
 * Lisätty 29.10.2026 (docs/nowocoat-lahteet-2026-10-29.md): RT 103839 -tuotekortti (Rakennustieto, helmikuu 2025) ja
 * valmistajan värikartta (16 väriä) NCS-sävyineen. Omat kokemukset: yli 130 kattoa vuodesta 2022, 5 v takuu (company.ts).
 */
const faq = [
  {
    question: "Mikä maali tiilikaton pinnoituksessa käytetään?",
    answer:
      "Käytämme Nowocoatin kattomaalia. Se on vesiohenteinen, ammattikäyttöön kehitetty pinnoite, joka valmistajan mukaan soveltuu kaikkien valmistajien betonikattotiilille.",
  },
  {
    question: "Miksi juuri Nowocoat?",
    answer:
      "Se on tehty tiilikatoille ja levitetään korkeapaineruiskulla kahteen kertaan, kuten me teemme. Olemme käyttäneet sitä kaikissa katoissamme, ja annamme työlle 5 vuoden takuun.",
  },
  {
    question: "Kuinka nopeasti Nowocoat kuivuu?",
    answer:
      "Valmistajan mukaan pinta on päälle maalattavissa noin kahden tunnin kuluttua ja täysin kuiva vuorokaudessa 20 asteessa. Siksi kaksi kerrosta onnistuu samana päivänä.",
  },
  {
    question: "Mitä värejä Nowocoatista saa?",
    answer:
      "Valmistajan mukaan kaikki perusvärit. Tiilikattopinnoitteen värikartassa on 16 väriä: viisi harmaata, kaksi mustaa, seitsemän punaista ja kaksi ruskeaa. Pinta on puolihimmeä.",
  },
  {
    question: "Millaisia kokemuksia teillä on Nowocoatista?",
    answer:
      "Olemme pinnoittaneet sillä yli 130 tiilikattoa vuodesta 2022, ja käytämme sitä jokaisessa katossa. Annamme työlle 5 vuoden kirjallisen takuun. Asiakkaiden arviot voit lukea Kokemuksia-sivulta.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Nowocoat on vesiohenteinen kattopinnoite, joka on kehitetty ammattikäyttöön betonitiilikatoille.</li>
        <li>Se levitetään korkeapaineruiskulla kahteen kertaan, ja toinen kerros voidaan maalata noin kahden tunnin kuluttua.</li>
        <li>Pinta on puolihimmeä ja hengittävä, ja värejä on kaikki perusvärit.</li>
        <li>Käytämme sitä jokaisessa katossa ja annamme työlle 5 vuoden kirjallisen takuun.</li>
      </ul>
    </KeyPoints>

    <p>
      Asiakkaat kysyvät, mikä maali kattoon tulee ja miksi. Vastaus on Nowocoat, ja syyt ovat yksinkertaiset.
      Kerromme tässä, mitä valmistaja sanoo tuotteesta ja miten käytämme sitä.
    </p>

    <h2>Mikä Nowocoat on?</h2>
    <p>
      Nowocoat Roof Coating on tanskalaisen NowoCoat A/S:n valmistama vesiohenteinen kattopinnoite. Valmistajan
      mukaan se on kehitetty ammattikäyttöön ja soveltuu kaikkien eri valmistajien betonikattotiilien
      pinnoittamiseen. Yhtiön juuret ulottuvat vuoteen 1861. Pinnoite on hengittävä, ja valmistaja sanoo sen
      suojaavan katemateriaalia rapautumiselta ja kasvustolta.
    </p>
    <Table
      head={["Ominaisuus", "Valmistajan tieto"]}
      rows={[
        ["Tyyppi", "Vesiohenteinen kattopinnoite betonitiilelle"],
        ["Levitys", "Korkeapaineruisku, tela tai pensseli"],
        ["Kerrokset", "Kaksi kerrosta, riittoisuus 2–3 m² litralla"],
        ["Päälle maalattavissa", "Noin 2 tuntia"],
        ["Täysin kuiva", "24 tuntia (20 °C, 60 % kosteus)"],
        ["Kiilto", "Puolihimmeä"],
        ["Värit", "Kaikki perusvärit"],
      ]}
      caption="Nowocoat Roof Coating valmistajan esitteen 2025 mukaan."
    />
    <Avainhuomio>Nowocoat on betonitiilelle kehitetty pinnoite, joka levitetään kahteen kertaan ja kuivuu vuorokaudessa.</Avainhuomio>

    <h2>Miten käytämme Nowocoatia katolla?</h2>
    <p>
      Samalla tavalla kuin valmistaja neuvoo. Katto pestään painepesulla ja käsitellään kasvustontorjunta-aineella.
      Rikkinäiset tiilet vaihdetaan. Sitten pinnoite levitetään korkeapaineruiskulla kahteen kertaan: ensin
      pohjamaali, sitten pintamaali. Reunat, harjatiilet ja ahtaat paikat maalaamme telalla tai käsin. Koska
      toinen kerros voidaan maalata noin kahden tunnin kuluttua, molemmat kerrokset onnistuvat usein samana
      päivänä. Kerromme syyt kahteen kerrokseen artikkelissa{" "}
      <Link to="/artikkelit/kaksi-maalikerrosta-tiilikatto/">miksi maalaamme katon kahteen kertaan</Link>.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-valkeakoski-pinnoitettu-tiilikatto-lahikuva"
      ratio="3/4"
      alt="Pinnoitettu tiilikatto läheltä Valkeakoskella"
      caption="Nowocoatilla pinnoitettu tiilikatto läheltä. Pinta on puolihimmeä."
    />
    <Avainhuomio>Käytämme Nowocoatia valmistajan ohjeen mukaan: ruiskulla, kahteen kertaan, pestylle ja käsitellylle katolle.</Avainhuomio>

    <h2>Mitä värejä Nowocoatista saa?</h2>
    <p>
      Valmistajan mukaan kaikki perusvärit. Tiilikattopinnoitteen värikartassa on 16 väriä: viisi harmaata, kaksi
      mustaa, seitsemän punaista ja kaksi ruskeaa, ja ne kattavat lähes kaikki Pirkanmaan katot. Väri
      valitaan kuntotarkastuksessa, ja värin vaihto ei nosta hintaa, koska katto maalataan joka tapauksessa
      kahteen kertaan. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/tiilikaton-varin-vaihto-pinnoituksessa/">tiilikaton värin vaihto pinnoituksessa</Link>.
    </p>
    <Table
      head={["Väri", "Valmistajan koodi", "NCS-sävy"]}
      rows={[
        ["Vaaleanharmaa (Pale Grey)", "714", "2005-G60Y"],
        ["Antrasiitti (Anthracite)", "701", "8005-R80B"],
        ["Antrasiitti tumma (Anthracite Dark)", "709", "8502-B"],
        ["Liuskeenharmaa (Slate Grey)", "719", "7502-B"],
        ["Harmaa (Grey)", "716", "S 7000"],
        ["Musta (Black)", "901", "9000-N"],
        ["Sinimusta (Blue-Black)", "917", "9000-N"],
        ["Tiilenpunainen (Tile Red)", "203", "4050-Y60R"],
        ["Tupapunainen", "204", "S 4050-Y80R"],
        ["Ruotsinpunainen (Swedish Red)", "314", "6030-Y70R"],
        ["Erikoispunainen (Special Red)", "205", "5040-Y70R"],
        ["Punaruskea (Red Brown)", "807", "6030-Y70R"],
        ["Oksidinpunainen (Oxide Red)", "307", "5040-Y80R"],
        ["Bordeaux", "312", "7020-Y90R"],
        ["Mokka (Mocca)", "803", "7020-Y50R"],
        ["Tummanruskea (Dark Brown)", "811", "8010-Y70R"],
      ]}
      caption="Nowocoatin tiilikattopinnoitteen värikartta, 16 väriä. NCS-sävyt ovat suuntaa antavia."
    />
    <Avainhuomio>Värikartan 16 väriä riittävät lähes kaikkiin kattoihin, ja väri valitaan kuntotarkastuksessa.</Avainhuomio>

    <h2>Millaisia kokemuksia meillä on Nowocoatista?</h2>
    <p>
      Olemme pinnoittaneet Nowocoatilla yli 130 tiilikattoa vuodesta 2022, ja käytämme sitä jokaisessa katossa.
      Kokemus on yksinkertainen: kun katto on pesty ja käsitelty kunnolla ja maalia on kaksi kerrosta, pinta on
      tasainen ja puolihimmeä, ja tiili ei enää ime vettä. Annamme työlle 5 vuoden kirjallisen takuun, ja takuun
      aikana korjaamme jäljet, jos niissä on vikaa. Kohteita voit katsoa sivulta{" "}
      <Link to="/referenssit/">referenssit</Link> ja asiakkaiden arvioita sivulta <Link to="/kokemuksia/">kokemuksia</Link>.
    </p>
    <Avainhuomio>Yli 130 kattoa Nowocoatilla vuodesta 2022 ja 5 vuoden kirjallinen takuu.</Avainhuomio>

    <h2>Kuinka kauan Nowocoat-pinta kestää?</h2>
    <p>
      Pinnoitettu katto kestää jopa 15 vuotta pidempään. Valmistaja suosittelee pinnoituksen jälkeen
      puhdistusaineella tehtävää huoltoa 2–4 vuoden välein, jotta lika ja kasvusto eivät tartu pintaan.
      Annamme työlle 5 vuoden kirjallisen takuun.
    </p>
    <Avainhuomio>Pinnoitettu katto kestää jopa 15 vuotta pidempään, ja takuu on 5 vuotta.</Avainhuomio>

    <h2>Mitä Nowocoat-pinnoitus maksaa?</h2>
    <p>
      Maali kuuluu hintaan. Tiilikaton pinnoitus maksaa meillä yleensä 2 850–7 000 euroa, ja hintaan kuuluu
      pesu, kasvustontorjunta, tiilien vaihto, kaksi kerrosta Nowocoatia, siivous ja takuu. Hintaesimerkit
      ovat sivulla <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link>, ja
      palvelun esittelemme sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Kaksi kerrosta Nowocoatia kuuluu 2 850–7 000 euron hintaan.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "NowoCoat: Kattopinnoitteet ammattilaisille, esite 2025–26 (luettu 26.10. ja 29.10.2026)",
          url: "https://rakennusfakta.fi/nowocoat-2025-esite-1420239/tiedosto-files/NowoCoat_Esite_A4_2025.pdf",
        },
        {
          label: "Rakennustieto: RT 103839 tuotetieto, Coating Source Oy, helmikuu 2025 (luettu 29.10.2026)",
          url: "https://www.rakennustieto.fi/",
        },
        {
          label: "NowoCoat Roof Coating: värikartta, 16 väriä NCS-sävyineen (Coating Source, luettu 29.10.2026)",
          url: "https://www.nowocoat.com/",
        },
      ]}
    />
  </>
);

export default Body;
