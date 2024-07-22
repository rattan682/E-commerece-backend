const express=require("express")
const { addtocart, getcartproductsbyid, updatecart, deletebyid } = require("../Controller/Cart")
const CartRouter=express.Router()
CartRouter.post("/addtocart",addtocart)
CartRouter.get("/getproductsbyid/:id",getcartproductsbyid)
CartRouter.patch("/updatecart/:id",updatecart)
CartRouter.delete("/deletecartbyid/:id",deletebyid)
module.exports={
    CartRouter
}