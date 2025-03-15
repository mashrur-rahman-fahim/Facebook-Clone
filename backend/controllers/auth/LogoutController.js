export const logout=(req,res)=>{
    
    res.cookie('refreshToken'," ",{
        httpOnly:false,
        secure:true,
        sameSite:'None'
       
    });
    return res.status(200).json({message:"User logged out"});
    
}