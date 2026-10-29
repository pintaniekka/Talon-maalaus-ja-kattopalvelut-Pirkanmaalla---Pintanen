import type { Testimonial } from "@/data/testimonialsData";
import { getCityBySlug } from "@/data/cityData";

const avatarColors = ["#0f766e", "#ea580c", "#7c3aed", "#0369a1"];

const GoogleG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Google" role="img">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const Stars = ({ stars }: { stars: number }) => (
  <span className="flex gap-0.5" role="img" aria-label={`${stars} tähteä viidestä`}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill={i < stars ? "#FBBC05" : "#D1D5DB"} aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </svg>
    ))}
  </span>
);

interface Props {
  review: Testimonial;
  /** Järjestysnumero: valitsee alkukirjainpallon värin. */
  index?: number;
  /** Ankkuri (arvosteluAnkkuri), johon arvostelunoston "Lue koko arvostelu" osoittaa. Vain kerran per sivu. */
  id?: string;
}

/**
 * Yksi Google-arvostelu kokonaan näkyvissä (ei leikkausta eikä animaatiota). Teksti sanasta sanaan.
 * Alkukirjainpallo on Googlen profiilikuvan tilalla (Eerik 13.10.2026: kuvia ei voi hakea, kirjain riittää).
 * Käytetään Kokemuksia-sivun ruudukossa ja kaupunkisivujen arvostelunostossa.
 */
const ReviewCard = ({ review, index = 0, id }: Props) => {
  const city = review.city ? getCityBySlug(review.city) : undefined;
  return (
    <figure id={id} className="kortti h-full p-5 flex flex-col scroll-mt-28" data-arvostelu="kortti">
      <figcaption className="flex items-center gap-3 mb-2.5">
        <span
          className="w-10 h-10 rounded-full flex items-center justify-center text-white text-base font-medium flex-shrink-0"
          style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
          aria-hidden="true"
        >
          {review.name[0].toUpperCase()}
        </span>
        <span className="flex-1 min-w-0 leading-tight">
          <span className="block font-bold text-foreground font-heading">{review.name}</span>
          {city && <span className="block text-xs text-muted-foreground">{city.name}</span>}
        </span>
        <GoogleG />
      </figcaption>
      <div className="mb-3">
        <Stars stars={review.stars} />
      </div>
      <blockquote className="text-[15px] text-foreground leading-snug flex-1">{review.text}</blockquote>
      <p className="mt-3 text-xs text-muted-foreground">Google-arvostelu</p>
    </figure>
  );
};

export default ReviewCard;
