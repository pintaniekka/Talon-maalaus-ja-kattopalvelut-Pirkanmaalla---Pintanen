import { usePreviewVariant } from "@/lib/previewVariant";
import { merkitse } from "@/components/Rytmi";
import VahennysA from "./vahennys/VahennysA";
import VahennysB from "./vahennys/VahennysB";
import VahennysC from "./vahennys/VahennysC";
import VahennysD from "./vahennys/VahennysD";
import VahennysE from "./vahennys/VahennysE";

export type VahennysVariant = "a" | "b" | "c" | "d" | "e";

const VAHENNYS_VARIANTS: readonly VahennysVariant[] = ["a", "b", "c", "d", "e"];

const vaihtoehdot = { a: VahennysA, b: VahennysB, c: VahennysC, d: VahennysD, e: VahennysE } as const;

/**
 * Kotitalousvähennys yhdellä lauseella (korjaus 9, V11); luvut tulevat KOTITALOUSVAHENNYS-vakiosta.
 * Esikatselussa on viisi ulkoasuvaihtoehtoa (tarkastus 12.10.2026, luku 4; E eli esimerkkilaskelmat
 * lisätty 13.10.2026). Oletus on kaikilla sivuilla E eli lyhyt teoria ja yksi esimerkkilaskelma
 * (Eerik 14.10.2026); URL-parametri `?vahennys=a|b|c|d|e` ohittaa sen.
 */
const KotitalousVahennys = ({ defaultVariant = "e" }: { defaultVariant?: VahennysVariant } = {}) => {
  const variant = usePreviewVariant<VahennysVariant>("vahennys", defaultVariant, VAHENNYS_VARIANTS);
  const Vahennys = vaihtoehdot[variant];
  return <Vahennys />;
};

merkitse(KotitalousVahennys, "oma");

export default KotitalousVahennys;
