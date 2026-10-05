import { Link } from 'react-router-dom';

interface FormPrivacyNoteProps {
  /** 'light' tummalla taustalla (valkoinen teksti), 'dark' vaalealla taustalla. */
  variant?: 'light' | 'dark';
  className?: string;
}

/** Lomakkeiden alle sijoitettava tietosuojahuomautus. */
const FormPrivacyNote = ({ variant = 'dark', className = '' }: FormPrivacyNoteProps) => {
  const color = variant === 'light' ? 'text-white/75' : 'text-muted-foreground';
  const link = variant === 'light' ? 'text-white underline underline-offset-2' : 'text-primary underline underline-offset-2';
  return (
    <p className={`text-xs leading-snug ${color} ${className}`}>
      Lähettämällä hyväksyt, että käsittelemme tietojasi{' '}
      <Link to="/tietosuoja/" className={link}>
        tietosuojaselosteen
      </Link>{' '}
      mukaisesti yhteydenottoosi vastaamiseksi.
    </p>
  );
};

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * Honeypot-kenttä spämmibotteja vastaan. Piilotettu näkyvistä ja ruudunlukijoilta;
 * oikea käyttäjä ei koskaan täytä sitä. Palvelin hylkää täytetyt lähetykset hiljaisesti.
 */
export const HoneypotField = ({ value, onChange }: HoneypotFieldProps) => (
  <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
    <label>
      Jätä tämä kenttä tyhjäksi
      <input
        type="text"
        name="website"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
      />
    </label>
  </div>
);

export default FormPrivacyNote;
