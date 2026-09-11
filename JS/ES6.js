
// ============================================================
// JAVASCRIPT ES6 —  REFERENCE
// ============================================================
//
// ES6 = ECMAScript 2015
//
// Important ES6 features covered:
// 1. let / const
// 2. Arrow Functions
// 3. Template Literals
// 4. Destructuring
// 5. Spread Operator
// 6. Rest Operator
// 7. Default Parameters
// 8. Object Property Shorthand
// 9. Optional Chaining
// 10. Nullish Coalescing
//
// ============================================================


// ============================================================
// 1. let / const
// ============================================================

// let → can be reassigned
let age = 25;
age = 26;

console.log(age);
// 26


// const → cannot be reassigned
const name = "Vignesh";

// name = "Rahul"; // ❌ TypeError


// IMPORTANT:
// let and const are block scoped.
// var is function scoped.

if (true) {
  let x = 10;
  const y = 20;

  console.log(x); // 10
  console.log(y); // 20
}

// console.log(x); // ❌ ReferenceError
// console.log(y); // ❌ ReferenceError


// const object/array can still be modified

const user1 = {
  name: "Vignesh"
};

user1.name = "Rahul";

console.log(user1);
// { name: "Rahul" }


// ============================================================
// 2. ARROW FUNCTIONS
// ============================================================

// Normal function

function add1(a, b) {
  return a + b;
}

console.log(add1(10, 20));
// 30


// Arrow function

const add2 = (a, b) => {
  return a + b;
};

console.log(add2(10, 20));
// 30


// Implicit return

const add3 = (a, b) => a + b;

console.log(add3(10, 20));
// 30


// One parameter → parentheses are optional

const square = x => x * x;

console.log(square(5));
// 25


// Multiple statements → use { } and explicit return

const calculate = (a, b) => {
  const sum = a + b;

  return sum * 2;
};

console.log(calculate(5, 10));
// 30


// IMPORTANT:
//
// With { }:
// explicit return is required.
//
// Without { }:
// value is automatically returned.
//
// Example:

const test1 = () => {
  10 + 20;
};

console.log(test1());
// undefined


const test2 = () => 10 + 20;

console.log(test2());
// 30


// Arrow function with map()

const numbers = [1, 2, 3];

const doubled = numbers.map(x => x * 2);

console.log(doubled);
// [2, 4, 6]


// Arrow function with filter()

const numbers2 = [10, 15, 20, 25, 30];

const filtered = numbers2.filter(x => x > 20);

console.log(filtered);
// [25, 30]


// ============================================================
// 3. ARROW FUNCTION + this
// ============================================================

// Normal function gets its own `this` based on how it is called.

const user2 = {
  name: "Vignesh",

  showName: function () {
    console.log(this.name);
  }
};

user2.showName();
// Vignesh


// Arrow functions do NOT have their own `this`.
// They inherit `this` from the surrounding scope.
//
// Therefore, avoid using arrow functions as object methods
// when you expect `this` to refer to the object.


// Useful pattern:

const user3 = {
  name: "Vignesh",

  showName: function () {
    const inner = () => {
      console.log(this.name);
    };

    inner();
  }
};

user3.showName();
// Vignesh


// INTERVIEW RULE:
//
// Normal function → `this` depends on how function is called.
// Arrow function  → `this` comes from surrounding scope.


// ============================================================
// 4. TEMPLATE LITERALS
// ============================================================

// Use backticks: ` `

const userName = "Vignesh";
const userAge = 26;

console.log(`My name is ${userName} and I am ${userAge} years old.`);

// My name is Vignesh and I am 26 years old.


// Expressions can be used

console.log(`Next year I will be ${userAge + 1}`);

// Next year I will be 27


// Multiple lines

const message = `
Hello Vignesh,
Welcome to JavaScript.
`;

console.log(message);


// IMPORTANT:
//
// ${variable} → insert value
// ${expression} → evaluate expression


// ============================================================
// 5. OBJECT DESTRUCTURING
// ============================================================

const user4 = {
  name: "Vignesh",
  age: 26,
  city: "Hyderabad"
};


// Without destructuring

console.log(user4.name);
console.log(user4.age);


// With destructuring

const { name: currentName, age: currentAge } = user4;

console.log(currentName);
// Vignesh

console.log(currentAge);
// 26


// Basic destructuring

const { city } = user4;

console.log(city);
// Hyderabad


