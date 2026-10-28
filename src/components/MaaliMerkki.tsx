import { getStorageUrl } from "@/lib/storage";

type Merkki = "tikkurila" | "nowocoat";

/**
 * Maalimerkin logo ja yksi lause tekstipalstan vieressä (Eerik 28.10.2026: pelkkä iso "Tikkurila"/"Nowocoat"
 * -teksti oli kömpelö). Logot ovat valmistajien omilta sivuilta, ks. docs/logot-2026-10-28.md.
 * Nowocoatin logo on vaakamerkki, Tikkurilan neliö, siksi eri korkeudet.
 */
const merkit: Record<Merkki, { nimi: string; tiedosto: string; korkeus: string; leveys: number; korkeusPx: number }> = {
  tikkurila: { nimi: "Tikkurila", tiedosto: "Logot/tikkurila.svg", korkeus: "h-16", leveys: 64, korkeusPx: 64 },
  nowocoat: { nimi: "Nowocoat", tiedosto: "Logot/nowocoat.svg", korkeus: "h-14", leveys: 140, korkeusPx: 56 },
};

const MaaliMerkki = ({ merkki, teksti }: { merkki: Merkki; teksti: string }) => {
  const m = merkit[merkki];
  return (
    <aside className="kortti flex flex-col items-start gap-4 p-5" aria-label="Maali">
      <span className="lohko-otsake">Maali</span>
      <img
        src={getStorageUrl(m.tiedosto)}
        alt={m.nimi}
        width={m.leveys}
        height={m.korkeusPx}
        loading="lazy"
        decoding="async"
        className={`${m.korkeus} w-auto`}
      />
      <p className="text-sm leading-relaxed text-muted-foreground">{teksti}</p>
    </aside>
  );
};

export default MaaliMerkki;
