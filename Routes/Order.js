const express=require("express")
const { addorder, getallorders, fetchordersbyid, updateorder } = require("../Controller/Orders")
const orderRouter=express.Router()
orderRouter.post("/addorder",addorder)
orderRouter.get("/getallorders",getallorders)
orderRouter.get("/getordersbyid/:id",fetchordersbyid)
orderRouter.patch("/updateorder/:id",updateorder)
module.exports={
    orderRouter
}