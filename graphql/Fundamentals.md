# GraphQL — Fundamentals

## Installation

```bash
npm i @apollo/server graphql
```

---

# 1. GraphQL

**Definition:** GraphQL is an API query language that allows a client to request the specific data and fields it needs from a server.

### Simple idea

**REST**

```text
Client → Endpoint → Server decides response
```

**GraphQL**

```text
Client → Query → Server returns requested fields
```

### Remember

```text
GraphQL lets the client describe the data it wants.
```

---

# 2. GraphQL Schema

**Definition:** The schema is the complete contract/blueprint of a GraphQL API.

It defines:

* What types of data exist
* What fields those types contain
* What data can be queried
* What data can be modified
* What arguments are accepted
* What type of data is returned

### Example

```graphql
type User {
  id: ID
  name: String
}

type Query {
  users: [User]
}
```

Here, the complete set of definitions forms the API's schema.

### Remember

```text
Schema = Complete API contract
```

---

# 3. GraphQL Type

**Definition:** A type describes the structure/shape of a particular kind of data.

### Example

```graphql
type User {
  id: ID
  name: String
}
```

Here:

```text
User = Type
```

It says that a User has:

```text
id   → ID
name → String
```

### Remember

```text
Type = Shape of one kind of data
```

---

# 4. typeDefs — Apollo Server Term

**Definition:** `typeDefs` is a JavaScript variable that contains the GraphQL type definitions/schema definitions that we give to Apollo Server.

### Example

```js
const typeDefs = `#graphql

  type User {
    id: ID
    name: String
  }

  type Query {
    users: [User]
  }

`;
```

`typeDefs` is not a separate GraphQL concept like `User` or `Query`.

It is simply the commonly used variable name for storing the GraphQL definitions.

### Remember

```text
typeDefs
   ↓
GraphQL definitions written in code
   ↓
Apollo Server
   ↓
uses them to construct the GraphQL schema
```

---

# 5. Relationship: Schema vs Type vs typeDefs

This is the important distinction.

```text
SCHEMA
Complete GraphQL API contract
        │
        ├── Type: User
        ├── Type: Product
        ├── Query
        └── Mutation
```

And in Apollo Server:

```text
typeDefs
   ↓
contains GraphQL definitions
   ↓
Apollo Server
   ↓
uses them to construct the schema
```

### Easy analogy

```text
Schema  = Complete blueprint

Type    = One building block in the blueprint

typeDefs = Code/document containing the definitions
```

### Don't memorize this incorrectly

```text
Schema = Type = typeDefs ❌
```

Instead:

```text
Schema
→ Complete API structure

Type
→ Individual data structure inside the schema

typeDefs
→ Code containing GraphQL definitions
```

---

# 6. Scalar Types

GraphQL provides basic built-in data types called scalar types.

| Type    | Meaning        | Example     |
| ------- | -------------- | ----------- |
| String  | Text           | `"Vignesh"` |
| Int     | Whole number   | `25`        |
| Float   | Decimal number | `99.50`     |
| Boolean | True/false     | `true`      |
| ID      | Identifier     | `"123"`     |

### Example

```graphql
type User {
  id: ID
  name: String
  age: Int
  salary: Float
  isActive: Boolean
}
```

---

# 7. Query

**Definition:** A Query is a GraphQL operation used to read/fetch data from the server.

### Example

```graphql
query {
  users {
    id
    name
  }
}
```

### Remember

```text
Query = READ / FETCH
```

Similar concept in REST:

```text
GraphQL Query ≈ REST GET
```

---

# 8. type Query

`type Query` defines the available read operations in the GraphQL schema.

### Example

```graphql
type Query {
  users: [User]
}
```

This means:

```text
The API provides a query called "users"
        ↓
It returns a list of User objects
```

Another example:

```graphql
type Query {
  users: [User]
  products: [Product]
}
```

The client can ask for:

```text
users
products
```

### Remember

```text
type Query
    ↓
Defines available READ operations
```

---

# 9. Resolver

**Definition:** A resolver is a function that provides the actual value/data for a GraphQL field.

### Example

```js
const resolvers = {

  Query: {

    users: () => users

  }

};
```

If the client asks:

```graphql
query {
  users {
    name
  }
}
```

GraphQL calls:

```js
users: () => users
```

and gets the actual data.

### Remember

```text
Schema / typeDefs
→ WHAT is available?

Resolver
→ HOW is the data obtained?
```

---

# 10. resolvers — Apollo Server Term

**Definition:** `resolvers` is a JavaScript object containing resolver functions.

### Example

```js
const resolvers = {

  Query: {

    users: () => users

  }

};
```

The structure generally follows the GraphQL schema.

```text
type Query
    ↓
users
    ↓
resolver
```

### Remember

```text
Resolver = Function that supplies data

resolvers = Object containing resolver functions
```

---

# 11. List Type [User]

### Example

```graphql
users: [User]
```

This means:

```text
users returns a list/array of User objects
```

### Example result

```json
[
  {
    "id": 1,
    "name": "Vignesh"
  },
  {
    "id": 2,
    "name": "Rahul"
  }
]
```

Compare:

```text
user: User

→ one User
```

```text
users: [User]

→ list of User objects
```

### Remember

```text
User   → one User
[User] → list of Users
```

---

# 12. GraphQL Client Query

The client chooses which fields it wants.

### Example

```graphql
query {
  users {
    id
    name
  }
}
```

The client is saying:

```text
"Give me users,
but from each user I want id and name."
```

It could request only:

```graphql
query {
  users {
    name
  }
}
```

Then the response contains only:

```json
[
  {
    "name": "Vignesh"
  },
  {
    "name": "Rahul"
  }
]
```

### Remember

```text
The client selects the fields it needs.
```

---

# 13. Apollo Server

**Definition:** Apollo Server is a Node.js library used to build and run a GraphQL API server.

### Example

```js
const server = new ApolloServer({
  typeDefs,
  resolvers
});
```

Here Apollo Server receives:

```text
typeDefs
   +
resolvers
   ↓
GraphQL Server
```

---

# 14. startStandaloneServer

**Definition:** `startStandaloneServer` starts the Apollo Server and makes it available over HTTP.

### Example

```js
const { url } = await startStandaloneServer(server, {

  listen: {
    port: 4000
  }

});
```

Meaning:

```text
Start server
    ↓
Listen on port 4000
    ↓
http://localhost:4000
```

---

# 15. Complete GraphQL Flow

```text
                 CLIENT
            React Native App
                  │
                  │ GraphQL Query
                  ↓
          ┌─────────────────┐
          │  GraphQL Server │
          │                 │
          │     Schema      │
          │       ↓         │
          │    Resolver     │
          │       ↓         │
          │   Actual Data   │
          └────────┬────────┘
                   │
                   ↓
                Response
```

### Example

```text
Client
  │
  │ query { users { name } }
  ↓
Schema
  │
  │ "users is valid"
  ↓
Resolver
  │
  │ users()
  ↓
Data
  │
  ↓
Response
```

