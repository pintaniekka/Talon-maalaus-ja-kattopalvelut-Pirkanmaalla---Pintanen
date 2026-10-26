import { Link } from "react-router-dom";
import { ArrowRight, Percent } from "lucide-react";
import { KOTITALOUSVAHENNYS } from "@/data/company";
import { VAHENNYS_ARTIKKELI, VAHENNYS_BTN_OUTLINE, VAHENNYS_ERITTELY, VAHENNYS_OTSIKKO } from "./vahennysData";

/**
 * Vaihtoehto A (?vahennys=a): yhden rivin vaaleansininen palkki. Pieni %-kuvake, yksi lihavoitu lause,
 * yksi rivi faktaa ja "Lue lisää" oikealla. Ei näytä osiolta vaan huomautukselta.
 */
const VahennysA = () => (
  <section className="bg-card py-6 md:py-8">
    <div className="section-container max-w-6xl">
      <div className="flex flex-col gap-4 rounded-2xl bg-accent-light px-5 py-5 md:flex-row md:items-center md:gap-6 md:px-8 md:py-7">
        <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-card sm:flex">
          <Percent className="h-7 w-7 text-accent-ink" strokeWidth={2.2} aria-hidden="true" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h2 className="font-heading text-lg font-extrabold leading-tight text-foreground md:text-[19px]">{VAHENNYS_OTSIKKO}.</h2>
          <p className="text-[15px] leading-normal text-muted-foreground">
            {KOTITALOUSVAHENNYS} {VAHENNYS_ERITTELY}
          </p>
        </div>
        <Link to={VAHENNYS_ARTIKKELI} className={`${VAHENNYS_BTN_OUTLINE} self-start md:self-auto`}>
          Lue lisää
          <span className="sr-only">: kotitalousvähennys katon pinnoituksesta ja talon maalauksesta</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  </section>
);

export default VahennysA;
