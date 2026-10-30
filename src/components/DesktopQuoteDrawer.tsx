import { useState, useEffect, useCallback, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

/** Lomakelaatikko (TarjousLaatikko.tsx) on oma pakettinsa: pääpaketissa on vain reunan nappi (30.10.2026). */
const lataaLaatikko = () => import("./TarjousLaatikko");
const TarjousLaatikko = lazyWithRetry(lataaLaatikko);

// Global open trigger – allows any component to open the drawer
let globalOpenFn: (() => void) | null = null;
export const openQuoteDrawer = () => globalOpenFn?.();

const DesktopQuoteDrawer = () => {
  // Eerik 26.10.2026: pinnoitussivuilla sana on kuntotarkastus, maalauksessa arviokäynti.
  // Katon sivuilla sana on "kuntotarkastus" (myös /ilmainen-katon-kuntotarkastus/, Eerik 26.10.2026), muualla "arviokäynti".
  const pathname = useLocation().pathname;
  const ctaLabel = pathname.includes("pinnoitus") || pathname.includes("kuntotarkastus") ? "Pyydä ilmainen kuntotarkastus" : "Pyydä ilmainen arviokäynti";
  const [open, setOpen] = useState(false);
  // Laatikko pysyy mukana ensimmäisen avauksen jälkeen, jotta sulkemisanimaatio ja täytetyt kentät säilyvät.
  const [avattu, setAvattu] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
    setAvattu(true);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  // Register the global opener
  useEffect(() => {
    globalOpenFn = handleOpen;
    return () => { globalOpenFn = null; };
  }, [handleOpen]);

  // Notify other floating UI (chat) when drawer opens/closes
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("quote-drawer-toggle", { detail: open }));
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Fixed right-edge CTA tab — desktop only */}
      <button
        onClick={handleOpen}
        onPointerEnter={() => void lataaLaatikko()}
        onFocus={() => void lataaLaatikko()}
        data-track="tarjouspyynto"
        aria-label={ctaLabel}
        className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-[60] items-center justify-center cursor-pointer group"
        style={{ writingMode: "vertical-rl" }}
      >
        <span
          className="flex items-center gap-2 px-3 py-6 rounded-l-xl text-accent-foreground font-semibold text-sm tracking-wide shadow-md transition-all duration-200 group-hover:px-4 group-hover:shadow-lg"
          style={{ backgroundColor: "hsl(var(--accent-strong))" }}
        >
          {ctaLabel}
        </span>
      </button>

      {avattu && (
        <Suspense fallback={null}>
          <TarjousLaatikko open={open} onClose={handleClose} ctaLabel={ctaLabel} />
        </Suspense>
      )}
    </>
  );
};

export default DesktopQuoteDrawer;
