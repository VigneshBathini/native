// CORE JAVASCRIPT – QUICK REVISION

// Variables
// • var → function scoped, redeclare/reassign
// • let → block scoped, reassign
// • const → block scoped, no reassignment
// • let/const → TDZ

// Hoisting
// • var → undefined
// • let/const → TDZ

// Equality
// • == → type conversion
// • === → value + type

// References
// • Primitive → copied by value
// • Object/Array → reference
// • {...obj} → shallow copy
// • structuredClone() → deep copy

// Array Methods
// • map → transform
// • filter → select
// • find → first matching item
// • findIndex → position
// • some → at least one
// • every → all
// • reduce → one result
// • forEach → execute, returns undefined
// • slice → non-mutating extract
// • splice → mutates
// • sort → mutates; (a,b)=>a-b for ascending
// • reverse → mutates
// • concat → combine
// • includes → true/false
// • indexOf → index / -1
// • join → Array → String
// • split → String → Array

// Loops
// • for...of → values
// • for...in → keys/indexes

// Objects
// • Object.keys → keys
// • Object.values → values
// • Object.entries → key/value
// • ?. → safe access
// • ?? → default for null/undefined

// Destructuring
// • {name} → object property
// • [a,b] → array values
// • ...rest → remaining values

// Spread
// • ...obj → copy/merge
// • later property wins

// Functions
// • Default parameter works for undefined, not null

// Async
// • Promise.then → microtask
// • setTimeout → macrotask
// • async/await → Promise-based

// React
// • Avoid direct state mutation
// • Create new array/object using spread

// 0.1 + 0.2 === 0.3       → false

// typeof null             → "object"

// typeof []               → "object"

// const object property   → can be changed

// const array element     → can be changed

// undefined default param → default is used

// null default param      → default is NOT used

// [1,2] === [1,2]         → false
// {} === {}               → false

// [] == false             → true   (type coercion)

// NaN === NaN             → false

// NaN                     → typeof "number"

// "5" + 2                 → "52"

// "5" - 2                 → 3


/*
============================================================
          JAVASCRIPT INTERVIEW REVISION
============================================================

ROADMAP:

1. Variables
2. Scope
3. Hoisting
4. Strings
5. Arrays
6. Array Methods
7. Objects          <- CURRENT FOCUS
8. Functions
9. ES6+
10. Promises
11. Async/Await
12. Event Loop
13. Output Questions
14. React JavaScript Patterns

============================================================
*/


// ============================================================
// 1. VARIABLES
// ============================================================

/*
var
- Function scoped
- Can be redeclared
- Can be reassigned
- Hoisted and initialized with undefined

let
- Block scoped
- Cannot be redeclared in same scope
- Can be reassigned
- TDZ before declaration

const
- Block scoped
- Cannot be redeclared
- Cannot be reassigned
- TDZ before declaration
*/


var a = 10;
let b = 20;
const c = 30;


// ============================================================
// 2. SCOPE
// ============================================================

function test() {

    if (true) {

        let x = 10;
        const y = 20;
        var z = 30;

    }

    // console.log(x); // ReferenceError
    // console.log(y); // ReferenceError

    console.log(z); // 30
}


/*
MEMORY:

var   -> function scope
let   -> block scope
const -> block scope
*/


// ============================================================
// 3. HOISTING
// ============================================================

console.log(value); // undefined

var value = 10;


// let / const

// console.log(num); // ReferenceError
let num = 20;


/*
var:
Declaration is hoisted and initialized as undefined.

let/const:
Hoisted but remain in Temporal Dead Zone (TDZ)
until declaration is reached.
*/


// ============================================================
// 4. STRINGS
// ============================================================

const str = "javascript";


// Length
console.log(str.length);


// Character access
console.log(str[0]);


// Reverse string
const reversed = str.split("").reverse().join("");


// Palindrome
function isPalindrome(str) {

    return str === str.split("").reverse().join("");

}


// Character frequency

function charFrequency(str) {

    let count = {};

    for (let char of str) {

        count[char] = (count[char] || 0) + 1;

    }

    return count;
}


// Anagram

function isAnagram(str1, str2) {

    if (str1.length !== str2.length) {
        return false;
    }

    let count = {};

    for (let char of str1) {
        count[char] = (count[char] || 0) + 1;
    }

    for (let char of str2) {

        if (!count[char]) {
            return false;
        }

        count[char]--;

    }

    return true;
}


