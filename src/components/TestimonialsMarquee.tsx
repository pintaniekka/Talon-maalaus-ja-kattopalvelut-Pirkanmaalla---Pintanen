import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { allTestimonials, type Testimonial } from "@/data/testimonialsData";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const defaultTestimonials: Testimonial[] = allTestimonials;

/** Tätä pidempi arvostelu leikataan kortissa ja avataan kokonaisena ikkunaan. */
const LONG_TEXT_THRESHOLD = 180;
/** Kahdelle riville jaetaan vasta, kun arvosteluja on tämän verran; pienempi setti pysyy yhdellä rivillä. */
const MIN_FOR_TWO_ROWS = 6;

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill={filled ? "#FBBF24" : "#D1D5DB"} aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Stars = ({ stars }: { stars: number }) => (
  <div className="flex gap-0.5" role="img" aria-label={`${stars} tähteä viidestä`}>
    {Array.from({ length: 5 }, (_, i) => (
      <StarIcon key={i} filled={i < stars} />
    ))}
  </div>
);

/**
 * Yksi arvostelu karusellissa: nimikirjaimet, nimi, tähdet, teksti ja Google-merkki.
 * Pitkä arvostelu leikataan viiteen riviin ja avataan kokonaisena ikkunaan (Eerik 28.10.2026: kortit
 * samankorkuisia kahdella rivillä, pitkät arvostelut silti luettavissa sanasta sanaan).
 */
export const TestimonialCard = ({ name, stars, text }: { name: string; stars: number; text: string }) => {
  const isLong = text.length > LONG_TEXT_THRESHOLD;
  const [open, setOpen] = useState(false);

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
            onClick={() => setOpen(true)}
            className="mb-3 self-start rounded text-xs font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          >
            Lue koko arvostelu
          </button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg rounded-3xl">
              <DialogHeader className="text-left">
                <DialogTitle className="flex items-center gap-3 font-heading">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary" aria-hidden="true">
                    {getInitials(name)}
                  </span>
                  {name}
                </DialogTitle>
                <Stars stars={stars} />
              </DialogHeader>
              <DialogDescription className="text-[15px] leading-relaxed text-foreground">"{text}"</DialogDescription>
              <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <GoogleIcon />
                  Google-arvostelu
                </span>
                <Link to="/kokemuksia/" className="font-semibold text-primary hover:underline">
                  Kaikki arvostelut
                </Link>
              </div>
            </DialogContent>
          </Dialog>
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

  const reducedMotion = useReducedMotion();

  // Esirenderöintiin ja ensimmäiseen renderöintiin vain yksi sarja arvosteluja (V13: kopiot
  // paisuttivat HTML:ää ja toistivat saman tekstin neljästi). Saumattoman loopin kopiot
  // lisätään vasta selaimessa ja piilotetaan ruudunlukijoilta.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const headingText = title === undefined ? "Mitä asiakkaat sanovat meistä?" : title;

  return (
    <section
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
