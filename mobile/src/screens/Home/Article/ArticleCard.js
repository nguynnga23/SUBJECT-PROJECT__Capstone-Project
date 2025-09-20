import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ArticleCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      {/* Left content */}
      <View style={{ flex: 1, paddingRight: 12 }}>
        {/* Author */}
        <View style={styles.authorRow}>
          <View style={styles.avatar} />
          <Text style={styles.authorText}>{item.author}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={3}>
          {item.title}
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle} numberOfLines={2}>
          {item.subtitle}
        </Text>

        {/* Meta row */}
        <View style={styles.metaRow}>
          <Ionicons name="star-outline" size={16} />
          <Text style={styles.metaText}>{item.date}</Text>

          <MaterialCommunityIcons
            name="hand-clap"
            size={16}
            style={styles.metaIcon}
          />
          <Text style={styles.metaText}>{item.views}</Text>

          <Ionicons
            name="chatbubble-ellipses-outline"
            size={16}
            style={styles.metaIcon}
          />
          <Text style={styles.metaText}>{item.comments}</Text>

          <View style={{ flex: 1 }} />

          <Ionicons name="remove-outline" size={18} />
          <Ionicons
            name="ellipsis-horizontal"
            size={18}
            style={{ marginLeft: 8 }}
          />
        </View>
      </View>

      {/* Thumbnail */}
      {item.thumb ? (
        <Image source={{ uri: item.thumb }} style={styles.thumb} />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  authorRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  avatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ddd",
    marginRight: 8,
  },
  authorText: { fontSize: 13, color: "#666" },
  title: { fontSize: 20, fontWeight: "700", lineHeight: 26, marginBottom: 6 },
  subtitle: { fontSize: 15, color: "#6e6e6e", marginBottom: 10 },
  metaRow: { flexDirection: "row", alignItems: "center" },
  metaIcon: { marginLeft: 12 },
  metaText: { fontSize: 13, color: "#6e6e6e", marginLeft: 6 },
  thumb: { width: 86, height: 86, borderRadius: 8, backgroundColor: "#eee" },
});
