
#setTodos((prev) => prev.filter((_, i) => i !== index));

means:

"Take the current list of todos, remove the todo whose index matches the given index, and update the state with the remaining todos."

#const [todos, setTodos] = useState<string[]>([]);

means:

todos → stores a list of todo items.
setTodos → updates that list.
string[] → the list can contain only strings.
[] → the list starts empty.

| ScrollView                           | FlatList                               |
| ------------------------------------ | -------------------------------------- |
| Renders **all** children immediately | Renders only visible items             |
| Good for small, static content       | Best for long or dynamic lists         |
| Simple to use                        | Optimized for performance              |
| Not ideal for hundreds of items      | Handles thousands of items efficiently |


Rule of thumb

Use ScrollView for:

Profile screen
Settings screen
About page
Registration form
Small dashboards

Use FlatList for:

Chat messages
Todo lists
Product lists
Contacts
Social media feeds

style: makes the list fill the available space.
contentContainerStyle: adds spacing around the items inside the list.


1. View
Purpose

Container component (like <div> in HTML).

Revise
flex
justifyContent
alignItems
Nested Views
Background color
Padding & Margin
Practice
Center a box
Create a card
Two-column layout
2. Text
Purpose

Display text.

Revise
fontSize
fontWeight
color
textAlign
numberOfLines
Nested Text

Example

<Text>
  Hello <Text style={{ fontWeight: "bold" }}>World</Text>
</Text>
3. StyleSheet
Purpose

Organize styles.

Revise
StyleSheet.create()
Avoid inline styles
Reuse styles
Naming conventions

Good

const styles = StyleSheet.create({
  title: {},
  button: {},
});
4. Flexbox ⭐⭐⭐⭐⭐

Most important topic.

Revise
flex
flexDirection
justifyContent
alignItems
alignSelf
gap
flexWrap

Practice

Login Screen
Profile Card
Dashboard
Product Card
5. Pressable
Purpose

User interaction.

Revise
onPress
disabled
style
android_ripple (Android)

Example

<Pressable
  disabled={loading}
  onPress={save}
/>
6. useState ⭐⭐⭐⭐⭐

Very important.

Revise
const [count, setCount] = useState(0);

Know

Primitive state
Object state
Array state
Functional update
setCount(prev => prev + 1);

Remember

State updates are scheduled by React.
React batches multiple state updates for better performance.
Do not expect the updated state immediately after calling setState.

7. TextInput
Revise
value
onChangeText
placeholder
keyboardType
secureTextEntry
multiline

Practice

Login Form
Search Bar
8. FlatList ⭐⭐⭐⭐⭐

One of the most important components.

Know

data
renderItem
keyExtractor
ListEmptyComponent
ItemSeparatorComponent
contentContainerStyle

ExtraData

Used when FlatList needs to re-render based on data
outside the data prop.

Difference

ScrollView
↓

All items rendered

FlatList
↓

Only visible items rendered

Production

Never use index as key.

9. Image

Know

Local

require("./assets/avatar.png")

Remote

uri:"https://..."

Revise

resizeMode ->  cover,contain,stretch,center,repeat
borderRadius
Width & Height required

10. ScrollView

Know

Vertical
Horizontal
showsVerticalScrollIndicator
contentContainerStyle

Remember

Small data

↓

ScrollView

Large data

↓

FlatList

ItemSeparatorComponent= This adds a separator between each item in the list.
style = styles the list itself (the outer box).
contentContainerStyle = styles what is inside the list (the scrollable content containing the items).
---------------------------

Q: What is ActivityIndicator?

A built-in React Native component used to display a loading spinner while an operation is in progress.

Q: When do you use it?

During API calls, authentication, file uploads/downloads, and other asynchronous operations.
----------------------------

A Modal is a component that displays content on top of the current screen, blocking interaction with the background until it is closed.



<Modal
  visible={visible}          // Show / Hide Modal
  animationType="slide"      // none | slide | fade
  transparent={true}         // Transparent background
  onRequestClose={() => {}}  // Android back button
/>

