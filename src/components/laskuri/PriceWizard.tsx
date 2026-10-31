import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import CityCombobox from "@/components/CityCombobox";
import PhoneInput from "@/components/PhoneInput";
import FormPrivacyNote, { HoneypotField } from "@/components/FormPrivacyNote";
import KenttaVirhe from "@/components/lomake/KenttaVirhe";
import { LahetysVirhe } from "@/components/lomake/LomakeIlmoitus";
import { VIESTI, lukuViesti, nimiVirhe, fokusoiEnsimmainen } from "@/lib/lomakeViestit";
import { submitContactForm } from "@/lib/contactForm";
import { trackEvent } from "@/lib/analytics";
import { calculateRidgeSealPrice, calculateRoofPrice, calculateWallPrice, formatPriceRange } from "@/lib/priceCalc";
import { vahennysTeksti } from "@/components/vahennys/vahennysData";
import { formatToInternational, laskurinPuhelinVirhe, PHONE_CHECK_MS, PHONE_CHECKING_LABEL } from "@/lib/phoneValidation";

export type WizardService = "pinnoitus" | "maalaus";

export interface CalculatorOption {
  label: string;
  value: string;
  hint?: string;
}

export interface CalculatorQuestion {
  key: string;
  title: string;
  help?: string;
  kind: "number" | "options";
  placeholder?: string;
  options?: CalculatorOption[];
  /** Lukukysymyksen yksikkö ja rajat (oletus m², 10–2000). */
  unit?: string;
  min?: number;
  max?: number;
  /** Kysytään vain, jos aiemmat vastaukset täyttävät ehdon (harjan pituus vain, jos harjatiiviste puuttuu). */
  showIf?: (answers: Record<string, string>) => boolean;
}

/*
 * Laskurien kysymykset ja vastausvaihtoehdot yhdessä paikassa: tämä sivu (/hintalaskuri) kysyy ne
 * vaihe kerrallaan ja etusivun laskuri (ChatPriceCalculator) yhtenä lomakkeena.
 */
