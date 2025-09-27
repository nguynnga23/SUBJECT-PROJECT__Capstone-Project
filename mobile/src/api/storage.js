import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setToken(jwt) {
  await AsyncStorage.setItem("jwt", jwt);
}

export async function getToken() {
  return AsyncStorage.getItem("jwt");
}

export async function clearToken() {
  await AsyncStorage.removeItem("jwt");
}

export async function setUser(user) {
  await AsyncStorage.setItem("user", JSON.stringify(user));
}

export async function getUser() {
  const raw = await AsyncStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}
