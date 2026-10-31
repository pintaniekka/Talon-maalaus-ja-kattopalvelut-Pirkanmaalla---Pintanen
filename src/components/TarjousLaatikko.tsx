import { useState, useEffect, useRef } from "react";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import { UserRound, Phone, MapPin, Mail, Building, MessageSquare } from "@/components/icons/BrandIcons";
import { submitContactForm } from "@/lib/contactForm";
import { formatToInternational, phoneErrorMessage } from "@/lib/phoneValidation";
import { nimiVirhe, postinumeroVirhe, fokusoiEnsimmainen } from "@/lib/lomakeViestit";
import KenttaVirhe from "@/components/lomake/KenttaVirhe";
import LomakeIlmoitus, { LahetysVirhe } from "@/components/lomake/LomakeIlmoitus";
import FormPrivacyNote, { HoneypotField } from "@/components/FormPrivacyNote";
import { VASTAUSLUPAUS } from "@/data/company";

/**
 * Arviokäyntilomakkeen laatikko. Ladataan omana pakettinaan vasta, kun laatikko avataan tai sen nappiin
 * osoitetaan (DesktopQuoteDrawer.tsx): lomake ei kuulu jokaisen sivun pääpakettiin (30.10.2026).
 */
interface TarjousLaatikkoProps {
  open: boolean;
  onClose: () => void;
  ctaLabel: string;
}

type Kentta = "name" | "phone" | "address" | "postalCode" | "city";
const ID: Record<Kentta, string> = { name: "laatikko-nimi", phone: "laatikko-puhelin", address: "laatikko-osoite", postalCode: "laatikko-postinumero", city: "laatikko-kaupunki" };
const JARJESTYS: Kentta[] = ["name", "phone", "address", "postalCode", "city"];

/** Pakolliset: nimi, puhelin, osoite ja kaupunki (Eki 31.10.2026: kaikkeen pitää vastata). Postinumero ja viesti vapaaehtoisia. */
const tarkista = (f: Record<Kentta, string>): Partial<Record<Kentta, string | null>> => ({
  name: nimiVirhe(f.name),
  phone: phoneErrorMessage(f.phone),
  address: f.address.trim() ? null : "Kirjoita kohteen osoite.",
  postalCode: postinumeroVirhe(f.postalCode),
  city: f.city.trim() ? null : "Kirjoita paikkakunta.",
});

