% React Native Complete Interview & Revision Notes (Full Depth Edition)
% Compiled & Expanded for a 2–6 YOE React Native Interview
% August 2026

\newpage

# React Native Complete Interview Notes (2–6 YOE) — Full Depth Edition

This is a 6-part study set compiled and expanded from your zip's notes (`points.md`, `Redux.md`, `ReactQuery.md`, `navigations.md`, `networking.md`, `Prodarch.md`, `Phase4_nativefeatures.md`, `Phase5_Performance.md`, `react-native-cli/1_CLI_foundation.md`, `debug_testing/`, `typescript/fundamentals.md`, and more). Every topic is explained line-by-line with "why," not just "what," plus multiple worked examples and Q&A per section — matching the depth of your original source material rather than a compressed summary.

## Files in this set

| File | Covers |
|---|---|
| **01_Core_Components_and_Hooks.md** | View, Text, StyleSheet, Flexbox, Pressable, TextInput, FlatList, Image, ScrollView, ActivityIndicator, Modal, Switch, KeyboardAvoidingView, SafeAreaView — then full hook deep-dives: useState, useEffect (incl. stale closures), useRef, useMemo, useCallback, React.memo, reference equality, useContext, custom hooks |
| **02_Networking_and_Navigation.md** | Client-server architecture, HTTP methods, fetch() (line-by-line), async/await, Promises (all, allSettled, race, any), Axios + interceptors, full HTTP status code reference, pagination, pull-to-refresh — then Expo Router: file-based routing, `_layout.js`, Stack navigation, dynamic/nested routes, route vs query params, protected routes/guards, deep linking |
| **03_ReactQuery_and_Redux.md** | Server state vs client state, QueryClient, useQuery, queryKey/queryFn, cache/fresh/stale data, **staleTime vs gcTime** (fully explained), background refetch, request deduplication, useMutation, query invalidation, optimistic updates — then Redux Toolkit: store, Provider, slices, actions, payload (with real production examples), useSelector, createAsyncThunk, extraReducers, Redux Persist |
| **04_TypeScript_Architecture_Storage.md** | Full TypeScript fundamentals (types, inference, unions, generics, type vs interface, any vs unknown) — then production folder structures (feature-based architecture), environment variables, the API service-layer pattern, authentication flow — then AsyncStorage vs SecureStore |
| **05_NativeFeatures_Performance_Testing_Debugging.md** | Camera/ImagePicker, FileSystem, Sharing, Notifications (local vs push), Location — then performance: FPS, reconciliation, React.memo/useMemo/useCallback worked together, FlatList optimization, image optimization, accessibility, Error Boundaries (what they do/don't catch), crash reporting — then Jest + React Native Testing Library — then ADB/Logcat debugging and Flipper |
| **06_CLI_Android_Deployment_Architecture.md** | Full RN CLI project structure, Metro vs Babel, Gradle build system (`applicationId`, `versionCode` vs `versionName`, min/target/compileSdk), AndroidManifest.xml, MainActivity.kt & MainApplication.kt internals, APK vs AAB, EAS Build & Play Store/App Store deployment, OTA updates — plus a **bonus** section on React Native's New Architecture (Bridge → JSI/Fabric/TurboModules, Hermes, Yoga) since this was flagged "not started" in your progress notes but is commonly asked at this experience level |

## How to use this set
1. **Don't just read — explain out loud.** For every ⭐ topic, try explaining it to an imaginary interviewer before checking the "Explain every line" breakdown.
2. **Rebuild the worked examples from memory**: Todo list (useState), Login form + API call (fetch/axios), Users list with pagination (FlatList + onEndReached), a Redux counter with a thunk, a React Query screen with staleTime tuning.
3. **Priority topics for a 2–6 YOE interview** (spend the most time here): Flexbox, useState/useEffect/stale closures, FlatList + keyExtractor, React.memo+useMemo+useCallback working together, fetch() error handling (`response.ok`), React Query staleTime vs gcTime, Redux slices/payload/thunks, 401 vs 403, APK vs AAB.
4. Each file ends with its own rapid-fire Q&A — use these as flashcards the night before an interview.

Good luck! 
-e 

\newpage

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
// [NO] Creates a brand-new object every render — breaks React.memo shallow comparisons downstream
<Child style={{ padding: 10 }} />

// [YES] Stable reference — created once at module load
<Child style={styles.padded} />
```

**Naming convention best practice:** name styles after their *role* (`title`, `button`, `card`) not their literal values (`redText`, `bigMargin`) — makes theming/dark-mode swaps much easier later.

---

## 4. Flexbox [TOP PRIORITY] (the single most important layout topic)

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

## 6. useState [TOP PRIORITY]

**Definition:** The hook that gives a functional component its own piece of local state.

```js
const [count, setCount] = useState(0);
```

### Functional updates (critical pattern)
```js
setCount(prev => prev + 1);   // [YES] always correct — uses the LATEST state
setCount(count + 1);          // [WARNING] can be stale if called multiple times in the same tick/closure
```
**Why this matters:** if you call `setCount(count + 1)` twice in the same event handler, both calls see the *same* `count` value from that render's closure — you only get +1, not +2. `setCount(prev => prev + 1)` twice correctly gives +2, because each functional update receives the result of the previous one.

### Things to remember
- State updates are **scheduled**, not synchronous — logging `count` right after `setCount(...)` still shows the old value.
- React **batches** multiple `setState` calls inside one event handler (and, since React 18, in most async contexts too) into a single re-render — good for performance, but means you can't assume renders happen one-per-`setState`-call.
- For arrays/objects, always create a **new** reference — never mutate directly:
```js
// [YES]
setTodos(prev => [...prev, newTodo]);
setTodos(prev => prev.filter((_, i) => i !== index));   // remove by index

// [NO] mutates the same array reference — React won't detect the change
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

## 8. FlatList [TOP PRIORITY]

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
Runs on: initial render [YES], every subsequent re-render (any state/prop change) [YES]. Rarely what you want — easy to create infinite loops if the effect itself triggers a state update.

**2. Empty array `[]` [TOP PRIORITY] — runs once, on mount**
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
Runs on: mount [YES], `count` changing [YES], any *other* state changing (that isn't in the array) [NO].

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
    console.log(count);   // [NO] always logs the count from when this effect first ran, never updates
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

**Does `useMemo` prevent re-renders?** [NO] **No.** The component still re-renders every time it normally would — `useMemo` only avoids re-running the *calculation inside it* when dependencies haven't changed. This is a very common interview trap.

**Second major use — stabilizing object/array references for `React.memo` children:**
```js
// [NO] Every render creates a brand-new object, so React.memo on <Child> is defeated
<Child user={{ name }} />

// [YES] Same reference across renders unless `name` actually changes
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

**Does `useCallback` stop the function from executing?** [NO] No — it only prevents a *new* function object from being created every render.

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
- [YES] Yes, if every prop (including function props) is referentially stable.
- [NO] No, if you pass inline objects/functions/arrays — a new reference is created every render, so combine `React.memo` with `useCallback`/`useMemo`.

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
| `useState` | Local component state | [YES] |
| `useEffect` | Side effects after render (API calls, subscriptions) | Indirectly (via state it sets) |
| `useRef` | Mutable value that persists, no re-render | [NO] |
| `useMemo` | Cache a computed **value** | Component still re-renders as normal; only skips recompute |
| `useCallback` | Cache a **function reference** | Same as above |
| `React.memo` | Skip re-rendering a component if props unchanged | Prevents child re-render |
| `useContext` | Read shared data without prop drilling | [YES] on context value change |
-e 

\newpage

# Part 2 — Networking & Navigation (Full Depth)

---

# A. Networking

## 1. Client–Server Architecture

**Does a React Native app talk to a database directly?** No. The app communicates with a backend server over HTTP/HTTPS. The backend handles business logic, security, authentication, and database access, then returns data — almost always JSON — to the app.

```
React Native App
      │
      ▼
   Request  ── URL, Method, Headers, Body(optional)
      │
      ▼
 Backend Server ── business logic, auth checks
      │
      ▼
   Database
      │
      ▼
   Response ── Status Code, Headers, Body(JSON)
      │
      ▼
 App updates state → React re-renders UI
```
HTTP requests are **stateless** — the server doesn't remember previous requests; every request must carry whatever context it needs (like an auth token in headers).

## 2. HTTP Methods

| Method | Purpose |
|---|---|
| GET | Read/fetch data |
| POST | Create a new resource |
| PUT | Replace an entire resource |
| PATCH | Update only specific fields |
| DELETE | Remove a resource |

**PUT vs PATCH (common interview Q):**
| PUT | PATCH |
|---|---|
| Replaces the entire resource | Updates only the specified fields |
| Must send the complete object | Send only what changed |
| Larger payload | Smaller payload |
| Full updates | Partial updates |

## 3. Headers, Query Params, and Request Body

```
Authorization: Bearer <token>     → sends auth credentials
Content-Type: application/json    → tells the server what format the body is in
Accept: application/json          → tells the server what format you want back
User-Agent: ...                   → info about the client making the request
```

**Query parameters** — for filtering/paging without changing the resource itself:
```
GET /users?page=2
```

**Request body** — the actual payload, used with POST/PUT/PATCH:
```json
{ "name": "Vignesh", "email": "abc@gmail.com" }
```

## 4. Anatomy of a Response

```
1 Status Code   → 200 OK
2 Headers       → Content-Type: application/json
3 Body          → { "id": 1, "name": "Vignesh", "city": "Hyderabad" }
```

## 5. fetch()

**Definition:** A built-in JavaScript function for making HTTP requests — not React-Native-specific, it also works in browsers and Node.

### GET request, line by line
```js
const response = await fetch("https://jsonplaceholder.typicode.com/users");
const users = await response.json();
console.log(users);
```
- **Line 1:** `fetch(url)` sends the HTTP GET request and waits (`await`) for the response. The resolved `response` object contains the status, headers, and a (not-yet-parsed) body stream.
- **Line 2:** `response.json()` reads and parses the JSON body into a JS object/array. This *also* returns a Promise, hence the second `await`.
- **Line 3:** logs the parsed data.

### POST request
```js
await fetch("https://api.example.com/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "abc@gmail.com", password: "2234" }),
});
```
**Why `JSON.stringify()`?** HTTP request bodies are transmitted as **text**. A raw JS object like `{ email: "abc@gmail.com" }` can't be sent as-is — `JSON.stringify()` converts it into the JSON text string `"{\"email\":\"abc@gmail.com\"}"`. Without this conversion, most servers won't understand the payload (they'll either error or silently ignore fields).

### Production-grade fetch pattern
```js
const getUsers = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("API Error");
    }
    const data = await response.json();
    setUserData(data);
  } catch (error) {
    console.log(error);
  }
};
```

### `response.ok` vs `response.status`
| `response.ok` | `response.status` |
|---|---|
| Returns `true`/`false` | Returns the exact code (200, 404, 500...) |
| Checks if the request succeeded (status 200–299) | Tells you the precise server result |
| Good for simple success/fail branching | Good when different codes need different handling |

### ⭐ Critical interview point — what fetch() actually rejects on
`fetch()` **only rejects its Promise for network-level failures**: no internet connection, DNS failure, connection dropped, or (if configured) a timeout. It does **NOT** reject the Promise for HTTP error status codes — 400, 401, 403, 404, and 500 all still resolve to a perfectly valid `Response` object. This means code that assumes `fetch()` throws on a 404 is wrong — you must always explicitly check `response.ok` or `response.status`.

## 6. async/await

**Definitions:**
- `async` makes a function automatically return a Promise (even if you just `return 10;`, the function actually returns `Promise.resolve(10)`).
- `await` pauses execution of *that async function* until the awaited Promise settles — **it does not block the JS thread**; other code can still run.

**Why use async/await over `.then()` chains?**
```js
// Without async/await
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));

