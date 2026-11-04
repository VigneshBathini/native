EAS (Expo Application Services) : Expo's cloud platform for building, signing, and deploying React Native applications.

Build: The process of converting your React Native project into an installable application.

Examples:
Android
app-release.apk
or
app-release.aab
iOS
MyApp.ipa


APK: Android Package used for installing apps manually.
AAB: Android App Bundle used for Google Play Store uploads.
IPA: iOS application package used for App Store/TestFlight.

So far we've used:

React Native Code
↓
Metro Bundler
↓
Expo Go

Users cannot install Expo Go and use your app in production.

Instead we need:

React Native Code
↓

EAS Build
↓
APK / AAB / IPA
↓
Users

---------------------------

🏗️ EAS Architecture
Your Code
↓
Git (optional)
↓
EAS Cloud
↓
Android Builder
↓
APK / AAB


Step 1 — Install EAS CLI
npm install -g eas-cli

Check version:
eas --version

Step 2 — Login
eas login

Login using your Expo account.

Step 3 — Configure EAS

Inside your project:

eas build:configure

This creates:

eas.json
Sample eas.json
{
  "build": {

    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },

    "preview": {
      "distribution": "internal"
    },

    "production": {
      "autoIncrement": true
    }

  }
}
Understanding Build Profiles
Development
Used During Development

Supports:

Native Modules
Debugging
Expo Dev Client
Preview
Internal Testing

Used by:
QA Team
Clients
Testers
Production
Store Release

Uploaded to:
Google Play
App Store

Step 4 — Android Build
APK
eas build --platform android --profile preview

AAB
eas build --platform android --profile production

Step 5 — iOS Build
eas build --platform ios --profile production
Expo handles certificates if you allow it.


📄 Revision Notes
Install eas-cli.
Run eas login.
Configure with eas build:configure.
Use eas.json for build profiles.
Build Android with eas build --platform android.
Use different environments for each profile.
Test Preview builds before Production.  

---------------------------------------------

Google Play Console: Google's developer portal used to publish, manage, and update Android applications.

Release: A version of your application uploaded to the Play Store.

Version Code: A unique integer used by Android to identify each release.
Example:
1
2
3
4
Every new release must have a higher version code.

Version Name: The user-friendly version displayed in the Play Store.
Example
1.0.0
1.0.1
2.0.0

#App Signing: The process of digitally signing an Android application to verify its authenticity.

🧠 Concept (Why?)

Imagine you've completed your app.
Users still cannot install it.
It must first pass through Google's release process.

Developer
↓
EAS Build
↓
AAB
↓
Google Play Console
↓
Review
↓
Published
↓
Users Download App


APK vs AAB
APK	            AAB
Direct install	Play Store upload
Larger size 	Optimized
Testing	        Production

Google Play requires:AAB
----------------------------------

Step 1 — Create Play Console Account

Requirements:
Google Account
One-time registration fee
Developer profile

Once approved:
Google Play Console
↓
Create Application

Step 2 — Build Production AAB
eas build --platform android --profile production
Output:
app-release.aab


Step 3 — Create New App
Inside Play Console

Create App
↓
Name
↓
Default Language
↓
Category
↓
Free / Paid

Step 4 — Complete Store Listing

Required information:
App Name
Short Description
Full Description
Screenshots
App Icon
Feature Graphic
Privacy Policy

Required Assets
Asset	            Example
App Icon	        512 × 512
Feature Graphic	    1024 × 500
Phone Screenshots	Required
Tablet Screenshots	Optional


Step 5 — Upload AAB

Production
↓
Create Release
↓
Upload AAB
↓
Save

Google automatically validates the bundle.


Step 6 — App Signing

Google recommends:
Play App Signing

Flow:

Developer
↓
Upload AAB
↓
Google Signs App
↓
Users Download

This protects your signing key.

Versioning

In app.json

{
  "expo": {
    "version": "1.0.0",
    "android": {
      "versionCode": 1
    }
  }
}

Next update:

{
  "expo": {
    "version": "1.0.1",
    "android": {
      "versionCode": 2
    }
  }
}

Rules:

versionCode
Always Increase

---------------
version
Can be Any Semantic Version


----------------------------
Release Tracks

Google provides multiple release stages.

Internal Testing:
Developer
↓
QA Team
↓
Internal Testers
Fastest way to test.

Closed Testing:
Developer
↓
Selected Users
Useful for beta testing.

Open Testing:
Anyone Can Join
Public beta.

