import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { getStoredConsent, initAnalytics, initClickTracking, onOpenConsentSettings, setConsent } from "@/lib/analytics";

/**
 * Evästebanneri. Ensimmäisessä näkymässä "Hyväksy" ja "Asetukset"; asetuksissa välttämättömät (aina päällä)
 * ja analytiikka (valinta). Näkyy, kunnes kävijä on valinnut, ja avautuu uudelleen alatunnisteen linkistä.
 * Renderöidään vasta selaimessa ja kiinteänä kerroksena, joten sivu ei hypi.
 */
const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    initAnalytics();
    initClickTracking();
    if (getStoredConsent() === null) setVisible(true);
    return onOpenConsentSettings(() => {
      setAnalytics(getStoredConsent() === "granted");
      setSettingsOpen(true);
      setVisible(true);
    });
  }, []);

  if (!visible) return null;

  const close = (granted: boolean) => {
    setConsent(granted ? "granted" : "denied");
    setVisible(false);
    setSettingsOpen(false);
  };

  const primary =
    "min-h-[44px] px-5 rounded-xl bg-accent-strong text-accent-foreground font-bold text-sm shadow-md transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";
  const secondary =
    "min-h-[44px] px-5 rounded-xl border border-border bg-background text-foreground font-semibold text-sm transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <div
      role="region"
      aria-label="Evästeet"
      className="fixed z-[70] left-3 right-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:left-4 lg:right-auto lg:bottom-4 lg:w-[26rem] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-accent via-paint-yellow to-accent" aria-hidden="true" />
      <div className="p-4 lg:p-5">
        <p className="font-heading font-bold text-foreground mb-1">Evästeet</p>
        <p className="text-[13px] lg:text-sm text-muted-foreground leading-snug lg:leading-relaxed">
          Käytämme evästeitä sivuston kävijämäärän seuraamiseen.{" "}
          <Link to="/tietosuoja" className="underline underline-offset-2 text-foreground">
            Tietosuojaseloste
          </Link>
        </p>

        {settingsOpen && (
          <div className="mt-3 space-y-2">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-background px-3 py-2.5">
              <span className="mt-0.5 w-5 h-5 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                <Check className="w-3.5 h-3.5 text-muted-foreground" />
              </span>
              <span className="text-[13px] leading-snug">
                <span className="font-semibold text-foreground">Välttämättömät</span>
                <span className="block text-muted-foreground">Sivuston toiminta ja tämän valinnan muistaminen. Aina käytössä.</span>
              </span>
            </div>
            <label className="flex items-start gap-3 rounded-xl border border-border bg-background px-3 py-2.5 cursor-pointer">
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="mt-0.5 w-5 h-5 rounded accent-[hsl(var(--accent-strong))] flex-shrink-0" />
              <span className="text-[13px] leading-snug">
                <span className="font-semibold text-foreground">Analytiikka</span>
                <span className="block text-muted-foreground">Kävijämäärän seuranta Google Analyticsilla.</span>
              </span>
            </label>
          </div>
        )}

        {/* Puhelimessa oikea alakulma jää vapaaksi chat-napille. */}
        <div className="mt-3 flex flex-wrap gap-2.5 pr-16 lg:pr-0">
          <button type="button" onClick={() => close(true)} className={`${primary} flex-1 sm:flex-none`}>
            {settingsOpen ? "Hyväksy kaikki" : "Hyväksy"}
          </button>
          {settingsOpen ? (
            <button type="button" onClick={() => close(analytics)} className={secondary}>
              Tallenna valinnat
            </button>
          ) : (
            <button type="button" onClick={() => setSettingsOpen(true)} className={secondary}>
              Asetukset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
