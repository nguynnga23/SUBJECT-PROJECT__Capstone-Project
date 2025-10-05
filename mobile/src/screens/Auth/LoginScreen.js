import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { login } from "../../api/auth";

export default function LoginScreen({ navigation, onLogin }) {
  const [emailOrId, setEmailOrId] = useState("nga2@gmail.com");
  const [password, setPassword] = useState("123456789");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const canSubmit = Boolean(emailOrId.trim() && password.trim());

  const handleLogin = async () => {
    if (!canSubmit || loading) return;
    setLoading(true);
    setErr(null);
    try {
      const res = await login(emailOrId.trim(), password);
      if (res?.ok) {
        // Nếu parent truyền onLogin thì gọi, không thì điều hướng Home
        if (typeof onLogin === "function") onLogin(res);
        else navigation.replace("Home");
      } else {
        setErr(res?.message || "Đăng nhập thất bại");
      }
    } catch (e) {
      // e.message là nội dung bạn throw trong apiRequest (server text)
      setErr(e?.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.brandRow}>
        <Text style={styles.brand}>UNIFEED.news</Text>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollCenter}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        enableOnAndroid
        extraScrollHeight={24}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.link}>
                Chưa có tài khoản? <Text style={styles.signUp}>Đăng ký</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.signInText}>Đăng nhập</Text>

          <View style={{ marginTop: 24 }}>
            <Text style={styles.label}>Nhập email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9aa0a6"
              value={emailOrId}
              onChangeText={setEmailOrId}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => {}}
            />

            <Text style={[styles.label, { marginTop: 16 }]}>Nhập mật khẩu</Text>
            <View style={styles.passwordWrap}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Mật khẩu"
                placeholderTextColor="#9aa0a6"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPwd}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPwd((v) => !v)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={showPwd ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color="#5f6368"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.forgot}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgotText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
          </View>

          {err ? (
            <Text style={{ color: "red", marginTop: 8 }}>{err}</Text>
          ) : null}

          <TouchableOpacity
            style={[styles.btn, (!canSubmit || loading) && styles.btnDisabled]}
            onPress={handleLogin}
            disabled={!canSubmit || loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.btnText}>Đăng nhập</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#E7F0FF" },
  brandRow: { paddingTop: 20, paddingHorizontal: 20, margin: 10 },
  brand: { color: "#1976FF", fontSize: 16, fontWeight: "800" },

  scrollCenter: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingBottom: 100,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 22,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 4,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  h1: { fontSize: 18, fontWeight: "600", color: "#000" },
  link: { color: "#5f6368", fontSize: 13 },
  signUp: { color: "#1976FF", fontWeight: "600" },
  signInText: { fontSize: 28, fontWeight: "800", marginTop: 12 },

  label: { fontSize: 13, color: "#000", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#1976FF",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#000",
  },
  passwordWrap: { position: "relative" },
  inputPassword: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#000",
  },
  eyeBtn: { position: "absolute", right: 12, top: 12 },

  forgot: { alignSelf: "flex-end", marginTop: 8 },
  forgotText: { color: "#1976FF", fontSize: 13 },

  btn: {
    backgroundColor: "#1976FF",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
