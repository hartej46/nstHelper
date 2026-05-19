import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';

export default store = configureStore({
    reducer : {
       auth: authSlice 
    }
})