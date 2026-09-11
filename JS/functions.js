// ============================================================
// JAVASCRIPT FUNCTIONS — INTERVIEW REFERENCE
// ============================================================


// ============================================================
// 1. FUNCTION DECLARATION
// ============================================================

// A function declaration can be called before it is defined
// because function declarations are hoisted.

sayHello();

function sayHello() {
  console.log("Hello");
}

// Output:
// Hello


// ============================================================
// 2. FUNCTION EXPRESSION
// ============================================================

// A function can be stored inside a variable.

const greet = function () {
  console.log("Hello Vignesh");
};

greet();

// Output:
// Hello Vignesh


// IMPORTANT:
// Function expression with const cannot be called before
// the declaration because of the Temporal Dead Zone.

// greet(); // ReferenceError

// const greet = function () {
//   console.log("Hello");
// };


// ============================================================
// 3. FUNCTION DECLARATION vs FUNCTION EXPRESSION
// ============================================================

// Declaration

function add1(a, b) {
  return a + b;
}

console.log(add1(10, 20)); // 30


// Expression

const add2 = function (a, b) {
  return a + b;
};

console.log(add2(10, 20)); // 30


// Interview:
// Declaration → can call before declaration
// Expression with const/let → cannot call before declaration


// ============================================================
// 4. PARAMETERS vs ARGUMENTS
// ============================================================

function add(a, b) {
  return a + b;
}

// a and b → PARAMETERS
// 10 and 20 → ARGUMENTS

console.log(add(10, 20)); // 30


// Remember:
//
// Parameters = placeholders
// Arguments  = actual values


// ============================================================
// 5. RETURN
// ============================================================

function sum(a, b) {
  return a + b;
}

const result = sum(10, 20);

console.log(result);

// Output:
// 30


// Without return:

function testSum(a, b) {
  a + b;
}

const result2 = testSum(10, 20);

console.log(result2);

// Output:
// undefined


// IMPORTANT:
// A function returns undefined by default if there is
// no return statement.


// ============================================================
// 6. RETURN WITHOUT A VALUE
// ============================================================

function test() {
  return;

  console.log("Hello");
}

console.log(test());

// Output:
// undefined

// Anything after return will not execute.


// ============================================================
// 7. CALLBACK FUNCTION
// ============================================================

// A callback is a function passed as an argument
// to another function.

function greetUser(name) {
  console.log("Hello " + name);
}

function processUser(callback) {
  callback("Vignesh");
}

processUser(greetUser);

// Output:
// Hello Vignesh


// IMPORTANT:
//
// processUser(greetUser)
//       ↓
// greetUser is passed
//
// callback("Vignesh")
//       ↓
// greetUser("Vignesh")
//       ↓
// Hello Vignesh


// Passing function:

processUser(greetUser);


// Calling function immediately:

// processUser(greetUser());


// ============================================================
// 8. HIGHER-ORDER FUNCTION
// ============================================================

// A Higher-Order Function (HOF) is a function that:
//
// 1. Takes another function as an argument
// OR
// 2. Returns another function


function process(callback) {
  callback();
}

// process is a Higher-Order Function
// because it receives a function.


// Example of returning a function:

function outerFunction() {
  return function innerFunction() {
    console.log("Hello");
  };
}

const fn = outerFunction();

fn();

// Output:
// Hello


// ============================================================
// 9. CLOSURE
// ============================================================

// A closure happens when an inner function remembers
// variables from its outer function even after the
// outer function has finished executing.


function outer() {
  let count = 10;

  function inner() {
    console.log(count);
  }

  return inner;
}

const fn1 = outer();

fn1();

// Output:
// 10


// Flow:
//
// outer()
//   ↓
// count = 10
//   ↓
// inner remembers count
//   ↓
// return inner
//   ↓
// fn1()
//   ↓
// 10


// ============================================================
// 10. CLOSURE — COUNTER
// ============================================================

function counter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const increment = counter();

console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3


// The inner function remembers count.
//
// 1st call → 1
// 2nd call → 2
// 3rd call → 3


// ============================================================
// 11. MULTIPLE CLOSURES
// ============================================================

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2

console.log(counter2()); // 1


// counter1 and counter2 have separate count variables.
//
// counter1 → count = 2
// counter2 → count = 1


// ============================================================
// 12. IIFE
// ============================================================

// IIFE = Immediately Invoked Function Expression
//
// It is created and executed immediately.

(function () {
  console.log("Hello");
})();

// Output:
// Hello


// Example with private variable:

(function () {
  const secret = 123;

  console.log(secret);
})();

// console.log(secret); // ReferenceError


// Historically IIFEs were commonly used to create
// private scope and avoid global variables.


