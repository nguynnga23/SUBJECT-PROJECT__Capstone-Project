import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import { getMyBookmarks } from "../../api/bookmark";
import ArticleCard from "../Home/Article/ArticleCard";

export default function Bookmark({ navigation }) {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const isLoggedIn = Boolean(user && token);

  const loadAuthAndFetch = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const [rawUser, rawToken] = await Promise.all([
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("token"),
      ]);
      const u = rawUser ? JSON.parse(rawUser) : null;
      const t = rawToken || null;
      setUser(u);
      setToken(t);
      setAuthReady(true);

      if (u && t) {
        const res = await getMyBookmarks();
        const list = Array.isArray(res) ? res : res?.data ?? [];
        setItems(list);
      } else {
        setItems([]);
      }
    } catch (e) {
      setItems([]);
      setError(e?.message || "Không lấy được dữ liệu");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Chạy khi màn hình focus (kể cả lần đầu)
  useFocusEffect(
    useCallback(() => {
      setRefreshing(true);
      loadAuthAndFetch();
    }, [loadAuthAndFetch])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadAuthAndFetch();
  }, [loadAuthAndFetch]);

  // Khi auth chưa sẵn sàng hoặc đang tải → chỉ hiện loading, tránh nháy empty
  if (!authReady || loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.header}>
          <Text style={styles.logo}>Unifeed.news</Text>
        </View>
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text style={[styles.msg, { marginTop: 8 }]}>
            Đang tải bookmarks…
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
      <View style={styles.header}>
        <Text style={styles.logo}>Unifeed.news</Text>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#000"
          onPress={() => navigation.navigate("Notifications")}
        />
      </View>

      {error ? (
        <View style={[styles.center, { paddingHorizontal: 24 }]}>
          <Ionicons name="alert-circle-outline" size={40} color="#ff4d4f" />
          <Text style={[styles.msg, { marginTop: 6 }]}>{error}</Text>
          <TouchableOpacity
            style={[styles.btn, { marginTop: 14 }]}
            onPress={onRefresh}
          >
            <Text style={styles.btnText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : items.length === 0 ? (
        <View style={styles.center}>
          <Ionicons name="bookmarks-outline" size={48} color="#999" />
          <Text style={[styles.msg, { color: "#666" }]}>
            Chưa có bài viết nào được lưu
          </Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(it) =>
            String(it?.documentId ?? it?.article?.documentId ?? Math.random())
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingBottom: 12 }}
          renderItem={({ item }) => {
            const a = item?.article || {};
            const articleDocId =
              a?.documentId ?? item?.articleId ?? item?.articleDocumentId;
            return (
              <ArticleCard
                item={{
                  author: a?.categoryName ?? a?.category?.name ?? "Đã lưu",
                  title: a?.title ?? "(No title)",
                  subtitle: a?.summary ?? "",
                  date:
                    a?.external_publish_date ?? a?.externalPublishDate ?? "",
                  views: "0",
                  comments: "0",
                  thumb: a?.thumbnail,
                  externalUrl: a.externalUrl,
                }}
                onPress={() =>
                  navigation.navigate("ArticleDetail", {
                    articleId: articleDocId,
                    article: a,
                  })
                }
              />
            );
          }}
        />
      )}
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
  msg: { marginTop: 12, fontSize: 16, color: "#333", textAlign: "center" },
  btn: {
    marginTop: 20,
    backgroundColor: "#1976FF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: { color: "#fff", fontWeight: "600", fontSize: 15 },
});
