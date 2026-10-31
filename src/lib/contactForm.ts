import { trackLead } from '@/lib/analytics';

export const GENERIC_FORM_ERROR = 'Lähetys ei onnistunut. Yritä uudelleen tai soita meille.';

/** Lomakkeen validointivirhe: viesti on kävijälle näytettävä suomenkielinen teksti. */
export class ContactFormValidationError extends Error {
  readonly field: keyof ContactFormPayload;

  constructor(field: keyof ContactFormPayload, message: string) {
    super(message);
    this.name = 'ContactFormValidationError';
    this.field = field;
  }
}

/**
 * Virheilmoitus kävijälle. Validointivirheestä näytetään sen oma viesti, esimerkiksi
 * "Anna puhelinnumero tai sähköposti", jotta kävijä tietää, mitä korjata. Palvelimen
 * virheteksti on suomeksi ja näytetään sellaisenaan; muusta yleinen viesti.
 */
export const formErrorMessage = (err: unknown): string => {
  if (err instanceof Error && err.message) return err.message;
  return GENERIC_FORM_ERROR;
};

export interface ContactFormPayload {
  name: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  priceEstimate?: string;
  calculatorDetails?: string;
  address?: string;
  city?: string;
  /** Honeypot: piilotettu kenttä, jonka vain botit täyttävät. Palvelin hylkää täytetyt hiljaisesti. */
  website?: string;
}

/** Validoitu ja siistitty lähetys: tekstit trimmattu, service ja message aina mukana. */
interface ContactFormData extends ContactFormPayload {
  service: string;
  message: string;
}

// Samat rajat kuin palvelimella (functions/api/contact.ts).
const LIMITS: ReadonlyArray<[keyof ContactFormPayload, number, string]> = [
  ['name', 100, 'Nimi on liian pitkä'],
  ['email', 255, 'Sähköposti on liian pitkä'],
  ['phone', 50, 'Puhelinnumero on liian pitkä'],
  ['service', 100, 'Palvelu on liian pitkä'],
  ['message', 2000, 'Viesti on liian pitkä'],
  ['priceEstimate', 100, 'Hinta-arvio on liian pitkä'],
  ['calculatorDetails', 1000, 'Laskurin tiedot ovat liian pitkät'],
  ['address', 200, 'Osoite on liian pitkä'],
  ['city', 100, 'Kaupunki on liian pitkä'],
  ['website', 200, 'Kenttä on liian pitkä'],
];

// Sama tarkistus kuin aiemmin käytetyssä zod-kirjastossa (z.string().email()).
export const EMAIL_RE = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i;

/**
 * Tarkistaa lomakkeen tiedot ja palauttaa siistityn kopion. Ensimmäisestä virheestä heitetään
 * ContactFormValidationError. Tuntemattomat kentät jätetään pois lähetyksestä.
 */
export const validateContactForm = (payload: ContactFormPayload): ContactFormData => {
  const data: ContactFormData = { name: '', service: '', message: '' };
  for (const [field, max, tooLong] of LIMITS) {
    const raw = payload[field];
    if (raw !== undefined && typeof raw !== 'string') {
      throw new ContactFormValidationError(field, 'Virheellinen arvo');
    }
    // Honeypot-kenttää ei trimmata: palvelin katsoo, onko siinä mitään.
    const value = raw === undefined ? undefined : field === 'website' ? raw : raw.trim();
    if (value !== undefined && value.length > max) throw new ContactFormValidationError(field, tooLong);
    if (field === 'service' || field === 'message') data[field] = value ?? '';
    else if (value !== undefined) data[field] = value;
  }
  if (!data.name) throw new ContactFormValidationError('name', 'Nimi on pakollinen');
  if (data.email && !EMAIL_RE.test(data.email)) {
    throw new ContactFormValidationError('email', 'Virheellinen sähköposti');
  }
  if (!data.email && !data.phone) {
    throw new ContactFormValidationError('phone', 'Anna puhelinnumero tai sähköposti');
  }
  return data;
};

/** Lomakkeen vastaanotto: Cloudflare Pages -funktio `functions/api/contact.ts`. */
const CONTACT_ENDPOINT = '/api/contact';

/**
 * Lisää viestin loppuun rivin, josta näkee, miltä sivulta ja mistä lomakkeesta liidi tuli
 * (esim. "Lähde: /tiilikaton-pinnoitus-tampere/ · tarjouspyyntösivu"). Näkyy sähköpostissa ja CRM:ssä.
 */
const withSource = (message: string, source?: string): string => {
  const path = typeof window !== 'undefined' ? window.location.pathname : '';
  const line = `Lähde: ${[path, source].filter(Boolean).join(' · ')}`;
  return [message, line].filter(Boolean).join('\n\n').slice(0, 2000);
};

export const submitContactForm = async (payload: ContactFormPayload, source?: string) => {
  const validated = validateContactForm(payload);
  const parsed = { ...validated, message: withSource(validated.message, source) };

  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(parsed),
  });

  // Funktio vastaa aina JSON:lla: { success: true } tai { error: "…" }.
  let data: { success?: boolean; error?: string } | null = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok || data?.error) {
    throw new Error(data?.error ?? `Lähetys epäonnistui (${response.status})`);
  }

  // Analytiikkaan vain lomakkeen nimi, ei mitään lomakkeen sisällöstä.
  trackLead(source);

  return data;
};
