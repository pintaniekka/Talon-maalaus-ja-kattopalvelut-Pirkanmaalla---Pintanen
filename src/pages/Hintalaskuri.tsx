import { Link, useSearchParams } from "react-router-dom";
import Rytmi from "@/components/Rytmi";
import { Star } from "lucide-react";
import SEO from "@/components/SEO";
import ServiceContactSection from "@/components/ServiceContactSection";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import FAQSection from "@/components/FAQSection";
import PriceWizard, { type WizardService } from "@/components/laskuri/PriceWizard";
import { PriceExampleTable } from "@/components/hinnat/PriceExamples";
import { staticSeo } from "@/data/seo";
import { KOTITALOUSVAHENNYS } from "@/data/company";
import { getRoofAndWallTestimonials } from "@/data/testimonialsData";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

/* Valmiiksi sumennettu taustakuva (Nokian tummanharmaa katto): CSS-blur raskaalla kuvalla nykii selatessa. */
const bgBase = "hintalaskuri-tausta";
const bgSrc = getResponsiveSrc(bgBase);
const bgSrcSet = getResponsiveSrcSet(bgBase);

/* Kaksi kattoarvostelua ja kaksi seinäarvostelua, ei samaa kahdesti (Eerik 13.10.2026: neljä, ei kaksi). */
const testimonials = getRoofAndWallTestimonials(2, 0);

const toService = (value: string | null): WizardService | null =>
  value === "pinnoitus" || value === "maalaus" ? value : null;

/** Laskurisivun UKK (brief 5, 26.10.2026). Vastaukset ovat sivuston omia faktoja (UKK, laskurin tekstit). */
const laskuriFaq = [
  {
    question: "Onko hintalaskurin hinta tarjous?",
    answer:
      "Laskuri antaa suuntaa antavan haarukan, ei tarjousta. Kiinteän hinnan saat kirjallisessa tarjouksessa ilmaisen kuntotarkastuksen tai arviokäynnin jälkeen.",
  },
  {
    question: "Miksi laskuri kysyy nimen ja puhelinnumeron?",
    answer:
      "Näytämme arvion, kun olet jättänyt nimen ja puhelinnumeron. Soitamme sinulle viimeistään seuraavana arkipäivänä ja sovimme halutessasi ilmaisen käynnin.",
  },
  {
    question: "Mitä teen, jos en tiedä katon tai talon neliöitä?",
    answer:
      "Arvio riittää. Katto on suurempi kuin talon pohja, ja talon maalauksessa riittävät pohjaneliöt ja kerrosten määrä. Käynnillä katsomme kohteen paikan päällä, ja tarjouksen hinta on kiinteä.",
  },
  {
    question: "Voinko laskea katon ja seinät samalla kertaa?",
    answer:
      "Laskuri laskee yhden työn kerrallaan. Jos haluat sekä katon että seinät, kerro se puhelussa tai tarjouspyynnössä. Samalla kertaa tehtynä saat edullisemman pakettihinnan.",
  },
];

const h2Class = "text-2xl md:text-3xl font-bold font-heading text-foreground mb-4";
const pClass = "text-muted-foreground leading-relaxed";

