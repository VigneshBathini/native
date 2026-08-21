import { memo, useMemo, useState } from "react";
import { View, Button, Text } from "react-native";

const Child = memo(({ user }) => {
  console.log("Child Rendered");
  return <Text>{user.name}</Text>;
});

export default function App() {
  const [count, setCount] = useState(0);

  const user = useMemo(() => {
    return {
      name: "Vignesh",
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Child user={user} />

      {/* 
      Passing the object directly creates a NEW object on every render.

      <Child user={{ name: "Vignesh" }} />

      React.memo compares object references using ===.

      Since a new object is created every render, the comparison fails,
      so Child re-renders.

      useMemo keeps the same object reference until its dependencies change,
      allowing React.memo to skip the Child re-render.
      */}

      <Text>{count}</Text>

      <Button
        title="Increase"
        onPress={() => setCount(count + 1)}
      />
    </View>
  );
}


//------------------

// Primitive Values (number, string, boolean)
//             │
//             ▼
// Compared by Value (===)

// 25 === 25 ✅
// "John" === "John" ✅

// --------------------------------

// Objects / Arrays / Functions
//             │
//             ▼
// Compared by Reference (===)

// {} === {} ❌
// [] === [] ❌
// () => {} === () => {} ❌

// --------------------------------

// useMemo
//             │
//             ▼
// Keeps Object/Array Reference Stable

// useCallback
//             │
//             ▼
// Keeps Function Reference Stable

// React.memo
//             │
//             ▼
// Uses those stable references to skip unnecessary re-renders.