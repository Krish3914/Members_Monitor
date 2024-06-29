// import React, { useState } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Spinner } from "../../Spinner";
// import { apiURL } from "../../utils/commonData";
// import { makeInvisible } from "../../redux/TemplateSlice";
// import { countries } from "countries-list";

// export const Newadduser = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((store) => store.user.userData?._id);
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     dob: "",
//     plan: "month",
//     phone: "",
//     countryCode: "",
//     amount: "", // No default country code initially
//   });
//   const [selectedCountry, setSelectedCountry] = useState(null); // State variable to store the selected country object
//   const [showCountryNames, setShowCountryNames] = useState(false); // State variable to track dropdown click

//   const addTraineeurl = `${apiURL}addtrainee`;

//   const emptyForm = () => {
//     setUserInfo({
//       name: "",
//       email: "",
//       dob: "",
//       plan: "one month",
//       phone: "",
//       countryCode: "",
//       amount: "",
//     });
//   };

//   const createUser = async (data) => {
//     const realData = {
//       name: data.name,
//       email: data.email,
//       phone: data.countryCode + data.phone,
//       dateOfBirth: data.dob,
//       gymPlan: data.plan,
//       amount: data.amount,
//       owner: userId,
//     };

//     try {
//       const savedRes = await axios.post(addTraineeurl, { ...realData });
//       if (savedRes.status !== 200) {
//         throw new Error(`Error with status response: ${savedRes.status}`);
//       }
//       toast.success("User Created Successfully");
//     } catch (err) {
//       toast.error("User Already Exists");
//     }
//     emptyForm();
//   };

//   const validatePhoneNumber = (phoneNumber) => {
//     const regex = /^((^\+)?[0-9]{10,13})$/;
//     return regex.test(phoneNumber);
//   };

//   const validateDOB = (dob) => {
//     const currentDate = new Date();
//     const birthDate = new Date(dob);
//     let age = currentDate.getFullYear() - birthDate.getFullYear();
//     const monthDiff = currentDate.getMonth() - birthDate.getMonth();
//     const dayDiff = currentDate.getDate() - birthDate.getDate();

//     // Calculate exact age considering month and day
//     if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
//       age--;
//     }

//     if (birthDate > currentDate) {
//       return {
//         isValid: false,
//         message: "Date of birth cannot be in the future.",
//       };
//     }

//     if (age < 18) {
//       return { isValid: false, message: "User must be at least 18 years old." };
//     }

//     return { isValid: true };
//   };

//   const countryOptions = Object.values(countries).map((country) => ({
//     code: `+${country.phone}`, // Add "+" before the country code
//     name: country.name,
//   }));

//   // Sort the countryOptions array based on country names
//   countryOptions.sort((a, b) => a.name.localeCompare(b.name));

//   const clickHandle = (e) => {
//     e.preventDefault();
//     const dobValidation = validateDOB(userInfo.dob);
//     if (
//       userInfo.name === undefined ||
//       userInfo?.email === undefined ||
//       userInfo.amount === undefined ||
//       userInfo.dob === undefined ||
//       userInfo?.plan === undefined ||
//       !validatePhoneNumber(userInfo.phone)
//     ) {
//       toast.warning("Please Fill Correct Details (Phone number 10-13 digits)");
//       return;
//     }

//     if (!dobValidation.isValid) {
//       toast.warning(dobValidation.message);
//       return;
//     }

//     createUser(userInfo);
//   };

//   const changeHandle = (event) => {
//     const { name, value } = event.target;

//     if (name === "countryCode") {
//       const selectedCountry = countryOptions.find(
//         (country) => country.code === value
//       );
//       setSelectedCountry(selectedCountry);
//     }

//     setUserInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return !userId ? (
//     <Spinner />
//   ) : (
//     <form
//       className="flex flex-col gap-4 bg-white rounded-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2 p-4 mx-auto my-10"
//       onClick={() => dispatch(makeInvisible(false))}
//     >
//       <div className="flex flex-col md:flex-row gap-4">
//         <label htmlFor="name" className="md:w-1/4 my-auto">
//           Name
//         </label>
//         <input
//           id="name"
//           name="name"
//           type="text"
//           placeholder="Name"
//           value={userInfo.name}
//           className="rounded p-2 w-full md:w-3/4 border-2"
//           onChange={changeHandle}
//         />
//       </div>