---

# 16. Most Important Mental Model

When reading GraphQL code, think in this order:

### 1. TYPE

```text
What does the data look like?
```

### 2. QUERY

```text
What can the client read?
```

### 3. TYPEDEFS / SCHEMA

```text
What does the API allow?
```

### 4. RESOLVER

```text
How does the server provide the data?
```

### 5. CLIENT QUERY

```text
What fields does the client actually want?
```

---

# 17. GraphQL Arguments

**Definition:** Arguments allow the client to send values to a GraphQL field.

### Schema

```graphql
type Query {
  user(id: ID): User
}
```

### Client

```graphql
query {
  user(id: 2) {
    id
    name
  }
}
```

Here:

```text
user
 ↓
id: 2
 ↓
argument
```

### Resolver

```js
const resolvers = {

  Query: {

    user: (_, args) => {

      return users.find(
        user => user.id === Number(args.id)
      );

    }

  }

};
```

For:

```graphql
user(id: 2)
```

the resolver receives:

```js
args = {
  id: 2
};
```

Therefore:

```js
args.id
```

gives:

```text
2
```

### Remember

```text
Arguments
   ↓
Input values sent to a GraphQL field
```

---

# 18. GraphQL Variables

Variables allow the client to provide values separately from the query.

Instead of:

```graphql
query {
  user(id: 2) {
    id
    name
  }
}
```

we can use:

```graphql
query GetUser($id: ID) {

  user(id: $id) {
    id
    name
  }

}
```

### Variables

```json
{
  "id": 2
}
```

### Flow

```text
Variables
   ↓
$id = 2
   ↓
user(id: $id)
   ↓
backend argument
   ↓
args.id = 2
```

## Important distinction

```graphql
$id
```

is the **client variable**.

```graphql
id:
```

is the **GraphQL field argument**.

They don't have to have the same name.

### Example

```graphql
query GetUser($userId: ID) {

  user(id: $userId) {
    id
    name
  }

}
```

Variables:

```json
{
  "userId": 2
}
```

Backend still receives:

```js
args = {
  id: 2
};
```

### Remember

```text
$id
→ Client variable

id:
→ Backend argument

args.id
→ Resolver receives the value
```

---

# 19. Mutation

**Definition:** A Mutation is a GraphQL operation used to modify/change data.

Typical operations:

```text
CREATE
UPDATE
DELETE
```

### Schema

```graphql
type Mutation {
  createUser(name: String!): User
}
```

### Resolver

```js
const resolvers = {

  Mutation: {

    createUser: (_, args) => {

      const newUser = {
        id: users.length + 1,
        name: args.name
      };

      users.push(newUser);

      return newUser;
    }

  }

};
```

### Client

```graphql
mutation {
  createUser(name: "Kiran") {
    id
    name
  }
}
```

### Remember

```text
Query
→ READ

Mutation
→ CHANGE DATA
```

Similar REST concepts:

```text
GraphQL Query     ≈ GET

GraphQL Mutation  ≈ POST / PUT / PATCH / DELETE
```

This is a conceptual comparison, not a strict one-to-one mapping.

---

# 20. Mutation + Variables

Instead of putting the value directly:

```graphql
mutation {
  createUser(name: "Kiran") {
    id
    name
  }
}
```

we can use variables:

```graphql
mutation CreateUser($name: String!) {

  createUser(name: $name) {
    id
    name
  }

}
```

### Variables

```json
{
  "name": "Kiran"
}
```

### Flow

```text
$name
  ↓
"Kiran"
  ↓
createUser(name: $name)
  ↓
args.name
  ↓
"Kiran"
```

---

# 21. Input Types

**Definition:** An input type defines the structure of data sent into a GraphQL field, usually a mutation.

### Example

```graphql
input CreateUserInput {
  name: String!
  roleId: ID!
}
```

### Mutation

```graphql
type Mutation {
  createUser(input: CreateUserInput!): User
}
```

Instead of sending many individual arguments:

```graphql
createUser(
  name: "Kiran"
  roleId: 1
)
```

we can send one structured input:

```graphql
createUser(
  input: {
    name: "Kiran"
    roleId: 1
  }
)
```

### Client with Variables

```graphql
mutation CreateUser($input: CreateUserInput!) {

  createUser(input: $input) {
    id
    name
  }

}
```

### Variables

```json
{
  "input": {
    "name": "Kiran",
    "roleId": 1
  }
}
```

### Resolver

```js
createUser: (_, args) => {

  console.log(args);

  const newUser = {

    id: users.length + 1,

    name: args.input.name,

    roleId: Number(args.input.roleId)

  };

  users.push(newUser);

  return newUser;
}
```

`args` looks like:

```js
{
  input: {
    name: "Kiran",
    roleId: 1
  }
}
```

Therefore:

```js
args.input.name
```

→ `"Kiran"`

```js
args.input.roleId
```

→ `1`

### Remember

```text
args
 ↓
input
 ↓
field
```

---

# 22. Nested Queries

GraphQL allows related data to be requested in one query.

### Schema

```graphql
type User {
  id: ID
  name: String
  role: Role
}

type Role {
  id: ID
  role: String
}
```

### Data

```js
const users = [
  {
    id: 1,
    name: "Vignesh",
    roleId: 1
  },
  {
    id: 2,
    name: "Rahul",
    roleId: 2
  }
];

const roles = [
  {
    id: 1,
    role: "React Native"
  },
  {
    id: 2,
    role: "Node JS"
  }
];
```

### Nested Resolver

```js
User: {

  role: (user) => {

    return roles.find(
      role => role.id === user.roleId
    );

  }

}
```

### Client Query

```graphql
query {

  users {

    id
    name

    role {
      id
      role
    }

  }

}
```

### Flow

```text
User
 ↓
roleId
 ↓
User.role resolver
 ↓
find matching Role
 ↓
Role object
```

---

# 23. Parent in a Resolver

Resolver functions commonly follow this structure:

```js
(parent, args, context, info)
```

Example:

```js
User: {

  role: (user) => {

    return roles.find(
      role => role.id === user.roleId
    );

  }

}
```

Here:

```text
user
 ↓
parent User object
```

Example parent:

```js
{
  id: 1,
  name: "Vignesh",
  roleId: 1
}
```

The resolver can access:

```js
user.id
user.name
user.roleId
```

### What is `_`?

You may see:

```js
role: (_, args) => {
```

`_` is simply a JavaScript variable name/convention used when the first parameter is not needed.

Resolver parameters:

```text
(parent, args, context, info)
```

So:

```js
(_, args)
```

means:

```text
parent → not needed
args   → needed
```

---

# 24. Nested Mutation

We can combine:

* Mutation
* Variables
* Input Type
* Nested Resolver

### Complete schema

```graphql
type User {
  id: ID
  name: String
  role: Role
}

type Role {
  id: ID
  role: String
}

input CreateUserInput {
  name: String!
  roleId: ID!
}

type Mutation {
  createUser(input: CreateUserInput!): User
}
```

