import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Luvut vero.fi:stä (docs/lahteet-kotitalousvahennys-2026-10-27.md): 40 % työn osuudesta, enintään 2 100 € henkilöltä,
 * omavastuu 150 €, samat 2026 ja 2027. Vanhempien ja isovanhempien asunto: Verohallinnon syventävä ohje Kotitalousvähennys
 * (luettu 26.10.2026): vähennyksen saa työstä, joka on tehty omien tai puolison vanhempien, isovanhempien tai näiden
 * puolisoiden käyttämässä asunnossa tai vapaa-ajan asunnossa; lasten asunnossa tehty työ ei oikeuta vähennykseen.
 * Puolisot: vero.fi, Näin ilmoitat kotitalousvähennyksen: "Jos olet jakanut kulut esimerkiksi puolisosi kanssa, ilmoita
 * oma osuutesi." Vähennys on henkilökohtainen. Yrityksen faktat: laskussa työn osuus eriteltynä (faqData.ts).
 * Ei laskuesimerkkejä (CLAUDE.md).
 */
const faq = [
  {
    question: "Saanko kotitalousvähennyksen, jos maksan vanhempieni katon pinnoituksen?",
    answer:
      "Kyllä. Vähennyksen saa työstä, joka on tehty omien tai puolison vanhempien tai isovanhempien käyttämässä asunnossa tai vapaa-ajan asunnossa. Laskun pitää olla sinun nimissäsi ja sinun maksamasi. Kirjoitamme laskun sinun nimiisi, kun kerrot sen ennen laskutusta. Olemme tehneet näin.",
  },
  {
    question: "Saanko vähennyksen, jos maksan aikuisen lapseni talon maalauksen?",
    answer: "Et. Verohallinnon ohjeen mukaan lasten asunnossa tehty työ ei oikeuta vähennykseen, ellet itse asu siellä.",
  },
  {
    question: "Voimmeko puolisoni kanssa jakaa vähennyksen?",
    answer:
      "Voitte. Vähennys on henkilökohtainen, ja kumpikin saa enintään 2 100 euroa vuodessa. Jos jaatte kulut, kumpikin ilmoittaa oman osuutensa työn kustannuksista.",
  },
  {
    question: "Pitääkö laskussa olla molempien nimet?",
    answer:
      "Selkeintä on, että laskussa on kaikkien maksajien nimet tai että kumpikin saa oman laskun. Kerro meille ennen laskutusta, miten haluat laskun.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Vähennys on 40 % työn osuudesta, enintään 2 100 euroa henkilöltä vuodessa. Omavastuu on 150 euroa.</li>
        <li>Vähennyksen saa myös omien tai puolison vanhempien ja isovanhempien asunnossa tehdystä työstä.</li>
        <li>Lasten asunnossa tehty työ ei oikeuta vähennykseen.</li>
        <li>Puolisot voivat jakaa kulut, ja kumpikin saa oman vähennyksensä.</li>
      </ul>
    </KeyPoints>

    <p>
      Asiakkaat kysyvät meiltä usein, kenen nimiin lasku kirjoitetaan. Kysymys on hyvä, koska se ratkaisee,
      kuka saa kotitalousvähennyksen. Kerromme tässä, mitä Verohallinnon ohje sanoo vanhempien talosta ja
      puolisoiden laskusta. Luvut ovat vuosien 2026 ja 2027 luvut.
    </p>

    <h2>Saako vähennyksen vanhempien talon katosta tai maalauksesta?</h2>
    <p>
      Saa. Verohallinnon ohjeen mukaan vähennyksen saa työstä, joka on tehty omien tai puolison vanhempien,
      isovanhempien tai näiden puolisoiden käyttämässä asunnossa tai vapaa-ajan asunnossa. Jos siis maksat
      vanhempiesi tiilikaton pinnoituksen tai talon maalauksen, vähennys kuuluu sinulle. Laskun pitää olla
      sinun nimissäsi, ja sinun pitää maksaa se. Vanhempien ei tarvitse olla työn tilaajia. Kirjoitamme
      laskun sinun nimiisi, kun kerrot sen ennen laskutusta. Olemme tehneet näin.
    </p>
    <Avainhuomio>Vanhempien tai isovanhempien talossa tehty työ oikeuttaa vähennykseen, kun maksat laskun itse.</Avainhuomio>

    <h2>Entä jos maksan lapseni talon?</h2>
    <p>
      Silloin vähennystä ei saa. Ohje sanoo, että alenevassa polvessa olevien sukulaisten asunnossa tehty työ
      ei oikeuta vähennykseen. Vanhemmat eivät voi vähentää lastensa asunnon korjauskuluja, elleivät itse asu
      samassa asunnossa. Tässä tapauksessa laskun kannattaa olla lapsen nimissä ja lapsen maksama, jolloin
      hän saa vähennyksen itse.
    </p>
    <Table
      head={["Kenen talo", "Kuka maksaa", "Saako vähennyksen"]}
      rows={[
        ["Oma koti tai mökki", "Sinä", "Kyllä"],
        ["Vanhempien tai isovanhempien koti", "Sinä", "Kyllä"],
        ["Puolison vanhempien koti", "Sinä", "Kyllä"],
        ["Aikuisen lapsen koti", "Sinä", "Ei, ellet asu siellä itse"],
        ["Vuokralle annettu sijoitusasunto", "Sinä", "Ei"],
      ]}
      caption="Kotitalousvähennys sukulaisten asunnoissa Verohallinnon ohjeen mukaan. Vähennys on aina maksajan."
    />
    <Avainhuomio>Vähennys kulkee ylöspäin sukupolvissa, ei alaspäin: lapsen kotiin maksettu työ ei kelpaa.</Avainhuomio>

    <h2>Miten puolisot jakavat vähennyksen?</h2>
    <p>
      Vähennys on henkilökohtainen. Kumpikin puoliso saa vähentää 40 % työn osuudesta, enintään 2 100 euroa
      vuodessa, ja kummallakin on oma 150 euron omavastuu. Jos työn osuus on niin suuri, että yhden henkilön
      enimmäismäärä ylittyy, kulut kannattaa jakaa. Verohallinnon ohjeen mukaan jaetuista kuluista kumpikin
      ilmoittaa oman osuutensa. Selkeintä on, että laskussa on molempien nimet tai että kumpikin saa oman
      laskun. Kerro meille toiveesi ennen laskutusta, niin kirjoitamme laskun sen mukaan. Työn osuus on
      laskussa aina eriteltynä.
    </p>
    <Avainhuomio>Puolisot voivat jakaa kulut, ja kumpikin saa enintään 2 100 euroa vähennystä vuodessa.</Avainhuomio>

    <h2>Miten vähennys ilmoitetaan?</h2>
    <p>
      Vähennyksen voi ilmoittaa jo saman vuoden verokortille OmaVerossa, tai veroilmoituksella seuraavana
      keväänä. Ilmoitukseen tarvitset laskun loppusumman, työn osuuden ja yrityksen Y-tunnuksen. Omavastuuta
      ei vähennetä itse, Verohallinto laskee sen. Yrityksen pitää kuulua ennakkoperintärekisteriin, ja Pintanen
      Oy kuuluu. Perusasiat vähennyksestä kerromme sivulla{" "}
      <Link to="/kotitalousvahennys/">kotitalousvähennys</Link> ja artikkelissa{" "}
      <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/">kotitalousvähennys katto- ja maalaustöissä</Link>.
    </p>
    <Avainhuomio>Ilmoitukseen tarvitaan laskun loppusumma, työn osuus ja Y-tunnus, ja ne kaikki ovat laskussamme.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Verohallinto: Kotitalousvähennyksen määrä (luettu 26.10.2026)",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara",
        },
        {
          label: "Verohallinto: Näin ilmoitat kotitalousvähennyksen (luettu 26.10.2026)",
          url: "https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/nain-ilmoitat-kotitalousvahennyksen/",
        },
        {
          label: "Verohallinto: Kotitalousvähennys, syventävä vero-ohje (luettu 26.10.2026)",
          url: "https://www.vero.fi/syventavat-vero-ohjeet/ohje-hakusivu/47873/kotitalousvahennys-verotuksessa3/",
        },
      ]}
    />
  </>
);

export default Body;
