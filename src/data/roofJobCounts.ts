/**
 * Pinnoitettujen tiilikattojen määrä paikkakunnittain. Luvut Eerikiltä 5.10.2026.
 * Sastamala = Sastamala 6 + Keikyä 2 (Keikyä kuuluu Sastamalaan).
 * Paikkakunnalle, jota ei ole listassa, ei näytetä mitään: lukuja ei keksitä.
 */
export const roofJobCounts: Record<string, number> = {
  tampere: 16,
  kangasala: 7,
  ylojarvi: 7,
  sastamala: 8,
  nokia: 5,
  orivesi: 4,
  akaa: 3,
};

/** "Olemme pinnoittaneet Tampereella 16 tiilikattoa." tai undefined, jos lukua ei ole. */
export const roofJobSentence = (slug: string, cityIn: string): string | undefined => {
  const n = roofJobCounts[slug];
  return n ? `Olemme pinnoittaneet ${cityIn} ${n} tiilikattoa.` : undefined;
};
