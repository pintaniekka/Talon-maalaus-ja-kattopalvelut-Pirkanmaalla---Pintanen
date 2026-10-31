import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import CityCombobox from "@/components/CityCombobox";
import PhoneInput from "@/components/PhoneInput";
import FormPrivacyNote, { HoneypotField } from "@/components/FormPrivacyNote";
import KenttaVirhe from "@/components/lomake/KenttaVirhe";
import { LahetysVirhe } from "@/components/lomake/LomakeIlmoitus";
import { VIESTI, nimiVirhe, sahkopostiVirhe, fokusoiEnsimmainen } from "@/lib/lomakeViestit";
import { submitContactForm } from "@/lib/contactForm";
import { formatToInternational, phoneErrorMessage } from "@/lib/phoneValidation";

export type QuoteService = "tiilikatto" | "ulkomaalaus" | "muu";

/** Katon puhdistus on loppunut (12.10.2026), joten sitä ei voi enää valita. */
const serviceOptions: { value: QuoteService; label: string }[] = [
  { value: "tiilikatto", label: "Tiilikaton pinnoitus" },
  { value: "ulkomaalaus", label: "Talon maalaus" },
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

const ID = { palvelu: "tarjous-palvelu", kunta: "tarjous-kunta", nimi: "tarjous-nimi", puhelin: "tarjous-puhelin", sahkoposti: "tarjous-sahkoposti" } as const;
type Kentta = keyof typeof ID;
const virheId = (k: Kentta) => `${ID[k]}-virhe`;

/**
 * Kolmivaiheinen tarjouspyyntö: palvelu → kohde → yhteystiedot. Pakollisia ovat palvelu, kunta, nimi ja
 * puhelinnumero (Eki 31.10.2026); lisätiedot ja sähköposti ovat vapaaehtoisia, mutta sähköposti tarkistetaan, jos se annetaan.
 */
const QuoteWizard = ({ initialServices = [], onServicesChange, callerName }: QuoteWizardProps) => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<QuoteService[]>(initialServices);
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [virheet, setVirheet] = useState<Partial<Record<Kentta, string | null>>>({});
  const [lahetysVirhe, setLahetysVirhe] = useState<unknown>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    onServicesChange?.(services);
  }, [services, onServicesChange]);

  const toggle = (value: QuoteService) => {
    setServices((s) => (s.includes(value) ? s.filter((v) => v !== value) : [...s, value]));
    setVirheet((v) => ({ ...v, palvelu: null }));
  };

  const nayta = (uudet: Partial<Record<Kentta, string | null>>, jarjestys: Kentta[]) => {
    setVirheet(uudet);
    fokusoiEnsimmainen(uudet, jarjestys, ID);
  };

  const next = () => {
    if (step === 1 && services.length === 0) {
      nayta({ palvelu: VIESTI.palvelu }, ["palvelu"]);
      return;
    }
    if (step === 2 && !city) {
      nayta({ kunta: VIESTI.kunta }, ["kunta"]);
      return;
    }
    setVirheet({});
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  };

  const submit = async () => {
    if (submitting) return;
    const uudet = { nimi: nimiVirhe(name), puhelin: phoneErrorMessage(phone), sahkoposti: sahkopostiVirhe(email) };
    if (uudet.nimi || uudet.puhelin || uudet.sahkoposti) {
      nayta(uudet, ["nimi", "puhelin", "sahkoposti"]);
      return;
    }
    setVirheet({});
    setLahetysVirhe(null);
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
    } catch (err) {
      setLahetysVirhe(err ?? new Error());
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
          arviokäynnin.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-3xl shadow-2xl border border-border/60 p-6 md:p-10">
      <div className="flex items-center justify-between mb-6">
        {step > 1 ? (
          <button type="button" onClick={() => { setVirheet({}); setStep((s) => s - 1); }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
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
        <m.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }}>
          {step === 1 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-6">Mihin haluat tarjouksen?</h2>
              <div
                id={ID.palvelu}
                role="group"
                tabIndex={-1}
                aria-label="Palvelut"
                aria-invalid={virheet.palvelu ? true : undefined}
                aria-describedby={virheet.palvelu ? virheId("palvelu") : undefined}
                className="valintaryhma flex flex-col gap-3"
              >
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
              <KenttaVirhe id={virheId("palvelu")} viesti={virheet.palvelu} className="mt-3" />
              <button type="button" onClick={next} className="btn-hero !py-4 !text-base w-full mt-6">
                Jatka
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-2">Missä kohde sijaitsee?</h2>
              <p className="text-muted-foreground mb-6">Toimimme Pirkanmaalla ja Kanta-Hämeessä.</p>
              <CityCombobox
                id={ID.kunta}
                value={city}
                onChange={(v) => {
                  setCity(v);
                  setVirheet({});
                }}
                placeholder="Valitse kunta"
                errorId={virheet.kunta ? virheId("kunta") : null}
              />
              <KenttaVirhe id={virheId("kunta")} viesti={virheet.kunta} />
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
                noValidate
                className="flex flex-col gap-4"
              >
                <div>
                  <input
                    id={ID.nimi}
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (virheet.nimi) setVirheet((v) => ({ ...v, nimi: nimiVirhe(e.target.value) }));
                    }}
                    placeholder="Nimi"
                    aria-label="Nimi"
                    autoComplete="name"
                    aria-invalid={virheet.nimi ? true : undefined}
                    aria-describedby={virheet.nimi ? virheId("nimi") : undefined}
                    className={input}
                  />
                  <KenttaVirhe id={virheId("nimi")} viesti={virheet.nimi} />
                </div>
                <PhoneInput
                  id={ID.puhelin}
                  value={phone}
                  onChange={(v) => {
                    setPhone(v);
                    if (virheet.puhelin) setVirheet((e) => ({ ...e, puhelin: phoneErrorMessage(v) }));
                  }}
                  error={virheet.puhelin}
                  ariaLabel="Puhelinnumero"
                />
                <div>
                  <input
                    id={ID.sahkoposti}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (virheet.sahkoposti) setVirheet((v) => ({ ...v, sahkoposti: sahkopostiVirhe(e.target.value) }));
                    }}
                    placeholder="Sähköposti (vapaaehtoinen)"
                    aria-label="Sähköposti"
                    autoComplete="email"
                    aria-invalid={virheet.sahkoposti ? true : undefined}
                    aria-describedby={virheet.sahkoposti ? virheId("sahkoposti") : undefined}
                    className={input}
                  />
                  <KenttaVirhe id={virheId("sahkoposti")} viesti={virheet.sahkoposti} />
                </div>
                <HoneypotField value={website} onChange={setWebsite} />
                {lahetysVirhe !== null && <LahetysVirhe virhe={lahetysVirhe} />}
                <button type="submit" disabled={submitting} className="btn-hero !py-4 !text-base w-full disabled:opacity-60">
                  {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Lähetä tarjouspyyntö"}
                </button>
                <FormPrivacyNote />
              </form>
            </>
          )}
        </m.div>
      </AnimatePresence>
    </div>
  );
};

export default QuoteWizard;
