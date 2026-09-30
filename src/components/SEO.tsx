import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getStorageUrl } from '@/lib/storage';

interface SEOProps {
  title?: string;
  description?: string;
  preloadImage?: string;
  ogImage?: string;
  /** Estä indeksointi (esim. 404-sivu). Canonicalia ei tällöin aseteta. */
  noindex?: boolean;
}

const defaultTitle = 'Tiilikaton pinnoitus ja talon maalaus Pirkanmaa | Pintanen';
const defaultDescription = 'Tiilikaton pinnoitus, katon puhdistus ja talon maalaus takuutyönä Pirkanmaalla. Yrittäjät mukana jokaisessa työssä. Pyydä maksuton arvio.';

const defaultOgImage = "https://fndkkgfpsgghvewvoysr.supabase.co/storage/v1/object/public/images/Pictures-1500/tummansininen-puutalo-ulkomaalaus-jalkeen-1500.webp";

const SEO = ({ title, description, preloadImage, ogImage, noindex = false }: SEOProps) => {
  const { pathname } = useLocation();
  const pageTitle = title ? `${title} | Pintanen` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const cleanPath = pathname.replace(/\/+$/, '');
  const canonicalUrl = cleanPath === '' ? 'https://pintanen.fi/' : `https://pintanen.fi${cleanPath}/`;
  // Etusivun hero-kuvan preload on index.html:ssä; muut sivut antavat oman kuvansa preloadImage-propilla.
  const imageToPreload = preloadImage;
  const imageUrl = ogImage || defaultOgImage;
  const isDefaultOgImage = imageUrl === defaultOgImage;

  // defer={false}: päivitä head synkronisesti. Oletus (requestAnimationFrame) jää
  // ajamatta piilotetussa välilehdessä ja voi jäädä näkemättä esirenderöijiltä.
  return (
    <Helmet defer={false}>
      <title>{pageTitle}</title>
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <link rel="canonical" href={canonicalUrl} />}
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={imageUrl} />
      {isDefaultOgImage && <meta property="og:image:type" content="image/webp" />}
      {isDefaultOgImage && <meta property="og:image:width" content="1500" />}
      {isDefaultOgImage && <meta property="og:image:height" content="2000" />}
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={imageUrl} />
      {imageToPreload && (
        <link rel="preload" as="image" href={imageToPreload} type="image/webp" />
      )}
    </Helmet>
  );
};

export default SEO;
