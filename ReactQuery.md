Quick Revision
useQuery

Fetches data from the server.

useMutation

Changes data on the server (POST, PUT, DELETE).

mutationFn

The function that performs the API request.

mutate()

Starts the mutation.

onSuccess

Runs after a successful mutation.

invalidateQueries

Marks cached data as stale and refetches it.



1️⃣ React Query
Definition

A server state management library that simplifies fetching, caching, synchronizing, and updating data from APIs.

Purpose

Manage data coming from the backend efficiently without manually handling loading, errors, caching, and refetching.

One-Liner 

React Query manages server state, while Redux manages client state.

2️⃣ Server State
Definition

Data that comes from a backend server and can change independently of the application.

Examples
Products
Orders
Profile
Notifications
Comments
Managed By

✅ React Query

One-Liner

Server state needs synchronization with the backend because it can change outside the app.

3️⃣ Client State
Definition

Data created and controlled entirely by the application.

Examples:
Theme
Language
Modal visibility
Selected tab
Drawer state
Managed By
useState
Context API
Redux Toolkit
One-Liner

Client state exists only inside the application and doesn't require server synchronization.

4️⃣ QueryClient
Definition

The central manager of React Query that stores and manages all queries and their cache.

Responsibilities
Cache Management
Retry Logic
Background Refetch
Query Lifecycle
Synchronization

Creation

const queryClient = new QueryClient();
Interview One-Liner

QueryClient is the brain of React Query.

5️⃣ QueryClientProvider
Definition

A React Context provider that makes the QueryClient available throughout the application.

Example
<QueryClientProvider client={queryClient}>
    <App />
</QueryClientProvider>
Similar To
<Provider store={store}>

in Redux.

Interview One-Liner

QueryClientProvider provides a single QueryClient instance to the entire application.

6️⃣ useQuery()
Definition

A React Query hook used to fetch, cache, and synchronize server data.

Example
const result = useQuery({
  queryKey: ["posts"],
  queryFn: getPosts,
});
Handles Automatically
Fetching
Loading
Error
Retry
Cache
Refetch
Interview One-Liner

useQuery replaces most manual useState + useEffect + fetch logic.

7️⃣ queryKey
Definition

A unique identifier used by React Query to store and retrieve cached data.

Example
["posts"]

Dynamic

["products", 5]
Why?

Different keys = Different cache entries.

Interview One-Liner

queryKey uniquely identifies cached server data.

8️⃣ queryFn
Definition

A function responsible for fetching data from the backend.

Example
queryFn: getPosts
Usually Calls
API Layer
Interview One-Liner

queryFn tells React Query how to fetch the data.

9️⃣ API Layer
Definition

A separate layer responsible for communicating with backend APIs.

Example
Screen

↓

React Query

↓

API Layer

↓

Backend
Interview One-Liner

Screens should never call fetch() directly in production.

🔟 Cache
Definition

Temporary storage where React Query keeps fetched server data to avoid unnecessary network requests.

Benefits
Faster UI
Fewer API calls
Better UX
Interview One-Liner

React Query returns cached data before making unnecessary network requests.

1️⃣1️⃣ React Query Flow
Component

↓

useQuery()

↓

QueryClient

↓

Check Cache

↓

YES

↓

Return Cached Data

---------------------

NO

↓

queryFn()

↓

API Layer

↓

Server

↓

Store in Cache

↓

Update UI
1️⃣2️⃣ React Query vs Redux
React Query	Redux Toolkit
Server State	Client State
API Data	UI State
Caching	State Management
Auto Refetch	Manual Updates
Retry	No Retry
Sync with Backend	No Backend Sync
Interview One-Liner

Redux is not a replacement for React Query, and React Query is not a replacement for Redux. They solve different problems.

🎯 Common Interview Questions
What is React Query?

A server state management library that simplifies fetching, caching, and synchronizing data from APIs.

What is QueryClient?

The central manager responsible for caching and managing queries.

What is queryKey?

A unique identifier used to cache and retrieve server data.

What is queryFn?

The function that fetches data from the backend.

What is Server State?

Data coming from the backend that requires synchronization.

Can React Query replace Redux?

No. React Query manages server state, while Redux manages client state.

🧠 Memory Trick
React Query

Q → QueryClient (Brain)

P → Provider (Makes QueryClient Available)

Q → Query Key (Cache ID)

F → Query Function (Fetch Data)

C → Cache (Stores Data)

S → Server (Source of Truth)

Remember it as:

Query
↓

Provider
↓

QueryClient
↓

QueryKey
↓

QueryFunction
↓

Cache
↓

Server
⭐ Senior Interview Summary (30 Seconds)

