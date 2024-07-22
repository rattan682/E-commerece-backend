const { Product } = require("../Model/Product")

exports.createproduct=async(req,res)=>{
    
    const response=await Product.insertOne(req.body)
    return res.status(201).json(response)
}
exports.getproductbyid=async(req,res)=>{
    const id=req.params.id
    const product=await Product.findById(id)
    return res.status(200).json(product)
}
exports.deleteProductbyid=async(req,res)=>{
    const id=req.params.id
    const deletedproduct=await Product.deleteOne({_id:id},{new:true})
    res.status(200).json(deletedproduct)
}
exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedProductData = req.body;
        console.log(updatedProductData);

        // Update the product
        await Product.updateOne({ _id: id }, { $set: updatedProductData });

        // Retrieve the updated product
        const updatedProduct = await Product.findById(id);
        console.log(updatedProduct);

        // Send the updated product in the response
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message });
    }
};
exports.getproducts=async(req,res)=>{
    let query = Product.find({})
    let total=Product.find({})
    if(req.query.category){
        query= query.find({category:req.query.category})
        total=total.find({category:req.query.category})
    }
    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort]:req.query._order})                                                                                                                                                                                                                
    }
    if(req.query._page && req.query._per_page){
        const pageSize=+req.query._per_page
        const page=+req.query._page
        query = query.skip(pageSize*(page-1)).limit(pageSize)
    }
    try {
        const docs=await query.exec()
        const totalitems=await total.exec()
    
        res.status(200).json({docs:docs,total:totalitems.length})
    } catch (error) {
        res.status(400).json(error)
    }
}