// With async/await
try {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.log(error);
}
```
Much cleaner and easier to read, especially once you have multiple sequential async steps.

## 7. Promise — the underlying concept

**Definition:** A Promise represents the eventual result (success or failure) of an asynchronous operation.

```js
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) { resolve("Success"); } else { reject("Failed"); }
});
```
Every Promise moves through states: **Pending** → **Fulfilled** (resolved) or **Rejected**.

### Promise method comparison table

| Method | Success condition | Failure condition | Production usage |
|---|---|---|---|
| `.then()` | Runs on success | — | Handle the successful response |
| `.catch()` | — | Runs on failure | Handle errors |
| `.finally()` | Always | Always | Hide loader, cleanup, stop refresh spinner |
| `Promise.all()` | All Promises succeed | **Any one failing rejects the whole thing** | Multiple *required* API calls together |
| `Promise.allSettled()` | Always returns all results | Never rejects due to one failure | Independent dashboard widgets |
| `Promise.race()` | First Promise to settle wins | First rejection also "wins" | Timeouts, "fastest server wins" |
| `Promise.any()` | First **successful** Promise wins | Rejects only if *all* fail | Backup servers, multiple CDNs |

### Promise.all() — running requests in parallel

**Without `Promise.all()` (sequential — slow):**
```
Get Profile → wait → Get Notifications → wait → Get Products
```
Three round-trips happen one after another — total time = sum of all three.

**With `Promise.all()` (parallel — fast):**
```js
const [users, posts] = await Promise.all([
  fetch("/users").then(res => res.json()),
  fetch("/posts").then(res => res.json()),
]);
```
```
Request 1 ──────┐
Request 2 ──────┼── Run Concurrently ── Wait for slowest ── Continue with all results
Request 3 ──────┘
```
Total time ≈ the time of the *slowest* single request, not the sum of all of them — a major perf win for home screens that need several independent pieces of data.

**[WARNING] Important gotcha:** if **any one** Promise in the array fails, the *entire* `Promise.all()` call rejects — even if the other two succeeded. This makes it unsuitable when individual pieces are allowed to fail independently.

### Promise.allSettled() — when partial failure is OK
```js
const results = await Promise.allSettled([
  fetch("/users"),
  fetch("/posts"),
  fetch("/comments"),
]);
```
Even if `/posts` fails, you still get results for `/users` and `/comments` — each entry in `results` is `{ status: "fulfilled", value }` or `{ status: "rejected", reason }`. Ideal for a dashboard where one broken widget shouldn't take down the whole screen.

## 8. Pull-to-Refresh

**Definition:** Lets users manually re-fetch the latest data by pulling down on a list — keeps content current without restarting the app.

```jsx
<FlatList
  data={users}
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
/>
```
- `RefreshControl` is the component that provides this behavior.
- `refreshing` (boolean) controls whether the spinner is currently shown.
- `onRefresh` is the callback fired when the user pulls down.

## 9. Pagination

```jsx
<FlatList
  data={users}
  renderItem={renderItem}
  onEndReached={loadMoreUsers}
  onEndReachedThreshold={0.5}
/>
```
- `onEndReached` fires when the user scrolls near the end of the currently rendered content.
- `onEndReachedThreshold={0.5}` means "start loading when the user is roughly halfway through the last screen's worth of remaining content" — starting *before* they hit the absolute bottom avoids a visible stutter.

```
Load Page 1 → User Scrolls → Near Bottom → onEndReached() → API Call → Append New Data → Continue Scrolling
```
Critical detail: **append**, don't replace:
```js
setUsers(prev => [...prev, ...newUsers]);   // [YES] correct — keeps existing items and adds more
setUsers(newUsers);                          // [NO] wrong — throws away everything already loaded
```

## 10. HTTP Status Codes — Full Reference

**Categories:**
| Range | Meaning |
|---|---|
| 1xx | Informational (rare in app dev) |
| 2xx | Success [YES] |
| 3xx | Redirection |
| 4xx | Client Error [NO] |
| 5xx | Server Error  |

### 2xx — Success
- **200 OK** — everything worked. Example: `GET /users` returns the list successfully.
- **201 Created** — a new resource was created. Example: signup, create order, add product.
- **204 No Content** — request succeeded but there's nothing to return. Example: `DELETE /users/5` — you don't need the deleted object echoed back, just the confirmation that it worked.

### 4xx — Client Errors
- **400 Bad Request** — the client sent an invalid request (e.g., missing required field). React Native should show a friendly message ("Please fill all required fields") instead of crashing or showing a raw error.
- **401 Unauthorized** — not authenticated (missing/invalid/expired token). Production flow: token expires → 401 → navigate to Login → ask user to log in again. This is typically implemented globally via an Axios response interceptor.
- **403 Forbidden** — authenticated, but no permission for this resource. Example: a regular employee hitting an `/admin` endpoint.

**401 vs 403 — a favorite interview question:**
| 401 Unauthorized | 403 Forbidden |
|---|---|
| Not logged in / invalid token | Logged in but no permission |
| **Authentication** problem | **Authorization** problem |

- **404 Not Found** — the requested resource doesn't exist (deleted user, wrong URL, wrong ID).

### 5xx — Server Errors
- **500 Internal Server Error** — the problem is on the *server*, not the app (DB crash, unhandled exception, code bug). RN should show a generic message like "Something went wrong. Please try again later." — **never** expose raw backend error details ("Database connection failed at...") to end users.
- **502 Bad Gateway** — one server in a distributed chain got an invalid response from another (e.g., API Gateway → Auth Server fails). As an RN dev, you typically just show a generic retryable error.
- **503 Service Unavailable** — server temporarily down (maintenance, overload, deployment in progress). Common UX: "Server is under maintenance. Please try again later."

### Memorization diagram
```
Request → Server →
  200 Success · 201 Created · 204 Deleted
  400 Bad Request · 401 Unauthorized · 403 Forbidden · 404 Not Found
  500 Server Error · 502 Bad Gateway · 503 Service Unavailable
```

## 11. Axios — a richer HTTP client

**Why reach for Axios over raw `fetch()`?** Axios automatically parses JSON, rejects Promises on HTTP error statuses (opt-in, more intuitive than `fetch`'s "always resolves" behavior), and — most importantly — supports **interceptors**, which let you centralize cross-cutting networking concerns.

### Creating a reusable instance
```js
// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.company.com",
  timeout: 10000,
});

export default api;
```
Now every call anywhere in the app reuses this one configured client:
```js
const response = await api.get("/users");
```

### Request interceptor — attach the auth token automatically
```js
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getStoredToken()}`;
  return config;
});
```
Every outgoing request now carries the token — no need to remember to add it manually in every service file.

### Response interceptor — centralized error handling
```js
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // clear stored token, navigate to Login
    }
    return Promise.reject(error);
  }
);
```

**Flow:**
```
Component → Service (e.g. userService.js) → Axios Instance → Interceptor → Server
```

### Feature service pattern
```js
// userService.js
import api from "./api";
export const getUsers = () => api.get("/users");

// HomeScreen.js
const response = await getUsers();
setUsers(response.data);
```

---

# B. Navigation (Expo Router / React Navigation)

## 1. Expo Router vs React Navigation

| Expo Router | React Navigation |
|---|---|
| File-based routing | Manual route configuration |
| Best fit for Expo-managed projects | Works with both Expo and bare RN CLI |
| Less boilerplate | More explicit setup |
| **Built on top of** React Navigation | The core underlying navigation engine |

### Why file-based routing?
**Traditional React Navigation** requires manually registering every screen:
```jsx
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Profile" component={ProfileScreen} />
  <Stack.Screen name="Settings" component={SettingsScreen} />
</Stack.Navigator>
```
Imagine 50 screens — that's 50 manual registrations, and it's easy to forget one.

**Expo Router:** you just create files.
```
app/
  index.js
  profile.js
  settings.js
```
That's it — Expo Router automatically wires these up as routes.

## 2. File-Based Routing Basics

**Definition:** every file inside the `app/` folder automatically becomes a route.

**Why is `index.js` special?** It represents the *default* route (`/`) for its folder — so `app/index.js` is your home screen, and `app/products/index.js` is `/products`.

**Advantages:** less configuration, easier maintenance, better scalability as the app grows.

**Can reusable components live inside `app/`?** Technically yes, but by convention (and to keep the architecture clean) reusable UI belongs in a separate `components/` folder, not mixed in with routes.

## 3. `_layout.js`

**Definition:** a special file that defines the navigation shell (Stack, Tabs, Drawer) for every route inside its folder.

```jsx
// app/_layout.js
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
    </Stack>
  );
}
```

## 4. Stack Navigation

**Why is it called "Stack" navigation?** Screens are pushed and popped in **Last-In, First-Out (LIFO)** order — exactly like a stack data structure.

- **`router.push()`** — adds a new screen on top of the stack; the previous screen stays underneath (in memory, not removed).
- **`router.back()`** — removes the current screen, returning to the one below it.
- **Does `push()` remove the previous screen?** No — it keeps the previous screen in the stack, so back navigation works.

## 5. Nested Routes

**Definition:** a folder inside `app/` creates a nested URL segment — think of folders as URL path categories.

