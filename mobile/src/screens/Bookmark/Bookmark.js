// src/screens/Bookmark/Bookmark.js
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import ArticleCard from "../Home/Article/ArticleCard";
import { mockSaved } from "./mockSaved";

export default function Bookmark({ navigation }) {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // kiểm tra cả token cho chắc

  async function loadAuth() {
    try {
      const [rawUser, rawToken] = await Promise.all([
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("token"),
      ]);
      setUser(rawUser ? JSON.parse(rawUser) : null);
      setToken(rawToken || null);
    } catch (e) {
      setUser(null);
      setToken(null);
      console.log("Không đọc được auth từ AsyncStorage", e);
    }
  }

  // Lần đầu
  useEffect(() => {
    loadAuth();
    setItems(mockSaved); // mock data
  }, []);

  // Mỗi lần màn hình focus -> reload auth (bắt được thay đổi sau logout/login)
  useFocusEffect(
    useCallback(() => {
      loadAuth();
    }, [])
  );

  const isLoggedIn = Boolean(user && token);

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.logo}>Unifeed.news</Text>
        </View>
        <View style={styles.center}>
          <Ionicons name="bookmark-outline" size={48} color="#1976FF" />
          <Text style={styles.msg}>
            Bạn cần đăng nhập để xem bài viết đã lưu
          </Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.btnText}>Đi tới đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>Unifeed.news</Text>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#000"
          onPress={() => navigation.navigate("Notifications")}
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(it) => it.documentId}
        renderItem={({ item }) => (
          <ArticleCard
            item={{
              author: item.categoryName,
              title: item.title,
              subtitle: item.summary,
              date: item.external_publish_date,
              views: "0",
              comments: "0",
              thumb: item.thumbnail,
            }}
            onPress={() =>
              navigation.navigate("ArticleDetail", {
                articleId: item.documentId,
                article: item,
              })
            }
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
}

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
  separator: {
    height: 1.2,
    backgroundColor: "#ddd",
    marginHorizontal: 16,
    marginVertical: 6,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  msg: {
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
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
