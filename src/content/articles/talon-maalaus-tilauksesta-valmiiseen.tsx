import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: tyovaiheet.ts (maalausTyovaiheet: arviokäynti, suojaus, homepesu, kaavinta, pohjamaali,
 * pintamaali pensselillä, lopputarkastus ja 2 v takuu), faqData.ts (arviokäynti samalla viikolla, asiakkaan on hyvä olla
 * paikalla, sopimus ja aikataulu, ennakkolasku 10 %, 3–7 päivää, kausi huhti–toukokuusta elo–syyskuuhun), VASTAUSLUPAUS
 * (company.ts). Etätarjous on mahdollinen (Eerik 27.10.2026): kuvat ja arvio seinien koosta riittävät yleensä.
 */
const faq = [
  {
    question: "Miten talon maalaus tilataan?",
    answer:
      "Soita Eemilille, lähetä viesti tai täytä tarjouspyyntö. Vastaamme viimeistään seuraavana arkipäivänä ja sovimme arviokäynnin, yleensä samalle viikolle.",
  },
  {
    question: "Mitä arviokäynnillä tapahtuu?",
    answer:
      "Eemil käy seinät läpi ja katsoo, mitä maalia niissä on ja paljonko pohjatöitä tarvitaan. Saat kirjallisen tarjouksen, jossa on kiinteä hinta. Sinun on hyvä olla paikalla.",
  },
  {
    question: "Kuinka pian tarjouksen jälkeen maalaus alkaa?",
    answer:
      "Kun hyväksyt tarjouksen, sovimme aikataulun kirjallisesti vapaiden viikkojen rajoissa. Kesän ajat täyttyvät keväällä. Otamme yhteyttä ennen aloituspäivää.",
  },
  {
    question: "Milloin maksan?",
    answer: "Ennakkolasku on 10 % hinnasta hyväksymisen jälkeen. Loput laskutamme, kun työ on valmis ja käyty yhdessä läpi.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Tilaus alkaa yhteydenotosta ja ilmaisesta arviokäynnistä, yleensä samalla viikolla.</li>
        <li>Saat kirjallisen tarjouksen kiinteällä hinnalla. Hyväksymisen jälkeen sovimme aikataulun.</li>
        <li>Työ kestää 3–7 päivää: suojaus, homepesu, kaavinta, pohjamaali ja pintamaali pensselillä.</li>
        <li>Lopputarkastus tehdään yhdessä, ja takuu on 2 vuotta.</li>
      </ul>
    </KeyPoints>

    <p>
      Kerromme tässä koko matkan ensimmäisestä yhteydenotosta valmiiseen seinään. Kun tiedät, mitä tapahtuu
      ja milloin, tilaaminen on helpompaa.
    </p>

    <h2>Miten tilaus etenee ennen työtä?</h2>
    <Table
      head={["Vaihe", "Milloin", "Mitä tapahtuu"]}
      rows={[
        ["Yhteydenotto", "Päivä 0", "Soitat, lähetät viestin tai täytät tarjouspyynnön"],
        ["Vastaus", "Viimeistään seuraava arkipäivä", "Sovimme arviokäynnin"],
        ["Arviokäynti", "Yleensä samalla viikolla", "Eemil katsoo seinät, maalin tyypin ja pohjatyöt"],
        ["Tarjous", "Käynnin jälkeen", "Kirjallinen tarjous kiinteällä hinnalla"],
        ["Hyväksyminen", "Kun olet valmis", "Vastaat tarjousviestiin"],
        ["Sopimus ja aikataulu", "Hyväksymisen jälkeen", "Kirjallinen sopimus, ennakkolasku 10 %"],
      ]}
      caption="Tilauksesta aloituspäivään. Arviokäynti ja tarjous ovat ilmaisia."
    />
    <Avainhuomio>Arviokäynti onnistuu yleensä samalla viikolla, ja tarjous on kirjallinen ja kiinteä.</Avainhuomio>

    <h2>Mitä arviokäynnillä katsotaan?</h2>
    <p>
      Eemil käy seinät läpi ja katsoo kolme asiaa: mitä maalia seinässä on nyt, paljonko maalia on irti ja
      paljonko puuta on paljaana, ja mitä pitää suojata. Hän kysyy, haluatko saman värin vai uuden. Sinun on
      hyvä olla paikalla, koska päätökset tehdään yhdessä. Tarjouksen saat myös etänä: yleensä kuvat seinistä
      ja arvio seinien koosta riittävät, ja tarkat mitat ovat iso plussa. Arviokäynti on silti tarkin tapa,
      koska vanhan maalin tyyppiä ja puun kuntoa ei näe kuvasta. Tarjoukseen kirjataan maali, väri, työvaiheet
      ja kiinteä hinta.
    </p>
    <Avainhuomio>Arviokäynnillä katsotaan vanha maali, pohjatöiden määrä ja suojaukset, ja ne kirjataan tarjoukseen.</Avainhuomio>

    <h2>Mitä maalausviikolla tapahtuu?</h2>
    <ol>
      <li>Suojaus. Terassit, ikkunat ja istutukset suojataan.</li>
      <li>Homepesu. Seinät pestään homepesuaineella ja harjoilla ja huuhdellaan. Seinä kuivuu.</li>
      <li>Kaavinta. Irtoava maali kaavitaan pois.</li>
      <li>Pohjamaali paljaisiin puukohtiin.</li>
      <li>Pintamaali pensselillä. Maali on pääsääntöisesti Tikkurila.</li>
      <li>Lopputarkastus. Kierrämme talon yhdessä, siivoamme jälkemme ja annamme 2 vuoden kirjallisen takuun.</li>
    </ol>
    <p>
      Omakotitalo valmistuu yleensä 3–7 päivässä. Keston kerromme tarkemmin artikkelissa{" "}
      <Link to="/artikkelit/talon-maalaus-kesto-3-7-paivaa/">kuinka kauan talon maalaus kestää</Link>.
    </p>
    <Figure
      image="talon-maalaus-vihrea-puutalo-ulkomaalaus-jalkeen"
      alt="Vihreä puutalo ulkomaalauksen jälkeen"
      caption="Vihreä puutalo ulkomaalauksen jälkeen."
    />
    <Avainhuomio>Maalausviikko on kuusi vaihetta, ja se päättyy yhteiseen lopputarkastukseen.</Avainhuomio>

    <h2>Mitä työn jälkeen tapahtuu?</h2>
    <p>
      Lähetämme loppulaskun, jossa työn osuus on eriteltynä kotitalousvähennystä varten. Vähennys on 40 % työn
      osuudesta, enintään 2 100 euroa henkilöltä. Takuu on 2 vuotta kirjallisena. Maalaus maksaa yleensä
      3 500–11 000 euroa. Tilaa arviokäynti sivulta <Link to="/tarjouspyynto/">tarjouspyyntö</Link>, ja katso
      palvelu sivulta <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Loppulaskussa on työn osuus eriteltynä, ja takuu on 2 vuotta.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
