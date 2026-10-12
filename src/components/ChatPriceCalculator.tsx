import { useId, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';
import ResponsiveImage from '@/components/ResponsiveImage';
import CityCombobox from '@/components/CityCombobox';
import PhoneInput from '@/components/PhoneInput';
import FormPrivacyNote, { HoneypotField } from '@/components/FormPrivacyNote';
import { submitContactForm, formErrorMessage } from '@/lib/contactForm';
import { trackEvent } from '@/lib/analytics';
import { calculateRoofPrice, calculateWallPrice, formatPriceRange } from '@/lib/priceCalc';
import { isValidFinnishMobile, formatToInternational, PHONE_ERROR_MESSAGE } from '@/lib/phoneValidation';
import {
  buildCalculatorDetails,
  calculatorQuestions,
  calculatorServices,
  type CalculatorQuestion,
  type WizardService,
} from '@/components/laskuri/PriceWizard';

/*
 * Etusivun hintalaskuri yhtenä tavallisena lomakkeena (tarkastus 12.10.2026, T40–T43).
 * Kysymykset ovat samat kuin /hintalaskuri-sivun laskurissa (PriceWizard), ja kaavat luetaan
 * src/lib/priceCalc.ts:stä. Hinta näytetään vasta, kun nimi ja puhelinnumero on jätetty, ja
 * samalla tiedot lähtevät myyntiin ja CRM:ään submitContactForm-funktion kautta.
 */

const MIN_M2 = 10;
const MAX_M2 = 2000;

const inputClass =
  'w-full rounded-xl border border-border bg-background px-5 py-4 text-foreground focus:outline-none focus:ring-2 focus:ring-accent';
const radioRow =
  'flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 cursor-pointer transition-colors hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-light';

const FieldError = ({ id, text }: { id: string; text?: string }) =>
  text ? (
    <p id={id} role="alert" className="mt-2 text-sm text-destructive font-medium">
      {text}
    </p>
  ) : null;

const ChatPriceCalculator = () => {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [service, setService] = useState<WizardService | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [squareMeters, setSquareMeters] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const id = (key: string) => `${uid}-${key}`;
  const questions = service ? calculatorQuestions[service] : [];
  const numberQuestion = questions.find((q) => q.kind === 'number');
  const optionQuestions = questions.filter((q) => q.kind === 'options');

  const pickService = (s: WizardService) => {
    setService(s);
    setAnswers({});
    setErrors({});
    trackEvent('laskuri_aloitus', { palvelu: s, lomake: 'etusivu' });
  };

  const setAnswer = (key: string, value: string) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: '' } : e));
  };

  const clearError = (key: string) => setErrors((e) => (e[key] ? { ...e, [key]: '' } : e));

  /** Näppäimistö- ja ruudunlukijakäyttö: kohdistus ensimmäiseen kenttään, jossa on virhe. */
  const focusFirstError = () => {
    setTimeout(() => {
      const el = formRef.current?.querySelector<HTMLElement>(
        '[aria-invalid="true"], [data-invalid="true"] input, [data-invalid="true"] button',
      );
      el?.focus();
    }, 0);
  };

  const validate = (): { m2: number } | null => {
    const next: Record<string, string> = {};
    const m2 = Number(squareMeters.replace(',', '.'));
    if (!m2 || m2 < MIN_M2 || m2 > MAX_M2) {
      next.squareMeters = `Anna pinta-ala numerona, esimerkiksi ${service === 'pinnoitus' ? 200 : 150}.`;
    }
    for (const q of optionQuestions) {
      if (!answers[q.key]) next[q.key] = 'Valitse vaihtoehto.';
    }
    if (!city.trim()) next.city = 'Valitse paikkakunta.';
    if (!name.trim()) next.name = 'Kirjoita nimesi.';
    if (!phone.trim()) next.phone = 'Kirjoita puhelinnumerosi.';
    else if (!isValidFinnishMobile(phone)) next.phone = PHONE_ERROR_MESSAGE;

    if (Object.keys(next).length > 0) {
      setErrors(next);
      focusFirstError();
      return null;
    }
    return { m2: Math.round(m2) };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!service || submitting) return;
    const valid = validate();
    if (!valid) return;

    const price =
      service === 'pinnoitus'
        ? calculateRoofPrice(valid.m2, answers.slope)
        : calculateWallPrice(valid.m2, answers.stories, answers.peeling);
    const priceStr = formatPriceRange(price);
    const details = buildCalculatorDetails(service, { ...answers, squareMeters: String(valid.m2) }, city.trim());

    setErrors({});
    setSubmitting(true);
    try {
      await submitContactForm(
        {
          name: name.trim(),
          phone: formatToInternational(phone),
          service: service === 'maalaus' ? 'ulkomaalaus' : 'tiilikatto',
          city: city.trim(),
          message: `Hintalaskuri (etusivu): ${details}`,
          priceEstimate: priceStr,
          calculatorDetails: details,
          website,
        },
        'etusivun hintalaskuri',
      );
      setResult(priceStr);
      trackEvent('laskuri_valmis', { palvelu: service, lomake: 'etusivu' });
    } catch (err) {
      setErrors({ submit: formErrorMessage(err) });
    } finally {
      setSubmitting(false);
    }
  };

  const renderOptions = (q: CalculatorQuestion) => {
    const errId = id(`${q.key}-virhe`);
    const helpId = id(`${q.key}-ohje`);
    const describedBy = [q.help ? helpId : null, errors[q.key] ? errId : null].filter(Boolean).join(' ') || undefined;
    const utilitiesMissing = q.key === 'utilities' && answers.utilities === 'ei';
    return (
      <fieldset key={q.key} data-invalid={errors[q.key] ? 'true' : undefined} aria-describedby={describedBy}>
        <legend className="font-semibold text-foreground mb-2">{q.title}</legend>
        {q.help && (
          <p id={helpId} className="text-sm text-muted-foreground mb-3">
            {q.help}
          </p>
        )}
        <div className="flex flex-col gap-2">
          {q.options!.map((o) => (
            <label key={o.value} className={radioRow}>
              <input
                type="radio"
                name={id(q.key)}
                value={o.value}
                checked={answers[q.key] === o.value}
                onChange={() => setAnswer(q.key, o.value)}
                className="h-4 w-4 shrink-0 accent-primary"
              />
              <span className="text-foreground">{o.label}</span>
            </label>
          ))}
        </div>
        {utilitiesMissing && <p className="mt-2 text-sm text-muted-foreground">Ilman vettä ja sähköä sovimme käytännöt paikan päällä.</p>}
        <FieldError id={errId} text={errors[q.key]} />
      </fieldset>
    );
  };

  return (
    <section id="hintalaskuri" aria-labelledby={id('otsikko')} className="section-padding bg-accent-light scroll-mt-24">
      <div className="section-container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 id={id('otsikko')} className="heading-style text-3xl md:text-4xl text-accent-ink mb-3">
              Hintalaskuri
            </h2>
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
              Laske hinta-arvio katon pinnoitukselle tai talon maalaukselle. Vie noin minuutin.
            </p>
          </div>

          <div className="bg-card rounded-3xl shadow-xl border border-border/60 p-6 md:p-10">
            {result ? (
              <div role="status" className="text-center py-4">
                <p className="text-muted-foreground mb-2">Hinta-arvio</p>
                <p className="text-4xl md:text-5xl font-bold text-foreground font-heading mb-4">{result}</p>
                <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Soitamme sinulle viimeistään seuraavana arkipäivänä. Tarkan hinnan saat, kun olemme käyneet paikalla.
                </p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
                <fieldset>
                  <legend className="text-lg font-bold text-foreground mb-3">Mitä lasketaan?</legend>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {calculatorServices.map((opt) => (
                      <label
                        key={opt.value}
                        className="block rounded-2xl overflow-hidden border-2 border-border bg-background cursor-pointer transition-colors hover:border-accent has-[:checked]:border-accent-strong has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent has-[:focus-visible]:ring-offset-2"
                      >
                        <span aria-hidden="true" className="block">
                          <ResponsiveImage
                            baseName={opt.imageBase}
                            alt={opt.label}
                            className="w-full aspect-[16/9] object-cover"
                            sizes="(max-width: 640px) 100vw, 300px"
                            width={800}
                            height={450}
                          />
                        </span>
                        <span className="flex items-center gap-3 px-5 py-4">
                          <input
                            type="radio"
                            name={id('palvelu')}
                            value={opt.value}
                            checked={service === opt.value}
                            onChange={() => pickService(opt.value)}
                            className="h-4 w-4 shrink-0 accent-primary"
                          />
                          <span className="font-bold text-foreground">{opt.label}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {service && (
                  <>
                    {numberQuestion && (
                      <div className="border-t border-border/60 pt-8">
                        <label htmlFor={id('neliot')} className="block font-semibold text-foreground mb-1">
                          {numberQuestion.title}
                        </label>
                        {numberQuestion.help && (
                          <p id={id('neliot-ohje')} className="text-sm text-muted-foreground mb-3">
                            {numberQuestion.help}
                          </p>
                        )}
                        <div className="relative">
                          <input
                            id={id('neliot')}
                            type="number"
                            inputMode="numeric"
                            min={MIN_M2}
                            max={MAX_M2}
                            value={squareMeters}
                            onChange={(e) => {
                              setSquareMeters(e.target.value);
                              clearError('squareMeters');
                            }}
                            placeholder={numberQuestion.placeholder}
                            aria-invalid={errors.squareMeters ? true : undefined}
                            aria-describedby={[numberQuestion.help ? id('neliot-ohje') : null, errors.squareMeters ? id('neliot-virhe') : null].filter(Boolean).join(' ') || undefined}
                            className={`${inputClass} pr-14 text-lg`}
                          />
                          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground">m²</span>
                        </div>
                        <FieldError id={id('neliot-virhe')} text={errors.squareMeters} />
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">{optionQuestions.map(renderOptions)}</div>

                    <div className="border-t border-border/60 pt-8" role="group" aria-labelledby={id('kunta-otsikko')} data-invalid={errors.city ? 'true' : undefined}>
                      <p id={id('kunta-otsikko')} className="font-semibold text-foreground mb-3">
                        Millä paikkakunnalla kohde on?
                      </p>
                      <CityCombobox
                        value={city}
                        onChange={(v) => {
                          setCity(v);
                          clearError('city');
                        }}
                        placeholder="Valitse kunta"
                      />
                      <FieldError id={id('kunta-virhe')} text={errors.city} />
                    </div>

                    <div className="border-t border-border/60 pt-8">
                      <p className="font-semibold text-foreground mb-3">Jätä vielä nimi ja puhelinnumero, niin näytämme arvion.</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor={id('nimi')} className="block text-sm text-muted-foreground mb-1">
                            Nimi
                          </label>
                          <input
                            id={id('nimi')}
                            type="text"
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              clearError('name');
                            }}
                            autoComplete="name"
                            aria-invalid={errors.name ? true : undefined}
                            aria-describedby={errors.name ? id('nimi-virhe') : undefined}
                            className={inputClass}
                          />
                          <FieldError id={id('nimi-virhe')} text={errors.name} />
                        </div>
                        <div>
                          <label htmlFor={id('puhelin')} className="block text-sm text-muted-foreground mb-1">
                            Puhelinnumero
                          </label>
                          <PhoneInput
                            id={id('puhelin')}
                            value={phone}
                            onChange={(v) => {
                              setPhone(v);
                              clearError('phone');
                            }}
                            disabled={submitting}
                            hasError={Boolean(errors.phone)}
                            errorMessage={errors.phone}
                            ariaLabel="Puhelinnumero"
                          />
                        </div>
                      </div>
                      <HoneypotField value={website} onChange={setWebsite} />
                      <button type="submit" disabled={submitting} className="btn-hero !py-4 !text-base w-full mt-6 disabled:opacity-60">
                        {submitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" /> Lasketaan
                          </>
                        ) : (
                          'Näytä hinta-arvio'
                        )}
                      </button>
                      <FieldError id={id('lahetys-virhe')} text={errors.submit} />
                      <FormPrivacyNote className="mt-4" />
                    </div>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatPriceCalculator;
