import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints, Table } from "@/components/article/ArticleKit";

/**
 * Yrityksen faktat sivuston omia: tyovaiheet.ts ja CLAUDE.md (saumat, piipun ympärys, läpiviennit ja aluskate tarkistetaan
 * aina), faqData.ts. Pellitysten korjauksesta ei luvata mitään: sitä ei ole sivustolla, joten sanotaan vain, että kerromme
 * havainnot ja ne kirjataan tarjoukseen. Yleiset faktat: K-Rauta tiilikaton asennus (26.10.2026): tiivisteet takaavat tiiviyden.
 */
const faq = [
  {
    question: "Mitä läpiviennit ovat?",
    answer: "Kohtia, joissa jokin menee katon läpi: piippu, ilmanvaihtoputket, viemärin tuuletusputki, antenni ja kattoluukku.",
  },
  {
    question: "Miksi tarkistatte läpiviennit ennen pinnoitusta?",
    answer:
      "Läpivienti on katon yleisin vuotokohta. Jos tiiviste tai pellitys on auki, katto vuotaa pinnoituksen jälkeenkin. Siksi katsomme ne kuntotarkastuksessa ja kerromme, mitä näemme.",
  },
  {
    question: "Maalataanko läpiviennit ja pellit?",
    answer: "Tiilet maalataan läpivientien ympäriltä käsin tai telalla. Pellitykset ja läpivientikappaleet suojataan tai maalataan sopimuksen mukaan, ja se kirjataan tarjoukseen.",
  },
  {
    question: "Mitä jos piipun pellitys on huono?",
    answer: "Kerromme sen kuntotarkastuksessa. Pinnoitus ei korjaa pellitystä, joten se kannattaa hoitaa ennen maalausta tai sen yhteydessä.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Läpivienti on kohta, jossa piippu, putki, antenni tai luukku menee katon läpi.</li>
        <li>Läpiviennit ja piipun ympärys ovat katon yleisimmät vuotokohdat.</li>
        <li>Tarkistamme ne jokaisessa kuntotarkastuksessa yhdessä saumojen ja aluskatteen kanssa.</li>
        <li>Pinnoitus ei korjaa pellitystä, joten havainnot kerrotaan ja kirjataan tarjoukseen.</li>
      </ul>
    </KeyPoints>

    <p>
      Tiilikatto vuotaa harvoin keskeltä lapetta. Se vuotaa sieltä, missä jokin menee katon läpi. Kerromme
      tässä, mitä läpiviennit ovat, miksi katsomme ne ennen pinnoitusta ja mitä niille tehdään.
    </p>

    <h2>Mitkä ovat tiilikaton läpiviennit?</h2>
    <Table
      head={["Läpivienti", "Mitä katsomme", "Yleinen vika"]}
      rows={[
        ["Piippu", "Pellitykset, juuren tiivistys, piipun hattu", "Irronnut tai ruostunut pelti, avoin sauma"],
        ["Ilmanvaihtoputket", "Läpivientikappale ja tiiviste", "Haurastunut tiiviste, putki kallellaan"],
        ["Viemärin tuuletusputki", "Tiiviste ja korkeus", "Tiiviste halki"],
        ["Antenni ja lautasantenni", "Kiinnitys ja tiivistys", "Kiinnitetty tiilen läpi ilman tiivistettä"],
        ["Kattoluukku", "Kehys ja pellitys", "Pellitys päästää veden tiilien alle"],
        ["Aurinkopaneelien kiinnikkeet", "Kiinnitys ruoteisiin ja tiivistys", "Rikkinäinen tiili kiinnikkeen alla"],
      ]}
      caption="Tiilikaton läpiviennit ja mitä niistä katsomme kuntotarkastuksessa."
    />
    <Avainhuomio>Kuusi läpivientityyppiä tarkistetaan aina, ja piippu on niistä yleisin vuotokohta.</Avainhuomio>

    <h2>Miksi piipun ympärys vuotaa useimmin?</h2>
    <p>
      Piippu on katon suurin läpivienti, ja sen yläpuolelle kertyy vettä, lunta ja roskia. Pellitys ohjaa
      veden piipun ohi tiilien päälle. Kun pelti ruostuu, sauma aukeaa tai tiivistys haurastuu, vesi valuu
      piipun juurta pitkin aluskatteelle ja siitä rakenteisiin. Jälki näkyy usein ensin ullakolla piipun
      vieressä. Siksi katsomme piipun ympäryksen joka kerta ja kerromme suoraan, jos pellitys tarvitsee työtä.
    </p>
    <Avainhuomio>Piipun pellitys ohjaa veden tiilien päälle, ja sen pettäminen näkyy ensin ullakolla.</Avainhuomio>

    <h2>Mitä läpivienneille tehdään pinnoituksessa?</h2>
    <p>
      Pinnoitus on tiilen pinnan maalaus. Tiilet läpivientien ympärillä pestään ja maalataan käsin tai telalla,
      koska ruisku ei yllä niihin siististi. Pellitykset ja läpivientikappaleet suojataan tai maalataan sen
      mukaan, mitä sovimme, ja se kirjataan tarjoukseen. Jos tiiviste tai pellitys on rikki, pinnoitus ei korjaa
      sitä. Kerromme sen kuntotarkastuksessa, jotta voit hoitaa asian ennen maalausta tai sen yhteydessä.
      Kuntotarkastuksen koko listan kerromme artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-kuntotarkastus-mita-tarkistamme/">tiilikaton kuntotarkastus</Link>.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-pirkkala-tummanharmaa-tiilikatto-jalkeen"
      alt="Tummanharmaa tiilikatto pinnoituksen jälkeen Pirkkalassa"
      caption="Pinnoitettu tiilikatto Pirkkalassa. Läpivientien ympärys maalataan käsin."
    />
    <Avainhuomio>Läpivientien ympärys maalataan käsin, ja pellitysten kunto kerrotaan ennen tarjousta.</Avainhuomio>

    <h2>Mitä voit tarkistaa itse?</h2>
    <ul>
      <li>Katso ullakolta piipun ja putkien ympäriltä, näkyykö vesijälkiä tai valoa.</li>
      <li>Katso maasta kiikarilla, ovatko pellit paikoillaan ja onko piipun hattu ehjä.</li>
      <li>Jos katolle on asennettu antenni tai paneelit jälkikäteen, kerro se meille.</li>
    </ul>
    <p>
      Kuntotarkastus on ilmainen, ja tulemme yleensä samalla viikolla. Pinnoitus maksaa yleensä 2 850–7 000
      euroa. Kevään tarkistuslistan kerromme artikkelissa{" "}
      <Link to="/artikkelit/kevattarkistus-tiilikatto-maasta-kasin/">kevättarkistus maasta käsin</Link>, ja
      palvelun esittelemme sivulla <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Ullakon vilkaisu ja kiikari kertovat läpivientien tilan, ja kuntotarkastus on ilmainen.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
