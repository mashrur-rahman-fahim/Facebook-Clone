import User from "../../models/User.js";

export const registerUser=async(req,res)=>{
    const {email}=req.body;
    try {
        const existUser=await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"Email already exist"});
        }
        const newUser=await User.create(req.body);
        if(!newUser){
            return res.status(500).json({message:"Server error"});
        }
        res.json({message:"User registered successfully",user:newUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error",error});
        
    }
}