import { Link } from 'react-router-dom';
import ResponsiveImage from '@/components/ResponsiveImage';
import { MAALAUS_HINTA } from '@/data/tyovaiheet';
import { getArticleBySlug, isPublished } from '@/data/articles';

const comparisonBase = "talon-maalaus-keltainen-ulkoverhous-huoltomaalaus-jalkeen";
const ARTIKKELI_SLUG = "huoltomaalaus-vai-uusi-ulkoverhous";

/** Huoltomaalaus vai uusi ulkoverhous (palvelusivu ja hintasivu). Ei säästölukuja, hinta haarukkana. */
const MaalausComparison = () => {
  // Linkki artikkeliin vasta julkaisupäivästä: jonossa oleva artikkeli on noindex-kuori (osa 2, luku 6).
  const artikkeli = getArticleBySlug(ARTIKKELI_SLUG);
  const artikkeliJulkaistu = !!artikkeli && isPublished(artikkeli);
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6">Huoltomaalaus vai uusi ulkoverhous?</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>Usein huoltomaalaus riittää. Hyvillä pohjatöillä ja uudella maalilla seinä kestää taas vuosia.</p>
                <p>
                  Huoltomaalaus maksaa meillä yleensä {MAALAUS_HINTA}. Uusi ulkoverhous maksaa paljon enemmän. Katsomme seinät
                  arviokäynnillä. Jos maalaus ei riitä, sanomme sen.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/hintalaskuri/?palvelu=maalaus"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-paint-yellow hover:bg-paint-yellow-hover text-paint-yellow-foreground font-heading font-extrabold rounded-2xl transition-all hover:scale-[1.03] shadow-xl shadow-paint-yellow/40 text-lg"
                >
                  Hintalaskuri
                </Link>
                {artikkeliJulkaistu && (
                  <Link
                    to={`/artikkelit/${ARTIKKELI_SLUG}/`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-accent-ink border-2 border-accent transition-colors hover:bg-accent-light text-lg"
                  >
                    Lue: huoltomaalaus vai uusi ulkoverhous?
                  </Link>
                )}
              </div>
            </div>

            <ResponsiveImage
              baseName={comparisonBase}
              alt="Keltainen ulkoverhous huoltomaalauksen jälkeen"
              className="w-full rounded-2xl shadow-lg"
              sizes="(max-width: 1024px) 100vw, 50vw"
              width={1200}
              height={1600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaalausComparison;
