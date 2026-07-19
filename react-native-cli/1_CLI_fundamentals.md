Module 1 – React Native CLI Project Structure
Overview

A React Native CLI project consists of:

JavaScript/TypeScript application
Native Android project
Native iOS project
Build configuration
Bundler configuration

Unlike Expo, React Native CLI exposes the native Android and iOS projects directly.

Project Structure
MyApp/
│
├── android/
├── ios/
├── App.tsx
├── index.js
├── package.json
├── babel.config.js
├── metro.config.js
├── tsconfig.json
└── node_modules/
index.js
Purpose

JavaScript entry point of the application.

Responsibilities
Registers root component
Connects native Android/iOS with React
Starts React application
Important API
AppRegistry.registerComponent()
Flow
Android/iOS
      ↓
index.js
      ↓
App.tsx
Interview Points
JS entry point
Uses AppRegistry
Native never launches App.tsx directly
App.tsx
Purpose

Root React component.

Usually contains

Navigation
Redux Provider
QueryClientProvider
Theme Provider
Authentication Provider
Production Example
<App>
   Provider
      Navigation
         Screens
</App>
package.json
Purpose

Project metadata and dependency management.

Contains

Scripts
Dependencies
Dev Dependencies
Project version
Package name

Common scripts

npm run android
npm run ios
npm start
babel.config.js
Purpose

Transpiles modern JavaScript/TypeScript into JavaScript executable by Hermes.

Typical plugins

Reanimated
Module Resolver
metro.config.js
Purpose

Metro is the React Native bundler.

Responsibilities

Finds files
Resolves dependencies
Bundles JavaScript
Serves bundle
Fast Refresh

Metro ≠ Babel

Metro bundles.

Babel transpiles.

tsconfig.json

Configures TypeScript.

Common settings

Strict mode
Module resolution
Path aliases
Type checking
android/

Contains native Android project.

Built using

Gradle
Kotlin/Java

Includes

Manifest
Resources
Activities
Gradle files
ios/

Contains native iOS project.

Built using

Xcode
Swift/Objective-C
CocoaPods
Application Startup Flow
run-android

↓

Gradle

↓

APK

↓

Install

↓

Launch MainActivity

↓

Hermes

↓

index.js

↓

App.tsx

↓

UI
Frequently Asked Interview Questions
Why do we have both index.js and App.tsx?

index.js registers the root component with the native application using AppRegistry. App.tsx is simply the root React component.

Metro vs Babel

Metro

Bundler
Resolves modules
Serves JS bundle

Babel

Transpiles JavaScript
Converts JSX
Converts TypeScript

-------------------------------------------------------------

📝 Module 2 – Android Build System
Android Folder
android/

app/

gradle/

build.gradle

settings.gradle

gradle.properties

gradlew
Gradle Wrapper

Files

gradlew
gradlew.bat

Purpose

Downloads correct Gradle version
Ensures consistent builds across environments
Root build.gradle

Project-level configuration.

Contains

SDK versions
Plugin versions
Kotlin version
Shared configuration
App build.gradle

Most important Android Gradle file.

Contains

applicationId

versionCode

versionName

minSdkVersion

targetSdkVersion

compileSdkVersion
applicationId

Unique identity of the application.

Example

com.company.app

Cannot be changed after Play Store release without creating a new app.

versionCode

Integer used by Android for updates.

Example

1

2

3

4

Must increase with every release.

versionName

User-visible version.

Example

1.0

1.1

2.0
minSdkVersion

Minimum Android API supported.

Determines installation eligibility.

targetSdkVersion

Android API level the app is optimized for.

Used for compatibility behavior.

compileSdkVersion

Android SDK used during compilation.

Does not determine supported devices.

Difference
Property	Purpose
compileSdk	Compile app
targetSdk	Target Android behavior
minSdk	Minimum supported Android
settings.gradle

Lists Gradle modules.

Usually includes

:app
gradle.properties

Global Gradle configuration.

Common flags

hermesEnabled

newArchEnabled

JVM memory
Hermes

JavaScript engine used by React Native.

Advantages

Faster startup
Lower memory
Better performance
New Architecture

Enabled by

newArchEnabled=true

Components

JSI
TurboModules
Fabric
Codegen
Build Flow
CLI

↓

Gradle

↓

Compile

↓

APK

↓

Install

↓

Launch
Frequently Asked Interview Questions
Difference between compileSdk, targetSdk, and minSdk?
compileSdk → SDK used for compilation.
targetSdk → Android version the app targets.
minSdk → Minimum Android version supported.
Can compileSdk be higher than targetSdk?

Yes, but it is generally recommended to keep them aligned so the app is tested against the latest Android behavior.

Does compileSdk affect supported devices?

No.

Only minSdkVersion determines which Android versions can install the app.

---------------------------------------------------------------------

📝 Module 3 – AndroidManifest.xml
Purpose

The Android manifest is the application's configuration file.

Android reads it before launching the application.

Location
android/app/src/main/AndroidManifest.xml
Responsibilities
Permissions
Activities
Application metadata
Themes
Icons
Deep Links
Services
Broadcast Receivers
<manifest>

Root XML element.

<uses-permission>

Declares permissions.

Examples

INTERNET

CAMERA

ACCESS_FINE_LOCATION

POST_NOTIFICATIONS

RECORD_AUDIO

Dangerous permissions (e.g., Camera, Location, Microphone) also require a runtime permission request.

<application>

Global application configuration.

Common attributes

android:name
android:label
android:icon
android:theme
android:allowBackup
android:supportsRtl
android:usesCleartextTraffic
MainApplication

Created first.

Responsible for initializing the application and React Native runtime.

android:label

App name displayed to the user.

android:icon

Launcher icon.

android:allowBackup

Controls Android Auto Backup.

true → Android may back up app data.
false → No automatic backup.
android:usesCleartextTraffic

Controls whether HTTP (non-HTTPS) traffic is allowed.

Production apps should prefer HTTPS.

android:supportsRtl

Enables Right-to-Left language support.

<activity>

Represents an Android screen.

React Native typically has a single MainActivity.

android:configChanges

Allows React Native to handle configuration changes (rotation, keyboard, dark mode, etc.) without recreating the Activity.

android:launchMode="singleTask"

Ensures only one instance of MainActivity exists, which is important for deep links and notifications.

android:windowSoftInputMode="adjustResize"

Resizes the screen when the keyboard appears so input fields remain visible.

android:exported

Required for Android 12+ when an Activity has an intent-filter.

<intent-filter>

Defines how the Activity can be launched.

MAIN

Marks the application's entry point.

LAUNCHER

Makes the app appear in the launcher.

Startup Flow
Launcher

↓

AndroidManifest.xml

↓

MainApplication

↓

MainActivity

↓

Hermes

↓

index.js

↓

App.tsx
Frequently Asked Interview Questions
Why do we need AndroidManifest.xml?

It tells Android how the app should be installed and launched, what permissions it requires, and which components (Activities, Services, Receivers) it contains.

Why is android:exported required?

Starting with Android 12, any Activity with an intent-filter must explicitly declare whether it can be launched by other apps or the system.

Why use singleTask?

To reuse the existing MainActivity instead of creating multiple instances, which simplifies deep linking and notification handling.