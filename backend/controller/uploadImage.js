const cloudinary = require("cloudinary").v2;
const ADMIN = require("../model/Admin");
const USER = require("../model/userInfo");


const uploadImageToCloudinary = async(file,folder,size)=>{
    const options = {folder,quality:70};
    options.resource_type = "auto";
    if(size){
        options.size = size;
    }

    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath,options);
        // //console.log(result);
        return result;

    } catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
        // console.error("stuck in error");
        // console.error(err.message);
    }
}


const uploadImage = async(req,res)=>{
    try{
        const image = req.body.convertedImage;
        // console.log("image we received ",image);
        // console.log("req body ",req.body.email);
        const email = req.body.email;
        if(!image){
            return res.json({
                success:false,
                message:"please select image first"
            })
        }

        // const imgType = image.name.split(".")[1].trim();
        // //console.log("image type is ",imgType);
        let flag = false;

        // const supportedType = ["jpeg","jpg","png"];

        // supportedType.map((data)=>{
        //     if(data === imgType)    flag = false;
        // });

        // if(flag){
        //     return res.status(415).json({
        //         success:false,
        //         message:"unsupported file type"
        //     })
        // }

        // const response = await uploadImageToCloudinary(image,"GYM_MANAGE");

        // if(!response){
        //     return res.json({
        //         success:false,
        //         message:"error while uploading image.. try again"
        //     })
        // }

            let userData = await ADMIN.findOneAndUpdate({"email":email},{$set:{photo:image}},{new:true});
         if(!userData){
            userData = await USER.findOneAndUpdate({"email":email},{$set:{photo:image}},{new:true});
         }
        // //console.log("response after uploading ",response);

        return res.json({
            success:true,
            message:"lets check",
            data:userData
        })
    } catch(err){
        // console.log(err.message);
        return res.json({
            success:false,
            message:err.message
        })
    }
}
module.exports = uploadImage;