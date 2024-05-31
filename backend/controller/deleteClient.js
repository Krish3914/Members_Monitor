const client = require("../model/traineeForm");
const User = require("../model/userInfo");

exports.deleteClient = async (req, res) => {
  //fetching id from parameters which we pass in front end file (Tables.js)
  const { id } = req.params;
  try {
    let user = await client.findByIdAndDelete(id);
    if (!user) {
      user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User Not Exists",
        });
      }
    }
    return res.status(200).json({
      success: true,
      message: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "some error occured while deleting the use from database",
    });
  }
};
