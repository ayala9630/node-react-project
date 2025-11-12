const Basket=require("../models/Basket")

//create
const addBasket=async(req,res)=>{
    const {product}=req.body
    if(!product)
        return res.status(406).send("User and product are required")
    const newBasket={user:req.user._id,product,quentity:1}
    const basket=await Basket.create(newBasket)
    res.json(basket)
}

//read
const getAll=async(req,res)=>{
    const baskets=await Basket.find()
    if(!baskets)
        return res.status(404).send("not found")
    res.json(baskets)
}

const getById=async(req,res)=>{
    const {id}=req.params//מוצר
    const {_id} = req.user//משתמש
    const basket=await Basket.find({product:id,user:_id})
    if(!basket)
        return res.status(404).send("not found")
    res.json(basket)
}

const getByUserName=async(req,res)=>{
    const {_id} = req.user
    const baskets=await Basket.find({user:_id},{product:1,quentity:1}).populate("product",{tags:0,quentity:0})
    if(!baskets)
        return res.status(404).send("not found")
    res.json(baskets)
}

//update
const updateQty=async(req,res)=>{
    const {id,quentity}=req.body
    if(!id||!quentity)
        return res.status(406).send("Id and quentity are required")
    const basket=await Basket.findById(id)
    basket.quentity=quentity
    await basket.save()
    res.json("updated successfully!")
}

//delete
const deleteBasket=async(req,res)=>{
    const {id}=req.params
    const {_id} = req.user
    console.log(id);
    console.log(_id);
    const basket=await Basket.findOne({product:id,user:_id})
    if(!basket)
        return res.status(404).send("Not found")
    await basket.deleteOne()
    res.send("Deleted successfully")
}

module.exports={getAll,getById,addBasket,updateQty,deleteBasket,getByUserName}