// ============================================================
// 13. THIS
// ============================================================

// `this` refers to the object/context based on how
// the function is called.

const user = {
  name: "Vignesh",

  greet: function () {
    console.log(this.name);
  }
};

user.greet();

// Output:
// Vignesh


// Here:
//
// this → user
//
// this.name → user.name


// ============================================================
// 14. WHY USE THIS?
// ============================================================

// The same function can work with different objects.

const user1 = {
  name: "Vignesh"
};

const user2 = {
  name: "Rahul"
};

function showName() {
  console.log(this.name);
}


// We can control what `this` refers to.

showName.call(user1); // Vignesh
showName.call(user2); // Rahul


// ============================================================
// 15. call()
// ============================================================

// call() executes the function immediately
// and allows us to control `this`.

function greet() {
  console.log(this.name);
}

const person = {
  name: "Vignesh"
};

greet.call(person);

// Output:
// Vignesh


// call() with arguments:

function greetCity(city) {
  console.log(this.name + " lives in " + city);
}

greetCity.call(person, "Hyderabad");

// Output:
// Vignesh lives in Hyderabad


// ============================================================
// 16. apply()
// ============================================================

// apply() is similar to call().
//
// Difference:
// call  → arguments separately
// apply → arguments as an array

greetCity.apply(person, ["Hyderabad"]);

// Output:
// Vignesh lives in Hyderabad


// call():

greetCity.call(person, "Hyderabad");


// apply():

greetCity.apply(person, ["Hyderabad"]);


// Both execute immediately.


// ============================================================
// 17. bind()
// ============================================================

// bind() does NOT execute the function immediately.
//
// It returns a new function with `this` fixed.

const newGreet = greetCity.bind(person);

// Function has NOT executed yet.

newGreet("Hyderabad");

// Output:
// Vignesh lives in Hyderabad


// ============================================================
// 18. call vs apply vs bind
// ============================================================
//
// call()
// → set this
// → execute immediately
// → arguments separately
//
// apply()
// → set this
// → execute immediately
// → arguments as array
//
// bind()
// → set this
// → does NOT execute immediately
// → returns a new function


// Quick examples:

greetCity.call(person, "Hyderabad");

greetCity.apply(person, ["Hyderabad"]);

const boundFunction = greetCity.bind(person);
boundFunction("Hyderabad");


// ============================================================
// 19. IMPORTANT INTERVIEW DIFFERENCE
// ============================================================

function normalFunction() {
  console.log(this.name);
}

const employee = {
  name: "Vignesh"
};

normalFunction.call(employee);

// `call()` manually sets this.


// ============================================================
// 20. COMMON INTERVIEW MISTAKES
// ============================================================

// ❌ Mistake 1:
// Calling a callback instead of passing it.

// processUser(greetUser()); // Wrong for callback passing


// ✅ Correct:

processUser(greetUser);


// ❌ Mistake 2:
// Thinking no return means error.

function example() {
  console.log("Hello");
}

console.log(example());

// Output:
// Hello
// undefined


// ❌ Mistake 3:
// Thinking return without value gives an error.

function example2() {
  return;
}

console.log(example2());

// Output:
// undefined


// ❌ Mistake 4:
// Thinking bind() executes immediately.

const bound = greetCity.bind(person);

// Nothing printed yet.

bound("Hyderabad");

// Now it executes.


// ============================================================
// 21. INTERVIEW QUICK REVISION
// ============================================================

/*
FUNCTION DECLARATION
→ function keyword
→ hoisted
→ can call before declaration

FUNCTION EXPRESSION
→ function stored in variable
→ const/let follows TDZ

PARAMETER
→ variable in function definition

ARGUMENT
→ actual value passed to function

RETURN
→ sends value back from function

CALLBACK
→ function passed to another function

HIGHER-ORDER FUNCTION
→ takes function OR returns function

CLOSURE
→ inner function remembers outer variables

IIFE
→ function that executes immediately

THIS
→ refers to calling object/context

CALL
→ execute immediately
→ arguments separately

APPLY
→ execute immediately
→ arguments as array

BIND
→ returns new function
→ execute later
*/


// ============================================================
// 22. INTERVIEW CHECKLIST
// ============================================================

/*
[✓] Function declaration
[✓] Function expression
[✓] Hoisting
[✓] Parameters vs arguments
[✓] return
[✓] Callback
[✓] Higher-order function
[✓] Closure
[✓] Closure counter
[✓] Multiple closures
[✓] IIFE
[✓] this basics
[✓] call()
[✓] apply()
[✓] bind()

NEXT:
[ ] this interview patterns
[ ] this with arrow functions
[ ] this inside nested functions
[ ] Async functions
[ ] Promises
*/