import { apiRequest } from "./client";

export async function getArticles() {
  return apiRequest("/articles", { method: "GET" });
}

export async function getArticleById(id) {
  return apiRequest(`/articles/${id}`, { method: "GET" });
}
