import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: tyovaiheet.ts ("Suojaamme esimerkiksi aurinkopaneelit, lasiterassit ja valokatteet"),
 * projects.ts (aurinkopaneelit suojattuna, Tampere 2026; Sastamala ja Valkeakoski aurinkopaneelit ennen/jälkeen), hinta-artikkeli
 * (suojattavat kohteet vaikuttavat hintaan haarukan sisällä). Eerik 27.10.2026: paneeleita ei irroteta koskaan (hyvin
 * kallista), ne suojataan paikoilleen, kasvustontorjunta-aine ajetaan myös paneelien alle, paneelit suojaavat alla olevat
 * tiilet auringolta ja säältä. Paneeleja harkitsevalle: katto pinnoitetaan ennen asennusta.
 */
const faq = [
  {
    question: "Voiko tiilikaton pinnoittaa, jos katolla on aurinkopaneelit?",
    answer: "Voi. Suojaamme paneelit ennen pesua ja maalausta ja pinnoitamme katon niiden ympäriltä. Olemme tehneet näin Tampereella, Sastamalassa ja Valkeakoskella.",
  },
  {
    question: "Pitääkö paneelit irrottaa?",
    answer: "Ei. Paneeleita ei irroteta, koska se olisi hyvin kallista. Suojaamme ne paikoilleen ja pinnoitamme katon niiden ympäriltä. Kasvustontorjunta-aine levitetään myös paneelien alle, joten sammal kuolee sielläkin.",
  },
  {
    question: "Maksaako suojaus lisää?",
    answer: "Suojaus kuuluu hintaan. Suojattavat kohteet ovat yksi asioista, jotka siirtävät hintaa haarukan 2 850–7 000 euroa sisällä.",
  },
  {
    question: "Vahingoittuuko paneeli pesussa?",
    answer: "Paneelit suojataan ennen painepesua, eikä pesua suunnata niihin. Suojaukset poistetaan, kun maali on kuiva.",
  },
  {
    question: "Harkitsen aurinkopaneeleja. Pitääkö katto pinnoittaa ensin?",
    answer:
      "Kyllä. Pinnoita katto ennen paneelien asennusta. Paneelien alle ei pääse maalaamaan jälkeenpäin, eikä paneeleita irroteta pinnoitusta varten.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Katto voidaan pinnoittaa, vaikka katolla on aurinkopaneelit.</li>
        <li>Paneeleita ei irroteta. Ne suojataan paikoilleen, ja katto pinnoitetaan niiden ympäriltä.</li>
        <li>Kasvustontorjunta-aine levitetään myös paneelien alle, joten sammal kuolee sielläkin.</li>
        <li>Jos harkitset paneeleja, pinnoita katto ennen niiden asennusta.</li>
        <li>Suojaus kuuluu hintaan. Olemme tehneet näin Tampereella, Sastamalassa ja Valkeakoskella.</li>
        <li>Asennustapa katsotaan kuntotarkastuksessa ja kirjataan tarjoukseen.</li>
      </ul>
    </KeyPoints>

    <p>
      Aurinkopaneelit yleistyvät Pirkanmaan katoilla, ja moni kysyy, estävätkö ne pinnoituksen. Eivät estä.
      Kerromme tässä, miten pinnoitamme katon, jolla on paneelit, ja mitä kuntotarkastuksessa katsomme.
    </p>

    <h2>Miten pinnoitus tehdään paneelien kanssa?</h2>
    <Table
      head={["Vaihe", "Mitä tehdään paneelien kanssa"]}
      rows={[
        ["Kuntotarkastus", "Katsomme, miten paneelit on kiinnitetty ja onko tiiliä rikki kiinnikkeiden alla"],
        ["Suojaus", "Paneelit, kaapelit ja kiinnikkeet suojataan ennen pesua"],
        ["Pesu painepesulla", "Pesu suunnataan tiiliin, ei paneeleihin"],
        ["Kasvustontorjunta-aine", "Levitetään koko katolle, myös paneelien alle"],
        ["Tiilien vaihto", "Rikkinäiset tiilet vaihdetaan sieltä, mihin pääsee"],
        ["Maalaus kahteen kertaan", "Ruiskulla avoimet lappeet, paneelien reunat käsin tai telalla"],
        ["Lopputarkastus", "Suojaukset pois, kun maali on kuiva, ja katto kierretään yhdessä"],
      ]}
      caption="Pinnoitus, kun katolla on aurinkopaneelit. Suojaus kuuluu hintaan."
    />
    <Avainhuomio>Paneelit suojataan ennen pesua, ja niiden reunat maalataan käsin.</Avainhuomio>

    <h2>Miksi paneelien alle ei maalata?</h2>
    <p>
      Paneelin alla oleva katto on varjossa ja suojassa sateelta, auringolta ja suurelta osin lumelta. Se
      kuluu hitaammin kuin avoin lape. Pinnoituksessa maalataan avoimet lappeet ja paneelien reunat niin pitkälle
      kuin käsin yltää. Paneeleita ei irroteta pinnoitusta varten, koska se olisi hyvin kallista. Paneelit
      suojaavat alla olevat tiilet auringolta ja säältä. Kasvustontorjunta-aine levitetään myös paneelien
      alle, joten sammal kuolee sielläkin.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-tampere-aurinkopaneelit-suojattu"
      alt="Aurinkopaneelit suojattuna tiilikaton pinnoituksen ajaksi Tampereella"
      caption="Aurinkopaneelit suojattuna pinnoituksen ajaksi Tampereella 2026."
    />
    <Avainhuomio>Paneelin alla oleva katto on suojassa säältä, joten se kuluu hitaammin kuin avoin lape.</Avainhuomio>

    <h2>Harkitsetko paneeleja? Pinnoita katto ensin</h2>
    <p>
      Jos paneelit ovat vasta suunnitteilla, pinnoita katto ennen niiden asennusta. Paneelien alle ei pääse
      maalaamaan jälkeenpäin, eikä paneeleita irroteta pinnoitusta varten. Pinnoitus on ajankohtainen noin
      15 vuoden iässä, ja pinnoitettu katto kestää jopa 15 vuotta pidempään. Kun katto on kunnossa ennen
      paneeleja, molemmat saavat olla rauhassa pitkään.
    </p>
    <Avainhuomio>Pinnoita katto ennen paneelien asennusta, koska paneelien alle ei pääse maalaamaan jälkeenpäin.</Avainhuomio>

    <h2>Mitä katsomme paneelien kiinnikkeistä?</h2>
    <p>
      Paneelit kiinnitetään yleensä tiilien läpi ruoteisiin. Kuntotarkastuksessa katsomme, ovatko tiilet
      kiinnikkeiden kohdalla ehjiä ja ovatko läpiviennit tiiviit. Rikkinäinen tiili kiinnikkeen alla on yleinen
      vuotokohta, jota ei näe pihalta. Jos tiili on rikki, vaihdamme sen, jos kiinnike sallii. Läpivienneistä
      kerromme artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-lapiviennit-ja-piippu/">läpiviennit ja piipun ympärys</Link>.
    </p>
    <Avainhuomio>Kiinnikkeiden alla olevat tiilet tarkistetaan, koska rikkinäinen tiili siellä on piilovuoto.</Avainhuomio>

    <h2>Miltä valmis katto näyttää?</h2>
    <Figure
      image="tiilikaton-pinnoitus-valkeakoski-punainen-tiilikatto-aurinkopaneelit-jalkeen"
      alt="Punainen tiilikatto aurinkopaneeleineen pinnoituksen jälkeen Valkeakoskella"
      caption="Punainen tiilikatto aurinkopaneeleineen pinnoituksen jälkeen Valkeakoskella."
    />
    <p>
      Paneelit ovat paikoillaan, ja katto niiden ympärillä on uuden veroinen. Pinnoitus maksaa yleensä
      2 850–7 000 euroa, ja suojattavat kohteet ovat yksi asioista, jotka siirtävät hintaa haarukan sisällä.
      Lisää kohteita näet artikkelista{" "}
      <Link to="/artikkelit/tiilikaton-pinnoitus-ennen-ja-jalkeen-kohteet/">viisi kohdetta ennen ja jälkeen</Link>,
      ja palvelun esittelemme sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Suojaus kuuluu 2 850–7 000 euron hintaan, ja paneelit pysyvät paikoillaan.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
