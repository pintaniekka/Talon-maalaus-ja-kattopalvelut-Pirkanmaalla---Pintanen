import { useState, useRef, useCallback, useEffect } from "react";
import OptimizedImage from "./OptimizedImage";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  aspectRatio?: string;
  beforeSrcSet?: string;
  afterSrcSet?: string;
  /** Lisäluokat kehykselle, esimerkiksi suurempi pyöristys tai kortin sisällä "rounded-none shadow-none". */
  className?: string;
}

/**
 * Jakoviivan kallistus asteina (Eerik 13.10.2026: pieni kallistus, jotta liukusäädin ei näytä
 * samalta kuin kaikilla muilla sivustoilla). Ennen-kuva leikataan vinolla monikulmiolla ja viiva
 * käännetään samaan kulmaan; kahva pysyy pystyssä keskellä.
 */
const TILT_DEG = 4;
const TILT = Math.tan((TILT_DEG * Math.PI) / 180);

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeAlt = "Tiilikatto ennen käsittelyä – kulunut ja sammaleinen pinta",
  afterAlt = "Tiilikatto käsittelyn jälkeen – suojattu ja uudenveroinen",
  aspectRatio = "4/3",
  beforeSrcSet,
  afterSrcSet,
  className,
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  /** Vinon viivan vaakasiirtymä ylä- ja alareunassa pikseleinä (puolet korkeudesta × tan 4°). */
  const [tiltOffset, setTiltOffset] = useState(0);
  const didDrag = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const positionFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSliderPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const handleMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      didDrag.current = true;
      positionFromClientX(e.touches[0].clientX);
    },
    [isDragging, positionFromClientX],
  );

  // Hiirellä vedettäessä seurataan koko ikkunaa: ote ei irtoa, vaikka osoitin
  // karkaa kortin ulkopuolelle. Kosketus toimii elementin omilla tapahtumilla.
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      didDrag.current = true;
      positionFromClientX(e.clientX);
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging, positionFromClientX]);

  // Kallistuksen siirtymä riippuu kortin korkeudesta, joten se mitataan ja päivitetään koon muuttuessa.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setTiltOffset((el.getBoundingClientRect().height / 2) * TILT);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePointerDown = useCallback(() => {
    setIsDragging(true);
    didDrag.current = false;
  }, []);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (didDrag.current) {
      e.preventDefault();
      e.stopPropagation();
      didDrag.current = false;
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setSliderPosition((p) => Math.max(0, p - step));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setSliderPosition((p) => Math.min(100, p + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPosition(100);
    }
  }, []);

  // Ennen-kuva näkyy vinon viivan vasemmalla puolella: yläreunassa viiva on hieman oikeampana kuin alareunassa.
  const clipPath = `polygon(0 0, calc(${sliderPosition}% + ${tiltOffset}px) 0, calc(${sliderPosition}% - ${tiltOffset}px) 100%, 0 100%)`;

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden cursor-ew-resize select-none touch-pan-y bg-muted min-h-[260px] sm:min-h-0 shadow-lg ${className ?? ""}`}
      style={{ aspectRatio }}
      ref={containerRef}
      onMouseDown={(e) => {
        e.preventDefault();
        handlePointerDown();
      }}
      onTouchStart={handlePointerDown}
      onTouchEnd={handlePointerUp}
      onTouchMove={handleMove}
      onClick={handleClick}
    >
      <OptimizedImage
        src={afterImage}
        srcSet={afterSrcSet}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      <div className="absolute inset-0 overflow-hidden" style={{ clipPath }}>
        <OptimizedImage
          src={beforeImage}
          srcSet={beforeSrcSet}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Vino jakoviiva: vaaleansininen ilman ääriviivaa (Eerik 14.10.2026). */}
      <div
        className="absolute -top-[5%] -bottom-[5%] w-[3px] bg-accent pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: `translateX(-50%) rotate(${TILT_DEG}deg)` }}
        aria-hidden="true"
      />

      {/* Kahva: pehmeä vaaleansininen pallo ja ohuet nuolet. Näppäimistöllä nuolinäppäimet siirtävät viivaa. */}
      <div
        role="slider"
        tabIndex={0}
        aria-label="Vertaa ennen ja jälkeen"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuetext={`Ennen-kuvaa näkyy ${Math.round(sliderPosition)} prosenttia`}
        onKeyDown={handleKeyDown}
        className="absolute top-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent text-white shadow-[0_6px_18px_rgba(0,0,0,0.28)] flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
        style={{ left: `${sliderPosition}%` }}
      >
        <svg width="26" height="14" viewBox="0 0 26 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 1 3 7l6 6" />
          <path d="m17 1 6 6-6 6" />
        </svg>
      </div>

      <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-navy/85 text-navy-foreground font-heading font-extrabold uppercase tracking-[0.14em] text-[11px]">
        Ennen
      </div>
      <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-accent-strong text-accent-foreground font-heading font-extrabold uppercase tracking-[0.14em] text-[11px] shadow-md">
        Jälkeen
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
