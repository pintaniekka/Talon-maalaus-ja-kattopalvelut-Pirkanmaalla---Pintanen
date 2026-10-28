import { Link } from "react-router-dom";
import { Search } from "@/components/icons/BrandIcons";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

const warningSigns = [
  { sign: "Väri on haalistunut", desc: "tiilen tehdaspinta on kulunut pois, ja tiili alkaa imeä vettä." },
  { sign: "Sammal kasvaa nopeasti", desc: "sammal tarttuu helpoimmin karheaan ja kuluneeseen pintaan." },
  { sign: "Tiiliä on rikki", desc: "vesi on päässyt tiilen sisään ja jäätynyt. Vaihdamme rikkinäiset tiilet uusiin." },
  { sign: "Pinta tuntuu karhealta", desc: "karhea tiili imee vettä jokaisella sateella." },
];

/**
 * "Miksi tiilikatto kannattaa pinnoittaa ajoissa": sama osio Pirkanmaa-sivulla ja kaikilla pinnoituksen
 * kaupunkisivuilla (SEO-suunnitelma 25.10.2026, vaihe 1). Kaupunkisivulla kaupungin nimi on otsikossa.
 */
const PinnoitusWhyNow = ({ cityIn }: { cityIn?: string }) => (
  <section className="section-padding osio-sininen viisto-ala">
    <div className="section-container">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4">
          Miksi tiilikatto kannattaa pinnoittaa ajoissa{cityIn ? ` ${cityIn}` : ""}?
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Moni tiilikatto näyttää kaukaa hyvältä, vaikka tiilen tehdaspinta on jo kulunut pois. Kun pinta kuluu, tiili alkaa imeä
          vettä. Talvella vesi jäätyy ja rikkoo tiilen. Uusi maalipinta pitää veden tiilen ulkopuolella.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
        <div className="lg:sticky lg:top-28">
          <BeforeAfterSlider
            beforeImage={getResponsiveSrc("tiilikaton-pesu-ja-pinnoitus-likainen-tiilikatto-ennen")}
            afterImage={getResponsiveSrc("tiilikaton-pinnoitus-uudenveroinen-punainen-tiilikatto-jalkeen")}
            beforeSrcSet={getResponsiveSrcSet("tiilikaton-pesu-ja-pinnoitus-likainen-tiilikatto-ennen")}
            afterSrcSet={getResponsiveSrcSet("tiilikaton-pinnoitus-uudenveroinen-punainen-tiilikatto-jalkeen")}
            beforeAlt="Likainen tiilikatto ennen pesua"
            afterAlt="Punainen tiilikatto maalauksen jälkeen"
          />
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">Pakkasrapautuminen rikkoo kuluneen tiilen</h3>
            <p className="text-muted-foreground leading-relaxed">
              Suomen talvessa tiili jäätyy ja sulaa kymmeniä kertoja. Kun vesi on imeytynyt tiileen, jää laajenee ja murentaa
              tiiltä sisältäpäin. Tiili halkeilee, ja lopulta vesi pääsee aluskatteelle. Pinnoituksen jälkeen tiili ei ime vettä, eikä sammal saa otetta.
            </p>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">Pesu ei riitä, jos tiilen pinta on kulunut</h3>
            <p className="text-muted-foreground leading-relaxed">
              Sammal ja jäkälä pitävät katon märkänä. Pesu poistaa kasvuston, mutta kulunut pinta imee vettä, vaikka katto olisi
              juuri pesty. Kulunut pinta pitää maalata.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-accent-ink" />
              Merkit, että katto pitää pinnoittaa
            </h4>
            <ul className="space-y-3">
              {warningSigns.map((w) => (
                <li key={w.sign} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  <span className="text-muted-foreground">
                    <strong className="text-foreground">{w.sign}:</strong> {w.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/tarjouspyynto/?palvelu=pinnoitus"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-heading font-extrabold bg-paint-yellow text-paint-yellow-foreground transition-colors hover:bg-paint-yellow-hover"
          >
            Pyydä ilmainen kuntotarkastus
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default PinnoitusWhyNow;
