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
}

const BeforeAfterSlider = ({
  beforeImage,
  afterImage,
  beforeAlt = "Tiilikatto ennen käsittelyä – kulunut ja sammaleinen pinta",
  afterAlt = "Tiilikatto käsittelyn jälkeen – suojattu ja uudenveroinen",
  aspectRatio = "4/3",
  beforeSrcSet,
  afterSrcSet,
}: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const didDrag = useRef(false);

  const handleMove = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    didDrag.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Hiirellä vedettäessä seurataan koko ikkunaa: ote ei irtoa, vaikka osoitin
  // karkaa kortin ulkopuolelle. Kosketus toimii elementin omilla tapahtumilla.
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      didDrag.current = true;
      const rect = el.getBoundingClientRect();
      setSliderPosition(Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)));
    };
    const onUp = () => setIsDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging]);

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

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden cursor-ew-resize select-none touch-pan-y bg-muted min-h-[260px] sm:min-h-0"
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

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <OptimizedImage
          src={beforeImage}
          srcSet={beforeSrcSet}
          alt={beforeAlt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground/80"
        style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-foreground shadow-lg flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-primary" />
            <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-primary" />
          </div>
        </div>
      </div>

      <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-foreground/70 text-primary-foreground font-semibold text-xs">
        Ennen
      </div>
      <div className="absolute top-3 right-3 px-3 py-1 rounded-md bg-accent-strong/90 text-accent-foreground font-semibold text-xs">
        Jälkeen
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
