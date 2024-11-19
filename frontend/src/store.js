import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        
    }
})

console.log(store.getState())

store.subscribe(()=>{
    console.log[store.getState()]
})

export default store