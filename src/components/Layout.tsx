import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import DesktopQuoteDrawer from './DesktopQuoteDrawer';
import ChatLeadForm from './ChatLeadForm';
import CookieBanner from './CookieBanner';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/** Sivut, joilla on oma lomake: chat ei saa peittää sitä (auditointi 8.4). Mobiilin alapalkki poistettiin 29.10.2026 (Eki): chat riittää. */
const LOMAKESIVUT = ["/tarjouspyynto", "/hintalaskuri"];

const Layout = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  const lomakesivu = LOMAKESIVUT.includes(path);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <a
        href="#sisalto"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-card focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Siirry sisältöön
      </a>
      <Header />
      <main id="sisalto" tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
      <DesktopQuoteDrawer />
      {!lomakesivu && <ChatLeadForm />}
      <CookieBanner />
    </div>
  );
};

export default Layout;
