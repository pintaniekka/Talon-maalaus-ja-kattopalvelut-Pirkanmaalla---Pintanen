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
 * Faktanauha (Eerik 26.10.2026, malli B): yksi leveä valkoinen kortti vaaleansinisellä taustalla,
 * yläreunassa keltainen–sininen liukuväriviiva, solut pystyviivoilla erotettuina.
 * Sama kaava skaalataan myöhemmin muihinkin palikoihin: vaaleansininen tausta, valkoiset kortit,
 * pieni kuvakeruutu, versaalinen otsake ja Montserrat-arvo.
 */
const FaktaNauha = ({ items, ariaLabel }: FaktaNauhaProps) => (
  <section className="bg-gradient-to-b from-accent-light to-[hsl(205_100%_98%)] py-8 md:py-11">
    <div className="section-container">
      <dl
        aria-label={ariaLabel}
        className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-card shadow-[0_10px_30px_rgba(15,61,99,0.10)] grid sm:grid-cols-2 lg:grid-cols-4"
      >
        <div
          aria-hidden
          className="h-[5px] sm:col-span-2 lg:col-span-4 bg-gradient-to-r from-paint-yellow via-accent to-accent-strong"
        />
        {items.map(({ label, value, icon: Icon }, i) => (
          <div
            key={label}
            className={[
              "px-6 py-6 md:px-7",
              i > 0 ? "border-t border-border/60" : "",
              "sm:border-t-0",
              i % 2 === 1 ? "sm:border-l sm:border-border/60" : "",
              i >= 2 ? "sm:border-t sm:border-border/60 lg:border-t-0" : "",
              i > 0 ? "lg:border-l lg:border-border/60" : "",
            ].join(" ")}
          >
            <dt className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="inline-flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px] bg-[#e6f4ff] text-accent-ink">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden />
              </span>
              {label}
            </dt>
            <dd className="mt-2.5 font-heading text-xl font-extrabold leading-snug text-[hsl(206_64%_22%)] break-words">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

export default FaktaNauha;
