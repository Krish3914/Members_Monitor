// // show table will rendered after search in the table

// import { ToastContainer, toast } from "react-toastify";
// import { ShimmerTable } from "../leftDashBoard/ShimmerTable";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { addClient } from "../../redux/clientSlice";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { apiURL } from "../../utils/commonData";
// import { makeInvisible } from "../../redux/TemplateSlice";

// const Table = () => {
//   const selector = useSelector((store) => store.client.client);
//   const ownerId = useSelector((store) => store.user.userData?._id);
//   const dispatch = useDispatch();
//   // console.log(ownerId);
//   // console.log("this is client data", selector);
//   const clients = selector;

//   const [userData, setUserdata] = useState(clients);
//   const [isReadonly, setisReadonly] = useState(true);
//   const [totalRows, setTotalRows] = useState(0);
//   const getClients = async () => {
//     try {
//       const result = await axios.get(
//         `${apiURL}clients/${ownerId}`,
//         {
//           params: {
//             ownerId: ownerId,
//           },
//         }
//       );
//       const { message } = result.data;
//       // console.log("we will pass above data into our store", message);
//       dispatch(addClient(message));

//       if (!result) {
//         throw new Error(`error throw with status resonse`);
//       }
//       toast.success("Fetch The Users Data");
//     } catch (err) {
//       toast.error("Error Occured while Fetching users data");
//     }
//   };

//   const handleDeleteUser = async (index) => {
//     let updatedClients = [...clients];
//     // console.log("this is user before delete ",updatedClients)
//     const updatedClientsAfterDelete = updatedClients.filter((_, i) => i !== index);
//     const id = updatedClients[index]._id; // Remove the client at the specified index
//     try {
//       const deleteClient = await axios.delete(
//         `${apiURL}deleteclient/${id}`
//       );
//        // Update Redux store
       
//     dispatch(addClient(updatedClientsAfterDelete));
//     // console.log("this is user after delete ",updatedClientsAfterDelete);
//     setUserdata(updatedClientsAfterDelete);
//     toast.success("User deleted successfully");
//     } catch (err) {
//       return console.log(err.message);
//     }

//   };

//   const handleInputChange = (index, key, value) => {
//     setUserdata((prevUserData) => {
//       return prevUserData.map((data, i) => {
//         if (i === index) {
//           // Create a new object with the updated value
//           return { ...data, [key]: value };
//         }
//         return data;
//       });
//     });
//     // console.log("this is user after entire cahneg in state", userData);
//   };

//   const handleSave = async (index) => {
//     setisReadonly(!isReadonly);
//     // console.log("this is use data from state", userData[index]);
//     const { _id, name, dateOfBirth, email, gymPlan, phone } = userData[index];
//     dispatch(addClient(userData));
//     // console.log("this is use data from redux", selector);
//     try {
//       const updateClient = await axios.put(
//         `${apiURL}updateclient`,
//         { _id, name, dateOfBirth, email, gymPlan, phone }
//       );
//       // console.log(updateClient);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };



//   useEffect(() => {
//     getClients();
//   }, []);
//   useEffect(() => {
//     // Update totalRows when data is fetched
//     if (selector.length > 0) {
//       setTotalRows(selector.length);
//     }
//   }, [selector]); 

