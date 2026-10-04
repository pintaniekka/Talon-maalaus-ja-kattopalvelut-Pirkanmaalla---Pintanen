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

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomBar />
      <DesktopQuoteDrawer />
      <ChatLeadForm />
      <CookieBanner />
    </div>
  );
};

export default Layout;
