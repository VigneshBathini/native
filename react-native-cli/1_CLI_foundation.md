React Native CLI Senior Masterclass

Phase 1 – CLI Foundations

Modules

✅ Module 1 – Project Structure
✅ Module 2 – Android Build System
✅ Module 3 – AndroidManifest.xml
✅ Module 4 – MainActivity.kt
✅ Module 5 – MainApplication.kt
✅ Module 6 – Android Resources
✅ Module 7 – Gradle Build Process

------------------------------------------------

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


Phase 1 Revision

Project Structure
↓
Android Build
↓
Manifest
↓
MainApplication
↓
MainActivity
↓
Resources
↓
Gradle
↓
APK

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

------------------------------------------
📝 Module 4 – MainActivity.kt
Purpose

MainActivity is the entry Activity of a React Native Android application.

It acts as the bridge between Android and React Native, launching the React Native application inside an Android Activity.

Location
android/
└── app/
    └── src/
        └── main/
            └── java/
                └── com/
                    └── sample_rn/
                        └── MainActivity.kt
Responsibilities
Acts as the launcher Activity.
Extends ReactActivity.
Starts the React Native application.
Loads the root React component.
Creates the ReactActivityDelegate.
Connects Android lifecycle with React Native.
package
package com.sample_rn

Defines the package (namespace) of the class.

Should match your application's package structure.

ReactActivity
class MainActivity : ReactActivity()

ReactActivity is provided by React Native.

It already knows how to:

Create ReactRootView
Initialize React Native
Load the JavaScript bundle
Start the Hermes engine
Handle Android lifecycle callbacks

MainActivity inherits all this functionality.

getMainComponentName()
override fun getMainComponentName(): String =
    "sample_rn"

Returns the name of the root React component.

This value must match:

app.json
        ↓
"name"

        ↓

AppRegistry.registerComponent()

Example

{
  "name": "sample_rn"
}
Component Registration Flow
app.json
        ↓
index.js
        ↓
AppRegistry.registerComponent()
        ↓
MainActivity
        ↓
getMainComponentName()
        ↓
App.tsx
ReactActivityDelegate
override fun createReactActivityDelegate()

Creates the delegate responsible for managing the React Native application inside the Activity.

Responsibilities:

Creates ReactRootView
Initializes React Native
Loads the JavaScript bundle
Connects Android lifecycle with React
DefaultReactActivityDelegate
DefaultReactActivityDelegate(
    this,
    mainComponentName,
    fabricEnabled
)

React Native provides a default implementation.

Parameters
this

Current MainActivity instance.

mainComponentName

The component name returned from:

getMainComponentName()
fabricEnabled

Boolean indicating whether the Fabric renderer (New Architecture) is enabled.

Configured through:

newArchEnabled=true
Fabric
fabricEnabled = true

Uses:

Fabric Renderer
JSI
New Architecture

If disabled:

Uses the legacy renderer.

Startup Flow
User taps App Icon
        ↓
Android Launcher
        ↓
AndroidManifest.xml
        ↓
MainActivity
        ↓
ReactActivity
        ↓
ReactActivityDelegate
        ↓
ReactRootView
        ↓
Hermes Engine
        ↓
index.js
        ↓
AppRegistry
        ↓
App.tsx
        ↓
React Navigation
        ↓
Application UI
Why Does React Native Use One Activity?

Traditional Android

LoginActivity
        ↓
HomeActivity
        ↓
ProfileActivity
        ↓
SettingsActivity

React Native

MainActivity
        ↓
React Navigation
        ↓
Login Screen
        ↓
Home Screen
        ↓
Profile Screen
        ↓
Settings Screen

Navigation is managed in JavaScript instead of native Android.

Common Mistakes
Wrong Component Name
override fun getMainComponentName() =
"MyApp"

while

"name": "sample_rn"

Result:

Invariant Violation

