import {configureStore} from '@reduxjs/toolkit'
import LoggedinReducer from './reducers/LoggedinReducer'
import UserReducer from './reducers/UserReducer'

const store = configureStore({
    reducer: {
        loggedin: LoggedinReducer,
        users: UserReducer,

    }
});

console.log(store.getState());

store.subscribe(()=>{
    console.log[store.getState()];
})

export default store;