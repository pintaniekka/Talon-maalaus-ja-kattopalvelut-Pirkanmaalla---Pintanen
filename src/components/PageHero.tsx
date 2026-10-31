import type { ReactNode } from "react";
import AvifKuva from "@/components/AvifKuva";
import { merkitse } from "@/components/Rytmi";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PintanenMark from "@/components/icons/PintanenMark";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import { GOOGLE_PROFILE_URL, LUVUT } from "@/data/company";
import { getResponsiveSrc, getResponsiveSrcSet } from "@/lib/storage";

/**
 * Alasivujen hero etusivun mallilla (auditoinnin korjaus 1): valkoinen kortti vaalealla pohjalla,
 * vasemmalle tasattu H1, keltainen pääpainike, luottamusrivi kortin sisällä ja kuva oikealla.
 * Kuvan päällä on punainen, hieman kallistettu tarra Pintasen omalla merkillä (Eerik 13.10.2026: tarrat takaisin).
 * "Päivitetty pp.kk.vvvv" -riviä ei näytetä (Eerik 13.10.2026).
 * Ei sisääntuloanimaatiota: H1 ja ingressi näkyvät heti, myös ilman JavaScriptiä.
 */

export interface TrustItem {
  value: string;
  label: string;
  href?: string;
  tone?: "red" | "blue" | "default";
}

export type TrustVariant = "pinnoitus" | "maalaus" | "yleinen";

const google: TrustItem = { value: LUVUT.googleArvio, label: "Google-arviot", href: GOOGLE_PROFILE_URL, tone: "red" };

export const trustFor = (variant: TrustVariant): TrustItem[] => {
  switch (variant) {
    case "pinnoitus":
      return [
        google,
        { value: LUVUT.pinnoitetutKatot, label: "Pinnoitettua kattoa" },
        { value: "5 v", label: "Takuu työlle" },
        { value: "0 €", label: "Arviokäynti", tone: "blue" },
      ];
    case "maalaus":
      return [
        google,
        { value: LUVUT.maalatutTalot, label: "Maalattua taloa" },
        { value: "2 v", label: "Takuu työlle" },
        { value: "0 €", label: "Arviokäynti", tone: "blue" },
      ];
    default:
      return [
        google,
        { value: LUVUT.kohteet, label: "Kohdetta" },
        { value: "2–5 v", label: "Takuu työlle" },
        { value: "0 €", label: "Arviokäynti", tone: "blue" },
      ];
  }
};

export interface PageHeroImage {
  /** Perusnimi kansiossa public/images/Pictures-* (webp eri koot). */
  base?: string;
  /** Vaihtoehtoisesti valmis osoite ja srcset (esim. AVIF). */
  src?: string;
  srcSet?: string;
  alt: string;
  sizes?: string;
}

interface PageHeroProps {
  /** Pieni sininen rivi H1:n yläpuolella, esim. "Tiilikaton pinnoitus · Tampere". */
  eyebrow: string;
  title: ReactNode;
  /** 2–3 lyhyttä virkettä. */
  lead: ReactNode;
  /** Johdannon ja nappien väliin, esim. yhteystietosivun isot puhelinnumerot (Eerik 26.10.2026). */
  beforeActions?: ReactNode;
  /** Heti otsikon alle, ennen johdantoa: yhteystietosivun puhelinnumerot (Eerik 26.10.2026). */
  afterTitle?: ReactNode;
  primary: { to: string; label: string };
  secondary?: { to: string; label: string };
  trust?: TrustVariant | TrustItem[];
  image: PageHeroImage;
  badge?: { title: string; text: string } | null;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}

const toneClass: Record<NonNullable<TrustItem["tone"]>, string> = {
  red: "text-roof-red",
  blue: "text-accent-ink",
  default: "text-foreground",
};

// Eerik 29.10.2026: "tekevät työn itse" toistui joka sivulla, tarrassa nyt työnjako.
const defaultBadge = { title: "Perheyritys Tampereelta", text: "Eerik pinnoittaa katot, Eemil maalaa talot." };