//       <div className="flex flex-col md:flex-row gap-4">
//         <label htmlFor="phone" className="md:w-1/4 my-auto">
//           Contact Number
//         </label>
//         <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-3/4">
//           <select
//             id="countryCode"
//             name="countryCode"
//             value={userInfo.countryCode}
//             className="rounded p-2 w-full md:w-1/4 border-2"
//             onChange={changeHandle}
//             onClick={() => setShowCountryNames(true)} // Show country names on click
//             onBlur={() => setShowCountryNames(false)} // Hide country names on blur
//           >
//             {selectedCountry ? (
//               <option value={selectedCountry.code}>
//                 {selectedCountry.name} ({selectedCountry.code})
//               </option>
//             ) : (
//               <option value="" disabled>
//                 Select Country
//               </option>
//             )}
//             {showCountryNames &&
//               countryOptions.map((country, index) => (
//                 <option key={index} value={country.code}>
//                   {country.name} ({country.code})
//                 </option>
//               ))}
//           </select>
//           <input
//             id="phone"
//             name="phone"
//             type="number"
//             placeholder="1201402999"
//             value={userInfo.phone}
//             className="rounded p-2 w-full md:w-3/4 border-2"
//             onChange={changeHandle}
//           />
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4">
//         <label htmlFor="DOB" className="md:w-1/4 my-auto">
//           Date of Birth
//         </label>
//         <input
//           id="DOB"
//           name="dob"
//           type="date"
//           placeholder="Date of birth"
//           value={userInfo.dob}
//           className="rounded p-2 w-full md:w-3/4 border-2"
//           onChange={changeHandle}
//         />
//       </div>

//       <div className="flex flex-col md:flex-row gap-4">
//         <label htmlFor="email" className="md:w-1/4 my-auto">
//           Email Address
//         </label>
//         <input
//           id="email"
//           name="email"
//           type="email"
//           placeholder="abc@gmail.com"
//           value={userInfo.email}
//           className="rounded p-2 w-full md:w-3/4 border-2"
//           onChange={changeHandle}
//         />
//       </div>

//       <label htmlFor="gymplan">Select Gym Plan</label>
//       <select
//         className="w-full md:w-1/3 p-2 border-2 rounded"
//         name="plan"
//         id="gymplan"
//         value={userInfo.plan}
//         onChange={changeHandle}
//       >
//         <option value={"one month"}>One Month</option>
//         <option value={"three months"}>Three Months</option>
//         <option value={"six months"}>Six Months</option>
//         <option value={"one year"}>One Year</option>
//       </select>

//       <div className="flex flex-col md:flex-row gap-4">
//         <label htmlFor="amount" className="md:w-1/4 my-auto">
//           Amount Paid
//         </label>
//         <div className="flex gap-2 items-center w-full md:w-3/4">
//           <input
//             id="amount"
//             name="amount"
//             type="number"
//             placeholder="12000"
//             value={userInfo.amount}
//             className="rounded p-2 w-full border-2"
//             onChange={changeHandle}
//           />
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-500 p-2 rounded w-full md:w-1/4 text-white shadow-lg"
//         onClick={clickHandle}
//       >
//         Submit
//       </button>
//       <ToastContainer />
//     </form>
//   );
// };

// export default Newadduser;



import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "../../Spinner";
import { apiURL } from "../../utils/commonData";
import { makeInvisible } from "../../redux/TemplateSlice";
import { addSingleClient } from "../../redux/clientSlice";
import { countries } from "countries-list";

