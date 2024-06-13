import { Link, useNavigate } from "react-router-dom";
import iconImage from "../images/logo.png";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUserData } from "./redux/UserSlice";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { Spinner } from "./Spinner";
import { apiURL } from "./utils/commonData";
import { IoClose } from "react-icons/io5";

export const Login = () => {
  const [loader, setLoader] = useState(false);
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [showEye, setShowEye] = useState(false);
  const selectorUser = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const loginUrl = `${apiURL}login`;

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const handleClose = () => {
    setTimeout(() => {
      setLoader(true);
      console.log("loader load");
      setLoader(false);
    }, 5000);
    navigate("/");
  };

  const changeHandle = (event) => {
    const { name, value } = event.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const LoginUser = async (data) => {
    setLoader(true);
    const realData = {
      email: data.email,
      password: data.password,
    };

    try {
      const savedRes = await axios.post(loginUrl, { ...realData });

      if (savedRes.status === 200) {
        const user = savedRes.data.user;
        dispatch(addUserData(user));
        sessionStorage.setItem("token", savedRes.data.user.token);
        navigate("/dashboard/navbar");
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
    return false;
  };

  const signInHandle = (e) => {
    e.preventDefault();
    try {
      if (!signInData.email || !signInData.password) {
        toast.warning("Please Fill All the details");
        throw new Error("some error");
      }

      LoginUser(signInData);
    } catch (err) {
      console.log(err.status);
    }
  };

  return loader ? (
    <Spinner />
  ) : (
    <div className="h-screen bg-slate-100 flex justify-center items-center relative overflow-hidden">
      <div className="sm:w-1/2 lg:w-1/3 xl:w-4/12 flex flex-col gap-5 rounded-lg bg-white p-5 w-10/12">
        <Link to={"/"} className="self-center">
          <img src={iconImage} className="w-1/2 mx-auto" alt="Logo" />
        </Link>
        <div className="flex flex-col gap-1 text-center">
          <span className="text-xl opacity-60 tracking-wide font-medium">
            Welcome to Member's Monitor!{" "}
            <span className="opacity-100 font-bold">👋</span>
          </span>
          <span className="opacity-60">
            Please sign-in to your account and start the adventure
          </span>
        </div>
        <form className="flex flex-col gap-2" onSubmit={signInHandle}>
          <label htmlFor="mailoruser">Email</label>
          <input
            type="text"
            name="email"
            id="mailoruser"
            value={signInData.email}
            placeholder="Enter your Email"
            className="border-2 p-2 rounded-md"
            onChange={changeHandle}
          />
          <div className="flex justify-between">
            <label htmlFor="pass">Password</label>
            <Link to={"/forgotpassword"} className="text-[#696cff]">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showEye ? "text" : "password"}
              id="pass"
              name="password"
              value={signInData.password}
              placeholder="Enter your Password"
              className="border-2 p-2 w-full rounded-md"
              onChange={changeHandle}
            />
            {showEye ? (
              <IoEyeOutline
                className="absolute right-3 top-3 text-[#696cff] cursor-pointer text-xl"
                onClick={() => setShowEye(!showEye)}
              />
            ) : (
              <FaRegEyeSlash
                className="absolute right-3 top-3 text-[#696cff] cursor-pointer text-xl"
                onClick={() => setShowEye(!showEye)}
              />
            )}
          </div>
          <div className="flex gap-3 font-light ml-5">
            <input
              type="checkbox"
              id="remember"
              className="w-4 rounded-md mt-0"
            />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <button className="bg-[#696cff] shadow-lg text-white p-2 rounded-lg font-bold">
            Sign In
          </button>
        </form>
        <div className="flex flex-col gap-2 font-light ml-4" id="leftshift">
          <span>New on our platform?</span>
          <Link to={"/signup"} className="text-[#696cff] font-bold">
            Create an account
          </Link>
        </div>
      </div>
      <button
        className="absolute top-5 right-5 text-4xl text-gray-500 hover:text-gray-700 cursor-pointer"
        onClick={handleClose}
      >
        <IoClose />
      </button>
      <ToastContainer />
    </div>
  );
};

// import { Link, useNavigate } from "react-router-dom";
// import iconImage from "../images/logo.png";
// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { addUserData } from "./redux/UserSlice";
// import { IoEyeOutline } from "react-icons/io5";
// import { FaRegEyeSlash } from "react-icons/fa";
// import { Spinner } from "./Spinner";
// import { apiURL } from "./utils/commonData";
// import { IoClose } from 'react-icons/io5'; // Example assuming you're using React Icons with IoClose from Ionicons 5

// export const Login = () => {
//   const [loader, setLoader] = useState(false);
//   const [signInData, setSignInData] = useState({
//     email: "",
//     password: "",
//   });
//   const [showEye, setshowEye] = useState(false);
//   const selectorUser = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const loginUrl = `${apiURL}login`;

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate fetching data or any pre-login operation
//     setTimeout(() => {
//       setLoader(false); // Stop the loader after data fetch or pre-login operations
//     }, 2000); // Example delay for 2 seconds
//   }, []);

//   const handleClose = () => {
//     setTimeout(() => {
//       setLoader(true);
//       console.log("loader load");
//       setLoader(false);
//     }, 5000);
//     navigate("/"); // Navigate to the home page
//   };

//   const changeHandle = (event) => {
//     const { name, type, value, checked } = event.target;
//     setSignInData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const LoginUser = async (data) => {
//     setLoader(true);
//     const realData = {
//       email: data.email,
//       password: data.password,
//     };

//     try {
//       const savedRes = await axios.post(loginUrl, { ...realData });
//       //adding the user information in the userSlice redux

//       if (savedRes.status === 200) {
//         const user = savedRes.data.user;
//         dispatch(addUserData(user));
//         sessionStorage.setItem("token", savedRes.data.user.token);
//         navigate("/dashboard/navbar");
//       }
//     } catch (err) {
//       toast.error(err.response?.data.message);
//     }
//     return false;
//   };

//   const signInHandle = (e) => {
//     e.preventDefault();
//     try {
//       if (!signInData.email || !signInData.password) {
//         toast.warning("Please Fill All the details");
//         throw new Error("some error");
//       }

//       //if all details are filled then it called LoginUser function
//       LoginUser(signInData);
//     } catch (err) {
//       console.log(err.status);
//     }
//   };

//   return loader?(
//     <Spinner/>
//   ) : (
//     <div className="h-screen bg-slate-100 flex justify-center items-center relative overflow-hidden">
//       {/* console.log("shubhamnikamsn007@gmail.com") */}
//       <div className="h-[90vh] sm:w-1/2 lg:w-1/3 xl:w-4/12 flex flex-col gap-5 rounded-lg bg-white p-5 relative w-10/12">
//         <Link to={"/"} className="">
//           <img src={iconImage} className="w-1/2 mx-auto" />
//         </Link>
//         <div className="flex flex-col gap-1">
//           <span className="text-xl opacity-60 tracking-wide font-medium">
//             Welcome to Member's Monitor!{" "}
//             <span className="opacity-100 font-bold">👋</span>
//           </span>
//           <span className="opacity-60">
//             Please sign-in to your account and start the adventure
//           </span>
//         </div>
//         <div className="flex flex-col gap-2">
//           <label htmlFor="mailoruser">Email</label>
//           <input
//             type="text"
//             name="email"
//             id="mailoruser"
//             value={signInData.email}
//             placeholder="Enter your Email"
//             className=" border-2 p-2 rounded-md"
//             onChange={changeHandle}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <div className="flex justify-between ">
//             <label htmlFor="pass">Password</label>
//             <Link to={"/forgotpassword"}>
//               <span className="cursor-pointer text-[#696cff] font-normal">
//                 Forgot Password?
//               </span>
//             </Link>
//           </div>
//           <div className="relative">
//             <input
//               type={showEye ? "text" : "password"}
//               id="pass"
//               name="password"
//               value={signInData.password}
//               placeholder="Enter your Password"
//               className="border-2 p-2 w-full rounded-md"
//               onChange={changeHandle}
//             />
//             {showEye ? (
//               <IoEyeOutline
//                 className="absolute right-3 top-3 text-[#696cff] cursor-pointer text-xl"
//                 onClick={() => setshowEye(!showEye)}
//               />
//             ) : (
//               <FaRegEyeSlash
//                 className="absolute right-3 top-3 text-[#696cff] cursor-pointer text-xl"
//                 onClick={() => setshowEye(!showEye)}
//               />
//             )}
//           </div>
//         </div>
//         <div className="flex gap-3 font-light ml-5 text-center p-0">
//           <input
//             type="checkbox"
//             id="remember"
//             className="w-4 rounded-md ml-5 mt-0"
//           />
//           <label htmlFor="remember" className="flex text-center p-0 mt-2">
//             Remember Me
//           </label>
//         </div>
//         <button
//           className="bg-[#696cff] shadow-lg text-white p-2 rounded-lg font-bold text-center "
//           onClick={signInHandle}
//         >
//           Sign In
//         </button>
//         <div classname="flex gap-2 p-5 rounded-lg font-bold text-center ml-4" id="leftshift">
//           <span className="text-center ml-5">
//             New on our platform?
//           </span>
//           <br />
//           <span className="cursor-pointer text-[#696cff] font-bold text-center ml-5">
//             <Link to={"/signup"}>Create an account</Link>
//           </span>
//         </div>
//       </div>
//       <button
//         className="absolute top-5 right-5 text-4xl text-gray-500 hover:text-gray-700 cursor-pointer"
//         onClick={handleClose}
//       >
//         <IoClose />
//       </button>

//       <ToastContainer />
//     </div>
//   );
// };

// <img src={iconImage} className="w-1/2 mx-auto" />;
