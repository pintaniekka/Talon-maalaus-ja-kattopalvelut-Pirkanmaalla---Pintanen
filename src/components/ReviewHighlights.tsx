import { allTestimonials } from "@/data/testimonialsData";
import { GOOGLE_PROFILE_URL } from "@/data/company";

/**
 * Etusivun arvostelunosto: kolme Google-arvostelua Googlen korttien näköisinä.
 * Tekstit sanasta sanaan; päivämääriä ei näytetä, koska niitä ei ole tallessa.
 * Koko lista on karusellissa alempana.
 */
const picks = ["Juuso Heimonen", "Timo Leppänen", "Anna-Riitta Taipale"];
const avatarColors = ["#0f766e", "#ea580c", "#7c3aed"];
const reviews = picks
  .map((name) => allTestimonials.find((t) => t.name === name))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

const GoogleG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" aria-label="Google" role="img">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const Stars = () => (
  <span className="flex gap-0.5" role="img" aria-label="5 tähteä viidestä">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className="w-[18px] h-[18px]" viewBox="0 0 20 20" fill="#FBBC05" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </svg>
    ))}
  </span>
);

const VerifiedBadge = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" role="img" aria-label="Google-arvostelu">
    <path
      fill="#4285F4"
      d="M12 1.5l2.6 2.1 3.3-.3 1 3.2 2.9 1.7-1.2 3.1 1.2 3.1-2.9 1.7-1 3.2-3.3-.3L12 21.5l-2.6-2.1-3.3.3-1-3.2-2.9-1.7 1.2-3.1L2.2 8.6l2.9-1.7 1-3.2 3.3.3z"
    />
    <path fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M8 12.2l2.8 2.8L16 9.5" />
  </svg>
);

const ReviewHighlights = () => (
  <section className="py-6 md:py-8 bg-background" aria-label="Asiakkaiden arvosteluja">
    <div className="section-container max-w-6xl mx-auto">
      {/* Puhelimessa kortit vieritetään sivusuunnassa, jotta palvelut pysyvät lähellä. */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {reviews.map((r, i) => (
          <figure
            key={r.name}
            className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <figcaption className="flex items-center gap-3 mb-2.5">
              <span
                className="w-11 h-11 rounded-full flex items-center justify-center text-white text-lg font-medium flex-shrink-0"
                style={{ backgroundColor: avatarColors[i % avatarColors.length] }}
                aria-hidden="true"
              >
                {r.name[0]}
              </span>
              <span className="font-bold text-foreground font-heading flex-1 leading-tight">{r.name}</span>
              <GoogleG />
            </figcaption>
            <div className="flex items-center gap-2 mb-2">
              <Stars />
              <VerifiedBadge />
            </div>
            <blockquote className="text-[15px] text-foreground leading-snug">{r.text}</blockquote>
          </figure>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground md:text-right">
        <strong className="text-foreground">5,0 / 5</strong> Google-arvosteluissa ·{" "}
        <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-accent-ink font-semibold underline underline-offset-2">
          Lue kaikki arvostelut
        </a>
      </p>
    </div>
  </section>
);

export default ReviewHighlights;