/** /hintalaskuri: sivuston ainoa hintalaskuri etusivun laskurin lisäksi. */
const Hintalaskuri = () => {
  const [params] = useSearchParams();
  const initialService = toService(params.get("palvelu"));

  return (
    <Rytmi>
      <SEO {...staticSeo["/hintalaskuri"]} preloadImage={bgSrc} />

      <section className="hero-critical on-dark relative min-h-[100svh] flex items-center overflow-hidden isolate" style={{ backgroundColor: "hsl(215,30%,10%)" }}>
        <img
          src={bgSrc}
          srcSet={bgSrcSet}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(10,25,47,0.78) 0%, rgba(10,25,47,0.6) 50%, rgba(10,25,47,0.78) 100%)" }} />

        <div className="relative z-[2] section-container w-full pt-28 pb-28 md:pt-32 lg:pb-20">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground mb-8">
            {/* Brief 5 (26.10.2026): H1 nimeää molemmat palvelut, kuten sivun title. */}
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-primary-foreground">
              Hintalaskuri: tiilikaton pinnoitus ja talon maalaus
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed">
              Laske tiilikaton pinnoituksen tai talon maalauksen hinta minuutissa.
            </p>
            <p className="mt-4 text-base text-primary-foreground/80 leading-relaxed">
              Laskuri kysyy katon tai talon koon ja kunnon ja antaa hinta-arvion. Tarkan hinnan saat, kun olemme käyneet paikalla.
            </p>
          </div>

          <PriceWizard initialService={initialService} />

          {testimonials.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mt-10">
              {testimonials.map((t) => (
                <figure key={t.name} className="bg-primary/70 rounded-2xl p-5 text-primary-foreground">
                  <div className="flex gap-0.5 mb-2" role="img" aria-label={`${t.stars} tähteä viidestä`}>
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-paint-yellow text-paint-yellow" />
                    ))}
                  </div>
                  <blockquote className="text-sm leading-relaxed text-primary-foreground/90">"{t.text}"</blockquote>
                  <figcaption className="mt-3 text-xs text-primary-foreground/70">{t.name} · Google-arvostelu</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Teksti laskurin ympärillä, ei sen tilalla (brief 5, 26.10.2026; Eerik: liidiportti pysyy). */}
      <section className="section-padding osio">
        <div className="section-container max-w-3xl mx-auto space-y-14">
          <div>
            <h2 className={h2Class}>Tiilikaton pinnoituksen hintalaskuri</h2>
            <p className={pClass}>
              Laskuri kysyy katon pinta-alan, rikkinäisten tiilien määrän, aluskatteen kunnon ja katon jyrkkyyden. Koko ja jyrkkyys
              vaikuttavat hintaan eniten, koska jyrkällä katolla työ on hitaampaa. Rikkinäisten tiilien määrä kertoo, paljonko tiiliä
              vaihdamme. Aluskatteen kunto ratkaisee, riittääkö pinnoitus vai kannattaako katto uusia.
            </p>
            <div className="mt-6">
              <PriceExampleTable service="pinnoitus" />
            </div>
          </div>

          <div>
            <h2 className={h2Class}>Talon maalauksen hintalaskuri</h2>
            <p className={pClass}>
              Laskuri kysyy talon pohjapinta-alan, kerrosten määrän ja vanhan maalin kunnon. Pohjaneliöt ja kerrokset kertovat, paljonko
              seinää maalataan. Jos maali hilseilee, kaavintaa ja pohjamaalia tarvitaan enemmän, ja se nostaa hintaa.
            </p>
            <div className="mt-6">
              <PriceExampleTable service="maalaus" />
            </div>
          </div>

          <div>
            <h2 className={h2Class}>Miten laskurin hinta suhtautuu tarjoukseen?</h2>
            <p className={pClass}>
              Laskuri antaa haarukan. Tarjous on kiinteä hinta, ja saat sen kirjallisena ilmaisen kuntotarkastuksen tai arviokäynnin
              jälkeen. Käynnillä katsomme katon tai seinät ja käymme tarjouksen läpi yhdessä. Hintaan kuuluu koko työ: suojaus,
              pohjatyöt, pohjamaalaus, pintamaalaus, siivous ja takuu. Matkasta ei tule lisäkulua. Jos sovit katon ja seinät samalla
              kertaa, saat edullisemman pakettihinnan.
            </p>
          </div>

          <div>
            <h2 className={h2Class}>Kotitalousvähennys laskurin tuloksessa</h2>
            <p className={pClass}>
              Laskurin arvio on hinta ilman kotitalousvähennystä. Vähennyksen saat työn osuudesta, ja se tehdään verotuksessa.{" "}
              {KOTITALOUSVAHENNYS} Esimerkkitaulukoissa näytämme myös hinnan vähennyksen jälkeen. Erittelemme työn osuuden laskulle
              valmiiksi. Lue lisää:{" "}
              <Link to="/artikkelit/kotitalousvahennys-katto-ja-maalaustyot/" className="text-primary font-semibold hover:underline">
                kotitalousvähennys katto- ja maalaustöissä
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <FAQSection items={laskuriFaq} title="Usein kysyttyä hintalaskurista" />

      <ServiceContactSection variant="general" />
      <ToimintaAlueetBanner />
    </Rytmi>
  );
};

export default Hintalaskuri;
