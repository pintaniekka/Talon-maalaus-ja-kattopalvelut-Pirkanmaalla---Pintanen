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
import { generalFAQ } from "@/data/faqData";
import SEO from "@/components/SEO";


const ChatPriceCalculator = lazyWithRetry(() => import("@/components/ChatPriceCalculator"));
const Gallery = lazyWithRetry(() => import("@/components/Gallery"));
const SEOTextSection = lazyWithRetry(() => import("@/components/SEOTextSection"));

const Index = () => {
  return (
    <>
      <SEO />
      {/* Arvostelut yhdessä osiossa (ReviewHighlights); karuselli poistettu etusivulta (8.3). */}
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
