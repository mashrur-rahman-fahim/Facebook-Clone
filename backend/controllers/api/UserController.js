import User from "../../models/User.js";

export const userDetails = async (req, res) => {
  try {
    const { email } = req;

    const user = await User.findOne({ email }, { _id: 0, __v: 0 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User fetched successfully", user });
  } catch (err) {
    console.error("Error fetching user details:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const indentity=async(req,res)=>{
 
    const {email}=req.body;
   
    const user=await User.findOne({email});
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({message:"User identity fetched",user:user.email});
}
