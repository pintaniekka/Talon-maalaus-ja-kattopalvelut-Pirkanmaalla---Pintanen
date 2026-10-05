import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Building2 } from "@/components/icons/BrandIcons";
import { GOOGLE_PROFILE_URL, LUVUT } from "@/data/company";

const heroBase = "/images/Eerik-maalaa/Eerik-maalaa-kattoa";
const heroSrc = `${heroBase}-1200.avif`;
const heroSrcSet = [400, 800, 1200, 1500]
  .map((w) => `${heroBase}-${w}.avif ${w}w`)
  .join(", ");

const Hero = () => {
  return (
    <section
      id="hero"
      className="hero-critical relative bg-background px-4 pt-28 pb-12 md:px-8 md:pt-32 md:pb-16 flex items-center justify-center"
    >
      <div className="relative w-full max-w-[1500px] overflow-hidden rounded-[2.5rem] bg-card shadow-2xl flex flex-col lg:flex-row">
        {/* Content Side */}
        <div className="relative z-10 w-full lg:w-2/3 p-8 md:p-12 lg:px-16 lg:py-16 xl:px-20 flex flex-col justify-center bg-card">
          <div className="inline-flex items-center gap-3 mb-6 md:mb-8">
            <span className="h-1 w-12 bg-accent rounded-full" aria-hidden="true" />
            <span className="text-accent-ink font-heading font-extrabold uppercase tracking-[0.2em] text-xs md:text-sm">
              Pirkanmaan paikallinen perheyritys
            </span>
          </div>

          <h1 className="heading-style max-w-3xl text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-6 md:mb-8">
            Tiilikaton pinnoitus ja talon maalaus{" "}
            <span className="text-accent-ink">Pirkanmaalla</span>
          </h1>

          <p className="hero-lead text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl leading-relaxed font-sans">
            <strong className="text-foreground">Perheyritys</strong>, jossa{" "}
            <strong className="text-foreground">yrittäjät tekevät työn itse</strong>:{" "}
            <strong className="text-foreground">tiilikaton pinnoitukset</strong> ja{" "}
            <strong className="text-foreground">talon maalaukset</strong> Pirkanmaalla ja lähikunnissa noin tunnin säteellä Tampereelta.
          </p>

          <div className="flex flex-col sm:flex-row sm:flex-nowrap gap-4 sm:gap-6 mb-10 md:mb-12">
            <Link
              to="/hintalaskuri/"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-paint-yellow hover:bg-paint-yellow-hover text-paint-yellow-foreground font-heading font-extrabold rounded-2xl transition-all hover:scale-[1.03] shadow-xl shadow-paint-yellow/40 text-lg group"
            >
              Laske hinta
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/tarjouspyynto/"
              className="inline-flex items-center justify-center px-8 py-4 bg-card border-2 border-accent text-accent-ink font-heading font-extrabold rounded-2xl hover:bg-accent-strong hover:text-accent-foreground transition-all text-lg"
            >
              Ilmainen arviokäynti
            </Link>
          </div>

          {/* Trust row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-6 pt-8 border-t border-border">
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lue Pintasen Google-arviot"
              className="group flex flex-col"
            >
              <span className="text-roof-red font-heading font-extrabold text-2xl md:text-3xl">5,0 / 5</span>
              <span className="text-[10px] md:text-xs text-muted-foreground uppercase font-bold tracking-widest group-hover:underline">
                Google-arviot
              </span>
            </a>
            <div className="flex flex-col">
              <span className="text-foreground font-heading font-extrabold text-2xl md:text-3xl">{LUVUT.kohteet}</span>
              <span className="text-[10px] md:text-xs text-muted-foreground uppercase font-bold tracking-widest">
                Kohdetta
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-foreground font-heading font-extrabold text-2xl md:text-3xl">{LUVUT.kokemusVuotta} v</span>
              <span className="text-[10px] md:text-xs text-muted-foreground uppercase font-bold tracking-widest">
                Kokemusta
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-accent-ink font-heading font-extrabold text-2xl md:text-3xl">0 €</span>
              <span className="text-[10px] md:text-xs text-muted-foreground uppercase font-bold tracking-widest">
                Arviokäynti
              </span>
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="relative w-full lg:w-1/3 min-h-[280px] md:min-h-[360px] lg:min-h-full overflow-hidden">
          <img
            src={heroSrc}
            srcSet={heroSrcSet}
            alt="Eerik maalaa tiilikattoa ruiskulla"
            width={1200}
            height={1600}
            sizes="(max-width: 1024px) 100vw, 34vw"
            className="absolute inset-0 w-full h-full object-cover"
            decoding="sync"
            {...({ fetchpriority: "high" } as Record<string, string>)}
          />

          {/* Skewed white transition (desktop only) */}
          <div
            className="hidden lg:block absolute -left-16 inset-y-0 w-32 bg-card skew-x-[-7deg] shadow-[-15px_0_40px_rgba(0,0,0,0.08)]"
            aria-hidden="true"
          />

          {/* Floating badge */}
          <div className="absolute bottom-4 right-4 lg:bottom-10 lg:right-10 bg-roof-red text-roof-red-foreground p-4 lg:p-6 rounded-2xl lg:rounded-3xl shadow-2xl rotate-2 max-w-[210px] lg:max-w-[260px]">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 lg:w-11 lg:h-11 bg-white/20 rounded-full shrink-0 flex items-center justify-center">
                <Building2 className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <div>
                <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-white/70 mb-1">
                  Yrittäjät itse paikalla
                </p>
                <p className="text-sm lg:text-base font-heading font-extrabold leading-tight mb-1">
                  Eerik &amp; Eemil vastaavat jäljestä.
                </p>
                <p className="hidden sm:block text-xs text-white/80 font-sans">
                  Ei välikäsiä, vain luotettavaa perheyrityksen laatua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
