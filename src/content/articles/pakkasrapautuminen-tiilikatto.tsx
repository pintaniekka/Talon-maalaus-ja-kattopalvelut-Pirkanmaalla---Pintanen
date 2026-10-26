import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts ("Kulunut tiili imee vettä, ja talvella vesi jäätyy ja murentaa tiiltä
 * sisältäpäin", "Ajoissa tehty pinnoitus estää pakkasrapautumisen", pinnoitus noin 15 vuoden iässä, jopa 15 vuotta lisää).
 * Yleiset faktat: Nowocoat-esite 2025 (luettu 26.10.2026): "Ulkoisen säärasituksen sekä mm. kasvuston aiheuttama
 * kattotiilien rapautuminen voidaan pysäyttää NowoCoat Roof Coating pinnoitteella"; NowoProtect-osio: kosteutta hylkivä
 * käsittely "vähentää mm. pakkasrapautumista". BMI Ormax UKK (ormax-artikkelin lähde): rikkoutuneet tiilet vaihdetaan heti.
 */
const faq = [
  {
    question: "Mitä pakkasrapautuminen on?",
    answer:
      "Kulunut betonitiili imee vettä. Kun vesi jäätyy, se laajenee ja murentaa tiiltä sisältäpäin. Pinta hilseilee ja tiili haurastuu talvi talvelta.",
  },
  {
    question: "Miten pinnoitus estää pakkasrapautumisen?",
    answer:
      "Uusi maalipinta pitää veden tiilen ulkopuolella. Kuiva tiili ei jäädy rikki. Valmistajan mukaan säärasituksen ja kasvuston aiheuttama rapautuminen voidaan pysäyttää pinnoitteella.",
  },
  {
    question: "Voiko rapautuneen katon vielä pinnoittaa?",
    answer:
      "Jos rapautuminen on vasta pinnassa ja tiilet ovat ehjiä, kyllä. Rikkinäiset tiilet vaihdamme uusiin. Jos tiilet ovat laajalti rikki, kerromme sen kuntotarkastuksessa.",
  },
  {
    question: "Milloin pinnoitus kannattaa tehdä, jotta rapautuminen ei ala?",
    answer: "Kun pinta on haalistunut tai karhea, yleensä noin 15 vuoden iässä. Silloin tiili on vielä ehjä, ja pinnoitus antaa sille jopa 15 vuotta lisää.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Kulunut tiili imee vettä. Talvella vesi jäätyy, laajenee ja murentaa tiiltä sisältäpäin.</li>
        <li>Pinnoitus pitää veden tiilen ulkopuolella, ja kuiva tiili ei rapaudu.</li>
        <li>Ajoissa tehty pinnoitus estää pakkasrapautumisen, yleensä noin 15 vuoden iässä.</li>
        <li>Rikkinäiset tiilet vaihdamme uusiin ennen maalausta.</li>
      </ul>
    </KeyPoints>

    <p>
      Pirkanmaan talvessa katto jäätyy ja sulaa monta kertaa. Jokainen kerta kuluttaa tiiltä, jos tiili on
      märkä. Kerromme tässä, miten pakkasrapautuminen etenee, miten sen huomaa ja miksi pinnoitus pysäyttää sen.
    </p>

    <h2>Miten pakkasrapautuminen syntyy?</h2>
    <p>
      Uuden betonitiilen pinta hylkii vettä. Kun pinta kuluu, tiili alkaa imeä vettä huokosiinsa. Pakkasella vesi
      jäätyy ja laajenee. Jää painaa tiilen huokosten seinämiä, ja pieniä halkeamia syntyy. Keväällä halkeamiin
      mahtuu enemmän vettä, ja seuraava talvi laajentaa niitä. Pinta alkaa hilseillä, kulmat lohkeilevat ja
      lopulta tiili halkeaa. Sammal pahentaa tilannetta, koska se pitää tiilen märkänä pidempään.
    </p>
    <Avainhuomio>Rapautuminen etenee jäätymiskerta kerrallaan, ja märkä tiili kärsii jokaisesta.</Avainhuomio>

    <h2>Miten pakkasrapautumisen huomaa?</h2>
    <ul>
      <li>Tiilen pinta tuntuu karhealta ja hiekkaiselta, kun sitä pyyhkäisee.</li>
      <li>Kourujen pohjalla on tiilistä irronnutta hiekkaa.</li>
      <li>Tiilien kulmat ovat lohkeilleet.</li>
      <li>Yksittäisiä tiiliä on haljennut, varsinkin pohjoislappeella ja puiden alla.</li>
      <li>Sammal palaa nopeasti pesun jälkeen, koska karhea pinta pitää kosteutta.</li>
    </ul>
    <Figure
      image="tiilikaton-pinnoitus-tampere-harmaa-tiilikatto-ennen"
      alt="Harmaa, kulunut tiilikatto Tampereella ennen pinnoitusta"
      caption="Kulunut ja haalistunut tiilikatto ennen pinnoitusta. Pinta imee vettä."
    />
    <Avainhuomio>Karhea pinta ja kouruun kertyvä hiekka ovat ensimmäiset merkit rapautumisesta.</Avainhuomio>

    <h2>Miten pinnoitus pysäyttää rapautumisen?</h2>
    <p>
      Pinnoitus on maalaus. Pesemme katon painepesulla, levitämme kasvustontorjunta-aineen, vaihdamme
      rikkinäiset tiilet ja maalaamme katon ruiskulla kahteen kertaan. Uusi maalipinta pitää veden tiilen
      ulkopuolella, eikä kuiva tiili jäädy rikki. Maalin valmistaja Nowocoat sanoo sen suoraan: säärasituksen ja
      kasvuston aiheuttama kattotiilien rapautuminen voidaan pysäyttää pinnoitteella. Pinnoitettu katto kestää
      jopa 15 vuotta pidempään. Työvaiheet kerromme artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/">näin tiilikaton pinnoitus etenee</Link>.
    </p>
    <Avainhuomio>Maalipinta pitää tiilen kuivana, ja valmistajan mukaan rapautuminen voidaan pysäyttää pinnoitteella.</Avainhuomio>

    <h2>Milloin on liian myöhäistä?</h2>
    <p>
      Jos tiilet ovat laajalti haljenneet ja aluskate vuotaa, pinnoitus ei korjaa kattoa. Silloin katto
      kannattaa uusia, ja kattoremontti maksaa yleensä 15 000–30 000 euroa. Siksi pinnoitus kannattaa tehdä
      ajoissa, kun pinta on haalistunut tai karhea mutta tiilet ehjiä. Yleensä se on ajankohtaista noin 15
      vuoden iässä. Pinnoitus maksaa yleensä 2 850–7 000 euroa. Vertailun kerromme artikkelissa{" "}
      <Link to="/artikkelit/pinnoitus-vai-uusi-katto/">tiilikattoremontti vai pinnoitus</Link>, ja palvelun
      esittelemme sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Ajoissa tehty pinnoitus maksaa 2 850–7 000 euroa, myöhässä tehty kattoremontti 15 000–30 000 euroa.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "NowoCoat: Kattopinnoitteet ammattilaisille, esite 2025 (luettu 26.10.2026)",
          url: "https://rakennusfakta.fi/nowocoat-2025-esite-1420239/tiedosto-files/NowoCoat_Esite_A4_2025.pdf",
        },
        {
          label: "BMI Suomi: Usein kysytyt kysymykset, BMI Ormax -betonikattotiilet (luettu 26.10.2026)",
          url: "https://bmifinland.zendesk.com/hc/fi-fi/articles/33093701704082-Usein-kysytyt-kysymykset-BMI-Ormax-betonikattotiilet",
        },
      ]}
    />
  </>
);

export default Body;
