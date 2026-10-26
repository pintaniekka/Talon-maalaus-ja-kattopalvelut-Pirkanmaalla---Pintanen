import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (pinnoitus ajankohtainen noin 15 vuoden iässä; jopa 15 vuotta pidempään;
 * uusi katto, jos aluskate vuotaa tai tiilet rapautuneet laajalti), kattoremontti 15 000–30 000 € (docs).
 * Yleiset faktat: K-Rauta, tiilikaton asennus (luettu 26.10.2026): kattotiilen elinkaari jopa 70 vuotta (VTT:n tutkimus);
 * BMI Ormax UKK (26.10.2026): betonitiilikatto kestää oikein huollettuna 50–70 vuotta; BMI Ormax EVO suojaa jopa 70 vuoden
 * ajan. Nowocoat-esite: pinnoite pidentää huoltoväliä ja elinkaarta.
 */
const faq = [
  {
    question: "Kuinka kauan tiilikatto kestää?",
    answer:
      "Betonitiili kestää valmistajan mukaan oikein huollettuna 50–70 vuotta, ja VTT:n tutkimuksen mukaan kattotiilen elinkaari on jopa 70 vuotta. Tiilen pinta kuluu paljon nopeammin.",
  },
  {
    question: "Kuinka kauan tiilen pinta kestää?",
    answer:
      "Tehdaspinta on yleensä kulunut noin 15 vuoden iässä: väri on haalistunut ja pinta karhea. Silloin katto kannattaa pinnoittaa, ja uusi pinta kestää jopa 15 vuotta pidempään.",
  },
  {
    question: "Milloin tiilikatto pitää uusia?",
    answer:
      "Kun aluskate vuotaa tai tiilet ovat rapautuneet laajalti. Pelkkä pinnan kuluminen ei ole syy uusia kattoa. Kattoremontti maksaa yleensä 15 000–30 000 euroa.",
  },
  {
    question: "Kuinka monta kertaa tiilikaton voi pinnoittaa?",
    answer:
      "Niin kauan kuin tiilet ja aluskate ovat kunnossa. Pinnoitus uusii pinnan, ja kuiva tiili ei rapaudu. Kuntotarkastuksessa katsomme joka kerta, kannattaako pinnoitus.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Betonitiili kestää valmistajan mukaan huollettuna 50–70 vuotta.</li>
        <li>Tiilen tehdaspinta kuluu noin 15 vuodessa. Silloin katto kannattaa pinnoittaa.</li>
        <li>Pinnoitettu katto kestää jopa 15 vuotta pidempään.</li>
        <li>Katto uusitaan vasta, kun aluskate vuotaa tai tiilet ovat laajalti rikki.</li>
      </ul>
    </KeyPoints>

    <p>
      Tiilikatolla on kaksi ikää: tiilen ikä ja pinnan ikä. Tiili kestää vuosikymmeniä, mutta sen pinta kuluu
      paljon nopeammin. Kerromme tässä, mitä valmistajat ja tutkimus sanovat tiilen kestosta ja mitä se
      tarkoittaa sinun katollesi.
    </p>

    <h2>Kuinka kauan betonitiili kestää?</h2>
    <p>
      Kattotiilen valmistaja BMI sanoo, että betonitiilikatto kestää oikein huollettuna 50–70 vuotta. K-Raudan
      ohje viittaa VTT:n tutkimukseen, jonka mukaan kattotiilen elinkaari on jopa 70 vuotta. Betoni ei lahoa
      eikä ruostu. Sen vihollinen on vesi, joka jäätyy tiilen sisällä. Niin kauan kuin tiili pysyy kuivana, se
      kestää.
    </p>
    <Avainhuomio>Betonitiili kestää huollettuna 50–70 vuotta, kun se pysyy kuivana.</Avainhuomio>

    <h2>Kuinka kauan tiilen pinta kestää?</h2>
    <p>
      Uuden tiilen tehdaspinta hylkii vettä. Aurinko, sade ja pakkanen kuluttavat sen, ja Pirkanmaalla pinta on
      yleensä kulunut noin 15 vuoden iässä. Merkit ovat haalistunut väri, karhea pinta ja nopeasti palaava
      sammal. Kulunut tiili imee vettä, ja silloin pakkasrapautuminen alkaa. Pinnoitus uusii pinnan: katto
      pestään, rikkinäiset tiilet vaihdetaan ja katto maalataan kahteen kertaan. Uusi pinta kestää jopa 15
      vuotta pidempään. Merkit kerromme artikkelissa{" "}
      <Link to="/artikkelit/milloin-pinnoittaa-tiilikatto/">milloin tiilikatto pitää pinnoittaa</Link>.
    </p>
    <Table
      head={["Katon ikä", "Mitä katolla tapahtuu", "Mitä kannattaa tehdä"]}
      rows={[
        ["0–10 vuotta", "Tehdaspinta hylkii vettä", "Pidä kourut ja katto puhtaana roskista"],
        ["Noin 15 vuotta", "Väri haalistuu, pinta karhenee, sammal tarttuu", "Pinnoitus, 2 850–7 000 €"],
        ["Pinnoituksen jälkeen", "Uusi pinta kestää jopa 15 vuotta pidempään", "Kuntotarkastus, kun pinta taas kuluu"],
        ["Aluskate vuotaa tai tiilet laajalti rikki", "Vesi pääsee rakenteisiin", "Kattoremontti, 15 000–30 000 €"],
      ]}
      caption="Tiilikaton elinkaari ja oikea toimenpide kussakin vaiheessa."
    />
    <Avainhuomio>Pinta kuluu noin 15 vuodessa, ja pinnoitus antaa sille jopa 15 vuotta lisää.</Avainhuomio>

    <h2>Mikä lyhentää tiilikaton ikää?</h2>
    <ul>
      <li>Sammal ja jäkälä. Ne pitävät tiilen märkänä, ja märkä tiili rapautuu pakkasella.</li>
      <li>Varjo ja puut. Pohjoislape ja metsän reuna kuivuvat hitaasti.</li>
      <li>Rikkinäiset tiilet, joita ei vaihdeta. Vesi pääsee aluskatteelle.</li>
      <li>Puuttuva harjatiiviste ja löystyneet läpiviennit.</li>
      <li>Liian myöhään tehty pinnoitus, kun rapautuminen on jo alkanut.</li>
    </ul>
    <Figure
      image="tiilikaton-pinnoitus-kangasala-sammaleinen-tiilikatto-ennen"
      alt="Sammaleinen tiilikatto Kangasalla ennen pinnoitusta"
      caption="Sammaleinen tiilikatto Kangasalla ennen pinnoitusta. Sammal pitää tiilen märkänä."
    />
    <Avainhuomio>Sammal, varjo ja vaihtamattomat rikkinäiset tiilet lyhentävät katon ikää eniten.</Avainhuomio>

    <h2>Milloin tiilikatto pitää uusia?</h2>
    <p>
      Kun aluskate vuotaa tai tiilet ovat rapautuneet laajalti. Pelkkä kulunut pinta ei ole syy uusia kattoa,
      koska pinnoitus korjaa sen. Kuntotarkastuksessa katsomme tiilet, saumat, piipun ympäryksen, läpiviennit
      ja aluskatteen ja kerromme suoraan, kumpi kannattaa. Pinnoitus maksaa yleensä 2 850–7 000 euroa,
      kattoremontti 15 000–30 000 euroa. Vertailun kerromme artikkelissa{" "}
      <Link to="/artikkelit/pinnoitus-vai-uusi-katto/">tiilikattoremontti vai pinnoitus</Link>, ja palvelun
      esittelemme sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Katto uusitaan vasta aluskatteen tai tiilien pettäessä, ja siihen asti pinnoitus riittää.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "K-Rauta: Tiilikaton asennus (luettu 26.10.2026)",
          url: "https://www.k-rauta.fi/inspiraatio-ja-ohjeet/rakentaminen/tiilikaton-asennus",
        },
        {
          label: "BMI Suomi: Usein kysytyt kysymykset, BMI Ormax -betonikattotiilet (luettu 26.10.2026)",
          url: "https://bmifinland.zendesk.com/hc/fi-fi/articles/33093701704082-Usein-kysytyt-kysymykset-BMI-Ormax-betonikattotiilet",
        },
        {
          label: "BMI: BMI Ormax -tuotesivu (luettu 26.10.2026)",
          url: "https://www.bmigroup.com/fi/tuotteet-ja-ratkaisut/harjakatot/bmi-ormax",
        },
      ]}
    />
  </>
);

export default Body;