React Query is a server-state management library. It uses a QueryClient to manage cached data. Components fetch data using useQuery, where the queryKey uniquely identifies cached data and the queryFn defines how to fetch it. React Query automatically handles caching, retries, loading, error states, and background refetching. It complements Redux by managing server state, while Redux manages client state.


---------------------

Cache
📖 Definition

A temporary memory where React Query stores fetched server data to avoid unnecessary API requests.

🎯 Purpose
Reduce API calls
Improve performance
Faster UI
Flow
Server
   │
   ▼
React Query
   │
   ▼
Cache
   │
   ▼
UI
Example

First request

GET /posts

↓

Server

↓

Cache

Second request

GET /posts

↓

Cache

↓

No API Call
Interview One-Liner

React Query caches server responses to reduce unnecessary network requests.


Fresh Data
📖 Definition

Fresh data is data that React Query considers up-to-date.

No API request is made.

Suppose

staleTime = 5 minutes

Timeline

10:00

↓

Fetch Posts

↓

Cached

↓

10:03

↓

Still Fresh

↓

Return Cache
Interview One-Liner

Fresh data is served directly from the cache without refetching.


3️⃣ Stale Data
📖 Definition

Stale data is cached data that may be outdated.

React Query can still show it immediately, but it may also fetch newer data in the background.

Timeline

10:00

↓

Fetch

↓

Cache

↓

10:06

↓

Data becomes Stale

UI:

Shows Cached Data

Background:

Calls API

If new data arrives:

Updates UI Automatically
Interview One-Liner

Stale data can be displayed immediately while React Query fetches fresh data in the background.


4️⃣ staleTime ⭐⭐⭐⭐⭐

This is the most asked React Query interview topic.

📖 Definition

staleTime defines how long cached data is considered fresh.

Example

useQuery({
    queryKey:["posts"],
    queryFn:getPosts,
    staleTime:60000
})

Meaning

60 seconds

React Query says:

For 60 seconds

↓

Do NOT refetch

↓

Use Cache

Timeline

0 sec

↓

Fetch API

↓

Cache

↓

30 sec

↓

Fresh

↓

Return Cache

↓

60 sec

↓

Still Fresh

↓

61 sec

↓

Now Stale
staleTime = 0 (Default)
Fetch

↓

Immediately Stale

Does that mean it instantly calls the API again?

❌ No.

It means:

Whenever React Query gets an opportunity (screen focus, remount, reconnect, etc.), it may refetch because the data is already considered stale.

Interview One-Liner

staleTime controls how long cached data is treated as fresh.


5️⃣ Background Refetch ⭐⭐⭐⭐
📖 Definition

Background refetch updates stale data without blocking the UI.

Flow

Cache Exists

↓

Show Cache Immediately

↓

Call API

↓

New Data?

↓

YES

↓

Update Cache

↓

UI Updates Automatically

Notice:

User never sees loading.

Amazing UX.

Instagram example

Open Feed

↓

Posts Show Instantly

↓

Behind the scenes

↓

Check New Posts

↓

Update Feed

That's background refetch.

Interview One-Liner

Background refetch keeps cached data updated without interrupting the user experience.


6️⃣ gcTime (Previously cacheTime)

React Query v5 renamed cacheTime to gcTime (Garbage Collection Time).

📖 Definition

gcTime determines how long unused cached data stays in memory before being removed.

Think of it as:

How long should React Query keep unused cache?

Example

gcTime:300000
5 minutes

Flow

Open Home

↓

Fetch Posts

↓

Cache

↓

Leave Screen

↓

Nobody Uses Posts

↓

Wait 5 Minutes

↓

Delete Cache

If user comes back within 5 minutes

Use Existing Cache

After 5 minutes

Cache Removed

↓

Fetch Again
Interview One-Liner

gcTime controls how long unused cached data remains in memory before garbage collection.


staleTime vs gcTime ⭐⭐⭐⭐⭐

This confuses almost everyone.

staleTime	                 gcTime
Freshness	                 Memory Lifetime
"Can I trust this data?"	"Can I keep this data?"
Affects Refetching	       Affects Cache Removal

API

↓

Cache

↓

Fresh

↓

Stale

↓

Unused

↓

gcTime Expires

↓

Delete Cache


7️⃣ Request Deduplication ⭐⭐⭐⭐
📖 Definition

React Query prevents multiple identical API requests from running simultaneously.

React Query automatically deduplicates identical in-flight requests based on the query key.


-----------------------------------

Q1. What is staleTime?

Answer:
The duration for which cached data is considered fresh. During this period, React Query returns the cached data without refetching.

