// ============================================================
// JAVASCRIPT: PROMISES + ASYNC/AWAIT + FETCH + API
// ============================================================
//
// This file contains:
//
// 1. Promise basics
// 2. resolve() / reject()
// 3. Promise settles only once
// 4. then()
// 5. catch()
// 6. finally()
// 7. Promise chaining
// 8. Errors with Promises
// 9. async functions
// 10. await
// 11. await + setTimeout
// 12. async/await + try/catch
// 13. async function always returns a Promise
// 14. Important async/await output questions
// 15. fetch()
// 16. GET API
// 17. response.json()
// 18. POST API
// 19. PUT / PATCH / DELETE
// 20. API error handling
// 21. Path parameters
// 22. Query parameters
// 23. Headers
// 24. Authorization / Bearer token
// 25. Promise.all()
// 26. Promise.allSettled()
// 27. Promise.race()
// 28. Promise.any()
// 29. AggregateError
// 30. Promise combinator comparison
// 31. Tricky output questions
// 32. Quick revision
//
// ============================================================


// ============================================================
// 1. WHAT IS A PROMISE?
// ============================================================
//
// A Promise represents the eventual result of an
// asynchronous operation.
//
// A Promise has 3 states:
//
// Pending
//    ↓
//    ├── Fulfilled → success
//    └── Rejected  → failure
//
// Example:
//
// new Promise((resolve, reject) => {
//   // asynchronous operation
// });
//
// resolve() → success
// reject()  → failure
//
// ============================================================


// ============================================================
// 2. BASIC PROMISE - resolve()
// ============================================================
//
// resolve() means the Promise was completed successfully.
//
// .then() is used to receive the successful result.
//
// ============================================================

const promise1 = new Promise((resolve, reject) => {
  resolve("Success");
});

promise1.then((result) => {
  console.log(result);
});

// Output:
// Success



// ============================================================
// 3. BASIC PROMISE - reject()
// ============================================================
//
// reject() means the Promise failed.
//
// .catch() is normally used to handle the error.
//
// ============================================================

const promise2 = new Promise((resolve, reject) => {
  reject("Something went wrong");
});

promise2.catch((error) => {
  console.log(error);
});

// Output:
// Something went wrong



// ============================================================
// 4. A PROMISE CAN SETTLE ONLY ONCE
// ============================================================
//
// Once a Promise becomes fulfilled or rejected,
// its state cannot be changed.
//
// The first resolve/reject that settles the Promise wins.
//
// ============================================================

const promise3 = new Promise((resolve, reject) => {
  resolve("First");

  resolve("Second");
  reject("Error");
});

promise3.then((result) => {
  console.log(result);
});

// Output:
// First
//
// "Second" and "Error" are ignored.
//
// Important:
// A Promise can settle only once.



// ============================================================
// 5. .then()
// ============================================================
//
// .then() handles the successful result of a Promise.
//
// Syntax:
//
// promise.then((result) => {
//   // success logic
// });
//
// ============================================================

Promise.resolve("Hello")
  .then((result) => {
    console.log(result);
  });

// Output:
// Hello



// ============================================================
// 6. .catch()
// ============================================================
//
// .catch() handles a rejected Promise or an error
// thrown inside the Promise chain.
//
// ============================================================

Promise.reject("Failed")
  .catch((error) => {
    console.log(error);
  });

// Output:
// Failed



// ============================================================
// 7. .finally()
// ============================================================
//
// finally() runs after the Promise is settled.
//
// It runs whether the Promise succeeds or fails.
//
// Common use:
//
// - Hide loading indicator
// - Stop spinner
// - Cleanup code
//
// ============================================================

Promise.resolve("Success")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Finally executed");
  });

// Output:
// Success
// Finally executed



// ============================================================
// 8. PROMISE CHAINING
// ============================================================
//
// A Promise returned from .then() can be passed to
// the next .then().
//
// ============================================================

Promise.resolve(10)
  .then((value) => {
    console.log(value);

    return value * 2;
  })
  .then((value) => {
    console.log(value);

    return value + 5;
  })
  .then((value) => {
    console.log(value);
  });

// Output:
// 10
// 20
// 25
//
// Flow:
//
// 10
// ↓
// 10 * 2
// ↓
// 20
// ↓
// 20 + 5
// ↓
// 25



