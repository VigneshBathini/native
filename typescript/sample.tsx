//Typescript
//---------------Fundamentals-----------------------
//1.variable

import { useState } from "react";

let name:string = "Wills"
let age:number = 22
let isLoggedIn:boolean = true;


//2.array

const numbers: number[]=[1,2,3,4,5] //in JS const numbers = [1, 2, 3];
const names:string[]=["Jaz","Ronn","Smith"]
const emails:string[]=["viz@gmail.com","vin@gmail.com"]

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

// eg:
const stud:{
    name:string;
    age:number;
}={
    name:"Viz",
    age:25
}

// 4. Type Alias
type User = {
  id: number;
  name: string;
};

// eg:
type Emp={
    id:number;
    name:string
}

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

//--------------------------------------------

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

//----------------------------


//A component is a reusable piece of UI.

// function Welcome() {
//   return <Text>Hello</Text>;
// }

//Props: Props (Properties) are data passed from a parent component to a child component.

{/*
    <CourseCard
    title="React Native"
    price={499}
    /> 
*/}

// Here:title and price are props.

//In typscript -Typing Props

interface CourseCardProps{
    title:string;
    price:number;
}

// Props Interface: A props interface describes what data a component accepts.

//Tsx Component
import {View,Text} from 'react-native';
function CourseCard(props:CourseCardProps){
    return(
        <View>
            <Text>{props.title}</Text>
            <Text>{props.price}</Text>
        </View>
    )
}

//Destructuring:Destructuring means extracting values from an object.

//Without:person.name person.age
//with:  const { name, age } = person;

function CourseCards({title,price}:CourseCardProps){
    return(
        <View>
            <Text>{title}</Text>
            <Text>{price}</Text>
        </View>
    )
}

//Using the Component
<CourseCards
    title="RN"
    price={499}
/>

//Optional Props
interface CourseProps{
    title:string;
    price?:number;
}

//Both are valid:
{/* <CourseCards title="React Native" /> */}

<CourseCard
    title="Jazz"
    price={499}
/>

//Callback Props:
//A callback is a function passed to another function or component so it can be executed later.
interface CourseCallback{
    title:"Sam";
    onEnroll:()=>void;
}

// Usage:
{/* <CourseCard
    title="React Native"
    onEnroll={() => console.log("Enrolled")}
/> */}

import {Button} from 'react-native'

interface ProductCardProps{
    title:string;
    price:number;
    rating:number;
    image:string;
    onAddtoCart:()=>void;
}

function ProductCard({title,price,rating,image,onAddtoCart}:ProductCardProps){
    return(
        <View>
            <Text>{title}</Text>
            <Text>{price}</Text>
            <Text>{rating}</Text>
            <Button title='Add to cart' onPress={onAddtoCart} />
        </View>
    )
}



//useState+Typescript

//useState is a React Hook used to store and update data inside a component.
//const [count, setCount] = useState(0);

//Type Inference:
const [count, setCount] = useState(0); //type is count?number
//don't need to write: useState<number>(0) because TypeScript already knows. with initial value

const [loading, setLoading] = useState(false);//boolean

const [namse, setName] = useState(""); //string

// Rule
// If the initial value clearly tells TypeScript the type, don't write the generic.

// Object State:
interface Userss{
    name:string;
    age:number
}

const[userss,setUsers] = useState<Userss>({
    name:"Vin",
    age:27
})

//Object State as null:

// When the screen loads:No user yet
// After the API call:User received

const [user4,setUser4]=useState<User|null>(null) 
//A single type (User) isn't enough because the state can hold two possible values.
// That's why we use a union type.

//Array State:

interface UserArray{
    id:number;
    name:string;
}

const [userarr,setUserarr]=useState<UserArray[]>([])


//Boolean State:
const [loadings, setLoadings] = useState(false);
//here no generic needed

//Functional Updates:
// Instead of:
setCount(count + 1);
// Sometimes prefer: prev is the latest state value provided by React.
setCount(prev => prev + 1);

// | State                          | Type           |
// | ------------------------------ | -------------- |
// | `useState(0)`                  | `number`       |
// | `useState("")`                 | `string`       |
// | `useState(false)`              | `boolean`      |
// | `useState<User>({...})`        | `User`         |
// | `useState<User \| null>(null)` | `User \| null` |
// | `useState<User[]>([])`         | `User[]`       |


//-----------------------------------------------
//useRef is a React Hook that stores a mutable reference to a value or a UI component
//without causing a re-render.

// A reference is a way to directly access a React Native component or store a value that persists between renders.
// Examples:Focus a TextInput
// Scroll a FlatList
// Scroll a ScrollView
// Store a timer ID

// Why do we need useRef?
