/**
 * Google Analytics 4 evästesuostumuksella.
 *
 * - Ennen suostumusta Googlelle ei lähde yhtään pyyntöä eikä evästeitä aseteta: gtag.js ladataan vasta hyväksynnän jälkeen.
 * - Consent Mode v2: kaikki tarkoitukset oletuksena "denied"; hyväksyntä sallii vain analytiikan, mainonta pysyy kiellettynä.
 * - Tapahtumiin ei lähetetä henkilötietoja (ei nimeä, puhelinta, sähköpostia, osoitetta eikä lomakkeen sisältöä).
 */
export const GA_MEASUREMENT_ID = "G-QCNVJFMDFY";

const STORAGE_KEY = "pintanen-evasteet";
const OPEN_EVENT = "pintanen:evasteasetukset";
/** GA-evästeiden voimassaolo: 14 kuukautta (sekunteina). */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 * 14;

export type ConsentChoice = "granted" | "denied";

type GtagArgs = unknown[];
declare global {
  interface Window {
    dataLayer?: GtagArgs[];
    gtag?: (...args: GtagArgs) => void;
  }
}

let gaLoaded = false;

export const getStoredConsent = (): ConsentChoice | null => {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
};

const storeConsent = (choice: ConsentChoice) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Yksityinen selaus tms.: valinta on voimassa vain tämän sivulatauksen ajan.
  }
};

const ensureGtag = () => {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    // gtag.js odottaa arguments-oliota, ei taulukkoa.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as GtagArgs);
    };
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  }
};

const loadGa = () => {
  if (gaLoaded) return;
  gaLoaded = true;
  ensureGtag();
  window.gtag!("consent", "update", { analytics_storage: "granted" });
  window.gtag!("js", new Date());
  window.gtag!("config", GA_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: COOKIE_MAX_AGE,
    cookie_flags: "SameSite=Lax;Secure",
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

const deleteGaCookies = () => {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid");
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
};

/** Tallentaa valinnan ja toimii sen mukaan. */
export const setConsent = (choice: ConsentChoice) => {
  storeConsent(choice);
  if (choice === "granted") {
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
    loadGa();
    if (gaLoaded) window.gtag?.("consent", "update", { analytics_storage: "granted" });
    return;
  }
  // Hylkäys tai suostumuksen peruutus: mittaus pois ja evästeet poistetaan.
  (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  if (gaLoaded) window.gtag?.("consent", "update", { analytics_storage: "denied" });
  deleteGaCookies();
};

/** Kutsutaan kerran sivun latautuessa: jos kävijä on aiemmin hyväksynyt, mittaus käynnistyy. */
export const initAnalytics = () => {
  if (getStoredConsent() === "granted") loadGa();
};

const analyticsOn = () => gaLoaded && getStoredConsent() === "granted";

/** ä→a, välit alaviivoiksi: GA4:n parametrin arvo ilman erikoismerkkejä. */
const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[äå]/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

/** Lähettää tapahtuman vain, jos kävijä on hyväksynyt analytiikan. Parametreihin ei saa laittaa henkilötietoja. */
export const trackEvent = (name: string, params: Record<string, string> = {}) => {
  if (!analyticsOn()) return;
  window.gtag?.("event", name, params);
};

/** Lomakkeen onnistunut lähetys. Mukana vain lomakkeen nimi. */
export const trackLead = (formName?: string) => trackEvent("generate_lead", { form_name: slug(formName || "tuntematon") });

/** WhatsApp-, puhelin-, sähköposti- ja tarjouspyyntölinkkien klikkaukset yhdellä kuuntelijalla. */
export const initClickTracking = () => {
  document.addEventListener(
    "click",
    (event) => {
      if (!analyticsOn()) return;
      const target = event.target instanceof Element ? event.target.closest("a, button") : null;
      if (!target) return;
      if (target.closest('[data-track="tarjouspyynto"]')) {
        trackEvent("tarjouspyynto_click");
        return;
      }
      if (!(target instanceof HTMLAnchorElement)) return;
      const href = target.getAttribute("href") || "";
      if (href.startsWith("https://wa.me") || href.includes("whatsapp.com")) trackEvent("whatsapp_click");
      else if (href.startsWith("tel:")) trackEvent("phone_click");
      else if (href.startsWith("mailto:")) trackEvent("email_click");
      else if (href.startsWith("/tarjouspyynto")) trackEvent("tarjouspyynto_click");
    },
    { capture: true, passive: true },
  );
};

/** Avaa evästebannerin uudelleen (alatunnisteen "Evästeasetukset"). */
export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN_EVENT));
export const onOpenConsentSettings = (handler: () => void) => {
  window.addEventListener(OPEN_EVENT, handler);
  return () => window.removeEventListener(OPEN_EVENT, handler);
};
