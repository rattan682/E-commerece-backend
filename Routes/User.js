const express=require("express")
const { signupUser, loginuser, getuserinfo, signoutuser } = require("../Controller/User")
const { verifytoken } = require("../verifyToken")
const userRouter=express.Router()
userRouter.post("/signup",signupUser)
userRouter.post("/login",loginuser)
userRouter.get("/signoutuser",signoutuser)
userRouter.get("/getuserinfo",verifytoken,getuserinfo)
module.exports={
    userRouter
}