Production:
Everyone

Live release.

Which Track Should You Use?
Track	        Purpose
Internal	    Developers
Closed	        QA/Beta
Open	        Public Beta
Production	    Real Users


Release Workflow
Developer
↓
Internal Testing
↓
Bug Fixes
↓
Closed Testing
↓
More Fixes
↓
Production

Production teams rarely publish directly.

--------------------------------

Play Console Checklist

Before submitting:

App Icon
Splash Screen
Screenshots
Privacy Policy
Permissions Explained
App Category
Contact Email
Version Updated
Data Safety

Google asks:
Does your app collect:

Location?
Contacts?
Photos?
Camera?
Microphone?

Answer honestly.
Permissions

Explain why your app requests:
Example:
Camera
↓
Capture Profile Photo

Not:
Camera
↓
Unknown Purpose
Apps can be rejected for unclear permission usage.

Production Flow
Code
↓
EAS Build
↓
AAB
↓
Play Console
↓
Internal Test
↓
Closed Test
↓
Production
↓

Users
Production Folder
app.json
eas.json
assets/
icon.png
adaptive-icon.png
splash.png

Common Reasons for Rejection
❌ Missing Privacy Policy
❌ Misleading Screenshots
❌ Broken Login
❌ Crashes
❌ Sensitive Permissions
❌ Incomplete Store Listing

Version Update Workflow
Bug Fixed
↓
Increase Version
↓
New Build
↓
Upload AAB
↓
Review
↓
Release

Internal Working
Developer
↓
Build AAB
↓
Upload
↓
Google Validation
↓
Virus Scan
↓
Policy Review
↓
Available on Play Store

Production Best Practices
Always test Internal first.
Use semantic versioning.
Keep release notes.
Upload meaningful screenshots.
Monitor crash reports after release.
Keep Play Console information updated.

❌ Common Mistakes
❌ Forgetting to increase versionCode.
❌ Uploading APK instead of AAB.
❌ Publishing without testing.
❌ Missing Privacy Policy.
❌ Ignoring Play Console warnings.

📝 Quick Definitions
Play Console: Google's app management portal.
Version Code: Internal build number.
Version Name: Version shown to users.
Release Track: Deployment stage.
App Signing: Digital signature proving the app is authentic.

📄 Revision Notes
Build a production AAB.
Create a Play Console application.
Complete the store listing.
Upload the AAB.
Increment versionCode for every update.
Test using Internal/Closed tracks before Production.
Review Data Safety and permissions carefully.

React Native Code
        │
        ▼
EAS Build
        │
        ▼
AAB Generated
        │
        ▼
Google Play Console
        │
        ▼
Internal Testing
        │
        ▼
Production Release
        │
        ▼
Users Install App
------------------------

Production Insight

A typical Android release pipeline in a production team looks like this:

Developer Completes Feature
          │
          ▼
Code Review
          │
          ▼
Merge to Main Branch
          │
          ▼
EAS Production Build (.aab)
          │
          ▼
Upload to Play Console
          │
          ▼
Internal Testing
          │
          ▼
Closed Testing
          │
          ▼
Production Release
          │
          ▼
Firebase Crashlytics & Analytics Monitor Release
          │
          ▼
Bug Fix Release (Version +1)

---------------------------------

Apple Developer Program: Apple's paid developer membership that allows you to build, test, and publish iOS apps.

App Store Connect: Apple's portal to manage iOS applications, TestFlight builds, users, and App Store releases.

Certificate: A digital identity that proves you are the developer of the application.

Provisioning Profile: A file that connects your app, device, certificate, and developer account so iOS knows the app is trusted.

TestFlight: Apple's official platform for distributing beta versions of iOS apps to testers.

🧠 Concept (Why?)

Without signing:
App
↓
Unknown Developer
↓
iPhone Blocks Installation

With Apple signing:
App
↓
Certificate
↓
Provisioning Profile
↓
Apple Verification
↓
App Installs Successfully

Apple verifies every application before allowing users to install it.

iOS Release Architecture
Developer
↓
React Native Code
↓
EAS Build
↓
IPA
↓
App Store Connect
↓
TestFlight
↓
App Review
↓
App Store


--------------------------

Step 1 — Apple Developer Account

Requirements:
Apple ID
Apple Developer Membership
Organization or Individual account

Step 2 — Configure app.json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.company.myapp"
    }
  }
}