"MyApp" has not been registered.
Removing createReactActivityDelegate()

React Native cannot initialize properly.

May result in startup failures or blank screens.

Extending Activity Instead of ReactActivity
class MainActivity : Activity()

React Native runtime will not be initialized.

Production Best Practices
Keep MainActivity minimal.
Do not modify ReactActivity behavior unless necessary.
Ensure getMainComponentName() matches app.json.
Use DefaultReactActivityDelegate unless implementing advanced native customization.
Keep fabricEnabled synchronized with the New Architecture configuration.
Interview Questions
What is MainActivity?

The Android launcher Activity that hosts the React Native application. It extends ReactActivity and initializes the React Native runtime.

Why does MainActivity extend ReactActivity?

Because ReactActivity already implements the logic required to initialize React Native, create the ReactRootView, and manage lifecycle events.

What does getMainComponentName() return?

The name of the root React component registered with AppRegistry.

What happens if the component name is incorrect?

React Native cannot find the registered component and throws an Invariant Violation stating that the component has not been registered.

What is ReactActivityDelegate?

A class responsible for managing the React Native application within an Android Activity, including creating the root view and coordinating lifecycle events.

What is DefaultReactActivityDelegate?

The default implementation of ReactActivityDelegate provided by React Native. It configures and initializes the React Native environment for the Activity.

What is fabricEnabled?

A Boolean flag that enables the Fabric renderer, which is part of React Native's New Architecture.

Key Takeaways
MainActivity is the Android entry point for the React Native UI.
It extends ReactActivity instead of Activity.
getMainComponentName() must match the name in app.json.
DefaultReactActivityDelegate initializes the React Native environment.
fabricEnabled controls whether the Fabric renderer is used.
Most React Native apps use a single MainActivity, with screen navigation handled by React Navigation.

-------------------------------------------------------

📝 Module 5 – MainApplication.kt (React Native 0.82+)
Purpose

MainApplication is the Application class of an Android app.

It is the first class created when the application starts and remains alive for the entire lifecycle of the app process.

It is responsible for initializing the React Native runtime and performing application-wide setup.

Location
android/
└── app/
    └── src/
        └── main/
            └── java/
                └── com/
                    └── sample_rn/
                        └── MainApplication.kt
Startup Order
User taps App

↓

Android OS

↓

MainApplication

↓

onCreate()

↓

loadReactNative()

↓

MainActivity

↓

ReactActivity

↓

App.tsx
Responsibilities
Initializes the React Native runtime.
Creates the ReactHost.
Registers native packages.
Performs application-wide initialization.
Loads the JavaScript runtime.
Initializes Hermes (if enabled).
Initializes the New Architecture (if enabled).
Application
class MainApplication : Application()

Application is the base Android class representing the entire application.

Characteristics
Created only once.
Lives for the application's lifetime.
Shared across all Activities.
Used for global initialization.
Common Uses
Firebase initialization
Analytics
Crash reporting
Dependency Injection
Logging
React Native initialization
ReactApplication
class MainApplication :
Application(),
ReactApplication

ReactApplication is an interface provided by React Native.

It tells Android that this application hosts a React Native application.

It requires the implementation of:

override val reactHost
reactHost
override val reactHost: ReactHost

ReactHost is the central manager of the React Native runtime.

Responsibilities
Manages the JavaScript engine.
Creates the React Native runtime.
Manages native modules.
Loads the JavaScript bundle.
Starts the rendering system.
by lazy
override val reactHost: ReactHost by lazy

Kotlin's lazy delegate delays object creation until it is first accessed.

Benefits
Faster application startup.
Lower memory usage.
Avoids unnecessary initialization.
getDefaultReactHost()
getDefaultReactHost(...)

Creates the default ReactHost provided by React Native.

It automatically configures:

React Native runtime
JavaScript engine (Hermes)
New Architecture
Native package registration
JavaScript bundle loading
applicationContext
context = applicationContext

