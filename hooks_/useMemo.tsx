// What is useMemo?

// A React Hook that memoizes (caches) the result of 
// an expensive computation and recomputes it only when its dependencies change.

import React, { useMemo, useState } from "react";
import { Button, Text, View } from "react-native";

// Simulates an expensive calculation
function slowFunction() {
  console.log("Calculating...");

  let total = 0;
  for (let i = 0; i < 100000000; i++) {
    total += i;
  }

  return total;
}

export default function App() {
  const [count, setCount] = useState(0);

  // Cached value.
  // Recalculates only when dependencies change.
  const result = useMemo(() => slowFunction(), []);

  console.log("Render");

  return (
    <View>
      <Text>{count}</Text>
      <Text>{result}</Text>

      <Button
        title="Increase"
        // State update → Component re-renders
        onPress={() => setCount((prev) => prev + 1)}
      />
    </View>
  );
}