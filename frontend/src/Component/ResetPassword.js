import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { apiURL } from "./utils/commonData";
import { makeInvisible } from "./redux/TemplateSlice";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const{email} = useParams();
    const navigate = useNavigate();
  const resetPassword = async () => {

    if(!confirmpassword.trim() || !password.trim()){
      return toast.warning("Please Fill All Details");
    }
    if (confirmpassword !== password ) {
      return toast.warning("Password and Confirm Password Does not match");
    }

    try {
      const resetPasswordResult = await axios.put(`${apiURL}resetpassword`, {
        confirmpassword,
        password,
        email
      });

      if(resetPasswordResult.data.success){
        toast.success("Update Password Successfully");
        navigate("/login");
      }
    } catch (err) {
      console.error("error we got is ",err.message);
    }
  };

  return (
    <div className="w-full h-screen bg-purple-300 flex justify-center items-center" onClick={()=>dispatch(makeInvisible(false))}>
      <div className="flex justify-center items-center bg-white p-4 shadow-lg rounded-lg flex-col gap-6">
        <h4>Please Reset Your Password</h4>
        <input
          placeholder="Enter Your Password"
          type="password" // Use type="password" for password fields
          className="border-2 border-slate-400 p-2 rounded-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Please Confirm password"
          type="password" // Use type="password" for password fields
          className="border-2 border-slate-400 p-2 rounded-sm"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          className="bg-[#696cff] font-medium px-4 py-2 rounded-sm text-white"
          onClick={resetPassword}
        >
          Reset Password
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export { ResetPassword };
