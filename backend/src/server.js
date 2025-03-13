import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "../config/db.js";
import authRoutes from "./routes/authRoutes.js";

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


app.use('/auth',authRoutes);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

//routes


