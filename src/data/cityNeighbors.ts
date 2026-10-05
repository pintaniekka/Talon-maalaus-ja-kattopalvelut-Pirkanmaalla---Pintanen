/**
 * Naapurikunnat, joissa meillä on oma sivu. Lähde: fi.wikipedia.org, kunkin kunnan artikkeli (haettu 5.10.2026).
 * Mukana vain toiminta-alueen 24 paikkakuntaa.
 */
export const cityNeighbors: Record<string, string[]> = {
  "tampere": ["kangasala", "lempaala", "nokia", "orivesi", "pirkkala", "ruovesi", "ylojarvi"],
  "sastamala": ["huittinen", "hameenkyro", "ikaalinen", "nokia", "urjala", "vesilahti"],
  "hameenkyro": ["ikaalinen", "nokia", "sastamala", "ylojarvi"],
  "ylojarvi": ["hameenkyro", "ikaalinen", "kihnio", "nokia", "parkano", "ruovesi", "tampere", "virrat"],
  "nokia": ["hameenkyro", "pirkkala", "sastamala", "tampere", "vesilahti", "ylojarvi"],
  "forssa": ["urjala"],
  "hameenlinna": ["akaa", "palkane", "urjala", "valkeakoski"],
  "huittinen": ["sastamala"],
  "akaa": ["hameenlinna", "lempaala", "urjala", "valkeakoski", "vesilahti"],
  "ikaalinen": ["hameenkyro", "parkano", "sastamala", "ylojarvi"],
  "juupajoki": ["mantta-vilppula", "orivesi", "ruovesi"],
  "kangasala": ["lempaala", "orivesi", "palkane", "tampere", "valkeakoski"],
  "kihnio": ["ylojarvi", "parkano", "virrat"],
  "lempaala": ["akaa", "kangasala", "pirkkala", "tampere", "valkeakoski", "vesilahti"],
  "mantta-vilppula": ["juupajoki", "ruovesi", "virrat"],
  "orivesi": ["juupajoki", "kangasala", "ruovesi", "tampere"],
  "parkano": ["ikaalinen", "kihnio", "ylojarvi"],
  "pirkkala": ["tampere", "nokia", "lempaala", "vesilahti"],
  "palkane": ["hameenlinna", "kangasala", "valkeakoski"],
  "ruovesi": ["juupajoki", "mantta-vilppula", "orivesi", "tampere", "virrat", "ylojarvi"],
  "urjala": ["akaa", "forssa", "hameenlinna", "sastamala", "vesilahti"],
  "valkeakoski": ["akaa", "hameenlinna", "kangasala", "lempaala", "palkane"],
  "vesilahti": ["akaa", "lempaala", "nokia", "pirkkala", "sastamala", "urjala"],
  "virrat": ["kihnio", "mantta-vilppula", "ruovesi", "ylojarvi"],
};
