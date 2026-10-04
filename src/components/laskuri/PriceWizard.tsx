import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import CityCombobox from "@/components/CityCombobox";
import PhoneInput from "@/components/PhoneInput";
import FormPrivacyNote from "@/components/FormPrivacyNote";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/contactForm";
import { calculateRoofPrice, calculateWallPrice, formatPriceRange } from "@/lib/priceCalc";
import { isValidFinnishMobile, formatToInternational, PHONE_ERROR_MESSAGE } from "@/lib/phoneValidation";

export type WizardService = "pinnoitus" | "maalaus";

interface Option {
  label: string;
  value: string;
  hint?: string;
}

interface Question {
  key: string;
  title: string;
  help?: string;
  kind: "number" | "options";
  placeholder?: string;
  options?: Option[];
}

/* Samat kysymykset ja vastausvaihtoehdot kuin etusivun chat-laskurissa. */
const questions: Record<WizardService, Question[]> = {
  pinnoitus: [
    { key: "squareMeters", title: "Kuinka suuri katto on?", help: "Arvio riittää. Katto on suurempi kuin talon pohja.", kind: "number", placeholder: "esim. 200" },
    {
      key: "brokenTiles",
      title: "Onko katolla rikkinäisiä tiiliä?",
      kind: "options",
      options: [
        { label: "Ei ole", value: "ei" },
        { label: "1–5 rikkinäistä", value: "1-5" },
        { label: "5–20 rikkinäistä", value: "5-20" },
      ],
    },
    {
      key: "underlayment",
      title: "Löytyykö tiilien alta ehjä aluskate?",
      kind: "options",
      options: [
        { label: "Löytyy kyllä", value: "kylla" },
        { label: "En ole varma, parempi tulla tarkastamaan", value: "epävarma" },
      ],
    },
    {
      key: "slope",
      title: "Kuinka jyrkkä katto on?",
      kind: "options",
      options: [
        { label: "Loiva, melkein tasakatto", value: "loiva" },
        { label: "Normaali jyrkkyys, valjailla pärjää", value: "normaali" },
        { label: "Todella jyrkkä", value: "jyrkka" },
      ],
    },
    {
      key: "utilities",
      title: "Onko kohteessa vettä ja sähköä?",
      help: "Vesiposti ja tavallinen pistorasia riittävät.",
      kind: "options",
      options: [
        { label: "Kyllä löytyy", value: "kylla" },
        { label: "Ei löydy", value: "ei" },
      ],
    },
  ],
  maalaus: [
    { key: "squareMeters", title: "Kuinka monta pohjaneliötä talossa on?", help: "Arvio riittää.", kind: "number", placeholder: "esim. 150" },
    {
      key: "stories",
      title: "Montako kerrosta talossa on?",
      kind: "options",
      options: [
        { label: "1 kerros", value: "1" },
        { label: "1,5 kerrosta", value: "1.5" },
        { label: "2 kerrosta", value: "2" },
      ],
    },
    {
      key: "peeling",
      title: "Hilseileekö tai lohkeileeko maali?",
      kind: "options",
      options: [
        { label: "Ei ollenkaan", value: "none" },
        { label: "Vähän (1–2 seinällä)", value: "1-2" },
        { label: "Paljon (yli 3 seinällä)", value: "3+" },
      ],
    },
    {
      key: "utilities",
      title: "Onko kohteessa vettä ja sähköä?",
      help: "Vesiposti ja tavallinen pistorasia riittävät.",
      kind: "options",
      options: [
        { label: "Kyllä löytyy", value: "kylla" },
        { label: "Ei löydy", value: "ei" },
      ],
    },
  ],
};

const serviceOptions: { value: WizardService; label: string; imageBase: string }[] = [
  { value: "pinnoitus", label: "Tiilikaton pinnoitus", imageBase: "puhdas-tiilenpunainen-tiilikatto-suojakasittelyn-jalkeen" },
  { value: "maalaus", label: "Talon maalaus", imageBase: "moderni-tumma-puutalo-julkisivumaalaus-valmis" },
];

