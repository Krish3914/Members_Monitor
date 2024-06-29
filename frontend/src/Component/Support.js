import { useDispatch } from "react-redux";
import { makeInvisible } from "./redux/TemplateSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import heroBgImage from "../images/img/breadcrumb/support1.jpg";
import axios from "axios";
import { apiURL } from "./utils/commonData";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    toast.dismiss();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting complaint:", formData); // Log the form data being submitted

      // Log API URL
      console.log("API URL:", `${apiURL}complaints`);

      const response = await axios.post(`${apiURL}complaints`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response from server:", response.data); // Log the response from the server

      if (response.data.success) {
        toast.success("Complaint sent successfully!");
        setFormData({
          name: "",
          phone: "",
          message: "",
        });
      } else {
        toast.error("Failed to send complaint.");
      }
    } catch (error) {
      console.error("Error sending complaint:", error); // Log any errors that occur during the request
      toast.error("An error occurred while sending the complaint.");
    }
  };

  return (
    <div
      className="col-xxl flex flex-col gap-6"
      onClick={() => dispatch(makeInvisible(false))}
    >
      <span className="text-2xl text-purple-400 font-medium">
        Complaint/Raise your Ticket
      </span>
      <div
        className="bg-white shadow-lg rounded-lg gap-5 p-5"
        style={{
          backgroundImage: `url(${heroBgImage})`,
          backgroundSize: "500px 525px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
        }}
      >
        <h5 className="text-xl font-medium mb-5" style={{ color: "#768697" }}>
          <b>Describe Your Complaint</b>
        </h5>
        <br />
        <div className="card-body">
          <form
            className="flex flex-col gap-4"
            style={{ width: "60vh" }}
            onSubmit={handleSubmit}
          >
            <div className="row mb-3 flex gap-10">
              <label
                className="col-sm-2 col-form-label font-medium text-center my-auto"
                htmlFor="name"
              >
                Name
              </label>
              <div className="col-sm-10">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bx bx-user"></i>
                  </span>
                  <input
                    type="text"
                    id="name"
                    className="form-control p-2 rounded-md border w-full"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    aria-label="John Doe"
                    aria-describedby="basic-icon-default-fullname2"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3 flex gap-10">
              <label
                className="col-sm-2 col-form-label font-medium text-center my-auto"
                htmlFor="phone"
              >
                Phone No
              </label>
              <div className="col-sm-10">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bx bx-phone"></i>
                  </span>
                  <input
                    type="number"
                    id="phone"
                    className="form-control phone-mask p-2 rounded-md border w-full"
                    placeholder="658 799 8941"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-label="658 799 8941"
                    aria-describedby="basic-icon-default-phone2"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3 flex gap-10">
              <label
                className="col-sm-2 col-form-label font-medium text-center my-auto"
                htmlFor="message"
              >
                Message
              </label>
              <div className="col-sm-10">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bx bx-comment"></i>
                  </span>
                  <textarea
                    id="message"
                    className="form-control p-2 rounded-md border w-full"
                    placeholder="Hey, describe your query here?"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#696cff] shadow-lg text-white p-2 rounded-lg font-bold text-center px-6 hover:shadow-xl"
              >
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

// import { useDispatch } from "react-redux";
// import { makeInvisible } from "./redux/TemplateSlice";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import heroBgImage from "../images/img/breadcrumb/support1.jpg";

// const Support = () => {
//   useEffect(() => {
//     toast.dismiss();
//   }, []);

//   const dispatch = useDispatch();

//   return (
//     <div className="col-xxl flex flex-col gap-6" onClick={() => dispatch(makeInvisible(false))}>
//       <span className="text-2xl text-purple-400 font-medium">Complaint/Raise your Ticket</span>
//       <div className="bg-white shadow-lg rounded-lg gap-5 p-5" style={{
//         backgroundImage: `url(${heroBgImage})`,
//         backgroundSize: "500px 525px", // Use original image dimensions
//         backgroundRepeat: "no-repeat", // Prevent image from repeating
//         backgroundPosition: "right", // Position image on the right side
//       }}>
//         <h5 className="text-xl font-medium mb-5" style={{color:"#768697"}}><b>Describe Your Complaint</b></h5><br/>
//         <div className="card-body ">
//           <form className="flex flex-col gap-4">
//             <div className="row mb-3 flex gap-10 ">
//               <label className="col-sm-2 col-form-label font-medium text-center my-auto" htmlFor="name" >
//                 Name
//               </label>
//               <div className="col-sm-10">
//                 <div className="input-group">  {/* Removed input-group-lg for all */}
//                   <span className="input-group-text"><i className="bx bx-user"></i></span>
//                   <input
//                     type="text"
//                     id="name"
//                     className="form-control p-2 rounded-md border w-full"
//                     placeholder="John Doe"
//                     aria-label="John Doe"
//                     aria-describedby="basic-icon-default-fullname2"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="row mb-3 flex gap-10">
//               <label className="col-sm-2 col-form-label font-medium text-center my-auto" htmlFor="phone">
//                 Phone No
//               </label>
//               <div className="col-sm-10">
//                 <div className="input-group">  {/* Removed input-group-lg for all */}
//                   <span className="input-group-text"><i className="bx bx-phone"></i></span>
//                   <input
//                     type="number"
//                     id="phone"
//                     className="form-control phone-mask p-2 rounded-md border w-full"
//                     placeholder="658 799 8941"
//                     aria-label="658 799 8941"
//                     aria-describedby="basic-icon-default-phone2"
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="row mb-3 flex gap-10">
//               <label className="col-sm-2 col-form-label font-medium text-center my-auto" htmlFor="message">
//                 Message
//               </label>
//               <div className="col-sm-10">
//                 <div className="input-group">  {/* Removed input-group-lg for all */}
//                   <span className="input-group-text"><i className="bx bx-comment"></i></span>
//                   <textarea
//                     id="message"
//                     className="form-control p-2 rounded-md border w-full"
//                     placeholder="hey, Describe your Query here?"
//                   ></textarea>
//                 </div>
//               </div>
//             </div>
//             <div className="row justify-content-end mx-auto self-center">
//               <button type="submit" className="bg-[#696cff] shadow-lg text-white p-2 rounded-lg font-bold text-center px-6 hover:shadow-xl">
//                 Send
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { Support };
