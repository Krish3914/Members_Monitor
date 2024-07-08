import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "./Spinner";
import { expiredUserCount } from "./redux/clientSlice";
import {apiURL} from "../Component/utils/commonData"
import { makeInvisible } from "./redux/TemplateSlice";

export const Notifications = () => {
  const [user, setUserInfo] = useState([]);
  let userData;
  const dispatch = useDispatch();
  const ownerId = useSelector((store) => store.user.userData?._id);
  // console.log("this is owner id ", ownerId);

  const getUser = async () => {
    try {
      const userArray = await axios.get(
        `${apiURL}clients`,
        {
          params: {
            ownerId: ownerId,
          },
        }
      );
      // console.log("this is info we fetch ", userArray?.data?.data);
      userData = userArray?.data?.data;
      findExpiry();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const findExpiry = () => {
    let userArray = [];
    // console.log("inside the find expiry");
    // console.log("the user us ", userData);
    userData.map((data) => {
      const daysLeft = Math.ceil(
        (Date.parse(data?.expiryDate) - Date.now()) / (1000 * 60 * 60 * 24)
      );
      // console.log("the days left are ", daysLeft);
      let info = {
        name: data.name,
        daysLeft: daysLeft,
        email: data.email,
      };

      userArray.push(info);
    });
    // console.log("user array is ", userArray);
    userArray = userArray.filter(
      (data) => data.daysLeft < 10 && data.daysLeft > 0
    );
    dispatch(expiredUserCount(userArray.length));
    setUserInfo(userArray);
  };

  useEffect(() => {
    getUser();
  }, []);

  return user.length > 0 ? (
    
      <table className="mx-auto border-collapse border rounded-lg overflow-hidden shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white" onClick={()=>dispatch(makeInvisible(false))}>
        <thead>
          <tr className="m-4 bg-gradient-to-r from-purple-300 to-purple-500">
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Email</th>
            <th className="py-2 px-4 border">Days Left</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {user.map((data, index) => (
            <tr
              key={data.name}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="py-2 px-4 border hover:shadow-md">{data.name}</td>
              <td className="py-2 px-4 border hover:shadow-md ">
                {data.email}
              </td>
              <td className="py-2 px-4 border hover:shadow-md bg-red-200">
                {data.daysLeft}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  ) : user.length == 0 ? (
    <span className="mx-auto text-center block text-lg font-semibold mt-8 bg-purple-200 text-purple-500 py-2 px-4 border border-purple-200 rounded shadow-md" onClick={()=>dispatch(makeInvisible(false))}>
     Currently, all users have a gym plan with more than 10 days remaining.
    </span>
  ) : (
    <Spinner />
  );
};
