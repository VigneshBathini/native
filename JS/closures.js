// ======================================================
// JAVASCRIPT CLOSURES
// ======================================================


// Closure:
//
// "A closure is when an inner function retains access
// to variables from its outer lexical scope even after
// the outer function has finished executing."


// SIMPLE VERSION:
//
// "The inner function remembers the variables
// from its outer function."



// ======================================================
// KEY POINTS TO REMEMBER
// ======================================================


// 1. Closure happens because an inner function
//    accesses an outer variable.
//
// 2. The inner function retains access to that variable.
//
// 3. Calling the outer function again creates
//    a NEW closure.
//
// 4. Different closures have different variables.
//
// 5. Closures are useful for:
//    - Private variables
//    - Counters
//    - Callbacks
//    - Event handlers
//    - Timers
//    - Debouncing
//    - Maintaining state

// ======================================================
// 1. NORMAL FUNCTION
// ======================================================

// Every time counter() is called,
// a NEW count variable is created.

function counter() {

    let count = 0;

    count++;

    return count;
}

console.log(counter()); // 1
console.log(counter()); // 1
console.log(counter()); // 1

// Why 1, 1, 1?
//
// First call:
// count = 0 → 1
//
// Second call:
// NEW count = 0 → 1
//
// Third call:
// NEW count = 0 → 1
//
// count does NOT stay between function calls.



// ======================================================
// 2. CLOSURE
// ======================================================

// Here the inner function uses the outer variable "count".

function createCounter() {

    let count = 0;

    // This inner function has access to count.
    return function () {

        count++;

        return count;
    };
}


// counter() is called ONLY ONCE.
//
// It creates:
// count = 0
//
// Then it returns the inner function.
//
// That returned function is stored in "increment".

const increment = createCounter();


// Now we are calling the RETURNED function,
// not createCounter() again.

console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3


// WHY?
//
// createCounter()
//      ↓
// count = 0
//      ↓
// returns inner function
//      ↓
// increment stores that function
//
// increment()
//      ↓
// count: 0 → 1
//
// increment()
//      ↓
// count: 1 → 2
//
// increment()
//      ↓
// count: 2 → 3
//
// The inner function keeps access to
// the SAME "count" variable.
//
// This is called a CLOSURE.



// ======================================================
// 3. IMPORTANT: counter() vs increment()
// ======================================================

function counterExample() {

    let count = 0;

    return function () {
        count++;
        return count;
    };
}


// counterExample() is called ONCE.
const incrementExample = counterExample();


// incrementExample() is called THREE TIMES.
console.log(incrementExample()); // 1
console.log(incrementExample()); // 2
console.log(incrementExample()); // 3


// IMPORTANT:
//
// counterExample()  → creates the count
//
// incrementExample() → uses the remembered count
//
// We are NOT doing:
//
// counterExample();
// counterExample();
// counterExample();
//
// We are doing:
//
// const incrementExample = counterExample();
// incrementExample();
// incrementExample();
// incrementExample();



// ======================================================
// 4. MULTIPLE CLOSURES
// ======================================================

function counterMultiple() {

    let count = 0;

    return function () {

        count++;

        return count;
    };
}


// First call creates one count variable.
const a = counterMultiple();


// Second call creates ANOTHER count variable.
const b = counterMultiple();


// "a" has its own count.
console.log(a()); // 1
console.log(a()); // 2


// "b" has a DIFFERENT count.
console.log(b()); // 1
console.log(b()); // 2


// Think:
//
// a → count A = 0
//
// b → count B = 0
//
// a() → count A = 1
// a() → count A = 2
//
// b() → count B = 1
// b() → count B = 2
//
// They don't share the same count.



// ======================================================
// 5. CLOSURE WITH TWO FUNCTIONS
// ======================================================

function createCounterObject() {

    let count = 0;

    return {

        // This function can access count.
        increment: function () {

            count++;
        },

        // This function can also access count.
        getCount: function () {

            return count;
        }
    };
}


// createCounterObject() creates count = 0
// and returns an object containing two functions.

const counter = createCounterObject();


// increment() changes the SAME count.
counter.increment(); // count = 1

counter.increment(); // count = 2


