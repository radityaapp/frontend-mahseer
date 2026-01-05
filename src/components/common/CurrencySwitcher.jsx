import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronDown, Check } from "lucide-react";

export default function CurrencySwitcher({
  prices = {},
  currentCurrency,
  onCurrencyChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const availableCurrencies = Object.keys(prices);

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
    if (onCurrencyChange) {
      onCurrencyChange(code);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative font-plusjakartasans z-20" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-hijau-lime px-3.5 py-2 md:py-1.5 rounded-md text-sm font-bold text-slate-900 hover:bg-[#c9c03a] transition-all shadow-sm active:scale-95"
      >
        <span>
          {currentCurrency && currentCurrency !== "IDR"
            ? `Currency: ${currentCurrency}`
            : "Convert to.."}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1">
            <button
              onClick={() => handleSelect("IDR")}
              className={`w-full text-left px-4 py-2.5 md:py-2 text-xs transition-colors flex justify-between items-center
                ${
                  currentCurrency === "IDR"
                    ? "bg-sky-50 text-[#0B1A2E] font-bold"
                    : "text-slate-600 hover:bg-gray-50 hover:text-[#0B1A2E]"
                }
              `}
            >
              <span>IDR</span>
              {currentCurrency === "IDR" && (
                <Check size={14} className="text-[#0B1A2E]" />
              )}
            </button>

            {availableCurrencies.map((code) => {
              if (code === "IDR") return null;
              return (
                <button
                  key={code}
                  onClick={() => handleSelect(code)}
                  className={`w-full text-left px-4 py-2.5 md:py-2 text-xs transition-colors flex justify-between items-center
                    ${
                      currentCurrency === code
                        ? "bg-sky-50 text-[#0B1A2E] font-bold"
                        : "text-slate-600 hover:bg-gray-50 hover:text-[#0B1A2E]"
                    }
                  `}
                >
                  <span>{code}</span>
                  {currentCurrency === code && (
                    <Check size={14} className="text-[#0B1A2E]" />
                  )}
                </button>
              );
            })}

            {availableCurrencies.length === 0 && (
              <div className="px-4 py-2 text-xs text-slate-400 italic">
                No options
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

CurrencySwitcher.propTypes = {
  prices: PropTypes.object,
  currentCurrency: PropTypes.string,
  onCurrencyChange: PropTypes.func,
};
