import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Droplets, Shield, Paintbrush, Clock, BadgeCheck, Ruler, Mountain, Layers, Building2, Wrench as WrenchIcon, ShieldCheck } from "@/components/icons/BrandIcons";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";
import RelatedArticles from "@/components/RelatedArticles";
import { staticSeo } from "@/data/seo";
import ServicePageHero from "@/components/ServicePageHero";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";

import FAQSection from "@/components/FAQSection";
import RoofPriceCalculator from "@/components/RoofPriceCalculator";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

const heroImage = getResponsiveSrc("tiilikaton-tehopesu-ja-sammaleenpoisto");
const heroSrcSet = getResponsiveSrcSet("tiilikaton-tehopesu-ja-sammaleenpoisto");

const priceExamples = [
  { size: "150 m² omakotitalo", price: "noin 2 700–3 300 €" },
  { size: "200 m² omakotitalo", price: "noin 3 000–3 800 €" },
  { size: "250 m² talo", price: "noin 3 500–4 500 €" },
];

const calculatorIncludes = [
  "Suunnittelu + tarvittavat suojaustyöt",
  "Katon pesu",
  "Kasvustontorjunta-aine",
  "Rikkinäisten tiilien vaihto",
  "Kaksi kerrosta kattomaalia",
  "Siivous",
];

const priceFactors = [
  { icon: Ruler, title: "Katon koko", description: "Suurempi katto tarkoittaa enemmän materiaalia ja työtunteja, mutta neliöhinta laskee katon kasvaessa." },
  { icon: Mountain, title: "Jyrkkyys", description: "Jyrkempi katto vaatii enemmän turvavälineitä ja hidastaa työtä, mikä nostaa hintaa." },
  { icon: Layers, title: "Lappeiden lukumäärä", description: "Monimutkaisempi kattorakenne lisää työvaiheita harjojen, jiirin ja läpivientien kohdalla." },
  { icon: Building2, title: "Korkeus", description: "Korkeampi rakennus vaatii pidemmät telineet ja lisää turvallisuusjärjestelyjä." },
  { icon: WrenchIcon, title: "Tiilien kunto", description: "Jos tiiliä on paljon rikki, vaihtotyö lisää urakan kestoa ja materiaalikustannuksia." },
  { icon: ShieldCheck, title: "Suojauksen tarve", description: "Kohteen vaatimat suojaukset kuuluvat hintaan mutta vaikuttavat työn laajuuteen." },
];