//   return !Array.isArray(selector) || selector.length === 0 ? (
//     <ShimmerTable />
//   ) : (
//     <div>
//       <div className="text-black-600 text-right" style={{ marginTop: '0rem', marginBottom: '2rem' }}><b>Number Of Users - {totalRows}</b></div>
//      <div onClick={()=>dispatch(makeInvisible(false))} className="bg-blue-800">
//       <table className="min-w-full bg-white border border-gray-300 shadow-lg">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="py-2 px-4 border-b">Name</th>
//             <th className="py-2 px-4 border-b">DOB</th>
//             <th className="py-2 px-4 border-b">Phone</th>
//             <th className="py-2 px-4 border-b">Email</th>
//             <th className="py-2 px-4 border-b">MemberShip Plan</th>
//             <th className="py-2 px-4 border-b">Status</th>
//             <th className="py-2 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {selector.map((data, index) => {
//             return (
//               <tr className="text-center my-10 group" key={index}>
//                 <td className="py-2 px-4 border-b">
//                   <input
//                     type="text"
//                     value={userData[index]?.name}
//                     className="text-center w-full"
//                     readOnly={isReadonly}
//                     onChange={(e) =>
//                       handleInputChange(index, "name", e.target.value)
//                     }
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   <input
//                     type="text"
//                     value={data?.dateOfBirth?.substr(0,10)}
//                     className="text-center w-full"
//                     readOnly={isReadonly}
//                     onChange={(e) =>
//                       handleInputChange(index, "dateOfBirth", e.target.value)
//                     }
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   <input
//                     type="number"
//                     value={data?.phone}
//                     className="text-center w-full"
//                     readOnly={isReadonly}
//                     onChange={(e) =>
//                       handleInputChange(index, "phone", e.target.value)
//                     }
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   <input
//                     type="text"
//                     value={data?.email}
//                     className="text-center w-full"
//                     readOnly={isReadonly}
//                     onChange={(e) =>
//                       handleInputChange(index, "email", e.target.value)
//                     }
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   <input
//                     type="text"
//                     value={data?.gymPlan?data.gymPlan:data.plan}
//                     className="text-center w-full"
//                     readOnly
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b text-green-600">Active</td>
//                 <td className="py-2 px-4 border-b">
//                   <div className="flex items-center justify-center space-x-2">
//                     <BsThreeDotsVertical className="cursor-pointer" />
//                     <div className="group relative">
//                       <div className="hidden group-hover:block absolute top-0 right-0 bg-white p-2 shadow-lg">
//                         <span
//                           className="hover:scale-110 duration-500 hover:shadow-xl cursor-pointer"
//                           onClick={() => handleDeleteUser(index)}
//                         >
//                           Delete
//                         </span>
//                         <div
//                           className="text-center cursor-pointer hover:scale-105 duration-700"
//                           onClick={() => handleSave(index)}
//                         >
//                           {isReadonly ? "Edit" : "Save"}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//     </div>
//   );
// };

// export { Table }; // Named export of the Tables component
import { ToastContainer, toast } from "react-toastify";
import { ShimmerTable } from "../leftDashBoard/ShimmerTable";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "../../redux/clientSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { apiURL } from "../../utils/commonData";
import { makeInvisible } from "../../redux/TemplateSlice";

