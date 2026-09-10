
// ============================================================
// JAVASCRIPT INTERVIEW NOTES
// FOR LOOP + ASYNC JAVASCRIPT + SCOPE
// ============================================================


// ============================================================
// 1. BASIC FOR LOOP
// ============================================================

// Syntax:
//
// for (initialization; condition; increment) {
//     // code
// }

for (let i = 0; i < 5; i++) {
  console.log(i);
}

// Output:
// 0
// 1
// 2
// 3
// 4


// ------------------------------------------------------------
// How it works
// ------------------------------------------------------------
//
// 1. let i = 0       -> initialization
// 2. i < 5           -> condition
// 3. console.log(i)  -> execute
// 4. i++             -> increment
// 5. Repeat
//
// Flow:
//
// initialization
//      ↓
// condition
//      ↓
//   execute
//      ↓
//   increment
//      ↓
// condition
//      ↓
//    repeat


// ============================================================
// 2. FOR LOOP WITH ARRAY
// ============================================================

const numbers1 = [10, 20, 30];

for (let i = 0; i < numbers1.length; i++) {
  console.log(numbers1[i]);
}

// Output:
// 10
// 20
// 30


// ============================================================
// 3. for + setTimeout + let
// IMPORTANT INTERVIEW QUESTION
// ============================================================

for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// Output after approximately 1 second:
//
// 0
// 1
// 2


// WHY?
//
// let is block scoped.
//
// Each iteration gets its own `i`.
//
// Iteration 1 -> i = 0
// Iteration 2 -> i = 1
// Iteration 3 -> i = 2
//
// The callbacks remember their own value.


/*
Concept:

for loop
   ↓
i = 0 → callback remembers 0
i = 1 → callback remembers 1
i = 2 → callback remembers 2
   ↓
after loop
   ↓
callbacks execute
   ↓
0 1 2
*/


// ============================================================
// 4. for + setTimeout + var
// VERY IMPORTANT
// ============================================================

for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}

// Output:
//
// 3
// 3
// 3


// WHY?
//
// var is NOT block scoped.
//
// There is only ONE `i` variable.
//
// Loop finishes:
//
// i = 0
// i = 1
// i = 2
// i = 3  ← loop stops
//
// Then callbacks execute.
//
// All callbacks refer to the SAME `i`.
//
// Therefore:
//
// 3
// 3
// 3


// ============================================================
// 5. IMPORTANT DIFFERENCE: let vs var
// ============================================================
//
// let:
//
// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1000);
// }
//
// Output:
// 0 1 2
//
//
//
// var:
//
// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1000);
// }
//
// Output:
// 3 3 3


// INTERVIEW RULE:
//
// let  → separate binding for each loop iteration
// var  → one shared variable


// ============================================================
// 6. setTimeout()
// ============================================================

console.log("A");

setTimeout(() => {
  console.log("B");
}, 0);

console.log("C");

// Output:
//
// A
// C
// B


// IMPORTANT:
//
// setTimeout(..., 0)
// DOES NOT mean "execute immediately".
//
// It schedules the callback to execute later.
//
// Synchronous code runs first.


// ============================================================
// 7. setInterval()
// ============================================================

console.log("Start");

let count = 0;

const id = setInterval(() => {
  console.log(count);

  count++;

  if (count === 3) {
    clearInterval(id);
  }
}, 1000);

console.log("End");

// Output:
//
// Start
// End
// 0
// 1
// 2


// setTimeout:
//
// Executes once.
//
// setInterval:
//
// Executes repeatedly until clearInterval().


// ============================================================
// 8. Promise vs setTimeout
// IMPORTANT EVENT LOOP QUESTION
// ============================================================

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


// WHY?
//
// First → synchronous code
//
// console.log("A")
// console.log("D")
//
// Then → Promise callback
//
// Promise.then() = Microtask
//
// Then → setTimeout callback
//
// setTimeout = Task / Macrotask


// ============================================================
// 9. EVENT LOOP PRIORITY
// ============================================================
//
// Interview rule:
//
// Synchronous code
//       ↓
// Microtasks
//       ↓
// Tasks / Macrotasks
//
// Examples:
//
// Microtasks:
// - Promise.then()
// - Promise.catch()
// - Promise.finally()
//
// Tasks / Macrotasks:
// - setTimeout()
// - setInterval()
// - DOM events


