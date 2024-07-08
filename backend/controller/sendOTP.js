const otpGenerator = require("otp-generator");
const ADMIN = require("../model/Admin");
const USER = require("../model/userInfo");
const OTP = require("../model/OTP");
const sendMail = require("../commons/sendMail")

const sendOTP = async (req, res) => {
  let { email } = req.body;
  let user = await ADMIN.findOne({ email: email });
  try {
    if (!user) {
      user = await USER.findOne({ email: email });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "user not exists",
        });
      }
    }
    // we get user either from admin or from user db

    const userId = user._id;

    // we will generate otp here

    const otp = otpGenerator.generate(4, {
      specialChars: false,
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
    });

    // store otp stored in the db
    const searchOtpInDb = await OTP.findOne({userId:userId});
    let result = undefined;
    if(searchOtpInDb){
      const {_id} = searchOtpInDb;
      result = await OTP.findByIdAndUpdate({_id},{$set:{otp:otp}},{new:true});
      // //console.log("result is",result)
    }   
    else {result = await OTP.create({ userId:userId,otp:otp});}

    
    const sendemailFormat = {
        from:"Admin",
        to:user.email,
        subject:"OTP Recieved",
        html:`<html>
        <head>Update in Your password</head>
        <body>
          <h2>OTP send to your email</h2>
          ${result.otp}
          <p>if you think you are not the one please feel free to contact us</p>
        </body>
      </html>`

    }
    const ismailSend = await sendMail(sendemailFormat);

    return res.status(200).json({
        success:true,
        message:"send otp successfully"
    });
  } catch (err) {
    //console.log(err.message)
    return res.status(500).json({
      success:false,
      message:"internal server error"
    })
  }
};



module.exports = sendOTP;
