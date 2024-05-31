import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { apiURL } from "./utils/commonData";
import { makeInvisible } from "./redux/TemplateSlice";

const Setting = ()=>{
    const dispatch = useDispatch();

    // getting values from redux
    const user = useSelector((state)=>state.user.userData);
    const{email} = user;

    const[passwordData,setPasswordData] = useState({
        currpass:"",
        newpass:"",
        confirmpass:""
    });
    const resetPassword = async()=>{
        if(!passwordData.newpass.trim() || !passwordData.confirmpass.trim())
            return toast.warning("Please Fill All Fields")
        // console.log("the data we got ",passwordData);
        if(passwordData.newpass !== passwordData.confirmpass){
            return toast.error("password and confirm password does not match");
            
        }

        try{
            const result = await axios.put(`${apiURL}updatepassword`,{email,passwordData});

        if(result.data.success){
            return toast.success("password updated successfully");
        }
        
        throw new Error("something went wrong ");
        } catch(err){
            toast.error("Your Previous Password is Wrong Please Type Again")
        }
    }

    const handleChange = (e)=>{
        // extracting the data from event property 
        const{name,value} = e.target ;

        // updating the data inside the useState hook
        setPasswordData(()=>({
            ...passwordData,[name]: value 
        }));
    }

    useEffect(()=>{
        toast.dismiss();
    },[])
    return(
        <div className="flex flex-col gap-6 " onClick={()=>dispatch(makeInvisible(false))}>
            <div className="flex flex-col">
            <span className="self-center text-xl">Reset Your Password Here</span>
            <label>
                <p>Enter your previous Password</p>
                <input 
                type="password"
                name="currpass"
                className="border-2 p-2 rounded-md"
                onChange={handleChange}
                />
            </label>
            </div>
            <div>
            <label>
                <p>Enter your new Password</p>
                <input 
                type="password"
                name="newpass"
                className="border-2 p-2 rounded-md"
                onChange={handleChange}
                />
            </label>
            </div>
            <label>
                <p>Please confirm Your Password</p>
                <input 
                type="password"
                name="confirmpass"
                className="border-2 p-2 rounded-md"
                onChange={handleChange}
                />
            </label>
            <div className="flex flex-col">
            <Link to={"/forgotpassword"} className="self-end">
                <span className="cursor-pointer self-end text-[#696cff] font-normal">Forgot Password?</span>
            </Link>
            <button className="w-2/12 bg-[#696cff] shadow-lg text-white p-2 rounded-lg font-bold text-center" onClick={()=>resetPassword()}>Reset Password</button>
            </div>
            <ToastContainer/>
          </div>
    )
}
export {Setting};