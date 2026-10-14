import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  VAHENNYS_ARTIKKELI,
  VAHENNYS_ERITTELY,
  VAHENNYS_LINK_ARROW,
  VAHENNYS_LUVUT,
  VAHENNYS_OTSIKKO,
  VAHENNYS_VUODET,
} from "./vahennysData";

/**
 * Vaihtoehto B (?vahennys=b): valkoinen kortti. Vasemmalla pieni otsikko, lause ja linkki,
 * oikealla kolme laattaa 40 % / 2 100 € / 150 €.
 */
const VahennysB = () => (
  <section className="bg-background py-12">
    <div className="section-container max-w-6xl">
      <div className="grid gap-8 rounded-3xl bg-card p-6 shadow-[0_10px_30px_rgba(10,25,47,0.06)] md:grid-cols-2 md:items-center md:gap-12 md:p-11">
        <div className="flex flex-col gap-4">
          <span className="font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-accent-ink md:text-[13px]">
            Kotitalousvähennys {VAHENNYS_VUODET}
          </span>
          <h2 className="heading-style text-2xl leading-[1.15] text-foreground md:text-[32px]">{VAHENNYS_OTSIKKO}</h2>
          <p className="text-base leading-relaxed text-muted-foreground">{VAHENNYS_ERITTELY}</p>
          <Link to={VAHENNYS_ARTIKKELI} className={VAHENNYS_LINK_ARROW}>
            Lue lisää artikkelista
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3 md:gap-4">
          {VAHENNYS_LUVUT.map((luku) => (
            <li
              key={luku.value}
              className="flex items-baseline justify-between gap-3 rounded-2xl bg-accent-light px-5 py-4 sm:flex-col sm:items-start sm:justify-start sm:gap-2 sm:py-6"
            >
              <span className="font-heading text-2xl font-extrabold leading-none text-accent-ink sm:text-3xl md:text-[34px]">{luku.value}</span>
              <span className="text-sm leading-snug text-foreground">{luku.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default VahennysB;
