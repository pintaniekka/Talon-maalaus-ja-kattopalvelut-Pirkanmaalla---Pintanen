import { Link } from "react-router-dom";
import { MAALAUS_HINTA } from "@/data/tyovaiheet";
import ResponsiveImage from "@/components/ResponsiveImage";

/**
 * Talotyypit talon maalauksen hub-sivulle (hakutulosanalyysi 26.10.2026, brief 4). Yrityksestä sanotaan vain
 * sivuston omat faktat (tyovaiheet.ts, faqData.ts, UKK); yleiset faktat rintamamiestaloista, hirrestä ja
 * sivellinmaalauksesta on tarkistettu lähteistä, jotka on kirjattu docs/lahteet-talotyypit-2026-10-26.md.
 * Lautojen vaihdosta tai lahosta ei sanota mitään (CLAUDE.md). Kivitalon puuosat (räystäät, ikkunat, kuistit)
 * maalataan (Eerik 27.10.2026). Hirsitaloihin teemme sekä kuullotteen että peittomaalin (Eerik 27.10.2026).
 * Hinta vain haarukkana ja linkkinä hintasivulle.
 */
const talotyypit: { title: string; kuva?: { base: string; alt: string }; paragraphs: string[] }[] = [
  {
    title: "Puutalo ja rintamamiestalo",
    kuva: { base: "talon-maalaus-orivesi-rintamamiestalo-paaty-jalkeen", alt: "Rintamamiestalon pääty maalauksen jälkeen, Orivesi" },
    paragraphs: [
      "Rintamamiestalot rakennettiin 1940- ja 1950-luvuilla. Ne ovat 1,5-kerroksisia harjakattoisia taloja, ja seinissä on usein pystylaudoitus. Korkea pääty vaatii telineet tai nostimen, ja ne kuuluvat hintaan.",
      "Vanhassa talossa pohjatyöt ratkaisevat, kuinka pitkään maali kestää. Pesemme seinät homepesuaineella ja harjoilla, kaavimme irtoavan maalin ja pohjamaalaamme paljaat kohdat. Pintamaalin maalaamme pensselillä, pääsääntöisesti Tikkurilan ulkomaalilla.",
      "Arviokäynnillä katsomme, mitä maalia seinässä on, ja valitsemme uuden maalin sen mukaan.",
    ],
  },
  {
    title: "Hirsitalo",
    kuva: { base: "talon-maalaus-virrat-hirsimokki-paaty-jalkeen", alt: "Hirsitalon pääty maalauksen jälkeen, Virrat" },
    paragraphs: [
      "Hirsi elää kosteuden mukana enemmän kuin paneeli. Siksi hirsipintaan suositellaan talomaalin sijasta kuullotetta tai peittosuojaa, jotka ovat ohuempia ja hengittävämpiä. Kuullotteen väripigmentit suojaavat auringolta ja estävät puun harmaantumisen, joten väritöntä kuullotetta ei suositella ulos.",
      "Teemme hirsitaloihin sekä kuullotteen että peittomaalin. Työvaiheet ovat samat kuin muissa puutaloissa: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintakäsittely pensselillä. Vanhaan pintaan kannattaa valita sama tuotetyyppi kuin ennen. Katsomme sen arviokäynnillä.",
    ],
  },
  {
    title: "Mökki ja piharakennukset",
    kuva: { base: "talon-maalaus-orivesi-hirsimokki-terassi-jalkeen", alt: "Hirsimökki ja terassi maalauksen jälkeen, Orivesi" },
    paragraphs: [
      "Maalaamme myös mökit, autotallit ja autokatokset. Työvaiheet ovat samat kuin talossa, ja hinta riippuu koosta.",
      "Matkasta ei tule lisäkulua, ja maalaamme myös kauempana Tampereelta. Katon ja seinät samalla kertaa saat edullisempana pakettihintana.",
    ],
  },
  {
    title: "Kivitalon puuosat",
    kuva: { base: "tiilikaton-pinnoitus-tampere-tiilitalo-jalkeen", alt: "Tiilitalo, jonka ruskeat puuosat maalattiin harmaiksi ja katto pinnoitettiin, Tampere" },
    paragraphs: [
      "Kivitalossa maalattavaa ovat räystäät, ikkunat ja kuistit. Maalaamme ne samoilla työvaiheilla: pesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä.",
      "Hinta riippuu puuosien määrästä ja kunnosta. Arviokäynnillä katsomme, mitä maalia pinnassa on, ja annamme kirjallisen tarjouksen.",
    ],
  },
];

const MaalausTalotyypit = () => (
  <section className="section-padding osio">
    <div className="section-container">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4">Millaisia taloja maalaamme?</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Maalaamme puutalojen ulkoseinät ja kivitalojen puuosat. Talotyyppi vaikuttaa pohjatöihin ja maalin valintaan, mutta
          työvaiheet ovat samat: homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {talotyypit.map((t) => (
          <div key={t.title} className="kortti overflow-hidden">
            {/* Kuva kortin yläreunassa (kuvasuunnitelma 28.10.2026). Kivitalon puuosat: Tampereen tiilitalo, jonka ruskeat puuosat maalattiin harmaiksi (Eerik 28.10.2026). */}
            {t.kuva && (
              <ResponsiveImage
                baseName={t.kuva.base}
                alt={t.kuva.alt}
                className="aspect-[16/9] w-full object-cover"
                sizes="(max-width: 768px) 100vw, 500px"
                width={800}
                height={450}
              />
            )}
            <div className="p-6 md:p-8">
            <h3 className="font-heading text-xl md:text-2xl font-extrabold text-navy mb-3">{t.title}</h3>
            <div className="space-y-3">
              {t.paragraphs.map((p) => (
                <p key={p} className="text-muted-foreground leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center mt-8 text-muted-foreground max-w-3xl mx-auto">
        Hinta on yleensä <strong className="text-foreground">{MAALAUS_HINTA}</strong> talon koon, korkeuden ja pohjatöiden mukaan. Puutalo
        maalataan yleensä 10–15 vuoden välein. Hintaesimerkit koon mukaan:{" "}
        <Link to="/talon-maalaus-hinta-pirkanmaa/" className="text-primary font-semibold hover:underline">
          talon maalauksen hinta
        </Link>
        . Lue myös{" "}
        <Link to="/artikkelit/kuinka-usein-puutalo-maalataan/" className="text-primary font-semibold hover:underline">
          kuinka usein puutalo maalataan
        </Link>
        .
      </p>
    </div>
  </section>
);

export default MaalausTalotyypit;
