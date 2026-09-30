/**
 * Artikkelien sisältöpalikat. Artikkelin leipäteksti kirjoitetaan tavallisena
 * HTML:nä (h2, h3, p, ul, blockquote) ja näillä muutamalla komponentilla.
 * Ei nappeja, ei luottamuslukuja, ei lomakkeita: artikkeli on luettavaa tekstiä.
 */
import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

/** Kuva kuvatekstillä. `image` on perusnimi Supabase-bucketissa. */
export const Figure = ({ image, alt, caption }: { image: string; alt: string; caption?: string }) => (
  <figure>
    <img
      src={getResponsiveSrc(image)}
      srcSet={getResponsiveSrcSet(image)}
      sizes="(min-width: 768px) 720px, 100vw"
      alt={alt}
      loading="lazy"
      decoding="async"
      className="w-full h-auto max-h-[30rem] object-cover rounded-xl bg-muted"
    />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

/** "Lyhyesti"-laatikko artikkelin alkuun: tärkeimmät asiat muutamalla rivillä. */
export const KeyPoints = ({ title = "Lyhyesti", children }: { title?: string; children: ReactNode }) => (
  <aside className="article-keypoints" aria-label={title}>
    <p className="article-keypoints-title">{title}</p>
    {children}
  </aside>
);

/** Huomautus tai vinkki tekstin lomaan. */
export const Note = ({ title, children }: { title?: string; children: ReactNode }) => (
  <aside className="article-note">
    {title && <p className="font-semibold text-foreground">{title}</p>}
    {children}
  </aside>
);

export interface FaqItem {
  question: string;
  answer: string;
}

/** Usein kysyttyä -osio artikkelin loppuun. Tuottaa myös FAQPage-scheman. */
export const ArticleFaq = ({ items, title = "Usein kysyttyä" }: { items: FaqItem[]; title?: string }) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return (
    <>
      <Helmet defer={false}>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <h2>{title}</h2>
      {items.map((item) => (
        <div key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </>
  );
};

/** Taulukko hinnoille ja vertailuille. Ensimmäinen sarake on rivin otsikko. */
export const Table = ({ head, rows, caption }: { head: string[]; rows: string[][]; caption?: string }) => (
  <div className="article-table-wrap">
    <table>
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h} scope="col">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row[0]}>
            {row.map((cell, i) =>
              i === 0 ? (
                <th key={i} scope="row">
                  {cell}
                </th>
              ) : (
                <td key={i}>{cell}</td>
              ),
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export interface SourceItem {
  label: string;
  url: string;
}

/** Lähdeluettelo artikkelin loppuun: ulkoiset lähteet, joista yleisfaktat on tarkistettu. */
export const Sources = ({ items }: { items: SourceItem[] }) => (
  <>
    <h2>Lähteet</h2>
    <ul>
      {items.map((item) => (
        <li key={item.url}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  </>
);
