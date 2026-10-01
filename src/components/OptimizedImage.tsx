import { useState, useCallback, useMemo } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  draggable?: boolean;
  style?: React.CSSProperties;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  width?: number;
  height?: number;
}

/**
 * Varakuva latausvirheen varalle: sama kuva 1200 px -kansiosta ilman kyselyparametreja.
 * 1200 px on aina saatavilla; 1500 px puuttuu osasta kuvia.
 */
const buildFallbackUrl = (src: string): string => {
  const [path] = src.split("?");
  return path.replace(/\/Pictures-\d+\/([^/]+)-\d+\.webp$/, "/Pictures-1200/$1-1200.webp");
};

const OptimizedImage = ({
  src,
  alt,
  className,
  priority = false,
  sizes,
  srcSet,
  draggable,
  style,
  onError,
  width,
  height,
}: OptimizedImageProps) => {
  const [errored, setErrored] = useState(false);
  const fallbackSrc = useMemo(() => buildFallbackUrl(src), [src]);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (!errored) setErrored(true);
      onError?.(e);
    },
    [errored, onError]
  );

  const finalSrc = errored ? fallbackSrc : src;
  const finalSrcSet = errored ? undefined : srcSet;
  const finalSizes = errored ? undefined : (sizes ?? "(max-width: 768px) 100vw, 600px");

  return (
    <img
      src={finalSrc}
      srcSet={finalSrcSet}
      alt={alt}
      className={className}
      loading={priority ? undefined : "lazy"}
      decoding="async"
      {...({ fetchpriority: priority ? "high" : "low" } as Record<string, string>)}
      sizes={finalSizes}
      draggable={draggable}
      style={style}
      onError={handleError}
      width={width}
      height={height}
    />
  );
};

export default OptimizedImage;
