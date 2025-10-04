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

export async function addBookmarks(userId, articleId) {
  const me = await getUser();
  userId = me?.documentId;
  return apiRequest("/bookmarks", {
    method: "POST",
    body: JSON.stringify({ userId, articleId }),
  });
}
