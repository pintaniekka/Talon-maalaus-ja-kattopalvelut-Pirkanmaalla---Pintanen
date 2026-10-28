import { Suspense } from "react";
import Hero from "@/components/Hero";
import ReviewHighlights from "@/components/ReviewHighlights";
import Services from "@/components/Services";
import MiksiPintanen from "@/components/MiksiPintanen";
import { lazyWithRetry } from "@/lib/lazyWithRetry";
import ServiceContactSection from "@/components/ServiceContactSection";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import SEO from "@/components/SEO";


const ChatPriceCalculator = lazyWithRetry(() => import("@/components/ChatPriceCalculator"));
const Gallery = lazyWithRetry(() => import("@/components/Gallery"));

/**
 * Etusivu, vain myyvä (Eerik 25.10.2026: asiakas tulee hausta palvelusivulle, etusivulle vain nimellä).
 * Yöajo 26.10.2026: UKK, kotitalousvähennys ja pitkä SEO-tekstiosio pois; ne ovat palvelu- ja hintasivuilla.
 * Järjestys: hero → palvelut → arvostelunostot → laskuri → kuvat → miksi Pintanen → karuselli → yhteydenotto → alueet.
 * Arvostelut: ReviewHighlights ja karuselli (Eerik 14.10.2026). Palvelut-osiossa on esikatselun vaihtoehdot `?palvelut=a|b|c|d`.
 */
const Index = () => {
  return (
    <>
      <SEO />
      <Hero />
      <Services />
      <ReviewHighlights />
      <Suspense fallback={<div className="section-padding" aria-hidden="true" />}>
        <ChatPriceCalculator />
      </Suspense>
      <Suspense fallback={<div className="section-padding" aria-hidden="true" />}>
        <Gallery />
      </Suspense>
      <MiksiPintanen />
      <TestimonialsMarquee title="Mitä asiakkaat sanovat meistä?" />
      <ServiceContactSection variant="general" tausta="vaalea" />
      <ToimintaAlueetBanner />
    </>
  );
};

export default Index;