const TarjousLaatikko = ({ open, onClose: handleClose, ctaLabel }: TarjousLaatikkoProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [virheet, setVirheet] = useState<Partial<Record<Kentta, string | null>>>({});
  const [lahetysVirhe, setLahetysVirhe] = useState<unknown>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
    message: "",
    website: "", // honeypot – oikea käyttäjä ei täytä tätä
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const uusi = { ...form, [name]: value };
    setForm(uusi);
    // Näkyvä virhe päivittyy kirjoittaessa, jotta se katoaa heti, kun kenttä on kunnossa.
    if (name in ID && virheet[name as Kentta]) setVirheet((v) => ({ ...v, [name]: tarkista(uusi)[name as Kentta] }));
  };

  // Uusi avaus aloittaa lähettämättömänä (aiemmin handleOpen).
  useEffect(() => {
    if (open) {
      setIsSubmitted(false);
      setVirheet({});
      setLahetysVirhe(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    setTimeout(() => closeRef.current?.focus(), 100);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    // Sama puhelinnumeron tarkistus kuin tarjouspyynnössä ja hintalaskurissa.
    const uudet = tarkista(form);
    if (Object.values(uudet).some(Boolean)) {
      setVirheet(uudet);
      fokusoiEnsimmainen(uudet, JARJESTYS, ID);
      return;
    }
    setVirheet({});
    setLahetysVirhe(null);
    setIsSubmitting(true);
    try {
      await submitContactForm({
        name: form.name,
        email: "",
        phone: formatToInternational(form.phone),
        service: "Arviokäynti",
        address: [form.address, form.postalCode].filter(Boolean).join(", "),
        city: form.city,
        message: `Osoite: ${form.address}\nPostinumero: ${form.postalCode}\nKaupunki: ${form.city}\n\n${form.message}`,
        website: form.website,
      },
        "sivureunan laatikko"
      );
      setIsSubmitted(true);
      setForm({ name: "", phone: "", address: "", postalCode: "", city: "", message: "", website: "" });
    } catch (err: unknown) {
      setLahetysVirhe(err ?? new Error());
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-border bg-white px-3 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition";

  const fields: {
    name: Kentta;
    placeholder: string;
    icon: React.ReactNode;
    type?: string;
  }[] = [
    { name: "name", placeholder: "Nimi", icon: <UserRound className="w-4 h-4" /> },
    { name: "phone", placeholder: "Puhelinnumero", icon: <Phone className="w-4 h-4" />, type: "tel" },
    { name: "address", placeholder: "Osoite", icon: <MapPin className="w-4 h-4" /> },
    { name: "postalCode", placeholder: "Postinumero (vapaaehtoinen)", icon: <Mail className="w-4 h-4" /> },
    { name: "city", placeholder: "Kaupunki", icon: <Building className="w-4 h-4" /> },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] bg-black/30"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Desktop: right drawer / Mobile: bottom sheet */}
          <m.div
            ref={drawerRef}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            role="dialog"
            aria-modal="true"
            aria-label="Pyydä arviokäynti"
            className="fixed z-[80] flex flex-col shadow-xl
              bottom-0 left-0 right-0 max-h-[90dvh] rounded-t-2xl
              lg:top-0 lg:bottom-0 lg:left-auto lg:right-0 lg:w-[380px] lg:max-w-[90vw] lg:max-h-none lg:rounded-t-none bg-card"
          >
            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-5 pb-2 lg:px-6 lg:pt-6">
              <div className="flex-1 pr-4">
                <h2 className="text-lg font-bold text-foreground leading-snug">
                  {ctaLabel}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Jätä yhteystietosi. {VASTAUSLUPAUS}
                </p>
              </div>
              <button
                ref={closeRef}
                onClick={handleClose}
                aria-label="Sulje"
                className="mt-1 rounded-full p-1.5 text-foreground/60 hover:text-foreground hover:bg-black/5 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            {isSubmitted ? (
              <div className="px-5 py-4 lg:px-6">
                <LomakeIlmoitus tyyppi="onnistui" otsikko="Kiitos, viesti lähetetty">
                  {VASTAUSLUPAUS}
                </LomakeIlmoitus>
              </div>
            ) : (
            <form onSubmit={handleSubmit} noValidate className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 lg:px-6">
              {fields.map((f) => (
                <div key={f.name}>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {f.icon}
                    </span>
                    <input
                      id={ID[f.name]}
                      name={f.name}
                      type={f.type || "text"}
                      inputMode={f.name === "postalCode" ? "numeric" : f.type === "tel" ? "tel" : undefined}
                      placeholder={f.placeholder}
                      aria-label={f.placeholder}
                      aria-invalid={virheet[f.name] ? true : undefined}
                      aria-describedby={virheet[f.name] ? `${ID[f.name]}-virhe` : undefined}
                      value={form[f.name]}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <KenttaVirhe id={`${ID[f.name]}-virhe`} viesti={virheet[f.name]} />
                </div>
              ))}

              {/* Textarea */}
              <div className="relative">
                <span className="absolute left-3 top-3 text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                </span>
                <textarea
                  name="message"
                  placeholder="Viestisi (vapaaehtoinen)"
                  aria-label="Viestisi"
                  value={form.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-lg border border-border bg-white px-3 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition resize-none"
                />
              </div>

              <HoneypotField value={form.website} onChange={(v) => setForm((prev) => ({ ...prev, website: v }))} />
              <FormPrivacyNote />
              {lahetysVirhe !== null && <LahetysVirhe virhe={lahetysVirhe} />}

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="mt-2 mb-4 w-full rounded-xl py-3 font-semibold text-accent-foreground text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 disabled:opacity-60"
                style={{ backgroundColor: "hsl(var(--accent-strong))" }}
              >
                {isSubmitting ? "Lähetetään..." : "Lähetä"}
              </button>
            </form>
            )}
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TarjousLaatikko;
