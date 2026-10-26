import { kuntakarttaUrl, kuntakarttaKoko } from "@/data/kartat";

/**
 * Kunnan siluettikartta paikallislohkoon (Eerik 19.10.2026): kunta sinisellä, naapurikunnat
 * haaleina ääriviivoina ja reunat häivytettyinä (Eerik 25.10.2026), järvet vaaleansinisinä. Tavallinen img.
 * Lähdemaininta (CC BY 4.0 ja ODbL vaativat sen) on alatunnisteessa, ei kuvan alla (Eerik 25.10.2026).
 */
const CityMap = ({ slug, name }: { slug: string; name: string }) => {
  const [w, h] = kuntakarttaKoko(slug);
  return (
  <figure className="mx-auto w-full max-w-md lg:max-w-none">
    <img
      loading="lazy"
      decoding="async"
      src={kuntakarttaUrl(slug)}
      alt={`${name} ja naapurikunnat kartalla`}
      width={w}
      height={h}
      className="mx-auto h-auto w-auto max-h-[26rem]"
    />
  </figure>
  );
};

export default CityMap;
