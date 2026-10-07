import ResponsiveImage from "@/components/ResponsiveImage";
import type { ReviewCase } from "@/data/reviewCases";
import type { Testimonial } from "@/data/testimonialsData";

const avatarColors = ["#0f766e", "#ea580c", "#7c3aed", "#0369a1"];

const GoogleG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-label="Google" role="img">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const Stars = ({ stars }: { stars: number }) => (
  <span className="flex gap-0.5" role="img" aria-label={`${stars} tähteä viidestä`}>
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className="w-[18px] h-[18px]" viewBox="0 0 20 20" fill={i < stars ? "#FBBC05" : "#D1D5DB"} aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </svg>
    ))}
  </span>
);

const VerifiedBadge = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" role="img" aria-label="Google-arvostelu">
    <path fill="#4285F4" d="M12 1.5l2.6 2.1 3.3-.3 1 3.2 2.9 1.7-1.2 3.1 1.2 3.1-2.9 1.7-1 3.2-3.3-.3L12 21.5l-2.6-2.1-3.3.3-1-3.2-2.9-1.7 1.2-3.1L2.2 8.6l2.9-1.7 1-3.2 3.3.3z" />
    <path fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M8 12.2l2.8 2.8L16 9.5" />
  </svg>
);

interface Props {
  review: Testimonial;
  reviewCase: ReviewCase;
  index: number;
}

/**
 * Asiakkaan Google-arvostelu ja sama kohde kuvina (ennen ja jälkeen tai yksi kuva).
 * Arvostelun teksti sanasta sanaan; kertomus on Eerikin.
 */
const CityReviewCard = ({ review, reviewCase, index }: Props) => {
  const photos = reviewCase.before && reviewCase.after
    ? [
        { base: reviewCase.before, label: "Ennen" },
        { base: reviewCase.after, label: "Jälkeen" },
      ]
    : reviewCase.image
      ? [{ base: reviewCase.image, label: "" }]
      : [];

  return (
    <article className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden grid md:grid-cols-[1fr_minmax(0,40%)]">
      <div className="p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-2.5">
          <span
            className="w-11 h-11 rounded-full flex items-center justify-center text-white text-lg font-medium flex-shrink-0"
            style={{ backgroundColor: avatarColors[index % avatarColors.length] }}
            aria-hidden="true"
          >
            {review.name[0]}
          </span>
          <span className="font-bold text-foreground font-heading flex-1 leading-tight">{review.name}</span>
          <GoogleG />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <Stars stars={review.stars} />
          <VerifiedBadge />
        </div>
        <blockquote className="text-[15px] text-foreground leading-snug">{review.text}</blockquote>
        {reviewCase.story && (
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed border-l-2 border-accent pl-3">
            <span className="font-semibold text-foreground">Eerik kertoo kohteesta: </span>
            {reviewCase.story}
          </p>
        )}
      </div>
      {photos.length > 0 && (
        <div className={`grid ${photos.length === 2 ? "grid-cols-2" : "grid-cols-1"} gap-0.5 md:h-full`}>
          {photos.map((p) => (
            <div key={p.base} className="relative">
              <ResponsiveImage
                baseName={p.base}
                alt={`${review.name}: kohde ${p.label ? p.label.toLowerCase() : ""}`.trim()}
                className="w-full h-full min-h-[200px] aspect-[3/4] md:aspect-auto object-cover"
                sizes="(max-width: 768px) 50vw, 240px"
                width={400}
                height={533}
              />
              {p.label && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-foreground/70 text-primary-foreground text-xs font-semibold">
                  {p.label}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </article>
  );
};

export default CityReviewCard;
