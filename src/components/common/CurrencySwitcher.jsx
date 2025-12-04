import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "lucide-react";

export default function CurrencySwitcher({ prices = {} }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const dropdownRef = useRef(null);

  const currencyOptions = Object.entries(prices).map(([code, value]) => ({
    code,
    value,
  }));

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedCurrency(option);
    setIsOpen(false);
  };

  const formatValue = (code, value) => {
    if (code === "IDR") {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(value);
    } else if (code === "USD") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
    }
    return `${code} ${value}`;
  };

  return (
    <div className="relative font-plusjakartasans" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 bg-[#D9D046] px-6 py-1.5 rounded-md text-xl font-bold text-slate-900 hover:bg-[#c9c03a] transition-colors shadow-sm"
      >
        <span>
          {selectedCurrency
            ? formatValue(selectedCurrency.code, selectedCurrency.value)
            : "Convert to.."}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="py-1">
            <button
              onClick={() => handleSelect(null)}
              className="w-full text-left px-4 py-2 text-xs hover:bg-sky-50 text-slate-600 font-medium border-b border-gray-100"
            >
              Reset
            </button>
            {currencyOptions.map((option) => (
              <button
                key={option.code}
                onClick={() => handleSelect(option)}
                className="w-full text-left px-4 py-2 text-xs hover:bg-sky-50 text-slate-700 hover:text-[#0B1A2E] transition-colors flex justify-between"
              >
                <span className="font-bold">{option.code}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

CurrencySwitcher.propTypes = {
  prices: PropTypes.object,
};
