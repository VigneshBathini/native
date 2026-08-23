// ============================================================
// FUNCTIONS — OVERALL REVISION
// ============================================================


// ============================================================
// Function Q1 — Callback Function
// ============================================================

// A callback is a function passed as an argument
// to another function and executed inside that function.

// Given:

function greet(name) {                  // greet is a normal function

    console.log("Hello " + name);       // prints greeting
}


function processUser(callback) {        // callback receives the greet function

    callback("Vignesh");                 // invokes/calls the callback
}


processUser(greet);                      // passes greet as a callback


// Execution:
//
// processUser(greet)
//        ↓
// greet is passed as callback
//        ↓
// callback = greet
//        ↓
// callback("Vignesh")
//        ↓
// greet("Vignesh")
//        ↓
// Hello Vignesh


// ============================================================
// Function Q2 — Callback with Calculation
// ============================================================

// A callback can be used to perform a specific operation.

function calculate(a, b, callback) {      // callback receives a function

    return callback(a, b);               // invokes the callback
}


function add(a, b) {

    return a + b;
}


console.log(calculate(10, 20, add));
// 30


// Execution:
//
// calculate(10, 20, add)
//          ↓
// add is passed as callback
//          ↓
// callback(10, 20)
//          ↓
// add(10, 20)
//          ↓
// 30


// ============================================================
// Function Q3 — Higher-Order Function ⭐
// ============================================================

// A higher-order function is a function that:
// 1. accepts another function as an argument
// OR
// 2. returns another function.

function multiply(a, b) {

    return a * b;
}


// calculate is a higher-order function
// because it receives another function.

function calculate(a, b, operation) {      // operation receives function

    return operation(a, b);               // invokes the function
}


console.log(calculate(5, 4, multiply));
// 20


// ============================================================
// Function Q4 — Function Returning Function ⭐
// ============================================================

// A function can return another function.

// This concept connects to Closures.

function outer() {

    return function () {                  // returns a function

        console.log("Hello");
    };
}


const result = outer();                   // result stores returned function

result();                                 // invokes returned function


// Execution:
//
// outer()
//   ↓
// returns function
//   ↓
// result stores function
//   ↓
// result()
//   ↓
// Hello


// ============================================================
// Function Q5 — IIFE
// ============================================================

// IIFE = Immediately Invoked Function Expression
//
// A function that is defined and executed immediately.
//
// Final () → invokes the function immediately.

(function () {

    console.log("Hello Vignesh");

})();                                     // immediately invokes function


// Output:
// Hello Vignesh


// ============================================================
// Function Q6 — call() ⭐
// ============================================================

// call() calls a function immediately
// and sets "this" to the object we provide.

const user = {
    name: "Vignesh"
};


function greet() {

    console.log("Hello " + this.name);

    // this refers to user
    // this.name → user.name
}


greet.call(user);                         // calls greet immediately


// Output:
// Hello Vignesh


// ============================================================
// Function Q7 — call(), apply() and bind() ⭐
// ============================================================

// call()
// → calls immediately
// → arguments passed separately

// apply()
// → calls immediately
// → arguments passed as an array

// bind()
// → returns a new function
// → executes later


const user2 = {
    name: "Vignesh"
};


function greetUser(age, city) {

    console.log(this.name, age, city);
}


// call → arguments separately
greetUser.call(
    user2,
    26,
    "Hyderabad"
);

// Vignesh 26 Hyderabad


// apply → arguments as an array
greetUser.apply(
    user2,
    [26, "Hyderabad"]
);

// Vignesh 26 Hyderabad


// bind → returns a new function
const fn = greetUser.bind(
    user2,
    26,
    "Hyderabad"
);


// bind does not execute immediately
// fn stores the new function

fn();

// Vignesh 26 Hyderabad


// ============================================================
// Function Q8 — Pure Function ⭐
// ============================================================

// A pure function:
// 1. Gives the same output for the same inputs
// 2. Does not modify external data/state


// NOT PURE

let total = 10;


function add(value) {

    total = total + value;               // modifies external variable

    return total;
}


// This is NOT pure
//
// Because the function changes "total"
// which exists outside the function.



// PURE FUNCTION

function addNumbers(a, b) {

    return a + b;                        // only uses input values
}


// Same inputs → same output
//
// addNumbers(10, 20) → 30
// addNumbers(10, 20) → 30
//
// It does not modify anything outside the function.