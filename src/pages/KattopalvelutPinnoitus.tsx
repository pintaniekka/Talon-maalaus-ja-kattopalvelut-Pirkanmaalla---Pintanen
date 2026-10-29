import { Link } from "react-router-dom";
import Rytmi from "@/components/Rytmi";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import ProcessList from "@/components/ProcessList";
import PinnoitusComparison from "@/components/pinnoitus/PinnoitusComparison";
import PinnoitusPricingCards from "@/components/pinnoitus/PinnoitusPricingCards";
import PinnoitusEntrepreneur from "@/components/pinnoitus/PinnoitusEntrepreneur";
import PinnoitusWhyNow from "@/components/pinnoitus/PinnoitusWhyNow";
import PinnoitusSamaTyo from "@/components/pinnoitus/PinnoitusSamaTyo";
import HarjatiivisteNosto from "@/components/pinnoitus/HarjatiivisteNosto";
import MiksiValitaPintanen from "@/components/MiksiValitaPintanen";
import Vaarinymmarrykset from "@/components/Vaarinymmarrykset";
import VarinVaihto from "@/components/VarinVaihto";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import FAQSection from "@/components/FAQSection";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import RelatedArticles from "@/components/RelatedArticles";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import { roofTestimonials } from "@/data/testimonialsData";
import { pinnoitusFAQ } from "@/data/faqData";
import { HERO_BASE, staticSeo } from "@/data/seo";
import { pinnoitusPrices } from "@/data/prices";
import { pinnoitusTyovaiheet, pinnoitusLyhyesti, PINNOITUS_HINTA } from "@/data/tyovaiheet";


const KattopalvelutPinnoitus = () => {
  const seo = staticSeo["/tiilikaton-pinnoitus-pirkanmaa"];
  return (
    <div>
      <Rytmi>
      <SEO {...seo} breadcrumbs={[{ name: "Tiilikaton pinnoitus" }]} />
      <ServiceSchema
        name="Tiilikaton pinnoitus"
        alternateNames={["Katon pinnoitus", "Tiilikaton maalaus", "Kattomaalaus", "Tiilikaton pesu ja pinnoitus"]}
        area="Pirkanmaa"
        areaType="AdministrativeArea"
        description={seo.description}
        priceRange={pinnoitusPrices.general}
      />

      <PageHero
        eyebrow="Tiilikaton pinnoitus · Pirkanmaa"
        title={
          <>
            Tiilikaton pinnoitus <span className="text-accent-ink">Pirkanmaalla</span>
          </>
        }
        lead={
          <>
            Kulunutta tiilikattoa ei yleensä tarvitse uusia. Pinnoitettu katto kestää jopa 15 vuotta pidempään. Hinta on yleensä{" "}
            <strong className="text-foreground">{PINNOITUS_HINTA}</strong>, työ kestää 2–3 päivää ja takuu on 5 vuotta. Kuntotarkastus on ilmainen.
          </>
        }
        primary={{ to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
        trust="pinnoitus"
        image={{ base: HERO_BASE.pinnoitus, alt: "Kirkkaan punainen tiilikatto pinnoituksen jälkeen" }}
        badge={{ title: "Eerik tekee työn", text: "Pinnoittaa katon itse ja vastaa jäljestä." }}
        breadcrumbs={[{ name: "Tiilikaton pinnoitus" }]}
      />

      <Lyhyesti content={pinnoitusLyhyesti} />

      <PinnoitusWhyNow />

      <ProcessList
        title="Näin tiilikaton pinnoitus etenee"
        intro="Peruskohteen katto valmistuu 2–3 työpäivässä. Pesun ja maalauksen välissä katto saa kuivua."
        steps={pinnoitusTyovaiheet}
        cta={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
      />

      <PinnoitusSamaTyo />
      <HarjatiivisteNosto />
      <Vaarinymmarrykset service="pinnoitus" />
      <VarinVaihto service="pinnoitus" />

      <PinnoitusComparison />
      <PinnoitusPricingCards cityName="Pirkanmaa" cityIn="Pirkanmaalla" />
      <MiksiValitaPintanen service="pinnoitus" />
      <KotitalousVahennys />
      <PinnoitusEntrepreneur />

      <TestimonialsMarquee testimonials={roofTestimonials} title="Mitä kattoasiakkaat sanovat meistä?" />
      <RelatedArticles categories={["katto", "raha"]} />
      <FAQSection items={pinnoitusFAQ} title="Usein kysyttyä tiilikaton pinnoituksesta" />
      <ServiceContactSection variant="katto" />
      <ToimintaAlueetBanner service="pinnoitus" />
      </Rytmi>
    </div>
  );
};

export default KattopalvelutPinnoitus;
