What is fetch()?
📘 Definition

fetch() is a built-in JavaScript function used to make HTTP requests.

fetch(url, options);

It is not React Native-specific.

It works in:

✅ React Native
✅ React
✅ Browsers
✅ Node.js (Modern Versions)
🧠 Why use fetch()?

It allows your application to communicate with a backend server by sending HTTP requests and receiving responses.

Example:

React Native App
      │
      ▼
fetch()
      │
      ▼
Backend API
      │
      ▼
Database
      │
      ▼
Response
      │
      ▼
Update UI
2️⃣ GET Request
const response = await fetch(
  "https://jsonplaceholder.typicode.com/users"
);

const users = await response.json();

console.log(users);
🔍 Explain Every Line
Line 1
const response = await fetch(url);
Sends an HTTP GET request.
Waits for the server's response.
Returns a Response Object.
Response Object contains:
Status
Headers
Body
Line 2
const users = await response.json();

The server sends JSON as text.

response.json() parses the JSON response and converts it into a JavaScript Object or Array.

Note: response.json() also returns a Promise, so we use await again.

Line 3
console.log(users);

Displays the parsed JavaScript object/array.

3️⃣ Response Structure
Response
│
├── Status
├── Headers
└── Body
      │
      ▼
response.json()
      │
      ▼
JavaScript Object / Array
4️⃣ What does response.json() return?

It parses the JSON response body and converts it into a JavaScript Object or Array depending on the JSON returned by the server.

Example

JSON from Server

{
  "name": "Vignesh"
}

After

const data = await response.json();

Result

{
  name: "Vignesh"
}
5️⃣ POST Request
await fetch("https://api.example.com/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "abc@gmail.com",
    password: "2234",
  }),
});
Why JSON.stringify()?

HTTP sends the request body as text.

JavaScript Object

{
  email: "abc@gmail.com",
  password: "2234"
}

becomes

"{\"email\":\"abc@gmail.com\",\"password\":\"2234\"}"

Without JSON.stringify(), many APIs won't understand the request body.

6️⃣ Async/Await
📘 Definition
async

Makes a function asynchronous.

Every async function automatically returns a Promise.

Example

async function test() {
  return 10;
}

Actually returns

Promise.resolve(10);
await

await pauses execution of the current async function until the Promise settles.

Important: It does NOT block the JavaScript thread.

Why use async/await?

Without async/await

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

With async/await

try {
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
} catch (error) {
  console.log(error);
}

Cleaner and easier to read.

7️⃣ Production Pattern
const getUsers = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API Error");
    }

    const data = await response.json();

    setUsers(data);
  } catch (error) {
    console.log(error);
  }
};
8️⃣ response.ok vs response.status
response.ok	response.status
Returns true or false	Returns exact status code (200, 404, 500...)
Checks success (200–299)	Gives exact server response
Good for simple success/failure checks	Good for handling different status codes differently
9️⃣ Important Fetch Interview Point ⭐

fetch() only rejects the Promise for network-level failures.

Examples:

No Internet
DNS Failure
Network Timeout (if implemented)
Connection Lost

It does NOT reject for:

400
401
403
404
500

These still return a valid Response object.

Always check:

response.ok

or

response.status
🔟 What is a Promise?
📘 Definition

A Promise is a JavaScript object that represents the eventual completion or failure of an asynchronous operation.

Examples

API Calls (fetch, Axios)
File Uploads
Database Queries
Timers (setTimeout)
Promise States
Pending
   │
   ├──► Fulfilled (Resolved)
   │
   └──► Rejected
Creating a Promise
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});
1️⃣1️⃣ Promise Methods
.then()

Runs when the Promise resolves successfully.

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data));
.catch()

Runs when the Promise is rejected.

fetch(url)
  .catch((error) => console.log(error));
.finally()

Runs whether the Promise succeeds or fails.

