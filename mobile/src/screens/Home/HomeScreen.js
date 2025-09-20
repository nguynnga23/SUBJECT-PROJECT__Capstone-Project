import React from "react";
import { useState, useEffect } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArticleCard from "./Article/ArticleCard";
import { getArticles } from "../../api/home";
import { mockArticles } from "./mocks/mockArticles";
import { Ionicons } from "@expo/vector-icons";
export default function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles()
      .then((data) => setArticles(data))
      .catch((err) => console.error("API error:", err));
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

      {/* List */}
      <FlatList
        data={articles}
        keyExtractor={(item) => item.documentId}
        renderItem={({ item }) => (
          <ArticleCard
            item={{
              author: item.categoryName ?? "Unknown",
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
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  logo: {
    fontSize: 23,
    fontWeight: "700",
    marginRight: "auto",
    color: "#0064E0",
  },
});
