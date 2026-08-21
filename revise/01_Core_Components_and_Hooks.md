# Part 1 — Core Components & React Hooks (Full Depth)

---

## 1. View

**Definition:** `View` is the fundamental layout container in React Native — the equivalent of a `<div>` on the web. Almost every other component lives inside one.

**Why it matters:** All layout (spacing, alignment, backgrounds, borders) in RN is composed by nesting `View`s and applying Flexbox styles — there's no CSS Grid, no floats, no positioning tricks from the web. Flexbox is the *only* layout system.

### Example — Two-column layout
```jsx
import { View, Text, StyleSheet } from "react-native";

export default function TwoColumn() {
  return (
    <View style={styles.row}>
      <View style={styles.column}><Text>Left</Text></View>
      <View style={styles.column}><Text>Right</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flex: 1, flexDirection: "row" },
  column: { flex: 1, padding: 16, backgroundColor: "#f2f2f2" },
});
```
**Explain every line:**
- `styles.row` → `flexDirection: "row"` makes children sit side by side instead of stacked (RN default is `column`).
- `styles.column` → `flex: 1` on *both* children means they split the available width equally.

### Practice checklist
- Center a box (`flex:1, justifyContent:"center", alignItems:"center"`)
- Build a card (padding + borderRadius + elevation/shadow)
- Nested views for a profile header (avatar row + text column)

---

## 2. Text

**Definition:** Displays text content. Unlike the web, **all text must be inside a `<Text>` component** — you cannot render a bare string inside a `<View>`.

