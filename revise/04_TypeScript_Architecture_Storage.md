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
id = "abc123";   // ✅ valid
id = 42;          // ✅ valid
id = true;         // ❌ TypeScript error
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
data.toUpperCase();               // ❌ TS error — must narrow first
if (typeof data === "string") {
  data.toUpperCase();              // ✅ now TS knows it's a string
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
// ❌ fetch() scattered directly inside screens
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