const PageHero = ({
  eyebrow,
  title,
  lead,
  beforeActions,
  afterTitle,
  primary,
  secondary,
  trust = "yleinen",
  image,
  badge = defaultBadge,
  breadcrumbs,
  children,
}: PageHeroProps) => {
  const trustItems = Array.isArray(trust) ? trust : trustFor(trust);
  const src = image.src ?? (image.base ? getResponsiveSrc(image.base) : undefined);
  const srcSet = image.srcSet ?? (image.base ? getResponsiveSrcSet(image.base) : undefined);

  return (
    <section className="hero-critical relative bg-background px-4 pt-24 pb-10 md:px-8 md:pt-28 md:pb-14 xl:pt-36 flex flex-col items-center">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="w-full max-w-[1500px] mb-4" />}
      <div className="relative w-full max-w-[1500px] overflow-hidden rounded-[2.5rem] bg-card shadow-2xl flex flex-col lg:flex-row">
        <div className="relative z-10 w-full lg:w-2/3 p-8 md:p-12 lg:px-16 lg:py-14 xl:px-20 flex flex-col justify-center bg-card">
          <div className="inline-flex items-center gap-3 mb-5 md:mb-6">
            <span className="h-1 w-12 bg-accent rounded-full" aria-hidden="true" />
            <span className="text-accent-ink font-heading font-extrabold uppercase tracking-[0.2em] text-xs md:text-sm">
              {eyebrow}
            </span>
          </div>

          <h1 className="heading-style max-w-3xl text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-5 md:mb-6">
            {title}
          </h1>

          {afterTitle}
          <p className="hero-lead text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed font-sans">{lead}</p>
          {beforeActions}

          {/* Napit samankokoisia (Eki 31.10.2026): sama korkeus, fontti, pyöristys ja reunus; puhelimessa koko leveys, isommalla
              näytöllä sarakkeet saman levyisiä (auto-cols-fr). */}
          <div className="flex flex-col gap-3 sm:inline-grid sm:grid-flow-col sm:auto-cols-fr sm:gap-5 mb-8 md:mb-10">
            <Link
              to={primary.to}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border-2 border-transparent bg-paint-yellow px-4 py-3 text-center font-heading text-[14px] min-[380px]:text-[15px] font-extrabold leading-tight text-paint-yellow-foreground shadow-xl shadow-paint-yellow/40 transition-all hover:scale-[1.03] hover:bg-paint-yellow-hover sm:px-6 sm:text-lg lg:text-base xl:text-lg group"
            >
              {primary.label}
              <ArrowRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
            {secondary && (
              <Link
                to={secondary.to}
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border-2 border-accent bg-card px-4 py-3 text-center font-heading text-[14px] min-[380px]:text-[15px] font-extrabold leading-tight text-accent-ink transition-all hover:bg-accent-strong hover:text-accent-foreground sm:px-6 sm:text-lg lg:text-base xl:text-lg"
              >
                {secondary.label}
              </Link>
            )}
          </div>

          {children}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-7 border-t border-border">
            {trustItems.map((item) => {
              const inner = (
                <>
                  <span className={`${toneClass[item.tone ?? "default"]} font-heading font-extrabold text-2xl md:text-3xl`}>
                    {item.value}
                  </span>
                  <span className="text-[10px] md:text-xs text-muted-foreground uppercase font-bold tracking-widest group-hover:underline">
                    {item.label}
                  </span>
                </>
              );
              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col"
                >
                  {inner}
                  <span className="sr-only">, lue Pintasen Google-arviot</span>
                </a>
              ) : (
                <div key={item.label} className="flex flex-col">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative w-full lg:w-1/3 min-h-[260px] md:min-h-[340px] lg:min-h-full overflow-hidden bg-muted">
          {src && (
            <AvifKuva>
              <img
                src={src}
                srcSet={srcSet}
                sizes={image.sizes ?? "(max-width: 1024px) 100vw, 34vw"}
                alt={image.alt}
                width={1200}
                height={1600}
                className="absolute inset-0 w-full h-full object-cover"
                decoding="sync"
                {...({ fetchpriority: "high" } as Record<string, string>)}
              />
            </AvifKuva>
          )}
          <div
            className="hidden lg:block absolute -left-16 inset-y-0 w-32 bg-card skew-x-[-7deg] shadow-[-15px_0_40px_rgba(0,0,0,0.08)]"
            aria-hidden="true"
          />
          {badge && (
            <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 bg-roof-red text-roof-red-foreground p-4 lg:p-5 rounded-2xl lg:rounded-3xl shadow-2xl rotate-2 max-w-[210px] lg:max-w-[250px]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-white rounded-full shrink-0 flex items-center justify-center text-roof-red">
                  <PintanenMark className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-white/90 mb-1">{badge.title}</p>
                  <p className="text-sm font-heading font-extrabold leading-tight">{badge.text}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

merkitse(PageHero, "oma");

export default PageHero;
