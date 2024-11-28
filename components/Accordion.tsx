import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  isExpanded,
  onToggle,
}) => {
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggle();
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity style={styles.accordionHeader} onPress={toggleExpand}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={24}
          color="#000"
        />
      </TouchableOpacity>
      {isExpanded && <View style={styles.accordionContent}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  accordionContent: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
});