### Mutation Resolver

```js
Mutation: {

  createUser: (_, args) => {

    const newUser = {

      id: users.length + 1,

      name: args.input.name,

      roleId: Number(args.input.roleId)

    };

    users.push(newUser);

    return newUser;
  }

}
```

### Nested User Resolver

```js
User: {

  role: (user) => {

    return roles.find(
      role => role.id === user.roleId
    );

  }

}
```

### Client Mutation

```graphql
mutation CreateUser($input: CreateUserInput!) {

  createUser(input: $input) {

    id
    name

    role {
      id
      role
    }

  }

}
```

### Variables

```json
{
  "input": {
    "name": "Kiran",
    "roleId": 1
  }
}
```

### Flow

```text
Client
  ↓
variables
  ↓
input
  ↓
createUser(input: $input)
  ↓
Mutation resolver
  ↓
args.input
  ↓
Create new user
  ↓
users.push(newUser)
  ↓
Return User
  ↓
User.role resolver
  ↓
Find Role using roleId
  ↓
Return Role
  ↓
GraphQL Response
```

---

# 25. Temporary Data vs Database

In our examples:

```js
const users = [
  { id: 1, name: "Vignesh" },
  { id: 2, name: "Rahul" }
];
```

This is a normal JavaScript array stored in Node.js memory.

When we do:

```js
users.push(newUser);
```

the data is added to that array.

### Before

```text
users
 ↓
Vignesh
Rahul
```

### After

```text
users
 ↓
Vignesh
Rahul
Kiran
```

But this is **temporary**.

If the Node.js server restarts:

```text
Server stops
     ↓
Memory cleared
     ↓
Array resets
     ↓
Newly added data disappears
```

A real application would normally use:

```text
GraphQL
   ↓
Resolver
   ↓
Database
   ↓
MySQL / PostgreSQL / MongoDB
```

---

# 26. Complete GraphQL Mental Model

```text
                    CLIENT
                       │
                       │
              Query / Mutation
                       │
                       ▼
              GraphQL Schema
                       │
              ┌────────┴────────┐
              │                 │
            Query            Mutation
              │                 │
            READ             CHANGE
              │                 │
         Arguments           Input
              │                 │
          Variables          Variables
              │                 │
              └────────┬────────┘
                       ↓
                    Resolver
                       ↓
                  Actual Data
                       ↓
               Nested Resolver
                       ↓
                    Response
```

---

# 27. Complete Example

```js
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


// ============================================================
// DATA
// ============================================================

const users = [
  {
    id: 1,
    name: "Vignesh",
    roleId: 1
  },
  {
    id: 2,
    name: "Rahul",
    roleId: 2
  }
];

const roles = [
  {
    id: 1,
    role: "React Native"
  },
  {
    id: 2,
    role: "Node JS"
  }
];


// ============================================================
// SCHEMA / TYPEDEFS
// ============================================================

const typeDefs = `#graphql

  type User {
    id: ID
    name: String
    role: Role
  }

  type Role {
    id: ID
    role: String
  }

  type Query {
    users: [User]
    user(id: ID): User

    roles: [Role]
    role(id: ID): Role
  }

  input CreateUserInput {
    name: String!
    roleId: ID!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
  }

`;


// ============================================================
// RESOLVERS
// ============================================================

const resolvers = {

  // ----------------------------------------------------------
  // QUERY RESOLVERS
  // ----------------------------------------------------------

  Query: {

    // Get all users
    users: () => {
      return users;
    },

    // Get one user
    user: (_, args) => {

      return users.find(
        user => user.id === Number(args.id)
      );

    },

    // Get all roles
    roles: () => {
      return roles;
    },

    // Get one role
    role: (_, args) => {

      return roles.find(
        role => role.id === Number(args.id)
      );

    }

  },


  // ----------------------------------------------------------
  // NESTED USER RESOLVER
  // ----------------------------------------------------------

  User: {

    role: (user) => {

      return roles.find(
        role => role.id === user.roleId
      );

    }

  },


  // ----------------------------------------------------------
  // MUTATION
  // ----------------------------------------------------------

  Mutation: {

    createUser: (_, args) => {

      const newUser = {

        id: users.length + 1,

        name: args.input.name,

        roleId: Number(args.input.roleId)

      };

      // Temporary in-memory storage
      users.push(newUser);

      return newUser;

    }

  }

};


// ============================================================
// APOLLO SERVER
// ============================================================

const server = new ApolloServer({
  typeDefs,
  resolvers
});


// ============================================================
// START SERVER
// ============================================================

const { url } = await startStandaloneServer(server, {

  listen: {
    port: 4000
  }

});

console.log(`Server running at ${url}`);
```

---

# Quick Revision

```text
GraphQL
→ API query language

Schema
→ Complete API contract / blueprint

Type
→ Shape of a particular kind of data

typeDefs
→ JavaScript variable containing GraphQL definitions

Scalar Types
→ String, Int, Float, Boolean, ID

Query
→ Read / fetch data

type Query
→ Defines available read operations

Arguments
→ Values sent to a GraphQL field

Variables
→ Values supplied separately from the query

Resolver
→ Function that provides actual data

resolvers
→ Object containing resolver functions

[User]
→ List / array of User objects

Mutation
→ Change data

Input Type
→ Structure of data sent into a field

Nested Query
→ Request related data inside another object

Nested Resolver
→ Resolver used to obtain related/nested data

Apollo Server
→ Node.js library for building/running GraphQL APIs

startStandaloneServer
→ Starts Apollo Server and exposes it over HTTP

args
→ Contains arguments sent to a resolver

args.input
→ Contains mutation input data

args.input.name
→ Accesses a field inside the input
```

# One-Line Memory Trick

```text
Type      → WHAT does this data look like?

Schema    → WHAT does the whole API provide?

typeDefs  → WHERE do I define the GraphQL definitions?

Query     → WHAT can I READ?

Arguments → WHAT value am I sending?

Variables → WHERE do I provide dynamic values?

Mutation  → WHAT data do I CHANGE?

Input     → WHAT structured data am I sending?

Resolver  → HOW do I get/change the data?

Nested    → HOW do related objects connect?
```

# Current Progress

```text
GraphQL Fundamentals
    ✅ GraphQL
    ✅ REST vs GraphQL
    ✅ Schema
    ✅ Type
    ✅ typeDefs
    ✅ Scalar Types
    ✅ Query
    ✅ type Query
    ✅ Resolver
    ✅ resolvers
    ✅ List Types
    ✅ Client Query
    ✅ Apollo Server
    ✅ startStandaloneServer

GraphQL Core
    ✅ Arguments
    ✅ Variables
    ✅ Nested Queries
    ✅ Mutation
    ✅ Mutation + Variables
    ✅ Input Types
    ✅ Nested Resolvers
    ✅ Nested Mutation
    ✅ Temporary in-memory data
```

**Next:** Error Handling → Authentication → Pagination → Apollo Client → React Native + Apollo Client.

