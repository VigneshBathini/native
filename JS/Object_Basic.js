/*
============================================================
                JAVASCRIPT OBJECTS
            REVISION NOTES
============================================================

Object:
- Stores data in key-value pairs.
- Keys are generally strings/symbols.
- Values can be any data type.

Example:
*/

const user = {
    name: "Vignesh",
    age: 25,
    city: "Hyderabad"
};


// ============================================================
// 1. ACCESS OBJECT PROPERTIES
// ============================================================

// Dot notation
console.log(user.name);

// Bracket notation
console.log(user["name"]);

// Dynamic property
const key = "name";
console.log(user[key]);

/*
IMPORTANT:

user.key
-> Looks for property literally called "key"

user[key]
-> Uses the value stored inside key
*/


// ============================================================
// 2. ADD PROPERTY
// ============================================================

user.salary = 50000;

user["company"] = "ABC";

console.log(user);


// ============================================================
// 3. UPDATE PROPERTY
// ============================================================

user.age = 26;

console.log(user);


// ============================================================
// 4. DELETE PROPERTY
// ============================================================

delete user.salary;

console.log(user);

/*
delete removes a PROPERTY.

delete user.age

It does NOT remove an object from an array.
*/


// ============================================================
// 5. CHECK PROPERTY
// ============================================================

console.log("name" in user);

console.log(user.hasOwnProperty("name"));

// Modern:
console.log(Object.hasOwn(user, "name"));


// ============================================================
// 6. OBJECT.keys()
// ============================================================

const keys = Object.keys(user);

console.log(keys);

/*
Returns:

["name", "age", "city", "company"]
*/


// Loop through keys

Object.keys(user).forEach((key) => {
    console.log(key);
});


// ============================================================
// 7. OBJECT.values()
// ============================================================

const values = Object.values(user);

console.log(values);

/*
Returns an array containing values.
*/


// ============================================================
// 8. OBJECT.entries()
// ============================================================

const entries = Object.entries(user);

console.log(entries);

/*
Returns:

[
    ["name", "Vignesh"],
    ["age", 26],
    ["city", "Hyderabad"]
]
*/


// Loop through key + value

Object.entries(user).forEach(([key, value]) => {
    console.log(key, value);
});


// ============================================================
// 9. OBJECT DESTRUCTURING
// ============================================================

const employee = {
    name: "Vignesh",
    age: 25,
    city: "Hyderabad"
};

const { name, age } = employee;

console.log(name);
console.log(age);


// Rename variable

const { name: userName } = employee;

console.log(userName);


// Default value

const { salary = 0 } = employee;

console.log(salary);


// ============================================================
// 10. NESTED OBJECT
// ============================================================

const person = {
    name: "Vignesh",

    address: {
        city: "Hyderabad",
        pincode: 500039
    }
};

console.log(person.address.city);


// ============================================================
// 11. OPTIONAL CHAINING ?.
// ============================================================

console.log(person?.address?.city);

console.log(person?.contact?.phone);

/*
If contact does not exist:

Without ?.
-> Error

With ?.
-> undefined
*/


// ============================================================
// 12. NULLISH COALESCING ??
// ============================================================

const city = person.city ?? "Unknown";

console.log(city);

/*
?? gives default value only when value is:

null
undefined
*/

console.log(0 ?? 10);     // 0
console.log(null ?? 10);  // 10


// ============================================================
// 13. OBJECT SPREAD OPERATOR
// ============================================================

const originalUser = {
    name: "Vignesh",
    age: 25
};


// Copy object

const copy = {
    ...originalUser
};

console.log(copy);


// ============================================================
// 14. ADD PROPERTY USING SPREAD
// ============================================================

const userWithCity = {
    ...originalUser,
    city: "Hyderabad"
};

console.log(userWithCity);


// ============================================================
// 15. UPDATE PROPERTY USING SPREAD
// ============================================================

const updatedUser = {
    ...originalUser,
    age: 30
};

console.log(updatedUser);

/*
IMPORTANT:

Spread creates a NEW object.

Original object is not changed.
*/


