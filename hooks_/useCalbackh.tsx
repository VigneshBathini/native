// useCallback memoizes (caches) a function and returns 
// the same function reference until one of its dependencies changes.

// Syntax: const memoizedFunction = useCallback(() => {
// function logic
// }, [dependencies]);


// Simulates an expensive calculation
import React, { useCallback, useState } from "react";
import { View, Button } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  // Function reference is cached.
  // A new function is created only when 'count' changes.
  const handlePress = useCallback(() => {
    console.log(count);
  }, [count]);

  // console.log(handlePress)
  //     console.log(count);

  return (
    <View style={{marginTop:50}}>
      <Button
        title="Increase"
        onPress={() => setCount((prev) => prev + 1)}
      />

      <Button
        title="Print Count"
        onPress={handlePress}
      />
    </View>
  );
}