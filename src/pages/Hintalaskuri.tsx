import { useSearchParams } from "react-router-dom";
import { Star } from "lucide-react";
import SEO from "@/components/SEO";
import ServiceContactSection from "@/components/ServiceContactSection";
import PriceWizard, { type WizardService } from "@/components/laskuri/PriceWizard";
import { staticSeo } from "@/data/seo";
import { roofTestimonials, wallTestimonials } from "@/data/testimonialsData";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

/* Valmiiksi sumennettu taustakuva (Nokian tummanharmaa katto): CSS-blur raskaalla kuvalla nykii selatessa. */
const bgBase = "hintalaskuri-tausta";
const bgSrc = getResponsiveSrc(bgBase);
const bgSrcSet = getResponsiveSrcSet(bgBase);

const testimonials = [roofTestimonials[0], wallTestimonials[0]].filter(Boolean);

const toService = (value: string | null): WizardService | null =>
  value === "pinnoitus" || value === "maalaus" ? value : null;

/** /hintalaskuri: sivuston ainoa hintalaskuri etusivun chat-laskurin lisäksi. */
const Hintalaskuri = () => {
  const [params] = useSearchParams();
  const initialService = toService(params.get("palvelu"));

  return (
    <>
      <SEO {...staticSeo["/hintalaskuri"]} preloadImage={bgSrc} />

      <section className="hero-critical on-dark relative min-h-[100svh] flex items-center overflow-hidden isolate" style={{ backgroundColor: "hsl(215,30%,10%)" }}>
        <img
          src={bgSrc}
          srcSet={bgSrcSet}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(10,25,47,0.78) 0%, rgba(10,25,47,0.6) 50%, rgba(10,25,47,0.78) 100%)" }} />

        <div className="relative z-[2] section-container w-full pt-28 pb-16 md:pt-32 md:pb-20">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground mb-8">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-primary-foreground">Hintalaskuri</h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed">
              Laske tiilikaton pinnoituksen tai talon maalauksen hinta minuutissa. Arvio on suuntaa antava, ja tarkan
              hinnan saat ilmaisen arviokäynnin jälkeen.
            </p>
          </div>

          <PriceWizard initialService={initialService} />

          {testimonials.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mt-10">
              {testimonials.map((t) => (
                <figure key={t.name} className="bg-primary/70 rounded-2xl p-5 text-primary-foreground">
                  <div className="flex gap-0.5 mb-2" aria-label={`${t.stars} tähteä`}>
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-paint-yellow text-paint-yellow" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-primary-foreground/90">"{t.text}"</blockquote>
                  <figcaption className="mt-3 text-xs text-primary-foreground/70">{t.name} · Google-arvostelu</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <ServiceContactSection variant="general" />
    </>
  );
};

export default Hintalaskuri;