// ============================================================
// 9. ERROR IN A PROMISE CHAIN
// ============================================================
//
// If an error occurs in a .then(), JavaScript skips
// the remaining .then() callbacks and goes to .catch().
//
// ============================================================

Promise.resolve("Start")
  .then((value) => {
    console.log(value);

    throw new Error("Something failed");
  })
  .then(() => {
    // This will NOT execute
    console.log("Second then");
  })
  .catch((error) => {
    console.log(error.message);
  });

// Output:
// Start
// Something failed



// ============================================================
// 10. PROMISE WITH setTimeout
// ============================================================
//
// setTimeout can simulate an asynchronous operation.
//
// The Promise remains pending until resolve() is called.
//
// ============================================================

const promise4 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Data received");
  }, 2000);
});

promise4.then((result) => {
  console.log(result);
});

// Output after approximately 2 seconds:
// Data received



// ============================================================
// 11. WHAT IS async?
// ============================================================
//
// The async keyword is used before a function.
//
// IMPORTANT:
//
// An async function ALWAYS returns a Promise.
//
// Even if we return a normal value.
//
// ============================================================

async function hello() {
  return "Hello";
}

hello().then((result) => {
  console.log(result);
});

// Output:
// Hello
//
// Approximately:
//
// Promise.resolve("Hello")



// ============================================================
// 12. WHAT IS await?
// ============================================================
//
// await is used inside an async function.
//
// It waits for a Promise before continuing the execution
// of that async function.
//
// Syntax:
//
// const result = await promise;
//
// IMPORTANT:
//
// await pauses ONLY the current async function.
//
// It does NOT pause the entire JavaScript program.
//
// ============================================================

async function getData() {
  const result = await Promise.resolve("Success");

  console.log(result);
}

getData();

// Output:
// Success



// ============================================================
// 13. await DOES NOT STOP THE WHOLE PROGRAM
// ============================================================

async function example() {
  console.log("1");

  const result = await Promise.resolve("Success");

  console.log(result);
  console.log("2");
}

example();

console.log("3");

// Output:
//
// 1
// 3
// Success
// 2
//
// Explanation:
//
// example() starts
// ↓
// "1" prints
// ↓
// await is reached
// ↓
// example() pauses
// ↓
// JavaScript continues outside example()
// ↓
// "3" prints
// ↓
// Promise settles
// ↓
// example() resumes
// ↓
// "Success"
// ↓
// "2"
//
// ⭐ Remember:
//
// await pauses the CURRENT async function,
// not the ENTIRE JavaScript program.



// ============================================================
// 14. async/await WITH setTimeout
// ============================================================

function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("User data");
    }, 2000);
  });
}

async function showUser() {
  console.log("Start");

  const user = await getUser();

  console.log(user);

  console.log("End");
}

showUser();

console.log("Outside");

// Output:
//
// Start
// Outside
// User data
// End
//
// "User data" appears after approximately 2 seconds.



// ============================================================
// 15. async/await + try/catch
// ============================================================
//
// try/catch is commonly used with async/await
// to handle rejected Promises.
//
// ============================================================

async function testError() {
  try {
    const result = await Promise.reject("Something went wrong");

    console.log(result);
  } catch (error) {
    console.log("Error:", error);
  }
}

testError();

// Output:
// Error: Something went wrong



// ============================================================
// 16. async/await VS .then()
// ============================================================
//
// Using .then():
//
// Promise.resolve("Hello")
//   .then((result) => {
//     console.log(result);
//   });
//
// Using async/await:
//
// async function printHello() {
//   const result = await Promise.resolve("Hello");
//
//   console.log(result);
// }
//
// printHello();
//
// Both can perform asynchronous operations.
//
// async/await is often easier to read when
// multiple asynchronous operations are involved.
//
// ============================================================


// ============================================================
// 17. MULTIPLE await
// ============================================================

function firstTask() {
  return Promise.resolve("First task completed");
}

function secondTask() {
  return Promise.resolve("Second task completed");
}

async function runTasks() {
  const result1 = await firstTask();

  console.log(result1);

  const result2 = await secondTask();

  console.log(result2);
}

runTasks();

// Output:
// First task completed
// Second task completed



// ============================================================
// 18. IMPORTANT async/await OUTPUT QUESTION
// ============================================================

async function question1() {
  console.log("A");

  await Promise.resolve();

  console.log("B");
}

question1();

console.log("C");