const Table = () => {
  const selector = useSelector((store) => store.client.client);
  const ownerId = useSelector((store) => store.user.userData?._id);
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(null);

  const [userData, setUserdata] = useState(selector);
  const [isReadonly, setIsReadonly] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [editIndex, setEditIndex] = useState(-1); // Track the index being edited

  const getClients = async () => {
    try {
      const result = await axios.get(
        `${apiURL}clients/${ownerId}`,
        {
          params: {
            ownerId: ownerId,
          },
        }
      );
      const { message } = result.data;
      dispatch(addClient(message));
      if (!result) {
        throw new Error(`error throw with status response`);
      }
      toast.success("Fetch The Users Data");
    } catch (err) {
      toast.error("Error Occurred while Fetching users data");
    }
  };

  const handleDeleteUser = async (index) => {
    if (userData[index] && userData[index]._id) { // Check if userData[index] exists and has _id property
      const id = userData[index]._id;
      try {
        await axios.delete(`${apiURL}deleteclient/${id}`);
        const updatedUsers = [...userData];
        updatedUsers.splice(index, 1);
        setUserdata(updatedUsers);
        toast.success("User deleted successfully");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log("User data or _id property is undefined");
    }
  };

  const handleInputChange = (index, key, value) => {
    setUserdata((prevUserData) => {
      const updatedUserData = [...prevUserData];
      updatedUserData[index] = { ...updatedUserData[index], [key]: value };
      return updatedUserData;
    });
  };

  const handleSave = async (index) => {
    setIsReadonly(true); // Disable editing after save
    const { _id, name, dateOfBirth, email, gymPlan, phone } = userData[index];
    try {
      await axios.put(`${apiURL}updateclient`, { _id, name, dateOfBirth, email, gymPlan, phone });
      toast.success("User details updated successfully");
      setEditIndex(-1); // Reset editIndex after saving
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEdit = (index) => {
    setIsReadonly(false); // Enable editing
    setEditIndex(index); // Set the index being edited
  };

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    if (selector.length > 0) {
      setTotalRows(selector.length);
    }
  }, [selector]);

  return !Array.isArray(selector) || selector.length === 0 ? (
    <ShimmerTable />
  ) : (
    <div>
      <div className="text-black-600 text-right" style={{ marginTop: '0rem', marginBottom: '2rem' }}><b>Number Of Users - {totalRows}</b></div>
      <div onClick={()=>dispatch(makeInvisible(false))} className="bg-blue-800">
        <table className="min-w-full bg-white border border-gray-300 shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">DOB</th>
              <th className="py-2 px-4 border-b">Phone</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">MemberShip Plan</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selector.map((data, index) => {
              return (
                <tr className={`text-center my-10 ${index === editIndex ? 'bg-indigo-200' : ''}`} key={index}>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={userData[index]?.name}
                      className="text-center w-full"
                      readOnly={isReadonly || index !== editIndex} // Make editable only if index matches editIndex
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="date"
                      value={data?.dateOfBirth?.substr(0,10)}
                      className="text-center w-full"
                      readOnly={isReadonly || index !== editIndex}
                      onChange={(e) =>
                        handleInputChange(index, "dateOfBirth", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={formatPhoneNumber(userData[index]?.phone)}
                      className="text-center w-full"
                      readOnly={isReadonly || index !== editIndex} // Make editable only if index matches editIndex
                      onChange={(e) =>
                        handleInputChange(index, "phone", e.target.value)
                      }
                      placeholder="+91 1234567890" // Placeholder for formatting
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={userData[index]?.email}
                      className="text-center w-full"
                      readOnly={isReadonly || index !== editIndex} // Make editable only if index matches editIndex
                      onChange={(e) =>
                        handleInputChange(index, "email", e.target.value)
                      }
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="text"
                      value={data?.gymPlan?data.gymPlan:data.plan}
                      className="text-center w-full"
                      readOnly
                    />
                  </td>
                  <td className="py-2 px-4 border-b text-green-600">Active</td>
                  <td className="py-2 px-4 border-b relative">
                    <div className="flex items-center justify-center space-x-2 group">
                      <BsThreeDotsVertical className="cursor-pointer" />
                      <div className="hidden group-hover:block absolute top-0 right-0 bg-white p-2 shadow-lg">
                        <span
                          className="hover:scale-110 duration-500 hover:shadow-xl cursor-pointer"
                          onClick={() => handleDeleteUser(index)}
                        >
                          Delete
                        </span>
                        <div
                          className="text-center cursor-pointer hover:scale-105 duration-700"
                          onClick={() => index === editIndex ? handleSave(index) : handleEdit(index)}
                        >
                          {isReadonly || index !== editIndex ? "Edit" : "Save"}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Function to format phone number with country code
const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return ''; // Return empty string if phoneNumber is undefined or null
  if (typeof phoneNumber !== 'string') return phoneNumber; // Return phoneNumber if it's not a string
  if (phoneNumber.startsWith('+')) return phoneNumber; // Return phoneNumber if it already has country code
  // Add '+' before the phone number
  return `+${phoneNumber}`;
};

export { Table };
