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