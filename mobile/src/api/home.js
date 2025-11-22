import { apiRequest } from "./client";

export async function getArticles() {
  return apiRequest("/articles", { method: "GET" });
}

export async function getArticleById(id) {
  return apiRequest(`/articles/${id}`, { method: "GET" });
}

/**
 * Gọi API RAG backend để thực hiện tìm kiếm bằng phương thức POST.
 * Truy vấn (text) được gửi trong body JSON, khớp với @RequestBody SearchRequest.
 * * @param {string} text - Truy vấn tìm kiếm từ người dùng.
 * @returns {Promise<SearchResponse>} Dữ liệu trả về (câu trả lời AI và sources).
 */
export async function getArticlesByText(text) {
  if (!text || text.trim() === "") {
    console.warn("Query cannot be empty.");
    return null;
  }

  const endpoint = `/search/query`;

  const requestBody = {
    query: text,
  };

  return apiRequest(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
}
