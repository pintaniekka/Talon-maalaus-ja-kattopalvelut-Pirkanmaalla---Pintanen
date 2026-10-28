import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
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

const Fakta = ({ value, label, divider = false }: { value: string; label: string; divider?: boolean }) => (
  <div className={`flex flex-col gap-1 ${divider ? "sm:border-l sm:border-border sm:pl-5" : ""}`}>
    <span className="whitespace-nowrap font-heading text-lg font-extrabold leading-none text-foreground md:text-xl">{value}</span>
    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
  </div>
);

/**
 * Vaihtoehto A (?palvelut=a), hiottu 13.10.2026 Eerikin palautteen mukaan ("A on raikkain, mutta vaatii parannusta"):
 * vaaleansininen osio ja valkoiset kortit, tekijän nimi valkoisena pillerinä kuvan päällä, isommat faktaluvut
 * (hinta, takuu, kesto) ja alla tummansininen pakettihintapalkki hintasivun laskurinoston tyyliin.
 * Eerik 14.10.2026: koko kortti on yksi linkki palvelusivulle, ei erillistä "Lue lisää" -riviä eikä nappia
 * kortin sisällä. Hiiren päällä kortti nousee hieman ja kuvan yli pyyhkäisee kiilto.
 */
const PalvelutA = () => (
  <section id="palvelut" className="section-padding bg-accent-light">
    <div className="section-container max-w-6xl">
      <div className="mb-9 grid gap-4 md:grid-cols-2 md:items-end md:gap-12">
        <div className="flex flex-col gap-4">
          <div className="inline-flex items-center gap-3">
            <span className="h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
            <span className="font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-accent-ink md:text-[13px]">
              Palvelumme
            </span>
          </div>
          <h2 className="heading-style text-3xl leading-[1.1] text-foreground md:text-4xl">Katot ja seinät. Teemme työn itse.</h2>
        </div>
        <p className="text-base leading-relaxed text-muted-foreground md:mb-1.5 md:text-lg">{PALVELUT_INTRO}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {palvelut.map((p) => (
          <Link
            key={p.key}
            to={p.href}
            className="group lehti-kortti flex flex-col overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
          >
            <div className="relative overflow-hidden">
              <ResponsiveImage
                baseName={p.imageBase}
                alt={p.imageAlt}
                className="block h-[220px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100 sm:h-[260px] lg:h-[250px]"
                sizes="(max-width: 1023px) 100vw, 560px"
                width={p.imageWidth}
                height={p.imageHeight}
                style={p.imagePosition ? { objectPosition: p.imagePosition } : undefined}
              />
              {/* Kiilto: vino, läpikuultava valkoinen raita pyyhkäisee kuvan yli hiiren päällä. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-white/0 via-white/45 to-white/0 opacity-0 transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[300%] group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:opacity-0"
              />
              {/* Tekijä valkoisena pillerinä kuvan päällä: näyttää tarralta, ei tekstiriviltä. */}
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2.5 rounded-full bg-card py-1.5 pl-1.5 pr-4 shadow-lg">
                <img
                  loading="lazy"
                  decoding="async"
                  src={p.tekija.image}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-accent-light"
                />
                <span className="text-[13px] font-bold text-foreground">{p.tekija.pilleri}</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 pt-5">
              <h3 className="flex items-center justify-between gap-4 font-heading text-2xl font-extrabold leading-[1.15] text-foreground md:text-[26px]">
                {p.title}
                <ArrowRight
                  className="h-6 w-6 shrink-0 text-accent-ink transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </h3>
              <p className="text-base leading-relaxed text-muted-foreground">{kuvaukset[p.key]}</p>
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-4 border-t border-navy/20 pt-4 sm:grid sm:grid-cols-[auto_auto_auto] sm:justify-between sm:gap-0">
                <Fakta value={p.hinta} label="Hinta yleensä" />
                <Fakta value={p.takuu} label="Takuu" divider />
                <Fakta value={p.kesto} label="Kesto" divider />
              </div>
            </div>
          </Link>
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

      {/* Pakettihinta tummansinisenä palkkina (vrt. hintasivun "Laske oman kattosi hinta minuutissa"). */}
      <div className="mt-8 flex flex-col gap-5 overflow-hidden bg-navy px-6 py-6 text-navy-foreground sm:flex-row sm:items-center sm:justify-between md:px-9 md:py-7">
        <div className="flex flex-col gap-1">
          <p className="font-heading text-xl font-extrabold leading-tight md:text-2xl">{PAKETTI_KYSYMYS}</p>
          <p className="text-base text-white/80">{PAKETTI_VASTAUS} Sovitaan siitä arviokäynnillä.</p>
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
