import { useState } from "react";
import Cookies from "js-cookie";
import { DEFAULT_CURRENCY } from "../config/appConfig";

export default function useCurrency() {
  const [currency, setCurrencyState] = useState(
    Cookies.get("currency") || DEFAULT_CURRENCY
  );

  const setCurrency = (code) => {
    Cookies.set("currency", code, { expires: 365 });
    setCurrencyState(code);
    window.location.reload();
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
    } catch (err) {
      console.error(err);
      return `${number}`;
    }
  };

  return {
    currency,
    setCurrency,
    formatPrice,
  };
}
