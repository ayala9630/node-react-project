const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User = require("../models/User")

const register=async(req,res)=>{
    const {userName,password,firstName,lastName,phone,email,address,role}=req.body
    if(!userName||!password||!firstName||!lastName||!phone)
        return res.status(406).send("userName, password, firstName, lastName and phone are required!")
    const duplicate=await User.findOne({userName})
    if(duplicate)
        return res.status(409).send("Duplicate userName")
    const hashPwd=await bcrypt.hash(password,10)
    const newUser={userName,password:hashPwd,firstName,lastName,phone,email,address,role}
    const user=await User.create(newUser)
    if(!user)
        res.status(404).send("Invalid user recieved")
    res.status(201).send("new user created successfully")
}

const login=async(req,res)=>{
    const{userName,password}=req.body
    if(!userName || !password)
        return res.status(406).send("UserName and Password are required")
    const user=await User.findOne({userName})
    if(!user)
        return res.status(401).send("Unauthorized")
    const match=await bcrypt.compare(password,user.password)
    if(!match)
        return res.status(401).send("Unauthorized")
    const userInfo={
        _id:user._id,
        userName:user.userName,
        firstName:user.firstName,
        lastName:user.lastName,
        address:user.address,
        phone:user.phone,
        email:user.email,
        role:user.role
    }
    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken ,role: user.role})
}

module.exports={login,register}