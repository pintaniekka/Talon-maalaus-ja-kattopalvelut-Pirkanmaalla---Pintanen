import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "@/components/SEO";
import { getResponsiveSrc, getResponsiveSrcSet, toAbsoluteUrl } from "@/lib/storage";
import { authors } from "@/data/authors";
import {
  type ArticleMeta,
  categoryLabels,
  formatDateFi,
  getPublishedArticles,
} from "@/data/articles";

interface TocEntry {
  id: string;
  text: string;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Hillitty loppukaneetti kategorian mukaan: tekstilinkkejä, ei nappeja. */
const closingNotes: Record<ArticleMeta["category"], ReactNode> = {
  katto: (
    <>
      Haluatko tietää oman kattosi kunnon? Teemme Pirkanmaalla maksuttoman arviokäynnin ja kerromme suoraan,
      kannattaako työ tehdä nyt vai vasta myöhemmin. Lue lisää{" "}
      <Link to="/tiilikaton-pinnoitus-pirkanmaa">tiilikaton pinnoituksesta</Link>, katso{" "}
      <Link to="/tiilikaton-pinnoitus-hinta-pirkanmaa">hintaesimerkit</Link> tai soita{" "}
      <a href="tel:+358409640066">040 964 0066</a>.
    </>
  ),
  maalaus: (
    <>
      Mietitkö oman talosi maalausta? Teemme Pirkanmaalla maksuttoman arviokäynnin ja kerromme suoraan, mitä
      pinta tarvitsee. Lue lisää <Link to="/talon-maalaus-pirkanmaa">talon maalauksesta</Link>, katso{" "}
      <Link to="/talon-maalaus-hinta-pirkanmaa">hintaesimerkit</Link> tai soita{" "}
      <a href="tel:+358401642233">040 164 2233</a>.
    </>
  ),
  raha: (
    <>
      Tarkan hinnan omalle kohteellesi saat maksuttomalla arviokäynnillä Pirkanmaalla. Suuntaa antavan arvion voit
      laskea itse <Link to="/hintalaskuri">hintalaskurilla</Link>, tai voit soittaa numeroon{" "}
      <a href="tel:+358409640066">040 964 0066</a>.
    </>
  ),
};

interface ArticleLayoutProps {
  meta: ArticleMeta;
  children: ReactNode;
  /** Jonossa olevan artikkelin esikatselu: noindex ja huomautuspalkki. */
  preview?: boolean;
}

/**
 * Artikkelipohja: murupolku, otsikko, ingressi, kirjoittaja ja päiväys,
 * pääkuva, sisällysluettelo, leipäteksti, kirjoittajalaatikko ja "Lue myös".
 * Tarkoituksella tekstivetoinen: ei heroa, ei CTA-nappeja, ei lomaketta.
 */
const ArticleLayout = ({ meta, children, preview = false }: ArticleLayoutProps) => {
  const author = authors[meta.author];
  const bodyRef = useRef<HTMLDivElement>(null);
  const [toc, setToc] = useState<TocEntry[]>([]);
  const url = `https://pintanen.fi/artikkelit/${meta.slug}/`;
  const heroUrl = getResponsiveSrc(meta.heroImage);
  const related = getPublishedArticles().filter((a) => a.slug !== meta.slug).slice(0, 3);

  // Sisällysluettelo väliotsikoista. Leipäteksti ladataan laiskasti, joten
  // otsikot poimitaan vasta kun ne ilmestyvät DOMiin.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const collect = () => {
      const entries: TocEntry[] = [];
      const used = new Set<string>();
      body.querySelectorAll("h2").forEach((h) => {
        const text = h.textContent?.trim() ?? "";
        if (!text) return;
        let id = h.id || slugify(text);
        while (used.has(id)) id += "-2";
        used.add(id);
        h.id = id;
        entries.push({ id, text });
      });
      setToc((prev) =>
        prev.length === entries.length && prev.every((e, i) => e.id === entries[i].id) ? prev : entries,
      );
    };
    collect();
    const observer = new MutationObserver(collect);
    observer.observe(body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [meta.slug]);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    image: [toAbsoluteUrl(heroUrl)],
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt ?? meta.publishedAt,
    inLanguage: "fi",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: {
      "@type": "Person",
      name: author.name,
      jobTitle: author.role,
      worksFor: { "@type": "Organization", name: "Pintanen Oy" },
      url: "https://pintanen.fi/meista/",
    },
    publisher: {
      "@type": "Organization",
      name: "Pintanen Oy",
      url: "https://pintanen.fi/",
      logo: {
        "@type": "ImageObject",
        url: "https://pintanen.fi/images/Pintanen-logo.png",
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Etusivu", item: "https://pintanen.fi/" },
      { "@type": "ListItem", position: 2, name: "Artikkelit", item: "https://pintanen.fi/artikkelit/" },
      { "@type": "ListItem", position: 3, name: meta.title, item: url },
    ],
  };

