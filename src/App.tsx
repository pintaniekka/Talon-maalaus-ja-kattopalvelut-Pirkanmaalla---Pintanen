import { Suspense } from "react";
import { LazyMotion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import { allCities, maalausCities, pinnoitusCities } from "./data/cityData";
import { legacyRedirects } from "./data/routes";
import { lazyWithRetry } from "./lib/lazyWithRetry";

// Animaatiokirjaston ominaisuudet ladataan omana pakettina vasta käynnistyksen jälkeen
// (src/lib/motionFeatures.ts). Komponentit käyttävät m.div-elementtejä.
const loadMotionFeatures = () => import("./lib/motionFeatures").then((mod) => mod.default);

// Lazy-loaded subpages
const KattopalvelutPinnoitus = lazyWithRetry(() => import("./pages/KattopalvelutPinnoitus"));
const KattopalvelutPinnoitusCity = lazyWithRetry(() => import("./pages/KattopalvelutPinnoitusCity"));
const TalonMaalaus = lazyWithRetry(() => import("./pages/TalonMaalaus"));
const TalonMaalausCity = lazyWithRetry(() => import("./pages/TalonMaalausCity"));
const ToimintaAlueet = lazyWithRetry(() => import("./pages/ToimintaAlueet"));
const ServiceAreaPage = lazyWithRetry(() => import("./pages/ServiceAreaPage"));
const Referenssit = lazyWithRetry(() => import("./pages/Referenssit"));
const Kokemuksia = lazyWithRetry(() => import("./pages/Kokemuksia"));
const Hintalaskuri = lazyWithRetry(() => import("./pages/Hintalaskuri"));
const Tarjouspyynto = lazyWithRetry(() => import("./pages/Tarjouspyynto"));
const HinnatTiilikalonPinnoitus = lazyWithRetry(() => import("./pages/HinnatTiilikalonPinnoitus"));
const HinnatTalonMaalaus = lazyWithRetry(() => import("./pages/HinnatTalonMaalaus"));
const IlmainenKuntotarkastus = lazyWithRetry(() => import("./pages/IlmainenKuntotarkastus"));
const Kotitalousvahennys = lazyWithRetry(() => import("./pages/Kotitalousvahennys"));
const Meista = lazyWithRetry(() => import("./pages/Meista"));
const Yhteystiedot = lazyWithRetry(() => import("./pages/Yhteystiedot"));
const Artikkelit = lazyWithRetry(() => import("./pages/Artikkelit"));
const Artikkeli = lazyWithRetry(() => import("./pages/Artikkeli"));
const Tietosuoja = lazyWithRetry(() => import("./pages/Tietosuoja"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));

/**
 * Sovelluksen sisältö ilman reititintä. Selaimessa se kääritään BrowserRouteriin (App),
 * build-aikaisessa esirenderöinnissä StaticRouteriin (src/entry-prerender.tsx).
 * Suspensen latausnäkymä näkyy vain sivunvaihdossa, kun laiskasti ladattava sivu on vielä
 * tulossa. Ensimmäisellä latauksella esirenderöity HTML pysyy paikallaan (hydraatio, main.tsx).
 */
export const AppContent = () => (
  <LazyMotion features={loadMotionFeatures}>
  <TooltipProvider>
      <Toaster />
      <Sonner />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />

              {/* ── New primary routes ── */}
              <Route path="/tiilikaton-pinnoitus-pirkanmaa" element={<KattopalvelutPinnoitus />} />
              <Route path="/talon-maalaus-pirkanmaa" element={<TalonMaalaus />} />
              <Route path="/hintalaskuri" element={<Hintalaskuri />} />
              <Route path="/tarjouspyynto" element={<Tarjouspyynto />} />
              <Route path="/tiilikaton-pinnoitus-hinta-pirkanmaa" element={<HinnatTiilikalonPinnoitus />} />
              <Route path="/talon-maalaus-hinta-pirkanmaa" element={<HinnatTalonMaalaus />} />
              <Route path="/ilmainen-kuntotarkastus" element={<IlmainenKuntotarkastus />} />
              <Route path="/kotitalousvahennys" element={<Kotitalousvahennys />} />
              <Route path="/toiminta-alueet" element={<ToimintaAlueet />} />
              <Route path="/referenssit" element={<Referenssit />} />
              <Route path="/kokemuksia" element={<Kokemuksia />} />
              <Route path="/meista" element={<Meista />} />
              <Route path="/yhteystiedot" element={<Yhteystiedot />} />
              <Route path="/artikkelit" element={<Artikkelit />} />
              <Route path="/artikkelit/:slug" element={<Artikkeli />} />
              <Route path="/tietosuoja" element={<Tietosuoja />} />

              {/* ── Kaupunkikohtaiset palvelusivut (listat: src/data/cityData.ts) ── */}
              {pinnoitusCities.map(city => (
                <Route key={`pin-${city.slug}`} path={`/tiilikaton-pinnoitus-${city.slug}`} element={<KattopalvelutPinnoitusCity citySlug={city.slug} />} />
              ))}
              {maalausCities.map(city => (
                <Route key={`maal-${city.slug}`} path={`/talon-maalaus-${city.slug}`} element={<TalonMaalausCity citySlug={city.slug} />} />
              ))}

              {/* ── Area pages (all 24 cities – unified dynamic template) ── */}
              {allCities.map(city => (
                <Route key={`alue-${city.slug}`} path={`/maalauspalvelut-${city.slug}`} element={<ServiceAreaPage citySlug={city.slug} />} />
              ))}

              {/* ═══ Vanhat osoitteet (src/data/routes.ts: legacyRedirects). Palvelin ohjaa 301:llä
                  (_redirects); tämä on varmistus selaimessa, jos pyyntö pääsee sovellukseen asti. ═══ */}
              {legacyRedirects.map(({ from, to }) => (
                <Route key={`legacy-${from}`} path={from} element={<Navigate to={`${to}/`} replace />} />
              ))}

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE.
                  Uusi reitti: lisää se myös src/data/routes.ts:ään (spa-routes-plugin + sitemap). */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
  </TooltipProvider>
  </LazyMotion>
);

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