// ------------------------------------------------------------
// Rename
// ------------------------------------------------------------

const user5 = {
  name: "Rahul",
  age: 25
};

const {
  name: userName2,
  age: userAge2
} = user5;

console.log(userName2);
// Rahul

console.log(userAge2);
// 25


// name → object property
// userName2 → new variable


// ------------------------------------------------------------
// Default value
// ------------------------------------------------------------

const user6 = {
  name: "Vignesh"
};

const {
  name: name6,
  city: city6 = "Hyderabad"
} = user6;

console.log(name6);
// Vignesh

console.log(city6);
// Hyderabad


// Default is used when property is undefined.


// ------------------------------------------------------------
// Nested destructuring
// ------------------------------------------------------------

const user7 = {
  name: "Rahul",

  address: {
    city: "Mumbai",
    pincode: 400001
  }
};

const {
  address: {
    city: nestedCity,
    pincode
  }
} = user7;

console.log(nestedCity);
// Mumbai

console.log(pincode);
// 400001


// Same information without destructuring:
//
// user7.address.city
// user7.address.pincode


// ============================================================
// 6. DESTRUCTURING IN FUNCTION PARAMETERS
// ============================================================

function showUser({ name, age }) {
  console.log(name);
  console.log(age);
}

showUser({
  name: "Vignesh",
  age: 26
});


// Output:
//
// Vignesh
// 26


// Nested destructuring in parameters

function showCity({
  address: {
    city
  }
}) {
  console.log(city);
}

showCity({
  address: {
    city: "Hyderabad"
  }
});

// Hyderabad


// Rename + default in parameters

function showDetails({
  name: userName3,
  age = 25
}) {
  console.log(userName3);
  console.log(age);
}

showDetails({
  name: "Rahul"
});

// Rahul
// 25


// ============================================================
// 7. SPREAD OPERATOR
// ============================================================
//
// Spread = expands values
//
// Syntax:
// ...


const user8 = {
  name: "Vignesh",
  age: 26
};


// Copy object

const copyUser = {
  ...user8
};

console.log(copyUser);

// { name: "Vignesh", age: 26 }


// IMPORTANT:
//
// user8 and copyUser are different objects.

console.log(user8 === copyUser);
// false


// ------------------------------------------------------------
// Update object using spread
// ------------------------------------------------------------

const updatedUser = {
  ...user8,
  age: 30
};

console.log(updatedUser);

// { name: "Vignesh", age: 30 }


// Original remains unchanged

console.log(user8);

// { name: "Vignesh", age: 26 }


// ------------------------------------------------------------
// Property order matters
// ------------------------------------------------------------

const user9 = {
  name: "Vignesh",
  age: 26
};

const result1 = {
  ...user9,
  age: 30
};

console.log(result1);

// age = 30


const result2 = {
  age: 30,
  ...user9
};

console.log(result2);

// age = 26


// ⭐ LAST VALUE WINS


// ------------------------------------------------------------
// Spread with arrays
// ------------------------------------------------------------

const arr1 = [10, 20, 30];

const arr2 = [...arr1];

console.log(arr2);

// [10, 20, 30]


// Add values

const arr3 = [...arr1, 40, 50];

console.log(arr3);

// [10, 20, 30, 40, 50]


// Add at beginning

const arr4 = [5, ...arr1];

console.log(arr4);

// [5, 10, 20, 30]


// Combine arrays

const a = [1, 2];
const b = [3, 4];

const combined = [...a, ...b];

console.log(combined);

// [1, 2, 3, 4]


// ------------------------------------------------------------
// Reference vs spread
// ------------------------------------------------------------

const numbers3 = [10, 20, 30];

const reference = numbers3;

reference.push(40);

console.log(numbers3);
// [10, 20, 30, 40]

console.log(reference);
// [10, 20, 30, 40]


// Same reference


// New array using spread

const numbers4 = [10, 20, 30];

const newArray = [...numbers4];

newArray.push(40);

console.log(numbers4);
// [10, 20, 30]

console.log(newArray);
// [10, 20, 30, 40]


// ⭐ Interview rule:
//
// const b = a
// → same reference
//
// const b = [...a]
// → new array
//
// const b = { ...a }
// → new object


// ============================================================
// 8. REST OPERATOR
// ============================================================
//
// Rest = collects remaining values
//
// Same ... syntax as spread,
// but the purpose is different.