fetch(url)
  .finally(() => {
    setLoading(false);
  });

Production Usage:

Hide Loader
Stop Refresh Control
Cleanup Tasks
1️⃣2️⃣ Promise.all()

Runs multiple asynchronous operations concurrently and waits for all of them to complete.

const [users, posts] = await Promise.all([
  fetch("/users").then((res) => res.json()),
  fetch("/posts").then((res) => res.json()),
]);
Internal Flow
Request 1 ──────┐
                │
Request 2 ──────┼──► Run Concurrently
                │
Request 3 ──────┘
        │
        ▼
Wait for All
        │
        ▼
Continue Execution
Important

If any one Promise fails, the entire Promise.all() rejects.

Production Usage

Dashboard
Profile + Notifications
Multiple Independent API Calls
1️⃣3️⃣ Promise.allSettled()

Waits for all Promises to finish, whether they succeed or fail.

const results = await Promise.allSettled([
  fetch("/users"),
  fetch("/posts"),
  fetch("/comments"),
]);

Useful when one failed API should not stop the rest of the screen from loading.

Production Usage

Dashboard Widgets
Independent API Calls
1️⃣4️⃣ Promise.race()

Returns the first Promise that settles (fulfilled or rejected).

const result = await Promise.race([
  fetch("/users"),
  timeoutPromise,
]);

Production Usage

Request Timeout
Fastest Server Wins
1️⃣5️⃣ Promise.any()

Returns the first successfully fulfilled Promise.

Ignores rejected Promises unless all Promises fail.

Production Usage

Backup Servers
Multiple CDN Requests
1️⃣6️⃣ Promise Methods Comparison
Method	Success Condition	Failure Condition	Production Usage
.then()	Runs on success	—	Handle success
.catch()	—	Runs on rejection	Handle errors
.finally()	Always	Always	Cleanup / Hide Loader
Promise.all()	All Promises succeed	Rejects if any Promise fails	Multiple API Calls
Promise.allSettled()	Returns all results	Never rejects because of one failure	Dashboard Widgets
Promise.race()	First Promise settles	First rejection also wins	Timeout
Promise.any()	First successful Promise	Rejects only if all fail	Backup Servers
1️⃣7️⃣ Common Mistakes

❌ Forgetting await

const response = fetch(url);

Returns

Promise { <pending> }

Not the actual response.

❌ Forgetting response.json()

You receive a Response object, not the parsed data.

❌ Assuming fetch() throws for 404 or 500

Always check:

response.ok

or

response.status

❌ Making sequential API calls unnecessarily

Instead of

await fetchUsers();
await fetchPosts();
await fetchComments();

Use

await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments(),
]);

-------------------------
Definition

Axios Instance is a reusable Axios object with common configuration like baseURL, headers, and timeout.

Interceptors allow you to modify requests before they are sent and responses before they are handled.

🧠 Why?
Avoid duplicate code.
Centralize API configuration.
Automatically attach tokens.
Handle common errors in one place.
💻 Example
const api = axios.create({
  baseURL: "https://api.company.com",
});
⚙️ Flow
Component
   ↓
Service
   ↓
Axios Instance
   ↓
Interceptor
   ↓
Server

Production Usage
JWT Authentication
Default Headers
Base URL
Global Error Handling
API Service Layer

--------------------
// api.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.company.com",
  timeout: 10000,
});

export default api;

Now use it anywhere.

import api from "./api";

const response = await api.get("/users");

----------------------------------

Basic Request Interceptor
api.interceptors.request.use((config) => {

  config.headers.Authorization = "Bearer YOUR_TOKEN";

  return config;

});


Basic Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);

    return Promise.reject(error);
  }
);

------------------------
api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.company.com",
});

export default api;
userService.js
import api from "./api";

export const getUsers = () => {
  return api.get("/users");
};
HomeScreen.js
const response = await getUsers();

setUsers(response.data);

--------------------------------------
