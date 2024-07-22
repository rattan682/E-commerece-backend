const express=require("express")
const { getCategories } = require("../Controller/Category")
const categoryRouter=express.Router()
categoryRouter.get("/",getCategories)
module.exports={
    categoryRouter
}