const { categoryModel } = require("../Model/Category")

const getCategories=async(req,res)=>{
    const response=await categoryModel.find({})
    return res.send(response)
}
module.exports={
    getCategories
}