// ============================================================
// 16. MERGE OBJECTS
// ============================================================

const obj1 = {
    name: "Vignesh"
};

const obj2 = {
    age: 25
};

const obj3 = {
    city: "Hyderabad"
};

const merged = {
    ...obj1,
    ...obj2,
    ...obj3
};

console.log(merged);


// ============================================================
// 17. LATER PROPERTY WINS
// ============================================================

const result = {
    age: 20,
    age: 30
};

console.log(result.age);

// 30


const a = {
    name: "Vignesh",
    age: 25
};

const b = {
    age: 30,
    city: "Hyderabad"
};

const mergedObject = {
    ...a,
    ...b
};

console.log(mergedObject);

/*
Result:

{
    name: "Vignesh",
    age: 30,
    city: "Hyderabad"
}

b.age overwrites a.age
*/


// ============================================================
// 18. OBJECT.ASSIGN()
// ============================================================

const user1 = {
    name: "Vignesh",
    age: 25
};


// Copy + update

const updated1 = Object.assign({}, user1, {
    age: 30,
    city: "Hyderabad"
});

console.log(updated1);


/*
Object.assign({}, user1, {...})

{}       -> new object
user1    -> copy properties
new data -> add/update
*/


// ============================================================
// 19. OBJECT.ASSIGN() MUTATION
// ============================================================

Object.assign(user1, {
    age: 40
});

console.log(user1);

/*
This modifies the ORIGINAL object.

Object.assign(user1, ...)
-> mutation

Object.assign({}, user1, ...)
-> new object
*/


// ============================================================
// 20. OBJECT PROPERTY SHORTHAND
// ============================================================

const userName2 = "Vignesh";
const userAge = 25;

const user2 = {
    userName2,
    userAge
};

console.log(user2);

/*
Instead of:

{
    userName2: userName2,
    userAge: userAge
}

We can write:

{
    userName2,
    userAge
}
*/


// ============================================================
// 21. COMPUTED PROPERTY NAME
// ============================================================

const property = "city";

const user3 = {
    [property]: "Hyderabad"
};

console.log(user3);

/*
Result:

{
    city: "Hyderabad"
}
*/


// ============================================================
// 22. OBJECT METHODS
// ============================================================

const user4 = {

    name: "Vignesh",

    greet() {
        console.log("Hello");
    }
};

user4.greet();


// ============================================================
// 23. THIS IN OBJECT
// ============================================================

const user5 = {

    name: "Vignesh",

    greet() {
        console.log(this.name);
    }
};

user5.greet();

// Vignesh


// ============================================================
// 24. ARRAY OF OBJECTS
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


// ============================================================
// 25. GET PROPERTY FROM EVERY OBJECT - map()
// ============================================================

const names = users.map(user => user.name);

console.log(names);

/*
["Vignesh", "Rahul", "Kiran"]
*/


// ============================================================
// 26. ADD PROPERTY TO EVERY OBJECT
// ============================================================

const usersWithCity = users.map(user => ({

    ...user,

    city: "Hyderabad"

}));

console.log(usersWithCity);

/*
map()
-> used when we want to TRANSFORM every object.
*/


// ============================================================
// 27. UPDATE ONE OBJECT
// ============================================================

const updatedUsers = users.map(user =>

    user.name === "Rahul"

        ? {
            ...user,
            age: 35
        }

        : user

);

console.log(updatedUsers);

/*
Rahul -> age becomes 35

Other users -> remain unchanged.
*/


// ============================================================
// 28. UPDATE USING if
// ============================================================

const updatedUsers2 = users.map((user) => {

    if (user.name === "Rahul") {

        return {
            ...user,
            age: 35
        };

    }

    return user;

});

console.log(updatedUsers2);


// ============================================================
// 29. REMOVE OBJECT FROM ARRAY - filter()
// ============================================================

const withoutRahul = users.filter(
    user => user.name !== "Rahul"
);

console.log(withoutRahul);

/*
filter()
-> used to SELECT or REMOVE objects.
*/


// ============================================================
// 30. FIND ONE OBJECT - find()
// ============================================================

