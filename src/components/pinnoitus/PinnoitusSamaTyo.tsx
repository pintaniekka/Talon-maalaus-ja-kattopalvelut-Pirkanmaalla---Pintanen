import { Link } from "react-router-dom";

/**
 * Rinnakkaissanat samalle työlle (SEO-suunnitelma 25.10.2026): asiakkaat hakevat katon pinnoitusta,
 * tiilikaton maalausta, kattomaalausta sekä katon pesua ja pinnoitusta. Google ei yhdistä muotoja itse,
 * joten ne sanotaan H2-tasolla. Tiilimerkit saa mainita (Eerik 25.10.2026). Hintasivun linkin ankkuri vaihtelee
 * paikkakunnan mukaan (Eerik 26.10.2026, yöajon kysymys 14), jotta sama teksti ei toistu 24 sivulla.
 * Tekstipalsta (28.10.2026): kapea palsta ja sivussa yksi fakta, jotta pitkä teksti pysyy luettavana.
 */
const PinnoitusSamaTyo = ({ cityIn }: { cityIn?: string }) => (
  <section className="section-padding osio">
    <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,42rem)_16rem] lg:justify-center lg:gap-16 items-start">
      <div>
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
          Katsomme tiilen{" "}
          <Link to="/ilmainen-kuntotarkastus/" className="text-primary font-semibold hover:underline">
            ilmaisessa kuntotarkastuksessa
          </Link>
          .{" "}
          <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/" className="text-primary font-semibold hover:underline">
            {cityIn ? `Katso tiilikaton pinnoituksen hinta ${cityIn}` : "Hintaesimerkit ja laskuri"}
          </Link>
          .
        </p>
      </div>
      </div>
      <aside className="border-t-2 border-navy pt-4" aria-label="Maali">
        <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Maali</span>
        <span className="block font-heading text-3xl font-extrabold text-accent-ink mt-1">Nowocoat</span>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Katto maalataan kahteen kertaan: pohjamaali ja pintamaali.</p>
      </aside>
    </div>
  </section>
);

export default PinnoitusSamaTyo;
