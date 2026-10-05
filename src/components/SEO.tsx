import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { DEFAULT_DESCRIPTION, canonicalUrl, withBrand } from '@/data/seo';

interface SEOProps {
  title?: string;
  description?: string;
  /**
   * @deprecated Ei enää käytössä. Pääkuvan preload kirjoitetaan build-aikana staattiseen
   * HTML:ään (src/data/seo.ts → hero), jolloin se ehtii ennen JavaScriptiä ja käyttää srcsetiä.
   */
  preloadImage?: string;
  ogImage?: string;
  /** Estä indeksointi (esim. 404-sivu). Canonicalia ei tällöin aseteta. */
  noindex?: boolean;
  /** og:type, oletus "website". Artikkelit käyttävät arvoa "article". */
  ogType?: 'website' | 'article';
  /** Tuota kaksitasoinen murupolku-schema (Etusivu › sivu). Artikkelit tuottavat omansa. */
  breadcrumb?: boolean;
}

const defaultOgImage = "https://pintanen.fi/images/Pictures-1500/tummansininen-puutalo-ulkomaalaus-jalkeen-1500.webp";

const SEO = ({
  title,
  description,
  ogImage,
  noindex = false,
  ogType = 'website',
  breadcrumb = true,
}: SEOProps) => {
  const { pathname } = useLocation();
  const pageTitle = withBrand(title);
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const canonical = canonicalUrl(pathname);
  const isHome = canonical === 'https://pintanen.fi/';
  const imageUrl = ogImage || defaultOgImage;
  const isDefaultOgImage = imageUrl === defaultOgImage;

  const breadcrumbJsonLd =
    breadcrumb && !noindex && !isHome
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Etusivu', item: 'https://pintanen.fi/' },
            {
              '@type': 'ListItem',
              position: 2,
              name: pageTitle.replace(/\s*\|.*$/, ''),
              item: canonical,
            },
          ],
        }
      : null;

  // defer={false}: päivitä head synkronisesti. Oletus (requestAnimationFrame) jää
  // ajamatta piilotetussa välilehdessä ja voi jäädä näkemättä esirenderöijiltä.
  return (
    <Helmet defer={false}>
      <title>{pageTitle}</title>
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <link rel="canonical" href={canonical} />}
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="fi_FI" />
      <meta property="og:site_name" content="Pintanen Oy" />
      <meta property="og:image" content={imageUrl} />
      {isDefaultOgImage && <meta property="og:image:type" content="image/webp" />}
      {isDefaultOgImage && <meta property="og:image:width" content="1500" />}
      {isDefaultOgImage && <meta property="og:image:height" content="2000" />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
      {breadcrumbJsonLd && <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>}
    </Helmet>
  );
};

export default SEO;
