const mongoose = require("mongoose");
require("dotenv").config()

const dbConnect = ()=> {
    mongoose.connect(process.env.URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{
        console.log("DB connetion is SucessFull");
    })
    .catch((err)=>{
        console.error(err.message)
        console.log("some Error Occured while making the db connection");
        process.exit(1);
    })
} 

module.exports = dbConnect;


