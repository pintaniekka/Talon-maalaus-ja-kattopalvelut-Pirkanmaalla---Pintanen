import { Navigate } from "react-router-dom";
import Rytmi from "@/components/Rytmi";
import ArvosteluNosto from "@/components/ArvosteluNosto";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import ProcessList from "@/components/ProcessList";
import CityMap from "@/components/CityMap";
import Kaupunginosat from "@/components/Kaupunginosat";
import CityProjects from "@/components/CityProjects";
import CityHousingFacts from "@/components/CityHousingFacts";
import MaalausVarit from "@/components/maalaus/MaalausVarit";
import NaapuriKunnat from "@/components/NaapuriKunnat";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import MiksiValitaPintanen from "@/components/MiksiValitaPintanen";
import { MaalausCitySigns } from "@/components/maalaus/MaalausCitySections";
import MaalausPricingCards from "@/components/maalaus/MaalausPricingCards";
import MaalausEntrepreneur from "@/components/maalaus/MaalausEntrepreneur";
import FAQSection from "@/components/FAQSection";
import ServiceContactSection from "@/components/ServiceContactSection";
import SEO from "@/components/SEO";
import ReviewsTeaser from "@/components/ReviewsTeaser";
import ServiceSchema from "@/components/ServiceSchema";
import ToimintaKutsu from "@/components/ToimintaKutsu";
import { KayntiPalkki, LaskuriPalkki } from "@/components/KutsuPalkit";
import { maalausCitySeo, HERO_BASE } from "@/data/seo";
import { cityHeroBase } from "@/data/kaupunkiHero";
import { getCityBySlug } from "@/data/cityData";
import { getCityWikipediaUrl } from "@/data/cityWikipedia";
import { hasKuntakartta } from "@/data/kartat";
import { getCityFaq } from "@/data/cityFaq";
import { maalausPrices } from "@/data/prices";
import { maalausLyhyesti, maalausTyovaiheet } from "@/data/tyovaiheet";
import { getTestimonialsByCity } from "@/data/testimonialsData";

/**
 * Talon maalauksen kaupunkisivu (SEO-suunnitelma 25.10.2026, vaihe 2). Sama runko kuin pinnoituksen
 * kaupunkisivulla: hero → Lyhyesti → paikallisosio ja kartta → merkit → hintakortit → työvaiheet →
 * kohteet → miksi Pintanen → talokanta → Eemil → UKK →
 * yhteydenotto → naapurikunnat.
 */