const foundUser = users.find(
    user => user.id === 2
);

console.log(foundUser);

/*
Returns:

{
    id: 2,
    name: "Rahul",
    age: 30
}

If not found:
undefined
*/


// ============================================================
// 31. FIND INDEX - findIndex()
// ============================================================

const userIndex = users.findIndex(
    user => user.id === 2
);

console.log(userIndex);

// 1


// ============================================================
// 32. FILTER OBJECTS
// ============================================================

const adults = users.filter(
    user => user.age >= 25
);

console.log(adults);


// ============================================================
// 33. REDUCE WITH ARRAY OF OBJECTS
// ============================================================

const totalAge = users.reduce(
    (total, user) => total + user.age,
    0
);

console.log(totalAge);

// 77


// ============================================================
// 34. SORT ARRAY OF OBJECTS
// ============================================================

// Ascending

const sortedAsc = [...users].sort(
    (a, b) => a.age - b.age
);

console.log(sortedAsc);


// Descending

const sortedDesc = [...users].sort(
    (a, b) => b.age - a.age
);

console.log(sortedDesc);

/*
IMPORTANT:

sort() mutates the original array.

So:

[...users].sort()

is safer when we don't want mutation.
*/


// ============================================================
// 35. DELETE PROPERTY FROM EVERY OBJECT
// ============================================================

const usersWithoutAge = users.map(
    ({ age, ...rest }) => rest
);

console.log(usersWithoutAge);

/*
age is removed from each NEW object.

Original users are not modified.
*/


// ============================================================
// 36. SHALLOW COPY
// ============================================================

const user6 = {

    name: "Vignesh",

    address: {
        city: "Hyderabad"
    }

};

const shallowCopy = {
    ...user6
};

console.log(user6 === shallowCopy);
// false

console.log(user6.address === shallowCopy.address);
// true


/*
SHALLOW COPY:

Outer object -> NEW

Nested object -> SAME REFERENCE


Example:

user6.address
       ↓
   Object A
       ↑
       |
shallowCopy.address
*/


// ============================================================
// 37. DEEP COPY
// ============================================================

const deepCopy = structuredClone(user6);

console.log(user6 === deepCopy);
// false

console.log(user6.address === deepCopy.address);
// false


/*
DEEP COPY:

Outer object -> NEW
Nested objects -> NEW


Modern approach:

structuredClone(obj)
*/


// ============================================================
// 38. JSON DEEP COPY
// ============================================================

const jsonCopy = JSON.parse(
    JSON.stringify(user6)
);

/*
Common interview technique.

But it has limitations with:

- undefined
- functions
- Date
- Map
- Set

Prefer structuredClone() when appropriate.
*/


// ============================================================
// 39. OBJECT.FREEZE()
// ============================================================

const frozenUser = {
    name: "Vignesh"
};

Object.freeze(frozenUser);

frozenUser.name = "Rahul";

console.log(frozenUser.name);

// Vignesh


/*
freeze():

Cannot:
- add
- update
- delete
*/


// ============================================================
// 40. OBJECT.SEAL()
// ============================================================

const sealedUser = {
    name: "Vignesh"
};

Object.seal(sealedUser);

sealedUser.name = "Rahul"; // allowed

sealedUser.age = 25;       // not allowed
delete sealedUser.name;    // not allowed


/*
seal():

Can:
- update existing properties

Cannot:
- add properties
- delete properties
*/


// ============================================================
// 41. OBJECT CREATE
// ============================================================

const newUser = Object.create({
    greet() {
        console.log("Hello");
    }
});

newUser.greet();

/*
Creates an object with a specified prototype.

Lower priority for your interview.
*/


// ============================================================
// 42. OBJECT REFERENCES - VERY IMPORTANT
// ============================================================

const user7 = {
    name: "Vignesh",
    age: 25
};

const user8 = user7;

user8.age = 30;

console.log(user7.age);

// 30


/*
Why?

Objects are reference types.

user7
   ↓
Object A
   ↑
user8

Both point to SAME object.
*/


