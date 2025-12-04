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
    onCurrencyChange(code);
    setIsOpen(false);
  };

  return (
    <div className="relative font-plusjakartasans z-20" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-[#D9D046] px-3 py-1.5 rounded-md text-base font-bold text-slate-900 hover:bg-[#c9c03a] transition-colors shadow-sm"
      >
        <span>Convert to..</span>
        <ChevronDown
          size={20}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1">
            {availableCurrencies.length > 0 ? (
              availableCurrencies.map((code) => (
                <button
                  key={code}
                  onClick={() => handleSelect(code)}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors flex justify-between items-center
                    ${
                      currentCurrency === code
                        ? "bg-sky-50 text-[#0B1A2E] font-bold"
                        : "text-slate-600 hover:bg-gray-50 hover:text-[#0B1A2E]"
                    }
                  `}
                >
                  <span>{code}</span>
                  {currentCurrency === code && (
                    <Check size={12} className="text-[#0B1A2E]" />
                  )}
                </button>
              ))
            ) : (
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
