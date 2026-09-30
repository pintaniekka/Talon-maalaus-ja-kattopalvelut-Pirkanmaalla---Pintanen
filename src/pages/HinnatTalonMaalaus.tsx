import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Paintbrush, Ruler, Building2, Layers, Droplets } from "@/components/icons/BrandIcons";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";
import ServicePageHero from "@/components/ServicePageHero";
import WallPriceCalculator from "@/components/WallPriceCalculator";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

const heroImage = getResponsiveSrc("vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen");
const heroSrcSet = getResponsiveSrcSet("vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen");

const priceExamples = [
  { size: "1-kerroksinen omakotitalo", price: "noin 3 500–6 000 €" },
  { size: "1,5-kerroksinen talo", price: "noin 5 000–8 000 €" },
  { size: "2-kerroksinen talo", price: "noin 7 000–11 000 €" },
];

const calculatorIncludes = [
  "Märkähomepesu",
  "Tarvittavat pohjatyöt",
  "Suojaukset ja valmistelut",
  "Varsinainen maalaus",
  "Työmaan siivous",
];

const priceFactors = [
  { icon: Layers, title: "Pohjatyöt", description: "Hilseilevä tai vaurioitunut pinta vaatii enemmän esikäsittelyä." },
  { icon: Building2, title: "Nosturin tarve", description: "Korkeat rakenteet voivat edellyttää nostinta, mikä lisää kustannuksia." },
  { icon: Paintbrush, title: "Käytettävä maali", description: "Eri maalityypit eroavat hinnaltaan ja kestoltaan." },
  { icon: Building2, title: "Talon korkeus", description: "Korkeampi talo vaatii enemmän telineitä ja turvallisuusjärjestelyjä." },
  { icon: Ruler, title: "Talon pinta-ala", description: "Suurempi pinta-ala nostaa materiaali- ja työkustannuksia." },
];

const faqItems = [
  { question: "Kuinka paljon talon maalaus maksaa?", answer: "Hinta riippuu talon koosta ja pohjatöistä. Laskurilla saat karkean arvion." },
  { question: "Kuinka kauan maalaus kestää?", answer: "Yleensä 3–7 päivää kohteen koosta riippuen." },
  { question: "Pitääkö olla kotona?", answer: "Ei tarvitse, kunhan sovitut asiat ovat kunnossa." },
  { question: "Kuinka usein talo pitää maalata?", answer: "Tyypillisesti 10 vuoden välein, riippuen maalista ja sääolosuhteista." },
  { question: "Mitä jos löytyy lahovaurioita?", answer: "Ilmoitamme niistä ennen työn jatkamista." },
  { question: "Saako kotitalousvähennyksen?", answer: "Kyllä, työn osuudesta voi saada vähennyksen." },
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

const HinnatTalonMaalaus = () => {
  return (
    <>
      <SEO
        title="Talon maalaus hinta – Laske arvio heti"
        description="Paljonko talon maalaus maksaa? Laske suuntaa antava hinta laskurilla ja katso hintaesimerkit. Kotitalousvähennys pienentää kustannuksia."
        preloadImage={heroImage}
      />
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <ServicePageHero
        title=""
        subtitle=""
        backgroundImage={heroImage}
        backgroundSrcSet={heroSrcSet}
      >
        <div className="bg-black/45 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto text-left mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Talon maalauksen{' '}
            <span className="text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">hinta</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
            <strong>Laske suuntaa antava hinta laskurillamme</strong> ja katso konkreettisia hintaesimerkkejä. Hinta määräytyy talon koon, kerrosten ja pohjatöiden mukaan. <strong>Kotitalousvähennys</strong> pienentää lopullista kustannusta jopa 2 100 € henkilöä kohden. Tarjoamme aina <strong>läpinäkyvän hinnoittelun</strong> ja <strong>maksuttoman arviokäynnin</strong> kotiovellesi.
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 text-lg text-muted-foreground leading-relaxed text-center"
          >
            <p>
              Talon maalauksen hinta vaihtelee talon koon, korkeuden ja tarvittavien pohjatöiden mukaan.
              Voit saada suuntaa antavan hinta-arvion helposti käyttämällä hintalaskuria. Lopullinen hinta
              määräytyy, kun käymme maksuttomasti kohteessa ja arvioimme työn laajuuden ja kohteen kunnon.
            </p>
          </motion.div>
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
              Laske talon maalauksen hinta
            </h2>
            <WallPriceCalculator />

            <div className="mt-10 bg-card rounded-2xl p-6 md:p-8 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Hintalaskuri antaa karkean arvion urakan hinnasta. Talon ulkomaalaus sisältää yleensä:</h3>
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

      {/* Kotitalousvähennys */}
      <KotitalousVahennys />

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
                <span className="font-semibold text-foreground text-sm">Kohde</span>
                <span className="font-semibold text-foreground text-sm text-right">Tyypillinen hintataso</span>
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
            <p className="text-sm text-muted-foreground text-center mt-4">
              Hinnat sisältävät ALV 25,5 %. Lopullinen hinta maksuttoman arviokäynnin perusteella.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Miksi hinnat vaihtelevat */}
      <section className="section-padding bg-secondary">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4 font-heading">
              Miksi hinnat vaihtelevat?
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

      {/* FAQ */}
      <FAQSection items={faqItems} />

      {/* Contact - only Eemil */}
      <ServiceContactSection variant="maalaus" />
    </>
  );
};

export default HinnatTalonMaalaus;
