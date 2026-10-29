import { useState, useEffect, useRef, useCallback, useId } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { getStorageUrl, getResponsiveSrc, getResponsiveSrcSet } from '@/lib/storage';
import { submitContactForm, formErrorMessage } from '@/lib/contactForm';
import FormPrivacyNote, { HoneypotField } from '@/components/FormPrivacyNote';
import { useToast } from '@/hooks/use-toast';
import CityCombobox from '@/components/CityCombobox';
import PhoneInput from '@/components/PhoneInput';
import { YHTEYSTIEDOT } from '@/data/company';
import { calculateWallPrice, calculateRoofPrice, calculateRidgeSealPrice, formatPriceRange } from '@/lib/priceCalc';
import { HARJAN_PITUUDET } from '@/components/laskuri/PriceWizard';
import { VAHENNYS_OMAVASTUU_HUOMAUTUS, hintaVahennyksenJalkeen } from '@/components/vahennys/vahennysData';
import {
  isValidFinnishMobile,
  formatToInternational,
  PHONE_ERROR_MESSAGE,
  PHONE_CHECKING_LABEL,
} from '@/lib/phoneValidation';

/**
 * Etusivun chat-hintalaskuri (Eerik 13.10.2026: chat takaisin, "olen saanut siitä paljon kehuja").
 * Kysymykset ja kaavat ovat samat kuin /hintalaskuri-sivun laskurissa (src/lib/priceCalc.ts).
 * Liidiportti: nimi ja puhelinnumero kysytään ennen hinnan näyttämistä, ja tiedot lähtevät
 * myyntiin ja CRM:ään submitContactForm-funktion kautta. Emojit ovat chatissa sallittuja.
 */

// ── Avatar ─────────────────────────────────────────────────────────────────
const eerikImage = getStorageUrl('Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp');

/** Botin "kirjoittaa…" -viive millisekunteina. */
const TYPING_DELAY_MS = 1000;
const MIN_M2 = 10;
const MAX_M2 = 2000;

// ── Types ──────────────────────────────────────────────────────────────────
type ServicePath = 'maalaus' | 'pinnoitus' | null;

interface ChatMsg {
  id: string;
  from: 'bot' | 'user';
  text: string;
  imageBase?: string;
}

interface ImageOption {
  label: string;
  value: string;
  imageBase: string;
}

type StepUI =
  | { kind: 'image-options'; options: ImageOption[] }
  | { kind: 'options'; options: { label: string; value: string }[] }
  | { kind: 'number'; placeholder: string; suffix?: string }
  | { kind: 'select'; label: string; options: { label: string; value: string }[] }
  | { kind: 'text'; placeholder: string }
  | { kind: 'city' }
  | { kind: 'contact' }
  | null;


