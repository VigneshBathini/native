import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user:null,
    token:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action){
            console.log("login action",action)
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout(state){
               console.log("logout action",action)
            state.user = null,
            state.token= null
        }

    }
})

export const {
    login,
    logout
} = authSlice.actions;

export default authSlice.reducer;