import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { canonicalUrl } from '@/data/seo';

interface ServiceSchemaProps {
  /** Palvelun nimi, esim. "Tiilikaton pinnoitus". */
  name: string;
  description: string;
  /** Alue, jolla palvelua tarjotaan: kaupunki tai "Pirkanmaa". */
  area: string;
  areaType?: 'City' | 'AdministrativeArea';
}

/** Service-schema palvelusivuille. Viittaa index.html:n LocalBusiness-tietoon @id:llä. */
const ServiceSchema = ({ name, description, area, areaType = 'City' }: ServiceSchemaProps) => {
  const { pathname } = useLocation();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: name,
    description,
    url: canonicalUrl(pathname),
    provider: { '@id': 'https://pintanen.fi/#yritys' },
    areaServed: { '@type': areaType, name: area },
  };
  return (
    <Helmet defer={false}>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default ServiceSchema;
