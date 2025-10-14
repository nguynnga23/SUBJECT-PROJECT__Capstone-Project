// src/screens/Home/Article/ArticleDetail.js
import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Share,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Markdown from "react-native-markdown-display";
import { getArticleById } from "../../../api/home";
import { APP_ENV, DEV_DOMAIN, STAGING_DOMAIN, PROD_DOMAIN, PORT } from "@env";

import { addBookmarks } from "../../../api/bookmark";
/* ---------- Helpers ---------- */
function getHostName(url) {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch {
    const m = String(url || "").match(/https?:\/\/([^/]+)/i);
    return m ? m[1].replace(/^www\./, "") : null;
  }
}

function formatDate(input) {
  if (!input) return "";
  const d = new Date(input);
  if (isNaN(d)) return String(input);
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function estimateReadingTime(md = "") {
  // Rất đơn giản: bỏ bớt ký tự markdown, đếm từ
  const text = md
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "") // ảnh ![alt](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // link [text](url) -> text
    .replace(/[`*_>#-]/g, " ") // ký tự markdown
    .replace(/\s+/g, " ")
    .trim();
  const words = text ? text.split(" ").length : 0;
  return Math.max(1, Math.round(words / 200)); // 200 wpm
}

/* ---------- Tiny UI parts ---------- */
const MetaChip = ({ icon, text }) => (
  <View style={styles.chip}>
    <Ionicons name={icon} size={14} color="#5f6368" />
    <Text style={styles.chipText} numberOfLines={1}>
      {text}
    </Text>
  </View>
);

export default function ArticleDetailScreen({ route, navigation }) {
  const preloadedArticle = route?.params?.article;
  const articleId = route?.params?.articleId;

  const [article, setArticle] = useState(preloadedArticle || null);
  const [loading, setLoading] = useState(!preloadedArticle && !!articleId);

  // Chuẩn hoá content và meta
  const fixedContent = useMemo(() => {
    const raw = article?.content || "";
    if (!raw) return "";
    return raw.replaceAll(
      "http://localhost:1337",
      `http://192.168.110.135:1337`
    );
  }, [article]);

  const sourceSite = useMemo(
    () => article?.source || getHostName(article?.externalUrl),
    [article]
  );

  const publishedDate = useMemo(
    () =>
      formatDate(
        article?.externalPublishDate ||
          article?.external_publish_date ||
          article?.publishedAt
      ),
    [article]
  );

  const updatedDate = useMemo(
    () => (article?.updatedAt ? formatDate(article.updatedAt) : ""),
    [article]
  );

  const categoryName = useMemo(
    () => article?.category?.name || article?.categoryName || "",
    [article]
  );

  const readingMinutes = useMemo(
    () => estimateReadingTime(fixedContent),
    [fixedContent]
  );

  useEffect(() => {
    if (!preloadedArticle && articleId) {
      (async () => {
        try {
          const data = await getArticleById(articleId);
          setArticle(data);
        } catch (e) {
          console.error("Fetch article failed:", e);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [articleId, preloadedArticle]);

  const onShare = async () => {
    try {
      const url = article?.externalUrl;
      await Share.share({
        message: url ? `${article?.title}\n${url}` : `${article?.title}`,
      });
    } catch (e) {
      Alert.alert("Lỗi", "Không thể chia sẻ.");
    }
  };

  const openSource = async () => {
    const url = article?.externalUrl;
    if (!url) return;
    const ok = await Linking.canOpenURL(url);
    if (!ok) {
      Alert.alert("Lỗi", "Không thể mở liên kết nguồn.");
      return;
    }
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!article) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Không tìm thấy bài viết</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop: 12 }}
        >
          <Text style={{ color: "#1a73e8" }}>Quay lại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />

        <TouchableOpacity onPress={onShare}>
          <Ionicons name="share-outline" size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.title}>{article.title}</Text>

        {/* Summary (nếu có) */}
        {!!article.summary && !!article.summary.trim() && (
          <Text style={styles.summary}>{article.summary}</Text>
        )}

        {/* Meta chips */}
        <View style={styles.metaChips}>
          {sourceSite ? (
            <MetaChip icon="globe-outline" text={sourceSite} />
          ) : null}
          {publishedDate ? (
            <MetaChip icon="calendar-outline" text={publishedDate} />
          ) : null}
          {readingMinutes ? (
            <MetaChip
              icon="timer-outline"
              text={`${readingMinutes} min read`}
            />
          ) : null}
          {categoryName ? (
            <MetaChip icon="pricetag-outline" text={categoryName} />
          ) : null}
          {updatedDate && updatedDate !== publishedDate ? (
            <MetaChip icon="refresh-outline" text={`Cập nhật ${updatedDate}`} />
          ) : null}
        </View>

        {/* Thumbnail */}
        {article.thumbnail ? (
          <Image source={{ uri: article.thumbnail }} style={styles.thumbnail} />
        ) : null}

        {/* Content */}
        <Markdown style={markdownStyles}>{fixedContent}</Markdown>
      </ScrollView>

      {/* Bottom actions */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={onShare}>
          <Ionicons name="color-wand-outline" size={22} />
        </TouchableOpacity>
        {article?.externalUrl ? (
          <TouchableOpacity onPress={openSource}>
            <Ionicons name="globe-outline" size={22} />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity>
          <Ionicons name="bookmarks-outline" size={22} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare}>
          <Ionicons name="share-outline" size={22} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
  },
  content: { padding: 16 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 8 },
  summary: { fontSize: 16, color: "#555", marginBottom: 12 },

  metaChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: { marginLeft: 6, color: "#5f6368", fontSize: 12, maxWidth: 180 },

  authorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  sourceWrap: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    maxWidth: "100%",
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  sourceIcon: {
    marginRight: 6,
  },

  metaLabel: {
    fontSize: 16,
    paddingBottom: 8,
    fontWeight: "600",
  },

  link: {
    color: "#1a73e8",
    textDecorationLine: "underline",

    flexShrink: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ddd",
    marginRight: 8,
  },
  followBtn: {
    marginLeft: 12,
    borderWidth: 1,
    borderColor: "#1a73e8",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  followText: { fontSize: 13, fontWeight: "500", color: "#1a73e8" },

  thumbnail: { width: "100%", height: 180, borderRadius: 8, marginBottom: 20 },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
  },
  bottomText: { marginLeft: 6, fontSize: 14, color: "#444" },
});

const markdownStyles = {
  body: { fontSize: 16, lineHeight: 24, color: "#333" },
  heading1: { fontSize: 26, fontWeight: "700" },
  code_inline: { backgroundColor: "#eee", padding: 4, borderRadius: 4 },
  code_block: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 6,
    fontFamily: "monospace",
  },
  link: { color: "#1a73e8" },
};
