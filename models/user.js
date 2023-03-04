const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image: {
        type: String,
        required: true,
    }
})

const userModel = mongoose.model("frosthackUser",userSchema);

module.exports = userModel;