import apiClient from "../lib/apiClient";
import { API_ROUTES } from "../config/appConfig";

export async function fetchHomeData(params = {}) {
  const response = await apiClient.get(API_ROUTES.HOME, {
    params: {
      products_limit: 4,
      articles_limit: 3,
      testimonials_limit: 5,
      activities_limit: 8,
      ...params,
    },
  });
  return response.data;
}
