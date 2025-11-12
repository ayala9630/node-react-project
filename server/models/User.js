const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }

}, { timestamps: true })

module.exports = mongoose.model("User",userSchema)