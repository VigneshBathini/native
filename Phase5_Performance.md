Performance: Performance is how quickly and smoothly an application responds to user interactions.

Render: Rendering is the process of React creating or updating the UI.

Re-render: A re-render happens when React updates an existing component because its state, props, or context changed.

Bottleneck: A bottleneck is the slowest part of the application that limits overall performance.

FPS (Frames Per Second): FPS measures how many frames are displayed every second.
60 FPS = Smooth animations
30 FPS = Noticeable lag
15 FPS = Poor user experience

Performance Fundamentals ✅
        ↓
React.memo (Advanced)
        ↓
useMemo
        ↓
useCallback
        ↓
FlatList Optimization
        ↓
Image Optimization

Performance Categories
1. Rendering Performance
Example:Too many re-renders
Solution:React.memo

2. List Performance
Example: 1000 Products
Solution: FlatList

3. Image Performance
Example:10MB Images
Solution:Image Caching

4. Network Performance
Example:Repeated API Calls
Solution:React Query Cache

5. JavaScript Performance
Example:Expensive Calculations
Solution:useMemo

Real Production Example

Shopping App

Home Screen
↓
Banner
↓
Categories
↓
500 Products
↓
Recommendations
↓
Footer

User types:iPhone

Bad implementation:Everything Re-renders

Optimized implementation:Only Search Results Update

Huge difference.

How React Optimizes

React compares:

Old UI
↓
New UI
↓
Difference
↓
Update Only Changes

This process is called Reconciliation.

⚙️ Internal Working
User Action
↓
State Update
↓
React Re-render
↓
Compare Virtual UI
↓
Update Native Views
↓
Display Screen

Performance Pyramid
Performance
│
├── Avoid Re-renders
├── Optimize Lists
├── Optimize Images
├── Cache APIs
├── Memoization
└── Native Optimizations

Tools Used by Production Teams
React DevTools
React Native Performance Monitor
Flipper
Android Profiler
Xcode Instruments
Firebase Crashlytics
Sentry

Best Practices
Keep components small.
Avoid unnecessary state.
Use FlatList for long lists.
Cache API responses.
Optimize images.
Measure before optimizing.

---------------------------------------------
React.memo

React.memo is a Higher Order Component (HOC) that prevents a functional component from re-rendering if its props haven't changed.

Memoization:Memoization means storing a previous result and reusing it instead of computing it again.

Shallow Comparison :React compares only the first level of props using reference equality (===), not deep object contents.

Reference Equality
const a = { name: "John" };
const b = { name: "John" };

a === b // false

Even though the values are the same, they are different objects in memory.

How React Compares Props

Example:

<Child
  name="Vignesh"
  age={25}
/>

React checks:

oldProps.name === newProps.name
oldProps.age === newProps.age

If both are true:

Skip Rendering


Object Props
<Child
  user={{
    name: "Vignesh",
  }}
/>

Every render creates a new object.

React compares:

oldUser === newUser

Result

false

Even though:

name = Vignesh

The reference changed.

So the child re-renders.

Why?

Memory:

Render 1

Object A

↓

0x001

Render 2

Object B

↓

0x002

Different references.

Function Props
<Child
  onPress={() => {}}
/>

Every render creates:

New Function

Comparison

oldFunction === newFunction

False.

Child re-renders.

This is why we'll learn useCallback next.


React.memo
      │
      ▼
Checks Props
      │
      ▼
Object Changes?
      │
      ├── Yes → Render
      │
      └── No → Skip
                 │
                 ▼
        useMemo keeps object references stable
                 │
                 ▼
        useCallback keeps function references stable


Memoize expensive child components.
Measure before adding React.memo.
Combine with useMemo and useCallback when passing objects or functions.
Keep props simple when possible.


📝 Quick Definitions
React.memo

Prevents unnecessary re-renders when props don't change.

Shallow Comparison

Compares first-level props using ===.

Reference Equality

Checks whether two variables point to the same object/function in memory.

Memoization

Stores and reuses previous results.

📄 Revision Notes
Parent re-render doesn't always require child re-render.
React.memo compares previous and new props.
Primitive values are easy to compare.
Objects and functions change reference unless memoized.
React.memo works best with stable props.

--------------------------------

useMemo

useMemo is a React Hook that caches (memoizes) a calculated value and recomputes it only when its dependencies change.

useMemo and React.memo

Consider this:

