import { useState } from "react";
import Cookies from "js-cookie";
import { DEFAULT_LOCALE } from "../config/appConfig";

export default function useLocale() {
  const [locale, setLocaleState] = useState(
    Cookies.get("lang") || DEFAULT_LOCALE
  );

  const setLocale = (langCode) => {
    Cookies.set("lang", langCode, { expires: 365 });
    setLocaleState(langCode);

    window.location.reload();
  };

  return {
    locale,
    setLocale,
  };
}
