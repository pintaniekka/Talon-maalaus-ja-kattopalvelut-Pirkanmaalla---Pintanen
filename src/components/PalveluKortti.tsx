import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";

export interface PalveluKorttiProps {
  href: string;
  title: string;
  description: string;
  price: string;
  warranty: string;
  duration: string;
  image: { base: string; alt: string; width: number; height: number };
  /** Napin teksti, esim. "Katso pinnoitus". */
  cta: string;
}

/**
 * Palvelukortti (Eerik 29.10.2026, malli B): tummansininen kortti, jonka kuva leikkautuu vinosti
 * korttiin samaan tapaan kuin näyttämöiden viisto, luvut keltaisina ja keltainen nappi.
 * Käytössä etusivun Palvelumme-osiossa ja aluesivuilla. Koko kortti on yksi linkki (Eerik 14.10.2026),
 * nappi on vain linkin osa. Kuvat: pinnoitus Ylöjärven keltainen talo, maalaus Oriveden hirsimökin terassi.
 */
const PalveluKortti = ({ href, title, description, price, warranty, duration, image, cta }: PalveluKorttiProps) => (
  <Link
    to={href}
    className="group flex flex-col overflow-hidden rounded-3xl bg-navy text-navy-foreground shadow-[0_14px_40px_rgba(10,25,47,0.14)] transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(10,25,47,0.22)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent/60 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
  >
    <div className="relative overflow-hidden [clip-path:polygon(0_0,100%_0,100%_82%,0_100%)]">
      <ResponsiveImage
        baseName={image.base}
        alt={image.alt}
        className="block aspect-[16/9] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        sizes="(max-width: 1023px) 100vw, 560px"
        width={image.width}
        height={image.height}
      />
    </div>
    <div className="flex flex-1 flex-col px-6 pb-6 pt-2 md:px-7 md:pb-7">
      {/* Keltainen koristeviiva tekijän nimen tilalla (Eerik 29.10.2026). */}
      <span className="block h-1 w-10 rounded-full bg-paint-yellow" aria-hidden="true" />
      <h3 className="mt-1.5 font-heading text-2xl font-extrabold leading-[1.1] text-white md:text-[28px]">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-white/75">{description}</p>
      {/* Puhelimella hinta omalle rivilleen, jotta "2–3 päivää" ei karkaa kortin reunan yli. */}
      <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-white/15 pt-4 text-xs text-white/60 sm:grid-cols-[1.6fr_1fr_1fr]">
        <div className="col-span-2 sm:col-span-1">
          <dt>Hinta yleensä</dt>
          <dd className="mt-0.5 whitespace-nowrap font-heading text-lg font-extrabold leading-tight text-paint-yellow md:text-[21px]">{price}</dd>
        </div>
        <div>
          <dt>Takuu</dt>
          <dd className="mt-0.5 whitespace-nowrap font-heading text-lg font-extrabold leading-tight text-paint-yellow md:text-[21px]">{warranty}</dd>
        </div>
        <div>
          <dt>Kesto</dt>
          <dd className="mt-0.5 whitespace-nowrap font-heading text-lg font-extrabold leading-tight text-paint-yellow md:text-[21px]">{duration}</dd>
        </div>
      </dl>
      <span className="mt-4 inline-flex min-h-[44px] items-center gap-2 self-start rounded-xl bg-paint-yellow px-5 font-heading text-[15px] font-extrabold text-paint-yellow-foreground transition-colors group-hover:bg-paint-yellow-hover">
        {cta}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
      </span>
    </div>
  </Link>
);

export default PalveluKortti;
