import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./slices/userSlice";
import propertyReducer from "./slices/propertySlice"

export default configureStore ({
    reducer : {
        user : userReducer,
        properites : propertyReducer
    }
})