const appConfig = {
  appName: "Exotic Mahseer",

  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api",

  defaultLocale: import.meta.env.VITE_DEFAULT_LOCALE ?? "id",
  fallbackLocale: "en",
  supportedLocales: ["id", "en"],

  defaultCurrency: import.meta.env.VITE_DEFAULT_CURRENCY ?? "IDR",
  supportedCurrencies: ["IDR", "USD"],

  apiRoutes: {
    HOME: "/home",
    PRODUCTS: "/products",
    PRODUCT_DETAIL: (slug) => `/products/${slug}`,
    CATEGORIES: "/categories",
    ARTICLES: "/articles",
    ARTICLE_DETAIL: (slug) => `/articles/${slug}`,
    TESTIMONIALS: "/testimonials",
    ACTIVITIES: "/activities",
  },
};

export default appConfig;

export const {
  appName: APP_NAME,
  apiBaseUrl: API_BASE_URL,
  defaultLocale: DEFAULT_LOCALE,
  fallbackLocale: FALLBACK_LOCALE,
  supportedLocales: SUPPORTED_LOCALES,
  defaultCurrency: DEFAULT_CURRENCY,
  supportedCurrencies: SUPPORTED_CURRENCIES,
  apiRoutes: API_ROUTES,
} = appConfig;
