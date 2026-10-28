import PageHero from "@/components/PageHero";
import Rytmi from "@/components/Rytmi";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import ServiceContactSection from "@/components/ServiceContactSection";
import SEO from "@/components/SEO";
import ReferenssiGalleria from "@/components/ReferenssiGalleria";
import { HERO_BASE, staticSeo } from "@/data/seo";

/**
 * Referenssit (Eerik 27.10.2026: galleria uusiksi). Kuvat ja tekstit tulevat src/data/referenssit.ts:stä,
 * ulkoasu src/components/ReferenssiGalleria.tsx:stä. Sivulla ei ole käsin kirjoitettua kuvalistaa.
 */
const Referenssit = () => (
  <div>
    <SEO {...staticSeo["/referenssit"]} breadcrumbs={[{ name: "Referenssit" }]} />
    <PageHero
      eyebrow="Referenssit"
      title={
        <>
          Kuvia <span className="text-accent-ink">töistämme</span>
        </>
      }
      lead={
        <>
          Tiilikattoja ennen ja jälkeen pinnoituksen sekä maalattuja taloja Pirkanmaalla ja lähikunnissa.{" "}
          <strong className="text-foreground">Kaikki kuvat ovat omista kohteistamme.</strong>
        </>
      }
      primary={{ to: "/hintalaskuri/", label: "Laske hinta" }}
      secondary={{ to: "/tarjouspyynto/", label: "Pyydä ilmainen arviokäynti" }}
      trust="yleinen"
      image={{ base: HERO_BASE.referenssit, alt: "Vastamaalattu tiilikatto pinnoituksen jälkeen" }}
      breadcrumbs={[{ name: "Referenssit" }]}
    />
    <Rytmi>
      <ReferenssiGalleria />
      <ServiceContactSection variant="general" />
      <ToimintaAlueetBanner />
    </Rytmi>
  </div>
);

export default Referenssit;
