import { Suspense, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { allTestimonials, type Testimonial } from "@/data/testimonialsData";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

/** Koko arvostelun ikkuna (Radix Dialog) on oma pakettinsa: se ladataan vasta "Lue koko arvostelu" -napista (30.10.2026). */
const ArvosteluIkkuna = lazyWithRetry(() => import("./ArvosteluIkkuna"));

const defaultTestimonials: Testimonial[] = allTestimonials;

/** Tätä pidempi arvostelu leikataan kortissa ja avataan kokonaisena ikkunaan. */
const LONG_TEXT_THRESHOLD = 180;
/** Kahdelle riville jaetaan vasta, kun arvosteluja on tämän verran; pienempi setti pysyy yhdellä rivillä. */
const MIN_FOR_TWO_ROWS = 6;

export const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const GoogleIcon = () => <span className="google-merkki" aria-hidden="true" />;

/** Tähdet ovat CSS-kuva (.tahdet, src/index.css), ei viittä SVG:tä per kortti. */
export const Stars = ({ stars }: { stars: number }) => (
  <span
    className="tahdet"
    role="img"
    aria-label={`${stars} tähteä viidestä`}
    style={{ "--tahdet": stars } as CSSProperties}
  />
);

/**
 * Yksi arvostelu karusellissa: nimikirjaimet, nimi, tähdet, teksti ja Google-merkki.
 * Pitkä arvostelu leikataan viiteen riviin ja avataan kokonaisena ikkunaan (Eerik 28.10.2026: kortit
 * samankorkuisia kahdella rivillä, pitkät arvostelut silti luettavissa sanasta sanaan).
 */
export const TestimonialCard = ({ name, stars, text }: { name: string; stars: number; text: string }) => {
  const isLong = text.length > LONG_TEXT_THRESHOLD;
  const [open, setOpen] = useState(false);
  // Ikkuna pysyy mukana ensimmäisen avauksen jälkeen, jotta sulkemisanimaatio ja fokuksen palautus toimivat.
  const [avattu, setAvattu] = useState(false);

  return (
    <div className="kortti mx-2 flex w-[260px] flex-shrink-0 flex-col p-5 sm:w-[300px] [scroll-snap-align:center]">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-heading text-sm font-semibold text-primary" aria-hidden="true">
          {getInitials(name)}
        </div>
        <span className="font-heading text-sm font-semibold text-foreground">{name}</span>
      </div>
      <div className="mb-2">
        <Stars stars={stars} />
      </div>
      <p className={`mb-2 text-sm leading-relaxed text-muted-foreground ${isLong ? "line-clamp-5" : ""}`}>"{text}"</p>
      {isLong && (
        <>
          <button
            type="button"
            onClick={() => {
              setAvattu(true);
              setOpen(true);
            }}
            className="mb-3 self-start rounded text-xs font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          >
            Lue koko arvostelu
          </button>
          {avattu && (
            <Suspense fallback={null}>
              <ArvosteluIkkuna open={open} onOpenChange={setOpen} name={name} stars={stars} text={text} />
            </Suspense>
          )}
        </>
      )}
      <div className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground">
        <GoogleIcon />
        <span>Google-arvostelu</span>
      </div>
    </div>
  );
};

/** Tunnistaa prefers-reduced-motion-asetuksen ja seuraa sen muutoksia. */
const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return reducedMotion;
};

interface MarqueeRowProps {
  data: Testimonial[];
  /** Toinen rivi rullaa toiseen suuntaan. */
  reverse?: boolean;
  reducedMotion: boolean;
  /** Kopiot lisätään vasta selaimessa (esirenderöinnissä vain yksi sarja). */
  mounted: boolean;
  durationSec?: number;
  label: string;
}

/**
 * Yksi rullaava rivi. Reduced motion -tilassa rivi on vieritettävä lista, jonka alku on keskimmäisessä
 * kolmanneksessa ja joka kiertää päistä. Pysty-padding jättää tilaa kortin varjolle, jotta varjo ei
 * leikkaudu rivin reunaan (Eerik 28.10.2026).
 */
