import { apiRequest } from "./client";

export async function login(email, password) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(username, email, password) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}