```
app/
  products/
    index.js     → /products
    details.js   → /products/details
```
The folder name (`products`) automatically becomes part of the route path.

## 6. Dynamic Routes

**Definition:** a route containing variable values, letting one screen handle many different underlying data items instead of creating a separate screen per item.

**Why use dynamic routes?** To reuse a single screen definition for different data (e.g., one `ProductDetail` screen handles product 1, product 2, product 500...).

**How are they defined?** Square brackets in the filename:
```
app/products/[id].js
```

**Reading the parameter:**
```js
const { id } = useLocalSearchParams();
```
**Why is `id` a string, not a number?** Route parameters come from the URL, and URLs are text by nature. If the app logic needs a numeric value, convert it explicitly: `Number(id)` or `parseInt(id, 10)`.

## 7. Route Parameters vs Query Parameters

```
/products/25                    ← Route Param  (identifies WHICH resource)
/products/25?color=red&size=M    ← Query Params (optional filters/sorting on top)
```
```js
router.push(`/products/${id}`);
router.push(`/products/${id}?color=red`);
```
Route Params identify a specific resource; Query Params supply optional extra information (filters, sort order, search terms) that doesn't change *which* resource you're viewing.

## 8. Protected Routes & Navigation Guards

**Protected Route** — a screen only accessible if the user is authenticated.
```js
if (isLoggedIn) {
  router.push("/checkout");
} else {
  router.push("/login");
}
```

**Navigation Guard** — a broader concept: *any* condition checked before allowing navigation, not limited to auth.
```js
if (isPremiumUser) {
  router.push("/movies");
} else {
  router.push("/upgrade");
}
```

| Protected Route | Navigation Guard |
|---|---|
| Protects access to a specific screen | Controls navigation based on *any* rule |
| Usually authentication-based | Can be any business rule |
| Example: `/orders` requires login | Example: block leaving a form with unsaved changes |

**Is a Navigation Guard only for authentication?** No — it's a general concept that can gate navigation for subscription tiers, admin roles, or unsaved-changes warnings, in addition to login state.

## 9. Deep Linking

**Definition:** allows an app to open a *specific* screen directly from an external source — a link, notification, QR code, email, or SMS — rather than always opening to the home screen.

**Custom URL Scheme vs Universal/App Link:**
| Custom URL Scheme | Universal Link / App Link |
|---|---|
| `myapp://profile/25` | `https://myapp.com/profile/25` |
| Only works if the app is already installed | Opens the app if installed, otherwise falls back to the website |
| Simpler to set up | Better UX — works even without the app |

**Sources of deep links (not just websites):**
Notifications, QR codes, emails, SMS, browser links — any of these can carry a deep link into a specific screen.

**Navigation vs Deep Linking (comparison):**
| Navigation | Deep Linking |
|---|---|
| Starts *inside* the app | Starts *outside* the app |
| Triggered by in-app user actions | Triggered by an external notification/email/QR/link |
| Example: `router.push("/profile")` | Example: `myapp://profile/10` |
-e 

\newpage

# Part 3 — State Management: React Query & Redux Toolkit (Full Depth)

---

# A. React Query (TanStack Query) — Server State

## 1. The Core Distinction: Server State vs Client State

**Server State — definition:** data that comes from a backend server and can change *independently* of your application (someone else can update it at any time). Examples: products, orders, profile, notifications, comments. Managed by: **React Query**.

**Client State — definition:** data created and controlled entirely by the application itself. Examples: theme, language, modal visibility, selected tab, drawer open/closed. Managed by: `useState`, Context API, or Redux Toolkit.

**One-liner to remember:** *Server state needs synchronization with the backend because it can change outside the app; client state exists only inside the app and never needs backend sync.*

**One-liner for the whole library:** *React Query manages server state, while Redux manages client state.*

## 2. QueryClient — the "brain"

**Definition:** the central manager of React Query — it stores and manages all queries and their cache.

**Responsibilities:**
- Cache management
- Retry logic
- Background refetch
- Query lifecycle
- Synchronization across components

```js
const queryClient = new QueryClient();
```

## 3. QueryClientProvider

**Definition:** a React Context provider that makes the single `QueryClient` instance available to the entire application.

```jsx
<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>
```
Directly analogous to Redux's `<Provider store={store}>`.

## 4. useQuery() — reading data

```js
const result = useQuery({
  queryKey: ["posts"],
  queryFn: getPosts,
});
```
**Handles automatically:** fetching, loading state, error state, retries, caching, refetching.

**Interview one-liner:** *useQuery replaces most manual `useState` + `useEffect` + `fetch` boilerplate.*

### queryKey
**Definition:** a unique identifier React Query uses to store and retrieve cached data.
```js
["posts"]                 // static key
["products", productId]   // dynamic key — a different id = a different cache entry
```
**Why must keys be unique?** React Query identifies cached data purely by the key — duplicate or incorrect keys can cause the wrong (or stale) data to be returned for a screen.

### queryFn
**Definition:** the function responsible for actually fetching data — usually calling into your dedicated API layer, never calling `fetch()` directly inside the screen component.
```js
queryFn: getPosts   // getPosts lives in your services/postApi.js
```

### The full React Query flow
```
Component
   ↓
useQuery()
   ↓
QueryClient
   ↓
Check Cache
   ↓
 YES → Return Cached Data (instantly)
   │
 NO  → queryFn() → API Layer → Server → Store in Cache → Update UI
```

## 5. Cache, Fresh Data, and Stale Data

### Cache
**Definition:** temporary storage where React Query keeps fetched server data to avoid unnecessary network requests.
```
Server → React Query → Cache → UI
```
**Example:** first `GET /posts` hits the server and populates the cache. A second identical `GET /posts` request returns straight from the cache — **no API call**.

### Fresh Data
**Definition:** data React Query still considers up-to-date. While fresh, **no** refetch happens; it's simply returned from cache.
```
staleTime = 5 minutes
10:00 → Fetch Posts → Cached
10:03 → Still Fresh → Return Cache (no request)
```

### Stale Data
**Definition:** cached data that *may* be outdated. React Query can still show it **immediately** while optionally refetching newer data **in the background**.
```
10:00 → Fetch → Cache
10:06 → Data becomes Stale
   UI: shows cached data instantly
   Background: calls the API
   If new data arrives → updates UI automatically (no loading spinner shown to the user)
```

## 6. staleTime [TOP PRIORITY] — the most-asked React Query topic

**Definition:** how long cached data is considered fresh.

```js
useQuery({
  queryKey: ["posts"],
  queryFn: getPosts,
  staleTime: 60000,   // 60 seconds
});
```
**Meaning:** for 60 seconds after a successful fetch, React Query says *"do NOT refetch — just use the cache."*

```
0s  → Fetch API → Cache
30s → Fresh → Return Cache
60s → Still Fresh
61s → Now Stale
```

**Default: `staleTime = 0`.** Data is *immediately* considered stale after fetching.

**Does `staleTime: 0` mean React Query instantly refetches?** [NO] **No.** It means that *whenever an opportunity arises* — the screen regains focus, the query component remounts, the network reconnects — React Query **may** refetch, because the data is already flagged stale. It does not proactively poll every millisecond.

## 7. Background Refetch [HIGH PRIORITY]

**Definition:** updates stale data **without blocking the UI** — the user sees the (possibly slightly outdated) cached data instantly, while a fresh fetch happens quietly behind the scenes, and the UI updates automatically if new data arrives.

```
Cache Exists → Show Cache Immediately → Call API in background → New Data? → Yes → Update Cache → UI Updates Automatically
```

**Instagram-feed analogy:** open the app → posts appear instantly (from cache) → behind the scenes, React Query checks for new posts → feed updates seamlessly. The user never sees a loading state for data they've already seen before — this is what makes React-Query-powered apps *feel* instant.

## 8. gcTime (formerly `cacheTime`)

React Query v5 renamed `cacheTime` to `gcTime` (**G**arbage **C**ollection **T**ime).

**Definition:** how long **unused** cached data stays in memory before being removed.

```js
useQuery({ ..., gcTime: 300000 });   // 5 minutes
```
```
Open Home → Fetch Posts → Cache
Leave Screen → Nobody is using "posts" anymore
Wait 5 minutes → Cache deleted
```
If the user returns to that screen within 5 minutes, the existing cache is reused instantly. After 5 minutes with no active observers, the cache entry is garbage-collected and the next visit triggers a fresh fetch.

### staleTime vs gcTime [TOP PRIORITY] (confuses almost everyone)

| `staleTime` | `gcTime` |
|---|---|
| Controls **freshness** | Controls **memory lifetime** |
| "Can I trust this data right now?" | "Can I keep this data around at all?" |
| Affects whether a **refetch** happens | Affects whether the cache entry is **deleted** |

```
API → Cache → Fresh → (staleTime elapses) → Stale → (no one is using it) → Unused → (gcTime elapses) → Deleted
```
They are independent settings — you can have data that's stale (should refetch on next opportunity) but not yet garbage-collected (still instantly available while the refetch happens), or vice versa.

## 9. Request Deduplication [HIGH PRIORITY]

**Definition:** React Query prevents multiple identical in-flight requests for the **same queryKey** from firing simultaneously — if three components on screen all call `useQuery({ queryKey: ["posts"] })` at the same moment, only **one** network request goes out, and all three components share the result.

## 10. useMutation() — writing data

**Definition:** a hook used to **create, update, or delete** server data — unlike `useQuery` (which reads), `useMutation` writes.

| Hook | Purpose | HTTP Methods |
|---|---|---|
| `useQuery` | Fetch data | GET |
| `useMutation` | Modify data | POST, PUT, PATCH, DELETE |

### Basic flow
```
Button Click → useMutation → API Layer → Server → Success → Update UI (fast, since it's a targeted write)
```
```js
const mutation = useMutation({ mutationFn: createPost });

async function createPost(data) {
  return fetch("/posts", { method: "POST", body: JSON.stringify(data) });
}

mutation.mutate({ title: "React Query" });
```

### Mutation states
```js
const { mutate, isPending, error, isSuccess } = useMutation(...);
```
| Property | Purpose |
|---|---|
| `mutate` | Executes the mutation |
| `isPending` | Mutation currently in progress |
| `error` | The request failed |
| `isSuccess` | Completed successfully |

## 11. Query Invalidation

**Definition:** marks cached data as **outdated**, telling React Query to fetch fresh data.
```js
queryClient.invalidateQueries({ queryKey: ["products"] });
```
**Does `invalidateQueries` delete the cache?** [NO] No — it marks the query as stale and triggers a refetch based on React Query's lifecycle; the old data typically stays visible until the fresh data arrives (no flash of empty content).

