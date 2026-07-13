import { Pressable, StyleSheet, Text, View ,TextInput} from "react-native";
import { useEffect, useState } from "react";


export default function App() {
  const [count, setCount] = useState(0);
const [name, setName] = useState("VIZ");

  console.log("Component Rendered");

  useEffect(() => {
    console.log("useEffect Ran");
  });

    useEffect(() => {
    console.log("useEffect empty dependency-> run only once at render");
    
  },[]);


  useEffect(() => {
  console.log("useeffect dependency array-> run at state updates",count);
}, [count]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>

      <Pressable
        style={styles.button}
        onPress={() => setCount((prev) => prev + 1)}
      >
        <Text style={styles.buttonText}>Increase</Text>
      </Pressable>

      <TextInput value={name} onChangeText={setName}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});


// Three Forms of useEffect
// 1. No Dependency Array
// useEffect(() => {
//   console.log("Runs after EVERY render");
// });

// When does it run?

// Initial Render ✅

// State Update ✅

// Another State Update ✅

// Another Render ✅
// 2. Empty Dependency Array ⭐⭐⭐⭐⭐
// useEffect(() => {
//   console.log("Runs only once");
// }, []);

// Runs only when the component mounts.

// Think:

// Component opens

// ↓

// Run once

// ↓

// Never again

// This is commonly used for:

// API calls
// Initial setup
// Loading data
// 3. Dependency Array
// const [count, setCount] = useState(0);

// useEffect(() => {
//   console.log(count);
// }, [count]);

// Runs:

// Component Mount ✅

// count changes ✅

// Other state changes ❌

// Only changes to count trigger the effect.



// useEffect(() => {
//   console.log("Effect created with count:", count);

//   const id = setInterval(() => {
//     console.log("Interval:", count);
//   }, 2000);

//   return () => clearInterval(id);
// }, []);
// App Opens

// ↓

// useEffect runs once

// ↓

// setInterval created
//           │
//           ▼
//       Every 2 seconds
//           │
//           ▼
// console.log(count)

// ↓

// Press button

// ↓

// count = 1 (UI updates)

// ↓

// Interval is still the old one

// ↓

// console.log(0)

// ↓

// console.log(0)

// ↓

// console.log(0)