// ============================================================
// 43. OBJECT COPY REFERENCE VS SPREAD
// ============================================================

const user9 = {
    name: "Vignesh",
    age: 25
};

const reference = user9;

const copied = {
    ...user9
};

reference.age = 30;

console.log(user9.age);
// 30

console.log(copied.age);
// 25


/*
reference -> SAME object

spread -> NEW outer object
*/


// ============================================================
// 44. IMPORTANT OBJECT INTERVIEW QUESTIONS
// ============================================================

/*

Q1. What is an object?

A:
An object is a collection of key-value pairs
used to represent structured data.


Q2. Difference between dot and bracket notation?

A:
Dot notation uses a fixed property name.

Bracket notation can use a dynamic property name.


Q3. How do you add a property?

A:
user.city = "Hyderabad";


Q4. How do you delete a property?

A:
delete user.city;


Q5. Object.keys()?

A:
Returns an array of object keys.


Q6. Object.values()?

A:
Returns an array of object values.


Q7. Object.entries()?

A:
Returns an array containing [key, value] pairs.


Q8. What is destructuring?

A:
It extracts properties from an object into variables.


Q9. What is spread?

A:
It is used to copy, merge and immutably update objects.


Q10. What is Object.assign()?

A:
It copies/merges properties from source objects
into a target object.


Q11. What is shallow copy?

A:
A new outer object is created, but nested objects
still share references.


Q12. What is deep copy?

A:
Nested objects are also independently copied.


Q13. How do you update one object in an array?

A:
Use map() with spread.


Q14. How do you remove an object from an array?

A:
Use filter().


Q15. How do you find one object?

A:
Use find().


Q16. How do you safely access nested properties?

A:
Use optional chaining ?.


Q17. How do you provide a default for null/undefined?

A:
Use nullish coalescing ??.

*/


// ============================================================
// 45. MOST IMPORTANT MEMORY TABLE
// ============================================================

/*

OBJECT
------------------------------------------------------------

Access:
    user.name

Dynamic access:
    user[key]

Add:
    user.city = "Hyderabad"

Update:
    user.age = 30

Delete:
    delete user.age


OBJECT METHODS
------------------------------------------------------------

Object.keys()
    -> keys

Object.values()
    -> values

Object.entries()
    -> key + value


OBJECT OPERATIONS
------------------------------------------------------------

{ ...obj }
    -> copy

{ ...obj, age: 30 }
    -> copy + update

Object.assign()
    -> copy/merge/update

Destructuring
    -> extract properties

?.
    -> safe nested access

??
    -> default for null/undefined


ARRAY OF OBJECTS
------------------------------------------------------------

map()
    -> change every object

filter()
    -> select/remove objects

find()
    -> find one object

findIndex()
    -> find position

reduce()
    -> calculate final result


COPY
------------------------------------------------------------

{ ...obj }
    -> shallow copy

Object.assign({}, obj)
    -> shallow copy

structuredClone(obj)
    -> deep copy


IMMUTABILITY
------------------------------------------------------------

Do NOT:

user.age = 30

when you need to preserve original object.

Prefer:

const updated = {
    ...user,
    age: 30
};


============================================================
                 QUICK INTERVIEW FORMULA
============================================================

Need to change EVERY object?
        ↓
      map()


Need to REMOVE/SELECT objects?
        ↓
      filter()


Need ONE object?
        ↓
      find()


Need object POSITION?
        ↓
      findIndex()


Need TOTAL / AGGREGATE?
        ↓
      reduce()


Need object KEYS?
        ↓
      Object.keys()


Need VALUES?
        ↓
      Object.values()


Need KEY + VALUE?
        ↓
      Object.entries()


Need COPY + UPDATE?
        ↓
      { ...obj, property: value }


Need SAFE nested access?
        ↓
      ?. 


Need default for null/undefined?
        ↓
      ??
============================================================
*/

// 🧠 Remember these 3
// const copy = user;

// ➡️ No copy — same reference

// const copy = { ...user };

// ➡️ Shallow copy — nested objects shared

// const copy = structuredClone(user);

// ➡️ Deep copy — nested objects copied too