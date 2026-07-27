//Typescript
//1.variable

import { useState } from "react";

let name:string = "Wills"
let age:number = 22
let isLoggedIn:boolean = true;

//2.array

const numbers: number[]=[1,2,3,4,5] //in JS const numbers = [1, 2, 3];
const names:string[]=["Jaz","Ronn","Smith"]

//Objects in arrays
// const user:User[]=[];

//3.objects
const user:{
    id:number;
    name:string;
} ={
    id:1,
    name:"Vignesh"
}

// 4. Type Alias
type User = {
  id: number;
  name: string;
};


// Usage

// Single object
const user1: User = {
  id: 2,
  name: "Sam",
};

// Array of User objects
const users1: User[] = [];

// Example
users1.push({
  id: 3,
  name: "Rahul",
});

//5.Interface
interface Customer {
    id:number;
    name:string;
}


const customer:Customer={
    id:1,
    name:"Jin"
}
// When to use what?
// For React Native apps:
// Use interface for API models and component props.
// Use type for unions, aliases, and utility types.

// 6. Optional Properties (?)

interface Staff {
    id:number;
    name:string;
    age?:number
}

//here both are Valid as when ? placed its optional
const staff:Staff={
    id:4,
    name:"Zoro"
}

const staff2:Staff={
    id:4,
    name:"Zoro",
    age:25
}

//7.Functions

//js
// function add(a,b){
//     return a+b;
// }

//ts

function add(a:number,b:number): number{
    return a+b;
}

//arrow function
const multiply= (a:number,b:number):number=>{
    return a*b;
}

//8. Union Types: A value can have multiple possible types.

let id: string|number;

id=10;
id="EMP01"

//react native eg:
interface Item{
    image: string| null
}

//9. any vs unknown
// Avoid any:
let data:any

//Prefer unknown
let data1:unknown
//unknown forces you to check the type before using it.

// 10:null
const [user2,setUser] = useState<User|null>(null)  //You'll see this pattern constantly in React Native.
//                              <User|null>      ->Union
//                      useState           (null) -> normal userstate



//Sample
// Convert this JavaScript into TypeScript:

// const employee = {
//   id: 101,
//   name: "John",
//   salary: 50000,
// };

// function incrementSalary(emp, amount) {
//   emp.salary += amount;
//   return emp;
// }

type Employee={
    id:number;
    name:string;
    salary:number
}

const employee:Employee={
    id:101,
    name: "John",
    salary:5000    
}

function increamentSalary(emp:Employee,amount:number):Employee{
    emp.salary += amount;
    return emp;
}

console.log(increamentSalary(employee,500))



