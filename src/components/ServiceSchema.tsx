import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { canonicalUrl } from '@/data/seo';

interface ServiceSchemaProps {
  /** Palvelun nimi, esim. "Tiilikaton pinnoitus". */
  name: string;
  /** Rinnakkaisnimet, joilla asiakkaat hakevat samaa työtä (SEO-suunnitelma 25.10.2026, luku 4). */
  alternateNames?: string[];
  description: string;
  /** Alue, jolla palvelua tarjotaan: kaupunki tai "Pirkanmaa". */
  area: string;
  areaType?: 'City' | 'AdministrativeArea';
  /** Hintahaarukka euroina (AggregateOffer). */
  priceRange?: { min: number; max: number };
}

/** Service-schema palvelusivuille. Viittaa index.html:n LocalBusiness-tietoon @id:llä. */
const ServiceSchema = ({ name, alternateNames, description, area, areaType = 'City', priceRange }: ServiceSchemaProps) => {
  const { pathname } = useLocation();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    ...(alternateNames && { alternateName: alternateNames }),
    serviceType: alternateNames ? [name, ...alternateNames] : name,
    description,
    url: canonicalUrl(pathname),
    provider: { '@id': 'https://pintanen.fi/#yritys' },
    areaServed: { '@type': areaType, name: area },
    ...(priceRange && {
      offers: { '@type': 'AggregateOffer', priceCurrency: 'EUR', lowPrice: priceRange.min, highPrice: priceRange.max },
    }),
  };
  return (
    <Helmet defer={false}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default ServiceSchema;
