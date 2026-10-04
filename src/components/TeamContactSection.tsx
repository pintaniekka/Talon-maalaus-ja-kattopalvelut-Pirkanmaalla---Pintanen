import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map } from "lucide-react";
import { Phone, Mail, User, MapPin, MessageSquare } from "@/components/icons/BrandIcons";
import { getStorageUrl } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from '@/lib/contactForm';
import WhatsAppIcon from './WhatsAppIcon';

interface TeamContactSectionProps {
  cityName?: string;
  cityGenitive?: string;
}

const logoUrl = getStorageUrl('Pintanen-logo.png');

const team = [
  {
    name: 'Eerik',
    role: 'Yrittäjä – Kattopalvelut',
    phone: '040 964 0066',
    phoneHref: 'tel:+358409640066',
    email: 'myynti@pintanen.fi',
    image: getStorageUrl('Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp'),
    whatsapp: 'https://wa.me/358409640066',
  },
  {
    name: 'Eemil',
    role: 'Yrittäjä – Maalauspalvelut',
    phone: '040 164 2233',
    phoneHref: 'tel:+358401642233',
    email: 'myynti@pintanen.fi',
    image: getStorageUrl('Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp'),
    whatsapp: 'https://wa.me/358401642233',
  },
];

const serviceOptions = [
  'Tiilikaton pinnoitus',
  'Katon puhdistus',
  'Talon maalaus',
];

const TeamContactSection = ({ cityName, cityGenitive }: TeamContactSectionProps) => {
  const title = cityGenitive
    ? `Yhteystiedot ${cityGenitive} alueella`
    : cityName
      ? `Yhteystiedot – ${cityName}`
      : 'Yhteystiedot';

  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
    message: '',
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: 'Täytä vähintään nimi ja puhelinnumero', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    try {
      await submitContactForm({
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: selectedServices.length > 0 ? selectedServices.join(', ') : 'Ei valittu',
        message: `Osoite: ${form.address}\nPostinumero: ${form.postalCode}\nKaupunki: ${form.city}\n\n${form.message}`,
      },
        "maalaussivun lomake"
      );
      setIsSubmitted(true);
      setForm({ name: '', phone: '', email: '', address: '', postalCode: '', city: '', message: '' });
      setSelectedServices([]);
      toast({ title: 'Kiitos! Olemme sinuun yhteydessä pian.' });
    } catch {
      toast({ title: 'Jokin meni pieleen. Yritä uudelleen.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    'w-full rounded-lg border-0 bg-white px-3.5 py-3 pl-11 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition shadow-sm';

  return (
    <section id="yhteystiedot" className="section-padding bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading">{title}</h2>
          <p className="text-muted-foreground text-lg mt-3 max-w-xl mx-auto">
            Vastaamme mielellämme kysymyksiisi ja annamme maksuttoman arvion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* ── LEFT: Contact Form ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-6 md:p-8"
            style={{ backgroundColor: "hsl(var(--accent-strong))" }}
          >
            <div className="flex flex-col items-center mb-6">
              <img
                src={logoUrl}
                alt="Pintanen Oy logo"
                className="h-16 md:h-20 mb-4"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-xl md:text-2xl font-bold text-white text-center leading-snug">
                Kutsu meidät maksuttomalle arviokäynnille!
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Name */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input name="name" placeholder="Nimi" value={form.name} onChange={handleChange} className={inputClasses} />
              </div>

              {/* Phone */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Phone className="w-4 h-4" />
                </span>
                <input name="phone" type="tel" placeholder="Puhelinnumero" value={form.phone} onChange={handleChange} className={inputClasses} />
              </div>

              {/* Email */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input name="email" type="email" placeholder="Sähköposti" value={form.email} onChange={handleChange} className={inputClasses} />
              </div>

              {/* Address */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                </span>
                <input name="address" placeholder="Katuosoite" value={form.address} onChange={handleChange} className={inputClasses} />
              </div>

              {/* PostalCode + City */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Map className="w-4 h-4" />
                  </span>
                  <input name="postalCode" placeholder="Postinumero" value={form.postalCode} onChange={handleChange} className={inputClasses} />
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <Map className="w-4 h-4" />
                  </span>
                  <input name="city" placeholder="Paikkakunta" value={form.city} onChange={handleChange} className={inputClasses} />
                </div>
              </div>

              {/* Service Checkboxes */}
              <div className="mt-2">
                <p className="text-white font-semibold text-sm mb-2">Haluan tarjouksen:</p>
                <div className="flex flex-col gap-2">
                  {serviceOptions.map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-2.5 cursor-pointer select-none"
                    >
                      <span
                        className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                          selectedServices.includes(service)
                            ? 'bg-white border-white'
                            : 'border-accent-foreground/60 bg-transparent'
                        }`}
                      >
                        {selectedServices.includes(service) && (
                          <svg className="w-3 h-3 text-accent-ink" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => toggleService(service)}
                        className="sr-only"
                      />
                      <span className="text-white text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="relative mt-1">
                <textarea
                  name="message"
                  placeholder="Lisätiedot (vapaaehtoinen)"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border-0 bg-white px-3.5 py-3 text-sm text-foreground placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition resize-none shadow-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="mt-2 w-full rounded-xl py-3.5 font-bold text-white text-sm uppercase tracking-wider transition-all duration-200 hover:brightness-110 disabled:opacity-60"
                style={{ backgroundColor: '#1e293b' }}
              >
                {isSubmitted ? 'Lähetetty ✓' : isSubmitting ? 'Lähetetään...' : 'Kutsu arviokäynnille'}
              </button>
            </form>
          </motion.div>

          {/* ── RIGHT: Contact Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 justify-center"
          >
            {team.map((person, index) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={96}
                    height={96}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-muted-foreground"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                    }}
                  />
                </div>

                <h3 className="text-lg font-bold text-foreground">{person.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{person.role}</p>

                <div className="space-y-2 w-full">
                  <a
                    href={person.phoneHref}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    {person.phone}
                  </a>
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    {person.email}
                  </a>
                  <a
                    href={person.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 mt-4 px-6 py-2 rounded-full font-medium text-white transition-colors hover:opacity-90 text-sm"
                    style={{ backgroundColor: '#5ddb79' }}
                  >
                    <WhatsAppIcon className="w-5 h-5" color="white" />
                    WhatsApp
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamContactSection;
