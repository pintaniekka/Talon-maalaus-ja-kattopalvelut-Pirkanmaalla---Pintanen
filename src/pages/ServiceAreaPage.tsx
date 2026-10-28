import { Navigate, Link } from "react-router-dom";
import Rytmi from "@/components/Rytmi";
import { Helmet } from "react-helmet-async";
import { ChevronRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import ServiceContactSection from "@/components/ServiceContactSection";
import SEO from "@/components/SEO";
import ResponsiveImage from "@/components/ResponsiveImage";
import { getStorageUrl } from "@/lib/storage";
import { getCityBySlug, hasPinnoitusPage, hasMaalausPage } from "@/data/cityData";
import { getAreaCityContent } from "@/data/areaCityContent";
import { getCityLocalFacts } from "@/data/cityLocalFacts";
import { areaCitySeo, cityHeroBase, HERO_BASE } from "@/data/seo";
import { GOOGLE_PROFILE_URL, KOTITALOUSVAHENNYS, TAKUU } from "@/data/company";
import { getCityWikipediaUrl } from "@/data/cityWikipedia";
import { PINNOITUS_HINTA, MAALAUS_HINTA } from "@/data/tyovaiheet";


const getAreaFAQ = (citySlug: string, cityIn: string, pinnoitusHref: string, maalausHref: string) => [
  {
    question: `Paljonko tiilikaton pinnoitus tai talon maalaus maksaa ${cityIn}?`,
    answer: `Tiilikaton pinnoitus maksaa meillä yleensä ${PINNOITUS_HINTA}. Talon ulkomaalaus maksaa yleensä ${MAALAUS_HINTA}. Hinta riippuu kohteen koosta, kunnosta ja pohjatöiden määrästä. Katso tarkemmin: <a href="${pinnoitusHref}/">tiilikaton pinnoitus</a> ja <a href="${maalausHref}/">talon maalaus</a>.`,
  },
  {
    question: `Kuinka kauan työ kestää ${cityIn}?`,
    answer: "Tiilikaton pinnoitus kestää yleensä 2–3 työpäivää ja talon maalaus 3–7 työpäivää. Aika riippuu kohteen koosta ja pohjatöiden määrästä.",
  },
  {
    question: `Kuka tekee työn ${cityIn}?`,
    answer: "Eerik pinnoittaa tiilikatot ja Eemil maalaa talot. Teemme työn itse. Annamme työlle kirjallisen takuun: pinnoitukselle 5 vuotta, maalaukselle 2 vuotta.",
  },
  {
    question: "Mitä arviokäynnillä tapahtuu?",
    answer: "Tulemme katsomaan kohteen ilmaiseksi. Katolla tarkistamme katon, aluskatteen ja ympäristön. Seinillä katsomme maalin kunnon ja pohjatöiden määrän. Saat kirjallisen tarjouksen, jossa on kiinteä hinta.",
  },
  {
    question: "Saako työstä kotitalousvähennyksen?",
    answer: `Kyllä. ${KOTITALOUSVAHENNYS} Työn osuus on laskussa eriteltynä.`,
  },
  // Search Console 26.10.2026 (paketti H): haut "tiilikattoremontti <kunta>" ja "peltikaton maalaus <kunta>" tuovat
  // aluesivuille näyttöjä ilman klikkauksia. Vastaukset ovat samat kuin yleisessä UKK:ssa ja pinnoituksen UKK:ssa.
  {
    question: `Tiilikattoremontti vai pinnoitus ${cityIn}?`,
    answer: `Pinnoitus riittää, jos aluskate ja rakenteet ovat kunnossa ja vain tiilen pinta on kulunut. Jos tiilet ovat rikki laajalti tai aluskate vuotaa, katto kannattaa uusia. Pinnoitus maksaa yleensä ${PINNOITUS_HINTA}, kattoremontti yleensä 15 000–30 000 €. Lue lisää: <a href="/artikkelit/pinnoitus-vai-uusi-katto/">pinnoitus vai uusi katto</a>.`,
  },
  {
    question: "Maalaatteko myös peltikattoja?",
    answer: "Pinnoitamme tiilikattoja. Peltikaton maalausta voit kysyä erikseen, niin katsomme kohteen.",
  },
  // Paketti C (26.10.2026): kunnan rakennusjärjestyksen sääntö värin vaihdosta, teksti cityLocalFacts.ts:ssä.
  ...(getCityLocalFacts(citySlug)
    ? [
        {
          question: `Pitääkö katon tai seinän värin vaihdosta ilmoittaa kunnalle ${cityIn}?`,
          answer: getCityLocalFacts(citySlug)!.ukk,
        },
      ]
    : []),
];

/**
 * Aluesivu /maalauspalvelut-{kunta}: kokoava sivu, jonka tehtävä on ohjata palvelusivuille
 * (korjaus 2). Palvelukortit heti heron alle (8.3) valkoisina kortteina ilman liukuväriä
 * (tarkastus 12.10.2026, luku 3); paikallinen teksti lyhyenä ja arkikielellä (S17–S18).
 * Katon puhdistus on loppunut, joten sitä ei tarjota (B6–B7).
 */
const ServiceAreaPage = ({ citySlug }: { citySlug: string }) => {
  const cityData = getCityBySlug(citySlug);
  const areaContent = getAreaCityContent(citySlug);

  if (!cityData || !areaContent) return <Navigate to="/toiminta-alueet/" replace />;

  const cityName = cityData.name;
  const cityIn = cityData.cityIn;
  const seo = areaCitySeo(cityData);
  const heroBase = cityHeroBase(citySlug, "alue");
  const ownPhoto = heroBase !== HERO_BASE.alue;

  const pinnoitusHref = hasPinnoitusPage(citySlug) ? `/tiilikaton-pinnoitus-${citySlug}` : "/tiilikaton-pinnoitus-pirkanmaa";
  const maalausHref = hasMaalausPage(citySlug) ? `/talon-maalaus-${citySlug}` : "/talon-maalaus-pirkanmaa";

  const services = [
    {
      title: `Tiilikaton pinnoitus ${cityName}`,
      href: `${pinnoitusHref}/`,
      description: "Eerik pesee katon, vaihtaa rikkinäiset tiilet uusiin ja maalaa katon ruiskulla kahteen kertaan.",
      price: PINNOITUS_HINTA,
      warranty: TAKUU.pinnoitus,
      duration: "2–3 päivää",
      baseName: "tiilikaton-pinnoitus-kirkkaan-punainen-tiilikatto-jalkeen",
    },
    {
      title: `Talon maalaus ${cityName}`,
      href: `${maalausHref}/`,
      description: "Eemil pesee seinät, kaapii irtoavan maalin, pohjamaalaa paljaat kohdat ja maalaa pintamaalin pensselillä.",
      price: MAALAUS_HINTA,
      warranty: TAKUU.maalaus,
      duration: "3–7 päivää",
      baseName: "talon-maalaus-vaalea-kartanomainen-puutalo-ulkomaalaus-jalkeen",
    },
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Maalausliike ja kattopalvelut ${cityName}`,
    provider: { "@id": "https://pintanen.fi/#yritys", name: "Pintanen Oy", sameAs: [GOOGLE_PROFILE_URL] },
    areaServed: { "@type": "City", name: cityName, sameAs: getCityWikipediaUrl(cityData) },
    description: seo.description,
  };

  const crumbs = [{ name: "Toiminta-alueet", path: "/toiminta-alueet" }, { name: cityName }];

  return (
    <div>
      <Rytmi>
      <SEO {...seo} breadcrumbs={crumbs} />
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <PageHero
        eyebrow={`Maalausliike ja kattopalvelut · ${cityName}`}
        title={
          <>
            Maalausliike ja kattopalvelut <span className="text-accent-ink">{cityName}</span>
          </>
        }
        lead={
          <>
            Pinnoitamme tiilikattoja ja maalaamme taloja {cityIn}. <strong className="text-foreground">Teemme työn itse.</strong> Tiilikaton
            pinnoitus maksaa yleensä {PINNOITUS_HINTA} ja talon maalaus {MAALAUS_HINTA}. Tulemme katsomaan kohteen ilmaiseksi.
          </>
        }
        primary={{ to: "/hintalaskuri/", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/", label: "Pyydä ilmainen arviokäynti" }}
        trust="yleinen"
        image={{ base: heroBase, alt: ownPhoto ? `Kohteemme ${cityIn}` : "Pintasen maalaama puutalo: katto ja seinät maalattu" }}
        // Muiden kuntien sivuilla Tampere mainitaan leipätekstissä enintään kerran (Eerik 27.10.2026): se on paikallisteksti.
        badge={citySlug === "tampere" ? undefined : { title: "Perheyritys", text: "Eerik ja Eemil tekevät työn itse." }}
        breadcrumbs={crumbs}
      />

      {/* ══ PALVELUT HETI HERON ALLE ══ */}
      <section className="pb-16 md:pb-24 osio">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-3">
              {hasPinnoitusPage(citySlug) ? `Palvelumme ${cityIn}` : `Tiilikaton pinnoitus ja talon maalaus ${cityIn}`}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Valitse palvelu, niin näet hinnan, työvaiheet, kuvat ja paikkakunnan tiedot.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.href}
                className="group kortti overflow-hidden flex flex-col transition-transform hover:-translate-y-1 motion-reduce:hover:translate-y-0 transition-shadow"
              >
                <ResponsiveImage
                  baseName={service.baseName}
                  alt=""
                  className="w-full aspect-[4/3] object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                  width={1200}
                  height={900}
                />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-foreground font-heading mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-5 flex-1">{service.description}</p>
                  <dl className="grid grid-cols-3 gap-3 text-sm mb-5">
                    <div>
                      <dt className="text-muted-foreground">Hinta yleensä</dt>
                      <dd className="font-semibold text-foreground">{service.price}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Takuu</dt>
                      <dd className="font-semibold text-foreground">{service.warranty}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground">Kesto</dt>
                      <dd className="font-semibold text-foreground">{service.duration}</dd>
                    </div>
                  </dl>
                  <span className="inline-flex items-center gap-1 font-semibold text-accent-ink group-hover:underline">
                    Lue lisää
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PAIKALLINEN TEKSTI ══ */}
      <section className="section-padding osio">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">{areaContent.alueLocalHookTitle}</h2>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{areaContent.alueLocalHookText}</p>
          </div>
        </div>
      </section>

      <ServiceContactSection variant="general" cityIn={cityIn} />

      <ToimintaAlueetBanner activeCity={citySlug} />
      </Rytmi>
    </div>
  );
};

export default ServiceAreaPage;
