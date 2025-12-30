import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { DEFAULT_CURRENCY } from "../config/appConfig";

const currencyChangeEvent = new Event("currencyChange");

export default function useCurrency() {
  const [currency, setCurrencyState] = useState(
    Cookies.get("currency") || DEFAULT_CURRENCY
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrencyState(Cookies.get("currency") || DEFAULT_CURRENCY);
    };

    window.addEventListener("currencyChange", handleStorageChange);
    return () =>
      window.removeEventListener("currencyChange", handleStorageChange);
  }, []);

  const setCurrency = (code) => {
    Cookies.set("currency", code, { expires: 365 });
    setCurrencyState(code);

    window.dispatchEvent(currencyChangeEvent);

  };

  const formatPrice = (value, specificCurrency = null) => {
    const targetCurrency = specificCurrency || currency;

    if (value == null) return "-";
    if (typeof value === "string" && isNaN(Number(value))) return value;

    const number = typeof value === "number" ? value : Number(value);

    try {
      const localeMap = {
        USD: "en-US",
        IDR: "id-ID",
      };

      const locale = localeMap[targetCurrency] || "id-ID";

      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: targetCurrency,
        minimumFractionDigits: targetCurrency === "USD" ? 2 : 0,
        maximumFractionDigits: targetCurrency === "USD" ? 2 : 0,
      })
        .format(number)
        .replace("Rp", "Rp");
    } catch (_err) {
      console.error("An error occurred:", _err);
      return `${number}`;
    }
  };

  return {
    currency,
    setCurrency,
    formatPrice,
  };
}
