# React Native — Revision Notes

## Quick Code Snippets

```js
setTodos((prev) => prev.filter((_, i) => i !== index));
```
> Take the current list of todos, remove the item at the given index, and update state with the remaining todos.

```ts
const [todos, setTodos] = useState<string[]>([]);
```
- `todos` → stores a list of todo items
- `setTodos` → updates that list
- `string[]` → the list can only contain strings
- `[]` → starts empty

---

## ScrollView vs FlatList

| ScrollView | FlatList |
|---|---|
| Renders **all** children immediately | Renders only visible items (virtualization) |
| Good for small, static content | Best for long or dynamic lists |
| Simple to use | Optimized for performance |
| Not ideal for hundreds of items | Handles thousands of items efficiently |

**Rule of thumb**
- **ScrollView** → Profile screen, Settings screen, About page, Registration form, small dashboards
- **FlatList** → Chat messages, Todo lists, Product lists, Contacts, Social media feeds

- `style` → makes the list fill the available space (outer container)
- `contentContainerStyle` → styles the scrollable content *inside* the list

---

## 1. View
Container component (like `<div>` in HTML).

**Revise:** flex, justifyContent, alignItems, nested Views, background color, padding & margin
**Practice:** Center a box · Create a card · Two-column layout

## 2. Text
Displays text.

**Revise:** fontSize, fontWeight, color, textAlign, numberOfLines, nested Text

```jsx
<Text>
  Hello <Text style={{ fontWeight: "bold" }}>World</Text>
</Text>
```

## 3. StyleSheet
Organizes styles.

**Revise:** `StyleSheet.create()`, avoid inline styles, reuse styles, naming conventions

```js
const styles = StyleSheet.create({
  title: {},
  button: {},
});
```

## 4. Flexbox ⭐⭐⭐⭐⭐
Most important layout topic.

**Revise:** flex, flexDirection, justifyContent, alignItems, alignSelf, gap, flexWrap
**Practice:** Login Screen · Profile Card · Dashboard · Product Card

## 5. Pressable
Handles user interaction.

**Revise:** onPress, disabled, style, `android_ripple` (Android only)

```jsx
<Pressable disabled={loading} onPress={save} />
```

## 6. useState ⭐⭐⭐⭐⭐

```js
const [count, setCount] = useState(0);
```

**Know:** primitive state, object state, array state, functional updates

```js
setCount(prev => prev + 1);
```

**Remember:**
- State updates are scheduled by React (not synchronous).
- React batches multiple state updates for performance.
- Don't expect the updated state immediately after calling the setter — it applies on the next render.

## 7. TextInput
**Revise:** value, onChangeText, placeholder, keyboardType, secureTextEntry, multiline
**Practice:** Login Form · Search Bar

## 8. FlatList ⭐⭐⭐⭐⭐
One of the most important components.

**Know:** `data`, `renderItem`, `keyExtractor`, `ListEmptyComponent`, `ItemSeparatorComponent`, `contentContainerStyle`

**extraData** — used when FlatList needs to re-render based on data *outside* the `data` prop.

**ScrollView vs FlatList:** ScrollView renders all items; FlatList renders only visible items (virtualized).

**Production tip:** Never use array `index` as the `key` — it breaks item identity across reorders/insertions/deletions, causing incorrect re-renders and lost component state (e.g. TextInput focus). Use a stable unique ID from the data instead.

## 9. Image

**Know:**
- Local → `require("./assets/avatar.png")`
- Remote → `{ uri: "https://..." }`

**Revise:** `resizeMode` (cover, contain, stretch, center, repeat), borderRadius, width & height (required for remote images)

## 10. ScrollView

**Know:** vertical, horizontal, `showsVerticalScrollIndicator`, `contentContainerStyle`

**Remember:** Small data → ScrollView · Large data → FlatList

- `ItemSeparatorComponent` → adds a separator between each list item
- `style` → styles the list itself (outer box)
- `contentContainerStyle` → styles what's inside the list (the scrollable content)

---

## useEffect
Effects always run **after** React updates the UI (i.e., after paint/commit, not during render).

**Side effect** = anything that interacts with the outside world or does work beyond returning JSX (API calls, subscriptions, timers, manual DOM/native module access).

### Three forms

**1. No dependency array** — runs after every render
```js
useEffect(() => {
  console.log("Runs after EVERY render");
});
```
Runs on: initial render ✅, every state update ✅, every re-render ✅

**2. Empty dependency array `[]`** ⭐⭐⭐⭐⭐ — runs once on mount
```js
useEffect(() => {
  console.log("Runs only once");
}, []);
```
Component opens → runs once → never again.
Common uses: API calls, initial setup, loading data.

