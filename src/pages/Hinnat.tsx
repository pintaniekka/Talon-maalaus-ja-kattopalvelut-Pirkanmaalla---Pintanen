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
import { pinnoitusPrices, maalausPrices, puhdistusPrices, fmtRange } from "@/data/prices";

const heroImage = getResponsiveSrc("moderni-tumma-puutalo-julkisivumaalaus-valmis");
const heroSrcSet = getResponsiveSrcSet("moderni-tumma-puutalo-julkisivumaalaus-valmis");

const serviceCards = [
  {
    title: "Tiilikaton pinnoitus",
    description:
      "Katso tarkat hintaesimerkit erikokoisille kohteille, hintavertailu ja lue, mistä pinnoituksen hinta koostuu.",
    cta: "Katso pinnoituksen hintaesimerkit",
    href: "/tiilikaton-pinnoitus-hinta-pirkanmaa",
    price: fmtRange(pinnoitusPrices.general.min, pinnoitusPrices.general.max),
    warranty: "5v takuu",
    baseName: "kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen",
    Icon: RoofTileIcon,
  },
  {
    title: "Katon puhdistus",
    description: "Säännöllinen puhdistus ja suojakäsittely säästää kattoa. Katso edulliset alkaen-hintamme.",
    cta: "Katso puhdistuksen hinnasto",
    href: "/katon-puhdistus-hinta-pirkanmaa",
    price: fmtRange(puhdistusPrices.general.min, puhdistusPrices.general.max),
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
    price: fmtRange(maalausPrices.general.min, maalausPrices.general.max),
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
  const seo = staticSeo["/maalauspalvelut-hinta-pirkanmaa"];
  return (
    <>
      <SEO {...seo} preloadImage={heroImage} />

      <ServicePageHero title="" subtitle="" backgroundImage={heroImage} backgroundSrcSet={heroSrcSet} compact>
        <div className="bg-black/45 rounded-2xl p-5 md:p-8 max-w-4xl mx-auto text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Hinnat ja <span className="text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">hintalaskuri</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
            Tiilikaton pinnoitus maksaa omakotitalossa yleensä{" "}
            <strong>{fmtRange(pinnoitusPrices.general.min, pinnoitusPrices.general.max)}</strong> ja talon ulkomaalaus{" "}
            <strong>{fmtRange(maalausPrices.general.min, maalausPrices.general.max)}</strong>. Hinta sisältää aina
            koko työn, eikä piilokuluja tule. Tarkan hinnan saat ilmaisen arviokäynnin jälkeen.
          </p>
        </div>
      </ServicePageHero>

      {/* Palvelukohtaiset hintasivut */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading mb-4">Katso palvelukohtaiset hinnat</h2>
            <p className="text-lg text-muted-foreground">Jokaisella palvelulla on oma hintasivu, jolla on hintaesimerkit, laskuri ja vastaukset yleisimpiin kysymyksiin.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {serviceCards.map((card) => (
              <Link key={card.href} to={card.href} className="block rounded-2xl overflow-hidden group relative h-full min-h-[320px]">
                <ResponsiveImage
                  baseName={card.baseName}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/85 transition-all duration-300" />
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center mb-4">
                    <card.Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                  <p className="text-2xl font-bold text-accent mb-2">{card.price}</p>
                  <p className="text-sm text-white/80 mb-4">{card.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold">
                    {card.cta} <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ChatPriceCalculator />

      {/* Mitä hinta aina sisältää */}
      <section className="section-padding bg-secondary">
        <div className="section-container max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-heading text-center mb-10">Mitä Pintasen hinta aina sisältää?</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {valueProps.map((item) => (
              <div key={item.title} className="card-elevated text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
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
        </div>
      </section>

      <KotitalousVahennys />
      <RelatedArticles categories={["raha", "katto", "maalaus"]} />
      <ServiceContactSection variant="general" />
      <ToimintaAlueetBanner />
    </>
  );
};

export default Hinnat;
