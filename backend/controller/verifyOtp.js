const USER = require("../model/userInfo");
const ADMIN = require("../model/Admin");
const OTP = require("../model/OTP");
exports.verifyOtp = async (req, res) => {
  try {
    
    const { otp, email } = req.body;
    // //console.log("verify otp body ",otp,email)
    if (!otp || !email) {
      return res.status(200).json({
        success: true,
        message: "empty fields",
      });
    }

    const user = await USER.findOne({ email: email });
    if (!user) {
      //console.log("dont know how did it executes !user")
      const admin = await ADMIN.findOne({ email: email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not Exists ",
        });
      }
    }

    const { _id } = user;

    const isOtpExist = await OTP.findOne({userId:_id});
    console.log(isOtpExist.otp)
    if(!isOtpExist){
        return res.status(400).json({
            success:false,
            message:"Otp is not exists"
        })
    }

    if(isOtpExist.otp == otp){
        return res.status(200).json({
            success:true,
            message: "verified the otp",
        })
    }

    return res.status(404).json({
      success: false,
      message: "Otp Does not matches please try Again",
    });

  } catch (err) {
    // //console.log(err.message);
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
      error: err.message,
    });
  }
};