Example:
com.mycompany.smartcafe
The Bundle Identifier must be unique.

Step 3 — Build Production IPA
eas build --platform ios --profile production

Output:
MyApp.ipa

Step 4 — Credentials

When building for the first time:

EAS
↓
Generate Certificates?
↓
Yes

Expo can automatically create:

Distribution Certificate
Provisioning Profile

This simplifies the iOS setup significantly.

Step 5 — App Store Connect

Create a new application.

Required details:
App Name
Bundle Identifier
SKU
Primary Language


Step 6 — Upload IPA

Using EAS:

eas submit --platform ios
or upload manually through Apple's tools.

Step 7 — TestFlight

Upload Build
↓
Processing
↓
Internal Testers
↓
External Testers
↓
Feedback
↓
Bug Fixes

Production teams almost always use TestFlight before public release.

TestFlight Workflow
Developer
↓
IPA Upload
↓
TestFlight
↓
QA Team
↓
Fix Bugs
↓
Production


App Review

Apple reviews:

Crashes
UI
Performance
Privacy
Permissions
Login
Functionality
Policy Compliance

Only after approval:

App Store Release
Versioning

In app.json

{
  "expo": {
    "version": "1.0.0",
    "ios": {
      "buildNumber": "1"
    }
  }
}

Next release:

{
  "expo": {
    "version": "1.0.1",
    "ios": {
      "buildNumber": "2"
    }
  }
}
Android vs iOS Versioning
Android	    iOS
versionCode	buildNumber
version	    version

Production Workflow
Code
↓
EAS Build
↓
IPA
↓
App Store Connect
↓
TestFlight
↓
App Review
↓
App Store

Required Assets
App Icon
Splash Screen
Screenshots
App Description
Privacy Policy
Support URL
Marketing URL (optional)
Common Reasons for Rejection

❌ App crashes
❌ Broken navigation
❌ Login not working
❌ Missing Privacy Policy
❌ Requesting unnecessary permissions
❌ Placeholder content
❌ Poor user experience

Permission Usage Descriptions

For iOS, you must explain why you request permissions.

Examples in app.json:

{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSCameraUsageDescription": "This app uses the camera to capture profile photos.",
        "NSLocationWhenInUseUsageDescription": "This app uses your location to show nearby stores."
      }
    }
  }
}

If these descriptions are missing, your app may crash when requesting permissions or be rejected during review.

Internal Working
Developer
↓
EAS Build
↓
Certificates
↓
Provisioning Profile
↓
IPA
↓
Upload
↓
Apple Review
↓
App Store

Production Folder
app.json
eas.json
assets/
icon.png
splash.png
adaptive-icon.png
Release Checklist

Before submission:

Test on real iPhone
Check all permissions
Verify API URLs
Update version/build number
Verify app icon and splash screen
Remove debug logs
Test login and logout
Test offline handling
Production Best Practices
Use TestFlight for every release.
Keep bundle identifiers stable.
Increment build numbers.
Test on multiple iOS versions.

Monitor crash reports after release.
❌ Common Mistake
❌ Changing the bundle identifier after publishing.
❌ Forgetting to update the build number.
❌ Uploading an untested build.
❌ Missing permission descriptions.
❌ Ignoring App Store review guidelines.

📝 Quick Definitions
App Store Connect: Apple's portal for managing iOS apps.
Certificate: Developer identity used to sign apps.
Provisioning Profile: Connects your app with your developer account and allowed devices/services.
TestFlight: Apple's beta testing platform.
Bundle Identifier: A unique identifier for your iOS application.

📄 Revision Notes
Join the Apple Developer Program.
Configure a unique bundleIdentifier.
Build an IPA using EAS.
Upload to App Store Connect.
Test with TestFlight.
Increment buildNumber for each release.
Provide permission usage descriptions.
Submit for App Review.
Android vs iOS Release Comparison
Android	iOS
Play Console	App Store Connect
AAB	IPA
versionCode	buildNumber
Internal Testing	TestFlight
Google Review	Apple Review

Complete Mobile Release Pipeline
React Native Code
        │
        ▼
EAS Build
        │
        ├──────────────┐
        ▼              ▼
Android (.aab)     iOS (.ipa)
        │              │
        ▼              ▼
Play Console    App Store Connect
        │              │
        ▼              ▼
Internal Test   TestFlight
        │              │
        ▼              ▼
Production Review
        │
        ▼
Users Download App

This is the end-to-end deployment process followed by most Expo-based production applications.