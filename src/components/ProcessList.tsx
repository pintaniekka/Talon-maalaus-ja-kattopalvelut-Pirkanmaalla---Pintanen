import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Tyovaihe } from "@/data/tyovaiheet";

interface ProcessListProps {
  title: string;
  intro?: ReactNode;
  steps: Tyovaihe[];
  cta?: { to: string; label: string };
  id?: string;
}

/**
 * Työvaiheet avoimena numeroituna listana (korjaus 5, V12): sisältö on HTML:ssä ilman haitaria.
 * Tyyli lehtitaitto (Eerik 28.10.2026): palstat yläviivalla ja isolla numerolla kolmessa
 * sarakkeessa. Jos viimeinen kortti jäisi yksin riville, se levenee koko rivin leveydeksi.
 */
const ProcessList = ({ title, intro, steps, cta, id }: ProcessListProps) => (
  <section id={id} className="section-padding bg-background">
    <div className="section-container max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 font-heading">{title}</h2>
        {intro && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{intro}</p>}
      </div>

      <ol className="grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 md:[&>li:last-child:nth-child(odd)]:col-span-2 lg:[&>li:last-child:nth-child(3n+1)]:col-span-3 lg:[&>li:last-child:nth-child(3n+2)]:col-span-1">
        {steps.map((step, i) => (
          <li key={step.title} className="lehti-kortti">
            <span className="lehti-numero mb-3" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="font-heading text-lg font-extrabold text-navy mb-1.5">
              <span className="sr-only">Vaihe {i + 1}: </span>
              {step.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-[15px]">{step.text}</p>
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
