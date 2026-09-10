// ============================================================
// JAVASCRIPT OBJECTS - INTERVIEW REVISION
// ============================================================

// ============================================================
// 1. CREATE AN OBJECT
// ============================================================

const user = {
  name: "Vignesh",
  age: 26,
  city: "Hyderabad"
};

console.log(user);


// ============================================================
// 2. ACCESS OBJECT PROPERTIES
// ============================================================

// Dot notation
console.log(user.name);
console.log(user.age);

// Bracket notation
console.log(user["name"]);
console.log(user["age"]);


// ============================================================
// 3. DYNAMIC KEY
// ============================================================

const key = "name";

console.log(user[key]);

// IMPORTANT:
//
// user.key
// -> looks for property literally called "key"
//
// user[key]
// -> uses the value stored inside key
//
// key = "name"
// user[key] -> user["name"] -> "Vignesh"


// ============================================================
// 4. ADD / UPDATE PROPERTIES
// ============================================================

// Add new property
user.salary = 50000;

// Update existing property
user.city = "Mumbai";

user.age = 30;

console.log(user);


// ============================================================
// 5. DELETE PROPERTY
// ============================================================

delete user.salary;

console.log(user);

// Accessing deleted property
console.log(user.salary);

// Output:
// undefined


// ============================================================
// 6. undefined vs null
// ============================================================

// undefined
// -> value/property is not available

// null
// -> property exists but intentionally has no value

const user2 = {
  name: "Rahul",
  city: null
};

console.log(user2.city);     // null
console.log(user2.salary);   // undefined


// ============================================================
// 7. NESTED OBJECT
// ============================================================

const employee = {
  name: "Rahul",
  age: 25,

  address: {
    city: "Mumbai",
    pincode: 400001
  }
};

console.log(employee.name);

console.log(employee.address.city);

console.log(employee.address.pincode);


// Update nested property
employee.address.city = "Hyderabad";

console.log(employee.address.city);


// Delete nested property
delete employee.address.pincode;

console.log(employee);


// ============================================================
// 8. Object.keys()
// ============================================================

const person = {
  name: "Rahul",
  age: 25,
  city: "Mumbai"
};

console.log(Object.keys(person));

// Output:
// ["name", "age", "city"]


// ============================================================
// 9. Object.keys() WITH LOOP
// ============================================================

Object.keys(person).forEach((key) => {
  console.log(key);
});

// Output:
// name
// age
// city


// ============================================================
// 10. Object.keys() -> KEY + VALUE
// ============================================================

Object.keys(person).forEach((key) => {
  console.log(key, person[key]);
});

// Output:
// name Rahul
// age 25
// city Mumbai


// IMPORTANT:
//
// Object.keys(person)
// -> gives keys
//
// person[key]
// -> gives value


// ============================================================
// 11. Object.values()
// ============================================================

console.log(Object.values(person));

// Output:
// ["Rahul", 25, "Mumbai"]


// ============================================================
// 12. Object.entries()
// ============================================================

console.log(Object.entries(person));

// Output:
// [
//   ["name", "Rahul"],
//   ["age", 25],
//   ["city", "Mumbai"]
// ]


// ============================================================
// 13. Object.assign()
// ============================================================

const user3 = {
  name: "Rahul",
  age: 25,
  city: "Mumbai"
};

Object.assign(user3, {
  city: "Hyderabad",
  salary: 50000
});

console.log(user3);


// IMPORTANT:
//
// Object.assign(target, source)
//
// First argument = target
// Second argument = source
//
// It modifies the original target object.


// ============================================================
// 14. Object.assign() -> CREATE NEW OBJECT
// ============================================================

const user4 = {
  name: "Rahul",
  age: 25,
  city: "Mumbai"
};

const updatedUser = Object.assign({}, user4, {
  city: "Hyderabad",
  salary: 50000
});

console.log(user4);

console.log(updatedUser);

// user4 remains unchanged
// updatedUser is a new object


// ============================================================
// 15. SPREAD OPERATOR
// ============================================================

const user5 = {
  name: "Rahul",
  age: 25,
  city: "Mumbai"
};

const updatedUser2 = {
  ...user5,
  city: "Hyderabad",
  salary: 50000
};

console.log(user5);

console.log(updatedUser2);


// IMPORTANT:
//
// ...user5
// -> copies properties from user5
//
// It creates a NEW outer object.


// ============================================================
// 16. SPREAD OVERRIDE ORDER
// ============================================================

