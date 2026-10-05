import { Link } from "react-router-dom";
import { type ArticleCategory, formatDateFi, getPublishedArticles } from "@/data/articles";

interface RelatedArticlesProps {
  /** Näytettävät kategoriat tärkeysjärjestyksessä. */
  categories: ArticleCategory[];
  title?: string;
  max?: number;
}

/**
 * Linkit julkaistuihin artikkeleihin palvelu- ja hintasivuilta.
 * Sisäinen linkitys: artikkelit löytyvät muualtakin kuin valikosta, ja
 * palvelusivun lukija saa syventävää tietoa. Ei renderöi mitään, jos artikkeleita ei ole.
 */
const RelatedArticles = ({ categories, title = "Lue lisää aiheesta", max = 3 }: RelatedArticlesProps) => {
  const articles = getPublishedArticles()
    .filter((a) => categories.includes(a.category))
    .sort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category))
    .slice(0, max);

  if (articles.length === 0) return null;

  return (
    <section className="py-14 md:py-16 bg-background" aria-labelledby="related-articles-title">
      <div className="section-container max-w-4xl mx-auto">
        <h2 id="related-articles-title" className="text-2xl md:text-3xl font-bold font-heading text-foreground mb-6">
          {title}
        </h2>
        <ul className="divide-y divide-border border-y border-border">
          {articles.map((a) => (
            <li key={a.slug}>
              <Link to={`/artikkelit/${a.slug}/`} className="group block py-5">
                <p className="font-heading font-bold text-lg text-foreground group-hover:text-[#006ead] transition-colors">
                  {a.title}
                </p>
                <p className="text-muted-foreground mt-1 leading-relaxed">{a.lead}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  <time dateTime={a.publishedAt}>{formatDateFi(a.publishedAt)}</time> · {a.readingMinutes} min lukuaika
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-5">
          <Link to="/artikkelit/" className="text-[#006ead] font-semibold underline underline-offset-2">
            Kaikki artikkelit
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RelatedArticles;
