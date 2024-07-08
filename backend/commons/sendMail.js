const transporter = require("../Config/transport");
const { error } = require("console");

async function sendMail(userInfo){
  const{from,to,subject,html} = userInfo;
    try {
      // console.log("details are ",from,to,subject,html);
      const isMailsent = await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        html:html,
      });
  
      if (!isMailsent) {
        // console.log("we send the mail")
        throw new error("something occured while sending mail");
      }
      return true;
    } catch (err) {
      // console.log("error is ",err.message)
      return false;
    //   console.log("some error occured ",err.message)
    //  console.log(`some error in db ${err.message}`)
    }
  };

  module.exports = sendMail;