-----------------------------------------------------------------------------

# 28. React Native + Apollo Client

Apollo Server handles the **backend GraphQL API**.

Apollo Client handles the **frontend/mobile connection** to that GraphQL API.

```text
React Native
     ↓
Apollo Client
     ↓
GraphQL API
     ↓
Apollo Server
     ↓
Resolver
     ↓
Data
```

---

# 29. Install Apollo Client in Expo

Create an Expo application:

```bash
npx create-expo-app@latest graphql-rn-client
```

Go inside the project:

```bash
cd graphql-rn-client
```

Install Apollo Client:

```bash
npm install @apollo/client graphql
```

Start Expo:

```bash
npx expo start
```

---

# 30. Frontend Project Structure

Our important files:

```text
graphql-rn-client/
│
├── src/
│   └── app/
│       ├── _layout.tsx
│       └── index.tsx
│
├── apollo.js
├── package.json
└── ...
```

Responsibilities:

```text
apollo.js
    ↓
Apollo Client configuration

_layout.tsx
    ↓
ApolloProvider

index.tsx
    ↓
GraphQL queries/mutations
    ↓
React Native UI
```

---

# 31. Apollo Client Setup

Create:

```text
apollo.js
```

Use:

```js
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://192.168.1.128:4000/",
  }),

  cache: new InMemoryCache(),
});

export default client;
```

---

# 32. What is ApolloClient?

`ApolloClient` creates the client that communicates with the GraphQL server.

```js
const client = new ApolloClient({
  ...
});
```

Mental model:

```text
React Native
     ↓
Apollo Client
     ↓
GraphQL Server
```

---

# 33. What is HttpLink?

```js
link: new HttpLink({
  uri: "http://192.168.1.128:4000/",
})
```

`HttpLink` tells Apollo Client where the GraphQL server is located.

Example:

```text
http://192.168.1.128:4000/
```

The request travels:

```text
React Native
     ↓
HttpLink
     ↓
192.168.1.128:4000
     ↓
Apollo Server
```

---

# 34. Physical Android Device vs Emulator

## Physical Android phone

Use your computer's local IP:

```js
uri: "http://192.168.1.128:4000/"
```

Find your IP on Windows:

```bash
ipconfig
```

Look for:

```text
IPv4 Address
```

Example:

```text
192.168.1.128
```

The phone and computer should be on the same network.

---

## Android Emulator

Usually use:

```js
uri: "http://10.0.2.2:4000/"
```

Remember:

```text
Physical Android
→ Computer's local IP

Android Emulator
→ 10.0.2.2

iOS Simulator
→ localhost
```

---

# 35. What is InMemoryCache?

```js
cache: new InMemoryCache()
```

Apollo Client stores GraphQL data in its cache.

Basic flow:

```text
GraphQL Server
      ↓
Apollo Client
      ↓
InMemoryCache
      ↓
React Native
```

We will use the cache more later for updating UI without unnecessary network requests.

---

# 36. Apollo Client 4 React Imports

With the Apollo Client version we are using, React-specific functionality comes from:

```js
@apollo/client/react
```

For example:

```tsx
import {
  ApolloProvider,
  useQuery,
  useMutation,
} from "@apollo/client/react";
```

While `gql` comes from:

```tsx
import { gql } from "@apollo/client";
```

Remember:

```text
@apollo/client
    ↓
Core Apollo functionality

@apollo/client/react
    ↓
React functionality
    ↓
ApolloProvider
useQuery
useMutation
...
```

---

# 37. ApolloProvider

Open:

```text
src/app/_layout.tsx
```

Use:

```tsx
import { Stack } from "expo-router";
import { ApolloProvider } from "@apollo/client/react";

import client from "../../apollo";

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
}
```

> Adjust the `client` import path depending on where your `apollo.js` file is located.

---

# 38. What is ApolloProvider?

`ApolloProvider` makes the Apollo Client available to React components.

```text
ApolloProvider
       ↓
Screens
       ↓
Components
       ↓
useQuery()
useMutation()
```

Without `ApolloProvider`, Apollo React hooks cannot access the client.

---

# 39. Why Put ApolloProvider in `_layout.tsx`?

Expo Router uses `_layout.tsx` as a parent layout.

Therefore:

```text
_layout.tsx
     ↓
ApolloProvider
     ↓
All child screens
```

This allows screens such as:

```text
index.tsx
users.tsx
profile.tsx
login.tsx
```

to use Apollo.

---

# 40. First GraphQL Query from React Native

Import:

```tsx
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
```

Create the query:

```tsx
const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;
```

The client is saying:

```text
Give me users.

For every user,
give me:
    id
    name
```

---

# 41. What is gql?

`gql` is used to define GraphQL documents.

Example:

```tsx
const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;
```

---

# 42. useQuery

`useQuery()` executes a GraphQL query from a React component.

```tsx
const {
  data,
  loading,
  error,
} = useQuery(GET_USERS);
```

Flow:

```text
useQuery(GET_USERS)
       ↓
Apollo Client
       ↓
GraphQL Server
       ↓
Resolver
       ↓
Response
       ↓
data
```

---

# 43. useQuery States

The most important values are:

```js
data
loading
error
```

## loading

While the request is running:

```js
loading === true
```

Example:

```tsx
if (loading) {
  return <Text>Loading...</Text>;
}
```

---

## error

If the request fails:

```tsx
if (error) {
  return <Text>Error: {error.message}</Text>;
}
```

---

## data

After a successful request:

```js
data
```

contains the GraphQL response.

For:

```graphql
query {
  users {
    id
    name
  }
}
```

The response looks like:

```json
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Vignesh"
      },
      {
        "id": "2",
        "name": "Rahul"
      }
    ]
  }
}
```

Therefore:

```js
data.users
```

is the users array.

---

# 44. TypeScript Types for GraphQL Response

Instead of using `any`, define the expected response.

```tsx
type User = {
  id: string;
  name: string;
};

type GetUsersData = {
  users: User[];
};
```

Then:

```tsx
const {
  data,
  loading,
  error,
} = useQuery<GetUsersData>(GET_USERS);
```

Now TypeScript understands:

```text
data
 ↓
GetUsersData
 ↓
users
 ↓
User[]
```

---

# 45. Why `data?.users`?

`data` may initially be `undefined` while the request is loading.

Therefore:

```tsx
data?.users
```

is safer than:

```tsx
data.users
```

Optional chaining:

```js
data?.users
```

means:

```text
If data exists
    ↓
access users

If data doesn't exist
    ↓
return undefined
```

---

# 46. Complete useQuery Example

```tsx
import { View, Text } from "react-native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

type User = {
  id: string;
  name: string;
};

type GetUsersData = {
  users: User[];
};

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

export default function HomeScreen() {
  const {
    data,
    loading,
    error,
  } = useQuery<GetUsersData>(GET_USERS);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      {data?.users.map((user) => (
        <Text key={user.id}>
          {user.id} - {user.name}
        </Text>
      ))}
    </View>
  );
}
```

