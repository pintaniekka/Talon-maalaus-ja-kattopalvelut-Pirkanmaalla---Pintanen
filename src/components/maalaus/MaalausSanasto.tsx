import { Link } from "react-router-dom";
import MaaliMerkki from "@/components/MaaliMerkki";

/**
 * Rinnakkaissanat samalle työlle (SEO-suunnitelma 25.10.2026) ja kohteet asiakkaiden omilla sanoilla
 * (asiakasviestit 17.3.–19.10.2026: omakotitalo, rintamamiestalo, paritalo, mökki, autotalli).
 * "Julkisivumaalaus" putosi hauista, kun sana katosi sivuilta; nyt se on H2-tasolla joka kaupunkisivulla.
 */
const MaalausSanasto = ({ cityIn }: { cityIn?: string }) => (
  <section className="section-padding osio">
    <div className="section-container grid gap-10 lg:grid-cols-[minmax(0,42rem)_16rem] lg:justify-center lg:gap-16 items-start">
      <div>
      <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-5">
        Ulkomaalaus, julkisivumaalaus ja huoltomaalaus{cityIn ? ` ${cityIn}` : ""}
      </h2>
      <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
        <p>
          Talon maalaus, ulkomaalaus, julkisivumaalaus ja huoltomaalaus tarkoittavat samaa työtä. Seinät pestään homepesuaineella,
          irtoava maali kaavitaan, paljaat kohdat pohjamaalataan ja pintamaali maalataan pensselillä.
        </p>
        <p>
          Maalaamme puutalojen ulkoseinät: omakotitalot, rintamamiestalot, hirsitalot, paritalot, mökit ja piharakennukset, kuten
          autotallit ja autokatokset. Katon ja seinät samalla kertaa saat edullisempana pakettihintana.{" "}
          <Link to="/talon-maalaus-hinta-pirkanmaa/" className="text-primary font-semibold hover:underline">
            Hintaesimerkit ja laskuri
          </Link>
          .
        </p>
      </div>
      </div>
      <MaaliMerkki merkki="tikkurila" teksti="Pintamaali pensselillä, ei ruiskulla. Paljaat kohdat pohjamaalataan." />
    </div>
  </section>
);

export default MaalausSanasto;
