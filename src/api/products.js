import apiClient from "../lib/apiClient";
import { API_ROUTES } from "../config/appConfig";

export async function fetchProducts(options = {}) {

  const response = await apiClient.get(API_ROUTES.PRODUCTS, {
    params: {
      category: options.category === "semua" ? null : options.category,
      sort: options.sort || null,
      min_price: options.min_price,
      max_price: options.max_price,
      page: options.page,
      per_page: options.per_page,
    },
  });

  return response.data;
}

export async function fetchCategories() {
  const response = await apiClient.get(API_ROUTES.CATEGORIES);
  return response.data;
}

export async function getProductDetail(slug, params = {}) {
  const response = await apiClient.get(API_ROUTES.PRODUCT_DETAIL(slug), { params });
  return response.data;
}
