import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import CityCombobox from "@/components/CityCombobox";
import PhoneInput from "@/components/PhoneInput";
import FormPrivacyNote, { HoneypotField } from "@/components/FormPrivacyNote";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/contactForm";
import { isValidFinnishMobile, formatToInternational, PHONE_ERROR_MESSAGE } from "@/lib/phoneValidation";

export type QuoteService = "tiilikatto" | "ulkomaalaus" | "puhdistus" | "muu";

const serviceOptions: { value: QuoteService; label: string }[] = [
  { value: "tiilikatto", label: "Tiilikaton pinnoitus" },
  { value: "ulkomaalaus", label: "Talon maalaus" },
  { value: "puhdistus", label: "Katon puhdistus" },
  { value: "muu", label: "Jokin muu" },
];

interface QuoteWizardProps {
  initialServices?: QuoteService[];
  /** Kertoo sivulle valitut palvelut, jotta se voi näyttää oikean yhteyshenkilön. */
  onServicesChange?: (services: QuoteService[]) => void;
  /** Soittajan etunimi kiitosviestiin, esim. "Eerik". */
  callerName?: string;
}

const TOTAL_STEPS = 3;

/** Kolmivaiheinen tarjouspyyntö: palvelu → kohde → yhteystiedot. Pakollista on vain nimi ja puhelinnumero. */
const QuoteWizard = ({ initialServices = [], onServicesChange, callerName }: QuoteWizardProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<QuoteService[]>(initialServices);
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [phoneError, setPhoneError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    onServicesChange?.(services);
  }, [services, onServicesChange]);

  const toggle = (value: QuoteService) =>
    setServices((s) => (s.includes(value) ? s.filter((v) => v !== value) : [...s, value]));

  const next = () => {
    if (step === 1 && services.length === 0) {
      toast({ title: "Valitse palvelu", description: "Valitse vähintään yksi vaihtoehto.", variant: "destructive" });
      return;
    }
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };

  const submit = async () => {
    if (submitting) return;
    if (!name.trim() || !phone.trim()) {
      toast({ title: "Täytä tiedot", description: "Nimi ja puhelinnumero ovat pakollisia.", variant: "destructive" });
      return;
    }
    if (!isValidFinnishMobile(phone)) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);
    setSubmitting(true);
    try {
      await submitContactForm(
        {
          name: name.trim(),
          phone: formatToInternational(phone),
          email: email.trim(),
          service: services.join(", "),
          city: city || undefined,
          message: message.trim(),
          website,
        },
        "tarjouspyyntösivu",
      );
      setDone(true);
    } catch {
      toast({ title: "Virhe lähetyksessä", description: "Yritä uudelleen tai soita meille.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const input = "w-full rounded-xl border border-border bg-background px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent";

  if (done) {
    return (
      <div className="bg-card rounded-3xl shadow-2xl border border-border/60 p-8 md:p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5">
          <Check className="w-7 h-7 text-accent-ink" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-3">Kiitos, {name.trim()}!</h2>
        <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
          Tarjouspyyntösi on perillä. {callerName ? `${callerName} soittaa` : "Soitamme"} sinulle pian, ja sovimme ilmaisen
          kuntotarkastuksen.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl shadow-2xl border border-border/60 p-6 md:p-10">
      <div className="flex items-center justify-between mb-6">
        {step > 1 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Takaisin
          </button>
        ) : (
          <span className="text-sm font-semibold text-foreground">Kolme vaihetta, noin puoli minuuttia</span>
        )}
        <span className="text-sm text-muted-foreground">
          Vaihe {step} / {TOTAL_STEPS}
        </span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full mb-8 overflow-hidden">
        <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }}>
          {step === 1 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-6">Mihin haluat tarjouksen?</h2>
              <div className="flex flex-col gap-3">
                {serviceOptions.map((o) => {
                  const on = services.includes(o.value);
                  return (
                    <button
                      key={o.value}
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      onClick={() => toggle(o.value)}
                      className={`w-full flex items-center gap-4 text-left rounded-xl border px-5 py-4 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        on ? "border-accent bg-accent-light text-foreground" : "border-border bg-background text-foreground hover:border-accent"
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${on ? "bg-accent-strong border-accent-strong" : "border-border"}`}>
                        {on && <Check className="w-4 h-4 text-accent-foreground" />}
                      </span>
                      {o.label}
                    </button>
                  );
                })}
              </div>
              <button type="button" onClick={next} className="btn-hero !py-4 !text-base w-full mt-6">
                Jatka
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-2">Missä kohde sijaitsee?</h2>
              <p className="text-muted-foreground mb-6">Toimimme Pirkanmaalla ja Kanta-Hämeessä.</p>
              <CityCombobox value={city} onChange={setCity} placeholder="Valitse kunta" />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                maxLength={1500}
                placeholder="Lisätiedot (vapaaehtoinen)"
                aria-label="Lisätiedot"
                className={`${input} resize-none mt-4`}
              />
              <button type="button" onClick={next} className="btn-hero !py-4 !text-base w-full mt-6">
                Jatka
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-6">Kenelle tarjous tehdään?</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
                className="flex flex-col gap-4"
              >
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nimi" aria-label="Nimi" autoComplete="name" className={input} />
                <PhoneInput value={phone} onChange={setPhone} hasError={phoneError} errorMessage={PHONE_ERROR_MESSAGE} ariaLabel="Puhelinnumero" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Sähköposti (vapaaehtoinen)" aria-label="Sähköposti" autoComplete="email" className={input} />
                <HoneypotField value={website} onChange={setWebsite} />
                <button type="submit" disabled={submitting} className="btn-hero !py-4 !text-base w-full disabled:opacity-60">
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Lähetä tarjouspyyntö"}
                </button>
                <FormPrivacyNote />
              </form>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuoteWizard;
