import { Link } from 'react-router-dom';
import ServicePageHero from '@/components/ServicePageHero';

interface PinnoitusCityHeroProps {
  cityName: string;
  cityIn: string;
  backgroundImage: string;
  backgroundSrcSet?: string;
}

const PinnoitusCityHero = ({ cityName, cityIn, backgroundImage, backgroundSrcSet }: PinnoitusCityHeroProps) => {
  return (
    <ServicePageHero title="" subtitle="" backgroundImage={backgroundImage} backgroundSrcSet={backgroundSrcSet}>
      {/* Glassmorphism container for H1 + body text */}
      <div className="bg-black/45 rounded-2xl p-4 md:p-8 max-w-4xl mx-auto mb-10 md:mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 md:mb-6 font-heading">
          Tiilikaton pinnoitus{' '}
          <span className="text-accent drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">{cityName}</span>
        </h1>
        <p className="text-base md:text-lg text-primary-foreground/85 leading-relaxed max-w-3xl mx-auto">
          Pysäytä katon kuluminen ennen kuin vauriot tulevat liian kalliiksi. Laadukas tiilikaton pinnoitus {cityIn} on järkevin tapa estää kalliiden kattoremonttien tarve. Pintasen asiantuntija toteuttaa pinnoitukset ammattitaidolla, jolloin katto saa takaisin alkuperäisen suojansa. Tämä myös parantaa talon julkisivun ilmettä ja antaa katolle jopa <strong className="text-primary-foreground">10–15 vuotta lisäaikaa</strong>.
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#yhteystiedot"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-accent-foreground transition-colors"
          style={{ backgroundColor: 'hsl(202, 100%, 61%)' }}
        >
          Pyydä ilmainen kuntotarkastus
        </a>
        <Link
          to="/hintalaskuri?palvelu=pinnoitus"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          style={{ backgroundColor: 'hsla(30, 52%, 90%, 0.15)' }}
        >
          Katso hinta hintalaskurilla!
        </Link>
      </div>
    </ServicePageHero>
  );
};

export default PinnoitusCityHero;
