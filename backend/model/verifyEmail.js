const mongoose = require("mongoose");

const EmailDB = mongoose.Schema({
    email:{
       type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true,
        expires: 2 * 1000* 60 * 60
    }
})

module.exports = mongoose.model("EmailDB",EmailDB);