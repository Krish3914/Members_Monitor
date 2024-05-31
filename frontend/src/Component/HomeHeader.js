import { Link } from "react-router-dom";
import { isLoggedIn } from "./utils/isLoggedIn";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const HomeHeader = ({show,setShow}) => {
    
  return (
    <header className="header-section">
      <div className="container flex items-center mt-4">
        <Link to={"/"} className="">
          <img src="img/logo.png" alt="" className="logo w-2/6" />
        </Link>
        <div className="nav-menu">
          <nav className="mainmenu text-white">
            <ul className="flex">
              <Link to={"/contact"}>
                <li className="">Contacts</li>
              </Link>
            </ul>
          </nav>
        </div>
        <div id="mobile-menu-wrap">
          <div className="nav-menu flex flex-col">
            <span onClick={(e)=>{e.stopPropagation(); setShow(!show)}} className=" font-bold text-xl text-white self-end">{!show?<GiHamburgerMenu/>:<RxCross2 />}</span>
           { show && <nav className=" text-white">
              <ul>
                <Link to={"/contact"}>
                  <li className="">Contacts</li>
                </Link>
              </ul>
            </nav>}
          </div>
        </div>
        {isLoggedIn() ? (
              <Link to={"/dashboard/navbar"} className="primary-btn signup-btn rounded-lg ml-4">
                Dashboard
              </Link>
            ) : (
              <Link to={"/login"} className="primary-btn signup-btn rounded-lg ml-4">
                LogIn
              </Link>
            )}
      </div>
    </header>
  );
};

export { HomeHeader };




              // <Link to={"/"}>
              //   <li className="">Home</li>
              // </Link>;
              // <Link to={"/aboutus"}>
              //   <li className="">About</li>
              // </Link>
              // <Link to={"/classes"}>
              //   <li className="">Classes</li>
              // </Link>
              // <Link to={"/blogs"}>
              //   <li className="">Blog</li>
              // </Link>




              // <Link to={"/"}>
              //     <li className="">Home</li>
              //   </Link>
              //   <Link to={"/aboutus"}>
              //     <li className="">About</li>
              //   </Link>
              //   <Link to={"/classes"}>
              //     <li className="">Classes</li>
              //   </Link>
              //   <Link to={"/blogs"}>
              //     <li className="">Blog</li>
              //   </Link>
