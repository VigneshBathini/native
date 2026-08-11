import { useState } from "react";
import {
  Pressable,
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function Stepper() {
  const [value, setValue] = useState(0);

  const increment = () => {
    setValue((prev) => Math.min(prev + 1, 10));
  };

  const decrement = () => {
    setValue((prev) => Math.max(prev - 1, 0));
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={decrement}
        disabled={value === 0}
        style={[
          styles.button,
          value === 0 && styles.disabledButton,
        ]}
      >
        <Text style={styles.text}>−</Text>
      </Pressable>

      <Text style={styles.value}>{value}</Text>

      <Pressable
        onPress={increment}
        disabled={value === 10}
        style={[
          styles.button,
          value === 10 && styles.disabledButton,
        ]}
      >
        <Text style={styles.text}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  button: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 12,
    minWidth: 50,
    alignItems: "center",
  },

  disabledButton: {
    backgroundColor: "#BDBDBD",
  },

  text: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
  },

  value: {
    fontSize: 24,
    fontWeight: "bold",
    minWidth: 40,
    textAlign: "center",
  },
});