const labelOf = (q: Question, value: string) => q.options?.find((o) => o.value === value)?.label ?? value;

const buildDetails = (service: WizardService, answers: Record<string, string>, city: string) => {
  const parts = questions[service].map((q) => {
    const v = answers[q.key] ?? "-";
    if (q.kind === "number") return `${service === "pinnoitus" ? "Katon koko" : "Pohjaneliöt"}: ${v} m²`;
    const names: Record<string, string> = { brokenTiles: "Rikkinäiset tiilet", underlayment: "Aluskate", slope: "Jyrkkyys", utilities: "Vesi/sähkö", stories: "Kerrokset", peeling: "Hilseily" };
    return `${names[q.key] ?? q.key}: ${labelOf(q, v)}`;
  });
  parts.push(`Kaupunki: ${city || "-"}`);
  return parts.join(", ");
};

interface PriceWizardProps {
  initialService?: WizardService | null;
}

/**
 * Hintalaskuri: palvelu → kysymykset → kaupunki → yhteystiedot → hinta-arvio.
 * Hinta näytetään yhteystietojen jälkeen samoin kuin chat-laskurissa, ja tiedot lähtevät myyntiin ja CRM:ään.
 */
const PriceWizard = ({ initialService = null }: PriceWizardProps) => {
  const { toast } = useToast();
  const [service, setService] = useState<WizardService | null>(initialService);
  const [index, setIndex] = useState(0); // 0..n-1 kysymykset, n = kaupunki, n+1 = yhteystiedot
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [numberInput, setNumberInput] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const qs = service ? questions[service] : [];
  const totalSteps = qs.length + 2;
  const stepNumber = Math.min(index + 1, totalSteps);
  const current = index < qs.length ? qs[index] : null;
  const atCity = service && index === qs.length;
  const atContact = service && index === qs.length + 1;

  useEffect(() => {
    if (initialService) setService(initialService);
  }, [initialService]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [index, service]);

  const price = useMemo(() => {
    if (!service) return null;
    const m2 = Number(answers.squareMeters);
    if (!m2) return null;
    return service === "pinnoitus" ? calculateRoofPrice(m2, answers.slope) : calculateWallPrice(m2, answers.stories, answers.peeling);
  }, [service, answers]);

  const pickService = (s: WizardService) => {
    setService(s);
    setAnswers({});
    setIndex(0);
    setNumberInput("");
  };

  const answer = (key: string, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setIndex((i) => i + 1);
  };

  const submitNumber = () => {
    const n = Number(numberInput.replace(",", "."));
    if (!n || n < 10 || n > 2000) {
      toast({ title: "Tarkista neliöt", description: "Anna pinta-ala numerona, esimerkiksi 150.", variant: "destructive" });
      return;
    }
    answer("squareMeters", String(Math.round(n)));
  };

  const back = () => {
    if (index === 0) {
      setService(null);
      return;
    }
    setIndex((i) => i - 1);
  };

  const submit = async () => {
    if (!service || !price) return;
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
    const priceStr = formatPriceRange(price);
    const details = buildDetails(service, answers, city);
    try {
      await submitContactForm({
        name: name.trim(),
        phone: formatToInternational(phone),
        service: service === "maalaus" ? "ulkomaalaus" : "tiilikatto",
        city: city || undefined,
        message: `Hintalaskuri: ${details}`,
        priceEstimate: priceStr,
        calculatorDetails: details,
      },
        "hintalaskuri"
      );
      setResult(priceStr);
    } catch {
      toast({ title: "Virhe", description: "Jokin meni pieleen. Yritä uudelleen tai soita meille.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const optionButton = "w-full text-left rounded-xl border border-border bg-background px-5 py-4 text-foreground font-medium transition-all hover:border-accent hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <div ref={topRef} className="bg-card rounded-3xl shadow-2xl border border-border/60 p-6 md:p-10 max-w-2xl mx-auto scroll-mt-28">
      {result ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-5">
            <Check className="w-7 h-7 text-accent-ink" />
          </div>
          <p className="text-muted-foreground mb-2">Alustava hinta-arvio</p>
          <p className="text-4xl md:text-5xl font-bold text-foreground font-heading mb-4">{result}</p>
          <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
            Kiitos, {name.trim()}! Tämä on suuntaa antava arvio. Olemme sinuun pian yhteydessä ja sovimme ilmaisen
            arviokäynnin, jonka jälkeen saat tarkan hinnan.
          </p>
        </div>
      ) : !service ? (
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-2 text-center">Mitä haluat laskea?</h2>
          <p className="text-muted-foreground text-center mb-8">Valitse palvelu. Laskeminen vie noin minuutin.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {serviceOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => pickService(opt.value)}
                className="group rounded-2xl overflow-hidden border border-border bg-background text-left transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ResponsiveImage baseName={opt.imageBase} alt={opt.label} className="w-full aspect-[4/3] object-cover" sizes="(max-width: 640px) 100vw, 300px" width={800} height={600} />
                <span className="block px-5 py-4 font-bold text-foreground">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6">
            <button type="button" onClick={back} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Takaisin
            </button>
            <span className="text-sm text-muted-foreground">
              Vaihe {stepNumber} / {totalSteps}
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full mb-8 overflow-hidden">
            <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: `${(stepNumber / totalSteps) * 100}%` }} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={`${service}-${index}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }}>
              {current && (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-2">{current.title}</h2>
                  {current.help && <p className="text-muted-foreground mb-6">{current.help}</p>}
                  {current.kind === "number" ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        submitNumber();
                      }}
                      className="flex flex-col sm:flex-row gap-3 mt-4"
                    >
                      <div className="relative flex-1">
                        <input
                          type="number"
                          inputMode="numeric"
                          min={10}
                          max={2000}
                          value={numberInput}
                          onChange={(e) => setNumberInput(e.target.value)}
                          placeholder={current.placeholder}
                          aria-label={current.title}
                          autoFocus
                          className="w-full rounded-xl border border-border bg-background px-5 py-4 pr-14 text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground">m²</span>
                      </div>
                      <button type="submit" className="btn-hero !py-4 !text-base">
                        Jatka
                      </button>
                    </form>
                  ) : (
                    <div className="flex flex-col gap-3 mt-4">
                      {current.options!.map((o) => (
                        <button key={o.value} type="button" onClick={() => answer(current.key, o.value)} className={optionButton}>
                          {o.label}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {atCity && (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-2">Missä kohde sijaitsee?</h2>
                  <p className="text-muted-foreground mb-6">
                    {answers.utilities === "ei" ? "Ilman vettä ja sähköä sovimme käytännöt paikan päällä. Kerro vielä, missä kohde on." : "Toimimme Pirkanmaalla ja Kanta-Hämeessä."}
                  </p>
                  <CityCombobox value={city} onChange={setCity} placeholder="Valitse kunta" />
                  <button type="button" onClick={() => setIndex((i) => i + 1)} className="btn-hero !py-4 !text-base w-full mt-6">
                    Jatka
                  </button>
                </>
              )}

              {atContact && (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-2">Viimeinen vaihe</h2>
                  <p className="text-muted-foreground mb-6">Näet hinta-arvion heti, kun jätät nimesi ja puhelinnumerosi. Palaamme asiaan ja sovimme ilmaisen arviokäynnin.</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submit();
                    }}
                    className="flex flex-col gap-4"
                  >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nimi"
                      aria-label="Nimi"
                      autoComplete="name"
                      className="w-full rounded-xl border border-border bg-background px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <PhoneInput value={phone} onChange={setPhone} hasError={phoneError} errorMessage={PHONE_ERROR_MESSAGE} ariaLabel="Puhelinnumero" />
                    <button type="submit" disabled={submitting} className="btn-hero !py-4 !text-base w-full disabled:opacity-60">
                      {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Näytä hinta-arvio"}
                    </button>
                    <FormPrivacyNote />
                  </form>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default PriceWizard;
