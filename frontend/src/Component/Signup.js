import { Link, useNavigate } from "react-router-dom";
import iconImage from "../images/logo.png";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { apiURL } from "./utils/commonData";
import isValidEmail from "./utils/validEmail";
import {Spinner} from "./Spinner"

export const Signup = () => {
  const [shouldSpin,setShouldSpin] = useState(false);
  const navigate = useNavigate();
  
  const [signupData, setsignUpData] = useState({
      uName:"",email:"",password:"",isAgreeTerms:false
  });

  const[showPassword,setshowPassword] = useState(false);

  const emptyInputs = ()=>{

    setsignUpData({
      uName:"",
      email:"",
      password:"",
      isAgreeTerms:false
    })
  }

  const createUser = async (data)=>{
    setShouldSpin(true);
    const realData = {
      name : data.uName,
     email : data.email,
     password : data.password,
     phone : 414120123,
     isAgreeTerms:data.isAgreeTerms
    }   
    
    try{
      const sentOTPMail = await axios.post(apiURL+"verify-mail",{email:realData.email});
      // console.log("sentOTPMail response is ",sentOTPMail);

      if(!sentOTPMail.data.success){
        return toast.error("Unable To Send Mail ...Please Try Again")
      }
      setShouldSpin(false);
      navigate(`/enterotptoverify/${realData.email}`,{state:{realData:realData}});

      
      // console.log(response);
      toast.success("Account Created Successfully");
      emptyInputs();
    } catch(error){
      toast.warning("Existing User");
      setShouldSpin(false);
      emptyInputs();
    }

  };

  const changeHandle = (event)=> {
    const {name,type,value,checked} = event.target;
    setsignUpData((prev)=>({
      ...prev,[name] : value
    })) 
  }

  const signupHandle = (e)=>{
    e.preventDefault();
    // console.log("signupData is ",signupData);

    if(!signupData.uName|| !signupData.password)
      return toast.warning("Please Fill All the details");
    
    if(!isValidEmail(signupData.email))
      return toast.warning("Email Is Not Valid");

    if(!signupData.isAgreeTerms)
      return toast.warning("Agree Our Terms And Policy");
    else{
      createUser(signupData);
    }
  }
  
  return shouldSpin?<Spinner/>:(
    <div className="h-screen bg-slate-100 flex justify-center  lg:items-center overflow-hidden">
      <form className="h-[90vh] sm:w-1/2 lg:w-1/3 xl:w-3/12 mt-4 flex flex-col gap-4 rounded-lg bg-white px-4 py-2 w-10/12">
          <img src={iconImage} className=" w-1/2 mx-auto"/>
        <div className="flex flex-col gap-1">
          <span className="text-xl opacity-80 tracking-wide font-medium">
            Adventure starts here 🚀
          </span>
          <span className="opacity-60">
            Make your Gym Management easy and fun!
          </span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">USERNAME</label>
          <input
            type="text"
            id="name"
            name="uName"
            placeholder="Enter your username"
            value={signupData.uName}
            className="border-2 p-2 rounded-md"
            onChange={changeHandle}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mail">Email</label>
          <input
            type="email"
            id="mail"
            name="email"
            placeholder="Enter your Email"
            value={signupData.email}
            className=" border-2 p-2 rounded-md"
            onChange={changeHandle}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="pass">Password</label>

          <div className="relative">
          <input
            type={!showPassword?"password":"text"}
            id="pass"
            name="password"
            value={signupData.password}
            placeholder="Enter your Password"
            className="border-2 p-2 rounded-md w-full" 
            onChange={changeHandle}
          />
          {showPassword?<IoEyeOutline className="absolute right-3 top-3 text-[#696cff] cursor-pointer text-xl" onClick={()=>setshowPassword(!showPassword)}/>:<FaRegEyeSlash className="absolute right-3 top-3 text-[#696cff] cursor-pointer text-xl" onClick={()=>setshowPassword(!showPassword)}/>}
      
          </div>

        </div>
        <div className="flex gap-2 font-light">
          <input value={signupData.isAgreeTerms} checked={signupData.isAgreeTerms} name="isAgreeTerms" type="checkbox" id="isAgreeTerms" className="w-4 rounded-md" onChange={changeHandle}/>
          <label htmlFor="isAgreeTerms">
            I agree to{" "}
            <span className="cursor-pointer text-[#696cff] font-bold">
              privacy policy & terms
            </span>{" "}
          </label>
        </div>
        <button className="bg-[#696cff] shadow-lg text-white p-2 rounded-lg font-bold text-center " onClick={signupHandle}>
          {" "}
          Sign Up
        </button>
        <div>
          Already have an account?{" "}
          <span className="cursor-pointer text-[#696cff] font-bold">
            <Link to={"/login"}>Sign in instead</Link>
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
