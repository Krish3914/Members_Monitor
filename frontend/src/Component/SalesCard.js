import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "./redux/clientSlice";
import { apiURL } from "./utils/commonData";
import { makeInvisible } from "./redux/TemplateSlice";
export const SalesCard = () => {
  const navigate = useNavigate();
  const selector = useSelector((store) => store.client.client);
  const ownerId = useSelector((store) => store.user.userData?._id);
  const dispatch = useDispatch();

  
  function calculateExpiry(user) {
    let registrationDate = user.registrationDate;
    let registrationDateTime = new Date(registrationDate);

    registrationDate = new Date(
      registrationDateTime.getFullYear(),
      registrationDateTime.getMonth(),
      registrationDateTime.getDate()
    );

    let expiryDate;
    let gymPlan = user.gymPlan?user.gymPlan:user.plan;
    // console.log("the gym plan we got is ",gymPlan);
    switch (gymPlan) {
      case "month":
        case "premium": {
        expiryDate = new Date(registrationDate);
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        break;
      }
      case "three months": {
        expiryDate = new Date(registrationDate);
        expiryDate.setMonth(expiryDate.getMonth() + 3);
        break;
      }
      case "six months": {
        expiryDate = new Date(registrationDate);
        expiryDate.setMonth(expiryDate.getMonth() + 6);
        break;
      }
      case "one year": {
        expiryDate = new Date(registrationDate);
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        break;
      }
      default: {
        return null;
      }
    }

    return Math.ceil((expiryDate - Date.now()) / (1000 * 60 * 60 * 24));
  }


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
      // console.log("we will pass above data into our store", message);
      dispatch(addClient(message));

      if (!result) {
        throw new Error(`error throw with status resonse`);
      }
      toast.success("Fetch The Users Data");
    } catch (err) {
      toast.error("Error Occured while Fetching users data");
    }
  };

  useEffect(()=>{
    // console.log("priting selector ",selector);
    if(selector.length === 0)
      getClients();
    return ()=>{
      toast.dismiss()
    }
  },[]);

  return (
    <div className="" onClick={()=>dispatch(makeInvisible(false))}>
      {/* {console.log("client we get are",selector)} */}
      <button
        className="bg-purple-400 text-white py-1 px-4 mb-5 rounded-lg font-medium shadow-lg hover:bg-purple-500 duration-500"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg mx-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Contact</th>
            <th className="py-2 px-4 border-b">Email </th>
            <th className="py-2 px-4 border-b">Days Left</th>
          </tr>
        </thead>
        <tbody>
          {selector.map((data, index) => (
            <tr className="text-center my-10" key={index}>
              <td className="py-2 px-4 border-b">{data?.name}</td>
              <td className="py-2 px-4 border-b">{data?.phone}</td>
              <td className="py-2 px-4 border-b">{data?.email}</td>
              <td className="py-2 px-4 border-b">{calculateExpiry(data)}</td>
             </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