---

# 47. Frontend Query Flow

```text
index.tsx
    ↓
useQuery(GET_USERS)
    ↓
Apollo Client
    ↓
HttpLink
    ↓
GraphQL Server :4000
    ↓
Query resolver
    ↓
users()
    ↓
users[]
    ↓
GraphQL response
    ↓
Apollo Client
    ↓
data.users
    ↓
.map()
    ↓
React Native UI
```

---

# 48. useMutation

`useMutation()` is used when the frontend needs to change data.

Examples:

```text
Create
Update
Delete
```

Import:

```tsx
import { useMutation } from "@apollo/client/react";
```

---

# 49. Create User Mutation

Our backend has:

```graphql
input CreateUserInput {
  name: String!
  roleId: ID!
}

type Mutation {
  createUser(input: CreateUserInput!): User
}
```

Frontend mutation:

```tsx
const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;
```

---

# 50. useMutation

```tsx
const [
  createUser,
  { loading },
] = useMutation(CREATE_USER);
```

Unlike `useQuery()`, the mutation does not automatically execute when the component loads.

We get a function:

```js
createUser()
```

and call it when required.

For example:

```text
Button press
     ↓
createUser()
     ↓
GraphQL Mutation
```

---

# 51. Sending Variables

Call:

```tsx
createUser({
  variables: {
    input: {
      name: "Kiran",
      roleId: 1,
    },
  },
});
```

The structure is:

```text
createUser()
    ↓
variables
    ↓
input
    ├── name
    └── roleId
```

---

# 52. Complete useMutation Example

```tsx
import { View, Text, Button } from "react-native";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

type User = {
  id: string;
  name: string;
};

type CreateUserData = {
  createUser: User;
};

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;

export default function HomeScreen() {
  const [
    createUser,
    { data, loading, error },
  ] = useMutation<CreateUserData>(
    CREATE_USER
  );

  const handleCreateUser = () => {
    createUser({
      variables: {
        input: {
          name: "Kiran",
          roleId: 1,
        },
      },
    });
  };

  return (
    <View>
      <Button
        title="Create User"
        onPress={handleCreateUser}
      />

      {loading && (
        <Text>Creating...</Text>
      )}

      {error && (
        <Text>
          Error: {error.message}
        </Text>
      )}

      {data && (
        <Text>
          Created: {data.createUser.name}
        </Text>
      )}
    </View>
  );
}
```

---

# 53. useQuery + useMutation Together

Now combine:

```text
useQuery
    ↓
READ users

useMutation
    ↓
CREATE user
```

The simplest way to update the list after creating a user is:

```js
refetch()
```

---

# 54. What is refetch?

`useQuery()` provides a `refetch` function:

```tsx
const {
  data,
  loading,
  error,
  refetch,
} = useQuery<GetUsersData>(GET_USERS);
```

Calling:

```js
refetch();
```

runs the query again.

---

# 55. Create User + Refetch Users

```tsx
const handleCreateUser = async () => {

  await createUser({
    variables: {
      input: {
        name: "Kiran",
        roleId: 1,
      },
    },
  });

  refetch();
};
```

Important:

```js
await createUser(...)
```

means:

```text
Wait for mutation
       ↓
User created
       ↓
refetch()
       ↓
Get latest users
```

---

# 56. Complete Query + Mutation Example

```tsx
import {
  View,
  Text,
  Button,
} from "react-native";

import { gql } from "@apollo/client";

import {
  useQuery,
  useMutation,
} from "@apollo/client/react";

type User = {
  id: string;
  name: string;
};

type GetUsersData = {
  users: User[];
};

type CreateUserData = {
  createUser: User;
};

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
    }
  }
`;

export default function HomeScreen() {

  // READ USERS
  const {
    data,
    loading,
    error,
    refetch,
  } = useQuery<GetUsersData>(
    GET_USERS
  );

  // CREATE USER
  const [
    createUser,
    { loading: creating },
  ] = useMutation<CreateUserData>(
    CREATE_USER
  );

  const handleCreateUser = async () => {

    await createUser({
      variables: {
        input: {
          name: "Kiran",
          roleId: 1,
        },
      },
    });

    refetch();
  };

  if (loading) {
    return (
      <Text>
        Loading users...
      </Text>
    );
  }

  if (error) {
    return (
      <Text>
        Error: {error.message}
      </Text>
    );
  }

  return (
    <View>

      <Button
        title={
          creating
            ? "Creating..."
            : "Create User"
        }
        onPress={handleCreateUser}
        disabled={creating}
      />

      <Text>
        Users
      </Text>

      {data?.users.map((user) => (
        <Text key={user.id}>
          {user.id} - {user.name}
        </Text>
      ))}

    </View>
  );
}
```

---

# 57. Complete Query + Mutation Flow

```text
                 React Native
                      │
                      │
             ┌────────┴────────┐
             │                 │
         useQuery          useMutation
             │                 │
           READ              CREATE
             │                 │
             └────────┬────────┘
                      ↓
                Apollo Client
                      ↓
                 GraphQL API
                      ↓
                  Resolver
                      ↓
                   Data
```

For creating a user:

```text
Button
   ↓
handleCreateUser()
   ↓
createUser()
   ↓
GraphQL Mutation
   ↓
createUser resolver
   ↓
users.push(newUser)
   ↓
await complete
   ↓
refetch()
   ↓
GET_USERS
   ↓
Updated users
   ↓
UI
```

---

# 58. refetch vs Cache

The approach we currently use:

```js
await createUser(...);
refetch();
```

means:

```text
Create User
    ↓
Make another network request
    ↓
Get latest users
```

This is simple and useful for learning.

Later we can update Apollo's cache directly:

```text
Create User
    ↓
Update Apollo Cache
    ↓
UI automatically updates
```

This avoids an additional query in cases where a cache update is appropriate.

---

# 59. Error Handling in GraphQL

On the backend, a resolver can throw:

```js
if (!user) {
  throw new Error("User not found");
}
```

GraphQL can return:

```json
{
  "data": {
    "user": null
  },
  "errors": [
    {
      "message": "User not found"
    }
  ]
}
```

On React Native:

```tsx
if (error) {
  return (
    <Text>
      Error: {error.message}
    </Text>
  );
}
```

Important:

```text
Resolver throws error
       ↓
GraphQL handles it
       ↓
error
       ↓
React Native
```

A normal resolver error does not automatically mean the Node.js server process crashes.

---

# 60. Authentication — Frontend Connection

The authentication flow we discussed is:

```text
React Native
      ↓
Login
      ↓
JWT
      ↓
Authorization header
      ↓
GraphQL context
      ↓
jwt.verify()
      ↓
context.user
      ↓
