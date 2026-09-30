import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const NotFound = () => (
  <div className="section-padding pt-32 md:pt-40 min-h-[60vh] flex items-center justify-center bg-background">
    <SEO title="Sivua ei löytynyt" description="Etsimääsi sivua ei löytynyt." noindex />
    <div className="text-center max-w-xl px-4">
      <p className="text-accent font-heading font-extrabold uppercase tracking-[0.2em] text-sm mb-3">Virhe 404</p>
      <h1 className="text-3xl md:text-5xl font-bold mb-4 font-heading">Sivua ei löytynyt</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Osoite on saattanut muuttua tai sivu on poistettu. Löydät palvelumme ja hinnat etusivulta.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-paint-yellow hover:bg-paint-yellow-hover text-paint-yellow-foreground font-heading font-extrabold rounded-2xl transition-all"
        >
          Etusivulle
        </Link>
        <Link
          to="/maalauspalvelut-hinta-pirkanmaa"
          className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent text-accent font-heading font-extrabold rounded-2xl hover:bg-accent hover:text-accent-foreground transition-all"
        >
          Hintalaskuriin
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