const MarqueeRow = ({ data, reverse = false, reducedMotion, mounted, durationSec, label }: MarqueeRowProps) => {
  // Duplicoidaan riittävästi, jotta marquee toimii myös pienellä setillä
  const minLoopCount = Math.max(2, Math.ceil(8 / data.length));
  const baseLength = minLoopCount * data.length;
  const loopLength = (reducedMotion ? 3 : 2) * baseLength;
  const copies = mounted ? Math.max(0, loopLength - data.length) : 0;
  const items = useMemo(
    () => [
      ...data.map((t) => ({ t, hidden: false })),
      ...Array.from({ length: copies }, (_, i) => ({ t: data[i % data.length], hidden: true })),
    ],
    [data, copies]
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const isWrappingRef = useRef(false);

  useEffect(() => {
    if (!reducedMotion) return;
    const el = viewportRef.current;
    if (!el) return;
    const setStart = () => {
      el.scrollLeft = el.scrollWidth / 3;
    };
    const raf = requestAnimationFrame(setStart);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, items.length]);

  const handleScroll = () => {
    if (!reducedMotion) return;
    const el = viewportRef.current;
    if (!el || isWrappingRef.current) return;
    const third = el.scrollWidth / 3;
    if (el.scrollLeft < third * 0.5) {
      isWrappingRef.current = true;
      el.scrollLeft += third;
      requestAnimationFrame(() => { isWrappingRef.current = false; });
    } else if (el.scrollLeft > third * 2.5) {
      isWrappingRef.current = true;
      el.scrollLeft -= third;
      requestAnimationFrame(() => { isWrappingRef.current = false; });
    }
  };

  const duration = durationSec ?? Math.max(30, baseLength * 5);

  return (
    <div
      ref={viewportRef}
      onScroll={handleScroll}
      className="marquee-viewport relative overflow-hidden py-5"
      style={reducedMotion ? { scrollSnapType: "x proximity" } : undefined}
      role="region"
      aria-label={label}
      tabIndex={0}
    >
      <div
        className={reducedMotion ? "flex w-max items-stretch" : "flex w-max items-stretch animate-marquee"}
        style={reducedMotion ? undefined : { animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {items.map(({ t, hidden }, i) =>
          hidden ? (
            // inert: kopioiden napit eivät saa fokusta (axe: fokusoitava sisältö aria-hidden-säiliössä).
            <div key={i} className="flex" aria-hidden="true" {...({ inert: "" } as Record<string, string>)}>
              <TestimonialCard {...t} />
            </div>
          ) : (
            <TestimonialCard key={i} {...t} />
          )
        )}
      </div>
    </div>
  );
};

interface TestimonialsMarqueeProps {
  /** Arvostelut, jotka näytetään karusellissa. Jos puuttuu, käytetään master-listaa. */
  testimonials?: Testimonial[];
  /** Otsikko karusellin yläpuolelle. Jos `null`, otsikko piilotetaan. */
  title?: string | null;
  /** Animaation kesto sekunteina (oletus skaalautuu korttien määrästä). */
  durationSec?: number;
}

/**
 * Arvostelukaruselli kahdella rivillä (Eerik 28.10.2026): puolet arvosteluista ylärivillä vasemmalle,
 * puolet alarivillä oikealle. Pienellä setillä (alle MIN_FOR_TWO_ROWS) vain yksi rivi.
 */
const TestimonialsMarquee = ({ testimonials, title, durationSec }: TestimonialsMarqueeProps = {}) => {
  const data = useMemo(
    () => (testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials),
    [testimonials]
  );
  const rows = useMemo(
    () =>
      data.length >= MIN_FOR_TWO_ROWS
        ? [data.filter((_, i) => i % 2 === 0), data.filter((_, i) => i % 2 === 1)]
        : [data],
    [data]
  );

  // Kokeilu (31.10.2026): "Vähennä liikettä" ohitetaan, karuselli liikkuu aina ja pysähtyy hoverilla/kosketuksella/fokuksella.
  const reducedMotion = false;

  // Esirenderöintiin ja ensimmäiseen renderöintiin vain yksi sarja arvosteluja (V13: kopiot
  // paisuttivat HTML:ää ja toistivat saman tekstin neljästi). Saumattoman loopin kopiot
  // lisätään vasta selaimessa ja piilotetaan ruudunlukijoilta.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Arvostelun painaminen pysäyttää molemmat rivit ja painallus muualle jatkaa (hiiri myös kortin päällä CSS:llä).
  const [pysaytetty, setPysaytetty] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    // click, ei pointerdown: sormella vieritys ei tuota clickiä, joten se ei pysäytä. Kopiokortit ovat inert,
    // joten osuma voi tulla vain rivin säiliöön (.marquee-viewport); se lasketaan arvosteluksi.
    const onDown = (e: MouseEvent) => {
      // Pysähtyy vain arvostelukorttia painamalla; painallus muualle (myös lohkon sisällä) jatkaa.
      const kortti = (e.target as Element | null)?.closest?.(".kortti, .marquee-viewport");
      setPysaytetty(Boolean(kortti && sectionRef.current?.contains(kortti)));
    };
    document.addEventListener("click", onDown);
    return () => document.removeEventListener("click", onDown);
  }, []);

  const headingText = title === undefined ? "Mitä asiakkaat sanovat meistä?" : title;

  return (
    <section
      ref={sectionRef}
      data-pysaytetty={pysaytetty}
      data-arvostelu="karuselli"
      className={`overflow-hidden osio ${headingText ? "section-padding pt-28 md:pt-16" : "py-8"}`}
      aria-label="Asiakasarvostelut"
    >
      {headingText && (
        <div className="section-container mb-4 text-center">
          <h2 className="heading-style text-2xl md:text-3xl text-accent-ink">
            {headingText}
          </h2>
        </div>
      )}

      <div className="-my-5">
        {rows.map((row, i) => (
          <MarqueeRow
            key={i}
            data={row}
            reverse={i % 2 === 1}
            reducedMotion={reducedMotion}
            mounted={mounted}
            durationSec={durationSec}
            label={rows.length > 1 ? `Arvostelut, vieritettävä lista ${i + 1}/${rows.length}` : "Arvostelut, vieritettävä lista"}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsMarquee;
