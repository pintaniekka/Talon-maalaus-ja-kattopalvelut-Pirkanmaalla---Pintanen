import { kuntakarttaUrl } from "@/data/kartat";

/**
 * Kunnan siluettikartta paikallislohkoon (Eerik 19.10.2026): kunta sinisellä, naapurikunnat
 * haaleina ääriviivoina ja reunat häivytettyinä (Eerik 25.10.2026), järvet vaaleansinisinä. Tavallinen img.
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
      className="w-full h-auto"
    />
    <figcaption className="mt-2 text-xs text-muted-foreground text-center">
      {name} Pirkanmaalla. Kartta: Tilastokeskus (kuntarajat), OpenStreetMap (järvet).
    </figcaption>
  </figure>
);

export default CityMap;
