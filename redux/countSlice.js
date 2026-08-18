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
    },

    addAmount(state,action){
      console.log(action); //{"payload": 10, "type": "counter/addAmount"}
      state.count += action.payload ; //action.payload is the value passed to the action when dispatched
    } 
  },

});


// Export Actions
export const {
    increment,
    decrement,
    addAmount
}=counterSlice.actions; //for components

// Export Reducer -The reducer function created by createSlice()-> use for store
export default counterSlice.reducer;