import { CircleAlert } from 'lucide-react';

interface KenttaVirheProps {
  /** Kentän aria-describedby osoittaa tähän id:hen. */
  id: string;
  viesti?: string | null;
  className?: string;
}

/**
 * Kentän alle tuleva virheviesti (31.10.2026). Kenttä merkitään aria-invalid-attribuutilla, jolloin
 * index.css värittää sen reunan, ja fokus siirretään ensimmäiseen virheelliseen kenttään: ruudunlukija
 * lukee tämän tekstin kentän kuvauksena. Väri --virhe on WCAG AA -kontrastissa valkoisella.
 */
const KenttaVirhe = ({ id, viesti, className = '' }: KenttaVirheProps) =>
  viesti ? (
    <p id={id} className={`kentta-virhe ${className}`}>
      <CircleAlert aria-hidden="true" className="mt-px h-4 w-4 shrink-0" />
      <span>{viesti}</span>
    </p>
  ) : null;

export default KenttaVirhe;
