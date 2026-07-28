// ============================================================================
// TypeScript Notes (React Native)
// ============================================================================

import { useState } from "react";

// ============================================================================
// 1. Variables
// ============================================================================

// Definition:
// A variable is a container that stores a value.
// In TypeScript, you can specify what type of value it can hold.

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

// Definition:
// An array stores multiple values of the same type.

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

// Definition:
// An object stores related information as key-value pairs.

// Inline object typing (avoid in large projects)

const employee = {
  id: 1,
  name: "John",
};

// Properties:
// id
// name

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

// Definition:
// A type alias creates a custom type with your own name
// so you can reuse it throughout your code.

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

// Definition:
// An interface describes the structure (shape) of an object.

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

// Both define object shapes.

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

// Definition:
// An optional property may or may not exist in an object.

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

// Definition:
// A function is a reusable block of code that performs a task.

// JavaScript

// function add(a, b) {
//   return a + b;
// }

// TypeScript

function add(a: number, b: number): number {
  return a + b;
}

// Parameters:
// a
// b

// Return Type:
// number

// Arrow Function

const multiply = (a: number, b: number): number => {
  return a * b;
};


// ============================================================================
// 8. Union Types
// ============================================================================

// Definition:
// A union type allows a variable to have more than one type.

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

// Definition:
// any disables TypeScript type checking.

// Avoid

let data: any;

// Definition:
// unknown means the type is not known yet,
// so you must check it before using it.

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

// Definition:
// null represents the intentional absence of a value.
// It is commonly used as the initial value until data is available.

// Object or null

const [user, setUser] = useState<User | null>(null);

// Array Example

const [userList, setUserList] = useState<User[]>([]);

// Generic Definition:
// A generic is a placeholder for a type.
// It lets you write reusable code while keeping type safety.

// Breakdown:
// useState -> React Hook
// <User | null> -> Generic type argument
// User | null -> Union type
// null -> Initial value


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

// Definition:
// A return type specifies what a function returns.
// void means a function does not return a value.

function printName(name: string): void {
  console.log(name);
}


// ============================================================================
// Bonus - Callback Function
// ============================================================================

// Definition:
// A callback function is a function passed as an argument
// to another function.

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