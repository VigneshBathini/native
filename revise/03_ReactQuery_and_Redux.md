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

## 6. staleTime ⭐⭐⭐⭐⭐ — the most-asked React Query topic

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

**Does `staleTime: 0` mean React Query instantly refetches?** ❌ **No.** It means that *whenever an opportunity arises* — the screen regains focus, the query component remounts, the network reconnects — React Query **may** refetch, because the data is already flagged stale. It does not proactively poll every millisecond.

## 7. Background Refetch ⭐⭐⭐⭐

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

### staleTime vs gcTime ⭐⭐⭐⭐⭐ (confuses almost everyone)

| `staleTime` | `gcTime` |
|---|---|
| Controls **freshness** | Controls **memory lifetime** |
| "Can I trust this data right now?" | "Can I keep this data around at all?" |
| Affects whether a **refetch** happens | Affects whether the cache entry is **deleted** |

```
API → Cache → Fresh → (staleTime elapses) → Stale → (no one is using it) → Unused → (gcTime elapses) → Deleted
```
They are independent settings — you can have data that's stale (should refetch on next opportunity) but not yet garbage-collected (still instantly available while the refetch happens), or vice versa.

## 9. Request Deduplication ⭐⭐⭐⭐

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
**Does `invalidateQueries` delete the cache?** ❌ No — it marks the query as stale and triggers a refetch based on React Query's lifecycle; the old data typically stays visible until the fresh data arrives (no flash of empty content).

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
