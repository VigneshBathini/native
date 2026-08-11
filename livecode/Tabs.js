import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";

const TABS = [
  {
    id: "1",
    title: "Home",
    content: "Welcome to Home Screen",
  },
  {
    id: "2",
    title: "Profile",
    content: "This is your Profile",
  },
  {
    id: "3",
    title: "Settings",
    content: "Manage your Settings",
  },
];

export default function Tabs() {
  // Home selected by default
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={TABS}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => setActiveIndex(index)}
            style={[
              styles.tab,
              activeIndex === index && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeIndex === index && styles.activeTabText,
              ]}
            >
              {item.title}
            </Text>
          </Pressable>
        )}
      />

      <View style={styles.content}>
        <Text style={styles.contentText}>
          {TABS[activeIndex].content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
  },

  tabsContainer: {
    gap: 10,
    marginBottom: 20,
  },

  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
  },

  activeTab: {
    backgroundColor: "#007AFF",
  },

  tabText: {
    color: "#000",
    fontWeight: "600",
  },

  activeTabText: {
    color: "#FFF",
  },

  content: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
  },

  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
});