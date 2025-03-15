export const logout=(req,res)=>{
    
    res.cookie('refreshToken'," ",{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
       
    });
    return res.status(200).json({message:"User logged out"});
    
}