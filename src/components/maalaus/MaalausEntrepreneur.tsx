import { getStorageUrl } from '@/lib/storage';
import { LUVUT } from '@/data/company';

const eemilImage = getStorageUrl('Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp');

/** Yrittäjän terveiset maalaussivuille. Paikkakunta propsina; luvut ja takuu samat kuin muualla sivustolla. */
const MaalausEntrepreneur = ({ cityIn }: { cityIn?: string }) => {
  const paikka = cityIn ? `${cityIn} ja muualla Pirkanmaalla` : 'Pirkanmaalla ja lähikunnissa';
  return (
    <section className="section-padding bg-secondary">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-8 text-center">Kuka talosi maalaa? Terveiset yrittäjältä</h2>

          <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
            <div className="flex justify-center">
              <img
                src={eemilImage}
                alt="Eemil Pitkänen, Pintanen Oy"
                width={160}
                height={160}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Moi, olen Eemil. Maalaan talot {paikka} itse alusta loppuun. Pesen seinät, kaavin irtoavan maalin, pohjamaalaan paljaat
                kohdat ja maalaan pintamaalin pensselillä.
              </p>
              <p>
                Olen tehnyt tätä työtä yli viisi vuotta ja maalannut {LUVUT.maalatutTalot} taloa. Pohjatyöt ratkaisevat, kuinka pitkään maali kestää. Siksi
                annan työlleni <strong className="text-foreground">2 vuoden kirjallisen takuun</strong>.
              </p>
              <p className="font-medium text-foreground">— Eemil, Pintanen Oy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaalausEntrepreneur;