Q2. What is gcTime?

Answer:
The duration that unused cached data remains in memory before React Query removes it through garbage collection.

Q3. Does stale data mean deleted data?

Answer:
No. Stale data is still cached and can be displayed immediately while React Query performs a background refetch.

Q4. What is request deduplication?

Answer:
React Query ensures that multiple components requesting the same query at the same time share a single network request instead of creating duplicates.

📝 Revision Notes
Cache

Definition: Stores fetched server data temporarily.

Purpose: Reduce API calls and improve performance.

Fresh Data

Definition: Cached data still within staleTime.

Behavior: Returned immediately without refetching.

Stale Data

Definition: Cached data that may be outdated.

Behavior: Display cached data and optionally refetch in the background.

staleTime

Definition: How long cached data remains fresh.

Interview: Controls freshness, not cache deletion.

gcTime

Definition: How long unused cached data stays in memory.

Interview: Controls cache cleanup, not freshness.

Background Refetch

Definition: Updates stale cached data in the background without blocking the UI.

Request Deduplication

Definition: Prevents duplicate network requests for the same queryKey.

🧠 Memory Trick
Cache

↓

Fresh

(staleTime)

↓

Stale

↓

Background Refetch

↓

Unused

↓

gcTime

↓

Garbage Collection


React Query caches server data in a QueryClient. Each query is identified by a unique queryKey. The staleTime determines how long cached data is considered fresh, while gcTime determines how long unused cached data stays in memory before being removed. When data becomes stale, React Query can display the cached data immediately and perform a background refetch to keep the UI up to date. It also deduplicates identical requests, ensuring that multiple components requesting the same data share a single network call.


What is useMutation?
Definition

useMutation is a React Query hook used to create, update, or delete server data.

Unlike useQuery, which reads data, useMutation modifies data.

Read vs Write
Hook	      Purpose	            HTTP Methods
useQuery	  Fetch Data	        GET
useMutation	Modify Data	        POST, PUT, PATCH, DELETE

Key Point

useQuery = Read
useMutation = Write


Basic Flow
Button Click

↓

useMutation

↓

API Layer

↓

Server

↓

Success

↓

Update UI ->(this is will be fast updation due to usemutation)

Basic Syntax
const mutation = useMutation({
  mutationFn: createPost,
});
API Function
async function createPost(data) {
  return fetch("/posts", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
Execute Mutation
mutation.mutate({
  title: "React Query"
});

Flow

mutate()

↓

mutationFn()

↓

API

↓

Server

↓

Response
Mutation States
const {
  mutate,
  isPending,
  error,
  isSuccess
} = useMutation(...)
Property	Purpose
mutate	Executes the mutation
isPending	Mutation in progress
error	Request failed
isSuccess	Completed successfully


Query Invalidation marks cached data as outdated and tells React Query to fetch fresh data.

Example
queryClient.invalidateQueries({
  queryKey: ["products"],
});


An Optimistic Update updates the UI before the server confirms success, assuming the request will succeed.


Q1. What is useMutation?

Answer

A React Query hook used to create, update, or delete server data.

Q2. When should useMutation be used?

Answer

For POST, PUT, PATCH, and DELETE operations that modify server data.

Q3. What is Query Invalidation?

Answer

It marks cached data as stale so React Query can fetch fresh data from the server.

Q4. What is an Optimistic Update?

Answer

It updates the UI immediately before the server responds, providing a faster user experience. If the request fails, the UI is rolled back.

Q5. Does invalidateQueries delete the cache?

Answer

No. It marks the query as stale and triggers a refetch based on React Query's lifecycle.

📝 Revision Notes
useQuery

Definition: Fetches server data.

HTTP: GET

useMutation

Definition: Modifies server data.

HTTP: POST, PUT, PATCH, DELETE

Query Invalidation

Definition: Marks cached data as stale and refreshes it.

Optimistic Update

Definition: Updates the UI before receiving the server response.

Flow
User Action

↓

useMutation

↓

Server Update

↓

Invalidate Query

↓

useQuery Refetch

↓

New Cache

↓

Updated UI
🧠 Memory Trick
GET
 ↓
useQuery

POST
PUT
PATCH
DELETE
 ↓
useMutation

↓

invalidateQueries

↓

Fresh Cache
🚀 30-Second Summary

useQuery is used to fetch server data, while useMutation is used to create, update, or delete it. After a successful mutation, React Query doesn't automatically know the cached data has changed, so we use invalidateQueries() to mark it as stale and refetch fresh data. For a smoother user experience, optimistic updates let the UI update immediately while the request is still in progress, rolling back if the request fails.


