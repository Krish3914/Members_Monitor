import { useDispatch } from "react-redux";
import { makeInvisible } from "./redux/TemplateSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import heroBgImage from "../images/img/breadcrumb/support1.jpg";

const Support = () => {
  useEffect(() => {
    toast.dismiss();
  }, []);

  const dispatch = useDispatch();

  return (
    <div className="col-xxl flex flex-col gap-6" onClick={() => dispatch(makeInvisible(false))}>
      <span className="text-2xl text-purple-400 font-medium">Complaint/Raise your Ticket</span>
      <div className="bg-white shadow-lg rounded-lg gap-5 p-5" style={{
        backgroundImage: `url(${heroBgImage})`,
        backgroundSize: "500px 525px", // Use original image dimensions
        backgroundRepeat: "no-repeat", // Prevent image from repeating
        backgroundPosition: "right", // Position image on the right side
      }}>
        <h5 className="text-xl font-medium mb-5" style={{color:"#768697"}}><b>Describe Your Complaint</b></h5><br/>
        <div className="card-body ">
          <form className="flex flex-col gap-4">
            <div className="row mb-3 flex gap-10 ">
              <label className="col-sm-2 col-form-label font-medium text-center my-auto" htmlFor="name" >
                Name
              </label>
              <div className="col-sm-10">
                <div className="input-group">  {/* Removed input-group-lg for all */}
                  <span className="input-group-text"><i className="bx bx-user"></i></span>
                  <input
                    type="text"
                    id="name"
                    className="form-control p-2 rounded-md border w-full"  
                    placeholder="John Doe"
                    aria-label="John Doe"
                    aria-describedby="basic-icon-default-fullname2"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3 flex gap-10">
              <label className="col-sm-2 col-form-label font-medium text-center my-auto" htmlFor="phone">
                Phone No
              </label>
              <div className="col-sm-10">
                <div className="input-group">  {/* Removed input-group-lg for all */}
                  <span className="input-group-text"><i className="bx bx-phone"></i></span>
                  <input
                    type="number"
                    id="phone"
                    className="form-control phone-mask p-2 rounded-md border w-full" 
                    placeholder="658 799 8941"
                    aria-label="658 799 8941"
                    aria-describedby="basic-icon-default-phone2"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3 flex gap-10">
              <label className="col-sm-2 col-form-label font-medium text-center my-auto" htmlFor="message">
                Message
              </label>
              <div className="col-sm-10">
                <div className="input-group">  {/* Removed input-group-lg for all */}
                  <span className="input-group-text"><i className="bx bx-comment"></i></span>
                  <textarea
                    id="message"
                    className="form-control p-2 rounded-md border w-full"  
                    placeholder="hey, Describe your Query here?"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row justify-content-end mx-auto self-center">
              <button type="submit" className="bg-[#696cff] shadow-lg text-white p-2 rounded-lg font-bold text-center px-6 hover:shadow-xl">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export { Support };
