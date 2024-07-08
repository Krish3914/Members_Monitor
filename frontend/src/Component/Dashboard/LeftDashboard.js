// import React, { useState } from "react";
// import {
//   FaChevronRight,
//   FaHome,
//   FaTable,
//   FaHeadset,
//   FaUserPlus,
//   FaQuestionCircle,
//   FaBars,
//   FaTimes,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import logopng from "../../images/logo.png";

// export const LeftDashboard = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="h-full lg:h-screen flex flex-col lg:flex-row">
//       {/* Sidebar */}
//       <div
//         className={`bg-white p-4 flex flex-col gap-4 h-full lg:h-auto lg:flex lg:flex-col lg:w-64 transition-transform duration-300 ease-in-out ${
//           isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//         }`}
//       >
//         <div className="flex justify-between items-center lg:block">
//           <Link to={"/"}>
//             <div className="flex self-start gap-2">
//               <img src={logopng} alt="Logo" className="h-10 w-auto" />
//             </div>
//           </Link>
//           <button className="lg:hidden text-gray-600" onClick={toggleSidebar}>
//             <FaTimes className="text-xl" />
//           </button>
//         </div>

//         <div className="text-gray-400 p-3 font-medium opacity-80 rounded-md flex flex-col gap-3">
//           <Link to={"navbar"} className="hover:text-gray-600 flex items-center">
//             <FaHome className="text-xl mr-4" />
//             <span>Dashboard</span>
//           </Link>
//         </div>

//         <div className="text-gray-400 p-3 font-medium opacity-80 rounded-md flex flex-col gap-3">
//           <Link
//             to={"/dashboard/traineeform"}
//             className="hover:text-gray-600 flex items-center"
//           >
//             <FaUserPlus className="text-xl mr-4" />
//             <span>Add User</span>
//           </Link>
//         </div>

//         <div className="text-gray-400 p-3 font-medium opacity-80 rounded-md flex items-center gap-3">
//           <Link
//             to={"/dashboard/tables"}
//             className="hover:text-gray-600 flex items-center w-full"
//           >
//             <FaTable className="text-xl mr-4" />
//             <span>Table</span>
//           </Link>
//         </div>

//         <div className="text-gray-400 p-3 font-medium opacity-80 rounded-md flex flex-col gap-3">
//           <Link
//             to={"/dashboard/support"}
//             className="hover:text-gray-600 flex items-center"
//           >
//             <FaHeadset className="text-xl mr-4" />
//             <span>Support</span>
//           </Link>
//         </div>

//         <div className="text-gray-400 p-3 font-medium opacity-80 rounded-md flex flex-col gap-3">
//           <Link
//             to={"/dashboard/FAQ"}
//             className="hover:text-gray-600 flex items-center"
//           >
//             <FaQuestionCircle className="text-xl mr-4" />
//             <span>FAQ</span>
//           </Link>
//         </div>
//       </div>

//       {/* Hamburger Menu */}
//       <div className="lg:hidden p-4">
//         <button className="text-gray-600" onClick={toggleSidebar}>
//           <FaBars className="text-2xl" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // export default LeftDashboard;

        // <div className="text-gray-400 p-3 font-medium opacity-80 rounded-md flex flex-col gap-3">
        //   <Link to={"navbar"} className="hover:text-blue-600 flex items-center">
        //     <FaHome className="text-xl mr-4" />
        //     <span>Dashboard</span>
        //   </Link>
        // </div>

        // <div className="text-gray-400 p-3 font-medium opacity-80 rounded-md flex flex-col gap-3">
        //   <Link
        //     to={"/dashboard/traineeform"}
        //     className="hover:text-blue-600 flex items-center"
        //   >
        //     <FaUserPlus className="text-xl mr-4" />
        //     <span>Add User</span>
        //   </Link>
        // </div>

        // <div className="text-gray-400 p-3 font-medium opacity-80 rounded-md flex items-center gap-3">
        //   <Link
        //     to={"/dashboard/tables"}
        //     className="hover:text-blue-600 flex items-center w-full"
        //   >
        //     <FaTable className="text-xl mr-4" />
        //     <span>Table</span>
        //   </Link>
        // </div>

        // <div className="text-gray-400 p-3 font-medium opacity-80 rounded-md flex flex-col gap-3">
        //   <Link
        //     to={"/dashboard/support"}
        //     className="hover:text-blue-600 flex items-center"
        //   >
        //     <FaHeadset className="text-xl mr-4" />
        //     <span>Support</span>
        //   </Link>
        // </div>

        // <div className="text-gray-400 p-3 font-medium opacity-80 rounded-md flex flex-col gap-3">
        //   <Link
        //     to={"/dashboard/FAQ"}
        //     className="hover:text-blue-600 flex items-center"
        //   >
        //     <FaQuestionCircle className="text-xl mr-4" />
        //     <span>FAQ</span>
        //   </Link>
        // </div>