// ============================================================
// 5. ARRAYS
// ============================================================

const numbers = [10, 20, 30, 40, 50];


// Access
console.log(numbers[0]);


// Add
numbers.push(60);


// Remove last
numbers.pop();


// Add beginning
numbers.unshift(5);


// Remove beginning
numbers.shift();


// ============================================================
// 6. ARRAY METHODS
// ============================================================


// map()
// Changes / transforms every element

const doubled = numbers.map(num => num * 2);


// filter()
// Selects / removes based on condition

const even = numbers.filter(num => num % 2 === 0);


// reduce()
// Produces one final result

const total = numbers.reduce(
    (sum, num) => sum + num,
    0
);


// find()
// Returns first matching element

const found = numbers.find(num => num > 25);


// findIndex()
// Returns index

const foundIndex = numbers.findIndex(
    num => num > 25
);


/*
MEMORY:

map()
-> change every item

filter()
-> select/remove

find()
-> find one

findIndex()
-> find position

reduce()
-> final calculated result
*/


// ============================================================
// 7. OBJECTS ⭐ CURRENT FOCUS
// ============================================================

const user = {

    name: "Vignesh",
    age: 25,
    city: "Hyderabad"

};


// Access

console.log(user.name);

console.log(user["name"]);


// Dynamic access

const property = "name";

console.log(user[property]);


// Add

user.salary = 50000;


// Update

user.age = 26;


// Delete

delete user.salary;


// ============================================================
// 8. OBJECT METHODS
// ============================================================


// Keys

console.log(Object.keys(user));


// Values

console.log(Object.values(user));


// Entries

console.log(Object.entries(user));


// ============================================================
// 9. OBJECT DESTRUCTURING
// ============================================================

const employee = {

    name: "Vignesh",
    age: 25,
    city: "Hyderabad"

};

const {
    name: employeeName,
    age
} = employee;


// ============================================================
// 10. OBJECT SPREAD
// ============================================================


// Copy

const copy = {
    ...employee
};


// Add

const newUser = {

    ...employee,
    salary: 50000

};


// Update

const updatedUser = {

    ...employee,
    age: 30

};


// Merge

const obj1 = {
    name: "Vignesh"
};

const obj2 = {
    age: 25
};

const merged = {
    ...obj1,
    ...obj2
};


// ============================================================
// 11. OBJECT.ASSIGN()
// ============================================================

const updatedEmployee = Object.assign(
    {},
    employee,
    {
        age: 30,
        city: "Mumbai"
    }
);


/*
IMPORTANT:

Object.assign(user, {...})
-> modifies original

Object.assign({}, user, {...})
-> creates new object
*/


// ============================================================
// 12. SHALLOW COPY
// ============================================================

const person = {

    name: "Vignesh",

    address: {
        city: "Hyderabad"
    }

};

const shallow = {
    ...person
};


/*
Outer object:
NEW

Nested address:
SAME REFERENCE
*/


console.log(person === shallow);
// false

console.log(person.address === shallow.address);
// true


// ============================================================
// 13. DEEP COPY
// ============================================================

const deep = structuredClone(person);

console.log(person === deep);
// false

console.log(person.address === deep.address);
// false


/*
SHALLOW:
{ ...obj }

DEEP:
structuredClone(obj)
*/


// ============================================================
// 14. OPTIONAL CHAINING
// ============================================================

console.log(
    person?.address?.city
);

console.log(
    person?.contact?.phone
);


/*
?. prevents errors when an intermediate
property is undefined/null.
*/


// ============================================================
// 15. NULLISH COALESCING
// ============================================================

const city = person.city ?? "Unknown";


/*
?? uses default only for:

null
undefined
*/


// ============================================================
// 16. ARRAY OF OBJECTS ⭐⭐⭐
 // VERY IMPORTANT FOR REACT / RN
// ============================================================

const users = [

    {
        id: 1,
        name: "Vignesh",
        age: 25
    },

    {
        id: 2,
        name: "Rahul",
        age: 30
    },

    {
        id: 3,
        name: "Kiran",
        age: 22
    }

];


// ------------------------------------------------------------
// Get names
// ------------------------------------------------------------

const names = users.map(
    user => user.name
);


// ------------------------------------------------------------
// Add property to EVERY object
// ------------------------------------------------------------

