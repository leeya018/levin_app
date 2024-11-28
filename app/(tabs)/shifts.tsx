import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

export default function ShiftsComponent() {
  const [shiftImage, setShiftImage] = useState<string | null>(null);

  useEffect(() => {
    const loadSavedImage = async () => {
      try {
        const savedImage = await AsyncStorage.getItem("shiftImage");
        if (savedImage) {
          setShiftImage(savedImage);
        }
      } catch (error) {
        console.error("Error loading saved image:", error);
      }
    };

    loadSavedImage();
  }, []);

  const handleImageUpload = async () => {
    // Request permission first
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setShiftImage(selectedAsset.uri);
      try {
        await AsyncStorage.setItem("shiftImage", selectedAsset.uri);
      } catch (error) {
        console.error("Error saving image:", error);
      }
    }
  };

  const handleRemoveImage = async () => {
    setShiftImage(null);
    try {
      await AsyncStorage.removeItem("shiftImage");
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.card}>
        <Text style={styles.title}>לוח משמרות שבועי</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={handleImageUpload}
        >
          <Ionicons
            name="cloud-upload-outline"
            size={24}
            color="#000"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>העלה תמונה חדשה</Text>
        </TouchableOpacity>
        {shiftImage ? (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: shiftImage }}
              style={styles.image}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={handleRemoveImage}
            >
              <Ionicons
                name="close-outline"
                size={24}
                color="#fff"
                style={styles.buttonIcon}
              />
              <Text style={styles.removeButtonText}>הסר תמונה</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noImageText}>
            אין תמונת לוח משמרות. אנא העלה תמונה.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 16,
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 4,
  },
  removeButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  noImageText: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 16,
  },
});
