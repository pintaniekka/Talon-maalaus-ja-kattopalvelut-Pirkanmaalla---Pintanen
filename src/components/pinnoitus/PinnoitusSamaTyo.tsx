import { Link } from "react-router-dom";

/**
 * Rinnakkaissanat samalle työlle (SEO-suunnitelma 25.10.2026): asiakkaat hakevat katon pinnoitusta,
 * tiilikaton maalausta, kattomaalausta sekä katon pesua ja pinnoitusta. Google ei yhdistä muotoja itse,
 * joten ne sanotaan H2-tasolla. Tiilimerkit saa mainita (Eerik 25.10.2026).
 */
const PinnoitusSamaTyo = ({ cityIn }: { cityIn?: string }) => (
  <section className="section-padding bg-background">
    <div className="section-container max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-5">
        Tiilikaton maalaus ja pinnoitus tarkoittavat samaa työtä
      </h2>
      <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
        <p>
          Asiakkaat kysyvät meiltä katon pinnoitusta, tiilikaton maalausta ja kattomaalausta{cityIn ? ` ${cityIn}` : ""}. Kaikki
          tarkoittavat samaa työtä. Katto pestään, rikkinäiset tiilet vaihdetaan ja katto maalataan kahteen kertaan Nowocoatin
          kattomaalilla.
        </p>
        <p>
          Tiilikaton pesu ja pinnoitus kuuluvat yhteen. Teemme pesun aina pinnoituksen yhteydessä, ja se on työn ensimmäinen vaihe. Jos tiilen pinta on kulunut,
          pelkkä pesu ei riitä, koska tiili imee vettä heti seuraavalla sateella.
        </p>
        <p>
          Pinnoitamme betonitiilikattoja. Tavallisin tiili 2000-luvun taloissa on Ormax, vanhemmissa katoissa profiileja on monia.
          Katsomme tiilen kuntotarkastuksessa.{" "}
          <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/" className="text-primary font-semibold hover:underline">
            Hintaesimerkit ja laskuri
          </Link>
          .
        </p>
      </div>
    </div>
  </section>
);

export default PinnoitusSamaTyo;
