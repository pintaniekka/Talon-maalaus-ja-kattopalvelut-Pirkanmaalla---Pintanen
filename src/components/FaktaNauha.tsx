import type { LucideIcon } from "lucide-react";

export interface FaktaNauhaItem {
  label: string;
  value: React.ReactNode;
  icon: LucideIcon;
}

interface FaktaNauhaProps {
  items: FaktaNauhaItem[];
  /** Esteettömyyttä varten: mitä faktoja nauha sisältää. */
  ariaLabel?: string;
}

/**
 * Faktanauha lehtitaittona (Eerik 28.10.2026): tummansiniset viivat ylä- ja alapuolella, solut pystyviivoilla
 * erotettuina, kuvake ja versaalinen otsake.
 */
const FaktaNauha = ({ items, ariaLabel }: FaktaNauhaProps) => (
  <section className="bg-background py-8 md:py-11">
    <div className="section-container">
      <dl
        aria-label={ariaLabel}
        className="border-y-2 border-navy mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map(({ label, value, icon: Icon }, i) => (
          <div
            key={label}
            className={[
              "px-6 py-6 md:px-7",
              i > 0 ? "border-t-2 border-navy/15" : "",
              "sm:border-t-0",
              i % 2 === 1 ? "sm:border-l-2 sm:border-navy/15" : "",
              i >= 2 ? "sm:border-t-2 sm:border-navy/15 lg:border-t-0" : "",
              i > 0 ? "lg:border-l-2 lg:border-navy/15" : "",
            ].join(" ")}
          >
            <dt className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="lehti-merkki">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.4} aria-hidden />
              </span>
              {label}
            </dt>
            <dd className="mt-2.5 font-heading text-xl font-extrabold leading-snug text-navy break-words">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default FaktaNauha;
