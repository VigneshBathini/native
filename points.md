React Native Fundamentals:
----------------------------

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

------------------------------------------
What is fetch()?

fetch() is a built-in JavaScript function used to make HTTP requests.

fetch(url, options);

It is not React Native-specific.

It works in:

React Native
React
Browsers
Node.js (modern versions)

GET Request
const response = await fetch(
  "https://jsonplaceholder.typicode.com/users"
);

const users = await response.json();

console.log(users);
Explain Every Line
Line 1
await fetch(...)

Sends the HTTP request and waits for the response.

Line 2
response

Contains:

Status
Headers
Body
Line 3
await response.json()

The server sends JSON as text.

This converts it into a JavaScript object/array.

Line 4
console.log(users);

Displays the parsed data.


What does response.json() return?

Answer:

response.json() parses the JSON response body and converts it into a JavaScript object or array, depending on the JSON structure returned by the server.

POST Request:

await fetch("url",{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
  }
  body:JSON.stringify({
    email:"abc@gmail.com"
    password:"2234",
  })
}
)

Why JSON.stringify()?

This is a common interview question.

Your object is:

{
   email:"abc@gmail.com"
}

HTTP sends data as text.

JSON.stringify() converts the JavaScript object into a JSON string.

Without it, many APIs won't understand the request body.


Why async/await?

Without async/await:

fetch(url)
.then((response)=>response.json())
.then((data)=>console.log(data))
.catch((error)=>console.log(error))

With async/await:

try{
  const response= await (url);
  const data = await response.json()
}catch(error){
  console.log(error)
}
Much cleaner and easier to read.


const getUsers = async()=>{
  try{
    const response = await fetch(url);

    if(!reponse.ok){
      throw new Error("API Error)
    }

    const data = await response.json();
     setUserdata(data) 
  }catch(error){
    console.log(error)

  }
}

Async await:
await waits for a Promise.
async makes a function automatically return a Promise

response.ok	                     response.status
Returns true or false	           Returns the HTTP status code (e.g., 200, 404,500)
Checks if the request 
was successful (status 200–299)	 Tells you the exact result from the server
Good for simple success/failure  checks	Good when you need different logic       for                              different status codes


What is a Promise?

A Promise represents the future result of an asynchronous operation.

const Promise = new Promise((resolve,rejected)=>{
  const success= true;

  if(success){
    resolve("Success")
  }
  else{
    reject("Failed)
  }
})


Promise.all()

This is one of the most useful Promise methods in React Native.

Imagine your Home Screen needs:

User Profile
Notifications
Products

Without Promise.all():

Get Profile

↓

Wait

↓

Get Notifications

↓

Wait

↓

Get Products

Three requests run one after another.

With Promise.all():

Profile  ───────┐
Notifications ──┼──► Run Together
Products ───────┘

All requests start at the same time.

Example
const [users, posts] = await Promise.all([
  fetch("/users").then((res) => res.json()),
  fetch("/posts").then((res) => res.json()),
]);

Both requests execute concurrently.

After both finish:

users
posts

are available.

Internal Flow
Request 1 ──────┐
                │
Request 2 ──────┼── Wait
                │
Request 3 ──────┘

↓

All Finished

↓

Continue Execution
⚠️ Important Behavior

If any one Promise fails, the whole Promise.all() rejects.

Example:

Users ✅

Posts ❌

Comments ✅

Result:

Promise.all()

↓

Rejected

Even though two requests succeeded.


Promise.allSettled()

Suppose you want every result, even if some requests fail.

const results = await Promise.allSettled([
  fetch("/users"),
  fetch("/posts"),
  fetch("/comments"),
]);

Possible result:

Users ✅

Posts ❌

Comments ✅

Unlike Promise.all(), it doesn't fail immediately. Instead, it gives you the outcome of each Promise.

This is useful when one failed request shouldn't prevent the rest of the screen from loading.



What is a Promise?

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

2. Why does fetch() return a Promise?

Because network requests take time, and JavaScript shouldn't block the main thread while waiting.

3. Difference between Promise.all() and Promise.allSettled()?
Promise.all()	Promise.allSettled()
Rejects if any Promise fails	Waits for every Promise
Best when all requests are required	Best when requests are independent
4. When would you use Promise.all() in React Native?

Loading multiple independent APIs simultaneously, such as profile, notifications, and settings on a home screen.

5. Why is async/await preferred over .then()?

It makes asynchronous code easier to read, especially when there are multiple sequential operations. Under the hood, it still works with Promises.



A Promise is a JavaScript object that represents the eventual result (success or failure) of an asynchronous operation.

Examples:

API Calls (fetch, Axios)
File Uploads
Database Queries
Timers (setTimeout)



Method	Success Condition	Failure Condition	Production Usage
.then()	Runs on success	—	Handle successful response
.catch()	—	Runs on failure	Handle errors
.finally()	Always	Always	Hide loader, cleanup
Promise.all()	All Promises succeed	Any Promise fails	Multiple API calls together
Promise.allSettled()	Always returns all results	Never rejects because of one failure	Dashboard/widgets
Promise.race()	First Promise settles	First rejection also wins	Timeout, fastest response
Promise.any()	First successful Promise	Rejects only if all fail	Backup servers

------------------------

Definition

Pull to Refresh lets users manually refresh the latest data by pulling down a list.

🧠 Why?

Keeps data updated without restarting the app.


Which component provides Pull to Refresh?

Answer:

RefreshControl

Q2. Which prop controls the spinner?

Answer:

refreshing

Q3. Which callback is triggered?

Answer:

onRefresh


-------------------------
Pagination loads data in smaller chunks instead of fetching everything at once.

Example
<FlatList
  data={users}
  renderItem={renderItem}
  onEndReached={loadMoreUsers}
  onEndReachedThreshold={0.5}
/>
🔍 Explain Every Line
onEndReached

Called when the user reaches the end of the list.

onEndReachedThreshold={0.5}

Start loading before the user reaches the bottom.

0.5 means approximately halfway through the remaining visible content.

⚙️ Internal Flow
Load First Page

↓

User Scrolls

↓

Near Bottom

↓

onEndReached()

↓

API Call

↓

Append New Data

↓

Continue Scrolling
Production Example

Suppose API returns

Page 1

20 Users

Next request

Page 2

20 Users

Instead of replacing data

setUsers(newUsers);

append it

setUsers((prev) => [...prev, ...newUsers]);

---------------------------------

What are Props?

Props (Properties) are used to pass data from a Parent Component to a Child Component.

<CustomButton title="Login" />
Component → CustomButton
Prop → title
Value → "Login"


Parent (App.js)
import { View } from "react-native";
import CustomButton from "./components/CustomButton";

export default function App() {
  return (
    <View>
      <CustomButton title="Login" />
    </View>
  );
}
Child (CustomButton.js)
import { Pressable, Text } from "react-native";

export default function CustomButton(props) {
  return (
    <Pressable>
      <Text>{props.title}</Text>
    </Pressable>
  );
}

Output:

Login


Definition

children is a special prop that contains everything placed between a component's opening and closing tags.

🧠 Why?

Allows components to render dynamic UI instead of only fixed values.

🛠 Syntax
<Card>

<Text>Hello</Text>

</Card>

Child:

function Card({ children }) {
  return <View>{children}</View>;
}