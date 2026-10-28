import { useEffect } from "react";
import { usePreviewVariant } from "@/lib/previewVariant";

/**
 * Esikatselun taustavärivaihtoehdot (Eerik 28.10.2026: vanha vaaleansininen pois). Osoitteen `?tausta=a|b|c|d`
 * asettaa html-elementille data-tausta-attribuutin, jonka index.css lukee: a sumu (oletus, ei attribuuttia),
 * b hiekka, c vaaleanharmaa, d vanha vaaleansininen vertailuun. Väliaikainen: kun Eerik on valinnut,
 * tämä komponentti ja css:n vaihtoehdot poistetaan ja --accent-light saa valitun arvon.
 */
const TaustaVariantti = () => {
  const variant = usePreviewVariant("tausta", "a");
  useEffect(() => {
    const html = document.documentElement;
    if (variant === "a") delete html.dataset.tausta;
    else html.dataset.tausta = variant;
  }, [variant]);
  return null;
};

export default TaustaVariantti;
