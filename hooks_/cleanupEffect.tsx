import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect Started",count);

    return () => {
      console.log("Cleanup Called",count);
    };
  },[count]);


//useeffect with return   
// with dependency array
// Android Bundled 50ms index.ts (1 module) 
//  LOG  Effect Started 0 --when component renders 1
//  LOG  Cleanup Called 0 -- when + clicked 1
//  LOG  Effect Started 1 -- 2
//  LOG  Cleanup Called 1 -- again clicked 1
//  LOG  Effect Started 2 -- 2
// › Reloading apps -- when navigation happens
//  LOG  Cleanup Called 2

// No Array
//  LOG  Effect Started --1st 
//  LOG  Cleanup Called -- when clicked on + 1
//  LOG  Effect Started -- 2
//  LOG  Cleanup Called -- when clicked on + 1
//  LOG  Effect Started -- 2
// › Reloading apps    -- when navigation happens cleanup will call
//  LOG  Cleanup Called
// Android Bundled 46ms index.ts (1 module)

//Empty Array
//  LOG  Effect Started  -- when component renders 1
//› Reloading apps -- when nav happens
// LOG  Cleanup Called -- clean up calls

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count}</Text>

      <Pressable
        style={styles.button}
        onPress={() => setCount((prev) => prev + 1)}
      >
        <Text style={styles.buttonText}>Increase</Text>
      </Pressable>
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

// stale closures in useffect

// Look at this code:

// useEffect(() => {
//   setInterval(() => {
//     console.log(count);
//   }, 1000);
// }, []);]

// Question:

// If you press Increase several times...

// What should it print?

// Many beginners answer:

// 0
// 1
// 2
// 3
// 4

// But that's not what happens.

// Actual Output
// 0
// 0
// 0
// 0
// 0
// 0

// 😲

// Why?

// Let's Understand

// Initial render:

// count = 0

// React creates the effect.

// Inside the effect:

// setInterval(() => {
//   console.log(count);
// }, 1000);

// The interval callback captures the current value of count.

// At that moment:

// count = 0

// The callback keeps remembering:

// 0

// Now you click:

// count = 1

// React creates a new render.

// But...

// Did the effect run again?

// No.

// Because:

// []

// means:

// Don't recreate the effect.

// So the interval is still using the callback from the first render.

// Visualization

// Initial render

// count = 0

// ↓

// Interval Created

// ↓

// 📸 Snapshot

// ↓

// count = 0

// Click button

// count = 1

// The interval doesn't know about this.

// It still has:

// 📸 count = 0

// Click again

// count = 2

// Still:

// 📸 count = 0

// That's a stale closure.

// Why is it called "Stale"?

// Think of stale food.

// Fresh Bread 🍞

// ↓

// Several Days

// ↓

// Stale Bread

// The interval is using an old snapshot of your variables.

// It's "stale."


// How to Fix It
// Option 1: Add Dependencies
// useEffect(() => {
//   const id = setInterval(() => {
//     console.log(count);
//   }, 1000);

//   return () => clearInterval(id);
// }, [count]);

// Now, every time count changes:

// Cleanup old interval

// ↓

// Create new interval

// ↓

// New snapshot

// If count becomes 5, the new interval captures:

// 📸 count = 5
// But There's a Downside

// Imagine the user presses the button every second.

// Every press causes:

// Stop Interval

// ↓

// Start Interval

// ↓

// Stop Interval

// ↓

// Start Interval

// Sometimes that's exactly what you want. Other times, recreating the interval repeatedly is unnecessary work.

// Real React Native Example

// Imagine you're tracking location.

// useEffect(() => {
//   const subscription = watchLocation((location) => {
//     console.log(location);
//   });

//   return () => subscription.remove();
// }, []);

// This is fine because you want one subscription for the lifetime of the screen.

// Now imagine the callback needs access to changing state, like a selected unit (km/miles). If you don't account for that, the callback may continue using the old value.

// So How Do Professionals Solve This?

// There are a few approaches:

// Recreate the effect by adding dependencies (when appropriate).
// Use functional state updates (for state setters).
// Use useRef to hold the latest value without recreating the effect.

// That last approach is one of the main reasons useRef exists—and we'll learn it in the next lesson.