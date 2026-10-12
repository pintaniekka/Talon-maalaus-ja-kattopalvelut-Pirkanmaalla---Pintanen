import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { BTN_YELLOW, LINKIT, PALVELUT_INTRO, palvelut, type Palvelu } from "./palvelutData";

/** Ruksilistan kohdat: sama työ kuin palvelusivuilla. Maali: Nowocoat (src/data/tyovaiheet.ts). */
const kohdat = (p: Palvelu): string[] =>
  p.key === "pinnoitus"
    ? [
        "Pesu painepesulla, rikkinäiset tiilet uusiin",
        "Maalaus ruiskulla kahteen kertaan, Nowocoatin kattomaali",
        `Hinta yleensä ${p.hinta}, takuu ${p.takuu}`,
      ]
    : [
        "Homepesu ja irtoavan maalin kaavinta",
        "Pohjamaali paljaisiin kohtiin, pintamaali pensselillä",
        `Hinta yleensä ${p.hinta}, takuu ${p.takuu}`,
      ];

/**
 * Vaihtoehto B (?palvelut=b): ei kortteja. Kaksi vaakariviä: numero ja tekijä, otsikko, ruksilista,
 * kuva vuorotellen oikealla ja vasemmalla, ohut viiva välissä. Puhelimella kuva, teksti, kuva, teksti.
 */
const PalvelutB = () => (
  <section id="palvelut" className="section-padding bg-card">
    <div className="section-container max-w-6xl">
      <header className="mb-10 flex max-w-3xl flex-col gap-3.5">
        <div className="inline-flex items-center gap-3">
          <span className="h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
          <span className="font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-accent-ink md:text-[13px]">Palvelumme</span>
        </div>
        <h2 className="heading-style text-3xl leading-[1.1] text-foreground md:text-4xl">Tiilikatot ja talon seinät</h2>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{PALVELUT_INTRO}</p>
      </header>

      <div className="flex flex-col">
        {palvelut.map((p, i) => (
          <Fragment key={p.key}>
            {i > 0 && <div className="my-10 h-px bg-border md:my-12" aria-hidden="true" />}
            <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-12">
              <ResponsiveImage
                baseName={p.imageBase}
                alt={p.imageAlt}
                className={`block h-[220px] w-full rounded-[20px] object-cover sm:h-[300px] ${i % 2 === 0 ? "md:order-last" : ""}`}
                sizes="(max-width: 767px) 100vw, 50vw"
                width={p.imageWidth}
                height={p.imageHeight}
              />
              <div className="flex flex-col gap-4">
                <span className="font-heading text-[13px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")} · {p.tekija.first}
                </span>
                <h3 className="font-heading text-2xl font-extrabold leading-[1.15] text-foreground md:text-3xl">{p.title}</h3>
                <ul className="flex flex-col gap-2.5 text-base leading-normal text-foreground">
                  {kohdat(p).map((kohta) => (
                    <li key={kohta} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" strokeWidth={2.5} aria-hidden="true" />
                      <span>{kohta}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
                  <Link to={p.href} className={BTN_YELLOW}>
                    {p.title}
                  </Link>
                  <Link
                    to={LINKIT.hintalaskuri}
                    className="inline-flex min-h-[44px] items-center text-[15px] font-bold text-accent-ink underline underline-offset-4"
                  >
                    Laske hinta
                  </Link>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  </section>
);

export default PalvelutB;
