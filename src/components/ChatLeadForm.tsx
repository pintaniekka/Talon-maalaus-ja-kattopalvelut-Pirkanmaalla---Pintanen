import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Send, Loader2, Check, RotateCcw } from 'lucide-react';
import { getStorageUrl } from '@/lib/storage';
import { submitContactForm } from '@/lib/contactForm';
import { useToast } from '@/hooks/use-toast';
import FormPrivacyNote from '@/components/FormPrivacyNote';

const eerikImage = getStorageUrl('Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp');

// ── Types ──────────────────────────────────────────────────────────────────
type Path = 'tarjous' | 'arvio' | 'kysymys' | 'soitto' | 'maalaus_info' | 'katto_info';

interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
}

type Step =
  | { kind: 'buttons'; options: { label: string; value: string }[] }
  | { kind: 'checkboxes'; options: string[]; next: string }
  | { kind: 'contact'; fields: ('name' | 'phone' | 'email')[]; next: string }
  | { kind: 'textarea'; placeholder: string; next: string }
  | { kind: 'done' }
  | null;

// ── Typing indicator ───────────────────────────────────────────────────────
const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-3">
    <img src={eerikImage} alt="Eerik" className="w-8 h-8 rounded-full object-cover shrink-0" />
    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
      <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" style={{ animationDelay: '0ms' }} />
      <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" style={{ animationDelay: '200ms' }} />
      <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" style={{ animationDelay: '400ms' }} />
    </div>
  </div>
);