**Typical flow after a mutation:**
```
User Action → useMutation → Server Update → Invalidate Query → useQuery Refetch → New Cache → Updated UI
```

## 12. Optimistic Updates

**Definition:** updates the UI **immediately**, before the server confirms success, assuming the request will succeed — if it fails, the UI is rolled back. Used for likes, toggles, and other actions where near-instant feedback matters more than waiting for round-trip confirmation.

## 13. React Query vs Redux — Final Comparison

| React Query | Redux Toolkit |
|---|---|
| Server State | Client State |
| API Data | UI State |
| Caching built-in | Manual state management |
| Auto Refetch | Manual updates |
| Retry built-in | No retry |
| Syncs with backend | No backend awareness |

**Can React Query replace Redux?** No. React Query manages server state; Redux manages client state — they solve different problems and are commonly used *together* in the same app.

## 30-Second Senior Interview Summary
> *"React Query is a server-state management library. It uses a QueryClient to manage cached data, exposed to the app via QueryClientProvider. Components fetch data using useQuery, where queryKey uniquely identifies the cached entry and queryFn defines how to fetch it. staleTime controls how long data is trusted before a background refetch may happen; gcTime controls how long unused cache stays in memory before deletion. useMutation handles writes, and invalidateQueries tells React Query to refresh affected data afterward. It complements Redux — Redux still owns pure client/UI state."*

---

# B. Redux Toolkit — Client State

## 1. The Core Flow (memorize this diagram)
```
useSelector()
     ▲
     │
Redux Store
     ▲
     │
Reducer
     ▲
     │
Action
     ▲
     │
dispatch()
     ▲
     │
Button Click
```
Read top-down as: *a Button Click calls `dispatch()`, which sends an Action, which the Reducer processes to update the Store, which `useSelector()` reads, causing the UI to re-render.*

## 2. What is Redux?

**Definition:** a state management library used to store and manage application-wide (global) state in a single centralized store.

## 3. Store

**Definition:** the central place where Redux keeps your application's global state.
```
Component → dispatch(Action) → Reducer → Store Updated → useSelector() → UI Updates
```

## 4. `<Provider>`

**Definition:** makes the Redux Store available to every component in the app (wraps the root, same pattern as `QueryClientProvider`).

```jsx
<Provider store={store}>
  <App />
</Provider>
```

### Quick definitions
| Term | Definition |
|---|---|
| Store | Central place Redux stores global state |
| `configureStore()` | Creates and configures the Redux Store |
| `Provider` | Makes the Store available to all components |
| `reducer` | Collection of all slices in the Store |

## 5. Slice

**Definition:** a portion (piece) of the Redux Store that manages related state and logic together.

**Why slices?** Without them, everything lives flat in one giant reducer — `count`, `user`, `cart`, `theme`, `language`, `notifications`, `wishlist` all mixed together, hard to maintain.

With slices, each concern is isolated:
```
Redux Store
  Counter Slice   → count
  Auth Slice      → user, token
  Cart Slice      → products
  Theme Slice     → darkMode
```

```js
const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => { state.count += 1; },
    addAmount: (state, action) => { state.count += action.payload; },
  },
});
```
- **`createSlice()`** — creates a Slice, its Reducer, and its Action creators automatically (no need to hand-write action type strings or switch statements).
- **`initialState`** — the Slice's default state.
- **`reducers`** — functions describing *how* the state updates in response to each action. Note: `state.count += 1` looks like direct mutation, but Redux Toolkit uses **Immer** under the hood, which safely translates this into an immutable update — this is *only* safe inside a `createSlice` reducer, never elsewhere in your app.

| Code | Purpose |
|---|---|
| `const counterSlice = createSlice()` | The JS variable holding the slice object |
| `name: "counter"` | Slice name, used to auto-generate action types (`counter/increment`) |
| `counterSlice.reducer` | The reducer function created by `createSlice()` |
| `counter: counterReducer` | The key inside the Redux Store — accessed as `state.counter` |

## 6. Action

**Definition:** an instruction sent to Redux to update the state.

```js
// useDispatch() — hook to access dispatch()
const dispatch = useDispatch();
dispatch(increment());   // increment() is an auto-generated action creator from createSlice()
```
| Term | Definition |
|---|---|
| Action | An instruction sent to Redux to update the state |
| `useDispatch()` | Hook giving access to `dispatch()` |
| `dispatch()` | Sends an action to the Redux Store |
| `increment()` | Auto-generated action creator |
| Reducer | Updates the state based on the received action |

```
Button → dispatch(increment()) → Store Updated → useSelector() → UI Re-renders → Count: 1
```

## 7. useSelector() — reading from the store

**Definition:** a hook used to read data from the Redux Store.
```
Redux Store → useSelector() → Component → UI
```

```js
import { useSelector } from "react-redux";
const count = useSelector((state) => state.counter.count);
```

**Breaking it down:**
- `state` → the *entire* Redux Store. If the store currently looks like:
```js
{ counter: { count: 0 } }
```
- `state.counter` → `{ count: 0 }` (the Counter Slice specifically).
- `state.counter.count` → `0` (the actual value).

The component **automatically re-renders** whenever the selected value (`state.counter.count`) changes — this is the "subscription" mechanism `useSelector` provides. Selecting a narrow, specific piece of state (instead of the whole slice) minimizes unnecessary re-renders.

## 8. Payload

**Definition:** the data sent along with an Action to update the Redux Store — think of it as a parcel traveling with the instruction.

```js
dispatch(action(payload))
   → Action { type: "...", payload: ... }
      → Reducer reads action.payload
```

**Payload can be anything:**
```js
dispatch(addAmount(50));                                      // Number
dispatch(updateName("Vignesh"));                               // String — reducer: state.name = action.payload;
dispatch(updateUser({ id: 1, name: "Vignesh", email: "..." })); // Object ⭐ most common
dispatch(setProducts(products));                               // Array — reducer: state.products = action.payload;
```

**Real production examples:**
```js
// Login
dispatch(setUser(user));   // payload: { id: 1, name: "Vignesh", token: "abc123" }

// Cart
dispatch(addToCart(product));   // payload: { id: 100, title: "iPhone", price: 80000 }

// Theme
dispatch(changeTheme("dark"));   // payload: "dark"
```

### Full trace of a payload dispatch
```
Button Click
  → dispatch(addAmount(10))
    → Action: { type: "counter/addAmount", payload: 10 }
      → Reducer reads action.payload → 10
        → count += 10
          → Store Updated → UI Updated
```

## 9. Multiple Slices

**Definition:** dividing Redux state into feature-based modules — `authSlice` (authentication), `themeSlice` (app theme), `counterSlice` (counter), each independent, combined in the **Root Store**:
```js
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});
```

## 10. createAsyncThunk — async logic in Redux

**Definition:** a Redux Toolkit utility for handling asynchronous operations (like API calls) inside the Redux flow.

```js
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await api.get("/users");
  return response.data;
});
```
Automatically dispatches three lifecycle action types:
| State | Meaning |
|---|---|
| `pending` | API request started |
| `fulfilled` | API request completed successfully |
| `rejected` | API request failed |

**`extraReducers`** — handles actions created *outside* the slice's own `reducers` block, which is exactly what async thunk lifecycle actions are:
```js
extraReducers: (builder) => {
  builder
    .addCase(fetchUsers.pending, (state) => { state.loading = true; })
    .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
    .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
}
```

## 11. Redux Persist

**Definition:** saves the Redux Store into device storage and restores it automatically when the app restarts.

```
Login → Redux Store → Redux Persist → AsyncStorage → Close App → Open App → Read AsyncStorage → Restore Redux Store → User Still Logged In
```

**Installation:**
```
npm install redux-persist
npx expo install @react-native-async-storage/async-storage
```

**`PersistGate`** — delays rendering the app until the persisted Redux data has finished being restored (prevents a flash of "logged out" state before rehydration completes).

**Rehydration** — the process of restoring previously-persisted data back into the live Redux Store on app start.

| Term | Definition |
|---|---|
| Redux Persist | Saves store to device storage, restores on restart |
| `persistReducer()` | Wraps a reducer to make its state persistent |
| `persistStore()` | Starts the persistence process |
| `PersistGate` | Delays rendering until persisted state is restored |
| Rehydration | Restoring persisted state back into the store |

## Interview Cheat Table — Redux Toolkit Terms
| Term | One-line definition |
|---|---|
| Store | Central global state container |
| Slice | Feature-scoped chunk of state + reducers |
| Action | Instruction to update state |
| Payload | Data traveling with an action |
| Reducer | Pure function computing new state from action |
| `dispatch()` | Sends an action to the store |
| `useSelector()` | Reads a piece of state, subscribes to its changes |
| `createAsyncThunk` | Handles async logic (API calls) inside Redux |
| `extraReducers` | Handles actions from outside the slice (thunks) |
| Redux Persist | Saves/restores store across app restarts |
-e 

\newpage

# Part 4 — TypeScript, Production Architecture & Storage (Full Depth)

---

# A. TypeScript for React Native

## 1. Why TypeScript in React Native?
Plain JavaScript won't catch type mistakes until runtime (e.g., passing a string where a number was expected). TypeScript catches these **at compile time**, in your editor, before the app ever runs — critical once a codebase and team grow past a few screens.

## 2. Variables & Types
```ts
const age: number = 22;
const name: string = "Vignesh";
const isLoggedIn: boolean = true;
```
**Definition — Type:** describes *what kind* of value a variable is allowed to hold, and TypeScript enforces it at compile time.

## 3. Type Inference
**Definition:** TypeScript automatically figures out a variable's type from its assigned value, without you writing an explicit annotation.
```ts
const age = 22;    // TS infers: number — same as writing `const age: number = 22`
```
You don't *need* to annotate every single variable — inference handles the obvious cases, and explicit types are reserved for function signatures, props, and anything ambiguous.

## 4. Arrays
```ts
const ids: number[] = [1, 2, 3];
const names: string[] = ["Vignesh", "Kumar"];
```

## 5. Objects
```ts
const user: { id: number; name: string } = { id: 1, name: "Vignesh" };
```
Writing the shape inline gets unwieldy fast — this is exactly the problem `type`/`interface` solve.

## 6. `type` — Type Alias
**Definition:** a custom name (alias) for a specific shape or type.
```ts
type User = { id: number; name: string; email: string };
const user: User = { id: 1, name: "Vignesh", email: "abc@gmail.com" };
```

