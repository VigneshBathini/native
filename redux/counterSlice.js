//step3
// redux/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  count: 0,
};

// Create Slice
//counterslice-> JavaScript variable holding the slice objects
const counterSlice = createSlice({  

  //Slice name used to generate action types (counter/increment)
  name: "counter",  

  // Initial Data
  initialState,

  // Functions to update state
  reducers: {
    increment(state){
        state.count++;
    },
    
    decrement(state){
        state.count--;
    }
  },

});


// Export Actions
export const {
    increment,
    decrement,
}=counterSlice.actions;

// Export Reducer -The reducer function created by createSlice()
export default counterSlice.reducer;