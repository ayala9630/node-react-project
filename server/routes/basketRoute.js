const express=require("express")
const router=express.Router()
const verifyJWT=require("../middleware/verifyJWT")
const premmition=require("../middleware/premmition")
const basketControllers=require("../conrollers/basketController")

router.use(verifyJWT)

router.get("/",premmition,basketControllers.getAll)
router.get("/getByUserName",basketControllers.getByUserName)
router.post("/add",basketControllers.addBasket)
router.put("/updateQty",basketControllers.updateQty)
router.delete("/delete/:id",basketControllers.deleteBasket)
router.get("/:id",basketControllers.getById)

module.exports=router