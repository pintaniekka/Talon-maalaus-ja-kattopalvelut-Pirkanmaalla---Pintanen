import { useState, useEffect, useRef, useCallback, useId } from 'react';
import AvifKuva from "@/components/AvifKuva";
import { AnimatePresence, m } from 'framer-motion';
import { Send, Loader2, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStorageUrl, getResponsiveSrc, getResponsiveSrcSet } from '@/lib/storage';
import { submitContactForm, formErrorMessage } from '@/lib/contactForm';
import FormPrivacyNote, { HoneypotField } from '@/components/FormPrivacyNote';
import KenttaVirhe from '@/components/lomake/KenttaVirhe';
import { VIESTI, nimiVirhe } from '@/lib/lomakeViestit';
import CityCombobox from '@/components/CityCombobox';
import PhoneInput from '@/components/PhoneInput';
import { YHTEYSTIEDOT } from '@/data/company';
import { calculateWallPrice, calculateRoofPrice, calculateRidgeSealPrice, formatPriceRange } from '@/lib/priceCalc';
import { vahennysTeksti } from '@/components/vahennys/vahennysData';
import {
  formatToInternational,
  laskurinPuhelinVirhe,
  PHONE_CHECK_MS,
  PHONE_CHECKING_LABEL,
} from '@/lib/phoneValidation';

/**
 * Etusivun chat-hintalaskuri (Eerik 13.10.2026: chat takaisin, "olen saanut siitä paljon kehuja").
 * Kysymykset ja kaavat ovat samat kuin /hintalaskuri-sivun laskurissa (src/lib/priceCalc.ts).
 * Liidiportti: nimi ja puhelinnumero kysytään ennen hinnan näyttämistä, ja tiedot lähtevät
 * myyntiin ja CRM:ään submitContactForm-funktion kautta. Emojit ovat chatissa sallittuja.
 *
 * Navy-väriversio ja reset-nappi (Eerik 29.10.2026). Värit: navy ja sumunharmaa tausta ovat tokeneita
 * (bg-navy, --tausta-harmaansininen); keltainen #ffd23f, haaleansininen #9fb0c7, vähennysrivin #13294d,
 * kenttien reunus #c7d1de ja kirjoituspisteet #b4bcc9 ovat tämän laskurin omia arvoja.
 * Reset: jokaisella ajolla on tunniste (runIdRef). Reset kasvattaa sitä, ja vanhan ajon viiveet (botin
 * kirjoitus, vaiheen siirto) tarkistavat tunnisteen jokaisen odotuksen jälkeen ja palaavat hiljaa, jos ajo
 * on vanhentunut. Reset ei lähetä eikä peru liidiä; uusi laskenta kysyy nimen ja numeron uudelleen.
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
  | { kind: 'text'; placeholder: string }
  | { kind: 'city' }
  | { kind: 'contact' }
  | null;


// ── Typing indicator ──────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-3">
    <img src={eerikImage} alt="Eerik" className="w-7 h-7 rounded-full object-cover shrink-0" />
    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-[0_2px_6px_rgba(11,26,51,0.1)] flex gap-1 items-center">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-2 h-2 bg-[#b4bcc9] rounded-full"
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
    <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-[0_2px_6px_rgba(11,26,51,0.1)] max-w-[85%]">
      <p className="text-sm text-navy leading-relaxed">{text}</p>
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
    <div className="bg-navy text-white rounded-2xl rounded-br-sm shadow-[0_2px_6px_rgba(11,26,51,0.15)] max-w-[85%] overflow-hidden">
      {imageBase && (
        <div className="aspect-[16/9] overflow-hidden max-h-28">
          <AvifKuva>
            <img
              loading="lazy"
              src={getResponsiveSrc(imageBase)}
              srcSet={getResponsiveSrcSet(imageBase)}
              alt={text}
              sizes="(max-width: 768px) 45vw, 250px"
              className="w-full h-full object-cover"
            />
          </AvifKuva>
        </div>
      )}
      <p className="text-sm leading-relaxed px-4 py-3">{text}</p>
    </div>
  </m.div>
);

// ── Tuloskortti ───────────────────────────────────────────────────────────
interface Tulos {
  /** "Kiitos Testi! 🎉 Hinta-arvio pinnoitukselle" */
  kiitos: string;
  /** Hintahaarukka isolla. */
  hinta: string;
  /** Harjatiivisteen euromäärä, jos se on hinnassa. */
  harja?: number;
  /** Kotitalousvähennys alennuksena: "noin −1 240 €". */
  vahennys: string;
  cta: { to: string; label: string };
}

