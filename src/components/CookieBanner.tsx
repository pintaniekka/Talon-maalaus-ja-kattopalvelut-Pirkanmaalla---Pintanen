import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getStoredConsent, initAnalytics, initClickTracking, onOpenConsentSettings, setConsent, type ConsentChoice } from "@/lib/analytics";

/**
 * Evästebanneri. Näkyy, kunnes kävijä on valinnut, ja avautuu uudelleen alatunnisteen linkistä.
 * Renderöidään vasta selaimessa (ei esirenderöidyssä HTML:ssä) ja kiinteänä kerroksena, joten sivu ei hypi.
 * "Hylkää" ja "Hyväksy" ovat samannäköiset ja samankokoiset.
 */
const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    initAnalytics();
    initClickTracking();
    if (getStoredConsent() === null) setVisible(true);
    return onOpenConsentSettings(() => setVisible(true));
  }, []);

  if (!visible) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setVisible(false);
  };

  const button =
    "flex-1 sm:flex-none min-h-[44px] px-5 rounded-xl border-2 border-foreground bg-background text-foreground font-semibold text-sm transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <div
      role="region"
      aria-label="Evästeet"
      className="fixed z-[70] left-3 right-3 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:left-4 lg:right-auto lg:bottom-4 lg:max-w-md rounded-2xl border border-border bg-card p-3 lg:p-4 shadow-2xl"
    >
      <p className="text-[13px] lg:text-sm text-foreground leading-snug lg:leading-relaxed">
        Käytämme evästeitä sivuston kävijämäärän seuraamiseen. Voit hyväksyä tai hylätä ne.{" "}
        <Link to="/tietosuoja" className="underline underline-offset-2">
          Tietosuojaseloste
        </Link>
      </p>
      {/* Puhelimessa oikea alakulma jää vapaaksi chat-napille. */}
      <div className="mt-2.5 flex gap-3 pr-16 lg:pr-0">
        <button type="button" onClick={() => choose("denied")} className={button}>
          Hylkää
        </button>
        <button type="button" onClick={() => choose("granted")} className={button}>
          Hyväksy
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
