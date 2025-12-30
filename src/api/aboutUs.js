import apiClient from "../lib/apiClient";
import { API_ROUTES } from "../config/appConfig";

export async function fetchActivities(options = {}) {
  const response = await apiClient.get(API_ROUTES.ACTIVITIES, {
    params: {
      limit: options.limit || null,
      lang: options.lang,
    },
  });

  return response.data;
}
