// const Complaint = require("../model/Complaint");
// const transporter = require("../Config/transport");
// // const USER = require("../model/userInfo"); // Assuming it's not used

// const sendComplaint = async (req, res) => {
//   const { name, phone, message } = req.body;
//   // const userEmail = req.user.email; // Assuming req.user contains the logged-in user's information

//   try {
//     // Store complaint in the database
//     const complaint = new Complaint({ name, phone, message });
//     await complaint.save();

//     // Prepare email content
//     const emailContent = {
//       from: process.env.MAIL_ID, // Use the MAIL_ID from the .env file as the sender
//       to: process.env.MAIL_ID, // Use the MAIL_ID from the .env file as the recipient
//       subject: "New Complaint Received",
//       html: `
//         <html>
//         <head></head>
//         <body>
//           <h2>New Complaint Received</h2>
//           <p><strong>Name:</strong> ${name}</p>
//           <p><strong>Phone:</strong> ${phone}</p>
//           <p><strong>Message:</strong> ${message}</p>
//         </body>
//         </html>
//       `,
//     };

//     // Send email
//     await transporter.sendMail(emailContent);

//     return res.status(200).json({
//       success: true,
//       message: "Complaint sent successfully!",
//     });
//   } catch (err) {
//     console.error('Error occurred:', err.message);
//     console.error(err.stack); // Log the stack trace for more details
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// module.exports = sendComplaint;
const Complaint = require("../model/Complaint");
const transporter = require("../Config/transport");
require('dotenv').config();

const sendComplaint = async (req, res) => {
    const { name, phone, message } = req.body;
    // const userEmail = req.user.email; // Assuming req.user contains the logged-in user's information

    try {
        // Store complaint in the database
        console.log('Attempting to save complaint to database');
        const complaint = new Complaint({ name, phone, message });
        await complaint.save();
        console.log('Complaint saved to database successfully');

        // Prepare email content
        const emailContent = {
            from: process.env.MAIL_ID, // Use the MAIL_ID from the .env file as the sender
            to: process.env.MAIL_ID, // Use the MAIL_ID from the .env file as the recipient
            subject: "New Complaint Received",
            html: `
                <html>
                <head></head>
                <body>
                    <h2>New Complaint Received</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Message:</strong> ${message}</p>
                </body>
                </html>
            `,
        };

        // Send email
        console.log('Attempting to send email');
        await transporter.sendMail(emailContent);
        console.log('Email sent successfully');

        return res.status(200).json({
            success: true,
            message: "Complaint sent successfully!",
        });
    } catch (err) {
        console.error('Error occurred:', err.message);
        console.error(err.stack); // Log the stack trace for more details
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = sendComplaint;