// Output:
//
// A
// C
// B
//
// Why?
//
// A runs synchronously.
//
// await pauses question1().
//
// C is outside the async function,
// so C runs next.
//
// Then question1() resumes.
//
// B runs last.



// ============================================================
// 19. ANOTHER async/await OUTPUT QUESTION
// ============================================================

async function question2() {
  console.log("1");

  await Promise.resolve();

  console.log("2");
}

console.log("3");

question2();

console.log("4");

// Output:
//
// 3
// 1
// 4
// 2



// ============================================================
// 20. WHAT IS fetch()?
// ============================================================
//
// fetch() is used to make HTTP/API requests.
//
// IMPORTANT:
//
// fetch() returns a Promise.
//
// Therefore we can use:
//
// await fetch()
//
// or:
//
// fetch().then()
//
// ============================================================


// Example:
//
// const response = await fetch("https://example.com");
//
// fetch()
// ↓
// Promise
// ↓
// await
// ↓
// Response object
//
// ============================================================


// ============================================================
// 21. BASIC GET API
// ============================================================
//
// GET is normally used to retrieve data.
//
// ============================================================

async function getUsers() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  console.log(response);
}

getUsers();

// response is a Response object.
//
// It is NOT yet the actual JSON data.
//
// We need:
//
// response.json()



// ============================================================
// 22. response.json()
// ============================================================
//
// response.json() reads the response body
// and converts JSON into a JavaScript value.
//
// IMPORTANT:
//
// response.json() also returns a Promise.
//
// Therefore:
//
// const response = await fetch(url);
//
// const data = await response.json();
//
// There are TWO await statements.
//
// ============================================================
//
// Flow:
//
// fetch()
// ↓
// Promise
// ↓
// await
// ↓
// Response object
// ↓
// response.json()
// ↓
// Promise
// ↓
// await
// ↓
// JavaScript data
//
// ============================================================

async function getUsers2() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const data = await response.json();

  console.log(data);
}

getUsers2();



// ============================================================
// 23. WHY TWO await STATEMENTS?
// ============================================================
//
// First await:
//
// const response = await fetch(url);
//
// Means:
//
// "Wait until the HTTP response arrives."
//
// Second await:
//
// const data = await response.json();
//
// Means:
//
// "Wait until the response body is converted
// into JavaScript data."
//
// ============================================================
//
// IMPORTANT:
//
// fetch() → Response object
//
// response.json() → Actual data
//
// ============================================================


// ============================================================
// 24. GET API WITH try/catch
// ============================================================

async function getDataFromAPI() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log("Error:", error);
  }
}

getDataFromAPI();

// ============================================================
// If the request has a network error:
//
// catch() can handle the error.
//
// ============================================================


// ============================================================
// 25. IMPORTANT: fetch() AND HTTP ERRORS
// ============================================================
//
// A common mistake:
//
// fetch() does NOT automatically reject for HTTP errors
// such as:
//
// 404
// 500
//
// The Promise can still resolve with a Response object.
//
// We can check:
//
// response.ok
//
// ============================================================

async function getDataSafely() {
  try {
    const response = await fetch(
      "https://example.com/something"
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}

// getDataSafely();

//
// IMPORTANT:
//
// response.ok
//
// true  → HTTP request successful
//
// false → HTTP response indicates an error
//
// ============================================================


// ============================================================
// 26. POST API
// ============================================================
//
// POST is normally used to send/create data.
//
// We provide:
//
// method
// headers
// body
//
// ============================================================

async function createUser() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: "Vignesh",
        age: 25
      })
    }
  );

  const data = await response.json();

  console.log(data);
}

// createUser();

//
// ============================================================
//
// Why JSON.stringify()?
//
// JavaScript object:
//
// {
//   name: "Vignesh",
//   age: 25
// }
//
// JSON request body:
//
// '{"name":"Vignesh","age":25}'
//
// JSON.stringify()
// converts JavaScript object → JSON string.
//
// ============================================================


// ============================================================
// 27. PUT API
// ============================================================
//
// PUT is commonly used to update/replace a resource.
//
// ============================================================

async function updateUser() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1",
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: "Vignesh",
        age: 30
      })
    }
  );

  const data = await response.json();

  console.log(data);
}

// updateUser();



// ============================================================
// 28. PATCH API
// ============================================================
//
// PATCH is commonly used for a partial update.
//
// Example:
//
// Only update the name.
//
// ============================================================

