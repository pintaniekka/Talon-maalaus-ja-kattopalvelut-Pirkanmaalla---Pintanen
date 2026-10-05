import { allTestimonials } from "@/data/testimonialsData";
import { GOOGLE_PROFILE_URL } from "@/data/company";

/** Etusivun kevyt nosto: arvosana ja kaksi lyhyttä Google-arvostelua sanasta sanaan. Koko lista on karusellissa alempana. */
const picks = ["Juuso Heimonen", "Timo Leppänen"];
const reviews = picks
  .map((name) => allTestimonials.find((t) => t.name === name))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

const Stars = ({ className = "w-5 h-5" }: { className?: string }) => (
  <span className="flex gap-0.5" role="img" aria-label="5 tähteä viidestä">
    {Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className={className} viewBox="0 0 20 20" fill="#FBBF24" aria-hidden="true">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </svg>
    ))}
  </span>
);

const ReviewHighlights = () => (
  <section className="py-5 md:py-6 bg-background" aria-label="Asiakkaiden arvosteluja">
    <div className="section-container max-w-6xl mx-auto">
      <div className="grid gap-3 md:grid-cols-[auto_1fr_1fr] md:items-stretch">
        <a
          href={GOOGLE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex md:flex-col items-center md:items-start justify-center gap-x-3 gap-y-1 rounded-xl border border-border/50 bg-card px-5 py-3 hover:border-accent transition-colors"
        >
          <Stars className="w-4 h-4" />
          <span className="font-bold text-foreground leading-tight">5,0 / 5</span>
          <span className="text-sm text-muted-foreground leading-tight">Google-arvostelut</span>
        </a>
        {reviews.map((r) => (
          <figure key={r.name} className="rounded-xl border border-border/50 bg-card px-5 py-3">
            <blockquote className="text-sm text-foreground leading-snug">”{r.text}”</blockquote>
            <figcaption className="mt-1.5 text-xs font-semibold text-muted-foreground">{r.name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewHighlights;
