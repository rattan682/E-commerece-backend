const { cartModel } = require("../Model/Cart");
const { getproductbyid } = require("./Product");

const addtocart = async (req, res) => {
    try {
        const product = req.body;
        const newproduct = await cartModel.create(product);
        res.status(201).json(newproduct);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
};
const getcartproductsbyid=async(req,res)=>{
    try {
        const id=req.params.id
        const products=await cartModel.find({user:id})
      
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error.message);
    }
}
const updatecart=async(req,res)=>{
    try {
        const id=req.params.id
        const olddata=req.body
        const newdata=await cartModel.findOneAndUpdate({_id:id},{$set:olddata},{new:true})
        return res.status(200).json(newdata)
    } catch (error) {
        console.log(error.message)
    }
}
const deletebyid=async(req,res)=>{
    try {
        const id=req.params.id
        const deleteddoc=await cartModel.findByIdAndDelete({_id:id},{new:true})
        return res.status(200).json(deleteddoc)
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    addtocart,
    getcartproductsbyid,
    updatecart,
    deletebyid
};