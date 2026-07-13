//useRef: A hook that returns a mutable object with a .current property whose value persists across renders.

import { Button, View, Text } from "react-native"
import { useRef, useState } from "react"

export default function App() {

  const ref = useRef(0);
  const [count, setCount] = useState(0);

  console.log("Render");

  return (
    <View style={{ marginTop: 130 }} >
      <Button
        title="Increase"
        onPress={() => {
          ref.current++;
          console.log(ref.current);
        }}
      />

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{ref.current}</Text>

      {/* The number on the screen won't change.

      Because:

      No re-render. */}

      <Button
        title="Increase Usestate"
        onPress={() => setCount(count + 1)}
      />

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{count}</Text>
    </View>
  )

}


// When Should I Use Which?
// useState

// Use when the UI should update.

// Examples:

// Counter
// Login status
// User name
// Theme
// Products
// useRef

// Use when React doesn't need to update the UI.

// Examples:

// Timer ID
// Previous value
// DOM/TextInput reference
// ScrollView reference
// Latest value for intervals
// Mutable values



// Does changing ref.current cause a re-render?

// No.

// Difference between useState and useRef?
// useState	useRef
// Triggers re-render	No re-render
// Used for UI state	Used for mutable values
// React tracks changes	React does not track .current
// 📝 Revision Notes
// useRef returns { current: value }.
// The ref object persists for the lifetime of the component.
// Updating .current does not trigger a re-render.
// Great for timers, DOM/TextInput references, previous values, and solving stale closures.

// Why doesn't useRef trigger a re-render?

// A strong answer is:

// "useRef returns a mutable object. Updating its .current property does not notify React because React only schedules re-renders when state or props change. The ref object itself keeps the same identity; only one of its properties is mutated."


// const ref = useRef(0);

// ref.current = 10;

// Question:

// Does ref.current persist after a re-render?

// What do you think?

// A. No, it resets to 0.

// B. Yes, it remains 10.

// (Think carefully about how useRef differs from a normal local variable.)

// B