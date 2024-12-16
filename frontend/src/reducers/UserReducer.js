import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers:{
        setUsers(state, action){
            return action.payload
        },
        appendUser(state, action){
            return state.push(action.payload)
        }
    }
})

export const {setUsers, appendUser} = userSlice.actions

export default userSlice.reducer