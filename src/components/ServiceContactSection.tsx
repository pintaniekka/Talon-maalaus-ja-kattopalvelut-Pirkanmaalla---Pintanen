import { useState } from 'react';
import { Send, Check, Loader2 } from "lucide-react";
import { Phone, Mail, User } from "@/components/icons/BrandIcons";
import PintanenMark from "@/components/icons/PintanenMark";
import { toast } from '@/hooks/use-toast';
import { getStorageUrl } from '@/lib/storage';
import { VASTAUSLUPAUS } from '@/data/company';
import { submitContactForm, formErrorMessage } from '@/lib/contactForm';
import { isValidFinnishMobile, PHONE_ERROR_MESSAGE } from '@/lib/phoneValidation';
import FormPrivacyNote, { HoneypotField } from '@/components/FormPrivacyNote';
import WhatsAppIcon from './WhatsAppIcon';

type ContactVariant = 'katto' | 'maalaus' | 'general';

interface ServiceContactSectionProps {
  variant?: ContactVariant;
  /** Paikkakunta otsikkoon (hakukoneille): "Ota yhteyttä Tampereella" tms. Ilman näitä "Ota yhteyttä". */
  cityName?: string;
  cityGenitive?: string;
  cityIn?: string;
}

const contactPersons = {
  katto: {
    name: 'Eerik Pitkänen',
    role: 'Kattomaalari',
    phone: '040 964 0066',
    phoneHref: 'tel:+358409640066',
    email: 'eerik@pintanen.fi',
    image: getStorageUrl('Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp'),
    whatsapp: 'https://wa.me/358409640066',
  },
  maalaus: {
    name: 'Eemil Pitkänen',
    role: 'Seinämaalari',
    phone: '040 164 2233',
    phoneHref: 'tel:+358401642233',
    email: 'eemil@pintanen.fi',
    image: getStorageUrl('Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp'),
    whatsapp: 'https://wa.me/358401642233',
  },
};

