import axios from "axios";
import Cookies from "js-cookie";
import appConfig from "../config/appConfig";

import {
  DEFAULT_LOCALE,
  DEFAULT_CURRENCY,
} from "../config/appConfig";

const apiClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const lang = Cookies.get("lang") ?? DEFAULT_LOCALE;
    const currency = Cookies.get("currency") ?? DEFAULT_CURRENCY;

    config.params = {
      ...(config.params || {}),
      lang,
      currency,
    };

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
