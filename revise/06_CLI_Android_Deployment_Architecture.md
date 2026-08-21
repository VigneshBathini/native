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
