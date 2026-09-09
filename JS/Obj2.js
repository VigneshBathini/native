JAVASCRIPT OBJECTS - INTERVIEW NOTES
====================================


1. CREATE AN OBJECT
-------------------

const user = {
  name: "Rahul",
  age: 25,
  city: "Mumbai"
};

// Object contains key-value pairs.
// name, age, city -> keys
// Rahul, 25, Mumbai -> values


2. ACCESS OBJECT PROPERTIES
---------------------------

// Dot notation
console.log(user.name);   // Rahul
console.log(user.age);    // 25

// Bracket notation
console.log(user["name"]); // Rahul

// Dynamic key
const key = "name";
console.log(user[key]);    // Rahul

// IMPORTANT:
// user.key  -> looks for a property literally called "key"
// user[key]  -> uses the value stored inside the variable key


3. ADD / UPDATE PROPERTIES
--------------------------

const user = {
  name: "Rahul",
  age: 25
};

// Add
user.city = "Mumbai";

// Update
user.age = 30;

// Add another property
user.salary = 50000;


4. DELETE PROPERTY
------------------

delete user.salary;

console.log(user.salary);
// undefined

// undefined != null
//
// undefined -> property/value is not available
// null      -> property exists but has no value


5. NESTED OBJECTS
-----------------

const user = {
  name: "Rahul",
  address: {
    city: "Mumbai",
    pincode: 400001
  }
};

// Access
console.log(user.address.city);     // Mumbai
console.log(user.address.pincode);  // 400001

// Update
user.address.city = "Hyderabad";

// Delete
delete user.address.pincode;


6. OBJECT.KEYS()
----------------

const user = {
  name: "Rahul",
  age: 25,
  city: "Mumbai"
};

console.log(Object.keys(user));

// Output:
// ["name", "age", "city"]

// Object.keys() returns an ARRAY of keys.


7. OBJECT.VALUES()
------------------

console.log(Object.values(user));

// Output:
// ["Rahul", 25, "Mumbai"]

// Object.values() returns an ARRAY of values.


8. OBJECT.ENTRIES()
-------------------

console.log(Object.entries(user));

// Output:
// [
//   ["name", "Rahul"],
//   ["age", 25],
//   ["city", "Mumbai"]
// ]

// Each entry is:
// [key, value]


9. LOOP THROUGH OBJECT
----------------------

Object.keys(user).forEach((key) => {
  console.log(key);
});

// Output:
// name
// age
// city


// Get key + value

Object.keys(user).forEach((key) => {
  console.log(key, user[key]);
});

// Output:
// name Rahul
// age 25
// city Mumbai


// IMPORTANT:
// user[key] is used because key is a variable.


10. OBJECT.ASSIGN()
-------------------

const user = {
  name: "Rahul",
  age: 25
};

Object.assign(user, {
  city: "Hyderabad",
  salary: 50000
});

console.log(user);

// Output:
// {
//   name: "Rahul",
//   age: 25,
//   city: "Hyderabad",
//   salary: 50000
// }


// Object.assign(target, source)
//
// First argument = target
// Second argument = source
//
// Target object gets modified.


11. OBJECT.ASSIGN() UPDATE
--------------------------

const user = {
  name: "Rahul",
  age: 25
};

Object.assign(user, {
  age: 30
});

console.log(user.age);

// 30


12. OBJECT.ASSIGN() WITH NEW OBJECT
-----------------------------------

const user = {
  name: "Rahul",
  age: 25
};

const updatedUser = Object.assign({}, user, {
  city: "Hyderabad",
  salary: 50000
});

// {} = new target object
// user = copied into new object
// city and salary = added

// user remains unchanged


13. SPREAD OPERATOR
-------------------

const user = {
  name: "Rahul",
  age: 25
};

const updatedUser = {
  ...user,
  city: "Hyderabad",
  salary: 50000
};

// Spread creates a NEW object.
// Original user is not modified.


14. OBJECT.ASSIGN VS SPREAD
---------------------------

// Modifies original object

Object.assign(user, {
  age: 30
});


// Creates new object

const updatedUser = {
  ...user,
  age: 30
};


// Object.assign can also create a new object

const updatedUser = Object.assign({}, user, {
  age: 30
});


15. PROPERTY OVERRIDE
---------------------

const user = {
  name: "Rahul",
  age: 25
};

const updatedUser = {
  ...user,
  age: 30,
  name: "Vignesh"
};

console.log(updatedUser);

// {
//   name: "Vignesh",
//   age: 30
// }


// IMPORTANT:
// When duplicate properties exist,
// the property written LATER wins.


16. SPREAD ORDER TRICK
----------------------

const user = {
  name: "Rahul",
  age: 25
};

const updatedUser = {
  age: 30,
  ...user
};

console.log(updatedUser);

// {
//   name: "Rahul",
//   age: 25
// }


// Why?
//
// age: 30 comes first
// ...user comes later
// user.age = 25
// Therefore 25 overwrites 30


// Remember:

{
  ...user,
  age: 30
}

// 30 wins


{
  age: 30,
  ...user
}

// 25 wins


17. OBJECT.ASSIGN ORDER
-----------------------

const user = {
  name: "Rahul",
  age: 25
};

const updatedUser = Object.assign(
  {},
  user,
  {
    age: 30,
    city: "Hyderabad"
  }
);

