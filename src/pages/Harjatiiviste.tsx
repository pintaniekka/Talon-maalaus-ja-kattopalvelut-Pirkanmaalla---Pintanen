import { Link } from "react-router-dom";
import Rytmi, { merkitse } from "@/components/Rytmi";
import ArvosteluNosto from "@/components/ArvosteluNosto";
import SEO from "@/components/SEO";
import ServiceSchema from "@/components/ServiceSchema";
import PageHero from "@/components/PageHero";
import Lyhyesti from "@/components/Lyhyesti";
import ProcessList from "@/components/ProcessList";
import ResponsiveImage from "@/components/ResponsiveImage";
import FAQSection from "@/components/FAQSection";
import ArtikkeliRivit from "@/components/ArtikkeliRivit";
import ToimintaAlueetBanner from "@/components/ToimintaAlueetBanner";
import ServiceContactSection from "@/components/ServiceContactSection";
import { PriceSectionHeading } from "@/components/hinnat/PriceSections";
import { getRouteSeo } from "@/data/seo";
import { getArticleBySlug, isPublished } from "@/data/articles";
import { HARJATIIVISTE_HINTA } from "@/lib/priceCalc";
import type { Tyovaihe, LyhyestiSisalto } from "@/data/tyovaiheet";

/**
 * Harjatiivisteen asennus palveluna (Eerik 29.10.2026). Faktat: artikkeli harjatiiviste-tiilikatolla (Meltexin
 * tuotekuvaus: nauha harjapuun yli ja harjatiilen alle, vähentää tuiskulumen, veden ja roskien pääsyä
 * aluskatteelle, tuulettuva), tyovaiheet.ts (saumat ja harja tarkistetaan kuntotarkastuksessa), projects.ts
 * (asennus Kangasalla 2026), Eerik 29.10.2026 (harjatiilet säilyvät ehjinä asennuksessa, rikkinäiset harjatiilet
 * vaihdetaan samalla; harjatiili on kalliimpi kuin lapetiili, mutta sitä ei sanota). Hinta: Eerik 29.10.2026,
 * 15 €/m pinnoituksen yhteydessä, 25 €/m erikseen. Tuote (Eerik 29.10.2026): hengittävä harjatiiviste, alumiinireuna
 * butyyliliimanauhalla, värit musta, ruskea ja tiilenpunainen. Ostohintaa ei kerrota missään.
 */
const PATH = "/harjatiivisteen-asennus";
const hinta = HARJATIIVISTE_HINTA;

const lyhyesti: LyhyestiSisalto = {
  facts: [
    { label: "Pinnoituksen yhteydessä", value: `${hinta.pinnoituksenYhteydessa} €/m` },
    { label: "Erikseen tilattuna", value: `${hinta.erikseen} €/m` },
    { label: "Mitä se tekee", value: "Tiivistää\nkaton harjan" },
    { label: "Ominaisuus", value: "Hengittävä" },
  ],
  note: "Hinta lasketaan harjan pituuden mukaan. Harjan pituus on katon ylin sauma päädystä päätyyn.",
};

const vaiheet: Tyovaihe[] = [
  { title: "Harja tarkistetaan", text: "Katsomme kuntotarkastuksessa, onko harjatiiviste paikallaan ja ehjä. Jos se puuttuu tai on rikki, kirjaamme asennuksen tarjoukseen." },
  { title: "Harjatiilet irrotetaan", text: "Nostamme harjatiilet pois. Ne säilyvät asennuksessa ehjinä. Jos jokin harjatiili on jo valmiiksi rikki, vaihdamme sen samalla." },
  { title: "Tiiviste asennetaan", text: "Tiiviste asennetaan harjapuun yli ja harjatiilen alle, ja alumiinireunat painetaan tiiliin kiinni. Se estää lumen, roskien ja veden pääsyn aluskatteelle, mutta päästää ilman läpi." },
  { title: "Harjatiilet takaisin", text: "Laitamme harjatiilet takaisin paikoilleen. Pinnoituksen yhteydessä harja maalataan samalla kahteen kertaan." },
];

