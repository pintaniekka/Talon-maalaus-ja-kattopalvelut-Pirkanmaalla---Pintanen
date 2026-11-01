import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageHero from "@/components/PageHero";
import Rytmi from "@/components/Rytmi";
import ReviewCard from "@/components/ReviewCard";
import ServiceContactSection from "@/components/ServiceContactSection";
import { KayntiPalkki, LaskuriPalkki } from "@/components/KutsuPalkit";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import SEO from "@/components/SEO";
import { HERO_BASE, staticSeo } from "@/data/seo";
import { allTestimonials, REVIEW_COUNT, type TestimonialCategory } from "@/data/testimonialsData";
import { arvosteluAnkkuri } from "@/data/arvostelusijoitus";
import { GOOGLE_PROFILE_URL, LUVUT } from "@/data/company";

/**
 * Ryhmät Eerikin luokittelulla (12.10.2026). Ei "muut"-ryhmää: jokainen arvostelu kuuluu kattoon, seiniin tai molempiin.
 * "Molemmat"-arvostelut omassa osiossaan (auditointi 31.10.2026, T4): aiemmin ne näkyivät sekä katto- että seinäosiossa.
 */
const groups: { category: TestimonialCategory; title: string; intro: string }[] = [
  { category: "katto", title: "Kokemuksia tiilikaton pinnoituksesta", intro: "Nämä asiakkaat teettivät meillä tiilikaton pinnoituksen." },
  { category: "seina", title: "Kokemuksia talon maalauksesta", intro: "Nämä asiakkaat teettivät meillä talon ulkomaalauksen." },
  { category: "molemmat", title: "Kokemuksia katosta ja seinistä", intro: "Näille asiakkaille pinnoitimme katon ja maalasimme seinät." },
];

const crumbs = [{ name: "Kokemuksia" }];

/** /kokemuksia: kaikki Google-arvostelut yhdellä sivulla, sanasta sanaan (Eerik 12.10.2026). */
const Kokemuksia = () => {
  const seo = staticSeo["/kokemuksia"];
  // Ankkuri-id vain arvostelun ensimmäiseen korttiin: Tampereen osio toistaa kortteja.
  const annetut = new Set<string>();
  const ankkuri = (t: (typeof allTestimonials)[number]) => {
    const id = arvosteluAnkkuri(t);
    if (annetut.has(id)) return undefined;
    annetut.add(id);
    return id;
  };
  // Arvostelunoston "Lue koko arvostelu" tuo tänne ankkurilla; sivu latautuu laiskasti, joten vieritetään itse.
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash.slice(1));
    el?.scrollIntoView({ block: "start" });
  }, [hash]);
  return (
    <div>
      <Rytmi>
      <SEO {...seo} breadcrumbs={crumbs} />

      <PageHero
        eyebrow="Kokemuksia"
        title={
          <>
            Asiakkaiden <span className="text-accent-ink">kokemuksia</span>
          </>
        }
        lead={
          <>
            Tällä sivulla ovat kaikki {REVIEW_COUNT} Google-arvosteluamme. Keskiarvo on{" "}
            <strong className="text-foreground">{LUVUT.googleArvio}</strong>. Arvostelut ovat sanasta sanaan Googlesta.
          </>
        }
        primary={{ to: "/tarjouspyynto/", label: "Pyydä ilmainen arviokäynti" }}
        secondary={{ to: "/hintalaskuri/", label: "Laske hinta" }}
        trust="yleinen"
        image={{ base: HERO_BASE.kokemuksia, alt: "Keltainen talo ja pinnoitettu tiilikatto Kangasalla" }}
        breadcrumbs={crumbs}
      />
      <LaskuriPalkki />

      {groups.map((g, gi) => {
        const reviews = allTestimonials.filter((t) => t.category === g.category);
        if (reviews.length === 0) return null;
        return (
          <section key={g.category} className="section-padding osio">
            <div className="section-container max-w-6xl mx-auto">
              <div className="max-w-3xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-3 font-heading">{g.title}</h2>
                <p className="text-muted-foreground text-base md:text-lg">{g.intro}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {reviews.map((r, i) => (
                  <ReviewCard key={r.name} review={r} index={i} id={ankkuri(r)} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Tampere-osio (OpenSEO 29.10.2026: "tiilikaton pinnoitus kokemuksia Tampere" ei tuota mainintaa tekoälyvastauksissa). Samat arvostelut kuin yllä, Tampereen kohteet. */}
      {(() => {
        const tampere = allTestimonials.filter((t) => t.city === "tampere");
        if (tampere.length < 2) return null;
        return (
          <section className="section-padding osio">
            <div className="section-container max-w-6xl mx-auto">
              <div className="max-w-3xl mx-auto text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-3 font-heading">Kokemuksia tiilikaton pinnoituksesta ja talon maalauksesta Tampereella</h2>
                <p className="text-muted-foreground text-base md:text-lg">Nämä {tampere.length} arvostelua ovat Tampereen kohteista.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {tampere.map((r, i) => (
                  <ReviewCard key={`tampere-${r.name}`} review={r} index={i} id={ankkuri(r)} />
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      <section className="py-12 osio">
        <div className="section-container max-w-3xl mx-auto text-center text-muted-foreground">
          <p>
            Arvostelut ovat Googlen yritysprofiilistamme.{" "}
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
              Katso profiili Googlessa
            </a>
            . Jos olet asiakkaamme, kiitos, jos jätät oman arvostelusi samaan paikkaan.
          </p>
        </div>
      </section>
      <KayntiPalkki />

      <ServiceContactSection variant="general" />
      <ToimintaAlueetBanner />
      </Rytmi>
    </div>
  );
};

export default Kokemuksia;
