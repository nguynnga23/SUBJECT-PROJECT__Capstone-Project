import { apiRequest } from "./client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function login(email, password) {
  const res = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (res?.ok && res?.jwt) {
    await AsyncStorage.setItem("token", res.jwt);
    await AsyncStorage.setItem("user", JSON.stringify(res.user));
  }
  return res;
}

export async function logout() {
  await AsyncStorage.removeItem("token");
  await AsyncStorage.removeItem("user");
}

export async function register(username, email, password) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
}
