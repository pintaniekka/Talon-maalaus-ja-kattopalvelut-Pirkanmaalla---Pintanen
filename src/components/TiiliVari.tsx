/**
 * Tiilen muotoinen värimalli (Eerik 29.10.2026: "tiilikuvista svg:t"). Muoto jäljittelee Nowocoatin värikartan
 * profiilitiiltä: vasemmassa reunassa pyöreä harjanne, oikealla loiva kouru. Väri tulee propista, varjot ja
 * valo ovat läpikuultavia tasoja, joten sama muoto toimii kaikilla 16 värillä. Pelkkä koriste: aria-hidden.
 */
const TiiliVari = ({ hex, className = "" }: { hex: string; className?: string }) => (
  <svg viewBox="0 0 80 100" className={className} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="tiili-valo" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="0.18" stopColor="#ffffff" stopOpacity="0.32" />
        <stop offset="0.32" stopColor="#000000" stopOpacity="0.22" />
        <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.06" />
        <stop offset="0.8" stopColor="#000000" stopOpacity="0.1" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.28" />
      </linearGradient>
      <linearGradient id="tiili-pysty" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" stopOpacity="0.14" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.18" />
      </linearGradient>
    </defs>
    {/* Tiilen runko: yläreuna hieman aaltoileva, alareuna suora. */}
    <path d="M4 10 C14 2 30 2 38 8 C48 2 68 2 76 8 L76 94 Q76 98 72 98 L8 98 Q4 98 4 94 Z" fill={hex} />
    <path d="M4 10 C14 2 30 2 38 8 C48 2 68 2 76 8 L76 94 Q76 98 72 98 L8 98 Q4 98 4 94 Z" fill="url(#tiili-valo)" />
    <path d="M4 10 C14 2 30 2 38 8 C48 2 68 2 76 8 L76 94 Q76 98 72 98 L8 98 Q4 98 4 94 Z" fill="url(#tiili-pysty)" />
    {/* Harjanteen reuna */}
    <path d="M26 6 L26 97" stroke="#000000" strokeOpacity="0.18" strokeWidth="2" />
    <path d="M14 7 L14 97" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="1.5" />
  </svg>
);

export default TiiliVari;
