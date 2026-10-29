import { cityNeighborhoods } from "@/data/cityNeighborhoods";

interface Props {
  slug: string;
  /** Esim. "Tampereen". */
  cityGenitive: string;
  service: "pinnoitus" | "maalaus";
}

/** Luettelo "A, B, C ja D". */
const luettelo = (nimet: string[]) => (nimet.length <= 1 ? nimet.join("") : `${nimet.slice(0, -1).join(", ")} ja ${nimet[nimet.length - 1]}`);

/**
 * Kaupunginosat ja kylät palvelun kaupunkisivulle (Eerik 29.10.2026: "eikö meillä ole aika paljon paikallista
 * dataa"). Nimet tulevat tiedostosta cityNeighborhoods.ts, joka jäi käyttämättä, kun aluesivut lyhennettiin
 * 27.10.2026. Lause kertoo toiminta-alueen, ei kohteita: kohteista ei väitetä mitään, mitä ei ole.
 */
const Kaupunginosat = ({ slug, cityGenitive, service }: Props) => {
  const data = cityNeighborhoods.find((c) => c.slug === slug);
  if (!data || data.neighborhoods.length === 0) return null;
  const tyo = service === "pinnoitus" ? "Pinnoitamme tiilikattoja" : "Maalaamme taloja";
  return (
    <p className="mt-4 text-muted-foreground leading-relaxed text-base md:text-lg">
      {tyo} koko {cityGenitive} alueella, myös kaupunginosissa ja kylissä kuten {luettelo(data.neighborhoods)}.
    </p>
  );
};

export default Kaupunginosat;
