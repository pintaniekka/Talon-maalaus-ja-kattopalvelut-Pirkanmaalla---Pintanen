import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Note, Sources } from "@/components/article/ArticleKit";

/**
 * Eemilin artikkeli. Yleiset faktat Tikkurilan ohjeista (luettu 26.10.2026): vanhan maalin päälle sama maalityyppi,
 * vesiohenteisen päälle vain vesiohenteinen, öljymaalin päälle kumpi tahansa, tunnistus (liituaa, taipuu, sprii),
 * kuultava vaatii sävyn, huoltovälit 2–5 ja 5–15 vuotta. Yrityksen faktat sivuston omia: maali pääsääntöisesti Tikkurila,
 * valinta vanhan maalin ja puun kunnon mukaan, pohjamaali paljaisiin kohtiin, pintamaali pensselillä, ei koemaalausta.
 */
const faq = [
  {
    question: "Mitä maalia käytätte talon ulkoseiniin?",
    answer:
      "Käytämme pääsääntöisesti Tikkurilan ulkomaaleja. Valitsemme maalin vanhan maalin ja puun kunnon mukaan. Maalit kirjataan tarjoukseen.",
  },
  {
    question: "Voiko öljymaalin päälle maalata vesiohenteisella maalilla?",
    answer:
      "Voi. Tikkurilan ohjeen mukaan öljymaalin päälle sopii sekä öljymaali että vesiohenteinen akrylaattimaali. Toisin päin se ei onnistu: vesiohenteisen päälle maalataan vain vesiohenteisella.",
  },
  {
    question: "Mistä tiedän, millä maalilla talo on aiemmin maalattu?",
    answer:
      "Vanha öljymaali liituaa ja on himmeä, ja sen kalvo murenee taivutettaessa. Vesiohenteinen maali on joustava eikä liitua. Tarkistamme maalityypin arviokäynnillä.",
  },
  {
    question: "Pitääkö koko seinä pohjamaalata?",
    answer:
      "Ei tarvitse. Pohjamaalaamme kohdat, joissa puu on paljaana. Ehjälle maalipinnalle tulee suoraan pintamaali.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Uusi maali valitaan vanhan maalin mukaan. Vesiohenteisen päälle sopii vain vesiohenteinen, öljymaalin päälle kumpi tahansa.</li>
        <li>Vanhan maalin tunnistaa käsin: öljymaali liituaa ja murenee, vesiohenteinen joustaa.</li>
        <li>Peittävä maali kestää yleensä 5–15 vuotta, kuultava 2–5 vuotta.</li>
        <li>Käytämme pääsääntöisesti Tikkurilan maaleja. Pohjamaali tulee vain paljaisiin kohtiin, pintamaali pensselillä.</li>
      </ul>
    </KeyPoints>

    <p>
      Maalikaupan hyllyssä on kymmeniä ulkomaaleja, ja moni kysyy meiltä, mikä niistä on oikea. Vastaus on
      yksinkertainen: oikea maali riippuu siitä, mitä seinässä on nyt. Kerromme tässä, miten valitsemme maalin
      ja mitä Tikkurila ohjeissaan sanoo.
    </p>

    <h2>Miksi vanha maali ratkaisee uuden maalin?</h2>
    <p>
      Tikkurilan ohje on selvä. Jos talo on maalattu vesiohenteisella akrylaattimaalilla, uudeksi maaliksi käy
      vain akrylaattimaali. Jos talo on maalattu öljymaalilla, päälle sopii joko öljymaali tai akrylaattimaali.
      Huoltomaalaus tehdään yleensä samalla maalityypillä kuin edellinen kerros.
    </p>
    <p>
      Syy on kalvossa. Öljymaali kovettuu ja liituaa, vesiohenteinen pysyy joustavana. Väärä yhdistelmä irtoaa
      muutamassa vuodessa, vaikka työ olisi tehty hyvin.
    </p>
    <Avainhuomio>Vesiohenteisen maalin päälle käy vain vesiohenteinen, ja tämä yksi sääntö ratkaisee suurimman osan valinnoista.</Avainhuomio>

    <h2>Mistä tunnistat vanhan maalin?</h2>
    <p>Tikkurilan maalilinja neuvoo kolme kokeilua. Teemme ne arviokäynnillä, ja voit tehdä ne itsekin:</p>
    <ul>
      <li>Pyyhkäise seinää. Jos sormeen jää jauhomaista väriä, maali on todennäköisesti öljymaalia. Vesiohenteinen maali ei liitua.</li>
      <li>Irrota pieni lastu ja taivuta sitä. Öljymaali on kova ja murenee. Vesiohenteinen maali joustaa eikä katkea.</li>
      <li>Hankaa pintaa talousspriihin kastetulla rätillä. Sprii pehmittää ja liuottaa akrylaattimaalia, öljymaaliin se ei tehoa.</li>
    </ul>
    <p>
      Öljymaali halkeilee usein ruutumaisesti. Vesiohenteinen maali halkeilee puun syiden suuntaan. Kuultava käsittely
      näyttää puun syyt, ja punamulta eli keittomaali irtoaa punaisena pigmenttinä.
    </p>
    <Avainhuomio>Kolme kokeilua, pyyhkäisy, taivutus ja sprii, kertovat maalityypin viidessä minuutissa.</Avainhuomio>

    <h2>Öljymaali vai vesiohenteinen talomaali?</h2>
    <p>
      Kumpikin on hyvä maali oikeassa paikassa. Vesiohenteinen akrylaattimaali on nykyään yleisin valinta: se
      joustaa puun mukana, kuivuu nopeasti ja pitää värinsä. Öljymaali tunkeutuu puuhun ja sopii hyvin vanhoihin,
      aiemmin öljymaalilla maalattuihin taloihin.
    </p>
    <p>
      Tikkurilan tuotevalintaoppaassa puutaloille on peittäviä maaleja, kuten Pika-Teho ja Ultra Classic, ja
      kuultavia tuotteita, kuten Valtti Plus Color hirsipinnoille. Valitsemme tuotteen vanhan maalin ja puun kunnon
      mukaan, ja se lukee tarjouksessa. Yleensä käytämme Tikkurilaa.
    </p>
    <Figure
      image="talon-maalaus-ulkoverhous-pensselilla-maalari"
      ratio="3/2"
      alt="Maalari maalaa puutalon ulkoverhousta pensselillä"
      caption="Pintamaali levitetään pensselillä. Pensseli painaa maalin puuhun paremmin kuin ruisku."
    />
    <Avainhuomio>Vesiohenteinen talomaali on yleisin valinta, öljymaali vain talossa, jossa on ennestään öljymaali.</Avainhuomio>

    <h2>Milloin seinä kannattaa maalata kuultavalla?</h2>
    <p>
      Kuultava käsittely näyttää puun syyt ja sopii hirsitaloihin ja uusiin lautaseiniin. Se kuluu kuitenkin
      nopeammin: Tikkurilan mukaan kuultavien pintojen huoltoväli on noin 2–5 vuotta, peittävien 5–15 vuotta.
      Tikkurila neuvoo myös valitsemaan aina sävytetyn kuullotteen, koska väritön ei suojaa riittävästi
      auringonvalolta.
    </p>
    <p>
      Jos talosi on nyt peittomaalattu, kuultavaan ei voi vaihtaa ilman koko vanhan maalin poistoa. Siksi
      peittomaalattu talo maalataan peittävällä maalilla uudelleen.
    </p>
    <Avainhuomio>Kuultava pinta vaatii huoltoa 2–5 vuoden välein, peittävä 5–15 vuoden välein.</Avainhuomio>

    <h2>Tarvitseeko koko seinä pohjamaalia?</h2>
    <p>
      Ei tarvitse. Pohjamaali kuuluu paljaille puukohdille, jotka ovat jääneet näkyviin kaavinnan jälkeen. Ehjä
      vanha maalipinta pestään ja maalataan suoraan pintamaalilla. Näin maalikerros ei kasva turhan paksuksi.
    </p>
    <Note title="Väri näyttää seinässä tummemmalta">
      <p>
        Tikkurila muistuttaa, että väri näyttää koko seinässä tummemmalta kuin värikartassa. Katso sävy isosta
        mallista ulkona ennen päätöstä. Tarkista myös kunnan rakennusjärjestys: joillakin alueilla julkisivun väri
        on rajattu.
      </p>
    </Note>
    <Avainhuomio>Pohjamaali tulee vain paljaisiin kohtiin, ja ehjä maalipinta saa yhden kerroksen pintamaalia.</Avainhuomio>

    <h2>Miten maalin valinta näkyy hinnassa?</h2>
    <p>
      Maali on pieni osa hinnasta. Suurin osa on työtä: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja
      pintamaali pensselillä. Talon maalaus maksaa meillä yleensä 3 500–11 000 euroa ja kestää 3–7 päivää. Saat
      työlle 2 vuoden kirjallisen takuun. Hintaesimerkit ovat sivulla{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa/">talon maalauksen hinta</Link>, ja palvelun kuvaamme sivulla{" "}
      <Link to="/talon-maalaus-pirkanmaa/">talon maalaus Pirkanmaalla</Link>. Milloin maalaus kannattaa, kerromme
      artikkelissa <Link to="/artikkelit/kuinka-usein-puutalo-maalataan/">kuinka usein puutalo pitää maalata</Link>.
    </p>
    <Avainhuomio>Maalin merkki ei muuta hintaa paljon, ja talon maalaus maksaa yleensä 3 500–11 000 euroa.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Tikkurila: Mitä tulee huomioida ennen puutalon maalausta (luettu 26.10.2026)",
          url: "https://tikkurila.fi/ohjeet/huomioitavaa-ennen-puutalon-maalausta",
        },
        {
          label: "Tikkurila: Ulkomaalin tunnistaminen (luettu 26.10.2026)",
          url: "https://tikkurila.fi/tikkurilan-maalilinja/maalin-tunnistus",
        },
        {
          label: "Tikkurila: Tuotevalintaopas puutaloille (luettu 26.10.2026)",
          url: "https://tikkurila.fi/ohjeet/tuotevalintaopas/puutalot",
        },
        {
          label: "Tikkurila: Huoltomaalaussuosituksia puu-ulkoverhouspinnoille (luettu 26.10.2026)",
          url: "https://tikkurila.fi/pro/artikkeli/huoltomaalaussuosituksia-puu-ulkoverhouspinnoille",
        },
      ]}
    />
  </>
);

export default Body;
