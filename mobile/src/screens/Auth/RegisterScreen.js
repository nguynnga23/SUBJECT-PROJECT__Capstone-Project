import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function RegisterScreen({ navigation, onRegister }) {
  const [fullName, setFullName] = useState("");
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const canSubmit = useMemo(() => {
    if (
      !fullName.trim() ||
      !emailOrId.trim() ||
      !password.trim() ||
      !confirm.trim()
    )
      return false;
    if (password.length < 6) return false;
    return password === confirm;
  }, [fullName, emailOrId, password, confirm]);

  const handleSubmit = () => {
    if (!canSubmit) return;
    // TODO: gọi API đăng ký
    onRegister?.(); // hoặc navigation.replace("Login")
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Thương hiệu */}
      <View style={styles.brandRow}>
        <Text style={styles.brand}>UNIFEED.news</Text>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollCenter}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        enableOnAndroid
        extraScrollHeight={24}
      >
        {/* Thẻ */}
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.link}>
                Đã có tài khoản? <Text style={styles.signUp}>Đăng nhập</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.signInText}>Đăng ký</Text>

          {/* Form */}
          <View style={{ marginTop: 24 }}>
            <Text style={styles.label}>Nhập họ và tên của bạn</Text>
            <TextInput
              style={styles.input}
              placeholder="Họ và tên"
              placeholderTextColor="#9aa0a6"
              value={fullName}
              onChangeText={setFullName}
              returnKeyType="next"
            />

            <Text style={[styles.label, { marginTop: 16 }]}>
              Nhập tên đăng nhập hoặc email
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Tên đăng nhập hoặc email"
              placeholderTextColor="#9aa0a6"
              value={emailOrId}
              onChangeText={setEmailOrId}
              autoCapitalize="none"
              returnKeyType="next"
            />

            <Text style={[styles.label, { marginTop: 16 }]}>Tạo mật khẩu</Text>
            <View style={styles.passwordWrap}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Mật khẩu (tối thiểu 6 ký tự)"
                placeholderTextColor="#9aa0a6"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPwd}
                returnKeyType="next"
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPwd((s) => !s)}
              >
                <Ionicons
                  name={showPwd ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color="#5f6368"
                />
              </TouchableOpacity>
            </View>

            <Text style={[styles.label, { marginTop: 16 }]}>
              Xác nhận mật khẩu
            </Text>
            <View style={styles.passwordWrap}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Nhập lại mật khẩu"
                placeholderTextColor="#9aa0a6"
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showConfirm}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowConfirm((s) => !s)}
              >
                <Ionicons
                  name={showConfirm ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color="#5f6368"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Nút Đăng ký */}
          <TouchableOpacity
            style={[styles.btn, !canSubmit && styles.btnDisabled]}
            onPress={handleSubmit}
            disabled={!canSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.btnText}>Đăng ký</Text>
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
    paddingBottom: 24,
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

  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 12,
  },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flex: 1,
  },
  googleText: { marginLeft: 6, fontSize: 13, color: "#444" },
  circleBtn: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

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
