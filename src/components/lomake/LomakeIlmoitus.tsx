import type { ReactNode } from 'react';
import { CircleAlert, CircleCheck } from 'lucide-react';
import { YHTEYSTIEDOT } from '@/data/company';
import { ContactFormValidationError } from '@/lib/contactForm';

interface LomakeIlmoitusProps {
  tyyppi: 'virhe' | 'onnistui';
  otsikko: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Koko lomakkeen ilmoitus: lähetysvirhe tai kiitos. Näkyy lomakkeessa napin vieressä eikä katoa itsestään
 * kuten toast. Virhe on role="alert" (ruudunlukija lukee sen heti), kiitos role="status".
 */
const LomakeIlmoitus = ({ tyyppi, otsikko, children, className = '' }: LomakeIlmoitusProps) => {
  const Ikoni = tyyppi === 'virhe' ? CircleAlert : CircleCheck;
  return (
    <div role={tyyppi === 'virhe' ? 'alert' : 'status'} className={`lomake-ilmoitus lomake-ilmoitus--${tyyppi} ${className}`}>
      <Ikoni aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
      <div className="min-w-0">
        <p className="font-semibold">{otsikko}</p>
        {children && <div className="mt-0.5">{children}</div>}
      </div>
    </div>
  );
};

/**
 * Lähetysvirheen teksti. Lomakkeen oma tarkistusvirhe (esim. "Viesti on liian pitkä") näytetään sellaisenaan;
 * palvelimen ja verkon virheistä kerrotaan vain, mitä kävijä voi tehdä.
 */
export const LahetysVirhe = ({ virhe, puhelin = YHTEYSTIEDOT.eerik }: { virhe: unknown; puhelin?: { phone: string; phoneHref: string } }) => (
  <LomakeIlmoitus tyyppi="virhe" otsikko="Lähetys ei onnistunut">
    {virhe instanceof ContactFormValidationError ? `${virhe.message}. ` : 'Tiedot eivät lähteneet. '}
    Yritä hetken päästä uudelleen tai soita meille:{' '}
    <a href={puhelin.phoneHref} className="font-semibold underline underline-offset-2 whitespace-nowrap">
      {puhelin.phone}
    </a>
    .
  </LomakeIlmoitus>
);

export default LomakeIlmoitus;
