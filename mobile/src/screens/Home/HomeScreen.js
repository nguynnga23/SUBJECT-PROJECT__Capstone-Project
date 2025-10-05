import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ArticleCard from "./Article/ArticleCard";
import { getArticles } from "../../api/home";

export default function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setError("");
      const data = await getArticles();
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("API error:", err);
      setError("Không tải được dữ liệu. Kéo xuống để thử lại.");
      setArticles([]); // hoặc: setArticles(mockArticles)
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  const keyExtractor = useCallback(
    (item, index) => item?.documentId?.toString?.() ?? `article-${index}`,
    []
  );

  const renderItem = useCallback(
    ({ item }) => (
      <ArticleCard
        item={{
          author: item.category.categoryName,
          title: item.title,
          subtitle: item.summary,
          date: item?.external_publish_date ?? item?.externalPublishDate ?? "",
          views: "0",
          comments: "0",
          thumb: item.thumbnail,
          externalUrl: item.externalUrl,
        }}
        onPress={() =>
          navigation.navigate("ArticleDetail", {
            articleId: item.documentId,
            article: item,
          })
        }
      />
    ),
    [navigation]
  );

  const listEmpty = useMemo(
    () => (
      <View style={styles.emptyWrap}>
        {loading ? (
          <>
            <ActivityIndicator size="large" />
            <Text style={styles.emptyText}>Đang tải bài viết...</Text>
          </>
        ) : (
          <>
            <Text style={styles.emptyTitle}>Chưa có bài viết</Text>
            <Text style={styles.emptyText}>
              {error || "Hãy thử kéo xuống để tải lại."}
            </Text>
          </>
        )}
      </View>
    ),
    [loading, error]
  );

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

      {/* List */}
      <FlatList
        data={articles}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={listEmpty}
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

  listContainer: {},
  sep: {
    height: 2, // độ dày line
    backgroundColor: "#F0F0F0", // màu line
    marginHorizontal: 10, // chừa khoảng cách 2 bên cho đẹp
    marginVertical: 4, // tạo khoảng trống nhẹ giữa line và nội dung
  },

  emptyWrap: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  emptyText: { color: "#666", textAlign: "center" },
});