const user6 = {
  name: "Rahul",
  age: 25
};

const result1 = {
  ...user6,
  age: 30
};

console.log(result1);

// age = 30


const result2 = {
  age: 30,
  ...user6
};

console.log(result2);

// age = 25


// IMPORTANT:
//
// Later value wins.
//
// { ...user, age: 30 }
// -> 30 wins
//
// { age: 30, ...user }
// -> user.age wins


// ============================================================
// 17. REFERENCE vs SPREAD
// ============================================================

const user7 = {
  name: "Vignesh"
};

const user8 = user7;

user8.name = "Rahul";

console.log(user7.name);
console.log(user8.name);

// Output:
// Rahul
// Rahul


// WHY?
//
// user8 = user7
// Both variables point to the SAME object.


// ============================================================
// 18. SPREAD CREATES NEW OBJECT
// ============================================================

const user9 = {
  name: "Vignesh"
};

const user10 = {
  ...user9
};

user10.name = "Rahul";

console.log(user9.name);
console.log(user10.name);

// Output:
// Vignesh
// Rahul


console.log(user9 === user10);

// Output:
// false


// ============================================================
// 19. SHALLOW COPY
// ============================================================

const user11 = {
  name: "Vignesh",

  address: {
    city: "Mumbai"
  }
};

const user12 = {
  ...user11
};

user12.address.city = "Hyderabad";

console.log(user11.address.city);
console.log(user12.address.city);

// Output:
// Hyderabad
// Hyderabad


// WHY?
//
// Spread only copied the OUTER object.
//
// address is still the SAME nested object.
//
// user11.address === user12.address
// true


// ============================================================
// 20. NESTED SPREAD
// ============================================================

const user13 = {
  name: "Vignesh",

  address: {
    city: "Mumbai"
  }
};

const user14 = {
  ...user13,

  address: {
    ...user13.address
  }
};

user14.address.city = "Hyderabad";

console.log(user13.address.city);
console.log(user14.address.city);

// Output:
// Mumbai
// Hyderabad


// Now nested address is also copied.


// ============================================================
// 21. Object.assign() REFERENCE TRICK
// ============================================================

const user15 = {
  name: "Rahul"
};

const updatedUser3 = Object.assign(user15, {
  name: "Vignesh"
});

console.log(user15.name);
console.log(updatedUser3.name);

console.log(user15 === updatedUser3);

// Output:
// Vignesh
// Vignesh
// true


// Object.assign(user15, ...)
// modifies user15 itself.


// ============================================================
// 22. OBJECT DESTRUCTURING
// ============================================================

const user16 = {
  name: "Rahul",
  age: 25,
  city: "Mumbai"
};

const { name, age } = user16;

console.log(name);
console.log(age);

// Output:
// Rahul
// 25


// ============================================================
// 23. DESTRUCTURING WITH RENAMING
// ============================================================

const user17 = {
  name: "Rahul",
  age: 25
};

const {
  name: userName,
  age: userAge
} = user17;

console.log(userName);
console.log(userAge);

console.log(user17.name);

// Output:
// Rahul
// 25
// Rahul


// name: userName
//
// name       -> original object key
// userName   -> new variable


// ============================================================
// 24. DEFAULT VALUE IN DESTRUCTURING
// ============================================================

const user18 = {
  name: "Rahul"
};

const {
  name: userName2,
  // city = "Hyderabad"
} = user18;

console.log(userName2);
console.log(city);

// Output:
// Rahul
// Hyderabad


// If city exists, actual city value will be used.


// ============================================================
// 25. NESTED DESTRUCTURING
// ============================================================

const user19 = {
  name: "Vignesh",

  address: {
    city: "Hyderabad",
    pincode: 500039
  }
};

const {
  address: {
    city,
    pincode
  }
} = user19;

console.log(city);
console.log(pincode);

// Output:
// Hyderabad
// 500039


// ============================================================
// 26. FUNCTION PARAMETER DESTRUCTURING
// ============================================================

function showUser({ name, age }) {
  console.log(name);
  console.log(age);
}

showUser({
  name: "Vignesh",
  age: 26
});


// ============================================================
// 27. FUNCTION DESTRUCTURING + DEFAULT VALUE
// ============================================================

function showUser2({
  name,
  city = "Hyderabad"
}) {
  console.log(name);
  console.log(city);
}

showUser2({
  name: "Rahul"
});

// Output:
// Rahul
// Hyderabad


