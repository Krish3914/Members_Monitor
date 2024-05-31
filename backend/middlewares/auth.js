const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/userInfo");
const Admin = require("../model/Admin");

exports.auth = async (req, res, next) => {
  try {
    // extracting cookie from header
    // console.log("extracting out cookie form header",req.header("Authorization").split("Bearer")[1]);
    const token = req.header("Authorization").replace(/^Bearer\s/, '');
    // console.log(token)
    if (!token || token === undefined) {
      res.status(401).json({
        success: false,
        message: "no token is found in request",
      });
    }
    try {
      
      const payload = jwt.verify(token, process.env.secret);
      // console.log("this is payload id",payload.id);
      const id = payload.id;
      //we will find person from user db
      let user = await User.findById(id);
      //if user is null then we will find person from admin db
      if(!user) user = await Admin.findById(id);
      //unable to add token here
      // console.log("we find user",user);
      user.token = token;
      req.user = user;
      next();
    } catch (err) {
      // console.log("User not Exists");
      res.status(401).json({
        success: false,
        message: err.message,
      });
    }
  } catch (err) {
    // console.log(err.message);
    res.status(401).json({
      success: false,
      message:err.message,
    });
  }
};
