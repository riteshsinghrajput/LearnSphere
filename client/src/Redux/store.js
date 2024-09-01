import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './slices/authSlice'
import chatSliceReducer from './slices/chatSlice'
import courseSliceReducer from './slices/courseSlice'
import razorpaySliceReducer from './slices/razorpaySlice'
import statSliceReducer from './slices/statSlice'
const store = configureStore({
    reducer:{
        auth: authSliceReducer,
        course: courseSliceReducer,
        razorpay:razorpaySliceReducer,
        stat: statSliceReducer,
        chat : chatSliceReducer
    }
})


export default store