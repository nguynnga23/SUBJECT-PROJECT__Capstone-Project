import { apiRequest } from "./client";

export async function login(mssv, password) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ mssv, password }),
  });
}