Protected resolver
```

Backend context example:

```js
context: async ({ req }) => {

  const authHeader =
    req.headers.authorization;

  if (!authHeader) {
    return {
      user: null,
    };
  }

  const token =
    authHeader.replace("Bearer ", "");

  try {

    const user =
      jwt.verify(token, "my-secret");

    return {
      user,
    };

  } catch {

    return {
      user: null,
    };

  }
}
```

Then a resolver can check:

```js
if (!context.user) {
  throw new Error("Unauthorized");
}
```

---

# 61. Pagination

We also covered basic offset/limit pagination.

Backend:

```graphql
type Query {
  users(
    page: Int!
    limit: Int!
  ): [User]
}
```

Resolver:

```js
users: (_, args) => {

  const start =
    (args.page - 1) * args.limit;

  return users.slice(
    start,
    start + args.limit
  );
}
```

Frontend query:

```graphql
query {
  users(
    page: 1
    limit: 10
  ) {
    id
    name
  }
}
```

Flow:

```text
page = 1
limit = 10
      ↓
start = 0
      ↓
users.slice(0, 10)
```

Next page:

```text
page = 2
limit = 10
      ↓
start = 10
      ↓
users.slice(10, 20)
```

---

# 62. GraphQL Frontend Mental Model

When working on the React Native side:

```text
1. Create GraphQL query
        ↓
2. useQuery()
        ↓
3. loading
        ↓
4. error
        ↓
5. data
        ↓
6. Render UI
```

For changing data:

```text
1. Create mutation
        ↓
2. useMutation()
        ↓
3. Button / action
        ↓
4. variables
        ↓
5. Mutation
        ↓
6. Response
        ↓
7. refetch/cache
        ↓
8. UI update
```

---

# 63. REST vs GraphQL on React Native

REST example:

```js
fetch(
  "https://example.com/users"
);
```

GraphQL:

```tsx
useQuery(GET_USERS);
```

REST:

```text
Endpoint decides response
```

GraphQL:

```text
Client query decides requested fields
```

Example:

```graphql
query {
  users {
    name
  }
}
```

Only `name` is requested.

---

# 64. Important Frontend Terms

```text
Apollo Client
→ Connects frontend to GraphQL API

ApolloProvider
→ Makes Apollo Client available to React components

HttpLink
→ Defines GraphQL server URL

InMemoryCache
→ Stores GraphQL data in Apollo cache

gql
→ Defines GraphQL query/mutation documents

useQuery
→ Reads/fetches data

useMutation
→ Changes data

data
→ Successful response

loading
→ Request is running

error
→ Request/query error

variables
→ Dynamic values sent to query/mutation

refetch
→ Runs the query again

Apollo Cache
→ Client-side GraphQL data store
```

---

# 65. Current Full Progress

```text
GRAPHQL BACKEND
    ✅ GraphQL
    ✅ REST vs GraphQL
    ✅ Schema
    ✅ Type
    ✅ typeDefs
    ✅ Scalar Types
    ✅ Query
    ✅ type Query
    ✅ Resolver
    ✅ resolvers
    ✅ List Types
    ✅ Client Query
    ✅ Apollo Server
    ✅ startStandaloneServer

GRAPHQL CORE
    ✅ Arguments
    ✅ Variables
    ✅ Nested Queries
    ✅ Mutation
    ✅ Mutation + Variables
    ✅ Input Types
    ✅ Nested Resolvers
    ✅ Nested Mutation
    ✅ In-memory data
    ✅ Error Handling
    ✅ Authentication basics
    ✅ Pagination basics

REACT NATIVE / FRONTEND
    ✅ Expo project
    ✅ Apollo Client installation
    ✅ Apollo Client setup
    ✅ HttpLink
    ✅ InMemoryCache
    ✅ ApolloProvider
    ✅ Apollo Client 4 React imports
    ✅ gql
    ✅ useQuery
    ✅ loading
    ✅ error
    ✅ data
    ✅ TypeScript response types
    ✅ useMutation
    ✅ Mutation variables
    ✅ useQuery + useMutation
    ✅ refetch after mutation

NEXT
    ⏳ Apollo Cache
    ⏳ Refetch vs Cache
    ⏳ JWT with Apollo Client
    ⏳ Login flow
    ⏳ Authorization headers
    ⏳ Protected GraphQL requests
```

# 66. One-Line Frontend Memory Trick

```text
ApolloProvider
→ Makes Apollo available

ApolloClient
→ Manages GraphQL communication

HttpLink
→ Where is the server?

gql
→ What is my GraphQL operation?

useQuery
→ READ

useMutation
→ CHANGE

variables
→ Dynamic input

loading
→ Waiting

error
→ Something went wrong

data
→ Server response

refetch
→ Ask server again

cache
→ Keep GraphQL data on client
```
Yes. Below is **only the continuation for the topics you actually learned recently**, mainly **Update, Delete, and making those actions dynamic from the selected user**. It does not repeat your earlier GET/Create sections.

````md
---

# 67. Update User Mutation

We already learned how to create a user using a mutation.

Now we learned how to **update an existing user**.

GraphQL:

```graphql
mutation UpdateUser($id: ID!, $input: CreateUserInput!) {
  updateUser(
    id: $id
    input: $input
  ) {
    id
    name
  }
}
````

The mutation receives:

* `id` → Which user should be updated
* `input` → New user information

Example variables:

```json
{
  "id": 1,
  "input": {
    "name": "Kiran",
    "roleId": 2
  }
}
```

Meaning:

```text
Find User 1
     ↓
Change name → Kiran
     ↓
Change role → 2
     ↓
Return updated user
```

---

# 68. Update Resolver

Backend:

```js
updateUser: (_, args) => {

  const user = users.find(
    user => user.id === Number(args.id)
  );

  if (!user) {
    throw new Error("User not found");
  }

  user.name = args.input.name;
  user.roleId = Number(args.input.roleId);

  return user;
}
```

Important part:

```js
const user = users.find(
  user => user.id === Number(args.id)
);
```

`find()` returns the actual user object.

For example:

```js
const users = [
  { id: 1, name: "Vignesh", roleId: 1 },
  { id: 2, name: "Rahul", roleId: 2 }
];
```

If:

```js
args.id = "1"
```

then:

```js
Number(args.id)
```

becomes:

```js
1
```

So:

```js
user.id === 1
```

matches the user.

---

# 69. Updating the Object

After finding the user:

```js
user.name = args.input.name;
user.roleId = Number(args.input.roleId);
```

Suppose the original user is:

```js
{
  id: 1,
  name: "Vignesh",
  roleId: 1
}
```

Input:

```json
{
  "name": "Kiran",
  "roleId": 2
}
```

After update:

```js
{
  id: 1,
  name: "Kiran",
  roleId: 2
}
```

Because `user` refers to the object inside the `users` array, changing its properties changes that object in the array.

---

# 70. Why Check if User Exists?

We use:

```js
if (!user) {
  throw new Error("User not found");
}
```

Because the requested ID might not exist.

Example:

```text
User IDs:
1
2
3

Request:
id = 10
```

No user is found.

So:

```js
user === undefined
```

and we throw an error.

Flow:

