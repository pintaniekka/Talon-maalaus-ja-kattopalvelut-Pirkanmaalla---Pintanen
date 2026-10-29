import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";
import ResponsiveImage from "@/components/ResponsiveImage";
import { HERO_BASE, staticSeo } from "@/data/seo";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import { authors } from "@/data/authors";
import { GOOGLE_PROFILE_URL, LUVUT } from "@/data/company";
import { categoryLabels, formatDateFi, getPublishedArticles, type ArticleCategory, type ArticleMeta } from "@/data/articles";
import { PASTELLI, SUODATIN_NIMI, TAGI } from "@/data/artikkeliTagit";

/*
 * Artikkelilistaus (Eerik 29.10.2026, ehdotuskuva): oma kevyt hero (teksti vasemmalla, kuva oikealla,
 * suodattimet heron alareunassa), uusin artikkeli isona navy-korttina, tärkeiksi merkityt (ArticleMeta.tarkea)
 * navy-kortteina keltaisella tagilla, muut valkoisina leijuvina kortteina harmaansinisellä taustalla.
 * Suodatus ja "Näytä lisää" ovat selaimen tilaa: kaikki julkaistut artikkelit ovat valmiissa HTML:ssä ja
 * piilotetaan vain luokalla. Ei CTA-nappeja, ei lomaketta, ei arvostelunostoa (artikkelit ovat tekstiä).
 * Sivu ei kuulu Rytmi-vuorotteluun: hero ja listaus ovat omia lohkoja omilla taustoillaan.
 * Värit: navy ja sivun tausta tokeneina; tagien pastellit, keltainen #ffd23f ja metarivin #9fb0c7 ovat
 * tämän sivun omia arvoja (Eerikin ehdotus).
 */

type Suodatin = "kaikki" | ArticleCategory;

const KATEGORIAT = Object.keys(categoryLabels) as ArticleCategory[];

/** Näkyviä kortteja ennen "Näytä lisää" ja montako nappi paljastaa kerralla. */
export const KERRALLA = 8;

const korttiPohja =
  "group block overflow-hidden transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0";
const varjoPieni = "shadow-[0_10px_22px_-8px_rgba(11,26,51,0.22)] hover:shadow-[0_16px_30px_-8px_rgba(11,26,51,0.34)] focus-visible:shadow-[0_16px_30px_-8px_rgba(11,26,51,0.34)]";
const varjoIso = "shadow-[0_14px_28px_-8px_rgba(11,26,51,0.28)] hover:shadow-[0_22px_38px_-8px_rgba(11,26,51,0.4)] focus-visible:shadow-[0_22px_38px_-8px_rgba(11,26,51,0.4)]";