const usersWithCity = users.map(user => ({

    ...user,
    city: "Hyderabad"

}));


// ------------------------------------------------------------
// Update ONE object
// ------------------------------------------------------------

const updatedUsers = users.map(user =>

    user.name === "Rahul"

        ? {
            ...user,
            age: 35
        }

        : user

);


// ------------------------------------------------------------
// Remove ONE object
// ------------------------------------------------------------

const withoutRahul = users.filter(
    user => user.name !== "Rahul"
);


// ------------------------------------------------------------
// Find ONE object
// ------------------------------------------------------------

const rahul = users.find(
    user => user.id === 2
);


// ------------------------------------------------------------
// Find index
// ------------------------------------------------------------

const index = users.findIndex(
    user => user.id === 2
);


// ------------------------------------------------------------
// Filter objects
// ------------------------------------------------------------

const adults = users.filter(
    user => user.age >= 25
);


// ------------------------------------------------------------
// Total age
// ------------------------------------------------------------

const totalAge = users.reduce(
    (total, user) => total + user.age,
    0
);


/*
MEMORY:

Change every object
        ↓
      map()

Remove/select objects
        ↓
     filter()

Find one
        ↓
      find()

Find position
        ↓
    findIndex()

Calculate
        ↓
     reduce()
*/


// ============================================================
// 17. OBJECT REFERENCE
// ============================================================

const userA = {

    name: "Vignesh",
    age: 25

};

const userB = userA;

userB.age = 30;

console.log(userA.age);

// 30


/*
Both variables point to the SAME object.

userA ──────┐
            ↓
         Object
            ↑
userB ──────┘
*/


// ============================================================
// 18. OBJECT vs ARRAY
// ============================================================

/*

Object:

{
    name: "Vignesh",
    age: 25
}

Array:

[
    "Vignesh",
    25
]


Object:
-> key-value data

Array:
-> ordered collection
*/


// ============================================================
// 19. PROMISES
// ============================================================

const promise = new Promise((resolve, reject) => {

    resolve("Success");

});


promise.then(result => {

    console.log(result);

});


// ============================================================
// 20. ASYNC / AWAIT
// ============================================================

async function getData() {

    try {

        const response = await fetch(
            "https://example.com"
        );

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log(error);

    }

}


/*
async:
Function returns a Promise.

await:
Waits for Promise result inside async function.
*/


// ============================================================
// 21. EVENT LOOP
// ============================================================

console.log("A");

setTimeout(() => {

    console.log("B");

}, 0);

Promise.resolve().then(() => {

    console.log("C");

});

console.log("D");


/*
OUTPUT:

A
D
C
B


ORDER:

1. Synchronous code
2. Microtasks
3. Macrotasks

Promise.then()
-> Microtask

setTimeout()
-> Macrotask
*/


// ============================================================
// 22. INTERVIEW MEMORY TABLE
// ============================================================

/*

VARIABLES
------------------------------------------------------------
var       -> function scope
let       -> block scope
const     -> block scope


ARRAYS
------------------------------------------------------------
map()       -> transform
filter()    -> select/remove
find()      -> one item
findIndex() -> index
reduce()    -> aggregate


OBJECTS
------------------------------------------------------------
Object.keys()    -> keys
Object.values()  -> values
Object.entries() -> key + value

...obj            -> copy/merge
Object.assign()   -> copy/merge
delete            -> remove property
destructuring     -> extract properties
?.                -> safe access
??                -> default value


COPY
------------------------------------------------------------
{ ...obj }
-> shallow copy

structuredClone(obj)
-> deep copy


ASYNC
------------------------------------------------------------
Promise.then()
-> microtask

setTimeout()
-> macrotask

async/await
-> Promise-based


============================================================
*/

// ============================================================
// APPENDIX - ADDITIONAL CORE JAVASCRIPT INTERVIEW TOPICS
// ============================================================


// ============================================================
// 23. == vs ===
// ============================================================

/*
==  -> Loose equality
     -> Performs type conversion

=== -> Strict equality
     -> Checks value AND type
*/


console.log(5 == "5");
// true

console.log(5 === "5");
// false


/*
INTERVIEW:

Prefer === in most cases because
it avoids unexpected type conversion.
*/


// ============================================================
// 24. TYPEOF
// ============================================================

