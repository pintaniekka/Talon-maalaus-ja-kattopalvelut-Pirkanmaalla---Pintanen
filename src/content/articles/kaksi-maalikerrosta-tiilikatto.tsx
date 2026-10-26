import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: company.ts KATON_MAALAUS_LAUSE (ruiskulla kahteen kertaan: pohjamaali, sitten pintamaali;
 * ahtaat paikat telalla tai käsin), CLAUDE.md (aina kaksi kerrosta, Nowocoat), "Miksi Pintanen" (maalia aina tarpeeksi).
 * Yleiset faktat: NowoCoat-esite 2025 (luettu 26.10.2026): levitetään korkeapaineruiskulla kahteen kertaan, riittoisuus
 * 2–3 m²/l kahdella kerroksella, päälle maalattavissa n. 2 h. Teknos Kirjo Tile tuoteseloste (26.10.2026): pohjamaalaus
 * ohennettuna, pintamaali ohentamatta, maalattavan pinnan tulee olla kuiva.
 */
const faq = [
  {
    question: "Miksi tiilikatto maalataan kahteen kertaan?",
    answer:
      "Ensimmäinen kerros imeytyy huokoiseen tiileen ja tarttuu. Toinen kerros antaa peittävän, tasaisen pinnan, joka pitää veden ulkona. Yksi kerros jää ohueksi ja laikukkaaksi.",
  },
  {
    question: "Eikö paksu yksi kerros riitä?",
    answer:
      "Ei. Liian paksu kerros valuu ja kuivuu epätasaisesti. Valmistaja neuvoo kaksi kerrosta, ja riittoisuus 2–3 neliötä litralla on laskettu kahdelle kerrokselle.",
  },
  {
    question: "Kauanko kerrosten välissä odotetaan?",
    answer:
      "Valmistajan mukaan pinta on päälle maalattavissa noin kahden tunnin kuluttua. Siksi molemmat kerrokset onnistuvat usein samana päivänä.",
  },
  {
    question: "Maalaatteko myös reunat kahteen kertaan?",
    answer: "Kyllä. Reunat, harjatiilet ja ahtaat paikat maalaamme telalla tai käsin, myös kahteen kertaan.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Maalaamme katon ruiskulla aina kahteen kertaan: ensin pohjamaali, sitten pintamaali.</li>
        <li>Ensimmäinen kerros tarttuu tiileen, toinen peittää ja pitää veden ulkona.</li>
        <li>Valmistajan riittoisuus 2–3 neliötä litralla on laskettu kahdelle kerrokselle.</li>
        <li>Toinen kerros voidaan maalata noin kahden tunnin kuluttua.</li>
      </ul>
    </KeyPoints>

    <p>
      Kaksi kerrosta on pinnoituksen tärkein yksityiskohta, ja se on syy, miksi käytämme maalia aina tarpeeksi.
      Kerromme tässä, mitä kumpikin kerros tekee ja miksi yksi kerros ei riitä.
    </p>

    <h2>Mitä ensimmäinen kerros tekee?</h2>
    <p>
      Pesty betonitiili on huokoinen ja imee. Ensimmäinen kerros, pohjamaali, imeytyy huokosiin ja tarttuu
      tiileen. Se ei vielä peitä tasaisesti: osa maalista menee tiilen sisään, ja pinta jää laikukkaaksi.
      Juuri niin pitääkin käydä. Pohjamaali on tartuntakerros, jonka päälle pintamaali pysyy. Maalin
      valmistajat neuvovat samaa: ensimmäinen kerros ohennettuna imeytymään, toinen ohentamatta peittämään.
    </p>
    <Avainhuomio>Ensimmäinen kerros imeytyy tiileen ja tarttuu, eikä sen kuulu vielä peittää.</Avainhuomio>

    <h2>Mitä toinen kerros tekee?</h2>
    <p>
      Pintamaali levitetään pohjamaalin päälle, kun se on kuivunut päälle maalattavaksi, Nowocoatin mukaan
      noin kahden tunnin kuluttua. Toinen kerros ei enää imeydy, vaan jää pintaan tasaiseksi kalvoksi. Se antaa
      värin, puolihimmeän pinnan ja vedenhylkivyyden. Tämä kerros pitää tiilen kuivana ja estää
      pakkasrapautumisen. Kerromme rapautumisesta artikkelissa{" "}
      <Link to="/artikkelit/pakkasrapautuminen-tiilikatto/">pakkasrapautuminen tiilikatolla</Link>.
    </p>
    <Table
      head={["Kerros", "Tehtävä", "Miltä näyttää"]}
      rows={[
        ["Pohjamaali", "Imeytyy ja tarttuu tiileen", "Laikukas, osin imeytynyt"],
        ["Pintamaali", "Peittää, antaa värin, hylkii vettä", "Tasainen, puolihimmeä"],
      ]}
      caption="Kaksi kerrosta Nowocoatia. Riittoisuus 2–3 m² litralla on valmistajan luku kahdelle kerrokselle."
    />
    <Avainhuomio>Toinen kerros antaa värin ja vedenhylkivyyden, ja se voidaan maalata noin kahden tunnin kuluttua.</Avainhuomio>

    <h2>Miksi yksi kerros ei riitä?</h2>
    <p>
      Yksi kerros imeytyy osittain tiileen, ja pinta jää ohueksi ja epätasaiseksi. Ohut kohta päästää veden
      läpi ensimmäisenä, ja sieltä rapautuminen alkaa. Liian paksu yksi kerros taas valuu profiilin aaltoja
      pitkin ja kuivuu epätasaisesti. Kaksi normaalia kerrosta on tasaisempi ja kestävämpi kuin yksi paksu.
      Siksi käytämme maalia aina tarpeeksi ja annamme työlle 5 vuoden kirjallisen takuun.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-tampere-tummanharmaa-tiilikatto-lahikuva"
      alt="Tummanharmaa pinnoitettu tiilikatto läheltä Tampereella"
      caption="Kahteen kertaan maalattu tiilikatto läheltä. Pinta on tasainen myös profiilin aalloissa."
    />
    <Avainhuomio>Yksi kerros jää ohueksi tai valuu, ja kaksi kerrosta antaa tasaisen pinnan, jolle annamme 5 vuoden takuun.</Avainhuomio>

    <h2>Miten kerrokset levitetään?</h2>
    <ol>
      <li>Katto on pesty, kasvustontorjunta-aine levitetty ja rikkinäiset tiilet vaihdettu. Pinta on kuiva.</li>
      <li>Pohjamaali korkeapaineruiskulla lape kerrallaan.</li>
      <li>Reunat, harjatiilet ja ahtaat paikat telalla tai käsin.</li>
      <li>Noin kahden tunnin kuivuminen.</li>
      <li>Pintamaali ruiskulla ja reunat käsin.</li>
      <li>Lopputarkastus yhdessä sinun kanssasi.</li>
    </ol>
    <p>
      Koko työ kestää peruskohteessa 2–3 päivää ja maksaa yleensä 2 850–7 000 euroa. Kaikki vaiheet kuvaamme
      artikkelissa <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/">näin tiilikaton pinnoitus etenee</Link>,
      ja maalista kerromme artikkelissa <Link to="/artikkelit/nowocoat-kattomaali/">mikä Nowocoat on</Link>. Palvelun
      esittelemme sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Kaksi kerrosta reunoineen onnistuu usein samana päivänä, ja koko työ kestää 2–3 päivää.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "NowoCoat: Kattopinnoitteet ammattilaisille, esite 2025 (luettu 26.10.2026)",
          url: "https://rakennusfakta.fi/nowocoat-2025-esite-1420239/tiedosto-files/NowoCoat_Esite_A4_2025.pdf",
        },
        {
          label: "Teknos: Kirjo Tile tiilikattomaali, tuoteseloste (luettu 26.10.2026)",
          url: "https://www.teknos.com/document/tds/fi_0510-00_4.pdf",
        },
      ]}
    />
  </>
);

export default Body;
