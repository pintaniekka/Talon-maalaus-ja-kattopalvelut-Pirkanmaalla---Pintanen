import { Suspense } from "react";
import Hero from "@/components/Hero";
import ReviewHighlights from "@/components/ReviewHighlights";
import Services from "@/components/Services";
import MiksiPintanen from "@/components/MiksiPintanen";
import { lazyWithRetry } from "@/lib/lazyWithRetry";
import FAQSection from "@/components/FAQSection";
import KotitalousVahennys from "@/components/KotitalousVahennys";
import ServiceContactSection from "@/components/ServiceContactSection";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import { generalFAQ } from "@/data/faqData";
import SEO from "@/components/SEO";


const ChatPriceCalculator = lazyWithRetry(() => import("@/components/ChatPriceCalculator"));
const Gallery = lazyWithRetry(() => import("@/components/Gallery"));
const SEOTextSection = lazyWithRetry(() => import("@/components/SEOTextSection"));

/**
 * Etusivu. Arvostelut: ReviewHighlights heron alla ja täysi karuselli esimerkkikohteiden alla
 * (Eerik 14.10.2026: karuselli etusivulle, palvelusivuille ja Meistä-sivulle, ei muualle). Palvelut- ja kotitalousvähennys-
 * osioissa on esikatselun vaihtoehdot `?palvelut=a|b|c|d` ja `?vahennys=a|b|c|d`.
 */
const Index = () => {
  return (
    <>
      <SEO />
      <Hero />
      <ReviewHighlights />
      <Services />
      <Suspense fallback={<div className="section-padding" aria-hidden="true" />}>
        <ChatPriceCalculator />
      </Suspense>
      <MiksiPintanen />
      <Suspense fallback={<div className="section-padding" aria-hidden="true" />}>
        <Gallery />
      </Suspense>
      <TestimonialsMarquee title="Mitä asiakkaat sanovat meistä?" />
      <FAQSection items={generalFAQ} />
      <KotitalousVahennys />
      <ServiceContactSection variant="general" />
      <Suspense fallback={<div className="section-padding" aria-hidden="true" />}>
        <SEOTextSection />
      </Suspense>
      <ToimintaAlueetBanner />
    </>
  );
};

export default Index;