const PersonCard = ({ person }: { person: typeof contactPersons.katto }) => (
  <div className="bg-card rounded-2xl p-6 shadow-md border border-border flex flex-col items-center text-center">
    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-muted mb-4 ring-4 ring-background shadow-sm">
      <img
        src={person.image}
        alt={person.name}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        width={144}
        height={144}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
    <h3 className="text-xl font-bold text-foreground font-heading">{person.name}</h3>
    <p className="text-sm text-muted-foreground mb-5">{person.role}</p>

    <a
      href={person.phoneHref}
      className="flex items-center justify-center gap-2 text-2xl md:text-3xl font-bold text-foreground tracking-tight hover:text-primary transition-colors mb-4"
    >
      <Phone className="w-5 h-5" strokeWidth={2.5} />
      {person.phone}
    </a>

    <div className="w-full space-y-2.5">
      <a
        href={`mailto:${person.email}`}
        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors text-sm"
      >
        <Mail className="w-4 h-4" />
        {person.email}
      </a>
      <a
        href={person.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-medium text-white transition-opacity hover:opacity-90 text-sm"
        style={{ backgroundColor: '#5ddb79' }}
      >
        <WhatsAppIcon className="w-5 h-5" color="white" />
        WhatsApp
      </a>
    </div>
  </div>
);

/**
 * Sivun lopun yhteydenotto: valkoinen lomakekortti ja yrittäjien kortit (tarkastus 12.10.2026, luku 3).
 * Paikkakuntasivuilla otsikossa on paikkakunta (Eerik 13.10.2026: takaisin hakukoneita varten);
 * lomakekortin otsikon vieressä on Pintasen oma merkki.
 */
const ServiceContactSection = ({ variant = 'general', cityName, cityGenitive, cityIn }: ServiceContactSectionProps) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    services: [] as string[],
    message: '',
    website: '', // honeypot – oikea käyttäjä ei täytä tätä
  });

  const toggleService = (value: string) => {
    setFormState((s) => ({
      ...s,
      services: s.services.includes(value)
        ? s.services.filter((v) => v !== value)
        : [...s.services, value],
    }));
  };
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  /** Virhe näytetään lomakkeessa kentän vieressä, ei vain toastina: kävijä näkee, mitä korjata. */
  const [error, setError] = useState<string | null>(null);
  const [phoneInvalid, setPhoneInvalid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    const phone = formState.phone.trim();
    const email = formState.email.trim();
    if (!phone && !email) {
      setError('Anna puhelinnumero tai sähköposti, niin voimme vastata sinulle.');
      setPhoneInvalid(true);
      return;
    }
    if (phone && !isValidFinnishMobile(phone)) {
      setError(PHONE_ERROR_MESSAGE);
      setPhoneInvalid(true);
      return;
    }
    setError(null);
    setPhoneInvalid(false);
    setIsLoading(true);
    try {
      const { services, ...rest } = formState;
      await submitContactForm({ ...rest, service: services.join(', ') }, "sivun lopun lomake");
      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', services: [], message: '', website: '' });
      toast({ title: 'Kiitos, viesti lähetetty', description: VASTAUSLUPAUS });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err: unknown) {
      console.error('Form submission error:', err);
      const message = formErrorMessage(err);
      setError(message);
      toast({ title: 'Lähetys ei onnistunut', description: message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const title = cityIn
    ? `Ota yhteyttä ${cityIn}`
    : cityGenitive
    ? `Yhteystiedot ${cityGenitive} alueella`
    : cityName
    ? `Yhteystiedot – ${cityName}`
    : 'Ota yhteyttä';

  // General → both Eerik & Eemil. Service-specific → only relevant person.
  const persons = variant === 'general'
    ? [contactPersons.katto, contactPersons.maalaus]
    : [contactPersons[variant]];

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent';

  return (
    <section id="yhteystiedot" className="section-padding bg-background">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-style text-3xl md:text-4xl text-foreground mb-4">{title}</h2>
          <p className="text-muted-foreground text-lg">{VASTAUSLUPAUS}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto lg:items-stretch">
          {/* Form (left) */}
          <div className="h-full flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl p-8 md:p-10 shadow-md border border-border w-full max-w-md h-full flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent-ink" aria-hidden="true">
                  <PintanenMark className="h-6 w-6" />
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground font-heading">Pyydä ilmainen arviokäynti</h3>
              </div>

              <div className="space-y-4 flex flex-col flex-1">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className={`${inputClass} pl-10`}
                    placeholder="Nimi" aria-label="Nimi"
                  />
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className={`${inputClass} pl-10 ${phoneInvalid ? 'ring-2 ring-destructive' : ''}`}
                    placeholder="Puhelinnumero" aria-label="Puhelinnumero"
                    aria-invalid={phoneInvalid || undefined}
                    aria-describedby={error ? 'contact-form-error' : undefined}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className={`${inputClass} pl-10`}
                    placeholder="Sähköposti" aria-label="Sähköposti"
                  />
                </div>

                <div>
                  <p className="block text-sm font-semibold text-foreground mb-2 mt-2">Mihin haluat tarjouksen?</p>
                  <div className="space-y-2">
                    {[
                      { value: 'tiilikatto', label: 'Tiilikaton pinnoitus' },
                      { value: 'ulkomaalaus', label: 'Talon maalaus' },
                    ].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-3 cursor-pointer text-sm text-foreground">
                        <input
                          type="checkbox"
                          checked={formState.services.includes(opt.value)}
                          onChange={() => toggleService(opt.value)}
                          className="w-4 h-4 rounded border-border accent-accent-strong"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <textarea
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Lisätiedot (vapaaehtoinen)" aria-label="Lisätiedot"
                />

                <HoneypotField value={formState.website} onChange={(v) => setFormState({ ...formState, website: v })} />
                <FormPrivacyNote />

                {error && (
                  <p id="contact-form-error" role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-semibold text-destructive">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitted || isLoading}
                  className="btn-hero w-full !py-4 !text-base mt-auto disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isSubmitted ? (
                    <><Check className="w-5 h-5" /> Lähetetty</>
                  ) : isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Lähetetään…</>
                  ) : (
                    <><Send className="w-5 h-5" /> Lähetä</>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Persons (right) — stacked, top & bottom edges align with form */}
          <div className={`flex flex-col gap-6 h-full ${persons.length > 1 ? 'lg:justify-between' : 'lg:justify-center'}`}>
            {persons.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContactSection;
