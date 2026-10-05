import { Link } from 'react-router-dom';
import ResponsiveImage from '@/components/ResponsiveImage';
import { MAALAUS_HINTA } from '@/data/tyovaiheet';

const comparisonBase = "keltainen-ulkoverhous-huoltomaalaus-jalkeen";

/** Huoltomaalaus vai uusi ulkoverhous (palvelusivu ja hintasivu). Ei säästölukuja, hinta haarukkana. */
const MaalausComparison = () => {
  return (
    <section className="section-padding bg-background">
      <div className="section-container">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-6">Huoltomaalaus vai uusi ulkoverhous?</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Jos puu on kovaa eikä laho, <strong className="text-foreground">huoltomaalaus riittää</strong>. Pesemme seinät,
                  kaavimme irtoavan maalin, pohjamaalaamme paljaat kohdat ja maalaamme pintamaalin pensselillä.
                </p>
                <p>
                  Huoltomaalaus maksaa meillä yleensä <strong className="text-foreground">{MAALAUS_HINTA}</strong>. Uusi ulkoverhous
                  maksaa paljon enemmän. Lautoja emme vaihda: jos laudat ovat lahot, sanomme sen suoraan arviokäynnillä.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/hintalaskuri/?palvelu=maalaus"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-foreground transition-all hover:brightness-95 text-lg"
                  style={{ backgroundColor: 'hsl(36, 56%, 91%)' }}
                >
                  Hintalaskuri
                </Link>
                <Link
                  to="/artikkelit/huoltomaalaus-vai-uusi-ulkoverhous/"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-accent-ink border-2 border-accent transition-colors hover:bg-accent-light text-lg"
                >
                  Lue: huoltomaalaus vai uusi ulkoverhous?
                </Link>
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