```text
Update request
      ↓
Find user
      ↓
Found?
 ┌────┴────┐
YES       NO
 ↓         ↓
Update   Error
 ↓
Return user
```

---

# 71. Update User from React Native

Frontend mutation:

```tsx
const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $input: CreateUserInput!
  ) {
    updateUser(
      id: $id
      input: $input
    ) {
      id
      name
    }
  }
`;
```

Create mutation hook:

```tsx
const [
  updateUser,
  { loading: updating }
] = useMutation<UpdateUserData>(
  UPDATE_USER
);
```

---

# 72. Calling Update Mutation

```tsx
const handleUpdateUser = async () => {

  await updateUser({
    variables: {
      id: 1,
      input: {
        name: "Kiran",
        roleId: 2
      }
    }
  });

  refetch();
};
```

Flow:

```text
Button
  ↓
handleUpdateUser()
  ↓
updateUser()
  ↓
variables
  ↓
GraphQL Server
  ↓
updateUser resolver
  ↓
Update user
  ↓
refetch()
  ↓
GET_USERS
  ↓
Updated UI
```

At this stage, the ID is hardcoded:

```tsx
id: 1
```

That means the function can only update User 1.

---

# 73. Delete User Mutation

Now we learned how to delete a user.

GraphQL:

```graphql
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    name
  }
}
```

The mutation only needs:

```text
id
```

because we only need to know **which user should be deleted**.

Example:

```json
{
  "id": "1"
}
```

---

# 74. Delete Resolver

Backend:

```js
deleteUser: (_, args) => {

  const index = users.findIndex(
    user => user.id === Number(args.id)
  );

  if (index === -1) {
    throw new Error("User not found");
  }

  const deletedUser = users[index];

  users.splice(index, 1);

  return deletedUser;
}
```

---

# 75. find() vs findIndex()

This is important.

### find()

```js
const user = users.find(
  user => user.id === 1
);
```

Returns the **object**.

Example:

```js
{
  id: 1,
  name: "Vignesh",
  roleId: 1
}
```

### findIndex()

```js
const index = users.findIndex(
  user => user.id === 1
);
```

Returns the **position/index**.

Example:

```text
0
```

For:

```js
[
  { id: 1, name: "Vignesh" },
  { id: 2, name: "Rahul" }
]
```

User 1 is at index `0`.

---

# 76. Why findIndex() for Delete?

`splice()` needs an index.

```js
users.splice(index, 1);
```

Therefore:

```text
findIndex()
     ↓
Get position
     ↓
splice()
     ↓
Remove user
```

Example:

```js
const index = users.findIndex(
  user => user.id === 2
);
```

Result:

```js
1
```

Then:

```js
users.splice(1, 1);
```

removes User 2.

---

# 77. Why Check index === -1?

`findIndex()` returns:

```text
-1
```

when no matching item is found.

Therefore:

```js
if (index === -1) {
  throw new Error("User not found");
}
```

Flow:

```text
Delete request
      ↓
findIndex()
      ↓
Found?
 ┌────┴────┐
YES       NO
 ↓         ↓
Index     -1
 ↓         ↓
splice   Error
 ↓
Delete
```

---

# 78. Why Store deletedUser Before splice?

We have:

```js
const deletedUser = users[index];

users.splice(index, 1);

return deletedUser;
```

Why?

Because after:

```js
users.splice(index, 1);
```

the user is removed from the array.

But our GraphQL schema says:

```graphql
deleteUser(id: ID!): User
```

So the resolver should return the deleted user.

Therefore:

```js
const deletedUser = users[index];
```

stores the user before removing it.

Then:

```js
users.splice(index, 1);
```

removes it.

Finally:

```js
return deletedUser;
```

returns the deleted user.

---

# 79. Delete User from React Native

Mutation hook:

```tsx
const [
  deleteUser,
  { loading: deleting }
] = useMutation<DeleteUserData>(
  DELETE_USER
);
```

Handler:

```tsx
const handleDeleteUser = async () => {

  await deleteUser({
    variables: {
      id: 1
    }
  });

  refetch();
};
```

Again, this currently deletes only User 1 because:

```tsx
id: 1
```

is hardcoded.

---

# 80. The Problem with Hardcoded IDs

Suppose the UI shows:

```text
Users

1 - Vignesh     [Update] [Delete]
2 - Rahul       [Update] [Delete]
3 - Kiran       [Update] [Delete]
```

If the code contains:

```tsx
variables: {
  id: 1
}
```

then clicking Delete for Rahul would still delete User 1.

We need the ID of the user whose button was clicked.

Therefore:

```text
Current user
     ↓
user.id
     ↓
Button
     ↓
