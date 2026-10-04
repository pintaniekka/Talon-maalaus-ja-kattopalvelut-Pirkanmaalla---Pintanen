import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";
import RelatedArticles from "@/components/RelatedArticles";
import { staticSeo } from "@/data/seo";
import ServicePageHero from "@/components/ServicePageHero";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";

import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

const heroImage = getResponsiveSrc("puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen");
const heroSrcSet = getResponsiveSrcSet("puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen");

const priceExamples = [
  { size: "Pieni omakotitalo", price: "noin 800–1 200 €" },
  { size: "Keskikokoinen omakotitalo", price: "noin 1 200–1 800 €" },
  { size: "Suurempi kohde", price: "noin 1 800–2 500 €" },
];

const includes = [
  "Tarvittavat suojaustyöt",
  "Katon mekaaninen puhdistus",
  "Rikkinäisten tiilten vaihto",
  "Kasvustontorjunta-aine käsittely",
  "Räystäskourujen tyhjennys",
  "Työmaan siivoaminen työn päätyttyä",
];

const faqItems = [
  { question: "Vaurioittaako puhdistus kattoa?", answer: "Oikein tehtynä ei. Käytämme oikeita työvälineitä, jotka eivät kuluta tiilen pintaa." },
  { question: "Kuinka usein katto pitää puhdistaa?", answer: "Tyypillisesti 2–5 vuoden välein, riippuen ympäristöstä." },
  { question: "Voiko puhdistuksen tehdä itse?", answer: "Mahdollista, mutta väärä pesutapa voi aiheuttaa vaurioita." },
  { question: "Kauanko työ kestää?", answer: "Usein noin päivän." },
  { question: "Saako työstä kotitalousvähennyksen?", answer: "Kyllä, työn osuudesta voi saada vähennyksen." },
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

const HinnatKatonPuhdistus = () => {
  return (
    <div>
      <SEO
        {...staticSeo["/katon-puhdistus-hinta-pirkanmaa"]}
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
            Katon puhdistuksen{' '}
            <span className="text-accent-ink drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">hinta</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
            <strong>Sammaleen poisto ja suojakäsittely</strong> pidentävät katon käyttöikää merkittävästi. Hinta määräytyy katon koon ja likaisuuden mukaan. Käytämme <strong>mekaanista puhdistusta</strong> ilman painepesua, jotta tiilet säilyvät ehjinä. Toimimme <strong>Pirkanmaalla ja Kanta-Hämeessä</strong> ja tarjoamme <strong>kotitalousvähennyskelpoisen palvelun</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#hintaesimerkit"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-all hover:brightness-110 text-base"
            style={{ backgroundColor: "hsl(var(--accent-strong))" }}
          >
            Katso hintaesimerkit
          </a>
          <Link
            to="/tarjouspyynto?palvelu=puhdistus"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-foreground transition-all hover:brightness-95 text-base"
            style={{ backgroundColor: 'hsl(36, 56%, 91%)' }}
          >
            Pyydä ilmainen tarjous
          </Link>
        </div>
      </ServicePageHero>


      {/* Intro */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>Katon puhdistuksen hinta vaihtelee katon koon, likaisuuden ja katolle kertyneen sammalen tai muun kasvuston määrän mukaan.</p>
              <p>Katon puhdistus, kun se tehdään oikein, parantaa katon ulkonäköä ja auttaa estämään ennenaikaista kulumista.</p>
              <p>Yksinkertainen kemiallinen käsittely ei yleensä riitä; sammaleen juuret ja lika on poistettava huolellisesti, jotta lopputulos kestää pitkään.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hintaesimerkit */}
      <section className="section-padding bg-accent-light">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-8 text-center font-heading">Hintaesimerkit</h2>
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg">
              <div className="grid grid-cols-2 bg-primary text-primary-foreground font-semibold">
                <div className="p-4">Kohde</div>
                <div className="p-4 text-right">Tyypillinen hintataso</div>
              </div>
              {priceExamples.map((example, index) => (
                <div key={index} className={`grid grid-cols-2 ${index % 2 === 0 ? 'bg-card' : 'bg-secondary'}`}>
                  <div className="p-4 font-medium text-foreground">{example.size}</div>
                  <div className="p-4 text-right text-primary font-semibold">{example.price}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-4">Hinnat sisältävät ALV 25,5 %. Lopullinen hinta kuntotarkastuksen perusteella.</p>
          </motion.div>
        </div>
      </section>

      {/* Mitä puhdistus sisältää */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 text-center font-heading">Mitä puhdistus sisältää?</h2>
            <p className="text-lg text-muted-foreground mb-8 text-center">Katon puhdistus on tärkeää tehdä huolellisesti ja turvallisesti. Työn määrä vaihtelee katon kunnon ja likaisuuden mukaan. Yleensä katon puhdistukseen sisältyy:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {includes.map((item, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-sm">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent-ink" />
                  </div>
                  <span className="text-foreground font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Milloin pelkkä puhdistus riittää */}
      <section className="section-padding bg-secondary">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6 text-center font-heading">Milloin pelkkä puhdistus riittää?</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>Katon puhdistaminen on usein tarpeeksi, kun katossa ei ole laajaa rapautumista tai muita ongelmia, joilla on vaikutusta rakenteisiin. Jos katon pinta on likainen ja siinä on paljon sammalta, mutta itse tiilet ovat edelleen hyvässä kunnossa, niin huolellinen puhdistaminen on usein hyvä valinta ja se on myös taloudellisesti kannattava.</p>
              <p>Tämä menetelmä sopii erityisesti tilanteisiin, joissa katon yleiskunto on vielä hyvä, mutta halutaan poistaa lika, sammal ja kosteus ennen kuin ne pääsevät aiheuttamaan suurempaa vahinkoa.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Milloin suosittelemme pinnoitusta */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6 text-center font-heading">Milloin suosittelemme pinnoitusta?</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>Pelkkä puhdistus ei aina riitä. Jos tiilikaton pintakerros on kulunut, vesi imeytyy tiileen tai katolla on useita rikkoutuneita tiiliä, pinnoitus voi olla parempi valinta. Pinnoitus suojaa kattotiiliä tehokkaammin ja pidentää katon käyttöikää, jos rakenteet ovat kunnossa.</p>
              <p>Katon kunto vaatii joskus laajempaa huolenpitoa. Tutustu myös tiilikaton pinnoituksen hintoihin.</p>
            </div>
            <div className="mt-6 text-center">
              <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-lg">
                Katso tiilikaton pinnoituksen hintaesimerkit <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <KotitalousVahennys />
      <FAQSection items={faqItems} />
      <RelatedArticles categories={["katto", "raha"]} />
      <ServiceContactSection variant="katto" />
    </div>
  );
};

export default HinnatKatonPuhdistus;
