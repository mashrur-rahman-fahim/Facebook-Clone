import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

const app=express();

const port=process.env.PORT || 5000;

app.use(cors(
    {
        origin: "*",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    }
));

app.use(express.json());
connectDB();


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

//routes

app.get('/',(req,res)=>{
    res.send('Hello from the server!');
})
