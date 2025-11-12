const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    descraption: {
        type: String,
        require: true,
        maxLength: 1000
    },
    category: {
        type: String,
        enum: ["bow","guitars","pianos","windInstrument","drums","other"],
        default: "other"
    },
    tags: {
        type: [String]
    },
    quentity: {
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        require: true
    },
    image:{
        type:String,
        default:"1.png",
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)