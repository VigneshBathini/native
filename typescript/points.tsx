// ============================================================================
// TypeScript Notes (React Native)
// ============================================================================

import { useState } from "react";

// ============================================================================
// 1. Variables
// ============================================================================

// TypeScript usually infers the type, so explicit types are optional.

const name = "Wills";          // string
const age = 22;                // number
const isLoggedIn = true;       // boolean

// Explicit typing (when needed)

const city: string = "London";
const salary: number = 50000;
const isActive: boolean = false;


// ============================================================================
// 2. Arrays
// ============================================================================

// Array of numbers

const numbers: number[] = [1, 2, 3, 4, 5];

// Array of strings

const names: string[] = ["John", "Smith", "Alex"];

// Array of objects

interface User {
  id: number;
  name: string;
}

const users: User[] = [];

users.push({
  id: 1,
  name: "Rahul",
});


// ============================================================================
// 3. Objects
// ============================================================================

// Inline object typing (avoid in large projects)

const employee = {
  id: 1,
  name: "John",
};

// Explicit object type

const customer: {
  id: number;
  name: string;
} = {
  id: 2,
  name: "Sam",
};


// ============================================================================
// 4. Type Alias
// ============================================================================

type Product = {
  id: number;
  title: string;
  price: number;
};

const product: Product = {
  id: 101,
  title: "Laptop",
  price: 50000,
};


// ============================================================================
// 5. Interface
// ============================================================================

// Preferred for:
// ✔ API Models
// ✔ Component Props
// ✔ Objects

interface Customer {
  id: number;
  name: string;
}

const customer1: Customer = {
  id: 10,
  name: "David",
};


// ============================================================================
// Difference between Type & Interface
// ============================================================================

// Use Interface
// ✔ Objects
// ✔ API Models
// ✔ Component Props

// Use Type
// ✔ Union Types
// ✔ Utility Types
// ✔ Function Types
// ✔ Aliases


// ============================================================================
// 6. Optional Properties (?)
// ============================================================================

interface Staff {
  id: number;
  name: string;
  age?: number;
}

const staff1: Staff = {
  id: 1,
  name: "Zoro",
};

const staff2: Staff = {
  id: 2,
  name: "Luffy",
  age: 21,
};


// ============================================================================
// 7. Functions
// ============================================================================

// JavaScript

// function add(a, b) {
//     return a + b;
// }

// TypeScript

function add(a: number, b: number): number {
  return a + b;
}

// Arrow Function

const multiply = (a: number, b: number): number => {
  return a * b;
};


// ============================================================================
// 8. Union Types
// ============================================================================

// A variable can have multiple possible types.

let id: number | string;

id = 101;
id = "EMP001";

// React Native Example

interface Profile {
  image: string | null;
}


// ============================================================================
// 9. any vs unknown
// ============================================================================

// Avoid

let data: any;

// Prefer

let response: unknown;

// unknown forces you to check the type before using it.

response = "Hello";

if (typeof response === "string") {
  console.log(response.toUpperCase());
}


// ============================================================================
// 10. Null + useState
// ============================================================================

// Object or null

const [user, setUser] = useState<User | null>(null);

// Array Example

const [userList, setUserList] = useState<User[]>([]);


// ============================================================================
// Sample Problem
// ============================================================================

interface Employee {
  id: number;
  name: string;
  salary: number;
}

const employeeData: Employee = {
  id: 101,
  name: "John",
  salary: 50000,
};

// Preferred way (Immutable)

function incrementSalary(
  employee: Employee,
  amount: number
): Employee {
  return {
    ...employee,
    salary: employee.salary + amount,
  };
}

const updatedEmployee = incrementSalary(employeeData, 5000);

console.log(updatedEmployee);


// ============================================================================
// Bonus - Function Returning Nothing
// ============================================================================

function printName(name: string): void {
  console.log(name);
}


// ============================================================================
// Bonus - Callback Function
// ============================================================================

interface ButtonProps {
  title: string;
  onPress: () => void;
}


// ============================================================================
// Golden Rules
// ============================================================================

/*

1. Prefer const over let.

2. Let TypeScript infer simple types.

3. Avoid any.

4. Prefer unknown over any.

5. Use interface for:
   - API Models
   - Component Props
   - Objects

6. Use type for:
   - Union Types
   - Utility Types
   - Function Types

7. Don't mutate objects in React.

❌ Bad

employee.salary += 5000;

✅ Good

return {
   ...employee,
   salary: employee.salary + 5000,
};

8. Use optional properties (?) when needed.

9. Use null for data that loads later.

10. Trust TypeScript—it catches bugs before your app runs.

*/