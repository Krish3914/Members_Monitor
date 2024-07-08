const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    otp:{
        type:Number,
        required:true,
        expires: 2 * 1000* 60 * 60
    }
})

module.exports = mongoose.model("otp",otpSchema);