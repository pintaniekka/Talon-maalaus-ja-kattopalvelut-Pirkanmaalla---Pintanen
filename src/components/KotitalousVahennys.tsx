import { usePreviewVariant, type Variant } from "@/lib/previewVariant";
import VahennysA from "./vahennys/VahennysA";
import VahennysB from "./vahennys/VahennysB";
import VahennysC from "./vahennys/VahennysC";
import VahennysD from "./vahennys/VahennysD";

export type VahennysVariant = Variant;

const vaihtoehdot = { a: VahennysA, b: VahennysB, c: VahennysC, d: VahennysD } as const;

/**
 * Kotitalousvähennys yhdellä lauseella (korjaus 9, V11); luvut tulevat KOTITALOUSVAHENNYS-vakiosta.
 * Esikatselussa on neljä ulkoasuvaihtoehtoa (tarkastus 12.10.2026, luku 4). `defaultVariant` valitsee
 * sivun oletuksen (etusivu A, hintasivut D); URL-parametri `?vahennys=a|b|c|d` ohittaa sen.
 */
const KotitalousVahennys = ({ defaultVariant = "a" }: { defaultVariant?: VahennysVariant } = {}) => {
  const variant = usePreviewVariant("vahennys", defaultVariant);
  const Vahennys = vaihtoehdot[variant];
  return <Vahennys />;
};

export default KotitalousVahennys;
