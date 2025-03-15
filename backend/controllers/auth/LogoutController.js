export const logout=(req,res)=>{
    
    res.cookie('refreshToken'," ",{
        httpOnly:false,
        secure:false,
        sameSite:'None'
       
    });
    return res.status(200).json({message:"User logged out"});
    
}