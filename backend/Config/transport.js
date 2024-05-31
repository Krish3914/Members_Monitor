const nodeMailer =require("nodemailer");
require("dotenv").config();

const transporter = nodeMailer.createTransport({
    host:process.env.MAIL_HOST,
    auth:{
        user:process.env.MAIL_ID,
        pass:process.env.MAIL_PASS,
        method:"PLAIN"
    }
});

module.exports = transporter;