import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (maalauskausi huhti–toukokuusta elo–syyskuuhun; arviokäynti samalla viikolla,
 * asiakas paikalla; sopimus ja aikataulu; yhteydenotto ennen aloituspäivää), hinta-artikkeli ("Kesän työt täyttyvät pitkälti
 * jo keväällä"), docs/asiakaskysymykset-2026.md (kysymys 28). Ei ulkoisia faktoja.
 */
const faq = [
  {
    question: "Milloin kesän 2027 maalaus kannattaa tilata?",
    answer: "Talvella tai heti keväällä. Kesän työt täyttyvät pitkälti jo keväällä, ja arviokäynnin voi tehdä heti, kun seinät ovat lumettomat.",
  },
  {
    question: "Voiko arviokäynnin tehdä talvella?",
    answer: "Voi, jos seinät näkyvät lumen alta. Maalin tyypin ja kaavittavan määrän näkee talvellakin. Työ tehdään kauden aikana.",
  },
  {
    question: "Kumpi on parempi, kevät vai syksy?",
    answer: "Molemmat käyvät. Keväällä talo on valmis kesäksi, syksyllä seinä saa suojan talveksi. Sää ratkaisee enemmän kuin kuukausi.",
  },
  {
    question: "Mitä jos tilaan vasta kesällä?",
    answer: "Kysy silti. Sateet ja siirrot vapauttavat joskus päiviä, ja syksyn ajat täyttyvät viimeisenä. Maalauksia teemme elo–syyskuuhun asti.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Maalauskausi on huhti–toukokuusta elo–syyskuuhun.</li>
        <li>Kesän työt täyttyvät pitkälti jo keväällä, joten tilaus kannattaa tehdä talvella.</li>
        <li>Arviokäynti onnistuu yleensä samalla viikolla, myös talvella, jos seinät näkyvät.</li>
        <li>Aikataulu sovitaan kirjallisesti, kun hyväksyt tarjouksen.</li>
      </ul>
    </KeyPoints>

    <p>
      Talon maalaus on kesätyö, mutta sen tilaaminen on talvityö. Kerromme tässä, miten kausi kulkee ja milloin
      tilaus kannattaa tehdä, jotta saat viikon, joka sopii sinulle.
    </p>

    <h2>Miten maalauskausi kulkee Pirkanmaalla?</h2>
    <Table
      head={["Aika", "Mitä tapahtuu", "Mitä sinun kannattaa tehdä"]}
      rows={[
        ["Joulu–maaliskuu", "Kalenteri avautuu, tarjouksia tehdään", "Ota yhteyttä ja sovi arviokäynti"],
        ["Huhti–toukokuu", "Kauden ensimmäiset maalaukset, kun seinät ovat kuivat", "Hyväksy tarjous ja sovi viikko"],
        ["Kesä–heinäkuu", "Kiirein aika, viikot pitkälti täynnä", "Tilaa ajoissa tai kysy vapautuneita päiviä"],
        ["Elo–syyskuu", "Kauden viimeiset maalaukset", "Hyvä aika, jos kevät meni ohi"],
      ]}
      caption="Maalauskausi Pirkanmaalla. Maalaamme huhti–toukokuusta elo–syyskuuhun."
    />
    <Avainhuomio>Kausi kestää huhti–toukokuusta elo–syyskuuhun, ja kesä–heinäkuu täyttyy ensimmäisenä.</Avainhuomio>

    <h2>Miksi tilaus kannattaa tehdä talvella?</h2>
    <p>
      Saat valita viikon, jolloin olet kotona. Ehdit päättää värin rauhassa ja kysyä kunnasta, tarvitaanko
      värin vaihtoon ilmoitus. Ja arviokäynti ehditään tehdä ilman kiirettä. Eemil katsoo talvellakin, mitä
      maalia seinässä on ja paljonko kaavittavaa on, jos seinät näkyvät lumen alta. Tarjous on ilmainen eikä
      velvoita tilaamaan. Lue, mitä arviokäynnillä katsotaan, artikkelista{" "}
      <Link to="/artikkelit/talon-maalaus-tilauksesta-valmiiseen/">talon maalaus tilauksesta valmiiseen</Link>.
    </p>
    <Avainhuomio>Talvella tilaava saa valita viikon ja ehtii päättää värin rauhassa.</Avainhuomio>

    <h2>Kevät vai syksy?</h2>
    <p>
      Molemmat käyvät. Keväällä siitepöly on ohi vasta kesäkuussa, ja seinä pitää pestä joka tapauksessa.
      Syksyllä päivät ovat kuivia, mutta yöt viilenevät, ja lämpötilan pitää pysyä yli 5 asteessa myös yöllä.
      Sää ratkaisee enemmän kuin kuukausi: seinän pitää olla kuiva ja ilmankosteuden alle 80 prosenttia.
      Kerromme säästä artikkelissa{" "}
      <Link to="/artikkelit/milloin-talon-voi-maalata-saa/">milloin talon voi maalata</Link>.
    </p>
    <Figure
      image="talon-maalaus-keltainen-ulkoverhous-huoltomaalaus-jalkeen"
      ratio="3/4"
      alt="Keltainen ulkoverhous huoltomaalauksen jälkeen"
      caption="Keltainen ulkoverhous huoltomaalauksen jälkeen."
    />
    <Avainhuomio>Kevät ja syksy käyvät yhtä hyvin, kun seinä on kuiva ja yöt pysyvät yli 5 asteessa.</Avainhuomio>

    <h2>Miten tilaan?</h2>
    <p>
      Soita Eemilille, lähetä viesti tai täytä <Link to="/tarjouspyynto/">tarjouspyyntö</Link>. Suuntaa antavan
      hinnan saat heti <Link to="/hintalaskuri/?palvelu=maalaus">hintalaskurilla</Link>. Maalaus maksaa yleensä
      3 500–11 000 euroa, ja työn osuudesta saat kotitalousvähennyksen. Jos myös katto kaipaa pinnoitusta, kerro
      se samalla, niin saat edullisemman pakettihinnan. Palvelun esittelemme sivulla{" "}
      <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Tarjouspyyntö vie minuutin, ja katto samalla kertaa tuo edullisemman pakettihinnan.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