export const Newadduser = () => {
  const userId = useSelector((store) => store.user.userData?._id);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    dob: "",
    plan: "one month",
    phone: "",
    countryCode: "",
    amount: "",
    addedDate: new Date(),
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showCountryNames, setShowCountryNames] = useState(false);

  const addTraineeurl = `${apiURL}addtrainee`;

  const emptyForm = () => {
    setUserInfo({
      name: "",
      email: "",
      dob: "",
      plan: "one month",
      phone: "",
      countryCode: "",
      amount: "",
      addedDate: new Date(),
    });
  };

  // const createUser = async (data) => {
  //   const realData = {
  //     ...data,
  //     // name: data.name,
  //     //     dateOfBirth: data.dateOfBirth,
  //     //     email: data.email,
  //     //     gymPlan: data.gymPlan,
  //     //     amount: data.amount,
  //     //     phone: data.phone,
  //     //     addedDate: currentDate,
  //     phone: `${data.countryCode}${data.phone}`,
  //     owner: userId,
  //     addedDate: new Date(),
  //     registrationDate: new Date(),
  //   };

  //   try {
  //     const savedRes = await axios.post(addTraineeurl, realData);
  //     if (savedRes.status !== 200) {
  //       throw new Error(`Error with status response: ${savedRes.status}`);
  //       console.log("!=200");
  //     }
  //     console.log("!=200");
  //     toast.success("User Created Successfully");
  //     dispatch(addSingleClient(savedRes.data.message));
  //     emptyForm();
  //   } catch (err) {
  //     toast.error("User Already Exists");
  //   }
  // };
  const createUser = async (data) => {
    const realData = {
      ...data,
      phone: `${data.countryCode}${data.phone}`,
      owner: userId,
      addedDate: new Date(),
      registrationDate: new Date(),
      dateOfBirth: data.dob, // Map dob to dateOfBirth
      gymPlan: data.plan, // Map plan to gymPlan
    };

    try {
      const savedRes = await axios.post(addTraineeurl, realData);
      if (savedRes.status !== 200) {
        throw new Error(`Error with status response: ${savedRes.status}`);
      }
      toast.success("User Created Successfully");
      dispatch(addSingleClient(savedRes.data.message));
      emptyForm();
    } catch (err) {
      if (err.response) {
        console.error("Server Error:", err.response.data);
        if (err.response.data.message.includes("already exists")) {
          toast.error("User Already Exists");
        } else {
          toast.error(
            err.response.data.message ||
              "An error occurred while creating the user."
          );
        }
      } else if (err.request) {
        console.error("Request Error:", err.request);
        toast.error("Request Error. Please check your network connection.");
      } else {
        console.error("Error:", err.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };



  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^((^\+)?[0-9]{10,13})$/;
    return regex.test(phoneNumber);
  };

  const validateDOB = (dob) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();
    const dayDiff = currentDate.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (birthDate > currentDate) {
      return {
        isValid: false,
        message: "Date of birth cannot be in the future.",
      };
    }

    if (age < 18) {
      return { isValid: false, message: "User must be at least 18 years old." };
    }

    return { isValid: true };
  };

  const countryOptions = Object.values(countries).map((country) => ({
    code: `+${country.phone}`,
    name: country.name,
  }));

  countryOptions.sort((a, b) => a.name.localeCompare(b.name));

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const dobValidation = validateDOB(userInfo.dob);
    if (
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.amount ||
      !userInfo.dob ||
      !userInfo.plan ||
      !validatePhoneNumber(userInfo.phone)
    ) {
      toast.warning("Please Fill Correct Details (Phone number 10-13 digits)");
      return;
    }

    if (!dobValidation.isValid) {
      toast.warning(dobValidation.message);
      return;
    }

    createUser(userInfo);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "countryCode") {
      const selectedCountry = countryOptions.find(
        (country) => country.code === value
      );
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
      onSubmit={handleFormSubmit}
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
          onChange={handleInputChange}
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
            className="rounded p-2 w-1/6 border-2 h-10"
            onChange={handleInputChange}
            onClick={() => setShowCountryNames(true)}
            onBlur={() => setShowCountryNames(false)}
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
            placeholder="1234567890"
            value={userInfo.phone}
            className="rounded p-2 w-7/12 border-2"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <label htmlFor="dob" className="my-auto">
          Date of Birth
        </label>
        <input
          id="dob"
          name="dob"
          type="date"
          value={userInfo.dob}
          className="rounded p-2 w-7/12 border-2"
          onChange={handleInputChange}
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
          onChange={handleInputChange}
        />
      </div>

      <div className="flex gap-4">
        <label htmlFor="plan" className="my-auto">
          Select Gym Plan
        </label>
        <select
          id="plan"
          name="plan"
          value={userInfo.plan}
          className="rounded p-2 w-7/12 border-2"
          onChange={handleInputChange}
        >
          <option value="one month">One Month</option>
          <option value="three months">Three Months</option>
          <option value="six months">Six Months</option>
          <option value="one year">One Year</option>
        </select>
      </div>

      <div className="flex gap-4">
        <label htmlFor="amount" className="my-auto">
          Amount Paid
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          placeholder="12000"
          value={userInfo.amount}
          className="rounded p-2 w-7/12 border-2"
          onChange={handleInputChange}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 p-1 rounded w-1/12 text-white shadow-lg"
      >
        Submit
      </button>
      <ToastContainer />
    </form>
  );
};










