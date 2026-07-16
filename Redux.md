Bottom-> top

useSelector()

        ▲
        │
        │
Redux Store
        ▲
        │
Reducer
        ▲
        │
Action
        ▲
        │
dispatch()
        ▲
        │
Button Click
----------------------

What is Redux?
Definition

Redux is a state management library used to store and manage application-wide (global) state in a single centralized store.

What is a Store?
Definition

Store is the central place where Redux keeps your application's global state.

Component

↓

Dispatch(Action)

↓

Reducer

↓

Store Updated

↓

useSelector()

↓

UI Updates

What is <Provider>?
Definition

Provider makes the Redux Store available to every component in the app.

📖 Quick Definitions
Store

Central place where Redux stores global state.

configureStore()

Creates and configures the Redux Store.

Provider

Makes the Store available to all components.

reducer

Collection of all slices in the Store.

--------------------------------------------

What is a Slice?
Definition

A Slice is a portion (piece) of the Redux Store that manages related state and logic.

Why Slice?

Without Slice

Redux Store

count
user
cart
theme
language
notifications
wishlist

Everything is mixed together ❌

With Slice

Redux Store

Counter Slice
   └── count

Auth Slice
   └── user
   └── token

Cart Slice
   └── products

Theme Slice
   └── darkMode

Much easier to manage.


Slice

A module that contains related state and logic.

createSlice()

Creates a Slice, Reducer, and Actions automatically.

initialState

Default state of the Slice.

reducers

Functions that update the state.

state
state.count++;

Current state stored in Redux.

Code	                                Purpose
const counterSlice = createSlice()	    JavaScript variable holding the slice object
name: "counter"	                        Slice name used to generate action types (counter/increment)
counterSlice.reducer	                The reducer function created by createSlice()
counterReducer	                        Just the imported variable name for the reducer (can be anything)
counter: counterReducer	                Key inside the Redux Store (state.counter)


What is an Action?
Definition

An Action is an instruction sent to Redux to update the state.

Action

An instruction to update the Redux state.

useDispatch()

Hook used to access Redux's dispatch() function.

dispatch()

Sends an action to the Redux Store.

increment()

Auto-generated action creator from createSlice().

Reducer

Updates the state based on the received action.


Persist
📝 Revision Notes
Concept	                    Definition
Action	                    An instruction sent to Redux to update the state.
useDispatch()	            Hook that gives access to dispatch().
dispatch()	                Sends an action to the Redux Store.
increment()             	Auto-generated action creator from createSlice().
Reducer	                    Function that updates the state based on an action.


Button

↓

dispatch(increment())

↓

Store Updated

↓

useSelector()

↓

UI Re-renders

↓

Count: 1


What is useSelector()?
Definition

useSelector() is a hook used to read data from the Redux Store.

Redux Store

↓

useSelector()

↓

Component

↓

UI


🧠 Explain Every Line
Import
import { useSelector } from "react-redux";

This hook allows the component to subscribe to the Redux Store.

Reading State
const count = useSelector((state) => state.counter.count);

Let's break it down.

state
Entire Redux Store

Current Store:

Store

counter
   │
   ▼

count : 0

So,

state

is

{
  counter: {
    count: 0,
  },
}
state.counter
{
  count: 0,
}
state.counter.count
0

----------------------

Quick Definitions
useSelector

Reads data from the Redux Store.

state

Represents the entire Redux Store.

state.counter

Returns the Counter Slice.

state.counter.count

Returns the count value from the Counter Slice.

Re-render

The component updates automatically when the selected state changes.
---------------------------------

useSelector()

        ▲
        │
        │
Redux Store
        ▲
        │
Reducer
        ▲
        │
Action
        ▲
        │
dispatch()
        ▲
        │
Button Click

-------------------
What is a Payload?
Definition

Payload is the data sent along with an Action to update the Redux Store.

Think of it as a parcel.

dispatch(action(payload))

↓

Action

↓

Payload

↓

Reducer


📝 Quick Definitions
Payload

Data sent with an action to update the Redux Store.

Action Object

Object created by Redux containing type and payload.

action

Object automatically received by reducers.

action.payload

Actual data passed using dispatch().

dispatch(addAmount(10))

Sends an action with payload 10 to Redux.

-----------------------------

Payload can be anything
Number
dispatch(addAmount(50))
String
dispatch(updateName("Vignesh"))

Reducer

state.name = action.payload;
Object ⭐ (Most Common)
dispatch(updateUser({

    id:1,

    name:"Vignesh",

    email:"abc@gmail.com"

}))

Reducer

state.user = action.payload;
Array
dispatch(setProducts(products))

Reducer

state.products = action.payload;
Real Project Examples
Login
dispatch(setUser(user))

Payload

{
    id:1,

    name:"Vignesh",

    token:"abc123"
}
Cart
dispatch(addToCart(product))

Payload

{
    id:100,

    title:"iPhone",

    price:80000
}
Theme
dispatch(changeTheme("dark"))

Payload

dark
-------------------------

Button Click

↓

dispatch(addAmount(10))

↓

Action

{
    type:"counter/addAmount",

    payload:10
}

↓

Reducer

↓

action.payload

↓

10

↓

count += 10

↓

Store Updated

↓

UI Updated