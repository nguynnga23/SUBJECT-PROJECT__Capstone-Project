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
import { getArticlesByText } from "../../api/home";

export default function SearchScreen({ navigation }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiAnswer, setAIAnswer] = useState(null);

  const timer = useRef(null);

  const doSearch = useCallback(async (keyword) => {
    if (!keyword?.trim()) {
      setResults([]);
      setAIAnswer(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    setAIAnswer(null);

    try {
      const response = await getArticlesByText(keyword.trim());

      const sources = response?.sources;
      const answer = response?.aiAnswer;

      setResults(Array.isArray(sources) ? sources : []);
      setAIAnswer(answer || null);
    } catch (e) {
      console.error("search error:", e);
      setResults([]);
      setAIAnswer("Đã xảy ra lỗi khi tìm kiếm hoặc kết nối dịch vụ RAG.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    doSearch(q);
  }, [q, doSearch]);

  const keyExtractor = useCallback(
    (item, idx) => item?.documentId?.toString?.() ?? `s-${idx}`,
    []
  );

  const renderItem = useCallback(
    ({ item }) => (
      <ArticleCard
        item={{
          author:
            item.category?.departmentSource?.label ||
            item.category?.categoryName,
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
            {aiAnswer && results.length === 0 ? (
              <Text style={[styles.emptyText, { color: "#B71C1C" }]}>
                {aiAnswer}
              </Text>
            ) : (
              <Text style={styles.emptyText}>
                Không tìm thấy kết quả phù hợp
              </Text>
            )}
          </>
        ) : (
          <>
            <Ionicons name="search-outline" size={26} color="#9AA0A6" />
            <Text style={styles.emptyText}>Nhập từ khoá để bắt đầu tìm</Text>
          </>
        )}
      </View>
    ),
    [loading, q, aiAnswer, results.length]
  );

  const AIAnswerHeader = useMemo(() => {
    if (aiAnswer && aiAnswer.trim() && results.length > 0) {
      return (
        <View style={styles.aiAnswerWrap}>
          <Text style={styles.aiTitle}>🤖 Trả lời từ AI:</Text>

          <Text style={styles.aiText}>{aiAnswer}</Text>

          <View style={styles.separator} />
          <Text style={styles.aiTitleSmall}>Nguồn tham khảo:</Text>
        </View>
      );
    }
    return null;
  }, [aiAnswer, results.length]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.logo}>Unifeed.news</Text>
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
          onSubmitEditing={handleSubmit}
        />
      </View>

      <FlatList
        data={results}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={Empty}
        ListHeaderComponent={AIAnswerHeader}
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

  // STYLE CHO RAG
  aiAnswerWrap: {
    backgroundColor: "#e3f2fd",
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#1976FF",
  },
  aiTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#1976FF",
    marginBottom: 4,
  },
  aiTitleSmall: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 8,
    color: "#374151",
  },
  aiText: {
    fontSize: 15,
    color: "#111827",
  },
  // ----------------------

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