// ============================================================
// 28. ARRAY OF OBJECTS
// ============================================================

const users = [
  {
    id: 1,
    name: "Rahul",
    age: 25,
    salary: 30000
  },

  {
    id: 2,
    name: "Vignesh",
    age: 26,
    salary: 50000
  },

  {
    id: 3,
    name: "Amit",
    age: 30,
    salary: 40000
  }
];

console.log(users);


// ============================================================
// 29. ACCESS ARRAY OF OBJECTS
// ============================================================

console.log(users[0]);

console.log(users[0].name);

console.log(users[1].name);

console.log(users[2].salary);


// Pattern:
//
// users[index].property


// ============================================================
// 30. ADD PROPERTY TO OBJECT INSIDE ARRAY
// ============================================================

users[0].city = "Mumbai";

console.log(users[0]);


// ============================================================
// 31. UPDATE PROPERTY
// ============================================================

users[1].salary = 60000;

console.log(users[1]);


// ============================================================
// 32. DELETE PROPERTY
// ============================================================

delete users[0].city;

console.log(users[0]);


// ============================================================
// 33. map()
// ============================================================

// map() transforms EVERY item
// Returns a NEW ARRAY

const names = users.map((user) => {
  return user.name;
});

console.log(names);

// Output:
// ["Rahul", "Vignesh", "Amit"]


// Short form:

const names2 = users.map((user) => user.name);

console.log(names2);


// ============================================================
// 34. map() -> CREATE UPDATED OBJECTS
// ============================================================

const updatedUsers = users.map((user) => {
  return {
    ...user,
    age: user.age + 1
  };
});

console.log(updatedUsers);


// IMPORTANT:
//
// If you want to return an object using arrow function:
//
// return {
//   ...
// }
//
// Do NOT write:
//
// return
// {
//   ...
// }


// ============================================================
// 35. filter()
// ============================================================

// filter() returns ALL matching objects

const filteredUsers = users.filter((user) => {
  return user.age > 25;
});

console.log(filteredUsers);


// Output:
//
// Vignesh
// Amit


// ============================================================
// 36. find()
// ============================================================

// find() returns FIRST matching object

const foundUser = users.find((user) => {
  return user.id === 2;
});

console.log(foundUser);


// If no match:
//
// undefined


// IMPORTANT:
//
// find() -> object
// filter() -> array


// ============================================================
// 37. filter() + map()
// ============================================================

const resultUsers = users
  .filter((user) => user.age > 25)
  .map((user) => user.name);

console.log(resultUsers);

// Output:
// ["Vignesh", "Amit"]


// FLOW:
//
// users
//   ↓
// filter age > 25
//   ↓
// matching users
//   ↓
// map name
//   ↓
// ["Vignesh", "Amit"]


// ============================================================
// 38. reduce()
// ============================================================

// reduce() converts multiple values
// into ONE final value.

const totalSalary = users.reduce((sum, user) => {
  return sum + user.salary;
}, 0);

console.log(totalSalary);


// IMPORTANT:
//
// sum  -> accumulated value
// user -> current object
// 0    -> starting value


// ============================================================
// 39. some()
// ============================================================

// Checks whether AT LEAST ONE item matches.

const hasHighSalary = users.some((user) => {
  return user.salary > 50000;
});

console.log(hasHighSalary);

// Output:
// true / false


// ============================================================
// 40. every()
// ============================================================

// Checks whether ALL items match.

const allAdults = users.every((user) => {
  return user.age >= 18;
});

console.log(allAdults);

// Output:
// true


// ============================================================
// 41. HIGHEST SALARY
// ============================================================

const highestSalaryUser = users.reduce((max, user) => {
  return user.salary > max.salary ? user : max;
});

console.log(highestSalaryUser);


// ============================================================
// 42. LOWEST SALARY
// ============================================================

const lowestSalaryUser = users.reduce((min, user) => {
  return user.salary < min.salary ? user : min;
});

console.log(lowestSalaryUser);


// ============================================================
// 43. SORT BY SALARY
// ============================================================

// High -> Low

const highToLow = [...users].sort((a, b) => {
  return b.salary - a.salary;
});

console.log(highToLow);


// Low -> High

const lowToHigh = [...users].sort((a, b) => {
  return a.salary - b.salary;
});

console.log(lowToHigh);


// IMPORTANT:
//
// sort() changes the original array.
//
// Using [...users] creates a copy first.
//
// So:
//
// [...users].sort(...)
//
// is safer when you don't want to mutate users.


