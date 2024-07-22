const { ordersModel } = require("../Model/Order")

const addorder=async(req,res)=>{
    try {

        const neworder=await ordersModel.create(req.body)
        res.status(200).json(neworder)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const getallorders=async(req,res)=>{
    try {
        const allorders=await ordersModel.find({})
        res.status(200).json(allorders)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const fetchordersbyid=async(req,res)=>{
    try {
        const id=req.params.id
        const allorders=await ordersModel.find({'order.user':id})
        res.status(200).json(allorders)

    } catch (error) {
        res.status(500).json(error.message)
        
    }
}
const updateorder=async(req,res)=>{
    try {
        const id=req.params.id
        const newdata=req.body
        const updatedorder=await ordersModel.findByIdAndUpdate({_id:id},{$set:newdata})
        res.status(200).json(updatedorder)
    } catch (error) {
        console.log(error.message)
        res.status(500).json(error.message)
        
    }
}
module.exports={
    addorder,
    getallorders,
    fetchordersbyid,
    updateorder
}