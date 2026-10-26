import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  BTN_YELLOW,
  LINKIT,
  PAKETTI_KYSYMYS,
  PAKETTI_VASTAUS,
  PALVELUT_INTRO,
  palvelut,
  type Palvelu,
  type PalveluKey,
} from "./palvelutData";

const kuvaukset: Record<PalveluKey, string> = {
  pinnoitus: "Pesu painepesulla, rikkinäiset tiilet uusiin ja maalaus ruiskulla kahteen kertaan.",
  maalaus: "Homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä.",
};

/** Kolmas chip: katon työ alkaa ilmaisella kuntotarkastuksella, talon arviokäynnillä (src/data/tyovaiheet.ts). */
const kaynti: Record<PalveluKey, string> = {
  pinnoitus: "Ilmainen kuntotarkastus",
  maalaus: "Ilmainen arviokäynti",
};

const lueLisaa: Record<PalveluKey, string> = {
  pinnoitus: "Lue lisää pinnoituksesta",
  maalaus: "Lue lisää maalauksesta",
};

const chipit = (p: Palvelu) => [`${p.takuuLyhyt} takuu`, p.kesto, kaynti[p.key]];

/**
 * Vaihtoehto C (?palvelut=c): tummansininen pyöristetty paneeli, kaksi palstaa, kasvokuva, nimi ja titteli,
 * iso keltainen hinta, chip-rivi ja keltainen nappi.
 */
const PalvelutC = () => (
  <section id="palvelut" className="bg-background py-10 md:py-12">
    <div className="section-container max-w-6xl">
      <div className="flex flex-col gap-8 rounded-[28px] bg-navy p-6 text-navy-foreground sm:p-10 md:gap-9 lg:px-16 lg:py-14">
        <div className="grid gap-4 md:grid-cols-2 md:items-end md:gap-12">
          <div className="flex flex-col gap-3.5">
            <span className="font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-accent md:text-[13px]">Palvelumme</span>
            <h2 className="heading-style text-3xl leading-[1.1] text-navy-foreground md:text-4xl">Kaksi työtä, kaksi tekijää.</h2>
          </div>
          <p className="text-base leading-relaxed text-navy-foreground/80 md:mb-1 md:text-[17px]">{PALVELUT_INTRO}</p>
        </div>

        <div className="grid border-b border-t border-white/15 md:grid-cols-2">
          {palvelut.map((p, i) => (
            <div
              key={p.key}
              className={`flex flex-col gap-4 py-7 md:py-8 ${
                i === 0 ? "border-b border-white/15 md:border-b-0 md:border-r md:pr-10" : "md:pl-10"
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  loading="lazy"
                  decoding="async"
                  src={p.tekija.image}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-bold">{p.tekija.name}</span>
                  <span className="text-[13px] text-navy-foreground/65">{p.tekija.role}</span>
                </div>
              </div>
              <h3 className="font-heading text-2xl font-extrabold leading-[1.15] md:text-[28px]">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-navy-foreground/80">{kuvaukset[p.key]}</p>
              <div className="flex flex-col gap-0.5">
                <span className="font-heading text-3xl font-extrabold leading-[1.1] text-paint-yellow md:text-[32px]">{p.hinta}</span>
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-navy-foreground/65">Hinta yleensä</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {chipit(p).map((chip) => (
                  <li key={chip} className="inline-flex min-h-[32px] items-center rounded-full border border-white/30 px-3 text-[13px] font-semibold">
                    {chip}
                  </li>
                ))}
              </ul>
              <Link
                to={p.href}
                className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-bold text-accent underline-offset-4 hover:underline"
              >
                {lueLisaa[p.key]}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] leading-snug text-navy-foreground/80">
            {PAKETTI_KYSYMYS} {PAKETTI_VASTAUS}
          </p>
          <Link to={LINKIT.tarjouspyynto} className={`${BTN_YELLOW} min-h-[48px] self-start whitespace-nowrap px-6 sm:self-auto`}>
            Pyydä ilmainen arviokäynti
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default PalvelutC;
