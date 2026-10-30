import { useEffect, useMemo, useState } from "react";
import AvifKuva from "@/components/AvifKuva";
import EnnenJalkeenMerkki from "@/components/EnnenJalkeenMerkki";
import { X } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ResponsiveImage from "@/components/ResponsiveImage";
import { getResponsiveSrc, getResponsiveSrcSet, getResponsiveUrl } from "@/lib/storage";
import { referenssit, referenssiKunnat, type ReferenssiNakyma } from "@/data/referenssit";
import type { ProjectService } from "@/data/projects";

type Suodatin = "kaikki" | ProjectService;

const suodattimet: { key: Suodatin; label: string }[] = [
  { key: "kaikki", label: "Kaikki" },
  { key: "pinnoitus", label: "Tiilikaton pinnoitus" },
  { key: "maalaus", label: "Talon maalaus" },
];

const ERA = 12;

/** Keltainen laatta kuvan päällä: "Ennen" tai "Jälkeen". */
const Merkki = ({ children }: { children: string }) => <EnnenJalkeenMerkki label={children} className="absolute left-3 top-3" />;

interface Avattu {
  title: string;
  kuvat: { base: string; alt: string; label?: string }[];
}

/** Kuvan tai kuvaparin suurennus. Sulkeutuu Esc-näppäimellä ja taustaa napauttamalla. */
const Suurennus = ({ avattu, onClose }: { avattu: Avattu; onClose: () => void }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={avattu.title}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
        onClick={onClose}
        aria-label="Sulje"
      >
        <X className="h-7 w-7" />
      </button>
      <div
        className={`grid w-full max-w-6xl gap-3 ${avattu.kuvat.length > 1 ? "md:grid-cols-2" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {avattu.kuvat.map((k) => (
          <figure key={k.base} className="relative">
            <AvifKuva>
              <img
                src={getResponsiveUrl(k.base, 1200)}
                srcSet={getResponsiveSrcSet(k.base)}
                sizes="(max-width: 768px) 100vw, 50vw"
                alt={k.alt}
                className="max-h-[80vh] w-full rounded-2xl object-contain"
              />
            </AvifKuva>
            {k.label && <Merkki>{k.label}</Merkki>}
          </figure>
        ))}
      </div>
      <p className="absolute bottom-5 left-0 right-0 text-center font-heading text-base font-bold text-white">{avattu.title}</p>
    </div>
  );
};

const kortinOtsikko = (k: ReferenssiNakyma) => `${k.title}, ${k.cityName}${k.year ? ` ${k.year}` : ""}`;

/** Yksi kortti: liukusäädin, kuvapari tai yksi kuva, alla otsikko ja yksi lause. */
const Kortti = ({ k, iso, onOpen }: { k: ReferenssiNakyma; iso: boolean; onOpen: (a: Avattu) => void }) => {
  const otsikko = kortinOtsikko(k);
  const sizes = iso ? "(max-width: 1023px) 100vw, 760px" : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 380px";
  return (
    <figure className={`kortti flex flex-col overflow-hidden ${iso ? "sm:col-span-2" : ""}`}>
      {k.pair ? (
        <BeforeAfterSlider
          className="rounded-none shadow-none"
          beforeImage={getResponsiveSrc(`${k.pair}-ennen`)}
          beforeSrcSet={getResponsiveSrcSet(`${k.pair}-ennen`)}
          afterImage={getResponsiveSrc(`${k.pair}-jalkeen`)}
          afterSrcSet={getResponsiveSrcSet(`${k.pair}-jalkeen`)}
          beforeAlt={`${k.alt}: ennen`}
          afterAlt={`${k.alt}: jälkeen`}
          aspectRatio="4/3"
        />
      ) : k.before && k.after ? (
        <button
          type="button"
          className="grid grid-cols-2 gap-1 text-left"
          onClick={() =>
            onOpen({
              title: otsikko,
              kuvat: [
                { base: k.before!, alt: `${k.alt}: ennen`, label: "Ennen" },
                { base: k.after!, alt: `${k.alt}: jälkeen`, label: "Jälkeen" },
              ],
            })
          }
        >
          <span className="sr-only">Suurenna: {otsikko}</span>
          {[
            { base: k.before, label: "Ennen" },
            { base: k.after, label: "Jälkeen" },
          ].map((side) => (
            <span key={side.base} className="relative block">
              <ResponsiveImage
                baseName={side.base}
                alt={`${k.alt}: ${side.label.toLowerCase()}`}
                className={`w-full object-cover ${iso ? "aspect-[4/3]" : "aspect-[3/4]"}`}
                sizes={iso ? "(max-width: 1023px) 50vw, 380px" : "(max-width: 639px) 50vw, 190px"}
                width={800}
                height={iso ? 600 : 1067}
              />
              <Merkki>{side.label}</Merkki>
            </span>
          ))}
        </button>
      ) : (
        <button
          type="button"
          className="block text-left"
          onClick={() => onOpen({ title: otsikko, kuvat: [{ base: k.image!, alt: k.alt }] })}
        >
          <span className="sr-only">Suurenna: {otsikko}</span>
          <ResponsiveImage baseName={k.image!} alt={k.alt} className="aspect-[4/3] w-full object-cover" sizes={sizes} width={800} height={600} />
        </button>
      )}
      <figcaption className="flex flex-1 flex-col gap-1 px-5 pb-5 pt-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {k.cityName}
          {k.year ? ` · ${k.year}` : ""}
        </span>
        <span className="font-heading text-lg font-extrabold leading-snug text-navy">{k.title}</span>
        {k.text && <span className="text-[15px] leading-relaxed text-muted-foreground">{k.text}</span>}
      </figcaption>
    </figure>
  );
};

/**
 * Referenssigalleria (Eerik 27.10.2026: galleria uusiksi). Kohteet tulevat src/data/referenssit.ts:stä:
 * ennen–jälkeen-parit ensin (ensimmäinen isona), suodatus palvelun ja kunnan mukaan, 12 korttia kerrallaan.
 * Liukusäädin paria varten, muut kuvat suurenevat napautuksella.
 */
const ReferenssiGalleria = () => {
  const [palvelu, setPalvelu] = useState<Suodatin>("kaikki");
  const [kunta, setKunta] = useState("kaikki");
  const [maara, setMaara] = useState(ERA);
  const [avattu, setAvattu] = useState<Avattu | null>(null);
  const kunnat = useMemo(referenssiKunnat, []);

  const lista = useMemo(
    () =>
      referenssit.filter(
        (k) => (palvelu === "kaikki" || k.services.includes(palvelu)) && (kunta === "kaikki" || k.city === kunta),
      ),
    [palvelu, kunta],
  );
  const nakyvat = lista.slice(0, maara);

  const valitse = (p: Suodatin, c: string) => {
    setPalvelu(p);
    setKunta(c);
    setMaara(ERA);
  };

  return (
    <section className="section-padding osio" aria-labelledby="referenssit-otsikko">
      <div className="section-container max-w-6xl">
        <div className="mb-8 text-center">
          <h2 id="referenssit-otsikko" className="font-heading text-3xl font-extrabold text-navy md:text-4xl">
            Tiilikaton pinnoituksia ja talon maalauksia
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            Kaikki kuvat ovat omista kohteistamme. Vedä liukusäädintä, niin näet kohteen ennen ja jälkeen.
          </p>
        </div>

        <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Palvelu">
            {suodattimet.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => valitse(s.key, kunta)}
                aria-pressed={palvelu === s.key}
                className={`rounded-xl border-[3px] border-navy px-4 py-2 font-heading text-sm font-extrabold transition-colors ${
                  palvelu === s.key ? "bg-navy text-white" : "bg-card text-navy hover:bg-accent-light"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 font-heading text-sm font-extrabold text-navy">
            <span className="sr-only">Kunta</span>
            <select
              value={kunta}
              onChange={(e) => valitse(palvelu, e.target.value)}
              className="rounded-xl border-[3px] border-navy bg-card px-3 py-2 text-sm font-extrabold text-navy"
            >
              <option value="kaikki">Kaikki kunnat</option>
              {kunnat.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <p className="mb-6 text-center text-sm text-muted-foreground" aria-live="polite">
          {lista.length} {lista.length === 1 ? "kohde" : "kohdetta"}
        </p>

        <div className="grid items-start gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {nakyvat.map((k, i) => (
            <Kortti key={k.pair ?? k.image ?? k.after ?? i} k={k} iso={i === 0 && k.ennenJalkeen} onOpen={setAvattu} />
          ))}
        </div>

        {lista.length === 0 && <p className="py-12 text-center text-muted-foreground">Tällä valinnalla ei ole vielä kuvia.</p>}

        {maara < lista.length && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setMaara((m) => m + ERA)}
              className="inline-flex items-center justify-center rounded-2xl bg-paint-yellow px-8 py-4 font-heading text-base font-extrabold text-paint-yellow-foreground shadow-xl shadow-paint-yellow/40 transition-all hover:scale-[1.03] hover:bg-paint-yellow-hover"
            >
              Näytä lisää
            </button>
          </div>
        )}
      </div>

      {avattu && <Suurennus avattu={avattu} onClose={() => setAvattu(null)} />}
    </section>
  );
};

export default ReferenssiGalleria;
