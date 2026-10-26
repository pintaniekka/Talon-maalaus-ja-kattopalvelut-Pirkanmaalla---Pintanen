import { getStorageUrl } from "@/lib/storage";

interface IconProps {
  className?: string;
}

const roofTileUrl = getStorageUrl("Icons/Tiilikatto icon.svg");
const roofCleanUrl = getStorageUrl("Icons/Katon puhdistus icon.svg");
const paintBrushUrl = getStorageUrl("Icons/Maalauspensseli icon.svg");

/** Tiilikatto / roof tile icon */
export const RoofTileIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <img loading="lazy" decoding="async" src={roofTileUrl} alt="" className={className} width={24} height={24} />
);

/** Katon puhdistus / roof cleaning icon */
export const RoofCleanIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <img loading="lazy" decoding="async" src={roofCleanUrl} alt="" className={className} width={24} height={24} />
);

/** Maalauspensseli / paint brush icon */
export const PaintBrushIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <img loading="lazy" decoding="async" src={paintBrushUrl} alt="" className={className} width={24} height={24} />
);