// import React, { useState } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Spinner } from "../../Spinner";
// import { apiURL } from "../../utils/commonData";
// import { makeInvisible } from "../../redux/TemplateSlice";
// import { addClient, addSingleClient } from "../../redux/clientSlice";
// import { countries } from "countries-list";

// export const Newadduser = () => {
//   const userId = useSelector((store) => store.user.userData?._id);
//   const dispatch = useDispatch();

//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     dob: "",
//     plan: "one month",
//     phone: "",
//     countryCode: "",
//     amount: "", // No default country code initially
//     addedDate: new Date().toISOString().split("T")[0]
//   });
//   // const dispatch = useDispatch();

//   const [selectedCountry, setSelectedCountry] = useState(null); // State variable to store the selected country object
//   const [showCountryNames, setShowCountryNames] = useState(false); // State variable to track dropdown click

//   const addTraineeurl = `${apiURL}addtrainee`;

//   const emptyForm = () => {
//     setUserInfo({
//       name: "",
//       email: "",
//       dob: "",
//       plan: "one month",
//       phone: "",
//       countryCode: "",
//       amount: "",
//       addedDate: new Date().toISOString().split("T")[0],
//     });
//   };

//   const createUser = async (data) => {
//     const currentDate = new Date().toISOString().split("T")[0];
//     const realData = {
//       name: data.name,
//       email: data.email,
//       phone: data.countryCode + data.phone,
//       dateOfBirth: data.dob,
//       gymPlan: data.plan,
//       amount: data.amount,
//       owner: userId,
//       // addedDate: currentDate, // Add the current date
//       addedDate: new Date().toISOString().split("T")[0],
//       // registrationDate: new Date().toISOString(),
//       registrationDate: new Date(),
//     };

//     try {
//       const savedRes = await axios.post(addTraineeurl, { ...realData });
//       if (savedRes.status !== 200) {
//         throw new Error(`Error with status response: ${savedRes.status}`);
//       }
//       toast.success("User Created Successfully");
//       dispatch(addSingleClient(savedRes.data.message));
//       // dispatch(updateTodayPercentage()); // Dispatch after adding a user
//     } catch (err) {
//       toast.error("User Already Exists");
//     }
//     emptyForm();
//   };

//   const validatePhoneNumber = (phoneNumber) => {
//     const regex = /^((^\+)?[0-9]{10,13})$/;
//     return regex.test(phoneNumber);
//   };

//   const validateDOB = (dob) => {
//     const currentDate = new Date();
//     const birthDate = new Date(dob);
//     let age = currentDate.getFullYear() - birthDate.getFullYear();
//     const monthDiff = currentDate.getMonth() - birthDate.getMonth();
//     const dayDiff = currentDate.getDate() - birthDate.getDate();

//     // Calculate exact age considering month and day
//     if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
//       age--;
//     }

//     if (birthDate > currentDate) {
//       return {
//         isValid: false,
//         message: "Date of birth cannot be in the future.",
//       };
//     }

//     if (age < 18) {
//       return { isValid: false, message: "User must be at least 18 years old." };
//     }

//     return { isValid: true };
//   };

//   const countryOptions = Object.values(countries).map((country) => ({
//     code: `+${country.phone}`, // Add "+" before the country code
//     name: country.name,
//   }));

//   // Sort the countryOptions array based on country names
//   countryOptions.sort((a, b) => a.name.localeCompare(b.name));

//   const clickHandle = async(e) => {
//     e.preventDefault();
//     const dobValidation = validateDOB(userInfo.dob);
//     if (
//       userInfo.name === undefined ||
//       userInfo?.email === undefined ||
//       userInfo.amount === undefined ||
//       userInfo.dob === undefined ||
//       userInfo?.plan === undefined ||
//       !validatePhoneNumber(userInfo.phone)
//     ) {
//       toast.warning("Please Fill Correct Details (Phone number 10-13 digits)");
//       return;
//     }

//     if (!dobValidation.isValid) {
//       toast.warning(dobValidation.message);
//       return;
//     }

//     createUser(userInfo);
//     try {
//       const response = await axios.post(`${apiURL}addclient`, userInfo);
//       if (response.status === 201) {
//         dispatch(addSingleClient(response.data.message));
//         toast.success("User added successfully");
//       } else {
//         toast.error("Failed to add user");
//       }
//     } catch (err) {
//       toast.success("Registered");
//     }
//   };

