import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import apiRoutes from "./routes/apiRoutes.js";
import path from 'path';
dotenv.config();

const app=express();

const port=process.env.PORT || 5000;

app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]
    }
));

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'client/build', 'index.html'));
  });
connectDB();


app.use('/auth',authRoutes);
app.use('/api',apiRoutes)





app.listen(port,()=>{
    console.log(`Server is running `);
})

//routes


