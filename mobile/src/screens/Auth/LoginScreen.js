import React, { useState } from "react";
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

export default function LoginScreen({ navigation, onLogin }) {
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const canSubmit = emailOrId.trim() && password.trim();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Logo nhỏ phía trên */}
      <View style={styles.brandRow}>
        <Text style={styles.brand}>UNIFEED.news</Text>
      </View>

      {/* Dùng KASV trực tiếp, không cần KAV */}
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollCenter}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        enableOnAndroid
        extraScrollHeight={24} // đẩy thêm 1 chút khi focus input
      >
        {/* Card trắng */}
        <View style={styles.card}>
          {/* Header trong card */}
          <View style={styles.cardHeader}>
            <Text style={styles.h1}>Welcome back</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.link}>
                No Account? <Text style={styles.signUp}>Sign up</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.signInText}>Sign in</Text>

          {/* Social buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.googleBtn}>
              <Ionicons name="logo-google" size={18} color="#EA4335" />
              <Text style={styles.googleText}>Sign in with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="logo-facebook" size={20} color="#1877F2" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="logo-github" size={20} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={{ marginTop: 24 }}>
            <Text style={styles.label}>
              Enter your username or email address
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Username or email address"
              placeholderTextColor="#9aa0a6"
              value={emailOrId}
              onChangeText={setEmailOrId}
              autoCapitalize="none"
              returnKeyType="next"
            />

            <Text style={[styles.label, { marginTop: 16 }]}>
              Enter your Password
            </Text>
            <View style={styles.passwordWrap}>
              <TextInput
                style={styles.inputPassword}
                placeholder="Password"
                placeholderTextColor="#9aa0a6"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPwd}
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.eyeBtn}
                onPress={() => setShowPwd(!showPwd)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name={showPwd ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color="#5f6368"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot password */}
            <TouchableOpacity style={styles.forgot}>
              <Text style={styles.forgotText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          {/* Nút Sign in */}
          <TouchableOpacity
            style={[styles.btn, !canSubmit && styles.btnDisabled]}
            onPress={onLogin}
            disabled={!canSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.btnText}>Sign in</Text>
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