/** Tuloskortti (Eki 31.10.2026): hinta isolla, vähennys alennuksena, harjatiiviste pelkkänä hintana, vähän tekstiä. */
const TulosKortti = ({ tulos }: { tulos: Tulos }) => (
  <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-3 overflow-hidden rounded-2xl bg-navy text-white shadow-[0_10px_24px_-8px_rgba(11,26,51,0.45)]" data-tulos>
    <div className="px-4 pb-3 pt-4">
      <p className="text-sm text-white/85">{tulos.kiitos}</p>
      <p className="mt-1 font-heading text-3xl font-extrabold leading-tight text-[#ffd23f]">{tulos.hinta}</p>
      {tulos.harja !== undefined && (
        <p className="mt-1 text-sm text-white/85">
          Sisältää harjatiivisteen <strong className="text-white">{tulos.harja.toLocaleString('fi-FI')} €</strong>
        </p>
      )}
    </div>
    <div className="flex flex-wrap items-baseline justify-between gap-x-3 bg-[#13294d] px-4 py-3">
      <span className="text-sm text-white/85">Kotitalousvähennys</span>
      <span className="font-heading text-2xl font-extrabold text-white">{tulos.vahennys}</span>
    </div>
    <div className="px-4 pb-4 pt-3">
      <p className="mb-3 text-sm text-white/85">Soitamme sinulle viimeistään seuraavana arkipäivänä.</p>
      <Link to={tulos.cta.to} className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[#ffd23f] px-5 font-heading text-sm font-extrabold text-navy transition-colors hover:bg-[#f2c62e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
        {tulos.cta.label}
      </Link>
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
  /** Yhteystieto- ja kuntakenttien virheet kentän alla (31.10.2026, ennen toast tai harmaa nappi). */
  const [virheet, setVirheet] = useState<{ nimi?: string | null; puhelin?: string | null; kunta?: string | null }>({});
  const [isCheckingPhone, setIsCheckingPhone] = useState(false);
  const phoneCheckTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [chatStarted, setChatStarted] = useState(false);
  const [tulos, setTulos] = useState<Tulos | null>(null);
  /** Ajon tunniste: reset kasvattaa, vanhan ajon viiveet tarkistavat ja palaavat hiljaa. */
  const runIdRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  // Eki 29.10.2026: kun käyttäjä on vastannut, sivu vieritetään niin, että chatin alareuna (tekstikenttä tai
  // vaihtoehdot) on juuri chat-kuplan yläpuolella. Lippu nousee vastauksesta ja laukeaa, kun botin vuoro on ohi.
  const seuraaVastausta = useRef(false);
  const hasAutoStarted = useRef(false);
  const headingId = useId();
  const kenttaId = { nimi: `${headingId}-nimi`, puhelin: `${headingId}-puhelin`, kunta: `${headingId}-kunta` };
  const fokus = (id: string) => requestAnimationFrame(() => document.getElementById(id)?.focus());

  // Collected data
  const dataRef = useRef<Record<string, string>>({});

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      const el = scrollRef.current;
      if (el && typeof el.scrollTo === 'function') el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    }, 100);
  }, []);

  const addBotMessage = useCallback((text: string): Promise<void> => {
    const run = runIdRef.current;
    return new Promise(resolve => {
      setIsTyping(true);
      scrollToBottom();
      setTimeout(() => {
        if (run !== runIdRef.current) {
          resolve();
          return;
        }
        setIsTyping(false);
        setMessages(prev => [...prev, { id: `bot-${Date.now()}-${Math.random()}`, from: 'bot', text }]);
        scrollToBottom();
        resolve();
      }, TYPING_DELAY_MS);
    });
  }, [scrollToBottom]);

  const addUserMessage = useCallback((text: string, imageBase?: string) => {
    setMessages(prev => [...prev, { id: `user-${Date.now()}`, from: 'user', text, imageBase }]);
    seuraaVastausta.current = true;
    scrollToBottom();
  }, [scrollToBottom]);

  // ── Flow definitions ──────────────────────────────────────────────────
  const startChat = useCallback(async () => {
    const run = runIdRef.current;
    setChatStarted(true);
    setStepUI(null);
    await addBotMessage('Moikka! 👋 Mietitkö, mitä katon pinnoitus tai talon maalaus maksaisi? Lasketaan se yhdessä, vie noin minuutin.');
    if (run !== runIdRef.current) return;
    await addBotMessage('Kumpaa lähdetään laskemaan?');
    if (run !== runIdRef.current) return;
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
    const run = runIdRef.current;
    const vanhentunut = () => run !== runIdRef.current;
    setStepUI(null);

    if (selectedPath === 'maalaus') {
      switch (step) {
        case 2:
          await addBotMessage('Hyvä valinta! 🏡 Kuinka monta pohjaneliötä talossa on suunnilleen? Pelkkä numero riittää.');
          if (vanhentunut()) return;
          setStepUI({ kind: 'number', placeholder: 'esim. 150', suffix: 'm²' });
          break;
        case 3:
          await addBotMessage('Selvä. Entä montako kerrosta talossa on?');
          if (vanhentunut()) return;
          setStepUI({ kind: 'options', options: [
            { label: '1 kerros', value: '1' },
            { label: '1,5 kerrosta', value: '1.5' },
            { label: '2 kerrosta', value: '2' },
          ] });
          break;
        case 4:
          await addBotMessage('Missä kunnossa nykyinen maali on? Hilseileekö tai lohkeileeko se?');
          if (vanhentunut()) return;
          setStepUI({ kind: 'options', options: [
            { label: 'Ei ollenkaan', value: 'none' },
            { label: 'Vähän (1–2 seinällä)', value: '1-2' },
            { label: 'Paljon (yli 3 seinällä)', value: '3+' },
          ] });
          break;
        case 5:
          await addBotMessage('Hyvä tietää. Vielä pari käytännön asiaa: löytyykö pihalta vettä (vesiposti) ja sähköä (tavallinen pistorasia)?');
          if (vanhentunut()) return;
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
          if (vanhentunut()) return;
          setStepUI({ kind: 'city' });
          break;
        case 7:
          await addBotMessage('Kiitos! Laskin raksuttaa jo. 🔢 Jätä vielä nimi ja puhelinnumero, niin näytän arvion ja voimme palata asiaan.');
          if (vanhentunut()) return;
          setStepUI({ kind: 'contact' });
          break;
        default:
          break;
      }
    } else if (selectedPath === 'pinnoitus') {
      switch (step) {
        case 2:
          await addBotMessage('Hyvä valinta! 🏠 Kuinka suuri katto on neliöinä? Katto on yleensä isompi kuin talon pohja, arvio riittää.');
          if (vanhentunut()) return;
          setStepUI({ kind: 'number', placeholder: 'esim. 200', suffix: 'm²' });
          break;
        case 3:
          await addBotMessage('Miltä katto näyttää? Onko siinä rikkinäisiä tiiliä?');
          if (vanhentunut()) return;
          setStepUI({ kind: 'options', options: [
            { label: 'Ei ole', value: 'ei' },
            { label: '1–5 rikkinäistä', value: '1-5' },
            { label: '5–20 rikkinäistä', value: '5-20' },
          ] });
          break;
        case 4:
          await addBotMessage('Entä onko tiilien alla ehjä aluskate?');
          if (vanhentunut()) return;
          setStepUI({ kind: 'options', options: [
            { label: 'Löytyy kyllä', value: 'kylla' },
            { label: 'En ole varma, parempi tulla tarkastamaan', value: 'epävarma' },
          ] });
          break;
        case 5:
          await addBotMessage('Vielä yksi tärkeä: kuinka jyrkkä katto on?');
          if (vanhentunut()) return;
          setStepUI({ kind: 'options', options: [
            { label: 'Loiva, melkein tasakatto', value: 'loiva' },
            { label: 'Normaali jyrkkyys, valjailla pärjää', value: 'normaali' },
            { label: 'Todella jyrkkä', value: 'jyrkka' },
          ] });
          break;
        // Eerik 29.10.2026: harjatiiviste laskuriin (15 €/m pinnoituksen yhteydessä, tulokseen vain euromäärä).
        case 6:
          await addBotMessage('Puuttuuko katolta harjatiiviste? Se on tiiviste harjatiilen alla. Jos et tiedä, vastaa ei: katsomme sen kuntotarkastuksessa.');
          if (vanhentunut()) return;
          setStepUI({ kind: 'options', options: [
            { label: 'Kyllä puuttuu', value: 'kylla' },
            { label: 'Ei puutu', value: 'ei' },
          ] });
          break;
        case 7:
          await addBotMessage('Kuinka pitkä katon harja on metreinä? Arvio riittää.');
          if (vanhentunut()) return;
          setStepUI({ kind: 'number', placeholder: 'esim. 12', suffix: 'm' });
          break;
        case 8:
          await addBotMessage('Vielä pari käytännön asiaa: löytyykö pihalta vettä (vesiposti) ja sähköä (tavallinen pistorasia)?');
          if (vanhentunut()) return;
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
          if (vanhentunut()) return;
          setStepUI({ kind: 'city' });
          break;
        case 10:
          await addBotMessage('Kiitos! Laskin raksuttaa jo. 🔢 Jätä vielä nimi ja puhelinnumero, niin näytän arvion.');
          if (vanhentunut()) return;
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
    // Harjan pituus (vaihe 7) kysytään samalla kentällä kuin neliöt, mutta metreinä 1–200.
    const harja = path === 'pinnoitus' && currentStep === 7;
    const unit = harja ? 'm' : 'm²';
    const min = harja ? 1 : MIN_M2;
    const max = harja ? 200 : MAX_M2;
    if (Number(val) < min || Number(val) > max) {
      addUserMessage(`${val} ${unit}`);
      setNumberInput('');
      const ui = stepUI;
      setStepUI(null);
      await addBotMessage(harja
        ? `Hmm, tarkista vielä luku 🙂 Anna harjan pituus metreinä väliltä ${min}–${max}, esimerkiksi 12.`
        : `Hmm, tarkista vielä luku 🙂 Anna pinta-ala neliöinä väliltä ${min}–${max}, esimerkiksi 200.`);
      setStepUI(ui);
      return;
    }
    addUserMessage(`${val} ${unit}`);
    if (harja) dataRef.current.ridgeMeters = val;
    else dataRef.current.squareMeters = val;
    setNumberInput('');
    setStepUI(null);
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    await advanceFlow(nextStep, path);
  }, [numberInput, addUserMessage, addBotMessage, stepUI, currentStep, path, advanceFlow]);

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
    if (isSubmitting || isCheckingPhone) return;
    const nimi = nimiVirhe(contactName);
    const puhelin = laskurinPuhelinVirhe(contactPhone);
    // Tyhjät kentät kerrotaan heti.
    if (nimi || !contactPhone.trim()) {
      setVirheet({ nimi, puhelin });
      fokus(nimi ? kenttaId.nimi : kenttaId.puhelin);
      return;
    }

    // Varmasti väärä numero: 2 s "tarkistus", sitten "Numero ei käytössä" (Eki 31.10.2026).
    if (puhelin) {
      setVirheet({});
      setIsCheckingPhone(true);
      if (phoneCheckTimer.current) clearTimeout(phoneCheckTimer.current);
      phoneCheckTimer.current = setTimeout(() => {
        setIsCheckingPhone(false);
        setVirheet({ puhelin });
        fokus(kenttaId.puhelin);
      }, PHONE_CHECK_MS);
      return;
    }

    setVirheet({});
    const internationalPhone = formatToInternational(contactPhone);

    const run = runIdRef.current;
    addUserMessage(`${contactName}, ${internationalPhone}`);
    setStepUI(null);
    setIsSubmitting(true);

    const d = dataRef.current;
    let priceStr = '';
    let vahennysStr = '';
    let details = '';
    let harjaHinta = 0;
    // Sama kuin /hintalaskuri-sivulla: kotitalousvähennys alennuksena hintavälin keskikohdasta (Eki 31.10.2026).
    const withAfter = (p: { min: number; max: number }) => {
      priceStr = formatPriceRange(p);
      vahennysStr = vahennysTeksti(p.min, p.max);
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

      if (run !== runIdRef.current) return;
      const firstName = contactName.trim().split(/\s+/)[0];
      const tyo = path === 'maalaus' ? 'maalaukselle' : 'pinnoitukselle';
      // Tulos näytetään navy-korttina (Eerik 29.10.2026); tekstit ovat samat kuin aiemmin botin viesteinä.
      // Botin kirjoitusviive pysyy ennallaan ennen korttia.
      await new Promise<void>(resolve => {
        setIsTyping(true);
        setTimeout(resolve, TYPING_DELAY_MS);
      });
      if (run !== runIdRef.current) return;
      setIsTyping(false);
      setTulos({
        kiitos: `Kiitos ${firstName}! 🎉 Hinta-arvio ${tyo}`,
        harja: harjaHinta > 0 ? harjaHinta : undefined,
        vahennys: vahennysStr,
        hinta: priceStr,
        cta: path === 'maalaus'
          ? { to: '/ilmainen-julkisivun-kuntoarvio/', label: 'Pyydä ilmainen arviokäynti' }
          : { to: '/ilmainen-katon-kuntotarkastus/', label: 'Pyydä ilmainen kuntotarkastus' },
      });
      scrollToBottom();
    } catch (err) {
      if (run !== runIdRef.current) return;
      // Lomake ei väitä onnistuneensa: virhe kerrotaan chatissa ja yhteystietokentät jäävät näkyviin.
      await addBotMessage(`Hups, lähetys ei onnistunut (${formErrorMessage(err)}). Kokeile uudelleen tai soita meille: ${YHTEYSTIEDOT.eerik.phone}.`);
      if (run !== runIdRef.current) return;
      setStepUI({ kind: 'contact' });
    } finally {
      if (run === runIdRef.current) setIsSubmitting(false);
    }
  }, [contactName, contactPhone, website, path, addBotMessage, addUserMessage, scrollToBottom, isSubmitting, isCheckingPhone, kenttaId.nimi, kenttaId.puhelin]);

  // Reset: tyhjentää kaiken tilan ja aloittaa alusta. Ei lähetä eikä peru liidiä. Kevyt toiminto, ei vahvistusta.
  const handleReset = useCallback(() => {
    runIdRef.current += 1;
    if (phoneCheckTimer.current) {
      clearTimeout(phoneCheckTimer.current);
      phoneCheckTimer.current = null;
    }
    setMessages([]);
    setIsTyping(false);
    setCurrentStep(0);
    setPath(null);
    setStepUI(null);
    setIsSubmitting(false);
    setNumberInput('');
    setTextInput('');
    setCityInput('');
    setContactName('');
    setContactPhone('');
    setWebsite('');
    setVirheet({});
    setIsCheckingPhone(false);
    setTulos(null);
    dataRef.current = {};
    const el = scrollRef.current;
    if (el && typeof el.scrollTo === 'function') el.scrollTo({ top: 0 });
    startChat();
  }, [startChat]);

  // Unmount: vanhat viiveet eivät enää muuta tilaa.
  useEffect(() => {
    return () => {
      runIdRef.current += 1;
      if (phoneCheckTimer.current) clearTimeout(phoneCheckTimer.current);
    };
  }, []);

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

  // Sivun vieritys vastauksen jälkeen: chatin alareuna kuplan (48–56 px + marginaalit) yläpuolelle.
  useEffect(() => {
    if (!seuraaVastausta.current || isTyping || !stepUI) return;
    seuraaVastausta.current = false;
    const timer = setTimeout(() => {
      const el = chatRef.current;
      if (!el || typeof window.scrollTo !== 'function') return;
      const KUPLAN_TILA = 96;
      const alareuna = el.getBoundingClientRect().bottom;
      const siirto = alareuna - (window.innerHeight - KUPLAN_TILA);
      if (Math.abs(siirto) < 8) return;
      window.scrollTo({ top: window.scrollY + siirto, behavior: 'smooth' });
    }, 150);
    return () => clearTimeout(timer);
  }, [isTyping, stepUI]);

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
          <div ref={chatRef} className="bg-card rounded-2xl shadow-lg border border-border/40 overflow-hidden">
            {/* Chat header bar: navy, oikeassa yläkulmassa reset (vain kun chat on alkanut) */}
            <div className="flex items-center gap-3 px-4 py-3 bg-navy text-white">
              <div className="relative">
                <img src={eerikImage} alt="Eerik Pitkänen" className="w-10 h-10 rounded-full object-cover" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-navy" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Eerik Pitkänen</p>
                <p className="text-xs text-[#9fb0c7]">Pintanen Oy</p>
              </div>
              {chatStarted && messages.length > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Aloita alusta"
                  title="Aloita alusta"
                  className="ml-auto flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd23f] lg:h-10 lg:w-10"
                >
                  <RotateCcw className="h-[18px] w-[18px]" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Messages area */}
            <div
              ref={scrollRef}
              className="px-4 py-4 min-h-[280px] max-h-[480px] overflow-y-auto bg-[hsl(var(--tausta-harmaansininen))]"
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
              {tulos && !isTyping && <TulosKortti tulos={tulos} />}

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
                          className="group flex flex-col rounded-2xl overflow-hidden bg-white shadow-[0_2px_8px_rgba(11,26,51,0.12)] ring-2 ring-transparent transition-all hover:ring-[#ffd23f] hover:shadow-md focus-visible:outline-none focus-visible:ring-[#ffd23f] active:ring-[#ffd23f]"
                        >
                          <div className="aspect-[16/9] overflow-hidden max-h-24">
                            <AvifKuva>
                              <img
                                loading="lazy"
                                src={getResponsiveSrc(opt.imageBase)}
                                srcSet={getResponsiveSrcSet(opt.imageBase)}
                                alt={opt.label}
                                sizes="(max-width: 768px) 40vw, 240px"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </AvifKuva>
                          </div>
                          <span className="py-2 px-3 text-sm font-semibold text-navy text-center">
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
                          className="px-4 py-2.5 rounded-2xl bg-white text-sm font-medium text-navy border-[1.5px] border-navy transition-colors hover:bg-[#ffd23f] hover:border-[#ffd23f] active:bg-[#ffd23f] focus-visible:outline-none focus-visible:bg-[#ffd23f] focus-visible:border-[#ffd23f]"
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
            {chatStarted && stepUI && !isTyping && (stepUI.kind === 'number' || stepUI.kind === 'text' || stepUI.kind === 'city' || stepUI.kind === 'contact') && (
              <div className="px-4 py-3 border-t border-[#c7d1de] bg-white">

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
                        className="w-full px-4 py-2.5 rounded-xl border border-[#c7d1de] bg-white text-base text-navy focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors"
                        autoFocus
                      />
                      {stepUI.suffix && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#4a5668]">
                          {stepUI.suffix}
                        </span>
                      )}
                    </div>
                    <button
                      type="submit"
                      aria-label="Lähetä"
                      disabled={!numberInput.trim()}
                      className="px-4 py-2.5 bg-[#ffd23f] text-navy rounded-xl hover:bg-[#f2c62e] disabled:bg-[#f6e9a8] disabled:text-navy/60 transition-colors"
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
                      className="flex-1 px-4 py-2.5 rounded-xl border border-[#c7d1de] bg-white text-base text-navy focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors"
                      autoFocus
                    />
                    <button
                      type="submit"
                      aria-label="Lähetä"
                      disabled={!textInput.trim()}
                      className="px-4 py-2.5 bg-[#ffd23f] text-navy rounded-xl hover:bg-[#f2c62e] disabled:bg-[#f6e9a8] disabled:text-navy/60 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {stepUI.kind === 'city' && (
                  <div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <CityCombobox
                          id={kenttaId.kunta}
                          value={cityInput}
                          onChange={(v) => {
                            setCityInput(v);
                            setVirheet({});
                          }}
                          errorId={virheet.kunta ? `${kenttaId.kunta}-virhe` : null}
                        />
                      </div>
                      <button
                        type="button"
                        aria-label="Lähetä"
                        onClick={() => {
                          if (!cityInput.trim()) {
                            setVirheet({ kunta: VIESTI.kunta });
                            fokus(kenttaId.kunta);
                            return;
                          }
                          setVirheet({});
                          handleCitySubmit(cityInput.trim());
                          setCityInput('');
                        }}
                        className="px-4 py-2.5 bg-[#ffd23f] text-navy rounded-xl hover:bg-[#f2c62e] transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                    <KenttaVirhe id={`${kenttaId.kunta}-virhe`} viesti={virheet.kunta} />
                  </div>
                )}

                {stepUI.kind === 'contact' && (
                  <div className="relative space-y-2">
                    <HoneypotField value={website} onChange={setWebsite} />
                    <div>
                      <input
                        id={kenttaId.nimi}
                        type="text"
                        value={contactName}
                        onChange={e => {
                          setContactName(e.target.value);
                          if (virheet.nimi) setVirheet(v => ({ ...v, nimi: nimiVirhe(e.target.value) }));
                        }}
                        placeholder="Nimi" aria-label="Nimi"
                        autoComplete="name"
                        aria-invalid={virheet.nimi ? true : undefined}
                        aria-describedby={virheet.nimi ? `${kenttaId.nimi}-virhe` : undefined}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#c7d1de] bg-white text-base text-navy focus:outline-none focus:border-navy focus:ring-1 focus:ring-navy transition-colors"
                        autoFocus
                      />
                      <KenttaVirhe id={`${kenttaId.nimi}-virhe`} viesti={virheet.nimi} />
                    </div>
                    <PhoneInput
                      id={kenttaId.puhelin}
                      value={contactPhone}
                      onChange={(v) => {
                        setContactPhone(v);
                        if (virheet.puhelin && !laskurinPuhelinVirhe(v)) setVirheet(e => ({ ...e, puhelin: null }));
                      }}
                      disabled={isCheckingPhone || isSubmitting}
                      error={virheet.puhelin}
                    />
                    <button
                      onClick={handleContactSubmit}
                      disabled={isSubmitting || isCheckingPhone}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#ffd23f] text-navy font-semibold rounded-xl hover:bg-[#f2c62e] disabled:bg-[#f6e9a8] disabled:text-navy/60 transition-colors text-sm"
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
