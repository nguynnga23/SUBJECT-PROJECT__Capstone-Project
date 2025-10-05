import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ArticleCard from "../Home/Article/ArticleCard";
import { searchArticles } from "../../api/home"; // <-- nếu chưa có, xem mục (2)

export default function SearchScreen({ navigation }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // debounce 400ms
  const timer = useRef(null);
  const doSearch = useCallback(async (keyword) => {
    if (!keyword?.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await searchArticles(keyword.trim());
      setResults(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("search error:", e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => doSearch(q), 400);
    return () => clearTimeout(timer.current);
  }, [q, doSearch]);

  const keyExtractor = useCallback(
    (item, idx) => item?.documentId?.toString?.() ?? `s-${idx}`,
    []
  );

  const renderItem = useCallback(
    ({ item }) => (
      <ArticleCard
        item={{
          author: item?.categoryName ?? "Unknown",
          title: item?.title ?? "",
          subtitle: item?.summary ?? "",
          date: item?.external_publish_date ?? "",
          views: item?.views?.toString?.() ?? "0",
          comments: item?.comments?.toString?.() ?? "0",
          thumb: item?.thumbnail ?? "",
        }}
        onPress={() =>
          navigation.navigate("ArticleDetail", {
            articleId: item?.documentId,
            article: item,
          })
        }
      />
    ),
    [navigation]
  );

  const Empty = useMemo(
    () => (
      <View style={styles.emptyWrap}>
        {loading ? (
          <>
            <ActivityIndicator size="large" />
            <Text style={styles.emptyText}>Đang tìm kiếm…</Text>
          </>
        ) : q.trim() ? (
          <>
            <Ionicons name="search-outline" size={26} color="#9AA0A6" />
            <Text style={styles.emptyText}>Không tìm thấy kết quả phù hợp</Text>
          </>
        ) : (
          <>
            <Ionicons name="search-outline" size={26} color="#9AA0A6" />
            <Text style={styles.emptyText}>Nhập từ khoá để bắt đầu tìm</Text>
          </>
        )}
      </View>
    ),
    [loading, q]
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header giống Home */}
      <View style={styles.header}>
        <Text style={styles.logo}>Unifeed.news</Text>
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#000"
          onPress={() => navigation.navigate("Notifications")}
        />
      </View>

      {/* Search bar */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={18} color="#6b7280" />
        <TextInput
          style={styles.input}
          value={q}
          onChangeText={setQ}
          placeholder="Tìm bài viết, chủ đề, tác giả…"
          placeholderTextColor="#9AA0A6"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
        {!!q && (
          <TouchableOpacity onPress={() => setQ("")}>
            <Ionicons name="close-circle" size={18} color="#9AA0A6" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={Empty}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={results.length === 0 && { flex: 1 }}
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

  searchWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  input: { flex: 1, marginLeft: 8, color: "#111827", fontSize: 15 },

  separator: {
    height: 1.2,
    backgroundColor: "#ddd",
    marginHorizontal: 16,
    marginVertical: 6,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyText: { color: "#6b7280", marginTop: 6, textAlign: "center" },
});