// ── Main component ─────────────────────────────────────────────────────────
const ChatLeadForm = () => {
  const { toast } = useToast();
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Hide chat while the quote drawer is open
  useEffect(() => {
    const onToggle = (e: Event) => setDrawerOpen(Boolean((e as CustomEvent<boolean>).detail));
    window.addEventListener('quote-drawer-toggle', onToggle);
    return () => window.removeEventListener('quote-drawer-toggle', onToggle);
  }, []);

  // Lead data
  const [selectedPath, setSelectedPath] = useState<Path | null>(null);
  const [arvioType, setArvioType] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [questionText, setQuestionText] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, currentStep, typing]);

  // Trigger bubble after 5s (initial) or 40s (after dismiss)
  const bubbleDelay = useRef(5000);
  const bubbleTimerRef = useRef<number | null>(null);
  useEffect(() => {
    bubbleTimerRef.current = window.setTimeout(() => { if (!open) setBubbleVisible(true); }, bubbleDelay.current);
    return () => {
      if (bubbleTimerRef.current !== null) {
        window.clearTimeout(bubbleTimerRef.current);
      }
    };
  }, [open]);

  const dismissBubble = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBubbleVisible(false);
    bubbleDelay.current = 40000;
    if (bubbleTimerRef.current !== null) {
      window.clearTimeout(bubbleTimerRef.current);
    }
    bubbleTimerRef.current = window.setTimeout(() => {
      setBubbleVisible(true);
    }, 40000);
  };

  // Helper: add bot message with typing delay
  const botSay = useCallback((text: string, thenStep: Step) => {
    setTyping(true);
    setCurrentStep(null);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text }]);
      setCurrentStep(thenStep);
    }, 1000);
  }, []);

  const initialStep: Step = {
    kind: 'buttons',
    options: [
      { label: 'Pyydä tarjous ✔️', value: 'tarjous' },
      { label: 'Varaa ilmainen arviokäynti', value: 'arvio' },
      { label: 'Minulla on kysyttävää', value: 'kysymys' },
      { label: 'Jätä soittopyyntö 📞', value: 'soitto' },
      { label: 'Milloin maalaus on ajankohtaista?', value: 'maalaus_info' },
      { label: 'Milloin kattohuolto on ajankohtainen?', value: 'katto_info' },
    ],
  };

  // Reset chat to beginning
  const handleReset = () => {
    setMessages([{ from: 'bot', text: 'Terve! 👋🏼 Oletko miettinyt talosi maalausta tai katon huoltoa?' }]);
    setCurrentStep(initialStep);
    setSelectedPath(null);
    setArvioType('');
    setSelectedServices([]);
    setContactName('');
    setContactPhone('');
    setContactEmail('');
    setQuestionText('');
    setTyping(false);
  };

  // Open chat
  const handleOpen = () => {
    setOpen(true);
    setBubbleVisible(false);
    if (messages.length === 0) {
      setMessages([{ from: 'bot', text: 'Terve! 👋🏼 Oletko miettinyt talosi maalausta tai katon huoltoa?' }]);
      setCurrentStep(initialStep);
    }
  };

  // ── Checkbox + Contact shared step builders ──
  const serviceCheckboxStep: Step = {
    kind: 'checkboxes',
    options: ['Talon maalaus', 'Tiilikaton pinnoitus', 'Katon puhdistus'],
    next: 'after_services',
  };

  const contactStep = (fields: ('name' | 'phone' | 'email')[]): Step => ({
    kind: 'contact',
    fields,
    next: 'submit',
  });

  // ── Path handlers ────────────────────────────────────────────────────────
  const handleMainChoice = (value: string) => {
    const labelMap: Record<string, string> = {
      tarjous: 'Pyydä tarjous ✔️',
      arvio: 'Varaa ilmainen arviokäynti',
      kysymys: 'Minulla on kysyttävää',
      soitto: 'Jätä soittopyyntö 📞',
      maalaus_info: 'Milloin maalaus on ajankohtaista?',
      katto_info: 'Milloin kattohuolto on ajankohtainen?',
    };
    setMessages(prev => [...prev, { from: 'user', text: labelMap[value] || value }]);
    setSelectedPath(value as Path);

    switch (value) {
      case 'tarjous':
        botSay(
          'Hienoa! Teemme mielellämme kilpailukykyisen tarjouksen. Sopisiko sinulle paremmin arviokäynti paikan päällä vai etäarvio?',
          { kind: 'buttons', options: [{ label: 'Paikan päällä', value: 'paikanpaalla' }, { label: 'Etänä', value: 'etana' }] }
        );
        break;
      case 'arvio':
        botSay(
          'Arviokäynti on loistava tapa aloittaa! ☀️ Katsotaan yhdessä paikat kuntoon ja saat samalla tarkan tarjouksen. Mitkä työt ovat mielessäsi?',
          serviceCheckboxStep
        );
        break;
      case 'kysymys':
        botSay('Autamme mielellämme! Mitä haluaisit kysyä meiltä?', {
          kind: 'textarea',
          placeholder: 'Kirjoita kysymyksesi tähän...',
          next: 'after_question',
        });
        break;
      case 'soitto':
        botSay('Totta kai! Jätä numerosi tähän, niin pirautamme sinulle mahdollisimman pian. ☎️', contactStep(['name', 'phone']));
        break;
      case 'maalaus_info':
        botSay(
          'Talon maalaus on paras tehdä ennakoiden. Kun maalipinta uusitaan ajoissa, vältytään kalliilta puuosien vaihdoilta ja talon arvo nousee välittömästi. ✨ Tehdäänkö tarkempi arvio sinun kohteellesi?',
          { kind: 'buttons', options: [{ label: 'Kyllä, varaa arviokäynti', value: 'info_to_arvio' }, { label: 'Minulle heräsi kysymys', value: 'info_to_kysymys' }] }
        );
        break;
      case 'katto_info':
        botSay(
          'Katto kannattaa huoltaa hyvissä ajoin ennen kuin sammal ja kosteus ehtivät haurastuttaa kattomateriaalia. Oikea-aikainen pesu ja pinnoitus pysäyttävät pakkasrapautumisen ja siirtävät kallista kattoremonttia kauas tulevaisuuteen. 🏠 Tehdäänkö katollesi tarkempi kuntokartoitus?',
          { kind: 'buttons', options: [{ label: 'Kyllä, varaa arviokäynti', value: 'info_to_arvio' }, { label: 'Minulle heräsi kysymys', value: 'info_to_kysymys' }] }
        );
        break;
    }
  };

  const handleSecondaryChoice = (value: string) => {
    setMessages(prev => [...prev, { from: 'user', text: value === 'paikanpaalla' ? 'Paikan päällä' : value === 'etana' ? 'Etänä' : value === 'info_to_arvio' ? 'Kyllä, varaa arviokäynti' : 'Minulle heräsi kysymys' }]);

    if (value === 'paikanpaalla' || value === 'etana') {
      setArvioType(value);
      botSay('Selvä juttu! Mitä palveluita tarjous koskisi? (Valitse kaikki sopivat)', serviceCheckboxStep);
    } else if (value === 'info_to_arvio') {
      botSay('Arviokäynti on loistava tapa aloittaa! ☀️ Mitkä työt ovat mielessäsi?', serviceCheckboxStep);
    } else if (value === 'info_to_kysymys') {
      botSay('Autamme mielellämme! Mitä haluaisit kysyä meiltä?', {
        kind: 'textarea',
        placeholder: 'Kirjoita kysymyksesi tähän...',
        next: 'after_question',
      });
    }
  };

  const handleServicesSubmit = () => {
    if (selectedServices.length === 0) return;
    setMessages(prev => [...prev, { from: 'user', text: selectedServices.join(', ') }]);
    botSay('Kiitos! Laitatko vielä yhteystietosi tähän, niin soitamme sinulle pian ja sovitaan yksityiskohdista?', contactStep(['name', 'phone']));
  };

  const handleQuestionSubmit = () => {
    if (!questionText.trim()) return;
    setMessages(prev => [...prev, { from: 'user', text: questionText.trim() }]);
    botSay('Kiitos kysymyksestä! Miten haluat meidän palaavan asiaan?', {
      kind: 'buttons',
      options: [{ label: 'Soittamalla', value: 'soittamalla' }, { label: 'Sähköpostilla', value: 'sahkopostilla' }],
    });
  };

  const handleContactMethodChoice = (value: string) => {
    setMessages(prev => [...prev, { from: 'user', text: value === 'soittamalla' ? 'Soittamalla' : 'Sähköpostilla' }]);
    if (value === 'soittamalla') {
      botSay('Selvä! Laitatko nimesi ja puhelinnumerosi?', contactStep(['name', 'phone']));
    } else {
      botSay('Selvä! Laitatko nimesi ja sähköpostisi?', contactStep(['name', 'email']));
    }
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleFinalSubmit = async () => {
    if (!contactName.trim() || (!contactPhone.trim() && !contactEmail.trim())) return;
    setIsSubmitting(true);

    const pathLabels: Record<string, string> = {
      tarjous: 'Tarjouspyyntö (chat)',
      arvio: 'Arviokäynti (chat)',
      kysymys: 'Kysymys (chat)',
      soitto: 'Soittopyyntö (chat)',
      maalaus_info: 'Maalausinfo → tarjous (chat)',
      katto_info: 'Kattoinfo → tarjous (chat)',
    };

    const details = [
      `Polku: ${pathLabels[selectedPath || ''] || selectedPath}`,
      arvioType ? `Arviotyyppi: ${arvioType === 'paikanpaalla' ? 'Paikan päällä' : 'Etänä'}` : '',
      selectedServices.length ? `Palvelut: ${selectedServices.join(', ')}` : '',
      questionText ? `Kysymys: ${questionText}` : '',
    ].filter(Boolean).join('\n');

    try {
      await submitContactForm({
        name: contactName.trim(),
        phone: contactPhone.trim() || undefined,
        email: contactEmail.trim() || undefined,
        service: selectedServices.join(', ') || 'Chat-yhteydenotto',
        message: details,
      });
      setMessages(prev => [...prev, { from: 'user', text: `${contactName}${contactPhone ? ', ' + contactPhone : ''}${contactEmail ? ', ' + contactEmail : ''}` }]);
      setCurrentStep({ kind: 'done' });
      botSay('Iso kiitos! Tiedot vastaanotettu, olemme sinuun pian yhteydessä. 🛠️', { kind: 'done' });
    } catch {
      toast({ title: 'Virhe', description: 'Lähetys epäonnistui. Yritä uudelleen.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Button click router ──────────────────────────────────────────────────
  const handleButtonClick = (value: string) => {
    if (['tarjous', 'arvio', 'kysymys', 'soitto', 'maalaus_info', 'katto_info'].includes(value)) {
      handleMainChoice(value);
    } else if (['paikanpaalla', 'etana', 'info_to_arvio', 'info_to_kysymys'].includes(value)) {
      handleSecondaryChoice(value);
    } else if (['soittamalla', 'sahkopostilla'].includes(value)) {
      handleContactMethodChoice(value);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────
  if (drawerOpen) return null;

  return (
    <>
      {/* Floating button + bubble */}
      <div className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] lg:bottom-4 right-4 z-[9998] flex flex-col items-end gap-2">
        <AnimatePresence>
          {bubbleVisible && !open && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="relative hidden lg:block"
            >
              <button
                onClick={handleOpen}
                className="bg-white text-slate-800 text-sm rounded-2xl px-4 py-2.5 pr-7 shadow-lg max-w-[220px] text-left cursor-pointer hover:shadow-xl transition-shadow"
              >
                Hei! 👋🏼 Kuinka voisin palvella tänään?
              </button>
              <button
                onClick={dismissBubble}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-slate-400 hover:bg-slate-500 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Sulje"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {!open && (
          <button
            onClick={handleOpen}
            className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full shadow-lg bg-accent-strong border border-white/60 hover:scale-105 transition-transform"
            aria-label="Avaa chat"
          >
            <img src={eerikImage} alt="Eerik – Pintanen" className="w-full h-full rounded-full object-cover" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white z-10" />
          </button>
        )}
      </div>

      {/* Chat modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] lg:bottom-4 right-4 z-[9999] w-[min(380px,calc(100vw-2rem))] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: 'min(600px, calc(100vh - 120px))' }}
          >
            {/* Header */}
            <div className="bg-accent-strong text-accent-foreground px-4 py-3 flex items-center gap-3">
              <div className="relative shrink-0">
                <img src={eerikImage} alt="Eerik" className="w-10 h-10 rounded-full object-cover border-2 border-white/40" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-accent-strong" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm leading-tight">Eerik – Pintanen Oy</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={handleReset} className="p-1 rounded-full hover:bg-white/20 transition-colors" aria-label="Aloita alusta" title="Aloita alusta">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button onClick={() => setOpen(false)} className="p-1 rounded-full hover:bg-white/20 transition-colors" aria-label="Sulje">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto bg-[#ecf7ff] px-3 py-4 space-y-1" style={{ minHeight: 200 }}>
              {messages.map((msg, i) =>
                msg.from === 'bot' ? (
                  <div key={i} className="flex items-end gap-2 mb-3">
                    <img src={eerikImage} alt="Eerik" className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div className="bg-white text-slate-800 text-[13px] leading-relaxed rounded-2xl rounded-tl-sm px-3.5 py-2.5 shadow-sm max-w-[85%]">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-end mb-3">
                    <div className="bg-accent-strong text-accent-foreground text-[13px] leading-relaxed rounded-2xl rounded-tr-sm px-3.5 py-2.5 shadow-sm max-w-[85%]">
                      {msg.text}
                    </div>
                  </div>
                )
              )}

              {typing && <TypingIndicator />}

              {/* Interactive step UI */}
              {!typing && currentStep && currentStep.kind !== 'done' && (
                <div className="mt-2">
                  {currentStep.kind === 'buttons' && (
                    <div className="flex flex-wrap gap-2 pl-10">
                      {currentStep.options.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => handleButtonClick(opt.value)}
                          className="bg-accent-strong text-accent-foreground text-[13px] font-medium rounded-2xl px-4 py-2 shadow-md hover:opacity-90 transition-all active:scale-95"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {currentStep.kind === 'checkboxes' && (
                    <div className="pl-10 space-y-2">
                      {currentStep.options.map(opt => (
                        <label key={opt} className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                          <input
                            type="checkbox"
                            checked={selectedServices.includes(opt)}
                            onChange={() => setSelectedServices(prev => prev.includes(opt) ? prev.filter(s => s !== opt) : [...prev, opt])}
                            className="w-4 h-4 accent-[#38b6ff] rounded"
                          />
                          <span className="text-slate-800 text-[13px]">{opt}</span>
                        </label>
                      ))}
                      <button
                        onClick={handleServicesSubmit}
                        disabled={selectedServices.length === 0}
                        className="bg-accent-strong text-accent-foreground text-[13px] font-medium rounded-2xl px-5 py-2 shadow-md hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                      >
                        Jatka
                      </button>
                    </div>
                  )}

                  {currentStep.kind === 'textarea' && (
                    <div className="pl-10 space-y-2">
                      <textarea
                        value={questionText}
                        onChange={e => setQuestionText(e.target.value)}
                        placeholder={currentStep.placeholder} aria-label={currentStep.placeholder}
                        className="w-full rounded-xl border-0 bg-white text-slate-800 text-[13px] px-3 py-2.5 shadow-sm resize-none focus:ring-2 focus:ring-[#38b6ff] outline-none"
                        rows={3}
                      />
                      <button
                        onClick={handleQuestionSubmit}
                        disabled={!questionText.trim()}
                        className="bg-accent-strong text-accent-foreground text-[13px] font-medium rounded-2xl px-5 py-2 shadow-md hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Jatka
                      </button>
                    </div>
                  )}

                  {currentStep.kind === 'contact' && (
                    <div className="pl-10 space-y-2">
                      {currentStep.fields.includes('name') && (
                        <input
                          type="text"
                          value={contactName}
                          onChange={e => setContactName(e.target.value)}
                          placeholder="Nimi" aria-label="Nimi"
                          className="w-full rounded-xl border-0 bg-white text-slate-800 text-[13px] px-3 py-2.5 shadow-sm focus:ring-2 focus:ring-[#38b6ff] outline-none"
                        />
                      )}
                      {currentStep.fields.includes('phone') && (
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={e => setContactPhone(e.target.value)}
                          placeholder="Puhelinnumero" aria-label="Puhelinnumero"
                          className="w-full rounded-xl border-0 bg-white text-slate-800 text-[13px] px-3 py-2.5 shadow-sm focus:ring-2 focus:ring-[#38b6ff] outline-none"
                        />
                      )}
                      {currentStep.fields.includes('email') && (
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={e => setContactEmail(e.target.value)}
                          placeholder="Sähköposti" aria-label="Sähköposti"
                          className="w-full rounded-xl border-0 bg-white text-slate-800 text-[13px] px-3 py-2.5 shadow-sm focus:ring-2 focus:ring-[#38b6ff] outline-none"
                        />
                      )}
                      <button
                        onClick={handleFinalSubmit}
                        disabled={isSubmitting || !contactName.trim() || (!contactPhone.trim() && !contactEmail.trim())}
                        className="bg-accent-strong text-accent-foreground text-[13px] font-medium rounded-2xl px-5 py-2 shadow-md hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Lähetä
                      </button>
                      <FormPrivacyNote variant="light" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatLeadForm;
