const mongoose=require("mongoose")
const basketSchema=new mongoose.Schema({
    user:{
        type:mongoose.ObjectId,
        ref:"User",
        immutable:true
    },
    product:{
        type:mongoose.ObjectId,
        ref:"Product",
        immutable:true
    },
    quentity:{
        type:Number,
        default:1,          
    },
    active:{
        type:Boolean,
        default:true
    }

},{timestamps:true})

module.exports=mongoose.model("Basket",basketSchema)