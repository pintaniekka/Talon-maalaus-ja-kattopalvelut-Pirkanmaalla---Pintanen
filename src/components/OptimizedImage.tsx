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
 * Strips known transformation parameters and any "Pictures-XXX/" path segment
 * from a Supabase storage URL, returning the largest known fallback URL.
 * If src already points at the largest variant, returns it unchanged.
 */
const buildFallbackUrl = (src: string): string => {
  try {
    const url = new URL(src);
    // Drop any query params (Supabase image transforms etc.)
    url.search = '';
    // If URL points to a Pictures-<n>/ folder with -<n>.webp suffix, swap to 1200
    // (1200 on aina saatavilla; 1500 puuttuu osasta kuvia).
    const path = url.pathname;
    const m = path.match(/\/Pictures-(\d+)\/([^/]+)-(\d+)\.webp$/);
    if (m) {
      const baseName = m[2];
      url.pathname = path.replace(
        /\/Pictures-\d+\/[^/]+-\d+\.webp$/,
        `/Pictures-1200/${baseName}-1200.webp`
      );
    }
    return url.toString();
  } catch {
    return src;
  }
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
