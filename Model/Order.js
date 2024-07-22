const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for reviews
const reviewSchema = new Schema({
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, required: true },
    reviewerName: { type: String, required: true },
    reviewerEmail: { type: String, required: true }
});

// Define schema for dimensions
const dimensionsSchema = new Schema({
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true }
});

// Define schema for cart items
const cartItemSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    tags: { type: [String], required: true },
    brand: { type: String, required: true },
    sku: { type: String, required: true },
    weight: { type: Number, required: true },
    dimensions: { type: dimensionsSchema, required: true },
    warrantyInformation: { type: String, required: true },
    shippingInformation: { type: String, required: true },
    availabilityStatus: { type: String, required: true },
    reviews: { type: [reviewSchema], required: true },
    returnPolicy: { type: String, required: true },
    minimumOrderQuantity: { type: Number, required: true },
    meta: {
        createdAt: { type: Date, required: true },
        updatedAt: { type: Date, required: true },
        barcode: { type: String, required: true },
        qrCode: { type: String, required: true }
    },
    images: { type: [String], required: true },
    thumbnail: { type: String, required: true },
    quantity: { type: Number, required: true },
    user: { type: String, required: true }
});

// Define schema for user

// Define schema for shipping data
const shippingDataSchema = new Schema({
    firstName: { type: String, required: true },
    Email: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    streetAddress: { type: String, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    zipCode: { type: String, required: true }
});

// Define schema for order
const orderSchema = new Schema({
    shippingdata: { type: shippingDataSchema, required: true },
    cartItems: { type: [cartItemSchema], required: true },
    paymentmethod: { type: String, required: true },
    paymentstatus:{ type:String,default:"pending"},
    totalamount: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, required: true }
});

// Define main schema for the data
const mainSchema = new Schema({
    order: { type: orderSchema, required: true }
});
const virtual=mainSchema.virtual('id')
virtual.get(function(){
    return this._id
})
mainSchema.set('toJSON', {
    virtuals:true,
    versionKey:false,
    transform:function (doc,ret) {delete ret._id}
})   
const ordersModel = mongoose.model('Orders', mainSchema);

module.exports = { ordersModel };
