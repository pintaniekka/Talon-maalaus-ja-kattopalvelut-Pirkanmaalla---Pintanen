import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Kohteet ja kuvat sivuston omia: projects.ts (Tampere 2026 tiilitalo, Ylöjärvi 2026 punainen katto, Sastamala
 * aurinkopaneelit, Valkeakoski harmaa katto, Lempäälä harmaa katto tummanharmaaksi). Kohteista kerrotaan vain se, mikä
 * kuvasta ja kuvatekstistä näkyy: ei keksittyjä neliöitä, hintoja tai asiakkaan sanoja. Hinnat prices.ts.
 */
const faq = [
  {
    question: "Ovatko kuvat oikeista kohteista?",
    answer: "Ovat. Kaikki kuvat ovat omista kohteistamme Pirkanmaalla, ja paikkakunta ja vuosi ovat kuvatekstissä.",
  },
  {
    question: "Miksi ennen-kuvissa katto näyttää harmaalta?",
    answer:
      "Kulunut tehdaspinta haalistuu ja kerää likaa ja sammalta. Pesun jälkeen tiilen oma väri tulee esiin, ja maali antaa lopullisen värin.",
  },
  {
    question: "Voinko saada oman kattoni samanlaiseksi?",
    answer:
      "Jos aluskate ja tiilet ovat kunnossa, kyllä. Kuntotarkastus on ilmainen, ja pinnoitus maksaa yleensä 2 850–7 000 euroa.",
  },
  {
    question: "Näkyykö lisää kohteita jossain?",
    answer: "Kyllä. Kohteet paikkakunnittain ovat sivulla referenssit ja jokaisen kunnan omalla sivulla.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Viisi omaa kohdetta Tampereelta, Ylöjärveltä, Sastamalasta, Valkeakoskelta ja Lempäälästä.</li>
        <li>Jokaisessa sama työ: pesu, kasvustontorjunta, tiilien vaihto ja kaksi kerrosta Nowocoatia.</li>
        <li>Yhdessä kohteessa väri vaihtui harmaasta tummanharmaaksi, yhdessä aurinkopaneelit suojattiin.</li>
        <li>Pinnoitus maksaa yleensä 2 850–7 000 euroa ja kestää 2–3 päivää.</li>
      </ul>
    </KeyPoints>

    <p>
      Kuvat kertovat pinnoituksesta enemmän kuin sanat. Valitsimme viisi kohdetta, joista on kuva ennen ja
      jälkeen, ja kerromme jokaisesta, mitä katolla tehtiin. Kaikki ovat omia töitämme Pirkanmaalta.
    </p>

    <h2>Tampere 2026: tiilitalon katto</h2>
    <Figure
      image="tiilikaton-pinnoitus-tampere-tiilitalo-jalkeen"
      alt="Tiilitalo Tampereella tiilikaton pinnoituksen jälkeen"
      caption="Tiilitalo Tampereella pinnoituksen jälkeen 2026."
    />
    <p>
      Tiilitalon katto pestiin painepesulla, rikkinäiset tiilet vaihdettiin ja katto maalattiin kahteen
      kertaan. Sama työ ja sama hinta pätevät kaikkiin betonitiilikattoihin, kuten kerromme sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-tampere/">tiilikaton pinnoitus Tampereella</Link>.
    </p>
    <Avainhuomio>Tiilitalon katto sai samat työvaiheet kuin puutalon katto, ja hinta on sama.</Avainhuomio>

    <h2>Ylöjärvi 2026: punainen katto uuden veroiseksi</h2>
    <Figure
      image="tiilikaton-pinnoitus-ylojarvi-punainen-katto-jalkeen"
      alt="Punainen tiilikatto pinnoituksen jälkeen Ylöjärvellä"
      caption="Punainen tiilikatto Ylöjärvellä pinnoituksen jälkeen 2026."
    />
    <p>
      Punainen tiilikatto pestiin, käsiteltiin kasvustontorjunta-aineella ja maalattiin kahteen kertaan
      punaiseksi. Väri pysyi samana, mutta pinta on uuden veroinen. Katso kohteet sivulta{" "}
      <Link to="/tiilikaton-pinnoitus-ylojarvi/">tiilikaton pinnoitus Ylöjärvellä</Link>.
    </p>
    <Avainhuomio>Vanha väri uutena on yleisin toive, ja se onnistuu samalla kahdella kerroksella.</Avainhuomio>

    <h2>Sastamala: pinnoitus aurinkopaneelien ympärillä</h2>
    <Figure
      image="tiilikaton-pinnoitus-sastamala-aurinkopaneelit-jalkeen"
      alt="Tiilikatto aurinkopaneeleineen pinnoituksen jälkeen Sastamalassa"
      caption="Katto aurinkopaneeleineen pinnoituksen jälkeen Sastamalassa."
    />
    <p>
      Katolla oli aurinkopaneelit. Suojasimme ne ennen pesua ja maalausta ja pinnoitimme katon paneelien
      ympäriltä. Suojaus kuuluu hintaan. Kerromme paneeleista artikkelissa{" "}
      <Link to="/artikkelit/pinnoitus-aurinkopaneelit-katolla/">tiilikaton pinnoitus, kun katolla on aurinkopaneelit</Link>.
    </p>
    <Avainhuomio>Aurinkopaneelit suojataan ja katto pinnoitetaan niiden ympäriltä ilman lisähintaa.</Avainhuomio>

    <h2>Valkeakoski: harmaa katto takaisin tummaksi</h2>
    <Figure
      image="tiilikaton-pinnoitus-valkeakoski-harmaa-katto-jalkeen"
      alt="Harmaa tiilikatto pinnoituksen jälkeen Valkeakoskella"
      caption="Tiilikatto Valkeakoskella pinnoituksen jälkeen."
    />
    <p>
      Harmaa tiilikatto pestiin ja maalattiin kahteen kertaan. Ennen- ja jälkeen-kuvat ovat samasta
      kohdasta, joten eron näkee liukusäätimellä kunnan sivulla. Katso kohteet sivulta{" "}
      <Link to="/tiilikaton-pinnoitus-valkeakoski/">tiilikaton pinnoitus Valkeakoskella</Link>.
    </p>
    <Avainhuomio>Samasta kohdasta otetut ennen- ja jälkeen-kuvat näyttävät kahden kerroksen eron.</Avainhuomio>

    <h2>Lempäälä: värin vaihto harmaasta tummanharmaaksi</h2>
    <Figure
      image="tiilikaton-pinnoitus-lempaala-tummanharmaa-tiilikatto-jalkeen"
      alt="Tummanharmaa tiilikatto pinnoituksen jälkeen Lempäälässä"
      caption="Tummanharmaa tiilikatto Lempäälässä pinnoituksen jälkeen."
    />
    <p>
      Tässä kohteessa väri vaihtui: harmaa katto maalattiin tummanharmaaksi. Värin vaihto ei nosta hintaa,
      koska katto maalataan joka tapauksessa kahteen kertaan. Katso kohteet sivulta{" "}
      <Link to="/tiilikaton-pinnoitus-lempaala/">tiilikaton pinnoitus Lempäälässä</Link>.
    </p>
    <Table
      head={["Kohde", "Mitä tehtiin", "Erityistä"]}
      rows={[
        ["Tampere 2026", "Pesu, tiilien vaihto, kaksi kerrosta", "Tiilitalo"],
        ["Ylöjärvi 2026", "Pesu, kaksi kerrosta punaista", "Sama väri uutena"],
        ["Sastamala", "Pesu ja pinnoitus paneelien ympäriltä", "Aurinkopaneelit suojattu"],
        ["Valkeakoski", "Pesu, kaksi kerrosta", "Kuvat samasta kohdasta"],
        ["Lempäälä", "Pesu, kaksi kerrosta tummanharmaata", "Värin vaihto"],
      ]}
      caption="Viisi kohdetta. Jokaisessa sama työ: pesu, kasvustontorjunta, tiilien vaihto ja kaksi kerrosta Nowocoatia."
    />
    <Avainhuomio>Värin vaihto harmaasta tummanharmaaksi tehtiin samalla työllä ja samalla hinnalla kuin muut kohteet.</Avainhuomio>

    <h2>Mitä sama työ maksaa sinun katollesi?</h2>
    <p>
      Pinnoitus maksaa yleensä 2 850–7 000 euroa ja kestää 2–3 päivää. Hintaan kuuluu pesu, kasvustontorjunta,
      tiilien vaihto, kaksi kerrosta maalia, suojaukset, siivous ja 5 vuoden takuu. Lisää kohteita näet sivulta{" "}
      <Link to="/referenssit/">referenssit</Link>, ja palvelun esittelemme sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Jokainen viidestä kohteesta tehtiin samalla työllä, joka maksaa yleensä 2 850–7 000 euroa.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
