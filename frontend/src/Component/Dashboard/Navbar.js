import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import { makeInvisible } from "../redux/TemplateSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { apiURL } from "../utils/commonData";
import Dashboard from "./Dashboard";
import OrderStatistics from "./OrderStatistics";
import FinanceStatistics from "./FinanceStatistics";
import { Spinner } from "../Spinner";
import TransactionsList from "./TransactionsList";
import "./navbar.css";
import { addClient, updateTodayPercentage } from "../redux/clientSlice";

export const Navbar = () => {
  const [loader, setLoader] = useState(false);
  const [dailyVisits, setDailyVisits] = useState(0); // State to track daily visits
  const [profit, setProfit] = useState(0); // State to track total profit
  const [profitChange, setProfitChange] = useState(0);
  const [usersAddedToday, setUsersAddedToday] = useState(0); // State to track users added today
  const [totalUsers, setTotalUsers] = useState(0); // State to track total users

  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.userData.name);
  const role = useSelector((state) => state?.user?.userData?.role);
  const noOfUsers = useSelector((state) => state.client.client);
  const expiredUserCount = useSelector(
    (state) => state.client.expiredUserCount
  );
  const ownerId = useSelector((state) => state.user.userData?._id);
  const userData = useSelector((state) => state.client.client);
  const todayPercentage = useSelector((state) => state.client.todayPercentage);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiURL}clients/${ownerId}`);
        const fetchedUsers = response.data.message;
        dispatch(addClient(fetchedUsers)); // Update the Redux store with fetched users
        setTotalUsers(fetchedUsers.length);
        setUsersAddedToday(
          fetchedUsers.filter((user) => user.addedToday).length
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (ownerId) {
      fetchUserData();
    }
  }, [ownerId, dispatch]);

  useEffect(() => {
    const fetchDailyVisits = async () => {
      try {
        const response = await axios.post(`${apiURL}log-visit`, null, {
          headers: {
            Referer: "https://membersmonitor.com",
          },
        });
        console.log("Daily visits response:", response.data);
        if (response.status === 200) {
          setDailyVisits(response.data.visitRecord.count);
        }
      } catch (error) {
        console.error("Error fetching daily visits:", error);
      }
    };

    fetchDailyVisits();
  }, []);


  useEffect(() => {
    toast.dismiss();
  }, []);

  useEffect(() => {
    // Calculate total profit from user data
    const totalProfit = userData.reduce((acc, user) => acc + user.amount, 0);
    setProfit(totalProfit);
  }, [userData]);

  console.log("users:", dailyVisits);

  const calculatePercentage = () => {
    if (totalUsers === 0) return 0;
    return ((usersAddedToday / totalUsers) * 100).toFixed(2);
  };

  const cardClass = "bg-white rounded-lg p-4 flex flex-col gap-2";

  return loader ? (
    <Spinner />
  ) : (
    <div className="px-4 py-6" onClick={() => dispatch(makeInvisible(false))}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-9/12 bg-white rounded-lg">
            <div className="bg-white rounded-xl p-4">
              <div className="flex flex-col lg:flex-row">
                <div className="flex mx-auto flex-col gap-6 mt-2 w-full lg:w-1/2">
                  <span className="text-purple-400 font-medium text-xl">
                    Welcome{" "}
                    <span className="text-xl ">{role ? role : userName}🎉</span>
                  </span>
                  <span className="opacity-65">
                    You have done
                    <span className="font-semibold leading-3">
                      {" "}
                      {todayPercentage}%{" "}
                    </span>{" "}
                    more sales today. Check your new badge in your profile.
                  </span>
                  <Link to={"/dashboard/traineeform"}>
                    <span className="w-full lg:w-3/12 py-2 px-1 border-2 border-purple-300 text-purple-400 hover:bg-purple-600 text-center hover:text-white rounded-md duration-500">
                      Add Members
                    </span>
                  </Link>
                </div>
                <img
                  src={require("../../images/illustrations/man-with-laptop-light.png")}
                  className="w-20 h-30 lg:w-4/12 self-center"
                  alt="Man with laptop"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/12 flex flex gap-3">
            <div className={cardClass} style={{ width: "50%" }}>
              <div className="flex items-center justify-between">
                <img
                  src={require("../../images/icons/unicons/chart-success.png")}
                  className="w-10"
                  alt="Chart Success"
                />
                <BsThreeDotsVertical />
              </div>
              <Link to={"/dashboard/tables"}>
                <h2 className="text-lg">Members</h2>
              </Link>
              <span className="text-2xl font-medium opacity-65">
                {noOfUsers?.length}
              </span>
              <span className="text-green-400">0%</span>
            </div>
            <div className={cardClass} style={{ width: "50%" }}>
              <div className="flex justify-between items-center">
                <img
                  src={require("../../images/icons/unicons/cc-primary.png")}
                  className="w-10"
                  alt="CC Primary"
                />
                <BsThreeDotsVertical />
              </div>
              <Link to={"/dashboard/salescard"}>
                <h2 className="text-lg">Sales</h2>
              </Link>
              <span className="text-2xl font-medium opacity-65">0</span>
              <span className="text-green-400">0%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-7">
          <div className="bg-white w-full lg:w-8/12 rounded-lg p-4">
            <Dashboard />
          </div>
          <div className="w-full lg:w-4/12 flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div className={`w-full md:w-1/2 ${cardClass}`}>
                <div className="flex items-center justify-between">
                  <img
                    src={require("../../images/icons/unicons/cc-success.png")}
                    className="w-10"
                    alt="CC Success"
                  />
                  <BsThreeDotsVertical />
                </div>
                <Link to={"/dashboard/notifications"}>
                  <h2 className="text-lg text-shadow-md">Notifications</h2>
                </Link>
                <span className="text-2xl font-medium opacity-65">
                  {expiredUserCount}
                </span>
                <span className="text-green-400">0%</span>
              </div>
              <div className={`w-full md:w-1/2 ${cardClass}`}>
                <div className="flex justify-between items-center">
                  <img
                    src={require("../../images/icons/unicons/paypal.png")}
                    className="w-10"
                    alt="Paypal"
                  />
                  <BsThreeDotsVertical />
                </div>
                <Link to={"/dashboard/transactioncard"}>
                  <h2 className="text-lg">New Members</h2>
                </Link>
                {
                  role === "Admin" && (
                  <div className="text-2xl font-medium opacity-65">
                    {dailyVisits}
                  </div>
                  )
                }
                <span className="text-red-400">10%</span>
              </div>
            </div>
            <div className={cardClass}>
              <div className="flex justify-between items-center">
                <img
                  src={require("../../images/icons/unicons/chart.png")}
                  className="w-10"
                  alt="Profit icon"
                />
                <BsThreeDotsVertical />
              </div>
              <h2 className="text-lg">Profit Report</h2>
              <div className="flex justify-between">
                <span className="text-xl font-medium">Total Profit:</span>
                <span className="text-xl font-medium">
                  ₹{profit.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base opacity-65">Change:</span>
                <span
                  className={
                    profitChange > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {profitChange}%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-7">
          <OrderStatistics userData={userData} />
          <FinanceStatistics />
          <TransactionsList />
        </div>
      </div>
    </div>
  );
};

export default Navbar;



      // {
      //   role === "Admin" && (
      //     <div className="w-full flex justify-center items-center py-4">
      //       <div className="relative impressive-background text-white py-0 px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 w-full rounded-md shadow-md text-center">
      //         <div className="absolute -inset-0.5 impressive-background opacity-50 rounded-md"></div>
      //         <div className="relative z-10">
      //           {" "}
      //           <br />
      //           <h3 className="text-lg font-semibold">
      //             Number of Daily Visits:{" "}
      //           </h3>
      //           <p className="text-2xl font-bold">{dailyVisits}</p>
      //         </div>
      //       </div>
      //     </div>
      //   );
      // }

// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { makeInvisible } from "../redux/TemplateSlice";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { apiURL } from "../utils/commonData";
// import Dashboard from "./Dashboard";
// import OrderStatistics from "./OrderStatistics";
// import FinanceStatistics from "./FinanceStatistics";
// import { Spinner } from "../Spinner";
// import TransactionsList from "./TransactionsList";
// import "./navbar.css";
// import { addClient, updateTodayPercentage } from "../redux/clientSlice";

// export const Navbar = () => {
//   const [loader, setLoader] = useState(false);

//   const [dailyVisits, setDailyVisits] = useState(0); // State to track daily visits

//   const dispatch = useDispatch();
//   const userName = useSelector((state) => state.user.userData.name);
//   const role = useSelector((state) => state?.user?.userData?.role);
//   console.log(role);
//   const noOfUsers = useSelector((state) => state.client.client);
//   const expiredUserCount = useSelector(
//     (state) => state.client.expiredUserCount
//   );
//   const ownerId = useSelector((state) => state.user.userData?._id);
//   const [userData, setUserData] = useState([]);
//   const [profit, setProfit] = useState(0);
//   const [profitChange, setProfitChange] = useState(0);

//   const totProfit = useSelector((state) => state.client.totProfit);

//   // const userData = useSelector((state) => state.client.client);

//   const todayPercentage = useSelector((state) => state.client.todayPercentage);
//   console.log("todayper", todayPercentage);
//   // const role = useSelector((store) => store.user.userData?.role);
//   // const userName = useSelector((store) => store.user.userData?.userName);
//   // const todayPercentage = useSelector((state) => state.client.todayPercentage);

//   const [usersAddedToday, setUsersAddedToday] = useState(0); // Add this state
//   const [totalUsers, setTotalUsers] = useState(0); // State to track total users

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`${apiURL}clients/${ownerId}`);
//         const fetchedUsers = response.data.message;
//         setUserData(fetchedUsers);
//         setTotalUsers(fetchedUsers.length);
//         console.log("totupr", totalUsers);
//         setUsersAddedToday(
//           fetchedUsers.filter((user) => user.addedToday).length
//         );
//         console.log("utotupr", usersAddedToday);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (ownerId) {
//       fetchUserData();
//     }
//   }, [ownerId]);

//   useEffect(() => {
//     const fetchDailyVisits = async () => {
//       try {
//         const response = await axios.get(`${apiURL}dailyVisits`);

//         setDailyVisits(response.data.visits);
//       } catch (error) {
//         console.error("Error fetching daily visits:", error);
//       }
//     };

//     fetchDailyVisits();
//   }, []);

//   useEffect(() => {
//     toast.dismiss();
//   }, []);

//   useEffect(() => {
//     setProfit(1234.56);
//     setProfitChange(10);
//   }, []);

//   const calculatePercentage = () => {
//     console.log("totnee", totalUsers);
//     console.log("utotnee", usersAddedToday);
//     if (totalUsers === 0) return 0;
//     return ((usersAddedToday / totalUsers) * 100).toFixed(2);
//   };
//   // const addUser = async () => {
//   //   try {
//   //     const newUser = {
//   //       /* user data */
//   //     };
//   //     await axios.post(`${apiURL}clients/${ownerId}/add`, newUser);
//   //     setUsersAddedToday(usersAddedToday + 1);
//   //     setTotalUsers(totalUsers + 1);
//   //   } catch (error) {
//   //     console.error("Error adding user:", error);
//   //   }
//   // };

//   const cardClass = "bg-white rounded-lg p-4 flex flex-col gap-2";

//   return loader ? (
//     <Spinner />
//   ) : (
//     <div className="px-4 py-6" onClick={() => dispatch(makeInvisible(false))}>
//       <div className="flex flex-col gap-5">
//         <div className="flex flex-col md:flex-row gap-5">
//           <div className="w-full md:w-9/12 bg-white rounded-lg">
//             <div className="bg-white rounded-xl p-4">
//               <div className="flex flex-col lg:flex-row">
//                 <div className="flex mx-auto flex-col gap-6 mt-2 w-full lg:w-1/2">
//                   <span className="text-purple-400 font-medium text-xl">
//                     Welcome{" "}
//                     <span className="text-xl ">{role ? role : userName}🎉</span>
//                   </span>
//                   <span className="opacity-65">
//                     You have done
//                     <span className="font-semibold leading-3">
//                       {" "}
//                       {todayPercentage}%{" "}
//                     </span>{" "}
//                     more sales today. Check your new badge in your profile.
//                   </span>
//                   <Link to={"/dashboard/traineeform"}>
//                     <span className="w-full lg:w-3/12 py-2 px-1 border-2 border-purple-300 text-purple-400 hover:bg-purple-600 text-center hover:text-white rounded-md duration-500">
//                       Add Members
//                     </span>
//                   </Link>
//                 </div>
//                 <img
//                   src={require("../../images/illustrations/man-with-laptop-light.png")}
//                   className="w-20 h-30 lg:w-4/12 self-center"
//                   alt="Man with laptop"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="w-full md:w-4/12 flex flex gap-3">
//             <div className={cardClass} style={{ width: "50%" }}>
//               <div className="flex items-center justify-between">
//                 <img
//                   src={require("../../images/icons/unicons/chart-success.png")}
//                   className="w-10"
//                   alt="Chart Success"
//                 />
//                 <BsThreeDotsVertical />
//               </div>
//               <Link to={"/dashboard/tables"}>
//                 <h2 className="text-lg">Members</h2>
//               </Link>
//               <span className="text-2xl font-medium opacity-65">
//                 {noOfUsers?.length}
//               </span>
//               <span className="text-green-400">0%</span>
//             </div>
//             <div className={cardClass} style={{ width: "50%" }}>
//               <div className="flex justify-between items-center">
//                 <img
//                   src={require("../../images/icons/unicons/cc-primary.png")}
//                   className="w-10"
//                   alt="CC Primary"
//                 />
//                 <BsThreeDotsVertical />
//               </div>
//               <Link to={"/dashboard/salescard"}>
//                 <h2 className="text-lg">Sales</h2>
//               </Link>
//               <span className="text-2xl font-medium opacity-65">0</span>
//               <span className="text-green-400">0%</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-7">
//           <div className="bg-white w-full lg:w-8/12 rounded-lg p-4">
//             <Dashboard />
//           </div>
//           <div className="w-full lg:w-4/12 flex flex-col gap-5">
//             <div className="flex flex-col md:flex-row gap-5">
//               <div className={`w-full md:w-1/2 ${cardClass}`}>
//                 <div className="flex items-center justify-between">
//                   <img
//                     src={require("../../images/icons/unicons/cc-success.png")}
//                     className="w-10"
//                     alt="CC Success"
//                   />
//                   <BsThreeDotsVertical />
//                 </div>
//                 <Link to={"/dashboard/notifications"}>
//                   <h2 className="text-lg text-shadow-md">Notifications</h2>
//                 </Link>
//                 <span className="text-2xl font-medium opacity-65">
//                   {expiredUserCount}
//                 </span>
//                 <span className="text-green-400">0%</span>
//               </div>
//               <div className={`w-full md:w-1/2 ${cardClass}`}>
//                 <div className="flex justify-between items-center">
//                   <img
//                     src={require("../../images/icons/unicons/paypal.png")}
//                     className="w-10"
//                     alt="Paypal"
//                   />
//                   <BsThreeDotsVertical />
//                 </div>
//                 <Link to={"/dashboard/transactioncard"}>
//                   <h2 className="text-lg">New Members</h2>
//                 </Link>
//                 <span className="text-2xl font-medium opacity-65">0</span>
//                 <span className="text-red-400">0%</span>
//               </div>
//             </div>
//             <div className={cardClass}>
//               <div className="flex justify-between items-center">
//                 <img
//                   src={require("../../images/icons/unicons/chart.png")}
//                   className="w-10"
//                   alt="Profit icon"
//                 />
//                 <BsThreeDotsVertical />
//               </div>
//               <h2 className="text-lg">Profit Report</h2>
//               <div className="flex justify-between">
//                 <span className="text-xl font-medium">Total Profit:</span>
//                 <span className="text-xl font-medium">
//                   ₹{profit.toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-base opacity-65">Change:</span>
//                 <span
//                   className={
//                     profitChange > 0 ? "text-green-500" : "text-red-500"
//                   }
//                 >
//                   {profitChange}%
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex flex-col lg:flex-row gap-7">
//           <OrderStatistics userData={userData} />
//           <FinanceStatistics />
//           <TransactionsList />
//         </div>
//       </div>
//       {role === "Admin" && (
//         <div className="w-full flex justify-center items-center py-4">
//           <div className="relative impressive-background text-white py-0 px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40 w-full rounded-md shadow-md text-center">
//             <div className="absolute -inset-0.5 impressive-background opacity-50 rounded-md"></div>
//             <div className="relative z-10">
//               {" "}
//               <br />
//               <h3 className="text-lg font-semibold">
//                 Number of Daily Visits:{" "}
//               </h3>
//               <p className="text-2xl font-bold">{dailyVisits}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;

// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { makeInvisible } from "../redux/TemplateSlice";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import axios from "axios"; // Added axios import for data fetching
// import { apiURL } from "../utils/commonData"; // Adjust the import path as necessary
// import Dashboard from "./Dashboard";
// import OrderStatistics from "./OrderStatistics";
// import FinanceStatistics from "./FinanceStatistics";
// import {Spinner} from "../Spinner";
// import TransactionsList from "./TransactionsList";

// export const Navbar = () => {
//   const [loader, setLoader] = useState(false);
//   const dispatch = useDispatch();
//   const userName = useSelector((state) => state.user.userData.name);
//   const role = useSelector((state) => state?.user?.userData?.role);
//   const noOfUsers = useSelector((state) => state.client.client);
//   const expiredUserCount = useSelector((state) => state.client.expiredUserCount);
//   const ownerId = useSelector((state) => state.user.userData?._id); // Adjust according to your store structure
//   const [userData, setUserData] = useState([]);
//   const [profit, setProfit] = useState(0);
//   const [profitChange, setProfitChange] = useState(0);

//   // Fetch user data when the component mounts
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(`${apiURL}clients/${ownerId}`);
//         setUserData(response.data.message);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     if (ownerId) {
//       fetchUserData();
//     }
//   }, [ownerId]);

//   useEffect(() => {
//     toast.dismiss();
//   }, []);

//   useEffect(() => {
//     // Replace with your logic to fetch profit data from API, Redux, etc.
//     setProfit(1234.56); // Example data
//     setProfitChange(10); // Example data
//   }, []);

//   const cardClass = "bg-white rounded-lg p-2 flex flex-col gap-2";

//   return loader?<Spinner/>:(
//     <div className="" onClick={() => dispatch(makeInvisible(false))}>
//       <div className="flex flex-col gap-5">
//         <div className="flex gap-7">
//           <div className="w-9/12 bg-white rounded-lg">
//             <div className="bg-white rounded-xl p-2">
//               <div className="flex">
//                 <div className="flex mx-auto flex-col gap-6 mt-2 w-1/2">
//                   <span className="text-purple-400 font-medium text-xl">
//                     Welcome <span className="text-xl ">{role ? role : userName}🎉</span>
//                   </span>
//                   <span className="opacity-65">
//                     You have done
//                     <span className="font-semibold leading-3"> 0% </span> more
//                     sales today. Check your new badge in your profile.
//                   </span>
//                   <Link to={"/dashboard/traineeform"}>
//                     <span className="w-3/12 py-2 px-1 border-2 border-purple-300 text-purple-400 hover:bg-purple-600 text-center hover:text-white rounded-md duration-500">
//                       Add Members
//                     </span>
//                   </Link>
//                 </div>
//                 <img
//                   src={require("../../images/illustrations/man-with-laptop-light.png")}
//                   className="w-20 h-30 lg:w-4/12 self-center"
//                 />
//               </div>
//             </div>
//           </div>
//           <div className={`w-2/12 ${cardClass}`}>
//             <div className="flex items-center justify-between">
//               <img
//                 src={require("../../images/icons/unicons/chart-success.png")}
//                 className="w-10"
//               />
//               <BsThreeDotsVertical />
//             </div>
//             <Link to={"/dashboard/tables"}>
//               <h2 className="text-lg">Members</h2>
//             </Link>
//             <span className="text-2xl font-medium opacity-65">{noOfUsers?.length}</span>
//             <span className="text-green-400">0%</span>
//           </div>
//           <div className={`w-2/12 ${cardClass}`}>
//             <div className="flex justify-between items-center">
//               <img
//                 src={require("../../images/icons/unicons/cc-primary.png")}
//                 className="w-10"
//               />
//               <BsThreeDotsVertical />
//             </div>
//             <Link to={"/dashboard/salescard"}>
//               <h2 className="text-lg">Sales</h2>
//             </Link>
//             <span className="text-2xl font-medium opacity-65">0</span>
//             <span className="text-green-400">0%</span>
//           </div>
//         </div>
//         <div className="flex gap-7" style={{ height: '100%' }}>
//           <div className="bg-white w-8/12 rounded-lg p-4 flex-grow">
//             <Dashboard />
//           </div>
//           <div className="w-4/12 flex flex-col gap-5 flex-grow">
//             <div className="flex gap-5">
//               <div className={`w-1/2 ${cardClass}`}>
//                 <div className="flex items-center justify-between">
//                   <img
//                     src={require("../../images/icons/unicons/cc-success.png")}
//                     className="w-10"
//                   />
//                   <BsThreeDotsVertical />
//                 </div>
//                 <Link to={"/dashboard/notifications"}>
//                   <h2 className="text-lg text-shadow-md">Notifications</h2>
//                 </Link>
//                 <span className="text-2xl font-medium opacity-65">{expiredUserCount}</span>
//                 <span className="text-green-400">0%</span>
//               </div>
//               <div className={`w-1/2 ${cardClass}`}>
//                 <div className="flex justify-between items-center">
//                   <img
//                     src={require("../../images/icons/unicons/paypal.png")}
//                     className="w-10"
//                   />
//                   <BsThreeDotsVertical />
//                 </div>
//                 <Link to={"/dashboard/transactioncard"}>
//                   <h2 className="text-lg">New Members</h2>
//                 </Link>
//                 <span className="text-2xl font-medium opacity-65">0</span>
//                 <span className="text-red-400">0%</span>
//               </div>
//             </div>
//             <div className={`flex-grow ${cardClass}`}>
//               <div className="flex justify-between items-center">
//                 <img
//                   src={require("../../images/icons/unicons/chart.png")}
//                   className="w-10"
//                   alt="Profit icon"
//                 />
//                 <BsThreeDotsVertical />
//               </div>
//               <h2 className="text-lg">Profit Report</h2>
//               <div className="flex justify-between">
//                 <span className="text-xl font-medium">Total Profit:</span>
//                 <span className="text-xl font-medium">₹{profit.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-base opacity-65">Change:</span>
//                 <span className={profitChange > 0 ? "text-green-500" : "text-red-500"}>
//                   {profitChange}%
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="flex gap-7" style={{ height: '100%' }}>
//           <OrderStatistics userData={userData} />
//           <FinanceStatistics />
//           <TransactionsList />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { makeInvisible } from "../redux/TemplateSlice";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import Dashboard from "./Dashboard";
// import { useState } from "react";

// export const Navbar = () => {
//   const dispatch = useDispatch();
//   const userName = useSelector((state) => state.user.userData.name);
//   const role = useSelector((state) => state?.user?.userData?.role);
//   const noOfUsers = useSelector((state) => state.client.client);
//   const expiredUserCount = useSelector((state)=>state.client.expiredUserCount);
//   const [profit, setProfit] = useState(0);
//   const [profitChange, setProfitChange] = useState(0);

//   useEffect(()=>{
//     toast.dismiss();
//   },[]);
//   useEffect(() => {
//     // Replace with your logic to fetch profit data from API, Redux, etc.
//     setProfit(1234.56); // Example data
//     setProfitChange(10); // Example data
//   }, []);

//   return (
//     <div className="" onClick={()=>dispatch(makeInvisible(false))}>
//       <table className="flex flex-col gap-5">
//         <tr className="flex gap-7">
//           <td className="w-8/12 bg-white rounded-lg">
//             <div className="bg-white rounded-xl p-2">
//               <div className="flex">
//                 <div className="flex mx-auto flex-col gap-6 mt-2 w-1/2">
//                   <span className="text-purple-400 font-medium text-xl">
//                     Welcome <span className="text-xl ">{role ? role : userName}🎉</span>
//                   </span>
//                   <span className="opacity-65">
//                     You have done
//                     <span className="font-semibold leading-3"> 0% </span> more
//                     sales today. Check your new badge in your profile.
//                   </span>
//                   <Link to={"/dashboard/traineeform"}>
//                     <span className="w-3/12 py-2 px-1 border-2 border-purple-300 text-purple-400 hover:bg-purple-600 text-center hover:text-white rounded-md duration-500">
//                       Add Members
//                     </span>
//                   </Link>
//                 </div>

//                 <img
//                   src={require("../../images/illustrations/man-with-laptop-light.png")}
//                   className="w-20 h-30 lg:w-4/12 self-center"
//                 />
//               </div>
//             </div>
//           </td>
//           <td className="w-2/12 bg-white rounded-lg p-2">
//             <div className="flex flex-col gap-2">
//               <div className="flex items-center justify-between">
//                 <img
//                   src={require("../../images/icons/unicons/chart-success.png")}
//                   className="w-10"
//                 />
//                 <BsThreeDotsVertical />
//               </div>
//               <Link to={"/dashboard/tables"}>
//                 <h2 className="text-lg">Members</h2>
//               </Link>
//               <span className="text-2xl font-medium opacity-65">{noOfUsers?.length}</span>
//               <span className="text-green-400">0%</span>
//             </div>
//           </td>
//           <td className="w-2/12 bg-white rounded-lg p-2">
//             <div className="flex flex-col gap-2">
//               <div className="flex justify-between items-center">
//                 <img
//                   src={require("../../images/icons/unicons/cc-primary.png")}
//                   className="w-10"
//                 />
//                 <BsThreeDotsVertical />
//               </div>
//               <Link to={"/dashboard/salescard"}>
//                 <h2 className="text-lg">Sales</h2>
//               </Link>
//               <span className="text-2xl font-medium opacity-65">0</span>
//               <span className="text-green-400">0%</span>
//             </div>
//           </td>
//         </tr>
//         <tr className="flex gap-7">
//           <td rowSpan="2" className="bg-white w-8/12 rounded-lg p-4 h-65 ">
//             <Dashboard />
//           </td>
//           <td className="w-2/12 bg-white rounded-lg p-2 h-1/3 flex flex-col gap-2">
//             <div className="flex flex-col gap-2">
//               <div className="flex items-center justify-between">
//                 <img
//                   src={require("../../images/icons/unicons/cc-success.png")}
//                   className="w-10"
//                 />
//                 <BsThreeDotsVertical />
//               </div>
//               <Link to={"/dashboard/notifications"}>
//                 <h2 className="text-lg text-shadow-md">Notifications</h2>
//               </Link>
//               <span className="text-2xl font-medium opacity-65">{expiredUserCount}</span>
//               <span className="text-green-400">0%</span>
//             </div>
//           </td>
//           <td className="w-2/12 bg-white rounded-lg p-2 h-1/3 flex flex-col gap-2">
//             <div className="flex flex-col gap-2">
//               <div className="flex justify-between items-center">
//                 <img
//                   src={require("../../images/icons/unicons/paypal.png")}
//                   className="w-10"
//                 />
//                 <BsThreeDotsVertical />
//               </div>
//               <Link to={"/dashboard/transactioncard"}>
//                 <h2 className="text-lg">New Members</h2>
//               </Link>
//               <span className="text-2xl font-medium opacity-65">0</span>
//               <span className="text-red-400">0%</span>
//             </div>
//           </td>
//         </tr>
//         <tr className="flex gap-7">
//           <td className="w-2/12 bg-white rounded-lg p-2 h-1/3 flex flex-col gap-2" colSpan="2">
//             <div className="flex flex-col gap-2">
//               <div className="flex justify-between items-center">
//                 <img
//                   src={require("../../images/icons/unicons/chart.png")}
//                   className="w-10"
//                   alt="Profit icon"
//                 />
//                 <BsThreeDotsVertical />
//               </div>
//               <h2 className="text-lg">Profit Report</h2>
//               <div className="flex justify-between">
//                 <span className="text-xl font-medium">Total Profit:</span>
//                 <span className="text-xl font-medium">₹{profit.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-base opacity-65">Change:</span>
//                 <span className={profitChange > 0 ? "text-green-500" : "text-red-500"}>
//                   {profitChange}%
//                 </span>
//               </div>
//             </div>
//           </td>
//         </tr>
//       </table>
//     </div>
//   );
// };
