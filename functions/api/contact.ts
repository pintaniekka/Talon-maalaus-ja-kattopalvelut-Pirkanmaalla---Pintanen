/**
 * Yhteydenottolomakkeen vastaanotto (Cloudflare Pages Function, osoite /api/contact).
 *
 * Tekee kaksi asiaa jokaiselle hyväksytylle lähetykselle:
 *  1. lähettää sähköpostin myyntiin Resendillä (reply-to = asiakkaan osoite)
 *  2. välittää liidin CRM:ään (app.pintanen.fi). CRM-virhe ei kaada lomaketta:
 *     sähköposti lähtee silti ja virhe kirjataan lokiin.
 *
 * Salaisuudet ovat Pages-projektin asetuksissa (RESEND_API_KEY, LEAD_INTAKE_SECRET),
 * eivät koodissa. Tarkistusjärjestys on tarkoituksella: origin → metodi → runko →
 * honeypot → kentät → vasta sitten salaisuudet. Näin väärät pyynnöt hylätään ilman,
 * että avaimia edes luetaan, ja tarkistukset voi testata ympäristössä, jossa niitä ei ole.
 */

interface Env {
  RESEND_API_KEY?: string;
  LEAD_INTAKE_SECRET?: string;
}

interface PagesContext {
  request: Request;
  env: Env;
}

// Sallitut lähettäjät: tuotanto, paikallinen kehitys ja tämän Pages-projektin esikatselut.
const ALLOWED_ORIGIN_PATTERNS: RegExp[] = [
  /^https:\/\/(www\.)?pintanen\.fi$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https:\/\/[a-z0-9-]+\.talon-maalaus-ja-kattopalvelut-pirkanmaalla---pintanen\.pages\.dev$/,
];

const MAX_BODY_BYTES = 20_000;
const MAIL_FROM = "Pintanen.fi <noreply@pintanen.fi>";
const MAIL_TO = "myynti@pintanen.fi";
const RESEND_ENDPOINT = "https://api.resend.com/emails";
const CRM_ENDPOINT = "https://app.pintanen.fi/api/public/vastaanota-liidi";

const serviceLabels: Record<string, string> = {
  tiilikatto: "Tiilikaton pinnoitus",
  ulkomaalaus: "Ulkomaalaus",
  puhdistus: "Katon puhdistus",
  muu: "Muu",
};

// CRM:n service_type käyttää arvoa "katon_puhdistus", sivusto lähettää "puhdistus".
const crmServiceKeys: Record<string, string> = {
  tiilikatto: "tiilikatto",
  ulkomaalaus: "ulkomaalaus",
  puhdistus: "katon_puhdistus",
  muu: "muu",
};

// Lomake voi lähettää useita palveluita pilkulla eroteltuna ("tiilikatto, puhdistus").
// CRM ottaa yhden avaimen: käytetään ensimmäistä tunnistettua.
export const toCrmServiceKey = (service: string): string => {
  const keys = service.split(",").map((s) => s.trim()).filter(Boolean);
  const known = keys.find((k) => k in crmServiceKeys);
  return known ? crmServiceKeys[known] : "muu";
};

const toServiceLabel = (service: string): string => {
  const labels = service
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((k) => serviceLabels[k] ?? k);
  return labels.length ? labels.join(", ") : "Ei valittu";
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const normalize = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export const isAllowedOrigin = (origin: string | null): origin is string =>
  !!origin && ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin));

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  Vary: "Origin",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
});

const json = (body: unknown, status: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...headers },
  });

interface Lead {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  priceEstimate: string;
  calculatorDetails: string;
  address: string;
  city: string;
}

const buildEmailHtml = (lead: Lead, heading: string, serviceLabel: string) => {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px;font-weight:bold;">${label}</td><td style="padding:8px;">${value}</td></tr>`;
  const place = [lead.address, lead.city].filter(Boolean).join(", ");
  return `
    <h2>${escapeHtml(heading)}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:500px;">
      ${row("Nimi", escapeHtml(lead.name))}
      ${row("Sähköposti", lead.email ? `<a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a>` : "–")}
      ${row("Puhelin", lead.phone ? escapeHtml(lead.phone) : "–")}
      ${row("Palvelu", escapeHtml(serviceLabel))}
      ${place ? row("Kohde", escapeHtml(place)) : ""}
      ${lead.priceEstimate ? row("Hinta-arvio", escapeHtml(lead.priceEstimate)) : ""}
      ${lead.calculatorDetails ? row("Laskurin tiedot", escapeHtml(lead.calculatorDetails)) : ""}
    </table>
    ${lead.message ? `<h3>Viesti</h3><p>${escapeHtml(lead.message).replace(/\n/g, "<br>")}</p>` : ""}
  `;
};

