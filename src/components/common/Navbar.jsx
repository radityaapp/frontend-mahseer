import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import LanguageSwitcher from "../common/LanguageSwitcher";
import useLocale from "../../hooks/useLocale";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { locale } = useLocale();
  const location = useLocation();

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuText = {
    id: {
      home: "Beranda",
      product: "Produk",
      articles: "Artikel",
      about: "Tentang Kami",
      menuTitle: "Menu",
    },
    en: {
      home: "Home",
      product: "Product",
      articles: "Articles",
      about: "About Us",
      menuTitle: "Menu",
    },
  }[locale];

  const navLinks = [
    { label: menuText.home, to: "/" },
    { label: menuText.product, to: "/products" },
    { label: menuText.articles, to: "/articles" },
    { label: menuText.about, to: "/about" },
  ];

  const linkBase =
    "text-sm md:text-base lg:text-[17px] font-bold px-4 py-2 rounded-full transition-all duration-300 font-plusjakartasans whitespace-nowrap";
  const linkActive = "text-sky-900 bg-sky-100/80 shadow-sm";
  const linkInactiveDark = "text-sky-800 hover:text-sky-900 hover:bg-sky-50/50";
  const linkInactiveLight = "text-sky-50 hover:text-white hover:bg-white/10";

  const isNavbarSolid = !isHomePage || isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 ease-in-out flex items-center
          ${
            isNavbarSolid
              ? "bg-gradient-to-r from-sky-100 via-sky-100 to-sky-200/95 backdrop-blur-md border-b border-sky-200 shadow-sm h-16 md:h-20"
              : "bg-transparent border-transparent shadow-none h-16 md:h-24"
          }
        `}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 z-50"
            onClick={closeMenu}
          >
            <img
              src="/images/logo-mahseer.png"
              alt="Exotic Mahseer Logo"
              className={`w-auto object-contain transition-all duration-300 ${
                isNavbarSolid ? "h-10 md:h-12" : "h-11 md:h-14"
              }`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
          </Link>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive
                        ? linkActive
                        : isNavbarSolid
                        ? linkInactiveDark
                        : linkInactiveLight
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-3 pl-2 md:pl-4 border-l border-transparent md:border-sky-200/30">
              <div className="scale-90 md:scale-100">
                <LanguageSwitcher />
              </div>

              <button
                type="button"
                onClick={toggleMenu}
                className={`md:hidden inline-flex items-center justify-center rounded-lg p-2 transition-all active:scale-95 ${
                  isNavbarSolid
                    ? "text-sky-900 hover:bg-sky-200/50"
                    : "text-white hover:bg-white/20"
                }`}
                aria-label="Toggle navigation"
              >
                <FiMenu size={26} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          open
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
          onClick={closeMenu}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#f0f9ff] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col z-50 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-sky-200">
            <span className="text-lg font-bold text-sky-900 font-plusjakartasans">
              {menuText.menuTitle}
            </span>
            <button
              onClick={closeMenu}
              className="p-2 rounded-full bg-sky-100 text-sky-900 hover:bg-sky-200 transition-colors active:scale-90"
            >
              <FiX size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block w-full text-center py-3.5 rounded-xl text-base font-bold font-plusjakartasans transition-all ${
                    isActive
                      ? "bg-[#0B1A2E] text-[#D9D046] shadow-lg shadow-sky-900/20"
                      : "text-sky-800 bg-white hover:bg-sky-50 border border-sky-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="p-6 text-center border-t border-sky-200 bg-sky-50/50">
            <img
              src="/images/logo-mahseer.png"
              alt="Logo"
              className="h-8 mx-auto mb-3 opacity-80 mix-blend-multiply"
            />
            <p className="text-xs text-sky-600 font-plusjakartasans font-medium">
              © {new Date().getFullYear()} Exotic Mahseer
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
