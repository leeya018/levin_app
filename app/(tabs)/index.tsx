import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";

type Item = {
  name: string;
  phone?: string;
  floor: number | string;
};

// Mock data
const mockItems: Item[] = [
  { name: "טייזו", phone: "7100275", floor: 0 },
  { name: "ניהול בניין אריאל", phone: "7100275", floor: 0 },
  { name: "בית הפועלים בע״מ", phone: "7100275", floor: 4 },
  { name: "לייטסטון נכסים בע״מ", phone: "7100200", floor: 4 },
  { name: "חברת אחזקות ישיר בע״מ", phone: "7750150", floor: 5 },
  { name: "חברת אוטומיישן בעמ", floor: 5 },
  { name: "עזרא יהודה -רוזנבלום ייעוץ", floor: 5 },
  { name: "אופיר יצחק", floor: 5 },
  { name: "דוני ניסים", floor: 5 },
  { name: "קטן שעיה", floor: 5 },
  { name: "ארגון המורים", phone: "", floor: 6 },
  { name: "סאן קליניק", phone: "180321123", floor: 11 },
  { name: "ביפ אפ בעמ", phone: "180321123", floor: 11 },
  { name: "אולטרה פיננסים בע״מ", phone: "054-5723630", floor: 12 },
  { name: "ווביה בעמ", phone: "054-5723630", floor: 12 },
  { name: "אבי מונטוקיו", phone: "054-5723630", floor: 12 },
  { name: "ברוך פרל", phone: "054-5723630", floor: 12 },
  { name: "אוסלקה", phone: "054-5723630", floor: 12 },
  { name: "גיא יקוטיאל", phone: "054-5723630", floor: 12 },
  { name: "אולטרה פיננסים", phone: "054-5723630", floor: 12 },
  { name: "שאדו עו״ד קליין", phone: "5604422", floor: 13 },
  { name: "גונן קסטנבאום", phone: "5604422", floor: 13 },
  { name: "איתן ארז ושות משרד עוד", phone: "5604422", floor: 13 },
  { name: "מרווחים", phone: "5669566", floor: 14 },
  { name: "יעקובוביץ אילן", phone: "5669566", floor: 14 },
  { name: "אליהו ובר ושות", phone: "5669566", floor: 14 },
  { name: "ס.ט. סייט אבחון בנק הפועלים", phone: "054-7408363", floor: 16 },
  { name: "קרנית", phone: "71116666", floor: "16,17" },
  { name: "ווי בוקס השקעות בעמ", phone: "71116666", floor: "16,17" },
  {
    name: "ס.ט. סייט אבטחון בע״מ לוינשטיין נכסים",
    phone: "7100200",
    floor: "18,19",
  },
  { name: "הייפרווייז ונצרס בעמ", phone: "7100200", floor: 19 },
  { name: "אילן אורלי", phone: "5663313", floor: 20 },
  { name: "ערליג ניירות ערך", phone: "5663313", floor: 20 },
  { name: "אבישר יצחק עוד", phone: "5663313", floor: 20 },
  { name: "י.ו מיסים בעם", phone: "5663313", floor: 20 },
  { name: "ויטה אלגרטי", phone: "5663313", floor: 20 },
  { name: "אילן אורלי", phone: "5663313", floor: 20 },
  { name: "באבא אינטרטיינמטס בעמ", phone: "5663313", floor: 21 },
  { name: "סופרפלאי בע״מ", phone: "7104500", floor: "22,23" },
  { name: "בנק הפועלים בע״מ", phone: "7100200", floor: "30,31,32" },
  { name: "בנק הפועלים בע״מ", phone: "", floor: "7,8,9,10" },
  { name: "בנק הפועלים בע״מ", phone: "", floor: 24 },
  { name: "ביט", phone: "", floor: 24 },
  { name: "בנק הפועלים בע״מ", phone: "", floor: 25 },
  { name: "בנק הפועלים בע״מ", phone: "", floor: 26 },
  { name: "פייאם קארד בעמ", phone: "", floor: 26 },
  { name: "פייבוקס בע״מ", phone: "", floor: 27 },
  { name: "לוינשטיין נתיב הנדסה ובניו בע״מ", phone: "", floor: 27 },
  { name: "לוינשטיין נכסים בע״מ", phone: "", floor: 28 },
  { name: "קומיוניקס בע״מ", phone: "", floor: 29 },
  { name: "משולם לוינשטיין הנדסה וקבלנות", phone: "", floor: "33,34" },
];

export default function FloorsComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(mockItems);
  const [selectedFloor, setSelectedFloor] = useState<string | number | null>(
    null
  );

  useEffect(() => {
    const results = mockItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(results);
  }, [searchTerm]);
  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.itemButton}
      onPress={() =>
        setSelectedFloor(selectedFloor === item.floor ? null : item.floor)
      }
    >
      <Text style={styles.itemText}>{item.name}</Text>
      {selectedFloor === item.floor && (
        <View style={styles.floorBadge}>
          <Text style={styles.floorBadgeText}>קומה {item.floor}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.title}>מדריך קומות</Text>
        <TextInput
          style={styles.input}
          placeholder="חפש לפי שם חברה..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          textAlign="right"
        />
      </View>
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <Text style={styles.noResults}>לא נמצאו תוצאות</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
  },
  listContent: {
    padding: 16,
  },
  itemButton: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    textAlign: "right",
  },
  floorBadge: {
    backgroundColor: "#007bff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  floorBadgeText: {
    color: "#ffffff",
    fontSize: 12,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666666",
  },
});
