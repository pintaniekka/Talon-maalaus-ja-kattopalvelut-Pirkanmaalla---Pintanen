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
 * Työvaiheet avoimena numeroituna listana (korjaus 5, V12). Korvaa haitarin, jonka suljettu
 * sisältö ei päätynyt HTML:ään. Sama ulkoasu kuin maalauksen kaupunkisivun prosessilla.
 */
const ProcessList = ({ title, intro, steps, cta, id }: ProcessListProps) => (
  <section id={id} className="section-padding bg-secondary">
    <div className="section-container max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 font-heading">{title}</h2>
        {intro && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{intro}</p>}
      </div>

      <ol className="grid sm:grid-cols-2 gap-4">
        {steps.map((step, i) => (
          <li key={step.title} className="bg-card rounded-xl border border-border/50 p-5 shadow-sm">
            <h3 className="font-bold text-foreground mb-1.5">
              <span className="text-accent-ink">{i + 1}.</span> {step.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">{step.text}</p>
          </li>
        ))}
      </ol>

      {cta && (
        <div className="text-center mt-8">
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
