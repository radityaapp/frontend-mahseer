import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import LanguageSwitcher from "../common/LanguageSwitcher";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Product", to: "/products" },
  { label: "Articles", to: "/articles" },
  { label: "About Us", to: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  const linkBase =
    "text-sm md:text-[15px] font-semibold px-3 py-1 rounded-full transition-colors font-plusjakartasans";
  const linkActive = "text-sky-900 font-bold bg-sky-100/50";
  const linkInactive = "text-sky-700 hover:text-sky-900";

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-sky-100 to-sky-200/95 backdrop-blur border-b border-sky-200">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0"
          onClick={closeMenu}
        >
          <img
            src="/images/logo-mahseer.png"
            alt="Exotic Mahseer Logo"
            className="h-12 w-auto object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
            }}
          />
          <div className="hidden">Exotic Mahseer</div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? linkActive : linkInactive}`
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-sky-300/40">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <div className="scale-90 origin-right">
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-full border border-sky-400 bg-white/70 text-sky-800 h-9 w-9 ml-1"
            aria-label="Toggle navigation"
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-sky-200 bg-sky-50/95">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `${linkBase} ${
                    isActive ? linkActive : linkInactive
                  } w-fit px-3`
                }
                onClick={closeMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}