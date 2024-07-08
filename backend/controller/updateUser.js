const User = require("../model/userInfo");
const ADMIN = require("../model/Admin");
const sendMail = require("../commons/sendMail");

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, _id, plan } = req.body;
    // //console.log("this is req body ", req.body);

    let updateUser = await User.findOneAndUpdate(
      { _id: _id },
      { $set: { name, email, phone, plan } },
      { new: true }
    );

    if (!updateUser) {

      updateUser = await ADMIN.findOneAndUpdate(
        { _id: _id },
        { $set: { name, email, phone, plan } },
        { new: true }
      );
        if(!updateUser){
      return res.status(404).json({
        success: false,
        message: "user is note found in existing database",
      });}
    }
    // this function will send user information when there is an update
    const sendemailFormat = {
      from:"Admin",
      to:updateUser.email,
      subject:"Update User Information",
      html:`<html>
      <head>Update in Your password</head>
      <body>
        <h2>Update User Information</h2>
          www.membersmonitor.com
        <p> We appreciate your attention to these changes. If you have any questions or concerns, feel free to reach out to our support team at support@maskottchhen.com. Your satisfaction is our priority.</p>
      </body>
    </html>`
  }
    const isMailSend = await sendMail(sendemailFormat);
    return res.status(200).json({
      success: true,
      message: updateUser,
    });
  } catch (err) {
    //console.log(err.message)
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