console.log(typeof 10);
// "number"

console.log(typeof "Hello");
// "string"

console.log(typeof true);
// "boolean"

console.log(typeof undefined);
// "undefined"

console.log(typeof null);
// "object"  <-- JavaScript historical behavior

console.log(typeof []);
// "object"

console.log(typeof {});
// "object"

console.log(typeof function () {});
// "function"


/*
IMPORTANT:

typeof null
-> "object"

typeof []
-> "object"

To check array:

Array.isArray([])
-> true
*/


console.log(Array.isArray([]));
// true

console.log(Array.isArray({}));
// false


// ============================================================
// 25. PRIMITIVE COPY vs REFERENCE COPY
// ============================================================


// Primitive

let primitiveA = 10;
let primitiveB = primitiveA;

primitiveB = 20;

console.log(primitiveA);
// 10

console.log(primitiveB);
// 20


/*
Primitive values are copied by value.
*/


// Object

let objectA = {
    value: 10
};

let objectB = objectA;

objectB.value = 20;

console.log(objectA.value);
// 20

console.log(objectB.value);
// 20


/*
Objects are reference values.

objectA and objectB point to
the same object.
*/


// ============================================================
// 26. ARRAY REFERENCE
// ============================================================

const arr1 = [1, 2, 3];

const arr2 = arr1;

arr2.push(4);

console.log(arr1);
// [1, 2, 3, 4]

console.log(arr2);
// [1, 2, 3, 4]


/*
Both variables refer to the same array.
*/


// ============================================================
// 27. ARRAY COPY USING SPREAD
// ============================================================

const originalArray = [1, 2, 3];

const copiedArray = [...originalArray];

copiedArray.push(4);

console.log(originalArray);
// [1, 2, 3]

console.log(copiedArray);
// [1, 2, 3, 4]


/*
Spread creates a new outer array.

But nested arrays/objects are still shared.
*/


// ============================================================
// 28. NESTED ARRAY SHALLOW COPY
// ============================================================

const nestedArray = [
    [1, 2],
    [3, 4]
];

const copiedNested = [...nestedArray];

copiedNested[0].push(5);

console.log(nestedArray);
// [[1, 2, 5], [3, 4]]

console.log(copiedNested);
// [[1, 2, 5], [3, 4]]


/*
Spread is a SHALLOW copy.

Outer array -> new
Inner arrays -> same references
*/


// ============================================================
// 29. MAP() - IMPORTANT RETURN BEHAVIOR
// ============================================================

const mapNumbers = [1, 2, 3];

const mapResult = mapNumbers.map(num => {

    num * 2;

});

console.log(mapResult);

// [undefined, undefined, undefined]


/*
Because the callback does not return anything.

Correct:

*/

const correctMap = mapNumbers.map(num => {

    return num * 2;

});


// Short form

const correctMap2 = mapNumbers.map(
    num => num * 2
);


// ============================================================
// 30. FILTER() - IMPORTANT RETURN BEHAVIOR
// ============================================================

const filterNumbers = [1, 2, 3, 4];

const filterResult = filterNumbers.filter(num => {

    num > 2;

});

console.log(filterResult);

// []


/*
No return
-> undefined
-> undefined is falsy
-> nothing is selected
*/


const correctFilter = filterNumbers.filter(num => {

    return num > 2;

});


// Short form

const correctFilter2 = filterNumbers.filter(
    num => num > 2
);


// ============================================================
// 31. FILTER() + MAP()
// ============================================================

const values = [10, 15, 20, 25];

const result = values
    .filter(num => num >= 20)
    .map(num => num * 2);

console.log(result);

// [40, 50]


/*
First:
filter()

Then:
map()
*/


// ============================================================
// 32. REDUCE() - SUM
// ============================================================

const sumNumbers = [1, 2, 3, 4];

const sum = sumNumbers.reduce(
    (total, num) => total + num,
    0
);

console.log(sum);

// 10


// ============================================================
// 33. REDUCE() - MULTIPLICATION
// ============================================================

const multiplyNumbers = [1, 2, 3];

const multiplication = multiplyNumbers.reduce(
    (result, num) => result * num,
    1
);

console.log(multiplication);

// 6


/*
IMPORTANT:

reduce()
can produce one final value.

Examples:

Sum
Product
Maximum
Minimum
Object grouping
Counting
*/


