# Firebase

## Create Firebase Project

Create Firebase project

Register app → Select Android

Set Android package name:

`com.vignesh.rnfcmlearning`

Download `google-services.json`

---

## Create Expo Project

```bash
npx create-expo-app@latest rn-fcm-learning
```

Install notification packages:

```bash
npx expo install expo-notifications expo-device expo-constants
```

Place `google-services.json` in project root.

Configure `app.json`:

```json
"android": {
  "package": "com.vignesh.rnfcmlearning",
  "googleServicesFile": "./google-services.json"
}
```

Verify Expo configuration:

```bash
npx expo config --type public
```

---

## EAS Configuration

Install EAS CLI:

```bash
npm install -g eas-cli
```

If `eas` command is not recognized:

```bash
npx eas-cli@latest login
```

Login to EAS:

```bash
npx eas-cli@latest login
```

Configure EAS:

```bash
npx eas-cli@latest build:configure
```

Create Android development build:

```bash
npx eas-cli@latest build --profile development --platform android
```

Install development APK on physical Android phone.

### Note

Use a physical Android phone instead of Android Emulator to avoid laptop performance issues.

---

# FCM Push Notifications

## Request Notification Permission

Create:

`src/services/notifications.js`

Use:

`expo-notifications`

Flow:

```text
App starts
    ↓
Check notification permission
    ↓
Request permission if needed
    ↓
User allows
    ↓
Permission granted
```

Important:

```text
Permission ≠ FCM Token
```

Permission only allows the application to use notifications.

It does not itself represent the device's FCM address.

---

# Get Device / FCM Token

Use:

```js
const token = (
  await Notifications.getDevicePushTokenAsync()
).data;

console.log("FCM Token:", token);
```

Important:

`getDevicePushTokenAsync()`

→ Gets the native device push token

→ On Android, this is the FCM token used by Firebase Cloud Messaging

Flow:

```text
React Native / Expo
        ↓
Notification permission
        ↓
Native device push token
        ↓
FCM token on Android
```

---

# Important Concept — Who Generates the Token and Who Delivers the Notification?

This is an important distinction for understanding the architecture.

In the current project, **Expo is not the push notification delivery server**.

We are using **direct Firebase Cloud Messaging (FCM)**.

### Main responsibilities

```text
Expo / React Native
        ↓
Provides the application-side notification API
and access to the native push notification system


Android
        ↓
Provides the native Android environment
for the application


Firebase FCM
        ↓
Provides the FCM registration token
and handles push notification delivery


Node.js Backend
        ↓
Stores the token
and requests Firebase to send notifications


Firebase Admin SDK
        ↓
Allows the Node.js backend to securely communicate
with Firebase FCM
```

### Token flow

When the application executes:

```js
const token = (
  await Notifications.getDevicePushTokenAsync()
).data;
```

the application is requesting the **native device push token**.

Conceptually:

```text
React Native / Expo
        ↓
expo-notifications
        ↓
Android native notification system
        ↓
Firebase Cloud Messaging
        ↓
FCM registration token
```

The resulting token is then sent to our backend.

```text
FCM Token
    ↓
POST /device-token
    ↓
Node.js Backend
```

### Notification delivery flow

The notification is NOT sent directly from Expo to the Android device.

Our current architecture is:

```text
Postman / Application
        ↓
Node.js Backend
        ↓
Firebase Admin SDK
        ↓
Firebase Cloud Messaging (FCM)
        ↓
FCM Token
        ↓
Android Device
        ↓
Notification
```

Therefore:

```text
Expo
  = React Native/application-side integration

FCM
  = Push notification token + delivery service

Node.js
  = Our application backend / notification sender

Firebase Admin SDK
  = Backend interface to Firebase services
```

---

# Direct FCM vs Expo Push Service

There are two concepts that can be confused.

### Expo Push Service

```text
React Native
      ↓
Expo Push Token
      ↓
Expo Push Service
      ↓
FCM / APNs
      ↓
Device
```

Here Expo provides the push service layer.

### Current Project — Direct FCM

We are using:

```text
React Native / Expo
        ↓
Native FCM Token
        ↓
Node.js Backend
        ↓
Firebase Admin SDK
        ↓
Firebase FCM
        ↓
Android Device
```

Therefore this project is learning **direct FCM integration**, not the Expo Push Service.

---

# Send FCM Token to Node.js Backend

Create Node.js backend:

```text
firebase-backend/

├── server.js
├── package.json
├── serviceAccountKey.json
└── .gitignore
```

Install:

