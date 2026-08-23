// ============================================================
// OBJECT QUESTIONS — OVERALL REVISION
// ============================================================


// ============================================================
// Object Q1 — Find User by ID
// ============================================================

// Given:
const users = [
    { id: 1, name: "Ram" },
    { id: 2, name: "Sai" },
    { id: 3, name: "John" }
];

const userId = 2;

// Expected:
// { id: 2, name: "Sai" }

function findUser(users, userId) {

    // Loop through all users
    for (let i = 0; i < users.length; i++) {

        // Check current user's ID
        if (users[i].id === userId) {

            // User found → return object
            return users[i];
        }
    }

    // User not found
    return null;
}

console.log(findUser(users, userId));


// ============================================================
// Object Q2 — Count Users by Country
// ============================================================

// Given:
const users2 = [
    { name: "Ram", country: "India" },
    { name: "John", country: "USA" },
    { name: "Sai", country: "India" },
    { name: "David", country: "USA" },
    { name: "Alex", country: "UK" }
];

// Expected:
// {
//     India: 2,
//     USA: 2,
//     UK: 1
// }

// Same frequency-counting pattern used with strings

function countUsers(users) {

    let count = {};

    // Loop through users
    for (let i = 0; i < users.length; i++) {

        // Get current user's country
        let country = users[i].country;

        // Country already exists → increase count
        if (count[country]) {
            count[country]++;
        } else {

            // First user from this country
            count[country] = 1;
        }
    }

    return count;
}

console.log(countUsers(users2));


// ============================================================
// Object Q3 — Get Users With Salary > 50,000
// ============================================================

// Given:
const users3 = [
    { id: 1, name: "Ram", salary: 40000 },
    { id: 2, name: "Sai", salary: 60000 },
    { id: 3, name: "John", salary: 75000 },
    { id: 4, name: "Alex", salary: 45000 }
];

// Expected:
// [
//     { id: 2, name: "Sai", salary: 60000 },
//     { id: 3, name: "John", salary: 75000 }
// ]

function getSal(users) {

    const sal = [];

    // Loop through all users
    for (let i = 0; i < users.length; i++) {

        // Check salary condition
        if (users[i].salary > 50000) {

            // Add matching user to result
            sal[sal.length] = users[i];
        }
    }

    // Return filtered users
    return sal;
}

console.log(getSal(users3));


// ============================================================
// Object Q4 — Find Highest Salary
// ============================================================

// Given:
const users4 = [
    { id: 1, name: "Ram", salary: 40000 },
    { id: 2, name: "Sai", salary: 60000 },
    { id: 3, name: "John", salary: 75000 },
    { id: 4, name: "Alex", salary: 45000 }
];

// Expected:
// { id: 3, name: "John", salary: 75000 }

function highestSal(users) {

    // Assume first user has highest salary
    let highest = users[0];

    // Start from second user
    for (let i = 1; i < users.length; i++) {

        // Compare current salary with highest
        if (users[i].salary > highest.salary) {

            // Update highest user
            highest = users[i];
        }
    }

    // Return highest salary user
    return highest;
}

console.log(highestSal(users4));


// ============================================================
// Object Q5 — Group Users by Country ⭐
// ============================================================

// Very common real-world/API-data question.

// Given:
const users5 = [
    { id: 1, name: "Ram", country: "India" },
    { id: 2, name: "John", country: "USA" },
    { id: 3, name: "Sai", country: "India" },
    { id: 4, name: "David", country: "USA" },
    { id: 5, name: "Alex", country: "UK" }
];

// Expected:
//
// {
//     India: [
//         { id: 1, name: "Ram", country: "India" },
//         { id: 3, name: "Sai", country: "India" }
//     ],
//     USA: [
//         { id: 2, name: "John", country: "USA" },
//         { id: 4, name: "David", country: "USA" }
//     ],
//     UK: [
//         { id: 5, name: "Alex", country: "UK" }
//     ]
// }

function groupbyCountry(users) {

    let count = {};

    // Loop through all users
    for (let i = 0; i < users.length; i++) {

        // Get current user's country
        let country = users[i].country;

        // Country doesn't exist → create empty array
        if (!count[country]) {
            count[country] = [];
        }

        // Add user to country's array
        count[country][count[country].length] = users[i];
    }

    return count;
}

console.log(groupbyCountry(users5));


// ============================================================
// Object Q6 — Update an Object
// ============================================================

// Important for React state and API data.

// Given:
const user6 = {
    id: 1,
    name: "Vignesh",
    age: 25
};

// Change age → 26

// Directly update property
user6.age = 26;

console.log(user6);

// {
//     id: 1,
//     name: "Vignesh",
//     age: 26
// }


// ============================================================
// Object Q7 — Update User in an Array ⭐
// ============================================================

// More realistic for React/RN.

// Given:
const users7 = [
    { id: 1, name: "Ram", age: 22 },
    { id: 2, name: "Sai", age: 25 },
    { id: 3, name: "John", age: 30 }
];

