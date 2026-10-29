import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { merkitse } from "@/components/Rytmi";
import { arvosteluAnkkuri, arvosteluPolulle } from "@/data/arvostelusijoitus";

/** Palvelimella useLayoutEffect ei tee mitään; selaimessa mittaus ennen maalausta, ettei linkki välähdä. */
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const Tahdet = ({ stars }: { stars: number }) => (
  <span className="flex gap-0.5" role="img" aria-label={`${stars} tähteä viidestä`}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill={i < stars ? "#FBBC05" : "#D1D5DB"} aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </svg>
    ))}
  </span>
);

interface Props {
  /** Sivun polku ilman loppukauttaviivaa, esim. "/tiilikaton-pinnoitus-tampere". Valinta on deterministinen polusta. */
  polku: string;
}

/**
 * Leijuva arvostelunosto (29.10.2026): yksi Google-arvostelu valkoisena korttina kahden lohkon rajalla.
 * Rytmi antaa kääreelle kaksiosaisen taustan (ylempi puoli edellisen lohkon väri, alempi seuraavan), joten
 * kortti istuu sauman päällä peittämättä kummankaan lohkon tekstiä. Teksti on sanasta sanaan
 * testimonialsData.ts:stä; pitkä teksti katkaistaan vain CSS:llä (line-clamp-3), koko teksti pysyy HTML:ssä.
 * "Lue koko arvostelu" näkyy vain, kun teksti oikeasti katkeaa (mitataan selaimessa, SSR:ssä piilossa).
 * Ei Review-schemaa, ei CTA:ta. Sijoitus ja valinta: src/data/arvostelusijoitus.ts.
 */
const ArvosteluNosto = ({ polku }: Props) => {
  const arvostelu = arvosteluPolulle(polku);
  const ref = useRef<HTMLQuoteElement>(null);
  const [katkeaa, setKatkeaa] = useState(false);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (el) setKatkeaa(el.scrollHeight > el.clientHeight + 1);
  }, [arvostelu]);

  if (!arvostelu) return null;
  const ankkuri = arvosteluAnkkuri(arvostelu);

  return (
    <div className="flex justify-center px-4 py-8 md:py-10" data-arvostelu="nosto">
      <figure className="w-full max-w-[470px] rounded-[14px] border-[0.5px] border-border bg-card p-5 text-foreground shadow-[0_10px_30px_rgba(10,25,47,0.08)] md:p-6">
        <figcaption className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-accent-light font-heading text-base font-extrabold text-accent-ink"
            aria-hidden="true"
          >
            {arvostelu.name[0].toUpperCase()}
          </span>
          <Tahdet stars={arvostelu.stars} />
        </figcaption>
        <blockquote ref={ref} className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-foreground">
          {arvostelu.text}
        </blockquote>
        {/* Puhelimella linkki omalle rivilleen vasemmalle, ettei chat-kupla (oikea alakulma) peitä sitä. */}
        <p className="mt-3 flex flex-col items-start gap-x-4 gap-y-1 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>
            {arvostelu.name} · Google-arvostelu
          </span>
          {katkeaa && (
            <Link to={{ pathname: "/kokemuksia/", hash: ankkuri }} className="font-semibold text-accent-ink hover:underline">
              Lue koko arvostelu
            </Link>
          )}
        </p>
      </figure>
    </div>
  );
};

merkitse(ArvosteluNosto, "nosto");

export default ArvosteluNosto;
