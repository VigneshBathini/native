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
