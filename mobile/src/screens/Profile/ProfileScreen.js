// src/screens/Profile/ProfileScreen.js
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileScreen({
  navigation,
  onLogout, // <- nhận từ AppNavigator/MainTabs
  user = {
    name: "Nguyễn Thị Nga",
    studentId: "21130791",
  },
}) {
  const [notiEnabled, setNotiEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header giống Home */}
      <View style={styles.header}>
        <Text style={styles.logo}>Unifeed.news</Text>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#000"
          onPress={() => navigation?.navigate?.("Notifications")}
        />
      </View>

      {/* Phần info + danh sách setting trong card */}
      <View style={styles.card}>
        {/* User info */}
        <View style={styles.userRow}>
          <View style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.sub}>MSSV: {user.studentId}</Text>
          </View>
        </View>

        {/* Items */}
        <Item
          icon={<Ionicons name="id-card-outline" size={20} color="#3B82F6" />}
          label="Thông tin sinh viên"
          onPress={() => {}}
        />
        <Separator />

        <Item
          icon={<Ionicons name="time-outline" size={20} color="#3B82F6" />}
          label="Đổi mật khẩu"
          onPress={() => {}}
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
          onPress={() => {}}
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
          onPress={() => {}}
        />
        <Separator />

        {/* Notifications toggle */}
        <View style={styles.row}>
          <View style={styles.left}>
            <Ionicons name="notifications-outline" size={20} color="#3B82F6" />
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

        {/* Logout */}
        <Item
          icon={<Ionicons name="log-out-outline" size={20} color="#EF4444" />}
          label="Đăng xuất"
          danger
          onPress={onLogout}
        />
      </View>

      {/* Version */}
      <Text style={styles.version}>Phiên bản 1.4.8</Text>
    </SafeAreaView>
  );
}

/* ---------- Sub components ---------- */

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
  safe: { flex: 1, backgroundColor: "#F8FAFF" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logo: {
    fontSize: 23,
    fontWeight: "700",
    marginRight: "auto",
    color: "#0064E0", // giống Home
  },

  card: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 2,
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    paddingVertical: 8,
  },
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

  separator: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginLeft: 32, // thụt vào để line không chạm icon
  },

  version: {
    textAlign: "center",
    color: "#9AA0A6",
    marginTop: 14,
  },
});
