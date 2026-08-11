import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <Text
        style={[
          styles.title,
          isDark ? styles.darkText : styles.lightText,
        ]}
      >
        {isDark ? "🌙 Dark Mode" : "🌞 Light Mode"}
      </Text>

      <Pressable
        onPress={toggleTheme}
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {isDark
            ? "Switch to Light"
            : "Switch to Dark"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  lightContainer: {
    backgroundColor: "#fff",
  },

  darkContainer: {
    backgroundColor: "#121212",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },

  lightText: {
    color: "#000",
  },

  darkText: {
    color: "#fff",
  },

  button: {
    backgroundColor: "#3B82F6",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});