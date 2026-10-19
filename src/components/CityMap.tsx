import { kuntakarttaUrl } from "@/data/kartat";

/**
 * Kunnan siluettikartta paikallislohkoon (Eerik 19.10.2026): kunta sinisellä, naapurikunnat
 * harmaina nimineen, suuret järvet vaaleansinisinä. Tavallinen img: SVG on sivuston oma tiedosto.
 */
const CityMap = ({ slug, name }: { slug: string; name: string }) => (
  <figure className="mx-auto w-full max-w-md lg:max-w-none">
    <img
      src={kuntakarttaUrl(slug)}
      alt={`${name} ja naapurikunnat kartalla`}
      width={600}
      height={480}
      loading="lazy"
      decoding="async"
      className="w-full h-auto rounded-2xl border border-border/60 shadow-md bg-background"
    />
    <figcaption className="mt-2 text-xs text-muted-foreground text-center">
      {name} Pirkanmaalla. Kartta: Tilastokeskus (kuntarajat), OpenStreetMap (järvet).
    </figcaption>
  </figure>
);

export default CityMap;
