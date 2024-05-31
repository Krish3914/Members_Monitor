import { Link } from "react-router-dom";
import pageError from "../images/illustrations/page-misc-error-light.png"

const PageNotFound = ()=>{
    return(
        <div className="container-xxl container-p-y bg-slate-100 h-screen w-full flex items-center justify-center">
    <div className="misc-wrapper flex flex-col text-center">
      <h2 className="mb-2 mx-2">Page Not Found :</h2>
      <p className="mb-4 mx-2">Oops! 😖 The requested URL was not found on this server.</p>
      <Link to={"/dashboard/navbar"} className="mx-auto bg-[#696cff] shadow-lg text-white p-2 rounded-lg font-bold text-center">Back to home</Link>
      <div className="mt-3">
        <img
          src={pageError}
          alt="page-misc-error-light"
          width="500"
          className="img-fluid"
          data-app-dark-img="illustrations/page-misc-error-dark.png"
          data-app-light-img="illustrations/page-misc-error-light.png"
        />
      </div>
    </div>
  </div>
    )
}
export {PageNotFound};