const Tagi = ({ a, navy, uusin = false }: { a: ArticleMeta; navy: boolean; uusin?: boolean }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-heading text-[11px] font-extrabold tracking-[0.08em] ${
      navy ? "bg-[#ffd23f] text-[#0b1a33]" : PASTELLI[a.category]
    }`}
    data-tagi={navy ? "keltainen" : "pastelli"}
  >
    {uusin ? `UUSIN · ${TAGI[a.category]}` : TAGI[a.category]}
  </span>
);

const Meta = ({ a, navy, kirjoittaja = true }: { a: ArticleMeta; navy: boolean; kirjoittaja?: boolean }) => (
  <p className={`text-[12px] ${navy ? "text-[#9fb0c7]" : "text-[#4a5668]"}`}>
    {kirjoittaja && <>{authors[a.author].name} · </>}
    <time dateTime={a.publishedAt}>{formatDateFi(a.publishedAt)}</time> · {a.readingMinutes} min
  </p>
);

const Kuva = ({ a, aspect, sizes, priority = false }: { a: ArticleMeta; aspect: string; sizes: string; priority?: boolean }) => (
  <OptimizedImage
    src={getResponsiveSrc(a.heroImage)}
    srcSet={getResponsiveSrcSet(a.heroImage)}
    sizes={sizes}
    alt=""
    className={`${aspect} w-full object-cover bg-muted`}
    width={1200}
    height={800}
    priority={priority}
  />
);

/** Pieni kortti (4 saraketta). Navy, jos artikkeli on merkitty tärkeäksi. */
const PieniKortti = ({ a, hidden }: { a: ArticleMeta; hidden: boolean }) => {
  const navy = !!a.tarkea;
  return (
    <li className={hidden ? "hidden" : ""} data-kortti={navy ? "navy" : "valkoinen"}>
      <Link to={`/artikkelit/${a.slug}/`} className={`${korttiPohja} ${varjoPieni} h-full rounded-[14px] ${navy ? "bg-navy text-white" : "bg-card text-foreground"}`}>
        <Kuva a={a} aspect="aspect-[16/7]" sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw" />
        <div className="flex flex-col gap-2 p-3.5">
          <div>
            <Tagi a={a} navy={navy} />
          </div>
          <h2 className={`text-[12px] font-medium leading-snug ${navy ? "text-white" : "text-foreground group-hover:text-accent-ink"}`}>{a.title}</h2>
          <Meta a={a} navy={navy} kirjoittaja={false} />
        </div>
      </Link>
    </li>
  );
};

/** Keskikortti (nostokortin vieressä). */
const KeskiKortti = ({ a }: { a: ArticleMeta }) => {
  const navy = !!a.tarkea;
  return (
    <li data-kortti={navy ? "navy" : "valkoinen"}>
      <Link to={`/artikkelit/${a.slug}/`} className={`${korttiPohja} ${varjoPieni} flex h-full flex-col rounded-[16px] ${navy ? "bg-navy text-white" : "bg-card text-foreground"}`}>
        <Kuva a={a} aspect="aspect-[16/6]" sizes="(min-width: 1024px) 440px, (min-width: 640px) 50vw, 100vw" />
        <div className="flex flex-1 flex-col gap-2 p-4">
          <div>
            <Tagi a={a} navy={navy} />
          </div>
          <h2 className={`text-[13px] font-medium leading-snug ${navy ? "text-white" : "text-foreground group-hover:text-accent-ink"}`}>{a.title}</h2>
          <div className="mt-auto">
            <Meta a={a} navy={navy} kirjoittaja={false} />
          </div>
        </div>
      </Link>
    </li>
  );
};

/** Uusin artikkeli: aina navy. */
const NostoKortti = ({ a }: { a: ArticleMeta }) => (
  <Link
    to={`/artikkelit/${a.slug}/`}
    className={`${korttiPohja} ${varjoIso} flex h-full flex-col rounded-[20px] bg-navy text-white`}
    data-kortti="nosto"
  >
    {/* Kuva täyttää korkeuseron keskikortteihin: teksti pysyy tiiviinä kortin alareunassa. */}
    <div className="relative aspect-[2/1] lg:aspect-auto lg:min-h-[260px] lg:flex-1">
      <OptimizedImage
        src={getResponsiveSrc(a.heroImage)}
        srcSet={getResponsiveSrcSet(a.heroImage)}
        sizes="(min-width: 1024px) 640px, 100vw"
        alt=""
        className="absolute inset-0 h-full w-full object-cover bg-muted"
        width={1200}
        height={800}
      />
    </div>
    <div className="flex flex-col gap-3 p-5 md:p-6">
      <div>
        <Tagi a={a} navy uusin />
      </div>
      <h2 className="text-[18px] font-medium leading-snug text-white">{a.title}</h2>
      <Meta a={a} navy />
    </div>
  </Link>
);

const Tahdet = () => (
  <span className="flex gap-0.5" aria-hidden="true">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="#FBBC05">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </svg>
    ))}
  </span>
);

interface ListausProps {
  /** Julkaistut artikkelit uusimmasta vanhimpaan. Testit antavat oman listan. */
  artikkelit: ArticleMeta[];
}

/** Listaus ilman SEO-tageja: hero, suodattimet, nosto, keskikortit, pienet kortit ja "Näytä lisää". */
export const ArtikkelitListaus = ({ artikkelit }: ListausProps) => {
  const [suodatin, setSuodatin] = useState<Suodatin>("kaikki");
  const [naytetty, setNaytetty] = useState(KERRALLA);

  const julkaistut = [...artikkelit].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0));
  const maara = (k: ArticleCategory) => julkaistut.filter((a) => a.category === k).length;
  const napit: { arvo: Suodatin; nimi: string; maara: number }[] = [
    { arvo: "kaikki", nimi: "Kaikki", maara: julkaistut.length },
    ...KATEGORIAT.filter((k) => maara(k) > 0).map((k) => ({ arvo: k, nimi: SUODATIN_NIMI[k], maara: maara(k) })),
  ];

  const nakyvat = julkaistut.filter((a) => suodatin === "kaikki" || a.category === suodatin);
  const piilotetut = julkaistut.filter((a) => !nakyvat.includes(a));
  const nosto = nakyvat[0];
  const keski = nakyvat.slice(1, 3);
  const pienet = nakyvat.slice(3);
  const jaljella = Math.max(0, nakyvat.length - naytetty);

  const valitse = (arvo: Suodatin) => {
    setSuodatin(arvo);
    setNaytetty(KERRALLA);
  };

  return (
    <>
      {/* HERO: teksti vasemmalla, kuva oikealla, suodattimet alareunassa. Oma kevyt hero, koska PageHero vaatii pääpainikkeen. */}
      <section className="hero-critical bg-background px-4 pb-8 pt-24 md:px-8 md:pt-28" aria-labelledby="artikkelit-otsikko">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div>
            <div className="mb-4 inline-flex items-center gap-3">
              <span className="h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
              <span className="font-heading text-xs font-extrabold uppercase tracking-[0.2em] text-accent-ink md:text-[13px]">Tiilikatto ja talon maalaus</span>
            </div>
            <h1 id="artikkelit-otsikko" className="heading-style mb-3 text-4xl leading-[1.1] text-foreground md:text-[2.75rem]">
              Artikkelit ja{" "}
              <span className="rounded-md bg-[#ffd23f] px-2 py-0.5 text-[#0b1a33]" style={{ boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>
                oppaat
              </span>
            </h1>
            <p className="mb-3 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Tietoa tiilikaton pinnoituksesta ja talon maalauksesta.
            </p>
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:underline"
            >
              <Tahdet />
              <span>
                {LUVUT.googleArvio} Google-arvioissa
                <span className="sr-only">, lue Pintasen Google-arviot</span>
              </span>
            </a>

            {/* Suodatinnapit: aktiivinen navy, muut valkoiset. aria-pressed kertoo tilan ruudunlukijalle. */}
            <div role="group" aria-label="Suodata aiheen mukaan" className="flex flex-wrap gap-2">
              {napit.map((n) => {
                const aktiivinen = suodatin === n.arvo;
                return (
                  <button
                    key={n.arvo}
                    type="button"
                    aria-pressed={aktiivinen}
                    onClick={() => valitse(n.arvo)}
                    className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 font-heading text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/70 ${
                      aktiivinen
                        ? "bg-navy text-white shadow-[0_6px_16px_-4px_rgba(11,26,51,0.45)]"
                        : "bg-card text-foreground shadow-[0_2px_8px_rgba(11,26,51,0.08)] hover:bg-accent-light"
                    }`}
                  >
                    {n.nimi}
                    <span className={`text-xs font-semibold ${aktiivinen ? "text-white/80" : "text-[#4a5668]"}`}>{n.maara}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <ResponsiveImage
              baseName={HERO_BASE.alue}
              alt="Vaalea puutalo, jossa on harmaat listat ja tumma tiilikatto, edessä kuisti ja portaat, taustalla kuusia"
              className="aspect-[16/9] w-full rounded-[20px] object-cover shadow-[0_18px_36px_-10px_rgba(11,26,51,0.4)] lg:aspect-[16/10]"
              sizes="(min-width: 1024px) 520px, 100vw"
              width={1200}
              height={900}
              priority
            />
            {/* Kelluva kirjoittajakortti kuvan alakulmassa. Eerik 29.10.2026: vain nimet, "tekevät työn itse" on jo ingressissä. */}
            <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-[14px] bg-card px-4 py-2.5 shadow-[0_10px_24px_-8px_rgba(11,26,51,0.35)] md:left-6">
              <span className="flex -space-x-2" aria-hidden="true">
                {[authors.eerik, authors.eemil].map((k) => (
                  <img key={k.id} src={k.image} alt="" width={32} height={32} loading="lazy" decoding="async" className="h-8 w-8 rounded-full object-cover ring-2 ring-card" />
                ))}
              </span>
              <span className="text-[13px] font-semibold text-foreground">Kirjoittajat: Eerik ja Eemil</span>
            </div>
          </div>
        </div>
      </section>

      {/* LISTAUS harmaansinisellä taustalla alatunnisteeseen asti. */}
      <section className="bg-[hsl(var(--tausta-harmaansininen))] px-4 pb-16 pt-12 md:px-8 md:pb-24 md:pt-14" aria-label="Artikkelit">
        <div className="mx-auto w-full max-w-6xl">
          {nosto && (
            <div className="grid gap-4 md:gap-[18px] lg:grid-cols-[1.5fr_1fr]">
              <NostoKortti a={nosto} />
              {keski.length > 0 && (
                <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 md:gap-[18px] lg:grid-cols-1 lg:grid-rows-2">
                  {keski.map((a) => (
                    <KeskiKortti key={a.slug} a={a} />
                  ))}
                </ul>
              )}
            </div>
          )}

          <ul className="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2 md:mt-[18px] md:gap-[18px] lg:grid-cols-4">
            {pienet.map((a, i) => (
              <PieniKortti key={a.slug} a={a} hidden={i + 3 >= naytetty} />
            ))}
            {piilotetut.map((a) => (
              <PieniKortti key={a.slug} a={a} hidden />
            ))}
          </ul>

          {jaljella > 0 && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setNaytetty((n) => n + KERRALLA)}
                className="inline-flex min-h-[44px] items-center rounded-full bg-navy px-6 font-heading text-sm font-bold text-white shadow-[0_6px_16px_-4px_rgba(11,26,51,0.45)] transition-colors hover:bg-[#162a4d] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/70"
              >
                Näytä lisää artikkeleita ({jaljella})
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

/** /artikkelit: julkaistut artikkelit uusimmasta vanhimpaan. Jonossa olevat eivät näy eivätkä ole luvuissa. */
const Artikkelit = () => (
  <div className="bg-[hsl(var(--tausta-harmaansininen))]">
    <SEO {...staticSeo["/artikkelit"]} />
    <ArtikkelitListaus artikkelit={getPublishedArticles()} />
  </div>
);

export default Artikkelit;