Mutation
```

---

# 81. Passing User ID to Update Function

Instead of:

```tsx
const handleUpdateUser = async () => {
```

we change it to:

```tsx
const handleUpdateUser = async (id: string) => {
```

Now the function receives the selected user's ID.

Mutation:

```tsx
const handleUpdateUser = async (id: string) => {

  await updateUser({
    variables: {
      id,
      input: {
        name: "Kiran",
        roleId: 2
      }
    }
  });

  refetch();
};
```

Here:

```tsx
id
```

comes from the function parameter.

---

# 82. Passing Selected User ID from Button

Inside `.map()`:

```tsx
{data?.users.map((user) => (
  <View key={user.id}>

    <Text>
      {user.id} - {user.name}
    </Text>

    <Button
      title="Update"
      onPress={() => handleUpdateUser(user.id)}
    />

  </View>
))}
```

The important part:

```tsx
onPress={() => handleUpdateUser(user.id)}
```

The current `user` comes from:

```tsx
data?.users.map((user) => ...)
```

Therefore:

```text
User 1
 ↓
user.id = "1"
 ↓
Update button
 ↓
handleUpdateUser("1")
```

For User 2:

```text
User 2
 ↓
user.id = "2"
 ↓
Update button
 ↓
handleUpdateUser("2")
```

---

# 83. Why Use Arrow Function in onPress?

Correct:

```tsx
onPress={() => handleUpdateUser(user.id)}
```

Do not write:

```tsx
onPress={handleUpdateUser(user.id)}
```

The second version executes the function immediately while rendering.

We want the function to execute **when the button is pressed**.

Therefore:

```tsx
() => handleUpdateUser(user.id)
```

means:

```text
Button rendered
      ↓
Wait
      ↓
User presses button
      ↓
Execute handleUpdateUser(user.id)
```

---

# 84. Dynamic Delete

Change:

```tsx
const handleDeleteUser = async () => {
```

to:

```tsx
const handleDeleteUser = async (id: string) => {
```

Then:

```tsx
const handleDeleteUser = async (id: string) => {

  await deleteUser({
    variables: {
      id
    }
  });

  refetch();
};
```

Button:

```tsx
<Button
  title="Delete"
  onPress={() => handleDeleteUser(user.id)}
/>
```

Now every user can have its own Delete action.

---

# 85. Complete Dynamic User Actions

```tsx
{data?.users.map((user) => (
  <View key={user.id}>

    <Text>
      {user.id} - {user.name}
    </Text>

    <Button
      title="Update"
      onPress={() => handleUpdateUser(user.id)}
    />

    <Button
      title="Delete"
      onPress={() => handleDeleteUser(user.id)}
    />

  </View>
))}
```

Now:

```text
1 - Vignesh
[Update] → user.id = 1
[Delete] → user.id = 1

2 - Rahul
[Update] → user.id = 2
[Delete] → user.id = 2

3 - Kiran
[Update] → user.id = 3
[Delete] → user.id = 3
```

---

# 86. Dynamic CRUD Flow

```text
                    USERS
                      │
              ┌───────┴────────┐
              ↓                ↓
           CREATE         Existing User
                               │
                        ┌──────┴──────┐
                        ↓             ↓
                     UPDATE        DELETE
                        │             │
                     user.id       user.id
                        │             │
                        └──────┬──────┘
                               ↓
                       GraphQL Mutation
                               ↓
                            Server
                               ↓
                           Resolver
                               ↓
                        Update / Delete
                               ↓
                            Response
                               ↓
                           refetch()
                               ↓
                              UI
```

---

# 87. Update Flow

```text
User row
   ↓
user.id
   ↓
Update button
   ↓
handleUpdateUser(user.id)
   ↓
useMutation()
   ↓
variables
   ↓
GraphQL Server
   ↓
updateUser resolver
   ↓
find user
   ↓
update properties
   ↓
return updated user
   ↓
refetch()
   ↓
UI
```

---

# 88. Delete Flow

```text
User row
   ↓
user.id
   ↓
Delete button
   ↓
handleDeleteUser(user.id)
   ↓
useMutation()
   ↓
variables.id
   ↓
GraphQL Server
   ↓
deleteUser resolver
   ↓
findIndex()
   ↓
splice()
   ↓
return deleted user
   ↓
refetch()
   ↓
UI
```

---

# 89. CRUD We Have Covered

At this point our GraphQL application supports:

```text
CREATE
   ↓
createUser mutation

READ
   ↓
users query

UPDATE
   ↓
updateUser mutation

DELETE
   ↓
deleteUser mutation
```

So the basic CRUD flow is:

```text
                GraphQL CRUD

                  ┌───────┐
                  │ CREATE│
                  └───┬───┘
                      │
                  createUser

                  ┌───────┐
                  │ READ  │
                  └───┬───┘
                      │
                    users

                  ┌───────┐
                  │UPDATE │
                  └───┬───┘
                      │
                  updateUser

                  ┌───────┐
                  │DELETE │
                  └───┬───┘
                      │
                  deleteUser
```

---

# 90. Important JavaScript Methods Learned

### find()

Returns the matching object.

```js
const user = users.find(
  user => user.id === 1
);
```

### findIndex()

Returns the matching object's index.

```js
const index = users.findIndex(
  user => user.id === 1
);
```

Returns:

```text
0, 1, 2, ...
```

or:

```text
-1
```

if not found.

### splice()

Removes items from an array.

```js
users.splice(index, 1);
```

Meaning:

```text
index → Starting position
1     → Number of items to remove
```

---

# 91. Important TypeScript Point

Our GraphQL `ID` is represented as a string on the frontend:

```tsx
type User = {
  id: string;
  name: string;
};
```

Therefore:

```tsx
user.id
```

is:

```text
string
```

Example:

```tsx
"1"
```

But our temporary backend array contains numeric IDs:

```js
{
  id: 1
}
```

Therefore the backend converts the GraphQL ID:

```js
Number(args.id)
```

This is why we currently use:

```js
user.id === Number(args.id)
```

---

# 92. Current CRUD Mental Model

```text
React Native
     ↓
Apollo Client
     ↓
 ┌───────────────┐
 │ GraphQL       │
 │ Query/Mutation│
 └───────┬───────┘
         ↓
GraphQL Server
         ↓
Resolver
         ↓
Data
         ↓
Response
         ↓
Apollo Client
         ↓
refetch()
         ↓
React Native UI
```

For a selected user:

```text
User
 ↓
user.id
 ↓
Button
 ↓
Handler(id)
 ↓
Mutation
 ↓
variables.id
 ↓
Resolver
 ↓
Update/Delete
```

---

# 93. Important Mistakes to Remember

### Mistake 1 — Hardcoding ID

```tsx
variables: {
  id: 1
}
```

This always targets User 1.

Better:

```tsx
variables: {
  id
}
```

where `id` comes from:

```tsx
user.id
```

---

### Mistake 2 — Calling function during render

Wrong:

```tsx
onPress={handleDeleteUser(user.id)}
```

Correct:

```tsx
onPress={() => handleDeleteUser(user.id)}
```

---

### Mistake 3 — Using find() when you need an index

For deletion:

```js
findIndex()
```

is useful because:

```js
splice()
```

needs an index.

---

### Mistake 4 — Forgetting to return the deleted user

Wrong:

```js
users.splice(index, 1);
```

when the GraphQL field expects:

```graphql
deleteUser: User
```

Better:

```js
const deletedUser = users[index];

users.splice(index, 1);

return deletedUser;
```

---

# 94. Quick Revision

```text
find()
→ Returns object

findIndex()
→ Returns index

splice()
→ Removes items from array

updateUser
→ Updates existing user

deleteUser
→ Deletes existing user

user.id
→ Identifies selected user

Handler(id)
→ Receives selected user's ID

onPress={() => handler(user.id)}
→ Runs action for selected user

refetch()
→ Gets updated list from server

CRUD
→ Create + Read + Update + Delete
```

---

# 95. Current Learning Progress

### Backend

* GraphQL fundamentals
* Schema
* Types
* typeDefs
* Scalar types
* Query
* Resolver
* Arguments
* Variables
* Mutation
* Input types
* Nested queries
* Nested resolvers
* Error handling basics
* Create user
* Read users
* Update user
* Delete user
* `find()`
* `findIndex()`
* `splice()`

### React Native + Apollo Client

* Apollo Client
* ApolloProvider
* HttpLink
* InMemoryCache basics
* `gql`
* `useQuery`
* `useMutation`
* Loading/error/data
* TypeScript response types
* Mutation variables
* `refetch()`
* Create user
* Read users
* Update selected user
* Delete selected user
* Dynamic `user.id`
* Per-user Update/Delete buttons

### Current CRUD Flow

```text
READ
 ↓
useQuery
 ↓
users
 ↓
Display list
 ↓
Select user.id
 ↓
UPDATE / DELETE
 ↓
useMutation
 ↓
GraphQL resolver
 ↓
refetch
 ↓
Updated UI
```

---

# 96. One-Line Memory Trick

```text
Query
→ READ

Mutation
→ CHANGE DATA

createUser
→ CREATE

users
→ READ

updateUser
→ UPDATE

deleteUser
→ DELETE

find()
→ Get object

findIndex()
→ Get position

splice()
→ Remove item

user.id
→ Which user?

refetch()
→ Get latest list again
```

---

```
```
