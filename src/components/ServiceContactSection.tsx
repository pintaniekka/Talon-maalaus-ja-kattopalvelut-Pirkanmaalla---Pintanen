import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Loader2 } from "lucide-react";
import { Phone, Mail, User } from "@/components/icons/BrandIcons";
import { toast } from '@/hooks/use-toast';
import { getStorageUrl } from '@/lib/storage';
import { submitContactForm } from '@/lib/contactForm';
import FormPrivacyNote, { HoneypotField } from '@/components/FormPrivacyNote';
import WhatsAppIcon from './WhatsAppIcon';

type ContactVariant = 'katto' | 'maalaus' | 'general';

interface ServiceContactSectionProps {
  variant?: ContactVariant;
  cityName?: string;
  cityGenitive?: string;
  cityIn?: string;
}

const FORM_BG = '#006ead';
const logoUrl = getStorageUrl('Pintanen-logo.png');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { services, ...rest } = formState;
      await submitContactForm({ ...rest, service: services.join(', ') }, "sivun lopun lomake");
      setIsSubmitted(true);
      setFormState({ name: '', email: '', phone: '', services: [], message: '', website: '' });
      toast({ title: 'Tarjouspyyntö lähetetty!', description: 'Vastaamme mahdollisimman pian.' });
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (err: unknown) {
      console.error('Form submission error:', err);
      toast({ title: 'Virhe lähetyksessä', description: 'Yritä uudelleen tai soita meille.', variant: 'destructive' });
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

  const inputClass = 'w-full px-4 py-3 rounded-xl bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-white/60 border-0';

  return (
    <section id="yhteystiedot" className="section-padding bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="heading-style text-3xl md:text-4xl text-foreground mb-4">{title}</h2>
          <p className="text-muted-foreground text-lg">
            Pyydä <strong className="text-foreground">ilmainen arviokäynti</strong> tai tarjouspyyntö. Vastaamme <strong className="text-foreground">vuorokauden sisään</strong>!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto lg:items-stretch">
          {/* Form (left) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-full flex justify-center"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-8 md:p-10 shadow-xl text-white w-full max-w-md h-full flex flex-col"
              style={{ backgroundColor: FORM_BG }}
            >
              <div className="flex justify-center mb-4">
                <img
                  src={logoUrl}
                  alt="Pintanen"
                  width={160}
                  height={64}
                  className="h-14 md:h-16 w-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 font-heading">
                Kutsu meidät maksuttomalle arviokäynnille!
              </h3>

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
                    className={`${inputClass} pl-10`}
                    placeholder="Puhelinnumero" aria-label="Puhelinnumero"
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
                  <label className="block text-sm font-semibold mb-2 mt-2">Haluan tarjouksen:</label>
                  <div className="space-y-2">
                    {[
                      { value: 'tiilikatto', label: 'Tiilikaton pinnoitus' },
                      { value: 'puhdistus', label: 'Katon puhdistus' },
                      { value: 'ulkomaalaus', label: 'Talon maalaus' },
                    ].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-3 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={formState.services.includes(opt.value)}
                          onChange={() => toggleService(opt.value)}
                          className="w-4 h-4 rounded border-white/40 accent-white"
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
                <FormPrivacyNote variant="light" />

                <button
                  type="submit"
                  disabled={isSubmitted || isLoading}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold tracking-wide uppercase transition-all border-2 mt-auto ${
                    isSubmitted
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'bg-transparent border-white text-white hover:bg-white/10'
                  }`}
                >
                  {isSubmitted ? (
                    <><Check className="w-5 h-5" /> Lähetetty!</>
                  ) : isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Lähetetään...</>
                  ) : (
                    <><Send className="w-5 h-5" /> Kutsu arviokäynnille</>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Persons (right) — stacked, top & bottom edges align with form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col gap-6 h-full ${persons.length > 1 ? 'lg:justify-between' : 'lg:justify-center'}`}
          >
            {persons.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContactSection;
