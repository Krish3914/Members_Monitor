const USER = require("../model/userInfo");
const ADMIN = require("../model/Admin");

exports.Resetpassword = async (req, res) => {
  const { password, confirmpassword, email } = req.body;
  if (password !== confirmpassword) {
    return res.status(401).json({
      success: false,
      message: "confirmpassword && password does not match",
    });
  }
  try {
    let userData = await USER.findOneAndUpdate(
      { email: email },
      {
        $set: {
          password: password,
        },
      }
    );

    if (!userData) {
      userData = await ADMIN.findOne(
        { email: email },
        {
          $set: {
            password: password,
          },
        }
      );
      if (!userData) {
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }
    }


    return res.status(200).json({
      success: true,
      message: "password updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server Message",
    });
  }
};
