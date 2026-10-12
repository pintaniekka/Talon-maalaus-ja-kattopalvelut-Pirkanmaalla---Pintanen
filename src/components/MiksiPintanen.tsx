import ResponsiveImage from "./ResponsiveImage";
import { TOIMINTA_ALUE } from "@/data/company";

const sideBase = "puutalon-katon-ja-seinien-maalaus-tampere";

/** Etusivun "Miksi Pintanen?" lyhennettynä puoleen (8.3, S32). Vain yksi lihavointi (tarkastus 12.10.2026). */
const MiksiPintanen = () => {
  return (
    <section className="section-padding bg-accent-light">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="heading-style text-3xl md:text-4xl text-accent-ink mb-6 leading-tight">Miksi Pintanen?</h2>

            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Me olemme veljekset Eerik ja Eemil. <strong>Teemme työt itse</strong>: tulemme katsomaan kohteen, annamme kiinteän
                hinnan ja hoidamme työn alusta loppuun. Ei välikäsiä.
              </p>
              <p>
                Eerik pinnoittaa tiilikatot: pesu painepesulla ja maalaus ruiskulla kahteen kertaan. Eemil maalaa talojen ulkoseinät:
                homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä.
              </p>
              <p>
                Teemme omakotitalojen, paritalojen ja mökkien ulkotyöt {TOIMINTA_ALUE}. Arviokäynti on ilmainen. Pinnoitukselle annamme 5
                vuoden ja maalaukselle 2 vuoden takuun.
              </p>
              <p className="font-semibold text-primary">– Eerik &amp; Eemil</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden">
            <ResponsiveImage
              baseName={sideBase}
              alt="Pintasen maalaama puutalo Tampereella: sekä tiilikatto että seinät maalattu"
              className="w-full h-full object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 600px"
              width={1200}
              height={1600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiksiPintanen;
