import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Droplets, Shield, Sparkles, Clock } from "@/components/icons/BrandIcons";
import { Link } from "react-router-dom";
import ServicePageHero from "@/components/ServicePageHero";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import FAQSection from "@/components/FAQSection";
import { puhdistusFAQ } from "@/data/faqData";
import SEO from "@/components/SEO";
import RelatedArticles from "@/components/RelatedArticles";
import ServiceSchema from "@/components/ServiceSchema";
import { staticSeo } from "@/data/seo";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

const puhdistusBase = "puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen";

const KattopalvelutPuhdistus = () => {
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
        {...staticSeo["/katon-puhdistus-pirkanmaa"]} />
      <ServiceSchema name="Tiilikaton puhdistus" area="Pirkanmaa" areaType="AdministrativeArea" description={staticSeo["/katon-puhdistus-pirkanmaa"].description} />
      <ServicePageHero
        title=""
        subtitle=""
        backgroundImage={getResponsiveSrc(puhdistusBase)}
        backgroundSrcSet={getResponsiveSrcSet(puhdistusBase)}
      >
        <div className="bg-black/45 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 font-heading">
            Tiilikaton puhdistus{' '}
            <span className="text-accent-ink drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">Pirkanmaa</span>
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
              <p>Suosittelemme <strong className="text-foreground">tiilikaton tarkastusta vuosittain</strong>. Sammal, jäkälä ja roskat kannattaa poistaa säännöllisesti, jotta katto pysyy hyvässä kunnossa mahdollisimman pitkään.</p>
              <p><strong className="text-foreground">Käytämme ammattitason välineitä.</strong> Katon puhdistuksessa menetelmän valinta on erittäin tärkeää. Väärät menetelmät voivat vahingoittaa katon pintaa ja lyhentää sen käyttöikää. Siksi puhdistamme katon mekaanisesti käsityövälineillä, mikä säästää tiilen pintaa.</p>
              <p>Puhdistuksen jälkeen levitämme <strong className="text-foreground">sammaleentorjunta-aineen</strong>, joka estää uuden kasvuston muodostumisen. Käsittely suojaa kattoa jopa useiksi vuosiksi.</p>
              <p>Puhdistuksen yhteydessä tarkastamme katon kunnon ja raportoimme mahdollisista korjaustarpeista. <strong className="text-foreground">Rikkoutuneet tiilet vaihdetaan uusiin</strong>.</p>
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
        <div className="text-center mt-8">
          <Link to="/katon-puhdistus-hinta-pirkanmaa" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-lg">
            Katso katon puhdistuksen hintaesimerkit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6">Milloin kannattaa puhdistuttaa katto?</h2>
            <div className="text-lg text-muted-foreground space-y-4">
              <p><strong className="text-foreground">Sammalta tai muuta kasvustoa katolla?</strong> Jo pienikin määrä sammalta kannattaa poistaa ennen kuin se aiheuttaa vahinkoa koko katolla.</p>
              <p><strong className="text-foreground">Aikaa edellisestä puhdistuksessta?</strong> Säännöllinen puhdistus pitää katon hyvässä kunnossa ja estää kalliimmat korjaukset tulevaisuudessa.</p>
              <p><strong className="text-foreground">Myyntiä varten?</strong> Puhdas katto nostaa kiinteistön ensivaikutelmaa ja voi lisätä myyntiarvoa.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQSection items={puhdistusFAQ} />
      <RelatedArticles categories={["katto", "raha"]} />
      <ServiceContactSection variant="katto" />
      <KotitalousVahennys />
      <ToimintaAlueetBanner />
    </div>
  );
};

export default KattopalvelutPuhdistus;
