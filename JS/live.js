// ============================================================
// JAVASCRIPT INTERVIEW REVISION
// React Native Developer - 2+ Years
// ============================================================


// ============================================================
// 1. ARRAY TRAVERSAL
// ============================================================

const arr1 = [10, 20, 30];

for (let i = 0; i < arr1.length; i++) {

    console.log(arr1[i]);

}

// Output:
// 10
// 20
// 30


// ============================================================
// 2. FIND MAXIMUM NUMBER
// ============================================================

const arr2 = [10, 20, 30, 15];

let max = arr2[0];

// Start from index 1 because arr2[0]
// is already our initial maximum.

for (let i = 1; i < arr2.length; i++) {

    if (arr2[i] > max) {

        max = arr2[i];
    }
}

console.log(max); // 30


// Logic:
//
// max = 10
//
// 20 > 10 → max = 20
// 30 > 20 → max = 30
// 15 > 30 → false
//
// Final max = 30



// ============================================================
// 3. FIND MINIMUM NUMBER
// ============================================================

const arr3 = [10, 20, 5, 30, 2];

let min = arr3[0];

for (let i = 1; i < arr3.length; i++) {

    if (arr3[i] < min) {

        min = arr3[i];
    }
}

console.log(min); // 2



// ============================================================
// 4. SUM OF ARRAY
// ============================================================

const arr4 = [1, 2, 3, 4, 5];

let sum = 0;

for (let i = 0; i < arr4.length; i++) {

    sum += arr4[i];
}

console.log(sum); // 15


// ============================================================
// 5. AVERAGE OF ARRAY
// ============================================================

const average = sum / arr4.length;

console.log(average); // 3



// ============================================================
// 6. COUNT EVEN NUMBERS
// ============================================================

const arr5 = [1, 2, 3, 4, 5, 6];

let evenCount = 0;

for (let i = 0; i < arr5.length; i++) {

    if (arr5[i] % 2 === 0) {

        evenCount++;
    }
}

console.log(evenCount); // 3



// ============================================================
// 7. REVERSE ARRAY WITHOUT reverse()
// ============================================================

const arr6 = [10, 20, 30, 40, 50];

let reversed = [];

for (let i = arr6.length - 1; i >= 0; i--) {

    reversed[reversed.length] = arr6[i];
}

console.log(reversed);

// [50, 40, 30, 20, 10]



// ============================================================
// 8. MOVE ZEROES TO END
// ============================================================

const arr7 = [0, 1, 0, 3, 12];

let result = [];

let position = 0;


// First put all non-zero values.

for (let i = 0; i < arr7.length; i++) {

    if (arr7[i] !== 0) {

        result[position] = arr7[i];

        position++;
    }
}


// Then put zeroes.

for (let i = 0; i < arr7.length; i++) {

    if (arr7[i] === 0) {

        result[position] = 0;

        position++;
    }
}

console.log(result);

// [1, 3, 12, 0, 0]



// ============================================================
// 9. FIND DUPLICATE ELEMENTS
// ============================================================

// Rules:
// Don't use Set
// Don't use filter()
// Don't use indexOf()

const arr8 = [5, 8, 5, 2, 8, 10, 2, 15];

let duplicates = [];

for (let i = 0; i < arr8.length; i++) {

    let count = 0;
    let alreadyAdded = false;


    // Count how many times current value appears.

    for (let j = 0; j < arr8.length; j++) {

        if (arr8[i] === arr8[j]) {

            count++;
        }
    }


    // Check whether we already added this
    // duplicate to the result.

    for (let k = 0; k < duplicates.length; k++) {

        if (arr8[i] === duplicates[k]) {

            alreadyAdded = true;
        }
    }


    // Add only if it appears more than once
    // and hasn't already been added.

    if (count > 1 && !alreadyAdded) {

        duplicates[duplicates.length] = arr8[i];
    }
}

console.log(duplicates);

// [5, 8, 2]



// ============================================================
// 10. FIND MISSING NUMBER
// ============================================================

// Example:
// [1, 2, 3, 5, 6]
// Missing = 4

const arr9 = [1, 2, 3, 5, 6];

let missing = 0;

for (let i = 0; i < arr9.length; i++) {

    if (arr9[i] !== i + 1) {

        missing = i + 1;

        break;
    }
}

console.log(missing); // 4


// NOTE:
// This particular solution assumes:
// - numbers start from 1
// - array is already ordered
//
// For an unsorted array, use another approach.



// ============================================================
// 11. SECOND LARGEST NUMBER
// ============================================================

const arr10 = [10, 5, 20, 8, 15];

let largest = arr10[0];

let secondLargest = -Infinity;

