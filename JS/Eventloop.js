// ============================================================
// JAVASCRIPT CONTINUATION NOTES
// EVENT LOOP → CURRYING
// ============================================================


// ============================================================
// 1. EVENT LOOP — DEEPER UNDERSTANDING
// ============================================================

// JavaScript executes code in this general order:
//
// 1. Synchronous code
// 2. Microtask queue
// 3. Task / Macrotask queue
//
// Microtasks:
// - Promise.then()
// - Promise.catch()
// - Promise.finally()
// - queueMicrotask()
//
// Tasks / Macrotasks:
// - setTimeout()
// - setInterval()
//
// ⭐ IMPORTANT:
//
// After synchronous code finishes,
// JavaScript processes ALL available microtasks
// before moving to the next task.


// ------------------------------------------------------------
// Example
// ------------------------------------------------------------

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

Promise.resolve().then(() => {
  console.log("C");
});

console.log("D");


// Output:
//
// A
// D
// C
// B


// Flow:
//
// Synchronous
// A → D
//
// Microtask
// C
//
// Task
// B


// ------------------------------------------------------------
// Nested Microtasks
// ------------------------------------------------------------

Promise.resolve().then(() => {

  console.log("A");

  Promise.resolve().then(() => {

    console.log("B");

    Promise.resolve().then(() => {
      console.log("C");
    });

  });

});

setTimeout(() => {
  console.log("D");
}, 0);


// Output:
//
// A
// B
// C
// D


// ⭐ Why?
//
// A is a microtask.
//
// While A is executing,
// another microtask B is added.
//
// While B is executing,
// another microtask C is added.
//
// JavaScript continues processing microtasks
// before executing the setTimeout task.
//
// Therefore:
//
// A → B → C → D


// ------------------------------------------------------------
// Task creates Microtask
// ------------------------------------------------------------

console.log("A");

setTimeout(() => {

  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });

}, 0);

Promise.resolve().then(() => {

  console.log("D");

  setTimeout(() => {
    console.log("E");
  }, 0);

});

console.log("F");


// Output:
//
// A
// F
// D
// B
// C
// E


// Flow:
//
// Synchronous:
// A → F
//
// Microtask:
// D
//
// First Task:
// B
//
// Microtask created inside B:
// C
//
// Next Task:
// E


// ============================================================
// 2. DEBOUNCING
// ============================================================

// Definition:
//
// Debouncing is a technique where a function is executed
// only after a specified amount of time has passed
// without another call to that function.
//
// Every new call resets the timer.
//
// ⭐ Remember:
//
// DEBOUNCE → STOP → EXECUTE


// Common use cases:
//
// - Search input
// - Search API calls
// - Form validation
// - Auto-save


// ------------------------------------------------------------
// Basic Debounce
// ------------------------------------------------------------

function debounce(callback, delay) {

  let timer;

  return function () {

    // Cancel the previous timer.
    clearTimeout(timer);

    // Start a new timer.
    timer = setTimeout(() => {

      callback();

    }, delay);

  };

}


// Example:

const search = debounce(() => {

  console.log("API Call");

}, 500);


// If search() is called repeatedly:
//
// search()
// search()
// search()
// search()
//
// Each call resets the timer.
//
// When the user finally stops:
//
// 500ms passes
//      ↓
// "API Call"


// ⭐ Important:
//
// Debounce is useful when we DON'T want to execute
// on every single event.
//
// We wait until the activity stops.


// ============================================================
// 3. THROTTLING
// ============================================================

// Definition:
//
// Throttling is a technique where a function is allowed
// to execute at most once within a specified time interval.
//
// ⭐ Remember:
//
// THROTTLE → LIMIT EXECUTION


// Common use cases:
//
// - Scroll events
// - Resize events
// - Mouse movement
// - Continuous events


// ------------------------------------------------------------
// Basic Throttle
// ------------------------------------------------------------

function throttle(callback, delay) {

  let lastCall = 0;

  return function () {

    const now = Date.now();

    // Execute only if enough time has passed.

    if (now - lastCall >= delay) {

      lastCall = now;

      callback();

    }

  };

}


// Example:

const handleScroll = throttle(() => {

  console.log("Scroll API call");

}, 1000);


// If the event happens many times:
//
// event
// event
// event
// event
// event
//
// The function is allowed to execute
// only once per 1000ms.


