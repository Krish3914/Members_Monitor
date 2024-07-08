// const trainee = require("../model/traineeForm");
// const admin  = require("../model/Admin");
// const users = require("../model/userInfo");

// exports.traineeForm = async(req,res) =>{
//     try{
//         const {name,phone,gymPlan,email,dateOfBirth,owner} = req.body;
//         // console.log("this is owner ",owner); 
        
//         const existingUser = await trainee.findOne({phone});
//         const existingeMail = await trainee.findOne({email});

//         if(existingUser || existingeMail ){
//             // console.log("i am coming here")
//             return res.status(400).json({
//                 success:false,
//                 message:"this user already have a subscription plan",
//             })
//         }
//         const userDetails = await admin.findById(owner);
//         // console.log("this is user deatils ",userDetails)
//         if(userDetails?.role){

//             const user = await users.create({
//                 name,phone,email,password:"maskottchen",dateOfBirth
//             }) 
            
//             return res.status(200).json({
//                 success:true,
//                 messgae:user
//             })
//         }

//         const member = await trainee.create({
//             name,phone,gymPlan,email,dateOfBirth,owner
//         }) 
        
//         return res.status(200).json({
//             success:true,
//             message:member
//         })

//     } catch(err){
//         // console.log(err.message)
//         res.status(500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }

const trainee = require("../model/traineeForm");
const admin = require("../model/Admin");
const users = require("../model/userInfo");

exports.traineeForm = async (req, res) => {
  try {
    const { name, phone, gymPlan, email, dateOfBirth, owner, amount } = req.body;
    // console.log("this is owner ", owner);

    const existingUser = await trainee.findOne({ phone });
    const existingeMail = await trainee.findOne({ email });

    if (existingUser || existingeMail) {
      // console.log("i am coming here")
      return res.status(400).json({
        success: false,
        message: "This user already has a subscription plan",
      });
    }
    const userDetails = await admin.findById(owner);
    // console.log("this is user details ", userDetails)
    if (userDetails?.role) {
      const user = await users.create({
        name,
        phone,
        email,
        password: "maskottchen",
        dateOfBirth,
      });

      return res.status(200).json({
        success: true,
        message: user,
      });
    }

    const member = await trainee.create({
      name,
      phone,
      gymPlan,
      email,
      dateOfBirth,
      owner,
      amount,  // Include amount here
    });

    return res.status(200).json({
      success: true,
      message: member,
    });
  } catch (err) {
    // console.log(err.message)
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
