import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

// Sallitut lähettäjäoriginit: tuotanto, paikallinen kehitys ja Lovablen esikatselut.
// Muualta tulevat pyynnöt hylätään, mikä estää suoran spämmin lomake-endpointtiin.
const ALLOWED_ORIGIN_PATTERNS: RegExp[] = [
  /^https:\/\/(www\.)?pintanen\.fi$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
  /^https:\/\/[a-z0-9-]+\.lovable\.app$/,
  /^https:\/\/[a-z0-9-]+\.lovableproject\.com$/,
];

const isAllowedOrigin = (origin: string | null): origin is string =>
  !!origin && ALLOWED_ORIGIN_PATTERNS.some((re) => re.test(origin));

const buildCorsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Vary": "Origin",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
});

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  priceEstimate?: string;
  calculatorDetails?: string;
  address?: string;
  city?: string;
  /** Honeypot – oikea käyttäjä ei täytä. */
  website?: string;
}

const serviceLabels: Record<string, string> = {
  tiilikatto: "Tiilikaton pinnoitus",
  ulkomaalaus: "Ulkomaalaus",
  puhdistus: "Katon puhdistus",
  muu: "Muu",
};

// CRM:n (pintanen-pro-tools) service_type-enum kayttaa arvoa "katon_puhdistus",
// tama sivusto taas lahettaa "puhdistus" - yhdista avaimet tassa ennen
// CRM:lle lahettamista, ala laheta ihmisluettavaa labelia.
const crmServiceKeys: Record<string, string> = {
  tiilikatto: "tiilikatto",
  ulkomaalaus: "ulkomaalaus",
  puhdistus: "katon_puhdistus",
  muu: "muu",
};

// Lomake voi lähettää useita palveluita pilkulla eroteltuna ("tiilikatto, puhdistus").
// CRM ottaa yhden avaimen: käytetään ensimmäistä tunnistettua.
const toCrmServiceKey = (service: string): string => {
  const keys = service.split(",").map((s) => s.trim()).filter(Boolean);
  const known = keys.find((k) => k in crmServiceKeys);
  return known ? crmServiceKeys[known] : "muu";
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const normalize = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const CRM_ENDPOINT = "https://app.pintanen.fi/api/public/vastaanota-liidi";

const sendToCrm = async (lead: {
  nimi: string;
  puhelin: string;
  sahkoposti: string;
  osoite: string;
  kaupunki: string;
  palvelu: string;
  kuvaus: string;
}) => {
  try {
    const secret = Deno.env.get("LEAD_INTAKE_SECRET");
    if (!secret) {
      console.error("CRM lead intake skipped: LEAD_INTAKE_SECRET is not configured");
      return;
    }

    const res = await fetch(CRM_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nimi: lead.nimi,
        puhelin: lead.puhelin,
        sahkoposti: lead.sahkoposti,
        osoite: lead.osoite || null,
        kaupunki: lead.kaupunki || null,
        palvelu: lead.palvelu,
        kuvaus: lead.kuvaus,
      }),
    });

    if (!res.ok) {
      console.error("CRM lead intake failed:", res.status, await res.text());
    }
  } catch (crmError) {
    console.error("CRM lead intake error:", crmError);
  }
};

serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }
  const corsHeaders = buildCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(apiKey);
    const body: Partial<ContactForm> = await req.json();
    const name = normalize(body.name, 100);
    const email = normalize(body.email, 255);
    const phone = normalize(body.phone, 50);
    const service = normalize(body.service, 100);
    const message = normalize(body.message, 2000);
    const priceEstimate = normalize(body.priceEstimate, 100);
    const calculatorDetails = normalize(body.calculatorDetails, 1000);
    const address = normalize(body.address, 200);
    const city = normalize(body.city, 100);
    const honeypot = normalize(body.website, 200);

    // Botti täytti piilotetun kentän: vastataan kuin onnistui, mutta ei lähetetä mitään.
    if (honeypot) {
      console.warn("Honeypot triggered, dropping submission");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!name) {
      return new Response(JSON.stringify({ error: "Nimi on pakollinen" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!email && !phone) {
      return new Response(JSON.stringify({ error: "Anna puhelinnumero tai sähköposti" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (email && !emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: "Virheellinen sähköposti" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const serviceLabel = serviceLabels[service] || service || "Ei valittu";
    const isCalculatorLead = Boolean(priceEstimate || calculatorDetails);
    const subject = isCalculatorLead
      ? `Hintalaskuri: ${name} – ${serviceLabel}`
      : `Tarjouspyyntö: ${name} – ${serviceLabel}`;
    const heading = isCalculatorLead
      ? "Uusi hintalaskurin käyttäjä pintanen.fi-sivustolta"
      : "Uusi tarjouspyyntö pintanen.fi-sivustolta";

    const crmPromise = sendToCrm({
      nimi: name,
      puhelin: phone,
      sahkoposti: email,
      osoite: address,
      kaupunki: city,
      palvelu: toCrmServiceKey(service),
      kuvaus: message,
    });

    const emailResponse = await resend.emails.send({
      from: "Pintanen.fi <noreply@pintanen.fi>",
      to: ["myynti@pintanen.fi"],
      reply_to: email || undefined,
      subject,
      html: `
        <h2>${escapeHtml(heading)}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px;">
          <tr><td style="padding:8px;font-weight:bold;">Nimi</td><td style="padding:8px;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Sähköposti</td><td style="padding:8px;">${email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : "–"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Puhelin</td><td style="padding:8px;">${phone ? escapeHtml(phone) : "–"}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;">Palvelu</td><td style="padding:8px;">${escapeHtml(serviceLabel)}</td></tr>
          ${address || city ? `<tr><td style="padding:8px;font-weight:bold;">Kohde</td><td style="padding:8px;">${escapeHtml([address, city].filter(Boolean).join(", "))}</td></tr>` : ""}
          ${priceEstimate ? `<tr><td style="padding:8px;font-weight:bold;">Hinta-arvio</td><td style="padding:8px;">${escapeHtml(priceEstimate)}</td></tr>` : ""}
          ${calculatorDetails ? `<tr><td style="padding:8px;font-weight:bold;">Laskurin tiedot</td><td style="padding:8px;">${escapeHtml(calculatorDetails)}</td></tr>` : ""}
        </table>
        ${message ? `<h3>Viesti</h3><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>` : ""}
      `,
    });

    if (emailResponse.error) {
      console.error("Resend returned an error:", emailResponse.error);
      return new Response(JSON.stringify({ error: "Sähköpostin lähetys epäonnistui" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Email sent:", emailResponse.data?.id ?? "unknown");

    await crmPromise;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
