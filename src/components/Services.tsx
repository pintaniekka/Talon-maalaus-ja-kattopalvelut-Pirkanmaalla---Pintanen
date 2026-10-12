import { usePreviewVariant } from "@/lib/previewVariant";
import PalvelutA from "./palvelut/PalvelutA";
import PalvelutB from "./palvelut/PalvelutB";
import PalvelutC from "./palvelut/PalvelutC";
import PalvelutD from "./palvelut/PalvelutD";

const vaihtoehdot = { a: PalvelutA, b: PalvelutB, c: PalvelutC, d: PalvelutD } as const;

/**
 * Etusivun Palvelumme-osio. Esikatselussa on neljä ulkoasuvaihtoehtoa (tarkastus 12.10.2026, luku 4):
 * `?palvelut=a|b|c|d`, oletus A. Faktat ja tekstit ovat tiedostossa palvelut/palvelutData.ts.
 * Katon puhdistuksen kortti on poistettu, koska palvelu on loppunut.
 */
const Services = () => {
  const variant = usePreviewVariant("palvelut", "a");
  const Palvelut = vaihtoehdot[variant];
  return <Palvelut />;
};

export default Services;
