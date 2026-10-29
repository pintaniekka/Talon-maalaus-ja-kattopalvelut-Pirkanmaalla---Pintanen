import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { type ArticleCategory, type ArticleMeta, formatDateFi, getPublishedArticles } from "@/data/articles";
import { authors } from "@/data/authors";
import { PASTELLI, TAGI } from "@/data/artikkeliTagit";

interface RelatedArticlesProps {
  /** Näytettävät kategoriat tärkeysjärjestyksessä. Ilman kategorioita uusimmat julkaistut (etusivu). */
  categories?: ArticleCategory[];
  title?: string;
  max?: number;
  /**
   * "kompakti": pienet vaakakortit 64 px kuvalla kolmessa sarakkeessa (palvelu- ja hintasivut).
   * "leveat": kolme leveää riviä päällekkäin, teksti vasemmalla ja kuva rivin päädyssä (etusivu, Eerik 29.10.2026:
   * kompakti jäi etusivulla liian pieneksi).
   */
  variant?: "kompakti" | "leveat";
}

/** Leveä rivi: yksi linkki, aihetagi, otsikko, metarivi ja kuva rivin oikeassa päädyssä. */
const LeveaRivi = ({ a }: { a: ArticleMeta }) => (
  <li>
    <Link
      to={`/artikkelit/${a.slug}/`}
      className="group flex overflow-hidden rounded-2xl border-[0.5px] border-[#d9dfe8] bg-card shadow-[0_10px_22px_-8px_rgba(11,26,51,0.24)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_16px_30px_-8px_rgba(11,26,51,0.34)] focus-visible:-translate-y-1 focus-visible:shadow-[0_16px_30px_-8px_rgba(11,26,51,0.34)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0"
      data-rivi={a.slug}
    >
      <span className="flex min-h-[96px] flex-1 flex-col justify-center gap-1.5 px-4 py-3.5 md:px-[18px]">
        <span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-heading text-[11px] font-extrabold tracking-[0.08em] ${PASTELLI[a.category]}`}>
            {TAGI[a.category]}
          </span>
        </span>
        <span className="line-clamp-3 text-[16px] font-medium leading-snug text-[#0b1a33] transition-colors group-hover:text-accent-ink md:text-[17px]">{a.title}</span>
        <span className="text-[12px] text-[#4a5668]">
          {authors[a.author].name} · <time dateTime={a.publishedAt}>{formatDateFi(a.publishedAt)}</time> · {a.readingMinutes} min
        </span>
      </span>
      <ResponsiveImage
        baseName={a.heroImage}
        alt=""
        className="w-24 flex-none self-stretch object-cover md:w-[190px]"
        sizes="(min-width: 768px) 190px, 96px"
        width={380}
        height={254}
      />
    </Link>
  </li>
);

/** Kompakti kortti: 64 px kuva, otsikko, päivä ja lukuaika. */
const KompaktiKortti = ({ a }: { a: ArticleMeta }) => (
  <li>
    <Link
      to={`/artikkelit/${a.slug}/`}
      className="group flex items-center gap-3 rounded-xl bg-accent-light p-2 transition-colors hover:bg-[hsl(var(--accent)/0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/60"
    >
      <ResponsiveImage baseName={a.heroImage} alt="" className="h-16 w-16 flex-none rounded-lg object-cover" sizes="64px" width={64} height={64} />
      <span className="min-w-0">
        <span className="line-clamp-3 text-[14px] font-medium leading-snug text-foreground transition-colors group-hover:text-accent-ink">{a.title}</span>
        <span className="mt-1 block text-[12px] text-muted-foreground">
          <time dateTime={a.publishedAt}>{formatDateFi(a.publishedAt)}</time> · {a.readingMinutes} min
        </span>
      </span>
    </Link>
  </li>
);

/**
 * Linkit julkaistuihin artikkeleihin palvelu- ja hintasivuilta sekä etusivulta ("Uusimmat artikkelit").
 * Sisäinen linkitys: artikkelit löytyvät muualtakin kuin valikosta, ja palvelusivun lukija saa syventävää
 * tietoa. Ei renderöi mitään, jos artikkeleita ei ole. Datalogiikka on sama molemmissa ulkoasuissa.
 */
const RelatedArticles = ({ categories, title = "Lue lisää aiheesta", max = 3, variant = "kompakti" }: RelatedArticlesProps) => {
  const published = getPublishedArticles();
  const articles = (
    categories
      ? published.filter((a) => categories.includes(a.category)).sort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category))
      : published
  ).slice(0, max);

  if (articles.length === 0) return null;
  const leveat = variant === "leveat";

  return (
    <section className="osio py-12 md:py-16" aria-labelledby="related-articles-title" data-variant={variant}>
      <div className={`section-container mx-auto ${leveat ? "max-w-4xl" : "max-w-6xl"}`}>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <span className="lohko-otsake mb-1.5">Artikkelit</span>
            <h2 id="related-articles-title" className={`font-heading font-bold leading-tight text-foreground ${leveat ? "text-2xl" : "text-xl"}`}>
              {title}
            </h2>
          </div>
          <Link to="/artikkelit/" className="inline-flex items-center gap-1 font-semibold text-accent-ink hover:underline">
            Kaikki artikkelit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        {/* Varjo tarvitsee tilaa: listalla ei overflow-hiddeniä. */}
        <ul className={`list-none p-0 ${leveat ? "flex flex-col gap-3" : "grid gap-2.5 md:grid-cols-3"}`}>
          {articles.map((a) => (leveat ? <LeveaRivi key={a.slug} a={a} /> : <KompaktiKortti key={a.slug} a={a} />))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedArticles;
