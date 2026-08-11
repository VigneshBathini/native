import { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  const increment = () => {
    setProgress((prev) => Math.min(prev + 10, 100));
  };

  const decrement = () => {
    setProgress((prev) => Math.max(prev - 10, 0));
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${progress}%` },
          ]}
        />
      </View>

      <Text style={styles.progressText}>
        Progress: {progress}%
      </Text>

      <View style={styles.buttonContainer}>
        <Button title="Increase" onPress={increment} />
        <Button title="Decrease" onPress={decrement} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  progressContainer: {
    height: 30,
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },

  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },

  progressText: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});