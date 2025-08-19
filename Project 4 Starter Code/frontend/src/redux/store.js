import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./slices/userSlice";
import propertyReducer from "./slices/propertySlice"
import bookingRuducer from "./slices/bookingSlice"

export default configureStore ({
    reducer : {
        user : userReducer,
        properties : propertyReducer,
        booking : bookingRuducer
    }
})