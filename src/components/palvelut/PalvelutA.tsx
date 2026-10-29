import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PalveluKortti from "@/components/PalveluKortti";
import { PALVELUKORTTI_KUVAT } from "@/data/palvelukortit";
import {
  LINKIT,
  PAKETTI_KYSYMYS,
  PAKETTI_VASTAUS,
  PALVELUT_INTRO,
  palvelut,
  type PalveluKey,
} from "./palvelutData";

/** Kortin kuvaus: sama työ kuin palvelusivuilla. Suojaus: terassit ja ympäristö (src/data/prices.ts, includes). */
const kuvaukset: Record<PalveluKey, string> = {
  pinnoitus: "Pesemme katon painepesulla, vaihdamme rikkinäiset tiilet ja maalaamme katon ruiskulla kahteen kertaan.",
  maalaus: "Homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Terassit ja ympäristö suojataan.",
};

/** Kortin keltainen yläotsake ja napin teksti (Eerik 29.10.2026, malli B). */
const korttiTekstit: Record<PalveluKey, { tekija: string; cta: string }> = {
  pinnoitus: { tekija: "Eerik", cta: "Katso pinnoitus" },
  maalaus: { tekija: "Eemil", cta: "Katso maalaus" },
};

/**
 * Vaihtoehto A (?palvelut=a), hiottu 13.10.2026 Eerikin palautteen mukaan ("A on raikkain, mutta vaatii parannusta").
 * Eerik 29.10.2026: kortit vaihdettiin tummansiniseen PalveluKortti-korttiin (malli B, sama kuin aluesivuilla),
 * jossa kuva leikkautuu vinosti, luvut ovat keltaisia ja alla on keltainen nappi. Koko kortti on yksi linkki
 * (Eerik 14.10.2026). Alla tummansininen pakettihintapalkki hintasivun laskurinoston tyyliin.
 */
const PalvelutA = () => (
  <section id="palvelut" className="section-padding osio">
    <div className="section-container max-w-6xl">
      <div className="mb-9 grid gap-4 md:grid-cols-2 md:items-end md:gap-12">
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-3">
            <span className="h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
            <span className="font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-accent-ink md:text-[13px]">
              Palvelumme
            </span>
          </div>
          <h2 className="heading-style text-3xl leading-[1.1] text-foreground md:text-4xl">Katot ja seinät.</h2>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground md:mb-1.5 md:text-lg">{PALVELUT_INTRO}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {palvelut.map((p) => (
          <PalveluKortti
            key={p.key}
            href={p.href}
            title={p.title}
            description={kuvaukset[p.key]}
            price={p.hinta}
            warranty={p.takuu}
            duration={p.kesto}
            image={PALVELUKORTTI_KUVAT[p.key]}
            tekija={korttiTekstit[p.key].tekija}
            cta={korttiTekstit[p.key].cta}
          />
        ))}
      </div>

      {/* Suorat linkit Tampereen palvelusivuille (kannibalisointi, Search Console 26.10.2026): etusivu ohjaa
          tärkeimmän kaupungin hakuihin tarkalla ankkurilla. */}
      <p className="mt-6 text-center text-base text-muted-foreground">
        Tampereella:{" "}
        <Link to="/tiilikaton-pinnoitus-tampere/" className="font-bold text-accent-ink hover:underline underline-offset-4">
          Tiilikaton pinnoitus Tampere
        </Link>
        <span className="mx-2 text-accent/60" aria-hidden="true">
          ·
        </span>
        <Link to="/talon-maalaus-tampere/" className="font-bold text-accent-ink hover:underline underline-offset-4">
          Talon maalaus Tampere
        </Link>
      </p>

      {/* Pakettihinta sinisenä palkkina, sama liukuväri kuin sinisillä näyttämöillä (Eerik 29.10.2026: tummansiniset
          kortit yllä, joten palkki siniseksi). */}
      <div className="mt-8 flex flex-col gap-5 overflow-hidden rounded-3xl bg-[linear-gradient(115deg,hsl(203_100%_43%),hsl(202_100%_57%))] px-6 py-6 text-white shadow-xl sm:flex-row sm:items-center sm:justify-between md:px-9 md:py-7">
        <div className="flex flex-col gap-1">
          <p className="font-heading text-xl font-extrabold leading-tight md:text-2xl">{PAKETTI_KYSYMYS}</p>
          <p className="text-base text-white/90">{PAKETTI_VASTAUS} Sovitaan siitä arviokäynnillä.</p>
        </div>
        <Link
          to={LINKIT.tarjouspyynto}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-2xl bg-paint-yellow px-7 py-4 font-heading text-base font-extrabold text-paint-yellow-foreground shadow-lg shadow-paint-yellow/30 transition-all hover:scale-[1.03] hover:bg-paint-yellow-hover sm:self-auto"
        >
          Pyydä ilmainen arviokäynti
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

export default PalvelutA;