// ============================================================
// 44. IMPORTANT ARRAY METHOD DIFFERENCES
// ============================================================
//
// map()
// -> transform every item
// -> returns array
//
// filter()
// -> return ALL matching items
// -> returns array
//
// find()
// -> return FIRST matching item
// -> returns object / undefined
//
// reduce()
// -> combine into ONE final value
//
// some()
// -> at least one matches?
// -> true / false
//
// every()
// -> all match?
// -> true / false
//
// sort()
// -> reorder array


// ============================================================
// 45. COMMON INTERVIEW PROGRAM 1
// TOTAL SALARY
// ============================================================

const total = users.reduce((sum, user) => {
  return sum + user.salary;
}, 0);

console.log(total);


// ============================================================
// 46. COMMON INTERVIEW PROGRAM 2
// SALARY > 30000
// ============================================================

const salaryUsers = users.filter((user) => {
  return user.salary > 30000;
});

console.log(salaryUsers);


// ============================================================
// 47. COMMON INTERVIEW PROGRAM 3
// GET ONLY NAMES
// ============================================================

const userNames = users.map((user) => {
  return user.name;
});

console.log(userNames);


// ============================================================
// 48. COMMON INTERVIEW PROGRAM 4
// FIND USER WITH ID 2
// ============================================================

const userById = users.find((user) => {
  return user.id === 2;
});

console.log(userById);


// ============================================================
// 49. COMMON INTERVIEW PROGRAM 5
// HIGHEST SALARY USER
// ============================================================

const highest = users.reduce((max, user) => {
  return user.salary > max.salary ? user : max;
});

console.log(highest);


// ============================================================
// 50. COMMON INTERVIEW PROGRAM 6
// ADD ADDRESS TO ALL USERS
// ============================================================

const usersWithAddress = users.map((user) => {
  return {
    ...user,
    address: "Hyderabad"
  };
});

console.log(usersWithAddress);


// ============================================================
// 51. COMMON INTERVIEW PROGRAM 7
// INCREASE EVERY SALARY BY 10%
// ============================================================

const increasedSalaryUsers = users.map((user) => {
  return {
    ...user,
    salary: user.salary * 1.10
  };
});

console.log(increasedSalaryUsers);


// ============================================================
// 52. COMMON INTERVIEW PROGRAM 8
// FIND USER BY NAME
// ============================================================

const selectedUser = users.find((user) => {
  return user.name === "Vignesh";
});

console.log(selectedUser);


// ============================================================
// 53. COMMON INTERVIEW PROGRAM 9
// COUNT USERS ABOVE AGE 25
// ============================================================

const count = users.filter((user) => {
  return user.age > 25;
}).length;

console.log(count);


// ============================================================
// 54. COMMON INTERVIEW PROGRAM 10
// GET NAMES OF USERS WITH SALARY > 30000
// ============================================================

const selectedNames = users
  .filter((user) => user.salary > 30000)
  .map((user) => user.name);

console.log(selectedNames);


// ============================================================
// 55. INTERVIEW OUTPUT QUESTION - REFERENCE
// ============================================================

const a = {
  name: "Vignesh"
};

const b = a;

b.name = "Rahul";

console.log(a.name);
console.log(b.name);

// Output:
// Rahul
// Rahul


// ============================================================
// 56. INTERVIEW OUTPUT QUESTION - SPREAD
// ============================================================

const c = {
  name: "Vignesh"
};

const d = {
  ...c
};

d.name = "Rahul";

console.log(c.name);
console.log(d.name);

// Output:
// Vignesh
// Rahul


// ============================================================
// 57. INTERVIEW OUTPUT QUESTION - OBJECT ASSIGN
// ============================================================

const x = {
  name: "Rahul"
};

const y = Object.assign(x, {
  name: "Vignesh"
});

console.log(x.name);
console.log(y.name);
console.log(x === y);

// Output:
// Vignesh
// Vignesh
// true


// ============================================================
// 58. INTERVIEW OUTPUT QUESTION - SHALLOW COPY
// ============================================================

const obj1 = {
  name: "Rahul",

  address: {
    city: "Mumbai"
  }
};

const obj2 = {
  ...obj1
};

obj2.address.city = "Hyderabad";

console.log(obj1.address.city);
console.log(obj2.address.city);

// Output:
// Hyderabad
// Hyderabad


// ============================================================
// 59. INTERVIEW OUTPUT QUESTION - OBJECT KEYS
// ============================================================

