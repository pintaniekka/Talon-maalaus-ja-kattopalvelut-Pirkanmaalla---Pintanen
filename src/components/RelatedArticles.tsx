import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { type ArticleCategory, formatDateFi, getPublishedArticles } from "@/data/articles";

interface RelatedArticlesProps {
  /** Näytettävät kategoriat tärkeysjärjestyksessä. Ilman kategorioita uusimmat julkaistut (etusivu). */
  categories?: ArticleCategory[];
  title?: string;
  max?: number;
}

/**
 * Linkit julkaistuihin artikkeleihin palvelu- ja hintasivuilta sekä etusivulta ("Uusimmat artikkelit").
 * Sisäinen linkitys: artikkelit löytyvät muualtakin kuin valikosta, ja palvelusivun lukija saa syventävää
 * tietoa. Ei renderöi mitään, jos artikkeleita ei ole.
 * 29.10.2026: kompakti vaakakortti (64 px kansikuva, otsikko, päivä ja lukuaika, ei ingressiä), jotta lohko
 * vie vähän tilaa. Kortti on yksi linkki.
 */
const RelatedArticles = ({ categories, title = "Lue lisää aiheesta", max = 3 }: RelatedArticlesProps) => {
  const published = getPublishedArticles();
  const articles = (
    categories
      ? published.filter((a) => categories.includes(a.category)).sort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category))
      : published
  ).slice(0, max);

  if (articles.length === 0) return null;

  return (
    <section className="osio py-12 md:py-16" aria-labelledby="related-articles-title">
      <div className="section-container max-w-6xl mx-auto">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <span className="lohko-otsake mb-1.5">Artikkelit</span>
            <h2 id="related-articles-title" className="font-heading text-xl font-bold leading-tight text-foreground">
              {title}
            </h2>
          </div>
          <Link to="/artikkelit/" className="inline-flex items-center gap-1 font-semibold text-accent-ink hover:underline">
            Kaikki artikkelit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid list-none gap-2.5 p-0 md:grid-cols-3">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link
                to={`/artikkelit/${a.slug}/`}
                className="group flex items-center gap-3 rounded-xl bg-accent-light p-2 transition-colors hover:bg-[hsl(var(--accent)/0.14)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/60"
              >
                <ResponsiveImage
                  baseName={a.heroImage}
                  alt=""
                  className="h-16 w-16 flex-none rounded-lg object-cover"
                  sizes="64px"
                  width={64}
                  height={64}
                />
                <span className="min-w-0">
                  <span className="line-clamp-3 text-[14px] font-medium leading-snug text-foreground transition-colors group-hover:text-accent-ink">
                    {a.title}
                  </span>
                  <span className="mt-1 block text-[12px] text-muted-foreground">
                    <time dateTime={a.publishedAt}>{formatDateFi(a.publishedAt)}</time> · {a.readingMinutes} min
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedArticles;