// ============================================================
// 34. FIND()
// ============================================================

const findNumbers = [10, 20, 30, 40];

const firstMatch = findNumbers.find(
    num => num > 20
);

console.log(firstMatch);

// 30


/*
find()
returns the actual matching element.

It does NOT return true/false.
*/


// ============================================================
// 35. FIND() WITH OBJECTS
// ============================================================

const employees = [

    {
        name: "Jack",
        age: 22
    },

    {
        name: "John",
        age: 25
    },

    {
        name: "Mike",
        age: 30
    }

];


const employee1 = employees.find(
    user => user.age >= 25
);

console.log(employee1);

/*
{
    name: "John",
    age: 25
}
*/


// ============================================================
// 36. SOME() and EVERY()
// ============================================================

const nums = [2, 4, 6, 7];


// some()
// At least ONE element satisfies condition

console.log(
    nums.some(num => num % 2 !== 0)
);

// true


// every()
// ALL elements must satisfy condition

console.log(
    nums.every(num => num % 2 === 0)
);

// false


/*
MEMORY:

some()
-> at least one

every()
-> all
*/


// ============================================================
// 37. INCLUDES()
// ============================================================

const fruits = [
    "Apple",
    "Banana",
    "Mango"
];

console.log(
    fruits.includes("Banana")
);

// true

console.log(
    fruits.includes("Orange")
);

// false


/*
includes()
-> checks whether a value exists
-> returns true / false
*/


// ============================================================
// 38. INDEXOF()
// ============================================================

console.log(
    fruits.indexOf("Banana")
);

// 1

console.log(
    fruits.indexOf("Orange")
);

// -1


/*
MEMORY:

Found
-> index

Not found
-> -1
*/


// ============================================================
// 39. SLICE()
// ============================================================

const sliceNumbers = [1, 2, 3, 4, 5];

const sliced = sliceNumbers.slice(1, 3);

console.log(sliced);

// [2, 3]

console.log(sliceNumbers);

// [1, 2, 3, 4, 5]


/*
slice():

-> does NOT modify original array
-> start index included
-> end index excluded
*/


// ============================================================
// 40. SPLICE()
// ============================================================

const spliceNumbers = [1, 2, 3, 4, 5];

const removed = spliceNumbers.splice(1, 2);

console.log(removed);

// [2, 3]

console.log(spliceNumbers);

// [1, 4, 5]


/*
splice():

-> modifies original array
-> can add/remove/replace elements
*/


/*
MEMORY:

slice()
-> copy/extract
-> original unchanged

splice()
-> modify
-> original changed
*/


// ============================================================
// 41. SORT()
// ============================================================

const sortNumbers = [10, 2, 5, 1];

sortNumbers.sort();

console.log(sortNumbers);

// [1, 10, 2, 5]


/*
WHY?

Default sort converts values to strings
and compares them lexicographically.
*/


// ============================================================
// 42. NUMERIC SORT()
// ============================================================

const numericNumbers = [10, 2, 5, 1];

numericNumbers.sort(
    (a, b) => a - b
);

console.log(numericNumbers);

// [1, 2, 5, 10]


/*
Ascending:

a - b


Descending:

b - a
*/


numericNumbers.sort(
    (a, b) => b - a
);


// ============================================================
// 43. REVERSE()
// ============================================================

const reverseNumbers = [1, 2, 3, 4];

const reversedNumbers = reverseNumbers.reverse();

console.log(reversedNumbers);

// [4, 3, 2, 1]

console.log(reverseNumbers);

// [4, 3, 2, 1]


/*
IMPORTANT:

reverse()
MODIFIES the original array.
*/


// ============================================================
// 44. CONCAT()
// ============================================================

const firstArray = [1, 2];

const secondArray = [3, 4];

const combinedArray = firstArray.concat(
    secondArray
);

console.log(combinedArray);

// [1, 2, 3, 4]

console.log(firstArray);

// [1, 2]


/*
concat()
-> creates a new array
-> original arrays unchanged
*/


// ============================================================
// 45. JOIN()
// ============================================================

const words = [
    "Apple",
    "Banana",
    "Mango"
];

const joined = words.join("-");

console.log(joined);

// "Apple-Banana-Mango"


/*
Array -> String

join()
*/


// ============================================================
// 46. SPLIT()
// ============================================================

const text = "Apple-Banana-Mango";

