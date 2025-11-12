const express=require("express")
const router=express.Router()
const productControllers=require("../conrollers/productController")
const verifyJWT=require("../middleware/verifyJWT")
const premmition=require("../middleware/premmition")


router.get("/",productControllers.getAll)
router.get("/:id",productControllers.getById)
router.get("/category/:name",productControllers.getByCategory)

router.use(verifyJWT)
router.use(premmition)

router.post("/add",productControllers.addProduct)
router.put("/update",productControllers.updateProduct)
router.put("/updateQty",productControllers.updateQty)
router.delete("/delete/:id",productControllers.deleteProduct)
router.delete("/deleteProducts",productControllers.deleteProducts)

module.exports=router