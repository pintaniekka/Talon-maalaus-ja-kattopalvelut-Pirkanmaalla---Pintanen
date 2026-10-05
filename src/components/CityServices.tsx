import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import BeforeAfterSlider from "./BeforeAfterSlider";
import ResponsiveImage from "./ResponsiveImage";
import { RoofCleanIcon } from "./ServiceIcons";

interface CityServicesProps {
  cityName: string;
  citySlug: string;
  cityGenitive: string;
}

const CityServices = ({ cityName, citySlug, cityGenitive }: CityServicesProps) => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Tiilikaton pinnoitus",
      href: `/tiilikaton-pinnoitus-${citySlug}/`,
      beforeBase: "haalistunut-punainen-tiilikatto-ennen-pinnoitusta",
      afterBase: "kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen",
      description: "Pesemme katon painepesulla ja maalaamme sen ruiskulla kahteen kertaan. Katto saa jopa 10–15 vuotta lisää ikää.",
      features: ["Pesu painepesulla", "Rikkinäiset tiilet uusiin", "Pohjamaali ja pintamaali ruiskulla"],
      warranty: "5 v takuu",
    },
    {
      title: "Ulkomaalaus",
      href: `/talon-maalaus-${citySlug}/`,
      beforeBase: "keltainen-puutalo-varinvaihto-ennen-maalausta",
      afterBase: "violetti-puutalo-varinvaihto-peittomaalaus-jalkeen",
      description: "Homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä.",
      features: ["Homepesu ja kaavinta", "Pintamaali pensselillä", "2 v takuu"],
      warranty: "2 v takuu",
    },
  ];

  const puhdistusBase = "puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen";

  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-heading">Palvelut {cityGenitive} alueella</h2>
          <p className="text-muted-foreground text-lg">Yrittäjät tekevät työn itse. Arviokäynti on ilmainen.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}>
              <div
                role="link"
                tabIndex={0}
                onClick={() => navigate(service.href)}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(service.href); }}
                className="card-elevated group block hover:bg-muted/50 transition-colors duration-300 cursor-pointer"
              >
                <div className="mb-6 relative">
                  <BeforeAfterSlider
                    beforeImage={getResponsiveSrc(service.beforeBase)}
                    afterImage={getResponsiveSrc(service.afterBase)}
                    beforeSrcSet={getResponsiveSrcSet(service.beforeBase)}
                    afterSrcSet={getResponsiveSrcSet(service.afterBase)}
                  />
                  <div className={`absolute inset-0 pointer-events-none rounded-xl ${index === 0 ? 'bg-gradient-to-t from-red-600/25 to-transparent' : 'bg-gradient-to-t from-yellow-500/25 to-transparent'}`} />
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
            </motion.div>
          ))}
        </div>

        {/* Roof Cleaning Banner */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8 max-w-4xl mx-auto">
          <div
            role="link"
            tabIndex={0}
            onClick={() => navigate(`/katon-puhdistus-${citySlug}/`)}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/katon-puhdistus-${citySlug}/`); }}
            className="block rounded-2xl overflow-hidden relative group cursor-pointer"
          >
            <ResponsiveImage
              baseName={puhdistusBase}
              alt="Puhdas tiilikatto mekaanisen puhdistuksen jälkeen"
              className="absolute inset-0 w-full h-full object-cover"
              sizes="(max-width: 640px) 90vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 group-hover:from-black/75 transition-all duration-300" />
            <div className="relative flex items-center gap-4 p-6 md:p-8">
              <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <RoofCleanIcon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white font-heading text-base">Tarvitseeko kattosi vain puhdistuksen?</h3>
                <p className="text-white/80 text-sm">Mekaaninen puhdistus ja kasvuston torjuntakäsittely pidentävät kattosi ikää.</p>
              </div>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CityServices;
