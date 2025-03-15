import User from "../../models/User.js";
import bcrypt from 'bcrypt';
import { generateToken } from "./TokenController.js";

const hashPassword=async(password)=>{
    const saltRounds = 10; // Controls the complexity of the hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const registerUser=async(req,res)=>{
    const {email}=req.body;
    try {
        
        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"Email already exist"});
        }
        req.body.password=await hashPassword(req.body.password);
        const newUser=await User.create(req.body);
        if(!newUser){
            return res.status(500).json({message:"Server error"});
        }
        const token=generateToken(newUser);
      
        res.cookie('refreshToken',token.refreshToken,{
            httpOnly:false,
            secure:true,
            sameSite:"None"
        })
      
       return res.status(200).json({message:"User registered successfully",user:newUser,accessToken:token.accessToken});
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Server error",error});
        
    }
}