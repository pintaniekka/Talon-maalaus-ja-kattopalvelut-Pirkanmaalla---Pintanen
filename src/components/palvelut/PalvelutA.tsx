import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import {
  BTN_OUTLINE,
  BTN_YELLOW,
  LINK_ARROW,
  LINKIT,
  PAKETTI_KYSYMYS,
  PAKETTI_VASTAUS,
  PALVELUT_INTRO,
  palvelut,
  type PalveluKey,
} from "./palvelutData";

/** Kortin kuvaus: sama työ kuin palvelusivuilla. Suojaus: terassit ja ikkunat (src/data/prices.ts, includes). */
const kuvaukset: Record<PalveluKey, string> = {
  pinnoitus: "Pesemme katon painepesulla, vaihdamme rikkinäiset tiilet ja maalaamme katon ruiskulla kahteen kertaan.",
  maalaus: "Homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Terassit ja ikkunat suojataan.",
};

const Fakta = ({ value, label, divider = false }: { value: string; label: string; divider?: boolean }) => (
  <div className={`flex flex-col gap-0.5 ${divider ? "sm:border-l sm:border-border sm:pl-4" : ""}`}>
    <span className="font-heading font-extrabold text-[17px] leading-tight text-foreground">{value}</span>
    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</span>
  </div>
);

/**
 * Vaihtoehto A (?palvelut=a): kaksi valkoista korttia, kuva ylhäällä ilman liukuväriä, tekijä-chip,
 * kolme faktaa (hinta, takuu, kesto), keltainen "Laske hinta" ja "Lue lisää". Alla pakettihintapalkki.
 */
const PalvelutA = () => (
  <section id="palvelut" className="section-padding bg-background">
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
          <article key={p.key} className="flex flex-col overflow-hidden rounded-3xl bg-card shadow-[0_10px_30px_rgba(10,25,47,0.08)]">
            <ResponsiveImage
              baseName={p.imageBase}
              alt={p.imageAlt}
              className="block h-[220px] w-full object-cover sm:h-[260px] lg:h-[250px]"
              sizes="(max-width: 1023px) 100vw, 560px"
              width={p.imageWidth}
              height={p.imageHeight}
            />
            <div className="flex flex-col gap-4 p-6 md:px-8 md:pb-8 md:pt-7">
              <div className="flex items-center gap-2.5">
                <img
                  src={p.tekija.image}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-[13px] font-semibold text-muted-foreground">{p.tekija.first} tekee työn</span>
              </div>
              <h3 className="font-heading text-2xl font-extrabold leading-[1.15] text-foreground md:text-[26px]">{p.title}</h3>
              <p className="text-base leading-relaxed text-muted-foreground">{kuvaukset[p.key]}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-border pt-4 sm:grid sm:grid-cols-[1.4fr_1fr_1fr] sm:gap-0">
                <Fakta value={p.hinta} label="Hinta yleensä" />
                <Fakta value={p.takuu} label="Takuu" divider />
                <Fakta value={p.kesto} label="Kesto" divider />
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                <Link to={LINKIT.hintalaskuri} className={BTN_YELLOW}>
                  Laske hinta
                </Link>
                <Link to={p.href} className={LINK_ARROW}>
                  Lue lisää
                  <span className="sr-only">: {p.title}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-accent-light px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-7">
        <p className="text-base leading-snug text-foreground">
          <strong className="font-bold">{PAKETTI_KYSYMYS}</strong> {PAKETTI_VASTAUS}
        </p>
        <Link to={LINKIT.tarjouspyynto} className={`${BTN_OUTLINE} self-start sm:self-auto`}>
          Pyydä ilmainen arviokäynti
        </Link>
      </div>
    </div>
  </section>
);

export default PalvelutA;
