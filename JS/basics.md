JS — Topic 1: Scope

You need to understand three scopes:

Global Scope
Function Scope
Block Scope
1. Global scope
var a = 10;


function test() {
  console.log(a);
}

a is accessible inside test() because it is in the outer/global scope.

2. Function scope
function test() {
  var a = 10;
}


console.log(a); // ?

var is function-scoped, so a cannot be accessed outside test().

3. Block scope
if (true) {
  let a = 10;
  const b = 20;
}


console.log(a); // ?
console.log(b); // ?

let and const are block-scoped.

----------------
console.log(a);  //undefined

var a = 10;

function test() {
    console.log(a);
}

test(); //10

-----------------------

var a = 10; 

function test() {
    console.log(a); //undefined  cause it acts as var a - is just declared as it functional scope 
    
    var a = 20;
}

test();

----------------------------------
function outer() {
    let count = 0;
    
    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

const counter = outer();

counter();
counter();
counter();
