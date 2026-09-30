import ServicePageHero from "@/components/ServicePageHero";
import MaalausTrustStats from "@/components/maalaus/MaalausTrustStats";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import { wallTestimonials } from "@/data/testimonialsData";
import MaalausProblemSection from "@/components/maalaus/MaalausProblemSection";
import MaalausProcessAccordion from "@/components/maalaus/MaalausProcessAccordion";
import MaalausComparison from "@/components/maalaus/MaalausComparison";
import MaalausPricingCards from "@/components/maalaus/MaalausPricingCards";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import MaalausFinancing from "@/components/maalaus/MaalausFinancing";
import MaalausEntrepreneur from "@/components/maalaus/MaalausEntrepreneur";
import FAQSection from "@/components/FAQSection";
import ServiceContactSection from "@/components/ServiceContactSection";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import SEO from "@/components/SEO";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import { Link } from "react-router-dom";

const heroBase = "moderni-tumma-puutalo-julkisivumaalaus-valmis";
const heroImage = getResponsiveSrc(heroBase);
const heroSrcSet = getResponsiveSrcSet(heroBase);

const faqItems = [
  {
    question: "Saako talon maalauksesta kotitalousvähennystä?",
    answer: "Kyllä saa! Koska <strong>Pintanen kuuluu ennakkoperintärekisteriin</strong>, tekemämme työ on täysin kotitalousvähennyskelpoista, ja erittelemme työn osuuden aina selkeästi loppulaskuun helpottaaksemme vähennyksen hakemista. Vuonna 2026 voit <strong>vähentää 40 % työn osuudesta</strong> suoraan verotuksessasi, ja puolisot voivat hyödyntää vähennyksen yhdessä, jolloin <strong>maksimietu on jopa 4 200 euroa vuodessa</strong>.",
  },
  {
    question: "Mitä talon maalaus maksaa?",
    answer: "Talon maalauksen hinta asettuu tyypillisesti 3 000 eurosta ja 10 000 euroon välille riippuen talon koosta, kerrosmäärästä ja pohjatöiden vaativuudesta. Yhden kerroksen omakotitalon maalaus on edullisempaa, kun taas kaksi kerrosta vaatii usein telineitä tai nostimia. Hintamme on aina \"avaimet käteen\" -toteutus.",
  },
  {
    question: "Voiko maalaustyön maksaa osissa tai rahoituksella?",
    answer: "Kyllä voi! Tarjoamme asiakkaillemme joustavan rahoituksen ja maksujärjestelyn, jolla voit jakaa julkisivun maalauksen kustannukset sinulle sopiviin kuukausieriin. Talon huoltomaalausta ei kannata viivästyttää säästöjen vuoksi, sillä ajoissa tehty suojaus on aina edullisempi investointi kuin lahojen lautojen vaihtaminen tai laajempi ulkoverhousremontti.",
  },
  {
    question: "Kuinka kauan omakotitalon maalaus kestää?",
    answer: "Tyypillisen pirkanmaalaisen omakotitalon pesu, pohjatyöt ja maalaus kestävät sääolosuhteitten mukaan noin <strong>3–7 työpäivää</strong>. Prosessi alkaa huolellisella homepesulla ja mekaanisella kaavinnalla, jonka jälkeen pinnan on annettava kuivua ennen maalausta. Yrittäjänä varmistan, että työt etenevät aikataulussa laadusta tinkimättä.",
  },
  {
    question: "Milloin talon ulkomaalaus on ajankohtaista?",
    answer: "Puuverhoiltu talo on syytä huoltomaalata keskimäärin <strong>10–15 vuoden välein</strong>. Pirkanmaalla säärasitus on kovaa: etelä- ja länsiseinät saattavat vaatia huoltoa jo aiemmin UV-säteilyn ja viistosateiden vuoksi. Hälyttäviä merkkejä ovat maalin hilseily, pinnan liituuntuminen, eli maali jää sormiin pölynä, tai mustien homepilkkujen ilmestyminen laudoitukseen.",
  },
  {
    question: "Kannattaako talo maalata itse vai palkata ammattilainen?",
    answer: "Vaikka talon voi maalata itse, ammattilaisen käyttäminen varmistaa kestävän tartunnan ja säästää viikkojen urakalta. Maalauksen tärkein vaihe on pohjatyöt, kuten oikeaoppinen homepesu ja huolellinen kaavinta, joihin meillä on ammattitason välineet. Valitsemalla Pintasen saat työlle <strong>kirjallisen takuun</strong>, varmistat turvallisen työskentelyn korkeuksissa ja voit hyödyntää <strong>kotitalousvähennyksen</strong>, jota ei saa itse tehdystä työstä.",
  },
];

const TalonMaalaus = () => {
  return (
    <div>
      <SEO
        title="Talon maalaus Pirkanmaa | Hintalaskuri"
        description="Laadukas talon ulkomaalaus Pirkanmaalla. Yrittäjä tekee työn. Laske hinta hintalaskurilla, hyödynnä kotitalousvähennys ja tilaa ilmainen arvio!"
        preloadImage={heroImage}
      />

      <ServicePageHero
        title=""
        subtitle=""
        backgroundImage={heroImage}
        backgroundSrcSet={heroSrcSet}
      >
        <div className="bg-black/45 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto text-left mb-10 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Talon maalaus{' '}
            <span className="text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">Pirkanmaa</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/90 leading-relaxed">
            <strong>Suojaa kotisi säänvaihteluilta ja pidennä ulkoverhouksen ikää laadukkaalla maalauksella.</strong> Meiltä saat <strong>perusteelliset pohjatyöt</strong>, <strong>säänkestävän lopputuloksen</strong> ja <strong>täysin läpinäkyvän hinnoittelun</strong>. <strong>Kokeile avointa hintalaskuriamme heti verkossa</strong> tai kutsu meidät <strong>maksuttomalle arviokäynnille</strong> suoraan kotiovellesi – palvelemme paikallisesti ja joustavasti koko Pirkanmaan alueella!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#yhteystiedot"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:brightness-110 text-base"
            style={{ backgroundColor: 'hsl(202, 100%, 61%)' }}
          >
            Pyydä ilmainen kuntoarvio
          </a>
          <Link
            to="/talon-maalaus-hinta-pirkanmaa"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-foreground transition-all hover:brightness-95 text-base"
            style={{ backgroundColor: 'hsl(36, 56%, 91%)' }}
          >
            Laske hinta laskurilla
          </Link>
        </div>
      </ServicePageHero>

      <MaalausTrustStats />
      <TestimonialsMarquee testimonials={wallTestimonials} title="Mitä maalausasiakkaat sanovat meistä?" />
      <MaalausProblemSection />
      <MaalausProcessAccordion />
      <MaalausComparison />
      <MaalausPricingCards />
      <KotitalousVahennys />
      <MaalausFinancing />
      <MaalausEntrepreneur />
      <FAQSection items={faqItems} />
      <ServiceContactSection variant="maalaus" />
      <ToimintaAlueetBanner />
    </div>
  );
};

export default TalonMaalaus;
