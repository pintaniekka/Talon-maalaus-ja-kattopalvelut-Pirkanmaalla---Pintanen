import { Check } from "lucide-react";

/**
 * "Lyhyesti"-laatikko heron alle (P8–P9): 4–6 lyhyttä virkettä, joissa on luku ja yksikkö.
 * Sama kaava kuin artikkeleissa. Tekoälyhaku lainaa mieluiten juuri tällaisen tiivistelmän.
 * Ei animaatiota: teksti on HTML:ssä heti.
 */
const Lyhyesti = ({ items, title = "Lyhyesti" }: { items: string[]; title?: string }) => (
  <section className="bg-background pb-10 md:pb-14" aria-labelledby="lyhyesti-otsikko">
    <div className="section-container">
      <div className="max-w-4xl mx-auto bg-accent-light border-l-4 border-accent rounded-2xl px-6 py-5 md:px-8 md:py-6">
        <h2 id="lyhyesti-otsikko" className="font-heading font-extrabold text-sm uppercase tracking-[0.18em] text-accent-ink mb-3">
          {title}
        </h2>
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-foreground leading-snug">
              <Check className="w-4 h-4 mt-1 text-accent-ink flex-shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default Lyhyesti;
