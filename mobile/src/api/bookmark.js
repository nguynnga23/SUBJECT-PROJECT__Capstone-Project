import { apiRequest } from "./client";
import { getUser } from "./storage";

export async function getMyBookmarks(userId) {
  const me = await getUser();
  userId = me?.documentId;
  if (!userId) throw new Error("Missing user.documentId in storage");
  return apiRequest(`/bookmarks/${encodeURIComponent(userId)}`, {
    method: "GET",
  });
}

export async function checkBookmark(articleId) {
  const me = await getUser();
  const userId = me?.documentId;

  const qs = new URLSearchParams({
    userId: String(userId),
    articleId: String(articleId),
  }).toString();

  return apiRequest(`/bookmarks/check?${qs}`, { method: "GET" });
}

export async function addBookmarks(articleId) {
  const me = await getUser();
  const userId = me?.documentId;
  console.log(userId);
  return apiRequest("/bookmarks", {
    method: "POST",
    body: JSON.stringify({ userId, articleId }),
  });
}

export async function removeBookmarks(documentId) {
  return apiRequest(`/bookmarks/${documentId}`, {
    method: "DELETE",
  });
}
