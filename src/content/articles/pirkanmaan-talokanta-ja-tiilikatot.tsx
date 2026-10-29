import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Luvut: Tilastokeskus, rakennuskanta 2025, taulukko 15er (omakoti- ja paritalot valmistumisvuoden mukaan), sama aineisto
 * kuin src/data/cityHousingStats.ts (CC BY 4.0). Yrityksen faktat sivuston omia: pinnoitus ajankohtainen noin 15 vuoden
 * iässä, Ormax yleisin 2000-luvun tiili (Eerik 11.10.2026), hinnat prices.ts. Kattomateriaalia ei tilastoida: ei väitetä,
 * kuinka monessa talossa on tiilikatto.
 */
const faq = [
  {
    question: "Minkä ikäisiä Pirkanmaan omakotitalot ovat?",
    answer:
      "Tilastokeskuksen mukaan Tampereella on noin 17 000 omakoti- ja paritaloa. Niistä noin 6 800 on rakennettu 1970–1999 ja noin 1 650 vuosina 2000–2009.",
  },
  {
    question: "Milloin 2000-luvun talon katto kannattaa pinnoittaa?",
    answer:
      "Tiilen pinta on yleensä kulunut noin 15 vuoden iässä. Vuosina 2005–2012 rakennetut talot ovat siis nyt pinnoitusiässä.",
  },
  {
    question: "Onko 1980-luvun talon tiilikatto vielä pinnoitettavissa?",
    answer:
      "Usein on. Betonitiili kestää valmistajan mukaan 50–70 vuotta. Jos aluskate on kunnossa ja tiilet ehjiä, pinnoitus kannattaa. Kuntotarkastuksessa katsomme sen.",
  },
  {
    question: "Mistä luvut ovat?",
    answer: "Tilastokeskuksen rakennuskantatilastosta 2025, taulukko 15er. Luvut ovat omakoti- ja paritaloja valmistumisvuoden mukaan.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Tampereella on noin 17 000 omakoti- ja paritaloa, joista noin 6 800 on rakennettu 1970–1999.</li>
        <li>Vuosina 2000–2009 Tampereen seudulle valmistui tuhansia taloja, ja niiden katot ovat nyt noin 15 vuoden iässä.</li>
        <li>Tiilen pinta kuluu noin 15 vuodessa, joten 2005–2012 rakennetut talot ovat pinnoitusiässä.</li>
        <li>Vanhemmat katot voi pinnoittaa, kun aluskate ja tiilet ovat kunnossa.</li>
      </ul>
    </KeyPoints>

    <p>
      Katon ikä seuraa talon ikää. Kun tiedät, milloin alueen talot on rakennettu, tiedät, milloin niiden katot
      kuluvat. Kokosimme Tilastokeskuksen luvut Pirkanmaan kunnista ja kerromme, mitä ne tarkoittavat
      tiilikatoille.
    </p>

    <h2>Milloin Pirkanmaan omakotitalot on rakennettu?</h2>
    <Table
      head={["Kunta", "1970–1979", "1980–1989", "1990–1999", "2000–2009", "Yhteensä"]}
      rows={[
        ["Tampere", "1 842", "2 918", "2 062", "1 647", "17 153"],
        ["Ylöjärvi", "888", "1 353", "852", "1 565", "8 628"],
        ["Kangasala", "822", "890", "830", "1 269", "8 011"],
        ["Nokia", "649", "882", "571", "1 139", "7 272"],
        ["Lempäälä", "564", "675", "559", "1 026", "5 780"],
        ["Sastamala", "1 152", "1 135", "621", "593", "8 916"],
        ["Pirkkala", "342", "432", "352", "597", "3 223"],
        ["Hämeenkyrö", "315", "405", "338", "447", "3 748"],
      ]}
      caption="Omakoti- ja paritalot valmistumisvuoden mukaan. Lähde: Tilastokeskus, rakennuskanta 2025, taulukko 15er."
    />
    <p>
      Tampereella suurin rakennusvuosikymmen on 1980-luku, lähes 3 000 taloa. Kehyskunnissa Ylöjärvellä,
      Kangasalla, Nokialla, Lempäälässä ja Pirkkalassa 2000-luvun ensimmäinen vuosikymmen on suurin tai
      toiseksi suurin. Näiden talojen katot ovat nyt 15–25 vuotta vanhoja.
    </p>
    <Avainhuomio>Kehyskuntiin valmistui 2000-luvulla yhteensä yli 5 500 omakoti- ja paritaloa, joiden katot ovat nyt pinnoitusiässä.</Avainhuomio>

    <h2>Mitä talon ikä kertoo katosta?</h2>
    <p>
      Tiilen tehdaspinta kuluu Pirkanmaalla yleensä noin 15 vuodessa. Vuosina 2005–2012 rakennettujen talojen
      katot ovat siis juuri nyt pinnoitusiässä: väri on haalistunut, pinta karhea ja sammal tarttuu. Näissä
      taloissa on yleensä Ormax-tiili, joka on yleisin 2000-luvun kattotiili. Kerromme siitä artikkelissa{" "}
      <Link to="/artikkelit/ormax-tiilikaton-pinnoitus/">Ormax-tiilikaton pinnoitus</Link>.
    </p>
    <Table
      head={["Talon rakennusvuosi", "Katon ikä 2027", "Mitä katolla yleensä on"]}
      rows={[
        ["1970–1989", "38–57 vuotta", "Alkuperäinen tai kerran pinnoitettu tiili, aluskate tarkistettava"],
        ["1990–1999", "28–37 vuotta", "Tehdaspinta kulunut, pinnoitus usein tekemättä"],
        ["2000–2012", "15–27 vuotta", "Ormax, tehdaspinta kulumassa, pinnoitus ajankohtainen"],
        ["2013–", "Alle 15 vuotta", "Tehdaspinta kunnossa, tarkkaile sammalta"],
      ]}
      caption="Katon ikä ja tyypillinen tilanne talon rakennusvuoden mukaan. Kuntotarkastus kertoo oman kattosi tilanteen."
    />
    <Avainhuomio>Vuosina 2005–2012 rakennettujen talojen katot ovat nyt noin 15 vuoden iässä ja pinnoitusvuorossa.</Avainhuomio>

    <h2>Kannattaako 1980-luvun talon katto vielä pinnoittaa?</h2>
    <p>
      Usein kyllä. Betonitiili kestää valmistajan mukaan 50–70 vuotta, joten 1980-luvun tiili on vasta
      puolivälissä. Ratkaisevaa on aluskate ja tiilien kunto. Jos aluskate on kunnossa ja tiilet ehjiä,
      pinnoitus antaa katolle jopa 15 vuotta lisää ja maksaa yleensä 2 850–7 000 euroa. Jos aluskate vuotaa,
      katto kannattaa uusia. Kuntotarkastuksessa katsomme molemmat. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/tiilikaton-ika-ja-kayttoika/">kuinka kauan tiilikatto kestää</Link>.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-tampere-tiilitalo-jalkeen"
      alt="Tiilitalo Tampereella tiilikaton pinnoituksen jälkeen"
      caption="Tiilitalo Tampereella pinnoituksen jälkeen 2026."
    />
    <Avainhuomio>1980-luvun tiili on 50–70 vuoden kestoiästään vasta puolivälissä, ja aluskate ratkaisee pinnoituksen.</Avainhuomio>

    <h2>Missä kunnissa pinnoitamme?</h2>
    <p>
      Pinnoitamme tiilikattoja Pirkanmaalla ja lähikunnissa: Tampereella, Ylöjärvellä, Kangasalla, Nokialla,
      Lempäälässä, Pirkkalassa, Sastamalassa, Hämeenkyrössä ja muissa Pirkanmaan kunnissa. Kuntakohtaiset sivut ja kohteet löydät sivulta{" "}
      <Link to="/toiminta-alueet/">toiminta-alueet</Link>, ja palvelun esittelemme sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Toimimme kaikissa taulukon kunnissa.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Tilastokeskus: Rakennukset (lkm) käyttötarkoituksen ja valmistumisvuoden mukaan, 15er (rakennuskanta 2025, luettu 26.10.2026)",
          url: "https://pxdata.stat.fi/PxWeb/pxweb/fi/StatFin/StatFin__raku/15er.px/",
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
