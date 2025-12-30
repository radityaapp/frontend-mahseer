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
    "text-sm md:text-[18px] font-semibold px-4 py-2 rounded-full transition-colors font-plusjakartasans";
  const linkActive = "text-sky-900 font-bold bg-sky-100/50";
  const linkInactiveDark = "text-sky-700 hover:text-sky-900 hover:bg-sky-50/50";
  const linkInactiveLight = "text-sky-100 hover:text-white hover:bg-white/10";

  const isNavbarSolid = !isHomePage || isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition-all duration-300 ease-in-out h-16 flex items-center
          ${
            isNavbarSolid
              ? "bg-gradient-to-r from-sky-100 to-sky-200/95 backdrop-blur border-b border-sky-200 shadow-md"
              : "bg-transparent border-transparent shadow-none"
          }
        `}
      >
        {/* GUNAKAN JUSTIFY-BETWEEN DISINI SEPERTI REFERENSI PSN */}
        <nav className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
          {/* KIRI: LOGO (Tanpa margin aneh-aneh) */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            onClick={closeMenu}
          >
            <img
              src="/images/logo-mahseer.png"
              alt="Exotic Mahseer Logo"
              className="h-14 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = "none";
              }}
            />
          </Link>

          {/* KANAN: GROUP MENU & TOMBOL */}
          <div className="flex items-center gap-6">
            {/* Menu Desktop */}
            <div className="hidden md:flex items-center gap-2">
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

            {/* Language Switcher & Mobile Button */}
            <div className="flex items-center gap-3">
              <div className="scale-90">
                <LanguageSwitcher />
              </div>

              <button
                type="button"
                onClick={toggleMenu}
                className={`md:hidden inline-flex items-center justify-center rounded-lg p-2 transition-colors ${
                  isNavbarSolid
                    ? "text-sky-800 hover:bg-sky-200/50"
                    : "text-white hover:bg-white/20"
                }`}
                aria-label="Toggle navigation"
              >
                <FiMenu size={24} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* MOBILE MENU (OFF-CANVAS) - Tidak Berubah */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
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
          className={`absolute top-0 right-0 h-full w-[280px] bg-[#dcedff] shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-sky-200/60">
            <span className="text-lg font-bold text-sky-900 font-plusjakartasans">
              {menuText.menuTitle}
            </span>
            <button
              onClick={closeMenu}
              className="p-2 rounded-full bg-white/40 text-sky-900 hover:bg-white/80 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block w-full text-center py-3 rounded-xl text-base font-semibold font-plusjakartasans transition-all ${
                    isActive
                      ? "bg-sky-600 text-white shadow-md shadow-sky-300"
                      : "text-sky-800 hover:bg-sky-200/50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="p-6 text-center border-t border-sky-200/60">
            <p className="text-xs text-sky-600 font-plusjakartasans">
              © Exotic Mahseer
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
