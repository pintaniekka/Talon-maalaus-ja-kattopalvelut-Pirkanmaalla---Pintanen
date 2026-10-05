import { Link } from "react-router-dom";
import { Search } from "@/components/icons/BrandIcons";
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import { getResponsiveSrc, getResponsiveSrcSet } from '@/lib/storage';

const beforeBase = "keltainen-puutalo-varinvaihto-ennen-maalausta";
const afterBase = "violetti-puutalo-varinvaihto-peittomaalaus-jalkeen";

const warningSignsData = [
  { sign: 'Maali hilseilee tai lohkeilee', desc: 'Kosteus on päässyt maalin alle ja heikentänyt sen tartunnan puuhun.' },
  { sign: 'Pinta liituuntuu tai haalistuu', desc: 'Maalipinta on hapettunut, eikä se enää hylje vettä tai likaa.' },
  { sign: 'Mustat pilkut seinässä', desc: (<>Pilkut ovat hometta tai likaa. Seinä <strong className="text-foreground">pestään homepesuaineella ennen maalausta</strong>.</>) },
  { sign: 'Halkeamat paneelien päissä', desc: 'Puu on päässyt kastumaan ja kuivumaan toistuvasti, mikä on rikkonut puun rakenteen.' },
];

const MaalausProblemSection = () => {
  return (
    <section className="section-padding bg-accent-light">
      <div className="section-container">
        <div
          className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4">
            Miksi talo kannattaa maalata ajoissa?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Maali suojaa puuta vedeltä ja auringolta. Kun maali haalistuu, hilseilee tai halkeilee, <strong className="text-foreground">puu alkaa imeä vettä</strong>. Silloin talo kannattaa maalata ennen kuin vesi ehtii puun sisään.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
          {/* Left: Before/After slider (sticky on desktop) */}
          <div className="lg:sticky lg:top-28">
            <BeforeAfterSlider
              beforeImage={getResponsiveSrc(beforeBase)}
              afterImage={getResponsiveSrc(afterBase)}
              beforeSrcSet={getResponsiveSrcSet(beforeBase)}
              afterSrcSet={getResponsiveSrcSet(afterBase)}
              beforeAlt="Keltainen puutalo ennen maalausta"
              afterAlt="Sama puutalo violettina maalauksen jälkeen"
            />
          </div>

          {/* Right: Informational text */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Maali pitää veden pois puusta
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Syksyn viistosade ja talven kostea ilma kastelevat suojaamattoman puun. Märkä puu <strong className="text-foreground">laajenee ja kutistuu</strong>, ja laudat halkeilevat. Jatkuva kosteus on myös hyvä kasvualusta homeelle ja laholle. Ehjä maalipinta pitää veden puun ulkopuolella, ja ulkoverhous kestää pitkään.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Aurinko haalistaa ja haurastuttaa maalin
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Aurinko haalistaa maalin ja harmaannuttaa paljaan puun. Harmaantunut puu on nukkainen, eikä uusi maali tartu siihen kunnolla. Siksi <strong className="text-foreground">paljaat kohdat pohjamaalataan</strong> ennen pintamaalia. Eteläseinä kuluu yleensä ensin.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-accent-ink" />
                Onko talosi seinässä näitä merkkejä?
              </h4>
              <ul className="space-y-3">
                {warningSignsData.map((w) => (
                  <li key={String(w.sign)} className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">{w.sign}:</strong> {w.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/tarjouspyynto/?palvelu=maalaus"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors hover:brightness-110"
              style={{ backgroundColor: "hsl(var(--accent-strong))" }}
            >
              Pyydä ilmainen arviokäynti
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaalausProblemSection;
