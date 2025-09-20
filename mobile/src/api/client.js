import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "../config";

export async function apiRequest(endpoint, options = {}) {
  const token = await AsyncStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API request failed");
  }

  return response.json();
}