// eslint-disable-next-line react-refresh/only-export-components -- jaettu data etusivun laskurille
export const calculatorQuestions: Record<WizardService, CalculatorQuestion[]> = {
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
    // Eerik 29.10.2026: harjatiiviste laskuriin, kyllä/ei; kyllä avaa kevyen kentän harjan pituudelle samaan
    // vaiheeseen (ei omaa vaihetta). 15 €/m pinnoituksen yhteydessä, tulokseen vain euromäärä.
    {
      key: "ridgeSeal",
      title: "Puuttuuko katolta harjatiiviste?",
      help: "Harjatiiviste on tiiviste harjatiilen alla. Jos et tiedä, vastaa ei: katsomme sen kuntotarkastuksessa.",
      kind: "options",
      options: [
        { label: "Kyllä puuttuu", value: "kylla" },
        { label: "Ei puutu", value: "ei" },
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

// eslint-disable-next-line react-refresh/only-export-components -- jaettu data etusivun laskurille
export const calculatorServices: { value: WizardService; label: string; imageBase: string }[] = [
  { value: "pinnoitus", label: "Tiilikaton pinnoitus", imageBase: "tiilikaton-pesu-ja-pinnoitus-puhdas-tiilenpunainen-tiilikatto" },
  { value: "maalaus", label: "Talon maalaus", imageBase: "talon-maalaus-moderni-tumma-puutalo-julkisivumaalaus-valmis" },
];

const labelOf = (q: CalculatorQuestion, value: string) => q.options?.find((o) => o.value === value)?.label ?? value;

/** Laskurin vastaukset yhdeksi riviksi myynnin sähköpostiin ja CRM:ään. */
// eslint-disable-next-line react-refresh/only-export-components -- jaettu etusivun laskurille
export const buildCalculatorDetails = (service: WizardService, answers: Record<string, string>, city: string) => {
  const parts = calculatorQuestions[service].filter((q) => !q.showIf || q.showIf(answers)).map((q) => {
    const v = answers[q.key] ?? "-";
    if (q.kind === "number") return `${service === "pinnoitus" ? "Katon koko" : "Pohjaneliöt"}: ${v} m²`;
    const names: Record<string, string> = { brokenTiles: "Rikkinäiset tiilet", underlayment: "Aluskate", slope: "Jyrkkyys", ridgeSeal: "Harjatiiviste", utilities: "Vesi/sähkö", stories: "Kerrokset", peeling: "Hilseily" };
    const rivi = `${names[q.key] ?? q.key}: ${labelOf(q, v)}`;
    return q.key === "ridgeSeal" && v === "kylla" ? `${rivi}, Harjan pituus: ${answers.ridgeMeters ?? "-"} m` : rivi;
  });
  parts.push(`Kaupunki: ${city || "-"}`);
  return parts.join(", ");
};

interface PriceWizardProps {
  initialService?: WizardService | null;
}

/**
 * Hintalaskuri: palvelu → kysymykset → kaupunki → yhteystiedot → hinta-arvio.
 * Hinta näytetään yhteystietojen jälkeen samoin kuin etusivun laskurissa, ja tiedot lähtevät myyntiin ja CRM:ään.
 */
/** Kenttien id:t fokusta ja aria-describedby-viittausta varten. */
const ID = { luku: "laskuri-luku", harja: "harjan-pituus", kunta: "laskuri-kunta", nimi: "laskuri-nimi", puhelin: "laskuri-puhelin" } as const;
type Kentta = keyof typeof ID;
const virheId = (k: Kentta) => `${ID[k]}-virhe`;

const PriceWizard = ({ initialService = null }: PriceWizardProps) => {
  const [service, setService] = useState<WizardService | null>(initialService);
  const [index, setIndex] = useState(0); // 0..n-1 kysymykset, n = kaupunki, n+1 = yhteystiedot
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [numberInput, setNumberInput] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  /** Kenttien virheet. Näkyvät vasta, kun kävijä yrittää jatkaa, ja poistuvat heti kun kenttä on kunnossa. */
  const [virheet, setVirheet] = useState<Partial<Record<Kentta, string | null>>>({});
  const [lahetysVirhe, setLahetysVirhe] = useState<unknown>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [resultVahennys, setResultVahennys] = useState<string | null>(null);
  const [resultHarja, setResultHarja] = useState(0);
  /** Puhelinnumeron "tarkistus" (2 s) ennen virhettä, kuten etusivun chat-laskurissa (Eki 31.10.2026). */
  const [tarkistetaan, setTarkistetaan] = useState(false);
  const tarkistusAjastin = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (tarkistusAjastin.current) clearTimeout(tarkistusAjastin.current);
  }, []);
  const topRef = useRef<HTMLDivElement>(null);

  const qs = service ? calculatorQuestions[service].filter((q) => !q.showIf || q.showIf(answers)) : [];
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
    setVirheet({});
  }, [index, service]);

  const nayta = (uudet: Partial<Record<Kentta, string | null>>, jarjestys: Kentta[]) => {
    setVirheet(uudet);
    fokusoiEnsimmainen(uudet, jarjestys, ID);
  };

  const price = useMemo(() => {
    if (!service) return null;
    const m2 = Number(answers.squareMeters);
    if (!m2) return null;
    const base = service === "pinnoitus" ? calculateRoofPrice(m2, answers.slope) : calculateWallPrice(m2, answers.stories, answers.peeling);
    // Harjatiiviste lisätään loppuhintaan eriteltynä (Eerik 29.10.2026).
    const harja = service === "pinnoitus" && answers.ridgeSeal === "kylla" && Number(answers.ridgeMeters) > 0 ? calculateRidgeSealPrice(Number(answers.ridgeMeters)) : 0;
    return { min: base.min + harja, max: base.max + harja, harja };
  }, [service, answers]);

  // GA4: laskurin aloitus, jokainen askel ja valmistuminen, jotta liidiportin (nimi ja
  // puhelin ennen hintaa) keskeytyskohta näkyy datasta. Ei henkilötietoja parametreissa.
  const pickService = (s: WizardService) => {
    setService(s);
    setAnswers({});
    setIndex(0);
    setNumberInput("");
    trackEvent("laskuri_aloitus", { palvelu: s });
  };

  const answer = (key: string, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setIndex((i) => i + 1);
    if (service) trackEvent("laskuri_askel", { palvelu: service, askel: key });
  };

  const submitNumber = () => {
    if (!current) return;
    const n = Number(numberInput.replace(",", "."));
    const min = current.min ?? 10;
    const max = current.max ?? 2000;
    if (!n || n < min || n > max) {
      const mika = current.unit === "m" ? "harjan pituus" : service === "pinnoitus" ? "katon koko" : "talon pohjapinta-ala";
      nayta({ luku: lukuViesti(mika, current.unit === "m" ? "m" : "m²", min, max) }, ["luku"]);
      return;
    }
    setNumberInput("");
    answer(current.key, String(Math.round(n)));
  };

  /** Harjan pituus kyllä-valinnan kentästä: 1–200 m, sitten seuraava vaihe. */
  const jatkaHarja = () => {
    const n = Number(String(answers.ridgeMeters ?? "").replace(",", "."));
    if (!n || n < 1 || n > 200) {
      nayta({ harja: lukuViesti("harjan pituus", "m", 1, 200) }, ["harja"]);
      return;
    }
    setAnswers((a) => ({ ...a, ridgeMeters: String(Math.round(n)) }));
    setIndex((i) => i + 1);
    if (service) trackEvent("laskuri_askel", { palvelu: service, askel: "ridgeSeal" });
  };

  const back = () => {
    if (index === 0) {
      setService(null);
      return;
    }
    setIndex((i) => i - 1);
  };

  /** Paikkakunta on pakollinen (Eki 31.10.2026: laskurissa ei saa jatkaa ilman kuntaa). */
  const jatkaKunta = () => {
    if (!city) {
      nayta({ kunta: VIESTI.kunta }, ["kunta"]);
      return;
    }
    setIndex((i) => i + 1);
  };

  const submit = async () => {
    if (!service || !price || submitting || tarkistetaan) return;
    const nimi = nimiVirhe(name);
    const puhelin = laskurinPuhelinVirhe(phone);
    // Tyhjät kentät kerrotaan heti.
    if (nimi || !phone.trim()) {
      nayta({ nimi, puhelin }, ["nimi", "puhelin"]);
      return;
    }
    // Varmasti väärä numero: 2 s "tarkistus", sitten "Numero ei käytössä".
    if (puhelin) {
      setVirheet({});
      setTarkistetaan(true);
      if (tarkistusAjastin.current) clearTimeout(tarkistusAjastin.current);
      tarkistusAjastin.current = setTimeout(() => {
        setTarkistetaan(false);
        nayta({ puhelin }, ["puhelin"]);
      }, PHONE_CHECK_MS);
      return;
    }
    setVirheet({});
    setLahetysVirhe(null);
    setSubmitting(true);
    const priceStr = formatPriceRange(price);
    const details = buildCalculatorDetails(service, answers, city);
    try {
      await submitContactForm({
        name: name.trim(),
        phone: formatToInternational(phone),
        service: service === "maalaus" ? "ulkomaalaus" : "tiilikatto",
        city: city || undefined,
        message: `Hintalaskuri: ${details}`,
        priceEstimate: priceStr,
        calculatorDetails: details,
        website,
      },
        "hintalaskuri"
      );
      setResult(priceStr);
      setResultHarja(price.harja);
      // Kotitalousvähennys alennuksena, hintavälin keskikohdasta (Eki 31.10.2026).
      setResultVahennys(vahennysTeksti(price.min, price.max));
      trackEvent("laskuri_valmis", { palvelu: service });
    } catch (err) {
      setLahetysVirhe(err ?? new Error());
    } finally {
      setSubmitting(false);
    }
  };

  const optionButton = "w-full text-left rounded-xl border border-border bg-background px-5 py-4 text-foreground font-medium transition-all hover:border-accent hover:bg-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

  return (
    <div ref={topRef} className="bg-card rounded-3xl shadow-2xl border border-border/60 p-6 md:p-10 max-w-2xl mx-auto scroll-mt-28">
      {result ? (
        // Tulos (Eki 31.10.2026): hinta isolla, vähennys alennuksena, harjatiiviste pelkkänä hintana, vähän tekstiä.
        <div className="text-center py-2" data-tulos>
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-accent-ink" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Hinta-arvio</p>
          <p className="mt-1 font-heading text-4xl font-extrabold leading-tight text-foreground sm:text-5xl md:text-6xl">{result}</p>
          {resultHarja > 0 && (
            <p className="mt-2 text-muted-foreground">
              Sisältää harjatiivisteen <strong className="text-foreground">{resultHarja.toLocaleString("fi-FI")} €</strong>
            </p>
          )}
          {resultVahennys && (
            <div className="mx-auto mt-6 inline-flex flex-col items-center rounded-2xl bg-[#ffd23f] px-6 py-3 text-navy shadow-sm">
              <span className="text-sm font-semibold uppercase tracking-wide">Kotitalousvähennys</span>
              <span className="font-heading text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">{resultVahennys}</span>
            </div>
          )}
          <p className="mt-6 text-muted-foreground">Soitamme sinulle viimeistään seuraavana arkipäivänä.</p>
        </div>
      ) : !service ? (
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-2 text-center">Mitä haluat laskea?</h2>
          <p className="text-muted-foreground text-center mb-8">Valitse palvelu. Laskeminen vie noin minuutin.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {calculatorServices.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => pickService(opt.value)}
                className="group rounded-2xl overflow-hidden border border-border bg-background text-left transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ResponsiveImage baseName={opt.imageBase} alt="" priority className="w-full aspect-[4/3] object-cover" sizes="(max-width: 640px) 100vw, 300px" width={800} height={600} />
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
            <m.div key={`${service}-${index}`} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }}>
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
                          min={current.min ?? 10}
                          max={current.max ?? 2000}
                          id={ID.luku}
                          value={numberInput}
                          onChange={(e) => {
                            setNumberInput(e.target.value);
                            if (virheet.luku) setVirheet({});
                          }}
                          placeholder={current.placeholder}
                          aria-label={current.title}
                          aria-invalid={virheet.luku ? true : undefined}
                          aria-describedby={virheet.luku ? virheId("luku") : undefined}
                          autoFocus
                          className="w-full rounded-xl border border-border bg-background px-5 py-4 pr-14 text-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        <span className="absolute right-5 top-[1.85rem] -translate-y-1/2 text-muted-foreground">{current.unit ?? "m²"}</span>
                        <KenttaVirhe id={virheId("luku")} viesti={virheet.luku} />
                      </div>
                      <button type="submit" className="btn-hero !py-4 !text-base sm:self-start">
                        Jatka
                      </button>
                    </form>
                  ) : current.key === "ridgeSeal" ? (
                    // Kyllä avaa UKK:n tapaan kevyen kentän harjan pituudelle kyllä- ja ei-napin väliin (Eerik 29.10.2026).
                    <div className="flex flex-col gap-3 mt-4">
                      {current.options!.map((o) => (
                        <div key={o.value}>
                          <button
                            type="button"
                            onClick={() => (o.value === "kylla" ? setAnswers((a) => ({ ...a, ridgeSeal: "kylla" })) : answer(current.key, o.value))}
                            aria-expanded={o.value === "kylla" ? answers.ridgeSeal === "kylla" : undefined}
                            className={`${optionButton} ${answers.ridgeSeal === o.value ? "border-accent bg-accent-light" : ""}`}
                          >
                            {o.label}
                          </button>
                          {o.value === "kylla" && (
                            <AnimatePresence initial={false}>
                              {answers.ridgeSeal === "kylla" && (
                                <m.div
                                  key="harjan-pituus"
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <form
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      jatkaHarja();
                                    }}
                                    className="mt-2 rounded-xl border border-accent/40 bg-accent-light px-4 py-3"
                                  >
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <label htmlFor="harjan-pituus" className="flex-1 text-sm text-foreground">
                                      Harjan pituus metreinä, arvio riittää
                                    </label>
                                    <div className="relative">
                                      <input
                                        id="harjan-pituus"
                                        type="number"
                                        inputMode="numeric"
                                        min={1}
                                        max={200}
                                        value={answers.ridgeMeters ?? ""}
                                        onChange={(e) => {
                                          setAnswers((a) => ({ ...a, ridgeMeters: e.target.value }));
                                          if (virheet.harja) setVirheet({});
                                        }}
                                        aria-invalid={virheet.harja ? true : undefined}
                                        aria-describedby={virheet.harja ? virheId("harja") : undefined}
                                        placeholder="12"
                                        autoFocus
                                        className="w-28 rounded-lg border border-border bg-background px-3 py-2 pr-8 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                                      />
                                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">m</span>
                                    </div>
                                    <button type="submit" className="btn-hero !px-5 !py-2.5 !text-sm">
                                      Jatka
                                    </button>
                                    </div>
                                    <KenttaVirhe id={virheId("harja")} viesti={virheet.harja} />
                                  </form>
                                </m.div>
                              )}
                            </AnimatePresence>
                          )}
                        </div>
                      ))}
                    </div>
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
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-2">Millä paikkakunnalla kohde on?</h2>
                  <p className="text-muted-foreground mb-6">
                    {answers.utilities === "ei" ? "Ilman vettä ja sähköä sovimme käytännöt paikan päällä." : "Toimimme Pirkanmaalla ja Kanta-Hämeessä."}
                  </p>
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
                  <button type="button" onClick={jatkaKunta} className="btn-hero !py-4 !text-base w-full mt-6">
                    Jatka
                  </button>
                </>
              )}

              {atContact && (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground font-heading mb-2">Viimeinen vaihe</h2>
                  <p className="text-muted-foreground mb-6">Jätä vielä nimi ja puhelinnumero, niin näytämme arvion.</p>
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
                        className="w-full rounded-xl border border-border bg-background px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                      <KenttaVirhe id={virheId("nimi")} viesti={virheet.nimi} />
                    </div>
                    <PhoneInput
                      id={ID.puhelin}
                      value={phone}
                      onChange={(v) => {
                        setPhone(v);
                        // Virhe katoaa, kun numero on kunnossa; sääntöä ei paljasteta kirjoittaessa.
                        if (virheet.puhelin && !laskurinPuhelinVirhe(v)) setVirheet((e) => ({ ...e, puhelin: null }));
                      }}
                      error={virheet.puhelin}
                      disabled={tarkistetaan}
                      ariaLabel="Puhelinnumero"
                    />
                    <HoneypotField value={website} onChange={setWebsite} />
                    {lahetysVirhe !== null && <LahetysVirhe virhe={lahetysVirhe} />}
                    <button type="submit" disabled={submitting || tarkistetaan} className="btn-hero !py-4 !text-base w-full disabled:opacity-60">
                      {submitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : tarkistetaan ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> {PHONE_CHECKING_LABEL}
                        </>
                      ) : (
                        "Näytä hinta-arvio"
                      )}
                    </button>
                    <FormPrivacyNote />
                  </form>
                </>
              )}
            </m.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default PriceWizard;
