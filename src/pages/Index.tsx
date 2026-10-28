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
import Rytmi from "@/components/Rytmi";


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
    <Rytmi>
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
      <ServiceContactSection variant="general" />
      <ToimintaAlueetBanner />
    </Rytmi>
  );
};

export default Index;
