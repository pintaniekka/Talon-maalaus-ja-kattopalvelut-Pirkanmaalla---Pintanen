// Suomalaisen puhelinnumeron tarkistus lomakkeisiin.
// Siistii syötteen (välilyönnit, viivat, sulut, pisteet) ja hyväksyy myös kansainvälisen
// muodon (+358, 00358, 358), jonka selaimen automaattinen täyttö usein syöttää. Sen jälkeen:
// - 8, 9 tai 10 numeroa (paikallinen osa, alkunolla mukaan lukien)
// - ei pelkkää samaa numeroa
// - ei suoraa nousevaa tai laskevaa sarjaa

export const sanitizePhone = (raw: string): string => (raw || '').replace(/[\s\-().]/g, '');

const ASCENDING = '0123456789';
const DESCENDING = '9876543210';

/** Paikallinen osa ilman maatunnusta: "+358 40 123 4567" → "401234567", "040 123 4567" pysyy ennallaan. */
const localPart = (raw: string): string => {
  const s = sanitizePhone(raw);
  if (s.startsWith('+358')) return s.slice(4);
  if (s.startsWith('00358')) return s.slice(5);
  // 358 + vähintään 7 numeroa = käyttäjä kirjoitti maatunnuksen ilman plussaa.
  if (/^358\d{7,}$/.test(s) && s.length >= 11) return s.slice(3);
  return s;
};

/** Miksi numero ei kelpaa. null = numero on kunnossa. */
export type PhoneProblem = 'tyhja' | 'merkit' | 'lyhyt' | 'pitka' | 'epaily';

export const phoneProblem = (raw: string): PhoneProblem | null => {
  if (!sanitizePhone(raw)) return 'tyhja';
  const digits = localPart(raw);
  if (!/^\d+$/.test(digits)) return 'merkit';
  if (digits.length < 8) return 'lyhyt';
  if (digits.length > 10) return 'pitka';
  if (/^(\d)\1+$/.test(digits)) return 'epaily';
  if (ASCENDING.includes(digits) || DESCENDING.includes(digits)) return 'epaily';
  return null;
};

export const isValidFinnishMobile = (raw: string): boolean => phoneProblem(raw) === null;

/** Kansainvälinen muoto. Poistaa maatunnuksen ja yhden alkunollan ("040…" ja "40…" toimivat). */
export const formatToInternational = (raw: string): string => {
  let digits = localPart(raw);
  if (digits.startsWith('0')) digits = digits.slice(1);
  return `+358${digits}`;
};

const PHONE_MESSAGES: Record<PhoneProblem, string> = {
  tyhja: 'Kirjoita puhelinnumero, niin voimme soittaa sinulle.',
  merkit: 'Kirjoita puhelinnumero pelkkinä numeroina, esimerkiksi 040 123 4567.',
  lyhyt: 'Numerosta puuttuu numeroita. Tarkista se, esimerkiksi 040 123 4567.',
  pitka: 'Numerossa on liikaa numeroita. Tarkista se.',
  epaily: 'Tämä ei näytä oikealta puhelinnumerolta. Tarkista numero.',
};

/** Kävijälle näytettävä viesti puhelinkentän alle, tai null jos numero kelpaa. */
export const phoneErrorMessage = (raw: string): string | null => {
  const problem = phoneProblem(raw);
  return problem ? PHONE_MESSAGES[problem] : null;
};

export const PHONE_ERROR_MESSAGE = PHONE_MESSAGES.epaily;

export const PHONE_CHECKING_LABEL = 'Tarkistetaan puhelinnumeroa...';

export const PHONE_PLACEHOLDER = '40 123 4567';