const splitResult = text.split("-");

console.log(splitResult);

// ["Apple", "Banana", "Mango"]


/*
String -> Array

split()
*/


/*
MEMORY:

join()
Array -> String

split()
String -> Array
*/


// ============================================================
// 47. FOREACH()
// ============================================================

const forEachNumbers = [1, 2, 3];

const forEachResult = forEachNumbers.forEach(
    num => num * 2
);

console.log(forEachResult);

// undefined


/*
forEach()
-> executes function for each item
-> does NOT return a new array


map()
-> returns a new array
*/


// ============================================================
// 48. FOREACH() WITH RETURN
// ============================================================

const numbersForEach = [1, 2, 3];

numbersForEach.forEach(num => {

    if (num === 2) {
        return;
    }

    console.log(num);

});


/*
OUTPUT:

1
3


return inside forEach()
-> skips current iteration

It does NOT stop the entire loop.
*/


// ============================================================
// 49. BREAK INSIDE FOREACH()
// ============================================================

/*

This is INVALID:

numbers.forEach(num => {

    if (num === 2) {
        break;
    }

});


break cannot be used inside a forEach callback.

Use:

for
while
do...while

when you need break.
*/


// ============================================================
// 50. FOR...OF
// ============================================================

const valuesArray = [10, 20, 30];

for (const value of valuesArray) {

    console.log(value);

}


/*
OUTPUT:

10
20
30


for...of
-> gives VALUES
*/


// ============================================================
// 51. FOR...IN
// ============================================================

const valuesArray2 = [10, 20, 30];

for (const index in valuesArray2) {

    console.log(index);

}


/*
OUTPUT:

0
1
2


for...in
-> gives KEYS / INDEXES
*/


// ============================================================
// 52. FOR...IN WITH OBJECT
// ============================================================

const personData = {

    name: "Jack",
    age: 25

};

for (const key in personData) {

    console.log(key);

}


/*
OUTPUT:

name
age


for...in
-> commonly used for object keys
*/


// ============================================================
// 53. ARRAY DESTRUCTURING
// ============================================================

const numbersData = [10, 20, 30];

const [first, second] = numbersData;

console.log(first);
// 10

console.log(second);
// 20


// ============================================================
// 54. ARRAY REST
// ============================================================

const arrayData = [10, 20, 30, 40];

const [
    firstValue,
    ...remainingValues
] = arrayData;

console.log(firstValue);

// 10

console.log(remainingValues);

// [20, 30, 40]


/*
...remainingValues
-> collects remaining elements
*/


// ============================================================
// 55. OBJECT SPREAD ORDER
// ============================================================

const userData = {

    name: "Jack",
    age: 25

};


const updatedData = {

    ...userData,
    age: 30

};

console.log(updatedData);

/*
{
    name: "Jack",
    age: 30
}
*/


/*
IMPORTANT:

Later property wins.
*/


// ============================================================
// 56. OBJECT SPREAD - REVERSE ORDER
// ============================================================

const updatedData2 = {

    age: 30,
    ...userData

};

console.log(updatedData2);

/*
{
    age: 25,
    name: "Jack"
}
*/


/*
Because:

userData.age = 25

and userData is spread AFTER age: 30.

Later value wins.
*/


// ============================================================
// 57. DEFAULT PARAMETERS
// ============================================================

function greet(name = "Guest") {

    return `Hello ${name}`;

}


console.log(
    greet()
);

// Hello Guest


console.log(
    greet("Jack")
);

// Hello Jack


/*
Default parameter is used when
argument is undefined.
*/


// ============================================================
// 58. DEFAULT PARAMETER - undefined vs null
// ============================================================

function welcome(name = "Guest") {

    return name;

}


console.log(
    welcome(undefined)
);

// Guest


console.log(
    welcome(null)
);

// null


/*
IMPORTANT:

undefined
-> default value is used

null
-> default value is NOT used


Default parameters trigger for:
undefined

Not for:
null
*/


// ============================================================
// 59. DEFAULT PARAMETERS WITH MULTIPLE VALUES
// ============================================================

function addNumbers(a, b = 10) {

    return a + b;

}


console.log(
    addNumbers(5)
);

// 15


console.log(
    addNumbers(5, undefined)
);

// 15


console.log(
    addNumbers(5, null)
);

// 5


