import { forwardRef, useId } from 'react';
import { PHONE_PLACEHOLDER } from '@/lib/phoneValidation';
import KenttaVirhe from '@/components/lomake/KenttaVirhe';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  /** Virheviesti kentän alle; tyhjä = ei virhettä. */
  error?: string | null;
  className?: string;
  inputClassName?: string;
  ariaLabel?: string;
  autoFocus?: boolean;
  id?: string;
}

/**
 * Puhelinnumerokenttä, jonka edessä on kiinteä FI +358. Kävijä kirjoittaa vain oman osansa;
 * myös +358-alkuinen numero kelpaa (selaimen automaattinen täyttö). Virhe näkyy kentän alla.
 */
const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    { value, onChange, onBlur, disabled, error, className = '', inputClassName = '', ariaLabel = 'Puhelinnumero', autoFocus, id },
    ref,
  ) => {
    const oma = useId();
    const kenttaId = id ?? `puhelin-${oma}`;
    const virheId = `${kenttaId}-virhe`;
    return (
      <div className={className}>
        <div
          className={`puhelin-kehys flex items-stretch w-full rounded-xl border border-border/60 bg-white overflow-hidden transition-colors focus-within:border-primary ${disabled ? 'opacity-70' : ''}`}
        >
          <span
            aria-hidden="true"
            className="flex items-center px-3 bg-muted/60 text-foreground/80 text-sm font-medium border-r border-border/60 select-none whitespace-nowrap"
          >
            FI&nbsp;+358
          </span>
          <input
            ref={ref}
            id={kenttaId}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            aria-label={ariaLabel}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? virheId : undefined}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={PHONE_PLACEHOLDER}
            disabled={disabled}
            autoFocus={autoFocus}
            className={`puhelin-kentta flex-1 min-w-0 px-3 py-2.5 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed ${inputClassName}`}
          />
        </div>
        <KenttaVirhe id={virheId} viesti={error} />
      </div>
    );
  },
);

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;