//   const changeHandle = (event) => {
//     const { name, value } = event.target;

//     if (name === "countryCode") {
//       const selectedCountry = countryOptions.find(
//         (country) => country.code === value
//       );
//       setSelectedCountry(selectedCountry);
//     }

//     setUserInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return !userId ? (
//     <Spinner />
//   ) : (
//     <form
//       className="flex flex-col gap-4 bg-white rounded-lg w-9/12 p-4 justify-center my-10"
//       onClick={() => dispatch(makeInvisible(false))}
//     >
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
//         <div className="flex gap-2 items-center">
//           <select
//             id="countryCode"
//             name="countryCode"
//             value={userInfo.countryCode}
//             className="rounded p-2 w-1/6 border-2 h-10" // Increased height of the dropdown box
//             onChange={changeHandle}
//             onClick={() => setShowCountryNames(true)} // Show country names on click
//             onBlur={() => setShowCountryNames(false)} // Hide country names on blur
//           >
//             {selectedCountry ? (
//               <option value={selectedCountry.code}>
//                 {selectedCountry.name} ({selectedCountry.code})
//               </option>
//             ) : (
//               <option value="" disabled>
//                 Select Country
//               </option>
//             )}
//             {showCountryNames &&
//               countryOptions.map((country, index) => (
//                 <option key={index} value={country.code}>
//                   {country.name} ({country.code})
//                 </option>
//               ))}
//           </select>
//           <input
//             id="phone"
//             name="phone"
//             type="number"
//             placeholder="1201402999"
//             value={userInfo.phone}
//             className="rounded p-2 w-7/12 border-2"
//             onChange={changeHandle}
//           />
//         </div>
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
//         <option value={"one month"}>month</option>
//         <option value={"three months"}>three months</option>
//         <option value={"six months"}>six months</option>
//         <option value={"one year"}>one year</option>
//       </select>

//       <div className="flex gap-4">
//         <label htmlFor="phone" className="my-auto">
//           Amount Paid
//         </label>
//         <div className="flex gap-2 items-center">
//           <input
//             id="amount"
//             name="amount"
//             type="number"
//             placeholder="12000"
//             value={userInfo.amount}
//             className="rounded p-2 w-7/12 border-2"
//             onChange={changeHandle}
//           />
//         </div>
//       </div>

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

























































// import React, { useState } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Spinner } from "../../Spinner";
// import { apiURL } from "../../utils/commonData";
// import { makeInvisible } from "../../redux/TemplateSlice";
// import { countries } from "countries-list";

// export const Newadduser = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((store) => store.user.userData?._id);
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     dob: "",
//     plan: "month",
//     phone: "",
//     countryCode: "",
//     amount: "", // No default country code initially
//   });
//   const [selectedCountry, setSelectedCountry] = useState(null); // State variable to store the selected country object
//   const [showCountryNames, setShowCountryNames] = useState(false); // State variable to track dropdown click

//   const addTraineeurl = `${apiURL}addtrainee`;

//   const emptyForm = () => {
//     setUserInfo({
//       name: "",
//       email: "",
//       dob: "",
//       plan: "one month",
//       phone: "",
//       countryCode: "",
//       amount: "",
//     });
//   };

//   const createUser = async (data) => {
//     const realData = {
//       name: data.name,
//       email: data.email,
//       phone: data.countryCode + data.phone,
//       dateOfBirth: data.dob,
//       gymPlan: data.plan,
//       amount: data.amount,
//       owner: userId,
//     };

//     try {
//       const savedRes = await axios.post(addTraineeurl, { ...realData });
//       if (savedRes.status !== 200) {
//         throw new Error(`Error with status response: ${savedRes.status}`);
//       }
//       toast.success("User Created Successfully");
//     } catch (err) {
//       toast.error("User Already Exists");
//     }
//     emptyForm();
//   };

//   const validatePhoneNumber = (phoneNumber) => {
//     const regex = /^((^\+)?[0-9]{10,13})$/;
//     return regex.test(phoneNumber);
//   };

//   const validateDOB = (dob) => {
//     const currentDate = new Date();
//     const birthDate = new Date(dob);
//     const age = currentDate.getFullYear() - birthDate.getFullYear();
//     const monthDiff = currentDate.getMonth() - birthDate.getMonth();
//     const dayDiff = currentDate.getDate() - birthDate.getDate();

