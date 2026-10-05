import { allTestimonials } from "@/data/testimonialsData";
import { GOOGLE_PROFILE_URL } from "@/data/company";

/** Etusivun nostot: kolme Google-arvostelua sanasta sanaan. Koko lista on karusellissa alempana. */
const picks = ["Timo Piilonen", "Juuso Heimonen", "Anna-Riitta Taipale"];
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
  <section className="py-12 md:py-16 bg-background" aria-label="Asiakkaiden arvosteluja">
    <div className="section-container max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h2 className="heading-style text-3xl md:text-4xl text-accent-ink mb-3">Mitä asiakkaat sanovat meistä?</h2>
          <div className="flex items-center gap-3">
            <Stars />
            <span className="font-bold text-foreground">5,0 / 5</span>
            <span className="text-muted-foreground">Google-arvosteluissa</span>
          </div>
        </div>
        <a
          href={GOOGLE_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-ink font-semibold underline underline-offset-4"
        >
          Lue arvostelut Googlessa
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {reviews.map((r) => (
          <figure key={r.name} className="bg-card rounded-2xl border border-border/50 shadow-sm p-6 flex flex-col">
            <Stars className="w-4 h-4" />
            <blockquote className="mt-3 text-foreground leading-relaxed flex-1">”{r.text}”</blockquote>
            <figcaption className="mt-4 font-semibold text-foreground">{r.name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewHighlights;
