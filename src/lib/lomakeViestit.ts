import { EMAIL_RE } from '@/lib/contactForm';

/**
 * Lomakkeiden virheviestit yhdessä paikassa (31.10.2026, Eki: "varoitusviestit uusiksi").
 * Viesti kertoo, mitä kävijän pitää tehdä, lyhyesti ja ilman syyllistämistä. Viesti näkyy kentän alla,
 * kenttä merkitään (aria-invalid + aria-describedby) ja fokus siirtyy ensimmäiseen virheelliseen kenttään.
 */
export const VIESTI = {
  nimi: 'Kirjoita nimesi.',
  palvelu: 'Valitse ainakin yksi palvelu.',
  kunta: 'Valitse kunta listasta.',
  sahkoposti: 'Tarkista sähköpostiosoite, esimerkiksi nimi@esimerkki.fi.',
  sahkopostiTyhja: 'Kirjoita sähköpostiosoite, niin vastaamme sinulle.',
  postinumero: 'Postinumerossa on viisi numeroa.',
  kysymys: 'Kirjoita kysymyksesi.',
} as const;

/** Lukukentän viesti: "Kirjoita katon koko neliöinä, 10–2000." */
export const lukuViesti = (mika: string, yksikko: 'm²' | 'm', min: number, max: number) =>
  `Kirjoita ${mika} ${yksikko === 'm' ? 'metreinä' : 'neliöinä'}, ${min}–${max}.`;

export const nimiVirhe = (nimi: string) => (nimi.trim() ? null : VIESTI.nimi);

/** Tyhjä sähköposti kelpaa, jos kenttä on vapaaehtoinen. */
export const sahkopostiVirhe = (email: string, pakollinen = false) => {
  const s = email.trim();
  if (!s) return pakollinen ? VIESTI.sahkopostiTyhja : null;
  return EMAIL_RE.test(s) ? null : VIESTI.sahkoposti;
};

export const postinumeroVirhe = (postinumero: string) => {
  const s = postinumero.replace(/\s/g, '');
  if (!s) return null;
  return /^\d{5}$/.test(s) ? null : VIESTI.postinumero;
};

export type Virheet<K extends string> = Partial<Record<K, string | null>>;

/** Onko virhekartassa yksikin virhe. */
export const onVirheita = <K extends string>(v: Virheet<K>) => Object.values(v).some(Boolean);

/**
 * Siirtää fokuksen ensimmäiseen virheelliseen kenttään annetussa järjestyksessä. Kenttä haetaan
 * id:llä, joten lomakkeen ei tarvitse pitää refejä jokaiselle kentälle.
 */
export const fokusoiEnsimmainen = <K extends string>(virheet: Virheet<K>, jarjestys: readonly K[], idt: Record<K, string>) => {
  const eka = jarjestys.find((k) => virheet[k]);
  if (!eka || typeof document === 'undefined') return;
  // Seuraava ruudunpäivitys: virheteksti on silloin DOMissa, ja ruudunlukija lukee sen kentän kuvauksena.
  requestAnimationFrame(() => document.getElementById(idt[eka])?.focus());
};