  return (
    <div className="bg-card">
      <SEO
        title={meta.seoTitle ?? meta.title}
        description={meta.description}
        ogImage={toAbsoluteUrl(heroUrl)}
        preloadImage={heroUrl}
        noindex={preview}
        ogType="article"
        breadcrumb={false}
      />
      <Helmet defer={false}>
        <meta property="article:published_time" content={meta.publishedAt} />
        {meta.updatedAt && <meta property="article:modified_time" content={meta.updatedAt} />}
        <script type="application/ld+json">{JSON.stringify(articleJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <article className="pt-28 md:pt-40 pb-16 md:pb-24">
        <header className="article-column">
          {preview && (
            <p className="mb-6 rounded-lg border border-paint-yellow bg-paint-yellow/20 px-4 py-3 text-sm font-semibold text-foreground">
              Esikatselu. Artikkeli julkaistaan {formatDateFi(meta.publishedAt)}.
            </p>
          )}
          <nav aria-label="Murupolku" className="text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-foreground">Etusivu</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <Link to="/artikkelit" className="hover:text-foreground">Artikkelit</Link>
          </nav>

          <p className="text-xs md:text-sm font-heading font-bold uppercase tracking-[0.18em] text-[#006ead] mb-3">
            {categoryLabels[meta.category]}
          </p>
          <h1 className="font-heading font-extrabold text-3xl md:text-[2.75rem] leading-[1.15] text-foreground mb-5">
            {meta.title}
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-8">{meta.lead}</p>

          <div className="flex items-center gap-3 pb-8 border-b border-border">
            <img
              src={author.image}
              alt=""
              width={44}
              height={44}
              className="w-11 h-11 rounded-full object-cover bg-muted shrink-0"
            />
            <div className="text-sm leading-snug">
              <p className="font-semibold text-foreground">{author.name}</p>
              <p className="text-muted-foreground">
                <time dateTime={meta.publishedAt}>{formatDateFi(meta.publishedAt)}</time>
                {meta.updatedAt && meta.updatedAt !== meta.publishedAt && (
                  <>
                    {" · "}päivitetty <time dateTime={meta.updatedAt}>{formatDateFi(meta.updatedAt)}</time>
                  </>
                )}
                {" · "}
                {meta.readingMinutes} min lukuaika
              </p>
            </div>
          </div>
        </header>

        <figure className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 md:mt-10">
          <img
            src={heroUrl}
            srcSet={getResponsiveSrcSet(meta.heroImage)}
            sizes="(min-width: 896px) 848px, 100vw"
            alt={meta.heroAlt}
            className="w-full aspect-[16/9] object-cover rounded-2xl bg-muted"
            decoding="async"
            {...({ fetchpriority: "high" } as Record<string, string>)}
          />
          {meta.heroCaption && (
            <figcaption className="text-sm text-muted-foreground mt-3 text-center">{meta.heroCaption}</figcaption>
          )}
        </figure>

        <div className="article-column mt-8 md:mt-12">
          {toc.length >= 3 && (
            <nav aria-label="Sisällysluettelo" className="article-toc">
              <p className="article-toc-title">Tässä artikkelissa</p>
              <ol>
                {toc.map((entry) => (
                  <li key={entry.id}>
                    <a href={`#${entry.id}`}>{entry.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div ref={bodyRef} className="article-prose">
            {children}
          </div>

          <p className="article-closing">{closingNotes[meta.category]}</p>

          <footer className="mt-12 pt-8 border-t border-border">
            <div className="flex items-start gap-4">
              <img
                src={author.image}
                alt={author.name}
                width={64}
                height={64}
                loading="lazy"
                className="w-16 h-16 rounded-full object-cover bg-muted shrink-0"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Kirjoittaja</p>
                <p className="font-heading font-bold text-foreground">{author.name}</p>
                <p className="text-sm text-muted-foreground mb-2">{author.role}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {author.bio}{" "}
                  <Link to="/meista" className="text-[#006ead] underline underline-offset-2">
                    Tutustu meihin
                  </Link>
                </p>
              </div>
            </div>

            {related.length > 0 && (
              <div className="mt-12">
                <h2 className="font-heading font-bold text-xl text-foreground mb-4">Lue myös</h2>
                <ul className="divide-y divide-border border-y border-border">
                  {related.map((a) => (
                    <li key={a.slug}>
                      <Link to={`/artikkelit/${a.slug}`} className="group flex items-baseline justify-between gap-4 py-4">
                        <span className="font-semibold text-foreground group-hover:text-[#006ead] transition-colors">
                          {a.title}
                        </span>
                        <time dateTime={a.publishedAt} className="text-sm text-muted-foreground shrink-0">
                          {formatDateFi(a.publishedAt)}
                        </time>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mt-10">
              <Link to="/artikkelit" className="text-[#006ead] font-semibold underline underline-offset-2">
                ← Kaikki artikkelit
              </Link>
            </p>
          </footer>
        </div>
      </article>
    </div>
  );
};

export default ArticleLayout;
