import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { getStorageUrl, getResponsiveSrc, getResponsiveSrcSet } from '@/lib/storage';
import { submitContactForm } from '@/lib/contactForm';
import FormPrivacyNote from '@/components/FormPrivacyNote';
import { useToast } from '@/hooks/use-toast';
import CityCombobox from '@/components/CityCombobox';
import PhoneInput from '@/components/PhoneInput';
import {
  isValidFinnishMobile,
  formatToInternational,
  PHONE_ERROR_MESSAGE,
  PHONE_CHECKING_LABEL,
} from '@/lib/phoneValidation';


// ── Avatar ─────────────────────────────────────────────────────────────────
const eerikImage = getStorageUrl('Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp');

import { calculateWallPrice, calculateRoofPrice } from '@/lib/priceCalc';

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
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-end gap-2 mb-3"
  >
    <img src={eerikImage} alt="Eerik" className="w-7 h-7 rounded-full object-cover shrink-0" />
    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm max-w-[85%]">
      <p className="text-sm text-foreground leading-relaxed">{text}</p>
    </div>
  </motion.div>
);

// ── User message bubble ───────────────────────────────────────────────────
const UserBubble = ({ text, imageBase }: { text: string; imageBase?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex justify-end mb-3"
  >
    <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm shadow-sm max-w-[85%] overflow-hidden">
      {imageBase && (
        <div className="aspect-[16/9] overflow-hidden max-h-28">
          <img
            src={getResponsiveSrc(imageBase)}
            srcSet={getResponsiveSrcSet(imageBase)}
            alt={text}
            sizes="(max-width: 768px) 45vw, 250px"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <p className="text-sm leading-relaxed px-4 py-3">{text}</p>
    </div>
  </motion.div>
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
  const [phoneError, setPhoneError] = useState(false);
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const phoneCheckTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [chatStarted, setChatStarted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAutoStarted = useRef(false);
  const { toast } = useToast();

  // Collected data
  const dataRef = useRef<Record<string, string>>({});

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
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
      }, 1000);
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
    await addBotMessage('Moikka! 👋 Oletko miettinyt, mitä kotisi maalaus tai katon pinnoitus voisi maksaa? Kokeile helppoa laskuriamme.');
    await addBotMessage('Aloitetaan! Kumpaa lähdetään laskemaan?');
    setStepUI({
      kind: 'image-options',
      options: [
        { label: 'Talon maalaus', value: 'maalaus', imageBase: 'moderni-tumma-puutalo-julkisivumaalaus-valmis' },
        { label: 'Tiilikaton pinnoitus', value: 'pinnoitus', imageBase: 'puhdas-tiilenpunainen-tiilikatto-suojakasittelyn-jalkeen' },
      ],
    });
    setCurrentStep(1);
  }, [addBotMessage]);

  const advanceFlow = useCallback(async (step: number, selectedPath: ServicePath) => {
    setStepUI(null);

    if (selectedPath === 'maalaus') {
      switch (step) {
        case 2:
          await addBotMessage('Hienoa! Lähdetään liikkeelle talon koosta. Kuinka monta pohjaneliötä talossasi on suunnilleen? Pelkkä numero riittää.');
          setStepUI({ kind: 'number', placeholder: 'esim. 150', suffix: 'm²' });
          break;
        case 3:
          await addBotMessage('Selvä homma. Entä kerrosten määrä?');
          setStepUI({ kind: 'options', options: [
            { label: '1 kerros', value: '1' },
            { label: '1,5 kerrosta', value: '1.5' },
            { label: '2 kerrosta', value: '2' },
          ] });
          break;
        case 4:
          await addBotMessage('Missä kunnossa nykyinen maalipinta on? Onko havaittavissa hilseilyä tai lohkeilua?');
          setStepUI({ kind: 'options', options: [
            { label: 'Ei ollenkaan', value: 'none' },
            { label: 'Vähän (1–2 seinällä)', value: '1-2' },
            { label: 'Paljon (yli 3 seinällä)', value: '3+' },
          ] });
          break;
        case 5:
          await addBotMessage('Hyvä tietää. Varmistetaan vielä pari käytännön asiaa: onhan kohteessa saatavilla vettä (vesiposti) ja sähköä (tavallinen pistorasia)?');
          setStepUI({ kind: 'options', options: [
            { label: 'Kyllä löytyy!', value: 'kylla' },
            { label: 'Ei löydy', value: 'ei' },
          ] });
          break;
        case 6:
          if (dataRef.current.utilities === 'ei') {
            await addBotMessage('Aivan, tästä täytyy keskustella tarkemmin paikan päällä. Missä päin kohde muuten sijaitsee (kaupunki)?');
          } else {
            await addBotMessage('Mahtavaa! Missä päin kohde muuten sijaitsee (kaupunki)?');
          }
          setStepUI({ kind: 'city' });
          break;
        case 7:
          await addBotMessage('Kiitos tiedoista! Laitan laskimen raksuttamaan... 🔢 Saisinko tähän väliin nimesi ja puhelinnumerosi, niin voimme palata asiaan tarkemmin?');
          setStepUI({ kind: 'contact' });
          break;
        default:
          break;
      }
    } else if (selectedPath === 'pinnoitus') {
      switch (step) {
        case 2:
          await addBotMessage('Hienoa! Lähdetään liikkeelle katon koosta. Mikä on katon arvioitu pinta-ala neliöissä? (Huom: katto on suurempi kuin talon pohja).');
          setStepUI({ kind: 'number', placeholder: 'esim. 200', suffix: 'm²' });
          break;
        case 3:
          await addBotMessage('Miltä katon yleiskunto näyttää? Onko siellä rikkinäisiä tiiliä?');
          setStepUI({ kind: 'options', options: [
            { label: 'Ei ole', value: 'ei' },
            { label: '1–5 rikkinäistä', value: '1-5' },
            { label: '5–20 rikkinäistä', value: '5-20' },
          ] });
          break;
        case 4:
          await addBotMessage('Entä löytyykö tiilien alta ehjä aluskate?');
          setStepUI({ kind: 'options', options: [
            { label: 'Löytyy kyllä', value: 'kylla' },
            { label: 'En ole varma, parempi tulla tarkastamaan', value: 'epävarma' },
          ] });
          break;
        case 5:
          await addBotMessage('Vielä yksi tärkeä kysymys: kuinka jyrkkä katto on?');
          setStepUI({ kind: 'options', options: [
            { label: 'Loiva, melkein tasakatto', value: 'loiva' },
            { label: 'Normaali jyrkkyys, valjailla pärjää', value: 'normaali' },
            { label: 'Todella jyrkkä', value: 'jyrkka' },
          ] });
          break;
        case 6:
          await addBotMessage('Varmistetaan vielä pari käytännön asiaa: onhan kohteessa saatavilla vettä (vesiposti) ja sähköä (tavallinen pistorasia)?');
          setStepUI({ kind: 'options', options: [
            { label: 'Kyllä löytyy!', value: 'kylla' },
            { label: 'Ei löydy', value: 'ei' },
          ] });
          break;
        case 7:
          if (dataRef.current.utilities === 'ei') {
            await addBotMessage('Aivan, tästä täytyy keskustella tarkemmin paikan päällä. Missä päin kohde sijaitsee?');
          } else {
            await addBotMessage('Selvä juttu! Missä päin kohde sijaitsee?');
          }
          setStepUI({ kind: 'city' });
          break;
        case 8:
          await addBotMessage('Kiitos! Laitan laskimen raksuttamaan... 🔢 Saisinko vielä nimesi ja puhelinnumerosi?');
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
      if (step === 6) dataRef.current.utilities = value;
    }

    setStepUI(null);
    const nextStep = step + 1;
    setCurrentStep(nextStep);
    await advanceFlow(nextStep, currentPath);
  }, [addUserMessage, currentStep, path, advanceFlow]);

  const handleNumberSubmit = useCallback(async () => {
    const val = numberInput.trim();
    if (!val || isNaN(Number(val)) || Number(val) <= 0) return;
    addUserMessage(`${val} m²`);
    dataRef.current.squareMeters = val;
    setNumberInput('');
    setStepUI(null);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    await advanceFlow(nextStep, path);
  }, [numberInput, addUserMessage, currentStep, path, advanceFlow]);

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
      toast({ title: 'Täytä tiedot', description: 'Nimi ja puhelinnumero ovat pakollisia.', variant: 'destructive' });
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
    let details = '';

    if (path === 'maalaus') {
      const p = calculateWallPrice(Number(d.squareMeters), d.stories, d.peeling);
      priceStr = `${p.min.toLocaleString('fi-FI')} – ${p.max.toLocaleString('fi-FI')} €`;
      const storyLabels: Record<string, string> = { '1': '1 kerros', '1.5': '1,5 kerrosta', '2': '2 kerrosta' };
      const peelingLabels: Record<string, string> = { none: 'Ei hilseilyä', '1-2': '1–2 seinällä', '3+': 'Yli 3 seinällä' };
      details = `Pohjaneliöt: ${d.squareMeters} m², Kerrokset: ${storyLabels[d.stories] || d.stories}, Hilseily: ${peelingLabels[d.peeling] || d.peeling}, Vesi/sähkö: ${d.utilities === 'kylla' ? 'Kyllä' : 'Ei'}, Kaupunki: ${d.city || '-'}`;
    } else {
      const p = calculateRoofPrice(Number(d.squareMeters), d.slope);
      priceStr = `${p.min.toLocaleString('fi-FI')} – ${p.max.toLocaleString('fi-FI')} €`;
      const brokenLabels: Record<string, string> = { ei: 'Ei rikkinäisiä', '1-5': '1–5 rikkinäistä', '5-20': '5–20 rikkinäistä' };
      const slopeLabels: Record<string, string> = { loiva: 'Loiva', normaali: 'Normaali', jyrkka: 'Todella jyrkkä' };
      details = `Katon koko: ${d.squareMeters} m², Rikkinäiset tiilet: ${brokenLabels[d.brokenTiles] || d.brokenTiles}, Aluskate: ${d.underlayment === 'kylla' ? 'Löytyy' : 'Epävarma'}, Jyrkkyys: ${slopeLabels[d.slope] || d.slope}, Vesi/sähkö: ${d.utilities === 'kylla' ? 'Kyllä' : 'Ei'}, Kaupunki: ${d.city || '-'}`;
    }

    try {
      await submitContactForm({
        name: contactName,
        phone: internationalPhone,
        service: path === 'maalaus' ? 'ulkomaalaus' : 'tiilikatto',
        city: d.city || undefined,
        message: `Chat-hintalaskuri: ${details}`,
        priceEstimate: priceStr,
        calculatorDetails: details,
      });

      const priceMsg = path === 'maalaus'
        ? `Kiitos! 🎉 Alustava hinta-arvio maalaukselle on ${priceStr}. Tämä on tosiaan suuntaa antava arvio. Tulen mielelläni paikan päälle tekemään ilmaisen ja tarkan arvion!`
        : `Kiitos! 🎉 Alustava hinta-arvio on ${priceStr}. Olemme sinuun pikaisesti yhteydessä!`;

      await addBotMessage(priceMsg);
    } catch {
      toast({ title: 'Virhe', description: 'Jokin meni pieleen. Yritä uudelleen tai soita meille.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  }, [contactName, contactPhone, path, addBotMessage, toast, addUserMessage]);

  // Auto-start on scroll into view
  useEffect(() => {
    if (!sectionRef.current || hasAutoStarted.current) return;
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
    <section ref={sectionRef} className="section-padding" style={{ backgroundColor: '#ecf7ff' }}>
      <style>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}</style>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="heading-style text-3xl md:text-4xl text-accent mb-3">
              Laske tästä hinta-arvio maalaukselle
            </h2>
            <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
              Vastaa muutamaan kysymykseen ja saat <strong className="text-foreground">alustavan hinta-arvion</strong> heti.
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
              className="px-4 py-4 min-h-[280px] max-h-[480px] overflow-y-auto"
              style={{ backgroundColor: '#ecf7ff' }}
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
                <motion.div
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
                              src={getResponsiveSrc(opt.imageBase)}
                              srcSet={getResponsiveSrcSet(opt.imageBase)}
                              alt={opt.label}
                              sizes="(max-width: 768px) 40vw, 240px"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
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
                </motion.div>
              )}
            </div>

            {/* Input area — only for text/number/contact inputs */}
            {chatStarted && stepUI && !isTyping && (stepUI.kind === 'number' || stepUI.kind === 'text' || stepUI.kind === 'city' || stepUI.kind === 'contact') && (
              <div className="px-4 py-3 border-t border-border/30 bg-white/80">

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
                  <div className="space-y-2">
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
                          Lasketaan...
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
                    <FormPrivacyNote variant="light" />
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ChatPriceCalculator;
