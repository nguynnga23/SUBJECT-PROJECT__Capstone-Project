import React from "react";
import { FlatList, View, Text, SafeAreaView, StyleSheet } from "react-native";
import ArticleCard from "./Article/ArticleCard";
import { mockArticles } from "./mocks/mockArticles";
import { Ionicons } from "@expo/vector-icons";
export default function HomeScreen({ navigation }) {
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
        data={mockArticles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ArticleCard
            item={{
              author: item.category.name,
              title: item.title,
              subtitle: item.summary,
              date: item.external_publish_date,
              views: "213",
              comments: "3",
              thumb: item.thumbnail,
            }}
            onPress={() =>
              navigation.navigate("ArticleDetail", { article: item })
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
