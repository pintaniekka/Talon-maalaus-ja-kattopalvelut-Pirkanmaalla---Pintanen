import ResponsiveImage from "@/components/ResponsiveImage";

interface KuvanostoProps {
  base: string;
  alt: string;
  caption: string;
  /** Kuvan sivusuhde, oletus 4/3. */
  ratio?: "4/3" | "3/4" | "16/9";
}

/**
 * Kuvanosto tekstipalstaan (Eerik 28.10.2026, kuvasuunnitelma kohta 4): pitkään tekstiin yksi kelluva kuva
 * kuvatekstillä lehden tapaan. Tietokoneella kuva kelluu tekstin oikealla puolella noin 40 % leveydellä ja
 * teksti kiertää sen; puhelimella kuva on tekstin välissä koko leveydellä. Laitetaan tekstipalstan
 * ensimmäiseksi lapseksi; palstalla pitää olla `flow-root`, jotta kelluva kuva pysyy sen sisällä.
 */
const Kuvanosto = ({ base, alt, caption, ratio = "4/3" }: KuvanostoProps) => (
  <figure className="kuvanosto my-6 md:float-right md:mb-4 md:ml-8 md:mt-1 md:w-[42%]">
    <ResponsiveImage
      baseName={base}
      alt={alt}
      className={`w-full rounded-2xl object-cover shadow-[0_14px_40px_rgba(10,25,47,0.12)] ${
        ratio === "3/4" ? "aspect-[3/4]" : ratio === "16/9" ? "aspect-[16/9]" : "aspect-[4/3]"
      }`}
      sizes="(max-width: 768px) 100vw, 320px"
      width={800}
      height={ratio === "3/4" ? 1067 : ratio === "16/9" ? 450 : 600}
    />
    <figcaption className="mt-2 text-sm leading-snug text-muted-foreground">{caption}</figcaption>
  </figure>
);

export default Kuvanosto;
