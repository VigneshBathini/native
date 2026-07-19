Production Architecture
----------------------------------------

The Three Popular Structures

1. Type-Based Structure (Beginner)
    src/

components/

screens/

hooks/

utils/

api/

assets/

Everything is grouped by file type.

Easy.

But it doesn't scale well.


Feature-Based Structure ⭐ (Most Product Companies)

Instead of grouping by file type...

Group by feature.

features/

authentication/

home/

cart/

profile/

payment/

Inside authentication:

authentication/

components/

hooks/

services/

screens/

types/

utils/

Everything related to authentication stays together.

Benefits

If you're fixing Login...

You only open:

authentication/

Not

screens/
hooks/
components/
services/

Huge productivity gain.

3. Domain-Based Structure

Large companies like Amazon, Microsoft, Uber, Airbnb may divide by business domains.

Example:

commerce/

orders/

payments/

customer/

admin/

delivery/

Inside each:

components/

screens/

api/

hooks/

redux/

This is basically an extension of feature-based architecture.

Which One Should You Learn?
Structure	Suitable For
Type-Based	Learning, Small Apps
Feature-Based	Most React Native Apps ⭐
Domain-Based	Very Large Enterprises

For interviews and production, Feature-Based Architecture is the sweet spot.

Recommended Folder Structure
src/

├── assets/
│
├── components/
│
├── features/
│
├── navigation/
│
├── services/
│
├── hooks/
│
├── constants/
│
├── utils/
│
├── config/
│
├── store/
│
├── theme/
│
├── types/
│
└── App.tsx

src/

components/

Button.tsx          ✅ Used everywhere

Input.tsx

Loader.tsx



hooks/

useDebounce.ts      ✅ Used everywhere

useNetwork.ts



services/

axios.ts            ✅ Used everywhere

socket.ts



features/

authentication/

components/

LoginForm.tsx

PasswordInput.tsx

hooks/

useLogin.ts

services/

authApi.ts

screens/

LoginScreen.tsx

RegisterScreen.tsx



products/

components/

ProductItem.tsx

hooks/

useProducts.ts

services/

productApi.ts

screens/

ProductsScreen.tsx

Let's understand each folder.

Why do we need a proper folder structure?

Answer:
To improve maintainability, scalability, readability, onboarding, and team collaboration. As applications grow, a good structure reduces coupling and makes features easier to locate and modify.

Q2. Which folder structure is most commonly used in production React Native apps?

Answer:
Feature-based architecture is the most common because it groups all files related to a feature together, improving scalability and developer productivity.

Q3. Why shouldn't API calls be written directly inside screens?

Answer:
It mixes UI with business logic, makes testing harder, reduces code reuse, and creates tightly coupled components. API logic belongs in a service layer or a custom hook.

Q4. What is the difference between components and features?

Answer:

components contains reusable UI elements that can be used across the app.
features contains all code related to a specific business feature, including screens, services, hooks, and feature-specific components.
Q5. Where should colors and fonts be stored?

Answer:
In a centralized theme folder to ensure consistency and simplify updates such as dark mode or rebranding.

📝 Revision Notes
Folder structure becomes critical as applications grow.
Type-based architecture is simple but doesn't scale well.
Feature-based architecture is the industry standard for most React Native projects.
Each folder should have a single responsibility.
Separate UI, business logic, API calls, and configuration.
Prefer reusable components and custom hooks over duplication.
Keep networking, state management, and presentation layers independent.


-----------------------------

What is a .env File?

A .env file stores configuration values.

Example:

EXPO_PUBLIC_API_URL=https://dev-api.company.com
EXPO_PUBLIC_APP_NAME=SmartCafe
EXPO_PUBLIC_VERSION=1.0.0

Why EXPO_PUBLIC_?

This is specific to Expo.

Expo only exposes variables to your app if they start with:

EXPO_PUBLIC_

Example:

EXPO_PUBLIC_API_URL=https://dev-api.company.com

Then:

process.env.EXPO_PUBLIC_API_URL

works.

If you write:

API_URL=https://dev-api.company.com

It won't be available in your React Native code.

Q: Where should JWT Secret be stored in a React Native application?

