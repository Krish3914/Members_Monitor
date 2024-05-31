import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
    name:"UserSlice",
    initialState:{
        userData:[],
    },
    reducers:{
        addUserData : (state,action)=>{
            state.userData = action.payload;
        }
    }
})

export const {addUserData} = UserSlice.actions;
 export default UserSlice.reducer;

