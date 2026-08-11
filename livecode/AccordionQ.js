import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";

const FAQS = [
  {
    id: "1",
    question: "What is React Native?",
    answer: "React Native is a framework for building native apps.",
  },
  {
    id: "2",
    question: "What is Expo?",
    answer: "Expo is a framework and platform for React Native.",
  },
  {
    id: "3",
    question: "What is Redux?",
    answer: "Redux is a state management library.",
  },
];

export default function Accordion() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleAccordion = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={FAQS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable onPress={() => toggleAccordion(item.id)}>
              <Text style={styles.question}>
                {expandedId === item.id ? "▼" : "▶"} {item.question}
              </Text>
            </Pressable>

            {expandedId === item.id && (
              <Text style={styles.answer}>{item.answer}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
  },
  answer: {
    marginTop: 10,
    color: "#555",
    lineHeight: 22,
  },
});