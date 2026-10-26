import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: tyovaiheet.ts (homepesu homepesuaineella ja harjoilla, kaavinta, pohjamaali paljaisiin
 * kohtiin, pintamaali pensselillä), prices.ts includes, takuu 2 vuotta. Yleiset faktat: Tikkurila Homeenpoisto (luettu
 * 26.10.2026): "Homeenpoistopesu varmistaa, ettei uuden maalikerroksen alle jää itiökasvustoa", mekaaninen harjaus
 * tehostaa, huuhtele. K-Rauta ulkomaalausohje (26.10.2026): harjaa irtonainen vanha maali, paljaat puupinnat pohjamaalataan,
 * puun kosteus enintään 20 %.
 */
const faq = [
  {
    question: "Miksi vanha maali kaavitaan?",
    answer:
      "Uusi maali tarttuu vain kiinni olevaan pintaan. Jos irtoavan maalin päälle maalaa, uusi kerros irtoaa vanhan mukana. Siksi kaavimme irtoavan maalin pois ennen maalausta.",
  },
  {
    question: "Kaavitteko koko seinän paljaaksi?",
    answer:
      "Kaavimme ja harjaamme vain irtoavan maalin pois. Kiinni oleva vanha maali jää pohjaksi, kuten maalin valmistajat neuvovat.",
  },
  {
    question: "Miksi seinä pestään ennen maalausta?",
    answer:
      "Home, lika ja siitepöly estävät maalin tartunnan. Homepesu varmistaa valmistajan mukaan, ettei uuden maalikerroksen alle jää itiökasvustoa, joka kasvaisi maalin läpi.",
  },
  {
    question: "Kauanko pohjatyöt kestävät?",
    answer:
      "Pohjatyöt vievät usein enemmän aikaa kuin maalaus. Omakotitalo valmistuu yleensä 3–7 päivässä, ja siitä iso osa on pesua, kuivumista ja kaavintaa.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Uusi maali tarttuu vain puhtaaseen ja kiinni olevaan pintaan.</li>
        <li>Homepesu harjoilla poistaa homeen ja lian. Ilman pesua home kasvaa uuden maalin läpi.</li>
        <li>Kaavinta poistaa irtoavan maalin. Ehjä vanha maali jää pohjaksi.</li>
        <li>Pohjamaali tulee vain paljaisiin puukohtiin, ja sitten pintamaali pensselillä.</li>
      </ul>
    </KeyPoints>

    <p>
      Maalaus kestää niin kauan kuin pohja kestää. Jos maali levitetään likaiselle tai irtoavalle pinnalle, se
      lähtee ensimmäisen talven jälkeen, vaikka maali olisi kuinka hyvää. Kerromme tässä, mitä pohjatöissä
      teemme ja miksi ne vievät suurimman osan ajasta.
    </p>

    <h2>Miksi seinä pestään homepesuaineella?</h2>
    <p>
      Puutalon seinässä on vuosien jälkeen likaa, siitepölyä ja usein hometta. Tikkurilan ohjeen mukaan
      homeenpoistopesu varmistaa, ettei uuden maalikerroksen alle jää itiökasvustoa. Jos home jää seinään,
      se kasvaa maalin läpi, ja mustat pilkut tulevat takaisin. Pesemme seinät homepesuaineella ja harjoilla,
      koska mekaaninen harjaus tehostaa pesua. Sitten huuhtelemme huolellisesti ja annamme seinän kuivua.
    </p>
    <Avainhuomio>Homepesu poistaa itiöt, jotka muuten kasvaisivat uuden maalin läpi.</Avainhuomio>

    <h2>Miksi irtoava maali kaavitaan?</h2>
    <p>
      Maali tarttuu vain siihen, mikä on kiinni. Irtoava, hilseilevä maali on jo irti puusta, ja uusi kerros
      sen päällä irtoaa yhdessä sen kanssa. K-Raudan ohje on sama: irtonainen vanha maali harjataan ja
      kaavitaan pois. Ehjä, kiinni oleva maali jää pohjaksi. Poistamme vain sen, mikä irtoaa. Kaavinnan jälkeen harjaamme pölyn pois.
    </p>
    <Table
      head={["Vaihe", "Mitä tehdään", "Miksi"]}
      rows={[
        ["Homepesu", "Homepesuaine ja harjat, huuhtelu", "Itiöt ja lika pois, maali tarttuu"],
        ["Kuivuminen", "Seinä kuivuu, kosteus enintään 20 %", "Märkään puuhun maali ei tartu"],
        ["Kaavinta", "Irtoava maali kaapimella ja harjalla", "Uusi maali pysyy vain kiinni olevan päällä"],
        ["Pohjamaali", "Vain paljaisiin puukohtiin", "Paljas puu imee, pohjamaali tasaa"],
        ["Pintamaali", "Pensselillä laudan suuntaan", "Maali painuu syihin ja saumoihin"],
      ]}
      caption="Talon maalauksen pohjatyöt ja syyt. Pohjatyöt vievät usein enemmän aikaa kuin itse maalaus."
    />
    <Figure
      image="talon-maalaus-parkano-hilseileva-puutalo-ennen"
      alt="Hilseilevä puutalon seinä Parkanossa ennen maalausta"
      caption="Hilseilevä maali Parkanossa ennen työtä. Tällainen pinta kaavitaan ennen maalausta."
    />
    <Avainhuomio>Kaavinta poistaa vain irtoavan maalin, ja ehjä vanha maali jää pohjaksi.</Avainhuomio>

    <h2>Miksi pohjamaali tulee vain paljaisiin kohtiin?</h2>
    <p>
      Paljas puu imee maalia enemmän kuin maalattu pinta. Ilman pohjamaalia pintamaali imeytyy puuhun ja jää
      ohueksi, ja kohta erottuu himmeänä. Pohjamaali tasaa imun. Ehjä vanha maali ei tarvitse uutta pohjamaalia.
      Syyt kerromme tarkemmin artikkelissa{" "}
      <Link to="/artikkelit/pohjamaali-paljaisiin-kohtiin/">miksi pohjamaali vain paljaisiin kohtiin</Link>.
    </p>
    <Avainhuomio>Pohjamaali tasaa paljaan puun imun, ja ehjä maalipinta ei sitä tarvitse.</Avainhuomio>

    <h2>Mitä pohjatyöt maksavat?</h2>
    <p>
      Pohjatyöt kuuluvat hintaan. Omakotitalon maalaus maksaa meillä yleensä 3 500–11 000 euroa, ja hintaan
      kuuluu homepesu, kaavinta, suojaus, pohjamaali paljaisiin kohtiin, pintamaali pensselillä ja siivous.
      Pohjatöiden määrä on yksi kolmesta asiasta, jotka siirtävät hintaa haarukan sisällä. Arviokäynnillä
      Eemil katsoo, paljonko kaavittavaa on, ja hinta on tarjouksessa kiinteä. Hintaesimerkit ovat sivulla{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</Link>, ja palvelun esittelemme sivulla{" "}
      <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Pohjatyöt kuuluvat 3 500–11 000 euron hintaan, ja niiden määrä katsotaan arviokäynnillä.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Tikkurila: Homeenpoisto, tuotesivu (luettu 26.10.2026)",
          url: "https://tikkurila.fi/kotimaalarit/tuotteet/homeenpoisto",
        },
        {
          label: "K-Rauta: Ulkomaalausohje (luettu 26.10.2026)",
          url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/maalaaminen/ulkomaalausohje",
        },
      ]}
    />
  </>
);

export default Body;
