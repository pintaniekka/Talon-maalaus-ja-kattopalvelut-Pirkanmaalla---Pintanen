import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Search, Clock } from "@/components/icons/BrandIcons";
import { Badge } from "@/components/ui/badge";
import ServicePageHero from "@/components/ServicePageHero";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProcessAccordion from "@/components/ProcessAccordion";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import { roofTestimonials } from "@/data/testimonialsData";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import ResponsiveSupabaseImage from "@/components/ResponsiveSupabaseImage";
import { pinnoitusFAQ } from "@/data/faqData";
import SEO from "@/components/SEO";
import RelatedArticles from "@/components/RelatedArticles";
import ServiceSchema from "@/components/ServiceSchema";
import { staticSeo } from "@/data/seo";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

const heroBase = "kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen";
const heroImage = getResponsiveSrc(heroBase);
const heroSrcSet = getResponsiveSrcSet(heroBase);

/* ── Trust-box data ── */
const trustStats = [
  { value: "5,0 / 5", label: "Google-arvostelut", sub: "Pirkanmaan tyytyväisimmät asiakkaat." },
  { value: "Yli 100", label: "Pinnoitettua kattoa", sub: "Olen tehnyt jokaisen urakan henkilökohtaisesti." },
  { value: "+5 vuotta", label: "Kokemusta alalta", sub: "Tiedän, miten suomalainen tiilikatto saadaan kestämään." },
  { value: "5 vuotta", label: "Takuu työlle", sub: "Seison yrittäjänä oman jäljen takana." },
];

/* ── Pricing cards ── */
const pricingCards = [
  { size: "150–180 m²", label: "Pieni/keskisuuri koti", duration: "2 työpäivää", normalPrice: "2 850 € – 3 200 €", afterPrice: "alk. 2 050 €", featured: false },
  { size: "190–240 m²", label: "Yleisin kattokoko", duration: "2–3 työpäivää", normalPrice: "3 300 € – 3 700 €", afterPrice: "alk. 2 380 €", featured: true },
  { size: "250–300 m²", label: "Suuri omakotitalo", duration: "2–4 työpäivää", normalPrice: "3 750 € – 4 880 €", afterPrice: "alk. 2 700 €", featured: false },
];

const pricingIncludes = [
  "Syväpuhdistava pesu",
  "Kasvustonestokäsittely",
  "Tiilien vaihto & huolto",
  "2x Maalaus / Pinnoitus",
];

/* ── Warning signs ── */
const warningSigns = [
  { sign: "Väri on haalistunut", desc: "Suojapinta on kulunut pois ja tiili on altis sään vaihteluille." },
  { sign: "Sammal kasvaa nopeasti", desc: "Sammal saa otteen vain huokoisesta ja kuluneesta pinnasta." },
  { sign: "Tiiliä halkeilee", desc: "Merkki siitä, että vesi on jo päässyt rakenteen sisään ja jäätynyt." },
  { sign: 'Katto on "karhea"', desc: "Tiilen pinta tuntuu hiekkapaperilta, mikä tarkoittaa, että se imee vettä." },
];