Provides the global application context.

Characteristics
Exists for the application's lifetime.
Safe for global initialization.
Not tied to any Activity.
PackageList
PackageList(this)

PackageList contains all registered native React Native packages.

Examples

react-native-svg

react-native-mmkv

react-native-reanimated

react-native-firebase

react-native-vision-camera
.packages
PackageList(this).packages

Returns the list of all native packages available to the application.

.apply
.apply {
}

Kotlin scope function used to configure an object before returning it.

Example

.apply {
    add(MyCustomPackage())
}

Used only when a package cannot be autolinked.

Autolinking

Autolinking automatically discovers compatible native libraries installed in the project and registers them.

Example

npm install react-native-mmkv

↓

PackageList

↓

MMKV Registered Automatically

No manual registration is required for most modern libraries.

Manual Package Registration

Packages that do not support autolinking can be registered manually.

Example

.apply {
    add(MyCustomPackage())
}
onCreate()
override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
}

onCreate() is called once when the application process starts.

It is the entry point for application-wide initialization.

loadReactNative()
loadReactNative(this)

Initializes the React Native runtime.

Internally it prepares:

ReactHost
JavaScript engine
Native modules
React runtime
Rendering system

Without this call, the React Native application cannot start.

Application vs Activity
Application	Activity
Created once	Created multiple times
Lives for entire app process	Represents a screen
Global initialization	Screen-specific logic
Shared across Activities	Destroyed and recreated
Initializes React Native	Displays UI
Complete Startup Flow
User taps App

↓

Android Launcher

↓

AndroidManifest.xml

↓

MainApplication

↓

onCreate()

↓

loadReactNative()

↓

ReactHost

↓

PackageList

↓

Hermes Engine

↓

MainActivity

↓

ReactActivity

↓

ReactRootView

↓

index.js

↓

AppRegistry

↓

App.tsx

↓

React Navigation

↓

Application UI
Common Mistakes
Removing loadReactNative()

Result

React Native runtime is not initialized.
Initializing Activity-specific logic inside MainApplication

Incorrect

Showing dialogs

Handling UI

Navigation

Activity lifecycle operations

These belong inside Activities or React components.

Manually registering already autolinked packages

Most modern React Native libraries are automatically registered.

Avoid duplicate registrations.

Using Activity Context instead of Application Context

For global initialization always use

applicationContext
Production Best Practices
Keep MainApplication focused on application-wide initialization.
Prefer autolinking over manual package registration.
Use applicationContext for global resources.
Avoid putting UI logic inside MainApplication.
Initialize third-party SDKs (Firebase, Analytics, Crash Reporting) here.
Keep startup initialization lightweight to improve app launch performance.
Interview Questions
What is MainApplication?

MainApplication is the Android Application class responsible for initializing the React Native runtime and performing application-wide setup.

What is the difference between Application and Activity?

Application

Created once.
Exists throughout the app's lifetime.
Used for global initialization.

Activity

Represents a screen.
Can be created and destroyed multiple times.
Handles user interface and interactions.
What is ReactApplication?

An interface indicating that the Android application hosts a React Native application. It exposes the ReactHost.

What is ReactHost?

ReactHost manages the React Native runtime, including the JavaScript engine, native modules, rendering system, and runtime lifecycle.

What is PackageList?

A generated list of all native React Native packages available in the application.

What is Autolinking?

Autolinking automatically discovers and registers compatible native libraries after installation, eliminating most manual native configuration.

Why is applicationContext used?

Because it is tied to the lifetime of the application and is safe for application-wide initialization.

What is the purpose of loadReactNative()?

It initializes the React Native runtime, allowing the application to execute JavaScript and render the React Native UI.

Why use by lazy?

To delay creation of the ReactHost until it is first needed, improving startup performance and reducing unnecessary memory usage.

