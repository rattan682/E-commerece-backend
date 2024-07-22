const { default: mongoose } = require("mongoose");
const userSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,required:true,default:"user"}
})
const virtual=userSchema.virtual('id')
virtual.get(function(){
    return this._id
})
userSchema.set('toJSON', {
    virtuals:true,
    versionKey:false,
    transform:function (doc,ret) {delete ret._id}
})   
exports.usermodel=mongoose.model('User',userSchema)