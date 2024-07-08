
// import axios from "axios";
// import { useId, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Spinner } from "../../Spinner";
// import { apiURL } from "../../utils/commonData";
// import { makeInvisible } from "../../redux/TemplateSlice";

// export const Newadduser = () => {
//   // accessing user(Owners) id from the store
//   const dispatch = useDispatch();
//   const userId = useSelector((store) => store.user.userData?._id);
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     dob: "",
//     plan: "month",
//     phone: "",
//   });

//   const addTraineeurl = `${apiURL}addtrainee`;

//   const emptyForm = () => {
//     // console.log("inside the empty form");
//     setUserInfo({
//       name: "",
//       email: "",
//       dob: "",
//       plan: "month",
//       phone: "",
//     });
//   };

//   const createUser = async (data) => {
//     const realData = {
//       name: data.name,
//       email: data.email,
//       phone: data.phone,
//       dateOfBirth: data.dob,
//       gymPlan: data.plan,
//       owner: userId,
//     };

//     try {
//       // console.log("check data to be passed", realData);
//       const savedRes = await axios.post(addTraineeurl, { ...realData });
//       // console.log("server gives us this response ", savedRes);
//       if (savedRes.status !== 200) {
//         throw new Error(`Error with status response: ${savedRes.status}`);
//       }
//       toast.success("User Created Successfully");
//     } catch (err) {
//       // console.log(err);
//       toast.error("User Already Exists");
//     }
//     // console.log("calling empty form");
//     // console.log(userInfo);
//     emptyForm();
//     // console.log(userInfo);
//   };

//  const validatePhoneNumber = (phoneNumber) => {
//     // Enforces minimum 10 digits, maximum 13 digits, and "+" for lengths exceeding 10
//     const regex = /^((^\+)?[0-9]{10,13})$/;
//     return regex.test(phoneNumber);
// };


//   const clickHandle = (e) => {
//     e.preventDefault();
//     // console.log("printing userInfo ", userInfo);
//     if (
//       userInfo.name === undefined ||
//       userInfo?.email === undefined ||
//       userInfo.dob === undefined ||
//       userInfo?.plan === undefined ||
//       !validatePhoneNumber(userInfo.phone)
//     ) {
//       toast.warning("Please Fill Correct Details (Phone number 10-13 digits)");
//       return;
//     }
//     createUser(userInfo);
//   };

//   const changeHandle = (event) => {
//     const { name, value } = event.target;

//     setUserInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Function to format phone number for display (optional)
//   const formatPhoneNumber = (phoneNumber) => {
//     // You can use a library like react-phone-number-input for formatting
//     // This is a basic example for illustration
//     if (!phoneNumber) return "";
//     const firstThree = phoneNumber.slice(0, 3);
//     const nextThree = phoneNumber.slice(3, 6);
//     const lastFour = phoneNumber.slice(6);
//     return `(${firstThree}) <span class="math-inline">\{nextThree\}\-</span>{lastFour}`;
//   };


//   return !userId?(<Spinner/>):(
//     <form className="flex flex-col gap-4 bg-white rounded-lg w-9/12 p-4 justify-center my-10" onClick={()=>dispatch(makeInvisible(false))}>
//       <div className="flex gap-4">
//         <label htmlFor="name" className="my-auto">
//           Name
//         </label>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           placeholder="Name"
//           value={userInfo.name}
//           className="rounded p-2 w-7/12 border-2"
//           onChange={changeHandle}
//         />
//       </div>

//       <div className="flex gap-4">
//         <label htmlFor="phone" className="my-auto">
//           Contact Number
//         </label>
//         <input
//           id="phone"
//           name="phone"
//           type="number"
//           placeholder="1201402"
//           value={userInfo.phone}
//           className="rounded p-2 w-7/12 border-2"
//           onChange={changeHandle}
//         />
//       </div>

//       <div className="flex gap-4">
//         <label htmlFor="DOB" className="my-auto">
//           Date of Birth
//         </label>
//         <input
//           id="DOB"
//           name="dob"
//           type="date"
//           placeholder="Date of birth"
//           value={userInfo.dob}
//           className="rounded p-2 w-7/12 border-2"
//           onChange={changeHandle}
//         />
//       </div>

//       <div className="flex gap-4">
//         <label htmlFor="email" className="my-auto">
//           Email Address
//         </label>
//         <input
//           id="email"
//           name="email"
//           type="email"
//           placeholder="abc@gmail.com"
//           value={userInfo.email}
//           className="rounded p-2 w-7/12 border-2"
//           onChange={changeHandle}
//         />
//       </div>

//       <label htmlFor="gymplan">Select Gym Plan</label>
//       <select
//         className="w-1/3 p-2"
//         name="plan"
//         id="gymplan"
//         onChange={changeHandle}
//       >
//         <option value={"month"} >month</option>
//         <option value={"three months"}>three months</option>
//         <option value={"six months"}>six months</option>
//         <option value={"one year"}>one year</option>
//       </select>
//       <button
//         type="submit"
//         className="bg-blue-500 p-1 rounded w-1/12 text-white shadow-lg"
//         onClick={clickHandle}
//       >
//         Submit
//       </button>
//       <ToastContainer />
//     </form>
//   );
// };
import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from "../../Spinner";
import { apiURL } from "../../utils/commonData";
import { makeInvisible } from "../../redux/TemplateSlice";
import { countries } from 'countries-list';

