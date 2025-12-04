import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import Cookies from "js-cookie";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(Cookies.get("lang") || "id");
  const dropdownRef = useRef(null);

  const languages = [
    {
      code: "id",
      label: "Indonesia",
      flag: "https://flagcdn.com/id.svg",
    },
    {
      code: "en",
      label: "English",
      flag: "https://flagcdn.com/us.svg",
    },
  ];

  const currentLangData =
    languages.find((l) => l.code === selectedLang) || languages[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setSelectedLang(code);
    setIsOpen(false);

    Cookies.set("lang", code, { expires: 365 });

    window.location.reload();
  };

  return (
    <div className="relative font-plusjakartasans" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 px-3 py-1.5 rounded-full 
          border transition-all duration-200 group
          ${
            isOpen
              ? "bg-white border-sky-400 ring-2 ring-sky-100"
              : "bg-white/50 border-sky-600/30 hover:bg-white hover:border-sky-400"
          }
        `}
      >
        <div className="w-5 h-5 rounded-full overflow-hidden relative border border-gray-200 shrink-0">
          <img
            src={currentLangData.flag}
            alt={currentLangData.label}
            className="w-full h-full object-cover"
          />
        </div>

        <span className="text-sm font-bold text-sky-900 min-w-[20px] uppercase">
          {selectedLang}
        </span>

        <ChevronDown
          size={14}
          className={`text-sky-900 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg border border-sky-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`
                  w-full px-4 py-2.5 flex items-center gap-3 text-sm text-left hover:bg-sky-50 transition-colors
                  ${
                    selectedLang === lang.code
                      ? "bg-sky-50/50 text-sky-900 font-semibold"
                      : "text-gray-600"
                  }
                `}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-200 shrink-0">
                  <img
                    src={lang.flag}
                    alt={lang.label}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="flex-1">{lang.label}</span>

                {selectedLang === lang.code && (
                  <Check size={14} className="text-sky-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
