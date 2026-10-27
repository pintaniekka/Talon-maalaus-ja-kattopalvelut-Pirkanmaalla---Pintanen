import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints } from "@/components/article/ArticleKit";

/**
 * Vastaukset sivuston omista lähteistä: faqData.ts (maalausFAQ, generalFAQ), prices.ts, tyovaiheet.ts, company.ts.
 * Kysymysten järjestys perustuu asiakasviestien aihemääriin (docs/asiakaskysymykset-2026.md). Ei uusia faktoja.
 */
const faq = [
  {
    question: "Paljonko talon ulkomaalaus maksaa?",
    answer: "Yleensä 3 500–11 000 euroa. Hinta riippuu talon koosta, korkeudesta ja pohjatöiden määrästä.",
  },
  {
    question: "Kuinka kauan maalaus kestää?",
    answer: "Omakotitalo valmistuu yleensä 3–7 päivässä. Työ ei estä normaalia asumista.",
  },
  {
    question: "Milloin talo pitää maalata?",
    answer: "Kun maali hilseilee, väri on haalistunut tai seinässä on homepilkkuja. Yleensä 10–15 vuoden välein.",
  },
  {
    question: "Saako maalauksesta kotitalousvähennyksen?",
    answer: "Kyllä. Vuosina 2026 ja 2027 saat vähentää 40 % työn osuudesta, enintään 2 100 euroa henkilöltä.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Maalaus maksaa yleensä 3 500–11 000 euroa ja kestää 3–7 päivää.</li>
        <li>Puutalo maalataan yleensä 10–15 vuoden välein, kun maali hilseilee tai haalistuu.</li>
        <li>Maalaamme pensselillä, pääsääntöisesti Tikkurilan maaleilla, ja takuu on 2 vuotta.</li>
        <li>Arviokäynti on ilmainen, ja kotitalousvähennys on 40 % työn osuudesta.</li>
      </ul>
    </KeyPoints>

    <p>
      Kävimme läpi asiakkaidemme viestit ja laskimme, mitä talon maalauksesta kysytään eniten. Tässä ovat
      kymmenen yleisintä kysymystä ja vastaukset lyhyesti.
    </p>

    <h2>1. Paljonko talon maalaus maksaa?</h2>
    <p>
      Yleensä 3 500–11 000 euroa. Yksikerroksinen talo 3 500–5 000, puolitoistakerroksinen 5 000–7 000 ja
      kaksikerroksinen 7 000–11 000 euroa. Hintaesimerkit ovat sivulla{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</Link>.
    </p>
    <Avainhuomio>Yleisin talon koko maksaa yleensä 5 000–7 000 euroa.</Avainhuomio>

    <h2>2. Mitä hintaan kuuluu?</h2>
    <p>
      Homepesu, kaavinta, terassien ja ympäristön suojaus, pohjamaali paljaisiin kohtiin, pintamaali pensselillä,
      telineet ja nostimet, siivous ja 2 vuoden kirjallinen takuu. Piilokuluja ei tule.
    </p>
    <Avainhuomio>Hinta sisältää pohjatyöt, maalit, telineet ja takuun.</Avainhuomio>

    <h2>3. Milloin talo pitää maalata?</h2>
    <p>
      Kun maali hilseilee, väri on haalistunut tai seinässä on homepilkkuja. Puutalo tarvitsee uuden maalin
      yleensä 10–15 vuoden välein. Merkit kerromme artikkelissa{" "}
      <Link to="/artikkelit/kuinka-usein-puutalo-maalataan/">kuinka usein puutalo pitää maalata</Link>.
    </p>
    <Avainhuomio>Kolme merkkiä kertoo ajan: hilseily, haalistuminen ja homepilkut.</Avainhuomio>

    <h2>4. Kuinka kauan maalaus kestää?</h2>
    <p>
      Omakotitalo valmistuu yleensä 3–7 päivässä. Pohjatyöt vievät usein enemmän aikaa kuin maalaus. Työ ei
      estä normaalia asumista.
    </p>
    <Avainhuomio>Kolmesta seitsemään päivää riittää omakotitaloon.</Avainhuomio>

    <h2>5. Mitä maalia käytätte?</h2>
    <p>
      Pääsääntöisesti Tikkurilan ulkomaaleja. Valitsemme maalin vanhan maalin ja puun kunnon mukaan, ja maali
      kirjataan tarjoukseen. Valinnasta kerromme artikkelissa{" "}
      <Link to="/artikkelit/puutalon-ulkomaalin-valinta/">puutalon ulkomaalin valinta</Link>.
    </p>
    <Avainhuomio>Maali valitaan vanhan maalin mukaan ja kirjataan tarjoukseen.</Avainhuomio>

    <h2>6. Miksi maalaatte pensselillä?</h2>
    <p>
      Pensseli painaa maalin puun syihin ja lautojen saumoihin. Ruisku jättää maalin pintaan. Syyt kerromme
      artikkelissa <Link to="/artikkelit/ruisku-vai-pensseli-talon-maalaus/">ruisku vai pensseli</Link>.
    </p>
    <Avainhuomio>Pensseli antaa puulle paremman tartunnan kuin ruisku.</Avainhuomio>

    <h2>7. Milloin on paras aika maalata?</h2>
    <p>
      Maalauskausi on huhti–toukokuusta elo–syyskuuhun. Maalaamme, kun seinä on kuiva ja ilmankosteus alle 80
      prosenttia. Sateella ei maalata, ja siirretystä päivästä ei tule lisäkuluja.
    </p>
    <Avainhuomio>Kausi kestää huhti–toukokuusta elo–syyskuuhun, ja sade ei nosta hintaa.</Avainhuomio>

    <h2>8. Maalaatteko mökkejä, hirsitaloja ja rintamamiestaloja?</h2>
    <p>
      Kyllä. Työvaiheet ovat samat: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä.
      Lue lisää artikkeleista <Link to="/artikkelit/hirsitalon-maalaus/">hirsitalon maalaus</Link> ja{" "}
      <Link to="/artikkelit/rintamamiestalon-maalaus/">rintamamiestalon maalaus</Link>.
    </p>
    <Avainhuomio>Mökki, hirsitalo ja rintamamiestalo maalataan samoilla työvaiheilla.</Avainhuomio>

    <h2>9. Saako kotitalousvähennyksen?</h2>
    <p>
      Saa. Vuosina 2026 ja 2027 vähennys on 40 % työn osuudesta, enintään 2 100 euroa henkilöltä, ja omavastuu
      150 euroa. Työn osuus on laskussa eriteltynä. Lue lisää sivulta{" "}
      <Link to="/kotitalousvahennys/">kotitalousvähennys</Link>.
    </p>
    <Avainhuomio>Vähennys on 40 prosenttia työn osuudesta ja enintään 2 100 euroa henkilöltä.</Avainhuomio>

    <h2>10. Milloin pääsette katsomaan talon?</h2>
    <p>
      Arviokäynti onnistuu yleensä samalla viikolla, myös iltaisin ja viikonloppuisin. Se on ilmainen, ja sinun
      on hyvä olla paikalla. Tarjouksen saat myös etänä, kun lähetät kuvat seinistä ja arvion niiden koosta.
      Saat kirjallisen tarjouksen kiinteällä hinnalla. Hyväksymisen jälkeen tulee 10
      prosentin ennakkolasku, ja loput laskutamme valmiista työstä. Palvelun esittelemme sivulla{" "}
      <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>.
    </p>
    <Figure
      image="talon-maalaus-vaaleansininen-omakotitalo-julkisivumaalaus"
      ratio="1/1"
      alt="Vaaleansininen omakotitalo julkisivumaalauksen jälkeen"
      caption="Vaaleansininen omakotitalo julkisivumaalauksen jälkeen."
    />
    <Avainhuomio>Arviokäynti onnistuu yleensä samalla viikolla ja on ilmainen.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
