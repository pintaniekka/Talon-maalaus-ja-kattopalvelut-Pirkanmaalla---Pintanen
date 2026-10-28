import { Link } from "react-router-dom";
import { merkitse } from "@/components/Rytmi";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

const warningSigns = [
  { sign: "Väri on haalistunut", desc: "tiilen tehdaspinta on kulunut pois, ja tiili alkaa imeä vettä." },
  { sign: "Sammal kasvaa nopeasti", desc: "sammal tarttuu helpoimmin karheaan ja kuluneeseen pintaan." },
  { sign: "Tiiliä on rikki", desc: "vesi on päässyt tiilen sisään ja jäätynyt. Vaihdamme rikkinäiset tiilet uusiin." },
  { sign: "Pinta tuntuu karhealta", desc: "karhea tiili imee vettä jokaisella sateella." },
];

const isoAlku = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * "Miksi tiilikatto kannattaa pinnoittaa ajoissa": sama osio Pirkanmaa-sivulla ja kaikilla pinnoituksen
 * kaupunkisivuilla (SEO-suunnitelma 25.10.2026, vaihe 1). Kaupunkisivulla kaupungin nimi on otsikossa.
 * Ulkoasu 28.10.2026 (Eerik, ehdotus 2): sininen näyttämö. Ensin neljä merkkiä rivissä numeroituina,
 * sitten ennen–jälkeen-kuva ja kaksi selitystä vierekkäin. Tekstit ovat ennallaan.
 */
const PinnoitusWhyNow = ({ cityIn }: { cityIn?: string }) => (
  <section className="section-padding osio">
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

      <h3 className="lohko-otsake text-center mb-6">Merkit, että katto pitää pinnoittaa</h3>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {warningSigns.map((w, i) => (
          <li key={w.sign} className="border-t border-border/60 pt-4">
            <span className="block font-heading text-3xl font-extrabold text-paint-yellow leading-none mb-2" aria-hidden="true">
              0{i + 1}
            </span>
            <strong className="block text-foreground font-heading mb-1">{w.sign}</strong>
            <p className="text-sm text-muted-foreground leading-relaxed">{isoAlku(w.desc)}</p>
          </li>
        ))}
      </ul>

      <div className="grid lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto mt-12">
        <div>
          <BeforeAfterSlider
            className="rounded-3xl"
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

merkitse(PinnoitusWhyNow, "sininen");

export default PinnoitusWhyNow;
