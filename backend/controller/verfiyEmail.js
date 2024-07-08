const sendMail = require("../commons/sendMail")
const USER = require("../model/userInfo");
const EMAILDB = require("../model/verifyEmail");
const otpGenerator = require("otp-generator");

exports.verfiyEmail = async(req,res)=>{
    try{
        const {email} = req.body;
        // console.log("email is ",email);
        

          const userData = await USER.findOne({email:email});
          
          if(userData){

            return res.status(403).json({
                success:false,
                message:"User Already Exists"
              });

          }

          const otp = otpGenerator.generate(4, {
            specialChars: false,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
          });

          const setEmail = await EMAILDB.create({otp:otp,email:email});

          const sendemailFormat = {
            from: "Admin",
            to: email,
            subject: "Verify Your Email Account",
            html: `<html>
                <head>
                    <title>Email Verification Required</title>
                </head>
                <body>
                    <h2>Verify Your Email to Sign Up for MembersMonitor</h2>
                    <p>
                        Dear User,<br><br>
                        Thank you for choosing to sign up for MembersMonitor.<br>
                        To complete your registration, we need to verify your email address.<br><br>
                        Your One-Time Password (OTP) for email verification is: <strong>${otp}</strong><br><br>
                        Please use this OTP to verify your email within the specified time.<br><br>
                        If you have any questions or concerns, feel free to reach out to our support team at support@maskottchhen.com.<br><br>
                        Your satisfaction is our priority.<br><br>
                        Sincerely,<br>
                        Admin<br>
                        MembersMonitor Team
                    </p>
                </body>
            </html>`
        };
        

          const ismailSend = await sendMail(sendemailFormat);
          if(!ismailSend){
            return res.status(403).json({
                success:false,
                message:"unable to send Mail"
              });
          }

        return res.status(200).json({
            success:true,
            message:"i think it is done"
        })
    } catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
        // console.log("error is ",err.message);
    }
}