async function patchUser() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1",
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: "Rahul"
      })
    }
  );

  const data = await response.json();

  console.log(data);
}

// patchUser();



// ============================================================
// 29. DELETE API
// ============================================================
//
// DELETE is used to remove a resource.
//
// ============================================================

async function deleteUser() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1",
    {
      method: "DELETE"
    }
  );

  console.log(response.status);
}

// deleteUser();



// ============================================================
// 30. PATH PARAMETERS
// ============================================================
//
// A path parameter identifies a specific resource.
//
// Example:
//
// /users/10
//
// Here:
//
// 10 = user ID
//
// Example:
//
// GET /users/10
//
// Means:
//
// "Get user whose ID is 10."
//
// ============================================================

const userId = 10;

const url = `https://example.com/users/${userId}`;

// URL:
//
// https://example.com/users/10



// ============================================================
// 31. QUERY PARAMETERS
// ============================================================
//
// Query parameters are normally used for filtering,
// searching, sorting, pagination, etc.
//
// Example:
//
// /users?city=Hyderabad
//
// city = query parameter
// Hyderabad = value
//
// Multiple query parameters:
//
// /users?city=Hyderabad&page=2
//
// ============================================================

const city = "Hyderabad";
const page = 2;

const queryURL =
  `https://example.com/users?city=${city}&page=${page}`;

// ============================================================
//
// PATH:
//
// /users/10
//
// Identifies one resource.
//
// QUERY:
//
// /users?city=Hyderabad
//
// Filters/searches resources.
//
// ============================================================


// ============================================================
// 32. HEADERS
// ============================================================
//
// Headers provide additional information
// with an HTTP request.
//
// Common headers:
//
// Content-Type
// Authorization
//
// ============================================================

const headersExample = {
  "Content-Type": "application/json"
};

// Content-Type tells the server:
//
// "I am sending JSON data."
//
// ============================================================


// ============================================================
// 33. AUTHORIZATION / BEARER TOKEN
// ============================================================
//
// APIs often require an authentication token.
//
// Common format:
//
// Authorization: Bearer TOKEN
//
// ============================================================

const token = "YOUR_TOKEN";

