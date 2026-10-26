import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { KOTITALOUSVAHENNYS } from "@/data/company";
import { VAHENNYS_ARTIKKELI, VAHENNYS_ERITTELY, VAHENNYS_LUVUT, VAHENNYS_OTSIKKO } from "./vahennysData";

const [prosentti] = VAHENNYS_LUVUT;

/**
 * Vaihtoehto C (?vahennys=c): tummansininen kaistale, iso keltainen "40 %", valkoinen otsikko ja lause,
 * valkoinen ääriviivanappi.
 */
const VahennysC = () => (
  <section className="bg-navy py-10 text-navy-foreground md:py-12">
    <div className="section-container flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:gap-12">
      <div className="flex shrink-0 flex-col gap-1 md:border-r md:border-white/15 md:pr-12">
        <span className="font-heading text-6xl font-extrabold leading-none text-paint-yellow md:text-7xl lg:text-8xl">{prosentti.value}</span>
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-navy-foreground/70">{prosentti.label}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <h2 className="heading-style text-2xl leading-[1.15] md:text-[28px]">{VAHENNYS_OTSIKKO}.</h2>
        <p className="text-base leading-relaxed text-navy-foreground/80">
          {KOTITALOUSVAHENNYS} {VAHENNYS_ERITTELY}
        </p>
      </div>
      <Link
        to={VAHENNYS_ARTIKKELI}
        className="inline-flex min-h-[48px] shrink-0 items-center gap-1.5 self-start whitespace-nowrap rounded-xl border-2 border-white/60 px-6 font-heading text-[15px] font-extrabold text-navy-foreground transition-colors hover:border-white hover:bg-white/10 md:self-auto"
      >
        Lue lisää
        <span className="sr-only">: kotitalousvähennys katon pinnoituksesta ja talon maalauksesta</span>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  </section>
);

export default VahennysC;
