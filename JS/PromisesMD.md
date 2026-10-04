JavaScript Promises
1. What is a Promise?

A Promise is a JavaScript object that represents the eventual completion or failure of an asynchronous operation and its resulting value.

Promises are mainly used to handle operations where the result is not available immediately, such as API calls, database requests, file operations, and timers.

Why do we use Promises?

Instead of continuously checking whether an asynchronous operation is finished, a Promise allows us to define what should happen when it succeeds or fails.

Async Operation
      ↓
   Promise
      ↓
 ┌────┴─────┐
 ↓          ↓
Success    Failure
 ↓          ↓
.then()   .catch()
2. Promise States

A Promise has 3 states:

Pending → operation is still in progress.
Fulfilled → operation completed successfully.
Rejected → operation failed.

Once fulfilled or rejected, the Promise is settled and its state cannot change again.

Pending
   ↓
   ├──→ Fulfilled ✅
   │
   └──→ Rejected ❌
3. Creating a Promise
const promise = new Promise((resolve, reject) => {

  if (success) {
    resolve("Success");
  } else {
    reject("Failed");
  }

});
resolve() → marks the Promise as fulfilled.
reject() → marks the Promise as rejected.
Real-time use

Usually, you don't manually create Promises for API calls because libraries such as fetch() already return Promises. But understanding creation helps you understand how Promises work internally.

4. Handling a Promise
promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log("Finished");
  });
.then() → handles successful result.
.catch() → handles error/rejection.
.finally() → runs after the Promise settles, regardless of success or failure.
Real-time use

In an application:

API Request
    ↓
Loading
    ↓
Success → show data
    OR
Failure → show error
    ↓
Finally → stop loading
5. Promise Chaining

Promise chaining means executing multiple asynchronous or dependent operations one after another by returning values/Promises from .then().

Promise.resolve(10)
  .then((value) => value * 2)
  .then((value) => value + 5)
  .then((value) => console.log(value));

Output:

25
Important rule

The value returned from one .then() becomes the input of the next .then().

Real-time use

For dependent operations:

Login API
   ↓
Get User ID
   ↓
Get User Details
   ↓
Get User Orders
6. Promise.resolve() and Promise.reject()
Promise.resolve()

Creates an already fulfilled Promise.

Promise.resolve("Success");
Promise.reject()

Creates an already rejected Promise.

Promise.reject("Failed");
Why useful?

They are commonly useful when testing Promise behavior, creating Promise-based utility functions, and understanding Promise chaining.

Async / Await
7. async

async is used to define an asynchronous function.

An async function always returns a Promise, even if it returns a normal value.

async function getData() {
  return "Hello";
}

Conceptually:

getData()
   ↓
Promise
   ↓
"Hello"
Real-time use

Used extensively when writing API calls in React/React Native:

async function getUsers() {
  const data = await fetchUsers();
}
8. await

await is used inside an async function to wait for a Promise's result before continuing that async function.

async function getData() {

  const result = await fetchData();

  console.log(result);
}
Real-time use

Makes asynchronous code easier to read, especially for API calls:

Call API
   ↓
await response
   ↓
Process data
   ↓
Update UI
Important

await does not block the entire JavaScript application. It pauses the current async function while the Promise is pending.

9. Error Handling with async/await
async function getData() {

  try {

    const result = await fetchData();
    console.log(result);

  } catch (error) {

    console.log(error);

  }
}
Real-time use

Useful for handling API failures:

API Call
   ↓
Success → process data
   ↓
Failure → catch → show error
Promise Combinators
10. Promise.all()

Promise.all() is used when multiple independent asynchronous operations need to complete successfully before continuing.

Promise.all([p1, p2, p3])

It fulfills when all Promises fulfill.

If even one Promise rejects, the returned Promise rejects.

Real-time use

Suppose a dashboard needs:

User Profile API
Orders API
Notifications API

These can run together:

const [user, orders, notifications] =
  await Promise.all([
    getUser(),
    getOrders(),
    getNotifications()
  ]);

This is useful because the requests can be started concurrently instead of waiting for one to finish before starting the next.

11. Promise.allSettled()

Promise.allSettled() waits for all Promises to finish, whether they fulfill or reject.

Promise.allSettled([p1, p2, p3])
Real-time use

Useful when you want to know the result of every operation, even if some fail.

Example:

Upload 5 images
 ↓
Image 1 ✅
Image 2 ❌
Image 3 ✅
Image 4 ✅
Image 5 ❌

You can inspect the result of every upload instead of stopping at the first failure.

12. Promise.race()

Promise.race() returns the result of the first Promise that settles.

Settled means:

Fulfilled OR Rejected
Real-time use

Useful when you want whichever operation responds first, or when implementing a timeout pattern.

API Request ────────→ 5 sec
Timeout ────────────→ 3 sec

First settled → Timeout
13. Promise.any()

Promise.any() returns the result of the first Promise that fulfills.

Rejected Promises are ignored until a successful Promise is found.

Real-time use

Useful when you have multiple alternative sources and need any one successful result.

Server 1 → ❌
Server 2 → ❌
Server 3 → ✅
             ↓
          Result

If all Promises reject, it returns an AggregateError.

Promise + Event Loop ⭐

Promise callbacks such as .then(), .catch(), and .finally() are processed through the Microtask Queue.

console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");

Output:

1
4
3
2
Why?

JavaScript executes:

1. Synchronous code
       ↓
2. Microtask Queue
   (Promise callbacks)
       ↓
3. Task/Macrotask Queue
   (setTimeout)
⭐ Final Revision
PROMISE
→ Represents the eventual result of an async operation.

STATES
→ Pending → Fulfilled / Rejected

resolve()
→ Fulfill Promise

reject()
→ Reject Promise

.then()
→ Handle success

.catch()
→ Handle failure

.finally()
→ Runs after settlement

PROMISE CHAINING
→ Return value from one .then() goes to the next .then()

async
→ Function always returns a Promise

await
→ Waits for Promise result inside an async function

Promise.all()
→ All must fulfill

Promise.allSettled()
→ Wait for all, success or failure

Promise.race()
→ First settled wins

Promise.any()
→ First fulfilled wins

EVENT LOOP
→ Promise callbacks use Microtask Queue