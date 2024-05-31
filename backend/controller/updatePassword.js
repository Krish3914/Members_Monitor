const ADMIN = require("../model/Admin");
const USER = require("../model/userInfo");

const updatePassword = async (req, res) => {
  try {
    const { email, passwordData } = req.body;
    const { currpass, newpass, confirmpass } = passwordData;
    if (newpass !== confirmpass) {
      return res.status(401).json({
        success: false,
        message: "new password & confirm password  does not match",
      });
    }

    // coming here means password & confirm password matched

    // checking the user who want to change password is admin

    // checking password from req is matching with the password stored db

    let userPass = await ADMIN.findOne({ email: email });

    if (!userPass) {
      userPass = await USER.findOne({ email, email });
    }

    // this means password is not matching
    if (userPass.password !== currpass) {
      return res.status(401).json({
        success: false,
        message: "password not does match",
      });
    }

    // coming here passowrd is matching
    let userData = await ADMIN.findOneAndUpdate(
      { email: email },
      { password: newpass },
      { new: true }
    );

    if (!userData) {
      // coming here means user who wants to cheanges pass is not admin
      userData = await USER.findOneAndUpdate(
        { email: email },
        { password: newpass },
        { new: true }
      );
    }

    // //console.log("this is user from use db ", userData);

    return res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error: err.message,
    });
  }
};

module.exports = updatePassword;