// ============================================================
// 10. MULTIPLE PROMISES
// ============================================================

console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

Promise.resolve().then(() => {
  console.log("4");
});

console.log("5");

// Output:
//
// 1
// 5
// 3
// 4
// 2


// IMPORTANT:
//
// Promise callbacks are processed in FIFO order.
//
// FIFO = First In, First Out.
//
// Promise 1 → 3
// Promise 2 → 4
//
// Therefore:
//
// 3
// 4


// ============================================================
// 11. NESTED PROMISE + setTimeout
// ============================================================

console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");

  setTimeout(() => {
    console.log("4");
  }, 0);
});

console.log("5");

// Output:
//
// 1
// 5
// 3
// 2
// 4


// WHY?
//
// Synchronous:
// 1
// 5
//
// Microtask:
// 3
//
// During microtask, another timer is scheduled.
//
// Existing timer:
// 2
//
// New timer:
// 4
//
// Therefore:
//
// 2 comes before 4.


// ============================================================
// 12. setTimeout() EXTRA ARGUMENTS
// var LOOP WORKAROUND
// ============================================================

for (var i = 0; i < 3; i++) {
  setTimeout((x) => {
    console.log(x);
  }, 1000, i);
}

// Output:
//
// 0
// 1
// 2


// Syntax:
//
// setTimeout(callback, delay, arg1, arg2, ...)


// `i` is passed as an argument to the callback.
//
// i = 0 → x = 0
// i = 1 → x = 1
// i = 2 → x = 2


// Modern preferred solution:
//
// Use let instead of var.


// ============================================================
// 13. var / let / const
// ============================================================

var a = 10;
let b = 20;
const c = 30;

console.log(a);
console.log(b);
console.log(c);

// Output:
//
// 10
// 20
// 30


// ============================================================
// 14. SCOPE
// ============================================================
//
// var   → Function Scope
// let   → Block Scope
// const → Block Scope


// ============================================================
// 15. BLOCK SCOPE
// ============================================================

{
  let x = 10;
  const y = 20;
  var z = 30;

  console.log(x);
  console.log(y);
  console.log(z);
}

console.log(z);

// Output:
//
// 10
// 20
// 30
// 30


// x and y exist only inside the block.
//
// z is declared using var,
// so it is NOT limited to the block.


// ============================================================
// 16. FUNCTION SCOPE
// ============================================================

function test() {
  if (true) {
    let x = 10;
    var y = 20;
  }

  console.log(y);

  // console.log(x);
}

test();

// Output:
//
// 20


// y → function scoped
// x → block scoped


// ============================================================
// 17. HOISTING
// ============================================================

console.log(a);

var a = 10;

// Output:
//
// undefined


// JavaScript behaves conceptually like:
//
// var a;
//
// console.log(a);
//
// a = 10;


// IMPORTANT:
//
// Declaration is hoisted.
//
// Assignment is NOT hoisted.


// ============================================================
// 18. let + HOISTING + TDZ
// ============================================================

console.log(a);

let a = 10;

// Output:
//
// ReferenceError


// let is hoisted,
// but it is NOT initialized.
//
// Accessing it before declaration
// is called the Temporal Dead Zone (TDZ).


// ============================================================
// 19. const + TDZ
// ============================================================

console.log(a);

const a = 10;

// Output:
//
// ReferenceError


// const also has TDZ.


// ============================================================
// 20. TEMPORAL DEAD ZONE (TDZ)
// ============================================================
//
// TDZ = period between entering the scope
// and the point where let/const is initialized.
//
// Example:
//
// console.log(x);  // ReferenceError
// let x = 10;
//
//
//
// Remember:
//
// var   → undefined before declaration
// let   → ReferenceError
// const → ReferenceError


// ============================================================
// 21. SHADOWING
// ============================================================

var x = 10;

if (true) {
  let x = 20;

  console.log(x);
}

console.log(x);

// Output:
//
// 20
// 10


// Inner x shadows the outer x.
//
// Inside block → 20
// Outside block → 10


// ============================================================
// 22. var DOES NOT RESPECT BLOCK SCOPE
// ============================================================

var x = 10;

{
  var x = 20;
}

