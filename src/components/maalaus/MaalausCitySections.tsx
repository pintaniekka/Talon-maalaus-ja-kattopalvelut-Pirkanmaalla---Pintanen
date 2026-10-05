import { Link } from "react-router-dom";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ResponsiveImage from "@/components/ResponsiveImage";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

/**
 * Talon maalauksen kaupunkisivujen omat osiot. Pääsivulla (/talon-maalaus-pirkanmaa)
 * on omat, pidemmät tekstinsä: kaupunkisivu ei saa olla pääsivun kopio.
 * Työvaiheet: muistion "työn sanasto" mukaan (homepesu, kaavinta, kuivuminen,
 * paljaiden puukohtien pohjamaalaus, pintamaali pensselillä).
 */

interface CityProps {
  cityName: string;
  cityIn: string;
}

const beforeBase = "keltainen-puutalo-varinvaihto-ennen-maalausta";
const afterBase = "violetti-puutalo-varinvaihto-peittomaalaus-jalkeen";

const signs = [
  {
    sign: "Maali hilseilee",
    desc: "Irtoava maali ei enää suojaa puuta. Sen päälle ei voi maalata, vaan se kaavitaan ensin pois.",
  },
  {
    sign: "Väri on haalistunut",
    desc: "Aurinko kuluttaa maalia. Haalistuminen näkyy ensin aurinkoisilla seinillä.",
  },
  {
    sign: "Maali jää käteen",
    desc: "Pyyhkäise seinää kädellä. Jos käteen jää väriä, maali on kulunut.",
  },
  {
    sign: "Seinässä on tummia pilkkuja",
    desc: "Pilkut ovat hometta tai likaa. Ne eivät peity maalilla, vaan seinä pestään ensin homepesuaineella.",
  },
  {
    sign: "Puu on paljas tai harmaa",
    desc: "Paljas puu on ollut ilman suojaa. Se pohjamaalataan ennen pintamaalia.",
  },
];

export const MaalausCitySigns = ({ cityName, cityIn }: CityProps) => (
  <section className="section-padding bg-accent-light">
    <div className="section-container">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4">
          Mistä tiedät, että talosi {cityIn} pitää maalata?
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Maali suojaa puuta sateelta ja auringolta. Kun maali kuluu, puu alkaa imeä vettä. Kierrä talo ja katso
          seinät läpi. Nämä viisi merkkiä kertovat, että on aika maalata.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
        <div className="lg:sticky lg:top-28">
          <BeforeAfterSlider
            beforeImage={getResponsiveSrc(beforeBase)}
            afterImage={getResponsiveSrc(afterBase)}
            beforeSrcSet={getResponsiveSrcSet(beforeBase)}
            afterSrcSet={getResponsiveSrcSet(afterBase)}
            beforeAlt={`Keltainen puutalo ennen maalausta – ${cityName}`}
            afterAlt={`Sama puutalo violettina maalauksen jälkeen – ${cityName}`}
          />
        </div>

        <div className="space-y-8">
          <ol className="space-y-5">
            {signs.map((s, i) => (
              <li key={s.sign} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-strong text-accent-foreground font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{s.sign}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Miksi maalausta ei kannata lykätä?</h3>
            <p className="text-muted-foreground leading-relaxed">
              Mitä pidempään odotat, sitä enemmän pohjatöitä seinä vaatii. Ajoissa tehty huoltomaalaus on paljon
              halvempi kuin uusi ulkoverhous.
            </p>
          </div>

          <Link
            to="/tarjouspyynto?palvelu=maalaus"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors hover:brightness-110"
            style={{ backgroundColor: "hsl(var(--accent-strong))" }}
          >
            Pyydä ilmainen arviokäynti {cityIn}
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const steps = [
  {
    title: "Ilmainen arviokäynti ja tarjous",
    text: "Eemil tulee katsomaan talon. Hän käy seinät läpi ja katsoo, mitä maalia niissä on ja paljonko pohjatöitä tarvitaan. Saat kirjallisen tarjouksen, jossa on kiinteä hinta.",
  },
  {
    title: "Suojaus",
    text: "Suojaamme ennen työtä esimerkiksi terassit.",
  },
  {
    title: "Homepesu",
    text: "Pesemme seinät homepesuaineella ja harjoilla. Lika ja home lähtevät pois.",
  },
  {
    title: "Kaavinta ja kuivuminen",
    text: "Kaavimme irtoavan maalin pois. Sen jälkeen seinä saa kuivua.",
  },
  {
    title: "Pohjamaalaus",
    text: "Pohjamaalaamme kohdat, joissa puu on paljaana.",
  },
  {
    title: "Pintamaalaus pensselillä",
    text: "Maalaamme seinät pensselillä. Sateella emme maalaa.",
  },
  {
    title: "Lopputarkastus ja takuu",
    text: "Kierrämme talon yhdessä sinun kanssasi ja katsomme työn jäljen. Saat työlle 2 vuoden kirjallisen takuun.",
  },
];

export const MaalausCityProcess = ({ cityIn }: CityProps) => (
  <section className="section-padding bg-secondary">
    <div className="section-container max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 font-heading">
          Näin talon maalaus {cityIn} etenee
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Omakotitalon ulkomaalaus kestää meillä yleensä 3–7 päivää. Aika riippuu talon koosta ja pohjatöiden
          määrästä.
        </p>
      </div>

      <ol className="grid sm:grid-cols-2 gap-4">
        {steps.map((step, i) => (
          <li key={step.title} className="bg-card rounded-xl border border-border/50 p-5 shadow-sm">
            <h3 className="font-bold text-foreground mb-1.5">
              <span className="text-accent-ink">{i + 1}.</span> {step.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>

      <div className="text-center mt-8">
        <Link
          to="/tarjouspyynto?palvelu=maalaus"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors hover:brightness-110"
          style={{ backgroundColor: "hsl(var(--accent-strong))" }}
        >
          Varaa ilmainen arviokäynti
        </Link>
      </div>
    </div>
  </section>
);

const comparisonBase = "keltainen-ulkoverhous-huoltomaalaus-jalkeen";

export const MaalausCityComparison = ({ cityIn }: CityProps) => (
  <section className="section-padding bg-background">
    <div className="section-container">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6">
            Riittääkö huoltomaalaus vai tarvitaanko uusi ulkoverhous?
          </h2>
          <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
            <p>
              Usein huoltomaalaus riittää. Jos puu on kovaa ja ehjää, vanhaa laudoitusta ei tarvitse vaihtaa. Hyvillä
              pohjatöillä ja uudella maalilla seinä kestää taas vuosia.
            </p>
            <p>
              Huoltomaalaus maksaa vain murto-osan uuden ulkoverhouksen hinnasta. Katsomme seinien kunnon
              arviokäynnillä ja kerromme suoraan, mitä ne tarvitsevat.
            </p>
          </div>
          <div className="mt-8">
            <Link
              to="/hintalaskuri?palvelu=maalaus"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-foreground transition-all hover:brightness-95 text-lg"
              style={{ backgroundColor: "hsl(36, 56%, 91%)" }}
            >
              Laske maalauksen hinta
            </Link>
          </div>
        </div>
        <ResponsiveImage
          baseName={comparisonBase}
          cityIn={cityIn}
          className="w-full rounded-2xl shadow-lg"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  </section>
);
