// api/bookmarks.ts
import { apiRequest } from "./client";
import { getUser } from "./storage";
async function getCurrentUserFromStorage() {
  const raw = await AsyncStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

export async function getMyBookmarks(userId) {
  const me = await getUser();
  userId = me?.documentId;
  if (!userId) throw new Error("Missing user.documentId in storage");
  return apiRequest(`/bookmarks/${encodeURIComponent(userId)}`, {
    method: "GET",
  });
}
