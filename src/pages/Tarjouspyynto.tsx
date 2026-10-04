import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Star } from "lucide-react";
import { Phone } from "@/components/icons/BrandIcons";
import SEO from "@/components/SEO";
import QuoteWizard, { type QuoteService } from "@/components/tarjous/QuoteWizard";
import { GOOGLE_PROFILE_URL } from "@/data/company";
import { staticSeo } from "@/data/seo";
import { allTestimonials } from "@/data/testimonialsData";
import { getResponsiveSrc, getResponsiveSrcSet, getStorageUrl } from "@/lib/storage";

const bgBase = "hintalaskuri-tausta";
const bgSrc = getResponsiveSrc(bgBase);
const bgSrcSet = getResponsiveSrcSet(bgBase);

const people = {
  eerik: {
    first: "Eerik",
    name: "Eerik Pitkänen",
    role: "Kattomaalari",
    phone: "040 964 0066",
    phoneHref: "tel:+358409640066",
    image: getStorageUrl("Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp"),
  },
  eemil: {
    first: "Eemil",
    name: "Eemil Pitkänen",
    role: "Seinämaalari",
    phone: "040 164 2233",
    phoneHref: "tel:+358401642233",
    image: getStorageUrl("Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp"),
  },
};

const steps = ["Soitamme sinulle ja sovimme käynnin.", "Tulemme ilmaiselle kuntotarkastukselle.", "Saat kirjallisen tarjouksen."];

const paramToService: Record<string, QuoteService> = { pinnoitus: "tiilikatto", maalaus: "ulkomaalaus", puhdistus: "puhdistus" };

const reviews = [
  allTestimonials.find((t) => t.category === "katto"),
  allTestimonials.find((t) => t.category === "seina"),
  allTestimonials.find((t) => t.category === "yleinen"),
].filter((t): t is NonNullable<typeof t> => Boolean(t));

/** /tarjouspyynto: oma sivu tarjouspyynnölle. Näyttää valinnan mukaan, kumpi veljeksistä soittaa. */
const Tarjouspyynto = () => {
  const [params] = useSearchParams();
  const initial = useMemo(() => {
    const s = paramToService[params.get("palvelu") ?? ""];
    return s ? [s] : [];
  }, [params]);
  const [services, setServices] = useState<QuoteService[]>(initial);
  const onServicesChange = useCallback((s: QuoteService[]) => setServices(s), []);

  const roof = services.includes("tiilikatto") || services.includes("puhdistus");
  const wall = services.includes("ulkomaalaus");
  const callers = roof && !wall ? [people.eerik] : wall && !roof ? [people.eemil] : [people.eerik, people.eemil];
  const callerName = callers.length === 1 ? callers[0].first : undefined;

  return (
    <>
      <SEO {...staticSeo["/tarjouspyynto"]} preloadImage={bgSrc} />

      <section className="hero-critical on-dark relative min-h-[100svh] flex items-center overflow-hidden isolate" style={{ backgroundColor: "hsl(215,30%,10%)" }}>
        <img src={bgSrc} srcSet={bgSrcSet} sizes="100vw" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" loading="eager" decoding="async" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(10,25,47,0.78) 0%, rgba(10,25,47,0.6) 50%, rgba(10,25,47,0.78) 100%)" }} />

        <div className="relative z-[2] section-container w-full pt-28 pb-16 md:pt-32 md:pb-20">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-primary-foreground">Pyydä tarjous</h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed">
              Kerro, mitä tarvitset. Me yrittäjät soitamme sinulle itse ja tulemme ilmaiselle kuntotarkastukselle.
            </p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-6 max-w-5xl mx-auto items-start">
            <QuoteWizard initialServices={initial} onServicesChange={onServicesChange} callerName={callerName} />

            <aside className="flex flex-col gap-6">
              <div className="bg-card rounded-3xl shadow-xl border border-border/60 p-6">
                <p className="text-sm font-semibold text-muted-foreground mb-4">
                  {callers.length === 1 ? `${callers[0].first} soittaa sinulle` : "Eerik tai Eemil soittaa sinulle"}
                </p>
                <div className="flex flex-col gap-4">
                  {callers.map((p) => (
                    <div key={p.name} className="flex items-center gap-4">
                      <img src={p.image} alt={p.name} width={64} height={64} className="w-16 h-16 rounded-full object-cover bg-muted flex-shrink-0" loading="lazy" decoding="async" />
                      <div>
                        <p className="font-bold text-foreground leading-tight">{p.name}</p>
                        <p className="text-sm text-muted-foreground">{p.role}</p>
                        <a href={p.phoneHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary mt-1">
                          <Phone className="w-4 h-4" strokeWidth={2.5} />
                          {p.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-3xl shadow-xl border border-border/60 p-6">
                <p className="text-sm font-semibold text-muted-foreground mb-4">Mitä seuraavaksi tapahtuu?</p>
                <ol className="space-y-3">
                  {steps.map((s, i) => (
                    <li key={s} className="flex gap-3 text-sm text-foreground">
                      <span className="w-6 h-6 rounded-full bg-accent/20 font-bold text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>

          <div className="max-w-5xl mx-auto mt-10">
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary-foreground font-semibold mb-4 hover:underline">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-paint-yellow text-paint-yellow" />
                ))}
              </span>
              5,0 / 5 Google-arvostelut
            </a>
            <div className="grid md:grid-cols-3 gap-4">
              {reviews.map((t) => (
                <figure key={t.name} className="bg-primary/70 rounded-2xl p-5 text-primary-foreground">
                  <blockquote className="text-sm leading-relaxed text-primary-foreground/90">"{t.text}"</blockquote>
                  <figcaption className="mt-3 text-xs text-primary-foreground/70">{t.name} · Google-arvostelu</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tarjouspyynto;