// ------------------------------------------------------------
// Rest in function parameters
// ------------------------------------------------------------

function showNumbers(...numbers) {
  console.log(numbers);
}

showNumbers(10, 20, 30);

// [10, 20, 30]


// Rest collects arguments into an array.


// ------------------------------------------------------------
// Normal parameter + rest
// ------------------------------------------------------------

function showValues(first, ...others) {
  console.log(first);
  console.log(others);
}

showValues(10, 20, 30, 40, 50);

// 10
// [20, 30, 40, 50]


// ⭐ Rest parameter must be LAST.
//
// function test(a, ...rest) {}  // ✅
// function test(...rest, a) {}  // ❌


// ------------------------------------------------------------
// Rest in object destructuring
// ------------------------------------------------------------

const user10 = {
  name: "Vignesh",
  age: 26,
  city: "Hyderabad"
};

const {
  name: extractedName,
  ...otherDetails
} = user10;

console.log(extractedName);
// Vignesh

console.log(otherDetails);

// { age: 26, city: "Hyderabad" }


// ⭐ Memory trick:
//
// Spread → spreads OUT
// Rest   → collects the REST


// ============================================================
// 9. DEFAULT PARAMETERS
// ============================================================

function greet(name = "Guest") {
  console.log(name);
}

greet();

// Guest


greet("Vignesh");

// Vignesh


// Multiple parameters

function add(a, b = 10) {
  return a + b;
}

console.log(add(5));

// 15

console.log(add(5, 20));

// 25


// Default is used when value is undefined.

function testDefault(value = 100) {
  console.log(value);
}

testDefault(undefined);
// 100

testDefault(null);
// null

testDefault(0);
// 0


// ⭐ Important:
//
// Default parameter is NOT a general falsy check.
//
// It is mainly used when the value is undefined.


// ============================================================
// 10. OBJECT PROPERTY SHORTHAND
// ============================================================

const firstName = "Rahul";
const firstCity = "Hyderabad";


// Normal

const user11 = {
  firstName: firstName,
  firstCity: firstCity
};


// Shorthand

const user12 = {
  firstName,
  firstCity
};

console.log(user12);

// {
//   firstName: "Rahul",
//   firstCity: "Hyderabad"
// }


// ⭐ Rule:
//
// If property name and variable name are the same:
//
// name: name
//
// can become:
//
// name


// ============================================================
// 11. OPTIONAL CHAINING
// ============================================================
//
// Syntax:
// ?.
//
// Used for safely accessing nested properties.

const user13 = {
  name: "Vignesh",
  address: {
    city: "Hyderabad"
  }
};

console.log(user13.address?.city);

// Hyderabad


// If address does not exist:

const user14 = {
  name: "Vignesh"
};

console.log(user14.address?.city);

// undefined


// Without optional chaining:
//
// console.log(user14.address.city);
//
// ❌ TypeError
//
// Cannot read properties of undefined


// Multiple levels

const user15 = {
  profile: {
    address: {
      city: "Hyderabad"
    }
  }
};

console.log(
  user15.profile?.address?.city
);

// Hyderabad


// If any level is missing:
//
// result → undefined


// ⭐ React / React Native example:
//
// API data may not have arrived yet.
//
// user?.profile?.name
//
// This prevents:
//
// Cannot read properties of undefined


// ============================================================
// 12. NULLISH COALESCING
// ============================================================
//
// Syntax:
// ??
//
// Meaning:
//
// "If the left side is null or undefined,
// use the right side."


const city1 = undefined;

console.log(city1 ?? "Unknown");

// Unknown


const city2 = null;

console.log(city2 ?? "Unknown");

// Unknown


const city3 = "Hyderabad";

console.log(city3 ?? "Unknown");

// Hyderabad


// IMPORTANT:
//
// ?? only checks:
//
// null
// undefined


// ------------------------------------------------------------
// Important examples
// ------------------------------------------------------------

console.log(0 ?? 25);

// 0

console.log(false ?? true);

// false

console.log("" ?? "Guest");

// ""


console.log(null ?? "Guest");

// Guest


console.log(undefined ?? "Guest");

// Guest


// ⭐ Interview trap:
//
// || checks falsy values.
//
// ?? checks only null/undefined.


console.log(0 || 25);

// 25


console.log(0 ?? 25);

// 0


console.log("" || "Guest");

// Guest


