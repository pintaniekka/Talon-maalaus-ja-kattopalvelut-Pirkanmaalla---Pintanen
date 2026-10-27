import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Sources, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: faqData.ts (kausi huhti–toukokuusta elo–syyskuuhun, sateella ei maalata, pesun jälkeen
 * katto saa kuivua). Yleiset faktat: NowoCoat-esite 2025 (luettu 26.10.2026): täysin kuiva 24 h (20 °C, 60 % RH), päälle
 * maalattavissa n. 2 h. Teknos Kirjo Tile tuoteseloste (26.10.2026): "ilman, pinnan ja maalin lämpötilan olla yli +10°C ja
 * ilman suhteellisen kosteuden alle 80 %", myös maalausta seuraavan yön lämpötila; "Kuivuminen hidastuu ilman ollessa viileä
 * ja/tai kostea"; pinta kestää vesisadetta n. kolmen tunnin kuivumisen jälkeen. Nämä ovat tiilikattomaalien yleisiä rajoja.
 */
const faq = [
  {
    question: "Missä lämpötilassa tiilikaton voi maalata?",
    answer:
      "Tiilikattomaalien valmistajat vaativat yleensä yli 10 asteen lämpötilan ilmalle, pinnalle ja maalille sekä alle 80 prosentin ilmankosteuden. Sama raja koskee maalausta seuraavaa yötä.",
  },
  {
    question: "Voiko katon pinnoittaa huhtikuussa?",
    answer:
      "Voi, jos lämpötila pysyy yli 10 asteessa myös yöllä ja katto on kuiva. Huhtikuussa aloitamme kauden usein pesuilla ja kuntotarkastuksilla ja maalaamme, kun lämpöä on riittävästi.",
  },
  {
    question: "Kuinka kauan maalin pitää kuivua ennen sadetta?",
    answer:
      "Nowocoatin mukaan pinta on täysin kuiva vuorokaudessa 20 asteessa. Viileä ja kostea sää hidastaa kuivumista, joten katsomme ennusteesta riittävän poutajakson.",
  },
  {
    question: "Onko kesän helle ongelma?",
    answer: "Kuumalla katolla maali kuivuu nopeammin kuin 20 asteessa. Työ tehdään silloin lape kerrallaan ja tasaisesti, jotta pinta ei jää raidalliseksi.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Pinnoitamme huhti–toukokuusta elo–syyskuuhun.</li>
        <li>Tiilikattomaalit vaativat yleensä yli 10 astetta ja alle 80 prosentin ilmankosteuden, myös seuraavana yönä.</li>
        <li>Katon pitää olla kuiva. Sateella ei maalata.</li>
        <li>Nowocoat on täysin kuiva vuorokaudessa 20 asteessa, ja toinen kerros voidaan maalata noin kahden tunnin kuluttua.</li>
      </ul>
    </KeyPoints>

    <p>
      Sää ratkaisee, milloin katon voi maalata. Liian kylmässä maali ei kuivu, kosteassa se ei tartu, ja
      sateessa se valuu pois. Kerromme tässä, mitä rajoja noudatamme ja miten kausi kulkee Pirkanmaalla.
    </p>

    <h2>Mitä lämpötilaa ja kosteutta tiilikaton maalaus vaatii?</h2>
    <p>
      Tiilikattomaalien tuoteselosteissa raja on selvä. Teknoksen tiilikattomaalin ohjeen mukaan ilman, pinnan ja
      maalin lämpötilan pitää olla yli 10 astetta ja ilman suhteellisen kosteuden alle 80 prosenttia, ja sama
      koskee maalausta seuraavaa yötä. Kuivuminen hidastuu, kun ilma on viileä tai kostea. Nowocoat ilmoittaa
      kuivumisajat 20 asteessa ja 60 prosentin kosteudessa: päälle maalattavissa noin kahden tunnin kuluttua,
      täysin kuiva vuorokaudessa.
    </p>
    <Table
      head={["Sää", "Maalataanko", "Miksi"]}
      rows={[
        ["Pouta, yli 10 °C, kuiva katto", "Kyllä", "Maali tarttuu ja kuivuu"],
        ["Pouta, mutta yö alle 10 °C", "Ei", "Maali ei kuivu yön aikana"],
        ["Kostea ilma yli 80 %", "Ei", "Kuivuminen pysähtyy"],
        ["Sade tai märkä katto", "Ei", "Maali ei tartu märkään tiileen"],
        ["Helle, paahtava katto", "Kyllä, tasaisesti", "Maali kuivuu nopeasti"],
      ]}
      caption="Pinnoitussää tiilikattomaalien tuoteselosteiden mukaan."
    />
    <Avainhuomio>Maalaamme, kun lämpötila on yli 10 astetta myös yöllä ja ilmankosteus alle 80 prosenttia.</Avainhuomio>

    <h2>Miksi katon pitää olla kuiva?</h2>
    <p>
      Pesun jälkeen tiili on täynnä vettä. Maali imeytyy tiileen vain, kun huokoset ovat kuivat. Siksi
      pesun ja maalauksen välissä katto saa kuivua. Kosteus näkyy tiilen värissä: märkä tiili on tummempi.
      Sateella ei maalata, ja sateen jäljet korjaamme ilman lisähintaa. Lue lisää artikkelista{" "}
      <Link to="/artikkelit/sade-pinnoituksen-aikana/">mitä jos sataa pinnoituksen aikana</Link>.
    </p>
    <Avainhuomio>Maali imeytyy vain kuivaan tiileen, joten pesun ja maalauksen välissä katto kuivuu.</Avainhuomio>

    <h2>Miten pinnoituskausi kulkee Pirkanmaalla?</h2>
    <p>
      Kausi alkaa huhti–toukokuussa, kun yöpakkaset ovat ohi ja päivät lämpenevät. Kesä–heinäkuu on kiirein
      aika. Elo–syyskuussa päivät ovat vielä lämpimiä,
      mutta yöt viilenevät, ja silloin seuraamme yölämpötilaa tarkasti. Kauden viimeiset pinnoitukset teemme
      syyskuussa. Kesän ajat täyttyvät keväällä, joten kannattaa tilata ajoissa. Kerromme siitä artikkelissa{" "}
      <Link to="/artikkelit/milloin-tilata-kesan-pinnoitus/">milloin kesän pinnoitus kannattaa tilata</Link>.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-lempaala-punainen-tiilikatto-pinnoitettu"
      ratio="3/4"
      alt="Punainen pinnoitettu tiilikatto Lempäälässä"
      caption="Pinnoitettu tiilikatto Lempäälässä. Työ tehtiin poutajaksolla kesällä 2026."
    />
    <Avainhuomio>Kausi kestää huhti–toukokuusta syyskuuhun, ja syksyllä yölämpötila ratkaisee.</Avainhuomio>

    <h2>Mitä sää tarkoittaa aikataululle?</h2>
    <p>
      Peruskohteen pinnoitus kestää 2–3 päivää. Seuraamme ennustetta ja aloitamme maalauksen, kun edessä on
      riittävä poutajakso. Jos sade siirtää päivää, siitä ei tule lisäkuluja, ja tarjouksen kiinteä hinta
      pitää. Hinta on yleensä 2 850–7 000 euroa. Palvelun esittelemme sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Sää voi siirtää päivää, mutta 2 850–7 000 euron hinta ei muutu.</Avainhuomio>

    <ArticleFaq items={faq} />

    <Sources
      items={[
        {
          label: "Teknos: Kirjo Tile tiilikattomaali, tuoteseloste (luettu 26.10.2026)",
          url: "https://www.teknos.com/document/tds/fi_0510-00_4.pdf",
        },
        {
          label: "NowoCoat: Kattopinnoitteet ammattilaisille, esite 2025 (luettu 26.10.2026)",
          url: "https://rakennusfakta.fi/nowocoat-2025-esite-1420239/tiedosto-files/NowoCoat_Esite_A4_2025.pdf",
        },
      ]}
    />
  </>
);

export default Body;
