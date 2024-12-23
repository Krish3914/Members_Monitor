import { FaChevronRight } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaTable } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import iconImage from "../../images/favicon/favicon.ico";
import { Link } from "react-router-dom";
import { Searchbar } from "../Searchbar";
import logopng from "../../images/logo.png"


// <Link to={"navbar"}>
          //   {" "}
          //   <div className="flex self-start gap-2 ">
          //     <img src={logopng} />
          //   </div>
          // </Link>
export const LeftDashboard = () => {
  return (
    <>
      <div className="bg-white p-4 flex flex-col gap-4 h-screen">
        <div className="flex flex-col gap-2 ">
          <Link to={"membersmonitor.com/"}>
            {" "}
            <div className="flex self-start gap-2 ">
              <img src={logopng} />
            </div>
          </Link>
          <div className="text-grey-400 p-3 font-medium opacity-80 rounded-md flex justify-between flex-col gap-3">
            <Link
              to={"navbar"}
              className="hover:text-gray-600 display: inline-flex"
            >
              <FaHome
                style={{
                  fontSize: "18px",
                  marginRight: "15px",
                  marginLeft: "5px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              />
              <div
                className="flex align-items:center"
                style={{ marginBottom: "5px", marginTop: "5px" }}
              >
                Dashboard
              </div>
            </Link>
          </div>

          <div className="text-grey-400 p-3 font-medium opacity-80 rounded-md flex justify-between flex-col gap-3">
            <Link
              to={"/dashboard/traineeform"}
              className="hover:text-gray-600 display: inline-flex"
            >
              <FaUserPlus
                style={{
                  fontSize: "18px",
                  marginRight: "15px",
                  marginLeft: "5px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              />
              <div
                className="flex align-items:center"
                style={{ marginBottom: "5px", marginTop: "5px" }}
              >
                Add User
              </div>
            </Link>
          </div>
          <div className="text-grey-400 p-3 font-medium opacity-80 rounded-md flex align-items:center gap-3">
            <Link to={"/dashboard/tables"} className="hover:text-gray-600">
              <div className="flex justify-between items-center cursor-pointer adduser">
                <FaTable
                  style={{
                    fontSize: "18px",
                    marginRight: "15px",
                    marginLeft: "5px",
                    marginBottom: "5px",
                    marginTop: "5px",
                  }}
                />
                <div
                  className="flex align-items:center"
                  style={{ marginBottom: "5px", marginTop: "5px" }}
                >
                  Table
                </div>
              </div>
            </Link>
          </div>
          <div className="text-grey-400 p-3 font-medium opacity-80 rounded-md flex justify-between flex-col gap-3">
            <Link
              to={"/dashboard/support"}
              className="hover:text-gray-600 display: inline-flex items-center"
            >
              <FaHeadset
                style={{
                  fontSize: "18px",
                  marginRight: "15px",
                  marginLeft: "5px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              />
              <div
                className="flex align-items:center"
                style={{ marginBottom: "5px", marginTop: "5px" }}
              >
                Support
              </div>
            </Link>
          </div>
          <div className="text-grey-400 p-3 font-medium opacity-80 rounded-md flex justify-between flex-col gap-3">
            <Link
              to={"/dashboard/FAQ"}
              className="hover:text-gray-600 display: inline-flex items-center"
            >
              <FaQuestionCircle
                style={{
                  fontSize: "18px",
                  marginRight: "15px",
                  marginLeft: "5px",
                  marginBottom: "5px",
                  marginTop: "5px",
                }}
              />
              <div
                className="flex align-items:center"
                style={{ marginBottom: "5px", marginTop: "5px" }}
              >
                FAQ
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};



            // bg-indigo-100 text-blue-700 p-3 font-medium opacity-80 rounded-md
            // flex align-items:center gap-3