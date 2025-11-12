const premmition=(req,res,next)=>{
    const {role}=req.user
    if(role==="user")
        return res.status(403).send("forbidden")
    next()
}
module.exports=premmition