**3. Dependency array `[count]`** — runs on mount + when a dependency changes
```js
useEffect(() => {
  console.log(count);
}, [count]);
```
Runs on: mount ✅, `count` changes ✅, other state changes ❌

### Cleanup function
```js
useEffect(() => {
  // start something
  return () => {
    // stop it
  };
}, []);
```
The returned function runs:
- Before the effect runs again (if dependencies changed)
- When the component unmounts

---

## Stale Closures

**What is it?** A stale closure happens when a function keeps using variables captured from an older render instead of the latest values.

**Why does it happen?** JavaScript closures "remember" the variables in scope when the function was *created*, and React creates new functions on every render.

**How to avoid it:**
- Include the correct dependencies in the dependency array.
- Use functional state updates (`setCount(prev => prev + 1)`) when the new state depends on the old.
- Use `useRef` when you need the latest value without re-running an effect.

**Revision notes:**
- Every render creates new functions.
- Functions "remember" the variables from the render they were created in.
- `[]` means the effect keeps the closure from the first render.
- Missing dependencies are a common cause of stale closures.
- `useRef` is a key tool for solving some stale-closure problems.

---

## useRef

A hook that returns a mutable object with a `.current` property whose value persists across renders. Updating `.current` changes the value immediately but does **not** trigger a re-render.

**useState vs useRef**

| useState | useRef |
|---|---|
| Triggers re-render | No re-render |
| Used for UI state | Used for mutable values |
| React tracks changes | React does not track `.current` |

**Why doesn't useRef trigger a re-render?**
> `useRef` returns a mutable object. Updating `.current` doesn't notify React, because React only schedules re-renders when state or props change. The ref object itself keeps the same identity — only one of its properties is mutated.

**Quick check:**
```js
const ref = useRef(0);
ref.current = 10;
```
Does `ref.current` persist after a re-render? → **Yes, it remains 10.** (Unlike a normal local variable, which would reset on each render.)

**Good for:** timers, DOM/TextInput references, storing previous values, solving stale closures.

---

## useMemo

A hook that memoizes (caches) the result of an expensive computation and recomputes it only when its dependencies change.

**Does useMemo prevent re-renders?** ❌ No — it only prevents an expensive calculation from re-running unnecessarily. The component still re-renders.

**useMemo vs useRef**

| useMemo | useRef |
|---|---|
| Caches a computed value | Stores a mutable value |
| Recomputes when dependencies change | Never recomputes automatically |
| Used for performance optimization | Used for references / mutable state |
| Returns the computed value | Returns `{ current }` |

**Revision notes:**
- Caches the result of a calculation.
- Recalculates only when dependencies change.
- Does not stop React from re-rendering.
- Use only for genuinely expensive operations — avoid for trivial calculations (the memoization overhead can cost more than it saves).

---

## Reference Equality (`===`)

For objects, arrays, and functions, `===` compares the **reference**, not the contents.

| Code | Result | Reason |
|---|---|---|
| `{} === {}` | ❌ false | Two different objects |
| `[] === []` | ❌ false | Two different arrays |
| `(() => {}) === (() => {})` | ❌ false | Two different functions |
| `const b = a; a === b` | ✅ true | Same reference |

**Example 1**
```js
const obj1 = { name: "Vignesh" };
const obj2 = { name: "Vignesh" };
console.log(obj1 === obj2); // false — different objects in memory, same content
```

**Example 2**
```js
const obj1 = { name: "Vignesh" };
const obj2 = obj1;
console.log(obj1 === obj2); // true — both point to the same object
```

---

## useMemo vs useCallback

| Hook | What React Caches |
|---|---|
| `useMemo` | The **returned value** |
| `useCallback` | **The function itself** (its reference) |

### useCallback
`useCallback` memoizes a function and returns the *same function reference* until a dependency changes. It caches the reference, not the execution — the function still runs when called.

**Does useCallback stop the function from executing?** ❌ No. It only keeps the same function reference across renders.

```js
const memoizedFunction = useCallback(() => {
  // function logic
}, [dependencies]);
```

---

## React.memo + useCallback

- **React.memo** — performs a shallow comparison of props; prevents a child component from re-rendering if its props are unchanged.
- **useCallback** — caches a function reference; only creates a new function when dependencies change.
- **Together** — the best combination to avoid unnecessary child re-renders.

**Common interview question: Can React.memo alone prevent re-renders?**
- ✅ Yes, if all props (including function props) stay referentially the same.
- ❌ No, if you pass an inline function like `onPress={() => {}}` — a new function is created every render, so React.memo's shallow comparison always sees a "changed" prop. Combine with `useCallback` to fix this.

### React rendering flow
```
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
```