How do you open or close a Modal?

By changing the visible prop (usually using state).

Q: Why is onRequestClose important?

On Android, it handles the Back button press and lets you close the modal gracefully.

----------------------------
A Switch is a toggle component that lets users turn a setting ON or OFF.

value → Controls whether the switch is ON or OFF.
onValueChange → Called when the user toggles the switch.  

<Switch
  value={enabled}               // Current state
  onValueChange={setEnabled}    // Toggle state
  disabled={false}              // Enable/Disable switch
  trackColor={{ false: "#767577", true: "#81b0ff" }}
  thumbColor="#f4f3f4"
/>

--------------------------------
KeyboardAvoidingView automatically adjusts the layout when the keyboard appears so that input fields are not hidden.
<KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={{ flex: 1 }}
>
  <TextInput placeholder="Enter Name" />
</KeyboardAvoidingView>

StatusBar controls the appearance of the device's status bar (time, battery, network, etc.).
import { StatusBar } from "react-native";

<StatusBar
  barStyle="light-content"
  backgroundColor="#007AFF"
/>
Which prop changes the text/icons in the status bar?

barStyle
-----------------------------------


UseEffect: Effects always run after React updates the UI.

What is a "Side Effect"?

A side effect is anything that interacts with the outside world or does work beyond simply returning JSX.

Three Forms of useEffect
1. No Dependency Array
useEffect(() => {
  console.log("Runs after EVERY render");
});

When does it run?

Initial Render ✅

State Update ✅

Another State Update ✅

Another Render ✅
2. Empty Dependency Array ⭐⭐⭐⭐⭐
useEffect(() => {
  console.log("Runs only once but if timeinterval present that will run");
}, []);

Runs only when the component mounts.

Think:

Component opens

↓

Run once

↓

Never again

This is commonly used for:

API calls
Initial setup
Loading data
3. Dependency Array
const [count, setCount] = useState(0);

useEffect(() => {
  console.log(count);
}, [count]);

Runs:

Component Mount ✅

count changes ✅

Other state changes ❌

Only changes to count trigger the effect.

------------------------
Cleanup Function

React allows you to return a function.

useEffect(() => {

    // Start something

    return () => {

        // Stop it

    };

}, []);

That returned function runs when the component is removed (unmounted) or before the effect runs again (if dependencies change).
or
Before the effect runs again (if dependencies changed)
 When the component unmounts


----------------------

1. What is a stale closure?

A stale closure happens when a function continues to use variables captured from an older render instead of the latest values.

2. Why does it happen?

Because JavaScript closures remember the variables that were in scope when the function was created, and React creates new functions on every render.

3. How can you avoid stale closures?
Include the correct dependencies.
Use functional state updates when applicable.
Use useRef when you need access to the latest value without recreating an effect.

Revision Notes
Every render creates new functions.
Functions "remember" the variables from the render in which they were created.
[] means the effect keeps the first render's closure.
Missing dependencies are a common cause of stale closures.
useRef is an important tool for solving some stale closure problems.


What is useRef?

A hook that returns a mutable object with a .current property whose value persists across renders.
Changing ref.current immediately updates the value,
but does not trigger a re-render.

Does changing ref.current cause a re-render?

No.

Difference between useState and useRef?
useState	                  useRef
Triggers re-render	   |    No re-render
Used for UI state	     |    Used for mutable values
React tracks changes	 |    React does not track .current
📝 Revision Notes
useRef returns { current: value }.
The ref object persists for the lifetime of the component.
Updating .current does not trigger a re-render.
Great for timers, DOM/TextInput references, previous values, and solving stale closures.

Why doesn't useRef trigger a re-render?

A strong answer is:

"useRef returns a mutable object. Updating its .current property does not notify React because React only schedules re-renders when state or props change. The ref object itself keeps the same identity; only one of its properties is mutated."


const ref = useRef(0);

ref.current = 10;

Question:

Does ref.current persist after a re-render?

What do you think?

A. No, it resets to 0.

B. Yes, it remains 10.

