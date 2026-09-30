import { useState, useCallback } from 'react';
import { getResponsiveSrc, getResponsiveSrcSet, getResponsiveUrl } from '@/lib/storage';

interface ResponsiveSupabaseImageProps {
  baseName: string;
  alt?: string;
  cityIn?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  draggable?: boolean;
  style?: React.CSSProperties;
  onError?: React.ReactEventHandler<HTMLImageElement>;
  width?: number;
  height?: number;
}

/**
 * Converts a hyphenated baseName to a human-readable Finnish alt text.
 */
const baseNameToAlt = (baseName: string): string => {
  const text = baseName.replace(/-/g, ' ');
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const ResponsiveSupabaseImage = ({
  baseName,
  alt,
  cityIn,
  className,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 600px',
  draggable,
  style,
  onError,
  width,
  height,
}: ResponsiveSupabaseImageProps) => {
  const location = cityIn || 'Pirkanmaalla';
  const resolvedAlt = alt || `${baseNameToAlt(baseName)} ${location}`;

  // Fallback chain: responsive srcSet → 1500w only → 1200w only → give up
  const [fallbackLevel, setFallbackLevel] = useState(0);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setFallbackLevel((lvl) => (lvl < 2 ? lvl + 1 : lvl));
      onError?.(e);
    },
    [onError]
  );

  let src: string;
  let srcSet: string | undefined;
  let resolvedSizes: string | undefined = sizes;

  if (fallbackLevel === 0) {
    src = getResponsiveSrc(baseName);
    srcSet = getResponsiveSrcSet(baseName);
  } else if (fallbackLevel === 1) {
    // Strip srcSet entirely, force 1200 (aina saatavilla)
    src = getResponsiveUrl(baseName, 1200);
    srcSet = undefined;
    resolvedSizes = undefined;
  } else {
    // Last resort: 800w
    src = getResponsiveUrl(baseName, 800);
    srcSet = undefined;
    resolvedSizes = undefined;
  }

  return (
    <img
      src={src}
      srcSet={srcSet}
      alt={resolvedAlt}
      className={className}
      loading={priority ? undefined : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...({ fetchpriority: priority ? 'high' : 'low' } as Record<string, string>)}
      sizes={resolvedSizes}
      draggable={draggable}
      style={style}
      onError={handleError}
      width={width}
      height={height}
    />
  );
};

export default ResponsiveSupabaseImage;
