import { ChevronRight } from "lucide-react";
import { MapPin } from "@/components/icons/BrandIcons";
import { Link } from 'react-router-dom';
import PageHero from '@/components/PageHero';
import ToimintaAlueetBanner from '@/components/ToimintaAlueetBanner';
import ServiceContactSection from '@/components/ServiceContactSection';
import SEO from '@/components/SEO';
import { HERO_BASE, staticSeo } from "@/data/seo";
import { TOIMINTA_ALUE } from "@/data/company";
import { allCities, hasPinnoitusPage, hasMaalausPage } from '@/data/cityData';


const ToimintaAlueet = () => {
  return (
    <div>
      <SEO {...staticSeo["/toiminta-alueet"]} breadcrumbs={[{ name: "Toiminta-alueet" }]} />
      <PageHero
        eyebrow="Toiminta-alueet"
        title={
          <>
            Toiminta-alueemme: <span className="text-accent-ink">Pirkanmaa ja lähikunnat</span>
          </>
        }
        lead={
          <>
            Pinnoitamme tiilikattoja ja maalaamme taloja {TOIMINTA_ALUE}. Tulemme katsomaan kohteen ilmaiseksi.
          </>
        }
        primary={{ to: "/tarjouspyynto/", label: "Pyydä ilmainen arviokäynti" }}
        secondary={{ to: "/hintalaskuri/", label: "Laske hinta" }}
        trust="yleinen"
        image={{ base: HERO_BASE.toimintaAlueet, alt: "Keltainen omakotitalo julkisivumaalauksen jälkeen" }}
        breadcrumbs={[{ name: "Toiminta-alueet" }]}
      />

      <ToimintaAlueetBanner />


      <section className="section-padding bg-background">
        <div className="section-container max-w-4xl">
          <div className="text-base md:text-lg text-muted-foreground mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 text-center">Missä toimimme?</h2>
            <p>
              Pinnoitamme tiilikattoja ja maalaamme taloja {TOIMINTA_ALUE}. Suurin osa asiakkaistamme on Tampereella ja sen naapurikunnissa.
              Käymme myös Kanta-Hämeessä Hämeenlinnassa ja Forssassa sekä Huittisissa.
            </p>
            <p>
              Jos et ole varma, kuuluuko paikkakuntasi toiminta-alueeseemme, ota yhteyttä. Kerromme nopeasti, onnistuuko kohteesi, ja sovimme
              tarvittaessa ilmaisen arviokäynnin.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-accent-ink">
              <MapPin className="w-6 h-6 text-primary" />
              Paikkakunnat
            </h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {allCities.map((city) => (
                <li key={city.slug} className="bg-card rounded-xl border border-border/50 p-4">
                  <Link to={`/maalauspalvelut-${city.slug}/`} className="flex items-center justify-between gap-1 font-bold text-foreground hover:text-accent-ink transition-colors group">
                    <span>{city.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </Link>
                  <p className="text-sm text-muted-foreground mt-1.5 flex flex-wrap gap-x-3">
                    {hasPinnoitusPage(city.slug) && (
                      <Link to={`/tiilikaton-pinnoitus-${city.slug}/`} className="hover:text-accent-ink underline-offset-2 hover:underline">
                        Tiilikaton pinnoitus
                      </Link>
                    )}
                    {hasMaalausPage(city.slug) && (
                      <Link to={`/talon-maalaus-${city.slug}/`} className="hover:text-accent-ink underline-offset-2 hover:underline">
                        Talon maalaus
                      </Link>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ServiceContactSection variant="general" />
    </div>
  );
};

export default ToimintaAlueet;
