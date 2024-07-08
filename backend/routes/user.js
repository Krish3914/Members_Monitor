// const express = require("express");
// const router = express.Router();

// const { signup } = require("../controller/signUp");
// const { login } = require("../controller/Login");
// const { traineeForm } = require("../controller/addTrainee");
// const { getClients ,updateClient,getClientsExpiry} = require("../controller/getClients");
// const { auth } = require("../middlewares/auth");
// const {dashboard} = require("../controller/dashboard");
// const { updateUser } = require("../controller/updateUser");
// const {deleteClient} = require("../controller/deleteClient");
// const {makePayment} = require("../controller/payment");
// const updatePassword = require("../controller/updatePassword");
// const uploadImage = require("../controller/uploadImage");
// const sendOTP = require("../controller/sendOTP");
// const {verifyOtp} = require("../controller/verifyOtp");
// const { Resetpassword } = require("../controller/Resetpassword");
// const {verfiyEmail} = require("../controller/verfiyEmail");
// const {verifyEmailOtp} = require("../controller/verifyEmailOtp");
// const sendComplaint=require("../controller/sendComplaint");



// //route for signup for the new Clients
// router.post("/signup", signup);


// //route for doing login in the website
// router.post("/login", login);


// //route for getting all clients from the database
// router.get("/clients/:ownerId", getClients);

// //route for getting all clients from the database based on their epxiry of membership
// router.get("/clients", getClientsExpiry);


// //route for adding the clients in the database
// router.post("/addtrainee", traineeForm);


// //route for validating the user
// router.get("/dashboard", auth, dashboard);


// //route for updating the information of user
// router.put("/updateuser",updateUser);


// //route for deleting the clients
// router.delete("/deleteclient/:id",deleteClient);

// //route for updating the client
// router.put("/updateclient",updateClient);

// // router fro making payment
// router.post("/makepayment",makePayment);

// // updating the password
// router.put("/updatepassword",updatePassword);

// // uplaod image to the cloudinary
// router.put("/upload-image",uploadImage);

// // otp send request
// router.post("/send-otp",sendOTP);

// // verifify the otp.
// router.post("/verifyotp",verifyOtp);

// router.post("/complaints",sendComplaint);

// // reset password
// router.put("/resetpassword",Resetpassword);

// router.post("/verify-mail",verfiyEmail);

// router.post("/verifyemailotp",verifyEmailOtp);



// //exporting the route
// module.exports = router;



const express = require("express");
const router = express.Router();

const { signup } = require("../controller/signUp");
const { login } = require("../controller/Login");
const { traineeForm } = require("../controller/addTrainee");
const { getClients ,updateClient,getClientsExpiry} = require("../controller/getClients");
const { auth } = require("../middlewares/auth");
const {dashboard} = require("../controller/dashboard");
const { updateUser } = require("../controller/updateUser");
const {deleteClient} = require("../controller/deleteClient");
const {makePayment} = require("../controller/payment");
const updatePassword = require("../controller/updatePassword");
const uploadImage = require("../controller/uploadImage");
const sendOTP = require("../controller/sendOTP");
const {verifyOtp} = require("../controller/verifyOtp");
const { Resetpassword } = require("../controller/Resetpassword");
const {verfiyEmail} = require("../controller/verfiyEmail");
const {verifyEmailOtp} = require("../controller/verifyEmailOtp");
const sendComplaint=require("../controller/sendComplaint");
const { logVisit } = require('../controller/logVisit');
const { getDailyVisits } = require('../controller/getDailyVisits');



//route for signup for the new Clients
router.post("/signup", signup);


//route for doing login in the website
router.post("/login", login);


//route for getting all clients from the database
router.get("/clients/:ownerId", getClients);

//route for getting all clients from the database based on their epxiry of membership
router.get("/clients", getClientsExpiry);


//route for adding the clients in the database
router.post("/addtrainee", traineeForm);


//route for validating the user
router.get("/dashboard", auth, dashboard);


//route for updating the information of user
router.put("/updateuser",updateUser);


//route for deleting the clients
router.delete("/deleteclient/:id",deleteClient);

//route for updating the client
router.put("/updateclient",updateClient);

// router fro making payment
router.post("/makepayment",makePayment);

// updating the password
router.put("/updatepassword",updatePassword);

// uplaod image to the cloudinary
router.put("/upload-image",uploadImage);

// otp send request
router.post("/send-otp",sendOTP);

// verifify the otp.
router.post("/verifyotp",verifyOtp);

router.post("/complaints",sendComplaint);

router.post('/log-visit', logVisit);

router.get('/daily-visits', getDailyVisits);

// reset password
router.put("/resetpassword",Resetpassword);

router.post("/verify-mail",verfiyEmail);

router.post("/verifyemailotp",verifyEmailOtp);


//user visit the website
router.post("/", logVisit);



//exporting the route
module.exports = router;

