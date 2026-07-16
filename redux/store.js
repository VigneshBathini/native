// step1
// redux/store.js

// configureStore creates the Redux Store.

import {configureStore} from '@reduxjs/toolkit';
import countReducer from "./countSlice" // Just the imported variable name for the reducer (can be anything)
import themeReducer from "./themeSlice"
import authReducer from "./authSlice"

// Create Store
export const store = configureStore({

    // All reducers will be added here.
    reducer:{
        counter:countReducer, //Key inside the Redux Store (state.counter)
        auth : authReducer,
        theme: themeReducer,
    }
})





// It automatically configures:

// ✅ Redux DevTools
// ✅ Middleware
// ✅ Good default settings

// So you don't need complex setup like old Redux.