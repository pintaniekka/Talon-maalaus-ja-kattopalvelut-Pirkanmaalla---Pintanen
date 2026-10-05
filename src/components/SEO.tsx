import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_URL, canonicalUrl, withBrand } from '@/data/seo';
import type { Crumb } from '@/components/Breadcrumbs';

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
  /** Tuota murupolku-schema. Artikkelit tuottavat omansa. */
  breadcrumb?: boolean;
  /**
   * Murupolun välitasot ja nykyinen sivu (sama lista kuin näkyvässä Breadcrumbs-komponentissa).
   * Jos puuttuu, tuotetaan kaksitasoinen Etusivu › sivu.
   */
  breadcrumbs?: Crumb[];
}

const SEO = ({
  title,
  description,
  ogImage,
  noindex = false,
  ogType = 'website',
  breadcrumb = true,
  breadcrumbs,
}: SEOProps) => {
  const { pathname } = useLocation();
  const pageTitle = withBrand(title);
  const pageDescription = description || DEFAULT_DESCRIPTION;
  const canonical = canonicalUrl(pathname);
  const isHome = canonical === `${SITE_URL}/`;
  const imageUrl = ogImage || DEFAULT_OG_IMAGE.url;
  const isDefaultOgImage = imageUrl === DEFAULT_OG_IMAGE.url;

  const crumbs: Crumb[] = breadcrumbs ?? [{ name: pageTitle.replace(/\s*\|.*$/, '') }];
  const breadcrumbJsonLd =
    breadcrumb && !noindex && !isHome
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Etusivu', item: `${SITE_URL}/` },
            ...crumbs.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 2,
              name: c.name,
              item: i === crumbs.length - 1 || !c.path ? canonical : canonicalUrl(c.path),
            })),
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
      {isDefaultOgImage && <meta property="og:image:width" content={String(DEFAULT_OG_IMAGE.width)} />}
      {isDefaultOgImage && <meta property="og:image:height" content={String(DEFAULT_OG_IMAGE.height)} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
      {breadcrumbJsonLd && <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>}
    </Helmet>
  );
};

export default SEO;
