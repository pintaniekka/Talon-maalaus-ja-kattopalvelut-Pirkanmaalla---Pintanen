import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Hinnat vain sivuston omista lähteistä: prices.ts (yleinen haarukka ja hintakortit), kattoremontti 15 000–30 000 €
 * (docs/sisallon-lahteet-2026-10-12.md), kotitalousvähennys vero.fi (26.10.2026). Ei neliöhintoja, ei laskuesimerkkejä.
 */
const faq = [
  {
    question: "Paljonko tiilikaton pinnoitus maksaa vuonna 2027?",
    answer:
      "Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä 2 850–7 000 euroa. Yleisimmän kattokoon, 190–240 m², hinta on yleensä 3 300–3 700 euroa.",
  },
  {
    question: "Mitä hintaan kuuluu?",
    answer:
      "Katon pesu painepesulla, kasvustontorjunta, rikkinäisten tiilien vaihto uusiin, pohjamaali ja pintamaali ruiskulla, ahtaat paikat telalla tai käsin, siivous ja 5 vuoden kirjallinen takuu.",
  },
  {
    question: "Saako pinnoituksesta kotitalousvähennyksen?",
    answer: "Kyllä. Vuonna 2027 saat vähentää 40 % työn osuudesta, enintään 2 100 euroa henkilöltä.",
  },
  {
    question: "Milloin kannattaa pyytää tarjous kaudelle 2027?",
    answer:
      "Kesän työt täyttyvät pitkälti jo keväällä. Kuntotarkastuksen voi tehdä heti, kun katto on lumeton, ja pinnoitukset teemme huhti–toukokuusta elo–syyskuuhun.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Tiilikaton pinnoitus maksaa Pirkanmaalla yleensä 2 850–7 000 euroa.</li>
        <li>Yleisin kattokoko, 190–240 m², maksaa yleensä 3 300–3 700 euroa ja valmistuu 2–3 työpäivässä.</li>
        <li>Hintaan kuuluu pesu, tiilien vaihto, kaksi maalikerrosta, siivous ja 5 vuoden takuu.</li>
        <li>Kotitalousvähennys on 40 % työn osuudesta, enintään 2 100 euroa henkilöltä.</li>
      </ul>
    </KeyPoints>

    <p>
      Hinta on ensimmäinen asia, jota meiltä kysytään. Kerromme sen tässä samalla tavalla kuin kerromme sen
      puhelimessa: haarukka, esimerkit katon koon mukaan ja syyt, jotka siirtävät hintaa haarukan sisällä. Luvut
      ovat vuoden 2027 kauden hintoja.
    </p>

    <h2>Paljonko tiilikaton pinnoitus maksaa Pirkanmaalla?</h2>
    <p>
      Omakotitalon tiilikaton pinnoitus maksaa meillä yleensä 2 850–7 000 euroa. Suurin osa katoista osuu
      haarukan alkupäähän. Yläpää on isoille, jyrkille tai monimuotoisille katoille.
    </p>
    <Table
      head={["Katon koko", "Hinta yleensä", "Kesto"]}
      rows={[
        ["150–180 m²", "2 850 – 3 200 €", "2 työpäivää"],
        ["190–240 m²", "3 300 – 3 700 €", "2–3 työpäivää"],
        ["250–300 m²", "3 750 – 4 880 €", "2–4 työpäivää"],
      ]}
      caption="Hintaesimerkit omakotitalon tiilikatolle vuonna 2027. Hinta sisältää työn, materiaalit ja siivouksen."
    />
    <Avainhuomio>Yleisimmän kattokoon pinnoitus maksaa yleensä 3 300–3 700 euroa ja valmistuu 2–3 päivässä.</Avainhuomio>

    <h2>Mitä pinnoituksen hintaan kuuluu?</h2>
    <ul>
      <li>Katon pesu painepesulla ja kourujen huuhtelu</li>
      <li>Kasvustontorjunta-aine, joka pitää sammaleen poissa</li>
      <li>Rikkinäisten tiilien vaihto uusiin</li>
      <li>Pohjamaali ja pintamaali ruiskulla, ahtaat paikat telalla tai käsin</li>
      <li>Suojaukset, esimerkiksi aurinkopaneelit, lasiterassit ja valokatteet</li>
      <li>Siivous ja 5 vuoden kirjallinen takuu</li>
    </ul>
    <p>
      Maali on Nowocoat. Ilmainen kuntotarkastus ja kirjallinen tarjous kuuluvat myös hintaan.
    </p>
    <Avainhuomio>Hinta sisältää kaksi maalikerrosta ja 5 vuoden takuun, joten lisälaskuja ei tule.</Avainhuomio>

    <h2>Mikä nostaa tai laskee hintaa?</h2>
    <p>Viisi asiaa ratkaisee, mihin kohtaan haarukkaa katto osuu:</p>
    <ol>
      <li>Katon koko. Neliöt ovat suurin yksittäinen tekijä.</li>
      <li>Jyrkkyys ja korkeus. Jyrkällä katolla työ on hitaampaa ja vaatii enemmän turvallisuustoimia.</li>
      <li>Katon muoto. Monta lapetta, jiiriä ja läpivientiä lisäävät käsityötä.</li>
      <li>Tiilien kunto. Jos rikkinäisiä tiiliä on paljon, vaihtoon menee aikaa.</li>
      <li>Suojattavat kohteet. Aurinkopaneelit ja lasiterassit suojataan ennen pesua ja maalausta.</li>
    </ol>
    <Figure
      image="tiilikaton-pinnoitus-tampere-aurinkopaneelit-suojattu"
      ratio="3/4"
      alt="Tiilikaton pinnoitus Tampereella, aurinkopaneelit suojattu"
      caption="Aurinkopaneelit suojataan ennen pesua ja maalausta. Suojaus kuuluu hintaan."
    />
    <Avainhuomio>Katon neliöt ratkaisevat eniten, ja viisi tekijää yhdessä siirtävät hintaa haarukan sisällä.</Avainhuomio>

    <h2>Paljonko pinnoitus maksaa kotitalousvähennyksen jälkeen?</h2>
    <p>
      Vuonna 2027 saat vähentää verotuksessa 40 % työn osuudesta. Vähennystä saa enintään 2 100 euroa henkilöltä,
      ja omavastuu on 150 euroa. Pariskunta saa kumpikin oman vähennyksensä. Kirjoitamme laskuun työn osuuden
      erikseen, joten vähennyksen hakeminen on helppoa. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/">kotitalousvähennys katto- ja maalaustöissä</Link>.
    </p>
    <Avainhuomio>Vähennys on 40 % työn osuudesta ja enintään 2 100 euroa henkilöltä vuonna 2027.</Avainhuomio>

    <h2>Paljonko pinnoitus maksaa verrattuna uuteen kattoon?</h2>
    <Table
      head={["", "Hinta yleensä", "Mitä tehdään"]}
      rows={[
        ["Tiilikaton pinnoitus", "2 850–7 000 €", "Pesu, uudet tiilet rikkinäisten tilalle, kaksi kerrosta maalia"],
        ["Kattoremontti", "15 000–30 000 €", "Koko katon uusiminen rakenteista lähtien"],
      ]}
      caption="Pinnoitus riittää, jos aluskate ja rakenteet ovat kunnossa. Kattoremontin hinnat kattourakoitsijoiden omilta hintasivuilta."
    />
    <p>
      Pinnoitettu katto kestää jopa 15 vuotta pidempään. Jos aluskate vuotaa tai tiiliä on rikki laajalti,
      kerromme sen kuntotarkastuksessa suoraan. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/pinnoitus-vai-uusi-katto/">tiilikattoremontti vai pinnoitus</Link>.
    </p>
    <Avainhuomio>Pinnoitus maksaa yleensä alle neljäsosan kattoremontista ja antaa katolle jopa 15 vuotta lisää.</Avainhuomio>

    <h2>Miten saat tarkan hinnan omalle katollesi?</h2>
    <p>
      Suuntaa antavan arvion saat heti <Link to="/hintalaskuri/?palvelu=pinnoitus">hintalaskurilla</Link>. Tarkan
      hinnan saat ilmaisesta kuntotarkastuksesta. Tulemme katsomaan katon Pirkanmaalla ja lähikunnissa yleensä
      samalla viikolla, tarvittaessa myös iltaisin tai viikonloppuisin. Tarkistamme tiilet, saumat, piipun ympäryksen,
      läpiviennit ja aluskatteen. Saat kirjallisen tarjouksen, jossa on kiinteä hinta. Hintaesimerkit ja
      vertailut ovat sivulla <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/">tiilikaton pinnoituksen hinta</Link>.
    </p>
    <Avainhuomio>Kuntotarkastus on ilmainen, ja tarjouksen kiinteä hinta pitää, vaikka työ venyisi sateen takia.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
