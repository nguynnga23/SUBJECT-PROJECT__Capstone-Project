import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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
  if (isNaN(d)) return String(input); // fallback nếu server trả format lạ
  const pad = (n) => (n < 10 ? `0${n}` : `${n}`);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export default function ArticleCard({ item, onPress }) {
  const site = item?.source || getHostName(item?.externalUrl);
  const dateText = formatDate(item?.date || item?.external_publish_date);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      <View style={{ flex: 1, paddingRight: 12 }}>
        {/* Author */}
        <View style={styles.authorRow}>
          <View style={styles.avatar} />
          <Text style={styles.authorText} numberOfLines={1}>
            {item.author}
          </Text>
        </View>

        {/* Title + Thumbnail */}
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={3}>
            {item.title}
          </Text>
          {item.thumb ? (
            <Image source={{ uri: item.thumb }} style={styles.thumb} />
          ) : null}
        </View>

        {/* Subtitle */}
        {!!item.subtitle && (
          <Text style={styles.subtitle} numberOfLines={2}>
            {item.subtitle}
          </Text>
        )}

        {/* Meta */}
        <View style={styles.metaRow}>
          {site ? (
            <>
              <Ionicons name="globe-outline" size={16} />
              <Text style={styles.metaText} numberOfLines={1}>
                {site}
              </Text>
            </>
          ) : null}

          {dateText ? (
            <>
              <Ionicons
                name="calendar-outline"
                size={16}
                style={styles.metaIcon}
              />
              <Text style={styles.metaText}>{dateText}</Text>
            </>
          ) : null}

          <View style={{ flex: 1 }} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", paddingHorizontal: 16, paddingVertical: 18 },

  // author
  authorRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ddd",
    marginRight: 8,
  },
  authorText: { fontSize: 13, color: "#666", flexShrink: 1 },

  titleRow: { flexDirection: "row", alignItems: "flex-start", marginBottom: 6 },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    marginRight: 8,
  },
  thumb: { width: 60, height: 60, borderRadius: 6, backgroundColor: "#eee" },

  subtitle: { fontSize: 15, color: "#6e6e6e", marginBottom: 10 },

  metaRow: { flexDirection: "row", alignItems: "center" },
  metaIcon: { marginLeft: 12 },
  metaText: { fontSize: 13, color: "#6e6e6e", marginLeft: 6, maxWidth: 160 },
});
