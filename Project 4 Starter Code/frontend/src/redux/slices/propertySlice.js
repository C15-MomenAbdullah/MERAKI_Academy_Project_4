import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice ({
    name : "properites" , 
    initialState:{
        list : []
    },
    reducers: {
        setProperites : (state,action) =>{
            state.list = action.payload
        }
    }
})
export const {setProperites} = propertySlice.actions
export default propertySlice.reducer