import { Link } from "react-router-dom";
import { ArticleFaq, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Hakuaukko (hakutulosanalyysi 26.10.2026, brief 2): "sammaleen poisto katolta" ja "Saako sammalta olla
 * tiilikatolla?". Kulma on pinnoitus, ei puhdistus: sammal on merkki kuluneesta tiilen pinnasta. Yrityksen
 * faktat ovat sivuston omia (faqData.ts, prices.ts, company.ts). Yleiset faktat on tarkistettu lähteistä,
 * jotka on kirjattu tiedostoon docs/lahteet-sammal-tiilikatolla-2026-10-26.md.
 */
const faq = [
  {
    question: "Saako sammalta olla tiilikatolla?",
    answer:
      "Vähän sammalta ei riko kattoa heti, mutta se kertoo, että tiilen pinta pidättää kosteutta. Kun sammalta on paljon tai se palaa nopeasti, tiilen pinta on kulunut. Silloin katto kannattaa pestä ja pinnoittaa.",
  },
  {
    question: "Mitä tiilikaton sammaleen poisto maksaa?",
    answer:
      "Meillä sammaleen poisto kuuluu pinnoitukseen. Tiilikaton pesu ja pinnoitus maksaa yleensä 2 850–7 000 € katon koon mukaan, ja työn osuudesta saat kotitalousvähennyksen.",
  },
  {
    question: "Palaako sammal pinnoituksen jälkeen?",
    answer:
      "Pinnoitettu tiili hylkii vettä ja kuivuu sateen jälkeen nopeasti, joten sammal ei saa siitä otetta samalla tavalla kuin kuluneesta tiilestä. Lehdet ja roskat kannattaa silti poistaa katolta joka vuosi.",
  },
  {
    question: "Pitääkö sammal poistaa ennen pinnoitusta?",
    answer:
      "Kyllä. Pesemme katon painepesulla ja levitämme kasvustontorjunta-aineen ennen maalausta. Maali tarttuu vain puhtaaseen ja kuivaan tiileen.",
  },
  {
    question: "Voiko katon pinnoittaa, jos sammalta on paljon?",
    answer:
      "Voi. Pesu poistaa sammaleen, ja vaihdamme rikkinäiset tiilet ennen maalausta. Jos tiilet ovat laajalti halkeilleet tai aluskate vuotaa, kerromme kuntotarkastuksessa suoraan, että katto kannattaa uusia.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Sammal tarttuu huokoiseen ja kosteaan pintaan. Uuden tiilen tiivis pinta kuluu noin 15 vuodessa.</li>
        <li>Sammal pitää tiilen märkänä. Talvella vesi jäätyy tiilen sisällä ja rapauttaa sitä.</li>
        <li>Pelkkä sammaleen poisto auttaa hetken. Kun pinta on kulunut, katto kannattaa pestä ja pinnoittaa, yleensä noin 15 vuoden iässä.</li>
        <li>Pesu kuuluu aina pinnoitukseen. Pinnoitettu katto hylkii vettä ja kestää jopa 15 vuotta pidempään. Hinta on yleensä 2 850–7 000 €.</li>
      </ul>
    </KeyPoints>

    <p>
      Vihreä katto näkyy kauas, ja moni soittaa meille juuri sen takia. Sammal ei ole itse ongelma. Se on merkki
      siitä, missä kunnossa tiilen pinta on. Kerromme, miksi sammal kasvaa, mitä se tekee tiilelle ja milloin katto
      kannattaa pinnoittaa.
    </p>

    <h2>Miksi tiilikatolle kasvaa sammalta?</h2>
    <p>
      Sammal tarvitsee kaksi asiaa: kosteutta ja pinnan, johon tarttua. Uuden betonitiilen pinta on tehtaalla tehty
      tiiviiksi. Vesi valuu siitä pois, eikä sammal saa otetta. Aurinko ja pakkanen kuluttavat pintaa, ja noin 15
      vuodessa se on ohut. Sen jälkeen tiili imee vettä ja pysyy sateen jälkeen pitkään kosteana. Siihen sammal ja
      jäkälä tarttuvat.
    </p>
    <p>
      Siksi sammal alkaa yleensä sieltä, missä katto kuivuu hitaimmin: varjoisalta lappeelta ja puiden alta. Lehdet
      ja neulaset tuovat sammaleelle kasvualustan. Tiilivalmistaja BMI Ormax neuvoo poistamaan lehdet ja roskat
      katolta joka vuosi juuri siksi, ettei sammal pääse kasvamaan. Kun koko katto vihertää, kyse on harvoin
      roskista. Silloin tiilen pinta on kulunut.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-sastamala-sammaleinen-tiilikatto-ennen"
      alt="Sammaloitunut tiilikatto Sastamalassa ennen pinnoitusta"
      caption="Jäkälälaikkuja tiilissä ja sammalta harjatiilillä. Kasvusto viihtyy siellä, missä katto pysyy pisimpään märkänä."
    />

    <h2>Onko sammal tiilikatolle vaarallista?</h2>
    <p>
      On, kun sitä on vuosia. Sammal toimii kuin sieni. Se pitää tiilen pinnan märkänä silloinkin, kun muu katto on
      jo kuivunut. Huokoinen tiili imee veden sisäänsä. Talvella vesi jäätyy ja laajenee tiilen huokosissa, ja joka
      talvi tiili murenee vähän lisää. Tätä kutsutaan <strong>pakkasrapautumiseksi</strong>. VTT:n betonitutkimuksessa
      jäätymisen ja sulamisen vuorottelu lisäsi veden imeytymistä betoniin noin kolminkertaiseksi, eli kierre
      vahvistaa itseään. Katolla se näkyy karheana pintana, lohkeamina ja lopulta halkeilleina tiilinä.
    </p>
    <p>
      Sammaleinen katto ei silti vuoda heti. Tiilikatto ei ole koskaan täysin vedenpitävä, ja aluskate ohjaa tiilten
      alle pääsevän veden pois. Sammal lyhentää tiilen ikää, ja siksi siihen kannattaa puuttua ajoissa. Irtoava
      sammal ja lehdet kertyvät myös sadevesikouruihin, joten kourut kannattaa tarkistaa samalla.
    </p>

    <h2>Riittääkö sammaleen poisto, vai pitääkö katto pinnoittaa?</h2>
    <p>Se riippuu tiilen pinnasta, ei sammaleen määrästä.</p>
    <ul>
      <li>
        <strong>Pinta on sileä ja kova.</strong> Katto on vielä nuori, ja sammalta on vähän. Silloin riittää, että
        lehdet ja roskat poistetaan ja kasvusto käsitellään.
      </li>
      <li>
        <strong>Pinta tuntuu karhealta kuin hiekkapaperi.</strong> Väri on haalistunut, ja sammal palaa parissa
        vuodessa pesun jälkeen. Pesu poistaa sammaleen, mutta tiili imee vettä heti seuraavalla sateella. Silloin
        katto kannattaa pestä ja pinnoittaa. Yleensä tämä on ajankohtaista noin 15 vuoden iässä.
      </li>
      <li>
        <strong>Tiilet ovat laajalti halkeilleet tai aluskate vuotaa.</strong> Pinnoitus ei enää riitä, vaan katto
        pitää uusia. Yksittäiset rikkinäiset tiilet vaihdamme pinnoituksen yhteydessä.
      </li>
    </ul>
    <p>
      Kuntotarkastus kertoo, missä vaiheessa oma kattosi on. Teemme sen ilmaiseksi, ja saat kirjallisen tarjouksen
      kiinteällä hinnalla. Jos katto ei tarvitse pinnoitusta, sanomme sen suoraan. Muut kuluneen pinnan merkit ovat
      artikkelissa <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto/">milloin tiilikatto pitää pinnoittaa</Link>,
      ja pinnoituksen ja kattoremontin eroa vertaamme artikkelissa{" "}
      <Link to="/artikkelit/pinnoitus-vai-uusi-katto/">tiilikattoremontti vai pinnoitus</Link>.
    </p>
    <Figure
      image="tiilikaton-pesu-ja-pinnoitus-sammaleenpoisto"
      alt="Tiilikatto, jonka etummainen lape on käsitelty ja takimmainen vielä sammaleinen"
      caption="Sama katto kesken työn: etummainen lape on käsitelty, takimmainen odottaa vuoroaan."
    />

    <h2>Miten sammal poistetaan pinnoituksen yhteydessä?</h2>
    <p>Teemme pesun aina pinnoituksen yhteydessä. Työ etenee näin:</p>
    <ol>
      <li>Ilmainen kuntotarkastus. Tarkistamme tiilet, saumat, piipun ympäryksen, läpiviennit ja aluskatteen.</li>
      <li>Pesu painepesulla. Sammal, jäkälä ja lika lähtevät tiilistä, ja kourut huuhdellaan.</li>
      <li>Kasvustontorjunta-aine. Se tuhoaa sammaleen itiöt tiilen huokosista, jotta kasvusto ei palaa.</li>
      <li>Rikkinäiset tiilet vaihdetaan uusiin.</li>
      <li>
        Pohjamaali ja pintamaali korkeapaineruiskulla, aina kaksi kerrosta. Reunat ja ahtaat paikat telalla. Maali on
        Nowocoat, jonka valmistaja kuvaa pinnoitteen hengittäväksi ja tiiltä rapautumiselta ja kasvustolta
        suojaavaksi.
      </li>
      <li>Lopputarkastus yhdessä ja 5 vuoden kirjallinen takuu.</li>
    </ol>
    <p>
      Pinnoitettu tiili hylkii vettä, joten se kuivuu sateen jälkeen nopeasti. Sammal ei saa siitä otetta samalla
      tavalla kuin kuluneesta tiilestä, ja katto kestää jopa 15 vuotta pidempään. Peruskohteen katto valmistuu 2–3
      työpäivässä. Kaikki työvaiheet on kuvattu artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/">näin tiilikaton pinnoitus etenee</Link>.
    </p>
    <Figure
      image="tiilikaton-pesu-ja-pinnoitus-orivesi-puoliksi-pesty"
      alt="Tiilikatto Orivedellä, puolet katosta pesty"
      caption="Puolet katosta on pesty. Pesun jälkeen tiili saa kuivua, ja sitten se maalataan kahteen kertaan."
    />

    <h2>Paljonko tiilikaton pesu ja pinnoitus maksaa?</h2>
    <p>
      Sammaleen poisto kuuluu pinnoituksen hintaan. Omakotitalon tiilikaton pesu ja pinnoitus maksaa yleensä
      2 850–7 000 €. Hinta riippuu katon koosta, jyrkkyydestä ja vaihdettavien tiilien määrästä.
    </p>
    <Table
      head={["Katon koko", "Hinta yleensä", "Kesto"]}
      rows={[
        ["150–180 m²", "2 850 – 3 200 €", "2 työpäivää"],
        ["190–240 m²", "3 300 – 3 700 €", "2–3 työpäivää"],
        ["250–300 m²", "3 750 – 4 880 €", "2–4 työpäivää"],
      ]}
      caption="Hintaesimerkit omakotitalon tiilikatolle. Hintaan kuuluu pesu, kasvustontorjunta, rikkinäisten tiilien vaihto, kaksi maalikerrosta, siivous ja takuu."
    />
    <p>
      Vuosina 2026 ja 2027 saat vähentää 40 % työn osuudesta, enintään 2 100 € vuodessa. Omavastuu on 150 €.
      Suuntaa antavan hinnan omalle katollesi saat{" "}
      <Link to="/hintalaskuri/?palvelu=pinnoitus">hintalaskurilla</Link>, ja tarkemmat esimerkit ovat sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link>.
    </p>

    <h2>Voiko sammaleen poistaa itse?</h2>
    <p>
      Matalalta katolta sammaleen voi harjata pois, jos katolle pääsee turvallisesti. Suurin riski on korkeus.
      Aluehallintoviraston työsuojelutarkastajan mukaan Suomessa sattuu joka päivä putoamisesta johtuvia
      työtapaturmia, ja valjaille pitää olla katolla luotettavat kiinnityspisteet. Sama koskee omaa kattoa. Toinen
      riski on painepesuri. Väärällä paineella tai kulmalla pesu vahingoittaa kulunutta tiiltä. Tikkurilan
      tiilikattomaalin ohje sanoo saman: korkeapainepesu tehdään niin, ettei alustaa ja rakenteita vaurioiteta.
    </p>
    <p>
      Tärkeämpi kysymys on silti se, miksi sammal kasvaa. Jos tiilen pinta on kulunut, itse tehty poisto auttaa
      vuoden tai kaksi, ja sammal palaa. Pinnoitus hoitaa syyn. Teemme pinnoituksia huhti–toukokuusta elo–syyskuuhun
      Pirkanmaalla ja lähikunnissa. Katso palvelu sivulta{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-tummanharmaa-tiilikatto-pinnoitus-jalkeen"
      alt="Tummanharmaa tiilikatto pinnoituksen jälkeen"
      caption="Pinnoitettu katto hylkii vettä ja pysyy puhtaana pidempään."
    />

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "BMI Ormax: Usein kysytyt kysymykset, betonikattotiilet",
          url: "https://bmifinland.zendesk.com/hc/fi-fi/articles/33093701704082-Usein-kysytyt-kysymykset-BMI-Ormax-betonikattotiilet",
        },
        {
          label: "Nowocoat-esite 2025 (rakennusfakta.fi)",
          url: "https://rakennusfakta.fi/nowocoat-2025-esite-1420239/tiedosto-files/NowoCoat_Esite_A4_2025.pdf",
        },
        {
          label: "Tikkurila: Kilpi Tiilikattomaali, tuoteseloste",
          url: "https://tikkurila.fi/sites/default/files/pim/documents/Kilpi_Tiilikattomaali_FI_PDS_Tikkurila.pdf",
        },
        {
          label: "Betoni-lehti 2/2014 (VTT): jäädytys-sulatusrasitus ja veden imeytyminen betoniin",
          url: "https://betoni.com/wp-content/uploads/2015/09/BET1402_56-61.pdf",
        },
        {
          label: "Verkkouutiset 3.4.2023: Useilla katoilla tehdään huoltotöitä – monilta myös pudotaan (AVI:n tiedote)",
          url: "https://www.verkkouutiset.fi/a/useilla-katoilla-tehdaan-huoltotoita-monilta-myos-pudotaan/",
        },
      ]}
    />
  </>
);

export default Body;
