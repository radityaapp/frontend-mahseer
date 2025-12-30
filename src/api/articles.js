import apiClient from "../lib/apiClient";
import { API_ROUTES } from "../config/appConfig";

export async function fetchArticles(options = {}) {
  const response = await apiClient.get(API_ROUTES.ARTICLES, {
    params: {
      page: options.page,
      lang: options.lang,
    },
  });

  return response.data;
}

export async function getArticleDetail(slug, options = {}) {
  const response = await apiClient.get(API_ROUTES.ARTICLE_DETAIL(slug), {
    params: {
      lang: options.lang,
    },
  });

  return response.data;
}
