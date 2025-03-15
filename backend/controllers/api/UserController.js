import User from "../../models/User.js";

export const userDetails=async(req,res)=>{
   
    const email=req.email;
    const user=await User.findOne({email});
   
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({message:"User fetched",user:user});
}