/** Välitä liidi CRM:ään. Ei koskaan heitä: virheet kirjataan lokiin. */
const sendToCrm = async (lead: Lead, secret: string | undefined): Promise<void> => {
  try {
    if (!secret) {
      console.error("CRM: LEAD_INTAKE_SECRET puuttuu, liidiä ei välitetty");
      return;
    }
    const res = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        nimi: lead.name,
        puhelin: lead.phone,
        sahkoposti: lead.email,
        osoite: lead.address || null,
        kaupunki: lead.city || null,
        palvelu: toCrmServiceKey(lead.service),
        kuvaus: lead.message,
      }),
    });
    if (!res.ok) console.error("CRM: liidin välitys epäonnistui", res.status, (await res.text()).slice(0, 300));
  } catch (error) {
    console.error("CRM: liidin välitys kaatui", error);
  }
};

export const onRequest = async ({ request, env }: PagesContext): Promise<Response> => {
  const origin = request.headers.get("origin");
  if (!isAllowedOrigin(origin)) return json({ error: "Forbidden" }, 403);
  const cors = corsHeaders(origin);

  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { ...cors, Allow: "POST, OPTIONS" });

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: "Viesti on liian pitkä" }, 413, cors);

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "Virheellinen pyyntö" }, 400, cors);
  }

  // Honeypot: piilotettu kenttä, jonka vain botit täyttävät. Vastataan kuin lähetys
  // olisi onnistunut, mutta mitään ei lähetetä.
  if (normalize(body.website, 200)) {
    console.warn("Honeypot täytetty, lähetys hylätty hiljaisesti");
    return json({ success: true }, 200, cors);
  }

  const lead: Lead = {
    name: normalize(body.name, 100),
    email: normalize(body.email, 255),
    phone: normalize(body.phone, 50),
    service: normalize(body.service, 100),
    message: normalize(body.message, 2000),
    priceEstimate: normalize(body.priceEstimate, 100),
    calculatorDetails: normalize(body.calculatorDetails, 1000),
    address: normalize(body.address, 200),
    city: normalize(body.city, 100),
  };

  if (!lead.name) return json({ error: "Nimi on pakollinen" }, 400, cors);
  if (!lead.email && !lead.phone) return json({ error: "Anna puhelinnumero tai sähköposti" }, 400, cors);
  if (lead.email && !emailRegex.test(lead.email)) return json({ error: "Virheellinen sähköposti" }, 400, cors);

  if (!env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY puuttuu Pages-projektin asetuksista");
    return json({ error: "Lomake ei ole juuri nyt käytössä. Soita 040 964 0066." }, 500, cors);
  }

  const serviceLabel = toServiceLabel(lead.service);
  const isCalculatorLead = Boolean(lead.priceEstimate || lead.calculatorDetails);
  const subject = `${isCalculatorLead ? "Hintalaskuri" : "Tarjouspyyntö"}: ${lead.name} – ${serviceLabel}`;
  const heading = isCalculatorLead
    ? "Uusi hintalaskurin käyttäjä pintanen.fi-sivustolta"
    : "Uusi tarjouspyyntö pintanen.fi-sivustolta";

  // CRM-välitys käynnistetään rinnalle; sen epäonnistuminen ei vaikuta vastaukseen.
  const crmPromise = sendToCrm(lead, env.LEAD_INTAKE_SECRET);

  let emailOk = false;
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [MAIL_TO],
        ...(lead.email ? { reply_to: lead.email } : {}),
        subject,
        html: buildEmailHtml(lead, heading, serviceLabel),
      }),
    });
    emailOk = res.ok;
    if (!res.ok) console.error("Resend: lähetys epäonnistui", res.status, (await res.text()).slice(0, 300));
  } catch (error) {
    console.error("Resend: lähetys kaatui", error);
  }

  await crmPromise;

  if (!emailOk) return json({ error: "Sähköpostin lähetys epäonnistui" }, 502, cors);
  return json({ success: true }, 200, cors);
};