const authHeaders = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`
};

// Example:
//
// fetch(url, {
//   headers: authHeaders
// });
//
// ============================================================


// ============================================================
// 34. PROMISE.all()
// ============================================================
//
// Promise.all() is used when we need the results
// of MULTIPLE Promises.
//
// It waits for ALL Promises to fulfill.
//
// ============================================================

const promiseA = Promise.resolve("A");
const promiseB = Promise.resolve("B");
const promiseC = Promise.resolve("C");

Promise.all([
  promiseA,
  promiseB,
  promiseC
])
  .then((results) => {
    console.log(results);
  });

// Output:
//
// ["A", "B", "C"]
//
// IMPORTANT:
//
// Promise.all() returns an ARRAY of results.
//
// ============================================================
//
// If one Promise rejects:
//
// Promise.all()
// ↓
// Entire Promise.all() rejects
//
// ============================================================

Promise.all([
  Promise.resolve("A"),
  Promise.reject("B failed"),
  Promise.resolve("C")
])
  .catch((error) => {
    console.log(error);
  });

// Output:
//
// B failed
//
// ============================================================
//
// Promise.all() is useful when we need multiple APIs:
//
// const [users, products, orders] = await Promise.all([
//   fetch("/users"),
//   fetch("/products"),
//   fetch("/orders")
// ]);
//
// ============================================================


// ============================================================
// 35. PROMISE.allSettled()
// ============================================================
//
// Promise.allSettled() waits for ALL Promises.
//
// It does NOT stop when one Promise fails.
//
// It gives the status of every Promise.
//
// ============================================================

Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("Failed"),
  Promise.resolve("Another success")
])
  .then((results) => {
    console.log(results);
  });

// Output:
//
// [
//   { status: "fulfilled", value: "Success" },
//   { status: "rejected", reason: "Failed" },
//   { status: "fulfilled", value: "Another success" }
// ]
//
// ============================================================
//
// Use allSettled() when:
//
// "I want to know what happened with EVERY operation,
// even if some operations failed."
//
// ============================================================


// ============================================================
// 36. PROMISE.race()
// ============================================================
//
// Promise.race() returns the result of the
// FIRST Promise to SETTLE.
//
// Settle means:
//
// fulfilled OR rejected.
//
// ============================================================
//
// Example:
//
// Promise A → 2 seconds
// Promise B → 1 second
// Promise C → 3 seconds
//
// B finishes first.
//
// Promise.race()
// ↓
// B
//
// ============================================================

Promise.race([
  new Promise((resolve) => {
    setTimeout(() => resolve("A"), 2000);
  }),

  new Promise((resolve) => {
    setTimeout(() => resolve("B"), 1000);
  }),

  new Promise((resolve) => {
    setTimeout(() => resolve("C"), 3000);
  })
])
  .then((result) => {
    console.log(result);
  });

// Output:
//
// B
//
// ============================================================
//
// IMPORTANT:
//
// race() gives ONLY ONE result.
//
// It does NOT give all 3 results.
//
// The other Promises can still continue running.
//
// ============================================================


// ============================================================
// 37. REAL USE OF Promise.race()
// ============================================================
//
// A common use is implementing a timeout.
//
// Example:
//
// API request → maybe slow
// Timeout     → 3 seconds
//
// Whichever settles first wins.
//
// ============================================================

const apiRequest = fetch("/api/users");

const timeout = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error("Request timed out"));
  }, 3000);
});

// Example:
//
// Promise.race([
//   apiRequest,
//   timeout
// ])
//
// If API responds before 3 seconds:
//
// API wins.
//
// If API takes longer than 3 seconds:
//
// Timeout wins.
//
// ============================================================


// ============================================================
// 38. PROMISE.any()
// ============================================================
//
// Promise.any() returns the FIRST Promise
// that FULFILLS successfully.
//
// IMPORTANT:
//
// It ignores rejected Promises.
//
// ============================================================
//
// Example:
//
// Server 1 → ❌ fails after 1 second
// Server 2 → ✅ succeeds after 2 seconds
// Server 3 → ✅ succeeds after 3 seconds
//
// Promise.any()
// ↓
// Server 2
//
// ============================================================

Promise.any([
  Promise.reject("Server 1 failed"),

  new Promise((resolve) => {
    setTimeout(() => resolve("Server 2 success"), 2000);
  }),

  new Promise((resolve) => {
    setTimeout(() => resolve("Server 3 success"), 3000);
  })
])
  .then((result) => {
    console.log(result);
  });

// Output after approximately 2 seconds:
//
// Server 2 success
//
// ============================================================
//
// Why?
//
// Server 1 failed.
//
// Promise.any() ignores that failure.
//
// Then Server 2 succeeds.
//
// Server 2 becomes the first successful result.
//
// ============================================================


// ============================================================
// 39. Promise.any() WHEN ALL FAIL
// ============================================================
//
// If ALL Promises reject:
//
// Promise.any()
// ↓
// AggregateError
//
// ============================================================

Promise.any([
  Promise.reject("Server 1 failed"),
  Promise.reject("Server 2 failed"),
  Promise.reject("Server 3 failed")
])
  .catch((error) => {
    console.log(error);
  });

// Output:
//
// AggregateError
//
// ============================================================


// ============================================================
// 40. WHAT IS AggregateError?
// ============================================================
//
// AggregateError means:
//
// "Multiple errors have been collected together
// into one error."
//
// It can occur when Promise.any()
// has no successful Promise.
//
// ============================================================

Promise.any([
  Promise.reject("Error A"),
  Promise.reject("Error B"),
  Promise.reject("Error C")
])
  .catch((error) => {
    console.log(error.errors);
  });

// Output:
//
// [
//   "Error A",
//   "Error B",
//   "Error C"
// ]
//
// error.errors contains the individual errors.
//
// ============================================================


// ============================================================
// 41. Promise.any() VS Promise.race()
// ============================================================
//
// Promise.race():
//
// First Promise to SETTLE wins.
//
// Success OR failure.
//
// Example:
//
// A → ❌ fails first
// B → ✅ succeeds later
//
// race() → ❌ A
//
// ------------------------------------------------------------
//
// Promise.any():
//
// First Promise to SUCCESSFULLY FULFILL wins.
//
// Example:
//
// A → ❌ fails first
// B → ✅ succeeds later
//
// any() → ✅ B
//
// ============================================================


// ============================================================
// 42. ALL PROMISE COMBINATORS
// ============================================================
//
// Promise.all()
//
// "I need ALL results."
//
// - Waits for all
// - One rejection causes overall rejection
// - Returns array of successful results
//
// ------------------------------------------------------------
//
// Promise.allSettled()
//
// "Tell me what happened with EVERYONE."
//
// - Waits for all
// - Doesn't reject because one failed
// - Returns status for each
//
// ------------------------------------------------------------
//
// Promise.race()
//
// "Give me whoever settles FIRST."
//
// - First success OR failure wins
// - Returns only one result
//
// ------------------------------------------------------------
//
// Promise.any()
//
// "Give me the FIRST SUCCESS."
//
// - Ignores rejected Promises
// - First fulfilled Promise wins
// - If all fail → AggregateError
//
// ============================================================


// ============================================================
// 43. EASY COMPARISON
// ============================================================
//
//                    SUCCESS   FAILURE
//
// all()              ALL       ONE FAIL → REJECT
//
// allSettled()       ALL       ALL RESULTS
//
// race()             FIRST     FIRST
//
// any()              FIRST     IGNORE
//
// ============================================================


// ============================================================
// 44. TRICKY OUTPUT - Promise.race()
// ============================================================

console.log("1");

Promise.race([
  Promise.resolve("A"),
  Promise.resolve("B")
])
  .then((result) => {
    console.log(result);
  });

console.log("2");

// Output:
//
// 1
// 2
// A
//
// Why?
//
// Promise.race() settles immediately,
// but .then() runs asynchronously as a microtask.
//
// So synchronous code runs first.
//
// IMPORTANT:
//
// If multiple already-resolved Promises are passed,
// the first one in the iterable wins.
//
// ============================================================


// ============================================================
// 45. TRICKY OUTPUT - race() + setTimeout
// ============================================================

console.log("1");

Promise.race([
  new Promise((resolve) => {
    setTimeout(() => resolve("A"), 1000);
  }),

  Promise.resolve("B")
])
  .then((result) => {
    console.log(result);
  });

console.log("2");

// Output:
//
// 1
// 2
// B
//
// Promise.resolve("B") settles before
// the 1-second timer.
//
// ============================================================


// ============================================================
// 46. TRICKY OUTPUT - try/finally RETURN
// ============================================================
//
// This is a very important JavaScript behavior.
//
// ============================================================

function testFinally() {
  try {
    return "Try";
  } finally {
    return "Finally";
  }
}

console.log(testFinally());

// Output:
//
// Finally
//
// Why?
//
// try wants to return "Try".
//
// Before the function actually returns,
// finally executes.
//
// finally returns "Finally".
//
// Therefore:
//
// "Finally" overrides "Try".
//
// ============================================================


// ============================================================
// 47. TRICKY OUTPUT - async + finally
// ============================================================

async function testAsyncFinally() {
  try {
    console.log("A");

    return "Try";
  } finally {
    console.log("B");

    return "Finally";
  }
}

testAsyncFinally()
  .then((result) => {
    console.log(result);
  });

console.log("C");

// Output:
//
// A
// B
// C
// Finally
//
// Why?
//
// A runs synchronously.
//
// finally runs before the async function completes.
//
// B runs.
//
// The async function returns a Promise.
//
// .then() runs later as a microtask.
//
// C runs before .then().
//
// Finally is printed last.
//
// ============================================================


// ============================================================
// 48. IMPORTANT EVENT LOOP RULE
// ============================================================
//
// JavaScript generally processes:
//
// 1. Synchronous code
// 2. Microtasks
// 3. Macrotasks / timer callbacks
//
// Promise callbacks such as:
//
// .then()
// .catch()
// .finally()
//
// are microtasks.
//
// setTimeout callbacks are timer tasks.
//
// ============================================================


// ============================================================
// 49. QUICK RULES TO REMEMBER
// ============================================================
//
// RULE 1:
// Promise represents the future result of an operation.
//
// RULE 2:
// resolve() means success.
//
// RULE 3:
// reject() means failure.
//
// RULE 4:
// A Promise can settle only once.
//
// RULE 5:
// .then() handles success.
//
// RULE 6:
// .catch() handles rejection/errors.
//
// RULE 7:
// .finally() runs after settlement.
//
// RULE 8:
// async function ALWAYS returns a Promise.
//
// RULE 9:
// await is used inside an async function.
//
// RULE 10:
// await pauses only the current async function.
//
// RULE 11:
// await does NOT stop the entire program.
//
// RULE 12:
// fetch() returns a Promise.
//
// RULE 13:
// fetch() gives a Response object.
//
// RULE 14:
// response.json() gives the parsed data.
//
// RULE 15:
// response.json() also returns a Promise.
//
// RULE 16:
// fetch() normally does not reject just because
// HTTP status is 404 or 500.
//
// RULE 17:
// response.ok can be checked for HTTP success.
//
// RULE 18:
// Promise.all() gives results from ALL Promises.
//
// RULE 19:
// Promise.allSettled() gives the result/status of ALL.
//
// RULE 20:
// Promise.race() gives the FIRST settled result.
//
// RULE 21:
// Promise.any() gives the FIRST successful result.
//
// RULE 22:
// Promise.any() gives AggregateError when ALL fail.
//
// ============================================================


// ============================================================
// 50. QUICK DEFINITIONS
// ============================================================
//
// Promise:
//
// An object representing the eventual completion or
// failure of an asynchronous operation.
//
// async:
//
// A keyword that makes a function return a Promise.
//
// await:
//
// A keyword that waits for a Promise inside
// an async function before continuing that function.
//
// resolve:
//
// Marks a Promise as fulfilled/successful.
//
// reject:
//
// Marks a Promise as rejected/failed.
//
// then:
//
// Handles a fulfilled Promise.
//
// catch:
//
// Handles a rejected Promise or error.
//
// finally:
//
// Runs after the Promise settles.
//
// fetch:
//
// A Web API used to make HTTP requests.
//
// Response:
//
// The object returned after fetch receives
// the HTTP response.
//
// response.json():
//
// Reads and parses the response body as JSON.
//
// Promise.all():
//
// Waits for all Promises and returns all results.
//
// Promise.allSettled():
//
// Waits for all Promises and returns each status.
//
// Promise.race():
//
// Returns the first Promise to settle.
//
// Promise.any():
//
// Returns the first Promise to fulfill.
//
// AggregateError:
//
// An error containing multiple errors,
// commonly produced when Promise.any() has all
// Promises rejected.
//
// ============================================================


// ============================================================
// 51. MOST IMPORTANT FLOW
// ============================================================
//
// API REQUEST:
//
// fetch(url)
//     ↓
// Promise
//     ↓
// await
//     ↓
// Response object
//     ↓
// response.json()
//     ↓
// Promise
//     ↓
// await
//     ↓
// Actual JavaScript data
//
// ============================================================


// ============================================================
// 52. PROMISE COMBINATORS - MEMORY TRICK
// ============================================================
//
// all()
// ↓
// "ALL"
//
// allSettled()
// ↓
// "EVERYONE, SUCCESS OR FAILURE"
//
// race()
// ↓
// "FIRST TO FINISH"
//
// any()
// ↓
// "FIRST SUCCESS"
//
// ============================================================


// ============================================================
// CURRENT PROGRESS
// ============================================================
//
// COMPLETED:
//
// ✓ Promise basics
// ✓ resolve / reject
// ✓ Promise states
// ✓ Promise settles only once
// ✓ then
// ✓ catch
// ✓ finally
// ✓ Promise chaining
// ✓ Promise errors
// ✓ async
// ✓ await
// ✓ await + setTimeout
// ✓ async/await + try/catch
// ✓ async function returns Promise
// ✓ fetch
// ✓ GET
// ✓ POST
// ✓ PUT
// ✓ PATCH
// ✓ DELETE
// ✓ response.json()
// ✓ API error handling
// ✓ response.ok
// ✓ Path parameters
// ✓ Query parameters
// ✓ Headers
// ✓ Bearer token
// ✓ Promise.all()
// ✓ Promise.allSettled()
// ✓ Promise.race()
// ✓ Promise.any()
// ✓ AggregateError
// ✓ Tricky async/await output
// ✓ Tricky Promise output
// ✓ try/finally return behavior
//
// ============================================================
//
// NEXT JAVASCRIPT TOPICS:
//
// 1. Event Loop - deeper/tricky output questions
// 2. Callbacks
// 3. Higher-Order Functions
// 4. Closures
// 5. Debouncing
// 6. Throttling
// 7. Optional Chaining
// 8. Nullish Coalescing
// 9. Truthy / Falsy
// 10. == vs ===
// 11. Type Coercion
// 12. Logical Operators / Short-Circuiting
// 13. Prototype / Prototypal Inheritance
// 14. Classes / Constructor / Inheritance
// 15. More Object + Array tricky problems
//
// ============================================================