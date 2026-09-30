import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";
import { authors } from "@/data/authors";
import { categoryLabels, formatDateFi, getPublishedArticles } from "@/data/articles";

/** Artikkelilistaus: julkaistut artikkelit uusimmasta vanhimpaan. */
const Artikkelit = () => {
  const published = getPublishedArticles();

  return (
    <div className="bg-card">
      <SEO
        title="Artikkelit ja oppaat"
        description="Lue Pintasen oppaat tiilikaton pinnoituksesta, katon huollosta ja talon maalauksesta. Käytännön neuvoja pirkanmaalaisilta ammattilaisilta."
      />

      <div className="pt-28 md:pt-40 pb-16 md:pb-24">
        <header className="article-column mb-10 md:mb-14">
          <h1 className="font-heading font-extrabold text-3xl md:text-[2.75rem] leading-[1.15] text-foreground mb-4">
            Artikkelit ja oppaat
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Käytännön tietoa tiilikaton pinnoituksesta, katon huollosta ja talon maalauksesta. Kirjoittajina työn
            itse tekevät yrittäjät.
          </p>
        </header>

        <div className="article-column">
          <ul className="divide-y divide-border border-t border-border">
            {published.map((article) => (
              <li key={article.slug}>
                <Link
                  to={`/artikkelit/${article.slug}`}
                  className="group grid sm:grid-cols-[220px_1fr] gap-5 md:gap-7 py-8 items-start"
                >
                  <img
                    src={getResponsiveSrc(article.heroImage)}
                    srcSet={getResponsiveSrcSet(article.heroImage)}
                    sizes="(min-width: 640px) 220px, 100vw"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-[3/2] object-cover rounded-xl bg-muted"
                  />
                  <div>
                    <p className="text-xs font-heading font-bold uppercase tracking-[0.18em] text-[#006ead] mb-2">
                      {categoryLabels[article.category]}
                    </p>
                    <h2 className="font-heading font-bold text-xl md:text-2xl leading-snug text-foreground mb-2 group-hover:text-[#006ead] transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">{article.lead}</p>
                    <p className="text-sm text-muted-foreground">
                      {authors[article.author].name} ·{" "}
                      <time dateTime={article.publishedAt}>{formatDateFi(article.publishedAt)}</time> ·{" "}
                      {article.readingMinutes} min lukuaika
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
