const jwt=require("jsonwebtoken")
const gentoken=async(user,key)=>{
    const payload={
        id:user._id,
        email:user.email,
        role:user.role
    }
    const token= jwt.sign(payload,key,{expiresIn:"1h"})
    return token
}
module.exports={
    gentoken
}