//     // Calculate exact age considering month and day
//     if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
//       age--;
//     }

//     if (birthDate > currentDate) {
//       return {
//         isValid: false,
//         message: "Date of birth cannot be in the future.",
//       };
//     }

//     if (age < 18) {
//       return { isValid: false, message: "User must be at least 18 years old." };
//     }

//     return { isValid: true };
//   };

//   const countryOptions = Object.values(countries).map((country) => ({
//     code: `+${country.phone}`, // Add "+" before the country code
//     name: country.name,
//   }));

//   // Sort the countryOptions array based on country names
//   countryOptions.sort((a, b) => a.name.localeCompare(b.name));

//   const clickHandle = (e) => {
//     e.preventDefault();
//     const dobValidation = validateDOB(userInfo.dob);
//     if (
//       userInfo.name === undefined ||
//       userInfo?.email === undefined ||
//       userInfo.amount === undefined ||
//       userInfo.dob === undefined ||
//       userInfo?.plan === undefined ||
//       !validatePhoneNumber(userInfo.phone)
//     ) {
//       toast.warning("Please Fill Correct Details (Phone number 10-13 digits)");
//       return;
//     }
//     if (!dobValidation.isValid) {
//       toast.warning(dobValidation.message);
//       return;
//     }
//     createUser(userInfo);
//   };

//   const changeHandle = (event) => {
//     const { name, value } = event.target;

//     if (name === "countryCode") {
//       const selectedCountry = countryOptions.find(
//         (country) => country.code === value
//       );
//       setSelectedCountry(selectedCountry);
//     }

//     setUserInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return !userId ? (
//     <Spinner />
//   ) : (
//     <form
//       className="flex flex-col gap-4 bg-white rounded-lg w-9/12 p-4 justify-center my-10"
//       onClick={() => dispatch(makeInvisible(false))}
//     >
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
//         <div className="flex gap-2 items-center">
//           <select
//             id="countryCode"
//             name="countryCode"
//             value={userInfo.countryCode}
//             className="rounded p-2 w-1/6 border-2 h-10" // Increased height of the dropdown box
//             onChange={changeHandle}
//             onClick={() => setShowCountryNames(true)} // Show country names on click
//             onBlur={() => setShowCountryNames(false)} // Hide country names on blur
//           >
//             {selectedCountry ? (
//               <option value={selectedCountry.code}>
//                 {selectedCountry.name} ({selectedCountry.code})
//               </option>
//             ) : (
//               <option value="" disabled>
//                 Select Country
//               </option>
//             )}
//             {showCountryNames &&
//               countryOptions.map((country, index) => (
//                 <option key={index} value={country.code}>
//                   {country.name} ({country.code})
//                 </option>
//               ))}
//           </select>
//           <input
//             id="phone"
//             name="phone"
//             type="number"
//             placeholder="1201402999"
//             value={userInfo.phone}
//             className="rounded p-2 w-7/12 border-2"
//             onChange={changeHandle}
//           />
//         </div>
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
//         <option value={"one month"}>month</option>
//         <option value={"three months"}>three months</option>
//         <option value={"six months"}>six months</option>
//         <option value={"one year"}>one year</option>
//       </select>

//       <div className="flex gap-4">
//         <label htmlFor="phone" className="my-auto">
//           Amount Paid
//         </label>
//         <div className="flex gap-2 items-center">
//           <input
//             id="amount"
//             name="amount"
//             type="number"
//             placeholder="12000"
//             value={userInfo.amount}
//             className="rounded p-2 w-7/12 border-2"
//             onChange={changeHandle}
//           />
//         </div>
//       </div>

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

// // import axios from "axios";
// // import { useId, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { Spinner } from "../../Spinner";
// // import { apiURL } from "../../utils/commonData";
// // import { makeInvisible } from "../../redux/TemplateSlice";

// // export const Newadduser = () => {
// //   // accessing user(Owners) id from the store
// //   const dispatch = useDispatch();
// //   const userId = useSelector((store) => store.user.userData?._id);
// //   const [userInfo, setUserInfo] = useState({
// //     name: "",
// //     email: "",
// //     dob: "",
// //     plan: "month",
// //     phone: "",
// //   });

// //   const addTraineeurl = `${apiURL}addtrainee`;