/*
Why?

5 + null

null is converted to 0 in numeric addition.
*/


// ============================================================
// 60. IMPORTANT ARRAY METHOD COMPARISON
// ============================================================

/*

map()
------------------------------------------------------------
Purpose:
Transform every element

Returns:
New array


filter()
------------------------------------------------------------
Purpose:
Select elements

Returns:
New array


find()
------------------------------------------------------------
Purpose:
Find first matching element

Returns:
Element / undefined


findIndex()
------------------------------------------------------------
Purpose:
Find position

Returns:
Index / -1


some()
------------------------------------------------------------
Purpose:
Check if at least one matches

Returns:
true / false


every()
------------------------------------------------------------
Purpose:
Check if all match

Returns:
true / false


forEach()
------------------------------------------------------------
Purpose:
Execute code for every element

Returns:
undefined


reduce()
------------------------------------------------------------
Purpose:
Combine into one result

Returns:
Single value
*/


// ============================================================
// 61. MUTATING vs NON-MUTATING ARRAY METHODS
// ============================================================

/*
MUTATES ORIGINAL ARRAY:

push()
pop()
shift()
unshift()
splice()
sort()
reverse()


DOES NOT MUTATE ORIGINAL:

map()
filter()
find()
findIndex()
slice()
concat()
includes()
indexOf()
reduce()
some()
every()
*/


/*
IMPORTANT FOR REACT:

Prefer creating a new array/object
instead of directly mutating state.

Example:

WRONG:

users.push(newUser);


BETTER:

setUsers([
    ...users,
    newUser
]);
*/


// ============================================================
// 62. FINAL CORE JS MEMORY TABLE
// ============================================================

/*

EQUALITY
------------------------------------------------------------
==      -> loose equality
===     -> strict equality


TYPE
------------------------------------------------------------
typeof null
-> "object"

Array.isArray([])
-> true


COPY
------------------------------------------------------------
Primitive
-> copied by value

Object/Array
-> reference based


ARRAY
------------------------------------------------------------
map()       -> transform
filter()    -> select
find()      -> first matching element
findIndex() -> position
some()      -> at least one
every()     -> all
includes()  -> exists?
indexOf()   -> position
slice()     -> extract/copy
splice()    -> modify
sort()      -> sort
reverse()   -> reverse
concat()    -> combine
join()      -> array -> string
forEach()   -> execute
reduce()    -> one result


LOOPS
------------------------------------------------------------
for...of
-> values

for...in
-> keys/indexes


DESTRUCTURING
------------------------------------------------------------
const { name } = user
-> object property

const [a, b] = array
-> array values


REST
------------------------------------------------------------
...rest
-> collects remaining values


SPREAD
------------------------------------------------------------
...obj
-> copy/merge

Later property
-> wins


DEFAULT PARAMETERS
------------------------------------------------------------
undefined
-> default used

null
-> default NOT used


MUTATING METHODS
------------------------------------------------------------
push()
pop()
shift()
unshift()
splice()
sort()
reverse()


NON-MUTATING METHODS
------------------------------------------------------------
map()
filter()
find()
findIndex()
slice()
concat()
reduce()
some()
every()
includes()
indexOf()


============================================================
CORE JAVASCRIPT INTERVIEW CHECKLIST
============================================================

[✓] var / let / const
[✓] Scope
[✓] Hoisting
[✓] TDZ
[✓] == vs ===
[✓] typeof
[✓] null / undefined
[✓] Primitive vs reference
[✓] Object reference
[✓] Array reference
[✓] Shallow copy
[✓] Deep copy
[✓] Spread
[✓] Object.assign()
[✓] Destructuring
[✓] Rest operator
[✓] Optional chaining
[✓] Nullish coalescing
[✓] map()
[✓] filter()
[✓] reduce()
[✓] find()
[✓] findIndex()
[✓] some()
[✓] every()
[✓] includes()
[✓] indexOf()
[✓] slice()
[✓] splice()
[✓] sort()
[✓] reverse()
[✓] concat()
[✓] join()
[✓] split()
[✓] forEach()
[✓] for...of
[✓] for...in
[✓] Array of objects
[✓] Default parameters
[✓] undefined vs null
[✓] Promise
[✓] async / await
[✓] Event loop
[✓] Microtasks
[✓] Macrotasks
[✓] React state immutability


============================================================
*/