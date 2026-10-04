import type { ComponentType, ReactNode } from "react";
import { Check } from "lucide-react";

/** Osion otsikko ja ingressi samalla tyylillä kaikilla hintasivuilla. */
export const PriceSectionHeading = ({ title, intro }: { title: string; intro?: ReactNode }) => (
  <div className="max-w-3xl mx-auto text-center mb-10">
    <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4">{title}</h2>
    {intro && <p className="text-lg text-muted-foreground leading-relaxed">{intro}</p>}
  </div>
);

/** Lista "mitä hintaan kuuluu" ruksimerkeillä. */
export const PriceIncludes = ({ title, items, note }: { title: string; items: string[]; note?: ReactNode }) => (
  <div className="bg-card rounded-2xl p-6 md:p-8 border border-border">
    <h3 className="text-lg font-bold text-foreground mb-4">{title}</h3>
    <ul className="grid sm:grid-cols-2 gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3">
          <span className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Check className="w-3 h-3 text-accent" />
          </span>
          <span className="text-foreground text-sm">{item}</span>
        </li>
      ))}
    </ul>
    {note && <p className="text-sm text-muted-foreground mt-5">{note}</p>}
  </div>
);

export interface PriceFactor {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

/** Korttirivi "mistä hinta syntyy". */
export const PriceFactors = ({ factors }: { factors: PriceFactor[] }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {factors.map((factor) => (
      <div key={factor.title} className="card-elevated">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          <factor.icon className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-bold text-foreground mb-2">{factor.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{factor.description}</p>
      </div>
    ))}
  </div>
);

/** Numeroitu tarkistuslista, esim. "mitä tarjouksesta kannattaa katsoa". */
export const Checklist = ({ items }: { items: string[] }) => (
  <ol className="max-w-2xl mx-auto space-y-3">
    {items.map((item, i) => (
      <li key={item} className="flex gap-4 bg-card rounded-xl border border-border px-5 py-4">
        <span className="w-7 h-7 rounded-full bg-accent/20 text-foreground font-bold text-sm flex items-center justify-center flex-shrink-0">
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
    <div className="bg-card rounded-2xl p-6 border border-accent/30">
      <h3 className="text-lg font-bold text-foreground mb-2">{left.title}</h3>
      <p className="text-3xl font-bold text-accent mb-1">{left.price}</p>
      <p className="text-sm text-muted-foreground">{left.note}</p>
    </div>
    <div className="bg-card rounded-2xl p-6 border border-border">
      <h3 className="text-lg font-bold text-foreground mb-2">{right.title}</h3>
      <p className="text-3xl font-bold text-foreground/60 mb-1">{right.price}</p>
      <p className="text-sm text-muted-foreground">{right.note}</p>
    </div>
  </div>
);