<Child
  user={{
    name: "Vignesh",
  }}
/>

Every render creates a new object.

Even with React.memo, the child re-renders.

Solution
const user = useMemo(() => {
  return {
    name: "Vignesh",
  };
}, []);

<Child user={user} />

Now:

Same Object Reference

↓

React.memo

↓

Skip Render

This is one of the most common production patterns.

✅ Best Practices
Use useMemo for expensive calculations.
Use it to keep object references stable.
Pair it with React.memo when passing objects.
Always provide the correct dependencies.
Avoid mutating arrays or objects inside useMemo.


Primitive Values (number, string, boolean)
            │
            ▼
Compared by Value (===)

25 === 25 ✅
"John" === "John" ✅

--------------------------------

Objects / Arrays / Functions
            │
            ▼
Compared by Reference (===)

{} === {} ❌
[] === [] ❌
() => {} === () => {} ❌

--------------------------------

useMemo
            │
            ▼
Keeps Object/Array Reference Stable

useCallback
            │
            ▼
Keeps Function Reference Stable

React.memo
            │
            ▼
Uses those stable references to skip unnecessary re-renders.

-----------------

Virtualization: Rendering only visible items.

keyExtractor: Provides a stable unique key for each list item.

windowSize: Number of screens kept rendered around the visible area.

getItemLayout: Precomputes item positions for fixed-height lists.

FlatList renders only visible items.
Stable keys are essential.
memo reduces unnecessary item re-renders.
getItemLayout improves scrolling performance.
Tune initialNumToRender, maxToRenderPerBatch, and windowSize based on your use case.

----------------------

Use expo-image for remote images.
Cache remote images.
Resize images before serving them.
Prefer WebP for better compression.
Load only visible images.

----------------------
Accessibility (often shortened to A11y, because there are 11 letters between A and Y) makes your app usable for more people and is an important aspect of production-quality software.

Examples:

VoiceOver (iOS)
TalkBack (Android)
Large Text
Screen Readers

--------------------------
What is an Error Boundary?

A React component that catches rendering errors in its child components and displays a fallback UI.

⚠️ Important Note (React Native)

Error Boundaries do not catch:

Errors inside setTimeout
Async API errors (fetch, axios)
Event handler errors (onPress)
Native crashes

Runnable Example
import React from "react";
import { Text, View } from "react-native";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text>Something went wrong.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

Usage

<ErrorBoundary>
   <HomeScreen />
</ErrorBoundary>

Handle those separately with try...catch, promise error handling, and crash reporting tools like Firebase Crashlytics or Sentry.

Logging

Recording application events for debugging and monitoring.

Log Level

Indicates the severity of a log (info, warn, error).

📄 Revision Notes
Use console.log() for development.
Use a logger abstraction for production.
Never log secrets or personal data.

--------------------------------------------
Crash Reporting


🎯 Objective

Automatically detect crashes, collect useful diagnostic information, and notify developers.

🧠 Why?

Without crash reporting:

User
↓
App Crashes
↓
User Leaves
↓
Developer Doesn't Know Why ❌

With crash reporting:

User
↓
App Crashes
↓
Crash Report Sent
↓
Developer Fixes Issue ✅

Popular Crash Reporting Tools

Firebase Crashlytics ⭐ (Most Common)
Free
Reliable
Google-supported
Widely used

Sentry
Crash reporting
Performance monitoring
Session replay (web)
Breadcrumbs

Crashlytics Flow

App
↓
Crash
↓
Crashlytics SDK
↓
Firebase Console
↓
Developer Reviews


Example (Conceptual)
try {
  riskyOperation();
} catch (error) {
  crashlytics().recordError(error);
}

Or allow an unexpected crash to be captured automatically.

Information Collected
Device Model
OS Version
App Version
Stack Trace
Crash Time
Custom Logs (if added)
Production Example
Payment Screen

↓

Null Error

↓

Crashlytics

↓

Stack Trace

↓

Developer Fixes Bug
⚙️ Internal Flow
Crash

↓

SDK Captures

↓

Uploads Report

↓

Dashboard

↓

Developer Fixes
✅ Best Practices
Integrate Crashlytics early.
Upload source maps/symbols for readable stack traces.
Record non-fatal errors where appropriate.
Monitor crash-free users after every release.
❌ Common Mistakes

❌ Ignoring crash reports.

❌ Releasing without monitoring.

❌ Not uploading debug symbols (results in unreadable stack traces).

