import type { ReactNode } from "react";
import { Check } from "lucide-react";

/** Osion otsikko ja ingressi samalla tyylillä kaikilla hintasivuilla. */
export const PriceSectionHeading = ({ title, intro, eyebrow }: { title: string; intro?: ReactNode; eyebrow?: string }) => (
  <div className="max-w-3xl mx-auto text-center mb-10">
    {eyebrow && <span className="lohko-otsake mb-3">{eyebrow}</span>}
    <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4">{title}</h2>
    {intro && <p className="text-lg text-muted-foreground leading-relaxed">{intro}</p>}
  </div>
);

/** Lista "mitä hintaan kuuluu" ruksimerkeillä. */
export const PriceIncludes = ({ title, items, note }: { title: string; items: string[]; note?: ReactNode }) => (
  <div className="kortti p-6 md:p-8">
    <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
    <ul className="grid sm:grid-cols-2 gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3">
          <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-accent-ink" />
          </span>
          <span className="text-foreground text-sm">{item}</span>
        </li>
      ))}
    </ul>
    {note && <p className="text-sm text-muted-foreground mt-5">{note}</p>}
  </div>
);

export interface PriceFactor {
  title: string;
  description: string;
}

/** "Mistä hinta syntyy": kaksipalstainen lista ilman ikoneita (tarkastus 12.10.2026, luku 3). */
export const PriceFactors = ({ factors }: { factors: PriceFactor[] }) => (
  <dl className="grid sm:grid-cols-2 gap-x-10 gap-y-6 max-w-3xl mx-auto">
    {factors.map((factor) => (
      <div key={factor.title} className="border-l-2 border-accent pl-4">
        <dt className="font-bold text-foreground mb-1">{factor.title}</dt>
        <dd className="text-muted-foreground leading-relaxed">{factor.description}</dd>
      </div>
    ))}
  </dl>
);

/** Numeroitu tarkistuslista, esim. "mitä tarjouksesta kannattaa katsoa". */
export const Checklist = ({ items }: { items: string[] }) => (
  <ol className="max-w-2xl mx-auto space-y-3">
    {items.map((item, i) => (
      <li key={item} className="flex gap-4 kortti !rounded-2xl px-5 py-4">
        <span className="kortti-numero !h-8 !w-8 !text-sm">
          {i + 1}
        </span>
        <span className="text-foreground">{item}</span>
      </li>
    ))}
  </ol>
);

/** Kahden vaihtoehdon hintavertailu. */
export const CompareCards = ({
  left,
  right,
}: {
  left: { title: string; price: string; note: string };
  right: { title: string; price: string; note: string };
}) => (
  <div className="grid md:grid-cols-2 gap-6">
    <div className="kortti p-6 md:p-8 ring-2 ring-accent-strong">
      <h3 className="text-lg font-bold text-foreground mb-2">{left.title}</h3>
      <p className="text-3xl font-bold text-accent-ink mb-1">{left.price}</p>
      <p className="text-sm text-muted-foreground">{left.note}</p>
    </div>
    <div className="kortti p-6 md:p-8">
      <h3 className="text-lg font-bold text-foreground mb-2">{right.title}</h3>
      <p className="text-3xl font-bold text-foreground/60 mb-1">{right.price}</p>
      <p className="text-sm text-muted-foreground">{right.note}</p>
    </div>
  </div>
);
