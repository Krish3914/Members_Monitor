import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { apiURL } from "./utils/commonData";
import { useDispatch } from "react-redux";
import {Spinner} from "./Spinner"

const EnterOtpToVerify = () => {
  const [shouldSpin,setShouldSpin] = useState(false);
  const location = useLocation();
  const realData = location.state.realData;
  const signupUrl = `${apiURL}signup`;
  const dispatch = useDispatch();
  const { email } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([useRef(), useRef(), useRef(), useRef()]);

  const verifyOTP = async () => {
    const enteredOtp = otp.join("");
    if(enteredOtp.length != 4)
      return toast.error("Please Fill All Otp Field")

    try {
      // console.log("email we got is ", email);
      setShouldSpin(!shouldSpin);
      const verifyOtpResult = await axios.post(`${apiURL}verifyemailotp`, {
        otp: enteredOtp,
        email,
      });

      // console.log("verifyOtpResult",verifyOtpResult);
      if (verifyOtpResult?.data?.success) {
       
        // console.log("Accessing Real Data inside the EnterOtpToVerify component",realData)
        const response = await axios.post(signupUrl,{...realData});
        setShouldSpin(!shouldSpin);
        navigate(`/login`);
      }
    } catch (err) {
        console.log(err.message);
      toast.error("Invalid Otp... Please Try Again")
    }
  };

  const changeHandle = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value === "") {
      // If the current input is cleared, move to the previous input
      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
      }
    } else if (index < inputRefs.current.length - 1) {
      // If a digit is entered, move to the next input
      inputRefs.current[index + 1].current.focus();
    }
  };

  const resendOTP = async () => {
    try {
      setShouldSpin(true);
      await axios.post(`${apiURL}resendotp`, { email });
      setShouldSpin(false);
      toast.success("OTP Resent Successfully");
    } catch (err) {
      setShouldSpin(false);
      console.log(err.message);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };
  // const resendOTP = async () => {
  //   try {
  //     setShouldSpin(true);
  //     await axios.post(`${apiURL}resendotp`, { email });
  //     setShouldSpin(false);
  //     toast.success("OTP Resent Successfully");
  //   } catch (err) {
  //     setShouldSpin(false);
  //     if (err.response && err.response.status === 404) {
  //       toast.error("Endpoint not found. Please check the URL.");
  //     } else {
  //       console.log(err.message);
  //       toast.error("Failed to resend OTP. Please try again.");
  //     }
  //   }
  // };

  useEffect(() => {
    toast.success("OTP Sent Successfully");
  }, []);

  return !{ shouldSpin } ? (
    <Spinner />
  ) : (
    <div className="w-full h-screen bg-purple-400 flex items-center justify-center">
      <div className="bg-white w-1/3 flex flex-col items-center gap-6 p-4 shadow-lg rounded-md">
        <div>Verify Your Email</div>
        <div>Your Code Was Sent To You Via Mail</div>
        <div className="flex w-full mx-auto gap-4 justify-center ">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              name={`otpf${index + 1}`}
              className="border-2 border-slate-500 py-2 px-1 w-1/6 text-center rounded-lg font-medium text-lg"
              maxLength="1"
              onInput={(e) =>
                changeHandle(index, e.target.value.replace(/[^0-9]/g, ""))
              }
              value={digit}
              ref={inputRefs.current[index]}
            />
          ))}
        </div>

        <button
          className="bg-[#696cff] py-2 px-4 rounded-lg shadow-lg font-medium text-white"
          onClick={verifyOTP}
        >
          Verify
        </button>
        <div>
          Didn't Receive Code{" "}
          <span className="text-[#696cff] cursor-pointer" onClick={resendOTP}>
             Send Again?
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export { EnterOtpToVerify };

//<Link to={"/forgotpassword"}>Send Again?</Link>
