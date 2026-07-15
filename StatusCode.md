What is a Status Code?

A Status Code is a 3-digit number sent by the server that indicates the result of an HTTP request.

Think of it as the result of your request.

Request

↓

Server

↓

Status Code

↓

Response
Categories of Status Codes

Instead of memorizing every code, first understand the categories.

Range	Meaning
1xx	Informational (rare in app development)
2xx	Success ✅
3xx	Redirection
4xx	Client Error ❌
5xx	Server Error 🔥

As a React Native developer, you'll mostly deal with:

2xx
4xx
5xx
✅ 200 OK
Meaning

Everything worked successfully.

Example:

GET /users

Server:

200 OK

Response:

[
   {
      "name":"Vignesh"
   }
]

Your app shows the users.

Production Examples
Load products
Load profile
Search users
Get notifications

All usually return:

200 OK
✅ 201 Created

Meaning:

A new resource has been created.

Example:

POST /users

Response:

201 Created

The server has successfully created the user.

Production Examples
Signup
Create Order
Add Product
Create Comment
✅ 204 No Content

Meaning:

The request succeeded,

but there is nothing to return.

Example:

DELETE /users/5

Response:

204 No Content

The user was deleted successfully.

No JSON is returned.

🎯 Predict

You delete a product.

Should the server send the deleted product again?

Think before reading.

Answer

Usually No.

Just returning:

204 No Content

is enough.

❌ 400 Bad Request

Meaning:

The client sent an invalid request.

Example:

Signup API expects:

{
   "email":"",
   "password":""
}

You send:

{
   "email":"abc"
}

Missing password.

Server replies:

400 Bad Request
React Native

Instead of crashing,

show:

Please fill all required fields.
❌ 401 Unauthorized

This is extremely common.

Meaning:

You are not authenticated.

Example:

GET /profile

Headers:

(No Token)

Server:

401 Unauthorized
Production Flow
User Token Expired

↓

401

↓

Navigate to Login Screen

↓

Ask User to Login Again

You'll implement this later using Axios interceptors.

❌ 403 Forbidden

Meaning:

You are authenticated,

but you don't have permission.

Example:

Employee tries to open:

/admin

Server:

403 Forbidden

The user is logged in,

but isn't allowed to access that resource.

Difference Between 401 and 403

This is a favorite interview question.

401 Unauthorized	403 Forbidden
Not logged in / invalid token	Logged in but no permission
Authentication problem	Authorization problem
❌ 404 Not Found

Meaning:

The requested resource doesn't exist.

Example:

GET /users/5000

User 5000 doesn't exist.

Server:

404 Not Found

Production Examples:

Product removed
User deleted
Wrong API URL
🔥 500 Internal Server Error

Meaning:

The problem is on the server.

Not your React Native app.

Example:

Database crashes.

Server exception.

Code bug.

Server returns:

500 Internal Server Error

React Native should show:

Something went wrong.

Please try again later.

Not:

Database connection failed...

Don't expose internal server details to users.

🔥 502 Bad Gateway

Meaning:

One server received an invalid response from another server.

This usually happens in distributed systems.

Example:

React Native

↓

API Gateway

↓

Auth Server

↓

Database

If the Auth Server fails unexpectedly,

the gateway may return:

502 Bad Gateway

As a React Native developer, you typically just show a generic error and allow retrying.

🔥 503 Service Unavailable

Meaning:

The server is temporarily unavailable.

Reasons:

Maintenance
Heavy traffic
Deployment
Overloaded servers

Example:

503 Service Unavailable

Production apps often display:

Server is under maintenance.

Please try again later.
⚙️ Internal Working

User presses Login.

Button Press

↓

fetch()

↓

Server

↓

Validate Request

↓

Everything OK?

↓

Yes

↓

200

↓

Return JSON

↓

Update UI

OR

No Token

↓

401

↓

Navigate Login

OR

Database Crash

↓

500

↓

Show Error Screen
📦 Memory Diagram
Request

↓

Server

↓

200 → Success

201 → Created

204 → Deleted

400 → Bad Request

401 → Unauthorized

403 → Forbidden

404 → Not Found

500 → Server Error

502 → Bad Gateway

503 → Service Unavailable