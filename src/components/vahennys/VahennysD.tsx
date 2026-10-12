import { Link } from "react-router-dom";
import { Percent } from "lucide-react";
import { KOTITALOUSVAHENNYS } from "@/data/company";
import { VAHENNYS_ARTIKKELI, VAHENNYS_ERITTELY, VAHENNYS_OTSIKKO } from "./vahennysData";

/**
 * Vaihtoehto D (?vahennys=d): ei omaa osiota. Pieni valkoinen laatikko hintakorttien alle: kuvake,
 * lihavoitu lause, faktat ja "Lue lisää".
 */
const VahennysD = () => (
  <section className="bg-background py-8 md:py-10">
    <div className="section-container flex max-w-5xl flex-col gap-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-accent/30 bg-card px-5 py-5 sm:flex-row sm:items-center sm:gap-5 md:px-6">
        <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-light sm:flex">
          <Percent className="h-6 w-6 text-accent-ink" strokeWidth={2.2} aria-hidden="true" />
        </div>
        <p className="flex-1 text-[15px] leading-relaxed text-foreground">
          <strong className="font-bold">{VAHENNYS_OTSIKKO}.</strong> {KOTITALOUSVAHENNYS} {VAHENNYS_ERITTELY}
        </p>
        <Link
          to={VAHENNYS_ARTIKKELI}
          className="inline-flex min-h-[44px] shrink-0 items-center self-start whitespace-nowrap text-[15px] font-bold text-accent-ink underline underline-offset-4 sm:self-auto"
        >
          Lue lisää
          <span className="sr-only">: kotitalousvähennys katto- ja maalaustöissä</span>
        </Link>
      </div>
    </div>
  </section>
);

export default VahennysD;