## 7. `interface`
**Definition:** a blueprint describing the shape an object must follow.
```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

### `type` vs `interface`
| `type` | `interface` |
|---|---|
| Can represent unions, primitives, tuples, and object shapes | Primarily for describing object shapes |
| Cannot be re-opened/merged after declaration | Can be extended/merged (`interface User { age: number }` twice merges) |
| Common convention: unions, function types, utility compositions | Common convention: component props, API response shapes |

**Practical rule:** default to `interface` for props/data models; reach for `type` when you need a union or to alias a primitive/function signature.

## 8. Optional Properties
**Definition:** a property that may or may not be present on an object, marked with `?`.
```ts
interface User {
  id: number;
  name: string;
  age?: number;   // optional — some users may not have provided their age
}
```
Trying to access `user.age` where it might be `undefined` should be guarded (`user.age ?? "N/A"`), or TypeScript will flag potential `undefined` access depending on your `strict` settings.

## 9. Union Types
**Definition:** a variable that can hold *one of several* specified types.
```ts
let id: string | number;
id = "abc123";   // [YES] valid
id = 42;          // [YES] valid
id = true;         // [NO] TypeScript error
```
Extremely common for API responses where an ID might come back as either a string or a number depending on the backend, or for representing loading/error/success states as a union of string literals: `type Status = "idle" | "loading" | "success" | "error";`

## 10. `null` and `useState<T | null>`
```ts
const [user, setUser] = useState<User | null>(null);
```
This says: *"`user` is either a full `User` object, or explicitly `null` (meaning 'not loaded yet')."* Very common pattern for data that starts empty before an API call resolves — forces you to null-check before rendering fields (`user?.name`).

## 11. `any` vs `unknown`
```ts
let data: any;       // disables type checking entirely — TypeScript stops helping you here
let data2: unknown;  // "I don't know the type yet" — but SAFE, must be narrowed before use
```
**Why `unknown` is safer than `any`:**
```ts
let data: unknown = fetchSomething();
data.toUpperCase();               // [NO] TS error — must narrow first
if (typeof data === "string") {
  data.toUpperCase();              // [YES] now TS knows it's a string
}
```
`any` is essentially "turn TypeScript off" for that value — avoid it in production code except as a last resort (e.g., interfacing with an untyped third-party library).

## 12. Generics `<T>`
**Definition:** a placeholder type that lets a function, hook, or component stay flexible while still being fully type-checked.

```ts
const [user, setUser] = useState<User | null>(null);     // generic on useState
const inputRef = useRef<TextInput>(null);                 // generic on useRef
```
Without the generic, `useState(null)` would be inferred simply as `null` forever, and TypeScript would complain the moment you tried to assign a `User` object to it later. The `<User | null>` generic tells TypeScript up front what shapes this state can legally take.

Other RN generics you'll see constantly: `Promise<User>` (an async function that eventually resolves to a `User`), `AxiosResponse<User>`, `FlatList<User>` (typing the `data`/`renderItem` for a specific item shape), custom hooks like `useFetch<T>(url: string): { data: T | null }`.

## 13. Functions
```ts
function add(a: number, b: number): number {
  return a + b;
}
```
The `: number` after the parameter list is the **return type** annotation — TypeScript will flag it if the function body doesn't actually return a number.

## TypeScript Quick Reference Table
| Concept | One-line definition | Example |
|---|---|---|
| Type | What kind of value is allowed | `string`, `number`, `boolean` |
| Type inference | TS figures out the type automatically | `const age = 22` → inferred `number` |
| Array | Typed list | `number[]`, `string[]` |
| Object | Key-value structure with typed fields | `{ id: number; name: string }` |
| `type` | Custom alias for a type/shape | `type User = {...}` |
| `interface` | Blueprint for an object's shape | `interface User {...}` |
| Optional (`?`) | Property may be missing | `age?: number` |
| Union (`\|`) | One of several allowed types | `string \| number` |
| `null` | Explicitly no value yet | `User \| null` |
| `any` | Disables type checking (avoid) | last resort only |
| `unknown` | Unknown, must be narrowed before use | safer than `any` |
| Generics `<T>` | Reusable, flexible, still type-safe | `useState<User \| null>(null)` |

---

# B. Production Architecture

## 1. Why Architecture Matters
A small demo app can survive with everything dumped into one folder. A production app with dozens of screens, a design system, multiple environments, and a growing team needs a structure where **finding and changing code is fast and predictable** — that's what "architecture" really buys you.

## 2. Folder Structure Approaches

| Structure | Description | Best for |
|---|---|---|
| **Type-based** | Group by *kind* of file: `components/`, `screens/`, `hooks/`, `services/` | Learning, very small apps |
| **Feature-based** ⭐ | Group by *feature*: everything about "Login" lives together | Most production React Native apps |
| **Domain-based** | Group by business domain, often across multiple teams/repos | Very large enterprises (Amazon/Uber scale) |

### Why feature-based wins for most production apps
With type-based structure, fixing a bug in the Login flow means jumping between `components/LoginForm.js`, `screens/LoginScreen.js`, `hooks/useLogin.js`, and `services/authApi.js` — four different folders for one feature. With feature-based structure, it's all in `features/authentication/`.

```
src/
├── assets/                  # images, fonts, icons
├── components/               # shared/reusable UI (Button, Card, Input)
├── features/
│   └── authentication/
│       ├── components/       # LoginForm, SignupForm
│       ├── hooks/             # useLogin, useAuthStatus
│       ├── services/          # authApi.js
│       ├── screens/           # LoginScreen, SignupScreen
├── navigation/                # navigators / route config
├── services/                   # global API client (apiClient.js)
├── hooks/                       # app-wide reusable hooks
├── constants/                    # colors, spacing, static config
├── utils/                         # formatDate, validateEmail, etc.
├── config/                         # env.js, app-wide constants
├── store/                           # Redux store + slices
├── theme/                            # design tokens, light/dark themes
├── types/                             # shared TypeScript types
└── App.tsx
```

## 3. Environment Variables

**Why?** The API base URL (and other config) differs across dev/staging/production — hardcoding it means editing code every time you switch environments, and risks accidentally shipping a dev URL to production.

```
# .env
EXPO_PUBLIC_API_URL=https://dev-api.company.com
```
```ts
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
```
**Why the `EXPO_PUBLIC_` prefix specifically?** Expo only injects environment variables into the JS bundle if they're prefixed this way — this is a deliberate safety boundary: anything *not* prefixed stays out of the client bundle entirely, preventing accidental leakage of server-only secrets into a bundle that ships to every user's phone (and is trivially inspectable).

**Critical security point:** never put real secrets (database passwords, JWT *signing* secrets, third-party API secret keys) in the app's `.env` — the compiled app bundle can be unpacked and read by anyone. Secrets belong exclusively on the backend server; the app only ever holds short-lived tokens issued *after* authenticating with the backend.

## 4. API Layer Pattern (Service Layer)

**The anti-pattern:**
```jsx
// [NO] fetch() scattered directly inside screens
function HomeScreen() {
  useEffect(() => {
    fetch("https://api.company.com/posts", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(setPosts);
  }, []);
}
```
Problems: the URL, headers, and error handling are duplicated in every screen that needs data; changing the base URL or adding a new header means hunting through every screen file.

**The layered pattern:**
```
apiClient.js  (base URL, default headers, generic error handling)
   ↓
postApi.js  (feature-specific endpoints — getPosts, createPost)
   ↓
HomeScreen.js  (calls getPosts(), has zero knowledge of URLs or headers)
```
```js
// apiClient.js
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

// postApi.js
import { apiFetch } from "./apiClient";
export const getPosts = () => apiFetch("/posts");
export const createPost = (data) =>
  apiFetch("/posts", { method: "POST", body: JSON.stringify(data) });

// HomeScreen.js
import { getPosts } from "../features/posts/services/postApi";
const posts = await getPosts();   // no URL, no headers, no fetch() visible here at all
```
**Benefits:** one place to add the auth header (Axios interceptor or `apiFetch` wrapper), one place to add retry/timeout logic, easy to swap environments, and the service functions are independently testable without rendering any UI.

## 5. Authentication Flow

**Terminology:**
- **Authentication** — verifying *who* someone is (logging in with credentials).
- **Authorization** — determining *what* an authenticated user is allowed to do (roles/permissions).
- **Access Token** — a short-lived credential (usually a JWT) sent with every subsequent request to prove the user is authenticated, without re-sending the password every time. Kept short-lived deliberately, so that if it's ever leaked, the exposure window is small.
- **Refresh Token** — a longer-lived credential used to silently request a *new* access token once the old one expires, without forcing the user to log in again.

### Login flow
```
User enters credentials
   → API call to /login
     → Success
       → Store access token in SecureStore (encrypted)
       → Store user profile in Redux
       → Navigate to Home
```

### App restart flow (session persistence)
```
App opens
   → Read token from SecureStore
     → Token exists?
        Yes → validate/restore session → navigate to Home (user appears "still logged in")
        No  → navigate to Login
```

### Token refresh flow (production pattern)
```
API call fails with 401 (access token expired)
   → Axios response interceptor catches it
     → Call /refresh-token using the stored refresh token
       → Success → store new access token → retry the original failed request
       → Failure → refresh token itself is invalid/expired → clear storage → force Login
```

---

# C. Storage — AsyncStorage vs SecureStore

| AsyncStorage | Expo SecureStore |
|---|---|
| **Not encrypted** — plain key-value storage | **Encrypted** — backed by Android Keystore / iOS Keychain |
| Good for: theme, language, onboarding-seen flag, non-sensitive UI preferences, general cache | Good for: access tokens, refresh tokens, anything sensitive |
| Larger storage capacity, simpler API | Smaller capacity, slightly slower (encryption overhead) — reserved for genuinely sensitive data |

### AsyncStorage usage
```js
import AsyncStorage from "@react-native-async-storage/async-storage";

await AsyncStorage.setItem("theme", "dark");
const theme = await AsyncStorage.getItem("theme");
await AsyncStorage.removeItem("theme");
```

### SecureStore usage
```js
import * as SecureStore from "expo-secure-store";

await SecureStore.setItemAsync("accessToken", token);
const token = await SecureStore.getItemAsync("accessToken");
await SecureStore.deleteItemAsync("accessToken");   // called on logout
```

**Golden rule:** never store passwords, OTPs, or raw payment/card details on-device *at all* — under any storage mechanism. On-device storage should only ever hold tokens *issued after* a successful authentication, never the credentials themselves.
-e 

\newpage

# Part 5 — Native Features, Performance, Testing & Debugging (Full Depth)

---

# A. Native Device Features (Expo)

## 1. The Universal Permission Pattern
Nearly every Expo native module follows the same naming and flow convention — once you learn one, you basically know them all:
```js
const { status } = await Module.requestXPermissionsAsync();
if (status !== "granted") {
  // show a friendly explanation, don't just silently fail
  return;
}
// proceed with the feature
```
```
App requests permission
   → OS shows a native permission dialog
     → User Allows or Denies
       → status: "granted" | "denied" | "undetermined"
```
**Best practice:** always check the returned `status` before using the feature, and show a clear in-app explanation of *why* the permission is needed *before* triggering the OS prompt (improves grant rates and avoids confused users hitting "Deny" reflexively).

## 2. Camera & Image Picker

```js
import * as ImagePicker from "expo-image-picker";

const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
if (status !== "granted") return;

const result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: true,
  quality: 0.7,     // compress before upload — smaller payloads, faster uploads
});

