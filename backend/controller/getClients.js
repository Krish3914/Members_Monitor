const Trainee = require("../model/traineeForm");
const Admin = require("../model/Admin");
const Users = require("../model/userInfo");

exports.getClients = async (req, res) => {
  try {
    const { ownerId } = req.params;

    let result = await Trainee.find({ owner: ownerId }).sort({
      registrationDate: -1,
    });
    // //console.log("this is result", result);
    if (result.length !== 0) {
      return res.status(200).json({
        sucess: true,
        message: result,
      });
    }

    let ownerDetails = await Admin.findById(ownerId);
    if (!ownerDetails) {
      return res.status(200).json({
        sucess: true,
        message: result,
      });
    }

    result = await Users.find();
    // //console.log("printing result ", result);
    if (result) {
      return res.status(200).json({
        sucess: true,
        message: result,
      });
    }
    // //console.log("printing owner deatils ", ownerDetails);
  } catch (err) {
    res.status(500).json({
      sucess: false,
      message: err.message,
    });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { _id, name, dateOfBirth, email, gymPlan, phone } = req.body;
    // //console.log(
    //   "info about user ",
    //   _id,
    //   name,
    //   dateOfBirth,
    //   email,
    //   gymPlan,
    //   phone
    // );
    let user = await Trainee.findByIdAndUpdate(
      _id,
      { $set: { name, dateOfBirth, email, gymPlan, phone } },
      { new: true }
    );

    if (!user) {
      user = await Users.findByIdAndUpdate(
        _id,
        { $set: { name, dateOfBirth, email, phone } },
        { new: true }
      );
    }
    // //console.log("this user we fetch", user);
    return res.status(200).json({
      success: true,
      message: "update the user successfully",
    });
  } catch (err) {
    // //console.log("error occured while updatinf the client", err.message);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const calculateExpiryDate = (registrationDate, gymPlan) => {
  const currentDate = new Date();
  let expiryDate;

  switch (gymPlan) {
      case "month":
          expiryDate = new Date(registrationDate);
          expiryDate.setMonth(expiryDate.getMonth() + 1);
          break;
      case "three months":
          expiryDate = new Date(registrationDate);
          expiryDate.setMonth(expiryDate.getMonth() + 3);
          break;
      case "six months":
          expiryDate = new Date(registrationDate);
          expiryDate.setMonth(expiryDate.getMonth() + 6);
          break;
      case "one year":
          expiryDate = new Date(registrationDate);
          expiryDate.setFullYear(expiryDate.getFullYear() + 1);
          break;
      default:
          // Handle invalid gymPlan
          return null;
  }

  return expiryDate;
};

exports.getClientsExpiry = async (req, res) => {
  try {
      const ownerId = "65b0fa46f42b2e1e18589db8";

      // //console.log("we get owner id ", ownerId);

      const data = await Trainee.find({ owner: ownerId });

      if (!data) {
          return res.status(402).json({
              success: false,
              message: "users not find inside data",
              data,
          });
      }

      const updatedData = data.map((user) => {
          const expiryDate = calculateExpiryDate(user.registrationDate, user.gymPlan);
          return {
              ...user.toObject(),
              expiryDate,
          };
      });

      return res.status(200).json({
          success: true,
          message: "we fetched the users data with expiry dates",
          data: updatedData,
      });
  } catch (err) {
      // console.error(err.message);
      return res.status(500).json({
          status: false,
          message: "some error occurred while fetching the information ",
          error: err.message,
      });
  }
};

