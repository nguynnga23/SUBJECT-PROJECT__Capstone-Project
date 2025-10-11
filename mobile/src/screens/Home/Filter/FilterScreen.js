// NotificationFilterScreen.js
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/** ======== API placeholders ========
 * Thay các hàm này bằng call thật tới BFF/Strapi.
 * Gợi ý REST:
 *  - GET /v1/departments  -> [{id, name, code, iconUrl?}]
 *  - GET /v1/articles?departmentIds=1,2&limit=20
 */
async function getDepartments() {
  return [
    { id: "fit", name: "CNTT (FIT)" },
    { id: "fme", name: "Cơ khí (FME)" },
    { id: "fbe", name: "Kinh tế (FBE)" },
    { id: "feee", name: "Điện - Điện tử" },
    { id: "tol", name: "Ngoại ngữ" },
  ];
}
async function getArticles({ departmentIds }) {
  // Trả về mẫu cho demo UI
  const all = [
    {
      id: "a1",
      title: "Lịch thi Giữa kỳ HK1/2025-2026",
      dept: "fit",
      date: "03/10/2025",
      source: "fit.iuh.edu.vn",
    },
    {
      id: "a2",
      title: "80 tỷ học bổng năm học 2025-2026",
      dept: "iuh",
      date: "02/10/2025",
      source: "iuh.edu.vn",
    },
    {
      id: "a3",
      title: "Ngày hội Chào Tân sinh viên",
      dept: "fit",
      date: "01/10/2025",
      source: "iuh.edu.vn",
    },
  ];
  if (!departmentIds?.length) return all;
  return all.filter((x) => departmentIds.includes(x.dept));
}

/** ========= Chip (pill) component ========= */
const Chip = ({ label, selected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.chip, selected && styles.chipSelected]}
    accessibilityRole="button"
    accessibilityState={{ selected }}
  >
    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export default function FilterScreen({ navigation, route }) {
  const preselected = route?.params?.selectedIds ?? [];
  const onApply = route?.params?.onApply;

  const [loadingFac, setLoadingFac] = useState(true);
  const [faculties, setFaculties] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set(preselected));
  const [q, setQ] = useState("");

  const [loadingFeed, setLoadingFeed] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async () => {
      setLoadingFac(true);
      const data = await getDepartments();
      setFaculties(data);
      setLoadingFac(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoadingFeed(true);
      const ids = Array.from(selectedIds);
      const res = await getArticles({ departmentIds: ids });
      setArticles(res);
      setLoadingFeed(false);
    })();
  }, [selectedIds]);

  const filteredFaculties = useMemo(() => {
    const k = q.trim().toLowerCase();
    if (!k) return faculties;
    return faculties.filter((f) => f.name.toLowerCase().includes(k));
  }, [q, faculties]);

  const toggleFaculty = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleApply = () => {
    const ids = Array.from(selectedIds);
    if (typeof onApply === "function") onApply(ids);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header giống iOS sheet */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconBtn}
        >
          <Ionicons name="chevron-back" size={20} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Topic</Text>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="share-outline" size={20} />
        </TouchableOpacity>
      </View>

      {/* Title lớn */}
      <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 4 }}>
        <Text style={styles.bigTitle}>Lọc theo Khoa</Text>
        <Text style={styles.subText}>
          Chọn khoa để xem thông báo/bài viết liên quan.
        </Text>
      </View>

      {/* Search + Chips */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 8 }}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} />
          <TextInput
            placeholder="Tìm khoa..."
            value={q}
            onChangeText={setQ}
            style={{ flex: 1, paddingHorizontal: 8, height: 36 }}
            returnKeyType="search"
          />
          {q ? (
            <TouchableOpacity onPress={() => setQ("")}>
              <Ionicons name="close-circle" size={16} />
            </TouchableOpacity>
          ) : null}
        </View>

        {loadingFac ? (
          <View style={{ paddingVertical: 12 }}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={filteredFaculties}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Chip
                label={item.name}
                selected={selectedIds.has(item.id)}
                onPress={() => toggleFaculty(item.id)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
        )}
      </View>

      {/* Recommended / Latest list */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 6 }}>
        <Text style={styles.sectionTitle}>Bài viết gợi ý</Text>
      </View>

      {loadingFeed ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={{ uri: "https://placehold.co/80x80/png" }}
                style={styles.thumb}
              />
              <View style={{ flex: 1 }}>
                <Text numberOfLines={2} style={styles.cardTitle}>
                  {item.title}
                </Text>
                <View style={styles.metaRow}>
                  <Ionicons name="globe-outline" size={14} />
                  <Text style={styles.metaText}>{item.source}</Text>
                  <Ionicons
                    name="calendar-outline"
                    size={14}
                    style={{ marginLeft: 8 }}
                  />
                  <Text style={styles.metaText}>{item.date}</Text>
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Apply bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => setSelectedIds(new Set())}
          style={[styles.bottomBtn, { backgroundColor: "#f2f2f2" }]}
        >
          <Text style={[styles.bottomBtnText, { color: "#111" }]}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleApply} style={styles.bottomBtn}>
          <Text style={styles.bottomBtnText}>Áp dụng ({selectedIds.size})</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  iconBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 16, fontWeight: "600" },
  bigTitle: { fontSize: 28, fontWeight: "700" },
  subText: { color: "#777", marginTop: 4 },
  searchBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 40,
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#fff",
  },
  chip: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    height: 34,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  chipSelected: {
    backgroundColor: "#111",
    borderColor: "#111",
  },
  chipText: { fontSize: 14, color: "#111" },
  chipTextSelected: { color: "#fff", fontWeight: "600" },
  sectionTitle: { fontSize: 16, fontWeight: "700" },
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 14,
    backgroundColor: "#fff",
  },
  thumb: { width: 64, height: 64, borderRadius: 8, backgroundColor: "#f1f1f1" },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8 },
  metaText: { fontSize: 12, color: "#666", marginLeft: 2 },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 12,
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  bottomBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBtnText: { color: "#fff", fontWeight: "700" },
});
