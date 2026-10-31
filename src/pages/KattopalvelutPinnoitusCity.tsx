import { useParams, Navigate } from "react-router-dom";
import Rytmi from "@/components/Rytmi";
import ArvosteluNosto from "@/components/ArvosteluNosto";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import ProcessList from "@/components/ProcessList";
import CityProjects from "@/components/CityProjects";
import CityMap from "@/components/CityMap";
import Kaupunginosat from "@/components/Kaupunginosat";
import { hasKuntakartta } from "@/data/kartat";
import CityHousingFacts from "@/components/CityHousingFacts";
import PinnoitusVarit from "@/components/pinnoitus/PinnoitusVarit";
import NaapuriKunnat from "@/components/NaapuriKunnat";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import PinnoitusEntrepreneur from "@/components/pinnoitus/PinnoitusEntrepreneur";
import PinnoitusWhyNow from "@/components/pinnoitus/PinnoitusWhyNow";
import PinnoitusPricingCards from "@/components/pinnoitus/PinnoitusPricingCards";
import MiksiValitaPintanen from "@/components/MiksiValitaPintanen";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import SEO from "@/components/SEO";
import ReviewsTeaser from "@/components/ReviewsTeaser";
import ServiceSchema from "@/components/ServiceSchema";
import ToimintaKutsu from "@/components/ToimintaKutsu";
import { KayntiPalkki, LaskuriPalkki } from "@/components/KutsuPalkit";
import { getCityFaq } from "@/data/cityFaq";
import { pinnoitusCitySeo } from "@/data/seo";
import { cityHeroBase } from "@/data/kaupunkiHero";
import { getCityBySlug, hasPinnoitusPage } from "@/data/cityData";
import { getCityWikipediaUrl } from "@/data/cityWikipedia";
import { pinnoitusPrices } from "@/data/prices";
import { pinnoitusLyhyesti, pinnoitusTyovaiheet } from "@/data/tyovaiheet";
import { getTestimonialsByCity } from "@/data/testimonialsData";

/**
 * Tiilikaton pinnoituksen kaupunkisivu (SEO-suunnitelma 25.10.2026, vaihe 1). Järjestys: hero → Lyhyesti →
 * paikallinen teksti (lyhyt erottaja) ja kartta → miksi ajoissa + merkit → hintakortit katon koon mukaan
 * (yöajo 26.10.2026: "paljonko maksaa" on asiakasviestien yleisin kysymys, joten hinta heti syyn jälkeen) →
 * pesu ja pinnoitus työvaiheina → kohteet → miksi Pintanen → talokanta → lyhyt värilohko → yrittäjä → FAQ →
 * arvostelut → yhteydenotto → naapurikunnat (oma kevyt palkki) → Toiminta-alueet. Eki 31.10.2026: pois
 * rinnakkaissanalohko (samaa työtä), "Mitä hintaan kuuluu" -lohko ja pitkä värin vaihto (korvattu PinnoitusVarit).
 */
