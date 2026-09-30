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
