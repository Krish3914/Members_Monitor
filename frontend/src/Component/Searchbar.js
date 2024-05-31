import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Template } from "./Template";
import { useDispatch, useSelector } from "react-redux";
import { Showtable } from "./Dashboard/leftDashBoard/Showtable";
import { addClientSearch } from "./redux/clientSlice";
import { makeInvisible, updateVisibility } from "./redux/TemplateSlice";

export const Searchbar = () => {
  const dispatch = useDispatch();
  const templateVisibility = useSelector((store)=>store.templateSlice.isVisible);
  console.log("the templateVisibility status is ",templateVisibility)
  const selector = useSelector((store) => store.client.client);
  const userInfo = useSelector((store)=>store.user.userData);
  const [showTemplate, setshowTemplate] = useState(false);
  const [searchData, setSearchData] = useState("");

  const changeHandle = (e) => {
    setSearchData(e.target.value);
  };

  const searchHandle = () => {
    // console.log("this data we will interate",selector);
    const clients = selector.filter((data) =>
     data.name.toLowerCase().includes(searchData.toLowerCase()) || data.phone.toString().includes(searchData)
    );
    dispatch(addClientSearch(clients));
    setSearchData("");
  };

  return (
    <div className="flex justify-between rounded-xl mt-4 mb-10 shadow-xl ">
      <div className="w-full p-4 flex items-center gap-4" onClick={()=>dispatch(makeInvisible(false))}>
        <CiSearch className="ml-4 text-xl" />
        <input
          className="w-1/3 searchinputs p-1 focus:border-none rounded-md"
          placeholder="         Search by name, email,  phone etc.."
          value={searchData}
          onChange={changeHandle}
          autocomplete="off"
          style={{ boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.2)', fontSize:"15px" }}
        />
        {searchData?(
        <span
          className="cursor-pointer bg-purple-400  text-white border-2 border-slate-300  py-1 px-3 rounded-lg hover:bg-purple-500 hover:text-white hover:font-medium duration-500"
          onClick={searchHandle}
        >
          Search
        </span>
        ):<div className="hidden"></div>}
      </div>
      <img
        src={userInfo?.photo?userInfo.photo:require("../images/avatars/profile-user.png")}
        className="w-10 h-10 rounded-full cursor-pointer my-auto mr-4 "
        onClick={(e) =>{ e.stopPropagation(); dispatch(updateVisibility(!templateVisibility))}
        }
      />
      {templateVisibility ? <Template /> : <div className="hidden"></div>}
    </div>
  );
};
