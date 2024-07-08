import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { addUserData } from "../../redux/UserSlice";
import { apiURL } from "../../utils/commonData";
import {Spinner} from "../../Spinner";
import { makeInvisible } from "../../redux/TemplateSlice";

const UserProfile = () => {
  const userInfo = useSelector((store) => store.user.userData);
  const dispatch = useDispatch();
  
  const [user, setUser] = useState(userInfo);
  const[loading,setLoading] = useState(false);
  const [isreadOnly, setReadOnly] = useState(false);
  const [selectImage, setSelectImage] = useState(undefined);

  const updateUserInfo = async () => {
    try {
      const updatedUser = await axios.put(
        `${apiURL}updateuser`,
        { ...user }
      );
      dispatch(addUserData(updatedUser.data.message));
      toast.success("User information updated successfully");
    } catch (err) {
      console.error("Error updating user information: ", err.message);
      toast.error("Error updating user information");
    }
  };

  const setEditableClick = (e) => {
    e.preventDefault();
    setReadOnly(!isreadOnly);

    if (user === userInfo) {
      !isreadOnly
        ? toast.success("User can now edit personal information")
        : toast.warning("User prevented from editing personal information");
    }

    if (e.target.textContent === "Save" && user !== userInfo) {
      toast.warning("Please note that you made changes to your personal information");
      updateUserInfo();
    }
  };

  const changeHandle = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setUser((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo]);

  const changeImageHandle = (e) => {
    setSelectImage(e.target.files[0]);
  };

  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const uploadImage = async (e) => {
    if (!selectImage) {
      toast.error("Please select the image");
      return;
    }

    try {
      if(selectImage.size>50000){
        return toast.error("image size should be less than 21kb");
      }
      const convertedImage = await convertToBase64(selectImage);
      // setLoading(true);
      // const formData = new FormData();
      // formData.append("file", selectImage);
      // formData.append("name", selectImage.name);
      // formData.append("email", userInfo.email);

      const imageUploadResult = await axios.put(
        `${apiURL}upload-image`,
        {convertedImage:convertedImage,email:userInfo.email}
      );

      console.log("image Upload Result is ",imageUploadResult.data.data);

      dispatch(addUserData(imageUploadResult.data.data));
      setUser(imageUploadResult.data.data);
        // setLoading(false);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      setLoading(false);
      console.error("Error uploading image: ", err.message);
      toast.error("Error uploading image");
    }
  };

  return user === undefined || loading? (
    <Spinner/>
  ) : (
    <div className="flex flex-col gap-5 h-screen" onClick={()=>dispatch(makeInvisible(false))}>
      <div className="flex w-full gap-8">
        <img
          src={!user?.photo ? `https://ui-avatars.com/api/?name=${user?.name}` : user?.photo}
          className="w-1/12 rounded-full"
        />
        <div className="flex flex-col gap-4 ">
          <div className="flex mt-4 gap-2 items-center">
            <input
              className="appearance-none border bg-purple-200 border-purple-300 py-2 px-4 w-1/2  rounded focus:outline-none focus:border-blue-500"
              type="file"
              name="imagefile"
              accept="image/png, image/jpeg"
              onChange={changeImageHandle}
            />
            <button
              className="border py-1 border-gray-400 rounded-lg px-5 text-gray-400 hover:bg-purple-300 hover:text-white duration-500"
              onClick={uploadImage}
            >
              Update image
            </button>
          </div>
          <span className="text-gray-400 text-sm">
            Allowed image formats: png, jpeg,jpg.
          </span>
        </div>
      </div>
      <div className="border bg-gray-300 w-full"></div>
      <form className="flex flex-col gap-4">
        <label htmlFor="name">NAME</label>
        <input
          className="border border-gray-300  hover:border-purple-500 transition duration-300 bg-transparent p-2 rounded-md w-1/2"
          readOnly={!isreadOnly}
          id="name"
          value={user.name}
          onChange={changeHandle}
        />
        <label htmlFor="email">EMAIL</label>
        <input
          className="border border-gray-300  hover:border-purple-500 transition duration-300 bg-transparent p-2 rounded-md w-1/2"
          readOnly={!isreadOnly}
          id="email"
          value={user.email}
          onChange={changeHandle}
        />
        <label htmlFor="phone">PHONE</label>
        <input
         maxLength={10}
          className="border border-gray-300  hover:border-purple-500 transition duration-300 bg-transparent p-2 rounded-md w-1/2"
          readOnly={!isreadOnly}
          id="phone"
          value={user.phone}
          onChange={changeHandle}
        />
        <button
          className="bg-purple-600 text-center font-medium w-1/12 p-1 border-solid rounded-lg opacity-90 text-white shadow-lg"
          onClick={setEditableClick}
        >
          {isreadOnly ? "Save" : "Edit"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export { UserProfile };
