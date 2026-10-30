import { useState, useEffect, useRef, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { X } from 'lucide-react';
import { getStorageUrl } from '@/lib/storage';
import { lazyWithRetry } from '@/lib/lazyWithRetry';

const eerikImage = getStorageUrl('Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp');
const eemilImage = getStorageUrl('Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp');

/** Chatin kasvot (Eerik 29.10.2026): seinäsivuilla Eemil, muualla Eerik. */
export const chatinTekija = (pathname: string) =>
  /^\/(talon-maalaus-|ilmainen-julkisivun-kuntoarvio)/.test(pathname) ? { nimi: 'Eemil', image: eemilImage } : { nimi: 'Eerik', image: eerikImage };

/** Keskusteluikkuna (ChatIkkuna.tsx) on oma pakettinsa: pääpaketissa on vain nappi ja kupla (30.10.2026). */
const lataaIkkuna = () => import('./ChatIkkuna');
const ChatIkkuna = lazyWithRetry(lataaIkkuna);

const BUBBLE_TEXT = 'Moi! 👋 Pyydä tarjous tai kysy meiltä.';

// ── Main component ─────────────────────────────────────────────────────────
const ChatLeadForm = () => {
  const tekija = chatinTekija(useLocation().pathname);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [open, setOpen] = useState(false);
  // Ikkuna pysyy mukana ensimmäisen avauksen jälkeen, jotta keskustelu säilyy suljettaessa.
  const [avattu, setAvattu] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hide chat while the quote drawer is open
  useEffect(() => {
    const onToggle = (e: Event) => setDrawerOpen(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener('quote-drawer-toggle', onToggle);
    return () => window.removeEventListener('quote-drawer-toggle', onToggle);
  }, []);

  // Kupla avautuu 25 s kuluttua (Eerikin päätös 11.10.2026: 20–30 s, ei heti bannerin ja
  // alapalkin päälle) tai 40 s kuluttua sulkemisesta.
  const bubbleDelay = useRef(25000);
  const bubbleTimerRef = useRef<number | null>(null);
  useEffect(() => {
    bubbleTimerRef.current = window.setTimeout(() => { if (!open) setBubbleVisible(true); }, bubbleDelay.current);
    return () => {
      if (bubbleTimerRef.current !== null) {
        window.clearTimeout(bubbleTimerRef.current);
      }
    };
  }, [open]);

  const dismissBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBubbleVisible(false);
    bubbleDelay.current = 40000;
    if (bubbleTimerRef.current !== null) {
      window.clearTimeout(bubbleTimerRef.current);
    }
    bubbleTimerRef.current = window.setTimeout(() => {
      setBubbleVisible(true);
    }, 40000);
  };

  // Ikkunan paketti haetaan jo, kun kupla tulee näkyviin, jotta avaus on heti valmis.
  useEffect(() => {
    if (bubbleVisible) void lataaIkkuna();
  }, [bubbleVisible]);

  // Open chat
  const handleOpen = () => {
    setOpen(true);
    setAvattu(true);
    setBubbleVisible(false);
  };

  // ── Render ───────────────────────────────────────────────────────────────
  if (drawerOpen) return null;

  return (
    <>
      {/* Floating button + bubble */}
      <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[9998] flex flex-col items-end gap-2">
        <AnimatePresence>
          {bubbleVisible && !open && (
            <m.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="relative hidden lg:block"
            >
              <button
                onClick={handleOpen}
                className="bg-white text-slate-800 text-sm rounded-2xl px-4 py-2.5 pr-7 shadow-lg max-w-[220px] text-left cursor-pointer hover:shadow-xl transition-shadow"
              >
                {BUBBLE_TEXT}
              </button>
              <button
                onClick={dismissBubble}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-slate-400 hover:bg-slate-500 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Sulje"
              >
                <X className="w-3 h-3" />
              </button>
            </m.div>
          )}
        </AnimatePresence>
        {!open && (
          <button
            onClick={handleOpen}
            onPointerEnter={() => void lataaIkkuna()}
            onFocus={() => void lataaIkkuna()}
            className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-lg bg-white border-2 border-accent-strong hover:scale-105 transition-transform"
            aria-label="Avaa chat"
          >
            <img src={tekija.image} alt={`${tekija.nimi} – Pintanen`} className="w-full h-full rounded-full object-cover" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white z-10" />
          </button>
        )}
      </div>

      {avattu && (
        <Suspense fallback={null}>
          <ChatIkkuna open={open} onClose={() => setOpen(false)} tekija={tekija} />
        </Suspense>
      )}
    </>
  );
};

export default ChatLeadForm;