for (let i = 1; i < arr10.length; i++) {

    if (arr10[i] > largest) {

        secondLargest = largest;

        largest = arr10[i];

    }
    else if (
        arr10[i] > secondLargest &&
        arr10[i] !== largest
    ) {

        secondLargest = arr10[i];
    }
}

console.log(secondLargest); // 15



// ============================================================
// 12. LARGEST AND SMALLEST
// ============================================================

const arr11 = [10, 5, 8, 20, 15, 2];

let largestValue = arr11[0];
let smallestValue = arr11[0];

for (let i = 1; i < arr11.length; i++) {

    if (arr11[i] > largestValue) {

        largestValue = arr11[i];
    }

    if (arr11[i] < smallestValue) {

        smallestValue = arr11[i];
    }
}

console.log(largestValue);  // 20
console.log(smallestValue); // 2



// ============================================================
// 13. CHECK IF ARRAY IS SORTED ASCENDING
// ============================================================

function isSortedAscending(arr) {

    for (let i = 0; i < arr.length - 1; i++) {

        // Current value should not be greater
        // than the next value.

        if (arr[i] > arr[i + 1]) {

            return false;
        }
    }

    return true;
}

console.log(isSortedAscending([2, 4, 6, 8])); // true
console.log(isSortedAscending([2, 8, 4, 10])); // false



// ============================================================
// 14. CHECK IF ARRAY IS SORTED DESCENDING
// ============================================================

function isSortedDescending(arr) {

    for (let i = 0; i < arr.length - 1; i++) {

        if (arr[i] < arr[i + 1]) {

            return false;
        }
    }

    return true;
}

console.log(isSortedDescending([10, 8, 6, 4])); // true



// ============================================================
// 15. COUNT OCCURRENCES
// ============================================================

function countOccurrences(arr, target) {

    let count = 0;

    for (let i = 0; i < arr.length; i++) {

        if (arr[i] === target) {

            count++;
        }
    }

    return count;
}

console.log(
    countOccurrences([1, 2, 3, 2, 4, 2], 2)
);

// 3



// ============================================================
// 16. COUNT OCCURRENCES USING reduce()
// ============================================================

function countUsingReduce(arr, target) {

    return arr.reduce((count, value) => {

        if (value === target) {

            return count + 1;
        }

        return count;

    }, 0);
}

console.log(
    countUsingReduce([1, 2, 3, 2, 4, 2], 2)
);

// 3



// ============================================================
// 17. FIND USER BY ID
// ============================================================

const users1 = [
    { id: 1, name: "Ram" },
    { id: 2, name: "Sai" },
    { id: 3, name: "John" }
];

const userId = 2;

const user = users1.find(
    (user) => user.id === userId
);

console.log(user);

// { id: 2, name: "Sai" }



// ============================================================
// 18. FILTER USERS
// ============================================================

const users2 = [
    { id: 1, name: "Ram", age: 22 },
    { id: 2, name: "Sai", age: 28 },
    { id: 3, name: "John", age: 30 },
    { id: 4, name: "Krishna", age: 24 }
];

const adults = users2.filter(
    (user) => user.age >= 25
);

console.log(adults);

// Sai and John



// ============================================================
// 19. FILTER + MAP
// ============================================================

const users3 = [
    { id: 1, name: "Alice", country: "USA" },
    { id: 2, name: "Bob", country: "Canada" },
    { id: 3, name: "Charlie", country: "USA" },
    { id: 4, name: "David", country: "Germany" }
];

const usaUsers = users3
    .filter((user) => user.country === "USA")
    .map((user) => user.name);

console.log(usaUsers);

// ["Alice", "Charlie"]



// ============================================================
// 20. REDUCE - FIND HIGHEST SALARY
// ============================================================

const users4 = [
    { id: 1, name: "Alice", salary: 50000 },
    { id: 2, name: "Bob", salary: 70000 },
    { id: 3, name: "Charlie", salary: 65000 },
    { id: 4, name: "David", salary: 80000 }
];

const highestSalaryUser = users4.reduce(
    (highest, user) => {

        if (user.salary > highest.salary) {

            return user;
        }

        return highest;

    },
    users4[0]
);

console.log(highestSalaryUser);

// { id: 4, name: "David", salary: 80000 }



// ============================================================
// 21. BINARY SEARCH
// ============================================================

// IMPORTANT:
// Binary search works on a SORTED array.

function binarySearch(arr, target) {

    let left = 0;

    let right = arr.length - 1;


    while (left <= right) {

        // Find middle index.

        let mid = Math.floor(
            (left + right) / 2
        );


        // Target found.

        if (arr[mid] === target) {

            return mid;
        }


        // Target is on the RIGHT side.

        if (target > arr[mid]) {

            left = mid + 1;

        }
        else {

            // Target is on the LEFT side.

            right = mid - 1;
        }
    }


    // Target not found.

    return -1;
}