const KattopalvelutPinnoitusCity = ({ citySlug: propSlug }: { citySlug?: string }) => {
  const { city: paramCity } = useParams<{ city: string }>();
  const city = propSlug || paramCity;
  const cityData = city ? getCityBySlug(city) : undefined;
  const kartta = hasKuntakartta(propSlug ?? "");

  if (!cityData || !hasPinnoitusPage(cityData.slug)) return <Navigate to="/tiilikaton-pinnoitus-pirkanmaa/" replace />;

  const seo = pinnoitusCitySeo(cityData);
  const crumbs = [{ name: "Tiilikaton pinnoitus", path: "/tiilikaton-pinnoitus-pirkanmaa" }, { name: cityData.name }];
  const heroBase = cityHeroBase(cityData.slug, "pinnoitus");
  const ownPhoto = heroBase !== "tiilikaton-pinnoitus-kirkkaan-punainen-tiilikatto-jalkeen";

  return (
    <div>
      <Rytmi>
      <SEO {...seo} breadcrumbs={crumbs} />
      <ServiceSchema name="Tiilikaton pinnoitus" alternateNames={["Katon pinnoitus", "Tiilikaton maalaus", "Kattomaalaus", "Tiilikaton pesu ja pinnoitus"]} area={cityData.name} areaSameAs={getCityWikipediaUrl(cityData)} description={seo.description} priceRange={pinnoitusPrices.general} />

      <PageHero
        eyebrow={`Katon maalaus · ${cityData.name}`}
        title={
          <>
            Tiilikaton pinnoitus <span className="text-accent-ink">{cityData.name}</span>
          </>
        }
        lead={
          <>
            Pinnoitamme tiilikattoja {cityData.cityIn}. Katto pestään, rikkinäiset tiilet vaihdetaan ja katto maalataan kahteen kertaan Nowocoatin
            kattomaalilla. Pinnoitettu katto kestää jopa 15 vuotta pidempään. Tiilikaton pinnoitus ja katon maalaus tarkoittavat samaa työtä.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
        trust="pinnoitus"
        image={{
          base: heroBase,
          alt: ownPhoto ? `Pinnoittamamme tiilikatto ${cityData.cityIn}` : "Kirkkaan punainen tiilikatto pinnoituksen jälkeen",
        }}
        badge={{ title: "Eerik tekee työn", text: "Pinnoittaa katon itse ja vastaa jäljestä." }}
        breadcrumbs={crumbs}
      />

      <Lyhyesti content={pinnoitusLyhyesti} />

      {cityData.pinnoitusLocalHookTitle && cityData.pinnoitusLocalHookText && (
        <section className="section-padding osio">
          <div className="section-container">
            <div className={`mx-auto ${kartta ? "max-w-5xl grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center" : "max-w-3xl"}`}>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">{cityData.pinnoitusLocalHookTitle}</h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{cityData.pinnoitusLocalHookText}</p>
                <Kaupunginosat slug={cityData.slug} cityGenitive={cityData.cityGenitive} service="pinnoitus" />
              </div>
              {kartta && <CityMap slug={cityData.slug} name={cityData.name} />}
            </div>
          </div>
        </section>
      )}

      <PinnoitusWhyNow cityIn={cityData.cityIn} />
      <PinnoitusPricingCards cityName={cityData.name} cityIn={cityData.cityIn} otsikko={`Katon maalaus ja tiilikaton pinnoitus hinta ${cityData.name}`} />

      <ProcessList
        title={`Tiilikaton pesu ja pinnoitus ${cityData.cityIn}: näin työ etenee`}
        intro="Peruskohteen katto valmistuu 2–3 työpäivässä. Pesun ja maalauksen välissä katto saa kuivua."
        steps={pinnoitusTyovaiheet}
        cta={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
      />

      {/* Arvostelunosto: sijoitus ja valinta src/data/arvostelusijoitus.ts */}
      <ArvosteluNosto polku={`/tiilikaton-pinnoitus-${cityData.slug}`} />

      <CityProjects citySlug={cityData.slug} cityIn={cityData.cityIn} service="pinnoitus" featureFirst />
      <ToimintaKutsu palvelu="pinnoitus" nappi="laskuri" n={0} />
      <MiksiValitaPintanen service="pinnoitus" cityIn={cityData.cityIn} />
      <CityHousingFacts citySlug={cityData.slug} cityIn={cityData.cityIn} service="pinnoitus" hideMap={kartta} />
      <KayntiPalkki palvelu="pinnoitus" />
      <PinnoitusVarit cityName={cityData.name} citySlug={cityData.slug} />
      <PinnoitusEntrepreneur cityIn={cityData.cityIn} />
      <LaskuriPalkki palvelu="pinnoitus" />

      <FAQSection
        items={getCityFaq(cityData, "pinnoitus")}
        title={`Usein kysyttyä tiilikaton pinnoituksesta ${cityData.cityIn}`}
        lisaa={{ to: "/tiilikaton-pinnoitus-pirkanmaa/#ukk", label: "Kaikki kysymykset tiilikaton pinnoituksesta" }}
      />
      {getTestimonialsByCity(cityData.slug, "katto").length === 0 && <ReviewsTeaser citySlug={cityData.slug} category="katto" />}
      <ServiceContactSection variant="katto" cityName={cityData.name} cityGenitive={cityData.cityGenitive} />
      <NaapuriKunnat citySlug={cityData.slug} service="pinnoitus" />
      <ToimintaAlueetBanner activeCity={cityData.slug} service="pinnoitus" />
      </Rytmi>
    </div>
  );
};

export default KattopalvelutPinnoitusCity;
