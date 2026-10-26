import { Link } from "react-router-dom";
import { ArticleFaq, Avainhuomio, Figure, KeyPoints } from "@/components/article/ArticleKit";

/**
 * Vain omat syyt (CLAUDE.md "Miksi Pintanen": yrittäjä tekee työn itse, kokemus ja työnjälki itse tekijällä, kilpailukykyinen
 * hinta, maalia aina tarpeeksi, Eerik vastaa lopputuloksesta; kilpailijoista ei väitetä mitään). Luvut company.ts LUVUT (yli 130
 * pinnoitettua kattoa, yli 200 kohdetta, yli 5 vuotta, Google 5,0 / 5), authors.ts (Eerik on mukana jokaisessa kattotyössä itse),
 * tamperelainen yritys. Meistä-sivulle ei lisätä mitään uutta: tämä on artikkeli.
 */
const faq = [
  {
    question: "Kuka pinnoittaa kattoni?",
    answer: "Eerik Pitkänen. Hän tekee kuntotarkastuksen, tarjouksen ja työn itse ja on mukana jokaisessa kattotyössä.",
  },
  {
    question: "Käytättekö alihankkijoita?",
    answer: "Katolla on Eerik itse. Hän vastaa lopputuloksesta, ja hänelle soitat, jos jokin askarruttaa työn jälkeen.",
  },
  {
    question: "Montako kattoa olette pinnoittaneet?",
    answer: "Yli 130 tiilikattoa Pirkanmaalla ja lähikunnissa. Kohteita on yhteensä yli 200, kun seinät lasketaan mukaan.",
  },
  {
    question: "Mistä olette?",
    answer: "Olemme tamperelainen yritys. Toimimme Pirkanmaalla ja lähikunnissa, eikä matkasta tule lisäkulua.",
  },
];

const Body = () => (
  <>
    <KeyPoints>
      <ul>
        <li>Eerik tekee kuntotarkastuksen, tarjouksen ja pinnoituksen itse.</li>
        <li>Kokemus ja työnjälki ovat tekijällä: yli 130 pinnoitettua kattoa.</li>
        <li>Maalia käytetään aina tarpeeksi, ja Eerik vastaa lopputuloksesta.</li>
        <li>Hinta on kilpailukykyinen, yleensä 2 850–7 000 euroa, ja takuu 5 vuotta.</li>
      </ul>
    </KeyPoints>

    <p>
      Kun tilaat katon pinnoituksen, tilaat tekijän. Kerromme tässä, kuka kattosi tekee, miksi se on meillä
      sama henkilö alusta loppuun ja mitä se tarkoittaa sinulle.
    </p>

    <h2>Kuka on katolla?</h2>
    <p>
      Eerik Pitkänen. Hän tulee kuntotarkastukseen, tekee tarjouksen, pesee katon, vaihtaa tiilet ja maalaa
      katon kahteen kertaan. Sama ihminen, joka lupasi sinulle hinnan ja jäljen, on katolla tekemässä sitä.
      Eerik on mukana jokaisessa Pintasen kattotyössä itse. Hänen numeronsa on sivulla yhteystiedot.
    </p>
    <Figure
      image="tiilikaton-pinnoitus-tampere-eerik-pitkanen-katolla"
      alt="Eerik Pitkänen tiilikatolla Tampereella"
      caption="Eerik katolla Tampereella 2026."
    />
    <Avainhuomio>Sama henkilö tekee kuntotarkastuksen, tarjouksen ja työn, ja hänet tavoitat suoraan.</Avainhuomio>

    <h2>Miksi tekijä ratkaisee pinnoituksessa?</h2>
    <p>
      Pinnoitus on käsityötä, vaikka maali tulee ruiskusta. Pesun huolellisuus, rikkinäisten tiilien
      löytäminen, ruiskun tasainen kuljetus ja reunojen maalaus käsin ratkaisevat, kestääkö pinta jopa 15
      vuotta vai alkaako se hilseillä muutamassa vuodessa. Kokemus ja työnjälki ovat tekijällä. Yli 130 kattoa
      opettaa, mistä katto vuotaa ja mihin ruisku ei yllä. Työvaiheet kerromme artikkelissa{" "}
      <Link to="/artikkelit/tiilikaton-pinnoituksen-tyovaiheet/">näin tiilikaton pinnoitus etenee</Link>.
    </p>
    <Avainhuomio>Yli 130 pinnoitettua kattoa on kokemus, joka on katolla joka työssä.</Avainhuomio>

    <h2>Miksi maalia käytetään aina tarpeeksi?</h2>
    <p>
      Koska ohut kerros kuluu ensimmäisenä puhki. Maalaamme katon aina kahteen kertaan, ja Nowocoatin
      riittoisuus 2–3 neliötä litralla on laskettu kahdelle kerrokselle. Maali kuuluu hintaan, joten sitä ei
      säästellä. Kahden kerroksen syyt kerromme artikkelissa{" "}
      <Link to="/artikkelit/kaksi-maalikerrosta-tiilikatto/">miksi maalaamme katon kahteen kertaan</Link>.
    </p>
    <Avainhuomio>Kaksi kerrosta ja riittävästi maalia kuuluvat hintaan, koska ohut pinta ei kestä.</Avainhuomio>

    <h2>Mitä Eerikin vastuu tarkoittaa sinulle?</h2>
    <p>
      Kiinteää hintaa, joka pitää. Lopputarkastusta, jossa kierrätte katon yhdessä. Kirjallista 5 vuoden
      takuuta, jonka takana on tekijä itse. Ja suoraa puhetta: jos katto ei kannata pinnoittaa, Eerik sanoo
      sen kuntotarkastuksessa. Olemme tamperelainen yritys, ja Google-arviomme on 5,0 / 5. Arviot ovat sanasta
      sanaan sivulla <Link to="/kokemuksia/">kokemuksia</Link>, ja meistä kerromme sivulla{" "}
      <Link to="/meista/">meistä</Link>. Palvelun esittelemme sivulla{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa/">tiilikaton pinnoitus Pirkanmaalla</Link>.
    </p>
    <Avainhuomio>Kiinteä hinta, yhteinen lopputarkastus ja 5 vuoden takuu ovat tekijän oma lupaus.</Avainhuomio>

    <ArticleFaq items={faq} />
  </>
);

export default Body;