const TalonMaalausCity = ({ citySlug }: { citySlug: string }) => {
  const cityData = getCityBySlug(citySlug);

  if (!cityData || !cityData.maalausLocalHookTitle) {
    return <Navigate to="/talon-maalaus-pirkanmaa/" replace />;
  }

  const cityName = cityData.name;
  const seo = maalausCitySeo(cityData);
  const crumbs = [{ name: "Talon maalaus", path: "/talon-maalaus-pirkanmaa" }, { name: cityName }];
  const heroBase = cityHeroBase(cityData.slug, "maalaus");
  const ownPhoto = heroBase !== HERO_BASE.maalaus;
  const kartta = hasKuntakartta(cityData.slug);

  return (
    <div>
      <Rytmi>
      <SEO {...seo} breadcrumbs={crumbs} />
      <ServiceSchema
        name="Talon ulkomaalaus"
        alternateNames={["Talon maalaus", "Julkisivumaalaus", "Huoltomaalaus", "Puutalon maalaus"]}
        area={cityName}
        areaSameAs={getCityWikipediaUrl(cityData)}
        description={seo.description}
        priceRange={maalausPrices.general}
      />

      <PageHero
        eyebrow={`Julkisivumaalaus · ${cityName}`}
        title={
          <>
            Talon maalaus <span className="text-accent-ink">{cityName}</span>
          </>
        }
        lead={
          <>
            Maalaamme talojen julkisivut {cityData.cityIn}. Seinät pestään homepesuaineella, irtoava maali kaavitaan, paljaat kohdat
            pohjamaalataan ja pintamaali maalataan pensselillä. Talon maalaus ja julkisivumaalaus tarkoittavat samaa työtä.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=maalaus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=maalaus", label: "Pyydä ilmainen arviokäynti" }}
        trust="maalaus"
        image={{ base: heroBase, alt: ownPhoto ? `Maalaamamme talo ${cityData.cityIn}` : "Tummansininen puutalo ulkomaalauksen jälkeen" }}
        badge={{ title: "Eemil maalaa", text: "Maalaa seinät maalausparin kanssa ja vastaa jäljestä." }}
        breadcrumbs={crumbs}
      />

      <Lyhyesti content={maalausLyhyesti} />

      <section className="section-padding osio">
        <div className="section-container">
          <div className={`mx-auto ${kartta ? "max-w-5xl grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center" : "max-w-3xl"}`}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-accent-ink mb-4 font-heading">{cityData.maalausLocalHookTitle}</h2>
              <p
                className="text-muted-foreground leading-relaxed text-base md:text-lg [&_strong]:text-foreground"
                dangerouslySetInnerHTML={{ __html: cityData.maalausLocalHookText || "" }}
              />
              <Kaupunginosat slug={cityData.slug} cityGenitive={cityData.cityGenitive} service="maalaus" />
            </div>
            {kartta && <CityMap slug={cityData.slug} name={cityData.name} />}
          </div>
        </div>
      </section>

      <MaalausCitySigns cityName={cityName} cityIn={cityData.cityIn} />
      <MaalausPricingCards cityName={cityName} cityIn={cityData.cityIn} otsikko={`Julkisivumaalaus ja talon maalaus hinta ${cityName}`} hintasivulle />

      <ProcessList
        title={`Näin talon maalaus etenee ${cityData.cityIn}`}
        intro="Omakotitalon ulkomaalaus kestää 3–7 päivää. Aika riippuu talon koosta ja pohjatöiden määrästä."
        steps={maalausTyovaiheet}
        cta={{ to: "/ilmainen-julkisivun-kuntoarvio/", label: "Näin ilmainen arviokäynti toimii" }}
      />

      {/* Arvostelunosto: sijoitus ja valinta src/data/arvostelusijoitus.ts */}
      <ArvosteluNosto polku={`/talon-maalaus-${cityData.slug}`} />

      <CityProjects citySlug={cityData.slug} cityIn={cityData.cityIn} service="maalaus" featureFirst />
      <ToimintaKutsu palvelu="maalaus" nappi="laskuri" n={0} />
      <MiksiValitaPintanen service="maalaus" cityIn={cityData.cityIn} />
      <KayntiPalkki palvelu="maalaus" />
      <CityHousingFacts citySlug={cityData.slug} cityIn={cityData.cityIn} service="maalaus" hideMap={kartta} />
      <MaalausVarit cityName={cityName} citySlug={cityData.slug} />
      <ToimintaKutsu palvelu="maalaus" nappi="kaynti" n={1} />
      <MaalausEntrepreneur cityIn={cityData.cityIn} />
      <LaskuriPalkki palvelu="maalaus" />
      <FAQSection
        items={getCityFaq(cityData, "maalaus")}
        lisaa={{ to: "/talon-maalaus-pirkanmaa/#ukk", label: "Kaikki kysymykset talon maalauksesta" }}
        title={`Usein kysyttyä talon maalauksesta ${cityData.cityIn}`}
      />
      {getTestimonialsByCity(cityData.slug, "seina").length === 0 && <ReviewsTeaser citySlug={cityData.slug} category="seina" />}
      <ServiceContactSection variant="maalaus" cityName={cityData.name} cityGenitive={cityData.cityGenitive} />
      <NaapuriKunnat citySlug={cityData.slug} service="maalaus" />
      <ToimintaAlueetBanner activeCity={cityData.slug} service="maalaus" />
      </Rytmi>
    </div>
  );
};

export default TalonMaalausCity;