const KattopalvelutPinnoitus = () => {
  return (
    <div>
      <SEO
        {...staticSeo["/tiilikaton-pinnoitus-pirkanmaa"]}
      />
      <ServiceSchema name="Tiilikaton pinnoitus" area="Pirkanmaa" areaType="AdministrativeArea" description={staticSeo["/tiilikaton-pinnoitus-pirkanmaa"].description} />

      {/* ═══ HERO ═══ */}
      <ServicePageHero
        title=""
        subtitle=""
        backgroundImage={heroImage}
        backgroundSrcSet={heroSrcSet}
      >
        {/* Glassmorphism container for H1 + body text */}
        <div className="bg-black/45 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 font-heading">
            Tiilikaton pinnoitus{' '}
            <span className="text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">Pirkanmaa</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-3xl mx-auto">
            Pysäytä katon rapautuminen ennen kuin on liian myöhäistä. Laadukas tiilikaton pinnoitus Pirkanmaalla <strong className="text-primary-foreground">säästää sinut kalliilta kattoremontilta</strong>. Pintasen ammattimainen pesu ja pinnoitus palauttavat katon loiston ja antavat sille <strong className="text-primary-foreground">jopa 10–15 vuotta lisäaikaa</strong>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#yhteystiedot"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors"
            style={{ backgroundColor: "hsl(202, 100%, 61%)" }}
          >
            Pyydä maksuton kuntotarkastus
          </a>
          <Link
            to="/tiilikaton-pinnoitus-hinta-pirkanmaa"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            style={{ backgroundColor: "hsla(30, 52%, 90%, 0.15)" }}
          >
            Hintalaskuri
          </Link>
        </div>
      </ServicePageHero>

      {/* ═══ TRUST BOXES ═══ */}
      <section className="py-12 bg-background">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {trustStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-2xl p-5 md:p-6 text-center shadow-sm border border-border/50"
              >
                <p className="text-2xl md:text-3xl font-bold text-accent mb-1">{stat.value}</p>
                <p className="text-sm font-semibold text-foreground mb-2">{stat.label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <TestimonialsMarquee testimonials={roofTestimonials} title="Mitä kattoasiakkaat sanovat meistä?" />

      {/* ═══ SPLIT SCREEN: Problem + Before/After ═══ */}
      <section className="section-padding bg-accent-light">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
              Miksi tiilikaton pinnoitus on elintärkeää juuri nyt?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Monen pirkanmaalaisen kodin tiilikatto näyttää ulkoisesti hyvältä, vaikka se olisi jo menettänyt suojakykynsä. Tiilen alkuperäinen tehdaspinnoite kuluu pois, ja tiilestä tulee <strong className="text-foreground">kuin kuiva pesusieni</strong>. Tämä on merkki siitä, että katto tarvitsee huoltoa ja pinnoitusta.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
            {/* Left: Before/After slider (sticky on desktop) */}
            <div className="lg:sticky lg:top-28">
              <BeforeAfterSlider
                beforeImage={getResponsiveSrc("likainen-tiilikatto-ennen-pesua-ja-suojakasittelya")}
                afterImage={getResponsiveSrc("uudenveroinen-punainen-tiilikatto-maalaus-jalkeen")}
                beforeSrcSet={getResponsiveSrcSet("likainen-tiilikatto-ennen-pesua-ja-suojakasittelya")}
                afterSrcSet={getResponsiveSrcSet("uudenveroinen-punainen-tiilikatto-maalaus-jalkeen")}
                beforeAlt="Likainen tiilikatto ennen pesua ja suojakäsittelyä Pirkanmaalla"
                afterAlt="Uudenveroinen punainen tiilikatto maalaus jälkeen Pirkanmaalla"
              />
            </div>

            {/* Right: Informational text */}
            <div className="space-y-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  Pysäytä katon pakkasrapautuminen ajoissa
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Suomen talvessa tiili kokee kymmeniä jäätymis-sulamissyklejä. Vesi, joka imeytyy huokoisen tiilen sisään, jäätyy ja laajenee, murentaen tiiltä sisältäpäin. Tämä <strong className="text-foreground">pakkasrapautuminen</strong> johtaa vääjäämättä tiilien halkeiluun ja lopulta <strong className="text-foreground">kalliiseen kattoremonttiin</strong>, jos vettä pääsee aluskatteelle ja talon rakenteisiin.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                  Sammaleen poisto on vain puolet ratkaisusta
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sammal ja jäkälä eivät ole vain ulkonäköhaitta. Ne tunkevat juurensa saumakohtiin ja pitävät katon jatkuvasti märkänä. Pelkkä pesu poistaa näkyvän lian, mutta vain ammattimainen tiilikaton pinnoitus <strong className="text-foreground">sulkee tiilen huokoset</strong>. Se luo katollesi <strong className="text-foreground">vettä hylkivän ja likaa hylkivän suojakilven</strong>, joka kestää vuosia.
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-accent" />
                  Huomaatko nämä merkit katollasi? Silloin pinnoituksella on kiire:
                </h4>
                <ul className="space-y-3">
                  {warningSigns.map((w) => (
                    <li key={w.sign} className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <strong className="text-foreground">{w.sign}:</strong> {w.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <a
                href="#yhteystiedot"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors"
                style={{ backgroundColor: "hsl(202, 100%, 61%)" }}
              >
                Pyydä maksuton kuntotarkastus
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ACCORDION ═══ */}
      <ProcessAccordion />

      {/* ═══ COMPARISON: Pinnoitus vs. kattoremontti ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-bold text-accent mb-6">
                  Tiilikaton pinnoitus vai kokonaan uusi kattoremontti?
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Tämä on yleisin kysymys, jota asiakkaamme pohtivat. Nyrkkisääntö on selkeä: jos katon aluskate ja puurakenteet ovat kunnossa, <strong className="text-foreground">kattoremontti on usein täysin turha ja ylimitoitettu investointi</strong>.
                  </p>
                  <p>
                    Tiilikaton pinnoitus on ekologinen ja kustannustehokas vaihtoehto, joka maksaa vain <strong className="text-foreground">noin 10–20 % uuden katon hinnasta</strong>. Kun pinnoitus tehdään ajoissa (noin 10–15 vuoden iässä tai kun vanha pinnoite on kulunut), <strong className="text-foreground">säästät kymmeniä tuhansia euroja</strong> ja vältät raskaan rakennusprojektin pihan mylläyksineen.
                  </p>
                </div>
                <div className="mt-8">
                  <Link
                    to="/tiilikaton-pinnoitus-hinta-pirkanmaa"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-foreground transition-all hover:brightness-95 text-lg"
                    style={{ backgroundColor: 'hsl(36, 56%, 91%)' }}
                  >
                    Hintalaskuri
                  </Link>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <ResponsiveSupabaseImage
                  baseName="tummanharmaa-kattotiili-pesu-ja-pinnoitustyo"
                  alt="Tummanharmaa kattotiili pesu ja pinnoitustyö Pirkanmaalla"
                  className="w-full rounded-2xl shadow-lg"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING TABLE ═══ */}
      <section className="section-padding bg-secondary">
        <div className="section-container max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
              Paljonko maksaa tiilikaton pinnoitus Pirkanmaalla?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Haluamme olla hinnoittelussamme täysin avoimia. Katon lopullinen hinta määräytyy pinta-alan, katon jyrkkyyden ja lähtökunnon perusteella.
            </p>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-card rounded-2xl shadow-sm flex flex-col overflow-hidden ${
                  card.featured
                    ? "border-2 border-accent md:scale-105 md:shadow-lg"
                    : "border border-border/50"
                }`}
              >
                {card.featured && (
                  <div className="bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider text-center py-1.5">
                    Yleisin kattokoko
                  </div>
                )}

                <div className="p-5 md:p-6 flex flex-col flex-1">
                  <p className="text-2xl font-bold text-foreground">{card.size}</p>
                  <p className="text-sm text-muted-foreground mb-4">{card.label}</p>

                  <div className="mb-5">
                    <p className="text-sm line-through text-muted-foreground/60 mb-1">
                      Norm. {card.normalPrice}
                    </p>
                    <p className="text-3xl md:text-4xl font-bold text-accent">{card.afterPrice}</p>
                    <p className="text-xs text-muted-foreground mt-1">kotitalousvähennyksen jälkeen</p>
                  </div>

                  <ul className="space-y-2.5 mb-5 flex-1">
                    {pricingIncludes.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                        <Check className="w-4 h-4 text-accent flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
                    <Clock className="w-4 h-4" />
                    Kesto: {card.duration}
                  </div>

                  <a
                    href="#yhteystiedot"
                    className={`inline-flex items-center justify-center w-full py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-md text-sm ${
                      card.featured
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    Pyydä tarjous tästä
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Price calculator CTA button */}
          <div className="text-center mt-10">
            <Link
              to="/tiilikaton-pinnoitus-hinta-pirkanmaa"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "hsl(38, 60%, 65%)", color: "hsl(215, 25%, 15%)" }}
            >
              Laske hinta: katon pinnoitus Pirkanmaa
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ KOTITALOUSVÄHENNYS ═══ */}
      <KotitalousVahennys />

      {/* ═══ JOUSTAVA RAHOITUS ═══ */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-sm"
          >
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              Joustava rahoitus – Katon pinnoitus kätevästi kuukausimaksulla
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Katon huoltoa ei kannata lykätä säästöjä odotellessa, sillä vesivahinko tai kattoremontti on aina kalliimpi vaihtoehto. Kauttamme saat joustavan rahoituksen, jolla voit maksaa pinnoituksen sinulle sopivissa kuukausierissä. Kysy lisää arviokäynnin yhteydessä!
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═══ ENTREPRENEUR / EERIK ═══ */}
      <section className="section-padding bg-secondary">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-8 text-center">
              Kuka katollesi kiipeää? Terveiset yrittäjältä
            </h2>

            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
              <div className="flex justify-center">
                <img
                  src={`https://fndkkgfpsgghvewvoysr.supabase.co/storage/v1/object/public/images/Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp`}
                  alt="Eerik Pitkänen – Pintanen Oy, kattopalvelut"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Moi, olen Eerik, ja olen perustanut oman yrityksen, Pintasen. Toisin kuin isot yritykset, meillä et ole vain yksi tilausnumero muiden joukossa. Hoidan tiilikattojen pinnoitukset Pirkanmaalla <strong className="text-foreground">henkilökohtaisesti alusta loppuun</strong>.
                </p>
                <p>
                  Minulla on <strong className="text-foreground">5 vuoden vankka kokemus ja yli 100 onnistunutta urakkaa</strong>. Tiedän, miten pirkanmaalaiset katot kestävät vaihtelevia sääolosuhteita.
                </p>
                <p>
                  Kun tilaat pinnoituksen minulta, tiedät aina, kuka työskentelee pihallasi ja kuka vastaa työn laadusta. Tästä syystä voin antaa työlleni <strong className="text-foreground">5 vuoden takuun</strong>, ja olen siitä ylpeä.
                </p>
                <p className="font-medium text-foreground">— Eerik, Pintanen Oy</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <FAQSection items={pinnoitusFAQ} />

      <RelatedArticles categories={["katto", "raha"]} />
      {/* ═══ CONTACT ═══ */}
      <ServiceContactSection variant="katto" />

      {/* ═══ TOIMINTA-ALUEET ═══ */}
      <ToimintaAlueetBanner />
    </div>
  );
};

export default KattopalvelutPinnoitus;
