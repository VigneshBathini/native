//async thunk
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsers } from "./asyncThunk";

const initialState= {
    users:[],
    loading:false,
    error:null
}

extraReducers:(builder)=>{
    builder
        .addCase(fetchUsers.pending,(state)=>{
            state.loading= true
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading = false,
            state.error = action.error.message
        })
}
