import { apiRequest } from "./client";

export async function getArticles() {
  return apiRequest("/articles", { method: "GET" });
}

export async function getArticleById(id) {
  return apiRequest(`/articles/${id}`, { method: "GET" });
}

export async function getArticlesByText(text) {
  const params = new URLSearchParams({ q: text });
  return apiRequest(`/search?${params.toString()}`, { method: "GET" });
}