```bash
npm init -y
npm install express cors
```

Create endpoint:

```text
POST /device-token
```

Flow:

```text
React Native
    ↓
FCM token
    ↓
POST /device-token
    ↓
Node.js
    ↓
Store token temporarily
```

Current implementation:

```js
let deviceToken = null;
```

Note:

Token is currently stored in memory only.

If Node.js restarts, the token is lost.

---

# Connect Firebase Admin SDK

Install:

```bash
npm install firebase-admin
```

Firebase Console:

Project Settings

→ Service Accounts

→ Firebase Admin SDK

→ Generate new private key

Download:

`serviceAccountKey.json`

Place it only inside the Node.js backend.

Important:

```text
google-services.json
        ↓
React Native / Android app


serviceAccountKey.json
        ↓
Node.js backend
```

Never put `serviceAccountKey.json` inside the Expo app.

Add to `.gitignore`:

```text
node_modules/

serviceAccountKey.json

.env
```

Initialize Firebase Admin:

```js
import { initializeApp, cert } from "firebase-admin/app";

import { getMessaging } from "firebase-admin/messaging";

import serviceAccount from "./serviceAccountKey.json" with { type: "json" };

initializeApp({
  credential: cert(serviceAccount),
});

const messaging = getMessaging();
```

---

# Send Notification From Node.js

Create endpoint:

```text
POST /send-notification
```

Use Firebase Admin Messaging:

```js
const message = {
  token: deviceToken,

  notification: {
    title: "FCM Test",
    body: "Hello from your Node.js backend!",
  },

  data: {
    screen: "home",
  },
};

const response = await messaging.send(message);
```

Test using Postman:

```text
POST http://localhost:5000/send-notification
```

Flow:

```text
Postman
    ↓
Node.js
    ↓
Firebase Admin SDK
    ↓
Firebase FCM
    ↓
Android phone
    ↓
Notification popup
```

---

# Complete Token + Notification Workflow

```text
                    FIREBASE
                       │
                       ▼
               Firebase Project
                       │
                       ▼
                 Android App
                       │
                       ▼
              google-services.json
                       │
                       ▼
              React Native / Expo
                       │
                       ▼
             expo-notifications
                       │
                       ▼
             Notification Permission
                       │
                       ▼
             getDevicePushTokenAsync()
                       │
                       ▼
                Native FCM Token
                       │
                       │
                       ▼
              POST /device-token
                       │
                       ▼
                Node.js Backend
                       │
                       ▼
              Firebase Admin SDK
                       │
                       ▼
              POST /send-notification
                       │
                       ▼
               Firebase FCM
                       │
                       ▼
                 FCM Token
                       │
                       ▼
                Android Device
                       │
                       ▼
                 Notification
```

### Key Concept

```text
Expo does NOT directly deliver the notification.

Expo / React Native
        ↓
gets/uses the native push token
        ↓
Node.js Backend
        ↓
Firebase Admin SDK
        ↓
Firebase FCM
        ↓
Android
        ↓
Notification
```

---

# FCM Implementation Status

✅ Firebase project created

✅ Android app registered

✅ google-services.json downloaded

✅ Expo project created

✅ Expo notification packages installed

✅ Expo Android configuration

✅ EAS configured

✅ Development APK created

✅ Development APK installed on physical Android

✅ Notification permission working

✅ FCM device token received

✅ Node.js backend created

✅ FCM token sent to Node.js

✅ Firebase Admin SDK configured

✅ Firebase service-account key configured

✅ `/send-notification` endpoint created

✅ Notification sent through Firebase FCM

✅ Notification popup received on Android phone

---

# Test Notification App States

FCM notification delivery should be tested in 3 states:

1. Foreground
2. Background
3. Closed

## Foreground

App is currently open.

Flow:

```text
Node.js
    ↓
Firebase FCM
    ↓
Android
    ↓
App is open
    ↓
Notification displayed
```

Use notification handler:

```js
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
```

Status:

✅ Foreground notification working

---

## Background

App is minimized but still running.

Flow:

```text
Node.js
    ↓
Firebase FCM
    ↓
Android
    ↓
Notification displayed
    ↓
User taps notification
    ↓
App opens
```

Status:

✅ Background notification working

---

## Closed

App is removed from recent apps / not running.

Flow:

```text
Node.js
    ↓
Firebase FCM
    ↓
Android
    ↓
Notification displayed
    ↓
User taps notification
    ↓
App launches
```

Status:

✅ Closed-state notification working

Note:

Notification delivery works even when the React Native app is not currently running because FCM/Android handles the notification delivery.