// ============================================================
// 4. DEBOUNCE vs THROTTLE
// ============================================================
//
// DEBOUNCE:
//
// Event → Event → Event → STOP
//                         ↓
//                      Execute
//
//
// THROTTLE:
//
// Event → Execute
// Event
// Event
// Event → Execute
// Event
// Event
// Event → Execute
//
//
// DEBOUNCE
// → Wait until activity stops.
//
// THROTTLE
// → Limit execution while activity continues.


// ------------------------------------------------------------
// Practical API Example
// ------------------------------------------------------------
//
// Search box:
//
// User types:
//
// R
// Re
// Rea
// React
//
// We normally don't want an API call for every keystroke.
//
// Debounce:
//
// R      → wait
// Re     → reset timer
// Rea    → reset timer
// React  → reset timer
// STOP
// ↓
// API call
//
//
// ⭐ Search API → Debounce is commonly used.
//
//
// Continuous scroll:
//
// Scroll
// Scroll
// Scroll
// Scroll
// Scroll
//
// We may want to execute periodically instead
// of waiting for scrolling to completely stop.
//
// ⭐ Scroll / resize → Throttle is commonly used.


// ------------------------------------------------------------
// Important distinction
// ------------------------------------------------------------
//
// If every button click should immediately call an API:
//
// → Don't use debounce or throttle.
//
//
//
// If multiple clicks should result in ONE API call
// after the user stops clicking:
//
// → Debounce.
//
//
//
// If clicks/events should be limited to
// one API call every X milliseconds:
//
// → Throttle.
//
//
//
// If a button should be disabled while an API request
// is running:
//
// → Use loading / disabled state.
//
// This is NOT debounce or throttle.


// ============================================================
// 5. CURRYING
// ============================================================

// Definition:
//
// Currying is a technique where a function that normally
// accepts multiple arguments is transformed into a sequence
// of functions, where each function accepts one argument
// at a time.
//
// Normal:
//
// f(a, b)
//
// Curried:
//
// f(a)(b)


// ------------------------------------------------------------
// Normal Function
// ------------------------------------------------------------

function addNormal(a, b) {

  return a + b;

}

console.log(addNormal(10, 5));
// 15


// ------------------------------------------------------------
// Curried Function
// ------------------------------------------------------------

const add = (a) => (b) => {

  return a + b;

};

console.log(add(10)(5));
// 15


// ------------------------------------------------------------
// Understanding add(10)(5)
// ------------------------------------------------------------

// First call:
//
// add(10)
//
// a = 10
//
// It returns:
//
// (b) => 10 + b
//
//
// Second call:
//
// (5)
//
// b = 5
//
// Therefore:
//
// 10 + 5
// = 15


// ------------------------------------------------------------
// Reusable Curried Function
// ------------------------------------------------------------

const add10 = add(10);

console.log(add10(5));
// 15

console.log(add10(20));
// 30


// add(10)
// ↓
// Creates a function that remembers a = 10
//
// add10(5)
// ↓
// 10 + 5
//
// add10(20)
// ↓
// 10 + 20


// ------------------------------------------------------------
// Practical Example
// ------------------------------------------------------------

const multiplyBy = (x) => (y) => {

  return x * y;

};

const multiplyBy2 = multiplyBy(2);

const multiplyBy5 = multiplyBy(5);

console.log(multiplyBy2(10));
// 20

console.log(multiplyBy5(10));
// 50


// multiplyBy(2)
// → creates a function for multiplying by 2.
//
// multiplyBy(5)
// → creates a function for multiplying by 5.


// ============================================================
// 6. CURRYING AND CLOSURES
// ============================================================

// Currying can use closures.
//
// In:
//
// const add = (a) => (b) => a + b;
//
// The returned function remembers `a`.
//
// Example:
//
// const add10 = add(10);
//
// Even after add(10) has finished,
// add10 still remembers:
//
// a = 10


// ============================================================
// QUICK REVISION
// ============================================================
//
// EVENT LOOP
// → Synchronous code → Microtasks → Tasks
//
// MICROTASK
// → Promise callbacks
//
// TASK
// → setTimeout callbacks
//
// DEBOUNCE
// → Execute after activity stops
//
// THROTTLE
// → Limit execution during continuous activity
//
// CURRYING
// → Convert f(a, b) into f(a)(b)
//
// ============================================================
// CURRENT PROGRESS
// ============================================================
//
// Event Loop — deeper concepts     ✅
// Debouncing                       ✅
// Throttling                       ✅
// Currying                         ✅
//
// NEXT TOPIC:
//
// Prototype & Prototype Chain
//
// ============================================================