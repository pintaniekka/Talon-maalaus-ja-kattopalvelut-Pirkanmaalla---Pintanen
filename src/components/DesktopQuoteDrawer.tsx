import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { UserRound, Phone, MapPin, Mail, Building, MessageSquare } from "@/components/icons/BrandIcons";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/contactForm";
import FormPrivacyNote, { HoneypotField } from "@/components/FormPrivacyNote";

// Global open trigger – allows any component to open the drawer
let globalOpenFn: (() => void) | null = null;
export const openQuoteDrawer = () => globalOpenFn?.();

const DesktopQuoteDrawer = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();

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
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOpen = useCallback(() => {
    setOpen(true);
    setIsSubmitted(false);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);

  // Register the global opener
  useEffect(() => {
    globalOpenFn = handleOpen;
    return () => { globalOpenFn = null; };
  }, [handleOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    setTimeout(() => closeRef.current?.focus(), 100);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  // Notify other floating UI (chat) when drawer opens/closes
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("quote-drawer-toggle", { detail: open }));
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Täytä vähintään nimi ja puhelinnumero", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await submitContactForm({
        name: form.name,
        email: "",
        phone: form.phone,
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
      toast({ title: "Kiitos! Olemme sinuun yhteydessä pian." });
    } catch {
      toast({ title: "Jokin meni pieleen. Yritä uudelleen.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full rounded-lg border border-border bg-white px-3 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition";

  const fields: {
    name: keyof typeof form;
    placeholder: string;
    icon: React.ReactNode;
    type?: string;
  }[] = [
    { name: "name", placeholder: "Nimi", icon: <UserRound className="w-4 h-4" /> },
    { name: "phone", placeholder: "Puhelinnumero", icon: <Phone className="w-4 h-4" />, type: "tel" },
    { name: "address", placeholder: "Osoite", icon: <MapPin className="w-4 h-4" /> },
    { name: "postalCode", placeholder: "Postinumero", icon: <Mail className="w-4 h-4" /> },
    { name: "city", placeholder: "Kaupunki", icon: <Building className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Fixed right-edge CTA tab — desktop only */}
      <button
        onClick={handleOpen}
        aria-label="Tilaa maksuton arviokäynti"
        className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-[60] items-center justify-center cursor-pointer group"
        style={{ writingMode: "vertical-rl" }}
      >
        <span
          className="flex items-center gap-2 px-3 py-6 rounded-l-xl text-accent-foreground font-semibold text-sm tracking-wide shadow-md transition-all duration-200 group-hover:px-4 group-hover:shadow-lg"
          style={{ backgroundColor: "hsl(var(--accent-strong))" }}
        >
          Tilaa maksuton arviokäynti
        </span>
      </button>

      {/* Overlay + Modal – works on all screen sizes */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[70] bg-black/30"
              onClick={handleClose}
              aria-hidden="true"
            />

            {/* Desktop: right drawer / Mobile: bottom sheet */}
            <motion.div
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
                lg:top-0 lg:bottom-0 lg:left-auto lg:right-0 lg:w-[380px] lg:max-w-[90vw] lg:max-h-none lg:rounded-t-none"
              style={{ backgroundColor: "#f2e8d8" }}
            >
              {/* Header */}
              <div className="flex items-start justify-between px-5 pt-5 pb-2 lg:px-6 lg:pt-6">
                <div className="flex-1 pr-4">
                  <h2 className="text-lg font-bold text-foreground leading-snug">
                    Pyydä meidät maksuttomalle arviokäynnille!
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Jätä tähän yhteystietosi, niin palaamme asiaan
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
              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 lg:px-6">
                {fields.map((f) => (
                  <div key={f.name} className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {f.icon}
                    </span>
                    <input
                      name={f.name}
                      type={f.type || "text"}
                      placeholder={f.placeholder}
                      aria-label={f.placeholder}
                      value={form[f.name]}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                ))}

                {/* Textarea */}
                <div className="relative">
                  <span className="absolute left-3 top-3 text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                  </span>
                  <textarea
                    name="message"
                    placeholder="Viestisi"
                    aria-label="Viestisi"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full rounded-lg border border-border bg-white px-3 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 transition resize-none"
                  />
                </div>

                <HoneypotField value={form.website} onChange={(v) => setForm((prev) => ({ ...prev, website: v }))} />
                <FormPrivacyNote />

                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="mt-2 mb-4 w-full rounded-xl py-3 font-semibold text-accent-foreground text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 disabled:opacity-60"
                  style={{ backgroundColor: "hsl(var(--accent-strong))" }}
                >
                  {isSubmitted ? "Lähetetty ✓" : isSubmitting ? "Lähetetään..." : "Lähetä"}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default DesktopQuoteDrawer;
