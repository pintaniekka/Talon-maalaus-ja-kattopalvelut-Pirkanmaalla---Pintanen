import { Phone, FileText } from "@/components/icons/BrandIcons";
import { openQuoteDrawer } from "@/components/DesktopQuoteDrawer";

const MobileBottomBar = () => {
  return (
    <nav
      aria-label="Mobiilitoiminnot"
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden rounded-t-2xl border-t border-white/40 bg-card/85 px-3 pb-[env(safe-area-inset-bottom)] backdrop-blur-md"
    >
      <div className="flex items-center gap-3 p-3 shadow-[0_-8px_32px_hsl(var(--navy)/0.18)]">
        <a
          href="tel:+358409640066"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 min-h-[48px] rounded-xl bg-accent-strong text-accent-foreground font-semibold text-sm tracking-tight transition-all duration-200 active:scale-[0.98]"
        >
          <Phone className="w-5 h-5" />
          Soita meille
        </a>
        <button
          onClick={() => openQuoteDrawer()}
          data-track="tarjouspyynto"
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 min-h-[48px] rounded-xl bg-navy text-navy-foreground font-semibold text-sm tracking-tight shadow-lg shadow-navy/20 transition-all duration-200 active:scale-[0.98]"
        >
          <FileText className="w-5 h-5 text-paint-yellow" />
          Pyydä tarjous
        </button>
      </div>
    </nav>
  );
};

export default MobileBottomBar;
