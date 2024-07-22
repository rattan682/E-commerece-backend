const { default: mongoose } = require("mongoose");

const cartSchema=new mongoose.Schema({
    "title": "string",
    "description": "string",
    "category": "string",
    "price": "number",
    "discountPercentage": "number",
    "rating": "number",
    "stock": "number",
    "tags": [
      "string"
    ],
    "brand": "string",
    "sku": "string",
    "weight": "number",
    "dimensions": {
      "width": "number",
      "height": "number",
      "depth": "number"
    },
    "warrantyInformation": "string",
    "shippingInformation": "string",
    "availabilityStatus": "string",
    "reviews": [
      {
        "rating": "number",
        "comment": "string",
        "date": "string",
        "reviewerName": "string",
        "reviewerEmail": "string"
      }
    ],
    "returnPolicy": "string",
    "minimumOrderQuantity": "number",
    "meta": {
      "createdAt": "string",
      "updatedAt": "string",
      "barcode": "string",
      "qrCode": "string"
    },
    "images": [
      "string"
    ],
    "thumbnail": "string",
    "deleted": "boolean",
    "highlights": [
      "string"
    ],
    "quantity": "number",
    "user": "string"
  })
const virtual=cartSchema.virtual('id')
virtual.get(function(){
    return this._id
})
cartSchema.set('toJSON', {
    virtuals:true,
    versionKey:false,
    transform:function (doc,ret) {delete ret._id}
})   
exports.cartModel=mongoose.model("Cart",cartSchema)