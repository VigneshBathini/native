// step1
// redux/store.js

// configureStore creates the Redux Store.

import {configureStore} from '@reduxjs/toolkit';
import countReducer from "./countSlice" // Just the imported variable name for the reducer (can be anything)
import themeReducer from "./themeSlice"
import authReducer from "./authSlice"


//Step 1 - Configure Persist
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore,persistReducer } from 'redux-persist';


//Step 1 - Configure Persist
const persistConfig = {
    key: "root", //Redux Persist stores data under this key.
    storage: AsyncStorage, //Save Redux data inside AsyncStorage.
};



const persistedReducer = persistReducer(
    persistConfig,
    authReducer
);

// Create Store
export const store = configureStore({

    // All reducers will be added here.
    reducer:{
        counter:countReducer, //Key inside the Redux Store (state.counter)
        auth : persistReducer, //
        theme: themeReducer,
    }
})

export const persistor = persistStore(store); //persistStore() starts the persistence process.





// It automatically configures:

// ✅ Redux DevTools
// ✅ Middleware
// ✅ Good default settings

// So you don't need complex setup like old Redux.