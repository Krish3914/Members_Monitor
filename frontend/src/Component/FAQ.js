import { useDispatch } from "react-redux";
import { makeInvisible } from "./redux/TemplateSlice";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FAQ = () => {
  const [showFAQ, setshowFAQ] = useState(false);
  const [showFAQ1, setshowFAQ1] = useState(false);
  const [showFAQ2, setshowFAQ2] = useState(false);
  const [showFAQ3, setshowFAQ3] = useState(false);
  useEffect(()=>{
    toast.dismiss();
  },[]);

  return (
    <div className="flex justify-center flex-col items-center gap-6 w-9/12 mx-auto">
      <span className=" font-medium text-2xl">FAQ'S</span>
      <div
        className="bg-white rounded-lg shadow-lg w-full flex flex-col gap-6 p-4"
        onClick={() => {setshowFAQ(!showFAQ); setshowFAQ2(false); setshowFAQ3(false); setshowFAQ1(false)}}
      >
        <span className="flex items-center justify-between cursor-pointer">
        <span className="text-purple-400 font-medium text-xl ">Is there any paid plan for members monitor?</span>
          {showFAQ ? (
            <MdKeyboardArrowRight className="text-3xl font-medium" />
          ) : (
            <MdOutlineKeyboardArrowDown className="text-3xl font-medium" />
          )}
        </span>
        {showFAQ ? (
          <span>
            Yes in future we are planning to launch some paid plans with some
            more great features. Till then enjoy every feature for free.
          </span>
        ) : (
          <></>
        )}
      </div>
      <div
        className="bg-white rounded-lg shadow-lg w-full flex flex-col gap-6 p-4"
        onClick={() => {setshowFAQ1(!showFAQ1); setshowFAQ2(false); setshowFAQ3(false); setshowFAQ(false);}}
      >
        <span className="flex items-center justify-between cursor-pointer">
        <span className="text-purple-400 font-medium text-xl ">
            Can i raise Complaint, dispute, or suggestion for any issue or
            suggestion i have.
          </span>
          {showFAQ1 ? (
            <MdKeyboardArrowRight className="text-3xl font-medium" />
          ) : (
            <MdOutlineKeyboardArrowDown className="text-3xl font-medium" />
          )}
        </span>
        {showFAQ1 ? (
          <span>
            Yes you can raise a ticket for any kind of complaint, dispute or
            suggestion from support section in left menu bar. We are more than
            happy to help you with any of your concern
          </span>
        ) : (
          <></>
        )}
      </div>
      <div
        className="bg-white rounded-lg shadow-lg w-full flex flex-col gap-6 p-4"
        onClick={() => {setshowFAQ2(!showFAQ2); setshowFAQ(false); setshowFAQ3(false); setshowFAQ1(false)}}
      >
        <span className="flex items-center justify-between cursor-pointer">
        <span className="text-purple-400 font-medium text-xl ">What if there are any designing issues i face on the platform</span>
          {showFAQ2 ? (
            <MdKeyboardArrowRight className="text-3xl font-medium" />
          ) : (
            <MdOutlineKeyboardArrowDown className="text-3xl font-medium" />
          )}
        </span>
        {showFAQ2 ? (
          <span>
            You can raise a ticket for any kind of query from support tab in
            left menu. We are here to help you 24/7
          </span>
        ) : (
          <></>
        )}
      </div>
      <div
        className="bg-white rounded-lg shadow-lg w-full flex flex-col gap-6 p-4"
        onClick={() => {setshowFAQ3(!showFAQ3); setshowFAQ2(false); setshowFAQ1(false); setshowFAQ(false)}}
      >
        <span className="flex items-center justify-between cursor-pointer">
          {" "}
          <span className="text-purple-400 font-medium text-xl ">Is there any chat support available</span>
          {showFAQ3 ? (
            <MdKeyboardArrowRight className="text-3xl font-medium" />
          ) : (
            <MdOutlineKeyboardArrowDown className="text-3xl font-medium" />
          )}
        </span>
        {showFAQ3 ? (
            <span className="">
            Currently we are under optimization mode. But soon we are going to
            implement live chat support on our platform.
          </span>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export { FAQ };
