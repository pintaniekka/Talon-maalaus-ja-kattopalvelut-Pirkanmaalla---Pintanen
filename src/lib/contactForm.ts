import { z } from 'zod';
import { trackLead } from '@/lib/analytics';

const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Nimi on pakollinen').max(100, 'Nimi on liian pitkä'),
  email: z.string().trim().max(255, 'Sähköposti on liian pitkä').optional().or(z.literal('')),
  phone: z.string().trim().max(50, 'Puhelinnumero on liian pitkä').optional().or(z.literal('')),
  service: z.string().trim().max(100, 'Palvelu on liian pitkä').optional().default(''),
  message: z.string().trim().max(2000, 'Viesti on liian pitkä').optional().default(''),
  priceEstimate: z.string().trim().max(100, 'Hinta-arvio on liian pitkä').optional(),
  calculatorDetails: z.string().trim().max(1000, 'Laskurin tiedot ovat liian pitkät').optional(),
  address: z.string().trim().max(200, 'Osoite on liian pitkä').optional(),
  city: z.string().trim().max(100, 'Kaupunki on liian pitkä').optional(),
  /** Honeypot: piilotettu kenttä, jonka vain botit täyttävät. Palvelin hylkää täytetyt hiljaisesti. */
  website: z.string().max(200).optional(),
}).superRefine((data, ctx) => {
  if (data.email && !z.string().email().safeParse(data.email).success) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Virheellinen sähköposti', path: ['email'] });
  }

  if (!data.email && !data.phone) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Anna puhelinnumero tai sähköposti', path: ['phone'] });
  }
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;

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
  const validated = contactFormSchema.parse(payload);
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