if (!result.canceled) {
  const asset = result.assets[0];   // { uri, width, height, fileName, mimeType, fileSize }
  // validate before uploading
  if (asset.fileSize > 5_000_000) { /* too large, warn user */ }
}
```
**Why check `result.canceled` first?** If the user backs out of the picker without selecting anything, `result.assets` may be empty/undefined — accessing `result.assets[0]` unconditionally risks a crash.

Similarly, `expo-camera`'s `Camera.requestCameraPermissionsAsync()` follows the exact same shape for direct camera capture instead of picking from the library.

## 3. File System

```js
import * as FileSystem from "expo-file-system";

// documentDirectory → PERMANENT storage, survives app restarts
// cacheDirectory     → TEMPORARY storage, OS may clear it under storage pressure
const fileUri = FileSystem.documentDirectory + "profile.json";

await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
const content = await FileSystem.readAsStringAsync(fileUri);
const info = await FileSystem.getInfoAsync(fileUri);    // { exists, size, uri }
await FileSystem.deleteAsync(fileUri);
await FileSystem.downloadAsync(remoteUrl, fileUri);       // download a remote file to disk
```

## 4. Sharing

```js
import * as Sharing from "expo-sharing";

if (await Sharing.isAvailableAsync()) {
  await Sharing.shareAsync(fileUri);
}
```
**Why check `isAvailableAsync()` first?** Sharing isn't guaranteed to be available on every platform/device configuration — checking avoids a hard failure and lets you show a fallback ("Copy link" button) instead. `shareAsync()` opens the native OS Share Sheet, listing whichever installed apps (Messages, WhatsApp, Mail, etc.) can handle the given file type.

## 5. Notifications

**Local vs Push:**
| Local Notification | Push Notification |
|---|---|
| Created and scheduled directly on-device | Sent from a **backend server** via FCM (Android) / APNs (iOS) |
| No server/internet required | Requires a device push token + server infrastructure |
| Example: a reminder timer set inside the app | Example: "Your order has shipped!" |

```js
import * as Notifications from "expo-notifications";

await Notifications.requestPermissionsAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Schedule a LOCAL notification
await Notifications.scheduleNotificationAsync({
  content: { title: "Reminder", body: "Don't forget to check in!" },
  trigger: { seconds: 60 },
});

// Listen for the user tapping a notification (local or push)
Notifications.addNotificationResponseReceivedListener((response) => {
  const screen = response.notification.request.content.data?.screen;
  // navigate to `screen` — this is how deep-linking-from-notification works
});
```
For push notifications, the app registers for a device token (`Notifications.getExpoPushTokenAsync()`), sends that token to your backend, and the backend later calls Expo's/FCM's/APNs' push service with that token to trigger a delivery.

## 6. Location

```js
import * as Location from "expo-location";

const { status } = await Location.requestForegroundPermissionsAsync();
if (status !== "granted") return;

const location = await Location.getCurrentPositionAsync();
const { latitude, longitude } = location.coords;

// Convert coordinates → human-readable address
const [address] = await Location.reverseGeocodeAsync({ latitude, longitude });
```
**Foreground vs background location:**
| Foreground | Background |
|---|---|
| Tracked only while the app is open/active | Tracked even while the app is backgrounded |
| Standard `requestForegroundPermissionsAsync()` | Requires an *additional* `requestBackgroundPermissionsAsync()` and extra platform justification during store review |

## 7. Deep Linking (recap from Navigation section)
`myapp://profile/25` (custom scheme, only works if the app is installed) vs `https://myapp.com/profile/25` (Universal/App Link — opens the app if installed, else falls back to the website). Notifications, QR codes, emails, and SMS are all common *sources* of deep links into the app.

---

# B. Performance Optimization

## 1. The Performance Mental Model
```
Performance
├── Avoid unnecessary re-renders     → React.memo / useMemo / useCallback
├── Optimize lists                    → FlatList virtualization, stable keys, getItemLayout
├── Optimize images                    → caching, correct sizing, expo-image
├── Cache API calls                     → React Query (staleTime, background refetch)
└── Native-level optimizations           → Hermes bytecode precompilation, New Architecture (JSI/Fabric)
```

**FPS (Frames Per Second):** the standard measure of UI smoothness.
| FPS | Perceived quality |
|---|---|
| 60fps | Smooth, ideal |
| 30fps | Noticeable lag |
| 15fps and below | Poor, janky UX |

**Reconciliation:** React's process of comparing the previous virtual UI tree to the new one after a state/prop change, and updating **only** the parts of the real UI that actually differ — this is why React is efficient even though components conceptually "re-render" often; the *actual* native view updates are minimized.

## 2. React.memo + useMemo + useCallback Working Together (worked example)

```jsx
const Row = React.memo(function Row({ item, onPress }) {
  console.log("Row render:", item.id);
  return (
    <Pressable onPress={() => onPress(item.id)}>
      <Text>{item.name}</Text>
    </Pressable>
  );
});

function UserList({ users }) {
  const handlePress = useCallback((id) => {
    console.log("Pressed user", id);
  }, []);   // stable reference — never changes across re-renders

  return (
    <FlatList
      data={users}
      keyExtractor={(u) => u.id.toString()}
      renderItem={({ item }) => <Row item={item} onPress={handlePress} />}
    />
  );
}
```
**Why this actually works:** `handlePress` is created once (stable reference via `useCallback`) and passed down unchanged on every parent re-render. `Row` is wrapped in `React.memo`, so as long as `item` and `onPress` are referentially the same as last time, that specific row skips re-rendering — even if a sibling row's data changed, or the parent re-rendered for an unrelated reason.

**The classic trap that defeats this:**
```jsx
<Row item={item} onPress={() => handlePress(item.id)} />   // [NO] new inline arrow function every render
```
Even with `handlePress` itself memoized, wrapping it in a fresh arrow function inline creates a **new function reference** every single render, so `React.memo`'s shallow prop comparison always sees a "changed" prop and re-renders anyway. The fix (as in the example above) is to pass the stable `handlePress` reference directly and let `Row` itself call `onPress(item.id)` using the `item` it already has in scope.

## 3. FlatList Optimization Checklist
- **`keyExtractor`** — must return a stable, unique string (`item.id.toString()`), never the array index.
- **`getItemLayout`** — for lists where every row has a fixed, known height, precompute layout so FlatList can skip the (relatively expensive) dynamic measurement pass:
```js
<FlatList
  getItemLayout={(data, index) => ({ length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index })}
/>
```
- **`initialNumToRender`** — how many items render on first mount (lower = faster initial paint, but more items to render as the user scrolls quickly).
- **`maxToRenderPerBatch`** / **`windowSize`** — tune how aggressively FlatList renders ahead of/behind the visible viewport; the defaults are reasonable, but very long/complex-row lists sometimes benefit from tuning these down.
- Wrap the row component in `React.memo` so a parent-level state change (e.g., a header counter updating) doesn't cascade into re-rendering every visible row.

## 4. Image Optimization
- Use `expo-image` instead of the core `Image` component for automatic memory + disk caching and smoother perceived loading (blurhash/placeholder support).
- Resize/compress images **before** upload (`quality: 0.7` in ImagePicker, or server-side resizing) rather than shipping full-resolution photos over the network.
- Prefer modern formats (WebP) where supported.
- FlatList's virtualization already gives you "lazy loading" of off-screen images essentially for free — you don't usually need a separate lazy-load library for list thumbnails.

## 5. Accessibility (A11y)
Ensuring the app is usable with screen readers (VoiceOver on iOS, TalkBack on Android), larger system font sizes, and sufficient color contrast/touch-target sizing. Often skipped in interviews' focus on "performance," but real production apps (and app store guidelines) increasingly require it.
```jsx
<Pressable accessibilityRole="button" accessibilityLabel="Add to cart">
  <Icon name="cart" />
</Pressable>
```

## 6. Error Boundaries

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    // send to Crashlytics/Sentry here
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Something went wrong.</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```
**What Error Boundaries catch:** render-phase (rendering/lifecycle) errors thrown by *child components* during rendering.

**What they do NOT catch (a very common interview trap):**
- Errors inside `setTimeout`/`setInterval` callbacks.
- Errors inside async code (`fetch`/`axios` failures, `await` rejections).
- Errors thrown inside event handlers (`onPress={() => { throw ... }}`).
- Errors in the Error Boundary component itself.
- Native crashes.

For all of those, you need explicit `try/catch` blocks and dedicated crash-reporting SDKs.

## 7. Crash Reporting (Firebase Crashlytics / Sentry)

```
App crashes
   → SDK captures: device model, OS version, app version, full stack trace
     → Uploads the report to the dashboard
       → Developer reviews and fixes the root cause
         → Monitors "crash-free users %" after the next release
```
**Best practices:** upload debug symbols / source maps so minified/production stack traces remain readable; set up alerting on crash-rate spikes right after a release so you can hotfix or roll back quickly.

---

# C. Testing

## 1. Jest — Unit Testing

**What to test:** pure business logic — reducers, utility functions, formatting helpers, validation logic.
**What NOT to test:** React Native internals, well-tested third-party libraries.

```js
// sum.js
export const sum = (a, b) => a + b;

// sum.test.js
test("adds two numbers", () => {
  expect(sum(2, 3)).toBe(5);
});
```
Common matchers: `toBe` (primitive equality), `toEqual` (deep object/array equality), `toHaveLength`, `toBeDefined`, `toBeNull`, `toThrow`.

```js
// Testing a reducer directly (no UI involved)
import counterReducer, { increment } from "./counterSlice";