const faq = [
  { question: "Mikä harjatiiviste on?", answer: "Harjatiiviste on nauha, joka asennetaan harjapuun yli ja harjatiilen alle. Se vähentää tuiskulumen, veden ja roskien pääsyä aluskatteelle, mutta päästää ilman läpi." },
  { question: "Mitä harjatiivisteen asennus maksaa?", answer: `Pinnoituksen yhteydessä ${hinta.pinnoituksenYhteydessa} euroa metriltä ja erikseen tilattuna ${hinta.erikseen} euroa metriltä. Hinta lasketaan harjan pituuden mukaan, ja se näkyy tarjouksessa eriteltynä.` },
  { question: "Asennatteko harjatiivisteen pinnoituksen yhteydessä?", answer: "Kyllä, jos se puuttuu tai on rikki. Olemme asentaneet harjatiivisteitä pinnoituksen yhteydessä esimerkiksi Kangasalla. Tarve katsotaan kuntotarkastuksessa, ja se kirjataan tarjoukseen." },
  { question: "Voiko harjatiivisteen tilata ilman pinnoitusta?", answer: `Voi. Erikseen tilattuna hinta on ${hinta.erikseen} euroa metriltä. Kysy tarjous, niin katsomme harjan samalla käynnillä.` },
  { question: "Mistä tiedän, puuttuuko harjatiiviste?", answer: "Harjatiilen alta näkyy rako. Jos ullakolla on talven jälkeen lunta tai vesijälkiä harjan alla, aluskate on jo rikki. Varmin tapa on antaa meidän katsoa harja ja aluskate kuntotarkastuksessa." },
  { question: "Millainen tiiviste asennetaan?", answer: "Hengittävä harjatiiviste, jonka alumiinireunat kiinnittyvät tiiliin butyyliliimalla. Väri valitaan katon mukaan: musta, ruskea tai tiilenpunainen." },
  { question: "Menevätkö harjatiilet rikki asennuksessa?", answer: "Eivät. Harjatiilet säilyvät ehjinä harjatiivisteen asennuksessa. Jos jokin harjatiili on jo valmiiksi rikki, vaihdamme sen samalla." },
];

