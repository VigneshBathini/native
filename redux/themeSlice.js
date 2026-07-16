import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode:'light',
}

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggleTheme(state){  //action name-> toggleTheme

            console.log("theme",state)

            state.mode = state.mode==='light'? 'dark' : 'light'

        }
    }
})

export const {
    toggleTheme
} = themeSlice.actions;


export default themeSlice.reducer;
