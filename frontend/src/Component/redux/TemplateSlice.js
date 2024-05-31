import { createSlice } from "@reduxjs/toolkit";

const TemplateSlice = createSlice({
    name:"TemplateSlice",
    initialState:{
        isVisible:false,
    },
    reducers:{
        updateVisibility : (state,action)=>{
            state.isVisible = action.payload;
        },
        makeInvisible:(state,action)=>{
            state.isVisible = action.payload
        }
    }
})

export const {updateVisibility,makeInvisible} = TemplateSlice.actions;
 export default TemplateSlice.reducer;

