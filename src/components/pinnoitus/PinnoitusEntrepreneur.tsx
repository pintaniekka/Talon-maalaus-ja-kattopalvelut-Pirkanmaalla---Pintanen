import { getStorageUrl } from '@/lib/storage';
import { merkitse } from '@/components/Rytmi';
import { LUVUT, TAKUU } from '@/data/company';

const eerikImage = getStorageUrl('Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp');

/** Kolme lukua tekstin alla; samat luvut kuin herossa ja Meistä-sivulla. */
const luvut = [
  { label: 'Pinnoitettua kattoa', value: LUVUT.pinnoitetutKatot },
  { label: 'Takuu työlle', value: TAKUU.pinnoitus },
  { label: 'Kattotöitä', value: 'vuodesta 2022' },
];

/**
 * Eerik tekee työn: tummansininen näyttämö (Rytmi), pyöreä kuva vasemmalla, teksti oikealla ja alla
 * kolme lukua (Eerik 28.10.2026: lohko selkeämmäksi). Ei lainausmerkkejä eikä kursiivia (tarkastus
 * 12.10.2026, T12–T13). Paikkakunta tulee propsina (V1). Lause "sama mies käy katsomassa, tekee
 * tarjouksen ja tekee työn" sanotaan sivustolla vain tässä. Kaupunkisivulla pelkkä paikkakunta:
 * Pirkanmaa mainitaan leipätekstissä enintään kerran (Eerik 27.10.2026).
 */
const PinnoitusEntrepreneur = ({ cityIn }: { cityIn?: string }) => {
  const paikka = cityIn ?? 'Pirkanmaalla ja lähikunnissa';
  return (
    <section className="section-padding osio">
      <div className="section-container">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
          <img
            loading="lazy"
            decoding="async"
            src={eerikImage}
            alt="Eerik Pitkänen, Pintanen Oy"
            width={200}
            height={200}
            className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover ring-4 ring-white/25 shadow-[0_18px_44px_rgba(0,0,0,0.35)] mx-auto"
          />
          <div>
            <span className="lohko-otsake mb-3">Tekijä</span>
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 font-heading">Eerik tekee työn</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                Olen Eerik. Perustin Pintasen vuonna 2025. Teen tiilikattojen pinnoitukset {paikka} itse alusta
                loppuun.
              </p>
              <p>
                Olen tehnyt kattotöitä vuodesta 2022 ja pinnoittanut {LUVUT.pinnoitetutKatot} kattoa. Sama mies käy katsomassa, tekee
                tarjouksen ja tekee työn. Annan työlle 5 vuoden kirjallisen takuun.
              </p>
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

merkitse(PinnoitusEntrepreneur, "navy");

export default PinnoitusEntrepreneur;
