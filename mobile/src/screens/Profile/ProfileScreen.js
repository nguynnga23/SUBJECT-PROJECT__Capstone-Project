// src/screens/Profile/ProfileScreen.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { logout } from "../../api/auth";

export default function ProfileScreen({ navigation, onLogout }) {
  const [notiEnabled, setNotiEnabled] = useState(true);
  const [user, setUser] = useState(null);

  async function loadUser() {
    try {
      const raw = await AsyncStorage.getItem("user");
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUser();
    }, [])
  );

  const confirmLogout = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Đăng xuất",
        style: "destructive",
        onPress: async () => {
          await logout();
          setUser(null);
          onLogout?.();
          navigation.navigate("Home");
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.logo}>Unifeed.news</Text>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#000"
          onPress={() => navigation?.navigate?.("Notifications")}
        />
      </View>

      {!user ? (
        <View style={styles.center}>
          <Ionicons name="person-circle-outline" size={64} color="#1976FF" />
          <Text style={styles.centerMsg}>Bạn cần đăng nhập để xem hồ sơ</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.btnText}>Đi tới đăng nhập</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.section}>
          <View style={styles.userRow}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{user?.fullName || "Chưa có tên"}</Text>
              <Text style={styles.sub}>{user?.email || "-"}</Text>
            </View>
          </View>

          <Item
            icon={<Ionicons name="id-card-outline" size={20} color="#3B82F6" />}
            label="Thông tin sinh viên"
          />
          <Separator />

          <Item
            icon={<Ionicons name="time-outline" size={20} color="#3B82F6" />}
            label="Đổi mật khẩu"
          />
          <Separator />

          <Item
            icon={
              <MaterialCommunityIcons
                name="file-document-outline"
                size={20}
                color="#3B82F6"
              />
            }
            label="Điều khoản và chính sách sử dụng"
          />
          <Separator />

          <Item
            icon={
              <Ionicons
                name="chatbox-ellipses-outline"
                size={20}
                color="#3B82F6"
              />
            }
            label="Góp ý ứng dụng"
          />
          <Separator />

          <View style={styles.row}>
            <View style={styles.left}>
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#3B82F6"
              />
              <Text style={styles.itemText}>Thông báo</Text>
            </View>
            <Switch
              value={notiEnabled}
              onValueChange={setNotiEnabled}
              trackColor={{ false: "#d1d5db", true: "#86efac" }}
              thumbColor={notiEnabled ? "#16a34a" : "#f4f4f5"}
            />
          </View>
          <Separator />

          <Item
            icon={<Ionicons name="log-out-outline" size={20} color="#EF4444" />}
            label="Đăng xuất"
            danger
            onPress={confirmLogout}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

function Item({ icon, label, onPress, danger }) {
  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.left}>
        {icon}
        <Text style={[styles.itemText, danger && { color: "#EF4444" }]}>
          {label}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#9AA0A6" />
    </TouchableOpacity>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    marginRight: "auto",
    color: "#1976FF",
    fontSize: 16,
    fontWeight: "800",
  },

  // Chưa login
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  centerMsg: {
    marginTop: 12,
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  btn: {
    marginTop: 20,
    backgroundColor: "#1976FF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 15 },

  // Đã login
  section: { marginHorizontal: 16, marginTop: 12 },
  userRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E5E7EB",
    marginRight: 12,
  },
  name: { fontSize: 18, fontWeight: "700", color: "#111827" },
  sub: { color: "#6B7280", marginTop: 2 },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    justifyContent: "space-between",
  },
  left: { flexDirection: "row", alignItems: "center" },
  itemText: { marginLeft: 12, fontSize: 16, color: "#111827" },

  separator: { height: 1, backgroundColor: "#E5E7EB" },

  version: { textAlign: "center", color: "#9AA0A6", marginTop: 14 },
});