📝 Quick Definitions

Crash Reporting

Automatically collecting crash information from users' devices.

Stack Trace

The sequence of function calls leading to an error.

Non-Fatal Error

An error that doesn't crash the app but should still be recorded.

📄 Revision Notes
Crash reporting tells you what failed and where.
Firebase Crashlytics is the most common choice for React Native.
Monitor crashes after every release.

------------------------------------

🚀 Phase 5 – Lesson 11: Jest (Unit Testing)

Phase Progress: 70% → 77% ✅

Overall Progress: ≈99.7%

🎯 Objective

Learn to test individual functions and components automatically.

🧠 Why?

Without tests:

Code Change

↓

Deploy

↓

Hope Nothing Breaks ❌

With tests:

Code Change

↓

Run Tests

↓

Pass ✅

↓

Deploy
What is Jest?

Jest is a JavaScript testing framework used to test functions, utilities, reducers, hooks, and components.

Runnable Example
// utils/sum.js

export const sum = (a, b) => a + b;
// utils/sum.test.js

import { sum } from "./sum";

test("adds two numbers", () => {
  expect(sum(2, 3)).toBe(5);
});

Run:

npm test

Output

✓ adds two numbers
Common Matchers
expect(value).toBe(10);

expect(user).toEqual({
  name: "John"
});

expect(list).toHaveLength(5);

expect(api).toBeDefined();
Best Practices

✅ Test business logic.

✅ Test reducers.

✅ Test utilities.

Don't Test

❌ React Native internals.

❌ Third-party libraries.

📄 Revision
Jest = Testing Framework
Fast
Runs automatically
Prevents regressions
🚀 Phase 5 – Lesson 12: React Native Testing Library (RNTL)

Phase Progress: 77% → 84% ✅

🎯 Objective

Test components the way users interact with them.

🧠 Why?

Instead of testing implementation:

Button Exists?

Test behavior:

User Presses Button

↓

Counter Updates
Runnable Example
import { render, fireEvent } from "@testing-library/react-native";
import App from "./App";

test("increments counter", () => {
  const { getByText } = render(<App />);

  fireEvent.press(getByText("Increase"));

  expect(getByText("1")).toBeTruthy();
});
Common APIs
render()

fireEvent.press()

fireEvent.changeText()

getByText()

getByPlaceholderText()

queryByText()
Best Practices

✅ Test user behavior.

✅ Test visible UI.

❌ Don't test internal state.

📄 Revision

RNTL = Tests components like a real user.

🚀 Phase 5 – Lesson 13: Debugging

Phase Progress: 84% → 91% ✅

🎯 Objective

Find and fix bugs efficiently.

Debugging Flow
Bug

↓

Reproduce

↓

Inspect

↓

Identify Root Cause

↓

Fix

↓

Test Again
Common Tools
Console
console.log()

console.warn()

console.error()
Breakpoints
VS Code

↓

Pause Execution

↓

Inspect Variables
Network Inspection

Check:

Request
Response
Headers
Status Code
React DevTools

Inspect:

Props
State
Hooks
Component Tree
Best Practices

✅ Debug the root cause, not just the symptom.

✅ Remove unnecessary logs before release.

📄 Revision

Debugging = Finding the root cause of issues.

🚀 Phase 5 – Lesson 14: Flipper

Phase Progress: 91% → 100% ✅

🎯 Objective

Inspect and debug React Native applications.

⚠️ Current Status

Historically, Flipper was the standard debugging tool for React Native.

However, the React Native ecosystem has shifted:

New React Native projects increasingly rely on React Native DevTools, Metro DevTools, and platform-specific profilers.
Flipper is still found in many existing production codebases, so it's valuable to understand, but it is no longer the only or primary workflow for many teams.
What Can Flipper Do?
Application

↓

Flipper

├── Logs

├── Network

├── Layout

├── Database

├── Performance

└── React DevTools (older integrations)
Useful Plugins
Logs
Network
Layout Inspector
Databases
Performance
Production Use Cases
API debugging
Redux inspection (when configured)
Database inspection
Performance analysis
Best Practices

✅ Use debugging tools appropriate for your project version.

✅ Learn platform profilers:

Android Studio Profiler
Xcode Instruments
📄 Revision

Flipper is a debugging platform that has been widely used in the React Native ecosystem, but modern projects increasingly use the newer React Native DevTools alongside native profiling tools.