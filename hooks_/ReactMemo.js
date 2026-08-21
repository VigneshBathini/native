import { memo, useState } from "react";
import { View, Text, Button } from "react-native";

const Child = memo(({ name }) => {
  console.log("Child Rendered");

  return (
    <Text
      style={{
        fontSize: 20,
      }}
    >
      {name}
    </Text>
  );
});

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Child name="Vignesh" />

      <Text>{count}</Text>

      <Button
        title="Increase"
        onPress={() => setCount(count + 1)} 
      />
    </View>
  );
}