console.log("" ?? "Guest");

// ""


// ============================================================
// 13. OPTIONAL CHAINING + NULLISH COALESCING
// ============================================================
//
// Very common in React / React Native.

const user16 = {
  name: "Vignesh"
};

const city4 =
  user16.address?.city ?? "Unknown";

console.log(city4);

// Unknown


// Explanation:
//
// user16.address?.city
//
// → undefined
//
// undefined ?? "Unknown"
//
// → "Unknown"


// Another example:

const user17 = {
  address: {
    city: "Hyderabad"
  }
};

const city5 =
  user17.address?.city ?? "Unknown";

console.log(city5);

// Hyderabad


// ============================================================
// 14. COMMON INTERVIEW DIFFERENCES
// ============================================================


// Spread vs Rest
//
// Spread:
// const copy = { ...user };
//
// Rest:
// const { name, ...other } = user;


// Optional chaining vs nullish
//
// ?. → safely access
//
// ?? → provide fallback


// Example:

const user18 = {};

console.log(
  user18.address?.city
);

// undefined


console.log(
  user18.address?.city ?? "Unknown"
);

// Unknown


// ============================================================
// 15. ES6 + REACT CONNECTION
// ============================================================


// React state update using spread

const user19 = {
  name: "Vignesh",
  age: 26
};


// Instead of directly changing the object:
//
// user19.name = "Rahul";
//
// React commonly uses a new object:

const updatedUser2 = {
  ...user19,
  name: "Rahul"
};

console.log(updatedUser2);

// { name: "Rahul", age: 26 }


// Array state update

const users = [
  { id: 1, name: "Rahul" },
  { id: 2, name: "Vignesh" }
];

const updatedUsers = users.map(user =>
  user.id === 2
    ? { ...user, name: "Amit" }
    : user
);

console.log(updatedUsers);

// [
//   { id: 1, name: "Rahul" },
//   { id: 2, name: "Amit" }
// ]


// ============================================================
// 16. ES6 INTERVIEW CHEAT SHEET
// ============================================================
//
// let
// → block scoped
// → can be reassigned
//
// const
// → block scoped
// → cannot be reassigned
//
// Arrow function
// → shorter syntax
// → lexical this
//
// Template literal
// → backticks
// → ${value}
//
// Destructuring
// → extract values
//
// Spread
// → expand/copy values
//
// Rest
// → collect remaining values
//
// Default parameter
// → fallback when undefined
//
// Object shorthand
// → { name } instead of { name: name }
//
// Optional chaining
// → safely access nested properties
//
// Nullish coalescing
// → fallback for null/undefined only
//
// ============================================================


// ============================================================
// 17. QUICK INTERVIEW QUESTIONS
// ============================================================
//
// Q1. Difference between spread and rest?
//
// Spread → expands
// Rest   → collects
//
//
// Q2. Difference between ?. and ??
//
// ?. → safe property access
// ?? → fallback value
//
//
// Q3. What happens here?
//
// const user2 = user1;
//
// → same reference
//
//
// Q4. What happens here?
//
// const user2 = { ...user1 };
//
// → new object
//
//
// Q5. What happens here?
//
// const numbers2 = [...numbers];
//
// → new array
//
//
// Q6. What does this return?
//
// 0 ?? 100
//
// → 0
//
//
// Q7. What does this return?
//
// 0 || 100
//
// → 100
//
//
// Q8. What does this return?
//
// const fn = () => {
//   10 + 20;
// };
//
// → undefined
//
//
// Q9. What does this return?
//
// const fn = () => 10 + 20;
//
// → 30
//
//
// Q10. What does this do?
//
// const { name, ...other } = user;
//
// → extracts name and collects remaining properties
//
// ============================================================


// ============================================================
// FINAL ES6 MEMORY MAP
// ============================================================
//
// let / const
//      ↓
// Variables
//
// Arrow function
//      ↓
// Functions
//
// Template literal
//      ↓
// Strings
//
// Destructuring
//      ↓
// Extract values
//
// Spread
//      ↓
// Expand / copy
//
// Rest
//      ↓
// Collect
//
// Default parameter
//      ↓
// Fallback for undefined
//
// Shorthand
//      ↓
// Shorter object syntax
//
// ?.
//      ↓
// Safe property access
//
// ??
//      ↓
// Fallback for null / undefined
//
// ============================================================

// END OF ES6 NOTES