Key Takeaways
MainApplication is the first Android class created during app startup.
It extends Application and implements ReactApplication.
ReactHost is the central manager of the React Native runtime.
PackageList registers native packages, primarily through autolinking.
loadReactNative() initializes the React Native environment.
applicationContext is used for application-wide initialization.
by lazy postpones ReactHost creation until required.
MainApplication remains alive for the entire application process.

-------------------------------------------------------------------------------


📝 Revision Notes (Module 6)
Purpose

The res/ folder stores all non-code Android resources.

Location
android/app/src/main/res/

Common Resource Folders
Folder	Purpose
drawable/	Images, vectors, XML drawables
mipmap/	Launcher icons
values/	Strings, colors, themes, dimensions
xml/	Android configuration files
raw/	Raw files (audio, video, JSON, etc.)
font/	Custom fonts
color/	Color state lists and ripple effects
anim/	Native animations
layout/	XML layouts (rarely used in React Native UI)
Key XML Files
strings.xml → User-visible text
colors.xml → Reusable colors
themes.xml → App theme and styling
Resource References
@string/app_name

@color/primary

@drawable/logo

@mipmap/ic_launcher

@style/AppTheme
Key Takeaways
res/ stores Android resources, not code.
Use mipmap/ for launcher icons.
Use drawable/ for general graphics.
Keep strings, colors, and themes centralized in values/.
React Native renders UI with JSX, so layout/ is generally unused for screens.

What is the purpose of the res/ folder?

It contains non-code resources such as images, strings, colors, themes, fonts, XML configurations, and launcher icons used by the Android application.

What is the difference between drawable/ and mipmap/?
drawable/ stores general image and drawable resources.
mipmap/ is specifically intended for launcher icons across multiple screen densities.
Why does React Native not use layout/?

Because the UI is built with React components (View, Text, Image, etc.) rendered through ReactRootView, not native Android XML layouts.

What is strings.xml used for?

To store user-visible text, making it reusable and easier to localize.

What is themes.xml?

It defines the application's native Android theme, including colors, status bar appearance, and window styling.


---------------------------------------------------------

📝 Module 7 – Gradle Build Process
Purpose

Gradle is Android's Build Automation Tool.

It is responsible for converting the React Native project into an installable Android application (APK or AAB).

Without Gradle, Android cannot compile or package the application.

Location
android/

├── build.gradle
├── settings.gradle
├── gradlew
├── gradlew.bat
├── gradle.properties
└── gradle/
What Gradle Does

Gradle performs the following tasks:

Compiles Kotlin/Java code
Processes Android resources
Merges AndroidManifest.xml
Downloads project dependencies
Bundles JavaScript
Packages native libraries
Generates APK/AAB
Installs the application on a device
Build Flow
React Native Project

↓

Gradle

↓

Compile Kotlin/Java

↓

Merge Resources

↓

Process AndroidManifest.xml

↓

Bundle JavaScript

↓

Package Native Libraries

↓

Generate APK/AAB

↓

Install on Device
Gradle Wrapper

Files

gradlew
gradlew.bat
gradle/

The Gradle Wrapper ensures every developer and CI/CD environment uses the same Gradle version, avoiding version mismatch issues.

Common Gradle Commands
Run Android App
npx react-native run-android

Compiles the project and installs the debug build on a connected emulator or device.

Build Debug APK
cd android

./gradlew assembleDebug

Output:

android/app/build/outputs/apk/debug/
Build Release APK
./gradlew assembleRelease

Output:

android/app/build/outputs/apk/release/
Build Android App Bundle (AAB)
./gradlew bundleRelease

Output:

android/app/build/outputs/bundle/release/

Used for uploading to the Google Play Store.

Clean Project
./gradlew clean

Removes previous build artifacts and forces a fresh build.

Useful when resolving build-related issues.

Build Types
Debug Build

Purpose

Development
Testing
Debugging

Characteristics

Debuggable
Faster builds
Includes development tools
Not optimized
Release Build