// Processed from LEFT to RIGHT.
//
// user.age = 25
// then age = 30
// 30 overwrites 25


18. REFERENCE TRICK
-------------------

const user1 = {
  name: "Vignesh"
};

const user2 = user1;

user2.name = "Rahul";

console.log(user1.name);
console.log(user2.name);

// Output:
// Rahul
// Rahul


// WHY?
//
// user2 = user1 does NOT create a new object.
//
// Both point to the SAME object.


19. SPREAD REFERENCE TRICK
--------------------------

const user1 = {
  name: "Vignesh"
};

const user2 = {
  ...user1
};

user2.name = "Rahul";

console.log(user1.name);
console.log(user2.name);

// Output:
// Vignesh
// Rahul


// WHY?
//
// Spread creates a NEW outer object.


20. SHALLOW COPY TRAP
---------------------

const user1 = {
  name: "Vignesh",
  address: {
    city: "Mumbai"
  }
};

const user2 = {
  ...user1
};

user2.address.city = "Hyderabad";

console.log(user1.address.city);
console.log(user2.address.city);

// Output:
// Hyderabad
// Hyderabad


// WHY?
//
// Spread creates a SHALLOW COPY.
//
// Outer object = new
// Nested address object = SAME reference


21. NESTED SPREAD
-----------------

const user1 = {
  name: "Vignesh",
  address: {
    city: "Mumbai"
  }
};

const user2 = {
  ...user1,
  address: {
    ...user1.address
  }
};

user2.address.city = "Hyderabad";

console.log(user1.address.city);
console.log(user2.address.city);

// Output:
// Mumbai
// Hyderabad


// WHY?
//
// ...user
// -> copies outer object
//
// ...user1.address
// -> creates a new address object


22. OBJECT.ASSIGN REFERENCE TRICK
---------------------------------

const user = {
  name: "Rahul"
};

const updatedUser = Object.assign(user, {
  name: "Vignesh"
});

console.log(user.name);
console.log(updatedUser.name);

console.log(user === updatedUser);

// Output:
// Vignesh
// Vignesh
// true


// WHY?
//
// user was used as the TARGET.
//
// Therefore updatedUser and user
// refer to the SAME object.


23. SPREAD REFERENCE COMPARISON
-------------------------------

const user = {
  name: "Rahul"
};

const updatedUser = {
  ...user,
  name: "Vignesh"
};

console.log(user === updatedUser);

// Output:
// false


// WHY?
//
// Spread creates a NEW object.
// Therefore references are different.


24. KEY INTERVIEW RULES
-----------------------

1. const user2 = user1;

   -> SAME reference


2. const user2 = { ...user1 };

   -> NEW outer object


3. Spread creates a SHALLOW copy.


4. Nested objects can still share references.


5. Object.assign(user, data);

   -> modifies user


6. Object.assign({}, user, data);

   -> creates a new object


7. Later duplicate properties overwrite
   earlier properties.


8. Object.keys(obj)

   -> array of keys


9. Object.values(obj)

   -> array of values


10. Object.entries(obj)

    -> array of [key, value]


11. obj.key

    -> property literally named "key"


12. obj[key]

    -> property whose name is stored
       inside variable key


25. REACT CONNECTION
--------------------

In React / React Native, avoid directly
mutating state.

BAD:

user.name = "Vignesh";


PREFERRED:

const updatedUser = {
  ...user,
  name: "Vignesh"
};


// Why?
//
// React commonly relies on reference changes
// to detect that state has changed.


26. QUICK INTERVIEW SCRIPTS
---------------------------

// SCRIPT 1

const user1 = {
  name: "Vignesh"
};

const user2 = user1;

user2.name = "Rahul";

console.log(user1.name);
console.log(user2.name);

// Output:
// Rahul
// Rahul


// SCRIPT 2

const user1 = {
  name: "Vignesh"
};

const user2 = {
  ...user1
};

user2.name = "Rahul";

console.log(user1.name);
console.log(user2.name);

// Output:
// Vignesh
// Rahul


// SCRIPT 3

const user = {
  name: "Rahul",
  age: 25
};

const updatedUser = {
  ...user,
  age: 30,
  name: "Vignesh",
  city: "Hyderabad"
};

console.log(user);
console.log(updatedUser);

// user:
// {
//   name: "Rahul",
//   age: 25
// }

// updatedUser:
// {
//   name: "Vignesh",
//   age: 30,
//   city: "Hyderabad"
// }


27. CURRENT OBJECT CHECKLIST
----------------------------

[✓] Create object
[✓] Access properties
[✓] Dot notation
[✓] Bracket notation
[✓] Dynamic keys
[✓] Add properties
[✓] Update properties
[✓] Delete properties
[✓] Nested objects
[✓] Object.keys()
[✓] Object.values()
[✓] Object.entries()
[✓] forEach with Object.keys()
[✓] Object.assign()
[✓] Spread operator
[✓] Object.assign vs spread
[✓] Reference concept
[✓] Shallow copy concept
[✓] Nested spread
[✓] Property override
[✓] Spread order
[✓] Object.assign order


NEXT OBJECT TOPICS
==================

1. Destructuring
2. Dynamic properties
3. Array of objects
4. Add object to array
5. Update object inside array
6. Delete object from array
7. map() with array of objects
8. find() / filter() with objects
9. Nested array + object coding
10. Tricky interview scripts
11. Object coding problems