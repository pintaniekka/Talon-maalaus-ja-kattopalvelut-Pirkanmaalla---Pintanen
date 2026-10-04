import { Navigate } from "react-router-dom";
import CityProjects from "@/components/CityProjects";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { MapPin } from "@/components/icons/BrandIcons";
import ServicePageHero from "@/components/ServicePageHero";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import FAQSection from "@/components/FAQSection";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import ServiceContactSection from "@/components/ServiceContactSection";
import SEO from "@/components/SEO";
import ResponsiveImage from "@/components/ResponsiveImage";
import { RoofTileIcon, RoofCleanIcon, PaintBrushIcon } from "@/components/ServiceIcons";
import { getStorageUrl, getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import { getCityBySlug, cityHasServicePages, maalausCities } from "@/data/cityData";
import { getAreaCityContent } from "@/data/areaCityContent";
import { getCityNeighborhoods } from "@/data/cityNeighborhoods";
import { getTestimonialsForCity } from "@/data/testimonialsData";

const heroImage = getResponsiveSrc("ammattilainen-maalaa-talon-ulkoverhousta-pensselilla");

const eerikImage = getStorageUrl("Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp");
const eemilImage = getStorageUrl("Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp");

/* ── Trust Stats (spekin mukaiset tekstit, cityIn-muuttujalla) ── */
const getTrustStats = (cityIn: string) => [
  {
    value: "5,0 / 5",
    label: "Google-arvostelut",
    sub: "",
  },
  {
    value: "Yli 200",
    label: "Onnistunutta urakkaa",
    sub: (<>Olemme tehneet <strong className="text-foreground">jokaisen työn itse</strong>.</>),
  },
  {
    value: "+5 vuotta",
    label: "Kokemusta alalta",
    sub: "Ei enää arvailua.",
  },
  {
    value: "2–5 vuotta",
    label: "Takuu työlle",
    sub: (<>Annamme työlle <strong className="text-foreground">kirjallisen takuun</strong>.</>),
  },
];

/* ── FAQ (spekin mukaiset 5 kysymystä, dynaamiset {cityIn}/{cityGenitive}) ── */
const getAreaFAQ = (cityName: string, cityIn: string, cityGenitive: string) => [
  {
    question: `Paljonko talon maalaus tai katon pinnoitus maksaa ${cityIn}?`,
    answer: `Hinta riippuu aina kohteen koosta, jyrkkyydestä ja pohjatöiden tarpeesta ${cityGenitive} alueella. Esimerkiksi omakotitalon maalaus tai tiilikaton pinnoitus maksaa tyypillisesti <strong>muutamasta tuhannesta eurosta ylöspäin</strong>. 👉 <a href="/talon-maalaus-hinta-pirkanmaa/" class="text-accent underline">Katso tarkat hintaesimerkit talon maalauksesta</a> 👉 <a href="/hintalaskuri?palvelu=pinnoitus" class="text-accent underline">Katso tiilikaton pinnoituksen hintalaskuri</a>`,
  },
  {
    question: `Kuinka kauan maalaus- tai kattotyö kestää ${cityIn}?`,
    answer: `Useimmat pientalojen huoltourakat valmistuvat <strong>2–5 työpäivässä</strong>. Aikataulu riippuu sääolosuhteista ja erityisesti pohjatöiden (kuten homepesun ja kaavinnan) laajuudesta.`,
  },
  {
    question: `Ketkä tekevät varsinaisen työn kohteessa ${cityIn}?`,
    answer: `Pintasella työn tekevät aina <strong>yrittäjät itse</strong>. Emme käytä alihankkijoita tai kokemattomia kesätyöntekijöitä. Tämän ansiosta tiedät aina kuka pihallasi liikkuu, ja voimme myöntää työllemme jopa <strong>5 vuoden takuun</strong>.`,
  },
  {
    question: `Kannattaako talon maalaus tai katon pinnoitus tehdä itse ${cityIn}?`,
    answer: `Pienet paikkamaalaukset onnistuvat helposti itse, mutta kokonaisvaltainen ulkomaalaus ja varsinkin tiilikaton pinnoitus vaativat <strong>ammattitason painepesurit</strong>, oikeat kasvustontorjunta-aineet sekä <strong>huolelliset pohjatyöt</strong>. Väärin tehtynä maali hilseilee nopeasti pois ja työ joudutaan uusimaan.`,
  },
  {
    question: `Oikeuttaako työnne kotitalousvähennykseen ${cityIn}?`,
    answer: `Kyllä. Kaikki tekemämme huolto- ja maalaustyöt ${cityGenitive} alueella oikeuttavat kotitalousvähennykseen. Voit vähentää <strong>40 % työn osuudesta</strong> henkilökohtaisessa verotuksessasi.`,
  },
];

const ServiceAreaPage = ({ citySlug }: { citySlug: string }) => {
  const cityData = getCityBySlug(citySlug);
  const areaContent = getAreaCityContent(citySlug);
  const neighborhoods = getCityNeighborhoods(citySlug);

  if (!cityData || !areaContent) return <Navigate to="/toiminta-alueet" replace />;

  const cityName = cityData.name;
  const cityIn = cityData.cityIn;
  const cityGenitive = cityData.cityGenitive;
  const hasSubPages = cityHasServicePages(cityData);

  const services = [
    {
      title: "Tiilikaton pinnoitus",
      href: hasSubPages ? `/tiilikaton-pinnoitus-${cityData.slug}` : "/tiilikaton-pinnoitus-pirkanmaa",
      description: "Tiilikaton maalauspinnoitus pidentää katon ikää jopa 15–20 vuotta ja suojaa tiiliä rapautumiselta.",
      warranty: "5v takuu",
      baseName: "kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen",
      Icon: RoofTileIcon,
    },
    {
      title: "Tiilikaton puhdistus",
      href: hasSubPages ? `/katon-puhdistus-${cityData.slug}` : "/katon-puhdistus-pirkanmaa",
      description: "Mekaaninen puhdistus ja sammaleentorjuntakäsittely pitävät katon kunnossa vuosiksi eteenpäin.",
      warranty: "Ilmainen tarkastus",
      baseName: "puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen",
      Icon: RoofCleanIcon,
    },
    {
      title: "Talon maalaus",
      // Maalauksen kaupunkisivu on useammalla paikkakunnalla kuin kattopalvelujen sivut.
      href: maalausCities.some((c) => c.slug === cityData.slug)
        ? `/talon-maalaus-${cityData.slug}`
        : "/talon-maalaus-pirkanmaa",
      description: "Ammattitaitoinen ulkomaalaus laadukkailla materiaaleilla suojaa taloasi säältä ja kosteudelta.",
      warranty: "2v takuu",
      baseName: "vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen",
      Icon: PaintBrushIcon,
    },
  ];

  const trustStats = getTrustStats(cityIn);
  const dynamicFAQ = getAreaFAQ(cityName, cityIn, cityGenitive);
  const shuffledFAQ = [...dynamicFAQ].sort((a, b) => {
    const seedA = (citySlug.length * 7 + a.question.length) % 13;
    const seedB = (citySlug.length * 7 + b.question.length) % 13;
    return seedA - seedB;
  });

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Tiilikaton pinnoitus ja talon maalaus ${cityName}`,
    provider: { "@id": "https://pintanen.fi/#yritys" },
    areaServed: { "@type": "City", name: cityName },
    description: areaContent.alueMetaDesc,
  };

  return (
    <div>
      <SEO
        title={areaContent.alueMetaTitle}
        description={areaContent.alueMetaDesc}
        preloadImage={heroImage}
      />
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      {/* ══════════════════ HERO ══════════════════ */}
      <ServicePageHero
        title=""
        subtitle=""
        backgroundImage={heroImage}
        backgroundSrcSet={getResponsiveSrcSet("ammattilainen-maalaa-talon-ulkoverhousta-pensselilla")}
      >
        <div className="bg-black/45 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto mb-10 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 font-heading">
            Tiilikaton pinnoitus ja talon maalaus{' '}
            <span className="text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">{cityName}</span>
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-3xl mx-auto">
            <strong className="text-primary-foreground">Suojaa kotisi arvokkaimmat rakenteet säänvaihteluilta.</strong> Pintanen tarjoaa ammattimaiset tiilikattojen pinnoitukset, kattojen puhdistukset sekä talojen ulkomaalaukset {cityIn} ja koko Pirkanmaalla. <strong className="text-primary-foreground">Yrittäjät tekevät itse työn.</strong>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#yhteystiedot"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors"
            style={{ backgroundColor: "#38b6ff" }}
          >
            Pyydä maksuton kuntotarkastus
          </a>
          <Link
            to="/hintalaskuri"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            style={{ backgroundColor: "hsla(30, 52%, 90%, 0.15)" }}
          >
            Hintalaskuri
          </Link>
        </div>
      </ServicePageHero>

      {/* ══════════════════ TRUST STATS ══════════════════ */}
      <section className="py-12 bg-background">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {trustStats.map((stat, i) => (
              <motion.div
                key={String(stat.label)}
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

      {/* ══════════════════ LOCAL HOOK / PAIKALLINEN SEO-TEKSTI ══════════════════ */}
      <section className="section-padding bg-card">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-4 font-heading">
              {areaContent.alueLocalHookTitle}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              {areaContent.alueLocalHookText}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ PALVELUSIILOT ══════════════════ */}
      <section className="section-padding bg-secondary">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4">
              Palvelut {cityGenitive} alueella
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tarjoamme laadukkaat maalaus- ja kattopalvelut {cityIn}.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={service.href}
                  className="block rounded-2xl overflow-hidden group relative h-full min-h-[320px]"
                >
                  <ResponsiveImage
                    baseName={service.baseName}
                    alt={`${service.title} ${cityIn}`}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/85 transition-all duration-300" />
                  <div className="relative z-10 flex flex-col justify-end h-full p-6">
                    <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                      <service.Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-sm text-white/80 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                        {service.warranty}
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

      {/* ══════════════════ PALVELEMME KOKO ALUEELLA – oma visuaalinen blokki ══════════════════ */}
      {neighborhoods && (
        <section className="section-padding bg-background">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-accent mb-4 font-heading">
                Palvelemme koko {cityGenitive} alueella
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                Olemme paikallinen kumppanisi koko {neighborhoods.regionGenitive} alueella. Tutuiksi ovat tulleet muun muassa:
              </p>

              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border/50 mb-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Kaupunginosat ja kylät
                  </span>
                </div>
                <p className="text-base md:text-lg text-foreground leading-relaxed flex items-center justify-center flex-wrap gap-x-3 gap-y-2">
                  {neighborhoods.neighborhoods.map((n, idx) => (
                    <span key={n} className="inline-flex items-center gap-3">
                      <span className="font-medium">{n}</span>
                      {idx < neighborhoods.neighborhoods.length - 1 && (
                        <span className="text-accent/60">•</span>
                      )}
                    </span>
                  ))}
                </p>
              </div>

              <Link
                to="/hintalaskuri?palvelu=pinnoitus"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: "hsl(38, 60%, 65%)", color: "hsl(215, 25%, 15%)" }}
              >
                Laske hinta: tiilikaton pinnoitus {cityName}
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      <CityProjects citySlug={citySlug} cityIn={cityIn} />

      {/* ══════════════════ ASIAKASPALAUTTEET – yksi kaupunkikohtainen karuselli ══════════════════ */}
      <TestimonialsMarquee
        title="Mitä asiakkaat sanovat meistä?"
        testimonials={getTestimonialsForCity(citySlug, 4)}
      />



      {/* ══════════════════ KEITÄ ME OLEMME? ══════════════════ */}
      <section className="section-padding bg-secondary">
        <div className="section-container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-accent mb-3 text-center font-heading">
              Keitä me olemme?
            </h2>
            <p className="text-center text-muted-foreground mb-8 italic">Terveisiä meiltä yrittäjiltä</p>

            <div className="flex justify-center gap-6 mb-8">
              <img
                src={eerikImage}
                alt={`Eerik Pitkänen – tiilikaton pinnoitus yrittäjä ${cityIn}`}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-primary/20"
                loading="lazy"
                decoding="async"
              />
              <img
                src={eemilImage}
                alt={`Eemil Pitkänen – talon maalaus yrittäjä ${cityIn}`}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-primary/20"
                loading="lazy"
                decoding="async"
              />
            </div>

            <p className="text-muted-foreground leading-relaxed text-center text-base md:text-lg">
              Hei! Olemme Eerik ja Eemil, Pintasen yrittäjät. Toisin kuin suurissa alan liikkeissä, et ole meillä vain yksi tilausnumero muiden joukossa. <strong className="text-foreground">Hoidamme talojen maalaukset ja tiilikattojen pinnoitukset itse alusta loppuun saakka.</strong> Viiden vuoden kokemuksella ja yli 200 urakan myötä tiedämme, miten kestävät tulokset tehdään.
            </p>
            <p className="mt-4 font-semibold text-foreground text-center">— Eerik & Eemil, Pintanen Oy</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════ YHTEYSTIEDOT ══════════════════ */}
      <ServiceContactSection variant="general" cityIn={cityIn} />

      {/* ══════════════════ FAQ ══════════════════ */}
      <FAQSection
        items={shuffledFAQ}
        title={`Usein kysyttyä maalaus- ja kattotöistä ${cityGenitive} alueella`}
      />

      {/* ══════════════════ TOIMINTA-ALUEET ══════════════════ */}
      <ToimintaAlueetBanner activeCity={citySlug} />
    </div>
  );
};

export default ServiceAreaPage;