Purpose

Production deployment

Characteristics

Optimized
Signed
Faster performance
Smaller size
Ready for Play Store
APK vs AAB
APK (Android Package)
Installable package
Used for local testing
Can be installed directly on Android devices
AAB (Android App Bundle)
Publishing format
Uploaded to Google Play Store
Google Play generates optimized APKs for each device
Build Tasks

Gradle divides the build process into tasks.

Examples

Compile Kotlin
Compile Java
Merge Resources
Process Manifest
Bundle JavaScript
Package Native Libraries
Generate APK
Sign APK

Gradle executes tasks in the required order.

Dependency Resolution

When Gradle encounters:

implementation("library-name")

It:

Downloads the dependency (if not already cached)
Stores it in the local Gradle cache
Includes it during compilation

This avoids repeated downloads and speeds up future builds.

Build Cache

Gradle stores compiled outputs in a local cache.

Benefits

Faster incremental builds
Reduced compilation time
Improved development workflow
React Native Build Integration

During the Android build, Gradle also:

Bundles JavaScript
Generates Hermes bytecode (when enabled)
Packages native modules
Copies assets
Produces the final APK or AAB
Complete Build Pipeline
Developer

↓

npx react-native run-android

↓

Gradle Wrapper

↓

Gradle

↓

Compile Kotlin/Java

↓

Merge Resources

↓

Process AndroidManifest.xml

↓

Bundle JavaScript

↓

Package Native Libraries

↓

Generate APK/AAB

↓

Install on Emulator/Device

↓

Application Launches
Important Files
File	Purpose
build.gradle	Project/module build configuration
settings.gradle	Defines Gradle modules included in the project
gradle.properties	Global Gradle properties
gradlew	Gradle Wrapper (Linux/macOS)
gradlew.bat	Gradle Wrapper (Windows)
Production Best Practices
Use Debug builds during development.
Use Release builds for production.
Upload AAB files to the Play Store.
Keep Gradle and Android Gradle Plugin versions compatible.
Use the Gradle Wrapper instead of a globally installed Gradle.
Run ./gradlew clean only when troubleshooting build issues.
Common Mistakes
Uploading Debug APK to Play Store

Debug builds are not intended for production deployment.

Forgetting to Sign Release Builds

Release APKs/AABs must be signed before distribution.

Running clean Before Every Build

This removes the build cache and increases build time unnecessarily.

Using Different Gradle Versions Across Team Members

Always use the Gradle Wrapper to ensure consistency.

Interview Questions
What is Gradle?

Gradle is Android's build automation tool used to compile native code, process resources, manage dependencies, bundle JavaScript, and generate APKs or AABs.

What is the Gradle Wrapper?

The Gradle Wrapper (gradlew/gradlew.bat) ensures that every environment uses the same Gradle version, improving consistency across development machines and CI pipelines.

Difference Between Debug and Release Builds?

Debug Build

Used during development
Debuggable
Includes development tools
Not optimized

Release Build

Used for production
Optimized
Signed
Better performance
Difference Between APK and AAB?

APK

Directly installable on Android devices.
Used for testing and local distribution.

AAB

Publishing format for Google Play.
Google Play generates optimized APKs for users.
What Does ./gradlew clean Do?

It deletes previous build outputs and forces Gradle to perform a fresh build.

Why Is Gradle Important in React Native?

Because it compiles Android native code, processes resources, bundles JavaScript, packages native libraries, and creates the final installable application.

Key Takeaways
Gradle is Android's build automation system.
The Gradle Wrapper ensures a consistent Gradle version across environments.
Gradle compiles native code, processes resources, bundles JavaScript, and generates APKs/AABs.
Debug builds are for development; Release builds are for production.
APK is an installable package; AAB is the preferred Play Store publishing format.
Gradle uses tasks and caching to optimize the build process.
Use ./gradlew clean only when necessary.