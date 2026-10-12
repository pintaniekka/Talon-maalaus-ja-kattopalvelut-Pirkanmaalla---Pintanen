import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { allCities } from "@/data/cityData";
import { cn } from "@/lib/utils";

type Service = "maalaus" | "pinnoitus" | "alue";

interface ToimintaAlueetBannerProps {
  /** Nykyisen sivun paikkakunnan slug: merkitään listassa. */
  activeCity?: string;
  /** Millä sivulla ollaan. Vain aluesivulla ("alue", oletus) paikkakunnan linkki on nykyinen sivu. */
  service?: Service;
}

/** Kunnat aakkosjärjestyksessä; linkit aluesivuille. */
const kunnat = [...allCities].sort((a, b) => a.name.localeCompare(b.name, "fi"));

/**
 * Toiminta-alueet yhtenä rauhallisena lohkona (tarkastus 12.10.2026, T7): otsikko, yksi lause,
 * 24 kunnan linkit aluesivuille ja linkki Toiminta-alueet-sivulle. Ei karttaa, ei pilleriä,
 * ei kolmea palvelukohtaista listaa.
 */
const ToimintaAlueetBanner = ({ activeCity, service = "alue" }: ToimintaAlueetBannerProps) => (
  <section className="section-padding bg-accent-light" aria-labelledby="toiminta-alueet-otsikko">
    <div className="section-container max-w-6xl">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-16">
        <div className="flex flex-col gap-3">
          <h2 id="toiminta-alueet-otsikko" className="heading-style text-3xl leading-[1.1] text-foreground md:text-4xl">
            Toiminta-alueet
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">Toimimme noin tunnin säteellä Tampereelta.</p>
          <Link
            to="/toiminta-alueet/"
            className="mt-1 inline-flex items-center gap-1.5 font-bold text-accent-ink underline-offset-4 hover:underline"
          >
            Kaikki toiminta-alueet
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="columns-2 gap-x-8 text-base leading-relaxed sm:columns-3 lg:columns-4">
          {kunnat.map((kunta) => {
            const nykyinen = service === "alue" && kunta.slug === activeCity;
            return (
              <li key={kunta.slug} className="break-inside-avoid py-1">
                <Link
                  to={`/maalauspalvelut-${kunta.slug}/`}
                  aria-current={nykyinen ? "page" : undefined}
                  className={cn(
                    "text-foreground/85 underline decoration-border underline-offset-4 hover:text-accent-ink hover:decoration-current",
                    nykyinen && "font-bold text-foreground decoration-accent"
                  )}
                >
                  {kunta.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </section>
);

export default ToimintaAlueetBanner;