// getCount() reads the SAME count.
console.log(counter.getCount()); // 2


// Both functions share the same closure:
//
//             count = 0
//                 |
//        -------------------
//        |                 |
//        ↓                 ↓
//   increment()        getCount()
//        |                 |
//    count++          return count
//
// increment() → 0 → 1
// increment() → 1 → 2
// getCount()  → 2



// ======================================================
// 6. PRIVATE VARIABLE USING CLOSURE
// ======================================================

function createUser() {

    // "name" is inside the function.
    // It is not directly accessible from outside.

    let name = "Vignesh";

    return {

        // Can READ the private name.
        getName: function () {

            return name;
        },


        // Can CHANGE the private name.
        setName: function (newName) {

            name = newName;
        }
    };
}


const user = createUser();


// getName() can access name
// because of closure.

console.log(user.getName()); // Vignesh


// setName() changes the same name variable.

user.setName("Rahul");


// getName() now gets the updated value.

console.log(user.getName()); // Rahul


// But this does NOT directly work:
//
// console.log(user.name);
//
// Because "name" is NOT a property of user.
//
// It is a private variable inside createUser().
//
// The returned functions have access to it
// through closure.



// ======================================================
// 7. IMPORTANT INTERVIEW EXAMPLE
// ======================================================

function createCounterInterview() {

    let count = 0;

    return function () {

        count++;

        return count;
    };
}


const counterInterview = createCounterInterview();

console.log(counterInterview()); // 1
console.log(counterInterview()); // 2
console.log(counterInterview()); // 3


// Interview explanation:
//
// createCounterInterview() creates a local
// variable called count.
//
// It returns an inner function.
//
// The inner function uses count.
//
// Even after createCounterInterview() finishes,
// the returned function still has access to count.
//
// Therefore count is preserved between calls.
//
// This behavior is called CLOSURE.



// ======================================================
// 8. VERY IMPORTANT COMPARISON
// ======================================================


// ❌ WITHOUT CLOSURE

function withoutClosure() {

    let count = 0;

    count++;

    return count;
}

console.log(withoutClosure()); // 1
console.log(withoutClosure()); // 1
console.log(withoutClosure()); // 1


// Every function call creates a NEW count.
//
// count = 0 → 1
// function ends
//
// NEW call:
// count = 0 → 1
//
// NEW call:
// count = 0 → 1



// ✅ WITH CLOSURE

function withClosure() {

    let count = 0;

    return function () {

        count++;

        return count;
    };
}


const counterWithClosure = withClosure();

console.log(counterWithClosure()); // 1
console.log(counterWithClosure()); // 2
console.log(counterWithClosure()); // 3


// Only withClosure() is called once.
//
// count = 0
//
// The returned function remembers/accesses
// the SAME count variable.
//
// 0 → 1
// 1 → 2
// 2 → 3



// ======================================================
// 9. FINAL MENTAL MODEL
// ======================================================


// WITHOUT CLOSURE:
//
// function call
//      ↓
// count = 0
//      ↓
// count++
//      ↓
// 1
//      ↓
// function finishes
//      ↓
// count starts from 0 next time
//
// Result:
// 1
// 1
// 1



// WITH CLOSURE:
//
// outer function
//      ↓
// count = 0
//      ↓
// returns inner function
//      ↓
// inner function keeps access to count
//      ↓
// outer function finishes
//      ↓
// inner function still accesses count
//
// Result:
// 1
// 2
// 3



// ======================================================
// 10. INTERVIEW DEFINITION
// ======================================================


// Closure:
//
// "A closure is when an inner function retains access
// to variables from its outer lexical scope even after
// the outer function has finished executing."


// SIMPLE VERSION:
//
// "The inner function remembers the variables
// from its outer function."



// ======================================================
// KEY POINTS TO REMEMBER
// ======================================================


// 1. Closure happens because an inner function
//    accesses an outer variable.
//
// 2. The inner function retains access to that variable.
//
// 3. Calling the outer function again creates
//    a NEW closure.
//
// 4. Different closures have different variables.
//
// 5. Closures are useful for:
//    - Private variables
//    - Counters
//    - Callbacks
//    - Event handlers
//    - Timers
//    - Debouncing
//    - Maintaining state