```jsx
<Text style={{ fontSize: 16, color: "#333" }}>
  Hello <Text style={{ fontWeight: "bold" }}>World</Text>
</Text>
```
**Explain every line:**
- The outer `<Text>` sets the base style for the whole line.
- The inner `<Text>` **inherits** the outer style and only overrides `fontWeight` — this nested-inheritance behavior is unique to `Text` (View children don't inherit style this way).

Key props: `fontSize`, `fontWeight`, `color`, `textAlign`, `numberOfLines` (truncates long text with `...` when the line count is exceeded — very common for list item titles/descriptions).

```jsx
<Text numberOfLines={2} ellipsizeMode="tail">
  A very long product description that needs to be cut off after two lines...
</Text>
```

---

## 3. StyleSheet

**Definition:** `StyleSheet.create()` is a helper that validates and (in the old architecture) optimizes style objects by referencing them via ID across the JS↔Native bridge instead of passing raw objects every time.

```js
const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: "bold" },
  button: { padding: 12, borderRadius: 8, backgroundColor: "#007AFF" },
});
```

**Why avoid inline styles in hot paths?**
```jsx
// ❌ Creates a brand-new object every render — breaks React.memo shallow comparisons downstream
<Child style={{ padding: 10 }} />

// ✅ Stable reference — created once at module load
<Child style={styles.padded} />
```

**Naming convention best practice:** name styles after their *role* (`title`, `button`, `card`) not their literal values (`redText`, `bigMargin`) — makes theming/dark-mode swaps much easier later.

---

## 4. Flexbox ⭐⭐⭐⭐⭐ (the single most important layout topic)

RN uses the **Yoga** layout engine, which implements a Flexbox spec very close to CSS Flexbox, with one critical default flip:

| Property | Web default | React Native default |
|---|---|---|
| `flexDirection` | `row` | **`column`** |

### The two axes
Every Flexbox container has a **main axis** (direction of `flexDirection`) and a **cross axis** (perpendicular to it).
- `justifyContent` → aligns children along the **main axis**.
- `alignItems` → aligns children along the **cross axis**.

```jsx
<View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
  <Text>Left</Text>
  <Text>Right</Text>
</View>
```
Here, because `flexDirection` is `row`, the main axis is horizontal → `justifyContent="space-between"` pushes the two `<Text>`s to opposite ends. `alignItems="center"` vertically centers them (cross axis = vertical).

### `flex` property
```jsx
<View style={{ flex: 1 }}>          {/* takes ALL available space */}
<View style={{ flex: 2 }}>          {/* takes 2x the space of a flex:1 sibling */}
```
`flex: 1` on a root `View` is one of the most common lines in RN — it tells the container to expand to fill its parent (usually the whole screen).

### `alignSelf` — override for one child
```jsx
<View style={{ alignItems: "flex-start" }}>
  <View style={{ alignSelf: "center" }} />  {/* this one child ignores the parent's alignItems */}
</View>
```

### `gap` and `flexWrap`
```jsx
<View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
  {tags.map(t => <Tag key={t.id} label={t.name} />)}
</View>
```
`flexWrap: "wrap"` lets children flow to a new line instead of shrinking/overflowing; `gap` (RN ≥ 0.71) adds spacing between children without manual margins.

### Practice screens to build
Login screen (centered form, spaced inputs) · Profile card (row layout: avatar + column of text) · Dashboard (grid via `flexWrap`) · Product card (image + title + price stacked in a `column`).

---

## 5. Pressable

**Definition:** The modern universal touch component, replacing older `TouchableOpacity`/`TouchableHighlight` in most new code because it exposes press state directly and supports platform-native feedback (Android ripple).

```jsx
<Pressable
  disabled={loading}
  onPress={save}
  android_ripple={{ color: "#ddd" }}
  style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
>
  <Text>Save</Text>
</Pressable>
```
**Explain every line:**
- `disabled={loading}` → prevents double-submits while a save request is in flight.
- `style` as a **function** receives `{ pressed }` so you can visually respond to touch-down without extra state.
- `android_ripple` → Android-only material ripple effect on press (ignored on iOS).

---

## 6. useState ⭐⭐⭐⭐⭐

**Definition:** The hook that gives a functional component its own piece of local state.

```js
const [count, setCount] = useState(0);
```

### Functional updates (critical pattern)
```js
setCount(prev => prev + 1);   // ✅ always correct — uses the LATEST state
setCount(count + 1);          // ⚠️ can be stale if called multiple times in the same tick/closure
```
**Why this matters:** if you call `setCount(count + 1)` twice in the same event handler, both calls see the *same* `count` value from that render's closure — you only get +1, not +2. `setCount(prev => prev + 1)` twice correctly gives +2, because each functional update receives the result of the previous one.

### Things to remember
- State updates are **scheduled**, not synchronous — logging `count` right after `setCount(...)` still shows the old value.
- React **batches** multiple `setState` calls inside one event handler (and, since React 18, in most async contexts too) into a single re-render — good for performance, but means you can't assume renders happen one-per-`setState`-call.
- For arrays/objects, always create a **new** reference — never mutate directly:
```js
// ✅
setTodos(prev => [...prev, newTodo]);
setTodos(prev => prev.filter((_, i) => i !== index));   // remove by index

// ❌ mutates the same array reference — React won't detect the change
todos.push(newTodo);
setTodos(todos);
```

### Worked example — Todo add/remove
```jsx
const [todo, setTodo] = useState("");
const [todos, setTodos] = useState/** @type {string[]} */([]);

const addTodo = () => {
  if (!todo.trim()) return;                 // guard against empty/whitespace input
  setTodos(prev => [...prev, todo.trim()]);  // functional update — depends on previous list
  setTodo("");                               // clear the input
};

const delTodo = (index) => {
  setTodos(prev => prev.filter((_, i) => i !== index));  // keep everything except this index
};
```
**Explain every line:** `filter((_, i) => i !== index)` builds a brand-new array containing every item *except* the one at `index` — the underscore `_` means "I don't need the item itself, only its position."

---

## 7. TextInput

```jsx
<TextInput
  value={email}
  onChangeText={setEmail}
  placeholder="Email"
  keyboardType="email-address"
  secureTextEntry={false}
  multiline={false}
/>
```
- `value` + `onChangeText` together make it a **controlled** input — React state is the single source of truth.
- `keyboardType`: `default | numeric | email-address | phone-pad | decimal-pad` — swaps the on-screen keyboard layout.
- `secureTextEntry` — masks password characters.

### Practice: Login form
```jsx
const [email, setEmail] = useState("");
const [pwd, setPwd] = useState("");

const submit = () => {
  if (!email || !pwd) { Alert.alert("Enter details properly"); return; }
  Alert.alert("Success");
};
```

---

## 8. FlatList ⭐⭐⭐⭐⭐

**Definition:** A virtualized list component that renders **only the items currently visible on screen** (plus a small buffer), recycling views as the user scrolls — critical for performance with long or dynamic datasets.

```jsx
<FlatList
  data={users}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item, index }) => <UserCard user={item} />}
  ListEmptyComponent={() => <Text>No Data</Text>}
  ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
  contentContainerStyle={{ padding: 16 }}
  style={{ flex: 1 }}
/>
```
**Explain every prop:**
- `data` → the array to render.
- `renderItem` → function returning JSX for each row; receives `{ item, index }`.
- `keyExtractor` → returns a **stable, unique** string per item so React can track identity across re-renders. **Never use the array index** in production — if items are inserted/removed/reordered, index-based keys cause React to match the wrong component to the wrong data, leading to glitches like text input focus jumping to the wrong row.
- `ListEmptyComponent` → rendered when `data` is empty.
- `ItemSeparatorComponent` → rendered *between* items (not before the first or after the last).
- `style` vs `contentContainerStyle` → `style` sizes/positions the list itself (the outer scrollable box); `contentContainerStyle` styles the inner content wrapper (e.g., padding around all items).
- `extraData` → tells FlatList to re-render rows when some state *outside* of `data` changes (e.g., a separately-tracked "selectedId").

### ScrollView vs FlatList
| ScrollView | FlatList |
|---|---|
| Renders **all** children immediately, regardless of visibility | Renders only visible items (virtualization) + a buffer |
| Simple, no extra config | Requires `keyExtractor`/`renderItem` |
| Fine for small/static content | Essential for long/dynamic lists |
| Memory grows with item count | Memory stays roughly constant |

**Rule of thumb:** ScrollView → profile screen, settings, about page, small dashboard. FlatList → chat messages, product lists, contacts, social feeds — anything with potentially many or changing items.

### Pagination pattern
```jsx
<FlatList
  data={users}
  onEndReached={loadMoreUsers}
  onEndReachedThreshold={0.5}   // fires when the user is ~halfway through the remaining rendered content
/>
```
```js
const loadMoreUsers = async () => {
  const nextPage = await api.get(`/users?page=${page + 1}`);
  setUsers(prev => [...prev, ...nextPage.data]);   // APPEND, never replace
  setPage(p => p + 1);
};
```

### Pull-to-refresh pattern
```jsx
<FlatList
  data={users}
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
/>
```
`onRefresh` fires when the user pulls down; you're responsible for calling your fetch again and setting `refreshing` back to `false` when done.

---

## 9. Image

```jsx
// Local (bundled) image — path resolved at build time
<Image source={require("./assets/avatar.png")} style={{ width: 80, height: 80 }} />

// Remote image — width & height are REQUIRED, RN cannot infer intrinsic size over the network
<Image source={{ uri: "https://picsum.photos/200" }} style={{ width: 150, height: 150, borderRadius: 150 }} resizeMode="cover" />
```
`resizeMode`: `cover` (fill & crop, most common for avatars/thumbnails) · `contain` (fit within bounds, may letterbox) · `stretch` (distort to fill) · `center` · `repeat`.

**Production tip:** the core `Image` component has no built-in disk cache guarantee across platforms — use `expo-image` (`import { Image } from "expo-image"`) for automatic memory+disk caching, blurhash placeholders, and better perceived performance on lists of images.

---

## 10. ScrollView

```jsx
<ScrollView
  showsVerticalScrollIndicator={false}
  contentContainerStyle={{ padding: 16 }}
>
  <ProfileHeader />
  <Bio />
  <Stats />
</ScrollView>
```
Same `style` vs `contentContainerStyle` distinction as FlatList. Horizontal scrolling: add `horizontal` prop.

---

## 11. ActivityIndicator

```jsx
{loading ? <ActivityIndicator size="large" color="#007AFF" /> : <Content />}
```
**When to use it:** any async operation — API calls, auth checks, uploads/downloads — while data isn't ready yet, instead of showing a blank/broken screen.

---

## 12. Modal

```jsx
<Modal
  visible={visible}
  animationType="slide"     // none | slide | fade
  transparent={true}
  onRequestClose={() => setVisible(false)}
>
  <View style={styles.modalContent}><Text>Modal content</Text></View>
</Modal>
```
- Toggle visibility by changing `visible` (state-driven, not imperative `.show()`/`.hide()`).
- `onRequestClose` is **required on Android** — it's how you handle the hardware/gesture back button while the modal is open; without it, back-press behavior is undefined on Android.

---

## 13. Switch

```jsx
<Switch
  value={enabled}
  onValueChange={setEnabled}
  disabled={false}
  trackColor={{ false: "#767577", true: "#81b0ff" }}
  thumbColor="#f4f3f4"
/>
```
`value` controls on/off state; `onValueChange` fires with the new boolean when toggled.

---

## 14. KeyboardAvoidingView

```jsx
<KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={{ flex: 1 }}
>
  <TextInput placeholder="Message" />
</KeyboardAvoidingView>
```
Without this, the on-screen keyboard can cover the active input on many devices — the `behavior` prop differs by platform because iOS and Android handle keyboard-triggered resizing differently.

---

## 15. StatusBar & SafeAreaView

```jsx
<StatusBar barStyle="light-content" backgroundColor="#007AFF" />
```
`barStyle` controls whether the status bar icons/text are light or dark (choose based on your header's background color).

```jsx
<SafeAreaProvider>
  <SafeAreaView style={{ flex: 1 }}>
    {/* content stays clear of notches, status bar, and home indicator */}
  </SafeAreaView>
</SafeAreaProvider>
```
Add this early in every project — nearly every real screen needs it, and retrofitting it later means touching every screen.

---

# React Hooks — Full Depth

## useEffect

**Definition:** Runs a "side effect" — any code that reaches outside pure rendering (API calls, subscriptions, timers, manually interacting with a ref/native module) — **after** React has committed the render to the screen.

### The three forms, explained

**1. No dependency array — runs after every render**
```js
useEffect(() => {
  console.log("Runs after EVERY render");
});
```
Runs on: initial render ✅, every subsequent re-render (any state/prop change) ✅. Rarely what you want — easy to create infinite loops if the effect itself triggers a state update.

**2. Empty array `[]` ⭐⭐⭐⭐⭐ — runs once, on mount**
```js
useEffect(() => {
  fetchInitialUsers();
}, []);
```
Mental model: *component opens → runs once → never again* (until unmount/remount). This is the standard pattern for: initial API calls, one-time setup, analytics screen-view events.

**3. Dependency array `[count]` — runs on mount + whenever a listed value changes**
```js
useEffect(() => {
  console.log(count);
}, [count]);
```
Runs on: mount ✅, `count` changing ✅, any *other* state changing (that isn't in the array) ❌.

### Cleanup function
```js
useEffect(() => {
  const id = setInterval(() => setSeconds(s => s + 1), 1000);
  return () => clearInterval(id);   // cleanup
}, []);
```
**When cleanup fires:**
- Right before the effect re-runs (if a dependency changed).
- When the component unmounts.

This is how you prevent memory leaks (dangling timers/subscriptions) and duplicate side effects (e.g., double-subscribing to a WebSocket on every re-render).

### Stale Closures — a very commonly asked concept

**What is it?** A function keeps using variables captured from an **older render** instead of the current one.

```js
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);   // ❌ always logs the count from when this effect first ran, never updates
  }, 1000);
  return () => clearInterval(id);
}, []);   // empty array — this effect (and its closure over `count`) only runs ONCE
```

**Why does it happen?** JavaScript closures "remember" the variables that were in scope at the moment the function was *created*. React creates a brand-new function on every render, but because `[]` means this particular effect's closure is locked to the *first* render, `count` inside it is forever `0` (or whatever it was on mount).

**How to fix it — three ways:**
1. **Include the correct dependency:**
```js
useEffect(() => {
  const id = setInterval(() => console.log(count), 1000);
  return () => clearInterval(id);
}, [count]);   // now re-subscribes with the latest `count` each time it changes
```
2. **Functional state updates** (when the new value only depends on the previous one, you don't even need the value in the closure):
```js
setCount(prev => prev + 1);   // never stale — React always passes the true latest state
```
3. **`useRef` for "always latest" values without re-running an effect:**
```js
const countRef = useRef(count);
useEffect(() => { countRef.current = count; }, [count]);

useEffect(() => {
  const id = setInterval(() => console.log(countRef.current), 1000);  // always fresh
  return () => clearInterval(id);
}, []);
```

---

## useRef

**Definition:** Returns a mutable object `{ current: value }` whose `.current` persists across re-renders. Updating `.current` does **not** trigger a re-render.

```js
const ref = useRef(0);
ref.current = 10;
// after the component re-renders for any other reason, ref.current is STILL 10
// (unlike a plain local variable inside the function body, which would reset to its initial value every render)
```

**useState vs useRef**
| useState | useRef |
|---|---|
| Triggers re-render on change | No re-render on change |
| Used for values the UI displays | Used for mutable "instance" values the UI doesn't need to react to |
| React tracks and diffs it | React completely ignores `.current` mutations |

**Why doesn't updating `.current` cause a re-render?**
> `useRef` returns a mutable object. Updating `.current` doesn't notify React, because React only schedules re-renders when `state` or `props` change. The ref *object itself* keeps the same identity across renders — only one of its internal properties is mutated, and React has no subscription to that mutation.

**Common uses:**
- Storing a `setInterval`/`setTimeout` ID to clear it later.
- Referencing a `TextInput` to imperatively call `.focus()`:
```jsx
const inputRef = useRef(null);
<TextInput ref={inputRef} />
<Pressable onPress={() => inputRef.current.focus()}><Text>Focus</Text></Pressable>
```
- Storing the "previous" value of a prop/state for comparison.
- Solving stale closures (see above).

---

## useMemo

**Definition:** Caches the **result of an expensive computation**, recomputing only when its dependency array changes.

```js
const sortedList = useMemo(() => {
  return [...products].sort((a, b) => a.price - b.price);   // expensive on a large array
}, [products]);
```

**Does `useMemo` prevent re-renders?** ❌ **No.** The component still re-renders every time it normally would — `useMemo` only avoids re-running the *calculation inside it* when dependencies haven't changed. This is a very common interview trap.

**Second major use — stabilizing object/array references for `React.memo` children:**
```js
// ❌ Every render creates a brand-new object, so React.memo on <Child> is defeated
<Child user={{ name }} />

// ✅ Same reference across renders unless `name` actually changes
const user = useMemo(() => ({ name }), [name]);
<Child user={user} />
```

**useMemo vs useRef**
| useMemo | useRef |
|---|---|
| Caches a **computed value** | Stores a **mutable value** |
| Recomputes when dependencies change | Never recomputes automatically |
| For performance optimization | For references / instance variables |
| Returns the value directly | Returns `{ current }` |

**Best practices:** only use for genuinely expensive calculations (sorting/filtering large arrays, heavy math) — for trivial calculations, the memoization bookkeeping itself can cost more than just recomputing.

---

## Reference Equality — the foundation everything above relies on

For objects, arrays, and functions, JavaScript's `===` compares **reference**, not contents:

```js
{} === {}                  // false — two different objects in memory
[] === []                  // false — two different arrays
(() => {}) === (() => {})  // false — two different function instances
const b = a; a === b        // true — same reference
```

```js
const obj1 = { name: "Vignesh" };
const obj2 = { name: "Vignesh" };
console.log(obj1 === obj2);   // false — same content, different memory addresses

const obj3 = obj1;
console.log(obj1 === obj3);   // true — both point to the SAME object
```
Primitives (`number`, `string`, `boolean`) always compare by **value** (`25 === 25` → `true`). This distinction — value vs reference equality — is *the* mental model behind `React.memo`, `useMemo`, and `useCallback`.

---

## useCallback

**Definition:** Memoizes a **function reference**, returning the exact same function identity across renders until a dependency changes. It caches the *reference*, not the execution — the function still runs normally whenever it's called.

```js
const handlePress = useCallback(() => {
  saveItem(id);
}, [id]);
```

**Does `useCallback` stop the function from executing?** ❌ No — it only prevents a *new* function object from being created every render.

| Hook | What React caches |
|---|---|
| `useMemo` | **The returned value** |
| `useCallback` | **The function itself** (its reference) |

---

## React.memo

**Definition:** A Higher-Order Component that wraps a functional component and performs a **shallow comparison** of its props on each re-render — if every top-level prop is `===` equal to last time, React skips re-rendering that component entirely.

```js
const Child = React.memo(function Child({ name, onPress }) {
  console.log("Child rendered");
  return <Pressable onPress={onPress}><Text>{name}</Text></Pressable>;
});
```

**How the comparison works:**
```jsx
<Child name="Vignesh" age={25} />
```
React checks `oldProps.name === newProps.name` and `oldProps.age === newProps.age`. If both are `true` → skip render.

**The trap — object/function props:**
```jsx
<Child user={{ name: "Vignesh" }} />       // new object every render → always re-renders
<Child onPress={() => doSomething()} />    // new function every render → always re-renders
```
Even though the *content* is identical, the *reference* changed, so React.memo's shallow comparison sees them as different and re-renders anyway.

**The fix — combine with `useMemo`/`useCallback`:**
```js
const user = useMemo(() => ({ name }), [name]);
const onPress = useCallback(() => doSomething(id), [id]);
<Child user={user} onPress={onPress} />
```

**Common interview question — "Can React.memo alone prevent re-renders?"**
- ✅ Yes, if every prop (including function props) is referentially stable.
- ❌ No, if you pass inline objects/functions/arrays — a new reference is created every render, so combine `React.memo` with `useCallback`/`useMemo`.

### The full rendering chain (memorize this flow)
```
State changes
  → Component re-renders
    → Functions recreated
    → Objects recreated
    → Arrays recreated
      → React compares new props to old props (shallow, ===)
        → React.memo decides: skip render, OR re-render child
```

---

## useContext

**Definition:** Reads a value from a React Context without manually passing it down through every intermediate component as props.

**Problem it solves — Prop Drilling:** passing data through multiple layers of components that don't themselves need the data, just to get it to a deeply nested child.

```js
const UserContext = createContext();

// Provide it high up the tree
<UserContext.Provider value={currentUser}>
  <Dashboard />   {/* Dashboard doesn't use `currentUser` itself, but its children do */}
</UserContext.Provider>

// Consume it anywhere below, no matter how deep
function ProfileAvatar() {
  const user = useContext(UserContext);
  return <Text>{user.name}</Text>;
}
```
**What happens with no matching Provider above?** `useContext()` returns the default value passed to `createContext(defaultValue)` (or `undefined` if none was given) — it does **not** throw.

**When to reach for Context vs Redux:** Context is great for fairly static/simple shared data (theme, current user, locale) that doesn't update at high frequency — because every consumer re-renders on *any* context value change. For frequently-updating or complex global state (cart, notifications, multi-slice app data), Redux Toolkit (or Zustand) with selector-based subscriptions scales better.

---

## Custom Hooks

**Definition:** A function starting with `use` that extracts and reuses stateful logic across components.

```js
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);   // cancel the pending update if `value` changes again before `delay` elapses
  }, [value, delay]);
  return debounced;
}

// Usage — search-as-you-type without firing an API call on every keystroke
const [query, setQuery] = useState("");
const debouncedQuery = useDebounce(query, 400);
useEffect(() => { searchApi(debouncedQuery); }, [debouncedQuery]);
```

**Other common production custom hooks:** `useAuth` (wraps login/logout/token state), `usePagination` (page number + loading + append logic), `useNetworkStatus` (online/offline awareness), `useTheme` (light/dark mode + colors).

---

## Quick Recap Table — All Hooks Covered

| Hook | Purpose | Triggers re-render? |
|---|---|---|
| `useState` | Local component state | ✅ |
| `useEffect` | Side effects after render (API calls, subscriptions) | Indirectly (via state it sets) |
| `useRef` | Mutable value that persists, no re-render | ❌ |
| `useMemo` | Cache a computed **value** | Component still re-renders as normal; only skips recompute |
| `useCallback` | Cache a **function reference** | Same as above |
| `React.memo` | Skip re-rendering a component if props unchanged | Prevents child re-render |
| `useContext` | Read shared data without prop drilling | ✅ on context value change |
