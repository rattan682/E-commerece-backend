const { usermodel } = require("../Model/User")
const { gentoken } = require("../tokengen")

const signupUser=async(req,res)=>{
    try {
        const alreadyuser=await usermodel.findOne({email:req.body.email})
        console.log(alreadyuser)
        if(alreadyuser!=null){
            return res.status(409).json({message:"User already exists"})
        }
    
        const newuser= new usermodel(req.body)
        await newuser.save()
        return res.status(200).json(newuser)
    } catch (error) {
        console.log(error.message)
    }
   

}
// const getuserinfo=async(req,res)=>{
//     try {
//         const
//     } catch (error) {
//         console.log(error.message)
        
//     }
// }
const getuserinfo=async(req,res)=>{
    res.send(req.user)

}
const loginuser=async(req,res)=>{
    try {
        const email=req.body.email
        const password=req.body.password
        const user=await usermodel.findOne({email:email})
        if(!user){
            return res.status(404).json({message:"user does not exists"})
        }
        if(user.password==password){
            const key=process.env.SECRET_KEY
            const token=await gentoken(user,key)
            res.cookie('jwt', token, { 
                expires: new Date(Date.now() + 900000), 
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
                sameSite: 'strict' 
              });
              // Send the token as a response
              return res.status(200).json(token);}
        return res.status(401).json({message:"wrong credentials"})
    } catch (error) {
        console.log(error.message)
    }
}
module.exports={
    signupUser,
    loginuser,
    getuserinfo
}