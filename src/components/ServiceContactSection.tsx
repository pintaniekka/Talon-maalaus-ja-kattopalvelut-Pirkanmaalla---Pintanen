import { useId, useState } from 'react';
import { Send, Check, Loader2 } from "lucide-react";
import { Phone, Mail, User } from "@/components/icons/BrandIcons";
import { getStorageUrl } from '@/lib/storage';
import { VASTAUSLUPAUS } from '@/data/company';
import { submitContactForm } from '@/lib/contactForm';
import { formatToInternational, phoneErrorMessage } from '@/lib/phoneValidation';
import { VIESTI, nimiVirhe, sahkopostiVirhe, fokusoiEnsimmainen } from '@/lib/lomakeViestit';
import KenttaVirhe from '@/components/lomake/KenttaVirhe';
import LomakeIlmoitus, { LahetysVirhe } from '@/components/lomake/LomakeIlmoitus';
import FormPrivacyNote, { HoneypotField } from '@/components/FormPrivacyNote';
import WhatsAppIcon from './WhatsAppIcon';

type ContactVariant = 'katto' | 'maalaus' | 'general';

interface ServiceContactSectionProps {
  variant?: ContactVariant;
  /** Paikkakunta otsikkoon (hakukoneille): "Ota yhteyttä Tampereella" tms. Ilman näitä "Ota yhteyttä". */
  cityName?: string;
  cityGenitive?: string;
  cityIn?: string;
  /**
   * Lomakekortin otsikko. Oletus pinnoitussivuilla (variant "katto": palvelusivu, hintasivu, kaupunkisivut ja
   * kuntotarkastussivu) "Pyydä ilmainen kuntotarkastus", muualla "Pyydä ilmainen arviokäynti" (Eerik 26.10.2026).
   */
  formTitle?: string;
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

type Kentta = 'nimi' | 'puhelin' | 'sahkoposti' | 'palvelu';
const JARJESTYS: Kentta[] = ['nimi', 'puhelin', 'sahkoposti', 'palvelu'];

const PersonCard = ({ person }: { person: typeof contactPersons.katto }) => (
  <div className="kortti p-6 flex flex-col items-center text-center">
    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden bg-muted mb-4 ring-4 ring-background shadow-sm">
      <img
        loading="lazy"
        decoding="async"
        src={person.image}
        alt={person.name}
        className="w-full h-full object-cover"
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
        style={{ backgroundColor: '#11853b' }}
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
const ServiceContactSection = ({ variant = 'general', cityName, cityGenitive, cityIn, formTitle }: ServiceContactSectionProps) => {
  const formHeading = formTitle ?? (variant === 'katto' ? 'Pyydä ilmainen kuntotarkastus' : 'Pyydä ilmainen arviokäynti');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    services: [] as string[],
    message: '',
    website: '', // honeypot – oikea käyttäjä ei täytä tätä
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  /** Virheet näkyvät kentän alla (31.10.2026). Pakollisia: nimi, puhelin ja palvelu; sähköposti tarkistetaan, jos se annetaan. */
  const [virheet, setVirheet] = useState<Partial<Record<Kentta, string | null>>>({});
  const [lahetysVirhe, setLahetysVirhe] = useState<unknown>(null);
  const uid = useId();
  const ID: Record<Kentta, string> = { nimi: `${uid}-nimi`, puhelin: `${uid}-puhelin`, sahkoposti: `${uid}-sahkoposti`, palvelu: `${uid}-palvelu` };
  const vId = (k: Kentta) => `${ID[k]}-virhe`;

  const tarkista = (f: typeof formState): Partial<Record<Kentta, string | null>> => ({
    nimi: nimiVirhe(f.name),
    puhelin: phoneErrorMessage(f.phone),
    sahkoposti: sahkopostiVirhe(f.email),
    palvelu: f.services.length ? null : VIESTI.palvelu,
  });

  /** Päivittää lomakkeen ja korjaa näkyvän virheen heti, kun kenttä on kunnossa. */
  const paivita = (muutos: Partial<typeof formState>, kentta?: Kentta) => {
    const uusi = { ...formState, ...muutos };
    setFormState(uusi);
    if (isSubmitted) setIsSubmitted(false);
    if (kentta && virheet[kentta]) setVirheet((v) => ({ ...v, [kentta]: tarkista(uusi)[kentta] }));
  };

  const toggleService = (value: string) => {
    const services = formState.services.includes(value)
      ? formState.services.filter((v) => v !== value)
      : [...formState.services, value];
    paivita({ services }, 'palvelu');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    const uudet = tarkista(formState);
    if (Object.values(uudet).some(Boolean)) {
      setVirheet(uudet);
      fokusoiEnsimmainen(uudet, JARJESTYS, ID);
      return;
    }
    setVirheet({});
    setLahetysVirhe(null);
    setIsLoading(true);
    try {
      const { services, ...rest } = formState;
      await submitContactForm({ ...rest, phone: formatToInternational(rest.phone), service: services.join(', ') }, "sivun lopun lomake");
      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', services: [], message: '', website: '' });
    } catch (err: unknown) {
      console.error('Form submission error:', err);
      setLahetysVirhe(err ?? new Error());
    } finally {
      setIsLoading(false);
    }
  };
  const kuvaus = (k: Kentta) => ({
    'aria-invalid': virheet[k] ? true : undefined,
    'aria-describedby': virheet[k] ? vId(k) : undefined,
  });

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
    <section id="yhteystiedot" className="section-padding osio">
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-style text-3xl md:text-4xl text-foreground mb-4">{title}</h2>
          <p className="text-muted-foreground text-lg">{VASTAUSLUPAUS}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto lg:items-stretch">
          {/* Form (left) */}
          <div className="h-full">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="kortti p-7 md:p-9 w-full h-full flex flex-col"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-6">{formHeading}</h3>

              <div className="space-y-4 flex flex-col flex-1">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      id={ID.nimi}
                      type="text"
                      value={formState.name}
                      onChange={(e) => paivita({ name: e.target.value }, 'nimi')}
                      className={`${inputClass} pl-10`}
                      placeholder="Nimi" aria-label="Nimi"
                      autoComplete="name"
                      {...kuvaus('nimi')}
                    />
                  </div>
                  <KenttaVirhe id={vId('nimi')} viesti={virheet.nimi} />
                </div>

                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      id={ID.puhelin}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={formState.phone}
                      onChange={(e) => paivita({ phone: e.target.value }, 'puhelin')}
                      className={`${inputClass} pl-10`}
                      placeholder="Puhelinnumero" aria-label="Puhelinnumero"
                      {...kuvaus('puhelin')}
                    />
                  </div>
                  <KenttaVirhe id={vId('puhelin')} viesti={virheet.puhelin} />
                </div>

                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      id={ID.sahkoposti}
                      type="email"
                      autoComplete="email"
                      value={formState.email}
                      onChange={(e) => paivita({ email: e.target.value }, 'sahkoposti')}
                      className={`${inputClass} pl-10`}
                      placeholder="Sähköposti (vapaaehtoinen)" aria-label="Sähköposti"
                      {...kuvaus('sahkoposti')}
                    />
                  </div>
                  <KenttaVirhe id={vId('sahkoposti')} viesti={virheet.sahkoposti} />
                </div>

                <div>
                  <p id={`${ID.palvelu}-otsikko`} className="block text-sm font-semibold text-foreground mb-2 mt-2">Mihin haluat tarjouksen?</p>
                  <div
                    id={ID.palvelu}
                    role="group"
                    tabIndex={-1}
                    aria-labelledby={`${ID.palvelu}-otsikko`}
                    {...kuvaus('palvelu')}
                    className="valintaryhma space-y-2"
                  >
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
                  <KenttaVirhe id={vId('palvelu')} viesti={virheet.palvelu} />
                </div>

                <textarea
                  value={formState.message}
                  onChange={(e) => paivita({ message: e.target.value })}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Lisätiedot (vapaaehtoinen)" aria-label="Lisätiedot"
                />

                <HoneypotField value={formState.website} onChange={(v) => setFormState({ ...formState, website: v })} />
                <FormPrivacyNote />

                {lahetysVirhe !== null && <LahetysVirhe virhe={lahetysVirhe} puhelin={variant === 'maalaus' ? contactPersons.maalaus : contactPersons.katto} />}
                {isSubmitted && (
                  <LomakeIlmoitus tyyppi="onnistui" otsikko="Kiitos, viesti lähetetty">
                    {VASTAUSLUPAUS}
                  </LomakeIlmoitus>
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