const data = {
  name: "Rahul",
  age: 25,
  city: "Mumbai"
};

Object.keys(data).forEach((key) => {
  console.log(key);
});

// Output:
// name
// age
// city


// ============================================================
// 60. INTERVIEW OUTPUT QUESTION - KEY + VALUE
// ============================================================

Object.keys(data).forEach((key) => {
  console.log(key, data[key]);
});

// Output:
// name Rahul
// age 25
// city Mumbai


// ============================================================
// 61. IMPORTANT TRAPS
// ============================================================

// TRAP 1
//
// user.key
// !=
// user[key]
//
// user.key -> property named "key"
// user[key] -> dynamic property


// TRAP 2
//
// delete object.property
// -> property becomes unavailable
// -> accessing it gives undefined


// TRAP 3
//
// const user2 = user1
// -> same reference
//
// const user2 = { ...user1 }
// -> new outer object


// TRAP 4
//
// Spread is SHALLOW.
//
// Nested objects can still share references.


// TRAP 5
//
// Object.assign(user, data)
// -> modifies user
//
// Object.assign({}, user, data)
// -> creates new object


// TRAP 6
//
// Later properties override earlier properties.
//
// {
//   ...user,
//   age: 30
// }
//
// age 30 wins.


// TRAP 7
//
// map() must return something.
//
// users.map((user) => {
//   return user.name;
// });


// TRAP 8
//
// find() -> one object
//
// filter() -> array


// TRAP 9
//
// reduce() needs an accumulator.
//
// reduce((sum, user) => sum + user.salary, 0)


// TRAP 10
//
// Prefer === over ==
//
// user.id === 2


// ============================================================
// 62. REACT CONNECTION
// ============================================================

// In React / React Native:
//
// NEVER directly mutate state when possible.
//
// Instead of:
//
// user.name = "Rahul";
//
// Prefer creating a new object:
//
// setUser({
//   ...user,
//   name: "Rahul"
// });


// Array of objects:
//
// setUsers(
//   users.map((user) =>
//     user.id === 2
//       ? { ...user, name: "Rahul" }
//       : user
//   )
// );


// This is VERY important for React interviews.
//
// React relies heavily on immutable updates and
// reference changes to detect updates efficiently.


// ============================================================
// 63. QUICK REVISION
// ============================================================
//
// OBJECT
// const user = { name: "Rahul" };
//
// ACCESS
// user.name
// user["name"]
//
// DYNAMIC ACCESS
// user[key]
//
// ADD
// user.salary = 50000;
//
// UPDATE
// user.name = "Vignesh";
//
// DELETE
// delete user.salary;
//
// KEYS
// Object.keys(user)
//
// VALUES
// Object.values(user)
//
// ENTRIES
// Object.entries(user)
//
// COPY
// { ...user }
//
// ASSIGN
// Object.assign({}, user)
//
// DESTRUCTURING
// const { name, age } = user;
//
// ARRAY OF OBJECTS
// users[0].name
//
// MAP
// users.map()
//
// FILTER
// users.filter()
//
// FIND
// users.find()
//
// REDUCE
// users.reduce()
//
// SOME
// users.some()
//
// EVERY
// users.every()
//
// SORT
// users.sort()


// ============================================================
// 64. INTERVIEW CHEAT SHEET
// ============================================================
//
// Question: How do you access an object property?
// Answer: Dot notation or bracket notation.
//
// Question: When do you use bracket notation?
// Answer: When the property is dynamic or contains special characters.
//
// Question: Difference between Object.assign and spread?
// Answer:
// Both can copy/merge objects.
// Object.assign can modify the target object.
// Spread creates a new outer object.
//
// Question: What is shallow copy?
// Answer:
// Only the outer object is copied.
// Nested objects can still share references.
//
// Question: How do you create a new object without
// modifying the original?
// Answer:
// const newObj = { ...oldObj };
//
// Question: How do you get object keys?
// Answer:
// Object.keys(obj)
//
// Question: Difference between map and filter?
// Answer:
// map transforms every item.
// filter returns matching items.
//
// Question: Difference between find and filter?
// Answer:
// find returns the first matching object.
// filter returns all matching objects.
//
// Question: What does reduce do?
// Answer:
// It combines array values into one final result.
//
// Question: How do you update an object inside an array?
// Answer:
// Use map() and spread.
//
// Question: How do you find the highest salary?
// Answer:
// Use reduce().
//
// ============================================================
// END
// ============================================================