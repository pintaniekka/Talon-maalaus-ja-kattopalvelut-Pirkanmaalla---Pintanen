import { z } from 'zod';

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

export const submitContactForm = async (payload: ContactFormPayload) => {
  const parsed = contactFormSchema.parse(payload);

  // Supabase-asiakas ladataan vasta lähetyshetkellä, jotta se ei kasvata
  // jokaisen sivulatauksen JavaScript-pakettia.
  const { supabase } = await import('@/integrations/supabase/client');

  const { data, error } = await supabase.functions.invoke('send-contact-email', {
    body: parsed,
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);

  return data;
};
