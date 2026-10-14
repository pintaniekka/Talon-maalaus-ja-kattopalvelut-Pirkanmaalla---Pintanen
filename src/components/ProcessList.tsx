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
 * Yksi palsta, numero, otsikko ja yksi rivi tekstiä (tarkastus 12.10.2026, luku 3: ei korttiruudukkoa,
 * jonka viimeinen rivi jää vajaaksi). Sama ulkoasu kuin maalauksen kaupunkisivun merkkilistalla.
 */
const ProcessList = ({ title, intro, steps, cta, id }: ProcessListProps) => (
  <section id={id} className="section-padding bg-background">
    <div className="section-container max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 font-heading">{title}</h2>
        {intro && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{intro}</p>}
      </div>

      <ol className="space-y-5">
        {steps.map((step, i) => (
          <li key={step.title} className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-strong text-accent-foreground font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <div>
              <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.text}</p>
            </div>
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