const Kuvat = merkitse(
  () => (
    <section className="section-padding osio">
      <div className="section-container">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="lohko-otsake mb-3">Kohteista</span>
          <h2 className="font-heading text-3xl font-bold text-navy md:text-4xl">Harjatiivisteen asennus pinnoituksen yhteydessä</h2>
        </div>
        <ul className="mx-auto grid max-w-5xl list-none gap-6 p-0 sm:grid-cols-3">
          {[
            { base: "tiilikaton-pinnoitus-harjatiivisteen-asennus", alt: "Harjatiiviste asennettuna tiilikaton harjalle", caption: "Tiiviste harjapuun yli ennen harjatiilien asennusta." },
            { base: "tiilikaton-pinnoitus-harjatiivisteen-asennustyo", alt: "Harjatiivisteen asennustyö tiilikatolla", caption: "Harjatiilet nostettu pois asennuksen ajaksi." },
            { base: "tiilikaton-pinnoitus-kangasala-harjatiivisteen-asennus", alt: "Harjatiivisteen asennus tiilikatolle Kangasalla", caption: "Harjatiivisteen asennus pinnoituksen yhteydessä, Kangasala 2026." },
          ].map((k) => (
            <li key={k.base} className="kortti overflow-hidden">
              <ResponsiveImage baseName={k.base} alt={k.alt} className="aspect-[4/3] w-full object-cover" sizes="(max-width: 640px) 100vw, 320px" width={800} height={600} />
              <p className="px-5 py-4 text-sm text-muted-foreground">{k.caption}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  ),
  "sininen",
);

const crumbs = [{ name: "Tiilikaton pinnoitus", path: "/tiilikaton-pinnoitus-pirkanmaa" }, { name: "Harjatiivisteen asennus" }];

const Harjatiiviste = () => {
  const seo = getRouteSeo(PATH);
  const artikkeli = getArticleBySlug("harjatiiviste-tiilikatolla");
  const artikkeliJulkaistu = !!artikkeli && isPublished(artikkeli);
  return (
    <Rytmi>
      <SEO {...seo} breadcrumbs={crumbs} />
      <ServiceSchema
        name="Harjatiivisteen asennus"
        alternateNames={["Harjatiiviste tiilikatolle", "Tiilikaton harjatiiviste"]}
        area="Pirkanmaa"
        areaType="AdministrativeArea"
        description={seo.description}
      />

      <PageHero
        eyebrow="Harjatiiviste · Pirkanmaa"
        title={
          <>
            Harjatiivisteen asennus <span className="text-accent-ink">tiilikattoon</span>
          </>
        }
        lead={`Harjatiiviste on nauha harjatiilen alla. Se pitää tuiskulumen, veden ja roskat poissa aluskatteelta ja päästää ilman läpi. Tarkistamme harjan jokaisessa kuntotarkastuksessa ja asennamme tiivisteen tarvittaessa. Hinta on ${hinta.pinnoituksenYhteydessa} € metriltä pinnoituksen yhteydessä ja ${hinta.erikseen} € metriltä erikseen tilattuna.`}
        primary={{ to: "/hintalaskuri/?palvelu=pinnoitus", label: "Laske hinta" }}
        secondary={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }}
        trust="pinnoitus"
        image={{ base: "tiilikaton-pinnoitus-harjatiivisteen-asennus", alt: "Harjatiivisteen asennus tiilikaton harjalle" }}
        badge={{ title: "Eerik asentaa", text: "Asentaa tiivisteen itse pinnoituksen yhteydessä." }}
        breadcrumbs={crumbs}
      />

      <Lyhyesti content={lyhyesti} />

      <section className="section-padding osio">
        <div className="section-container grid items-start gap-10 lg:grid-cols-[minmax(0,40rem)_minmax(16rem,24rem)] lg:justify-center lg:gap-16">
          <div>
            <span className="lohko-otsake mb-3">Miksi</span>
            <h2 className="mb-5 font-heading text-3xl font-bold text-navy md:text-4xl">Miksi harjatiiviste tarvitaan?</h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Harjatiilet eivät ole tiiviisti kiinni toisissaan, ja niiden alle jää rako. Harjatiiviste estää lumen, roskien ja veden
                pääsyn raosta aluskatteelle. Jos roskaa tai lunta pääsee aluskatteelle, ne vaurioittavat sitä, ja vaurioitunut aluskate on
                aina riski vesivahingolle. Tiiviste on keskeltä hengittävä, joten katon alla oleva ilma pääsee edelleen liikkumaan.
              </p>
              <p>
                Jos ullakolla on talven jälkeen lunta tai vesijälkiä harjan alla, aluskate on jo rikki. Käytämme hengittävää
                harjatiivistettä, jonka alumiinireunat kiinnittyvät tiiliin butyyliliimalla. Väri valitaan katon mukaan: musta, ruskea
                tai tiilenpunainen. Katsomme harjan ja aluskatteen{" "}
                <Link to="/ilmainen-katon-kuntotarkastus/" className="font-semibold text-primary hover:underline">
                  ilmaisessa kuntotarkastuksessa
                </Link>
                , ja asennus kirjataan tarjoukseen eriteltynä.
              </p>
              {artikkeliJulkaistu && (
                <p>
                  <Link to="/artikkelit/harjatiiviste-tiilikatolla/" className="font-semibold text-primary hover:underline">
                    Lue lisää harjatiivisteestä
                  </Link>
                  .
                </p>
              )}
            </div>
          </div>
          <aside className="kortti p-6" aria-label="Hinta">
            <span className="lohko-otsake mb-3">Hinta</span>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm text-muted-foreground">Pinnoituksen yhteydessä</dt>
                <dd className="font-heading text-3xl font-extrabold text-accent-ink">{hinta.pinnoituksenYhteydessa} €/m</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Erikseen tilattuna</dt>
                <dd className="font-heading text-3xl font-extrabold text-accent-ink">{hinta.erikseen} €/m</dd>
              </div>
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Hinta lasketaan harjan pituuden mukaan ja sisältää työn ja tiivisteen. Hintalaskuri laskee sen pinnoituksen hintaan
              mukaan, kun vastaat, että harjatiiviste puuttuu, ja kerrot harjan pituuden.
            </p>
          </aside>
        </div>
      </section>

      <Kuvat />

      <ProcessList title="Näin harjatiiviste asennetaan" steps={vaiheet} cta={{ to: "/tarjouspyynto/?palvelu=pinnoitus", label: "Pyydä ilmainen kuntotarkastus" }} />

      {/* Arvostelunosto: sijoitus ja valinta src/data/arvostelusijoitus.ts */}
      <ArvosteluNosto polku="/harjatiivisteen-asennus" />

      <section className="section-padding osio">
        <div className="section-container mx-auto max-w-3xl text-center">
          <PriceSectionHeading
            eyebrow="Pinnoitus"
            title="Harjatiiviste kannattaa asentaa pinnoituksen yhteydessä"
            intro="Pinnoituksessa harjatiilet käsitellään joka tapauksessa, joten tiivisteen asennus on silloin edullisinta. Katso, mitä tiilikaton pinnoitus maksaa ja miten työ etenee."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/tiilikaton-pinnoitus-pirkanmaa/" className="font-semibold text-primary hover:underline">
              Tiilikaton pinnoitus Pirkanmaalla
            </Link>
            <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa/" className="font-semibold text-primary hover:underline">
              Tiilikaton pinnoituksen hinta
            </Link>
          </div>
        </div>
      </section>

      <ArtikkeliRivit categories={["katto"]} />
      <FAQSection items={faq} title="Usein kysyttyä harjatiivisteestä" />
      <ServiceContactSection variant="katto" />
      <ToimintaAlueetBanner service="pinnoitus" />
    </Rytmi>
  );
};

export default Harjatiiviste;
