import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
    name:"clientSlice",
    initialState:{
        client:[],
        clientSearch:[],
        expiredUserCount:0
    },
    reducers:{
        addClient:(state,action)=>{
            state.client = action.payload;
        },
        addClientSearch:(state,action)=>{
            state.clientSearch = action.payload;
        },
        removeClient: (state, action) => {
            state.client = state.client.filter((client) => client._id !== action.payload);
          },
        expiredUserCount:(state,action)=>{
            state.expiredUserCount = action.payload;
        }
    }
})


export const { addClient,addClientSearch,removeClient,expiredUserCount } = clientSlice.actions;
export default clientSlice.reducer;