---

# Current FCM Flow

```text
React Native / Expo
        ↓
Notification permission
        ↓
FCM device token
        ↓
Node.js backend
        ↓
Firebase Admin SDK
        ↓
Firebase FCM
        ↓
Android phone
        ↓
Notification
```

App states tested:

```text
Foreground    ✅
Background    ✅
Closed        ✅
```

---

# Notification Tap Handling

Goal:

```text
User taps notification
        ↓
Read notification data
        ↓
Get target route
        ↓
Expo Router
        ↓
Navigate to specific screen
```

Example:

```text
Notification
      ↓
Tap
      ↓
data.route = "/order"
      ↓
Expo Router
      ↓
Order Details screen
```

---

# Create Target Screen

Example:

```text
app/

├── index.js
└── order.js
```

`order.js`:

```js
import { View, Text } from "react-native";

export default function OrderScreen() {
  return (
    <View>
      <Text>Order Details</Text>
    </View>
  );
}
```

---

# Send Route Through FCM

Node.js notification:

```js
const message = {
  token: deviceToken,

  notification: {
    title: "Order Approved",
    body: "Your order has been approved!",
  },

  data: {
    route: "/order",
  },
};
```

Important:

```text
notification
├── title
└── body

data
└── route
```

Concept:

```text
notification
    ↓
Information displayed to the user

data
    ↓
Additional application information
```

For our example:

```text
data.route
    ↓
"/order"
    ↓
Expo Router
    ↓
Order screen
```

---

# Listen for Notification Tap

In:

`src/services/notifications.js`

```js
export function setupNotificationListeners(router) {
  const subscription =
    Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const route =
          response.notification.request.content.data.route;

        console.log("Notification route:", route);

        if (route) {
          router.push(route);
        }
      }
    );

  return () => subscription.remove();
}
```

Flow:

```text
User taps notification
        ↓
Notification response received
        ↓
Read data.route
        ↓
"/order"
        ↓
router.push("/order")
        ↓
Order Details
```

---

# Connect Notification Listener With Expo Router

In:

`_layout.js`

```js
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

import {
  setupNotificationListeners,
  handleInitialNotification,
} from "../services/notifications";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const cleanup = setupNotificationListeners(router);

    handleInitialNotification(router);

    return cleanup;
  }, [router]);

  return <Stack />;
}
```

---

# Closed-App Notification Tap

Problem:

When the app is running in the background:

```text
Notification tap
    ↓
Listener receives event
    ↓
router.push()
```

When the app is completely closed:

```text
Notification tap
    ↓
App launches
    ↓
Listener may not be registered yet
    ↓
Check the notification that launched the app
```

Use:

```js
export async function handleInitialNotification(router) {
  const response =
    await Notifications.getLastNotificationResponseAsync();

  if (!response) {
    return;
  }

  const route =
    response.notification.request.content.data.route;

  console.log("Initial notification route:", route);

  if (route) {
    router.push(route);
  }
}
```

Flow:

```text
Notification
     ↓
User taps
     ↓
App launches
     ↓
getLastNotificationResponseAsync()
     ↓
Read data.route
     ↓
router.push()
     ↓
Order Details
```

---

# Complete FCM Architecture

```text
📱 React Native / Expo
        │
        │
        │ Native FCM Token
        ▼
🖥️ Node.js Backend
        │
        │ Firebase Admin SDK
        ▼
🔥 Firebase FCM
        │
        ▼
📱 Android Phone
        │
        ├── Foreground
        ├── Background
        └── Closed
                │
                ▼
          🔔 Notification
                │
                ▼
             👆 Tap
                │
                ▼
        Notification Data
                │
                ▼
          Expo Router
                │
                ▼
        📱 Specific Screen
```

---

# FCM Implementation — Final Status

```text
Firebase project                    ✅
Android app registration            ✅
google-services.json                ✅
Expo + EAS configuration            ✅
Development APK                     ✅
Physical Android device             ✅
Notification permission              ✅
FCM device token                    ✅
Token → Node.js                     ✅
Firebase Admin SDK                  ✅
Service account configuration       ✅
Node.js → Firebase FCM              ✅
Push notification                   ✅
Foreground notification             ✅
Background notification             ✅
Closed-app notification             ✅
Notification data                   ✅
Notification tap                    ✅
Expo Router navigation              ✅
Closed-app navigation               ✅
```

---

# Important Files

## React Native

```text
rn-fcm-learning/

├── app/
│   ├── index.js
│   ├── order.js
│   └── _layout.js
│
├── src/
│   └── services/
│       └── notifications.js
│
├── google-services.json
├── app.json
└── package.json
```

