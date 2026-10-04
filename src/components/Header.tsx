import { useState, useEffect, useRef, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Phone } from "@/components/icons/BrandIcons";
import { getStorageUrl } from "@/lib/storage";
import OptimizedImage from "./OptimizedImage";
import WhatsAppIcon from "./WhatsAppIcon";

const logoUrl = getStorageUrl("Pintanen-logo.png");

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const isHoverLocked = useRef(false);
  const location = useLocation();

  const navItems = [
    {
      label: "Palvelut",
      href: "#",
      dropdown: [
        { label: "Tiilikaton pinnoitus", href: "/tiilikaton-pinnoitus-pirkanmaa" },
        { label: "Katon puhdistus", href: "/katon-puhdistus-pirkanmaa" },
        { label: "Talon maalaus", href: "/talon-maalaus-pirkanmaa" },
      ],
    },
    {
      label: "Hinnat & Laskuri",
      href: "/hintalaskuri",
      dropdown: [
        { label: "Hintalaskuri", href: "/hintalaskuri" },
        { label: "Tiilikaton pinnoitus hinta", href: "/tiilikaton-pinnoitus-hinta-pirkanmaa" },
        { label: "Katon puhdistus hinta", href: "/katon-puhdistus-hinta-pirkanmaa" },
        { label: "Talon maalaus hinta", href: "/talon-maalaus-hinta-pirkanmaa" },
      ],
    },
    { label: "Referenssit", href: "/referenssit" },
    { label: "Artikkelit", href: "/artikkelit" },
    { label: "Tutustu meihin", href: "/meista" },
  ];

  function closeNavigationMenus(event?: MouseEvent<HTMLElement>) {
    event?.currentTarget.blur();

    flushSync(() => {
      setIsMobileMenuOpen(false);
      setOpenDropdown(null);
    });
  }

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const shouldBeScrolled = window.scrollY > 50;
        setIsScrolled((prev) => (prev === shouldBeScrolled ? prev : shouldBeScrolled));
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [location.pathname]);

  const handleNavigationLinkClick = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.blur();
    isHoverLocked.current = true;

    flushSync(() => {
      setOpenDropdown(null);
      setIsMobileMenuOpen(false);
    });

    const unlockHover = () => {
      isHoverLocked.current = false;
      window.removeEventListener("mousemove", unlockHover);
    };

    setTimeout(() => {
      window.addEventListener("mousemove", unlockHover);
    }, 100);
  };

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelDesktopDropdownClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const handleDesktopDropdownOpen = (label: string) => {
    if (isHoverLocked.current) return;
    cancelDesktopDropdownClose();
    setOpenDropdown(label);
  };

  // Pieni viive sulkemiseen: valikko ei katoa, vaikka hiiri käy hetken sen ulkopuolella matkalla alas.
  const handleDesktopDropdownClose = () => {
    cancelDesktopDropdownClose();
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 220);
  };

  useEffect(() => cancelDesktopDropdownClose, []);

  return (
    <header
      className={`on-dark fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${isScrolled ? "shadow-lg" : ""}`}
    >
      {/* Desktop utility bar — collapses on scroll */}
      <div
        className={`hidden xl:block bg-navy text-navy-foreground overflow-hidden transition-[max-height] duration-300 border-b border-white/5 ${isScrolled ? "max-h-0" : "max-h-12"}`}
      >
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full h-9 flex items-center justify-between text-sm">
          <a href="tel:+358409640066" className="flex items-center gap-2 group transition-colors">
            <span className="bg-accent p-1 rounded group-hover:bg-paint-yellow transition-colors">
              <Phone className="w-3.5 h-3.5 text-accent-foreground group-hover:text-navy" />
            </span>
            <span className="font-bold tracking-tight text-white/90 group-hover:text-paint-yellow transition-colors">040 964 0066</span>
          </a>
          <div className="flex items-center gap-6">
            <span className="italic font-medium text-white/70">
              Pirkanmaan luotettava perheyritys – Laatua kotiisi
            </span>
          </div>
        </div>
      </div>

      <div className="bg-navy/95 backdrop-blur-md border-b border-white/10">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Mobile: 3-column layout */}
        <div className="flex xl:hidden items-center justify-between w-full h-20">
          <a
            href="https://wa.me/358409640066"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-green-400 shadow-sm"
          >
            <WhatsAppIcon className="w-5 h-5" />
          </a>

          <Link to="/" className="flex items-center shrink-0 transition-transform duration-200 hover:scale-105">
            <OptimizedImage
              src={logoUrl}
              alt="Pintanen Oy – tiilikaton pinnoitus ja ulkomaalaus Pirkanmaalla"
              className="h-12 md:h-12 w-auto shrink-0 object-contain"
              priority={true}
              sizes="200px"
              width={200}
              height={80}
            />
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white"
            aria-label={isMobileMenuOpen ? "Sulje valikko" : "Avaa päävalikko"}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop layout */}
        <div className="hidden xl:flex items-center justify-between w-full h-20">
          <Link to="/" className="flex items-center shrink-0 relative z-50 transition-transform duration-200 hover:scale-105">
            <OptimizedImage
              src={logoUrl}
              alt="Pintanen Oy – tiilikaton pinnoitus ja ulkomaalaus Pirkanmaalla"
              className="h-10 md:h-12 lg:h-14 w-auto shrink-0 object-contain"
              priority={true}
              sizes="200px"
              width={200}
              height={80}
            />
          </Link>

          <nav
            aria-label="Päänavigaatio"
            className="flex items-center gap-4 lg:gap-6 flex-1 justify-end mr-4"
          >
            {navItems.map((item) => {
              if (!item.dropdown) {
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={handleNavigationLinkClick}
                    className={`font-bold text-sm uppercase tracking-wide transition-colors duration-200 text-white/90 hover:text-accent-ink ${location.pathname === item.href ? "text-accent-ink" : ""}`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => handleDesktopDropdownOpen(item.label)}
                  onMouseLeave={handleDesktopDropdownClose}
                >
                  <div className="flex items-center gap-1 py-7 -my-7">
                    <Link
                      to={item.href}
                      onClick={handleNavigationLinkClick}
                      className="font-bold text-sm uppercase tracking-wide transition-colors duration-200 text-white/90 hover:text-accent-ink"
                    >
                      {item.label}
                    </Link>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 text-white/50 ${openDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </div>

                  <AnimatePresence>
                    {openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        // Näkymätön reunus (padding) pitää hiiren valikon alueella myös otsikon ja listan välissä ja sivuilla.
                        className="absolute top-full -left-6 pt-2 px-6 pb-6 z-50"
                      >
                        <div className="w-60 bg-navy rounded-xl shadow-2xl border border-white/10 overflow-hidden">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              onClick={handleNavigationLinkClick}
                              className="block px-4 py-3 text-white/80 hover:bg-white/5 hover:text-accent-ink transition-colors font-medium"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/358409640066"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-green-400 hover:scale-110 transition-transform"
            >
              <WhatsAppIcon className="w-5 h-5" />
            </a>
            <a
              className="flex items-center gap-2 px-7 py-3 rounded-full font-extrabold text-xs uppercase tracking-[0.1em] transition-all duration-300 bg-accent-strong text-accent-foreground shadow-lg shadow-accent/40 hover:bg-accent-strong/90 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              href="#yhteystiedot"
            >
              Pyydä tarjous
            </a>
          </div>
        </div>
      </div>
      </div>

      {/* Gradient accent strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-accent via-paint-yellow to-accent" aria-hidden="true" />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-navy border-t border-white/10"
          >
            <nav aria-label="Mobiilinavigaatio" className="section-container py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                if (!item.dropdown) {
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={closeNavigationMenus}
                      className="py-3 px-4 text-white/90 font-medium hover:bg-white/5 hover:text-accent-ink rounded-lg transition-colors"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <div key={item.label}>
                    <div className="flex items-center">
                      <Link
                        to={item.href}
                        onClick={closeNavigationMenus}
                        className="flex-1 py-3 px-4 text-white/90 font-medium hover:bg-white/5 hover:text-accent-ink rounded-lg transition-colors"
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className="py-3 px-4 text-white/70 hover:bg-white/5 hover:text-accent-ink rounded-lg transition-colors"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 border-l-2 border-accent/40"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.href}
                              to={subItem.href}
                              onClick={closeNavigationMenus}
                              className="block py-2 px-4 text-white/70 hover:text-accent-ink transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <a
                href="#yhteystiedot"
                onClick={closeNavigationMenus}
                className="mt-2 flex items-center justify-center gap-2 py-3 px-4 bg-accent-strong text-accent-foreground rounded-xl font-bold uppercase text-sm tracking-wider"
              >
                Pyydä tarjous
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
