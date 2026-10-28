import { m } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import BeforeAfterSlider from "./BeforeAfterSlider";

interface CityServicesProps {
  cityName: string;
  citySlug: string;
  cityGenitive: string;
}

/** Paikkakunnan palvelut: pinnoitus ja maalaus. Katon puhdistus on loppunut, joten sitä ei mainosteta (12.10.2026). */
const CityServices = ({ citySlug, cityGenitive }: CityServicesProps) => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Tiilikaton pinnoitus",
      href: `/tiilikaton-pinnoitus-${citySlug}/`,
      beforeBase: "tiilikaton-pinnoitus-haalistunut-punainen-tiilikatto-ennen",
      afterBase: "tiilikaton-pinnoitus-kirkkaan-punainen-tiilikatto-jalkeen",
      description: "Pesemme katon, vaihdamme rikkinäiset tiilet uusiin ja maalaamme katon ruiskulla kahteen kertaan. Pinnoitettu katto kestää jopa 15 vuotta pidempään.",
      features: ["Pesu painepesulla", "Rikkinäiset tiilet uusiin", "Pohjamaali ja pintamaali ruiskulla"],
      warranty: "5 v takuu",
    },
    {
      title: "Ulkomaalaus",
      href: `/talon-maalaus-${citySlug}/`,
      beforeBase: "talon-maalaus-keltainen-puutalo-varinvaihto-ennen",
      afterBase: "talon-maalaus-violetti-puutalo-varinvaihto-peittomaalaus-jalkeen",
      description: "Homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä.",
      features: ["Homepesu ja kaavinta", "Pintamaali pensselillä", "2 v takuu"],
      warranty: "2 v takuu",
    },
  ];

  return (
    <section className="section-padding osio">
      <div className="section-container">
        <m.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">Palvelut {cityGenitive} alueella</h2>
          <p className="text-muted-foreground text-lg">Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Arviokäynti on ilmainen.</p>
        </m.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <m.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
              <div
                role="link"
                tabIndex={0}
                onClick={() => navigate(service.href)}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(service.href); }}
                className="kortti p-6 md:p-8 group block transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0 cursor-pointer"
              >
                <div className="mb-6">
                  <BeforeAfterSlider
                    className="rounded-2xl"
                    beforeImage={getResponsiveSrc(service.beforeBase)}
                    afterImage={getResponsiveSrc(service.afterBase)}
                    beforeSrcSet={getResponsiveSrcSet(service.beforeBase)}
                    afterSrcSet={getResponsiveSrcSet(service.afterBase)}
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 font-heading">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-foreground">
                      <Check className="w-4 h-4 text-accent-ink" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="feature-badge">{service.warranty}</span>
                  <span className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all">
                    Lue lisää
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CityServices;
