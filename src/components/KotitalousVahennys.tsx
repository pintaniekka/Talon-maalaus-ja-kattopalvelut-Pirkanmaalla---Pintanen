import { Link } from "react-router-dom";
import { Euro } from "@/components/icons/BrandIcons";
import { KOTITALOUSVAHENNYS } from "@/data/company";

/**
 * Kotitalousvähennys yhdellä lauseella (korjaus 9, V11). Esimerkkilaskelma poistettu:
 * sääntö kieltää laskuesimerkit, ja vanha esimerkki ei huomioinut omavastuuta.
 */
const KotitalousVahennys = () => {
  return (
    <section className="section-padding bg-accent-light">
      <div className="section-container">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Euro className="w-8 h-8 text-accent-ink" />
          </div>
          <h2 className="heading-style text-3xl md:text-4xl text-accent-ink mb-4">Työn osuudesta saat kotitalousvähennyksen</h2>
          <p className="text-lg text-muted-foreground">{KOTITALOUSVAHENNYS}</p>
          <p className="text-muted-foreground mt-3">
            Erittelemme työn osuuden laskuun, joten vähennyksen hakeminen on helppoa. Lue lisää artikkelista{" "}
            <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/" className="text-accent-ink underline font-medium">
              kotitalousvähennys katto- ja maalaustöissä
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default KotitalousVahennys;