// //   const emptyForm = () => {
// //     // console.log("inside the empty form");
// //     setUserInfo({
// //       name: "",
// //       email: "",
// //       dob: "",
// //       plan: "month",
// //       phone: "",
// //     });
// //   };

// //   const createUser = async (data) => {
// //     const realData = {
// //       name: data.name,
// //       email: data.email,
// //       phone: data.phone,
// //       dateOfBirth: data.dob,
// //       gymPlan: data.plan,
// //       owner: userId,
// //     };

// //     try {
// //       // console.log("check data to be passed", realData);
// //       const savedRes = await axios.post(addTraineeurl, { ...realData });
// //       // console.log("server gives us this response ", savedRes);
// //       if (savedRes.status !== 200) {
// //         throw new Error(`Error with status response: ${savedRes.status}`);
// //       }
// //       toast.success("User Created Successfully");
// //     } catch (err) {
// //       // console.log(err);
// //       toast.error("User Already Exists");
// //     }
// //     // console.log("calling empty form");
// //     // console.log(userInfo);
// //     emptyForm();
// //     // console.log(userInfo);
// //   };

// //  const validatePhoneNumber = (phoneNumber) => {
// //     // Enforces minimum 10 digits, maximum 13 digits, and "+" for lengths exceeding 10
// //     const regex = /^((^\+)?[0-9]{10,13})$/;
// //     return regex.test(phoneNumber);
// // };

// //   const clickHandle = (e) => {
// //     e.preventDefault();
// //     // console.log("printing userInfo ", userInfo);
// //     if (
// //       userInfo.name === undefined ||
// //       userInfo?.email === undefined ||
// //       userInfo.dob === undefined ||
// //       userInfo?.plan === undefined ||
// //       !validatePhoneNumber(userInfo.phone)
// //     ) {
// //       toast.warning("Please Fill Correct Details (Phone number 10-13 digits)");
// //       return;
// //     }
// //     createUser(userInfo);
// //   };

// //   const changeHandle = (event) => {
// //     const { name, value } = event.target;

// //     setUserInfo((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   // Function to format phone number for display (optional)
// //   const formatPhoneNumber = (phoneNumber) => {
// //     // You can use a library like react-phone-number-input for formatting
// //     // This is a basic example for illustration
// //     if (!phoneNumber) return "";
// //     const firstThree = phoneNumber.slice(0, 3);
// //     const nextThree = phoneNumber.slice(3, 6);
// //     const lastFour = phoneNumber.slice(6);
// //     return `(${firstThree}) <span class="math-inline">\{nextThree\}\-</span>{lastFour}`;
// //   };

// //   return !userId?(<Spinner/>):(
// //     <form className="flex flex-col gap-4 bg-white rounded-lg w-9/12 p-4 justify-center my-10" onClick={()=>dispatch(makeInvisible(false))}>
// //       <div className="flex gap-4">
// //         <label htmlFor="name" className="my-auto">
// //           Name
// //         </label>
// //         <input
// //           id="name"
// //           name="name"
// //           type="text"
// //           placeholder="Name"
// //           value={userInfo.name}
// //           className="rounded p-2 w-7/12 border-2"
// //           onChange={changeHandle}
// //         />
// //       </div>

// //       <div className="flex gap-4">
// //         <label htmlFor="phone" className="my-auto">
// //           Contact Number
// //         </label>
// //         <input
// //           id="phone"
// //           name="phone"
// //           type="number"
// //           placeholder="1201402"
// //           value={userInfo.phone}
// //           className="rounded p-2 w-7/12 border-2"
// //           onChange={changeHandle}
// //         />
// //       </div>

// //       <div className="flex gap-4">
// //         <label htmlFor="DOB" className="my-auto">
// //           Date of Birth
// //         </label>
// //         <input
// //           id="DOB"
// //           name="dob"
// //           type="date"
// //           placeholder="Date of birth"
// //           value={userInfo.dob}
// //           className="rounded p-2 w-7/12 border-2"
// //           onChange={changeHandle}
// //         />
// //       </div>

// //       <div className="flex gap-4">
// //         <label htmlFor="email" className="my-auto">
// //           Email Address
// //         </label>
// //         <input
// //           id="email"
// //           name="email"
// //           type="email"
// //           placeholder="abc@gmail.com"
// //           value={userInfo.email}
// //           className="rounded p-2 w-7/12 border-2"
// //           onChange={changeHandle}
// //         />
// //       </div>

