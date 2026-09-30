import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import { cities as fullServiceCities, allCities, maalausCities } from "./data/cityData";
import { lazyWithRetry } from "./lib/lazyWithRetry";

// Lazy-loaded subpages
const KattopalvelutPinnoitus = lazyWithRetry(() => import("./pages/KattopalvelutPinnoitus"));
const KattopalvelutPuhdistus = lazyWithRetry(() => import("./pages/KattopalvelutPuhdistus"));
const KattopalvelutPinnoitusCity = lazyWithRetry(() => import("./pages/KattopalvelutPinnoitusCity"));
const KattopalvelutPuhdistusCity = lazyWithRetry(() => import("./pages/KattopalvelutPuhdistusCity"));
const TalonMaalaus = lazyWithRetry(() => import("./pages/TalonMaalaus"));
const TalonMaalausCity = lazyWithRetry(() => import("./pages/TalonMaalausCity"));
const ToimintaAlueet = lazyWithRetry(() => import("./pages/ToimintaAlueet"));
const ServiceAreaPage = lazyWithRetry(() => import("./pages/ServiceAreaPage"));
const Referenssit = lazyWithRetry(() => import("./pages/Referenssit"));
const Hinnat = lazyWithRetry(() => import("./pages/Hinnat"));
const HinnatTiilikalonPinnoitus = lazyWithRetry(() => import("./pages/HinnatTiilikalonPinnoitus"));
const HinnatKatonPuhdistus = lazyWithRetry(() => import("./pages/HinnatKatonPuhdistus"));
const HinnatTalonMaalaus = lazyWithRetry(() => import("./pages/HinnatTalonMaalaus"));
const Meista = lazyWithRetry(() => import("./pages/Meista"));
const Artikkelit = lazyWithRetry(() => import("./pages/Artikkelit"));
const Artikkeli = lazyWithRetry(() => import("./pages/Artikkeli"));
const Tietosuoja = lazyWithRetry(() => import("./pages/Tietosuoja"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));

const App = () => (
  <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />

              {/* ── New primary routes ── */}
              <Route path="/tiilikaton-pinnoitus-pirkanmaa" element={<KattopalvelutPinnoitus />} />
              <Route path="/katon-puhdistus-pirkanmaa" element={<KattopalvelutPuhdistus />} />
              <Route path="/talon-maalaus-pirkanmaa" element={<TalonMaalaus />} />
              <Route path="/maalauspalvelut-hinta-pirkanmaa" element={<Hinnat />} />
              <Route path="/tiilikaton-pinnoitus-hinta-pirkanmaa" element={<HinnatTiilikalonPinnoitus />} />
              <Route path="/katon-puhdistus-hinta-pirkanmaa" element={<HinnatKatonPuhdistus />} />
              <Route path="/talon-maalaus-hinta-pirkanmaa" element={<HinnatTalonMaalaus />} />
              <Route path="/toiminta-alueet" element={<ToimintaAlueet />} />
              <Route path="/referenssit" element={<Referenssit />} />
              <Route path="/meista" element={<Meista />} />
              <Route path="/artikkelit" element={<Artikkelit />} />
              <Route path="/artikkelit/:slug" element={<Artikkeli />} />
              <Route path="/tietosuoja" element={<Tietosuoja />} />

              {/* ── City service pages (8 full-service cities × 3 services) ── */}
              {fullServiceCities.map(city => (
                <Route key={`pin-${city.slug}`} path={`/tiilikaton-pinnoitus-${city.slug}`} element={<KattopalvelutPinnoitusCity citySlug={city.slug} />} />
              ))}
              {fullServiceCities.map(city => (
                <Route key={`puh-${city.slug}`} path={`/katon-puhdistus-${city.slug}`} element={<KattopalvelutPuhdistusCity citySlug={city.slug} />} />
              ))}
              {maalausCities.map(city => (
                <Route key={`maal-${city.slug}`} path={`/talon-maalaus-${city.slug}`} element={<TalonMaalausCity citySlug={city.slug} />} />
              ))}

              {/* ── Area pages (all 24 cities – unified dynamic template) ── */}
              {allCities.map(city => (
                <Route key={`alue-${city.slug}`} path={`/maalauspalvelut-${city.slug}`} element={<ServiceAreaPage citySlug={city.slug} />} />
              ))}

              {/* ═══ 301-style redirects (old → new) ═══ */}
              <Route path="/kattopalvelut/pinnoitus" element={<Navigate to="/tiilikaton-pinnoitus-pirkanmaa" replace />} />
              <Route path="/kattopalvelut/puhdistus" element={<Navigate to="/katon-puhdistus-pirkanmaa" replace />} />
              <Route path="/talon-maalaus" element={<Navigate to="/talon-maalaus-pirkanmaa" replace />} />
              <Route path="/hinnat" element={<Navigate to="/maalauspalvelut-hinta-pirkanmaa" replace />} />
              <Route path="/hinnat/tiilikaton-pinnoitus" element={<Navigate to="/tiilikaton-pinnoitus-hinta-pirkanmaa" replace />} />
              <Route path="/hinnat/katon-puhdistus" element={<Navigate to="/katon-puhdistus-hinta-pirkanmaa" replace />} />
              <Route path="/hinnat/talon-maalaus" element={<Navigate to="/talon-maalaus-hinta-pirkanmaa" replace />} />

              {/* Old city service redirects */}
              {fullServiceCities.map(city => (
                <Route key={`rpin-${city.slug}`} path={`/kattopalvelut/pinnoitus/${city.slug}`} element={<Navigate to={`/tiilikaton-pinnoitus-${city.slug}`} replace />} />
              ))}
              {fullServiceCities.map(city => (
                <Route key={`rpuh-${city.slug}`} path={`/kattopalvelut/puhdistus/${city.slug}`} element={<Navigate to={`/katon-puhdistus-${city.slug}`} replace />} />
              ))}
              {maalausCities.map(city => (
                <Route key={`rmaal-${city.slug}`} path={`/talon-maalaus/${city.slug}`} element={<Navigate to={`/talon-maalaus-${city.slug}`} replace />} />
              ))}

              {/* Old area page redirects */}
              {allCities.map(city => (
                <Route key={`ralue-${city.slug}`} path={`/alue/${city.slug}`} element={<Navigate to={`/maalauspalvelut-${city.slug}`} replace />} />
              ))}

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE.
                  Uusi reitti: lisää se myös src/data/routes.ts:ään (spa-routes-plugin + sitemap). */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
  </TooltipProvider>
);

export default App;
