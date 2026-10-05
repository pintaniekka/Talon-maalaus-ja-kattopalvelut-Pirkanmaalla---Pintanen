import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileBottomBar from './MobileBottomBar';
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

/** Sivut, joilla on oma lomake: kelluva alapalkki ja chat eivät saa peittää sitä (auditointi 8.4). */
const LOMAKESIVUT = ["/tarjouspyynto", "/hintalaskuri"];

const Layout = () => {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "") || "/";
  const lomakesivu = LOMAKESIVUT.includes(path);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      {/* Puhelimella footerin viimeinen rivi jäisi kiinteän alapalkin alle ilman alatäytettä. */}
      <main className={`flex-1 ${lomakesivu ? "" : "pb-[5.25rem] lg:pb-0"}`}>
        <Outlet />
      </main>
      <Footer />
      {!lomakesivu && <MobileBottomBar />}
      <DesktopQuoteDrawer />
      {!lomakesivu && <ChatLeadForm />}
      <CookieBanner />
    </div>
  );
};

export default Layout;
