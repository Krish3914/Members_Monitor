const User = require("../model/userInfo");
const Admin = require("../model/Admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({
        status: false,
        message: "please fill all the details",
      });
    }
    // const user = await User.findOne({email});
    let user = await User.findOne({ email });
    
    if(!user){
      user = await Admin.findOne({ email });
    }
    if (user) {
      if (user.email === email && user.password === password) {
        const payload = {
          mail: user.email,
          id: user._id,
          password: user.password,
        };

        let token = jwt.sign(payload, process.env.secret, {
          expiresIn: "2h",
        });

        user = user.toObject();
        user.token = token;
        user.password = undefined;

        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        
        res.cookie("usertoken", token, options);
        res.status(200).json({
          user,
          token,
          status: true,
          message: "Login Successful",
        });
      } else {
        return res.status(500).json({
          status: false,
          message: "Password Does not match",
        });
      }
    } else {
      res.status(500).json({
        status: false,
        message: "user not exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Some Error Occured",
    });
  }
};