## Node.js

```text
firebase-backend/

├── server.js
├── serviceAccountKey.json
├── .gitignore
└── package.json
```

Important:

```text
google-services.json
        ↓
Android / Expo app configuration


serviceAccountKey.json
        ↓
Node.js server authentication
```

Never expose `serviceAccountKey.json` to the mobile application.

---

# Current FCM Learning Status

```text
Firebase
   ↓
FCM Push Notifications
   ↓
Native FCM Token
   ↓
Backend
   ↓
Firebase Admin SDK
   ↓
Firebase FCM
   ↓
Notification
   ↓
App States
   ↓
Notification Tap
   ↓
Notification Data
   ↓
Expo Router
   ↓
Specific Screen
```

## Core FCM Implementation

✅ COMPLETE

## Next Topics

⬜ FCM production concepts

⬜ Token lifecycle

⬜ Multiple devices/users

⬜ Invalid/expired tokens

⬜ Notification vs Data messages

⬜ Android notification channels

⬜ Store tokens in database

⬜ Better backend notification service

⬜ FCM troubleshooting

---

# After FCM Is Fully Covered

```text
FCM
 ↓
Crashlytics
 ↓
Analytics
 ↓
Authentication
 ↓
Remote Config
 ↓
App Check
 ↓
Firestore / Storage
```

## Current Learning Position

```text
              CORE FCM
                 │
                 ▼
            ✅ COMPLETE
                 │
                 ▼
        Token Lifecycle
                 │
                 ▼
      Multiple Devices / Users
                 │
                 ▼
       Invalid / Expired Tokens
                 │
                 ▼
    Notification vs Data Messages
                 │
                 ▼
     Android Notification Channels
                 │
                 ▼
        Store Tokens in DB
                 │
                 ▼
    Better Backend Notification Service
                 │
                 ▼
       FCM Troubleshooting
```
# FCM Token Lifecycle

An FCM token is **not permanent**.

Firebase/FCM can provide a new token for the same app installation.

Example:

```text
TOKEN_A
   ↓
Token refresh
   ↓
TOKEN_A_NEW
```

Therefore, the backend should always be able to update the stored token.

---

# Token Refresh Flow

```text
React Native / Expo
        ↓
FCM Token
        ↓
Token changes
        ↓
New FCM Token
        ↓
Send updated token to Backend
        ↓
Backend updates stored token
```

Important concept:

```text
Old token
    ↓
No longer use

New token
    ↓
Use for future notifications
```

Example:

```text
Before:

User: Vignesh
Token: TOKEN_A


After token refresh:

User: Vignesh
Token: TOKEN_A_NEW
```

The backend should update:

```text
TOKEN_A
   ↓
TOKEN_A_NEW
```

rather than keeping an outdated token as the active token for that device.

---

# Multiple Devices Per User

A single user can use the application on multiple devices.

Example:

```text
Vignesh
├── Phone  → TOKEN_A
└── Tablet → TOKEN_B
```

Therefore, an FCM token should be associated with a **device/app installation**, not treated as the user's only token.

Example backend representation:

```js
[
  {
    userId: "vignesh",
    deviceId: "phone-001",
    fcmToken: "TOKEN_A",
  },
  {
    userId: "vignesh",
    deviceId: "tablet-001",
    fcmToken: "TOKEN_B",
  },
  {
    userId: "rahul",
    deviceId: "phone-002",
    fcmToken: "TOKEN_C",
  },
]
```

For Vignesh:

```text
TOKEN_A
TOKEN_B
```

belong to his two registered devices.

---

# Send Notification To All User Devices

If Vignesh has:

```text
Phone  → TOKEN_A
Tablet → TOKEN_B
```

and the backend needs to notify Vignesh:

```text
Node.js Backend
       ↓
Find Vignesh's registered devices
       ↓
TOKEN_A + TOKEN_B
       ↓
Firebase Admin SDK
       ↓
FCM
       ↓
Phone + Tablet
```

Therefore:

```text
One user
   ↓
Multiple device registrations
   ↓
Multiple FCM tokens
```

---

# Device-Specific Logout

Logout should be handled per device.

Example:

```text
Vignesh
├── Phone  → TOKEN_A
└── Tablet → TOKEN_B
```

If Vignesh logs out from the phone:

```text
Phone
   ↓
Logout
   ↓
Remove/deactivate TOKEN_A
```

The tablet remains registered:

