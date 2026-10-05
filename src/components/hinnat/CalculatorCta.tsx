import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import type { WizardService } from "@/components/laskuri/PriceWizard";

interface CalculatorCtaProps {
  service: WizardService;
  title?: string;
  imageBase?: string;
}

const defaults: Record<WizardService, { title: string; image: string; bullets: string[] }> = {
  pinnoitus: {
    title: "Laske oman kattosi hinta minuutissa",
    image: "tiilikaton-pinnoitus-tampere-tiilitalo-jalkeen",
    bullets: ["Viisi kysymystä katostasi", "Hinta-arvio heti", "Ilmainen kuntotarkastus, jos haluat"],
  },
  maalaus: {
    title: "Laske oman talosi maalauksen hinta minuutissa",
    image: "talon-maalaus-parkano-keltainen-puutalo-jalkeen",
    bullets: ["Neljä kysymystä talostasi", "Hinta-arvio heti", "Ilmainen arviokäynti, jos haluat"],
  },
};

/** Nosto hintalaskurisivulle. Korvaa sivuille upotetut laskurit. */
const CalculatorCta = ({ service, title, imageBase }: CalculatorCtaProps) => {
  const d = defaults[service];
  return (
    <section id="hintalaskuri" className="section-padding bg-accent-light scroll-mt-24">
      <div className="section-container">
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-xl min-h-[360px] flex items-center">
          <ResponsiveImage baseName={imageBase ?? d.image} alt="" className="absolute inset-0 w-full h-full object-cover" sizes="(max-width: 1024px) 100vw, 1000px" width={1200} height={900} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
          <div className="relative z-[1] p-8 md:p-12 max-w-xl text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">{title ?? d.title}</h2>
            <ul className="space-y-2 mb-8">
              {d.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-primary-foreground/90">
                  <span className="w-6 h-6 rounded-full bg-accent/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent-ink" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <Link to={`/hintalaskuri/?palvelu=${service}`} className="btn-hero">
              Avaa hintalaskuri
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorCta;