import React, { useState } from "react";
import {
  FaChevronRight,
  FaHome,
  FaTable,
  FaHeadset,
  FaUserPlus,
  FaQuestionCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logopng from "../../images/logo.png";


export const LeftDashboard = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };
  return (
    <div className="bg-white p-6 flex flex-col gap-2 h-full lg:h-screen">
      <div className="flex flex-col gap-4">
        <Link to={"/"}>
          <div className="flex self-start gap-2">
            <img src={logopng} alt="Logo" className="h-25 w-auto" />
          </div>
        </Link>

        <div
          className={`text-gray-400 p-3 font-medium opacity-80 rounded-md flex flex-col gap-3 ${
            activeLink === "/navbar" ? "text-blue-600" : ""
          }`}
        >
          <Link
            to={"navbar"}
            className="flex items-center"
            onClick={() => handleLinkClick("/navbar")}
          >
            <FaHome className="text-xl mr-4" />
            <span>Dashboard</span>
          </Link>
        </div>

        <div
          className={`text-gray-400 p-3 font-medium opacity-80 rounded-md flex flex-col gap-3 ${
            activeLink === "/dashboard/traineeform" ? "text-blue-600" : ""
          }`}
        >
          <Link
            to={"/dashboard/traineeform"}
            className="flex items-center"
            onClick={() => handleLinkClick("/dashboard/traineeform")}
          >
            <FaUserPlus className="text-xl mr-4" />
            <span>Add User</span>
          </Link>
        </div>
        <div className={`text-gray-400 p-3 font-medium opacity-80 rounded-md flex items-center gap-3 ${activeLink === '/dashboard/tables' ? 'text-blue-600' : ''}`}>
          <Link to={"/dashboard/tables"} className="flex items-center w-full" onClick={() => handleLinkClick('/dashboard/tables')}>
            <FaTable className="text-xl mr-4" />
            <span>Table</span>
          </Link>
        </div>

        <div className={`text-gray-400 p-3 font-medium opacity-80 rounded-md flex flex-col gap-3 ${activeLink === '/dashboard/support' ? 'text-blue-600' : ''}`}>
          <Link to={"/dashboard/support"} className="flex items-center" onClick={() => handleLinkClick('/dashboard/support')}>
            <FaHeadset className="text-xl mr-4" />
            <span>Support</span>
          </Link>
        </div>

        <div className={`text-gray-400 p-3 font-medium opacity-80 rounded-md flex flex-col gap-3 ${activeLink === '/dashboard/FAQ' ? 'text-blue-600' : ''}`}>
          <Link to={"/dashboard/FAQ"} className="flex items-center" onClick={() => handleLinkClick('/dashboard/FAQ')}>
            <FaQuestionCircle className="text-xl mr-4" />
            <span>FAQ</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftDashboard;

// import { FaChevronRight } from "react-icons/fa";
// import { FaHome } from "react-icons/fa";
// import { FaTable } from "react-icons/fa";
// import { FaHeadset } from "react-icons/fa";
// import { FaUserPlus } from "react-icons/fa";
// import { FaQuestionCircle } from "react-icons/fa";
// import iconImage from "../../images/favicon/favicon.ico";
// import { Link } from "react-router-dom";
// import { Searchbar } from "../Searchbar";
// import logopng from "../../images/logo.png"

// export const LeftDashboard = () => {
//   return (
//     <>
//       <div className="bg-white p-4 flex flex-col gap-4 h-screen">
//         <div className="flex flex-col gap-2 ">
//           <Link to={"/"}>
//             {" "}
//             <div className="flex self-start gap-2 ">
//               <img src={logopng} />
//             </div>
//           </Link>

//           <div className="text-grey-400 p-3 font-medium opacity-80 rounded-md flex justify-between flex-col gap-3">
//             <Link
//               to={"navbar"}
//               className="hover:text-gray-600 display: inline-flex"
//             >
//               <FaHome
//                 style={{
//                   fontSize: "18px",
//                   marginRight: "15px",
//                   marginLeft: "5px",
//                   marginBottom: "5px",
//                   marginTop: "5px",
//                 }}
//               />
//               <div
//                 className="flex align-items:center"
//                 style={{ marginBottom: "5px", marginTop: "5px" }}
//               >
//                 Dashboard
//               </div>
//             </Link>
//           </div>

//           <div className="text-grey-400 p-3 font-medium opacity-80 rounded-md flex justify-between flex-col gap-3">
//             <Link
//               to={"/dashboard/traineeform"}
//               className="hover:text-gray-600 display: inline-flex"
//             >
//               <FaUserPlus
//                 style={{
//                   fontSize: "18px",
//                   marginRight: "15px",
//                   marginLeft: "5px",
//                   marginBottom: "5px",
//                   marginTop: "5px",
//                 }}
//               />
//               <div
//                 className="flex align-items:center"
//                 style={{ marginBottom: "5px", marginTop: "5px" }}
//               >
//                 Add User
//               </div>
//             </Link>
//           </div>
//           <div className="text-grey-400 p-3 font-medium opacity-80 rounded-md flex align-items:center gap-3">
//             <Link to={"/dashboard/tables"} className="hover:text-gray-600">
//               <div className="flex justify-between items-center cursor-pointer adduser">
//                 <FaTable
//                   style={{
//                     fontSize: "18px",
//                     marginRight: "15px",
//                     marginLeft: "5px",
//                     marginBottom: "5px",
//                     marginTop: "5px",
//                   }}
//                 />
//                 <div
//                   className="flex align-items:center"
//                   style={{ marginBottom: "5px", marginTop: "5px" }}
//                 >
//                   Table
//                 </div>
//               </div>
//             </Link>
//           </div>
//           <div className="text-grey-400 p-3 font-medium opacity-80 rounded-md flex justify-between flex-col gap-3">
//             <Link
//               to={"/dashboard/support"}
//               className="hover:text-gray-600 display: inline-flex items-center"
//             >
//               <FaHeadset
//                 style={{
//                   fontSize: "18px",
//                   marginRight: "15px",
//                   marginLeft: "5px",
//                   marginBottom: "5px",
//                   marginTop: "5px",
//                 }}
//               />
//               <div
//                 className="flex align-items:center"
//                 style={{ marginBottom: "5px", marginTop: "5px" }}
//               >
//                 Support
//               </div>
//             </Link>
//           </div>
//           <div className="text-grey-400 p-3 font-medium opacity-80 rounded-md flex justify-between flex-col gap-3">
//             <Link
//               to={"/dashboard/FAQ"}
//               className="hover:text-gray-600 display: inline-flex items-center"
//             >
//               <FaQuestionCircle
//                 style={{
//                   fontSize: "18px",
//                   marginRight: "15px",
//                   marginLeft: "5px",
//                   marginBottom: "5px",
//                   marginTop: "5px",
//                 }}
//               />
//               <div
//                 className="flex align-items:center"
//                 style={{ marginBottom: "5px", marginTop: "5px" }}
//               >
//                 FAQ
//               </div>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// <Link to={"navbar"}>
//   {" "}
//   <div className="flex self-start gap-2 ">
//     <img src={logopng} />
//   </div>
// </Link>;

//bg-indigo-100 text-blue-700 p-3 font-medium opacity-80 rounded-md flex align-items:center gap-3
