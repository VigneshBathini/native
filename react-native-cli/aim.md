You're in a great position to transition from **Expo** to **React Native CLI**. The biggest difference isn't React Native itself—it's learning the **native Android/iOS layer**.

Based on what you've already completed, I wouldn't repeat React concepts. Instead, I'd follow a CLI-focused roadmap.

---

# React Native CLI Masterclass

## Phase 1 – CLI Fundamentals

These are the things Expo mostly hides.

### Project Structure

```
android/
ios/
src/
App.tsx
metro.config.js
babel.config.js
package.json
```

Learn

* android folder
* ios folder
* Gradle
* Podfile
* Metro
* Babel
* Native build process

---

### Running Apps

```
npx react-native run-android
npx react-native run-ios

npx react-native start
```

Learn

* Metro
* Emulator
* Physical device
* adb

---

### Android Studio

Understand

* SDK
* Emulator
* Logcat
* Device Manager
* Gradle Sync

---

### Xcode (Mac)

Understand

* Simulator
* Signing
* Schemes
* Build Configurations

---

# Phase 2 – Native Android

This is where CLI starts becoming different.

Learn

### Android Folder

```
android/app

AndroidManifest.xml

build.gradle

settings.gradle

gradle.properties

MainActivity

MainApplication
```

Understand

* package name
* permissions
* intent filters
* deep links
* launch modes

---

### Gradle

Understand

```
minSdk

compileSdk

targetSdk

buildTypes

productFlavors

dependencies
```

Learn how Gradle builds APKs.

---

### Android Manifest

Learn

Permissions

```
CAMERA

LOCATION

POST_NOTIFICATIONS

READ_MEDIA_IMAGES

INTERNET
```

Activities

Intent Filters

Deep Links

---

### Resources

Learn

```
drawable/

mipmap/

values/

strings.xml

colors.xml

styles.xml
```

---

# Phase 3 – Native iOS

Understand

```
Info.plist

Podfile

AppDelegate

SceneDelegate
```

Learn

Permissions

Background Modes

URL Schemes

Universal Links

Pods

---

# Phase 4 – Native Modules

This is a major step.

Learn

Native Modules

```
Android (Kotlin)

iOS (Swift)
```

Call native code from JS.

Example

```
NativeModules

TurboModules

JSI
```

---

# Phase 5 – Third Party Native Libraries

Install manually

Examples

```
react-native-fs

react-native-vision-camera

react-native-mmkv

react-native-permissions

react-native-keychain

react-native-reanimated

react-native-gesture-handler

react-native-svg
```

Understand

```
pod install

gradle changes

manifest changes
```

---

# Phase 6 – Build Variants

Learn

```
Debug

Release
```

Generate

```
APK

AAB
```

Commands

```
cd android

./gradlew assembleDebug

./gradlew assembleRelease

./gradlew bundleRelease
```

Understand signing.

---

# Phase 7 – Environment Configurations

Instead of Expo env.

Use

```
react-native-config
```

Learn

```
.env

.env.dev

.env.prod
```

Build variants.

---

# Phase 8 – Native Debugging

Learn

```
adb logcat

Metro logs

Android Studio logs

Xcode logs
```

Use

```
Flipper

React DevTools
```

---

# Phase 9 – Native Performance

Understand

Hermes

JS Thread

UI Thread

Native Thread

Bridge

Fabric

TurboModules

JSI

Memory

FPS

Profiling

---

# Phase 10 – Native Permissions

Handle

```
Camera

Gallery

Bluetooth

Microphone

Notifications

Storage

Contacts

Location
```

Both Android and iOS.

---

# Phase 11 – Native Storage

Learn

```
MMKV

Keychain

Encrypted Shared Preferences

SQLite

Realm
```

---

# Phase 12 – Notifications

Without Expo.

Learn

```
Firebase Cloud Messaging

Notifee
```

---

# Phase 13 – Deep Linking

Learn

```
Android Intent Filters

iOS URL Schemes

Universal Links

App Links
```

---

# Phase 14 – CI/CD

Automate builds.

Learn

```
Fastlane

GitHub Actions

Bitrise

Codemagic
```

---

# Phase 15 – Release

Android

```
Keystore

Signing

Play Console

AAB
```

iOS

```
Certificates

Provisioning Profiles

TestFlight

App Store Connect
```

---

# Phase 16 – React Native New Architecture

Deep dive

```
Fabric

TurboModules

JSI

Codegen

C++

Native Rendering

Shadow Tree
```

---

# Capstone (CLI)

Build one production-grade app that uses:

* React Navigation
* Redux Toolkit
* React Query (TanStack Query)
* MMKV
* AsyncStorage
* Secure Storage
* Firebase Authentication
* Firebase Cloud Messaging
* Notifee
* Camera
* Vision Camera
* Image Picker
* File Upload
* Background Upload
* Offline Queue
* Deep Linking
* Push Notifications
* Maps
* Location
* Permissions
* Dynamic Themes
* Infinite Scroll
* Pagination
* Search
* Error Boundaries
* Sentry
* Crashlytics
* CodePush/OTA alternative (where appropriate)
* Release APK
* Release AAB
* Play Store Ready

---

# Suggested Learning Order (12 Weeks)

| Week | Focus                                                       |
| ---- | ----------------------------------------------------------- |
| 1    | CLI project structure, Metro, Android Studio, Gradle basics |
| 2    | Android native folder, Manifest, permissions, resources     |
| 3    | iOS project, CocoaPods, Info.plist, Xcode basics            |
| 4    | Installing and configuring native libraries                 |
| 5    | Build variants, signing, APK/AAB generation                 |
| 6    | Environment configs, debugging, Logcat, Flipper             |
| 7    | Native storage (MMKV, Keychain), permissions                |
| 8    | Firebase, FCM, Notifee, push notifications                  |
| 9    | Deep linking, app links, universal links                    |
| 10   | Performance profiling, Hermes, memory, rendering            |
| 11   | New Architecture (Fabric, TurboModules, JSI)                |
| 12   | CI/CD, Fastlane, Play Store/TestFlight release              |

Since you've already mastered React Native development with Expo, your focus should now be on **what Expo abstracted away**: native Android/iOS configuration, build systems, debugging, release engineering, and the New Architecture. Mastering these areas is what typically distinguishes a senior React Native CLI engineer from an Expo-focused developer.
