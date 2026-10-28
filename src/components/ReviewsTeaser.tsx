import { Link } from "react-router-dom";
import ReviewCard from "@/components/ReviewCard";
import { getTeaserTestimonials, REVIEW_COUNT, type TestimonialCategory } from "@/data/testimonialsData";
import { LUVUT } from "@/data/company";

interface Props {
  citySlug: string;
  /** Palvelun kategoria: pinnoitussivulla "katto", maalaussivulla "seina". Ilman arvoa kaikki. */
  category?: TestimonialCategory;
}

/**
 * Kaupunkisivun arvostelunosto: koko arvosteluseinä näkyy vain etusivulla ja /kokemuksia/-sivulla.
 * Tässä on neljä paikkakunnan ja palvelun mukaan valittua arvostelua (Eerik 13.10.2026: kaksi näytti
 * kömpelöltä) kahdessa rivissä ja linkki kaikkiin.
 */
const ReviewsTeaser = ({ citySlug, category }: Props) => {
  const reviews = getTeaserTestimonials(citySlug, category, 4);
  if (reviews.length === 0) return null;

  return (
    <section className="section-padding osio" aria-label="Asiakasarvostelut">
      <div className="section-container max-w-4xl mx-auto">
        <h2 className="heading-style text-2xl md:text-3xl text-accent-ink text-center mb-8">Mitä asiakkaat sanovat meistä?</h2>
        <div className="grid sm:grid-cols-2 gap-7">
          {reviews.map((r, i) => (
            <ReviewCard key={`${r.name}-${i}`} review={r} index={i} />
          ))}
        </div>
        <p className="mt-6 text-center text-muted-foreground">
          <strong className="text-foreground">{LUVUT.googleArvio}</strong> Google-arvosteluissa, {REVIEW_COUNT} arvostelua.{" "}
          <Link to="/kokemuksia/" className="text-primary font-semibold hover:underline">
            Lue kaikki asiakkaiden kokemukset
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default ReviewsTeaser;
