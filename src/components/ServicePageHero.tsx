import { ReactNode } from 'react';

/** Vanha koko leveyden hero. Käytössä enää puhdistussivuilla; ei sisääntuloanimaatiota (teksti näkyy ilman JavaScriptiä). */
interface ServicePageHeroProps {
  title: string;
  subtitle: string | ReactNode;
  backgroundImage?: string;
  backgroundSrcSet?: string;
  children?: ReactNode;
  /** Matalampi pääkuva, jotta sisältö alkaa ensimmäisellä ruudulla (hintasivut). */
  compact?: boolean;
}

const ServicePageHero = ({ title, subtitle, backgroundImage, backgroundSrcSet, children, compact = false }: ServicePageHeroProps) => {
  return (
    <section className={`hero-critical on-dark relative ${compact ? "min-h-[38svh] min-h-[38vh]" : "min-h-[60svh] min-h-[60vh]"} flex items-center justify-center overflow-hidden isolate`} style={{ backgroundColor: 'hsl(215,30%,10%)' }}>
      {/* Background image – separate layer, no blend/filter/opacity */}
      {backgroundImage ? (
        <img
          src={backgroundImage}
          srcSet={backgroundSrcSet}
          sizes="100vw"
          alt={title ? `${title} – Pintanen Oy` : ""}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="sync"
          {...({ fetchpriority: "high" } as Record<string, string>)}
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark" />
      )}

      {/* Overlay – own layer on top of image, no blend-mode */}
      {backgroundImage && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(18,28,40,0.55)' }} />
      )}

      {/* Content */}
      <div className={`relative z-[2] section-container text-center text-primary-foreground ${compact ? "pt-28 pb-10" : "pt-28 xl:pt-36 pb-16"}`}>
        {title && (
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-5xl mx-auto">{title}</h1>
        )}
        {subtitle && (
          <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto italic">{subtitle}</p>
        )}
        {children && (
          <div className="mt-8">{children}</div>
        )}
      </div>
    </section>
  );
};

export default ServicePageHero;
