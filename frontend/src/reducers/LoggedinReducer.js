import { createSlice } from "@reduxjs/toolkit";

const loggedInSlice = createSlice({
    name:"loggedin",
    initialState: null,
    reducers:{
        setLoggedIn(state, action){
            return action.payload
        },
    }
})

export const {setLoggedIn} = loggedInSlice.actions

export default loggedInSlice.reducer