// Update user whose id = 2
// age → 26

for (let i = 0; i < users7.length; i++) {

    // Find user with id 2
    if (users7[i].id === 2) {

        // Update age
        users7[i].age = 26;
    }
}

console.log(users7);


// ============================================================
// Object Q8 — Object Destructuring
// ============================================================

// Very important for React/RN.

// Given:
const user8 = {
    id: 1,
    name: "Vignesh",
    age: 26
};

// Extract name and age
const { name, age } = user8;

// Instead of:
//
// const name = user8.name;
// const age = user8.age;

console.log(name); // Vignesh
console.log(age);  // 26


// ============================================================
// Object Q9 — Object Spread / Copy
// ============================================================

// Given:
const user9 = {
    id: 1,
    name: "Vignesh",
    age: 26
};

// Create new object with age = 27
// Original object should remain unchanged.

const updatedUser = {
    ...user9,       // Copy all properties
    age: 27         // Override age
};

// user9
// { id: 1, name: "Vignesh", age: 26 }
//
// updatedUser
// { id: 1, name: "Vignesh", age: 27 }

console.log(user9.age);        // 26
console.log(updatedUser.age); // 27


// ============================================================
// Object Q10 — Nested Object ⭐
// ============================================================

// Very common with API responses.

// Given:
const user10 = {
    id: 1,
    name: "Vignesh",
    address: {
        city: "Hyderabad",
        pincode: 500001
    }
};

// Access nested property
console.log(user10.address.city);
// Hyderabad


// ============================================================
// Object Q11 — Nested Object Update ⭐
// ============================================================

// Given:
const user11 = {
    id: 1,
    name: "Vignesh",
    address: {
        city: "Hyderabad",
        pincode: 500001
    }
};

// Change city → Mumbai
user11.address.city = "Mumbai";

console.log(user11);


// ============================================================
// Object Q12 — Object.keys()
// ============================================================

// Given:
const user12 = {
    id: 1,
    name: "Vignesh",
    age: 26
};

// Get all keys
console.log(Object.keys(user12));

// ["id", "name", "age"]


// ============================================================
// Object Q13 — Object.values()
// ============================================================

// Given:
const user13 = {
    id: 1,
    name: "Vignesh",
    age: 26
};

// Get all values
console.log(Object.values(user13));

// [1, "Vignesh", 26]


// ============================================================
// Object Q14 — Object.entries()
// ============================================================

// Given:
const user14 = {
    id: 1,
    name: "Vignesh",
    age: 26
};

// Get key-value pairs
console.log(Object.entries(user14));

// [
//     ["id", 1],
//     ["name", "Vignesh"],
//     ["age", 26]
// ]


// ============================================================
// Object Q15 — Dynamic Object Key ⭐
// ============================================================

// Very important because you already used this
// in frequency counting and grouping.

// Given:
const country = "India";
const count15 = {};

// Dynamic key
count15[country] = 1;

console.log(count15);

// {
//     India: 1
// }


// ============================================================
// Object Q16 — Convert Object to Array ⭐
// ============================================================

// Given:
const user16 = {
    id: 1,
    name: "Vignesh",
    age: 26
};

// Convert object into key-value pairs
console.log(Object.entries(user16));

// [
//     ["id", 1],
//     ["name", "Vignesh"],
//     ["age", 26]
// ]


// 🧠 Overall Object Patterns to Remember
// Q1 — Find an object
// if (users[i].id === userId) {
//     return users[i];
// }

// Pattern: Loop → condition → return object.

// Q2 — Count by property
// if (count[country]) {
//     count[country]++;
// } else {
//     count[country] = 1;
// }

// Pattern: Object frequency counting.

// Q3 — Filter objects
// if (users[i].salary > 50000) {
//     result[result.length] = users[i];
// }

// Pattern: Condition true → add object to new array.

// Q4 — Find highest
// let highest = users[0];


// if (users[i].salary > highest.salary) {
//     highest = users[i];
// }

// Pattern: Store object → compare its property.

// Q5 — Group objects
// if (!count[country]) {
//     count[country] = [];
// }


// count[country][count[country].length] = users[i];

// Pattern: Dynamic key → array → add objects.

// Q6/Q7 — Update
// user.age = 26;

// or:

// users[i].age = 26;

// Pattern: Access property → assign new value.

// Q8 — Destructuring
// const { name, age } = user;

// Pattern: Extract properties into variables.

// Q9 — Spread
// const updatedUser = {
//     ...user,
//     age: 27
// };

// Pattern: Copy object → override property.

// Q10/Q11 — Nested objects
// user.address.city

// Update:

// user.address.city = "Mumbai";

// Pattern: Object → nested object → property.

// Q12–Q14 — Object utilities
// Object.keys(user);      // keys
// Object.values(user);    // values
// Object.entries(user);   // key-value pairs
// Q15 — Dynamic key ⭐
// const key = "India";


// count[key] = 1;

// This is the same concept you used in:

// count[str[i]]
// count[country]