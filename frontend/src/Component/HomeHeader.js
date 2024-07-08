import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "./utils/isLoggedIn";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { Spinner } from "./Spinner"; // Import Spinner

const HomeHeader = ({ show, setShow }) => {
  const [loading, setLoading] = useState(false); // State to control loader visibility
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setLoading(true); // Show loader
    setTimeout(() => {
      setLoading(false); // Hide loader before navigation
      navigate(path); // Navigate to the desired path
    }, 10); // Adjust the delay as needed
  };

  return (
    <header className="header-section">
      <div className="container flex items-center mt-4">
        <Link to={"/"} className="">
          <img src="img/logo.png" alt="logo" className="logo w-2/6" />
        </Link>
        <div className="nav-menu">
          <nav className="mainmenu text-white">
            <ul className="flex">
              <Link to={"/contact"}>
                <li className="">Contacts</li>
              </Link>
            </ul>
          </nav>
        </div>
        <div id="mobile-menu-wrap">
          <div className="nav-menu flex flex-col">
            <span
              onClick={(e) => {
                e.stopPropagation();
                setShow(!show);
              }}
              className="font-bold text-xl text-white self-end"
            >
              {!show ? <GiHamburgerMenu /> : <RxCross2 />}
            </span>
            {show && (
              <nav className="text-white">
                <ul>
                  <Link to={"/contact"}>
                    <li className="">Contacts</li>
                  </Link>
                </ul>
              </nav>
            )}
          </div>
        </div>
        {isLoggedIn() ? (
          <button
            onClick={() => handleNavigation("/dashboard/navbar")}
            className="primary-btn signup-btn rounded-lg ml-4"
          >
            Dashboard
          </button>
        ) : (
          <button
            onClick={() => handleNavigation("/login")}
            className="primary-btn signup-btn rounded-lg ml-4"
          >
            LogIn
          </button>
        )}
      </div>
    </header>
  );
};

export { HomeHeader };

// import { Link, useNavigate } from "react-router-dom";
// import { isLoggedIn } from "./utils/isLoggedIn";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { RxCross2 } from "react-icons/rx";
// import { useState } from "react";
// import { Spinner } from "./Spinner";

// const HomeHeader = ({show,setShow}) => {

//   const [loading, setLoading] = useState(false); // State to control loader visibility
//   const navigate = useNavigate();

//   const handleNavigation = (path) => {
//     setLoading(true); // Show loader
//     setTimeout(() => {
//       setLoading(false);
//       navigate(path); // Navigate after a delay (simulating an operation like data fetching) // Hide loader (optional, as navigating away will unmount the component)
//     }, 2000); // Adjust the delay as needed
//   };

//   return (
//     <header className="header-section">
//       <div className="container flex items-center mt-4">
//         <Link to={"/"} className="">
//           <img src="img/logo.png" alt="" className="logo w-2/6" />
//         </Link>
//         <div className="nav-menu">
//           <nav className="mainmenu text-white">
//             <ul className="flex">
//               <Link to={"/contact"}>
//                 <li className="">Contacts</li>
//               </Link>
//             </ul>
//           </nav>
//         </div>
//         <div id="mobile-menu-wrap">
//           <div className="nav-menu flex flex-col">
//             <span
//               onClick={(e) => {
//                 e.stopPropagation();
//                 setShow(!show);
//               }}
//               className=" font-bold text-xl text-white self-end"
//             >
//               {!show ? <GiHamburgerMenu /> : <RxCross2 />}
//             </span>
//             {show && (
//               <nav className=" text-white">
//                 <ul>
//                   <Link to={"/contact"}>
//                     <li className="">Contacts</li>
//                   </Link>
//                 </ul>
//               </nav>
//             )}
//           </div>
//         </div>
//         {isLoggedIn() ? (
//           <Link
//             to={"/dashboard/navbar"}
//             className="primary-btn signup-btn rounded-lg ml-4"
//           >
//             Dashboard
//           </Link>
//         ) : (
//           <Link
//             to={"/login"}
//             className="primary-btn signup-btn rounded-lg ml-4"
//           >
//             LogIn
//           </Link>
//         )}
//       </div>
//       {loading && <Spinner />}
//     </header>
//   );
// };

// export { HomeHeader };

// <Link to={"/"}>
//   <li className="">Home</li>
// </Link>;
// <Link to={"/aboutus"}>
//   <li className="">About</li>
// </Link>
// <Link to={"/classes"}>
//   <li className="">Classes</li>
// </Link>
// <Link to={"/blogs"}>
//   <li className="">Blog</li>
// </Link>

// <Link to={"/"}>
//     <li className="">Home</li>
//   </Link>
//   <Link to={"/aboutus"}>
//     <li className="">About</li>
//   </Link>
//   <Link to={"/classes"}>
//     <li className="">Classes</li>
//   </Link>
//   <Link to={"/blogs"}>
//     <li className="">Blog</li>
//   </Link>
