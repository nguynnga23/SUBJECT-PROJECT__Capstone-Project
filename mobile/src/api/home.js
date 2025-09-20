import { apiRequest } from "./client";

export async function getArticles() {
  return apiRequest("/v1/articles", { method: "GET" });
}

export async function getArticleById(id) {
  return apiRequest(`/v1/articles/${id}`, { method: "GET" });
}
