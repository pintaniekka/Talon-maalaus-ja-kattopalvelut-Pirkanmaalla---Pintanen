import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import OptimizedImage from "@/components/OptimizedImage";
import { staticSeo } from "@/data/seo";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import { authors } from "@/data/authors";
import { categoryLabels, formatDateFi, getPublishedArticles, type ArticleCategory, type ArticleMeta } from "@/data/articles";

type Suodatin = "kaikki" | ArticleCategory;

const KATEGORIAT = Object.keys(categoryLabels) as ArticleCategory[];

const kategoriaLuokka = "text-xs font-heading font-bold uppercase tracking-[0.18em] text-accent-ink";

/**
 * Artikkelilistaus (Eerik 29.10.2026): suodatinnapit, uusin artikkeli isona nostona ja muut
 * korttiruudukossa. Suodatus on pelkkä selaimen tila: kaikki kortit ovat aina valmiissa HTML:ssä
 * ja suodatin vain piilottaa ne, joten hakukoneet ja llms.txt näkevät koko listan. Oletus "Kaikki".
 * Ei leadia ruudukon korteissa, ei CTA-nappeja eikä lomaketta (artikkelit ovat tekstiä).
 */
const Artikkelit = () => {
  const published = getPublishedArticles();
  const [suodatin, setSuodatin] = useState<Suodatin>("kaikki");

  const maarat = KATEGORIAT.reduce<Record<ArticleCategory, number>>(
    (acc, k) => ({ ...acc, [k]: published.filter((a) => a.category === k).length }),
    { katto: 0, maalaus: 0, raha: 0 },
  );
  const napit: { arvo: Suodatin; nimi: string; maara: number }[] = [
    { arvo: "kaikki", nimi: "Kaikki", maara: published.length },
    ...KATEGORIAT.filter((k) => maarat[k] > 0).map((k) => ({ arvo: k, nimi: categoryLabels[k], maara: maarat[k] })),
  ];

  const nosto = published[0];
  const muut = published.slice(1);
  const nakyy = (a: ArticleMeta) => suodatin === "kaikki" || a.category === suodatin;

  return (
    <div className="bg-card">
      <SEO {...staticSeo["/artikkelit"]} />

      <div className="pt-28 md:pt-40 pb-16 md:pb-24">
        <div className="section-container max-w-6xl">
          <header className="mb-8 md:mb-10 max-w-3xl">
            <h1 className="font-heading font-extrabold text-3xl md:text-[2.75rem] leading-[1.15] text-foreground mb-4">
              Artikkelit ja oppaat
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              Tietoa tiilikaton pinnoituksesta ja talon maalauksesta. Kirjoittajat Eerik ja Eemil tekevät työt itse.
            </p>
          </header>

          {/* Suodatinnapit: aktiivinen tummansininen (navy), muut vaaleat. aria-pressed kertoo tilan ruudunlukijalle. */}
          <div role="group" aria-label="Suodata aiheen mukaan" className="mb-10 flex flex-wrap gap-2 md:mb-12">
            {napit.map((n) => {
              const aktiivinen = suodatin === n.arvo;
              return (
                <button
                  key={n.arvo}
                  type="button"
                  aria-pressed={aktiivinen}
                  onClick={() => setSuodatin(n.arvo)}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 font-heading text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/60 ${
                    aktiivinen ? "bg-navy text-navy-foreground" : "bg-accent-light text-foreground hover:bg-accent/20"
                  }`}
                >
                  {n.nimi}
                  <span className={`text-xs font-semibold ${aktiivinen ? "text-white/70" : "text-muted-foreground"}`}>{n.maara}</span>
                </button>
              );
            })}
          </div>

          {/* Uusin artikkeli isona nostona. Piilotetaan, jos se ei kuulu valittuun luokkaan. */}
          {nosto && (
            <Link
              to={`/artikkelit/${nosto.slug}/`}
              className={`group kortti mb-10 grid overflow-hidden md:mb-12 md:grid-cols-[1.1fr_1fr] ${nakyy(nosto) ? "" : "hidden"}`}
            >
              <OptimizedImage
                src={getResponsiveSrc(nosto.heroImage)}
                srcSet={getResponsiveSrcSet(nosto.heroImage)}
                sizes="(min-width: 768px) 600px, 100vw"
                alt=""
                className="aspect-[3/2] h-full w-full object-cover bg-muted"
                width={1200}
                height={800}
              />
              <div className="flex flex-col justify-center p-6 md:p-9">
                <p className={`${kategoriaLuokka} mb-3`}>{categoryLabels[nosto.category]}</p>
                <h2 className="mb-3 font-heading text-2xl font-bold leading-snug text-foreground transition-colors group-hover:text-accent-ink md:text-3xl">
                  {nosto.title}
                </h2>
                <p className="mb-4 leading-relaxed text-muted-foreground">{nosto.lead}</p>
                <p className="text-sm text-muted-foreground">
                  {authors[nosto.author].name} · <time dateTime={nosto.publishedAt}>{formatDateFi(nosto.publishedAt)}</time> ·{" "}
                  {nosto.readingMinutes} min lukuaika
                </p>
              </div>
            </Link>
          )}

          {/* Muut artikkelit: 1 / 2 / 3 saraketta. Piilotetut kortit pysyvät HTML:ssä. */}
          <ul className="grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {muut.map((article) => (
              <li key={article.slug} className={nakyy(article) ? "" : "hidden"}>
                <Link to={`/artikkelit/${article.slug}/`} className="group kortti flex h-full flex-col overflow-hidden">
                  <OptimizedImage
                    src={getResponsiveSrc(article.heroImage)}
                    srcSet={getResponsiveSrcSet(article.heroImage)}
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                    alt=""
                    className="aspect-[3/2] w-full object-cover bg-muted"
                    width={1200}
                    height={800}
                  />
                  <div className="flex flex-1 flex-col p-5">
                    <p className={`${kategoriaLuokka} mb-2`}>{categoryLabels[article.category]}</p>
                    <h2 className="mb-3 font-heading text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-accent-ink">
                      {article.title}
                    </h2>
                    <p className="mt-auto text-sm text-muted-foreground">
                      {authors[article.author].name} · {article.readingMinutes} min lukuaika
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Artikkelit;
