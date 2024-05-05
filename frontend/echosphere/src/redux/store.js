import {configureStore} from '@reduxjs/toolkit';
import userslice from './userslice';


const store = configureStore({
    reducer: {
        // Add reducers here
        user: userslice,
    }
});
export default store;