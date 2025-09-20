import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ArticleDetail({ route, navigation }) {
  const { article } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1 }} />
        <Ionicons name="ellipsis-horizontal" size={22} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.summary}>{article.summary}</Text>

        {/* Meta */}
        <Text style={styles.meta}>
          3 min read · {article.external_publish_date}
        </Text>

        {/* Author */}
        <View style={styles.authorRow}>
          <View style={styles.avatar} />
          <Text style={styles.author}>{article.category.name}</Text>
          <TouchableOpacity style={styles.followBtn}>
            <Text style={styles.followText}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Thumbnail */}
        {article.thumbnail ? (
          <Image source={{ uri: article.thumbnail }} style={styles.thumbnail} />
        ) : null}

        {/* Content */}
        <Text style={styles.contentText}>{article.content}</Text>
      </ScrollView>

      {/* Bottom actions */}
      <View style={styles.bottomBar}>
        <Ionicons name="hand-left-outline" size={20} />
        <Text style={styles.bottomText}>213</Text>
        <Ionicons
          name="chatbubble-outline"
          size={20}
          style={{ marginLeft: 20 }}
        />
        <Text style={styles.bottomText}>3</Text>
        <View style={{ flex: 1 }} />
        <Ionicons name="share-outline" size={22} />
      </View>
    </SafeAreaView>
  );
}

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
  meta: { fontSize: 13, color: "#888", marginBottom: 20 },
  authorRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ddd",
    marginRight: 8,
  },
  author: { fontSize: 15, fontWeight: "600" },
  followBtn: {
    marginLeft: 12,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  followText: { fontSize: 13, fontWeight: "500" },
  thumbnail: { width: "100%", height: 180, borderRadius: 8, marginBottom: 20 },
  contentText: { fontSize: 16, lineHeight: 24, color: "#333" },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
  },
  bottomText: { marginLeft: 6, fontSize: 14, color: "#444" },
});