const numbers = [
    5, 8, 12, 15, 18,
    21, 25, 30, 34, 40
];

console.log(
    binarySearch(numbers, 30)
);

// 7


console.log(
    binarySearch(numbers, 100)
);

// -1



// ============================================================
// 22. SUM + AVERAGE IN SINGLE TRAVERSAL
// ============================================================

function sumAndAverage(arr) {

    if (arr.length === 0) {

        return {
            sum: 0,
            average: 0
        };
    }


    let sum = 0;


    // One traversal.

    for (let i = 0; i < arr.length; i++) {

        sum += arr[i];
    }


    const average = sum / arr.length;


    return {
        sum: sum,
        average: average
    };
}

console.log(
    sumAndAverage([2, 4, 6, 8])
);

// {
//   sum: 20,
//   average: 5
// }



// ============================================================
// 23. REVERSE ARRAY
// ============================================================

function reverseArray(arr) {

    let result = [];

    for (
        let i = arr.length - 1;
        i >= 0;
        i--
    ) {

        result[result.length] = arr[i];
    }

    return result;
}

console.log(
    reverseArray([1, 2, 3, 4, 5])
);

// [5, 4, 3, 2, 1]



// ============================================================
// 24. var vs let
// ============================================================


// var is function scoped.
// let is block scoped.

var a = 10;

if (true) {

    var a = 20;
}

console.log(a);

// 20


// Why?
//
// var does NOT create a new variable
// inside the if block.
//
// Same function scope variable is updated.



let b = 10;

if (true) {

    let b = 20;

    console.log(b); // 20
}

console.log(b); // 10


// Why?
//
// let is block scoped.
//
// Outer b = 10
// Inner b = 20
//
// They are different variables.



// ============================================================
// 25. var REDECLARATION
// ============================================================

var x = 10;

var x = 20;

console.log(x); // 20


// var allows redeclaration.



// ============================================================
// 26. let REDECLARATION
// ============================================================

// let y = 10;
// let y = 20;
//
// ❌ SyntaxError
//
// let does NOT allow redeclaration
// in the same scope.



// ============================================================
// 27. HOISTING - var
// ============================================================

console.log(value);

var value = 10;

// Output:
//
// undefined
//
// JavaScript conceptually treats it like:
//
// var value;
//
// console.log(value);
//
// value = 10;



// ============================================================
// 28. HOISTING - let
// ============================================================

// console.log(number);
//
// let number = 20;
//
// ❌ ReferenceError
//
// let is hoisted but remains in the
// Temporal Dead Zone (TDZ)
// until the declaration is reached.



// ============================================================
// 29. FUNCTION HOISTING
// ============================================================

sayHello();

function sayHello() {

    console.log("Hello");
}

// Output:
//
// Hello
//
// Function declarations are hoisted,
// so the function can be called before
// its declaration.



// ============================================================
// 30. var HOISTING INSIDE FUNCTION
// ============================================================

var globalValue = 10;

function test() {

    // The local var declaration is hoisted.

    var globalValue;

    console.log(globalValue);

    globalValue = 20;
}

test();

// undefined
//
// IMPORTANT:
//
// The local "var globalValue"
// shadows the outer variable.
//
// Conceptually:
//
// function test() {
//
//     var globalValue;
//
//     console.log(globalValue);
//
//     globalValue = 20;
// }



// ============================================================
// 31. CLOSURE
// ============================================================

function createCounter() {

    let count = 0;

    return function () {

        count++;

        return count;
    };
}


// createCounter() runs ONCE.

const increment = createCounter();


// The returned function remembers
// the outer "count" variable.

console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3


// ============================================================
// 32. MULTIPLE CLOSURES
// ============================================================

function counterFactory() {

    let count = 0;

    return function () {

        count++;

        return count;
    };
}


const counterA = counterFactory();

const counterB = counterFactory();


console.log(counterA()); // 1
console.log(counterA()); // 2

console.log(counterB()); // 1
console.log(counterB()); // 2


// A and B have DIFFERENT count variables.



// ============================================================
// 33. PRIVATE DATA USING CLOSURE
// ============================================================

function createUser() {

    let name = "Vignesh";

    return {

        getName: function () {

            return name;
        },

        setName: function (newName) {

            name = newName;
        }
    };
}


const currentUser = createUser();

console.log(currentUser.getName());
// Vignesh


currentUser.setName("Rahul");

console.log(currentUser.getName());
// Rahul


// name is private.
// getName and setName access it
// through closure.