test("increment increases count by 1", () => {
  const state = counterReducer({ count: 0 }, increment());
  expect(state.count).toBe(1);
});
```

## 2. React Native Testing Library (RNTL) — Component Testing

**Philosophy:** test components the way a *user* actually interacts with them (what's on screen, what happens when you tap something) — not internal implementation details (state variable names, which hook was called).

```js
import { render, fireEvent } from "@testing-library/react-native";
import Counter from "./Counter";

test("increments count on button press", () => {
  const { getByText } = render(<Counter />);
  fireEvent.press(getByText("Increase"));
  expect(getByText("1")).toBeTruthy();
});
```
Common APIs: `render()`, `fireEvent.press()`, `fireEvent.changeText()`, `getByText()`, `getByPlaceholderText()`, `queryByText()` (like `getByText` but returns `null` instead of throwing if not found — useful for asserting something is *absent*).

---

# D. Debugging

## 1. General Debugging Workflow
```
Bug reported → Reproduce it → Inspect (logs, breakpoints, network) → Identify root cause → Fix → Re-test → Verify in the original reported scenario
```
**Reporting bugs like an engineer, not a user:** be specific and quantify wherever possible — "Product listing page took ~2.8s to load images over Wi-Fi, versus ~0.9s on the Home screen" is actionable; "the app feels slow" is not. Always note: is it reproducible every time? Only on certain networks/devices? UI-only glitch, or a functional/data problem?

## 2. Core Debugging Tools
- `console.log` / `console.warn` / `console.error` — the simplest tool, still the most used.
- Breakpoints (VS Code debugger attached to the Metro/Hermes process) — pause execution and inspect variables live.
- **React DevTools** — inspect the component tree, current props/state/hooks of any component, without adding `console.log`s everywhere.
- **Network tab** (via Flipper or React Native DevTools) — inspect actual request/response payloads, headers, and status codes for every API call, essential for diagnosing "data isn't showing up" bugs.

## 3. ADB & Logcat — Native-Level Debugging (Android)

```bash
adb devices                        # list connected devices/emulators
adb logcat                          # stream live device logs
adb logcat -c                        # clear the log buffer
adb shell pm list packages            # list installed app packages
adb shell dumpsys package <name>       # detailed info about a specific package
adb shell dumpsys meminfo <name>        # memory usage for a specific package
```

**Log levels (lowest to highest severity):** Verbose < Debug < Info < Warning < Error (plus Assert/"What a Terrible Failure" for truly unexpected conditions).

**Recognizing a native crash in Logcat:** look for the literal string **`FATAL EXCEPTION: main`**, followed by a Java/Kotlin stack trace (e.g., `NullPointerException`, `IndexOutOfBoundsException`) — this tells you the crash happened on the Android main thread and gives you the exact class/line where it originated.

**Filtering Logcat effectively (Android Studio):** filter by `package:mine` (only your app's process), `level:error` (only errors, cutting noise), or `tag:<yourCustomTag>` if you've tagged your own native logs.

## 4. Flipper
Historically the standard cross-platform RN debugging tool, bundling: Logs viewer, Network inspector, Layout Inspector (visual element tree), a Database inspector, and Performance profiling, with React DevTools integration built in. Many production codebases still rely on it, though newer projects increasingly lean on **React Native DevTools** (bundled with recent RN versions) plus native platform profilers — **Android Studio Profiler** and **Xcode Instruments** — for deep native-level performance work (memory, CPU, GPU rendering).
-e 

\newpage

# Part 6 — React Native CLI, Android Internals, Deployment & Architecture (Full Depth)

*(Essential once you move beyond the Expo-managed workflow, or interview for CLI-heavy production roles)*

---

# A. Project Structure

```
MyApp/
├── android/          ← native Android project (Gradle, Kotlin/Java) — a full Android Studio project
├── ios/               ← native iOS project (Xcode, Swift/Obj-C, CocoaPods)
├── App.tsx            ← root React component — your actual app UI starts here
├── index.js            ← JS entry point
├── metro.config.js      ← bundler configuration
├── babel.config.js       ← transpiler configuration
├── package.json           ← JS dependencies & scripts
```

## `index.js` — the real entry point
```js
import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
```
**Why does native code never launch `App.tsx` directly?** Native Android/iOS code doesn't understand React components — it only knows how to start a JS engine and ask it to render *something registered under a known name*. `AppRegistry.registerComponent(appName, () => App)` is the handshake: it tells the native side "when you ask for the component named `appName`, here's the React tree to mount." The native `MainActivity`/`AppDelegate` then requests exactly that name.

## Metro vs Babel — a common point of confusion
| Metro | Babel |
|---|---|
| **Bundler** — resolves all your `import`s into a single (or split) JS bundle, serves it to the device, and powers Fast Refresh during development | **Transpiler** — converts modern JS/TS/JSX syntax into plain JS that the Hermes engine can actually execute |
| Answers: *"which files do I need, and in what order?"* | Answers: *"how do I turn this syntax into something runnable?"* |

They work together in the same pipeline but solve different problems — Metro doesn't "understand" JSX itself; it hands files to Babel for transformation as part of the bundling process.

## App Startup Flow (Android)
```
npx react-native run-android
   → Gradle builds the native project
     → Produces an APK
       → Installed on device/emulator
         → Launches MainActivity
           → MainActivity starts the Hermes JS engine
             → Hermes executes index.js
               → AppRegistry mounts App.tsx
                 → UI appears on screen
```

---

# B. Android Build System (Gradle)

```
android/
├── build.gradle              ← PROJECT-level config: SDK versions, Gradle plugin version, Kotlin version
├── app/
│   └── build.gradle           ← MODULE-level config: applicationId, versionCode, versionName, min/target/compileSdk
├── settings.gradle             ← declares which Gradle modules exist (usually just `:app`)
├── gradle.properties            ← global build flags — e.g. hermesEnabled=true, newArchEnabled=true
└── gradlew / gradlew.bat         ← the Gradle Wrapper — ensures every machine (and CI server) uses the exact same Gradle version
```

## Key `app/build.gradle` fields, explained
```gradle
android {
  defaultConfig {
    applicationId "com.company.myapp"
    minSdkVersion 24
    targetSdkVersion 34
    compileSdkVersion 34
    versionCode 12
    versionName "1.4.0"
  }
}
```
- **`applicationId`** — the app's globally unique identity string. **Cannot be changed after your first Play Store release** — changing it would make Google Play treat it as a brand-new app, losing all existing installs/reviews/ratings.
- **`versionCode`** — a plain integer that **must strictly increase with every single release** you upload to the Play Store — it's how Android's package manager decides "is this an update?" It's invisible to end users.
- **`versionName`** — the human-readable version string shown to users ("1.4.0") — has no enforced format and doesn't need to increase numerically the way `versionCode` does.
- **`minSdkVersion`** — the oldest Android API level the app is allowed to *install* on; devices below this are blocked by the Play Store entirely.
- **`targetSdkVersion`** — the Android API level the app is built and tested *against*; affects which OS-level behavior changes/permission models apply (Google requires apps to keep this reasonably current to stay listed on the Play Store).
- **`compileSdkVersion`** — the SDK version used purely to *compile* the app (which APIs are available to your code at build time). **Important distinction:** this does **not** restrict which devices can install the app — only `minSdkVersion` controls that.

## Debug vs Release Builds
| Debug Build | Release Build |
|---|---|
| Debuggable, unminified, includes dev tools (Fast Refresh, in-app dev menu) | Optimized, minified, signed, no dev tools |
| Larger, slower | Smaller, faster |
| For local development and testing | For distribution (Play Store / internal testing) |

## Build Commands
```bash
./gradlew assembleDebug       # produces a debug APK → android/app/build/outputs/apk/debug/
./gradlew assembleRelease      # produces a release APK
./gradlew bundleRelease         # produces a release AAB — the format Google Play requires for publishing
./gradlew clean                  # wipes the build cache — use only when troubleshooting weird build errors
```

## APK vs AAB
| APK (Android Package) | AAB (Android App Bundle) |
|---|---|
| Directly installable on a device (`adb install`) | **Not** directly installable — it's a publishing format |
| Contains resources for *every* device configuration (larger) | Google Play generates optimized, smaller, device-specific APKs from it on demand |
| Used for manual testing/sideloading | **Required** for new Play Store submissions |

## Full Gradle Build Pipeline
```
Developer runs a build command
   → Gradle Wrapper ensures the correct Gradle version
     → Gradle compiles Kotlin/Java native code
       → Merges resources (drawables, strings, manifests from all libraries)
         → Processes and merges the final AndroidManifest.xml
           → Bundles the JavaScript (via Metro, embedded into the native package)
             → Packages native libraries (.so files)
               → Generates the final APK or AAB
                 → (Optional) Installs it on a connected device/emulator
```

---

# C. AndroidManifest.xml

**Location:** `android/app/src/main/AndroidManifest.xml`. Android reads this file **before** the app process even starts — it's the OS's master reference for what the app is allowed to do and how to launch it.

**What it declares:**
- **Permissions** (`<uses-permission>`) — e.g. `android.permission.INTERNET`, `android.permission.CAMERA`. Without declaring a permission here, the corresponding native API call fails outright, regardless of what your JS code (or Expo module) does.
- **App-level metadata** (`<application>` tag) — app icon, theme, whether it allows clear-text (non-HTTPS) traffic, etc.
- **Screens/Activities** (`<activity>`) — RN apps typically declare just one: `MainActivity`.
- **Launch behavior** (`<intent-filter>`) — which `<activity>` is the one Android launches when the user taps the app icon, marked with the `MAIN` action and `LAUNCHER` category.

```xml
<activity
    android:name=".MainActivity"
    android:exported="true"
    android:launchMode="singleTask"
    android:windowSoftInputMode="adjustResize">
  <intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>
</activity>
```
- **`android:exported="true"`** — as of **Android 12 (API 31)**, any `<activity>` that has an `<intent-filter>` **must** explicitly declare `android:exported`, or the build fails outright. This was a security tightening — previously, activities with intent filters were implicitly exported (launchable by other apps) by default, which was a common source of vulnerabilities; now it must be a conscious, explicit choice.
- **`android:launchMode="singleTask"`** — ensures only **one instance** of `MainActivity` ever exists at a time. Critical for deep links/notifications: without it, tapping a notification while the app is already open could spawn a *second* `MainActivity` instance, leading to confusing duplicate navigation stacks.
- **`android:windowSoftInputMode="adjustResize"`** — tells Android to resize the visible window when the on-screen keyboard appears, so input fields aren't hidden behind it (works alongside `KeyboardAvoidingView` in JS).

---

# D. MainActivity.kt

The Android entry **Activity** that actually hosts the React Native UI.

```kotlin
package com.myapp

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

    override fun getMainComponentName(): String = "sample_rn"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
