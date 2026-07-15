Does a React Native app directly connect to the database?

No. The app communicates with a backend through APIs. The backend handles business logic, security, and database access, then returns the required data (typically as JSON) to the app."

Client–Server Architecture is a software architecture where the client sends requests and the server processes them and returns responses.

React Native is the client.
The server contains the business logic.
The database stores the actual data.
Communication usually happens over HTTP/HTTPS.
HTTP requests are stateless.


| PUT                          | PATCH                         |
| ---------------------------- | ----------------------------- |
| Replaces the entire resource | Updates only specified fields |
| Send complete object         | Send only changed fields      |
| Larger request payload       | Smaller request payload       |
| Used for full updates        | Used for partial updates      |


Headers provide extra information about the request.

| Header        | Purpose                      |
| ------------- | ---------------------------- |
| Authorization | Sends authentication token   |
| Content-Type  | Type of data being sent      |
| Accept        | Expected response format     |
| User-Agent    | Information about the client |

#Query Parameters

Suppose you want only page 2.
Instead of GET /users

you request GET /users?page=2


#Request Body

The body contains the actual data you want to send.

Usually used with:

POST
PUT
PATCH

Example

{
  "name":"Vignesh",
  "email":"abc@gmail.com"
}

-----------------
Anatomy of a Response
1️⃣ Status Code -> eg: 200 OK
2️⃣ Headers -> eg: Content-Type: application/json
   This tells the client how to interpret the response.
3️⃣ Response Body
{
  "id":1,
  "name":"Vignesh",
  "city":"Hyderabad"
}
This is the actual data.

-------------------
JavaScript Object Notation

It is the most common format used to exchange data between clients and servers.

Example

{
  "name":"Vignesh",
  "age":24,
  "city":"Hyderabad"
}

------------------------
fetch("https://api.example.com/users", {
  method: "GET",
  headers: {
    Accept: "application/json",
  },
});

Client and server communicate by exchanging requests and responses over HTTP.

🛠 Request Structure
URL
↓

Method
↓

Headers
↓

Body (Optional)

🛠 Response Structure
Status Code
↓

Headers
↓

Body

-------------------------
React Native App
       │
       ▼
Request
│
├── URL
├── Method
├── Headers
└── Body (Optional)
       │
       ▼
Backend Server
       │
       ▼
Database
       │
       ▼
Response
│
├── Status Code
├── Headers
└── Body (JSON)
       │
       ▼
React Native updates State
       │
       ▼
React Re-renders UI
-----------------------------
"Explain what happens internally when a user taps the Login button."

A strong answer would be:

User taps the Login button.
React Native executes the onPress handler.
The app creates an HTTP request with a POST method.
Email and password are sent in the request body.
The server validates the credentials.
The server queries the database.
The server returns a response with a status code and (if successful) an authentication token.
React Native parses the response, updates state, stores the token securely (for example, in SecureStore), and re-renders the UI.

---------------------------
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


---------------------
200 OK -> Everything worked successfully.
201 Created -> A new resource has been created.
204 No Content-> The request succeeded,but there is nothing to return.
400 Bad Request-> The client sent an invalid request.
401 Unauthorized -> You are not authenticated.
403 Forbidden ->You are authenticated, but you don't have permission.
404 Not Found-> The requested resource doesn't exist.
500 Internal Server Error-> The problem is on the server.


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