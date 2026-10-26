import ResponsiveImage from "./ResponsiveImage";
import { TOIMINTA_ALUE } from "@/data/company";

const sideBase = "talon-maalaus-ja-tiilikaton-pinnoitus-tampere-puutalo-jalkeen";

/** Etusivun "Miksi Pintanen?" lyhennettynä puoleen (8.3, S32). Vain yksi lihavointi (tarkastus 12.10.2026). */
const MiksiPintanen = () => {
  return (
    <section className="section-padding bg-background">
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
                Eerik pinnoittaa tiilikatot ja Eemil maalaa talojen ulkoseinät. Teemme omakotitalojen, paritalojen ja mökkien ulkotyöt{" "}
                {TOIMINTA_ALUE}. Takuu: pinnoitus 5 vuotta, maalaus 2 vuotta.
              </p>
              <p>
                Katolle käytämme Nowocoatin kattomaalia ja seiniin pääsääntöisesti Tikkurilan maaleja. Pinnoitettu katto
                kestää jopa 15 vuotta pidempään, ja työn osuudesta saat kotitalousvähennyksen.
              </p>
              <p className="font-semibold text-primary">– Eerik &amp; Eemil</p>
            </div>
          </div>

          <div className="kortti-a overflow-hidden">
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
