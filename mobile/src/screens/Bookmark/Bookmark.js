// src/screens/Bookmark/Bookmark.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ArticleCard from "../Home/Article/ArticleCard";
import { mockSaved } from "./mockSaved";

export default function Bookmark({ navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // load mock trước
    setItems(mockSaved);
  }, []);

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
});
