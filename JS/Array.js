// ============================================================
// ARRAY QUESTIONS — OVERALL REVISION
// ============================================================


// ============================================================
// ARRAY Q1 — Traversing an Array
// ============================================================

// Given:
let arr = [10, 20, 30];

// Visit every element
for (let i = 0; i < arr.length; i++) {

    // Access current element
    console.log(arr[i]);
}


// ============================================================
// ARRAY Q2 — Maximum Element
// ============================================================

// Given:
let arr2 = [10, 20, 30];

// Assume first element is maximum
let max = arr2[0];

for (let i = 1; i < arr2.length; i++) {

    // Current element is greater
    if (arr2[i] > max) {

        // Update maximum
        max = arr2[i];
    }
}

console.log("max", max);
// 30


// ============================================================
// ARRAY Q3 — Minimum Element
// ============================================================

// Given:
let arr3 = [10, 20, 30];

// Assume first element is minimum
let min = arr3[0];

for (let i = 1; i < arr3.length; i++) {

    // Current element is smaller
    if (arr3[i] < min) {

        // Update minimum
        min = arr3[i];
    }
}

console.log("min", min);
// 10


// ============================================================
// ARRAY Q4 — Sum of Array
// ============================================================

// Given:
// [1, 2, 3, 4, 5]

// Expected:
// 15

let arr4 = [1, 2, 3, 4, 5];

let sum = 0;

// Add every element
for (let i = 0; i < arr4.length; i++) {

    sum += arr4[i];
}

console.log("sum", sum);
// 15


// ============================================================
// ARRAY Q5 — Average
// ============================================================

// Average = sum / number of elements

let avg = sum / arr4.length;

console.log("average", avg);
// 3


// ============================================================
// ARRAY Q6 — Count Even Numbers
// ============================================================

let count = 0;

for (let i = 0; i < arr4.length; i++) {

    // Even number → remainder is 0
    if (arr4[i] % 2 === 0) {
        count++;
    }
}

console.log("even count", count);


// ============================================================
// ARRAY Q7 — Sum and Average in Single Traversal
// ============================================================

function sumAndAverage(arr) {

    // Handle empty array
    if (arr.length === 0) {
        return {
            sum: 0,
            average: 0
        };
    }

    let sum = 0;

    // Calculate sum
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    // Calculate average
    let average = sum / arr.length;

    return {
        sum: sum,
        average: average
    };
}

console.log(sumAndAverage([2, 4, 6, 8]));

// {
//     sum: 20,
//     average: 5
// }


// ============================================================
// ARRAY Q8 — Find Largest and Smallest
// ============================================================

// Given:
const arr8 = [10, 5, 8, 20, 15, 2];

let largest = arr8[0];
let smallest = arr8[0];

// Single traversal
for (let i = 1; i < arr8.length; i++) {

    // Check largest
    if (arr8[i] > largest) {
        largest = arr8[i];
    }

    // Check smallest
    if (arr8[i] < smallest) {
        smallest = arr8[i];
    }
}

console.log("largest", largest);
// 20

console.log("smallest", smallest);
// 2


// ============================================================
// ARRAY Q9 — Find Second Largest
// ============================================================

// Given:
// [10, 5, 20, 8, 15]

// Expected:
// 15

function secondLargest(arr) {

    let largest = arr[0];
    let secondLargest = -Infinity;

    for (let i = 1; i < arr.length; i++) {

        // New largest found
        if (arr[i] > largest) {

            // Old largest becomes second
            secondLargest = largest;

            // Update largest
            largest = arr[i];

        }
        // Between largest and second largest
        else if (
            arr[i] > secondLargest &&
            arr[i] !== largest
        ) {
            secondLargest = arr[i];
        }
    }

    return secondLargest;
}

console.log(secondLargest([10, 5, 20, 8, 15]));
// 15


// ============================================================
// ARRAY Q10 — Reverse an Array
// ============================================================

// Given:
const arr10 = [10, 20, 30, 40, 50];

let reversed = [];

// Start from last index
for (let i = arr10.length - 1; i >= 0; i--) {

    // Add element to result
    reversed[reversed.length] = arr10[i];
}

console.log("reversed", reversed);

// [50, 40, 30, 20, 10]


// ============================================================
// ARRAY Q11 — Check Ascending Order
// ============================================================

