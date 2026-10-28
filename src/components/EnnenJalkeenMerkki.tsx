/**
 * "Ennen" ja "Jälkeen" -merkit kuvien päällä, sama ulkoasu kaikkialla (Eerik 28.10.2026: merkit
 * hukkuivat kuvaan). Ennen on tummansininen ja Jälkeen sininen pilleri, molemmissa valkoinen teksti ja varjo,
 * joten ne erottuvat sekä vaaleasta että tummasta kuvasta. Värit ovat kiinteät, eivät teemamuuttujia,
 * koska merkki on aina valokuvan päällä.
 */
const EnnenJalkeenMerkki = ({ label, className = "" }: { label: string; className?: string }) => {
  const jalkeen = /jälkeen/i.test(label);
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1.5 font-heading text-[11px] font-extrabold uppercase tracking-[0.14em] text-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] ${
        jalkeen ? "bg-[#0074bd]" : "bg-[#0B1F3A]/90"
      } ${className}`}
    >
      {label}
    </span>
  );
};

export default EnnenJalkeenMerkki;
