import { Link } from "react-router-dom";
import ResponsiveImage from "@/components/ResponsiveImage";

/**
 * Harjatiiviste palveluna pinnoitussivulla (Eerik 29.10.2026: "harjatiiviste tiilikaton pinnoituksen alle
 * palveluna"). Faktat: tyovaiheet.ts (saumat ja harja tarkistetaan kuntotarkastuksessa), projects.ts
 * (asennus Kangasalla 2026), Eerik 27.10.2026 (lisähintainen työ). Hinnat sivulla /harjatiivisteen-asennus/.
 */
const HarjatiivisteNosto = () => (
  <section className="section-padding osio">
    <div className="section-container">
      <div className="kortti mx-auto grid max-w-5xl overflow-hidden md:grid-cols-[1.1fr_1fr]">
        <ResponsiveImage
          baseName="tiilikaton-pinnoitus-kangasala-harjatiivisteen-asennus"
          alt="Harjatiivisteen asennus tiilikaton harjalle, Kangasala"
          className="aspect-[4/3] h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, 520px"
          width={800}
          height={600}
        />
        <div className="flex flex-col justify-center p-6 md:p-10">
          <span className="lohko-otsake mb-3">Lisäpalvelu</span>
          <h2 className="mb-3 font-heading text-2xl font-bold text-navy md:text-3xl">Harjatiiviste pinnoituksen yhteydessä</h2>
          <p className="text-muted-foreground leading-relaxed">
            Harjatiiviste on nauha harjatiilen alla. Se pitää tuiskulumen, veden ja roskat poissa aluskatteelta, mutta päästää ilman
            läpi. Tarkistamme harjan jokaisessa kuntotarkastuksessa ja asennamme tiivisteen tarvittaessa pinnoituksen yhteydessä.
            Hinta lasketaan harjan pituuden mukaan.
          </p>
          <Link to="/harjatiivisteen-asennus/" className="mt-5 inline-flex items-center font-semibold text-primary hover:underline">
            Harjatiivisteen asennus ja hinta
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default HarjatiivisteNosto;
