import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Droplets, Shield, Sparkles, Clock, MapPin } from "@/components/icons/BrandIcons";
import ServicePageHero from "@/components/ServicePageHero";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import CityServices from "@/components/CityServices";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import { getPuhdistusCityFAQ } from "@/data/faqData";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import { puhdistusCitySeo } from "@/data/seo";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import { getCityBySlug } from "@/data/cityData";

const puhdistusBase = "puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen";

const KattopalvelutPuhdistusCity = ({ citySlug: propSlug }: { citySlug?: string }) => {
  const { city: paramCity } = useParams<{ city: string }>();
  const city = propSlug || paramCity;
  const cityData = city ? getCityBySlug(city) : undefined;

  if (!cityData) return <Navigate to="/katon-puhdistus-pirkanmaa" replace />;

  const features = [
    { icon: Droplets, title: "Mekaaninen puhdistus", description: "Puhdistamme katon mekaanisesti ilman painepesua – painepesuri voi kuluttaa tiilen pintaa." },
    { icon: Shield, title: "Sammaleentorjunta", description: "Kattoa suojaava kasvustontorjunta-aine estää sammalen ja jäkälän uudelleen kasvun." },
    { icon: Sparkles, title: "Katon tarkastus", description: "Puhdistuksen yhteydessä vaihdamme kaikki rikkinäiset tiilet ja lisätyönä harjatiivisteen asennus." },
    { icon: Clock, title: "Nopea työ", description: "Normaalin omakotitalon katon puhdistus tapahtuu yleensä yhden päivän aikana." },
  ];

  const benefits = [
    "Pidentää katon käyttöikää",
    "Parantaa talon ulkonäköä",
    "Estää kosteusongelmia",
    "Ennaltaehkäisevä huolto",
    "Edullisempi kuin pinnoitus",
    "Ilmainen kuntotarkastus mukana",
  ];

  return (
    <div>
      <SEO
        {...puhdistusCitySeo(cityData)}
      />
      <ServiceSchema name="Tiilikaton puhdistus" area={cityData.name} description={puhdistusCitySeo(cityData).description} />
      <ServicePageHero
        title=""
        subtitle=""
        backgroundImage={getResponsiveSrc(puhdistusBase)}
        backgroundSrcSet={getResponsiveSrcSet(puhdistusBase)}
      >
        <div className="bg-black/45 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 font-heading">
            Tiilikaton puhdistus –{' '}
            <span className="text-accent-ink drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">{cityData.name}</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-3xl mx-auto">
            Ammattimainen mekaaninen puhdistus ja käsittely pidentää kattosi ikää huomattavasti
          </p>
        </div>
      </ServicePageHero>

      <section className="section-padding bg-background">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6 text-center">Tiilikaton mekaaninen puhdistus ja käsittely</h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>{cityData.puhdistusIntro}</p>
              <p>Suosittelemme <strong className="text-foreground">tiilikaton tarkastusta vuosittain</strong>. Sammal, jäkälä ja roskat kannattaa poistaa säännöllisesti, jotta katto pysyy hyvässä kunnossa mahdollisimman pitkään.</p>
              <p><strong className="text-foreground">Käytämme ammattitason välineitä.</strong> Puhdistamme katon mekaanisesti käsityövälineillä, mikä säästää tiilen pintaa.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-accent-light">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4">Mitä puhdistus sisältää?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Kattavat puhdistuspalvelut yhdellä hinnalla – ei piilokustannuksia.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="card-elevated text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <h2 className="text-3xl font-bold text-accent-ink mb-6 text-center">Puhdistuksen hyödyt</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <motion.div key={benefit} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-center gap-3 bg-card p-4 rounded-xl">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent-ink" />
                  </div>
                  <span className="text-foreground font-medium">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl p-8 text-center shadow-lg">
              <h2 className="text-2xl font-bold text-accent-ink mb-4">Hinnoittelu</h2>
              <p className="text-muted-foreground mb-6">Tiilikaton mekaanisen puhdistuksen ja käsittelyn hinta riippuu katon koosta ja sammaleen määrästä.</p>
              <div className="text-4xl font-bold text-primary mb-2">alkaen 800 €</div>
              <p className="text-accent-ink font-medium">Pyydä tarjous, niin kerromme tarkan hinnan!</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold text-accent-ink">Palvelu {cityData.cityGenitive} alueella</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">{cityData.localSection}</p>
          </motion.div>
        </div>
      </section>

      <FAQSection items={getPuhdistusCityFAQ(cityData.name, cityData.cityGenitive)} />
      <CityServices cityName={cityData.name} citySlug={city!} cityGenitive={cityData.cityGenitive} />
      <ServiceContactSection variant="katto" cityName={cityData.name} cityGenitive={cityData.cityGenitive} />
      <KotitalousVahennys />
    </div>
  );
};

export default KattopalvelutPuhdistusCity;
