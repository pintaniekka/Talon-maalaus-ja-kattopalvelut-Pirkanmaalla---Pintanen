import { getStorageUrl } from '@/lib/storage';
import { merkitse } from '@/components/Rytmi';
import { LUVUT, TAKUU } from '@/data/company';

const eemilImage = getStorageUrl('Pictures-200/Eemil-Pitkanen-talon-maalaus-pintanen.webp');

/** Kolme lukua tekstin alla; samat luvut kuin herossa ja Meistä-sivulla. */
const luvut = [
  { label: 'Maalattua taloa', value: LUVUT.maalatutTalot },
  { label: 'Takuu työlle', value: TAKUU.maalaus },
  { label: 'Maalaria työmaalla', value: '2' },
];

/**
 * Eemil maalaa: tummansininen näyttämö (Rytmi), pyöreä kuva vasemmalla, teksti oikealla ja alla kolme
 * lukua (Eerik 28.10.2026: lohko selkeämmäksi). Työvaiheet kerrotaan Lyhyesti-laatikossa ja prosessissa,
 * joten tässä sanotaan vain se, mitä muualla ei sanota. Kaupunkisivulla pelkkä paikkakunta: Pirkanmaa
 * mainitaan leipätekstissä enintään kerran (Eerik 27.10.2026).
 */
const MaalausEntrepreneur = ({ cityIn }: { cityIn?: string }) => {
  const paikka = cityIn ?? 'Pirkanmaalla ja lähikunnissa';
  return (
    <section className="section-padding osio">
      <div className="section-container">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
          <img
            loading="lazy"
            decoding="async"
            src={eemilImage}
            alt="Eemil Pitkänen, Pintanen Oy"
            width={200}
            height={200}
            className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover ring-4 ring-white/25 shadow-[0_18px_44px_rgba(0,0,0,0.35)] mx-auto"
          />
          <div>
            <span className="lohko-otsake mb-3">Tekijä</span>
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 font-heading">Eemil maalaa</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                Olen Eemil. Maalaan talot {paikka} itse alusta loppuun. Olen maalannut {LUVUT.maalatutTalot} taloa.
              </p>
              <p>Maalataan seinät aina kahdestaan maalausparin kanssa.</p>
              <p>Annan työlle 2 vuoden kirjallisen takuun.</p>
            </div>
            <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-border/25 pt-6">
              {luvut.map((l) => (
                <div key={l.label}>
                  <dd className="luku-korostus font-heading text-2xl md:text-3xl font-extrabold leading-none">{l.value}</dd>
                  <dt className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{l.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

merkitse(MaalausEntrepreneur, "navy");

export default MaalausEntrepreneur;
