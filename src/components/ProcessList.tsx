import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import type { Tyovaihe } from "@/data/tyovaiheet";

interface ProcessListProps {
  title: string;
  intro?: ReactNode;
  steps: Tyovaihe[];
  cta?: { to: string; label: string };
  id?: string;
}

/**
 * Työvaiheet numeroituna listana. Eerik 28.10.2026: avoimet kortit veivät liikaa tilaa, joten vaiheet ovat
 * pudotusvalikoita kolmessa sarakkeessa (malli: Lummecon "Näin homma etenee"). Toteutus on selaimen oma
 * details/summary: tekstit ovat HTML:ssä ilman JavaScriptiä (esirenderöinti, llms.txt), ja avaaminen toimii
 * näppäimistöllä. Jos viimeinen vaihe jäisi yksin riville, se levenee koko rivin leveydeksi.
 */
const ProcessList = ({ title, intro, steps, cta, id }: ProcessListProps) => (
  <section id={id} className="section-padding osio">
    <div className="section-container max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <span className="lohko-otsake mb-3">Näin työ etenee</span>
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4 font-heading">{title}</h2>
        {intro && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{intro}</p>}
      </div>

      <ol className="grid list-none gap-3 p-0 md:grid-cols-2 md:gap-4 lg:grid-cols-3 md:[&>li:last-child:nth-child(odd)]:col-span-2 lg:[&>li:last-child:nth-child(3n+1)]:col-span-3 lg:[&>li:last-child:nth-child(3n+2)]:col-span-1">
        {steps.map((step, i) => (
          <li key={step.title} className="min-w-0">
            <details className="group kortti">
              <summary className="flex cursor-pointer list-none items-center gap-3 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <span className="kortti-numero !h-9 !w-9 text-base" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="min-w-0 flex-1 font-heading text-base font-extrabold leading-snug text-navy md:text-[17px]">
                  <span className="sr-only">Vaihe {i + 1}: </span>
                  {step.title}
                </h3>
                <Plus
                  className="h-5 w-5 flex-none text-accent-ink transition-transform duration-200 group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 pb-5 pl-[4.25rem] text-[15px] leading-relaxed text-muted-foreground">{step.text}</p>
            </details>
          </li>
        ))}
      </ol>

      {cta && (
        <div className="text-center mt-10">
          <Link
            to={cta.to}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors hover:brightness-110"
            style={{ backgroundColor: "hsl(var(--accent-strong))" }}
          >
            {cta.label}
          </Link>
        </div>
      )}
    </div>
  </section>
);

export default ProcessList;
