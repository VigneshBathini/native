import React, { useCallback, useState } from "react";
import { View, Button } from "react-native";
import Child from "./Child";

export default function App() {
  const [count, setCount] = useState(0);

  console.log("🔵 Parent Render");

  // ❌ Without useCallback
  // Every parent render creates a NEW function.
  // const handlePress = () => {
  //   console.log("Child Button Clicked");
  // };

  // ✅ With useCallback
  // Same function reference is reused
  // until dependencies change.
  const handlePress = useCallback(() => {
    console.log("Child Button Clicked");
  }, []);

  return (
    <View style={{ marginTop: 100 }}>
      {/* React.memo compares the onPress prop */}
      <Child onPress={handlePress} />
      
{/* 
✅ Same props  -> Skip Child re-render
❌ Changed props -> Child re-renders */}

      <Button
        title={`Count : ${count}`}
        // State update re-renders only the Parent
        onPress={() => setCount((prev) => prev + 1)}
      />
    </View>
  );
}