// ── Typing indicator ──────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-3">
    <img src={eerikImage} alt="Eerik" className="w-7 h-7 rounded-full object-cover shrink-0" />
    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 bg-foreground/30 rounded-full"
          style={{
            animation: 'chatBounce 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  </div>
);

// ── Bot message bubble ────────────────────────────────────────────────────
const BotBubble = ({ text }: { text: string }) => (
  <m.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-end gap-2 mb-3"
  >
    <img src={eerikImage} alt="Eerik" className="w-7 h-7 rounded-full object-cover shrink-0" />
    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm max-w-[85%]">
      <p className="text-sm text-foreground leading-relaxed">{text}</p>
    </div>
  </m.div>
);

// ── User message bubble ───────────────────────────────────────────────────
const UserBubble = ({ text, imageBase }: { text: string; imageBase?: string }) => (
  <m.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-end mb-3"
  >
    <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm shadow-sm max-w-[85%] overflow-hidden">
      {imageBase && (
        <div className="aspect-[16/9] overflow-hidden max-h-28">
          <img
            loading="lazy"
            src={getResponsiveSrc(imageBase)}
            srcSet={getResponsiveSrcSet(imageBase)}
            alt={text}
            sizes="(max-width: 768px) 45vw, 250px"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <p className="text-sm leading-relaxed px-4 py-3">{text}</p>
    </div>
  </m.div>
);

// ── Main component ────────────────────────────────────────────────────────
const ChatPriceCalculator = () => {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [path, setPath] = useState<ServicePath>(null);
  const [stepUI, setStepUI] = useState<StepUI>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [numberInput, setNumberInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [website, setWebsite] = useState(''); // honeypot – oikea käyttäjä ei täytä tätä
  const [phoneError, setPhoneError] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const phoneCheckTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [chatStarted, setChatStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAutoStarted = useRef(false);
  const { toast } = useToast();
  const headingId = useId();

  // Collected data
  const dataRef = useRef<Record<string, string>>({});

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      const el = scrollRef.current;
      if (el && typeof el.scrollTo === 'function') el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, 100);
  }, []);

  const addBotMessage = useCallback((text: string): Promise<void> => {
    return new Promise(resolve => {
      setIsTyping(true);
      scrollToBottom();
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { id: `bot-${Date.now()}-${Math.random()}`, from: 'bot', text }]);
        scrollToBottom();
        resolve();
      }, TYPING_DELAY_MS);
    });
  }, [scrollToBottom]);

  const addUserMessage = useCallback((text: string, imageBase?: string) => {
    setMessages(prev => [...prev, { id: `user-${Date.now()}`, from: 'user', text, imageBase }]);
    scrollToBottom();
  }, [scrollToBottom]);

  // ── Flow definitions ──────────────────────────────────────────────────
  const startChat = useCallback(async () => {
    setChatStarted(true);
    setStepUI(null);
    await addBotMessage('Moikka! 👋 Mietitkö, mitä katon pinnoitus tai talon maalaus maksaisi? Lasketaan se yhdessä, vie noin minuutin.');
    await addBotMessage('Kumpaa lähdetään laskemaan?');
    setStepUI({
      kind: 'image-options',
      options: [
        { label: 'Talon maalaus', value: 'maalaus', imageBase: 'talon-maalaus-moderni-tumma-puutalo-julkisivumaalaus-valmis' },
        { label: 'Tiilikaton pinnoitus', value: 'pinnoitus', imageBase: 'tiilikaton-pesu-ja-pinnoitus-puhdas-tiilenpunainen-tiilikatto' },
      ],
    });
    setCurrentStep(1);
  }, [addBotMessage]);

  const advanceFlow = useCallback(async (step: number, selectedPath: ServicePath) => {
    setStepUI(null);

    if (selectedPath === 'maalaus') {
      switch (step) {
        case 2:
          await addBotMessage('Hyvä valinta! 🏡 Kuinka monta pohjaneliötä talossa on suunnilleen? Pelkkä numero riittää.');
          setStepUI({ kind: 'number', placeholder: 'esim. 150', suffix: 'm²' });
          break;
        case 3:
          await addBotMessage('Selvä. Entä montako kerrosta talossa on?');
          setStepUI({ kind: 'options', options: [
            { label: '1 kerros', value: '1' },
            { label: '1,5 kerrosta', value: '1.5' },
            { label: '2 kerrosta', value: '2' },
          ] });
          break;
        case 4:
          await addBotMessage('Missä kunnossa nykyinen maali on? Hilseileekö tai lohkeileeko se?');
          setStepUI({ kind: 'options', options: [
            { label: 'Ei ollenkaan', value: 'none' },
            { label: 'Vähän (1–2 seinällä)', value: '1-2' },
            { label: 'Paljon (yli 3 seinällä)', value: '3+' },
          ] });
          break;
        case 5:
          await addBotMessage('Hyvä tietää. Vielä pari käytännön asiaa: löytyykö pihalta vettä (vesiposti) ja sähköä (tavallinen pistorasia)?');
          setStepUI({ kind: 'options', options: [
            { label: 'Kyllä löytyy', value: 'kylla' },
            { label: 'Ei löydy', value: 'ei' },
          ] });
          break;
        case 6:
          if (dataRef.current.utilities === 'ei') {
            await addBotMessage('Selvä, sovitaan käytännöt paikan päällä. Millä paikkakunnalla kohde on?');
          } else {
            await addBotMessage('Hienoa. Millä paikkakunnalla kohde on?');
          }
          setStepUI({ kind: 'city' });
          break;
        case 7:
          await addBotMessage('Kiitos! Laskin raksuttaa jo. 🔢 Jätä vielä nimi ja puhelinnumero, niin näytän arvion ja voimme palata asiaan.');
          setStepUI({ kind: 'contact' });
          break;
        default:
          break;
      }
    } else if (selectedPath === 'pinnoitus') {
      switch (step) {
        case 2:
          await addBotMessage('Hyvä valinta! 🏠 Kuinka suuri katto on neliöinä? Katto on yleensä isompi kuin talon pohja, arvio riittää.');
          setStepUI({ kind: 'number', placeholder: 'esim. 200', suffix: 'm²' });
          break;
        case 3:
          await addBotMessage('Miltä katto näyttää? Onko siinä rikkinäisiä tiiliä?');
          setStepUI({ kind: 'options', options: [
            { label: 'Ei ole', value: 'ei' },
            { label: '1–5 rikkinäistä', value: '1-5' },
            { label: '5–20 rikkinäistä', value: '5-20' },
          ] });
          break;
        case 4:
          await addBotMessage('Entä onko tiilien alla ehjä aluskate?');
          setStepUI({ kind: 'options', options: [
            { label: 'Löytyy kyllä', value: 'kylla' },
            { label: 'En ole varma, parempi tulla tarkastamaan', value: 'epävarma' },
          ] });
          break;
        case 5:
          await addBotMessage('Vielä yksi tärkeä: kuinka jyrkkä katto on?');
          setStepUI({ kind: 'options', options: [
            { label: 'Loiva, melkein tasakatto', value: 'loiva' },
            { label: 'Normaali jyrkkyys, valjailla pärjää', value: 'normaali' },
            { label: 'Todella jyrkkä', value: 'jyrkka' },
          ] });
          break;
        // Eerik 29.10.2026: harjatiiviste laskuriin (15 €/m pinnoituksen yhteydessä, tulokseen vain euromäärä).
        case 6:
          await addBotMessage('Puuttuuko katolta harjatiiviste? Se on nauha harjatiilen alla. Jos et tiedä, vastaa ei: katsomme sen kuntotarkastuksessa.');
          setStepUI({ kind: 'options', options: [
            { label: 'Kyllä puuttuu', value: 'kylla' },
            { label: 'Ei puutu', value: 'ei' },
          ] });
          break;
        case 7:
          // Kevyt pudotusvalikko harjan pituudelle (Eerik 29.10.2026), ei numerokenttää.
          await addBotMessage('Kuinka pitkä katon harja on? Arvio riittää.');
          setStepUI({ kind: 'select', label: 'Harjan pituus', options: HARJAN_PITUUDET.map((m) => ({ label: `${m} m`, value: String(m) })) });
          break;
        case 8:
          await addBotMessage('Vielä pari käytännön asiaa: löytyykö pihalta vettä (vesiposti) ja sähköä (tavallinen pistorasia)?');
          setStepUI({ kind: 'options', options: [
            { label: 'Kyllä löytyy', value: 'kylla' },
            { label: 'Ei löydy', value: 'ei' },
          ] });
          break;
        case 9:
          if (dataRef.current.utilities === 'ei') {
            await addBotMessage('Selvä, sovitaan käytännöt paikan päällä. Millä paikkakunnalla kohde on?');
          } else {
            await addBotMessage('Hienoa. Millä paikkakunnalla kohde on?');
          }
          setStepUI({ kind: 'city' });
          break;
        case 10:
          await addBotMessage('Kiitos! Laskin raksuttaa jo. 🔢 Jätä vielä nimi ja puhelinnumero, niin näytän arvion.');
          setStepUI({ kind: 'contact' });
          break;
        default:
          break;
      }
    }
  }, [addBotMessage]);

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleImageOption = useCallback(async (option: ImageOption) => {
    addUserMessage(option.label, option.imageBase);
    const p = option.value as ServicePath;
    setPath(p);
    dataRef.current.service = option.value;
    setStepUI(null);
    setCurrentStep(2);
    await advanceFlow(2, p);
  }, [addUserMessage, advanceFlow]);

  const handleOption = useCallback(async (label: string, value: string) => {
    addUserMessage(label);
    const step = currentStep;
    const currentPath = path;

    if (currentPath === 'maalaus') {
      if (step === 3) dataRef.current.stories = value;
      if (step === 4) dataRef.current.peeling = value;
      if (step === 5) dataRef.current.utilities = value;
    } else {
      if (step === 3) dataRef.current.brokenTiles = value;
      if (step === 4) dataRef.current.underlayment = value;
      if (step === 5) dataRef.current.slope = value;
      if (step === 6) dataRef.current.ridgeSeal = value;
      if (step === 8) dataRef.current.utilities = value;
    }

    setStepUI(null);
    // Harjan pituus kysytään vain, jos harjatiiviste puuttuu.
    const nextStep = currentPath === 'pinnoitus' && step === 6 && value !== 'kylla' ? 8 : step + 1;
    setCurrentStep(nextStep);
    await advanceFlow(nextStep, currentPath);
  }, [addUserMessage, currentStep, path, advanceFlow]);

  const handleNumberSubmit = useCallback(async () => {
    const val = numberInput.trim();
    if (!val || isNaN(Number(val)) || Number(val) <= 0) return;
    if (Number(val) < MIN_M2 || Number(val) > MAX_M2) {
      addUserMessage(`${val} m²`);
      setNumberInput('');
      const ui = stepUI;
      setStepUI(null);
      await addBotMessage(`Hmm, tarkista vielä luku 🙂 Anna pinta-ala neliöinä väliltä ${MIN_M2}–${MAX_M2}, esimerkiksi 200.`);
      setStepUI(ui);
      return;
    }
    addUserMessage(`${val} m²`);
    dataRef.current.squareMeters = val;
    setNumberInput('');
    setStepUI(null);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    await advanceFlow(nextStep, path);
  }, [numberInput, addUserMessage, addBotMessage, stepUI, currentStep, path, advanceFlow]);

  const handleSelectSubmit = useCallback(async (value: string, label: string) => {
    if (!value) return;
    addUserMessage(label);
    dataRef.current.ridgeMeters = value;
    setStepUI(null);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    await advanceFlow(nextStep, path);
  }, [addUserMessage, currentStep, path, advanceFlow]);

  const handleTextSubmit = useCallback(async () => {
    const val = textInput.trim();
    if (!val) return;
    addUserMessage(val);
    dataRef.current.city = val;
    setTextInput('');
    setStepUI(null);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    await advanceFlow(nextStep, path);
  }, [textInput, addUserMessage, currentStep, path, advanceFlow]);

  const handleCitySubmit = useCallback(async (cityValue: string) => {
    if (!cityValue) return;
    addUserMessage(cityValue);
    dataRef.current.city = cityValue;
    setStepUI(null);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    await advanceFlow(nextStep, path);
  }, [addUserMessage, currentStep, path, advanceFlow]);


  const handleContactSubmit = useCallback(async () => {
    if (!contactName.trim() || !contactPhone.trim()) {
      toast({ title: 'Täytä tiedot', description: 'Nimi ja puhelinnumero tarvitaan, jotta voimme näyttää arvion.', variant: 'destructive' });
      return;
    }

    // Strict phone validation with a 2s "checking" delay on failure.
    if (!isValidFinnishMobile(contactPhone)) {
      setPhoneError(false);
      setIsCheckingPhone(true);
      if (phoneCheckTimer.current) clearTimeout(phoneCheckTimer.current);
      phoneCheckTimer.current = setTimeout(() => {
        setIsCheckingPhone(false);
        setPhoneError(true);
      }, 2000);
      return;
    }

    setPhoneError(false);
    const internationalPhone = formatToInternational(contactPhone);

    addUserMessage(`${contactName}, ${internationalPhone}`);
    setStepUI(null);
    setIsSubmitting(true);

    const d = dataRef.current;
    let priceStr = '';
    let afterStr = '';
    let details = '';
    let harjaHinta = 0;
    // Sama rivi kuin /hintalaskuri-sivulla: hinta kotitalousvähennyksen jälkeen (Eerik 26.10.2026, yöajon kysymys 20).
    const withAfter = (p: { min: number; max: number }) => {
      priceStr = formatPriceRange(p);
      afterStr = formatPriceRange({ min: hintaVahennyksenJalkeen(p.min), max: hintaVahennyksenJalkeen(p.max) });
    };

    if (path === 'maalaus') {
      withAfter(calculateWallPrice(Number(d.squareMeters), d.stories, d.peeling));
      const storyLabels: Record<string, string> = { '1': '1 kerros', '1.5': '1,5 kerrosta', '2': '2 kerrosta' };
      const peelingLabels: Record<string, string> = { none: 'Ei hilseilyä', '1-2': '1–2 seinällä', '3+': 'Yli 3 seinällä' };
      details = `Pohjaneliöt: ${d.squareMeters} m², Kerrokset: ${storyLabels[d.stories] || d.stories}, Hilseily: ${peelingLabels[d.peeling] || d.peeling}, Vesi/sähkö: ${d.utilities === 'kylla' ? 'Kyllä löytyy' : 'Ei löydy'}, Kaupunki: ${d.city || '-'}`;
    } else {
      const base = calculateRoofPrice(Number(d.squareMeters), d.slope);
      harjaHinta = d.ridgeSeal === 'kylla' && Number(d.ridgeMeters) > 0 ? calculateRidgeSealPrice(Number(d.ridgeMeters)) : 0;
      withAfter({ min: base.min + harjaHinta, max: base.max + harjaHinta });
      const brokenLabels: Record<string, string> = { ei: 'Ei rikkinäisiä', '1-5': '1–5 rikkinäistä', '5-20': '5–20 rikkinäistä' };
      const slopeLabels: Record<string, string> = { loiva: 'Loiva', normaali: 'Normaali', jyrkka: 'Todella jyrkkä' };
      const harjaLabels: Record<string, string> = { kylla: 'Kyllä puuttuu', ei: 'Ei puutu' };
      const harjaTeksti = `Harjatiiviste: ${harjaLabels[d.ridgeSeal] || d.ridgeSeal || '-'}${d.ridgeSeal === 'kylla' ? `, Harjan pituus: ${d.ridgeMeters || '-'} m` : ''}`;
      details = `Katon koko: ${d.squareMeters} m², Rikkinäiset tiilet: ${brokenLabels[d.brokenTiles] || d.brokenTiles}, Aluskate: ${d.underlayment === 'kylla' ? 'Löytyy' : 'Epävarma'}, Jyrkkyys: ${slopeLabels[d.slope] || d.slope}, ${harjaTeksti}, Vesi/sähkö: ${d.utilities === 'kylla' ? 'Kyllä löytyy' : 'Ei löydy'}, Kaupunki: ${d.city || '-'}`;
    }

    try {
      await submitContactForm({
        name: contactName,
        phone: internationalPhone,
        website,
        service: path === 'maalaus' ? 'ulkomaalaus' : 'tiilikatto',
        city: d.city || undefined,
        message: `Chat-hintalaskuri (etusivu): ${details}`,
        priceEstimate: priceStr,
        calculatorDetails: details,
      },
        "etusivun chat-laskuri"
      );

      const firstName = contactName.trim().split(/\s+/)[0];
      const tyo = path === 'maalaus' ? 'maalaukselle' : 'pinnoitukselle';
      await addBotMessage(
        `Kiitos ${firstName}! 🎉 Alustava hinta-arvio ${tyo} on ${priceStr}. Soitamme sinulle viimeistään seuraavana arkipäivänä. Tarkan hinnan saat, kun olemme käyneet paikalla.`,
      );
      if (harjaHinta > 0) await addBotMessage(`Hinta sisältää harjatiivisteen: ${harjaHinta.toLocaleString('fi-FI')} €. Ilman pinnoitusta harjatiivisteen asennus maksaisi ${calculateRidgeSealPrice(Number(d.ridgeMeters), true).toLocaleString('fi-FI')} €.`);
      await addBotMessage(`Kotitalousvähennyksen jälkeen: ${afterStr}. ${VAHENNYS_OMAVASTUU_HUOMAUTUS}`);
    } catch (err) {
      // Lomake ei väitä onnistuneensa: virhe kerrotaan chatissa ja yhteystietokentät jäävät näkyviin.
      await addBotMessage(`Hups, lähetys ei onnistunut (${formErrorMessage(err)}). Kokeile uudelleen tai soita meille: ${YHTEYSTIEDOT.eerik.phone}.`);
      setStepUI({ kind: 'contact' });
    } finally {
      setIsSubmitting(false);
    }
  }, [contactName, contactPhone, website, path, addBotMessage, toast, addUserMessage]);

  // Auto-start on scroll into view
  useEffect(() => {
    if (!sectionRef.current || hasAutoStarted.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      hasAutoStarted.current = true;
      startChat();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoStarted.current) {
          hasAutoStarted.current = true;
          startChat();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [startChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  return (
    <section id="hintalaskuri" ref={sectionRef} aria-labelledby={headingId} className="section-padding osio scroll-mt-24">
      <style>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
      <div className="section-container">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2 id={headingId} className="heading-style text-3xl md:text-4xl text-accent-ink mb-3">
              Hintalaskuri
            </h2>
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
              Laske hinta-arvio katon pinnoitukselle tai talon maalaukselle. Vie noin minuutin.
            </p>
          </div>

          {/* Chat container */}
          <div className="bg-card rounded-2xl shadow-lg border border-border/40 overflow-hidden">
            {/* Chat header bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30 bg-white/80">
              <div className="relative">
                <img src={eerikImage} alt="Eerik Pitkänen" className="w-10 h-10 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Eerik Pitkänen</p>
                <p className="text-xs text-muted-foreground">Pintanen Oy</p>
              </div>
            </div>

            {/* Messages area */}
            <div
              ref={scrollRef}
              className="px-4 py-4 min-h-[280px] max-h-[480px] overflow-y-auto bg-accent-light"
            >
              <AnimatePresence>
                {messages.map(msg =>
                  msg.from === 'bot' ? (
                    <BotBubble key={msg.id} text={msg.text} />
                  ) : (
                    <UserBubble key={msg.id} text={msg.text} imageBase={msg.imageBase} />
                  )
                )}
              </AnimatePresence>
              {isTyping && <TypingIndicator />}

              {/* Inline bubble-style options */}
              {!isTyping && stepUI && (stepUI.kind === 'image-options' || stepUI.kind === 'options') && (
                <m.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end mb-3"
                >
                  {stepUI.kind === 'image-options' && (
                    <div className="grid grid-cols-2 gap-2.5 max-w-[70%]">
                      {stepUI.options.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => handleImageOption(opt)}
                          className="group flex flex-col rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all border border-white/80"
                        >
                          <div className="aspect-[16/9] overflow-hidden max-h-24">
                            <img
                              loading="lazy"
                              src={getResponsiveSrc(opt.imageBase)}
                              srcSet={getResponsiveSrcSet(opt.imageBase)}
                              alt={opt.label}
                              sizes="(max-width: 768px) 40vw, 240px"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <span className="py-2 px-3 text-sm font-semibold text-foreground text-center">
                            {opt.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {stepUI.kind === 'options' && (
                    <div className="flex flex-wrap gap-2 justify-end">
                      {stepUI.options.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => handleOption(opt.label, opt.value)}
                          className="px-4 py-2.5 rounded-2xl bg-white text-sm font-medium text-foreground shadow-sm hover:shadow-md transition-all"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </m.div>
              )}
            </div>

            {/* Input area — only for text/number/contact inputs */}
            {chatStarted && stepUI && !isTyping && (stepUI.kind === 'number' || stepUI.kind === 'select' || stepUI.kind === 'text' || stepUI.kind === 'city' || stepUI.kind === 'contact') && (
              <div className="px-4 py-3 border-t border-border/30 bg-white/80">

                {stepUI.kind === 'select' && (
                  <form
                    onSubmit={e => { e.preventDefault(); const sel = (e.currentTarget.elements.namedItem('harjan-pituus-chat') as HTMLSelectElement); handleSelectSubmit(sel.value, sel.selectedOptions[0]?.text ?? sel.value); }}
                    className="flex gap-2"
                  >
                    <select
                      name="harjan-pituus-chat"
                      aria-label={stepUI.label}
                      defaultValue=""
                      required
                      className="flex-1 px-4 py-2.5 rounded-xl border border-border/60 bg-white text-base focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="" disabled>Valitse pituus</option>
                      {stepUI.options.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <button type="submit" className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Jatka</button>
                  </form>
                )}

                {stepUI.kind === 'number' && (
                  <form
                    onSubmit={e => { e.preventDefault(); handleNumberSubmit(); }}
                    className="flex gap-2"
                  >
                    <div className="relative flex-1">
                      <input
                        type="number"
                        inputMode="numeric"
                        min="1"
                        value={numberInput}
                        onChange={e => setNumberInput(e.target.value)}
                        placeholder={stepUI.placeholder} aria-label={stepUI.placeholder}
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-white text-base focus:outline-none focus:border-primary transition-colors"
                        autoFocus
                      />
                      {stepUI.suffix && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          {stepUI.suffix}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      aria-label="Lähetä"
                      disabled={!numberInput.trim()}
                      className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl disabled:opacity-40 hover:bg-primary/90 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {stepUI.kind === 'text' && (
                  <form
                    onSubmit={e => { e.preventDefault(); handleTextSubmit(); }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={textInput}
                      onChange={e => setTextInput(e.target.value)}
                      placeholder={stepUI.placeholder} aria-label={stepUI.placeholder}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-border/60 bg-white text-base focus:outline-none focus:border-primary transition-colors"
                      autoFocus
                    />
                    <button
                      type="submit"
                      aria-label="Lähetä"
                      disabled={!textInput.trim()}
                      className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl disabled:opacity-40 hover:bg-primary/90 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {stepUI.kind === 'city' && (
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <CityCombobox
                        value={cityInput}
                        onChange={(v) => {
                          setCityInput(v);
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      aria-label="Lähetä"
                      onClick={() => {
                        if (cityInput.trim()) {
                          handleCitySubmit(cityInput.trim());
                          setCityInput('');
                        }
                      }}
                      disabled={!cityInput.trim()}
                      className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl disabled:opacity-40 hover:bg-primary/90 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {stepUI.kind === 'contact' && (
                  <div className="relative space-y-2">
                    <HoneypotField value={website} onChange={setWebsite} />
                    <input
                      type="text"
                      value={contactName}
                      onChange={e => setContactName(e.target.value)}
                      placeholder="Nimi *" aria-label="Nimi"
                      className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-white text-base focus:outline-none focus:border-primary transition-colors"
                      autoFocus
                    />
                    <PhoneInput
                      value={contactPhone}
                      onChange={(v) => {
                        setContactPhone(v);
                        if (phoneError) setPhoneError(false);
                      }}
                      disabled={isCheckingPhone || isSubmitting}
                      hasError={phoneError}
                      errorMessage={PHONE_ERROR_MESSAGE}
                    />
                    <button
                      onClick={handleContactSubmit}
                      disabled={isSubmitting || isCheckingPhone || !contactName.trim() || !contactPhone.trim()}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-xl disabled:opacity-40 hover:bg-primary/90 transition-colors text-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Lasketaan…
                        </>
                      ) : isCheckingPhone ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {PHONE_CHECKING_LABEL}
                        </>
                      ) : (
                        <>
                          Lähetä ja näytä hinta-arvio
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <FormPrivacyNote />
                  </div>
                )}
              </div>
            )}
          </div>
        </m.div>
      </div>
    </section>
  );
};

export default ChatPriceCalculator;
