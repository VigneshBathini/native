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
1️⃣ Status Code   → 200 OK
2️⃣ Headers       → Content-Type: application/json
3️⃣ Body          → { "id": 1, "name": "Vignesh", "city": "Hyderabad" }
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

**⚠️ Important gotcha:** if **any one** Promise in the array fails, the *entire* `Promise.all()` call rejects — even if the other two succeeded. This makes it unsuitable when individual pieces are allowed to fail independently.

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
setUsers(prev => [...prev, ...newUsers]);   // ✅ correct — keeps existing items and adds more
setUsers(newUsers);                          // ❌ wrong — throws away everything already loaded
```

## 10. HTTP Status Codes — Full Reference

**Categories:**
| Range | Meaning |
|---|---|
| 1xx | Informational (rare in app dev) |
| 2xx | Success ✅ |
| 3xx | Redirection |
| 4xx | Client Error ❌ |
| 5xx | Server Error 🔥 |

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
