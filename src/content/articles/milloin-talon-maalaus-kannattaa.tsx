import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources } from "@/components/article/ArticleKit";

/**
 * Eemilin artikkeli. Yrityksen faktat sivuston omia (työvaiheet, kausi, kesto 3–7 päivää, hinnat prices.ts, takuu 2 v).
 * Yleiset faktat Tikkurilan ohjeista (luettu 26.10.2026): huoltomaalausväli peittävillä maaleilla 5–15 vuotta,
 * etelä- ja länsiseinät kuluvat nopeimmin, maalaus noin 10 vuoden välein, lämpötila yli +5 °C, kosteus alle 80 %.
 */
const faq = [
  {
    question: "Kannattaako talo maalata, vaikka maali ei vielä hilseile?",
    answer:
      "Kannattaa, jos väri on haalistunut ja maali liituaa eli jää käteen. Silloin maali on ohentunut, ja uusi kerros on halvempi tehdä nyt kuin kaavinnan jälkeen.",
  },
  {
    question: "Mihin aikaan vuodesta talo kannattaa maalata?",
    answer:
      "Huhti–toukokuusta elo–syyskuuhun. Maalaamme, kun seinä on kuiva, lämpötila on yli +5 °C ja ilman kosteus on alle 80 %. Sateella ei maalata.",
  },
  {
    question: "Kuinka kauan talon maalaus kestää?",
    answer: "Yleensä 3–7 päivää. Aika riippuu talon koosta ja siitä, paljonko kaavittavaa on.",
  },
  {
    question: "Paljonko talon maalaus maksaa?",
    answer:
      "Yleensä 3 500–11 000 euroa. Yksikerroksinen omakotitalo maksaa yleensä 3 500–5 000 euroa ja kaksikerroksinen 7 000–11 000 euroa. Työn osuudesta saat kotitalousvähennyksen.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Talon maalaus kannattaa, kun maali liituaa, haalistuu tai hilseilee. Odottaminen lisää pohjatöitä.</li>
        <li>Peittävä ulkomaali kestää yleensä 5–15 vuotta. Etelä- ja länsiseinä kuluvat ensin.</li>
        <li>Paras aika on huhti–toukokuusta elo–syyskuuhun, kun seinä on kuiva ja lämpötila yli +5 °C.</li>
        <li>Maalaus kestää yleensä 3–7 päivää ja maksaa 3 500–11 000 euroa.</li>
      </ul>
    </KeyPoints>

    <p>
      Moni soittaa meille vasta, kun maali hilseilee isoina lastuina. Silloin maalaus kannattaa varmasti, mutta
      se olisi kannattanut jo pari vuotta aiemmin. Kerromme tässä, mistä merkeistä seinä kertoo, että aika on
      nyt, ja miksi aikaisin maalattu talo on halvempi maalata.
    </p>

    <h2>Milloin talon maalaus kannattaa?</h2>
    <p>
      Talon maalaus kannattaa, kun maali ei enää suojaa puuta. Sen näkee seinästä ennen kuin maali irtoaa.
      Tikkurilan ohjeen mukaan peittävän ulkomaalin huoltoväli on noin 5–15 vuotta, ja puujulkisivu maalataan
      yleensä reilun kymmenen vuoden välein. Väli riippuu ilmansuunnasta, maalista ja edellisen työn laadusta.
    </p>
    <p>
      Nyrkkisääntö on tämä: kun maali liituaa tai väri on selvästi haalistunut, seinä kannattaa maalata
      seuraavana kesänä. Kun maali jo hilseilee, kannattaa maalata heti.
    </p>
    <Avainhuomio>Peittävä ulkomaali suojaa puuta yleensä 5–15 vuotta, ja haalistuminen on ensimmäinen merkki sen lopusta.</Avainhuomio>

    <h2>Mitkä merkit seinässä kertovat, että aika on nyt?</h2>
    <h3>Maali jää käteen</h3>
    <p>
      Pyyhkäise seinää kämmenellä. Jos käteen jää väriä, maali liituaa. Maalikalvo on ohentunut, ja se suojaa puuta
      enää vähän. Tämä on paras hetki maalata, koska kaavittavaa on vähän.
    </p>
    <h3>Väri on haalistunut tai laikukas</h3>
    <p>
      Aurinko haalistaa maalin. Jos etelä- ja länsiseinä ovat selvästi vaaleammat kuin pohjoisseinä, maali on
      kulunut siltä puolelta loppuun. Tikkurilan mukaan etelän ja lännen puoleiset seinät kuluvat nopeimmin.
    </p>
    <h3>Maali hilseilee tai halkeilee</h3>
    <p>
      Kun maali irtoaa lastuina tai pintaan tulee halkeamia, vesi pääsee puuhun. Puu turpoaa ja kuivuu, ja
      maali irtoaa lisää. Mitä pidempään tämä jatkuu, sitä enemmän kaavintaa tarvitaan.
    </p>
    <h3>Seinässä on homepilkkuja tai vihertävää</h3>
    <p>
      Tummat pilkut ja vihreä kasvusto viihtyvät varjoisalla seinällä ja metsän lähellä. Ne pestään pois
      homepesuaineella ennen maalausta. Jos kasvusto palaa pian pesun jälkeen, maalipinta on huokoinen ja
      kulunut.
    </p>
    <h3>Puu on paljas tai harmaa</h3>
    <p>
      Paljas puu harmaantuu auringossa muutamassa kuukaudessa. Harmaa pinta on heikko alusta, ja se pitää
      kaapia ennen pohjamaalia. Tässä vaiheessa maalaus kannattaa ilman muuta.
    </p>
    <Figure
      image="talon-maalaus-parkano-hilseileva-puutalo-ennen"
      alt="Hilseilevä puutalon seinä Parkanossa ennen maalausta"
      caption="Hilseilevä maali Parkanossa ennen työtä. Tällainen seinä vaatii kaavinnan ja pohjamaalin paljaisiin kohtiin."
    />
    <Avainhuomio>Viisi merkkiä riittää päätökseen, ja jo yksi niistä, maalin jääminen käteen, tarkoittaa maalausta seuraavana kesänä.</Avainhuomio>

    <h2>Miksi odottaminen tulee kalliimmaksi?</h2>
    <p>
      Maalauksen hinta ratkeaa pohjatöistä. Kun maali on vain haalistunut, pesemme seinän ja maalaamme sen.
      Kun maali hilseilee, kaavimme irtoavan maalin ja pohjamaalaamme paljaat kohdat ennen pintamaalia. Kaavinta
      on käsityötä, ja se vie päiviä.
    </p>
    <p>
      Puun kunto on toinen asia. Jos vesi on päässyt puuhun vuosia, puu voi olla pehmeää. Puun kunnon voit
      tarkistaa itse ruuvitaltalla. Kerromme siitä artikkelissa{" "}
      <Link to="/artikkelit/huoltomaalaus-vai-uusi-ulkoverhous/">huoltomaalaus vai uusi ulkoverhous</Link>.
    </p>
    <Avainhuomio>Haalistuneen seinän maalaus vie 3–7 päivää, ja hilseilevä seinä lisää siihen kaavintapäiviä.</Avainhuomio>

    <h2>Mihin aikaan vuodesta talo kannattaa maalata?</h2>
    <p>
      Maalauskausi on huhti–toukokuusta elo–syyskuuhun. Maalaamme, kun seinä on kuiva, lämpötila on yli +5 °C
      ja ilman kosteus on alle 80 %. Paras sää on lämmin ja pilvinen pouta. Sateella ei maalata, eikä siirretystä
      päivästä tule lisäkuluja.
    </p>
    <p>
      Kesän työt täyttyvät pitkälti jo keväällä. Jos huomaat merkit syksyllä, pyydä arviokäynti talvella tai
      heti keväällä, niin saat paikan kalenterista ennen kesää.
    </p>
    <Avainhuomio>Maalaus onnistuu, kun lämpötila on yli +5 °C ja ilman kosteus alle 80 %, eli käytännössä huhtikuusta syyskuuhun.</Avainhuomio>

    <h2>Mitä talon maalaus maksaa ja miten se etenee?</h2>
    <p>
      Talon maalaus maksaa meillä yleensä 3 500–11 000 euroa. Yksikerroksinen omakotitalo on yleensä 3 500–5 000
      euroa ja kaksikerroksinen 7 000–11 000 euroa. Työ etenee näin: homepesu harjoilla, kaavinta, kuivuminen,
      pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Maali on pääsääntöisesti Tikkurila. Saat työlle 2
      vuoden kirjallisen takuun.
    </p>
    <p>
      Arvion omalle talollesi saat <Link to="/hintalaskuri/?palvelu=maalaus">hintalaskurilla</Link>. Hintaesimerkit
      ovat sivulla <Link to="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</Link>, ja palvelun kuvaamme
      sivulla <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>. Arviokäynti on ilmainen, ja
      tulemme yleensä samalla viikolla.
    </p>
    <Avainhuomio>Yksikerroksisen talon maalaus maksaa yleensä 3 500–5 000 euroa, ja työn osuudesta saat 40 % kotitalousvähennyksenä.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Tikkurila: Huoltomaalaussuosituksia puu-ulkoverhouspinnoille (luettu 26.10.2026)",
          url: "https://tikkurila.fi/pro/artikkeli/huoltomaalaussuosituksia-puu-ulkoverhouspinnoille",
        },
        {
          label: "Tikkurila: Mitä tulee huomioida ennen puutalon maalausta (luettu 26.10.2026)",
          url: "https://tikkurila.fi/ohjeet/huomioitavaa-ennen-puutalon-maalausta",
        },
        {
          label: "Tikkurila: How to paint wooden façades and fences (lämpötila ja kosteus)",
          url: "https://tikkurila.com/pro/how-to-paint-wooden-facades-and-fences",
        },
      ]}
    />
  </>
);

export default Body;
