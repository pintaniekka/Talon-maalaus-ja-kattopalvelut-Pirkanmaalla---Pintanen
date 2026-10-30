import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { type ArticleCategory, type ArticleMeta, formatDateFi, getPublishedArticles } from "@/data/articles";
import { authors } from "@/data/authors";
import { PASTELLI, TAGI } from "@/data/artikkeliTagit";

export interface ArtikkeliRivitProps {
  /** Näytettävät kategoriat tärkeysjärjestyksessä. Ilman kategorioita uusimmat julkaistut. */
  categories?: ArticleCategory[];
  /** Artikkeli, jota ei näytetä (artikkelisivun "Lue myös"). */
  excludeSlug?: string;
  title?: string;
  max?: number;
}

/** Yksi ohut rivi: tagi ja metarivi, otsikko, kuva päädyssä. Koko rivi on yksi linkki. */
const Rivi = ({ a }: { a: ArticleMeta }) => (
  <li>
    <Link
      to={`/artikkelit/${a.slug}/`}
      className="group flex min-h-[140px] overflow-hidden rounded-[14px] md:min-h-0 md:h-[84px] border-[0.5px] border-[#d9dfe8] bg-card shadow-[0_8px_18px_-8px_rgba(11,26,51,0.22)] transition-[transform,box-shadow] duration-150 ease-out hover:-translate-y-1 hover:shadow-[0_14px_26px_-8px_rgba(11,26,51,0.32)] focus-visible:-translate-y-1 focus-visible:shadow-[0_14px_26px_-8px_rgba(11,26,51,0.32)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/70 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0 md:h-[84px]"
      data-rivi={a.slug}
    >
      {/* Puhelimella tagi, otsikko (3 riviä) ja metarivi allekkain; työpöydällä tagi ja metarivi samalla rivillä, otsikko alla (order). */}
      <span className="flex min-w-0 flex-1 flex-wrap content-center items-center gap-x-2.5 gap-y-1.5 px-4 py-3.5 md:gap-y-[5px] md:py-2.5">
        <span className={`order-1 inline-flex items-center rounded-full px-2 py-0.5 font-heading text-[10px] font-extrabold tracking-[0.08em] ${PASTELLI[a.category]}`}>
          {TAGI[a.category]}
        </span>
        <span className="order-2 line-clamp-3 basis-full text-[16px] font-medium leading-[1.25] text-[#0b1a33] transition-colors group-hover:text-accent-ink visited:text-[#0b1a33] md:line-clamp-2" data-otsikko>
          {a.title}
        </span>
        <span className="order-3 basis-full text-[12px] text-[#4a5668] md:order-1 md:basis-auto md:text-[11px]" data-meta>
          {authors[a.author].name.split(" ")[0]} · <time dateTime={a.publishedAt}>{formatDateFi(a.publishedAt)}</time> · {a.readingMinutes} min
        </span>
      </span>
      {/* Kuva absoluuttisena kehyksessä: rivin korkeus tulee tekstistä, ei kuvan kuvasuhteesta. */}
      <span className="relative w-[120px] flex-none self-stretch">
        <ResponsiveImage baseName={a.heroImage} alt={a.heroAlt} className="absolute inset-0 h-full w-full object-cover" sizes="120px" width={240} height={168} />
      </span>
    </Link>
  </li>
);

/**
 * Lyhyt artikkelilista samana ohuena rivinä kaikkialla (Eerik 29.10.2026): etusivun "Uusimmat artikkelit",
 * palvelu-, hinta-, kuntotarkastus-, harjatiiviste-, vähennys- ja taloyhtiösivujen "Lue lisää aiheesta" ja
 * artikkelisivun "Lue myös". Neljä riviä (Eerik 29.10.2026). Rivi on 84 px työpöydällä ja väljempi puhelimella, kuva 120 px päädyssä. Ei renderöi mitään,
 * jos artikkeleita ei ole. /artikkelit-listaussivun korttiruudukko on erillinen (Artikkelit.tsx).
 * Lohko on tavallinen Rytmi-lohko (className="osio"), kortit pysyvät valkoisina myös näyttämöllä.
 */
const ArtikkeliRivit = ({ categories, excludeSlug, title = "Lue lisää aiheesta", max = 4 }: ArtikkeliRivitProps) => {
  const published = getPublishedArticles().filter((a) => a.slug !== excludeSlug);
  const articles = (
    categories
      ? published.filter((a) => categories.includes(a.category)).sort((a, b) => categories.indexOf(a.category) - categories.indexOf(b.category))
      : published
  ).slice(0, max);

  if (articles.length === 0) return null;

  return (
    <section className="osio py-12 md:py-16" aria-labelledby="artikkelirivit-otsikko" data-artikkelirivit>
      <div className="section-container mx-auto max-w-4xl">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <span className="lohko-otsake mb-1.5">Artikkelit</span>
            <h2 id="artikkelirivit-otsikko" className="font-heading text-2xl font-bold leading-tight text-foreground">
              {title}
            </h2>
          </div>
          <Link to="/artikkelit/" className="inline-flex items-center gap-1 font-semibold text-accent-ink hover:underline">
            Kaikki artikkelit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        {/* Varjo tarvitsee tilaa: listalla ei overflow-hiddeniä. */}
        <ul className="flex list-none flex-col gap-2.5 p-0">
          {articles.map((a) => (
            <Rivi key={a.slug} a={a} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ArtikkeliRivit;
