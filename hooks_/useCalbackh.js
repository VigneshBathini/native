// ======================================================
// useCallback
// ======================================================

// useCallback memoizes (caches) a function and returns
// the same function reference until its dependencies change.
//
// Syntax:
// const memoizedFunction = useCallback(() => {
//   // function logic
// }, [dependencies]);


// IMPORTANT:
// useCallback returns a FUNCTION.
//
// Therefore, the returned function can also accept parameters.
//
// Example:
// const handlePress = useCallback((name) => {
//   console.log(name);
// }, []);
//
// handlePress("Vignesh");



import React, { useCallback, useState } from "react";
import { View, Button } from "react-native";

export default function App() {

  const [count, setCount] = useState(0);

  // Function reference is cached.
  // A new function reference is created
  // when 'count' changes.

  const handlePress = useCallback(() => {
    console.log(count);
  }, [count]);


  // Function can also accept parameters
  const handleUser = useCallback((name) => {
    console.log("Hello", name);
  }, []);


  return (
    <View style={{ marginTop: 50 }}>

      <Button
        title="Increase"
        onPress={() => setCount((prev) => prev + 1)}
      />

      <Button
        title="Print Count"
        onPress={handlePress}
      />

      <Button
        title="Print User"
        onPress={() => handleUser("Vignesh")}
      />

    </View>
  );
}