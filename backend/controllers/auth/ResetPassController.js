import User from "../../models/User.js";
import { hashPassword } from "./RegisterController.js";
import { generateToken } from "./TokenController.js";

export const verifyCode=async(req,res)=>{
    const {email,code}=req.body;
    
    const user=await User.findOne({email});
  
    if(!user){
        
        return res.status(404).json({message:"User not found",success:false});
    }
    if(user.resetToken!==code || user.resetTokenExpiration<Date.now()){
        return res.status(401).json({message:"Invalid code",success:false});
    }
   
    return res.json({message:"Code verified",success:true});

}
export const resetPass=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"User not found",success:false});
    }
   
    const hashPass=await hashPassword(password);
    user.password=hashPass;
    user.resetToken=null;
    user.resetTokenExpiration=null;
    await user.save();
    const token=await generateToken(user);
    res.cookie("refreshToken",token.refreshToken,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    })
    return res.json({message:"Password reset successfully",success:true,accessToken:token.accessToken});

}