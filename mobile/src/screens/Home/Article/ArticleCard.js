// src/screens/Home/ArticleCard.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ArticleCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={onPress}>
      {/* LEFT: content */}
      <View style={{ flex: 1, paddingRight: 12 }}>
        {/* Author */}
        <View style={styles.authorRow}>
          <View style={styles.avatar} />
          <Text style={styles.authorText} numberOfLines={1}>
            {item.author}
          </Text>
        </View>

        {/* Title + Thumbnail in one row */}
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 18,
  },

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

  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    marginRight: 8,
  },
  thumb: {
    width: 60,
    height: 60,
    borderRadius: 6,
    backgroundColor: "#eee",
  },

  subtitle: { fontSize: 15, color: "#6e6e6e", marginBottom: 10 },

  metaRow: { flexDirection: "row", alignItems: "center" },
  metaIcon: { marginLeft: 12 },
  metaText: { fontSize: 13, color: "#6e6e6e", marginLeft: 6 },
});
