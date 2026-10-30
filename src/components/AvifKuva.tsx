import type { ImgHTMLAttributes, ReactElement } from "react";
import { avifVastine } from "@/lib/storage";

/**
 * Käärii <img>-elementin <picture>-elementtiin, jos kuvalla on AVIF-versiot (30.10.2026).
 * Selain, joka tukee AVIF:ia (noin 95 %), lataa AVIF:n samoilla leveyksillä ja sizes-arvolla;
 * muut käyttävät <img>-elementin WebP-kuvaa. <picture> on display: contents, joten asettelu ei
 * muutu. Kuvat ilman AVIF-versiota palautetaan sellaisenaan.
 */
const AvifKuva = ({ children }: { children: ReactElement<ImgHTMLAttributes<HTMLImageElement>> }) => {
  const { srcSet, src, sizes } = children.props;
  const avif = avifVastine(srcSet ?? (typeof src === "string" ? src : undefined));
  if (!avif) return children;
  return (
    <picture className="contents">
      <source type="image/avif" srcSet={avif} sizes={srcSet ? sizes : undefined} />
      {children}
    </picture>
  );
};

export default AvifKuva;
