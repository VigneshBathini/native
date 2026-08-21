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
<Row item={item} onPress={() => handlePress(item.id)} />   // ❌ new inline arrow function every render
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
