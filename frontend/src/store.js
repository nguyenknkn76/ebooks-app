import {configureStore} from '@reduxjs/toolkit';
import LoggedinReducer from './reducers/LoggedinReducer';
import UserReducer from './reducers/UserReducer';
import CustomVoiceReducer from './reducers/CustomVoiceReducer';

const store = configureStore({
    reducer: {
        loggedin: LoggedinReducer,
        users: UserReducer,
        customvoice: CustomVoiceReducer,
    }
});

console.log(store.getState());

store.subscribe(()=>{
    // console.log[store.getState()];
    console.log(store.getState());
})

export default store;