import type { ReactNode } from "react";
import { getArticleBySlug, isPublished } from "@/data/articles";

/** JulkaistuArtikkeli.tsx:n laiskasti ladattava osa: lapset vain, kun artikkeli on julkaistu (Suomen aikaa). */
const JulkaistuArtikkeliTarkistin = ({ slug, children }: { slug: string; children: ReactNode }) => {
  const artikkeli = getArticleBySlug(slug);
  return artikkeli && isPublished(artikkeli) ? <>{children}</> : null;
};

export default JulkaistuArtikkeliTarkistin;
