import { getStorageUrl } from '@/lib/storage';
import { merkitse } from "@/components/Rytmi";
import { LUVUT } from '@/data/company';

const eerikImage = getStorageUrl('Pictures-200/Eerik-Pitkanen-tiilikaton-pinnoitus-pintanen.webp');

/**
 * Eerik tekee työn: kuva vasemmalla, teksti oikealla, ei lainausmerkkejä eikä kursiivia
 * (tarkastus 12.10.2026, T12–T13). Paikkakunta tulee propsina (V1). Lause "sama mies käy
 * katsomassa, tekee tarjouksen ja tekee työn" sanotaan sivustolla vain tässä.
 */
/** Kaupunkisivulla pelkkä paikkakunta: Pirkanmaa mainitaan leipätekstissä enintään kerran (Eerik 27.10.2026). */
const PinnoitusEntrepreneur = ({ cityIn }: { cityIn?: string }) => {
  const paikka = cityIn ?? 'Pirkanmaalla ja lähikunnissa';
  return (
    <section className="section-padding osio">
      <div className="section-container">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[auto_1fr] gap-8 md:gap-10 items-start">
          <img
            loading="lazy"
            decoding="async"
            src={eerikImage}
            alt="Eerik Pitkänen, Pintanen Oy"
            width={200}
            height={200}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover ring-4 ring-white/20"
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-accent-ink mb-4 font-heading">Eerik tekee työn</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Olen Eerik. Perustin Pintasen vuonna 2025. Teen tiilikattojen pinnoitukset {paikka} itse alusta
                loppuun.
              </p>
              <p>
                Olen tehnyt kattotöitä vuodesta 2022 ja pinnoittanut {LUVUT.pinnoitetutKatot} kattoa. Sama mies käy katsomassa, tekee
                tarjouksen ja tekee työn. Annan työlle 5 vuoden kirjallisen takuun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

merkitse(PinnoitusEntrepreneur, "navy");

export default PinnoitusEntrepreneur;
