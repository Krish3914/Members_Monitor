const mongoose  = require("mongoose");
const express = require("mongoose");

const TraineeForm = new express.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
        default:'658d00b9089c300d64f08441'
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    dateOfBirth:{
        type:Date,
        required:true,
    },
    gymPlan:{
        type:String,
        enum:["month","three months","six months","one year"],
        required:true,
    },
    registrationDate:{
        type:Date,
        require:true,
        default:Date.now()
    }

})

module.exports = express.model("trainee",TraineeForm)

