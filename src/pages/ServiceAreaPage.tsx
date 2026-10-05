import { Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import { MapPin } from "@/components/icons/BrandIcons";
import PageHero from "@/components/PageHero";
import CityProjects from "@/components/CityProjects";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import FAQSection from "@/components/FAQSection";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import ServiceContactSection from "@/components/ServiceContactSection";
import SEO from "@/components/SEO";
import ResponsiveImage from "@/components/ResponsiveImage";
import { RoofTileIcon, RoofCleanIcon, PaintBrushIcon } from "@/components/ServiceIcons";
import { getStorageUrl } from "@/lib/storage";
import { getCityBySlug, hasPinnoitusPage, hasPuhdistusPage, hasMaalausPage } from "@/data/cityData";
import { getAreaCityContent } from "@/data/areaCityContent";
import { getCityNeighborhoods } from "@/data/cityNeighborhoods";
import { getTestimonialsForCity } from "@/data/testimonialsData";
import { areaCitySeo, cityHeroBase, HERO_BASE } from "@/data/seo";
import { KOTITALOUSVAHENNYS, LUVUT } from "@/data/company";
import { PINNOITUS_HINTA, MAALAUS_HINTA } from "@/data/tyovaiheet";

const eerikImage = getStorageUrl("Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp");
const eemilImage = getStorageUrl("Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp");

const getAreaFAQ = (cityIn: string, pinnoitusHref: string, maalausHref: string) => [
  {
    question: `Paljonko tiilikaton pinnoitus tai talon maalaus maksaa ${cityIn}?`,
    answer: `Tiilikaton pinnoitus maksaa meillä yleensä ${PINNOITUS_HINTA}. Talon ulkomaalaus maksaa yleensä ${MAALAUS_HINTA}. Hinta riippuu kohteen koosta, kunnosta ja pohjatöiden määrästä. Katso tarkemmin: <a href="${pinnoitusHref}/">tiilikaton pinnoitus</a> ja <a href="${maalausHref}/">talon maalaus</a>.`,
  },
  {
    question: `Kuinka kauan työ kestää ${cityIn}?`,
    answer: "Tiilikaton pinnoitus kestää yleensä 2–4 työpäivää ja talon maalaus 3–7 työpäivää. Aika riippuu kohteen koosta ja pohjatöiden määrästä.",
  },
  {
    question: `Kuka tekee työn ${cityIn}?`,
    answer: "Yrittäjät itse. Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Emme käytä alihankkijoita. Siksi tiedät aina, kuka pihallasi on, ja annamme työlle kirjallisen takuun: pinnoitukselle 5 vuotta, maalaukselle 2 vuotta.",
  },
  {
    question: "Mitä arviokäynnillä tapahtuu?",
    answer: "Tulemme katsomaan kohteen ilmaiseksi. Katolla tarkistamme tiilet, aluskatteen ja läpiviennit. Seinillä katsomme maalin kunnon ja pohjatöiden määrän. Saat kirjallisen tarjouksen, jossa on kiinteä hinta.",
  },
  {
    question: "Saako työstä kotitalousvähennyksen?",
    answer: `Kyllä. ${KOTITALOUSVAHENNYS} Erittelemme työn osuuden laskuun.`,
  },
];

/**
 * Aluesivu /maalauspalvelut-{kunta}: kokoava sivu, jonka tehtävä on ohjata palvelusivuille
 * (korjaus 2). Palvelukortit heti heron alle (8.3); paikallinen teksti lyhyenä ja arkikielellä (S17–S18).
 */
const ServiceAreaPage = ({ citySlug }: { citySlug: string }) => {
  const cityData = getCityBySlug(citySlug);
  const areaContent = getAreaCityContent(citySlug);
  const neighborhoods = getCityNeighborhoods(citySlug);

  if (!cityData || !areaContent) return <Navigate to="/toiminta-alueet/" replace />;

  const cityName = cityData.name;
  const cityIn = cityData.cityIn;
  const cityGenitive = cityData.cityGenitive;
  const seo = areaCitySeo(cityData);
  const heroBase = cityHeroBase(citySlug, "alue");
  const ownPhoto = heroBase !== HERO_BASE.alue;

  const pinnoitusHref = hasPinnoitusPage(citySlug) ? `/tiilikaton-pinnoitus-${citySlug}` : "/tiilikaton-pinnoitus-pirkanmaa";
  const maalausHref = hasMaalausPage(citySlug) ? `/talon-maalaus-${citySlug}` : "/talon-maalaus-pirkanmaa";

  const services = [
    {
      title: `Tiilikaton pinnoitus ${cityName}`,
      href: `${pinnoitusHref}/`,
      description: `Pesemme katon painepesulla ja maalaamme sen ruiskulla kahteen kertaan. Katto saa jopa 10–15 vuotta lisää ikää. Hinta yleensä ${PINNOITUS_HINTA}.`,
      warranty: "5 v takuu",
      baseName: "kirkkaan-punainen-tiilikatto-pinnoituksen-jalkeen",
      Icon: RoofTileIcon,
    },
    {
      title: `Talon maalaus ${cityName}`,
      href: `${maalausHref}/`,
      description: `Homepesu, kaavinta, pohjamaali paljaisiin kohtiin ja pintamaali pensselillä. Hinta yleensä ${MAALAUS_HINTA}.`,
      warranty: "2 v takuu",
      baseName: "vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen",
      Icon: PaintBrushIcon,
    },
    ...(hasPuhdistusPage(citySlug)
      ? [
          {
            title: `Tiilikaton puhdistus ${cityName}`,
            href: `/katon-puhdistus-${citySlug}/`,
            description: "Sammal ja lika poistetaan mekaanisesti, ja katto saa kasvustontorjunta-aineen.",
            warranty: "Ilmainen tarkastus",
            baseName: "puhdas-tiilikatto-mekaanisen-puhdistuksen-jalkeen",
            Icon: RoofCleanIcon,
          },
        ]
      : []),
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Maalaus- ja kattopalvelut ${cityName}`,
    provider: { "@id": "https://pintanen.fi/#yritys" },
    areaServed: { "@type": "City", name: cityName },
    description: seo.description,
  };

  const crumbs = [{ name: "Toiminta-alueet", path: "/toiminta-alueet" }, { name: cityName }];

  return (
    <div>
      <SEO {...seo} breadcrumbs={crumbs} />
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <PageHero
        eyebrow={`Maalaus- ja kattopalvelut · ${cityName}`}
        title={
          <>
            Maalaus- ja kattopalvelut <span className="text-accent-ink">{cityName}</span>
          </>
        }
        lead={
          <>
            Pinnoitamme tiilikattoja ja maalaamme taloja {cityIn}. <strong className="text-foreground">Teemme työn itse.</strong> Tulemme
            katsomaan kohteen ilmaiseksi.
          </>
        }
        primary={{ to: "/tarjouspyynto/", label: "Pyydä ilmainen arviokäynti" }}
        secondary={{ to: "/hintalaskuri/", label: "Laske hinta" }}
        trust="yleinen"
        image={{ base: heroBase, alt: ownPhoto ? `Kohteemme ${cityIn}` : "Pintasen maalaama puutalo: katto ja seinät maalattu" }}
        breadcrumbs={crumbs}
      />

      {/* ══ PALVELUT HETI HERON ALLE ══ */}
      <section className="pb-16 md:pb-24 bg-background">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-3">Palvelut {cityIn}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Valitse palvelu, niin näet hinnan, työvaiheet ja paikkakunnan tiedot.</p>
          </div>

          <div className={`grid gap-6 max-w-5xl mx-auto ${services.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
            {services.map((service) => (
              <Link key={service.title} to={service.href} className="block rounded-2xl overflow-hidden group relative h-full min-h-[320px]">
                <ResponsiveImage
                  baseName={service.baseName}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  width={1200}
                  height={1600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/20 group-hover:from-black/90 transition-all duration-300" />
                <div className="relative z-10 flex flex-col justify-end h-full p-6">
                  <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                    <service.Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-white/85 mb-4">{service.description}</p>
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
            ))}
          </div>
        </div>
      </section>

      {/* ══ PAIKALLINEN TEKSTI ══ */}
      <section className="section-padding bg-card">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">{areaContent.alueLocalHookTitle}</h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{areaContent.alueLocalHookText}</p>
          </div>
        </div>
      </section>

      {neighborhoods && (
        <section className="section-padding bg-background">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 font-heading">Palvelemme koko {cityGenitive} alueella</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
                Tulemme koko kuntaan, esimerkiksi näihin kyliin ja kaupunginosiin:
              </p>

              <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border/50 mb-10">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-accent-ink flex-shrink-0" />
                  <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Kaupunginosat ja kylät</span>
                </div>
                <p className="text-base md:text-lg text-foreground leading-relaxed flex items-center justify-center flex-wrap gap-x-3 gap-y-2">
                  {neighborhoods.neighborhoods.map((n, idx) => (
                    <span key={n} className="inline-flex items-center gap-3">
                      <span className="font-medium">{n}</span>
                      {idx < neighborhoods.neighborhoods.length - 1 && <span className="text-accent/60">•</span>}
                    </span>
                  ))}
                </p>
              </div>

              <Link
                to={`${pinnoitusHref}/`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: "hsl(38, 60%, 65%)", color: "hsl(215, 25%, 15%)" }}
              >
                Tiilikaton pinnoitus {cityName}
              </Link>
            </div>
          </div>
        </section>
      )}

      <CityProjects citySlug={citySlug} cityIn={cityIn} />

      <TestimonialsMarquee title="Mitä asiakkaat sanovat meistä?" testimonials={getTestimonialsForCity(citySlug, 4)} />

      {/* ══ KEITÄ ME OLEMME? ══ */}
      <section className="section-padding bg-secondary">
        <div className="section-container max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-3 text-center font-heading">Keitä me olemme?</h2>
          <p className="text-center text-muted-foreground mb-8 italic">Terveisiä meiltä yrittäjiltä</p>

          <div className="flex justify-center gap-6 mb-8">
            <img src={eerikImage} alt="Eerik Pitkänen" width={144} height={144} className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-primary/20" loading="lazy" decoding="async" />
            <img src={eemilImage} alt="Eemil Pitkänen" width={144} height={144} className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 border-primary/20" loading="lazy" decoding="async" />
          </div>

          <p className="text-muted-foreground leading-relaxed text-center text-base md:text-lg">
            Hei! Olemme Eerik ja Eemil, Pintasen yrittäjät. <strong className="text-foreground">Eerik pinnoittaa tiilikatot ja Eemil maalaa talot</strong>{" "}
            itse alusta loppuun. Takana on {LUVUT.kokemusVuotta} vuotta työtä, {LUVUT.pinnoitetutKatot} pinnoitettua kattoa ja {LUVUT.maalatutTalot} maalattua
            taloa. Tiedät aina, kuka pihallasi on.
          </p>
          <p className="mt-4 font-semibold text-foreground text-center">— Eerik & Eemil, Pintanen Oy</p>
        </div>
      </section>

      <FAQSection items={getAreaFAQ(cityIn, pinnoitusHref, maalausHref)} title={`Usein kysyttyä maalaus- ja kattotöistä ${cityIn}`} />

      <ServiceContactSection variant="general" cityIn={cityIn} />

      <ToimintaAlueetBanner activeCity={citySlug} />
    </div>
  );
};

export default ServiceAreaPage;
