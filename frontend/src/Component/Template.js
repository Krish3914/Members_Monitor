import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Template = () => {
  const navigate = useNavigate();
  // Accessing the name of user from redux Store
  const userName = useSelector((store) => store.user.userData.name);
  // const handleLogout = ()=>{
  //   sessionStorage.removeItem("token");
  //   navigate("/");
  // }
  useEffect(()=>{
    toast.dismiss();
  },[])
  return (
    <div className="absolute text-center right-10 top-14 flex w-1/12 p-4 bg-white gap-4 z-20 justify-between rounded-xl shadow-xl flex-col">
      <div className="flex justify-center flex-row gap-5 ">
        <div className="self-center">{userName?.split(" ")[0]}</div>
      </div>
      <Link to={"user"}>
        {" "}
        <div className="cursor-pointer">My Profile</div>
      </Link>
      <Link to={"setting"}>
        {" "}
        <div className="cursor-pointer ">Settings</div>{" "}
      </Link>
      <Link>
        {" "}
        <div
          className="cursor-pointer"
          onClick={() => {
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("persist:userData");
            sessionStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </div>
      </Link>
    </div>
  );
};
