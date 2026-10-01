import { motion } from "framer-motion";
import { Check, ArrowRight, ChevronRight } from "lucide-react";
import { ShieldCheck, Wrench, FileText } from "@/components/icons/BrandIcons";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import RelatedArticles from "@/components/RelatedArticles";
import { staticSeo } from "@/data/seo";
import ServicePageHero from "@/components/ServicePageHero";
import ChatPriceCalculator from "@/components/ChatPriceCalculator";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import ResponsiveImage from "@/components/ResponsiveImage";
import { RoofTileIcon, RoofCleanIcon, PaintBrushIcon } from "@/components/ServiceIcons";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

const heroImage = getResponsiveSrc("moderni-tumma-puutalo-julkisivumaalaus-valmis");
const heroSrcSet = getResponsiveSrcSet("moderni-tumma-puutalo-julkisivumaalaus-valmis");

const serviceCards = [
  {
    title: "Tiilikaton pinnoitus",
    description:
      "Katso tarkat hintaesimerkit erikokoisille kohteille, hintavertailu ja lue, mistä pinnoituksen hinta koostuu.",
    cta: "Katso pinnoituksen hintaesimerkit",
    href: "/tiilikaton-pinnoitus-hinta-pirkanmaa",
    warranty: "5v takuu",
    baseName: "kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen",
    Icon: RoofTileIcon,
  },
  {
    title: "Katon puhdistus",
    description: "Säännöllinen puhdistus ja suojakäsittely säästää kattoa. Katso edulliset alkaen-hintamme.",
    cta: "Katso puhdistuksen hinnasto",
    href: "/katon-puhdistus-hinta-pirkanmaa",
    warranty: "Ilmainen tarkastus",
    baseName: "puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen",
    Icon: RoofCleanIcon,
  },
  {
    title: "Talon maalaus",
    description:
      "Tutustu ulkomaalauksen neliöhintoihin, pohjatöiden vaikutuksiin ja katso esimerkkilaskelmat puutaloille.",
    cta: "Katso maalauksen hintaesimerkit",
    href: "/talon-maalaus-hinta-pirkanmaa",
    warranty: "2v takuu",
    baseName: "vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen",
    Icon: PaintBrushIcon,
  },
];

const valueProps = [
  {
    icon: Wrench,
    title: "Avaimet käteen -palvelu",
    description: "Hinta sisältää aina kaikki tarvittavat materiaalit ja tarvikkeet",
  },
  {
    icon: FileText,
    title: "Kirjallinen takuu",
    description: "Annamme työllemme selkeän takuun (esim. 5 vuotta pinnoituksille).",
  },
  {
    icon: ShieldCheck,
    title: "Ei piilokuluja",
    description: "Tarjous sisältää kaiken, jotta urakan saa suoritettua alusta loppuun.",
  },
];

const Hinnat = () => {
  return (
    <>
      <SEO
        {...staticSeo["/maalauspalvelut-hinta-pirkanmaa"]}
        preloadImage={heroImage}
      />

      {/* 1. Hero */}
      <ServicePageHero
        title="Tiilikaton pinnoituksen ja talon maalauksen hinnat"
        subtitle="Laske tiilikaton pinnoituksen tai talon maalauksen hinta heti"
        backgroundImage={heroImage}
        backgroundSrcSet={heroSrcSet}
      />

      {/* Intro-teksti ennen laskuria */}
      <section className="section-padding pb-0 bg-background">
        <div className="section-container max-w-3xl mx-auto text-center">
          <p className="text-muted-foreground text-lg leading-relaxed">
            Saat nopeasti suuntaa antavan hinnan urakallesi Pirkanmaalla. Meillä Pintasella hinnoittelu on läpinäkyvää –
            ei piilokuluja ja varmistamme tarkan urakkahinnan maksuttoman arviokäynnin aikana.
          </p>
        </div>
      </section>

      <ChatPriceCalculator />

      {/* 2. H2 + teksti */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6 font-heading text-center">
              Mitä maalaustyöt maksavat Pirkanmaalla?
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Tiilikaton pinnoituksen, katon puhdistuksen ja talon ulkomaalauksen kustannukset vaihtelevat useista
                syistä. Hinta riippuu muun muassa kohteen koosta, kunnosta ja tarvittavista pohjatöistä. Tästä syystä
                tarkka urakkahinta määritellään yleensä ilmaisella arviointikäynnillä.
              </p>
              <p>
                Tällä sivulla näet suuntaa antavat hinnat eri palveluille sekä esimerkkejä aiemmista töistä. Näin voit
                saada realistisen käsityksen siitä, mitä kattotyöt tai ulkomaalaus yleensä maksavat Pirkanmaan alueella.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              {["Ilmainen arviokäynti", "Ei sitoumuksia", "Vastaus 24h sisällä"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-foreground font-medium">
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-accent" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Palvelukohtaiset hintasivut */}
      <section className="section-padding bg-muted/30">
        <div className="section-container">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-accent mb-8 font-heading text-center"
          >
            Katso palvelukohtaiset hinnat
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {serviceCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={card.href} className="block rounded-2xl overflow-hidden group relative h-full min-h-[320px]">
                  <ResponsiveImage
                    baseName={card.baseName}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/85 transition-all duration-300" />

                  <div className="relative z-10 flex flex-col justify-end h-full p-6">
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                      <card.Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 font-heading">{card.title}</h3>
                    <p className="text-sm text-white/80 mb-4">{card.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                        {card.warranty}
                      </span>
                      <span className="flex items-center gap-1 text-white font-medium text-sm group-hover:gap-2 transition-all">
                        Lue lisää
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Arvolupaus */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-accent mb-10 font-heading text-center"
          >
            Mitä Pintasen hinta aina sisältää?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {valueProps.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Kotitalousvähennys */}
      <KotitalousVahennys />

      <RelatedArticles categories={["raha", "katto", "maalaus"]} />
      {/* 6. Yhteystiedot */}
      <ServiceContactSection variant="general" />
      <ToimintaAlueetBanner />
    </>
  );
};

export default Hinnat;