```

**Why extend `ReactActivity` instead of the plain Android `Activity` class?**
`ReactActivity` already contains all the plumbing needed to run a React Native screen: it creates the `ReactRootView`, starts the Hermes JS engine, loads and executes the JS bundle, and wires the whole thing into the standard Android Activity lifecycle (`onCreate`, `onResume`, `onPause`, etc.). Extending plain `Activity` would mean reimplementing all of that manually — RN simply wouldn't initialize.

**`getMainComponentName()`** — must return the **exact same string** used in your JS side's `AppRegistry.registerComponent(appName, ...)` call (and typically matches the `"name"` field in `app.json`). If these don't match, the app crashes on launch with:
```
Invariant Violation: "X" has not been registered.
```
This is one of the most common "app crashes on first launch after ejecting/renaming" bugs.

**Why do RN apps typically use only ONE Activity?**
Unlike a traditional native Android app (which might have a separate `Activity` per screen), React Native apps almost always use a *single* `MainActivity` as the native host, and handle **all** screen-to-screen navigation entirely in JavaScript, via React Navigation/Expo Router. The "screens" you see are React components being swapped inside the one native Activity, not separate native Activities being launched.

---

# E. MainApplication.kt

The Android `Application` class — instantiated **once**, when the app process starts, and lives for the app's *entire* lifetime (unlike an `Activity`, which can be created/destroyed many times as the user navigates or the OS reclaims memory).

**Key responsibilities:**
- **`ReactHost`** — manages the JS engine instance, the set of registered native modules, the rendering system, and the overall RN runtime lifecycle. Think of it as the top-level object that "owns" the entire React Native runtime for the process.
- **`PackageList`** — the list of native packages/modules made available to JS. This list is largely **auto-generated** thanks to **autolinking**: when you `npm install` a library with native code, React Native's CLI automatically detects and registers it here, without you hand-editing native Kotlin/Java files. Before autolinking existed, every native library installation required manual native-side registration — a major source of setup errors.

**Why is `applicationContext` used for app-wide initialization instead of an Activity's context?** An `Activity`'s context is tied to that specific screen's lifecycle and is destroyed/recreated as the user navigates — using it for something meant to live for the whole app (like initializing a global SDK) risks memory leaks or referencing a destroyed context. `applicationContext` outlives every individual Activity, making it the correct choice for app-wide setup.

---

# F. Android Resources (`res/`)

| Folder | Purpose |
|---|---|
| `drawable/` | Images, vector graphics, XML-defined drawables |
| `mipmap/` | Launcher icon variants (different densities) |
| `values/` | `strings.xml`, `colors.xml`, `themes.xml` — centralized native-side constants |
| `font/` | Custom font files bundled natively |
| `raw/` | Arbitrary raw files (audio clips, bundled JSON, etc.) |

**Why is `layout/` (a folder present in traditional native Android apps) generally unused in RN projects?** Traditional Android apps define screen layouts in native XML. React Native apps build **all** UI through JSX/React components instead — there's no native XML layout to define, so this folder is typically empty or absent in a pure RN project.

---

# G. Build & Deployment (EAS Build)

## Why EAS?
**Expo Go** (the sandbox app used for quick development) **cannot** be used to ship a production app — it's a shared container app, not your app's own installable binary. To actually publish to the Play Store/App Store, you need a real, standalone, signed build — that's what **EAS Build** (Expo Application Services) produces, in the cloud, without requiring you to own a local Mac for iOS builds.

```
React Native project source
   → EAS Cloud Build
     → APK / AAB (Android)  or  IPA (iOS)
       → Distributed to testers or submitted to the stores
```

## Setup & Commands
```bash
npm install -g eas-cli
eas login
eas build:configure          # generates eas.json — defines build profiles

eas build --platform android --profile preview       # APK, good for internal QA/testers
eas build --platform android --profile production      # AAB, store-ready
eas build --platform ios --profile production
```

## Build Profiles (`eas.json`)
| Profile | Purpose |
|---|---|
| `development` | Produces a **development client** build — a custom app that includes native modules Expo Go doesn't support, while still allowing fast JS-only reloads during development |
| `preview` | Internal distribution — QA teams/stakeholders install this directly without going through a store |
| `production` | The final, store-ready build — AAB for Android, properly signed IPA for iOS |

## Android Play Store Release
```
Developer runs `eas build --profile production`
   → EAS produces a signed AAB
     → Uploaded to Google Play Console
       → Google reviews the submission
         → Published
           → Users download via the Play Store
```
- Requires an **AAB**, not an APK, for new submissions.
- **`versionCode`** must strictly increase for every single upload — Google Play will reject a build with a `versionCode` it's already seen.
- **App signing** — a cryptographic signature proving the build genuinely came from you; Google Play can manage (and re-sign) your app's distribution key via **Play App Signing**, while you retain an upload key used to authenticate each submission.

## iOS App Store Release
Requires Apple **certificates** and **provisioning profiles** (which EAS can generate/manage automatically if you grant it access), and typically goes through **TestFlight** for beta testing before final submission via **App Store Connect** for Apple's review process.

## OTA (Over-The-Air) Updates
**Definition:** shipping **JavaScript-only** bug fixes or content changes directly to already-installed apps, without going through a full store review cycle (Expo's `expo-updates` module, conceptually similar in spirit to the older CodePush approach).

**Critical limitation:** OTA updates can only patch the **JS bundle** — any change involving **native code** (a new native module, an Android/iOS permission change, a native SDK bump) still requires a brand-new binary built via EAS and resubmitted through the normal store review process. Relying on OTA for anything touching native code will not work.

---

# H. React Native Architecture Internals *(bonus deep-dive — commonly asked at 3+ YOE / product-company interviews)*

## 1. The Old Architecture — "The Bridge"
In the classic RN architecture, JavaScript and Native code run on **separate threads** and can only communicate through an asynchronous **Bridge**, which **serializes** every message as JSON before passing it across.
```
JS Thread  ⇄  [Bridge: async, JSON-serialized]  ⇄  Native (UI) Thread
```
**Why this was a bottleneck:** every native call (e.g., "move this view 3px," "read this native module's value") has to be batched, converted to JSON text, sent across, and parsed back on the other side. For high-frequency operations — gestures, complex animations, scroll-linked effects — this serialization overhead becomes a visible performance ceiling (dropped frames, laggy gestures).

## 2. The New Architecture
Replaces the Bridge with a set of components designed around **synchronous, direct** communication:

- **JSI (JavaScript Interface)** — a lightweight C++ layer that lets JavaScript hold **direct references** to native C++ objects and call native methods **synchronously**, with no JSON serialization step at all. This is the foundational change everything else builds on.
- **Fabric** — the new rendering system, built on top of JSI. It constructs the UI tree (the "Shadow Tree") synchronously, enabling smoother and more predictable rendering, and allows things like synchronous layout measurement that were previously impossible across the async Bridge.
- **TurboModules** — the new native-modules system. Unlike the old architecture (which eagerly loaded *every* registered native module at app startup, whether used or not), TurboModules are **lazily loaded** — a module is only initialized the first time JS actually calls into it, improving cold-start performance.
- **Codegen** — automatically generates the native ↔ JS type-safe glue code from TypeScript/Flow type specifications, reducing hand-written native boilerplate and eliminating a whole class of type-mismatch bugs between JS and native sides.

## 3. Hermes
Meta's own JavaScript engine, purpose-built for React Native (as an alternative to JavaScriptCore/JSC). Its key advantage: it **precompiles JS to bytecode ahead of time** (at build time), rather than parsing and JIT-compiling raw JS source on every app launch — this results in **faster startup time** and **lower memory usage**, especially noticeable on lower-end Android devices.

## 4. Yoga
The cross-platform C++ layout engine that implements the Flexbox algorithm RN uses for all layout, on both Android and iOS — this is *why* the same Flexbox styles produce (nearly) identical layouts across both platforms, since both ultimately delegate to the same underlying Yoga engine rather than each platform's native layout system.

## 5. Metro vs Babel vs Gradle/Xcode — the full toolchain, disambiguated
| Tool | Role |
|---|---|
| **Metro** | JS bundler — resolves modules, bundles JS, powers Fast Refresh |
| **Babel** | Transpiler — converts modern JS/TS/JSX into Hermes-runnable JS |
| **Gradle** (Android) / **Xcode** (iOS) | Native build systems — compile native code, package the final APK/AAB/IPA |

## 6. Enabling the New Architecture
```
# android/gradle.properties
newArchEnabled=true
hermesEnabled=true
```
(with an equivalent flag on the iOS side via Podfile properties). As of recent React Native versions, the New Architecture is increasingly the **default** for new projects rather than an opt-in experiment.

---

# I. Rapid-Fire Q&A — This Section Specifically

**Q: What's the difference between `compileSdkVersion` and `minSdkVersion`?**
A: `compileSdkVersion` only affects which APIs are available at *build* time — it has no effect on device compatibility. `minSdkVersion` is what actually determines the oldest Android version allowed to *install* the app.

**Q: Why can't `applicationId` be changed after a Play Store release?**
A: Google Play treats `applicationId` as the app's permanent identity. Changing it means Play Store sees it as an entirely new app — losing all existing installs, reviews, and update history for existing users.

**Q: What happens if `getMainComponentName()` in `MainActivity.kt` doesn't match the name registered in JS?**
A: The app crashes immediately on launch with `Invariant Violation: "X" has not been registered.`

**Q: Why is `android:exported` now mandatory on activities with intent filters?**
A: Android 12 tightened default security — previously, an activity with an intent filter was implicitly launchable by other apps by default, a common vulnerability. Now developers must explicitly state whether it should be exported.

**Q: What can and can't an OTA update fix?**
A: OTA updates can only patch the JavaScript bundle. Any native-code change (new native module, new permission, native SDK upgrade) requires a full rebuild and store resubmission.

**Q: What actually replaced the Bridge, and why does it matter?**
A: JSI enables direct, synchronous JS↔Native calls without JSON serialization. Fabric (rendering) and TurboModules (native modules) are both built on top of JSI, removing the async-serialization bottleneck that limited gesture/animation performance under the old Bridge architecture.