(Think carefully about how useRef differs from a normal local variable.)

B
------------------------

What is useMemo?

A React Hook that memoizes (caches) the result of an expensive computation and recomputes it only when its dependencies change.

Does useMemo prevent re-renders?

❌ No.

It only prevents expensive calculations from running unnecessarily.

The component still re-renders.

Difference between useMemo and useRef
useMemo	                              useRef
Caches computed values	              Stores mutable values
Recomputes when dependencies change 	Never recomputes automatically
Used for performance optimization	    Used for references and mutable state
Returns the computed value	          Returns { current }
Revision Notes
useMemo caches the result of a calculation.
It recalculates only when dependencies change.
It does not stop React from re-rendering.
Use it only for expensive operations.
Avoid using it for simple calculations.

----------------------------------------------------

The Rule

For objects, arrays, and functions, === compares the reference, not the contents.

Code	Result	Reason
{} === {}	❌ false	Two different objects
[] === []	❌ false	Two different arrays
(() => {}) === (() => {})	❌ false	Two different functions
const b = a; a === b	✅ true	Same reference


Example 1
const obj1 = { name: "Vignesh" };
const obj2 = { name: "Vignesh" };

console.log(obj1 === obj2);

Memory:

obj1 → 📦 Object A

obj2 → 📦 Object B

Output:

false

Even though they have the same content, they are different objects.

Example 2
const obj1 = { name: "Vignesh" };
const obj2 = obj1;

console.log(obj1 === obj2);

Memory:

obj1 ──► 📦 Object A ◄── obj2

Output:

true

Because both variables refer to the same object.

-------------------------------------------------


| Hook          | What React Caches?      |
| ------------- | ----------------------- |
| `useMemo`     | **The returned value**  |
| `useCallback` | **The function itself** |


----------------------

useCallback memoizes (caches) a function and returns 
the same function reference until one of its dependencies changes.
Caches the function reference,
not the function execution.

Does useCallback stop the function from executing?

Answer:

❌ No.
It only keeps the same function reference.

Syntax: const memoizedFunction = useCallback(() => {
function logic
}, [dependencies]);

-------------------------------

// React.memo
//React.memo performs a shallow comparison of props.
// Prevents child component re-render if props remain the same.


// useCallback
// Caches the function reference.
// Creates a new function only when dependencies change.

// React.memo + useCallback
// Best combination to avoid unnecessary child re-renders.

A common interview question is:

Can React.memo alone prevent re-renders?

Answer:

✅ Yes, if all props (including function props) remain the same.
❌ No, if you pass an inline function like onPress={() => {}}, because a new function is created on every render. In that case, combine React.memo with useCallback.

React.memo optimizes component rendering.

useCallback optimizes function references.

Together they prevent unnecessary child re-renders.

--------------
React Rendering Rules

State changes

↓

Component re-renders

↓

Functions are recreated

↓

Objects are recreated

↓

Arrays are recreated

↓

React compares props

↓

React.memo decides whether to re-render child

----------------
useMemo
---------
Caches a VALUE.

Used for expensive calculations.

-------------------------

useCallback
------------
Caches a FUNCTION REFERENCE.

Used with React.memo.

-------------------------

React.memo
------------
Caches COMPONENT RENDERING.

Skips re-render if props are unchanged.

------------------------
Prop drilling:
Definition

Prop Drilling is the process of passing data through multiple intermediate components, even when those components don't use the data themselves.


What is useContext?

useContext is a React Hook that allows a component to read data from a Context without passing props through every intermediate component.


Why?
Avoid prop drilling.
Share common/global data across multiple components.
Makes component communication cleaner and easier to maintain.

eg:
// Create Context
const UserContext = createContext();

// Provide Value
<UserContext.Provider value="Vignesh">
  <User />
</UserContext.Provider>

// Consume Value
const user = useContext(UserContext);

What problem does useContext solve?

It solves prop drilling by allowing components to access shared data directly without passing props through intermediate components.

What happens if there is no Provider?

useContext() returns the default value passed to createContext() (or undefined if no default was provided).