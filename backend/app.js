const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cron = require("./jobs/sendExpiryMail");
const fileUpload = require("express-fileupload");
const cloudinaryConnect = require("./Config/cloudinary");
// cron.start();
require("dotenv").config();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use( express.json() );

app.use(cookieParser());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


const dbConnect = require("./Config/dbConnect");
dbConnect();

// cloud connection
cloudinaryConnect.cloudinaryConnect();

const user = require("./routes/user");
app.use("/api/v1",user);

app.listen(PORT,()=>{
    console.log(`app in running at port ${PORT}`);
})

app.get("/",(req,res)=>{
    return res.send("<h1>App run in cheking mode successfully</h1>");
})

/*this is comment*/

