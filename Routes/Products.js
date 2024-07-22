const express=require("express")
const { createproduct, getproducts, getproductbyid, deleteProductbyid, updateProduct } = require("../Controller/Product")
const router=express.Router()
router.post("/createproduct",createproduct)
router.get("/",getproducts)
router.get("/:id",getproductbyid)
router.delete("/deleteproduct/:id",deleteProductbyid)
router.patch("/updateproduct/:id",updateProduct)
module.exports=router