```text
Vignesh
├── Phone  → removed
└── Tablet → TOKEN_B
```

Important:

```text
Device logout
≠
Remove every token belonging to the user
```

Only the current device registration should normally be removed/deactivated.

---

# Login Again After Logout

Suppose:

```text
Before logout:

Phone  → TOKEN_A
Tablet → TOKEN_B
```

Phone logs out:

```text
TOKEN_A → removed
```

Later the user logs in again on the same phone and Firebase provides:

```text
TOKEN_A_NEW
```

The backend should contain:

```text
Vignesh
├── Phone  → TOKEN_A_NEW
└── Tablet → TOKEN_B
```

It should not keep the old phone token as an active registration.

---

# Device Registration Concept

Instead of thinking:

```text
User → FCM Token
```

think:

```text
User
  ↓
Device Registration
  ↓
FCM Token
```

Example:

```text
User
 │
 ├── Phone
 │     └── FCM Token
 │
 └── Tablet
       └── FCM Token
```

This makes token refresh, multiple devices, and logout easier to manage.

---

# Recommended Backend Device Registration

Instead of the current temporary:

```js
let deviceToken = null;
```

a production application should store device registrations in a database.

Example:

```text
device_tokens

------------------------------------------------
id | userId | deviceId | fcmToken | isActive
------------------------------------------------
1  | Vignesh| phone-01 | TOKEN_A  | true
2  | Vignesh| tablet-01| TOKEN_B  | true
3  | Rahul  | phone-02 | TOKEN_C  | true
```

The current project uses in-memory storage for learning.

```text
In-memory storage
        ↓
Good for learning/testing

Database
        ↓
Required for persistent production storage
```

---

# Complete Token Lifecycle

```text
App Install / Login
        ↓
Get FCM Token
        ↓
Send Token To Backend
        ↓
Backend Stores Device Registration
        ↓
Notification Sending
        ↓
Token May Refresh
        ↓
Send New Token
        ↓
Backend Updates Device Registration
        ↓
User Logs Out
        ↓
Deactivate / Remove Current Device Token
        ↓
User Logs In Again
        ↓
Register Current Token Again
```

---

# Updated FCM Architecture

```text
                    React Native / Expo
                            │
                            ▼
                    Notification Permission
                            │
                            ▼
                     FCM Device Token
                            │
                            ▼
                    Device Registration
                            │
                            ▼
                     Node.js Backend
                            │
                    ┌───────┴────────┐
                    │                │
                    ▼                ▼
              Store Token       User / Device
                    │
                    ▼
             Firebase Admin SDK
                    │
                    ▼
             Firebase Cloud Messaging
                    │
             ┌──────┴──────┐
             ▼             ▼
          Phone          Tablet
             │             │
             └──────┬──────┘
                    ▼
               Notification
```

---

# Important FCM Concepts Learned

```text
FCM Token
    ↓
Identifies a specific app/device registration

User
    ↓
Can have multiple devices

Token Refresh
    ↓
New token must be synchronized with backend

Logout
    ↓
Current device registration should be removed/deactivated

Database
    ↓
Production application should persist device registrations
```

---

# Updated FCM Learning Status

```text
Firebase project                    ✅
Android app registration            ✅
google-services.json                ✅
Expo + EAS configuration            ✅
Development APK                     ✅
Physical Android device             ✅
Notification permission             ✅
FCM device token                    ✅
Token → Node.js                     ✅
Firebase Admin SDK                  ✅
Service account configuration       ✅
Node.js → Firebase FCM              ✅
Push notification                   ✅
Foreground notification             ✅
Background notification             ✅
Closed-app notification             ✅
Notification data                   ✅
Notification tap                    ✅
Expo Router navigation              ✅
Closed-app navigation               ✅
Token lifecycle                     ✅
Token refresh concept               ✅
Multiple devices concept            ✅
Device-specific logout concept      ✅

```

# Next FCM Topics

⬜ Invalid / expired tokens

⬜ Notification vs Data messages

⬜ Android notification channels

⬜ Store tokens in database

⬜ Send notification to specific user

⬜ Send notification to multiple devices

⬜ FCM topics

⬜ Better backend notification service

⬜ FCM troubleshooting

⬜ Production FCM architecture

---

# Overall Firebase Roadmap

```text
FCM
 ↓
Crashlytics
 ↓
Analytics
 ↓
Authentication
 ↓
Remote Config
 ↓
App Check
 ↓
Firestore
 ↓
Storage
 ↓
Security Rules
 ↓
Performance Monitoring
 ↓
Cloud Functions
```
