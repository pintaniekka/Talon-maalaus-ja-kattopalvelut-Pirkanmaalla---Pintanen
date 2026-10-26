import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources } from "@/components/article/ArticleKit";

/**
 * Eemilin artikkeli. Yrityksen faktat sivuston omia: mökit, autotallit ja piharakennukset maalataan samoilla
 * työvaiheilla, hinta riippuu koosta (ei hintahaarukkaa mökeille, Eerik 25.10.2026), kausi, takuu 2 vuotta,
 * katto ja seinät samalla kertaa pakettihintana. Kotitalousvähennys vapaa-ajan asunnolle vero.fi (26.10.2026).
 * Kuultavan käsittelyn huoltoväli Tikkurilalta (26.10.2026).
 */
const faq = [
  {
    question: "Maalaatteko mökkejä ja piharakennuksia?",
    answer:
      "Kyllä. Maalaamme mökit, autotallit, autokatokset ja muut piharakennukset. Työvaiheet ovat samat kuin talossa: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä.",
  },
  {
    question: "Saako mökin maalauksesta kotitalousvähennyksen?",
    answer:
      "Kyllä. Vapaa-ajan asunnon kunnossapitotyö oikeuttaa vähennykseen samoin kuin kodin. Vuonna 2027 vähennys on 40 % työn osuudesta, enintään 2 100 euroa henkilöltä.",
  },
  {
    question: "Paljonko mökin maalaus maksaa?",
    answer:
      "Hinta riippuu rakennuksen koosta ja pohjatöiden määrästä. Annamme kiinteän hinnan arviokäynnin jälkeen. Arviokäynti on ilmainen.",
  },
  {
    question: "Kannattaako mökin katto ja seinät teettää samalla kertaa?",
    answer:
      "Kannattaa. Kun teemme tiilikaton pinnoituksen ja seinien maalauksen samalla kertaa, saat edullisemman pakettihinnan.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Maalaamme mökit, autotallit ja piharakennukset samoilla työvaiheilla kuin talot.</li>
        <li>Mökin seinät kuluvat usein nopeammin kuin kodin: ranta, metsä ja varjo pitävät puun märkänä.</li>
        <li>Hinta riippuu koosta ja pohjatöistä. Saat kiinteän hinnan ilmaisesta arviokäynnistä.</li>
        <li>Mökin maalauksesta saa kotitalousvähennyksen, vuonna 2027 enintään 2 100 euroa henkilöltä.</li>
      </ul>
    </KeyPoints>

    <p>
      Mökki maalataan harvemmin kuin koti, ja usein vasta, kun seinä on jo harmaa. Me maalaamme mökkejä,
      autotalleja ja piharakennuksia Pirkanmaalla ja lähikunnissa joka kesä. Kerromme tässä, mikä mökissä on
      toisin kuin omakotitalossa ja mitä kannattaa tietää ennen työtä.
    </p>

    <h2>Miksi mökin seinät kuluvat nopeammin?</h2>
    <p>
      Mökki on yleensä veden äärellä ja puiden keskellä. Ranta tuo kosteutta, puut varjoa, ja varjossa seinä kuivuu
      sateen jälkeen hitaasti. Märkä puu kerää hometta ja levää, ja maali irtoaa alta. Etelään ja länteen päin
      olevat seinät taas haalistuvat auringossa ensin.
    </p>
    <p>
      Moni mökki on myös maalattu kuultavalla käsittelyllä, joka näyttää puun syyt. Tikkurilan mukaan kuultavien
      pintojen huoltoväli on noin 2–5 vuotta, kun peittävä maali kestää 5–15 vuotta.
    </p>
    <Avainhuomio>Kuultava mökin seinä vaatii huoltoa 2–5 vuoden välein, peittomaalattu 5–15 vuoden välein.</Avainhuomio>

    <h2>Miten mökin maalaus etenee?</h2>
    <p>
      Työvaiheet ovat samat kuin omakotitalossa. Pesemme seinät homepesuaineella ja harjoilla, kaavimme irtoavan
      maalin, annamme puun kuivua, pohjamaalaamme paljaat kohdat ja maalaamme pintamaalin pensselillä. Maali on
      pääsääntöisesti Tikkurila, ja valitsemme sen vanhan maalin mukaan. Työn lopuksi kierrämme rakennuksen
      yhdessä sinun kanssasi, ja saat 2 vuoden kirjallisen takuun.
    </p>
    <p>
      Pienessä rakennuksessa työ on nopea, mutta pohjatyöt tehdään yhtä huolella. Harmaa puu kaavitaan ja
      pohjamaalataan, muuten uusi maali irtoaa sen mukana.
    </p>
    <Figure
      image="talon-maalaus-puutalo-ja-parveke-huoltomaalaus-jalkeen"
      alt="Puurakennus ja parveke huoltomaalauksen jälkeen"
      caption="Pienikin rakennus pestään, kaavitaan ja pohjamaalataan ennen pintamaalia."
    />
    <Avainhuomio>Viisi työvaihetta ovat samat mökissä ja talossa, ja pintamaali tulee aina pensselillä.</Avainhuomio>

    <h2>Mitä mökin maalauksessa pitää ottaa huomioon?</h2>
    <ul>
      <li>Vesi ja sähkö. Pesuun tarvitaan vettä. Jos mökillä ei ole vesijohtoa, sovimme siitä arviokäynnillä.</li>
      <li>Tie ja pääsy. Kerro, pääseekö pakettiautolla pihaan ja onko tie kuiva.</li>
      <li>Ympäristö. Suojaamme terassit ja ympäristön ennen työtä. Laiturit ja veneet kannattaa siirtää seinän vierestä.</li>
      <li>Aikataulu. Maalaamme huhti–toukokuusta elo–syyskuuhun, kun seinä on kuiva ja lämpötila yli +5 °C. Sateella ei maalata.</li>
      <li>Paikalla olo. Arviokäynnillä sinun pitää olla mökillä. Työn aikana se ei ole pakollista.</li>
    </ul>
    <Avainhuomio>Mökillä kolme käytännön asiaa, vesi, tie ja seinän vieri, ratkaisevat, että työ alkaa sovittuna päivänä.</Avainhuomio>

    <h2>Kannattaako autotalli ja piharakennus maalata samalla?</h2>
    <p>
      Kannattaa. Kun olemme paikalla telineiden ja kaluston kanssa, piharakennus maalataan samalla reissulla
      edullisemmin kuin erikseen. Sama koskee kattoa: jos mökin tiilikatto on haalistunut, Eerik pinnoittaa sen
      samalla kertaa, ja saat edullisemman pakettihinnan. Lue lisää sivulta{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Katto ja seinät samalla kertaa on yksi reissu ja yksi pakettihinta, erikseen tilattuna kaksi.</Avainhuomio>

    <h2>Paljonko mökin maalaus maksaa?</h2>
    <p>
      Hinta riippuu rakennuksen koosta ja pohjatöiden määrästä, joten mökeille ei ole yleistä hintahaarukkaa.
      Saat kiinteän hinnan kirjallisessa tarjouksessa ilmaisen arviokäynnin jälkeen. Omakotitalon maalauksen hinnat
      ovat sivulla <Link to="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</Link>.
    </p>
    <p>
      Mökin maalauksesta saa kotitalousvähennyksen. Verohallinnon mukaan vapaa-ajan asunnon kunnossapitotyö
      oikeuttaa vähennykseen. Vuonna 2027 vähennys on 40 % työn osuudesta, enintään 2 100 euroa henkilöltä.
      Kirjoitamme laskuun työn osuuden erikseen.
    </p>
    <Avainhuomio>Mökin maalauksesta saa saman 40 % kotitalousvähennyksen kuin kodin maalauksesta.</Avainhuomio>

    <h2>Milloin mökki kannattaa maalata?</h2>
    <p>
      Kun maali jää käteen, väri on haalistunut tai puu on harmaantunut. Merkit kerromme artikkelissa{" "}
      <Link to="/artikkelit/milloin-talon-maalaus-kannattaa/">milloin talon maalaus kannattaa</Link>. Kesän työt
      täyttyvät pitkälti jo keväällä, joten arviokäynti kannattaa pyytää ajoissa. Tulemme Pirkanmaalla ja
      lähikunnissa yleensä samalla viikolla, myös iltaisin ja viikonloppuisin. Palvelun kuvaamme sivulla{" "}
      <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Arviokäynti onnistuu yleensä samalla viikolla, mutta kesän maalauspaikat varataan jo keväällä.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Verohallinto: Mistä töistä vähennyksen saa (vapaa-ajan asunto, luettu 26.10.2026)",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/mista-toista-vahennyksen-saa/",
        },
        {
          label: "Verohallinto: Kotitalousvähennyksen määrä (luettu 26.10.2026)",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara",
        },
        {
          label: "Tikkurila: Huoltomaalaussuosituksia puu-ulkoverhouspinnoille (huoltovälit, luettu 26.10.2026)",
          url: "https://tikkurila.fi/pro/artikkeli/huoltomaalaussuosituksia-puu-ulkoverhouspinnoille",
        },
      ]}
    />
  </>
);

export default Body;
