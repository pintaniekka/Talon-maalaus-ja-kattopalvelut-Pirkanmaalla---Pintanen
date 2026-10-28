import type { LyhyestiSisalto } from "@/data/tyovaiheet";
import { merkitse } from "@/components/Rytmi";
import { cn } from "@/lib/utils";

/**
 * "Lyhyesti"-nauha heron alle (Eerik 13.10.2026): neljä merkittyä faktaa rivissä (puhelimessa 2 × 2),
 * ohuet viivat välissä ja yksi lyhyt lisätieto. Ei tarkistuslistaa eikä laatikkoa, ei työvaiheiden toistoa.
 * Pitkät arvot (pesu- ja maalaustapa, Eerik 14.10.2026) näytetään pienemmällä, jotta nauha pysyy neljässä sarakkeessa.
 * Arvo voi olla kahdella rivillä rivinvaihdolla "\n" (Eerik 15.10.2026: pohjatyöt päällekkäin).
 * Pieni "Lyhyesti"-otsikko jää tekoälyhakua varten. Ei animaatiota: teksti on HTML:ssä heti.
 */
const Lyhyesti = ({ content, title = "Lyhyesti" }: { content: LyhyestiSisalto; title?: string }) => (
  <section className="bg-background pb-10 md:pb-14" aria-labelledby="lyhyesti-otsikko">
    <div className="section-container">
      <div className="mx-auto max-w-4xl border-y border-border py-5 md:py-6">
        <h2 id="lyhyesti-otsikko" className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {title}
        </h2>
        <dl className="grid grid-cols-2 gap-y-5 md:grid-cols-4">
          {content.facts.map((fact) => (
            <div
              key={fact.label}
              className="border-border even:border-l even:pl-4 md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:pl-5 md:[&:not(:last-child)]:pr-5"
            >
              <dt className="text-sm text-muted-foreground">{fact.label}</dt>
              <dd
                className={cn(
                  "mt-0.5 whitespace-pre-line font-heading font-extrabold leading-tight text-foreground",
                  Math.max(...fact.value.split("\n").map((line) => line.length)) > 16 ? "text-base md:text-lg" : "text-xl md:text-2xl",
                )}
              >
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
        {content.note && <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">{content.note}</p>}
      </div>
    </div>
  </section>
);

merkitse(Lyhyesti, "oma");

export default Lyhyesti;
