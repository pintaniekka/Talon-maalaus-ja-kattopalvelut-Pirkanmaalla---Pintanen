/**
 * Paikkakunnat, joiden sivuilla leipäteksti mainitsee Pirkanmaan tai Tampereen vain kerran
 * (yöajo 3, 28.10.2026: Search Consolessa nämä kaupunkisivut kilpailivat Pirkanmaa-sivujen
 * kanssa samoista hauista). Kohdelohkon otsikko ja yrittäjälaatikko käyttävät pelkkää paikkakuntaa;
 * Pirkanmaa jää toiminta-aluebanneriin.
 */
export const VAIN_PAIKKAKUNTA = new Set(["forssa", "huittinen", "sastamala", "ylojarvi", "pirkkala"]);

export const vainPaikkakunta = (citySlug: string): boolean => VAIN_PAIKKAKUNTA.has(citySlug);
