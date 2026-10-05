/**
 * Kaupunginosa- ja kylälistat sekä alueellinen konteksti (maakunta) kullekin
 * 24 toiminta-alueen kaupungille. Käytetään ServiceAreaPage-templaten
 * "Palvelemme koko {kaupungin} alueella" -osiossa.
 */

export interface CityNeighborhoods {
  slug: string;
  /** Esim. "Pirkanmaan", "Kanta-Hämeen", "Satakunnan" */
  regionGenitive: string;
  /** Lista kaupunginosia/kyliä, näytetään pisteellä eroteltuna */
  neighborhoods: string[];
}

export const cityNeighborhoods: CityNeighborhoods[] = [
  { slug: "tampere", regionGenitive: "Pirkanmaan", neighborhoods: ["Hervanta", "Pispala", "Lielahti", "Vuores", "Kaukajärvi", "Tesoma", "Linnainmaa"] },
  { slug: "nokia", regionGenitive: "Pirkanmaan", neighborhoods: ["Siuro", "Linnavuori", "Tottijärvi", "Harjuniitty", "Sammalisto", "Vihola", "Koskenmäki"] },
  { slug: "ylojarvi", regionGenitive: "Pirkanmaan", neighborhoods: ["Vuorentausta", "Metsäkylä", "Siivikkala", "Viljakkala", "Kuru", "Asuntila", "Mutala"] },
  { slug: "sastamala", regionGenitive: "Pirkanmaan", neighborhoods: ["Vammala", "Mouhijärvi", "Karkku", "Kiikka", "Suodenniemi", "Keikyä", "Häijää"] },
  { slug: "hameenkyro", regionGenitive: "Pirkanmaan", neighborhoods: ["Kyröskoski", "Sasi", "Mahnala", "Vesajärvi", "Jumesniemi", "Heinijärvi"] },
  { slug: "kangasala", regionGenitive: "Pirkanmaan", neighborhoods: ["Ruutana", "Vatiala", "Sahalahti", "Kuhmalahti", "Suinula", "Lentola", "Huutijärvi"] },
  { slug: "lempaala", regionGenitive: "Pirkanmaan", neighborhoods: ["Sääksjärvi", "Kulju", "Nurmi", "Hakkari", "Kuokkala", "Kelho", "Moision alue"] },
  { slug: "pirkkala", regionGenitive: "Pirkanmaan", neighborhoods: ["Suuppa", "Nuoliala", "Toivio", "Kurikka", "Pere", "Huovi", "Säijä"] },
  { slug: "valkeakoski", regionGenitive: "Pirkanmaan", neighborhoods: ["Sääksmäki", "Roukko", "Kärjenniemi", "Lintula", "Tietola", "Eerola"] },
  { slug: "akaa", regionGenitive: "Pirkanmaan", neighborhoods: ["Toijala", "Viiala", "Kylmäkoski", "Sotkia", "Sontula", "Haihunkoski"] },
  { slug: "ikaalinen", regionGenitive: "Pirkanmaan", neighborhoods: ["Kilvakkala", "Luhalahti", "Tevaniemi", "Riitiala", "Vatula", "Kovelahti"] },
  { slug: "juupajoki", regionGenitive: "Pirkanmaan", neighborhoods: ["Korkeakoski", "Lyly", "Kopsamo", "Hirvijoki", "Salokunta"] },
  { slug: "kihnio", regionGenitive: "Pirkanmaan", neighborhoods: ["Linnankylä", "Mäkikylä", "Nerkoo", "Kankari", "Niskos"] },
  { slug: "mantta-vilppula", regionGenitive: "Pirkanmaan", neighborhoods: ["Mänttä", "Vilppula", "Kolho", "Pohjaslahti", "Keuruuntien alue"] },
  { slug: "orivesi", regionGenitive: "Pirkanmaan", neighborhoods: ["Eräjärvi", "Hirsilä", "Pitkäjärvi", "Talviainen", "Oripohja", "Naappila"] },
  { slug: "parkano", regionGenitive: "Pirkanmaan", neighborhoods: ["Kovesjoki", "Kuivasjärvi", "Lapinneva", "Vahojärvi", "Vuorijärvi", "Lamminkoski"] },
  { slug: "palkane", regionGenitive: "Pirkanmaan", neighborhoods: ["Onkkaala", "Luopioinen", "Laitikkala", "Aitoo", "Rautajärvi", "Kuohijoki"] },
  { slug: "ruovesi", regionGenitive: "Pirkanmaan", neighborhoods: ["Visuvesi", "Murole", "Jäminkipohja", "Ruhala", "Pekkala", "Tuuhoskylä"] },
  { slug: "urjala", regionGenitive: "Pirkanmaan", neighborhoods: ["Laukeela", "Nuutajärvi", "Halkivaha", "Honkola", "Menonen", "Huhti"] },
  { slug: "vesilahti", regionGenitive: "Pirkanmaan", neighborhoods: ["Narva", "Krääkkiö", "Rämsöö", "Onkemäki", "Riehu", "Kirkonkylä"] },
  { slug: "virrat", regionGenitive: "Pirkanmaan", neighborhoods: ["Killinkoski", "Liedenpohja", "Vaskivesi", "Äijänneva", "Herranen", "Kotala"] },
  { slug: "forssa", regionGenitive: "Kanta-Hämeen", neighborhoods: ["Koijärvi", "Matku", "Vieremä", "Kaukjärvi", "Paavola", "Ojalanmäki"] },
  { slug: "hameenlinna", regionGenitive: "Kanta-Hämeen", neighborhoods: ["Aulanko", "Parola", "Iittala", "Hauho", "Lammi", "Kalvola", "Renko"] },
  { slug: "huittinen", regionGenitive: "Satakunnan", neighborhoods: ["Lauttakylä", "Vampula", "Suttila", "Rekikoski", "Korkeakoski", "Huhtamo"] },
];

export const getCityNeighborhoods = (slug: string): CityNeighborhoods | undefined =>
  cityNeighborhoods.find((c) => c.slug === slug);