Answer:

Never in the React Native app. It should be stored securely on the backend server (for example, in the server's .env file or a secure secrets manager). The React Native app should only receive the generated JWT token after successful authentication.

Rule to remember
React Native .env → Public configuration (URLs, environment names, public API keys).
Backend .env or Secret Manager → Sensitive secrets (database credentials, JWT secrets, payment keys, cloud credentials).

---------------------------
Why do we create an API Layer?

Answer:
To centralize networking logic, improve maintainability, reduce duplication, and make it easier to add authentication, logging, retries, and error handling.

Q2. Why shouldn't screens call fetch() directly?

Answer:
Screens should focus on UI. Networking belongs in a service layer. This separation makes the app easier to maintain, test, and scale.

Q3. What is the role of an API Client?

Answer:
The API Client is the single entry point for all network requests. It manages shared concerns like the base URL, headers, tokens, timeouts, and error handling.

Q4. What's the difference between apiClient.js and productApi.js?
apiClient	productApi
Generic networking layer	Feature-specific API functions
Knows about base URL	Knows about /products
Handles headers	Calls apiClient
Shared by all features	Used only by the Products feature
📝 Revision Notes
Never call fetch() directly in production screens.
Use an apiClient as the single networking gateway.
Create feature-specific services (authApi, productApi, etc.).
Keep screens focused on rendering UI.
Centralize common networking logic to simplify future changes.


Step 1 — Environment
EXPO_PUBLIC_API_URL=https://jsonplaceholder.typicode.com
Step 2 — config/env.js
export const ENV = {
  API_URL: process.env.EXPO_PUBLIC_API_URL,
};
Step 3 — API Client ⭐

Think of this as the main gate to your backend.

Everything goes through here.
apiClient.js
import { ENV } from "../config/env";

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${ENV.API_URL}${endpoint}`, {
    ...options,
  });

  return response.json();
}

Notice

Only one place knows

Base URL
fetch
Why apiClient?

Because later we'll add

JWT Token
Refresh Token
Logging
Retry
Timeout
Error Handling

Only here.

Not everywhere.

Step 4 — Feature Service

Now create

features/

posts/

services/

postApi.js
import { apiFetch } from "../../../services/apiClient";

export function getPosts() {
  return apiFetch("/posts");
}

Beautiful.

The service only knows

/posts

Nothing else.

Step 5 — Screen
import { useEffect, useState } from "react";
import { getPosts } from "../services/postApi";

function PostsScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts();
      setPosts(data);
    }

    loadPosts();
  }, []);

  return (...);
}

Notice.

The screen has

NO

fetch()

NO

https://...

NO

headers

NO

Authorization

This is clean architecture.

Complete Flow
User Opens Home
        │
        ▼
HomeScreen
        │
        ▼
getPosts()
        │
        ▼
apiFetch()
        │
        ▼
fetch()
        │
        ▼
Server
        │
        ▼
JSON
        │
        ▼
HomeScreen
        │
        ▼
UI Updates


------------------------

Q1. What is Authentication?

Answer:
Authentication verifies the identity of a user, usually by checking credentials such as an email and password.

Q2. What is Authorization?

Answer:
Authorization determines what an authenticated user is allowed to access or perform.

Q3. Why do we use Access Tokens?

Answer:
To avoid sending user credentials with every request. The token proves the user has already authenticated.

Q4. Why do Access Tokens expire?

Answer:
To reduce security risks. If a token is stolen, its lifetime is limited.

Q5. What is a Refresh Token?

Answer:
A Refresh Token is used to request a new Access Token after the current one expires, allowing the user to remain logged in without re-entering credentials.

Q6. Where should authentication tokens be stored in Expo?

Answer:
Sensitive tokens should be stored in Expo SecureStore because it encrypts the stored data.

Why SecureStore?

Never store authentication tokens in normal variables.

const token = "abc"; // Lost when app closes

Never use AsyncStorage for sensitive information.

Instead:

import * as SecureStore from "expo-secure-store";

Expo SecureStore stores data encrypted using:

Android: Encrypted SharedPreferences / Keystore
iOS: Keychain
Basic Usage
Save Token
await SecureStore.setItemAsync("accessToken", token);
Read Token
const token = await SecureStore.getItemAsync("accessToken");
Delete Token (Logout)
await SecureStore.deleteItemAsync("accessToken");
Production Flow
Login Success
      │
      ▼
Store Token in SecureStore
      │
      ▼
App Restart
      │
      ▼
Read Token
      │
      ▼
Token Exists?
     / \
   Yes  No
   |     |
 Home  Login
Best Practices

✅ Store:

Access Token
Refresh Token

❌ Don't store:

Password
OTP
Sensitive backend secrets
Interview Question

Q: Why SecureStore over AsyncStorage?

A: SecureStore encrypts sensitive data using the device's secure storage (Keychain/Keystore), whereas AsyncStorage stores plain data intended for non-sensitive information.

--------------------------------

Use AsyncStorage For

✅ Theme

Dark Mode

✅ Language

English

✅ User Preferences

Grid/List View

✅ Recently Viewed

Don't Use It For

❌ Access Token

❌ Refresh Token

❌ Password

Basic Usage
import AsyncStorage from "@react-native-async-storage/async-storage";

Save:

await AsyncStorage.setItem("theme", "dark");

Read:

const theme = await AsyncStorage.getItem("theme");

Delete:

await AsyncStorage.removeItem("theme");
AsyncStorage vs SecureStore
AsyncStorage	        SecureStore
Not encrypted	        Encrypted
Preferences         	Tokens
Theme	                JWT
Language            	Refresh Token
Cache	                Sensitive Data


---------------------------------------

Benefits of React Query

✅ Automatic caching

✅ Automatic background refetch

✅ Automatic retries

✅ Loading state

✅ Error state

✅ Cache invalidation

✅ Pagination support

✅ Infinite scrolling

✅ Optimistic updates

✅ Offline support

When NOT to Use React Query

Use Redux/useState for client state:

Theme
Sidebar open
Language
Selected tab
Current filter (if purely UI)

Use React Query for server state:

Users
Orders
Products
Profile
Notifications

Q1. What problem does React Query solve?

Answer:
It manages server state by handling data fetching, caching, synchronization, retries, loading, and error states automatically.

Q2. What is Server State?

Answer:
Data that comes from a backend service, can change independently of the app, and requires synchronization with the server.

Q3. Why not store API data in Redux?

Answer:
Redux can store it, but it doesn't provide automatic caching, stale data management, retries, or background refetching. React Query is designed specifically for these concerns.

Q4. Can Redux and React Query be used together?

Answer:
Yes. Redux manages client state, while React Query manages server state. They complement each other rather than compete.

📝 Revision Notes
React Query manages server state.
Redux manages client state.
React Query automatically handles caching, retries, loading, and synchronization.
Server state changes outside your app, so it needs specialized management.
Understanding Server State vs Client State is one of the most common interview topics.


What is QueryClient?

Imagine your app has:

Products
Orders
Profile
Notifications
Comments

Someone has to manage:

Cache
Refetch
Retry
Stale state
Background updates

That's the job of QueryClient.

React Native App
        │
        ▼
QueryClient
        │
 ┌──────┼────────┐
 ▼      ▼        ▼
Products Orders Profile
 Cache    Cache   Cache


 npm install @tanstack/react-query

 Q1. What is QueryClient?

Answer:

It is the central manager of React Query responsible for caching, query management, retries, invalidation, and synchronization.

Q2. Why use QueryClientProvider?

Answer:

To provide a single QueryClient instance to the entire React application through React Context.

Q3. What is queryKey?

Answer:

A unique identifier for cached server data. React Query uses it to store, retrieve, and invalidate cached queries.

Q4. Why should query keys be unique?

Answer:

Because React Query identifies cached data using the query key. Duplicate or incorrect keys can cause wrong or stale data to be returned.

📝 Revision Notes
QueryClient is the central cache manager.
QueryClientProvider makes it available across the app.
useQuery fetches and manages server state.
queryKey uniquely identifies cached data.
queryFn is responsible for fetching data.
useQuery replaces much of the manual useState + useEffect + fetch boilerplate.  

-------------------------------------------------------