console.log(x);

// Output:
//
// 20


// Both declarations refer to the same
// function/global scoped variable.


// ============================================================
// 23. const REASSIGNMENT
// ============================================================

const x = 10;

// x = 20;

// Output:
//
// TypeError: Assignment to constant variable.


// const prevents reassignment.


// ============================================================
// 24. const OBJECT MUTATION
// IMPORTANT INTERVIEW TRAP
// ============================================================

const user = {
  name: "Vignesh"
};

user.name = "Rahul";

console.log(user.name);

// Output:
//
// Rahul


// IMPORTANT:
//
// const does NOT make the object immutable.
//
// It prevents:
//
// user = anotherObject
//
// But it allows:
//
// user.name = "Rahul"


// ============================================================
// 25. const ARRAY MUTATION
// ============================================================

const numbers = [1, 2, 3];

numbers.push(4);

console.log(numbers);

// Output:
//
// [1, 2, 3, 4]


// Allowed:
//
// numbers.push(4)
// numbers.pop()
// numbers[0] = 100
//
// Not allowed:
//
// numbers = [5, 6]


// ============================================================
// 26. FINAL SCOPE INTERVIEW QUESTION
// ============================================================

var x = 10;

function test() {
  var x = 20;

  if (true) {
    let x = 30;

    console.log(x);
  }

  console.log(x);
}

test();

console.log(x);

// Output:
//
// 30
// 20
// 10


// WHY?
//
// Global x     = 10
// Function x   = 20
// Block x      = 30
//
// Inner variables shadow outer variables.


// ============================================================
// 27. INTERVIEW CHEAT SHEET
// ============================================================
//
// FOR LOOP
//
// for (let i = 0; i < 5; i++) {}
//
//
//
// setTimeout
//
// Executes callback once after the delay.
//
//
//
// setInterval
//
// Repeats callback until clearInterval().
//
//
//
// let + setTimeout
//
// 0 1 2
//
//
//
// var + setTimeout
//
// 3 3 3
//
//
//
// Event Loop:
//
// Synchronous
//     ↓
// Microtasks
//     ↓
// Tasks / Macrotasks
//
//
//
// Promise.then()
// → Microtask
//
//
//
// setTimeout()
// → Task / Macrotask
//
//
//
// var
// → Function scoped
// → Hoisted with undefined
//
//
//
// let
// → Block scoped
// → TDZ
//
//
//
// const
// → Block scoped
// → TDZ
// → Cannot reassign
// → Object/array can still be mutated
//
//
//
// Shadowing
// → Inner variable hides outer variable
//
//
//
// TDZ
// → Accessing let/const before initialization
//   causes ReferenceError


// ============================================================
// 28. QUICK INTERVIEW OUTPUT PATTERNS
// ============================================================
//
// Pattern 1:
//
// console.log("A");
// setTimeout(() => console.log("B"), 0);
// console.log("C");
//
// Answer:
//
// A
// C
// B
//
//
//
// Pattern 2:
//
// Promise.resolve().then(() => console.log("A"));
// setTimeout(() => console.log("B"), 0);
//
// Answer:
//
// A
// B
//
//
//
// Pattern 3:
//
// for (let i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1000);
// }
//
// Answer:
//
// 0
// 1
// 2
//
//
//
// Pattern 4:
//
// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 1000);
// }
//
// Answer:
//
// 3
// 3
// 3


// ============================================================
// 29. MOST IMPORTANT RULES TO REMEMBER
// ============================================================
//
// 1. let is block scoped.
//
// 2. const is block scoped.
//
// 3. var is function scoped.
//
// 4. var is hoisted and initialized as undefined.
//
// 5. let/const are hoisted but remain in TDZ.
//
// 6. setTimeout(..., 0) is NOT immediate.
//
// 7. Promise callbacks run before timers.
//
// 8. let in a loop creates separate iteration bindings.
//
// 9. var in a loop shares the same variable.
//
// 10. const object properties can be changed.
//
// 11. const array elements can be changed.
//
// 12. const variable itself cannot be reassigned.
//
// 13. Promise.then() is a microtask.
//
// 14. setTimeout/setInterval are tasks/macrotasks.
//
// 15. Microtasks are processed before the next task.
//
// ============================================================
// END
// ============================================================