const faqItems = [
  { question: "Kuinka paljon tiilikaton pinnoitus maksaa?", answer: "Hinta riippuu katon koosta ja rakenteesta. Laskurilla saat karkean arvion. Tarkka hinta selviää maksuttomassa kartoituksessa." },
  { question: "Kuinka kauan pinnoitus kestää?", answer: "Työ kestää yleensä 2–4 päivää kohteen koosta riippuen." },
  { question: "Kuinka pitkään pinnoitus kestää käytössä?", answer: "Pinnoitus suojaa tiiltä ja hidastaa rapautumista. Todellinen kesto riippuu sääolosuhteista ja katon kunnosta." },
  { question: "Voiko pinnoituksen tehdä jos tiiliä on rikki?", answer: "Yksittäiset rikkinäiset tiilet vaihdetaan. Laajat rakenteelliset vauriot edellyttävät muuta ratkaisua." },
  { question: "Pitääkö olla kotona työn aikana?", answer: "Ei tarvitse, kunhan sähkö ja vesipiste ovat käytettävissä." },
  { question: "Saako työstä kotitalousvähennyksen?", answer: "Kyllä, työn osuudesta voi saada vähennyksen verotuksessa." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const HinnatTiilikalonPinnoitus = () => {
  return (
    <>
      <SEO
        {...staticSeo["/tiilikaton-pinnoitus-hinta-pirkanmaa"]}
        preloadImage={heroImage}
      />
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <ServicePageHero
        title=""
        subtitle=""
        backgroundImage={heroImage}
        backgroundSrcSet={heroSrcSet}
      >
        <div className="bg-black/45 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto text-left mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Tiilikaton pinnoituksen{' '}
            <span className="text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">hinta</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
            <strong>Laske tiilikaton pinnoituksen suuntaa antava hinta laskurillamme</strong> sekunneissa. Hinta riippuu katon koosta, jyrkkyydestä ja tiilien kunnosta. Pinnoitus pidentää katon käyttöikää <strong>10–15 vuotta</strong> ja säästää tuhansia euroja kattoremontin lykkäyksellä. Toimimme <strong>Pirkanmaalla ja Kanta-Hämeessä</strong> ja annamme aina <strong>5 vuoden takuun</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#hintalaskuri"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:brightness-110 text-base"
            style={{ backgroundColor: 'hsl(202, 100%, 61%)' }}
          >
            Laske hinta laskurilla
          </a>
          <a
            href="#yhteystiedot"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-foreground transition-all hover:brightness-95 text-base"
            style={{ backgroundColor: 'hsl(36, 56%, 91%)' }}
          >
            Pyydä ilmainen kuntoarvio
          </a>
        </div>
      </ServicePageHero>


      {/* Intro */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground leading-relaxed text-center"
          >
            Tiilikaton pinnoituksen hinta vaihtelee katon koosta, jyrkkyydestä ja tiilien kunnosta riippuen.
            Voit saada suuntaa antavan arvion helposti käyttämällä hintalaskuria. Tarkemman ja varmemman
            urakkahinnan saat kuitenkin maksuttoman kuntotarkastuksen yhteydessä.
          </motion.p>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-padding bg-accent-light">
        <div className="section-container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-8 font-heading text-center">
              Laske tiilikaton pinnoituksen hinta
            </h2>
            <RoofPriceCalculator />

            {/* What the estimate includes */}
            <div className="mt-10 bg-card rounded-2xl p-6 md:p-8 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Mitä laskurin arvio sisältää:</h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {calculatorIncludes.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Price examples */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-8 font-heading text-center">
              Hintaesimerkit
            </h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="grid grid-cols-2 bg-muted px-6 py-3 border-b border-border">
                <span className="font-semibold text-foreground text-sm">Katon koko</span>
                <span className="font-semibold text-foreground text-sm text-right">Tyypillinen hinta</span>
              </div>
              {priceExamples.map((ex, i) => (
                <div
                  key={ex.size}
                  className={`grid grid-cols-2 px-6 py-4 ${i < priceExamples.length - 1 ? "border-b border-border" : ""}`}
                >
                  <span className="text-muted-foreground">{ex.size}</span>
                  <span className="text-foreground font-semibold text-right">{ex.price}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kotitalousvähennys */}
      <KotitalousVahennys />

      {/* Price factors */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4 font-heading">
              Mistä tiilikaton pinnoituksen hinta muodostuu?
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {priceFactors.map((factor, index) => (
              <motion.div
                key={factor.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="card-elevated"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <factor.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{factor.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{factor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pinnoitus vs kattoremontti */}
      <section className="section-padding bg-secondary">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6 font-heading text-center">
              Pinnoitus vai kattoremontti?
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed mb-10">
              <p>
                Tiilikaton pinnoitus on monesti huomattavan edullisempi vaihtoehto kuin kattoremontti,
                jos katosta löytyy kunnollinen aluskate ja rakenteet ovat kunnossa. Pinnoitus ei korjaa
                rakenteellisia ongelmia, mutta se suojaa tiiliä, hidastaa kuluvaa prosessia ja voi pidentää
                katon käyttöikää useilla vuosilla. Pienet aluskatteen korjaukset on mahdollista tehdä
                pinnoituksen yhteydessä.
              </p>
              <p>
                Kun katto on muuten hyvässä kunnossa, pinnoitus on hyvä tapa kunnostaa katon toimivuus
                ja ulkonäkö ilman suurta remonttia, ja se on taloudellisesti kannattava ratkaisu.
              </p>
            </div>

            {/* Comparison cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card rounded-2xl p-6 border border-accent/30">
                <h3 className="text-lg font-bold text-foreground mb-2">Tiilikaton pinnoitus</h3>
                <p className="text-3xl font-bold text-accent mb-1">2 700–6 000 €</p>
                <p className="text-sm text-muted-foreground">Suojaa ja uudistaa katon edullisesti</p>
              </div>
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-2">Kattoremontti</h3>
                <p className="text-3xl font-bold text-foreground/60 mb-1">15 000–30 000 €</p>
                <p className="text-sm text-muted-foreground">Koko katon uusiminen rakenteista lähtien</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection items={faqItems} />

      <RelatedArticles categories={["katto", "raha"]} />
      {/* Contact - only Eerik */}
      <ServiceContactSection variant="katto" />
    </>
  );
};

export default HinnatTiilikalonPinnoitus;
