import { Link } from "react-router-dom";
import Rytmi, { merkitse } from "@/components/Rytmi";
import ArvosteluNosto from "@/components/ArvosteluNosto";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import ProcessList from "@/components/ProcessList";
import FAQSection from "@/components/FAQSection";
import ArtikkeliRivit from "@/components/ArtikkeliRivit";
import ToimintaKutsu from "@/components/ToimintaKutsu";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import ServiceContactSection from "@/components/ServiceContactSection";
import { PriceSectionHeading, Checklist } from "@/components/hinnat/PriceSections";
import ResponsiveImage from "@/components/ResponsiveImage";
import { getRouteSeo } from "@/data/seo";
import { kuntotarkastukset, type KuntotarkastusService } from "@/data/kuntotarkastus";
import { fmtEur } from "@/data/prices";

/**
 * Ilmainen katon kuntotarkastus ja talon maalauksen arviokäynti (Eerik 28.10.2026: Lummecon malli, mutta
 * parempi). Yksi pohja, sisältö tiedostosta src/data/kuntotarkastus.ts. Rakenne hakukoneille ja
 * tekoälyvastauksille: H1 ja johdanto vastaavat heti (kuka, mitä, milloin, hinta 0 €, mitä saat), H2:t ovat
 * kysymyksiä, lopussa UKK. "Miksi"-lohko on sininen näyttämö.
 */
const Merkit = merkitse(
  ({ service }: { service: KuntotarkastusService }) => {
    const s = kuntotarkastukset[service];
    return (
      <section className="section-padding osio">
        <div className="section-container">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="lohko-otsake mb-3">Miksi ajoissa</span>
            <h2 className="mb-4 font-heading text-3xl font-bold text-navy md:text-4xl">{s.miksiOtsikko}</h2>
            <p className="text-lg text-muted-foreground">{s.miksiIntro}</p>
          </div>
          <ol className="mx-auto grid max-w-5xl list-none gap-6 p-0 sm:grid-cols-3">
            {s.merkit.map((m, i) => (
              <li key={m.title} className="border-t border-border/60 pt-4">
                <span className="luku-korostus mb-2 block font-heading text-3xl font-extrabold leading-none" aria-hidden="true">
                  0{i + 1}
                </span>
                <strong className="mb-1 block font-heading text-foreground">{m.title}</strong>
                <p className="text-sm leading-relaxed text-muted-foreground">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  },
  "sininen",
);

const Kuntotarkastus = ({ service }: { service: KuntotarkastusService }) => {
  const s = kuntotarkastukset[service];
  const seo = getRouteSeo(s.path);
  const crumbs = [{ name: s.parent.name, path: s.parent.path }, { name: s.h1 }];
  return (
    <Rytmi>
      <SEO {...seo} breadcrumbs={crumbs} />
      <ServiceSchema
        name={s.schemaName}
        alternateNames={s.schemaAlternate}
        area="Pirkanmaa"
        areaType="AdministrativeArea"
        description={seo.description}
        priceRange={{ min: 0, max: 0 }}
      />

      <PageHero
        eyebrow={s.eyebrow}
        title={
          <>
            {s.h1} <span className="text-accent-ink">Pirkanmaalla</span>
          </>
        }
        lead={s.lead}
        primary={s.cta}
        secondary={{ to: s.laskuri, label: "Laske hinta" }}
        trust={service}
        image={s.hero}
        badge={s.badge}
        breadcrumbs={crumbs}
      />

      <Lyhyesti content={s.lyhyesti} />

      <Merkit service={service} />
      <ToimintaKutsu palvelu={service} kaynti={s.cta} />

      <section className="section-padding osio">
        <div className="section-container mx-auto max-w-3xl">
          <PriceSectionHeading eyebrow="Tarkastus" title={s.katsommeOtsikko} intro={s.katsommeIntro} />
          <Checklist items={s.katsomme} />
        </div>
        {/* Kuvia siitä, mitä käynnillä katsotaan (Eerik 29.10.2026). */}
        <ul className="section-container mx-auto mt-10 grid max-w-5xl list-none gap-6 p-0 sm:grid-cols-3">
          {s.kuvat.map((k) => (
            <li key={k.base} className="kortti overflow-hidden">
              <ResponsiveImage baseName={k.base} alt={k.alt} className="aspect-[4/3] w-full object-cover" sizes="(max-width: 640px) 100vw, 320px" width={800} height={600} />
              <p className="px-5 py-4 text-sm text-muted-foreground">{k.caption}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-padding osio">
        <div className="section-container">
          <PriceSectionHeading
            eyebrow="Tulos"
            title={s.saatOtsikko}
            intro={`Maksullinen vastaava tarkastus maksaa muualla noin ${fmtEur(s.arvoMuualla)}. Meiltä saat sen ilmaiseksi, koska teemme työn itse.`}
          />
          <ol className="mx-auto grid max-w-5xl list-none gap-6 p-0 md:grid-cols-2">
            {s.saat.map((k, i) => (
              <li key={k.title} className="kortti flex gap-4 p-6">
                <span className="kortti-numero" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="mb-1 font-heading text-lg font-extrabold text-navy">{k.title}</h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{k.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ProcessList title={s.eteneeOtsikko} steps={s.etenee} cta={s.cta} />

      {/* Arvostelunosto: sijoitus ja valinta src/data/arvostelusijoitus.ts */}
      <ArvosteluNosto polku={s.path} />

      <section className="section-padding osio">
        <div className="section-container grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="lohko-otsake mb-3">Nopea vaihtoehto</span>
            <h2 className="mb-4 font-heading text-2xl font-bold text-navy md:text-3xl">{s.etaOtsikko}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{s.eta}</p>
          </div>
          <div>
            <span className="lohko-otsake mb-3">Hinta</span>
            <h2 className="mb-4 font-heading text-2xl font-bold text-navy md:text-3xl">Mitä työ maksaa käynnin jälkeen?</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {s.hintaTeksti}{" "}
              <Link to={s.hintaLinkki.to} className="font-semibold text-primary hover:underline">
                {s.hintaLinkki.label}
              </Link>
              {" · "}
              <Link to={s.palveluLinkki.to} className="font-semibold text-primary hover:underline">
                {s.palveluLinkki.label}
              </Link>
              {" · "}
              <Link to="/kotitalousvahennys/" className="font-semibold text-primary hover:underline">
                Kotitalousvähennys
              </Link>
            </p>
          </div>
        </div>
      </section>

      <ArtikkeliRivit categories={s.articleCategories} />
      <ToimintaKutsu palvelu={service} kaynti={s.cta} />
      <FAQSection items={s.faq} title={`Usein kysyttyä: ${s.h1.toLowerCase()}`} />
      <ServiceContactSection variant={s.contactVariant} />
      <ToimintaAlueetBanner service={service} />
    </Rytmi>
  );
};

export default Kuntotarkastus;