// //       <label htmlFor="gymplan">Select Gym Plan</label>
// //       <select
// //         className="w-1/3 p-2"
// //         name="plan"
// //         id="gymplan"
// //         onChange={changeHandle}
// //       >
// //         <option value={"month"} >month</option>
// //         <option value={"three months"}>three months</option>
// //         <option value={"six months"}>six months</option>
// //         <option value={"one year"}>one year</option>
// //       </select>
// //       <button
// //         type="submit"
// //         className="bg-blue-500 p-1 rounded w-1/12 text-white shadow-lg"
// //         onClick={clickHandle}
// //       >
// //         Submit
// //       </button>
// //       <ToastContainer />
// //     </form>
// //   );
// // };
// import React, { useState } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Spinner } from "../../Spinner";
// import { apiURL } from "../../utils/commonData";
// import { makeInvisible } from "../../redux/TemplateSlice";
// import { countries } from 'countries-list';

// export const Newadduser = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((store) => store.user.userData?._id);
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     email: "",
//     dob: "",
//     plan: "one month",
//     phone: "",
//     countryCode: "", // No default country code initially
//   });
//   const [selectedCountry, setSelectedCountry] = useState(null); // State variable to store the selected country object
//   const [showCountryNames, setShowCountryNames] = useState(false); // State variable to track dropdown click

//   const addTraineeurl = `${apiURL}addtrainee`;

//   const emptyForm = () => {
//     setUserInfo({
//       name: "",
//       email: "",
//       dob: "",
//       plan: "one month",
//       phone: "",
//       countryCode: "",
//     });
//   };

//   const createUser = async (data) => {
//     const realData = {
//       name: data.name,
//       email: data.email,
//       phone: data.countryCode + data.phone,
//       dateOfBirth: data.dob,
//       gymPlan: data.plan,
//       owner: userId,
//     };
//     console.log('Sending user data to backend:', realData);
//     try {
//       const savedRes = await axios.post(addTraineeurl, { ...realData });
//       if (savedRes.status !== 200) {
//         throw new Error(`Error with status response: ${savedRes.status}`);
//       }
//       toast.success("User Created Successfully");
//     } catch (err) {
//       toast.error("User Already Exists");
//     }
//     emptyForm();
//   };

//   const validatePhoneNumber = (phoneNumber) => {
//     const regex = /^((^\+)?[0-9]{10,13})$/;
//     return regex.test(phoneNumber);
//   };

//   const countryOptions = Object.values(countries).map(country => ({
//     code: `+${country.phone}`, // Add "+" before the country code
//     name: country.name
//   }));

//   // Sort the countryOptions array based on country names
//   countryOptions.sort((a, b) => a.name.localeCompare(b.name));

//   const clickHandle = (e) => {
//     e.preventDefault();
//     console.log('Form data before submission:', userInfo); // Log form data before submission
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

//     if (name === "countryCode") {
//       const selectedCountry = countryOptions.find(country => country.code === value);
//       setSelectedCountry(selectedCountry);
//     }

//     setUserInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return !userId ? (
//     <Spinner />
//   ) : (
//     <form className="flex flex-col gap-4 bg-white rounded-lg w-9/12 p-4 justify-center my-10" onClick={() => dispatch(makeInvisible(false))}>
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
//         <div className="flex gap-2 items-center">
//           <select
//             id="countryCode"
//             name="countryCode"
//             value={userInfo.countryCode}
//             className="rounded p-2 w-1/6 border-2 h-10" // Increased height of the dropdown box
//             onChange={changeHandle}
//             onClick={() => setShowCountryNames(true)} // Show country names on click
//             onBlur={() => setShowCountryNames(false)} // Hide country names on blur
//           >
//             {selectedCountry ? (
//               <option value={selectedCountry.code}>{selectedCountry.name} ({selectedCountry.code})</option>
//             ) : (
//               <option value="" disabled>Select Country</option>
//             )}
//             {showCountryNames && countryOptions.map((country, index) => (
//               <option key={index} value={country.code}>{country.name} ({country.code})</option>
//             ))}
//           </select>
//           <input
//             id="phone"
//             name="phone"
//             type="number"
//             placeholder="1201402"
//             value={userInfo.phone}
//             className="rounded p-2 w-7/12 border-2"
//             onChange={changeHandle}
//           />
//         </div>
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
//         <option value={"one month"} >one month</option>
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