function isAscending(arr) {

    // Compare current with next
    for (let i = 0; i < arr.length - 1; i++) {

        // Current greater than next → not sorted
        if (arr[i] > arr[i + 1]) {
            return false;
        }
    }

    // No violation found
    return true;
}

console.log(isAscending([2, 4, 6, 8, 10]));
// true

console.log(isAscending([2, 8, 4, 10]));
// false

console.log(isAscending([1]));
// true

console.log(isAscending([]));
// true


// ============================================================
// ARRAY Q12 — Check Descending Order
// ============================================================

function isDescending(arr) {

    // Compare current with next
    for (let i = 0; i < arr.length - 1; i++) {

        // Current smaller than next → not sorted
        if (arr[i] < arr[i + 1]) {
            return false;
        }
    }

    return true;
}

console.log(isDescending([10, 8, 6, 4, 2]));
// true

console.log(isDescending([10, 8, 4, 6]));
// false

console.log(isDescending([1]));
// true

console.log(isDescending([]));
// true


// ============================================================
// ARRAY Q13 — Count Occurrences
// ============================================================

// Return how many times target appears.

function countOccurrences(arr, target) {

    let count = 0;

    // Traverse array
    for (let i = 0; i < arr.length; i++) {

        // Target found
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
// ARRAY Q14 — Count Occurrences Using reduce()
// ============================================================

function countOccurrencesReduce(arr, target) {

    return arr.reduce((count, value) => {

        // Match → increase count
        return value === target
            ? count + 1
            : count;

    }, 0);
}

console.log(
    countOccurrencesReduce([1, 2, 3, 2, 4, 2], 2)
);

// 3


// ============================================================
// ARRAY Q15 — Find User by ID
// ============================================================

// Given:
const users15 = [
    { id: 1, name: "Ram" },
    { id: 2, name: "Sai" },
    { id: 3, name: "John" }
];

const userId = 2;

// find() returns the first matching object
const user = users15.find(
    (user) => user.id === userId
);

console.log("user", user);

// { id: 2, name: "Sai" }


// ============================================================
// ARRAY Q16 — Filter Users by Age
// ============================================================

// Given:
const users16 = [
    { id: 1, name: "Ram", age: 22 },
    { id: 2, name: "Sai", age: 28 },
    { id: 3, name: "John", age: 30 },
    { id: 4, name: "Krishna", age: 24 }
];

// Return users age >= 25
const young = users16.filter(
    (user) => user.age >= 25
);

console.log("young", young);


// ============================================================
// ARRAY Q17 — Filter + Map
// ============================================================

// Return names of users from USA.

const users17 = [
    { id: 1, name: "Alice", country: "USA" },
    { id: 2, name: "Bob", country: "Canada" },
    { id: 3, name: "Charlie", country: "USA" },
    { id: 4, name: "David", country: "Germany" }
];

// Step 1 → filter USA
// Step 2 → get names
const names = users17
    .filter((user) => user.country === "USA")
    .map((user) => user.name);

console.log("names", names);

// ["Alice", "Charlie"]


// ============================================================
// ARRAY Q18 — Highest Salary Using reduce()
// ============================================================

const users18 = [
    { id: 1, name: "Alice", salary: 50000 },
    { id: 2, name: "Bob", salary: 70000 },
    { id: 3, name: "Charlie", salary: 65000 },
    { id: 4, name: "David", salary: 80000 }
];

// Keep the user with highest salary
const highestSalary = users18.reduce(
    (acc, user) => {

        // Current user has higher salary
        if (user.salary > acc.salary) {
            return user;
        }

        // Keep previous highest
        return acc;

    },
    users18[0]
);

console.log("highest salary", highestSalary);

// { id: 4, name: "David", salary: 80000 }


// ============================================================
// ARRAY Q19 — Move All Zeros to End
// ============================================================

// Given:
// [0, 1, 0, 3, 12]

// Expected:
// [1, 3, 12, 0, 0]

const arr19 = [0, 1, 0, 3, 12];

let arrResult = [];
let position = 0;

// First add non-zero values
for (let i = 0; i < arr19.length; i++) {

    if (arr19[i] !== 0) {

        arrResult[position] = arr19[i];
        position++;
    }
}

// Then add zeros
for (let i = 0; i < arr19.length; i++) {

    if (arr19[i] === 0) {

        arrResult[position] = arr19[i];
        position++;
    }
}

console.log("result", arrResult);

// [1, 3, 12, 0, 0]


// ============================================================
// ARRAY Q20 — Find Missing Number
// ============================================================

// Given:
// [1, 2, 3, 5, 6]

// Expected:
// 4

const arr20 = [1, 2, 3, 5, 6];

let missing = 0;

// Compare expected number with actual number
for (let i = 0; i < arr20.length; i++) {

    if (arr20[i] !== i + 1) {

        // Missing number found
        missing = i + 1;
        break;
    }
}

console.log("missing", missing);
// 4


// ============================================================
// ARRAY Q21 — Find Duplicate Elements
// ============================================================

// Given:
// [5, 8, 5, 2, 8, 10, 2, 15]

// Expected:
// [5, 8, 2]

// Don't use:
// Set
// filter()
// indexOf()

const arr21 = [5, 8, 5, 2, 8, 10, 2, 15];

let duplicates = [];

for (let i = 0; i < arr21.length; i++) {

    let count = 0;
    let alreadyAdded = false;

    // Count occurrences
    for (let j = 0; j < arr21.length; j++) {

        if (arr21[i] === arr21[j]) {
            count++;
        }
    }

    // Check if already added to result
    for (let k = 0; k < duplicates.length; k++) {

        if (arr21[i] === duplicates[k]) {
            alreadyAdded = true;
        }
    }

    // Add only duplicate and not already added
    if (!alreadyAdded && count > 1) {
        duplicates[duplicates.length] = arr21[i];
    }
}

console.log("duplicates", duplicates);

// [5, 8, 2]


// ============================================================
// ARRAY Q22 — Binary Search ⭐
// ============================================================

// IMPORTANT:
// Array must be sorted.

// Given:
const arr22 = [
    5, 8, 12, 15, 18,
    21, 25, 30, 34, 40
];

function binarySearch(arr, target) {

    let left = 0;
    let right = arr.length - 1;

    // Continue while search area exists
    while (left <= right) {

        // Find middle index
        const mid = Math.floor(
            (left + right) / 2
        );

        // Target found
        if (arr[mid] === target) {
            return mid;
        }

        // Target is on right side
        if (target > arr[mid]) {

            left = mid + 1;

        } else {

            // Target is on left side
            right = mid - 1;
        }
    }

    // Target not found
    return -1;
}

console.log(binarySearch(arr22, 30));
// 7

console.log(binarySearch(arr22, 100));
// -1


// ============================================================
// BINARY SEARCH — HOW TO REMEMBER
// ============================================================
//
// left
//   ↓
// [5, 8, 12, 15, 18, 21, 25, 30]
//                         ↑
//                        right
//
// Check middle
//
// target > middle
//     ↓
// move left forward
//
// target < middle
//     ↓
// move right backward
//
// target === middle
//     ↓
// return index
//
// Not found
//     ↓
// return -1


// ============================================================
// ARRAY CORE PATTERNS
// ============================================================


// 1. TRAVERSE
//
// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
// }


// 2. MAXIMUM
//
// let max = arr[0];
//
// if (arr[i] > max) {
//     max = arr[i];
// }


// 3. MINIMUM
//
// let min = arr[0];
//
// if (arr[i] < min) {
//     min = arr[i];
// }


// 4. SUM
//
// let sum = 0;
//
// for (...) {
//     sum += arr[i];
// }


// 5. COUNT
//
// let count = 0;
//
// if (condition) {
//     count++;
// }


// 6. REVERSE
//
// Start from last index:
//
// for (let i = arr.length - 1; i >= 0; i--)


// 7. SEARCH
//
// Check condition:
//
// if (arr[i] === target) {
//     return i;
// }


// 8. SECOND LARGEST
//
// largest
// secondLargest
//
// Update both when new largest appears.


// 9. SORTED CHECK
//
// Compare neighbours:
//
// if (arr[i] > arr[i + 1]) {
//     return false;
// }


// 10. FILTER
//
// condition true
//      ↓
// add to result array


// 11. MAP
//
// Object/value
//      ↓
// transform
//      ↓
// new array


// 12. REDUCE
//
// Many values
//      ↓
// one final result


// 13. BINARY SEARCH
//
// sorted array
//      ↓
// middle
//      ↓
// eliminate half
//      ↓
// repeat