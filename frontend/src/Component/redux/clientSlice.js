import { createSlice } from "@reduxjs/toolkit";

// Utility function to calculate today's percentage

// const clientList = [
//   { addedDate: "2024-06-17" /* other properties */ },
//   // more users
// ];


const calculateTodayPercentage = (clientList) => {
  const today = new Date().toISOString().split("T")[0];
  // alert(today);
//   const todayUsers = clientList.filter((user) => user.addedDate === "2024-06-17");
    const todayUsers = clientList.filter((user) => user.addedDate === today);
    // const todayUsers = clientList.filter((user) => user.registrationDate === today);
  const totalUsers = clientList.length;
    todayUsers.length += 2;
  console.log(clientList);
  // console.log(clientSlice);
  // alert(todayUsers.length);
  // alert(totalUsers);
  console.table(clientList);

  if (totalUsers === 0) return 0;
  return ((todayUsers.length / totalUsers) * 100).toFixed(2);
  // return ((4 / totalUsers) * 100).toFixed(2);
};


// const percentage = calculateTodayPercentage(clientList);
// console.log(`Percentage of users added today: ${percentage}%`);

const clientSlice = createSlice({
  name: "clientSlice",
  initialState: {
    client: [],
    clientSearch: [],
    expiredUserCount: 0,
    todayPercentage: 0, // Add state for today's percentage
  },
  reducers: {
    addClient: (state, action) => {
      state.client = action.payload;
      state.todayPercentage = calculateTodayPercentage(state.client); // Calculate percentage when clients are added
    },
    addClientSearch: (state, action) => {
      state.clientSearch = action.payload;
    },
    removeClient: (state, action) => {
      state.client = state.client.filter(
        (client) => client._id !== action.payload
      );
      state.todayPercentage = calculateTodayPercentage(state.client); // Recalculate percentage after removal
    },
    expiredUserCount: (state, action) => {
      state.expiredUserCount = action.payload;
    },
    updateTodayPercentage: (state,action) => {
      state.todayPercentage = calculateTodayPercentage(state.client); // Action to update percentage
    },
    addSingleClient: (state, action) => {
      state.client.push(action.payload);
      state.todayPercentage = calculateTodayPercentage(state.client);
    },
  },
});

export const {
  addClient,
  addClientSearch,
  removeClient,
  expiredUserCount,
  updateTodayPercentage,
  addSingleClient
} = clientSlice.actions;
export default clientSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const clientSlice = createSlice({
//     name:"clientSlice",
//     initialState:{
//         client:[],
//         clientSearch:[],
//         expiredUserCount:0
//     },
//     reducers:{
//         addClient:(state,action)=>{
//             state.client = action.payload;
//         },
//         addClientSearch:(state,action)=>{
//             state.clientSearch = action.payload;
//         },
//         removeClient: (state, action) => {
//             state.client = state.client.filter((client) => client._id !== action.payload);
//           },
//         expiredUserCount:(state,action)=>{
//             state.expiredUserCount = action.payload;
//         }
//     }
// })

// export const { addClient,addClientSearch,removeClient,expiredUserCount, updateTodayPercentage } = clientSlice.actions;
// export default clientSlice.reducer;
