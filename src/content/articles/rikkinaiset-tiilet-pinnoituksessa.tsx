import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: tyovaiheet.ts (rikkinäiset tiilet vaihdetaan uusiin ennen maalausta), ormax-artikkelin UKK
 * ("Jos sinulla on varatiiliä, käytämme niitä. Muuten voit hankkia tiilet itse, tai me haemme ne sovittua lisähintaa
 * vastaan"), varatiilien maalaus (projects/kuvat), faqData.ts (jos tiilet ovat rikki laajalti, katto kannattaa uusia).
 * Määrää, joka vielä sallii pinnoituksen, ei kerrota lukuna: Eerik ei ole antanut sitä (asiakaskysymykset, kysymys 4).
 */
const faq = [
  {
    question: "Vaihdatteko rikkinäiset tiilet pinnoituksen yhteydessä?",
    answer: "Kyllä. Vaihdamme rikkinäiset tiilet uusiin ennen maalausta. Vaihto kuuluu pinnoituksen hintaan.",
  },
  {
    question: "Kuka hankkii uudet tiilet?",
    answer:
      "Jos sinulla on varatiiliä, käytämme niitä. Muuten voit hankkia tiilet itse, tai me haemme ne sovittua lisähintaa vastaan. Sovimme tämän kuntotarkastuksessa.",
  },
  {
    question: "Montako rikkinäistä tiiltä katolla saa olla?",
    answer:
      "Muutama rikkinäinen tiili on tavallista, ja ne vaihdetaan. Jos tiiliä on rikki laajalti ja ne rapautuvat, katto kannattaa uusia. Kerromme rajan kuntotarkastuksessa katon mukaan.",
  },
  {
    question: "Näkyykö uusi tiili katossa?",
    answer: "Ei maalauksen jälkeen. Uudet tiilet maalataan samalla kertaa muun katon kanssa, ja väri on sama.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Rikkinäiset tiilet vaihdetaan uusiin ennen maalausta. Vaihto kuuluu hintaan.</li>
        <li>Varatiilet ovat paras vaihtoehto. Muuten hankit tiilet itse tai me haemme ne sovittua lisähintaa vastaan.</li>
        <li>Uudet tiilet maalataan samalla kertaa, joten ne eivät erotu.</li>
        <li>Jos tiiliä on rikki laajalti, katto kannattaa uusia. Sanomme sen kuntotarkastuksessa.</li>
      </ul>
    </KeyPoints>

    <p>
      Lähes jokaisella 15 vuotta vanhalla katolla on muutama rikkinäinen tiili. Lumi, jää, putoavat oksat ja
      katolla kävely halkaisevat niitä. Kerromme tässä, miten löydämme ne, mistä uudet tiilet tulevat ja milloin
      rikkinäisiä on liikaa.
    </p>

    <h2>Miten rikkinäiset tiilet löydetään?</h2>
    <p>
      Kuntotarkastuksessa kävelemme katon läpi lape kerrallaan ja katsomme jokaisen tiilen. Pesun jälkeen
      näemme vielä tarkemmin, koska lika ja sammal eivät enää peitä halkeamia. Rikkinäisiä tiiliä on
      tavallisesti eniten pohjoislappeella, puiden alla ja kohdissa, joissa katolla on kävelty: piipun ja
      kattoluukun ympärillä. Halkeaman lisäksi tiili voi olla lohjennut kulmasta tai irronnut kiinnityksestä.
    </p>
    <Avainhuomio>Rikkinäiset tiilet löytyvät kuntotarkastuksessa ja pesun jälkeen, kun lika ei enää peitä halkeamia.</Avainhuomio>

    <h2>Mistä uudet tiilet tulevat?</h2>
    <Table
      head={["Vaihtoehto", "Mitä tapahtuu", "Hinta"]}
      rows={[
        ["Sinulla on varatiiliä", "Käytämme niitä", "Kuuluu pinnoituksen hintaan"],
        ["Hankit tiilet itse", "Ostat tiilet ennen työtä, me vaihdamme", "Vaihto kuuluu hintaan, tiilet maksat itse"],
        ["Me haemme tiilet", "Haemme oikean profiilin tiilet", "Sovittu lisähinta tarjouksessa"],
      ]}
      caption="Kolme tapaa hankkia uudet tiilet. Sovimme tavan kuntotarkastuksessa."
    />
    <p>
      Tiilen profiili pitää olla sama kuin katolla. 2000-luvun katoissa on yleensä Ormax, vanhemmissa katoissa
      monta eri profiilia. Jos profiilia ei enää valmisteta, etsimme sopivan. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/ormax-tiilikaton-pinnoitus/">Ormax-tiilikaton pinnoitus</Link>.
    </p>
    <Avainhuomio>Varatiilet ovat edullisin tapa, ja vaihto kuuluu aina pinnoituksen hintaan.</Avainhuomio>

    <h2>Miten uudet tiilet asennetaan ja maalataan?</h2>
    <p>
      Vaihdamme tiilet pesun jälkeen, ennen maalausta. Uusi tiili nostetaan paikoilleen ja kiinnitetään. Sitten
      maalaamme koko katon ruiskulla kahteen kertaan, joten uudet tiilet saavat saman värin kuin vanhat.
      Ylijääneet varatiilet maalaamme samalla kertaa ja jätämme sinulle. Niillä voit korjata katon
      myöhemmin ilman värieroa.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-varatiilien-maalaus"
      alt="Varatiilien maalaus tiilikaton pinnoituksen yhteydessä"
      caption="Varatiilet maalataan samalla kertaa, jotta ne sopivat kattoon myöhemmin."
    />
    <Avainhuomio>Uudet ja varatiilet maalataan samalla kertaa kahteen kertaan, joten väri on sama joka tiilessä.</Avainhuomio>

    <h2>Milloin rikkinäisiä tiiliä on liikaa?</h2>
    <p>
      Muutama tai muutama kymmenen rikkinäistä tiiltä on vaihdettavissa. Jos tiilet ovat rikki laajalti ja
      pinta rapautuu hiekaksi, maalaus ei pelasta kattoa. Silloin sanomme suoraan, että katto kannattaa uusia.
      Kattoremontti maksaa yleensä 15 000–30 000 euroa, pinnoitus 2 850–7 000 euroa. Rajan kerromme
      kuntotarkastuksessa katon mukaan. Vertailun teemme artikkelissa{" "}
      <Link to="/artikkelit/pinnoitus-vai-uusi-katto/">tiilikattoremontti vai pinnoitus</Link>, ja palvelun
      esittelemme sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Kymmenet rikkinäiset tiilet vaihdetaan, mutta laajalti rapautunut katto kannattaa uusia.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
