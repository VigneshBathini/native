// ============================================================
// ARRAY METHODS — OVERALL PRACTICE
// ============================================================


// ============================================================
// Array Methods Q1 — map()
// ============================================================

// map() transforms EVERY element
// and returns a NEW array.
//
// Important:
// → Same number of elements
// → Used when we want to transform data
//
// [1, 2, 3, 4, 5]
//      ↓
// [2, 4, 6, 8, 10]


const numbers = [1, 2, 3, 4, 5];

const map1 = numbers.map((x) => x + x);
// x → current element
// x + x → transformation

console.log("map", map1);


// Output:
// [2, 4, 6, 8, 10]


// Execution:
//
// 1 → 1 + 1 → 2
// 2 → 2 + 2 → 4
// 3 → 3 + 3 → 6
// 4 → 4 + 4 → 8
// 5 → 5 + 5 → 10


// Technical term:
//
// map()
// → Transformation
// → Returns new array
// → Same length



// ============================================================
// Array Methods Q2 — filter()
// ============================================================

// filter() checks a condition for EVERY element.
//
// condition → true
//      ↓
// keep element
//
// condition → false
//      ↓
// remove element


const numbers2 = [10, 15, 20, 25, 30];

const result = numbers2.filter((num) => num % 2 === 0);

console.log("result", result);


// Output:
// [10, 20, 30]


// Execution:
//
// 10 → even → keep
// 15 → odd  → remove
// 20 → even → keep
// 25 → odd  → remove
// 30 → even → keep


// Technical term:
//
// filter()
// → Selection
// → Returns new array
// → Can return fewer elements



// ============================================================
// Array Methods Q3 — find() ⭐
// ============================================================

// find() returns the FIRST element
// that satisfies the condition.
//
// If nothing matches → undefined


const users = [

    { id: 1, name: "Ram" },
    { id: 2, name: "Sai" },
    { id: 3, name: "John" }

];


const res = users.find((x) => x.id === 2);

console.log("res", res);


// Output:
//
// { id: 2, name: "Sai" }


// Execution:
//
// id 1 → false
// id 2 → true → return this object
//
// Stops after finding the first match.


// Technical term:
//
// find()
// → Returns ONE element
// → FIRST matching element
// → Not found → undefined



// ============================================================
// Array Methods Q4 — findIndex()
// ============================================================

// findIndex() returns the INDEX
// of the FIRST element that satisfies the condition.
//
// If nothing matches → -1


const users2 = [

    { id: 1, name: "Ram" },
    { id: 2, name: "Sai" },
    { id: 3, name: "John" }

];


const res2 = users2.findIndex((x) => x.id === 3);

console.log("res", res2);


// Output:
// 2


// Execution:
//
// index 0 → id 1 → false
// index 1 → id 2 → false
// index 2 → id 3 → true
//                  ↓
//                 return 2


// Technical term:
//
// findIndex()
// → Returns index
// → FIRST matching element
// → Not found → -1



// ============================================================
// Array Methods Q5 — some() ⭐
// ============================================================

// some() checks whether AT LEAST ONE element
// satisfies the condition.
//
// One match is enough → true
//
// No match → false


const users3 = [

    { name: "Ram", age: 22 },
    { name: "Sai", age: 25 },
    { name: "John", age: 30 }

];


const res3 = users3.some((x) => x.age > 28);

console.log("res", res3);


// Output:
// true


// Execution:
//
// Ram   → 22 > 28 → false
// Sai   → 25 > 28 → false
// John  → 30 > 28 → true
//                       ↓
//                      true
//
// Once true is found, some() stops checking.


// Technical term:
//
// some()
// → Checks ANY / AT LEAST ONE
// → Returns boolean
// → true / false



// ============================================================
// Array Methods Q6 — every()
// ============================================================

// every() checks whether ALL elements
// satisfy the condition.
//
// ALL true → true
//
// Even ONE false → false


const users4 = [

    { name: "Ram", age: 22 },
    { name: "Sai", age: 25 },
    { name: "John", age: 30 }

];


const result2 = users4.every((x) => x.age >= 18);

console.log("res", result2);


// Output:
// true


// Execution:
//
// Ram   → 22 >= 18 → true
// Sai   → 25 >= 18 → true
// John  → 30 >= 18 → true
//                         ↓
//                        true


// Technical term:
//
// every()
// → Checks ALL elements
// → Returns boolean
// → One false → false



// ============================================================
// Array Methods Q7 — forEach()
// ============================================================

// forEach() is mainly used when we want
// to perform an ACTION for each element.
//
// It does NOT create a new useful array.


const numbers3 = [10, 20, 30];


numbers3.forEach((x) => {

    console.log(x);

});


// Output:
//
// 10
// 20
// 30


// Technical term:
//
// forEach()
// → Performs an action
// → Does not return a new array
// → Mainly used for side effects



// ============================================================
// forEach() vs map() ⭐
// ============================================================


// map()
// → transforms data
// → returns NEW array


const result3 = numbers3.map((x) => x * 2);

console.log(result3);

// [20, 40, 60]


// forEach()
// → performs an action
// → return value is undefined


const result4 = numbers3.forEach((x) => {

    console.log(x);

});


console.log(result4);

// undefined



// ============================================================
// Array Methods Q8 — reduce() ⭐⭐⭐⭐⭐
// ============================================================

// reduce() is used when we want to
// COMBINE many values into ONE result.
//
// Common uses:
// → sum
// → total
// → maximum
// → counting
// → building objects
// → grouping data


const numbers4 = [10, 20, 30, 40];


const res4 = numbers4.reduce(

    (total, num) => total + num,

    0

);


console.log("res", res4);


// Output:
// 100


// Execution:
//
// initial total = 0
//
// 0 + 10 = 10
// 10 + 20 = 30
// 30 + 30 = 60
// 60 + 40 = 100
//
// Final result → 100


// Technical terms:
//
// total → accumulator
// num   → current value
//
// 0 → initial value of accumulator



// ============================================================
// Array Methods Q9 — filter() + reduce() ⭐
// ============================================================

// First filter the required elements
//        ↓
// Then reduce them into one value.
//
// Given:
//
// [10, 15, 20, 25, 30]
//
// Even numbers:
//
// [10, 20, 30]
//
// Then:
//
// 10 + 20 + 30
//       ↓
//      60


const numbers5 = [10, 15, 20, 25, 30];


const res5 = numbers5

    .filter((x) => x % 2 === 0)

    .reduce((total, num) => total + num, 0);


console.log("res", res5);


// Output:
// 60


// Execution:
//
// numbers
//    ↓
// filter()
//    ↓
// [10, 20, 30]
//    ↓
// reduce()
//    ↓
// 60