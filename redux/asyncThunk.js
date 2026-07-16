import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
    "users/fetchusers",

    async() =>{
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        )

        return response.json();
    }
)