export const Newadduser = () => {
  const dispatch = useDispatch();
  const userId = useSelector((store) => store.user.userData?._id);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    dob: "",
    plan: "month",
    phone: "",
    countryCode: "", 
    amount: "",// No default country code initially
  });
  const [selectedCountry, setSelectedCountry] = useState(null); // State variable to store the selected country object
  const [showCountryNames, setShowCountryNames] = useState(false); // State variable to track dropdown click

  const addTraineeurl = `${apiURL}addtrainee`;

  const emptyForm = () => {
    setUserInfo({
      name: "",
      email: "",
      dob: "",
      plan: "month",
      phone: "",
      countryCode: "",
      amount: "",
    });
  };

  const createUser = async (data) => {
    const realData = {
      name: data.name,
      email: data.email,
      phone: data.countryCode + data.phone,
      dateOfBirth: data.dob,
      gymPlan: data.plan,
      amount: data.amount,
      owner: userId,
    };

    try {
      const savedRes = await axios.post(addTraineeurl, { ...realData });
      if (savedRes.status !== 200) {
        throw new Error(`Error with status response: ${savedRes.status}`);
      }
      toast.success("User Created Successfully");
    } catch (err) {
      toast.error("User Already Exists");
    }
    emptyForm();
  };

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^((^\+)?[0-9]{10,13})$/;
    return regex.test(phoneNumber);
  };

  const countryOptions = Object.values(countries).map(country => ({
    code: `+${country.phone}`, // Add "+" before the country code
    name: country.name
  }));

  // Sort the countryOptions array based on country names
  countryOptions.sort((a, b) => a.name.localeCompare(b.name));

  const clickHandle = (e) => {
    e.preventDefault();
    if (
      userInfo.name === undefined ||
      userInfo?.email === undefined ||
      userInfo.amount === undefined ||
      userInfo.dob === undefined ||
      userInfo?.plan === undefined ||
      !validatePhoneNumber(userInfo.phone)
    ) {
      toast.warning("Please Fill Correct Details (Phone number 10-13 digits)");
      return;
    }
    createUser(userInfo);
  };

  const changeHandle = (event) => {
    const { name, value } = event.target;

    if (name === "countryCode") {
      const selectedCountry = countryOptions.find(country => country.code === value);
      setSelectedCountry(selectedCountry);
    }

    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return !userId ? (
    <Spinner />
  ) : (
    <form
      className="flex flex-col gap-4 bg-white rounded-lg w-9/12 p-4 justify-center my-10"
      onClick={() => dispatch(makeInvisible(false))}
    >
      <div className="flex gap-4">
        <label htmlFor="name" className="my-auto">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={userInfo.name}
          className="rounded p-2 w-7/12 border-2"
          onChange={changeHandle}
        />
      </div>

      <div className="flex gap-4">
        <label htmlFor="phone" className="my-auto">
          Contact Number
        </label>
        <div className="flex gap-2 items-center">
          <select
            id="countryCode"
            name="countryCode"
            value={userInfo.countryCode}
            className="rounded p-2 w-1/6 border-2 h-10" // Increased height of the dropdown box
            onChange={changeHandle}
            onClick={() => setShowCountryNames(true)} // Show country names on click
            onBlur={() => setShowCountryNames(false)} // Hide country names on blur
          >
            {selectedCountry ? (
              <option value={selectedCountry.code}>
                {selectedCountry.name} ({selectedCountry.code})
              </option>
            ) : (
              <option value="" disabled>
                Select Country
              </option>
            )}
            {showCountryNames &&
              countryOptions.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.name} ({country.code})
                </option>
              ))}
          </select>
          <input
            id="phone"
            name="phone"
            type="number"
            placeholder="1201402999"
            value={userInfo.phone}
            className="rounded p-2 w-7/12 border-2"
            onChange={changeHandle}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <label htmlFor="DOB" className="my-auto">
          Date of Birth
        </label>
        <input
          id="DOB"
          name="dob"
          type="date"
          placeholder="Date of birth"
          value={userInfo.dob}
          className="rounded p-2 w-7/12 border-2"
          onChange={changeHandle}
        />
      </div>

      <div className="flex gap-4">
        <label htmlFor="email" className="my-auto">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="abc@gmail.com"
          value={userInfo.email}
          className="rounded p-2 w-7/12 border-2"
          onChange={changeHandle}
        />
      </div>

      <label htmlFor="gymplan">Select Gym Plan</label>
      <select
        className="w-1/3 p-2"
        name="plan"
        id="gymplan"
        onChange={changeHandle}
      >
        <option value={"month"}>month</option>
        <option value={"three months"}>three months</option>
        <option value={"six months"}>six months</option>
        <option value={"one year"}>one year</option>
      </select>

      <div className="flex gap-4">
        <label htmlFor="phone" className="my-auto">
          Amount Paid
        </label>
        <div className="flex gap-2 items-center">
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="12000"
            value={userInfo.amount}
            className="rounded p-2 w-7/12 border-2"
            onChange={changeHandle}
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 p-1 rounded w-1/12 text-white shadow-lg"
        onClick={clickHandle}
      >
        Submit
      </button>
      <ToastContainer />
    </form>
  );
};
