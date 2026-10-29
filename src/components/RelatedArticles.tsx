import { Link } from "react-router-dom";
import ResponsiveImage from "@/components/ResponsiveImage";
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
 * Eerik 29.10.2026: jokaiseen artikkelilinkkiin artikkelin kansikuva, joten linkit ovat kortteja kuvineen.
 */
const RelatedArticles = ({ categories, title = "Lue lisää aiheesta", max = 3 }: RelatedArticlesProps) => {
  const articles = getPublishedArticles()
    .filter((a) => categories.includes(a.category))
    .sort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category))
    .slice(0, max);

  if (articles.length === 0) return null;

  return (
    <section className="section-padding osio" aria-labelledby="related-articles-title">
      <div className="section-container max-w-6xl mx-auto">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="lohko-otsake mb-3">Artikkelit</span>
            <h2 id="related-articles-title" className="text-2xl md:text-3xl font-bold font-heading text-foreground">
              {title}
            </h2>
          </div>
          <Link to="/artikkelit/" className="font-semibold text-primary hover:underline">
            Kaikki artikkelit
          </Link>
        </div>
        <ul className={`grid list-none gap-6 p-0 ${articles.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {articles.map((a) => (
            <li key={a.slug}>
              <Link to={`/artikkelit/${a.slug}/`} className="group kortti flex h-full flex-col overflow-hidden">
                <ResponsiveImage
                  baseName={a.heroImage}
                  alt={a.heroAlt}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 380px"
                  width={800}
                  height={500}
                />
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-heading text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-accent-ink">{a.title}</p>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{a.lead}</p>
                  <p className="mt-auto pt-3 text-xs text-muted-foreground">
                    <time dateTime={a.publishedAt}>{formatDateFi(a.publishedAt)}</time> · {a.readingMinutes} min lukuaika
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedArticles;
