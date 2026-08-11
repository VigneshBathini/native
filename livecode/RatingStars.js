import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

const STARS = [1, 2, 3, 4, 5];

export default function RatingStars() {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating((prev) => (prev === value ? value - 1 : value));
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={STARS}
        keyExtractor={(item) => item.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable onPress={() => handleRating(item)}>
            <Text style={styles.star}>
              {item <= rating ? "★" : "☆"}
            </Text>
          </Pressable>
        )}
      />

      <Text style={styles.rating}>
        Rating: {rating}/5
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    fontSize: 40,
    marginHorizontal: 5,
    color: "#FFD700",
  },
  rating: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "600",
  },
});