import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    gender:{
        type:String,
        enum:['Male','Female','Custom'],
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:{
        type:String,
        default:null
    },
    resetTokenExpiration:{
        type:Date,
        default:null
    },
    profilePicture:{
        type:String,
        default:null
    },
    
    


},
{timestamps:true}
);
const User=mongoose.model('User',userSchema);
export default User