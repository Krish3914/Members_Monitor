const EMAILDB = require("../model/verifyEmail");

exports.verifyEmailOtp = async (req, res) => {
  try {
    
    const { otp, email } = req.body;
    // //console.log("verify otp body ",otp,email)
    if (!otp || !email) {
      return res.status(200).json({
        success: true,
        message: "empty fields",
      });
    }

    const user = await EMAILDB.findOne({ email: email });
    if (!user){
      return res.status(404).json({
        success:false,
        message:""
      })
    }

    if(user.otp == otp){
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
