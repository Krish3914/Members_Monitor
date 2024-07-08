const mongoose = require("mongoose");
const User = require("../model/userInfo");

exports.signup = async(req,res)=>{
   try{

        const{ name,email,password,phone,isAgreeTerms } = req.body;
        // //console.log("info we fercged ",name,email,password,phone);
        const existingUser = await User.findOne({email});    

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exists"
            })
        }
        const user = await User.create({
            name,email,password,phone,isAgreeTerms
        })

        return res.status(200).json({
            success:true,
            message:user
        })


   } catch(err){
    // //console.log(err.message);
    return res.status(500).json({
        status:false,
        messgae:err,
    })
   }   

}

